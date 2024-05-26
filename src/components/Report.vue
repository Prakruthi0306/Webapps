<template :key="heatmapLoaded" v-if="heatmapLoaded == true">
  <b-container fluid>
    <b-row class="justify-content-center vertical-center">
      <div id="fontDiv" class="col-md-12">
        <br />
        <p>{{ application.reportHeaderContent }}</p>

        <h5>Screening Information</h5>

        <div class="w-100 p-3">
          <b-table
            fluid
            small
            bordered
            striped
            hover
            :items="screeningInformation"
          ></b-table>
        </div>
        <br />

        <b-button @click="showChildRatingModal" size="lg"
          >Change Rating</b-button
        >
        <br />

        <h5>Overview</h5>
        <br />

        <canvas id="lineChart" height="450" width="500"></canvas><br />
        <canvas id="pieChart" height="450" width="500"></canvas><br />
        <canvas id="radarChart" height="450" width="500"></canvas><br />
        <canvas id="barChart" height="450" width="500"></canvas>

        <div id="heatMapAreaChart">
          <VueApexCharts
            height="350"
            type="heatmap"
            :options="heatmapOptions"
            :series="heatmapSeries"
          ></VueApexCharts>

          <VueApexCharts
            height="350"
            type="area"
            :options="areaChartOptions"
            :series="areaChartSeries"
          ></VueApexCharts>
        </div>

        <br />

        <h5>Summary</h5>

        <b-table small striped bordered hover :items="summary1"></b-table>
        <br />

        <b-table small striped bordered hover :items="summary2"></b-table>
        <br />

        <h5>Detail</h5>

        <b-table bordered hover :items="detail" :fields="detailFields">
          <template #cell(question)="data">
            <span v-html="data.value"></span>
          </template>
          <template #cell(answers)="data1">
            <span v-html="data1.value"></span>
          </template>
          <template #cell(videoSlashAudio)="data2">
            <span v-html="data2.value"></span>
          </template>
        </b-table>

        <br />

        <h5>First time results</h5>

        <b-table bordered hover :items="detailFirstTime" :fields="detailFields">
          <template #cell(question)="data">
            <span v-html="data.value"></span>
          </template>
          <template #cell(answers)="data1">
            <span v-html="data1.value"></span>
          </template>
          <template #cell(scores)="data2">
            <span v-html="data2.value"></span>
          </template>
          <template #cell(notes)="data3">
            <span v-html="data3.value"></span>
          </template>
          <template #cell(videoSlashAudio)="data4">
            <span v-html="data4.value"></span>
          </template>
          <template #cell(PSlashR)="data5">
            <span v-html="data5.value"></span>
          </template>
        </b-table>

        <br />

        <h5>Last time results</h5>

        <b-table bordered hover :items="detailLastTime" :fields="detailFields">
          <template #cell(question)="data">
            <span v-html="data.value"></span>
          </template>
          <template #cell(answers)="data1">
            <span v-html="data1.value"></span>
          </template>
          <template #cell(scores)="data2">
            <span v-html="data2.value"></span>
          </template>
          <template #cell(notes)="data3">
            <span v-html="data3.value"></span>
          </template>
          <template #cell(videoSlashAudio)="data4">
            <span v-html="data4.value"></span>
          </template>
          <template #cell(PSlashR)="data5">
            <span v-html="data5.value"></span>
          </template>
        </b-table>

        <br />

        <modal name="childRating" height="90%" :adaptive="true" width="90%">
          <b-row class="justify-content-center vertical-center">
            <div class="col-md-8">
              <h5>
                <b
                  >Compared to other children this age, how would you rate this
                  child for below categories?</b
                >
              </h5>

              <p>
                Please move the slider button right or left on a 10-graded scale
                to rate the child's overall development based on your own
                experience and understanding.
              </p>
              <br />

              <b-form-group
                id="comprehension"
                label="Comprehension"
                label-for="nested-comprehension"
              >
                <br />
                <vue-slider
                  :min="1"
                  :max="10"
                  :interval="1"
                  :tooltip="'always'"
                  v-model="comprehension"
                  :marks="true"
                  :adsorb="true"
                ></vue-slider>
              </b-form-group>
              <br />

              <b-form-group
                id="problemSolving"
                label="Problem solving"
                label-for="nested-problemSolving"
              >
                <br />

                <vue-slider
                  :min="1"
                  :max="10"
                  :interval="1"
                  :tooltip="'always'"
                  v-model="problemSolving"
                  :marks="true"
                  :adsorb="true"
                ></vue-slider>
              </b-form-group>
              <br />

              <b-form-group
                id="intelligibility"
                label="Intelligibility"
                label-for="nested-intelligibility"
              >
                <br />

                <vue-slider
                  :min="1"
                  :max="10"
                  :tooltip="'always'"
                  :interval="1"
                  :marks="true"
                  :adsorb="true"
                  v-model="intelligibility"
                ></vue-slider>
              </b-form-group>
              <br /><br />

              <b-button
                block="true"
                squared
                size="lg"
                class="returnToPreviewButton text-dark"
                @click="onChildRatingModalClose"
              >
                <b>Return to previewing questions</b>
              </b-button>
            </div>
          </b-row>
        </modal>

        <b-row>
          <b-col cols="9">
            <b-button
              squared
              size="lg"
              class="returnToPreviewButton text-dark"
              @click="generatePDF"
            >
              <b>Generate PDF of report</b>
            </b-button>

            <b-button
              squared
              size="lg"
              class="returnToPreviewButton text-dark"
              @click="$bvModal.hide('report')"
            >
              <b>Return to previewing questions</b>
            </b-button>
          </b-col>
        </b-row>

        <br />
      </div>
    </b-row>
  </b-container>
</template>

<script>
import Chart from "chart.js";
import VueApexCharts from "vue-apexcharts";

import VueSlider from "vue-slider-component";
export default {
  components: {
    VueSlider,
    VueApexCharts,
  },
  props: {
    application: Object,
    bgColor: String,
    pastResultsByTimestamp: Array,
    firstResults: Array,
    lastResults: Array,
  },
  data() {
    return {
      heatmapLoaded: false,
      areaChartLoaded: false,
      areaChartSeries: [],
      areaChartOptions: {
        chart: {
          type: "area",
          height: 350,
          stacked: true,
          events: {
            selection: function(chart, e) {
              console.log(new Date(e.xaxis.min));
            },
          },
        },
        colors: ["#008FFB", "#00E396", "#CED4DC"],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        fill: {
          type: "gradient",
          gradient: {
            opacityFrom: 0.6,
            opacityTo: 0.8,
          },
        },
        legend: {
          position: "top",
          horizontalAlign: "left",
        },
        xaxis: {
          type: "datetime",
        },
      },
      heatmapSeries: [],
      heatmapOptions: {
        chart: {
          height: 350,
          type: "heatmap",
        },
        dataLabels: {
          enabled: false,
        },
        colors: ["#008FFB"],
        title: {
          text: "HeatMap Chart (Single color)",
        },
      },
      lineChartImage: "",
      pieChartImage: "",
      radarChartImage: "",
      barChartImage: "",
      summary1: this.getSummary1(),
      summary2: this.getSummary2(),
      detail: this.getDetail(),
      detailFirstTime: this.getDetailFirstTime(),
      detailLastTime: this.getDetailLastTime(),

      screeningInformation: this.getScreeningInformation(),
      detailFields: [
        {
          key: "question",
        },
        { key: "answers" },
        { key: "scores" },

        { key: "notes" },
        { key: "videoSlashAudio", label: "Video / Audio" },

        {
          key: "PSlashR",
          label: "P / R",
        },
      ],
      comprehension: 5,
      problemSolving: 5,
      intelligibility: 5,
    };
  },

  mounted() {
    let tempThis = this;

    var lineChartData = {
      type: "line",
      data: {
        labels: this.getUniqueQuestionCategories(),
        datasets: [
          {
            label: "Line Chart of Scores",
            backgroundColor: this.bgColor,
            borderColor: "black",
            data: this.getCategoryScoresChart(),
            fill: true,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        lineTension: 1,
        animation: {
          duration: 1500,
          onComplete: function() {
            tempThis.lineChartImage = this.toBase64Image();
          },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                padding: 25,
              },
            },
          ],
        },
      },
    };

    var pieChartData = {
      type: "pie",
      data: {
        labels: this.getUniqueQuestionCategories(),
        datasets: [
          {
            label: "Pie Chart of Scores",

            borderWidth: 1,
            borderColor: "black",
            backgroundColor: this.bgColor,

            data: this.getCategoryScoresChart(),
          },
        ],
      },
      options: {
        responsive: true,
        animation: {
          duration: 1500,
          onComplete: function() {
            tempThis.pieChartImage = this.toBase64Image();
          },
        },
      },
    };

    var radarChartData = {
      type: "radar",
      data: {
        labels: this.getUniqueQuestionCategories(),
        datasets: [
          {
            label: "Radar Chart of Scores",

            borderWidth: 1,
            borderColor: "black",
            backgroundColor: this.bgColor,

            data: this.getCategoryScoresChart(),
          },
        ],
      },
      options: {
        responsive: true,
        animation: {
          duration: 1500,
          onComplete: function() {
            tempThis.radarChartImage = this.toBase64Image();
          },
        },
      },
    };

    var barChartData = {
      type: "bar",
      data: {
        labels: this.getUniqueQuestionCategories(),
        datasets: [
          {
            label: "Bar Chart of Scores",

            borderWidth: 1,
            borderColor: "black",
            backgroundColor: this.bgColor,

            data: this.getCategoryScoresChart(),
          },
        ],
      },
      options: {
        responsive: true,
        animation: {
          duration: 1500,
          onComplete: function() {
            tempThis.barChartImage = this.toBase64Image();
          },
        },
      },
    };

    this.createChart("lineChart", lineChartData);
    this.createChart("pieChart", pieChartData);
    this.createChart("radarChart", radarChartData);
    this.createChart("barChart", barChartData);

    tempThis.generateHeatMap(this.getPreviewScores());
    tempThis.generateAreaChart(this.getPreviewScores());
  },

  methods: {
    generateAreaChart(scores) {
      let tempThis = this;

      var i = 0;
      var j = 0;
      var results = [];
      var timeApplicationFinished = new Date();

      console.log(
        "Past results by time stamp: ",
        tempThis.pastResultsByTimestamp
      );

      Array.prototype.clone = function() {
        var arr = this.slice(0);
        for (var z = 0; z < this.length; z++) {
          if (this[z].clone) {
            //recursion
            arr[z] = this[z].clone();
          }
        }
        return arr;
      };

      results = tempThis.pastResultsByTimestamp.clone();
      console.log("num scores = ", scores.length);

      for (i = 0; i < scores.length; i++) {
        if (i < results.length) {
          results[i].push({
            selectedScoreInPreview: scores[i],
            dateAndTime: timeApplicationFinished,
          });
        } else {
          results.push([
            {
              selectedScoreInPreview: scores[i],
              dateAndTime: timeApplicationFinished,
            },
          ]);
        }
      }

      var tempSeriesLine = {};
      console.log("Results = ", results);

      for (i = 0; i < results.length; i++) {
        tempSeriesLine = { name: "Question " + (i + 1), data: [] };

        for (j = 0; j < results[i].length; j++) {
          console.log("i, j, currentResult = ", j, i, results[i][j]);

          tempSeriesLine.data.push([
            results[i][j].dateAndTime,
            parseInt(results[i][j].selectedScoreInPreview),
          ]);
        }

        tempThis.areaChartSeries.push(tempSeriesLine);
        tempSeriesLine = {};
      }

      console.log("Area chart series: ", tempThis.areaChartSeries);
      if (tempThis.areaChartSeries) {
        tempThis.areaChartLoaded = true;
      }
    },

    generateHeatMap(scores) {
      let tempThis = this;

      var i = 0;
      var j = 0;
      var results = [];

      Array.prototype.clone = function() {
        var arr = this.slice(0);
        for (var z = 0; z < this.length; z++) {
          if (this[z].clone) {
            //recursion
            arr[z] = this[z].clone();
          }
        }
        return arr;
      };

      console.log(
        "Past results by timestamp: ",
        tempThis.pastResultsByTimestamp
      );
      results = tempThis.pastResultsByTimestamp.clone();

      console.log("num scores = ", scores.length);

      for (i = 0; i < scores.length; i++) {
        if (i < results.length) {
          results[i].push({ selectedScoreInPreview: scores[i] });
        } else {
          results.push([{ selectedScoreInPreview: scores[i] }]);
        }
      }

      var tempSeriesLine = {};

      for (i = 0; i < results.length; i++) {
        tempSeriesLine = { name: "Question " + (i + 1), data: [] };

        for (j = 0; j < results[i].length; j++) {
          tempSeriesLine.data.push(
            parseInt(results[i][j].selectedScoreInPreview)
          );
        }

        tempThis.heatmapSeries.push(tempSeriesLine);
        tempSeriesLine = {};
      }

      if (tempThis.heatmapSeries) {
        tempThis.heatmapLoaded = true;
      }
    },

    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options,
      });
    },

    generatePDF() {
      var pdfMake = require("pdfmake/build/pdfmake.js");
      var pdfFonts = require("pdfmake/build/vfs_fonts.js");
      pdfMake.vfs = pdfFonts.pdfMake.vfs;

      var summary1 = this.getSummary1();
      var summary2 = this.getSummary2();

      var temp = [];
      var summ1 = []; // for pdf
      var summ2 = [];
      var i = 0;
      for (i = 0; i < summary1.length; i++) {
        temp.push(summary1[i].questionCategory);
        temp.push(summary1[i].results);
        summ1.push(temp);
        temp = [];

        temp.push(summary2[i].applicationInformation);
        temp.push(summary2[i].results);
        summ2.push(temp);
        temp = [];
      }

      var docDefinition = {
        content: [
          { text: "Report preview", style: "header" },
          { text: "Screening Information", style: "subheader" },
          { text: "\n" },

          {
            table: {
              body: [
                ["Title", "Information"],
                ["Screening Date", "Example date"],
                ["Screening Time", "Example time"],
                ["Child's name", "Example name"],
                ["Date of Birth", "Example date of birth"],
                ["Age", "Example age"],
                ["Clinician's Name", "Example clinician name"],
                ["Teacher's name", "Example teacher name"],
                ["Screening Location", "Example screening location"],
                ["Grade", "Example grade"],
                ["Vision Test", "Example date (passed)"],
                ["Hearing Test", "Example date (passed)"],
              ],
            },
          },
          { text: "\n" },
          { image: this.lineChartImage, height: 400, width: 450 },
          { text: "\n" },
          { image: this.pieChartImage, height: 400, width: 450 },
          { text: "\n" },
          { image: this.radarChartImage, height: 400, width: 450 },
          { text: "\n" },
          { image: this.barChartImage, height: 400, width: 450 },
          { text: "\n" },

          { text: "Summary", style: "subheader" },
          {
            table: {
              body: summ1,
            },
          },
          { text: "\n" },
          {
            table: {
              body: summ2,
            },
          },
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10],
          },
          subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 10, 0, 5],
          },
          tableExample: {
            margin: [0, 5, 0, 15],
          },
          tableOpacityExample: {
            margin: [0, 5, 0, 15],
            fillColor: "blue",
            fillOpacity: 0.3,
          },
          tableHeader: {
            bold: true,
            fontSize: 13,
            color: "black",
          },
        },
      };

      var pdf = pdfMake.createPdf(docDefinition);
      pdf.open();
    },

    getScreeningInformation() {
      var screeningInformation = [];
      screeningInformation.push({
        title: "Screening Date",
        information: "Example date",
      });
      screeningInformation.push({
        title: "Screening Time",
        information: "Example time",
      });
      screeningInformation.push({
        title: "Child's Name",
        information: "Example name",
      });
      screeningInformation.push({
        title: "Date of Birth",
        information: "Example date of birth",
      });
      screeningInformation.push({
        title: "Age",
        information: "Example age",
      });
      screeningInformation.push({
        title: "Clinician's Name",
        information: "Example clinician name",
      });
      screeningInformation.push({
        title: "Teacher's Name",
        information: "Example teacher name",
      });
      screeningInformation.push({
        title: "Screening Location",
        information: "Example screening location",
      });
      screeningInformation.push({
        title: "Grade",
        information: "Example grade",
      });
      screeningInformation.push({
        title: "Vision Test",
        information: "Example date (passed)",
      });
      screeningInformation.push({
        title: "Hearing Test",
        information: "Example date (passed)",
      });
      return screeningInformation;
    },
    getDetail() {
      var detail = [];
      var detailItem;
      var previewScores = this.getPreviewScores();
      var i = 0;
      for (i = 0; i < this.application.questions.length; i++) {
        detailItem = {
          question:
            this.application.questions[i].number +
            ". " +
            this.application.questions[i].text +
            "<br/><small>Category: " +
            this.application.questions[i].category +
            "</small>" +
            "<br/><small>Question ID: " +
            this.application.questions[i].id +
            "</small>",
          answers:
            "<p>Child's answers: </p>" +
            this.getChildSelectedAnswers(this.application.questions[i]) +
            "<br/>Correct answers: " +
            this.getCorrectAnswers(this.application.questions[i]),
          scores: this.application.questions[i].selectedScoreInPreview,
          videoSlashAudio:
            "<p>Video clips: " +
            this.getVideos(this.application.questions[i]) +
            "</p><br/><p>Audio clips: " +
            this.getAudios(this.application.questions[i]) +
            "</p>",

          notes: this.application.questions[i].notes,

          PSlashR:
            this.application.questions[i].promptClicks +
            " / " +
            this.application.questions[i].repeatClicks,
          _rowVariant: "",
        };
        if (parseInt(previewScores[i]) >= 1) {
          detailItem._rowVariant = "success";
        } else {
          detailItem._rowVariant = "danger";
        }
        detail.push(detailItem);
      }
      return detail;
    },

    getDetailFirstTime() {
      var detail = [];
      var detailItem;
      var i = 0;
      for (i = 0; i < this.firstResults.length; i++) {
        console.log(this.firstResults[i]);

        detailItem = {
          question:
            this.firstResults[i].number +
            ". " +
            this.firstResults[i].questionText +
            "<br/><small>Category: " +
            this.firstResults[i].category +
            "</small>" +
            "<br/><small>Question ID: " +
            this.firstResults[i].questionID +
            "</small>",
          answers:
            "<p>Child's answers: </p>" +
            this.firstResults[i].childSelectedAnswerSingle
              ? this.firstResults[i].childSelectedAnswerSingle
              : this.firstResults[i].childSelectedAnswerMultiple +
                "<br/>Correct answers: " +
                "Not implemented yet for past question results",
          scores: this.firstResults[i].selectedScoreInPreview,
          videoSlashAudio:
            "<p>Video clips: " +
            "Not implemented yet for past question results" +
            "</p><br/><p>Audio clips: " +
            "Not implemented yet for past question results" +
            "</p>",

          notes: this.firstResults[i].notes,

          PSlashR:
            this.firstResults[i].promptClicks +
            " / " +
            this.firstResults[i].repeatClicks,
          _rowVariant: "",
        };
        if (parseInt(this.firstResults[i].selectedScoreInPreview) >= 1) {
          detailItem._rowVariant = "success";
        } else {
          detailItem._rowVariant = "danger";
        }
        detail.push(detailItem);
      }
      return detail;
    },

    getDetailLastTime() {
      var detail = [];
      var detailItem;
      var i = 0;
      for (i = 0; i < this.lastResults.length; i++) {
        detailItem = {
          question:
            this.lastResults[i].number +
            ". " +
            this.lastResults[i].questionText +
            "<br/><small>Category: " +
            this.lastResults[i].category +
            "</small>" +
            "<br/><small>Question ID: " +
            this.lastResults[i].questionID +
            "</small>",
          answers:
            "<p>Child's answers: </p>" +
            this.lastResults[i].childSelectedAnswerSingle
              ? this.lastResults[i].childSelectedAnswerSingle
              : this.lastResults[i].childSelectedAnswerMultiple +
                "<br/>Correct answers: " +
                "Not implemented yet for past question results",
          scores: this.lastResults[i].selectedScoreInPreview,
          videoSlashAudio:
            "<p>Video clips: " +
            "Not implemented yet for past question results" +
            "</p><br/><p>Audio clips: " +
            "Not implemented yet for past question results" +
            "</p>",

          notes: this.lastResults[i].notes,

          PSlashR:
            this.lastResults[i].promptClicks +
            " / " +
            this.lastResults[i].repeatClicks,
          _rowVariant: "",
        };
        if (parseInt(this.lastResults[i].selectedScoreInPreview) >= 1) {
          detailItem._rowVariant = "success";
        } else {
          detailItem._rowVariant = "danger";
        }
        detail.push(detailItem);
      }
      return detail;
    },

    getSummary1() {
      var categories = this.getUniqueQuestionCategories();
      var categoryScores = this.getCategoryScores();
      var summary = [];
      var summaryItem;
      var i = 0;
      for (i = 0; i < categories.length; i++) {
        summaryItem = {
          questionCategory: categories[i] + ":",
          results: Math.round(categoryScores[i]) + "% passed",
        };
        summary.push(summaryItem);
      }
      return summary;
    },
    getSummary2() {
      var previewScores = this.getPreviewScores();
      var passed = 0;
      var summary = [];
      var i = 0;
      for (i = 0; i < this.application.questions.length; i++) {
        if (parseInt(previewScores[i]) >= 1) {
          passed++;
        }
      }
      summary.push({
        applicationInformation: "Total score:",
        results:
          passed + " of " + this.application.questions.length + " passed",
      });
      summary.push({
        applicationInformation: "Total percentage:",
        results:
          Math.round((passed / this.application.questions.length) * 100) +
          "% passed",
      });
      summary.push({
        applicationInformation: "Question(s) not answered:",
        results:
          this.application.questions.length -
          previewScores.length +
          " of " +
          this.application.questions.length +
          " questions unanswered.",
      });
      summary.push({
        applicationInformation: "Tested age range:",
        results: this.getAgeRanges()[0] + " - " + this.getAgeRanges()[1],
      });
      summary.push({
        applicationInformation: "Duration:",
        results: "Example time: 30 minutes 6 seconds",
      });
      summary.push({
        applicationInformation: "Time limit:",
        results: "" + this.application.maxAndMin[1] + " minutes",
      });
      summary.push({
        applicationInformation: "Mean:",
        results: "" + this.mean(),
      });
      summary.push({
        applicationInformation: "Median:",
        results: "" + this.median(),
      });

      console.log(summary);
      return summary;
    },

    mean() {
      var scores = this.getPreviewScores();

      var i = 0;
      var sum = 0;

      for (i = 0; i < scores.length; i++) {
        sum = sum + parseInt(scores[i]);
      }

      console.log(scores);
      console.log(sum);

      sum = sum / scores.length;
    },

    median() {
      var values = this.getPreviewScores();
      if (values.length === 0) throw new Error("No inputs");

      values.sort(function(a, b) {
        return a - b;
      });

      var half = Math.floor(values.length / 2);

      if (values.length % 2) return values[half];

      return (values[half - 1] + values[half]) / 2.0;
    },

    getNonUniqueQuestionCategories() {
      var categoryArray = [];
      var category = "";
      var i = 0;
      for (i = 0; i < this.application.questions.length; i++) {
        category = this.application.questions[i].category;
        categoryArray.push(category);
      }
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
      return uniqueCategories;
    },

    getCategoryScoresChart() {
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

      return categoryScores;
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
        for (j = 0; j < categories.length; j++) {
          if (questionCategory == categories[j]) {
            if (categoryScores[j] != null) {
              if (isNaN(questionScore)) {
                categoryScores[j] += 0;
              } else {
                if (questionScore >= 1) categoryScores[j] += 1;
              }
              categoryCounts[j] += 1;
              break;
            } else {
              if (isNaN(questionScore)) {
                categoryScores.push(0);
              } else {
                if (questionScore >= 1) categoryScores.push(1);
              }
              categoryCounts.push(1);
            }
          }
        }
      }
      for (i = 0; i < categoryScores.length; i++) {
        categoryScores[i] = (categoryScores[i] / categoryCounts[i]) * 100;
      }
      return categoryScores;
    },
    getQuestionTitles() {
      var titleArray = [];
      var title = "";
      var i = 0;
      for (i = 0; i < this.application.questions.length; i++) {
        title = "Question " + this.application.questions[i].number;
        titleArray.push(title);
      }
      return titleArray;
    },
    getPreviewScores() {
      var scores = [];
      var score = 0;
      var i = 0;
      for (i = 0; i < this.application.questions.length; i++) {
        score = parseInt(this.application.questions[i].selectedScoreInPreview);
        if (!isNaN(score) || score == "") {
          if (score == "") {
            scores.push(0);
          } else {
            scores.push(score);
          }
        }
      }

      return scores;
    },

    getVideos(tempQuestion) {
      var tempString = "";
      var j = 0;

      tempString = "";

      for (j = 0; j < tempQuestion.videoClips.length; j++) {
        tempString =
          tempString +
          "<a download='video-file' href='" +
          tempQuestion.videoClips[j] +
          "'>Video clip " +
          j +
          ", " +
          "</a>";
      }

      return tempString;
    },

    getAudios(tempQuestion) {
      var tempString = "";
      var j = 0;

      tempString = "";

      for (j = 0; j < tempQuestion.audioClips.length; j++) {
        tempString =
          tempString +
          "<a download='audio-file' href='" +
          tempQuestion.audioClips[j] +
          "'>Audio clip " +
          j +
          ", </a>";
      }

      return tempString;
    },

    showChildRatingModal() {
      this.$modal.show("childRating");
    },
    onChildRatingModalClose() {
      this.$modal.hide("childRating");
    },
    getAgeRanges() {
      var ageRanges = [];
      var i = 0;
      var minAndMax = [];
      for (i = 0; i < this.application.questions.length; i++) {
        ageRanges.push(this.application.questions[i].absoluteRange[0]);
        ageRanges.push(this.application.questions[i].absoluteRange[1]);
      }
      minAndMax.push(
        ageRanges.reduce(function(a, b) {
          return Math.min(a, b);
        })
      );
      minAndMax.push(
        ageRanges.reduce(function(a, b) {
          return Math.max(a, b);
        })
      );
      return minAndMax;
    },
    getChildSelectedAnswers(question) {
      var i = 0;
      var multipleAnswerString = "";
      if (question.questionType == "Single answer") {
        return question.childSelectedAnswerSingle;
      } else {
        for (i = 0; i < question.childSelectedAnswerMultiple.length; i++) {
          if (i > 0) {
            multipleAnswerString =
              multipleAnswerString +
              ", " +
              question.childSelectedAnswerMultiple[i];
          } else {
            multipleAnswerString = question.childSelectedAnswerMultiple[i];
          }
        }
        return multipleAnswerString;
      }
    },

    getCorrectAnswers(question) {
      var i = 0;
      var multipleAnswerString = "";
      if (question.questionType == "Single answer") {
        return question.singleCorrectAnswer;
      } else {
        for (i = 0; i < question.multipleCorrectAnswers.length; i++) {
          if (i > 0) {
            multipleAnswerString =
              multipleAnswerString + ", " + question.multipleCorrectAnswers[i];
          } else {
            multipleAnswerString = question.multipleCorrectAnswers[i];
          }
        }
        return multipleAnswerString;
      }
    },

    getReportColorTheme() {
      if (this.application.reportColorTheme == "Yellow") {
        return "#ffcc66";
      } else if (this.application.reportColorTheme == 1) {
        return "#ff6666";
      } else if (this.application.reportColorTheme == 2) {
        return "#66ccff";
      } else if (this.application.reportColorTheme == 3) {
        return "#66ff99";
      }

      return "#ffcc66";
    },
  },
};
</script>

<style scoped>
#fontDiv {
  font-family: "Lexia";
}

@font-face {
  font-family: "Lexia";
  src: url(../assets/fonts/lexia.ttf) format("truetype");
}

.returnToPreviewButton {
  background-color: #ff930f;
  color: #ff930f;
  border-color: #ff930f;
  margin-right: 20px;
}
.returnToPreviewButton:hover {
  background-color: #ff930f;
  color: #ff930f;
  border-color: #ff930f;
}
.returnToPreviewButton:active {
  background-color: #ff930f;
  color: #ff930f;
  border-color: #ff930f;
}
.returnToPreviewButton:focus {
  background-color: #ff930f;
  color: #ff930f;
  border-color: #ff930f;
}
</style>
