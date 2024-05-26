<template>
  <div>
    <input type="file" id="file-input" />
    <button id="read-button" @click="selectApplication">Read File</button>

    <br />
    <br />
    <div>
      <b-button variant="dark" text-variant="dark">
        <router-link
          :to="{ name: 'viewapp', params: { application: application } }"
          >View/Edit application</router-link
        >
      </b-button>
    </div>
  </div>
</template>

<script>
import instance from "../axios.js"

export default {
  name: "SelectApplicationPage",
  data() {
    return {
      application: {
        title: "X",
        subtitle: "X",
        customID: "X",
        id: "" + Math.ceil(Math.random() * 500),
        privacyPolicyURL: "",
        companyName: "",
        appLogotype: "",
        companyLogotype: "",
        appDescription: "",
        appScreenshots: [],
        certifications: "",
        type: "Assessment",
        bundleID: 0,
        maxAndMin: ["5", "30"],
        primaryLanguage: "English (U.S.)",
        SKU: "",
        ageRating: 0,
        category: ["Education", "Health & Fitness"],
        price: 0,
        discountedPrice1: 0,
        discountedPrice2: 0,
        country: "",
        region: "",
        onSale: "",
        version: "",
        status: "",
        deploymentDate: "",
        deploymentCode: "",
        questions: [],
        reportTitle: "",
        defaultReportEmail: "",
        allowChangeReportEmail: false,
        addRemoveReportDestinations: "Add",
        reportHeaderContent: "",
        reportFooterContent: "",
        reportColorTheme: "Yellow",
      },
    };
  },

  computed: {
    getApplications() {
      return this.$store.getters.getApplications;
    },
  },

  methods: {
    selectApplication() {
      const file = document.querySelector("#file-input").files[0];
      const reader = new FileReader();
      let tempThis = this;

      reader.onload = function(e) {
        var temp = JSON.parse(e.target.result);
        console.log("Title: ", temp.title);
        console.log("Title 2: ", tempThis.application.title);

        var tempApps = this.getApplications;
        var notFound = false; // does this loaded application already exist? If not, don't add it (it will conflict with the existing version)
        var i = 0;

        for (i = 0; i < tempApps.length; i++) {
          if (temp.id == tempApps[i].id) {
            notFound = true;
          }
        }

        if (notFound == false) {
          tempThis.application.title = temp.title;
          tempThis.application.subtitle = temp.subtitle;
          tempThis.application.id = temp.id;

          tempThis.application.privacyPolicyURL = temp.privacyPolicyURL;
          tempThis.application.companyName = temp.companyName;
          tempThis.application.companyLogotype = temp.companyLogotype;
          tempThis.application.appLogotype = temp.appLogotype;
          tempThis.application.appDescription = temp.appDescription;
          tempThis.application.appScreenshots = temp.appScreenshots;
          tempThis.application.certifications = temp.certifications;
          tempThis.application.type = temp.type;
          tempThis.application.bundleID = temp.bundleID;
          tempThis.application.SKU = temp.SKU;
          tempThis.application.ageRating = temp.ageRating;
          tempThis.application.maxAndMin = temp.maxAndMin;
          tempThis.application.primaryLanguage = temp.primaryLanguage;
          tempThis.application.category = temp.category;
          tempThis.application.price = temp.price;
          tempThis.application.discountedPrice1 = temp.discountedPrice1;
          tempThis.application.discountedPrice2 = temp.discountedPrice2;
          tempThis.application.country = temp.country;
          tempThis.application.region = temp.region;
          tempThis.application.onSale = temp.onSale;
          tempThis.application.version = temp.version;
          tempThis.application.status = temp.status;
          tempThis.application.deploymentDate = temp.deploymentDate;
          tempThis.application.deploymentCode = temp.deploymentCode;
          tempThis.application.questions = temp.questions;
          tempThis.application.questionIDs = temp.questionIDs;

          tempThis.application.reportTitle = temp.reportTitle;
          tempThis.application.defaultReportEmail = temp.defaultReportEmail;
          tempThis.application.allowChangeReportEmail =
            temp.allowChangeReportEmail;
          tempThis.application.addRemoveReportDestinations =
            temp.addRemoveReportDestinations;
          tempThis.application.reportHeaderContent = temp.reportHeaderContent;
          tempThis.application.reportFooterContent = temp.reportFooterContent;
          tempThis.application.reportColorTheme = temp.reportColorTheme;

          let headers = "Content-Type: application/json";

          instance
            .post(
              "api/appAdmin",
              tempThis.application,
              headers
            )
            .then((response) => {
              console.log("new application created on server: ", response.data);
              /*tempThis.companyLogotype = response.data.companyLogotype;
            tempThis.appLogotype = response.data.appLogotype;
            tempThis.appScreenshots = response.data.appScreenshots;*/
            });

          this.$store.commit("addApplication", tempThis.application);
        } else {
          // Do nothing, don't add application
        }
      };

      reader.readAsText(file);
    },
  },
};
</script>

<style scoped>
.dashboard {
  position: relative;
  margin-top: 2%;
  padding: 1%;
  margin-left: 40%;
}
.configuration-button {
  background-color: #f7d8b4;
  color: #2e1406;
  border-radius: 18px;
  font-weight: bold;
}
.setting-modal {
  background-color: #f7d8b4;
  color: #2e1406;
}
</style>
