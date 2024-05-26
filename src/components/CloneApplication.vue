<template>
  <div v-if="applicationData" class="container">
    <div id="myModal" class="modal">
      <div class="modal-content">
        <h2>Application Information</h2>
        <div>
          <table class="appInfo-table">
            <tbody>
              <tr>
                <th>Title:</th>
                <td>
                  {{ applicationData.title }}
                </td>
              </tr>
              <tr>
                <th>Subtitle:</th>
                <td>
                  {{ applicationData.subtitle }}
                </td>
              </tr>
              <tr>
                <th>Info:</th>
                <td>
                  {{ applicationData.info }}
                </td>
              </tr>
              <tr>
                <th>Classification:</th>
                <td>
                  {{ applicationData.classification }}
                </td>
              </tr>
            </tbody>
          </table>
          <div v-for="(item, index) in questionsData" :key="index">
            <button class="accordion" @click="e => manageAccordion(e)">{{ item.question }}</button>
            <div class="panel">
              <table class="questionInfo-table">
                <thead>
                  <tr>
                    <th>Designation</th>
                    <th>Name</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Area</td>
                    <td>
                      {{ item.area }}
                    </td>
                    <td>
                      {{ item.area_description }}
                    </td>
                  </tr>
                  <tr>
                    <td>Type</td>
                    <td>
                      {{ item.type }}
                    </td>
                    <td>
                      {{ item.type_description }}
                    </td>
                  </tr>
                  <tr>
                    <td>Category</td>
                    <td>
                      {{ item.category }}
                    </td>
                    <td>
                      {{ item.category_description }}
                    </td>
                  </tr>
                  <tr>
                    <td>SubCategory</td>
                    <td>
                      {{ item.sub_category }}
                    </td>
                    <td>
                      {{ item.sub_category_description }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <button @click="closeModal" style="margin-top: 1rem;">Close</button>
      </div>
    </div>
    <div class="clone-box">
      <button @click="openModal">Application Info</button>
      <h2>Clone App</h2>
      <table>
        <tbody>
          <tr>
            <th>New Title:</th>
            <td>
              <input type="text" v-model="inputsObject.newTitle">
            </td>
          </tr>
          <tr>
            <th>New Subtitle:</th>
            <td>
              <input type="text" v-model="inputsObject.newSubTitle">
            </td>
          </tr>
          <tr>
            <th>New Custom ID:</th>
            <td>
              <input type="text" v-model="inputsObject.newCustomID">
            </td>
          </tr>
        </tbody>
      </table>
      <div style="text-align: center;">
        <button @click="cloneApp">Clone Application</button>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import { v4 as uuidv4 } from 'uuid';

  export default {
    data() {
      return {
        applicationID: null,
        applicationData: null,
        questionsData: null,
        inputsObject: {
          newTitle: '',
          newSubTitle: '',
          newCustomID: '',
        }
      }
    },
    created() {
      this.getQueryParams();
      axios.get(`http://localhost:8080/api/appAdmin/application/${this.applicationID}`).then(res => {
        this.applicationData = res.data;
        this.inputsObject.newTitle = res.data.title;
        this.inputsObject.newSubTitle = res.data.subtitle;
        this.inputsObject.newCustomID = res.data.application_custom_id;

        axios.get(`http://localhost:8080/api/question-admin/application/${this.applicationID}`).then(res => {
          this.questionsData = res.data;
        }).catch(err => {
          console.error(err);
        })
      })
      .catch(err => {
        console.error(err);
      })
    },
/*     mounted() {
      if (!this.$store.getters.isLoggedIn) {
        this.$router.push('/rolesPage');
      }
    }, */
    methods: {
      openModal() {
        document.getElementById('myModal').style.display = 'flex';
      },
      closeModal() {
        document.getElementById('myModal').style.display = 'none';
      },
      getQueryParams() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const params = {};
        for (const [key, value] of urlParams.entries()) {
          params[key] = value;
        }
        this.applicationID = params.application_id;
      },
      manageAccordion(e) {
        let ref = e.target;
        ref.classList.toggle("active");
        let panel = ref.nextElementSibling;
        //ref.children[0]
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        } 
      },
      async cloneApp() {
        try {
          let activity_id = uuidv4();
          await axios.post('http://localhost:8080/api/appAdmin', {
            ...this.applicationData,
            "application_id": activity_id,
            "application_custom_id": this.inputsObject.newCustomID,
            "owner_uuid": "550e8400-e29b-41d4-a716-446655440000",
            "title":this.inputsObject.newTitle, 
            "subtitle":this.inputsObject.newSubTitle,
            "published": false
          })
          for (let i = 0; i < this.questionsData.length; i++) {
            let question_id = uuidv4();
            let question = this.questionsData[i];
            question.question_id = question_id;
            question.application_id = activity_id;
          }
          await axios.post(`http://localhost:8080/api/question-admin/questions`, this.questionsData);
          this.$router.push(`/rolesPage/SearchAppAdminApps/viewAppAdminApps/newAppCard/${activity_id}`);
        } catch (err) {
          console.error(err);
        }
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
    font-family: "Lucida Console";
  }

  .clone-box {
    background-color: globalSharedVariables.$orange;
    min-width: 75vw;
    border-radius: 1.5rem;
    padding: 1rem;

    h2 {
      text-align: center;
      font-weight: 700;
    }

    table {
      width: 100%;
    }

    td, th {
      padding: .5rem;
    }

    th {
      text-align: right;
      width: 30%;
    }

    table input {
      background-color: white;
      border-radius: 50rem;
      padding-left: .5rem;
      padding-right: .5rem;
      width: 100%;
      font-size: 1rem;
      font-weight: 400;
    }

    button {
      background-color: white;
      border-radius: 50rem;
      padding: 0 1rem;
      font-weight: 700;
    }
  }

  .modal {
    display: none;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.4);
    z-index: 9999;
  }

  .modal-content {
    background-color: #fefefe;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;

    button {
      background-color: globalSharedVariables.$orange;
      border-radius: 50rem;
      padding: 0 1rem;
    }

    h2 {
      text-align: center;
    }
  }

  .appInfo-table {
    table {
      width: 100%;
    }

    td, th {
      padding: .5rem;
    }

    th {
      text-align: right;
      width: 30%;
    }
  }

  .questionInfo-table {
    width: 100%;

    th {
      width: auto;
    }

    td, th {
      padding: .25rem;
      border: solid black 1px;
    }
  }

  .accordion {
    background-color: #eee;
    color: #444;
    cursor: pointer;
    padding: 18px;
    width: 100%;
    border: none;
    text-align: left;
    outline: none;
    font-size: 15px;
    transition: 0.4s;
  }

  .active, .accordion:hover {
    background-color: #ccc;
  }

  .accordion:after {
    content: '\002B';
    color: #777;
    font-weight: bold;
    float: right;
    margin-left: 5px;
  }

  .active:after {
    content: "\2212";
  }

  .panel {
    padding: 0 18px;
    background-color: white;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.2s ease-out;
  }

</style>