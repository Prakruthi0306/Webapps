<template>
  <div style="margin-left: 30px; margin-right: 30px;">
    <br />
    <br />

    <b>
      <b-icon-arrow-left></b-icon-arrow-left>
    </b>
    <router-link
      :to="{ name: 'viewapp', params: { application: this.application } }"
      class="text-dark"
    >
      &nbsp;
      <b>RETURN TO EDITING QUESTIONS</b>
    </router-link>

    <br />
    <br />

    <h4>
      <b>Run Application: Question {{ selectedQuestion.number }}</b>
    </h4>
    <br />
    <b-form-row no-gutters="true">
      <b-col cols="2">
        <b-card bg-variant="white" class="container">
          <img class="logo" src="../images/neuroleap_logo.png" />
          <br />
          <br />

          <h5>Questions/Tasks</h5>
        </b-card>
        <b-list-group>
          <b-list-group-item
            v-for="question in getQuestions"
            v-bind:key="question.number"
            @click="setSelectedQuestion(question)"
            :class="setListItemClass(question)"
          >
            <br />

            <b-container>
              <p>
                {{ question.category }}
                <b-form-text>{{ question.subCategory }}</b-form-text>
              </p>

              <span>
                {{ question.number }}. &nbsp; {{ question.text }}
                <br />
              </span>
              <br />
            </b-container>
          </b-list-group-item>
        </b-list-group>

        <b-card bg-variant="white" class="container">
          <b-row>
            <b-col cols="4">
              <img
                class="cardButtonRow"
                src="../images/icons_svg/Yellow/world_down.svg"
              />
            </b-col>

            <b-col cols="4">
              <img
                class="cardButtonRow"
                src="../images/icons_svg/Yellow/phone_down.svg"
              />
            </b-col>

            <b-col cols="4">
              <img
                class="cardButtonRow"
                src="../images/icons_svg/Yellow/question_down.svg"
              />
            </b-col>
          </b-row>
        </b-card>
      </b-col>

      <b-col cols="7">
        <b-card bg-variant="white" class="container">
          <b-row>
            <b-col>
              <PercentageCircle
                :percent="getPercent()"
                size="big"
                active-color="blue"
                complete-color="green"
              />
            </b-col>

            <b-col>
              <b-form-text @click="choosePreviousQuestion"
                >Previous Question</b-form-text
              >
              <h5>
                <b>
                  {{ getPreviousQuestion().number }}. &nbsp;
                  {{ getPreviousQuestion().text }}
                </b>
              </h5>

              <b-form-text @click="chooseNextQuestion"
                >Next Question</b-form-text
              >
              <h5>
                <b>
                  {{ getNextQuestion().number }}. &nbsp;
                  {{ getNextQuestion().text }}
                </b>
              </h5>
            </b-col>

            <b-col>
              <b-form-text
                >Suggested Score: {{ getSuggestedScore() }}</b-form-text
              >
              <h5>Verdict: {{ selectedQuestion.selectedScoreInPreview }}</h5>
            </b-col>
          </b-row>
        </b-card>

        <br />

        <b-card bg-variant="white" class="container" style="font-size: medium;">
          <b-row>
            <b-col cols="3">
              <b-row>
                <b-col cols="1">
                  <b-icon-arrow-left-circle-fill
                    @click="choosePreviousQuestion"
                  ></b-icon-arrow-left-circle-fill>
                </b-col>
                <b-col cols="1">
                  <b-icon-arrow-right-circle-fill
                    @click="chooseNextQuestion"
                  ></b-icon-arrow-right-circle-fill>
                </b-col>
                <b-col cols="1">
                  <b-icon-arrow-repeat
                    @click="repeatQuestion"
                  ></b-icon-arrow-repeat>
                </b-col>
              </b-row>
              <br />
              <p>
                {{ selectedQuestion.category }}
                <b-form-text>{{ selectedQuestion.subCategory }}</b-form-text>
              </p>
            </b-col>

            <b-col cols="6">
              <b-card-header
                style="background-color: #ff930f; height: 20px;"
              ></b-card-header>

              <b-card bg-variant="light" class="container">
                <b>
                  {{ selectedQuestion.number }}. &nbsp;
                  {{ selectedQuestion.text }}
                </b>
              </b-card>
            </b-col>

            <b-col>
              <b-button
                variant="primary"
                style="background-color: #3333ff;"
                v-b-modal.report
              >
                <b>VIEW REPORT</b>
              </b-button>
            </b-col>
          </b-row>

          <br />

          <b-row>
            <div
              v-if="selectedQuestion.buttonOrganization == 'Next to each other'"
            >
              <b-button
                v-for="answer in getAnswers()"
                v-bind:key="answer"
                class="answerButtonHorizontal text-dark"
                v-bind:class="setChildSelectedAnswerClasses(answer)"
                @click="setChildSelectedAnswers(answer)"
              >
                <b>{{ answer }}</b>
              </b-button>

              <div v-if="selectedQuestion.imageOrganization == 'Horizontal'">
                <br />

                <b-row>
                  <b-col>
                    <b-img
                      v-for="imageURL in getImages(selectedQuestion)"
                      v-bind:key="imageURL"
                      :src="imageURL"
                      left
                      class="col-md-6"
                      fluid
                    ></b-img>
                  </b-col>
                </b-row>
              </div>

              <div v-else>
                <b-col>
                  <b-img
                    v-for="imageURL in getImages(selectedQuestion)"
                    right
                    v-bind:key="imageURL"
                    :src="imageURL"
                    fluid
                  ></b-img>
                </b-col>
              </div>
            </div>

            <div v-else>
              <b-row>
                <b-col>
                  <div
                    v-if="selectedQuestion.imageOrganization == 'Horizontal'"
                  >
                    <b-col>
                      <b-img
                        v-for="imageURL in getImages(selectedQuestion)"
                        v-bind:key="imageURL"
                        :src="imageURL"
                        left
                        class="col-md-6"
                        fluid
                      ></b-img>
                    </b-col>
                  </div>

                  <div v-else>
                    <b-col>
                      <b-img
                        v-for="imageURL in getImages(selectedQuestion)"
                        right
                        v-bind:key="imageURL"
                        :src="imageURL"
                        fluid
                      ></b-img>
                    </b-col>
                  </div>
                </b-col>

                <b-col cols="4">
                  <b-button
                    v-for="answer in getAnswers()"
                    v-bind:key="answer"
                    class="mr-3 answerButtonVertical text-dark"
                    v-bind:class="setChildSelectedAnswerClasses(answer)"
                    @click="setChildSelectedAnswers(answer)"
                  >
                    <b>{{ answer }}</b>
                  </b-button>
                </b-col>
              </b-row>
            </div>
          </b-row>

          <br />

          <b-row>
            <img class="buttonsBelowQuestion" src="../images/VR-Button.png" />

            <img class="buttonsBelowQuestion" src="../images/Bio-Button.png" />

            <img class="buttonsBelowQuestion" src="../images/GR-Button.png" />

            <b-button
              v-for="score in selectedQuestion.selectedScoringOptions"
              v-bind:key="score"
              pill
              @click="setScore(score)"
              size="sm"
              style="font-size: small;"
              class="buttonsBelowQuestion"
              v-bind:class="{
                'btn  btn-light btn-outline-danger':
                  score == '0' &&
                  selectedQuestion.selectedScoreInPreview != '0',

                'btn  btn-light btn-outline-success':
                  (score == '+1' &&
                    selectedQuestion.selectedScoreInPreview != '+1') ||
                  (score == '+2' &&
                    selectedQuestion.selectedScoreInPreview != '+2') ||
                  (score == '+3' &&
                    selectedQuestion.selectedScoreInPreview != '+3') ||
                  (score == '+4' &&
                    selectedQuestion.selectedScoreInPreview != '+4'),

                'btn btn-danger':
                  score == '0' &&
                  selectedQuestion.selectedScoreInPreview == '0',
                'btn btn-success':
                  (score == '+1' &&
                    selectedQuestion.selectedScoreInPreview == '+1') ||
                  (score == '+2' &&
                    selectedQuestion.selectedScoreInPreview == '+2') ||
                  (score == '+3' &&
                    selectedQuestion.selectedScoreInPreview == '+3') ||
                  (score == '+4' &&
                    selectedQuestion.selectedScoreInPreview == '+4'),
              }"
            >
              <b>{{ score }}</b>
            </b-button>

            <img
              class="buttonsBelowQuestion"
              src="../images/Info-Icon.png"
              v-b-popover.top="getProcedureContent"
              title="Procedure content"
            />

            <img
              class="buttonsBelowQuestion"
              src="../images/note+pen.png"
              v-b-modal.notes
            />

            <b-modal
              id="notes"
              scrollable
              size="lg"
              :title="
                'Enter notes on child for Question' +
                  ' ' +
                  selectedQuestion.number
              "
            >
              <b-row class="justify-content-center vertical-center">
                <div class="col-md-8">
                  <b-form-textarea
                    rows="8"
                    max-rows="8"
                    v-model="selectedQuestion.notes"
                  ></b-form-textarea>
                  <br />
                  <b-button
                    block="true"
                    squared
                    size="lg"
                    class="returnToPreviewButton text-dark"
                    @click="$bvModal.hide('notes')"
                  >
                    <b>Return to previewing questions</b>
                  </b-button>
                </div>
              </b-row>
            </b-modal>

            <img
              class="buttonsBelowQuestion"
              id="promptButton"
              src="../images/Prompt-Button.png"
            />

            <b-popover
              target="promptButton"
              triggers="click"
              :show.sync="promptDisplaying"
              @shown="showRelevantPrompt"
              @hidden="closeRelevantPrompt"
              :title="currentTimeBlock == 1 ? 'Prompt 1' : 'Prompt 2'"
            >
              <p>{{ promptText }}</p>
            </b-popover>

            <img
              class="buttonsBelowQuestion"
              src="../images/Recording-Button.png"
              v-b-modal.recordedAudiosModal
            />

            <b-modal
              id="recordedAudiosModal"
              scrollable
              size="lg  "
              :title="
                'Recorded audio clips for Question' +
                  ' ' +
                  selectedQuestion.number
              "
            >
              <b-row class="justify-content-center vertical-center">
                <div class="col-md-10">
                  <h4>Record audio</h4>
                  <br />

                  <b-card-group deck>
                    <b-card class="justify-content-center vertical-center">
                      <img
                        class="buttonsBelowQuestion cardButtonRow"
                        src="../images/Recording-Button.png"
                        @click="startRecordingAudio"
                      />
                      Start recording
                    </b-card>

                    <b-card>
                      <div v-if="pausedAudio == false">
                        <img
                          class="buttonsBelowQuestion cardButtonRow"
                          src="../images/icons_svg/Yellow/pause_down.svg"
                          @click="pauseRecordingAudio"
                        />
                        Pause recording
                      </div>

                      <div v-else>
                        <img
                          class="buttonsBelowQuestion cardButtonRow"
                          src="../images/icons_svg/Yellow/pause_up.svg"
                          @click="resumeRecordingAudio"
                        />Resume recording
                      </div>
                    </b-card>

                    <b-card>
                      <img
                        class="buttonsBelowQuestion cardButtonRow"
                        src="../images/icons_svg/Yellow/mic_down.svg"
                        @click="stopRecordingAudio"
                      />
                      Stop recording
                    </b-card>
                  </b-card-group>

                  <br />
                  <br />
                  <h4>Playback past audio</h4>
                  <br />

                  <b-row>
                    <b-col cols="8">
                      <div
                        v-for="(audio, index) in selectedQuestion.audioClips"
                        v-bind:key="audio"
                      >
                        <div style="float: left;">
                          <audio controls :src="getAudioClip(index)" />
                        </div>

                        <div
                          style="float: left; font-size: 50px; padding-left: 10px;"
                          class="close"
                          aria-label="Close"
                          @click="deleteAudioClip(index)"
                          aria-hidden="true"
                        >
                          ×
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                  <br />

                  <b-button
                    block="true"
                    squared
                    size="lg"
                    class="returnToPreviewButton text-dark"
                    @click="$bvModal.hide('recordedAudiosModal')"
                  >
                    <b>Return to previewing questions</b>
                  </b-button>
                </div>
              </b-row>
            </b-modal>

            <img
              class="buttonsBelowQuestion"
              src="../images/Instruction-Icon.png"
              v-b-modal.instructionVideo
            />

            <b-modal
              size="lg"
              id="instructionVideo"
              scrollable
              title="Instruction video"
            >
              <b-row class="justify-content-center vertical-center">
                <div class="col-md-8">
                  <br />

                  <div v-if="getInstructionVideo() != ''">
                    <video
                      :src="getInstructionVideo()"
                      width="100%"
                      autoplay
                      controls
                      class="videoFitParent"
                    />
                  </div>

                  <div v-else>
                    <h3>You have not uploaded any instruction video.</h3>

                    <p>
                      Please return to the questions editing page and upload an
                      instruction video for this question.
                    </p>
                  </div>

                  <div class="text-left">
                    <b-button
                      block="true"
                      squared
                      size="lg"
                      class="returnToPreviewButton text-dark"
                      @click="$bvModal.hide('instructionVideo')"
                    >
                      <b>Return to previewing questions</b>
                    </b-button>
                  </div>
                </div>
              </b-row>
            </b-modal>

            <b-modal
              scrollable
              @shown="displayReport"
              @hidden="closeReport"
              id="report"
              size="xl"
              :title="
                this.application.reportTitle != ''
                  ? this.application.reportTitle
                  : 'Report'
              "
            >
              <Report
                v-if="displayReportCheck"
                :application="this.application"
              />
            </b-modal>
          </b-row>
        </b-card>
        <br />

        <b-card-group>
          <b-card
            bg-variant="white"
            class="container"
            style="font-size: small;"
          >
            <b>EEG</b>
          </b-card>

          <b-card
            bg-variant="white"
            class="container"
            style="font-size: small;"
          >
            <div v-if="this.pausedVideo == false">
              <img
                class="cardButtonRow"
                src="../images/icons_svg/Yellow/pause_up.svg"
                @click="pauseRecordingVideo"
              />
              Pause recording
            </div>

            <div v-else>
              <img
                class="cardButtonRow"
                src="../images/icons_svg/Yellow/pause_down.svg"
                @click="resumeRecordingVideo"
              />Resume recording
            </div>
          </b-card>

          <b-card
            bg-variant="white"
            class="container"
            style="font-size: small;"
          >
            <img
              class="cardButtonRow"
              src="../images/icons_svg/Yellow/play_up.svg"
              v-b-modal.recordedVideosModal
            />Playback videos
          </b-card>

          <b-modal
            id="recordedVideosModal"
            scrollable
            size="lg"
            :title="'Video clips for Question' + ' ' + selectedQuestion.number"
          >
            <b-row class="justify-content-center vertical-center">
              <div class="col-md-10">
                <div v-if="selectedQuestion.videoClips.length > 0">
                  <b-tabs
                    vertical
                    active-nav-item-class="font-weight-bold text-black"
                  >
                    <b-tab
                      v-for="(video, index) in selectedQuestion.videoClips"
                      v-bind:key="video"
                      :title="'Video #' + (index + 1)"
                      active
                    >
                      <div
                        style="float: right; font-size: 50px;"
                        class="close"
                        aria-label="Close"
                        @click="deleteVideoClip(index)"
                        aria-hidden="true"
                      >
                        ×
                      </div>
                      <div style="float: left;">
                        <video
                          :src="getVideoClip(index)"
                          class="videoFitParent"
                          width="80%"
                          controls
                        />
                        <br />
                      </div>
                    </b-tab>
                  </b-tabs>
                </div>

                <div v-else>
                  <h3>You have not recorded any videos of the child.</h3>
                  <br />
                  <h5>Instructions:</h5>
                  <p>
                    Press the "Record video" button to create a new recording
                    for the child. Press the "Pause recording" button to
                    temporarily stop recording video/audio, and click "Resume
                    recording" when appropriate. Finally, press "Stop recording"
                    when you are satisfied with the resulting video. You can
                    create multiple videos for each question, upload or download
                    them, and analyze the videos in detail whenever you wish.
                  </p>
                </div>

                <b-button
                  block="true"
                  squared
                  size="lg"
                  class="returnToPreviewButton text-dark"
                  @click="$bvModal.hide('recordedVideosModal')"
                >
                  <b>Return to previewing questions</b>
                </b-button>
              </div>
            </b-row>
          </b-modal>

          <b-card
            bg-variant="white"
            class="container"
            style="font-size: small;"
          >
            <div v-if="recordingVideo">
              <b-button variant="warning" size="sm" @click="stopRecordingVideo">
                <b-icon-camera-video-off-fill></b-icon-camera-video-off-fill> </b-button
              >Stop recording
            </div>

            <div v-else>
              <img
                class="cardButtonRow"
                src="../images/icons_svg/Yellow/recording_up.svg"
                @click="startRecordingVideo"
              />
            </div>
            Record video
          </b-card>

          <b-card
            bg-variant="white"
            class="container"
            style="font-size: small;"
          >
            <b>ECG</b>
          </b-card>
        </b-card-group>
      </b-col>

      <b-col cols="3">
        <b-card bg-variant="white" class="container" style="height: 250px;">
          <h5 @click="chooseNextQuestion">
            <b>Next Question</b>
          </h5>
          <p>
            {{ getNextQuestion().number }}. &nbsp; {{ getNextQuestion().text }}
          </p>

          <b-img :src="getImages(getNextQuestion())[0]" fluid></b-img>
        </b-card>
        <br />

        <b-card
          v-for="camera in getCameras"
          v-bind:key="camera"
          bg-variant="white"
          class="container"
        >
          <h5>
            <b>
              {{
                selectedQuestion.selectedCameras[
                  selectedQuestion.selectedCameras.indexOf(camera)
                ]
              }}
            </b>
          </h5>

          <div class="camera">
            <video
              id="webcamVideo"
              width="100%"
              controls
              class="videoFitParent"
            />

            <b-button v-if="videoOn" variant="primary" @click="turnOffWebcam()"
              >Turn off webcam</b-button
            >

            <b-button v-else variant="primary" @click="startWebcam()"
              >Turn on webcam</b-button
            >
          </div>
        </b-card>

        <br />
        <br />
      </b-col>
    </b-form-row>

    <br />
    <br />
  </div>
</template>

<script>
import {
  BIconArrowLeft,
  BIconArrowRepeat,
  BIconArrowLeftCircleFill,
  BIconArrowRightCircleFill,
  BIconCameraVideoOffFill,
} from "bootstrap-vue";
import PercentageCircle from "vue-css-percentage-circle";
import Report from "./Report";
import instance from "../axios.js"

export default {
  name: "RunApplication",
  props: {
    application: Object,
  },

  components: {
    BIconArrowLeft,
    BIconArrowLeftCircleFill,
    BIconArrowRightCircleFill,
    BIconArrowRepeat,
    PercentageCircle,

    Report,
    BIconCameraVideoOffFill,
  },

  data() {
    let selectedQuestion = this.getSelectedQuestion(true);

    return {
      selectedQuestion: selectedQuestion,
      videoOn: false,
      recordingAudio: false,
      recordingVideo: false,
      audioMediaRecorder: "",
      videoMediaRecorder: "",
      pausedAudio: false,
      pausedVideo: false,
      currentTimeBlock: 1,
      promptText: "",
      displayReportCheck: false,
      promptDisplaying: false,
    };
  },

  watch: {
    application: {
      deep: true,
      immediate: true,

      handler() {
        console.log("Application changed: ", this.application);
      },
    },

    selectedQuestion: function() {
      setTimeout(() => {
        this.currentTimeBlock = 1;
        this.promptText = this.showPrompt1();

        if (this.showPrompt1() != "") {
          document.getElementById("promptButton").click();
        }
      }, (this.selectedQuestion.timeLimit1.minutes * 60 + this.selectedQuestion.timeLimit1.seconds) * 1000);

      setTimeout(() => {
        this.currentTimeBlock = 2;
        this.promptText = this.showPrompt2();

        if (this.showPrompt2() != "") {
          document.getElementById("promptButton").click();
        }
      }, (this.selectedQuestion.timeLimit2.minutes * 60 + this.selectedQuestion.timeLimit2.seconds) * 1000);

      if (this.selectedQuestion.textToSpeech) {
        this.playSpeechFromText(
          "Question number " +
            this.selectedQuestion.number +
            ": " +
            this.selectedQuestion.text
        );

        if (this.selectedQuestion.answerOptions.length > 0) {
          this.playSpeechFromText("The list of answer choices are: ");

          var i = 0;

          for (i = 0; i < this.selectedQuestion.answerOptions.length; i++) {
            if (i == this.selectedQuestion.answerOptions.length - 2) {
              this.playSpeechFromText(
                this.selectedQuestion.answerOptions[i] + ", and"
              );
            } else {
              this.playSpeechFromText(
                this.selectedQuestion.answerOptions[i] + ","
              );
            }
          }
        }
      }
    },
  },

  mounted() {
    let headers = "Content-Type: application/json";
    var application = {
        title: this.application.title,
        subtitle: this.application.subtitle,
        id: this.application.id,
        privacyPolicyURL: this.application.privacyPolicyURL,
        companyName: this.application.companyLogotype,
        appLogotype: this.application.appLogotype,
        companyLogotype: this.application.companyLogotype,
        appDescription: this.application.appDescription,
        appScreenshots: this.application.appScreenshots,
        certifications: this.application.certifications,
        type: this.application.type,
        bundleID: this.application.bundleID,
        maxAndMin: this.application.maxAndMin,
        primaryLanguage: this.application.primaryLanguage,
        SKU: this.application.SKU,
        ageRating: this.application.ageRating,
        category: this.application.category,
        price: this.application.price,
        discountedPrice1: this.application.discountedPrice1,
        discountedPrice2: this.application.discountedPrice2,
        country: this.application.country,
        region: this.application.region,
        onSale: this.application.onSale,
        version: this.application.version,
        status: this.application.status,
        deploymentDate: this.application.deploymentDate,
        deploymentCode: this.application.deploymentCode,
        questions: [],
        questionIDs: this.application.questionIDs,
        reportTitle: this.application.reportTitle,
        defaultReportEmail: this.application.defaultReportEmail,
        allowChangeReportEmail: this.application.allowChangeReportEmail,
        addRemoveReportDestinations: this.application.addRemoveReportDestinations,
        reportHeaderContent: this.application.reportHeaderContent,
        reportFooterContent: this.application.reportFooterContent,
        reportColorTheme: this.application.reportColorTheme,
      };
    instance
      .post(
        "api/appAdmin",

        application,

        headers
      )
      .then((response) => {
        console.log("new application created on server: ", response.data),
          (this.apps = response.data);
      })
      .catch((error) => console.log(error));
    this.$store.commit("addApplication", this.application);

    console.log("RunApp: ", this.application);
    this.selectedQuestion = this.application.questions[0];

    setTimeout(() => {
      this.promptText = this.showPrompt1();

      if (this.showPrompt1() != "") {
        document.getElementById("promptButton").click();
      }
    }, (this.selectedQuestion.timeLimit1.minutes * 60 + this.selectedQuestion.timeLimit1.seconds) * 1000);

    setTimeout(() => {
      this.currentTimeBlock = 2;
      this.promptText = this.showPrompt2();

      if (this.showPrompt2() != "") {
        document.getElementById("promptButton").click();
      }
    }, (this.selectedQuestion.timeLimit2.minutes * 60 + this.selectedQuestion.timeLimit2.seconds) * 1000);

    if (this.selectedQuestion.textToSpeech) {
      this.playSpeechFromText(
        "Question number " +
          this.selectedQuestion.number +
          ": " +
          this.selectedQuestion.text
      );
    }
  },

  computed: {
    getQuestions() {
      return this.application.questions;
    },
    getCameras() {
      return this.selectedQuestion.selectedCameras;
    },
  },

  methods: {
    startRecordingAudio() {
      this.recordingAudio = true;
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        // Is continuous recording with 0 time limits
        if (
          this.selectedQuestion.audioRecordingTimeLimit.minutes == 0 &&
          this.selectedQuestion.audioRecordingTimeLimit.seconds == 0
        ) {
          mediaRecorder.start();
          this.audioMediaRecorder = mediaRecorder;
          const audioChunks = [];
          mediaRecorder.addEventListener("dataavailable", (event) => {
            audioChunks.push(event.data);
          });
          mediaRecorder.addEventListener("stop", () => {
            const audioBlob = new Blob(audioChunks);
            this.encodeAudioClipAsURL(audioBlob);
          });
        }
        // Is not continuous recording, has a set time limit for each recording
        else {
          setTimeout(() => {
            this.stopRecordingAudio();
          }, (this.selectedQuestion.audioRecordingTimeLimit.minutes * 60 + this.selectedQuestion.audioRecordingTimeLimit.seconds) * 1000);
          mediaRecorder.start();
          this.audioMediaRecorder = mediaRecorder;
          const audioChunks = [];
          mediaRecorder.addEventListener("dataavailable", (event) => {
            audioChunks.push(event.data);
          });
          mediaRecorder.addEventListener("stop", () => {
            const audioBlob = new Blob(audioChunks);
            this.encodeAudioClipAsURL(audioBlob);
          });
        }
      });
    },

    pauseRecordingAudio() {
      this.pausedAudio = true;
      this.audioMediaRecorder.pause();
    },

    resumeRecordingAudio() {
      this.pausedAudio = false;
      this.audioMediaRecorder.resume();
    },

    stopRecordingAudio() {
      this.audioMediaRecorder.stop();
      this.recordingAudio = false;
    },

    playAudio() {
      const audio = new Audio(this.audioURL);
      console.log("Audio should play now");
      audio.play();
    },

    startRecordingVideo() {
      this.recordingVideo = true;
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: true })
        .then((stream) => {
          const mediaRecorder = new MediaRecorder(stream);
          mediaRecorder.start();
          this.videoMediaRecorder = mediaRecorder;
          const videoChunks = [];
          mediaRecorder.addEventListener("dataavailable", (event) => {
            videoChunks.push(event.data);
          });
          mediaRecorder.addEventListener("stop", () => {
            const videoBlob = new Blob(videoChunks);
            this.encodeVideoClipAsURL(videoBlob);
          });
        });
    },

    encodeVideoClipAsURL(videoBlob) {
      const reader = new FileReader();
      reader.addEventListener("load", (e) => {
        this.selectedQuestion.videoClips.push(e.target.result);
      });

      reader.readAsBinaryString(videoBlob);
    },

    encodeAudioClipAsURL(audioBlob) {
      const reader = new FileReader();
      reader.addEventListener("load", (e) => {
        this.selectedQuestion.audioClips.push(e.target.result);
      });

      reader.readAsBinaryString(audioBlob);
    },

    getVideoClip(index) {
      console.log("getVideoClip: ", this.selectedQuestion.videoClips[index]);
      return (
        "data:video/webm;base64," +
        btoa(this.selectedQuestion.videoClips[index])
      );
    },

    getAudioClip(index) {
      return (
        "data:audio/ogg;base64," + btoa(this.selectedQuestion.audioClips[index])
      );
    },

    pauseRecordingVideo() {
      this.pausedVideo = true;
      this.videoMediaRecorder.pause();
    },

    resumeRecordingVideo() {
      this.pausedVideo = false;
      this.videoMediaRecorder.resume();
    },

    stopRecordingVideo() {
      this.videoMediaRecorder.stop();
      this.recordingVideo = false;
    },

    deleteVideoClip(index) {
      this.removeArr(
        this.selectedQuestion.videoClips,
        this.selectedQuestion.videoClips[index]
      );
    },

    deleteAudioClip(index) {
      this.removeArr(
        this.selectedQuestion.audioClips,
        this.selectedQuestion.audioClips[index]
      );
    },

    startWebcam() {
      if (
        "mediaDevices" in navigator &&
        "getUserMedia" in navigator.mediaDevices
      ) {
        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
          const videoPlayer = document.querySelector("video");
          videoPlayer.srcObject = stream;
          this.videoOn = true;
          videoPlayer.play();
        });
      } else {
        alert("Can't get video");
      }
    },

    turnOffWebcam() {
      let video = document.getElementById("webcamVideo");

      var stream = video.srcObject;
      var tracks = stream.getTracks();

      for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];
        track.stop();
      }
      video.srcObject = null;
      this.videoOn = false;
    },

    getProcedureContent() {
      if (this.selectedQuestion.procedureContent != "") {
        if (this.selectedQuestion.textToSpeech) {
          this.playSpeechFromText(this.selectedQuestion.procedureContent);
        }

        return this.selectedQuestion.procedureContent;
      } else {
        return "No procedure content entered";
      }
    },

    choosePreviousQuestion() {
      var selectedQuestionIndex = this.application.questions.indexOf(
        this.selectedQuestion
      );

      if (selectedQuestionIndex > 0) {
        selectedQuestionIndex--;
        this.selectedQuestion = this.application.questions[
          selectedQuestionIndex
        ];
      } else {
        this.selectedQuestion = this.application.questions[
          this.application.questions.length - 1
        ];
      }
    },

    chooseNextQuestion() {
      var selectedQuestionIndex = this.application.questions.indexOf(
        this.selectedQuestion
      );

      if (selectedQuestionIndex + 1 < this.application.questions.length) {
        selectedQuestionIndex++;
        this.selectedQuestion = this.application.questions[
          selectedQuestionIndex
        ];
      } else {
        this.selectedQuestion = this.application.questions[0];
      }
    },

    getPreviousQuestion() {
      var selectedQuestionIndex = this.application.questions.indexOf(
        this.selectedQuestion
      );

      if (selectedQuestionIndex > 0) {
        return this.application.questions[selectedQuestionIndex - 1];
      } else {
        return this.application.questions[
          this.application.questions.length - 1
        ];
      }
    },

    getNextQuestion() {
      var selectedQuestionIndex = this.application.questions.indexOf(
        this.selectedQuestion
      );

      if (selectedQuestionIndex + 1 < this.application.questions.length) {
        return this.application.questions[selectedQuestionIndex + 1];
      } else {
        return this.application.questions[0];
      }
    },

    getPercent() {
      var number =
        this.application.questions.indexOf(this.selectedQuestion) + 1;
      var length = this.application.questions.length;
      var percent = Math.round((number / length) * 100);

      return percent;
    },

    getAnswers() {
      return this.selectedQuestion.answerOptions;
    },

    getSelectedQuestion(openView) {
      if (openView == true) {
        this.setSelectedQuestion(this.application.questions[0]);
        return this.selectedQuestion;
      }

      console.log("images: ", this.selectedQuestion.images);
      return this.selectedQuestion;
    },

    setSelectedQuestion(question) {
      this.selectedQuestion = question;
    },

    setListItemClass(question) {
      if (question == this.selectedQuestion) {
        return "leftBorderOrange";
      }

      return "";
    },

    setScore(score) {
      this.selectedQuestion.selectedScoreInPreview = score;
    },

    getSuggestedScore() {
      var correctAnswers;
      var numChildSelectedCorrectAnswers = 0;
      var i = 0;
      var j = 0;

      // Get suggested score for questions with only 1 possible answer
      if (this.isSingleAnswerQuestion() == true) {
        correctAnswers = this.selectedQuestion.singleCorrectAnswer;

        if (
          correctAnswers != "" &&
          this.selectedQuestion.childSelectedAnswerSingle != ""
        ) {
          if (
            this.selectedQuestion.childSelectedAnswerSingle == correctAnswers
          ) {
            if (this.selectedQuestion.promptClicks >= 4) {
              return 1;
            } else if (this.selectedQuestion.promptClicks == 3) {
              return 2;
            } else if (this.selectedQuestion.promptClicks == 2) {
              return 3;
            } else if (this.selectedQuestion.promptClicks <= 1) {
              return 4;
            }
          } else {
            return 0;
          }
        } else {
          return "";
        }
      }

      // Get suggested score for questions with multiple possible answers
      else {
        correctAnswers = this.selectedQuestion.multipleCorrectAnswers;

        for (
          i = 0;
          i < this.selectedQuestion.childSelectedAnswerMultiple.length;
          i++
        ) {
          for (j = 0; j < correctAnswers.length; j++) {
            if (
              this.selectedQuestion.childSelectedAnswerMultiple[i] ==
              correctAnswers[j]
            ) {
              numChildSelectedCorrectAnswers++;
            }
          }
        }

        console.log(
          "correctAnswers and numChildSelectedCorrectAnswers lengths are: ",
          correctAnswers.length,
          numChildSelectedCorrectAnswers
        );

        if (correctAnswers.length > 0 && numChildSelectedCorrectAnswers > 0) {
          if (numChildSelectedCorrectAnswers == correctAnswers.length) {
            if (this.selectedQuestion.promptClicks >= 4) {
              return 1;
            } else if (this.selectedQuestion.promptClicks == 3) {
              return 2;
            } else if (this.selectedQuestion.promptClicks == 2) {
              return 3;
            } else if (this.selectedQuestion.promptClicks <= 1) {
              return 4;
            }
          } else {
            return numChildSelectedCorrectAnswers;
          }
        } else {
          return "";
        }
      }
    },

    getInstructionVideo() {
      if (this.selectedQuestion.instructionVideo != "") {
        return this.selectedQuestion.instructionVideo;
      } else {
        return "";
      }
    },

    getImages(question) {
      console.log("Image sources are ", question.images);
      return question.images;
    },

    playPromptText() {
      if (!window.speechSynthesis.speaking) {
        if (this.currentTimeBlock == 1) {
          if (
            this.selectedQuestion.textToSpeech &&
            this.selectedQuestion.promptContent1 != ""
          ) {
            this.playSpeechFromText("Prompt number 1: " + this.promptText);
          }
        } else {
          if (this.selectedQuestion.textToSpeech && this.promptContent2 != "") {
            this.playSpeechFromText("Prompt number 2: " + this.promptText);
          }
        }
      }
    },

    showRelevantPrompt() {
      if (!window.speechSynthesis.speaking) {
        if (this.currentTimeBlock == 1) {
          this.promptText = this.showPrompt1();
        } else {
          this.promptText = this.showPrompt2();
        }

        this.playPromptText();
        return this.promptText;
      }
    },

    closeRelevantPrompt() {
      this.promptDisplaying = false;
    },

    showPrompt1() {
      if (this.selectedQuestion.promptContent1) {
        if (this.selectedQuestion.tallyPromptPresses)
          this.increasePromptClicks();

        return this.selectedQuestion.promptContent1;
      } else {
        return "No prompt text entered";
      }
    },

    showPrompt2() {
      if (this.selectedQuestion.promptContent2) {
        if (this.selectedQuestion.tallyPromptPresses)
          this.increasePromptClicks();

        return this.selectedQuestion.promptContent2;
      } else {
        return "No prompt text entered";
      }
    },

    increasePromptClicks() {
      this.selectedQuestion.promptClicks++;
    },

    increaseRepeatClicks() {
      this.selectedQuestion.repeatClicks++;
    },

    repeatQuestion() {
      if (this.selectedQuestion.textToSpeech) {
        this.playSpeechFromText(
          "Question number " +
            this.selectedQuestion.number +
            ": " +
            this.selectedQuestion.text
        );

        if (this.selectedQuestion.answerOptions.length > 0) {
          this.playSpeechFromText("The list of answer choices are: ");

          var i = 0;

          for (i = 0; i < this.selectedQuestion.answerOptions.length; i++) {
            if (i == this.selectedQuestion.answerOptions.length - 2) {
              this.playSpeechFromText(
                this.selectedQuestion.answerOptions[i] + ", and"
              );
            } else {
              this.playSpeechFromText(
                this.selectedQuestion.answerOptions[i] + ","
              );
            }
          }
        }
      }

      if (this.selectedQuestion.tallyRepeatPresses) {
        this.increaseRepeatClicks();
      }
    },

    displayReport() {
      this.displayReportCheck = true;
    },

    closeReport() {
      this.displayReportCheck = false;
    },

    playSpeechFromText(text) {
      var utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    },

    // Is the current question single or multiple answers? Return true if single, false if multiple
    isSingleAnswerQuestion() {
      if (this.selectedQuestion.questionType == "Single answer") {
        return true;
      } else {
        return false;
      }
    },

    setChildSelectedAnswerClasses(answer) {
      var i = 0;

      if (
        this.isSingleAnswerQuestion() == true &&
        answer == this.selectedQuestion.childSelectedAnswerSingle
      ) {
        return "childSelectedAnswer";
      } else if (this.isSingleAnswerQuestion() == false) {
        for (
          i = 0;
          i < this.selectedQuestion.childSelectedAnswerMultiple.length;
          i++
        ) {
          if (answer == this.selectedQuestion.childSelectedAnswerMultiple[i]) {
            return "childSelectedAnswer";
          }
        }
      }
    },

    setChildSelectedAnswers(answer) {
      if (this.isSingleAnswerQuestion() == true) {
        this.selectedQuestion.childSelectedAnswerSingle = answer;
      } else {
        // Is this answer already one of the child's multiple selected answers?
        if (
          this.selectedQuestion.childSelectedAnswerMultiple.indexOf(answer) > -1
        ) {
          this.removeArr(
            this.selectedQuestion.childSelectedAnswerMultiple,
            answer
          );
        } else {
          this.selectedQuestion.childSelectedAnswerMultiple.push(answer);
        }
      }
    },

    getReportColorTheme() {
      if (this.application.reportColorTheme == "Yellow") {
        return "warning";
      } else if (this.application.reportColorTheme == 1) {
        return "danger";
      } else if (this.application.reportColorTheme == 2) {
        return "primary";
      } else if (this.application.reportColorTheme == 3) {
        return "success";
      }
      console.log(this.application.reportColorTheme);

      return "warning";
    },

    removeArr(arr, value) {
      var index = arr.indexOf(value);
      if (index > -1) {
        arr.splice(index, 1);
      }
      return arr;
    },
  },
};
</script>

<style scoped>
.logo {
  width: 75px;
  height: auto;
}

.leftBorderOrange {
  border-left: 5px solid #ff930f;
}

.answerButtonHorizontal {
  background-color: #ff930f;
  color: #ff930f;
  border-color: #ff930f;
  position: relative;
  margin-right: 20px;
}

.answerButtonVertical {
  background-color: #ff930f;
  color: #ff930f;
  border-color: #ff930f;
  display: block;
  margin-bottom: 20px;
}

.buttonsBelowQuestion {
  position: relative;
  margin-right: 10px;
  width: 35px;
  height: 35px;
}

.childSelectedAnswer {
  background-color: gray;
  color: gray;
  border-color: gray;
}

.childSelectedAnswer:hover {
  background-color: gray;
  color: gray;
  border-color: gray;
}

.childSelectedAnswer:active {
  background-color: gray;
  color: gray;
  border-color: gray;
}

.childSelectedAnswer:focus {
  background-color: gray;
  color: gray;
  border-color: gray;
}

.returnToPreviewButton {
  background-color: #ff930f;
  color: #ff930f;
  border-color: #ff930f;
}

.returnToPreviewButton:hover {
  background-color: #ff930f;
  color: #ff930f;
  border-color: #ff930f;
}
.returnToPreviewButton:active {
  background-color: #ff930f;
  color: #ff930f;
  border-color: #ff930f;
}
.returnToPreviewButton:focus {
  background-color: #ff930f;
  color: #ff930f;
  border-color: #ff930f;
}

.cardButtonRow {
  position: relative;
  margin-right: 10px;
  width: 50px;
  height: 50px;
}

hr {
  border: 0.5px solid lightgray;
}
</style>
