<script>
import { Radar } from "vue-chartjs";
export default {
  name: "RadarChart",
  extends: Radar,
  props: {
    application: Object,
    colorBackground: String,
  },
  data() {
    return {
      chartData: {
        labels: this.getUniqueQuestionCategories(),
        datasets: [
          {
            label: "Radar Chart of Scores",
            borderWidth: 1,
            borderColor: "black",
            backgroundColor: this.colorBackground,

            data: this.getCategoryScores(),
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
    console.log(
      "Mounted chartData and options in RADAR: ",
      this.chartData,
      this.options
    );
    this.renderChart(this.chartData, this.options);
  },

  methods: {
    getNonUniqueQuestionCategories() {
      var categoryArray = [];
      var category = "";
      var i = 0;

      for (i = 0; i < this.application.questions.length; i++) {
        category = this.application.questions[i].category;
        categoryArray.push(category);
      }

      console.log("Get non-unique question categories: ", categoryArray);

      return categoryArray;
    },

    getUniqueQuestionCategories() {
      var categoryArray = [];
      var uniqueCategories = [];
      var category = "";
      var i = 0;

      for (i = 0; i < this.application.questions.length; i++) {
        category = this.application.questions[i].category;
        categoryArray.push(category);
      }

      uniqueCategories = categoryArray.filter((x, i, a) => a.indexOf(x) == i);

      console.log("Unique categories in RADAR: ", uniqueCategories);
      return uniqueCategories;
    },

    getCategoryScores() {
      var questionScore = 0;

      var categories = this.getUniqueQuestionCategories();

      var categoryScores = [];
      var categoryCounts = [];
      var questionCategory;

      var i = 0;
      var j = 0;

      for (i = 0; i < this.application.questions.length; i++) {
        questionCategory = this.application.questions[i].category;
        questionScore = parseInt(
          this.application.questions[i].selectedScoreInPreview
        );

        console.log("Question score in RADAR: ", questionScore);
        for (j = 0; j < categories.length; j++) {
          if (questionCategory == categories[j]) {
            if (categoryScores[j] != null) {
              if (isNaN(questionScore)) {
                categoryScores[j] += 0;
              } else {
                categoryScores[j] += questionScore;
              }

              categoryCounts[j] += 4;

              break;
            } else {
              if (isNaN(questionScore)) {
                categoryScores.push(0);
              } else {
                categoryScores.push(questionScore);
              }

              categoryCounts.push(4);
            }
          }
        }
      }

      for (i = 0; i < categoryScores.length; i++) {
        categoryScores[i] = (categoryScores[i] / categoryCounts[i]) * 100;
      }

      console.log("Category scores in RADAR: ", categoryScores);
      return categoryScores;
    },
  },
};
</script>
