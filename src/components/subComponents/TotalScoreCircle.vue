<template>
  <div class="circle-container">
    <svg :width="svgWidth" :height="svgHeight">
      <g :transform="'translate(' + svgWidth / 2 + ',' + svgHeight / 2 + ')'">
        <!-- Create the circle with segmented borders here -->

        <!-- Add text to the center of the circle -->
        <text class="circle-text"></text>
      </g>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  props: {
    correct: Number,
    incorrect: Number,
    skipped: Number,
  },
  data() {
    return {
      svgWidth: 150, // Adjust the SVG width as needed
      svgHeight: 150, // Adjust the SVG height as needed
    };
  },
  mounted() {
    // Define the percentages and colors for each segment
    const segments = [
      { percentage: 27, color: '#427733' },
      { percentage: 30, color: '#F29233' },
      { percentage: 43, color: '#575B59' },
    ];

    // Calculate the total percentage to determine the circle's radius
    segments.reduce((sum, segment) => sum + segment.percentage, 0);
    const radius = Math.min(this.svgWidth, this.svgHeight) / 2;

    // Select the container element
    const container = d3.select('.circle-container');

    // Create the SVG element
    const svg = container.select('svg');

    // Create a function to convert percentage to radians
    const percentageToRadians = (percentage) => (percentage / 100) * (2 * Math.PI);

    // Initialize the starting angle
    let startAngle = 0;

    // Create the circle segments
    segments.forEach((segment) => {
      const endAngle = startAngle + percentageToRadians(segment.percentage);

      // Create a path for the segment
      const path = d3.arc()
        .innerRadius(radius - 10) // Adjust the inner radius as needed
        .outerRadius(radius)
        .cornerRadius(80)
        .padAngle(0.025)
        .startAngle(startAngle)
        .endAngle(endAngle);

      // Append the segment to the SVG with the specified color
      svg
        .select('g')
        .append('path')
        .attr('d', path)
        .style('fill', segment.color);

      // Update the starting angle for the next segment
      startAngle = endAngle;
    });

    // Add text to the center of the circle
    svg
      .select('.circle-text')
      .text('71%') // Modify this text as needed
      .attr('text-anchor', 'middle') // Center the text horizontally
      .attr('dy', '0.35em'); // Center the text vertically
  },
};
</script>

<style scoped>
.circle-container {
  text-align: center;
}
</style>
