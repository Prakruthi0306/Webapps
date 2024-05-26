<template>
  <div class="d-flex">
    <svg :id="svgId"></svg>
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
      svgId: `scatterplot-${this._uid}`, // Generate a unique ID for the SVG element
    };
  },
  mounted() {
    this.drawChart();
  },
  methods: {
    drawChart() {      
      // Data for the scatter plot  
      const data = this.dataInput;
/*       const types = [
        "Type1", "Type2"
      ] */

      const suggestions = {lower: 30, middle: 50, upper: 80};

      let temp = [...data];
      temp.sort((a,b) => a.value - b.value);
      let maxValue = 0;
      if (temp.length != 0) {
        maxValue = temp[temp.length-1].value;
      }
      if (maxValue == 0) {
        maxValue = 100;
      }

      const remove = d3.select(`#${this.svgId}`);
      remove.selectAll('*').remove();

      // Set the dimensions and margins of the graph
      const margin = { top: 30, right: 200, bottom: 50, left: 80 };
      const width = this.width;
      const height = this.height;

      // Append the SVG container to the component's element
      const svg = d3
        .select(`#${this.svgId}`)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      // Create scales for x and y axes
      const xScale = d3
        .scaleBand()
        .domain(data.map((d) => d.variable))
        .range([0, width]);

      const yScale = d3
        .scaleLinear()
        .domain([0, maxValue])
        .range([height, 0]);

      // Add x and y axes to the scatter plot
      svg
        .append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(xScale).tickSize(0))
        .select('.domain')
        .attr('marker-end', 'url(#arrowhead-x)');

      svg
        .append('g')
        .call(d3.axisLeft(yScale).tickSize(5))
        .select('.domain')
        .attr('marker-end', 'url(#arrowhead-y)');

      // Add marker definitions for arrowheads
      svg
        .append('defs')
        .append('marker')
        .attr('id', 'arrowhead-x')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 10)
        .attr('refY', 0)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')
        .style('fill', 'black');

      svg
        .append('defs')
        .append('marker')
        .attr('id', 'arrowhead-y')
        .attr('viewBox', '-5 0 10 10')
        .attr('refX', 0)
        .attr('refY', 5)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', '180deg')
        .append('path')
        .attr('d', 'M-5,0L0,10L5,0')
        .style('fill', 'black');

      //angle text
      svg
        .select("g")
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");

      // Add circles to represent the data points
      svg
        .selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', (d) => xScale(d.variable) + xScale.bandwidth() / 2)
        .attr('cy', (d) => yScale(d.value))
        .attr('r', 2)
        .style('fill', 'steelblue');

      //make the key box
/*       const color = d3
        .scaleOrdinal()
        .domain(data.map(d => d.variable))
        .range(['#14AE5C', '#FD9B41']);

      const keyGroup = svg
        .append('g')
        .attr('transform', `translate(${20}, ${10})`);

      keyGroup
        .append('rect')
        .attr('width', '75')
        .attr('height', '40')
        .style('stroke', 'black')
        .style('stroke-width', '1px')
        .style('fill', 'none');

      const key = keyGroup
        .append('g')
        .attr('transform', `translate(15,12)`)
        .selectAll('.key')
        .data(types)
        .enter()
        .append('g')
        .attr('class', 'key')
        .attr('transform', (d, i) => `translate(0, ${i * 15})`);

      key
        .append('circle')
        .attr('r', 5)
        .attr('fill', (d) => color(d));

      key
        .append('text')
        .attr('x', 20)
        .attr('y', 2.5)
        .text((d) => d)
        .style('font-size', '.5em'); */
        
      // Y axis label
      svg
      .append('text')
      .text('Score')
      .attr('x', -margin.left)
      .attr('y', 20)
      .style('font-size', '.8em');


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




      if (this.suggest) {
        //create value suggestions label
        const suggestionsAxis = d3
          .axisRight()
          .scale(yScale)
          .tickValues([suggestions.lower, suggestions.middle, suggestions.upper])
          .tickSizeInner(-(width))
          .tickFormat((d, i) => ['need improve', 'good', 'excellent'][i])

        //create y axis bar with labels attached
        svg
          .append('g')
          .attr('class', 'suggestionsAxis')
          .attr('transform', `translate(${width}, 0)`)
          .call(suggestionsAxis)
          .select('.domain') 
          .remove(); 

        //style dashes
        svg
          .selectAll('.suggestionsAxis .tick line')
          .attr('stroke-dasharray', '2,2')
          .style('stroke', (d, i) => ['#F87B7B', '#FD9B41', '#14AE5C'][i]);
      }

      // Create an SVG element for the key
      const keySvg = d3.select(`#${this.svgId}`); 

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
