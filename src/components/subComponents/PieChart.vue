<template>
  <svg :id="svgId"></svg>
</template>

<script>
import * as d3 from 'd3';

export default {
  props: {
    dataInput: Array,
    width: Number,
    height: Number,
  },
  data() {
    return {
      svgId: `piechart-${this._uid}`,
    };
  },
  mounted() {
    this.generateChart();
  },
  watch: {
    dataInput() {
      this.generateChart();
    },
  },
  methods: {
    generateChart() {
      function createPattern(index, type) {
        if (type == "dotted") {
          const patternId = `pattern-${index}`;
          const pattern = svg
            .append('defs')
            .append('pattern')
            .attr('id', patternId)
            .attr('patternUnits', 'userSpaceOnUse')
            .attr('width', 10)
            .attr('height', 10);

          pattern
            .append('rect')
            .attr('width', 10)
            .attr('height', 10)
            .attr('fill', uniqueColors[index % 13]);

          pattern
            .append('circle')
            .attr('cx', 5)
            .attr('cy', 5)
            .attr('r', 2)
            .attr('fill', 'white');
          
            return `url(#${patternId})`;
        }
        else if (type == 'striped') {
          const patternId = `pattern-${index}`;
          const pattern = svg
            .append('defs')
            .append('pattern')
            .attr('id', patternId)
            .attr('patternUnits', 'userSpaceOnUse')
            .attr('width', 10)
            .attr('height', 10);

          pattern
            .append('rect')
            .attr('width', 10)
            .attr('height', 10)
            .attr('fill', uniqueColors[index % 13]);

          pattern
            .append('line')
            .attr('x1', 0)
            .attr('y1', 10)
            .attr('x2', 10)
            .attr('y2', 0)
            .attr('stroke', 'white')
            .attr('stroke-width', 1);

          return `url(#${patternId})`;
        }
        else if (type == "grid") {
          const patternId = `pattern-${index}`;
          const pattern = svg
            .append('defs')
            .append('pattern')
            .attr('id', patternId)
            .attr('patternUnits', 'userSpaceOnUse')
            .attr('width', 10)
            .attr('height', 10);

          pattern
            .append('rect')
            .attr('width', 10)
            .attr('height', 10)
            .attr('fill', uniqueColors[index % 13]);

          pattern
            .append('rect')
            .attr('x', 3)
            .attr('y', 3)
            .attr('width', 4)
            .attr('height', 4)
            .attr('fill', 'white');
          
            return `url(#${patternId})`;
        }
        else {
          return uniqueColors[index % 13];
        }
      }

      let uniqueColors = [
        "#F69292", "#F8B534", "#FACA9B", "#FE0000", "#AAE066", "#B4A1CD", 
        "#00FFF0", "#6DE7AC", "#0FA958", "#0F65A9", "#6092C0", "#F9FD41", "#9747FF"
      ];
      
      let uniquePatterns = ['solid', 'striped', 'dotted', 'grid'];

      let data = this.dataInput;

      // Check if all data values are 0
      const allZero = this.dataInput.every(dataPoint => dataPoint.value === 0);

      // If all values are 0, create a default dataset with equal values
      if (allZero) {
        for (let i = 0; i < data.length; i++) {
          data[i].value = 1;
        }
      }
      
      // Graph dimensions
      const margin = { top: 30, right: 30, bottom: 30, left: 30 };
      const width = this.width;
      const height = this.height;
      const radius = Math.min(width, height) / 2;

      const remove = d3.select(`#${this.svgId}`);
      remove.selectAll('*').remove();

      const svg = d3
        .select(`#${this.svgId}`)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);

      const pie = d3.pie().value((d) => d.value);

      const arc = d3.arc().innerRadius(0).outerRadius(radius).padAngle(0.005);

      const arcs = svg.selectAll('arc').data(pie(data)).enter().append('g').attr('class', 'arc');

      arcs
        .append('path')
        .attr('d', arc)
        .attr('fill', (d,i) => {
          if (i <= 13) {
            return createPattern(i, uniquePatterns[0]);
          }
          else if (i <= 26) {
            return createPattern(i, uniquePatterns[1]);
          }
          else if (i <= 39) {
            return createPattern(i, uniquePatterns[2]);
          }
          else {
            return createPattern(i, uniquePatterns[3]);
          }
        });


        
      const key = svg
        .append('g')
        .attr('transform', `translate(${radius + margin.left}, ${-radius})`)
        .selectAll('.key')
        .data(pie(data))
        .enter()
        .append('g')
        .attr('class', 'key')
        .attr('transform', (d, i) => {
          if (i <= 24) {
            return `translate(0, ${i * 15})`;
          } else {
            return `translate(150, ${(i - 25) * 15})`;
          }
        });

      key
        .append('rect')
        .attr('width', 10)
        .attr('height', 10)
        .attr('fill', (d,i) => {
          if (i <= 13) {
            return createPattern(i, uniquePatterns[0]);
          }
          else if (i <= 26) {
            return createPattern(i, uniquePatterns[1]);
          }
          else if (i <= 39) {
            return createPattern(i, uniquePatterns[2]);
          }
          else {
            return createPattern(i, uniquePatterns[3]);
          }
        });

      key
        .append('text')
        .attr('x', 20)
        .attr('y', 10)
        .text(
          (d) =>
            `${d.data.variable} (${Math.round(
              ((d.endAngle - d.startAngle) / (2 * Math.PI)) * 1000
            ) / 10}%)`
        )
        .style('font-size', '.6em');
    },
  },
};
</script>
