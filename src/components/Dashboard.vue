<template>
  <div v-if="userAppsLoaded == true && onSaleAppsLoaded == true" class="body">
    <div style="margin-left: 40px; margin-top: 90px;">
      <b>
        <b-icon-arrow-left></b-icon-arrow-left>
      </b>
      <router-link class="text-dark" to="/">
        &nbsp;
        <b>RETURN TO HOME PAGE</b>
      </router-link>
    </div>

    <div class="text-right">
      <b style="background-color: #ff930f;" @click="setOnSaleView(false)"
        >User dashboard</b
      >&nbsp;&nbsp;

      <b style="background-color: #ff930f;" @click="setOnSaleView(true)"
        >Apps for sale</b
      >
    </div>

    <div class="applicationSection">
      <span class="box" v-for="app in pageOfApps" v-bind:key="app.title">
        <b-row>
          <b-col cols="5">
            <div v-if="app.appLogotype">
              <img :src="app.appLogotype" class="placeImage" />
            </div>
            <div v-else class="place" />
          </b-col>

          <b-col cols="6">
            <p class="heading">
              <b>{{ app.title }}</b>
            </p>

            <b-row>
              <b-col cols="6">
                <button class="info">
                  <router-link
                    class="text-dark"
                    :to="{ name: 'viewapp', params: { application: app } }"
                    ><b>Edit</b></router-link
                  >
                </button></b-col
              >

              <b-col cols="6">
                <button class="edit">
                  <router-link
                    class="text-dark"
                    :to="{ name: 'editapp', params: { application: app } }"
                    ><b>About</b></router-link
                  >
                </button></b-col
              >
            </b-row>
          </b-col>
        </b-row>

        <b-modal
          id="promptAppDeleteModal"
          scrollable
          size="lg  "
          :title="'Are you sure you want to delete this app?'"
        >
          <p>
            Currently, all questions from the deleted application will remain on
            the database.
          </p>

          <br />
          <b-button
            squared
            variant="light"
            type="submit"
            size="lg"
            class="text-dark createNewApp"
            @click="closeAppDeletion(appToBeDeleted)"
          >
            <h4>
              Delete application
            </h4>
          </b-button>
        </b-modal>

        <b-row>
          <b-col cols="8">
            <div class="summary">
              <span>Application Version: {{ app.version }}</span
              ><br />
              <span>Application Status: {{ app.status }}</span
              ><br />
              <span>Deployment Date: {{ app.deploymentDate }}</span
              ><br />
              <span>Deployment Count: {{ app.deploymentCode }}</span>

              <b-row>
                <b-col cols="2"
                  ><b>
                    <span
                      @click="promptUserOfAppDeletion(app)"
                      class="closeDashboard"
                      aria-label="Close"
                      aria-hidden="true"
                      >×</span
                    >
                  </b></b-col
                >

                <b-col cols="2"
                  ><b>
                    <span @click="download(app, 'app.txt', 'text/plain')"
                      ><b-icon-download></b-icon-download
                    ></span> </b
                ></b-col>

                <b-col cols="2"
                  ><button color="warning" size="sm">
                    <router-link
                      class="text-dark"
                      :to="{ name: 'newapp', params: { application: app } }"
                      >Clone</router-link
                    >
                  </button></b-col
                >
              </b-row>
            </div>
          </b-col>
        </b-row>
      </span>
    </div>

    <div class="paginationSection">
      <div class="pb-0 pt-3">
        <jw-pagination
          style="border: solid 1px gray;"
          :items="onSaleView ? getOnSaleApplications : getApplications"
          :pageSize="3"
          @changePage="onChangePage"
        ></jw-pagination>
      </div>
    </div>
  </div>

  <div style="margin-top: 90px;" v-else>
    <Spinner size="big" message="Loading..." speed="0.4"></Spinner>
  </div>
</template>

<script>
import { BIconArrowLeft } from "bootstrap-vue";
import instance from "../axios.js"
import { BIconDownload } from "bootstrap-vue";
import Spinner from "vue-simple-spinner";

export default {
  components: {
    BIconDownload,
    Spinner,
    BIconArrowLeft,
  },

  computed: {
    getApplications() {
      return this.$store.getters.getApplications;
    },
    getOnSaleApplications() {
      return this.$store.getters.getOnSaleApplications;
    },
  },
  data() {
    return {
      applications: [],
      userAppsLoaded: false,
      onSaleAppsLoaded: false,
      pageOfApps: [],
      appToBeDeleted: {},
      onSaleView: false,
    };
  },

  mounted: function() {
    if (this.getApplications == null || this.getApplications.length == 0) {
      instance
        .get(
          "api/appAdmin/" +
            this.$store.getters.getCurrentUser
        )
        .then((response) => {
          console.log("Bla: ", response.data);
          if (response.data.length > 0 && response.data.title != "") {
            var i = 0;
            var j = 0;
            var applications = this.getApplications;
            console.log("this.getApps = ", applications);

            // Application from server shouldn't be added to store if it is a duplicate
            var noDuplicate = true;

            if (applications.length != 0) {
              for (i = 0; i < response.data.length; i++) {
                noDuplicate = true; // by default

                console.log(response.data.length);
                for (j = 0; j < applications.length; j++) {
                  console.log(response.data[i].id, applications[j].id);

                  if (response.data[i].id == applications[j].id) {
                    noDuplicate = false;
                    break;
                  }
                }

                if (noDuplicate == true) {
                  this.$store.commit("addApplication", response.data[i]);
                }
              }
            } else {
              var z = 0;
              for (z = 0; z < response.data.length; z++) {
                this.$store.commit("addApplication", response.data[z]);
              }
            }

            this.userAppsLoaded = true;
            console.log("User apps loaded: ", this.userAppsLoaded);
          } else {
            this.userAppsLoaded = true;
            console.log("User apps loaded: ", this.userAppsLoaded);
          }
        })

        .catch((error) => console.log(error));
    } else {
      this.userAppsLoaded = true;
      console.log("On sale apps loaded: ", this.userAppsLoaded);
    }

    console.log("On sale first: ", this.getOnSaleApplications);

    if (
      this.getOnSaleApplications == null ||
      this.getOnSaleApplications.length == 0
    ) {
      instance
        .get(
          "appAdmin/forsaleapps/" +
            this.$store.getters.getCurrentUser
        )
        .then((response) => {
          console.log("For sale apps loaded axios: ", response.data);
          console.log(
            "For sale apps loaded state: ",
            this.getOnSaleApplications
          );

          if (response.data.length > 0 && response.data.title != "") {
            console.log("Inside here");
            var i = 0;
            var j = 0;
            var applicationsOnSale = this.getOnSaleApplications;

            // Application from server shouldn't be added to store if it is a duplicate
            if (applicationsOnSale.length != 0) {
              for (i = 0; i < response.data.length; i++) {
                console.log(response.data.length);
                for (j = 0; j < applicationsOnSale.length; j++) {
                  console.log(response.data[i].id, applicationsOnSale[j].id);
                }

                this.$store.commit("addApplicationForSale", response.data[i]);
              }
            } else {
              var z = 0;
              for (z = 0; z < response.data.length; z++) {
                this.$store.commit("addApplicationForSale", response.data[z]);
              }
            }

            this.onSaleAppsLoaded = true;
            console.log(
              "On sale apps loaded: ",
              this.onSaleAppsLoaded,
              this.getOnSaleApplications
            );
          } else {
            this.$store.commit("setApplicationsOnSale", []);
            this.onSaleAppsLoaded = true;
            console.log(
              "On sale apps loaded: ",
              this.onSaleAppsLoaded,
              this.getOnSaleApplications
            );
          }
        })

        .catch((error) => console.log(error));
    } else {
      this.onSaleAppsLoaded = true;
      console.log(
        "On sale apps loaded: ",
        this.onSaleAppsLoaded,
        this.getOnSaleApplications
      );
    }
  },

  methods: {
    promptUserOfAppDeletion(app) {
      this.appToBeDeleted = app;
      this.$bvModal.show("promptAppDeleteModal");
    },

    closeAppDeletion(appToBeDeleted) {
      this.deleteApplication(appToBeDeleted);
      this.appToBeDeleted = {};

      this.$bvModal.hide("promptAppDeleteModal");
    },

    setOnSaleView(chosenButton) {
      this.onSaleView = chosenButton;
    },

    deleteApplication(app) {
      instance.delete("api/appAdmin/" + app.id).then(() => {
        this.$store.commit("removeApplication", app);
      });
    },

    onChangePage(pageOfApps) {
      this.pageOfApps = pageOfApps;
    },

    download(app, filename, type) {
      // Download application without full question or app screenshots/logotypes data. When app is loaded into the website, automatically pull the questions/images as needed
      var appToDownload = {
        title: app.title,
        subtitle: app.subtitle,
        id: app.id,
        privacyPolicyURL: app.privacyPolicyURL,
        companyName: app.companyLogotype,
        appLogotype: [],
        companyLogotype: [],
        appDescription: app.appDescription,
        appScreenshots: [],
        certifications: app.certifications,
        type: app.type,
        bundleID: app.bundleID,
        maxAndMin: app.maxAndMin,
        primaryLanguage: app.primaryLanguage,
        SKU: app.SKU,
        ageRating: app.ageRating,
        category: app.category,
        price: app.price,
        discountedPrice1: app.discountedPrice1,
        discountedPrice2: app.discountedPrice2,
        country: app.country,
        region: app.region,
        onSale: app.onSale,
        version: app.version,
        status: app.status,
        deploymentDate: app.deploymentDate,
        deploymentCode: app.deploymentCode,
        questions: [],
        questionIDs: app.questionIDs,
        reportTitle: app.reportTitle,
        defaultReportEmail: app.defaultReportEmail,
        allowChangeReportEmail: app.allowChangeReportEmail,
        addRemoveReportDestinations: app.addRemoveReportDestinations,
        reportHeaderContent: app.reportHeaderContent,
        reportFooterContent: app.reportFooterContent,
        reportColorTheme: app.reportColorTheme,
      };

      var data = JSON.stringify(appToDownload);

      var file = new Blob([data], { type: type });
      console.log("Application before downloading: ", data);
      if (window.navigator.msSaveOrOpenBlob)
        window.navigator.msSaveOrOpenBlob(file, filename);
      else {
        var a = document.createElement("a"),
          url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 0);
      }
    },
  },
};
</script>

<style>
.createNewApp {
  background-color: #ff930f;
  color: #ff930f;
  border-color: #ff930f;
}

.createNewApp:hover {
  background-color: #ff930f;
  color: #ff930f;
  border-color: #ff930f;
}

.createNewApp:active {
  background-color: #ff930f;
  color: #ff930f;
  border-color: #ff930f;
}

.paginationSection {
  margin-top: 25%;
  margin-left: 40px;
}

.box {
  float: left;
  margin-top: 25px;
  position: relative;
  background: white;
  color: base;
  width: 350px;
  height: 270px;
  margin-left: 40px;
  text-align: center;
  overflow: hidden;
  -webkit-backface-visibility: hidden;
  border: solid 1px gray;
}
.heading {
  font-size: 1em;
  background: rgba(255, 255, 255, 0.13);
  margin-top: 20px;
  text-align: left;
}

.closeDashboard {
  font-size: 2em;
  text-align: right;
}

.info {
  padding: 0.2em 1em;
  background-color: #ffcc99;
  box-sizing: border-box;
  text-decoration: none;
  font-weight: 200;
  text-align: center;
  right: 10px;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
  border: none;
  text-decoration-color: black;
}
.edit {
  padding: 0.2em 1em;
  background-color: #ffcc99;
  box-sizing: border-box;
  text-decoration: none;
  font-weight: 200;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
  border: none;
  color: black;
}

.runApp {
  display: inline-block;
  padding: 0.5em 3em;
  border: 0.16em solid rgba(255, 255, 255, 0);
  margin: 0 0.35em 0.3em 0;
  border-radius: 2em;
  background-color: #d3d3d3;
  width: 30px;
  box-sizing: border-box;
  text-decoration: none;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  color: white;
  text-align: center;
  border-color: rgba(255, 255, 255, 1);
  transition: all 0.2s;
  position: absolute;
  right: 20px;
  margin-top: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.place {
  width: 120px;
  height: 120px;
  text-align: center;
  line-height: 30px;
  padding: 3px 0;
  float: left;
  margin-left: 20px;
  margin-top: 20px;
  background-color: #8c8c8c;
}

.placeImage {
  width: 120px;
  height: 120px;
  text-align: center;
  line-height: 30px;
  padding: 3px 0;
  float: left;
  margin-left: 20px;
  margin-top: 20px;
}
.summary {
  font-size: 13px;
  margin-left: 20px;
  margin-bottom: 7px;
  text-align: left;
}
</style>
