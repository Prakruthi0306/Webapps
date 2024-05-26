<template>
    <CContainer>
    <CRow>
        <CCol class="col-6">
            <CCard borderColor="success">
                <CCardBody :color="bgColor">
                    <CRow>
                        <h4 @click="screeningLarge = !screeningLarge" :style='reverseColorCSS(bgColor)' class="text-left card-title mb-0 col-10">Screening/Mini Test</h4>
                        <CDropdown class='col-3' :color="reverseColor(bgColor)" toggler-text="Change Data">
                            <CDropdownItem @click="timeStringS=''">Current</CDropdownItem>
                            <CDropdownItem @click="timeStringS=' Baseline score'">Baseline</CDropdownItem>
                        </CDropdown>
                        <div class='col-3'>
                        <CButton  :color="reverseColor(bgColor)" @click="screeningLarge = !screeningLarge">Enlarge</CButton>
                        </div>
                    </CRow>
                    <CChartBar style="height:1000px" :datasets="getScreeningData(screeningDataLabels, timeStringS)" 
                        :options="{ 
                            maintainAspectRatio: false, 
                            scales: {
                                yAxes: [{
                                display: true,
                                ticks: {
                                    suggestedMin: 0,
                                    suggestedMax: 100,
                                    beginAtZero: true 
                                }
                                }]
                            }
                        }"
                    :labels="screeningDataLabels"/>
                    <p>{{ timeStringS }}</p>
                </CCardBody>
            </CCard>
        </CCol>
        <CModal
        title = "Screening"
        color = "success"
        :show.sync="screeningLarge"
        size = "lg"
        >
        <CRow>
        <CDropdown :color="reverseColor(bgColor)" toggler-text="Change Data">
                            <CDropdownItem @click="timeStringS=''">Current</CDropdownItem>
                            <CDropdownItem @click="timeStringS=' Baseline score'">Baseline</CDropdownItem>
                        </CDropdown>
                    </CRow>
                    <CChartBar :datasets="getScreeningData(screeningDataLabels, timeStringS)" 
                        :options="{ 
                            maintainAspectRatio: true, 
                            scales: {
                                yAxes: [{
                                display: true,
                                ticks: {
                                    suggestedMin: 0,
                                    suggestedMax: 100,
                                    beginAtZero: true 
                                }
                                }]
                            }
                        }"
                    :labels="screeningDataLabels"/>
                    <p>{{ timeStringS }}</p>
                    </CModal>
        <CCol class="col-6">
            <CCard borderColor="info">
                <CCardBody :color="bgColor">
                    <CRow>
                        <h4 :style='reverseColorCSS(bgColor)' class="card-title text-left mb-0 col-6">Assessment</h4>
                        <div class="col-3"/>
                        <CDropdown :color="reverseColor(bgColor)" toggler-text="Change Data">
                            <CDropdownItem @click="timeStringA=''">Current</CDropdownItem>
                            <CDropdownItem @click="timeStringA=' Baseline score'">Baseline</CDropdownItem>
                            <CDropdownDivider/>
                            <CDropdownItem @click="timeStringA=' Change compared to last month'">Last Month</CDropdownItem>
                            <CDropdownItem @click="timeStringA=' Change compared to same month last year'">Same Month Last Year</CDropdownItem>
                            <CDropdownItem @click="timeStringA=' Average change for the past year'">Past Year Average</CDropdownItem>
                        </CDropdown>
                        <div class='col-3'>
                        <CButton  :color="reverseColor(bgColor)" @click="assessmentLarge = !assessmentLarge">Enlarge</CButton>
                        </div>
                    </CRow>
                    <CChartBar style="height:1000px" :datasets="getBarData(assessDataLabels, timeStringA)" :options="{ 
                            maintainAspectRatio: false, 
                            scales: {
                                yAxes: [{
                                display: true,
                                ticks: {
                                    suggestedMin: 0,
                                    suggestedMax: 100,
                                    beginAtZero: true 
                                }
                                }]
                            }
                        }" 
                        :labels="assessDataLabels"/>
                        <p>{{ timeStringA }}</p>
                </CCardBody>
                
            </CCard>
        </CCol>
        <CModal
        title = "Assessment"
        color = "info"
        :show.sync="assessmentLarge"
        size = "lg"
        >
        <CRow>
                        <h4 :style='reverseColorCSS(bgColor)' class="card-title text-left mb-0 col-6">Assessment</h4>
                        <div class="col-3"/>
                        <CDropdown :color="reverseColor(bgColor)" toggler-text="Change Data">
                            <CDropdownItem @click="timeStringA=''">Current</CDropdownItem>
                            <CDropdownItem @click="timeStringA=' Baseline score'">Baseline</CDropdownItem>
                            <CDropdownDivider/>
                            <CDropdownItem @click="timeStringA=' Change compared to last month'">Last Month</CDropdownItem>
                            <CDropdownItem @click="timeStringA=' Change compared to same month last year'">Same Month Last Year</CDropdownItem>
                            <CDropdownItem @click="timeStringA=' Average change for the past year'">Past Year Average</CDropdownItem>
                        </CDropdown>
                    </CRow>
                    <CChartBar style="height:1000px" :datasets="getBarData(assessDataLabels, timeStringA)" :options="{ 
                            maintainAspectRatio: false, 
                            scales: {
                                yAxes: [{
                                display: true,
                                ticks: {
                                    suggestedMin: 0,
                                    suggestedMax: 100,
                                    beginAtZero: true 
                                }
                                }]
                            }
                        }" 
                        :labels="assessDataLabels"/>
                        <p>{{ timeStringA }}</p>
                    </CModal>
    </CRow>
    <CRow>
        <CCol class="col-6">
            <CCard borderColor="warning">
                <CCardBody :color="bgColor">
                    <CRow>
                        <h4 :style='reverseColorCSS(bgColor)' class="card-title mb-0 col-6 text-left">Intervention</h4>
                        <div class="col-3"/>
                        <CDropdown :color="reverseColor(bgColor)" toggler-text="Change Data">
                            <CDropdownItem @click="timeStringI=''">Current</CDropdownItem>
                            <CDropdownItem @click="timeStringI=' Baseline score'">Baseline</CDropdownItem>
                            <CDropdownDivider/>
                            <CDropdownItem @click="timeStringI=' Change compared to last month'">Last Month</CDropdownItem>
                            <CDropdownItem @click="timeStringI=' Change compared to same month last year'">Same Month Last Year</CDropdownItem>
                            <CDropdownItem @click="timeStringI=' Average change for the past year'">Past Year Average</CDropdownItem>
                        </CDropdown>
                        <div class='col-3'>
                        <CButton  :color="reverseColor(bgColor)" @click="interventionLarge = !interventionLarge">Enlarge</CButton>
                        </div>
                    </CRow>
                    <CChartBar style="height:1000px" :datasets="getBarData(interventionDataLabels, timeStringI)" :options="{ 
                            maintainAspectRatio: false, 
                            scales: {
                                yAxes: [{
                                display: true,
                                ticks: {
                                    suggestedMin: 0,
                                    suggestedMax: 100,
                                    beginAtZero: true 
                                }
                                }]
                            }
                        }" 
                        :labels="interventionDataLabels"/>
                    <p>{{ timeStringI }}</p>
                </CCardBody>
            </CCard>
        </CCol>
        <CModal
        title = "Intervention"
        color = "warning"
        :show.sync="interventionLarge"
        size = "lg"
        >
        <CRow>
                        <h4 :style='reverseColorCSS(bgColor)' class="card-title mb-0 col-6 text-left">Intervention</h4>
                        <div class="col-3"/>
                        <CDropdown :color="reverseColor(bgColor)" toggler-text="Change Data">
                            <CDropdownItem @click="timeStringI=''">Current</CDropdownItem>
                            <CDropdownItem @click="timeStringI=' Baseline score'">Baseline</CDropdownItem>
                            <CDropdownDivider/>
                            <CDropdownItem @click="timeStringI=' Change compared to last month'">Last Month</CDropdownItem>
                            <CDropdownItem @click="timeStringI=' Change compared to same month last year'">Same Month Last Year</CDropdownItem>
                            <CDropdownItem @click="timeStringI=' Average change for the past year'">Past Year Average</CDropdownItem>
                        </CDropdown>
                    </CRow>
                    <CChartBar style="height:1000px" :datasets="getBarData(interventionDataLabels, timeStringI)" :options="{ 
                            maintainAspectRatio: false, 
                            scales: {
                                yAxes: [{
                                display: true,
                                ticks: {
                                    suggestedMin: 0,
                                    suggestedMax: 100,
                                    beginAtZero: true 
                                }
                                }]
                            }
                        }" 
                        :labels="interventionDataLabels"/>
                    <p>{{ timeStringI }}</p>
                    </CModal>
        <CCol class="col-6">
            <CCard borderColor="danger">
                <CCardBody align="left" :color="bgColor">
                     <CRow>
                        <h4 :style='reverseColorCSS(bgColor)' class="card-title mb-0 col-6 text-left">Improvement</h4>
                        <div class="col-3"/>
                        <CDropdown :color="reverseColor(bgColor)" toggler-text="Change Data">
                            <CDropdownItem @click="typeString='NLL-A'">NLL-A</CDropdownItem>
                            <CDropdownItem @click="typeString='NLR-A'">NLR-A</CDropdownItem>
                            <CDropdownItem @click="typeString='NLM-A'">NLM-A</CDropdownItem>
                            <CDropdownItem @click="typeString='NLC-A'">NLC-A</CDropdownItem>
                            <CDropdownDivider/>
                            <CDropdownItem @click="typeString='NLL-I'">NLL-I</CDropdownItem>
                            <CDropdownItem @click="typeString='NLR-I'">NLR-I</CDropdownItem>
                            <CDropdownItem @click="typeString='NLM-I'">NLM-I</CDropdownItem>
                            <CDropdownItem @click="typeString='NLC-I'">NLC-I</CDropdownItem>
                            </CDropdown>
                            <div class='col-3'>
                        <CButton  :color="reverseColor(bgColor)" @click="improveLarge = !improveLarge">Enlarge</CButton>
                        </div>
                    </CRow>
                    <CChartLine style="height:1000px" :datasets="getImproveData(improveDataLabels, interventionNames, typeString)" :options="{ 
                            maintainAspectRatio: false, 
                            scales: {
                                yAxes: [{
                                display: true,
                                ticks: {
                                    suggestedMin: 0,
                                    suggestedMax: 100,
                                    beginAtZerol: true 
                                }
                                }]
                            }
                        }" 
                        :labels="improveDataLabels"/>
                                <p>{{ typeString }}</p>
                    </CCardBody>    
            </CCard>
        </CCol>
        <CModal
        title = "Improvement"
        color = "danger"
        :show.sync="improveLarge"
        size = "lg"
        >
        <CRow>
                        <h4 :style='reverseColorCSS(bgColor)' class="card-title mb-0 col-6 text-left">Improvement</h4>
                        <div class="col-3"/>
                        <CDropdown :color="reverseColor(bgColor)" toggler-text="Change Data">
                            <CDropdownItem @click="typeString='NLL-A'">NLL-A</CDropdownItem>
                            <CDropdownItem @click="typeString='NLR-A'">NLR-A</CDropdownItem>
                            <CDropdownItem @click="typeString='NLM-A'">NLM-A</CDropdownItem>
                            <CDropdownItem @click="typeString='NLC-A'">NLC-A</CDropdownItem>
                            <CDropdownDivider/>
                            <CDropdownItem @click="typeString='NLL-I'">NLL-I</CDropdownItem>
                            <CDropdownItem @click="typeString='NLR-I'">NLR-I</CDropdownItem>
                            <CDropdownItem @click="typeString='NLM-I'">NLM-I</CDropdownItem>
                            <CDropdownItem @click="typeString='NLC-I'">NLC-I</CDropdownItem>
                            </CDropdown>
                    </CRow>
                    <CChartLine style="height:1000px" :datasets="getImproveData(improveDataLabels, interventionNames, typeString)" :options="{ 
                            maintainAspectRatio: false, 
                            scales: {
                                yAxes: [{
                                display: true,
                                ticks: {
                                    suggestedMin: 0,
                                    suggestedMax: 100,
                                    beginAtZerol: true 
                                }
                                }]
                            }
                        }" 
                        :labels="improveDataLabels"/>
                                <p>{{ typeString }}</p>
        </CModal>
    </CRow>
    </CContainer>
</template>
<script>
import { CChartBar, CChartLine } from '@coreui/vue-chartjs';

export default {
    name: "CompareBarChart",
    props: {
        students: Array,
        bgColor: String,
        colorArray: Array
    },
    components: {
        CChartBar,
        CChartLine
    
    },
    data: function(){
        return {
            labels: [],
            screeningDataLabels: ["SLPS2", "OTS2", "RSPS2", "PsyS2"],
            assessDataLabels: ["NLL-A", "NLR-A", "NLM-A", "NLC-A"],
            interventionDataLabels: ["NLL-I", "NLR-I", "NLM-I", "NLC-I"],
            improveDataLabels: ['','Past Year', 'Same Month Last Year', 'Last Month', 'Current'],
            interventionNames: [' Average change for the past year', ' Change compared to same month last year', ' Change compared to last month', ''],
            timeStringA: "",
            timeStringI: "",
            timeStringS: "",
            typeString: "NLL-I",
            screeningLarge: false,
            assessmentLarge: false,
            improveLarge: false,
            interventionLarge: false
            //,bgColor: 'dark'

        }
    },
    computed: {
        
        getBarDatasets(){
            var retArray = [];
            
            for (var i = 0; i < this.students.length; i++){
                retArray.push({
                    label: this.students[i].FirstName + " " + this.students[i].LastName,
                    backgroundColor: this.colorArray[i],
                    data: this.getRandomNumberArray(5),
                })
            }
            return retArray;
        },
        getLineDatasets(){
            var retArray = [];
            for (var i = 0; i < this.students.length; i++){
                retArray.push({
                    label: this.students[i].FirstName + " " + this.students[i].LastName,
                    backgroundColor: "transparent",
                    borderColor: this.colorArray[i],
                    data: this.getRandomNumberArray(10)
                })
            }
            return retArray;
        }
    },

    methods: {
        getRandomNumberArray(num){
            var retArr = []
            for (var i = 0; i < num; i++) retArr.push(Math.floor(Math.random() * (100 - 0 + 1) + 0));
            return retArr;
        },
        getScreeningData(dataLabels, timeString){
            var retArray = [];
            
            for (var i = 0; i < this.students.length; i++){
                var data = []
                for (var j = 0; j < dataLabels.length; j++){
                    data.push(this.students[i][dataLabels[j] + timeString]);
                }
                retArray.push({
                    label: this.students[i].FirstName + " " + this.students[i].LastName,
                    backgroundColor: this.colorArray[i],
                    data: data
                })

                /*retArray.push({
                    borderColor: "#FFFFFF",
                    data: [50, 80, 75, 75],
                    type: 'line',
                    order: 0,
                    lineTension: 0,
                    spanGaps: true
                })*/
            }
            return retArray;
        },
        getBarData(dataLabels, timeString){
            var retArray = [];
            
            for (var i = 0; i < this.students.length; i++){
                var data = []
                for (var j = 0; j < dataLabels.length; j++){
                    data.push(this.students[i][dataLabels[j]+ timeString]);
                }
                retArray.push({
                    label: this.students[i].FirstName + " " + this.students[i].LastName,
                    backgroundColor: this.colorArray[i],
                    data: data
                })
            }
            return retArray;
        },
        getImproveData(dataLabels, columnNames, typeString){
            var retArray = [];
            if (dataLabels.length-1 === columnNames.length){
            for (var i = 0; i < this.students.length; i++){
                var data = [0]
                for (var j = 0; j < dataLabels.length; j++){
                    data.push(this.students[i][typeString + columnNames[j]]);
                }
                retArray.push({
                    label: this.students[i].FirstName + " " + this.students[i].LastName,
                    borderColor: this.colorArray[i],
                    data: data
                })
            }}
            return retArray;
        },
        reverseColor(colorString){
            if (colorString === 'light'){
                return 'dark'
            }
            else{
                return 'light'
            }
        },
        reverseColorCSS(colorString){
            if (colorString === 'light'){
                return "color: black"
            }
            else{
                return "color: white"
            }
        },
        getColorCSS(colorString){
            if (colorString === 'light'){
                return "color: white"
            }
            else{
                return "color: black"
            }
        }
    },

    mounted(){
        for (var i = 0; i < this.students.length; i++){
            this.labels.push(this.students[i].FirstName + " " + this.students[i].LastName);
        }
    }

}
</script>