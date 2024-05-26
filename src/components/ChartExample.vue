<template>
  <CChartLine
    :datasets="defaultDatasets"
    :options="defaultOptions"
    :labels="['Past Year', 'Same Month Last Year', 'Last Month', 'Current']"/>
</template>

<script>
import { CChartLine } from '@coreui/vue-chartjs'
import { getStyle } from '@coreui/utils/src'


export default {
  name: 'ChartExample',
  components: {
    CChartLine
  },
  props: {
    dataObject: Object,
    type: String
  },
  data: function(){
    return{
      avgObject: {},
      avgAssessmentNames: ['AverageAssessmentPastYear', 'AverageAssessmentSameMonthLastYear', 'AverageAssessmentLastMonth', 'AverageAssessment'],
      avgInterventionNames: ['AverageInterventionPastYear', 'AverageInterventionSameMonthLastYear', 'AverageInterventionLastMonth', 'AverageIntervention'],
      stdDevAssessmentNames: ['StdDevAssessmentPastYear', 'StdDevAssessmentSameMonthLastYear', 'StdDevAssessmentLastMonth', 'StdDevAssessment'],
      stdDevInterventionNames: ['StdDevInterventionPastYear', 'StdDevInterventionSameMonthLastYear', 'StdDevInterventionLastMonth', 'StdDevIntervention'],
      skewAssessmentNames: ['SkewAssessmentPastYear', 'SkewAssessmentSameMonthLastYear', 'SkewAssessmentLastMonth', 'SkewAssessment'],
      skewInterventionNames: ['SkewInterventionPastYear', 'SkewInterventionSameMonthLastYear', 'SkewInterventionLastMonth', 'SkewIntervention'],
      kurtosisAssessmentNames: ['KurtosisAssessmentPastYear', 'KurtosisAssessmentSameMonthLastYear', 'KurtosisAssessmentLastMonth', 'KurtosisAssessment'],
      kurtosisInterventionNames: ['KurtosisInterventionPastYear', 'KurtosisInterventionSameMonthLastYear', 'KurtosisInterventionLastMonth', 'KurtosisIntervention']
    }
  },
  beforeMount(){
    this.avgObject = this.dataObject;
  },
  computed: {
    defaultDatasets () {
      const brandSuccess = getStyle('warning') || '#ffc107'
      const brandInfo = getStyle('info') || '#20a8d8'
      const brandDanger = getStyle('danger') || '#f86c6b'
      const brandPrimary = getStyle('primary') || '#000000'

      var data1;
      var data2;
      var data3;
      var data4;
      if (this.type === "Average"){
        let elements = 4
        data1 = []
        data2 = []
        data3 = [this.avgObject.AverageAssessment]
        data4 = [this.avgObject.AverageIntervention-6]

        for (let i = 0; i < elements; i++) {
          data1.push(this.avgObject[this.avgAssessmentNames[i]])
          data2.push(this.avgObject[this.avgInterventionNames[i]]+10)
          data3.push(this.avgObject.AverageAssessment)
          data4.push(this.avgObject.AverageIntervention-6)
        }
      }
      else if (this.type === "Standard Deviation"){
        let elements = 4
        data1 = []
        data2 = []
        data3 = [this.avgObject.StdDevAssessment]
        data4 = [this.avgObject.StdDevIntervention-6]

        for (let i = 0; i < elements; i++) {
          data1.push(this.avgObject[this.stdDevAssessmentNames[i]])
          data2.push(this.avgObject[this.stdDevInterventionNames[i]]+10)
          data3.push(this.avgObject.StdDevAssessment)
          data4.push(this.avgObject.StdDevIntervention-6)
        }
      }
      else if (this.type === "Skewness"){
        let elements = 4
        data1 = []
        data2 = []
        data3 = [this.avgObject.SkewAssessment]
        data4 = [this.avgObject.SkewIntervention-6]

        for (let i = 0; i < elements; i++) {
          data1.push(this.avgObject[this.skewAssessmentNames[i]])
          data2.push(this.avgObject[this.skewInterventionNames[i]]+10)
          data3.push(this.avgObject.SkewAssessment)
          data4.push(this.avgObject.SkewIntervention-6)
        }
      }
      else if (this.type === "Kurtosis"){
        let elements = 4
        data1 = []
        data2 = []
        data3 = [this.avgObject.KurtosisAssessment]
        data4 = [this.avgObject.KurtosisIntervention-6]

        for (let i = 0; i < elements; i++) {
          data1.push(this.avgObject[this.kurtosisAssessmentNames[i]])
          data2.push(this.avgObject[this.kurtosisInterventionNames[i]]+10)
          data3.push(this.avgObject.KurtosisAssessment)
          data4.push(this.avgObject.KurtosisIntervention-6)
        }
      }
      
      return [
        {
          label: 'Assessment',
          backgroundColor: 'transparent',
          borderColor: brandInfo,
          pointHoverBackgroundColor: brandInfo,
          borderWidth: 2,
          data: data1
        },
        {
          label: 'Intervention',
          backgroundColor: 'transparent',
          borderColor: brandSuccess,
          pointHoverBackgroundColor: brandSuccess,
          borderWidth: 2,
          data: data2
        },
        {
          label: 'Assessment Baseline',
          backgroundColor: 'transparent',
          borderColor: brandDanger,
          pointHoverBackgroundColor: brandDanger,
          borderWidth: 1,
          borderDash: [8, 5],
          data: data3
        },
        {
          label: 'Intervention Baseline',
          backgroundColor: 'transparent',
          borderColor: brandPrimary,
          pointHoverBackgroundColor: brandPrimary,
          borderWidth: 1,
          borderDash: [8, 5],
          data: data4
        }
      ]
    },
    defaultOptions () {
      return {

        maintainAspectRatio: false,
        legend: {
          display: true
        },
        scales: {
          xAxes: [{
            gridLines: {
              drawOnChartArea: true
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true
            }
          }]
        },
        elements: {
          point: {
            radius: 5,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3
          }
        }
      }
    }
  }
}
</script>
