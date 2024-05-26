<template>
    <div :style='getColorCSS("background", bgColor)'>
        <Header />
        <br>
        <CContainer>
        <CRow>
        <!--<CCol class="col" v-for="student in selection" v-bind:key="student.sequence">
            <CCard>
                {{ student.FirstName }} {{ student.LastName}}<br>
            </CCard>
        </CCol>-->
            <CCol>
            <CButton @click="infoCollapse = !infoCollapse" color="primary" class="mb-12">Student Info</CButton>
            </CCol>
            <CCol>
            <CButton @click="colorCollapse = !colorCollapse" color="success" class="mb-12">Change Color</CButton>
            </CCol>
            </CRow>
            <CRow>
            <CCol class="col-12">
            <CCollapse :show="colorCollapse">
                <CCard :color="bgColor" body-wrapper>
                    <CCol>
                    <div v-for="student in selection" v-bind:key="student.id">
                    {{ student.FirstName }} {{ student.LastName }}: <input type="color" v-model.lazy="colorArray[student.colorIndex]"/>
                    </div>
                    </CCol>
                </CCard>
                    
            </CCollapse>
             <CCollapse :show="infoCollapse">
                <CCard :color="bgColor" body-wrapper>
                    <CButton :color="bgColor" class="col-3" v-for="student in selection" v-bind:key="student.id" @click="changeActiveIndex(student.sequence)">
                    {{ student.FirstName }} {{ student.LastName}}
                    </CButton>
                    <CListGroup>
                        <CListGroupItem  :color="bgColor">
                            First Name: {{ selection[activeIndex].FirstName }}<br>
                            Middle Initial: {{ selection[activeIndex].MiddleName }}<br>
                            Last Name: {{ selection[activeIndex].LastName }}
                        </CListGroupItem>
                        <CListGroupItem  :color="bgColor">
                            Age: {{ selection[activeIndex].Age }}<br>
                            Ethnicity: {{ selection[activeIndex].Ethnicity }}<br>
                            Language: {{ selection[activeIndex].Language }}
                        </CListGroupItem>
                        <CListGroupItem :color="bgColor">
                            Address: {{ selection[activeIndex].Address }}<br>
                            Phone: {{ selection[activeIndex].Phone }}<br>
                        </CListGroupItem>
                    </CListGroup>
                </CCard>
            </CCollapse>
            </CCol>
        </CRow>
        <br>
        <CompareBarChart v-bind:students="selection" v-bind:bgColor="bgColor" v-bind:colorArray="colorArray"/>
        </CContainer>
        <Footer />
    </div>
</template>

<script>
import CompareBarChart from '@/components/CompareBarChart.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
    name: "SpecialistCompare",
    components: {
        CompareBarChart,
        Header,
        Footer
    },
    data: function(){
        return {
            selection: [],
            infoCollapse: false,
            colorCollapse: false,
            activeIndex: 0,
            bgColor: "light",
            colorArray: ['#FF0000', '#00FF00', '#0000FF', '#00FFFF','#FF00FF', '#FFFF00', '#444444', '#8800FF', '#6E3C00', '#FF7700']
        }
    },
    created(){
        let select = this.$route.params.selection;
        let students = this.$route.params.students;

        for (let i = 0; i < select.length; i++){
            for (let j = 0; j < students.length; j++){
                if (select[i] === students[j].sequence){
                    students[j].colorIndex = i;
                    this.selection.push(students[j])
                }
            }
        }

    },
    methods: {
        changeActiveIndex(sequence){
            for (var i = 0; i < this.selection.length; i++){
                if (this.selection[i].sequence === sequence){
                    this.activeIndex = i;
                    return;
                }
            }
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
        }
    }
}
</script>

<style scoped>

</style>