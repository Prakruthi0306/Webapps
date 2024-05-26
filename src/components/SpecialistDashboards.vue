<template>
    <div class="dashboard-lcontainer">
        <button v-on:click="toSpecialist()">Specialist</button>
        <!--<button>Parent [COMING SOON]</button>--><br>

        First Name: <input type="text" v-model="filters.firstNameFilter"/><br>
        Last Name: <input type="text" v-model="filters.lastNameFilter"/><br>
        Middle Initial: <input type="text" v-model="filters.middleNameFilter"/><br>
        Gender Identity: <input type="text" v-model="filters.genderFilter"/><br>
        Date of Birth: From: <input type="date" v-model="filters.beforeAgeFilter"/> Until: <input type="date" v-model="filters.afterAgeFilter"/><br>
        Address: <input type="text" v-model="filters.addressFilter"/><br>
        Ethnicity: <input type="text" v-model="filters.ethnicityFilter"/><br>
        Language: <input type="text" v-model="filters.languageFilter"/><br>

    </div>
</template>

<script>
export default {
    name: "SpecialistDashboards",
    data: function(){
        return {
            filters: {
                firstNameFilter: "",
                lastNameFilter: "",
                middleNameFilter: "",
                genderFilter: "",
                beforeAgeFilter: "",
                afterAgeFilter: "",
                addressFilter: "",
                ethnicityFilter: "",
                languageFilter: ""
            }
        }
    },
    methods: {
        toSpecialist(){
            this.$router.push({name: 'SpecialistDashboard', params: {filters: this.filters}})
        },
        toParent(){
            console.log("TODO: Implement Parent Dashboard")
        }

    }
}
</script>

<style scoped>

</style>