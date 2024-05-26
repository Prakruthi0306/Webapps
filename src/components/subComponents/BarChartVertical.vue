<template>
  <div class="d-flex">
    <svg id="barChartVert"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  props: {
    dataInput: Array,
    width: Number,
    height: Number,
    mean: Boolean,
    median: Boolean,
    standDeviation: Boolean,
    variance: Boolean,
    suggest: Boolean,
  },
  mounted() {
    this.drawChart();
  },
  methods: {
    drawChart() {
      const data = this.dataInput;

      let temp = [...data];
      temp.sort((a,b) => a.value - b.value);
      
      let maxValue = 0;
      if (temp.length != 0) {
        maxValue = temp[temp.length-1].value;
      }
      if (maxValue == 0) {
        maxValue = 100;
      }

      const suggestions = {lower: 30, middle: 50, upper: 80};

      const remove = d3.select('#barChartVert');
      remove.selectAll('*').remove();

      //graph dimensions
      const margin = { top: 30, right: 200, bottom: 30, left: 30 };
      const width = this.width;
      const height = this.height;

      const svg = d3
        .select('#barChartVert')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const xScale = d3
        .scaleBand()
        .range([0, width])
        .domain(data.map(d => d.variable))
        .padding(0.6);

      const yScale = d3
        .scaleLinear()
        .domain([0, maxValue])
        .range([height, 0]);

      // Add x and y axes to the scatter plot
      svg
        .append('g')
        .call(d3.axisLeft(yScale).tickSize(5))

      //set bar colors
      const colorScale = d3.scaleOrdinal()
        .domain(data.map(d => d.variable))
        .range(data.map(d => {
          if (d.value < suggestions.lower) {
            return '#F87B7B';
          }
          else if (d.value < suggestions.middle) {
            return '#FD9B41';
          }
          else {
            return '#14AE5C';    
          }
        }));

      //create bars
      svg
        .selectAll('mybar')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', d => xScale(d.variable))
        .attr('y', d => yScale(d.value))
        .attr('width', xScale.bandwidth())
        .attr('height', d => height - yScale(d.value))
        .attr('fill', d => colorScale(d.variable))
        .attr('rx', 5)
        .attr('ry', 5);

      //create category label
      svg
        .append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale).tickSize(0))
        .selectAll('.x-label')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'x-label')
        .attr('x', d => xScale(d.variable) + xScale.bandwidth() / 2)
        .attr('y', 0)
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')
        .text(d => d.variable);
        
      if (this.suggest) {
        //create value suggestions label
        const suggestionsAxis = d3
          .axisRight()
          .scale(yScale)
          .tickValues([suggestions.lower, suggestions.middle, suggestions.upper])
          .tickSizeInner(-(width + margin.left + margin.right) + 4*margin.left)
          .tickFormat((d, i) => ['need improve', 'good', 'excellent'][i])

        //create y axis bar with labels attached
        svg
          .append('g')
          .attr('class', 'suggestionsAxis')
          .attr('transform', `translate(${width - 40}, 0)`)
          .call(suggestionsAxis)
          .select('.domain') 
          .remove(); 

        //style dashes
        svg
          .selectAll('.suggestionsAxis .tick line')
          .attr('stroke-dasharray', '2,2')
          .style('stroke', (d, i) => ['#F87B7B', '#FD9B41', '#14AE5C'][i]);
      }

      const meanValue = d3.mean(data, (d) => d.value);
      const medianValue = d3.median(data, (d) => d.value);
      const stdDeviation = d3.deviation(data, (d) => d.value);
      const varianceValue = d3.variance(data, (d) => d.value);
      const keyData = [];
      if (this.mean) {
        if (meanValue == undefined) {
          keyData.push({ label: 'Mean', color: 'red', value: 0});
        }
        else {
          keyData.push({ label: 'Mean', color: 'red', value: meanValue.toFixed(2)});
        }
        svg
          .append('line')
          .attr('class', 'mean-line')
          .attr('x1', 0)
          .attr('x2', width)
          .attr('y1', yScale(meanValue))
          .attr('y2', yScale(meanValue))
          .attr('stroke', 'red')
          .attr('stroke-width', 2);
      }
      if (this.median) {
        if (meanValue == undefined) {
          keyData.push({ label: 'Median', color: 'blue', value: 0});
        }
        else {
          keyData.push({ label: 'Median', color: 'blue', value: medianValue.toFixed(2) });
        }
        
        svg
          .append('line')
          .attr('class', 'median-line')
          .attr('x1', 0)
          .attr('x2', width)
          .attr('y1', yScale(medianValue))
          .attr('y2', yScale(medianValue))
          .attr('stroke', 'blue')
          .attr('stroke-width', 2);
      }
      if (this.standDeviation) {
        if (stdDeviation == undefined) {
          keyData.push({ label: 'SD', color: 'green', value: 0});
        }
        else {
          keyData.push({ label: 'SD', color: 'green', value: stdDeviation.toFixed(2)});
        }
        svg
          .append('line')
          .attr('class', 'std-deviation-line')
          .attr('x1', 0)
          .attr('x2', width)
          .attr('y1', yScale(meanValue + stdDeviation))
          .attr('y2', yScale(meanValue + stdDeviation))
          .attr('stroke', 'green')
          .attr('stroke-width', 2);

        svg
          .append('line')
          .attr('class', 'std-deviation-line')
          .attr('x1', 0)
          .attr('x2', width)
          .attr('y1', yScale(meanValue - stdDeviation))
          .attr('y2', yScale(meanValue - stdDeviation))
          .attr('stroke', 'green')
          .attr('stroke-width', 2);
      }
      if (this.variance) {
        if (varianceValue == undefined) {
          keyData.push({ label: 'Variance', color: 'orange', value: 0});
        }
        else {
          keyData.push({ label: 'Variance', color: 'orange', value: varianceValue.toFixed(2)});
        }
        svg
          .append('line')
          .attr('class', 'mean-line')
          .attr('x1', 0)
          .attr('x2', width)
          .attr('y1', yScale(varianceValue))
          .attr('y2', yScale(varianceValue))
          .attr('stroke', 'orange')
          .attr('stroke-width', 2);
      }

      // Create an SVG element for the key
      const keySvg = d3.select('#barChartVert');

      // Create the key elements
      const keyItems = keySvg
        .selectAll('.key-item')
        .data(keyData)
        .enter()
        .append('g')
        .attr('class', 'key-item')
        .attr('transform', (d, i) => `translate(${width+margin.left+40}, ${i * 20})`); // Adjust the coordinates as needed

      // Create colored lines
      keyItems
        .append('line')
        .attr('x1', 0)
        .attr('y1', 5) // Adjust the y-coordinate as needed
        .attr('x2', 20) // Adjust the length of the line as needed
        .attr('y2', 5) // Adjust the y-coordinate as needed
        .attr('stroke', (d) => d.color)
        .attr('stroke-width', 2);

      // Create text labels
      keyItems
        .append('text')
        .attr('x', 30) // Adjust the x-coordinate as needed
        .attr('y', 10) // Adjust the y-coordinate as needed
        .attr('dy', '0.35em')
        .attr('font-size', '0.5em')
        .text((d) => `${d.label}:`)
        .style('fill', 'black'); // Set the color of the text

      // Add numbers for mean, median, and standard deviation
      keyItems
        .append('text')
        .attr('x', 100) // Adjust the x-coordinate as needed
        .attr('y', 10) // Adjust the y-coordinate as needed
        .attr('dy', '0.35em')
        .attr('font-size', '0.5em')
        .text((d) => `${d.value}`)
        .style('fill', 'black'); // Set the color of the text


    }
  },
};
</script>