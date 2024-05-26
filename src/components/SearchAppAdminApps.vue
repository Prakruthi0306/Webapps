<template>
  <div v-if="categorization" class="container">
    <div class="inner-box">
      <table class="input-table">
        <tbody>
          <tr>
            <th colspan="2">Search</th>
          </tr>
          <tr>
            <td>Free Search:</td>
            <td>
              <input type="text" v-model="inputObject.search_query">
            </td>
          </tr>
          <tr>
            <th colspan="2">Filtering</th>
          </tr>
          <tr class="range-row">
            <td>Age Range:</td>
            <td>
              <select v-model="inputObject.startAgeValue" id="startAge" @change="changeStartAgeRange">
                <option value="All">All</option>
                <option v-for="(item,index) in maxAgeRange" :key="index" :value="item">{{ item }}</option>
              </select>
              to
              <select v-model="inputObject.endAgeValue" id="endAge" @change="changeStartAgeRange">
                <option value="All">All</option>
                <option v-for="(item,index) in (inputObject.startAgeValue == 'All' ? maxAgeRange : maxAgeRange-inputObject.startAgeValue+1)" :key="index" :value="inputObject.startAgeValue == 'All' ? item : inputObject.startAgeValue+index">{{ inputObject.startAgeValue == 'All' ? item : inputObject.startAgeValue+index }}</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Classification:</td>
            <td>
              <select v-model="inputObject.classification">
                <option value="All">All</option>
                <option value="Assessment/Test">Assessment/Test</option>
                <option value="Screening/Mini-Test">Screening/Mini-Test</option>
                <option value="Intervention/Training/Lesson">Intervention/Training/Lesson</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Area:</td>
            <td>
              <select v-model="inputObject.area">
                <option value="All">All</option>
                <option :value="area" v-for="(area,index) in categorization.areas" :key="`${index}-areas`">
                  {{ area }}
                </option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Type:</td>
            <td>
              <select v-model="inputObject.type">
                <option value="All">All</option>
                <option :value="type" v-for="(type,index) in categorization.types" :key="`${index}-types`">
                  {{ type }}
                </option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Category:</td>
            <td>
              <select v-model="inputObject.category">
                <option value="All">All</option>
                <option :value="category" v-for="(category,index) in categorization.categories" :key="`${index}-categories`">
                  {{ category }}
                </option>
              </select>
            </td>
          </tr>
          <tr>
            <td>SubCategory:</td>
            <td>
              <select v-model="inputObject.sub_category">
                <option value="All">All</option>
                <option :value="sub_category" v-for="(sub_category,index) in categorization.sub_categories" :key="`${index}-sub_categories`">
                  {{ sub_category }}
                </option>
              </select>
            </td>
          </tr>
          <tr class="range-row">
            <td>Period:</td>
            <td>
              <input type="date" id="startDate" @change="changeStartDate" v-model="inputObject.periodStart">
              to
              <input type="date" id="endDate" v-model="inputObject.periodEnd">
              <span class="tooltip-searchDate">
                <font-awesome-icon :icon="['fas', 'circle-info']" style="vertical-align: middle; margin-left: 5px" />
                <span class="tooltiptext-searchDate">
                  <table class="tooltip-table">
                    <tbody>
                      <tr>
                        <td>mm/dd/yyyy to mm/dd/yyyy:</td>
                        <td>All Dates</td>
                      </tr>
                      <tr>
                        <td>06/12/2015 to mm/dd/yyyy:</td>
                        <td>06/12/2015 to Present</td>
                      </tr>
                      <tr>
                        <td>mm/dd/yyyy to 06/12/2015:</td>
                        <td>Past to 06/12/2015</td>
                      </tr>
                    </tbody>
                  </table>
                </span>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <div style="text-align: center;">
        <button @click="submit">View Applications</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

  export default {
    data() {
      return {
        categorization: null,
        maxAgeRange: 100,
        inputObject: {
          search_query: '',
          startAgeValue: 'All',
          endAgeValue: 'All',
          classification: 'All',
          area: 'All',
          type: 'All',
          category: 'All',
          sub_category: 'All',
          periodStart: '',
          periodEnd: ''
        }
      }
    },
    async created() {
      let userCategorizationResponse = await axios.get(`http://localhost:8080/api/appAdmin/categorization/owner/550e8400-e29b-41d4-a716-446655440000`);
      this.categorization = userCategorizationResponse.data;
    },
    methods: {
      changeStartDate() {
        let from = document.getElementById('startDate');
        let to = document.getElementById('endDate');

        if (from.value >= to.value && to.value !== '') {
          let temp = new Date(from.value);
          temp.setDate(temp.getDate());
          to.valueAsDate = temp;
        }
        to.min = from.value;
      },
      changeStartAgeRange() {
        let from = document.getElementById('startAge');
        let to = document.getElementById('endAge');
        if (from.value != 'All' && to.value != 'All') {
          if (parseInt(from.value) > parseInt(to.value)) {
            this.inputObject.endAgeValue = this.maxAgeRange;
          }
        }
      },
      submit() {
        let ageRangeResult = '';
        ageRangeResult += this.inputObject.startAgeValue;
        ageRangeResult += ',';
        ageRangeResult += this.inputObject.endAgeValue;

        let periodRangeResult = '';
        periodRangeResult += this.inputObject.periodStart == '' ? 'All' : this.inputObject.periodStart;
        periodRangeResult += ',';
        periodRangeResult += this.inputObject.periodEnd == '' ? 'All' : this.inputObject.periodEnd;

        this.$router.push({
          path: `/rolesPage/searchAppAdminApps/viewAppAdminApps`,
          query: {
            ...(this.inputObject.search_query == '' ? {} : {search_query: this.inputObject.search_query}),
            ...(ageRangeResult == 'All,All' ? {} : {age_group: ageRangeResult}),
            ...(this.inputObject.classification == 'All' ? {} : {classification: this.inputObject.classification}),
            ...(this.inputObject.area == 'All' ? {} : {area: this.inputObject.area}),
            ...(this.inputObject.type == 'All' ? {} : {type: this.inputObject.type}),
            ...(this.inputObject.category == 'All' ? {} : {category: this.inputObject.category}),
            ...(this.inputObject.sub_category == 'All' ? {} : {sub_category: this.inputObject.sub_category}),
            ...(periodRangeResult == 'All,All' ? {} : {created: periodRangeResult})
          }
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  @use 'sharedSCSS/globalSharedVariables';

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .inner-box {
    background-color: globalSharedVariables.$orange;
    font-family: "Lucida Console";
    font-weight: 700;
    border-radius: 1rem;
    padding: 1rem;
  }

  select, input[type="text"] {
    font-size: 1rem;
    font-weight: 400;
    background-color: white;
    border-radius: 50rem;
    padding: 0 1rem;
    appearance: auto;
    width: 100%;
  }

  .input-table {
    border-collapse: collapse;
  }

  .input-table th {
    text-align: center;
  }

  .range-row select {
    width: fit-content;
  }

  .input-table td:first-child {
    text-align: right;
  }

  .input-table th, .input-table td {
    padding: 2px;
  }

  button {
    background-color: white;
    border-radius: 50rem;
    padding: 0 5px;
  }

  input[type="date"] {
    background-color: white;
    border-radius: 50rem;
    padding: 0 5px;
    font-weight: 400;
    font-size: 1rem;
  }

  .tooltip-searchDate {
    position: relative;
    display: inline-block;
  }

  .tooltip-searchDate .tooltiptext-searchDate {
    visibility: hidden;
    width: fit-content;
    background-color: lightgrey;
    text-align: center;
    border-radius: 6px;
    padding: 5px;
    position: absolute;
    z-index: 1;
    bottom: 150%;
    left: 50%;
    transform: translateX(-50%);
    font-size: .8rem;
    font-weight: 400;
  }

  .tooltip-searchDate .tooltiptext-searchDate::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: lightgrey transparent transparent transparent;
  }

  .tooltip-searchDate:hover .tooltiptext-searchDate {
    visibility: visible;
  }

  .tooltip-table td {
    border: solid black 1px;
  }
</style>