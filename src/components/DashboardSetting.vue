<template>
  <div class=" w-50 p-3 mx-auto rounded-lg">
    <h3>
      <CBadge class="ml-3 text-secondary" color="warning">
        Dashboard Settings</CBadge
      >
    </h3>
    <CContainer>
      <CCard class="p-3">
        <CForm @submit.prevent="checkform()" method="post">
          <CRow alignVertical="center" alignHorizontal="center">
            <CCol sm="8">
              <label for="exampleFormControlInput1">Plot</label>
              <select v-model="plot" class="form-control">
                <option v-for="option in options" v-bind:key="option.value">
                  {{ option.text }}
                </option>
              </select>
            </CCol>
          </CRow>
          <CRow alignVertical="center" alignHorizontal="center">
            <CCol sm="8">
              <label for="exampleFormControlInput1">Statistics</label>
              <select v-model="statistics" class="form-control">
                <option
                  v-for="option in StatisticsOptions"
                  v-bind:key="option.value"
                >
                  {{ option.text }}
                </option>
              </select>
            </CCol>
          </CRow>
          <CRow alignVertical="center" alignHorizontal="center">
            <CCol sm="8">
              <label for="exampleFormControlInput1">Color</label>
              <select v-model="color" class="form-control">
                <option
                  v-for="option in ColorOptions"
                  v-bind:key="option.value"
                >
                  {{ option.text }}
                </option>
              </select>
            </CCol>
          </CRow>
          <CRow alignVertical="center" alignHorizontal="center">
            <CCol sm="4">
              <CInput type="date" label="From" v-model="from" />
            </CCol>
            <CCol sm="4">
              <CInput type="date" label="To" v-model="to" />
            </CCol>
          </CRow>
          <CRow alignVertical="center" alignHorizontal="center">
            <CCol sm="4">
              <CInput type="date" label="From" v-model="from" />
            </CCol>
            <CCol sm="4">
              <CInput type="date" label="To" v-model="to" />
            </CCol>
          </CRow>

          <CRow alignVertical="center" alignHorizontal="center">
            <CButton
              type="submit"
              color="warning"
              size="sm"
              placeholder="Set"
              class="text-secondary"
            >
              Set Configuration
            </CButton>
          </CRow>
        </CForm>
      </CCard>
    </CContainer>
  </div>
</template>
<script>
//import DatePicker from 'vuejs-datepicker'
export default {
  name: "DashboardSetting",
  data() {
    return {
      plot: null,
      statistics: null,
      color: null,
      from: new Date(),
      to: new Date(),
      options: [
        { text: "Bar Graph", value: "Bar Graph" },
        { text: "Pie Chart", value: "Pie Graph" },
        { text: "Scatter Plot", value: "Scatter Plot" },
      ],

      //Statistics Options
      StatisticsOptions: [
        { text: "Average", value: "Average" },
        { text: "Mean", value: "Mean" },
        { text: "Trimmed Mean", value: "Trimmed Mean" },
        { text: "Spread", value: "Spread" },
        { text: "Quartiles", value: "Quartiles" },
      ],

      //Color Options
      ColorOptions: [
        { text: "Mixed", value: "Mixed" },
        { text: "Red", value: "Red" },
        { text: "Green", value: "Green" },
        { text: "Yellow", value: "Yellow" },
      ],
    };
  },
  methods: {
    //temporary configured to route back to home page as per function should route back to respective dashboard
    checkform() {
      console.log(this.plot);
      console.log(this.statistics);
      console.log(this.color);
      this.$router.push({ path: "/" });
    },
  },
};
</script>
