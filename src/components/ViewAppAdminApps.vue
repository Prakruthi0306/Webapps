<template>
  <div v-if="showPage" class="container">
    <div id="all-modals">
      <div id="filters-modal" class="modal">
        <div class="modal-content">
          <h2>Filters</h2>
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
                  <select v-model="inputObject.startAgeValue" id="startAge" class="ageGroup" @change="changeStartAgeRange">
                    <option value="All">All</option>
                    <option v-for="(item,index) in maxAgeRange" :key="index" :value="item">{{ item }}</option>
                  </select>
                  to
                  <select v-model="inputObject.endAgeValue" id="endAge" class="ageGroup" @change="changeStartAgeRange">
                    <option value="All">All</option>
                    <option v-for="(item,index) in (inputObject.startAgeValue == 'All' ? maxAgeRange : maxAgeRange-parseInt(inputObject.startAgeValue)+1)" :key="index" :value="inputObject.startAgeValue == 'All' ? item : parseInt(inputObject.startAgeValue)+index">{{ inputObject.startAgeValue == 'All' ? item : parseInt(inputObject.startAgeValue)+index }}</option>
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
                <td>sub_category:</td>
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
                  <input type="date" id="endDate" @change="changeStartDate" v-model="inputObject.periodEnd">
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
              <tr>
                <td colspan="2" style="text-align: center;">
                  <button @click="newFilters" style="background-color: white">Search Filtering</button>
                </td>
              </tr>
            </tbody>
          </table>
          <button @click="closeModal('filters-modal'); assignFilteringValues()" style="margin-top: 5px;">Close</button>
        </div>
      </div>
      <div v-if="deletionObject" id="delete-modal" class="modal">
        <div class="modal-content">
          <h2>Delete Application</h2>
          <div class="delete-modal-box">
            To Confirm Deletion Type out "<strong>{{ deletionObject.title }}</strong>"
            <div style="text-align: center;">
              <input type="text" id="input-delete-modal-confirmation" :placeholder="deletionObject.title">
              <button @click="confirmDeletion(deletionObject)" style="background-color: white;">Confirm Deletion</button>
            </div>
          </div>
          <button @click="closeModal('delete-modal')">Close</button>
        </div>
      </div>
      <div id="preview-modal" class="modal">
        <div class="modal-content">
          <h2>Preview</h2>
          <div v-if="previewObject">
            
          </div>
          <button @click="() => { previewObject = null;closeModal('preview-modal')}">Close</button>
        </div>
      </div>
    </div>
    <div class="function-buttons">
      <button id="filters-button" class="filter-button" style="margin-right: 5px;" @click="openModal('filters-modal')">Filters ({{ Object.keys(params).length }})</button>
      <button @click="newApp" class="new-button">New</button>
    </div>
    <div class="cards-format">
      <div v-for="(app, index) in applicationList" class="app-card" :key="index">
        <div>
          <div class="icon-row">
            <span>
              <span class="tooltip-icon" style="margin-right: 5px;">
                <font-awesome-icon icon="fa-solid fa-clone" @click="cloneApp(app.application_id)" />
                <span class="tooltiptext-icon">Clone</span>
              </span>
              <span class="tooltip-icon">
                <font-awesome-icon icon="fa-solid fa-eye" @click="showPreviewModal(app)"/>
                <span class="tooltiptext-icon">Preview</span>
              </span>
            </span>
            <span class="tooltip-icon">
              <font-awesome-icon :icon="['far', 'trash-can']" @click="deleteApp(app)" />
              <span class="tooltiptext-icon">Delete</span>
            </span>
          </div>
          <div>
            <div class="app-card-title">{{ app.title }}</div>
            <div class="app-card-subtitle">{{ app.subtitle }}</div>
            <div class="app-card-info">{{ app.info }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script> 
  import axios from 'axios';

  export default {
    data() {
      return {
        showPage: null,
        params: null,
        applicationList: null,
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
        },
        deletionObject: null,
        previewObject: null,
      }
    },
    async created() {
      try {
        this.assignFilteringValues();

        let response = await axios.get('http://localhost:8080/api/appAdmin/searchfilter', {
          params: this.params
        });
        this.applicationList = response.data;
        let userCategorizationResponse = await axios.get(`http://localhost:8080/api/appAdmin/categorization/owner/550e8400-e29b-41d4-a716-446655440000`);
        this.categorization = userCategorizationResponse.data;
        if (this.applicationList != null && this.applicationList.length > 0) {
          this.deletionObject = this.applicationList[0];
        }
        this.showPage = true;
      } catch (e) {
        console.error(e);
      }
    },
    methods: {
      openModal(id) {
        document.getElementById(id).style.display = 'flex';
      },
      closeModal(id) {
        document.getElementById(id).style.display = 'none';
      },
      async showPreviewModal(app) {
        try {
          let response = await axios.get(`http://localhost:8080/api/question-admin/application/${app.application_id}`);
          this.previewObject = response.data;
          this.openModal('preview-modal');
          console.log(this.previewObject);
        } catch (e) {
          console.error(e);
        }
      },
      assignFilteringValues() {
        this.params = this.getQueryParams();
        //parse query so search/filter can be used again with auto filled current data
        for (let key in this.params) {
          if (Object.hasOwnProperty.call(this.inputObject, key)) {
            this.inputObject[key] = this.params[key];
          }
          else if (key == 'age_group') {
            let ages = this.params['age_group'].split(',');
            this.inputObject.startAgeValue = ages[0];
            this.inputObject.endAgeValue = ages[1];
          }
          else if (key == 'created') {
            let dates = this.params['created'].split(',');
            this.inputObject.periodStart = dates[0] == 'All' ? '' : dates[0];
            this.inputObject.periodEnd = dates[1] == 'All' ? '' : dates[1];
          }
        }
      },
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
      getQueryParams() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const params = {};
        for (const [key, value] of urlParams.entries()) {
          params[key] = value;
        }
        return params;
      },
      newApp() {
        this.$router.push(`/rolesPage/SearchAppAdminApps/viewAppAdminApps/newAppCard`);
      },
      deleteApp(app) {
        this.deletionObject = app;
        this.openModal('delete-modal');
      },
      async confirmDeletion(app) {
        try {
          let confirmationString = document.getElementById("input-delete-modal-confirmation").value;
          if (app.title == confirmationString) {
            let deleteAppResponse = await axios.delete(`http://localhost:8080/api/appAdmin/${app.application_id}`);
            console.log(deleteAppResponse.data);
            this.closeModal('delete-modal');
            let response = await axios.get('http://localhost:8080/api/appAdmin/searchfilter', {
              params: this.params
            });
            this.applicationList = response.data;
          }
          else {
            alert("confirmation string does not match")
          }
        } catch (e) {
          console.error(e);
        }
      },
      cloneApp(application_id) {
        this.$router.push({
          path: `/rolesPage/SearchAppAdminApps/viewAppAdminApps/cloneAppName`,
          query: {
            application_id
          }
        })
      },
      async newFilters() {
        try {
          let ageRangeResult = '';
          ageRangeResult += this.inputObject.startAgeValue;
          ageRangeResult += ',';
          ageRangeResult += this.inputObject.endAgeValue;

          let periodRangeResult = '';
          periodRangeResult += this.inputObject.periodStart == '' ? 'All' : this.inputObject.periodStart;
          periodRangeResult += ',';
          periodRangeResult += this.inputObject.periodEnd == '' ? 'All' : this.inputObject.periodEnd;

          const currentRoute = this.$route;
          const targetQuery = {
            ...(this.inputObject.search_query == '' ? {} : {search_query: this.inputObject.search_query}),
            ...(ageRangeResult == 'All,All' ? {} : {age_group: ageRangeResult}),
            ...(this.inputObject.classification == 'All' ? {} : {classification: this.inputObject.classification}),
            ...(this.inputObject.area == 'All' ? {} : {area: this.inputObject.area}),
            ...(this.inputObject.type == 'All' ? {} : {type: this.inputObject.type}),
            ...(this.inputObject.category == 'All' ? {} : {category: this.inputObject.category}),
            ...(this.inputObject.sub_category == 'All' ? {} : {sub_category: this.inputObject.sub_category}),
            ...(periodRangeResult == 'All,All' ? {} : {created: periodRangeResult})
          };
          const currentKeys = Object.keys(currentRoute.query);
          const targetKeys = Object.keys(targetQuery);
          const isSameKeys = currentKeys.length === targetKeys.length && currentKeys.every(key => targetKeys.includes(key));
          const isDifferentQuery = !isSameKeys || !currentKeys.every(key =>
            currentRoute.query[key] === targetQuery[key]
          );

          if (isDifferentQuery) {
            this.$router.replace({ query: targetQuery });
            this.assignFilteringValues();
            let response = await axios.get('http://localhost:8080/api/appAdmin/searchfilter', {
              params: this.params
            });
            this.applicationList = response.data;
          }

        } catch (e) {
          console.error(e);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @use 'sharedSCSS/globalSharedVariables';

  .container {
    font-family: "Lucida Console";
    position: relative;
  }

  .cards-format {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
  }

  .function-buttons {
    background-color: #FCFEFF;
    display: inline-block;
    padding: .25rem;
    position: sticky;
    z-index: 99998;
    border-radius: 50rem;
    top: globalSharedVariables.$navbar-height;
  }

  .filter-button, .new-button {
    background-color: globalSharedVariables.$orange;
    border-radius: 50rem;
    width: 250px;
    padding: 0 1rem;
    font-size: 1.5rem;
    font-weight: 700;
  }

  .app-card {
    $inner_padding: 16px;

    $card_width: 400px;
    $card_height: 300px;
    $inner_card_height: $card_height - (2 * $inner_padding);

    background-color: globalSharedVariables.$orange;
    padding: $inner_padding;
    border-radius: 1.5rem;
    width: $card_width;
    height: $card_height;
    margin: 1rem;
    
    > div {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .icon-row {
      display: flex;
      justify-content: space-between;
    }

    .app-card-title {
      font-size: 1.5rem;
      font-weight: 700;
      text-align: center;
    }

    .app-card-subtitle {
      font-size: .8rem;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .app-card-info {
      font-size: 1rem;
    }
  }

  .tooltip-icon {
    position: relative;
    display: inline-block;

    .tooltiptext-icon {
      visibility: hidden;
      width: fit-content;
      background-color: lightgrey;
      text-align: center;
      border-radius: 6px;
      padding: 5px;
      position: absolute;
      z-index: 1;
      bottom: 120%;
      left: 50%;
      transform: translateX(-50%);
      font-size: .8rem;
      font-weight: 400;
      transition: opacity 0s linear .5s;
      opacity: 0;

      &::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: lightgrey transparent transparent transparent;
      }
    }

    &:hover {
      .tooltiptext-icon {
        visibility: visible;
        opacity: 1;
      }
    }
  }

  .modal {
    display: none;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 99999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.4);

    .modal-content {
      background-color: #fefefe;
      padding: 20px;
      border: 1px solid #888;
      width: 80%;
      z-index: 99999;
      button {
        background-color: globalSharedVariables.$orange;
        border-radius: 50rem;
        padding: 0 1rem;
      }

      h2 {
        text-align: center;
      }
    }
  }

  .delete-modal-box {
    background-color: globalSharedVariables.$orange;
    padding: 1rem;
    margin: 1rem 0;

    input[type="text"] {
      background-color: white;
      border-radius: 50rem;
      font-size: 1rem;
      padding-left: .5rem;
      padding-right: .5rem;
    }

    button {
      background-color: white;
      border-radius: 50rem;
      font-size: 1rem;
      margin-left: 5px;
    }
  }

  .input-table {
    background-color: globalSharedVariables.$orange;
    margin: 1rem 0;
    border-radius: 1rem;

    tr > td:first-child {
      text-align: right;
    }

    select {
      background-color: white;
      border-radius: 50rem;
      padding-left: .5rem;
      padding-right: .5rem;
      width: 100%;
      font-size: 1rem;
      font-weight: 400;
    }

    input[type="date"], .ageGroup {
      width: fit-content;
      padding: 0 1rem;
    }

    input {
      background-color: white;
      border-radius: 50rem;
      padding-left: .5rem;
      padding-right: .5rem;
      font-size: 1rem;
      font-weight: 400;
      width: 100%;
    }
    
    table {
      width: 100%;
    }

    td, th {
      padding: .5rem;
    }

    th {
      text-align: center;
      width: 100%;
    }
  }

  .tooltip-searchDate {
    position: relative;
    display: inline-block;

    .tooltiptext-searchDate {
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

      &::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: lightgrey transparent transparent transparent;
      }
    }

    &:hover .tooltiptext-searchDate {
      visibility: visible;
    }

    .tooltip-table {
      td {
        border: solid black 1px;
      }
    }
  }



</style>