<template>
  <CChartBar
    :datasets="defaultDatasets"
    :options="defaultOptions"
    :labels="dataAverages.names"
  />
</template>

<script>
import { CChartBar } from '@coreui/vue-chartjs'
//import { getStyle } from '@coreui/utils/src'


export default {
  name: 'TopChart',
  components: {
    CChartBar
  },
  props: {
    dataAverages: Object,
    dataStdDev: Object,
    dataSkew: Object,
    dataKurtosis: Object,
    type: String,
    median: Number
  },
  data: function(){
    return{
    }
  },
  computed: {
    defaultDatasets () {
      //const brandSuccess = getStyle('warning') || '#ffc107'
      //const brandInfo = getStyle('info') || '#20a8d8'
      //const brandDanger = getStyle('danger') || '#f86c6b'
      //const brandPrimary = getStyle('primary') || '#000000'
      var dataObject = this.dataAverages;
      if (this.type === "Average"){
        dataObject = this.dataAverages;
      }
      else if (this.type === "Standard Deviation"){
        dataObject = this.dataStdDev;
      }
      else if (this.type === "Skewness"){
        dataObject = this.dataSkew;
      }
      else if (this.type === "Kurtosis"){
        dataObject = this.dataKurtosis;
      }
      var lineData = [];
      for (let i = 0; i < dataObject.values.length; i++){
        lineData.push(this.median);
      }
      var retArray = [];
      if (this.type === "Average"){
        retArray.push({
            type: 'line',
            borderColor: "#000000",
            borderWidth: 5,
            label: "Median",
            data: lineData

          })
      }
        retArray.push({
          backgroundColor: ["#ffc1ff", "#2005ff", "#f86c6b", "#25FF00", "#ffc1ff", "#2005ff", "#f86c6b", "#25FF00"],
          borderColor: "#000000",
          pointHoverBackgroundColor: ["#ffc1ff", "#2005ff", "#f86c6b", "#25FF00", "#ffc1ff", "#2005ff", "#f86c6b", "#25FF00"],
          borderWidth: 2,
          data: dataObject.values
        });
        
      
      return retArray;
    },
    defaultOptions () {
      return {

        maintainAspectRatio: false,
        legend: {
          display: false
        },
        labels: {
            display: false
        },
        scales: {
          xAxes: [{
            gridLines: {
              drawOnChartArea: false
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              display: true
            },
            gridLines: {
              display: true
            }
          }]
        
        }
      }
    }
  }
}
</script>
