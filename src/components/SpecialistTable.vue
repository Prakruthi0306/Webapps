<template>
<div class='specialist'>
    <CRow>
    <h4 class="text-left">Children's List</h4><br>
    </CRow>
    <CRow> 
        <CCol class="col-9">
            <p class="float-left">Sort By: </p><select class='sortTable float-left' v-model="sortBy" v-on:click="sort()" style="height: 25%;margin: 5px;">
                <option value='default' >Sort by...</option>
                <option v-show="showOption(header)" v-for="header in headers" v-bind:key="header.name" v-bind:value='header.prop'>
                    {{ header.name }}
                </option>
            </select>
            <!--<CButton @click="showFilter=true" color="success" shape="square">Filter Table</CButton>-->
        </CCol>
    <CCol class="col-1">
        <CButton @click="showSettings=true" color="success" shape="square">Settings</CButton>
    </CCol>
    <CCol class="col-2">
        <CButton v-if="selection.length > 0" v-on:click="toComparison()"  color="warning" shape="square">Compare</CButton>
        <CButton v-else v-on:click="toComparison()"  color="warning" shape="square" disabled>Compare</CButton>
        <p>max: {{ maxToCompare }}</p>
        <!--<CButton @click="showCompare=true" color="warning" shape="square">Students to Compare</CButton>-->
    </CCol>
    </CRow>
    <CRow gutters>
    <table class="table-hover table-striped text-dark float-left align-bottom">
        <!-- Loop through each student in the student list and add their values to the table-->
        <thead>
        <tr>
            <th></th>
            <th v-for="header in headers"  v-show="header.active===true && header.name!=='Tests'" v-bind:key="header.name">
                {{ header.name }}
            </th>
            <th v-show="showTests"><CBadge @click="screeningOn=!screeningOn" style="margin:20px" :color="getBadgeColor(screeningOn, 'success')">Screening/Mini Test</CBadge>
            <CBadge @click="assessmentOn=!assessmentOn" style="margin:20px" :color="getBadgeColor(assessmentOn, 'info')">Assessment</CBadge>
            <CBadge @click="interventionOn=!interventionOn" style="margin:20px" :color="getBadgeColor(interventionOn, 'warning')">Intervention</CBadge></th>
        </tr>
        </thead>
        <tbody>
        <tr v-show="filterRow(student)" v-for="student in students" v-bind:key="student.sequence">
            <td v-if="selection.length < maxToCompare"><input type="checkbox" v-on:change="changeSelection(student.sequence)"/></td>
            <td v-else-if="inSelection(student.sequence)"><input type="checkbox" v-on:change="changeSelection(student.sequence)"/></td>
            <td v-else><input type="checkbox" v-on:change="changeSelection(student.sequence)" disabled/></td>
            <td v-for="header in headers"  v-show="header.active===true" v-bind:key="header.name"> {{ student[header.prop] }}</td>
            <td v-show="showTests"><CProgress v-show="screeningOn" :value="parseInt(student['OTS2'])" style="height:15px" color="success" show-value/><br>
                <CProgress v-show="assessmentOn" :value="parseInt(student['NLL-A'])" style="height:15px" color="info" show-value/><br>
                <CProgress v-show="interventionOn" :value="parseInt(student['NLL-I'])" style="height:15px" color="warning" show-value/>
            </td>
        </tr>
        </tbody>
        
    </table>
    
    </CRow>
    <CRow>
        <CPagination :activePage.sync="currentPage" :pages="getPageCount()" size="sm" align="center" />
        <!--<label>Per Page: </label> <input type="text" v-model="perPage"/>-->
    </CRow>
    <CModal title="Filter Table" color="success" :show.sync="showFilter">
        <!--<template v-slot:header>what</template>-->
        <label>Filter By: </label><select class='sortTable' v-model="filterHeader" style="height: 120%">
            <option value='default' >(None)</option>
            <option value="FirstName">First Name</option>
            <option value="LastName">Last Name</option>
            <option value="Age">Age</option>
            <option value="Address">Address</option>
        </select>
        <input type="text" v-model="filterQuery"/>
    </CModal>
    <CModal title="Students to Compare" color="warning" :show.sync="showCompare">
        <table>
            <tr v-show="inSelection(student.sequence)" v-for="student in students" v-bind:key="student.sequence">
            <td>{{ student.FirstName }} {{ student.LastName }}</td>
            </tr>
        </table>
    </CModal>
    <CModal title="Table Settings" color="success" :show.sync="showSettings">
        <CTabs variant="pills" :active-tab="0">
            <CTab title="Column Select">
                <br>
                <CRow v-for="header in headers" v-show="header.hidden===false" v-bind:key="header.prop">
                    <CCol class="col-1">
                    <input v-if="header.prop==='Tests'" type="checkbox" v-model="showTests"/>
                    <input v-else type="checkbox" v-model="header.active"/> 
                    </CCol>
                    <CCol class="col-5">
                        {{ header.name }}
                    </CCol>
                </CRow>
            </CTab>
            <CTab title="Change Filter">
                <CRow>First Name: <input type="text" v-on:change="changeFilter()" v-model="filters.firstNameFilter"/><br></CRow>
                <CRow>Last Name: <input type="text" v-on:change="changeFilter()" v-model="filters.lastNameFilter"/><br></CRow>
                <CRow>Middle Initial: <input type="text" v-on:change="changeFilter()" v-model="filters.middleNameFilter"/><br></CRow>
                <CRow>Gender Identity: <input type="text" v-on:change="changeFilter()"  v-model="filters.genderFilter"/><br></CRow>
                <CRow>Date of Birth: <br>From: <input type="date" v-on:change="changeFilter()" v-model="filters.beforeAgeFilter"/> <br>Until: <input type="date" v-model="filters.afterAgeFilter"/><br></CRow>
                <CRow>Address: <input type="text" v-on:change="changeFilter()" v-model="filters.addressFilter"/><br></CRow>
                <CRow>Ethnicity: <input type="text" v-on:change="changeFilter()" v-model="filters.ethnicityFilter"/><br></CRow>
                <CRow>Language: <input type="text" v-on:change="changeFilter()" v-model="filters.languageFilter"/><br></CRow>
            </CTab>
            <CTab title="Edit Selection">
                <!--<CRow v-for="sel in selection" v-bind:key="sel">
                    <CCol class="col-1">
                        <input type="checkbox" v-on:change="changeSelection(sel)" checked/>
                    </CCol>
                    <CCol class="col-5"
                        {{ getSelectedStudentName(sel) }}
                    </CCol>
                </CRow>>-->
                <label>Max to Compare: </label> <input type='number' v-model="maxToCompare" min="1" max="10"/>
            </CTab>
        </CTabs>
    </CModal>
</div>
</template>

<script>


export default {
    name: 'SpecialistTable',
    props: {
        students: Array,
        teachers: Array,
        filterHeader: String,
        filterQuery: String,  //This is passed in from the parent component
        filters: Object
    },
    data: function(){
        return {
            //List of all headers
            headers: [{'prop': 'FirstName', 'name': 'First Name', 'active': true, 'hidden': false},
            {'prop': 'MiddleName', 'name': 'Middle Initial', 'active': true, 'hidden': false},
            {'prop': 'LastName', 'name': 'Last Name', 'active': true, 'hidden': false},
            {'prop': 'Age', 'name': 'Age', 'active': false, 'hidden': false},
            {'prop': 'DOB', 'name': 'Date of Birth', 'active': false, 'hidden': false},
            {'prop': 'Ethnicity', 'name': 'Ethnicity', 'active': false, 'hidden': false},
            {'prop': 'Language', 'name': 'Language', 'active': false, 'hidden': false},
            {'prop': 'Gender', 'name': 'Gender Identity', 'active': false, 'hidden': false},
            {'prop': 'Address', 'name': 'Address', 'active': true, 'hidden': false},
            {'prop': 'Email', 'name': 'Email', 'active': false, 'hidden': false},
            {'prop': 'Tests', 'name': 'Tests', 'active': false, 'hidden': false},
            {'prop': 'OTS2', 'name': 'Screening', 'active': false, 'hidden': true},
            {'prop': 'NLL-A', 'name': 'Assessment', 'active': false, 'hidden': true},
            {'prop': 'NLL-I', 'name': 'Intervention', 'active': false, 'hidden': true},
            ],
            //What the table should sort by
            sortBy: "",
            selection: [],
            maxToCompare: 10,
            showFilter: false,
            showCompare: false,
            showSettings: false,
            perPage: 10,
            currentPage: 1,
            filterArray: [],
            screeningOn: true,
            assessmentOn: true,
            interventionOn: true,
            showTests: true
        }
    },
    watch: {
        //TODO: Implement a watch for the filters so they will automatically update
        //Link: https://vuejs.org/v2/guide/computed.html#Watchers
    },
    methods: {
        /*
        *Method for sorting the list of students based on a property
        */
        sort(){
            if (this.sortBy != 'default'){
                var students = this.students; //Get the values of students into a variable so that we aren't changing the parent component's data
                var sortArray = []; //Start with a blank array to sort
                var fakeArray = [];
                this.filterArray = [];

                //Loop through each value and add both the key and the property we are sorting by to the sorting array
                for (var key in students){
                    sortArray.push([key, students[key][this.sortBy]]);
                }

                //These variables will be used to determine if the table needs to be sorted in ascending order or descending order
                var isLess = -1;
                var isGreater = 1;
                if (this.sortBy === 'OTS2' || this.sortBy === 'NLL-A' ||this.sortBy === 'NLL-I'){
                    isLess = 1;
                    isGreater = -1;
                }

                //Use the built-in sort function in JavaScript and pass in a function explaining how we want to sort the function
                sortArray.sort(function(a,b){ 
                    var s1 = a[1]; //The first property value that is passed in for sort
                    var s2 = b[1]; //The second property value that is passed in for sort
                    if (s1 < s2) //If the first value is less than the second one, return -1
                        return isLess;
                    else if (s1 > s2) //If the first value is greater than the second one, return 1
                        return isGreater;
                    else //If both values are the same, return 0
                        return 0;
                });

                var arr = []; //Initiaize a blank object
                
                //With the keys sorted, get each object at the key location and place them in the blank object in order of the sorted array
                for (var i = 0; i < sortArray.length; i++){
                    arr.push(students[sortArray[i][0]]);
                    this.filterRow(students[sortArray[i][0]]);
                    fakeArray.push(sortArray[i][0]);
                }
                students = arr; //Have the students equal the sorted object. All the values are the same, their order is just different.
                this.$emit("update-students", students); //Use an event to change the object at the parent component
            }
        },
        changeFilter(){
            this.filterArray=[];
        },
        changeSelection(sequence){
            if(this.selection.length <= this.maxToCompare){
                for (let index = 0; index < this.selection.length; index++) {
                    if (this.selection[index] === sequence){
                        this.selection.splice(index, 1);
                        return;
                    }
                }
                this.selection.push(sequence);
            }
        },
        toComparison(){
            this.$router.push({name: 'SpecialistCompare', params: {selection: this.selection, students: this.students}})
        },
        inSelection(sequence){
            for (let index = 0; index < this.selection.length; index++) {
                if (this.selection[index] === sequence){
                    return true;
                }
            }
            return false;
        },
        getSelectedStudentName(sequence){
            if (this.inSelection(sequence)){
                for (let i = 0; i < this.students.length; i++){
                    if (sequence === this.students[i].sequence){
                        return this.students[i].FirstName + " " + this.students[i].LastName;
                    }
                }
            }
            return "Error";
        },
        inColumnSelect(header){
            for(let i = 0; i < this.headers.length; i++){
                if (this.headers[i].prop === header.prop && this.headers[i].name === header.name){
                    return true;
                }
            }
            return false;
        },
        filterRow(student){
            if ((student.FirstName.includes(this.filters.firstNameFilter) || this.filters.firstNameFilter === "") && 
            (student.MiddleName.includes(this.filters.middleNameFilter) || this.filters.middleNameFilter === "") &&
            (student.LastName.includes(this.filters.lastNameFilter) || this.filters.lastNameFilter === "") &&
            (student.Gender === this.filters.genderFilter || this.filters.genderFilter === "") &&
            ((student.DOB >= this.filters.beforeAgeFilter && student.DOB <= this.filters.afterAgeFilter) || (this.filters.beforeAgeFilter == "" && this.filters.afterAgeFilter == "")) && 
            (student.Address.includes(this.filters.addressFilter) || this.filters.addressFilter === "") &&
            (student.Ethnicity.includes(this.filters.ethnicityFilter) || this.filters.ethnicityFilter === "") &&
            (student.Language.includes(this.filters.languageFilter) || this.filters.languageFilter === "")){
                this.addToFilterArray(student.sequence);
            }
            if (this.filterArray.indexOf(student.sequence) >= (this.currentPage-1)*this.perPage && this.filterArray.indexOf(student.sequence) < this.currentPage*this.perPage){
                return true;
            }
            return false;   
        },
        addToFilterArray(sequence){
            if (this.filterArray.indexOf(sequence) == -1){
                this.filterArray.push(sequence);
            }
        },
        getPageCount(){
            let addOne = 0;
            if (this.filterArray.length % this.perPage !== 0){
                addOne = 1;
            }

            return Math.floor(this.filterArray.length/this.perPage + addOne);
        },
        getBadgeColor(isOn, onColor){
            if (isOn){
                return onColor
            }
            else{
                return "dark"
            }
        },
        showOption(header){
            if (header.name === "Screening"){
                return this.screeningOn
            }
            if (header.name === "Assessment"){
                return this.assessmentOn
            }
            if (header.name === "Intervention"){
                return this.interventionOn
            }
            if (header.active === false || header.name==="Tests"){
                return false;
            }
            return true;
        },
        roundToFloat(num, place){
        if (place < 0){
          return 0;
        }
        var mulPlace = Math.pow(10, place);
        return Math.round(mulPlace*num)/mulPlace;
      }
    },
    created(){
    }
}

</script>

<style scoped>
    th{
        font-size: 16px;
    }
    td{
        font-size: 16px;
        padding: 15px;
        
    }
    table{
        width: 100%
    }
    table td:last-child {
    width: 100%;
}
</style>