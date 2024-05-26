<template>
  <div class="specialistDashboard" :style="getColorCSS('background', bgColor)">
    <Header />
    <CContainer>
    <CRow>
      <a v-on:click="toSpecialist()">Main Menu</a> > Dashboard
    </CRow>
    <CRow>
      <CCol lg="4">
        <CCard id="card" >
          <CCardBody align="left" color="success">
          <h4>Screening/Mini Test</h4>
          <p>{{ averageList.AverageScreening }} Average</p>
          <CDropdown :toggler-text="screeningType">
                            <CDropdownItem @click="screeningType='Average'">Average</CDropdownItem>
                            <CDropdownItem @click="screeningType='Standard Deviation'">Standard Deviation</CDropdownItem>
                            <CDropdownItem @click="screeningType='Skewness'">Skewness</CDropdownItem>
                            <CDropdownItem @click="screeningType='Kurtosis'">Kurtosis</CDropdownItem>
                        </CDropdown>
          <br>
          <TopChart id="topCardChart" :dataAverages="screeningAverages" :dataStdDev="screeningStdDev" :dataSkew="screeningSkew" :dataKurtosis="screeningKurtosis" :type="screeningType" :median="averageList.ScreeningMedian"/>
          </CCardBody>
          <div>
          </div>
        </CCard>
      </CCol>
      <CCol lg="4">
        <CCard id="card">
          <CCardBody align="left" color="info">
          <h4>Assessment</h4>
          <p>{{ averageList.AverageAssessment}} Average</p>
          <CDropdown :toggler-text="assessmentType">
                            <CDropdownItem @click="assessmentType='Average'">Average</CDropdownItem>
                            <CDropdownItem @click="assessmentType='Standard Deviation'">Standard Deviation</CDropdownItem>
                            <CDropdownItem @click="assessmentType='Skewness'">Skewness</CDropdownItem>
                            <CDropdownItem @click="assessmentType='Kurtosis'">Kurtosis</CDropdownItem>
                        </CDropdown>
          <br>
          <TopChart id="topCardChart" :dataAverages="assessmentAverages" :dataStdDev="assessmentStdDev" :dataSkew="assessmentSkew" :dataKurtosis="assessmentKurtosis" :type="assessmentType" :median="averageList.AssessmentMedian"/>
          </CCardBody>
          <div/>
        </CCard>
      </CCol>
      <CCol  lg="4">
        <CCard id="card">
          <CCardBody align="left" color="warning">
          <h4>Intervention</h4>
          <p>{{ averageList.AverageIntervention}} Average</p>
          <CDropdown :toggler-text="interventionType">
                            <CDropdownItem @click="interventionType='Average'">Average</CDropdownItem>
                            <CDropdownItem @click="interventionType='Standard Deviation'">Standard Deviation</CDropdownItem>
                            <CDropdownItem @click="interventionType='Skewness'">Skewness</CDropdownItem>
                            <CDropdownItem @click="interventionType='Kurtosis'">Kurtosis</CDropdownItem>
                        </CDropdown>
          <br>
          <TopChart id="topCardChart" :dataAverages="interventionAverages" :dataStdDev="interventionStdDev" :dataSkew="interventionSkew" :dataKurtosis="interventionKurtosis" :type="interventionType" :median="averageList.InterventionMedian"/>
          </CCardBody>
         </CCard>
      </CCol>
    </CRow>
    <CRow>
      <CCol  lg="6">
        <CCard id="card">
          <CCardBody align="left" color="light">
          <h4>Change compared to last month</h4>
          <p>{{ averageList.AverageLastMonth}} Average</p>
          <CDropdown :toggler-text="lastMonthType">
                            <CDropdownItem @click="lastMonthType='Average'">Average</CDropdownItem>
                            <CDropdownItem @click="lastMonthType='Standard Deviation'">Standard Deviation</CDropdownItem>
                            <CDropdownItem @click="lastMonthType='Skewness'">Skewness</CDropdownItem>
                            <CDropdownItem @click="lastMonthType='Kurtosis'">Kurtosis</CDropdownItem>
                        </CDropdown>
          <br>
          <TopChart id="topCardChart" :dataAverages="lastMonthAverages" :dataStdDev="lastMonthStdDev" :dataSkew="lastMonthSkew" :dataKurtosis="lastMonthKurtosis" :type="lastMonthType" :median="averageList.MedianLastMonth"/>
          <br>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol lg="6">
        <CCard id="card">
          <CCardBody align="left" color="light">
          <h4>Change compared to the same month of last year</h4>
          <p>{{ averageList.AverageSameMonthLastYear}} Average</p>
          <CDropdown :toggler-text="lastYearType">
                            <CDropdownItem @click="lastYearType='Average'">Average</CDropdownItem>
                            <CDropdownItem @click="lastYearType='Standard Deviation'">Standard Deviation</CDropdownItem>
                            <CDropdownItem @click="lastYearType='Skewness'">Skewness</CDropdownItem>
                            <CDropdownItem @click="lastYearType='Kurtosis'">Kurtosis</CDropdownItem>
                        </CDropdown>
          <TopChart id="topCardChart" :dataAverages="lastYearAverages" :dataStdDev="lastYearStdDev" :dataSkew="lastYearSkew" :dataKurtosis="lastYearKurtosis" :type="lastYearType" :median="averageList.MedianSameMonthLastYear"/>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <CCard v-if="studentList.length > 0">
      <CCardBody color="light">
        <CRow >
          <h4 class="card-title mb-0">Children's Improvement</h4>
          <CDropdown :toggler-text="type">
                            <CDropdownItem @click="type='Average'">Average</CDropdownItem>
                            <CDropdownItem @click="type='Standard Deviation'">Standard Deviation</CDropdownItem>
                            <CDropdownItem @click="type='Skewness'">Skewness</CDropdownItem>
                            <CDropdownItem @click="type='Kurtosis'">Kurtosis</CDropdownItem>
                        </CDropdown>
        </CRow>
        <ChartExample :dataObject="averageList" :type="type" style="height:300px;margin-top:40px;"/>
      </CCardBody>
    </CCard>
    <CCard color="light">
      
      <CCardBody>
        <SpecialistTable v-bind:students="studentList" v-bind:teachers="oldAverageList" v-bind:filters="filters"
        v-bind:filterQuery="filterQuery" 
        v-on:update-students="updateStudents"/>
      </CCardBody>
    </CCard>
    </CContainer>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import SpecialistTable from '@/components/SpecialistTable.vue'
import ChartExample from '@/components/ChartExample.vue'
import TopChart from '@/components/TopChart.vue'
import instance from "../axios.js"
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

const {
  makeAveragesfromList,
  makeStdDevfromList,
  makeSkewfromList,
  makeKurtosisfromList,
  makeSingleAverage, 
  makeSingleStdDev, 
  makeSingleSkew, 
  makeSingleKurtosis,
  getMedian} = require('@/helpers/AverageMaker.js');
//import { CChartBar } from '@coreui/vue-chartjs'

export default {
  name: 'SpecialistDashboard',
  components: {
    SpecialistTable,
    ChartExample,
    TopChart,
    Header,
    Footer
  },
  data: function(){ 
    return{
      studentList: [],
      averageList: {},
      oldAverageList: [],
      screeningAverages: [],
      assessmentAverages: [],
      interventionAverages: [],
      lastMonthAverages: [],
      lastYearAverages: [],
      screeningStdDev: [],
      assessmentStdDev: [],
      interventionStdDev: [],
      lastMonthStdDev: [],
      lastYearStdDev: [],
      screeningSkew: [],
      assessmentSkew: [],
      interventionSkew: [],
      lastMonthSkew: [],
      lastYearSkew: [],
      screeningKurtosis: [],
      assessmentKurtosis: [],
      interventionKurtosis: [],
      lastMonthKurtosis: [],
      lastYearKurtosis: [],
      screeningType: "Average",
      assessmentType: "Average",
      interventionType: "Average",
      lastMonthType: "Average",
      lastYearType: "Average",
      bgColor: "light",
      screeningLabels: ["SLPS2", "OTS2", "RSPS2", "PsyS2"],
      assessmentLabels: ["NLL-A", "NLR-A", "NLM-A", "NLC-A"],
      interventionLabels: ["NLL-I", "NLR-I", "NLM-I", "NLC-I"],
      type: "Average",
      filters: {}
    }
  },
  async created() {
    //this.studentList = await this.getData('http://localhost:3000/subjects');
        this.studentList = await this.getData('http://localhost:8080/api/specialist/data');
        this.screeningAverages = makeAveragesfromList(this.studentList, this.screeningLabels, this.screeningLabels);
        this.assessmentAverages = makeAveragesfromList(this.studentList, this.assessmentLabels, this.assessmentLabels)
        this.interventionAverages = makeAveragesfromList(this.studentList, this.interventionLabels, this.interventionLabels)
        this.lastMonthAverages = makeAveragesfromList(this.studentList, this.getLastMonthArray(this.interventionLabels.concat(this.assessmentLabels)),this.interventionLabels.concat(this.assessmentLabels));
        this.lastYearAverages = makeAveragesfromList(this.studentList, this.getSameMonthLastYearArray(this.interventionLabels.concat(this.assessmentLabels)),this.interventionLabels.concat(this.assessmentLabels));
        this.screeningStdDev = makeStdDevfromList(this.studentList, this.screeningLabels, this.screeningLabels);
        this.assessmentStdDev = makeStdDevfromList(this.studentList, this.assessmentLabels, this.assessmentLabels)
        this.interventionStdDev = makeStdDevfromList(this.studentList, this.interventionLabels, this.interventionLabels)
        this.lastMonthStdDev = makeStdDevfromList(this.studentList, this.getLastMonthArray(this.interventionLabels.concat(this.assessmentLabels)),this.interventionLabels.concat(this.assessmentLabels));
        this.lastYearStdDev = makeStdDevfromList(this.studentList, this.getSameMonthLastYearArray(this.interventionLabels.concat(this.assessmentLabels)),this.interventionLabels.concat(this.assessmentLabels));
        this.screeningSkew = makeSkewfromList(this.studentList, this.screeningLabels, this.screeningLabels);
        this.assessmentSkew = makeSkewfromList(this.studentList, this.assessmentLabels, this.assessmentLabels)
        this.interventionSkew = makeSkewfromList(this.studentList, this.interventionLabels, this.interventionLabels)
        this.lastMonthSkew = makeSkewfromList(this.studentList, this.getLastMonthArray(this.interventionLabels.concat(this.assessmentLabels)),this.interventionLabels.concat(this.assessmentLabels));
        this.lastYearSkew = makeSkewfromList(this.studentList, this.getSameMonthLastYearArray(this.interventionLabels.concat(this.assessmentLabels)),this.interventionLabels.concat(this.assessmentLabels));
        this.screeningKurtosis = makeKurtosisfromList(this.studentList, this.screeningLabels, this.screeningLabels);
        this.assessmentKurtosis = makeKurtosisfromList(this.studentList, this.assessmentLabels, this.assessmentLabels)
        this.interventionKurtosis = makeKurtosisfromList(this.studentList, this.interventionLabels, this.interventionLabels)
        this.lastMonthKurtosis = makeKurtosisfromList(this.studentList, this.getLastMonthArray(this.interventionLabels.concat(this.assessmentLabels)),this.interventionLabels.concat(this.assessmentLabels));
        this.lastYearKurtosis = makeKurtosisfromList(this.studentList, this.getSameMonthLastYearArray(this.interventionLabels.concat(this.assessmentLabels)),this.interventionLabels.concat(this.assessmentLabels));


        this.averageList.AverageScreening = makeSingleAverage(this.studentList, this.screeningLabels);
        this.averageList.AverageAssessment = makeSingleAverage(this.studentList, ["NLL-A", "NLR-A", "NLM-A", "NLC-A"]);
        this.averageList.AverageIntervention = makeSingleAverage(this.studentList, ["NLL-I", "NLR-I", "NLM-I", "NLC-I"]);

        this.averageList.ScreeningMedian = getMedian(this.studentList, this.screeningLabels);
        this.averageList.AssessmentMedian = getMedian(this.studentList, ["NLL-A", "NLR-A", "NLM-A", "NLC-A"]);
        this.averageList.InterventionMedian = getMedian(this.studentList, ["NLL-I", "NLR-I", "NLM-I", "NLC-I"]);

        this.averageList.AverageSameMonthLastYear = makeSingleAverage(this.studentList, this.getSameMonthLastYearArray(this.interventionLabels.concat(this.assessmentLabels)));
        this.averageList.AverageLastMonth = makeSingleAverage(this.studentList, this.getLastMonthArray(this.interventionLabels.concat(this.assessmentLabels)));
        this.averageList.AverageInterventionLastMonth = makeSingleAverage(this.studentList, this.getLastMonthArray(this.interventionLabels));
        this.averageList.AverageInterventionSameMonthLastYear = makeSingleAverage(this.studentList, this.getSameMonthLastYearArray(this.interventionLabels));
        this.averageList.AverageInterventionPastYear = makeSingleAverage(this.studentList, this.getPastYearArray(this.interventionLabels));

        this.averageList.AverageAssessmentLastMonth = makeSingleAverage(this.studentList, this.getLastMonthArray(this.assessmentLabels));
        this.averageList.AverageAssessmentSameMonthLastYear = makeSingleAverage(this.studentList, this.getSameMonthLastYearArray(this.assessmentLabels));
        this.averageList.AverageAssessmentPastYear = makeSingleAverage(this.studentList, this.getPastYearArray(this.assessmentLabels));

        this.averageList.MedianLastMonth = getMedian(this.studentList, this.getLastMonthArray(this.interventionLabels.concat(this.assessmentLabels)));
        this.averageList.MedianSameMonthLastYear = getMedian(this.studentList, this.getSameMonthLastYearArray(this.interventionLabels.concat(this.assessmentLabels)));this.averageList.MedianAssessmentPastYear = getMedian(this.studentList, this.getPastYearArray(this.assessmentLabels));

        this.averageList.StdDevInterventionLastMonth = makeSingleStdDev(this.studentList, this.getLastMonthArray(this.interventionLabels));
        this.averageList.StdDevInterventionSameMonthLastYear = makeSingleStdDev(this.studentList, this.getSameMonthLastYearArray(this.interventionLabels));
        this.averageList.StdDevInterventionPastYear = makeSingleStdDev(this.studentList, this.getPastYearArray(this.interventionLabels));
        
        this.averageList.StdDevAssessmentLastMonth = makeSingleStdDev(this.studentList, this.getLastMonthArray(this.assessmentLabels));
        this.averageList.StdDevAssessmentSameMonthLastYear = makeSingleStdDev(this.studentList, this.getSameMonthLastYearArray(this.assessmentLabels));
        this.averageList.StdDevAssessmentPastYear = makeSingleStdDev(this.studentList, this.getPastYearArray(this.assessmentLabels));
		
        this.averageList.StdDevAssessment = makeSingleStdDev(this.studentList, ["NLL-A", "NLR-A", "NLM-A", "NLC-A"]);
        this.averageList.StdDevIntervention = makeSingleStdDev(this.studentList, ["NLL-I", "NLR-I", "NLM-I", "NLC-I"]);

        this.averageList.SkewInterventionLastMonth = makeSingleSkew(this.studentList, this.getLastMonthArray(this.interventionLabels));
        this.averageList.SkewInterventionSameMonthLastYear = makeSingleSkew(this.studentList, this.getSameMonthLastYearArray(this.interventionLabels));
        this.averageList.SkewInterventionPastYear = makeSingleSkew(this.studentList, this.getPastYearArray(this.interventionLabels));

        this.averageList.SkewAssessmentLastMonth = makeSingleSkew(this.studentList, this.getLastMonthArray(this.assessmentLabels));
        this.averageList.SkewAssessmentSameMonthLastYear = makeSingleSkew(this.studentList, this.getSameMonthLastYearArray(this.assessmentLabels));
        this.averageList.SkewAssessmentPastYear = makeSingleSkew(this.studentList, this.getPastYearArray(this.assessmentLabels));
    
        this.averageList.SkewAssessment = makeSingleSkew(this.studentList, ["NLL-A", "NLR-A", "NLM-A", "NLC-A"]);
        this.averageList.SkewIntervention = makeSingleSkew(this.studentList, ["NLL-I", "NLR-I", "NLM-I", "NLC-I"]);

        this.averageList.KurtosisInterventionLastMonth = makeSingleKurtosis(this.studentList, this.getLastMonthArray(this.interventionLabels));
        this.averageList.KurtosisInterventionSameMonthLastYear = makeSingleKurtosis(this.studentList, this.getSameMonthLastYearArray(this.interventionLabels));
        this.averageList.KurtosisInterventionPastYear = makeSingleKurtosis(this.studentList, this.getPastYearArray(this.interventionLabels));

        this.averageList.KurtosisAssessmentLastMonth = makeSingleKurtosis(this.studentList, this.getLastMonthArray(this.assessmentLabels));
        this.averageList.KurtosisAssessmentSameMonthLastYear = makeSingleKurtosis(this.studentList, this.getSameMonthLastYearArray(this.assessmentLabels));
        this.averageList.KurtosisAssessmentPastYear = makeSingleKurtosis(this.studentList, this.getPastYearArray(this.assessmentLabels));
        this.averageList.KurtosisAssessment = makeSingleKurtosis(this.studentList, ["NLL-A", "NLR-A", "NLM-A", "NLC-A"]);
        this.averageList.KurtosisIntervention = makeSingleKurtosis(this.studentList, ["NLL-I", "NLR-I", "NLM-I", "NLC-I"]);
        //this.averageList.AverageAssessmentBaseline = makeSingleAverage(this.studentList, ["NLL-A", "NLR-A", "NLM-A", "NLC-A"]);
        //this.averageList.AverageInterventionBaseline = makeSingleAverage(this.studentList, ["NLL-I", "NLR-I", "NLM-I", "NLC-I"]);
      
      this.filters = this.$route.params.filters;
    
    
  },
  methods: {
    updateStudents(students){
      this.studentList = students;
    },
    toSpecialist(){
      this.$router.push({name: "Specialist"});
    },
    reverseColorCSS(styleString, colorString){
            if (colorString === 'light'){
                return styleString + "black";
            }
            else{
                return styleString + "white";
            }
        },
      getColorCSS(styleString, colorString){
            if (colorString === 'light'){
                return styleString + ": white";
            }
            else{
                return styleString + ": black";
            }
      },
      getData(url){
        return new Promise(function (resolve, reject){
          instance.get(url).then(response => {
            var data = response.data;
            resolve(data);
          }, (error) => {
            reject(error);
          })
        })
      },

      getLastMonthArray(labelArray){
        var retArray = [];
        
        for (var i = 0; i < labelArray.length; i++){
          retArray.push(labelArray[i] + " Change compared to last month");
        }
        
        return retArray;
      },
      getSameMonthLastYearArray(labelArray){
        var retArray = [];
        
        for (var i = 0; i < labelArray.length; i++){
          retArray.push(labelArray[i] + " Change compared to same month last year");
        }
        
        return retArray;
      },
      getPastYearArray(labelArray){
        var retArray = [];
        
        for (var i = 0; i < labelArray.length; i++){
          retArray.push(labelArray[i] + " Average change for the past year");
        }
        
        return retArray;
      }
  },
  computed: {
    interventionLastMonthScoreLabels(){
      var retArray = [];
      for (var i = 0; i < this.interventionLabels.length; i++){
        retArray.push(this.interventionLabels[i] + " baseline score");
      }
      return retArray;
    },
    interventionLastMonthDateLabels(){
      var retArray = [];
      for (var i = 0; i < this.interventionLabels.length; i++){
        retArray.push(this.interventionLabels[i] + " baseline date");
      }
      return retArray;
     },
    assessmentLastMonthScoreLabels(){
        var retArray = [];
        for (var i = 0; i < this.assessmentLabels.length; i++){
          retArray.push(this.assessmentLabels[i] + " baseline score");
        }
        return retArray;
    },
    assessmentLastMonthDateLabels(){
      var retArray = [];
      for (var i = 0; i < this.assessmentLabels.length; i++){
        retArray.push(this.assessmentLabels[i] + " baseline date");
      }
      return retArray;
  }},



}
</script>

<style scoped>
  #card{
    height: 400px
  }
  #topCardChart{
    height: 200px;
    margin-bottom: 0px;
  }

</style>