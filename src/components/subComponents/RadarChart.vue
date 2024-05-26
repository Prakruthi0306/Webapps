<template>
  <svg :id=svgId></svg>
</template>

<script>
import * as d3 from 'd3';

export default {
  props: {
    dataInput: Array,
    width: Number,
    height: Number,
    suggest: Boolean,
  },
  data() {
    return {
      svgId: `radarchart-${this._uid}`, // Generate a unique ID for the SVG element
    };
  },
  mounted() {
    this.drawChart();
  },
  methods: {
    drawChart() {
      // Sample data
      const data = this.dataInput;

      const suggestions = {lower: 30, middle: 50, upper: 80};

      const remove = d3.select(`#${this.svgId}`);
      remove.selectAll('*').remove();

      //graph dimensions
      const margin = { top: 50, right: 50, bottom: 50, left: 50 };
      const width = this.width;
      const height = this.height;
      const radius = Math.min(width, height) / 2;

      // Create SVG
      const svg = d3
        .select(`#${this.svgId}`)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${(width + margin.left + margin.right) / 2},${(height + margin.top + margin.bottom) / 2})`);

      // Generate scales
      const scale = d3
        .scaleLinear()
        .domain([0, 100])
        .range([0, radius]);

      // Generate angles for each variable
      const angle = d3
        .scaleBand()
        .domain(data.map(d => d.variable))
        .range([0, 2 * Math.PI]);

      // Draw the chart
      const line = d3
        .lineRadial()
        .angle(d => angle(d.variable))
        .radius(d => scale(d.value))
        .curve(d3.curveLinearClosed);

      svg
        .append('path')
        .datum(data)
        .attr('d', line)
        .attr('fill', '#E0F0FF')
        .attr('opacity', 0.7)
        .attr('stroke', '#6092C0')
        .attr('stroke-width', 2);

      // Add labels
      svg
        .selectAll('.label')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'label')
        .attr('text-anchor', 'middle')
        .attr('transform', d => {
          const labelRadius = scale(100) + margin.bottom/2;
          const labelX = labelRadius * Math.sin(angle(d.variable));
          const labelY = -labelRadius * Math.cos(angle(d.variable));
          
          // Calculate the rotation angle in degrees
          let rotation = (angle(d.variable) * 180 / Math.PI) + 90;

          // Adjust the rotation based on the quadrant
          if (angle(d.variable) < Math.PI) {
            rotation += 180; // Add 180 degrees for the bottom half of the chart
          }

          return `translate(${labelX},${labelY}) rotate(${rotation})`;
        })
        .text(d => d.variable)
        .style('font-size', '.5em');


        if (this.suggest) {
          //added circles
          svg
            .selectAll('createdCircles')
            .data(data)
            .enter()
            .append('circle')
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', (d,i) => [scale(suggestions.lower), scale(suggestions.middle), scale(suggestions.upper)][i])
            .attr('fill', 'none')
            .attr('stroke', (d,i) => ['#F87B7B', '#FD9B41', '#14AE5C'][i])
            .attr('stroke-width', 1)
            .attr('stroke-dasharray', '3,3');
        }

      // Add dotted lines
      svg
        .selectAll('.line')
        .data(data)
        .enter()
        .append('line')
        .attr('class', 'line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', d => scale(100) * Math.sin(angle(d.variable)))
        .attr('y2', d => -scale(100) * Math.cos(angle(d.variable)))
        .attr('stroke', '#6A717D')
        .attr('stroke-dasharray', '3,3');
    },
  },
};
</script>