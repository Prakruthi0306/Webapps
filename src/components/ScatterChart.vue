<script>
import { Scatter } from "vue-chartjs";
export default {
  name: "ScatterChart",
  extends: Scatter,
  props: {
    application: Object,
  },

  data() {
    return {
      chartData: {
        labels: this.getQuestionTitles(),
        datasets: [
          {
            label: "Scatter Plot of Scores",
            borderWidth: 1,
            backgroundColor: "red",
            fill: false,
            borderColor: "orange",
            data: {
              x: this.getQuestionNumbers(),
              y: this.getPreviewScores(),
              r: 1,
            },
          },
        ],
      },
      options: {
        legend: {
          display: true,
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },

  mounted() {
    this.renderChart(this.chartData, this.options);
  },

  methods: {
    getQuestionNumbers() {
      var numberArray = [];
      var number = "";
      var i = 0;

      for (i = 0; i < this.application.questions.length; i++) {
        number = this.application.questions[i].number;
        numberArray.push(number);
      }

      console.log("Get question numbers: ", numberArray);
      return numberArray;
    },

    getQuestionTitles() {
      var titleArray = [];
      var title = "";
      var i = 0;

      for (i = 0; i < this.application.questions.length; i++) {
        title = "Question " + this.application.questions[i].number;
        titleArray.push(title);
      }

      console.log("Get question titles: ", titleArray);
      return titleArray;
    },

    getPreviewScores() {
      var scores = [];
      var score = 0;
      var i = 0;

      for (i = 0; i < this.application.questions.length; i++) {
        score = parseInt(this.application.questions[i].selectedScoreInPreview);
        scores.push(score);
      }

      return scores;
    },
  },
};
</script>
