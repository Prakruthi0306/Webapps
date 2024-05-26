<template>
  <b-container style="margin-top: 100px;">
    <b-row class="justify-content-center">
      <div class="col-md-8">
        <h4 class="mx-auto">
          <b>Create New Application</b>
        </h4>
        <br />
        <b-card bg-variant="white" class="container">
          <b-form @submit="onSubmit">
            <b-form-group label-for="nested-title" label="Title:">
              <b-form-input
                inline
                id="nested-title"
                v-model="form.title"
                type="title"
                required
                placeholder="Max 140 characters"
                maxlength="140"
                ><small>
                  <b-alert
                    :key="form.showAlertTitle"
                    :show="form.showAlertTitle == true"
                    variant="danger"
                    >{{ form.titleError }}</b-alert
                  ></small
                ></b-form-input
              >
            </b-form-group>

            <b-form-group label="Subtitle:" label-for="nested-subtitle">
              <b-form-input
                id="nested-subtitle"
                v-model="form.subtitle"
                type="subtitle"
                required
                placeholder="Max 140 characters"
                maxlength="255"
              ></b-form-input>
            </b-form-group>

            <b-form-group label="Custom ID:" label-for="nested-customID">
              <b-form-input
                id="nested-customID"
                v-model="form.id"
                type="customID"
                required
                placeholder="Max 24 characters"
                maxlength="24"
              ></b-form-input>
            </b-form-group>
            <small>
              <b-form-radio
                v-if="application"
                v-model="form.wishToShareQuestions"
                name="some-radios"
                value="A"
                >Share questions with cloned app</b-form-radio
              ></small
            >
            <small>
              <b-form-radio
                v-if="application"
                v-model="form.wishToShareQuestions"
                name="some-radios"
                value="B"
                >Don't share questions with cloned app</b-form-radio
              ></small
            ><br />

            <div>
              <b-button
                squared
                type="submit"
                size="lg"
                class="createNewApp text-dark"
              >
                <b>Create application</b>
              </b-button>
            </div>
          </b-form></b-card
        >
      </div>
    </b-row>
  </b-container>
</template>

<script>
import instance from "../axios.js"
export default {
  name: "newApplicationForm",
  props: {
    application: Object,
  },
  data() {
    return {
      form: {
        title: "",
        subtitle: "",
        id: null,
        titleError: "",
        showAlertTitle: false,
        wishToShareQuestions: "",
        checked: [],
      },
    };
  },
  computed: {
    getApplications() {
      return this.$store.getters.getApplications;
    },
  },

  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.showAlertTitle = false;

      //var qs = require("qs");
      var applicationToClone = this.application ? true : false;

      var currentApps = this.getApplications;

      console.log("Application to clone: ", applicationToClone);
      console.log("Application props: ", this.application);

      var i = 0;
      var e = 0;
      var j = 0;
      var currentQuestionID = "";
      var questionList = [];
      var tempTitle = "";
      var validTitle = true;

      if (applicationToClone == true) {
        for (i = 0; i < currentApps.length; i++) {
          tempTitle = currentApps[i].title;
          if (this.form.title === tempTitle) {
            validTitle = false;
            this.form.showAlertTitle = true;
            this.form.titleError =
              "This application's title matches that of another; change it to a unique title";
            console.log("Matching titles: ", tempTitle);
          }
        }
      }

      console.log("Valid title outside for loop ", validTitle);

      if (validTitle) {
        var application = {
          title: this.form.title,
          subtitle: this.form.subtitle,
          id: "" + Math.ceil(Math.random() * 500),
          privacyPolicyURL: applicationToClone
            ? this.application.privacyPolicyURL
            : "",
          companyName: applicationToClone ? this.application.companyName : "",
          appLogotype: applicationToClone ? this.application.appLogotype : "",
          companyLogotype: applicationToClone
            ? this.application.companyLogotype
            : "",
          appDescription: applicationToClone
            ? this.application.appDescription
            : "",
          appScreenshots: applicationToClone
            ? this.application.appScreenshots
            : [],
          certifications: applicationToClone
            ? this.application.certifications
            : "",
          type: applicationToClone ? this.application.type : "Assessment",
          bundleID: applicationToClone ? this.application.bundleID : 0,
          maxAndMin: applicationToClone
            ? this.application.maxAndMin
            : ["5", "30"],
          primaryLanguage: applicationToClone
            ? this.application.primaryLanguage
            : "English (U.S.)",
          SKU: applicationToClone ? this.application.SKU : "",
          ageRating: applicationToClone ? this.application.ageRating : 0,
          category: applicationToClone
            ? this.application.category
            : ["Education", "Health & Fitness"],
          price: applicationToClone ? this.application.price : "",
          discountedPrice1: applicationToClone
            ? this.application.discountedPrice1
            : "",
          discountedPrice2: applicationToClone
            ? this.application.discountedPrice2
            : "",
          country: applicationToClone ? this.application.country : "",
          region: applicationToClone ? this.application.region : "",
          onSale: applicationToClone ? this.application.onSale : "",
          version: applicationToClone ? this.application.version : "",
          status: applicationToClone ? this.application.status : "",
          deploymentDate: applicationToClone
            ? this.application.deploymentDate
            : "",
          deploymentCode: applicationToClone
            ? this.application.deploymentCode
            : "",
          questions: [],
          questionIDs: applicationToClone ? this.application.questionIDs : [],
          reportTitle: applicationToClone ? this.application.reportTitle : "",
          defaultReportEmail: applicationToClone
            ? this.application.defaultReportEmail
            : "",
          allowChangeReportEmail: applicationToClone
            ? this.application.allowChangeReportEmail
            : false,
          addRemoveReportDestinations: applicationToClone
            ? this.application.addRemoveReportDestinations
            : "Add",
          reportHeaderContent: applicationToClone
            ? this.application.reportHeaderContent
            : "",
          reportFooterContent: applicationToClone
            ? this.application.reportFooterContent
            : "",
          reportColorTheme: applicationToClone
            ? this.application.reportColorTheme
            : "Yellow",
          userID: this.$store.getters.getCurrentUser,
        };

        console.log("Application to submit: ", application);

        // let headers = "Content-Type: application/json";
        instance
          .post(
            "api/appAdmin",

            application
          )
          .then((response) => {
            console.log("new application created on server: ", response.data),
              (this.apps = response.data);
          })
          .catch((error) => console.log(error));

        if (applicationToClone == true && this.wishToShareQuestions == "A") {
          if (this.application.questionIDs.length > 0) {
            // Loop through the question IDs and get all questions matching the IDs in list

            for (e = 0; e < this.application.questionIDs.length; e++) {
              currentQuestionID = this.application.questionIDs[e];
              console.log(currentQuestionID);
              instance
                .get("api/question/" + currentQuestionID)
                .then((response) => {
                  console.log("Response data to GET question: ", response.data);
                  questionList.push(response.data);

                  console.log("Right outside if block with j = ", j);

                  // If we are on our last question ID
                  if (
                    j >= this.application.questionIDs.length - 1 &&
                    this.application.questionIDs.length == questionList.length
                  ) {
                    console.log("Inside if block");

                    for (j = 0; j < questionList.length; j++) {
                      let question = {
                        shared: questionList[j].shared + 1,
                        number: questionList[j].number,
                        text: questionList[j].text,
                        description: questionList[j].description,
                        category: questionList[j].category,
                        subCategory: questionList[j].subCategory,
                        id: questionList[j].id,
                        instructionVideo: questionList[j].instructionVideo,
                        childImages: questionList[j].childImages,
                        specialistImages: questionList[j].specialistImages,
                        imageOrganization: questionList[j].imageOrganization,
                        buttonOrganization: questionList[j].buttonOrganization,
                        questionType: questionList[j].questionType,
                        displayType: questionList[j].displayType,
                        answerOptions: questionList[j].answerOptions,
                        singleCorrectAnswer:
                          questionList[j].singleCorrectAnswer,
                        multipleCorrectAnswers:
                          questionList[j].multipleCorrectAnswers,
                        childSelectedAnswerSingle:
                          questionList[j].childSelectedAnswerSingle,
                        childSelectedAnswerMultiple:
                          questionList[j].childSelectedAnswerMultiple,
                        whenButtonPressed: questionList[j].whenButtonPressed,

                        textToSpeech: questionList[j].textToSpeech,
                        textToSpeech1: questionList[j].textToSpeech1,
                        textToSpeech2: questionList[j].textToSpeech2,
                        textToSpeech3: questionList[j].textToSpeech3,

                        timeLimit1Minutes: questionList[j].timeLimit1Minutes,
                        timeLimit1Seconds: questionList[j].timeLimit1Seconds,
                        timeLimit1Reached: questionList[j].timeLimit1Reached,

                        timeLimit2Minutes: questionList[j].timeLimit2Minutes,
                        timeLimit2Seconds: questionList[j].timeLimit2Seconds,
                        timeLimit2Reached: questionList[j].timeLimit2Reached,

                        scoringOptions: questionList[j].scoringOptions,
                        selectedScoringOptions:
                          questionList[j].selectedScoringOptions,
                        selectedScoreInPreview:
                          questionList[j].selectedScoreInPreview,
                        audioRecording: questionList[j].audioRecording,
                        audioRecordingTimeLimitMinutes:
                          questionList[j].audioRecordingTimeLimitMinutes,
                        audioRecordingTimeLimitSeconds:
                          questionList[j].audioRecordingTimeLimitSeconds,
                        audioClips: questionList[j].audioClips,
                        videoClips: questionList[j].videoClips,

                        selectedCameras: questionList[j].selectedCameras,
                        procedureContent: questionList[j].procedureContent,
                        promptContent1: questionList[j].promptContent1,
                        promptContent2: questionList[j].promptContent2,
                        dualApplication: questionList[j].dualApplication,

                        locationLimit: questionList[j].locationLimit,
                        country: questionList[j].country,
                        region: questionList[j].region,

                        selectedGraphTypes: questionList[j].selectedGraphTypes,

                        typicalRange: questionList[j].typicalRange,
                        absoluteRange: questionList[j].absoluteRange,

                        tallyPromptPresses: questionList[j].tallyPromptPresses,
                        tallyRepeatPresses: questionList[j].tallyRepeatPresses,
                        repeatClicks: questionList[j].repeatClicks,
                        promptClicks: questionList[j].promptClicks,
                        bioSensors: questionList[j].bioSensors,
                        eegSensitivity: questionList[j].eegSensitivity,
                        emgSensitivity: questionList[j].emgSensitivity,
                        ecgSensitivity: questionList[j].ecgSensitivity,
                        gestureRecognition: questionList[j].gestureRecognition,
                        frontCamSensitivity:
                          questionList[j].frontCamSensitivity,
                        rightCamSensitivity:
                          questionList[j].rightCamSensitivity,
                        leftCamSensitivity: questionList[j].leftCamSensitivity,
                      };

                      console.log("Question to update: ", question);

                      instance
                        .patch(
                          "api/question/" + question.id,
                          question
                        )
                        .then(() => {
                          console.log("Question updated: id ", question.id);
                        });
                    }
                  }

                  j++;
                })
                .catch((error) => console.log(error));
            }
          }
        }

        this.$store.commit("addApplication", application);
        this.$router.push({ path: "/adminDashboard" });
      }
    },

    onCancel(evt) {
      evt.preventDefault();
      this.$emit("clicked", false);
    },
  },
};
</script>

<style scoped>
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

.vertical-center {
  min-height: 100%; /* Fallback for browsers do NOT support vh unit */
  min-height: 100vh; /* These two lines are counted as one :-)       */

  display: flex;
  align-items: center;
}
</style>
