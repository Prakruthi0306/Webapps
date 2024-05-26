<template>
  <div class="d-flex">
    <svg id="barChartHoriz"></svg>
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
  data() {
    return {
    }
  },
  mounted() {
    this.drawChart();
  },
  methods: {
    drawChart() {
      // Bar graph data
      const data = this.dataInput;

      const suggestions = {lower: 30, middle: 50, upper: 80};

      const remove = d3.select('#barChartHoriz');
      remove.selectAll('*').remove();

      //graph dimensions
      const margin = { top: 0, right: 200, bottom: 30, left: 70 };
      const width = this.width;
      const height = this.height;

      const svg = d3
        .select('#barChartHoriz')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const xScale = d3
        .scaleLinear()
        .domain([0, 100])
        .range([0, width])

      const yScale = d3
        .scaleBand()
        .domain(data.map(d => d.variable))
        .range([0, height])
        .padding(0.9);

        svg
        .selectAll('completeBar')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', xScale(0))
        .attr('y', d => yScale(d.variable))
        .attr('width', xScale(100))
        .attr('height', yScale.bandwidth())
        .attr('fill', '#D9D9D9')
        .attr('rx', yScale.bandwidth() / 2)
        .attr('ry', yScale.bandwidth() / 2);

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

      // Add bars to the chart
      svg
        .selectAll('mybar')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', xScale(0))
        .attr('y', d => yScale(d.variable))
        .attr('width', d => xScale(d.value))
        .attr('height', yScale.bandwidth())
        .attr('fill', d => colorScale(d.variable))
        .attr('rx', yScale.bandwidth() / 2)
        .attr('ry', yScale.bandwidth() / 2);

      // Add variable labels
      svg
        .selectAll('.labelVar')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'labelVar')
        .attr('x', (xScale(0) - margin.left))
        .attr('y', d => yScale(d.variable) + yScale.bandwidth() / 2)
        .attr('dy', '0.35em')
        .attr('font-size', '0.5em')
        .text(d => d.variable);

      //add label values
      svg
        .selectAll('.labelVal')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'labelVal')
        .attr('x', width)
        .attr('y', d => yScale(d.variable) + yScale.bandwidth() / 2)
        .attr('dy', '0.35em')
        .attr('font-size', '0.5em')
        .text(d => d.value + '%');

      if (this.suggest) {
        //create add suggestions labels
        const xAxis = d3
          .axisBottom()
          .scale(xScale)
          .tickValues([suggestions.lower, suggestions.middle, suggestions.upper])
          .tickSizeInner(-(height + margin.top + margin.bottom) + 2*margin.top)
          .tickFormat((d, i) => ['need improve', 'good', 'excellent'][i])

        //create x axis bar with labels attached
        svg
          .append('g')
          .attr('class', 'y-axis')
          .attr('transform', `translate(0, ${height})`)
          .call(xAxis)
          .select('.domain') 
          .remove(); 
      }

      //style dashes
      svg
        .selectAll('.y-axis .tick line')
        .attr('stroke-dasharray', '2,2')
        .style('stroke', (d, i) => ['#F87B7B', '#FD9B41', '#14AE5C'][i]);

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
          .attr('x1', xScale(meanValue))
          .attr('x2', xScale(meanValue))
          .attr('y1', 0)
          .attr('y2', height)
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
          .attr('x1', xScale(medianValue))
          .attr('x2', xScale(medianValue))
          .attr('y1', 0)
          .attr('y2', height)
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
          .attr('x1', xScale(meanValue + stdDeviation))
          .attr('x2', xScale(meanValue + stdDeviation))
          .attr('y1', 0)
          .attr('y2', height)
          .attr('stroke', 'green')
          .attr('stroke-width', 2);

        svg
          .append('line')
          .attr('class', 'std-deviation-line')
          .attr('x1', xScale(meanValue - stdDeviation))
          .attr('x2', xScale(meanValue - stdDeviation))
          .attr('y1', 0)
          .attr('y2', height)
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
          .attr('x1', xScale(varianceValue))
          .attr('x2', xScale(varianceValue))
          .attr('y1', 0)
          .attr('y2', height)
          .attr('stroke', 'orange')
          .attr('stroke-width', 2);
      }

      // Create an SVG element for the key
      const keySvg = d3.select('#barChartHoriz');
      
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
  }
};
</script>
