<template>
  <div :key="questionsLoaded" v-if="questionsLoaded == true">
    <b-container style="margin-top: 60px;">
      <br />
      <br />
      <b-form>
        <b-row>
          <b-col>
            <p id="general"></p>

            <b>
              <b-icon-arrow-left></b-icon-arrow-left>
            </b>
            <router-link class="text-dark" to="/adminDashboard">
              &nbsp;
              <b>RETURN TO ADMIN DASHBOARD</b>
            </router-link>
          </b-col>

          <b-col cols="4">
            <router-link
              class="text-dark"
              :to="{ name: 'editapp', params: { application: application } }"
            >
              <h4>
                <b-icon-gear-fill></b-icon-gear-fill>&nbsp; Edit Application
                Information
              </h4>
            </router-link>
          </b-col>
        </b-row>

        <h3>
          <b>{{ this.application.title }}</b>
        </h3>
        <br />

        <b-row>
          <b-col cols="3">
            <b-card bg-variant="white" class="container questionSidebar">
              <div
                v-for="(question, index) in getQuestions"
                v-bind:key="question.number"
              >
                <span @click="setSelectedQuestion(question)">
                  <span v-if="question == getSelectedQuestion(false)">
                    <b>
                      Question
                      {{ question.number }}
                    </b>
                  </span>
                  <span v-else>
                    Question
                    {{ question.number }}
                  </span>
                </span>
                <span
                  class="close"
                  aria-label="Close"
                  @click="promptUserOfQuestionDeletion(index)"
                  aria-hidden="true"
                  >×</span
                >
              </div>

              <br />

              <b-button
                type="button"
                squared
                class="newQuestionButton text-dark font-weight-bold"
                @click="addQuestion('', '', '', '', '', '')"
                >+ New Question</b-button
              >
            </b-card>

            <b-button
              type="button"
              squared
              v-b-modal.modal-importSpreadsheet
              class="newQuestionButton text-dark font-weight-bold"
              @click="showSpreadsheetModal"
              >Import questions from CSV</b-button
            >
            <br /><br />

            <b-button
              type="button"
              squared
              class="newQuestionButton text-dark font-weight-bold"
              @click="exportQuestionsToCSV"
              >Export questions to CSV&nbsp;&nbsp;&nbsp;</b-button
            >

            <modal
              name="importSpreadsheet"
              :adaptive="true"
              width="90%"
              height="90%"
            >
              <span
                class="close"
                aria-label="Close"
                style="float: left; left: 10%;"
                aria-hidden="true"
                @click="onSpreadsheetModalClose"
                >×&nbsp;Close</span
              >

              <b-row class="justify-content-center vertical-center">
                <div class="col-md-8">
                  <br />
                  <h2>
                    <b>Import questions from spreadsheet</b>
                  </h2>

                  <p>
                    Please use our spreadsheet template to import the
                    questions/tasks.
                  </p>

                  <br />
                  <div
                    @click="clickCSVButton"
                    class="fileUpload btn btn-light borderGray"
                  >
                    <span>+ upload</span>
                    <input
                      type="file"
                      id="csvButton"
                      @change="onCSVFileChange"
                      class="mt-1 upload"
                      size="sm"
                      plain
                    />
                  </div>
                  <br />
                  <div class="text-right">
                    <b-button
                      squared
                      type="submit"
                      size="lg"
                      class="newQuestionButton text-dark"
                      @click="onSubmitSpreadsheet"
                    >
                      <b>Import</b>
                    </b-button>
                  </div>
                </div>
              </b-row>
            </modal>
          </b-col>

          <b-col
            cols="8"
            v-if="application.questions.length > 0"
            :key="selectedQuestion.number"
          >
            <div class="text-right">
              <b-button
                squared
                variant="light"
                size="lg"
                type="submit"
                class="text-dark borderGray"
              >
                <h4>
                  <b-icon-eye-fill></b-icon-eye-fill>&nbsp;
                  <router-link
                    class="text-dark"
                    :to="{
                      name: 'previewApp',
                      params: { application: this.application },
                    }"
                    >Preview</router-link
                  >
                </h4>
              </b-button>
            </div>

            <div class="text-right">
              <b-button
                squared
                variant="light"
                type="button"
                size="lg"
                class="text-dark borderGray"
                v-b-modal.changeQuestionOrderModal
              >
                <h4>
                  Change question order
                </h4>
              </b-button>
            </div>

            <b-modal
              id="changeQuestionOrderModal"
              scrollable
              size="lg  "
              :title="'Change question order'"
            >
              <p>Set questions order</p>
              <b-form-group>
                <div
                  v-for="(question, index) in getQuestions"
                  v-bind:key="question.number"
                >
                  <br />
                  <p>{{ question.text }}</p>
                  <b-form-radio-group
                    v-model="selectedOrder[index]"
                    :options="options"
                  ></b-form-radio-group>
                </div>
                <br />
                <b-button
                  squared
                  variant="light"
                  type="submit"
                  size="lg"
                  class="text-dark borderGray"
                  @click="changeQuestionOrderLocally"
                >
                  <h4>
                    Submit question order change
                  </h4>
                </b-button>
              </b-form-group>
            </b-modal>

            <h5>
              <b>Question {{ selectedQuestion.number }}</b>
            </h5>

            <br />

            <b-form-group
              id="input-group-1"
              label="Question:"
              label-cols-sm="3"
              label-align-sm="left"
              label-for="nested-question"
            >
              <b-form-textarea
                id="nested-question"
                v-model="selectedQuestion.text"
                @keypress="promptUserOfQuestionSeparation"
                rows="2"
                class="borderGray"
              ></b-form-textarea>
            </b-form-group>

            <b-modal
              id="promptUserModal"
              scrollable
              size="lg  "
              :title="
                'Editing any question will disconnect its results from the same questions on other applications'
              "
            >
              <p>Are you sure you want to proceed and edit this question?</p>

              <br />
              <b-button
                squared
                variant="light"
                type="submit"
                size="lg"
                class="text-dark borderGray"
                @click="closePromptUserModal"
              >
                <h4>
                  Edit question
                </h4>
              </b-button>
            </b-modal>

            <b-modal
              id="promptUserDeleteModal"
              scrollable
              size="lg  "
              :title="'Are you sure you want to delete this question?'"
            >
              <p v-if="selectedQuestion.shared > 0">
                Deleting this question will not affect other users shared copies
                of this question'
              </p>

              <p v-if="application.questions.length == 1">
                This is the last question in this application. If you delete it,
                the whole application will also be deleted.
              </p>

              <br />
              <b-button
                squared
                variant="light"
                type="submit"
                size="lg"
                class="text-dark borderGray"
                @click="closePromptUserDeleteModal(questionToBeDeletedIndex)"
              >
                <h4>
                  Delete question
                </h4>
              </b-button>
            </b-modal>

            <b-form-group
              id="input-group-2"
              label="Type of Question:"
              label-cols-sm="3"
              label-align-sm="left"
              label-for="nested-questionDescription"
            >
              <b-form-input
                class="borderGray"
                id="nested-questionDescription"
                @keypress="promptUserOfQuestionSeparation"
                v-model="selectedQuestion.description"
                type="questionDescription"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-3"
              label="Category:"
              label-cols-sm="3"
              label-align-sm="left"
              label-for="nested-category"
            >
              <b-form-input
                id="nested-category"
                @keypress="promptUserOfQuestionSeparation"
                v-model="selectedQuestion.category"
                type="category"
                class="borderGray"
              ></b-form-input>
            </b-form-group>
            <p id="media"></p>

            <b-form-group
              id="input-group-4"
              label="Sub-Category:"
              label-cols-sm="3"
              label-align-sm="left"
              label-for="nested-subCategory"
            >
              <b-form-input
                id="nested-subCategory"
                v-model="selectedQuestion.subCategory"
                @keypress="
                  selectedQuestion.shared > 0
                    ? promptUserOfQuestionSeparation
                    : ''
                "
                class="borderGray"
                type="subCategory"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-5"
              label="Custom Question ID:"
              label-cols-sm="3"
              label-align-sm="left"
              label-for="nested-customID"
            >
              <b-form-input
                id="nested-customID"
                v-model="selectedQuestion.id"
                class="borderGray"
                @keypress="
                  selectedQuestion.shared > 0
                    ? promptUserOfQuestionSeparation
                    : ''
                "
                type="customID"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-5"
              label="# applications this question is shared with:"
              label-cols-sm="3"
              label-align-sm="left"
              label-for="nested-shared"
            >
              <b-form-input
                id="nested-shared"
                v-model="selectedQuestion.shared"
                class="borderGray"
                disabled
                type="shared"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              label="Instruction Video:"
              label-cols-sm="3"
              label-align-sm="left"
            >
              {{ selectedQuestion.instructionVideo.name }}

              <div
                @click="clickInstructionVideoButton"
                class="fileUpload btn btn-light borderGray"
              >
                <span>+ upload</span>
                <input
                  type="file"
                  id="instructionVideoButton"
                  @change="onInstructionVideoFileChange"
                  accept="video/*"
                  class="mt-1 upload"
                  size="sm"
                  plain
                />
              </div>
            </b-form-group>

            <b-form-group
              id="input-group-6"
              label="Specialist Image(s):"
              label-cols-sm="3"
              label-align-sm="left"
            >
              <div v-if="selectedQuestion.specialistImages.length > 0">
                <p
                  v-for="image in selectedQuestion.specialistImages"
                  v-bind:key="image"
                  rows="5"
                >
                  {{ image.name }}
                </p>
              </div>

              <div
                @click="clickSpecialistImageButton"
                class="fileUpload btn btn-light borderGray"
              >
                <span>+ upload</span>
                <input
                  type="file"
                  id="imageButton"
                  @change="onSpecialistImagesFileChange"
                  accept="image/*"
                  multiple
                  class="mt-1 upload"
                  size="sm"
                  plain
                />
              </div>
            </b-form-group>

            <br />

            <b-form-group
              id="input-group-6"
              label="Child Image(s):"
              label-cols-sm="3"
              label-align-sm="left"
            >
              <div v-if="selectedQuestion.childImages.length > 0">
                <p
                  v-for="image in selectedQuestion.childImages"
                  v-bind:key="image"
                  rows="5"
                >
                  {{ image.name }}
                </p>
              </div>

              <div
                @click="clickChildImageButton"
                class="fileUpload btn btn-light borderGray"
              >
                <span>+ upload</span>
                <input
                  type="file"
                  id="childImageButton"
                  @change="onChildImagesFileChange"
                  accept="image/*"
                  multiple
                  class="mt-1 upload"
                  size="sm"
                  plain
                />
              </div>
            </b-form-group>

            <br />

            <b-form-group
              id="input-group-7"
              label="Image Organization:"
              label-cols-sm="3"
              label-align-sm="left"
            >
              <b-row>
                <b-col cols="5">
                  <select
                    browser-default
                    v-model="selectedQuestion.imageOrganization"
                    class="custom-select borderGray"
                  >
                    <option selected>Horizontal</option>
                    <option value="1">Vertical</option>
                  </select>
                </b-col>
              </b-row>
            </b-form-group>
            <p id="answers"></p>

            <b-form-group
              id="input-group-8"
              label="Button Organization:"
              label-cols-sm="3"
              label-align-sm="left"
            >
              <b-row>
                <b-col cols="5">
                  <select
                    browser-default
                    v-model="selectedQuestion.buttonOrganization"
                    class="custom-select borderGray"
                  >
                    <option selected>Next to each other</option>
                    <option value="1">Below each other</option>
                  </select>
                </b-col>
              </b-row>
            </b-form-group>

            <b-form-group
              id="input-group-9"
              label="Type:"
              label-cols-sm="3"
              label-align-sm="left"
            >
              <b-row>
                <b-col cols="5">
                  <select
                    browser-default
                    v-model="selectedQuestion.questionType"
                    class="custom-select borderGray"
                  >
                    <option selected>Single answer</option>
                    <option value="1">Multiple answers</option>
                  </select>
                </b-col>
              </b-row>
            </b-form-group>

            <b-form-group
              id="input-group-10"
              label="Answers:"
              label-for="nested-answers"
              label-cols-sm="3"
              label-align-sm="left"
            >
              <b-row>
                <b-col cols="10">
                  <b-form-input
                    id="nested-answers"
                    placeholder="Add new option"
                    v-model="selectedQuestion.inputedAnswer"
                    @keypress="
                      selectedQuestion.shared > 0
                        ? promptUserOfQuestionSeparation
                        : ''
                    "
                    type="addOption"
                    class="borderGray"
                  ></b-form-input>
                </b-col>
                <b-col>
                  <p
                    style="color: darkorange;"
                    @click="addAnswer(selectedQuestion.inputedAnswer)"
                  >
                    Add
                  </p>
                </b-col>

                <b-col cols="10">
                  <div v-if="selectedQuestion.questionType == 'Single answer'">
                    <b-form-radio-group
                      stacked
                      v-model="selectedQuestion.singleCorrectAnswer"
                      name="singleAnswer"
                      :options="selectedQuestion.answerOptions"
                    ></b-form-radio-group>

                    <span
                      class="close"
                      aria-label="Close"
                      @click="
                        deleteAnswer(selectedQuestion.singleCorrectAnswer)
                      "
                      aria-hidden="true"
                      >×</span
                    >
                  </div>

                  <div v-else>
                    <b-form-checkbox-group
                      stacked
                      v-model="selectedQuestion.multipleCorrectAnswers"
                      name="multipleAnswers"
                      :options="selectedQuestion.answerOptions"
                    ></b-form-checkbox-group>

                    <span
                      class="close"
                      aria-label="Close"
                      @click="
                        deleteAnswer(selectedQuestion.multipleCorrectAnswers[0])
                      "
                      aria-hidden="true"
                      >×</span
                    >
                  </div>
                </b-col>
              </b-row>
            </b-form-group>

            <b-form-group
              label="When button is pressed:"
              label-cols-sm="3"
              label-align-sm="left"
            >
              <b-row>
                <b-col cols="5">
                  <select
                    browser-default
                    v-model="selectedQuestion.whenButtonPressed"
                    class="custom-select borderGray"
                  >
                    <option selected>Red X</option>
                    <option value="1">Blue X</option>
                  </select>
                </b-col>
              </b-row>
            </b-form-group>

            <b-form-group
              label="Age Range:"
              label-cols-sm="3"
              label-align-sm="left"
            >
              <b-row>
                <b-col cols="7">
                  <b-form-group
                    id="typicalRange"
                    label="Typical Range"
                    label-for="nested-typicalRange"
                  >
                    <br /><br />
                    <vue-slider
                      :min="0"
                      :max="10"
                      :interval="1"
                      :tooltip="'always'"
                      v-model="selectedQuestion.typicalRange"
                    ></vue-slider>
                  </b-form-group>
                </b-col>
              </b-row>

              <br /><br />
              <b-row>
                <b-col cols="7">
                  <b-form-group
                    id="absoluteRange"
                    label="Absolute Range"
                    label-for="nested-absoluteRange"
                    ><br /><br />
                    <vue-slider
                      :min="0"
                      :max="10"
                      :interval="1"
                      v-model="selectedQuestion.absoluteRange"
                      :tooltip="'always'"
                    ></vue-slider>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-form-group>

            <b-form-group
              label="Text to Speech:"
              label-cols-sm="3"
              label-align-sm="left"
              label-for="nested-textToSpeech"
            >
              <toggle-button
                :value="selectedQuestion.textToSpeech"
                v-model="selectedQuestion.textToSpeech"
                width="70"
                height="30"
                switch-color="black"
                :color="{ checked: '#FFFFFF', unchecked: '#FFFFFF' }"
              />&nbsp;&nbsp;On
            </b-form-group>

            <b-form-group
              label="Text to Speech 1:"
              label-cols-sm="3"
              label-align-sm="left"
              label-for="nested-textToSpeech1"
            >
              <b-form-textarea
                id="nested-textToSpeech1"
                v-model="selectedQuestion.textToSpeech1"
                @keypress="
                  selectedQuestion.shared > 0
                    ? promptUserOfQuestionSeparation
                    : ''
                "
                rows="2"
                class="borderGray"
              ></b-form-textarea>
            </b-form-group>
            <p id="timelimits"></p>

            <b-form-group
              label="Text to Speech 2:"
              label-cols-sm="3"
              label-align-sm="left"
              label-for="nested-textToSpeech2"
            >
              <b-form-textarea
                id="nested-textToSpeech2"
                @keypress="
                  selectedQuestion.shared > 0
                    ? promptUserOfQuestionSeparation
                    : ''
                "
                v-model="selectedQuestion.textToSpeech2"
                rows="2"
                class="borderGray"
              ></b-form-textarea>
            </b-form-group>

            <b-form-group
              label="Text to Speech 3:"
              label-cols-sm="3"
              label-align-sm="left"
              label-for="nested-textToSpeech3"
            >
              <b-form-textarea
                id="nested-textToSpeech3"
                class="borderGray"
                v-model="selectedQuestion.textToSpeech3"
                @keypress="
                  selectedQuestion.shared > 0
                    ? promptUserOfQuestionSeparation
                    : ''
                "
                rows="2"
              ></b-form-textarea>
            </b-form-group>

            <b-form-group
              label="Time Limit 1 (TL1):"
              label-cols-sm="3"
              label-align-sm="left"
              label-for="nested-timeLimit1"
            >
              <b-row>
                <b-col cols="2">
                  <b-form-input
                    id="nested-timeLimit1"
                    @keypress="
                      selectedQuestion.shared > 0
                        ? promptUserOfQuestionSeparation
                        : ''
                    "
                    v-model="selectedQuestion.timeLimit1Minutes"
                    type="timeLimit1"
                    class="borderGray"
                  ></b-form-input> </b-col
                >mins
                <b-col cols="2">
                  <b-form-input
                    @keypress="
                      selectedQuestion.shared > 0
                        ? promptUserOfQuestionSeparation
                        : ''
                    "
                    class="borderGray"
                    id="nested-timeLimit1"
                    v-model="selectedQuestion.timeLimit1Seconds"
                    type="timeLimit1"
                  ></b-form-input> </b-col
                >seconds
              </b-row>
            </b-form-group>

            <b-form-group
              label="When TL1 reached:"
              label-cols-sm="3"
              label-align-sm="left"
            >
              <b-row>
                <b-col cols="5">
                  <select
                    browser-default
                    v-model="selectedQuestion.timeLimit1Reached"
                    class="custom-select borderGray"
                  >
                    <option selected>Show/Say Prompt 1</option>
                  </select>
                </b-col>
              </b-row>
            </b-form-group>

            <b-form-group
              label="Time Limit 2 (TL2):"
              label-cols-sm="3"
              label-align-sm="left"
              label-for="nested-timeLimit1"
            >
              <b-row>
                <b-col cols="2">
                  <b-form-input
                    class="borderGray"
                    id="nested-timeLimit2"
                    @keypress="
                      selectedQuestion.shared > 0
                        ? promptUserOfQuestionSeparation
                        : ''
                    "
                    v-model="selectedQuestion.timeLimit2Minutes"
                    type="timeLimit2"
                  ></b-form-input> </b-col
                >mins
                <b-col cols="2">
                  <b-form-input
                    class="borderGray"
                    @keypress="
                      selectedQuestion.shared > 0
                        ? promptUserOfQuestionSeparation
                        : ''
                    "
                    id="nested-timeLimit2"
                    v-model="selectedQuestion.timeLimit2Seconds"
                    type="timeLimit2"
                  ></b-form-input> </b-col
                >seconds
              </b-row>
            </b-form-group>

            <b-form-group
              label="When TL2 reached:"
              label-cols-sm="3"
              label-align-sm="left"
            >
              <b-row>
                <b-col cols="5">
                  <select
                    browser-default
                    v-model="selectedQuestion.timeLimit2Reached"
                    class="custom-select borderGray"
                  >
                    <option selected>Show/Say Prompt 2</option>
                  </select>
                </b-col>
              </b-row>
            </b-form-group>

            <b-form-group
              label="Scoring:"
              label-cols-sm="3"
              label-align-sm="left"
            >
              <b-form-checkbox-group
                v-model="selectedQuestion.selectedScoringOptions"
                :options="selectedQuestion.scoringOptions"
              ></b-form-checkbox-group>
            </b-form-group>

            <b-form-group
              label="Audio Recording:"
              label-cols-sm="3"
              label-align-sm="left"
            >
              <b-row>
                <b-col cols="5">
                  <select
                    browser-default
                    v-model="selectedQuestion.audioRecording"
                    class="custom-select borderGray"
                  >
                    <option selected>Enable Continuous</option>
                    <option>Disable Continuous</option>
                  </select>
                </b-col>
              </b-row>
            </b-form-group>
            <p id="prompts"></p>

            <b-form-group
              v-if="selectedQuestion.audioRecording != 'Enable Continuous'"
              label="Time limit for each audio track:"
              label-cols-sm="3"
              label-align-sm="left"
              label-for="nested-audioTimeLimit"
            >
              <b-row>
                <b-col cols="2">
                  <b-form-input
                    class="borderGray"
                    id="nested-audioTimeLimit"
                    @keypress="
                      selectedQuestion.shared > 0
                        ? promptUserOfQuestionSeparation
                        : ''
                    "
                    v-model="selectedQuestion.audioRecordingTimeLimitMinutes"
                    type="audioTimeLimit"
                  ></b-form-input> </b-col
                >mins
                <b-col cols="2">
                  <b-form-input
                    id="nested-audioTimeLimit"
                    @keypress="
                      selectedQuestion.shared > 0
                        ? promptUserOfQuestionSeparation
                        : ''
                    "
                    class="borderGray"
                    v-model="selectedQuestion.audioRecordingTimeLimitSeconds"
                    type="audioTimeLimit"
                  ></b-form-input> </b-col
                >seconds
              </b-row>
            </b-form-group>

            <b-form-group
              label="Camera On:"
              label-cols-sm="3"
              label-align-sm="left"
            >
              <b-form-checkbox-group
                v-model="selectedQuestion.selectedCameras"
                :options="selectedQuestion.cameraOptions"
                stacked
              ></b-form-checkbox-group>
            </b-form-group>

            <b-form-group
              label="Procedure Content:"
              label-cols-sm="3"
              label-align-sm="left"
              label-for="nested-procedureContent"
            >
              <b-form-textarea
                id="nested-procedureContent"
                @keypress="
                  selectedQuestion.shared > 0
                    ? promptUserOfQuestionSeparation
                    : ''
                "
                v-model="selectedQuestion.procedureContent"
                class="borderGray"
                rows="2"
              ></b-form-textarea>
            </b-form-group>

            <b-form-group
              label="Prompt Content 1:"
              label-cols-sm="3"
              label-align-sm="left"
              label-for="nested-promptContent"
            >
              <b-form-textarea
                id="nested-promptContent"
                v-model="selectedQuestion.promptContent1"
                @keypress="
                  selectedQuestion.shared > 0
                    ? promptUserOfQuestionSeparation
                    : ''
                "
                rows="2"
                class="borderGray"
              ></b-form-textarea>
            </b-form-group>

            <b-form-group
              label="Prompt Content 2:"
              label-cols-sm="3"
              label-align-sm="left"
              label-for="nested-promptContent"
            >
              <b-form-textarea
                id="nested-promptContent"
                v-model="selectedQuestion.promptContent2"
                @keypress="
                  selectedQuestion.shared > 0
                    ? promptUserOfQuestionSeparation
                    : ''
                "
                class="borderGray"
                rows="2"
              ></b-form-textarea>
            </b-form-group>

            <b-form-group
              label="Enable Dual Application:"
              label-cols-sm="3"
              label-align-sm="left"
              label-for="nested-dualApplication"
            >
              <toggle-button
                :value="selectedQuestion.dualApplication"
                v-model="selectedQuestion.dualApplication"
                width="70"
                height="30"
                switch-color="black"
                :color="{ checked: '#FFFFFF', unchecked: '#FFFFFF' }"
              />&nbsp;&nbsp;Enable
            </b-form-group>

            <b-form-group
              label="Location/Region Limit:"
              label-cols-sm="3"
              label-align-sm="left"
              label-for="nested-locationLimit"
            >
              <b-row>
                <b-col cols="3">
                  <select
                    browser-default
                    v-model="selectedQuestion.locationLimit"
                    class="custom-select borderGray"
                  >
                    <option selected>Yes</option>
                    <option value="1">No</option>
                  </select>
                </b-col>
              </b-row>
            </b-form-group>

            <b-form-group
              label="Exclude Chosen Region/Location:"
              label-cols-sm="3"
              label-align-sm="left"
              label-for="nested-locationLimit"
            >
              <b-row>
                <b-col cols="3">
                  <country-select
                    v-model="selectedQuestion.country"
                    :country="selectedQuestion.country"
                    topCountry="US"
                  />
                  <region-select
                    v-model="selectedQuestion.region"
                    :country="selectedQuestion.country"
                    :region="selectedQuestion.region"
                  />
                </b-col>
              </b-row>
            </b-form-group>
            <p id="custom"></p>

            <b-form-group
              id="input-group-3"
              label="Customized Report Title:"
              label-cols-sm="3"
              label-align-sm="left"
              label-for="nested-reportTitle"
            >
              <b-form-input
                id="nested-reportTitle"
                v-model="application.reportTitle"
                @keypress="
                  selectedQuestion.shared > 0
                    ? promptUserOfQuestionSeparation
                    : ''
                "
                type="reportTitle"
                class="borderGray"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-3"
              label="Default Report Destination Email:"
              label-cols-sm="3"
              label-align-sm="left"
              label-for="nested-defaultReportEmail"
            >
              <b-form-input
                id="nested-defaultReportEmail"
                v-model="application.defaultReportEmail"
                @keypress="
                  selectedQuestion.shared > 0
                    ? promptUserOfQuestionSeparation
                    : ''
                "
                class="borderGray"
                type="defaultReportEmail"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              label="Enable User to Change Report Destination:"
              label-cols-sm="3"
              label-align-sm="left"
              label-for="nested-allowChangeReportEmail"
            >
              <toggle-button
                :value="application.allowChangeReportEmail"
                v-model="application.allowChangeReportEmail"
                width="70"
                height="30"
                switch-color="black"
                :color="{ checked: '#FFFFFF', unchecked: '#FFFFFF' }"
              />&nbsp;&nbsp;Enable
            </b-form-group>

            <b-form-group
              label="Location/Region Limit:"
              label-cols-sm="3"
              label-align-sm="left"
              label-for="nested-locationLimit"
            >
              <b-row>
                <b-col cols="3">
                  <select
                    browser-default
                    v-model="application.addRemoveReportDestinations"
                    class="custom-select borderGray"
                  >
                    <option selected>Add</option>
                    <option value="1">Remove</option>
                  </select>
                </b-col>
              </b-row>
            </b-form-group>

            <b-form-group
              label="Graph Types:"
              label-cols-sm="3"
              label-align-sm="left"
            >
              <b-form-checkbox-group
                v-model="selectedQuestion.selectedGraphTypes"
                :options="selectedQuestion.graphTypes"
              ></b-form-checkbox-group>
            </b-form-group>

            <b-form-group
              label="Report Header Content:"
              label-cols-sm="3"
              label-align-sm="left"
              label-for="nested-reportHeaderContent"
            >
              <b-form-textarea
                id="nested-question"
                v-model="application.reportHeaderContent"
                @keypress="
                  selectedQuestion.shared > 0
                    ? promptUserOfQuestionSeparation
                    : ''
                "
                rows="2"
                class="borderGray"
              ></b-form-textarea>
            </b-form-group>

            <b-form-group
              label="Report Footer Content:"
              label-cols-sm="3"
              label-align-sm="left"
              label-for="nested-reportFooterContent"
            >
              <b-form-textarea
                id="nested-question"
                v-model="application.reportFooterContent"
                @keypress="
                  selectedQuestion.shared > 0
                    ? promptUserOfQuestionSeparation
                    : ''
                "
                rows="2"
                class="borderGray"
              ></b-form-textarea>
            </b-form-group>

            <b-form-group
              label="Report Color Theme:"
              label-cols-sm="3"
              label-align-sm="left"
              label-for="nested-reportColorTheme"
            >
              <b-row>
                <b-col cols="3">
                  <select
                    browser-default
                    v-model="application.reportColorTheme"
                    class="custom-select borderGray"
                  >
                    <option selected>Yellow</option>
                    <option value="1">Red</option>
                    <option value="2">Blue</option>
                    <option value="3">Green</option>
                  </select>
                </b-col>
              </b-row>
            </b-form-group>

            <b-form-group
              label="Tally up Prompt button presses:"
              label-cols-sm="3"
              label-align-sm="left"
              label-for="nested-tallyPromptPresses"
            >
              <toggle-button
                :value="selectedQuestion.tallyPromptPresses"
                v-model="selectedQuestion.tallyPromptPresses"
                width="70"
                height="30"
                switch-color="black"
                :color="{ checked: '#FFFFFF', unchecked: '#FFFFFF' }"
              />&nbsp;&nbsp;On
            </b-form-group>

            <br />

            <b-form-group
              label="Tally up Repeat button presses:"
              label-cols-sm="3"
              label-align-sm="left"
              label-for="nested-tallyRepeatPressesl"
            >
              <toggle-button
                :value="selectedQuestion.tallyRepeatPresses"
                v-model="selectedQuestion.tallyRepeatPresses"
                width="70"
                height="30"
                switch-color="black"
                :color="{ checked: '#FFFFFF', unchecked: '#FFFFFF' }"
              />&nbsp;&nbsp;On
            </b-form-group>

            <b-form-group
              label="Biosensors:"
              label-cols-sm="3"
              label-align-sm="left"
              label-for="nested-bioSensors"
            >
              <toggle-button
                :value="selectedQuestion.bioSensors"
                v-model="selectedQuestion.bioSensors"
                width="70"
                height="30"
                switch-color="black"
                :color="{ checked: '#FFFFFF', unchecked: '#FFFFFF' }"
              />&nbsp;&nbsp;Enable
              <b-row>
                <b-col cols="10">
                  <b-form-group
                    id="eegSensitivity"
                    label="EEG Sensitivity:"
                    label-for="nested-eegSensitivity"
                    label-cols-sm="3"
                    label-align-sm="left"
                  >
                    <span class="col-xs-1">1</span>
                    <span class="col-xs-1" style="float: right;">10</span>

                    <vue-slider
                      :min="1"
                      :max="10"
                      :interval="1"
                      v-model="selectedQuestion.eegSensitivity"
                      :tooltip="'always'"
                    ></vue-slider>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="10">
                  <b-form-group
                    id="emgSensitivity"
                    label="EMG Sensitivity:"
                    label-for="nested-emgSensitivity"
                    label-cols-sm="3"
                    label-align-sm="left"
                  >
                    <span class="col-xs-1">1</span>
                    <span class="col-xs-1" style="float: right;">10</span>

                    <vue-slider
                      :min="1"
                      :max="10"
                      :interval="1"
                      v-model="selectedQuestion.emgSensitivity"
                      :tooltip="'always'"
                    ></vue-slider>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="10">
                  <b-form-group
                    id="ecgSensitivity"
                    label="ECG Sensitivity:"
                    label-for="nested-ecgSensitivity"
                    label-cols-sm="3"
                    label-align-sm="left"
                  >
                    <span class="col-xs-1">1</span>
                    <span class="col-xs-1" style="float: right;">10</span>

                    <vue-slider
                      :min="1"
                      :max="10"
                      :interval="1"
                      v-model="selectedQuestion.ecgSensitivity"
                      :tooltip="'always'"
                    ></vue-slider>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-form-group>

            <b-form-group
              label="Gesture Recognition:"
              label-cols-sm="3"
              label-align-sm="left"
              label-for="nested-gestureRecognition"
            >
              <toggle-button
                :value="selectedQuestion.gestureRecognition"
                v-model="selectedQuestion.gestureRecognition"
                width="70"
                height="30"
                switch-color="black"
                :color="{ checked: '#FFFFFF', unchecked: '#FFFFFF' }"
              />&nbsp;&nbsp;Enable
              <b-row>
                <b-col cols="10">
                  <b-form-group
                    id="frontCamSensitivity"
                    label="Front Cam Sensitivity:"
                    label-for="nested-frontCamSensitivity"
                    label-cols-sm="3"
                    label-align-sm="left"
                  >
                    <span class="col-xs-1">1</span>
                    <span class="col-xs-1" style="float: right;">10</span>

                    <vue-slider
                      :min="1"
                      :max="10"
                      :interval="1"
                      v-model="selectedQuestion.frontCamSensitivity"
                      :tooltip="'always'"
                    ></vue-slider>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="10">
                  <b-form-group
                    id="rightCamSensitivity"
                    label="Right Cam Sensitivity:"
                    label-for="nested-rightCamSensitivity"
                    label-cols-sm="3"
                    label-align-sm="left"
                  >
                    <span class="col-xs-1">1</span>
                    <span class="col-xs-1" style="float: right;">10</span>

                    <vue-slider
                      :min="1"
                      :max="10"
                      :interval="1"
                      v-model="selectedQuestion.rightCamSensitivity"
                      :tooltip="'always'"
                    ></vue-slider>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="10">
                  <b-form-group
                    id="leftCamSensitivity"
                    label="Left Cam Sensitivity:"
                    label-for="nested-leftCamSensitivity"
                    label-cols-sm="3"
                    label-align-sm="left"
                  >
                    <span class="col-xs-1">1</span>
                    <span class="col-xs-1" style="float: right;">10</span>

                    <vue-slider
                      :min="1"
                      :max="10"
                      :interval="1"
                      v-model="selectedQuestion.leftCamSensitivity"
                      :tooltip="'always'"
                    ></vue-slider>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-form-group>

            <div class="text-right">
              <b-button
                @click="saveQuestions(application.questions)"
                squared
                size="lg"
                class="save text-dark"
              >
                <b>Save Changes</b>
              </b-button>
            </div>
            <br />
          </b-col>
        </b-row>
      </b-form>
    </b-container>
  </div>

  <div style="margin-top: 90px;" v-else>
    <Spinner size="big" message="Loading..." speed="0.4"></Spinner>
  </div>
</template>

<script>
import { BIconArrowLeft, BIconGearFill, BIconEyeFill } from "bootstrap-vue";
import VueSlider from "vue-slider-component";
import Papa from "papaparse";
import instance from "../axios.js"
import Spinner from "vue-simple-spinner";

export default {
  name: "View",
  components: {
    BIconArrowLeft,
    BIconGearFill,
    BIconEyeFill,
    VueSlider,
    Spinner,
  },
  props: {
    application: Object,
  },

  data() {
    let selectedQuestion = this.getSelectedQuestion(true);
    let questionsOrderOptions = this.getQuestionsOrderOptions();
    let tempOrder = this.getTempOrder(questionsOrderOptions);

    return {
      selectedQuestion: selectedQuestion,
      questionToBeDeletedIndex: 5000,
      questionInDatabase: [],
      questionCopyToCreate: {},
      questionCopyToDelete: {},
      questionsLoaded: false,
      csvFile: [],
      noQuestionsOnDatabase: false,
      selectedOrder: tempOrder,
      options: questionsOrderOptions,
    };
  },

  computed: {
    getQuestions() {
      return this.application.questions;
    },
  },

  mounted: function() {
    var i = 0;
    var j = 0;
    var m = 0;
    var z = 0;
    var questionList = [];
    this.questionInDatabase = [];
    var currentQuestionID;
    this.questionsLoaded = false;

    if (
      this.application.questions == null ||
      this.application.questions.length == 0
    ) {
      // If there are any questions to pull from the server
      if (this.application.questionIDs.length > 0) {
        // Loop through the question IDs and get all questions matching the IDs in list
        for (i = 0; i < this.application.questionIDs.length; i++) {
          currentQuestionID = this.application.questionIDs[i];
          instance
            .get("api/question/" + currentQuestionID)
            .then((response) => {
              console.log(response.data);

              questionList.push(response.data);
              this.questionInDatabase.push(response.data.id);
              console.log(
                "Questions in database mounted 1: ",
                this.questionInDatabase
              );

              console.log("Right outside if block with j = ", j);

              // If we are on our last question ID
              if (j >= this.application.questionIDs.length - 1) {
                console.log("Inside if block");

                questionList.sort(
                  (a, b) =>
                    this.application.questionIDs.indexOf(a.id) -
                    this.application.questionIDs.indexOf(b.id)
                );

                for (m = 0; m < questionList.length; m++) {
                  questionList[m].number = m + 1;
                }

                this.application.questions = questionList;
                let questionsOrderOptions = this.getQuestionsOrderOptions();
                let tempOrder = this.getTempOrder(questionsOrderOptions);

                this.options = questionsOrderOptions;
                this.selectedOrder = tempOrder;
                this.selectedQuestion = this.application.questions[0];

                this.questionsLoaded = true;
              }

              j++;
            })

            .catch((error) => console.log(error));
        }

        // If there are no questions... create them
      } else {
        this.noQuestionsOnDatabase = true;
        console.log(
          "No questions on db, so post should occur",
          this.noQuestionsOnDatabase
        );

        this.setSelectedQuestion(this.addQuestion("", "", "", "", ""));
        this.addQuestion("", "", "", "", "");
        this.addQuestion("", "", "", "", "");

        var e = 0;
        for (e = 0; e < this.application.questions.length; e++) {
          instance
            .post(
              "api/question",

              this.application.questions[e]
            )
            .then((response) => {
              console.log("new question created on server: ", response.data);
              console.log(
                "Print created question: ",
                this.application.questions[z]
              );
              console.log("z = ", z);
              if (
                e >= this.application.questions.length - 1 &&
                z >= this.application.questions.length - 1
              ) {
                for (z = 0; z < this.application.questions.length; z++) {
                  this.questionInDatabase.push(
                    this.application.questions[z].id
                  );
                  console.log(
                    "Question in database mounted 2: ",
                    this.questionInDatabase
                  );
                  this.noQuestionsOnDatabase = false;
                }
              }

              z++;
            })
            .catch((error) => console.log(error));
        }

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
          addRemoveReportDestinations: this.application
            .addRemoveReportDestinations,
          reportHeaderContent: this.application.reportHeaderContent,
          reportFooterContent: this.application.reportFooterContent,
          reportColorTheme: this.application.reportColorTheme,
          userID: this.$store.getters.getCurrentUser,
        };

        console.log("App's question ids are: ", application.questionIDs);

        instance
          .patch(
            "api/appAdmin/" + this.application.id,
            application
          )
          .then(() => {
            console.log("Application updated: id ", this.application.id);
            console.log(
              "Application updated: questionIDs are ",
              this.application.questionIDs
            );
          });

        let questionsOrderOptions = this.getQuestionsOrderOptions();
        let tempOrder = this.getTempOrder(questionsOrderOptions);

        this.options = questionsOrderOptions;
        this.selectedOrder = tempOrder;
        this.questionsLoaded = true;
      }
    } else {
      this.questionsLoaded = true;

      for (m = 0; m < this.application.questions.length; m++) {
        this.questionInDatabase.push(this.application.questions[m].id);
      }

      console.log("Questions in database mounted 3: ", this.questionInDatabase);
    }
  },

  methods: {
    deleteApplication(app) {
      instance.delete("api/appAdmin/" + app.id).then(() => {
        this.$store.commit("removeApplication", app);
        this.$router.push({ path: "/adminDashboard" });
      });
    },

    promptUserOfQuestionSeparation() {
      console.log("Current shared value 1: ", this.selectedQuestion.shared);
      if (this.selectedQuestion.shared > 0) {
        this.$bvModal.show("promptUserModal");
      }
    },

    promptUserOfQuestionDeletion(index) {
      if (
        this.selectedQuestion.shared > 0 ||
        this.application.questions.length == 1
      ) {
        this.questionToBeDeletedIndex = index;
        this.$bvModal.show("promptUserDeleteModal");
      } else {
        this.deleteQuestion(index);
      }
    },

    closePromptUserDeleteModal(index) {
      var temp = this.application.questions[index];
      var i = 0;

      if (temp.shared > 0) {
        this.questionCopyToDelete = temp;
        this.questionCopyToDelete.shared = this.questionCopyToDelete.shared - 1;

        console.log(
          "New questions in database before prompt delete: ",
          this.questionInDatabase
        );

        this.removeArr(
          this.application.questionIDs,
          this.application.questions[index].id
        );

        this.removeArr(
          this.application.questions,
          this.application.questions[index]
        );

        this.questionToBeDeletedIndex = 5000;
      }

      if (this.application.questions.length == 1) {
        this.deleteQuestion(index);
        this.deleteApplication(this.application);
      } else if (index == 0 && this.selectedQuestion == temp) {
        this.setSelectedQuestion(this.application.questions[0]);
      } else if (
        index >= this.application.questions.length &&
        this.selectedQuestion == temp
      ) {
        this.setSelectedQuestion(this.application.questions[index - 1]);
      } else {
        this.setSelectedQuestion(this.selectedQuestion);
      }

      // 1, 2, 3, 4, 5

      this.application.questions.sort(
        (a, b) =>
          this.application.questionIDs.indexOf(a.id) -
          this.application.questionIDs.indexOf(b.id)
      );

      for (i = 0; i < this.application.questions.length; i++) {
        this.application.questions[i].number = i + 1;
      }

      console.log(
        "New questions in database after prompt delete: ",
        this.questionInDatabase
      );

      this.$bvModal.hide("promptUserDeleteModal");
    },

    closePromptUserModal() {
      this.questionCopyToCreate = {
        shared: this.selectedQuestion.shared - 1,
        number: this.selectedQuestion.number,
        text: this.selectedQuestion.text,
        description: this.selectedQuestion.description,
        category: this.selectedQuestion.category,
        subCategory: this.selectedQuestion.subCategory,
        id: this.selectedQuestion.id,
        instructionVideo: this.selectedQuestion.instructionVideo,
        childImages: this.selectedQuestion.childImages,
        specialistImages: this.selectedQuestion.specialistImages,
        imageOrganization: this.selectedQuestion.imageOrganization,
        buttonOrganization: this.selectedQuestion.buttonOrganization,
        questionType: this.selectedQuestion.questionType,
        displayType: "",
        answerOptions: this.selectedQuestion.answerOptions,
        singleCorrectAnswer: this.selectedQuestion.singleCorrectAnswer,
        multipleCorrectAnswers: this.selectedQuestion.multipleCorrectAnswers,
        childSelectedAnswerSingle: this.selectedQuestion
          .childSelectedAnswerSingle,
        childSelectedAnswerMultiple: this.selectedQuestion
          .childSelectedAnswerMultiple,
        whenButtonPressed: this.selectedQuestion.whenButtonPressed,

        textToSpeech: this.selectedQuestion.textToSpeech,
        textToSpeech1: this.selectedQuestion.textToSpeech1,
        textToSpeech2: this.selectedQuestion.textToSpeech2,
        textToSpeech3: this.selectedQuestion.textToSpeech3,

        timeLimit1Minutes: this.selectedQuestion.timeLimit1Minutes,
        timeLimit1Seconds: this.selectedQuestion.timeLimit1Seconds,
        timeLimit1Reached: this.selectedQuestion.timeLimit1Reached,

        timeLimit2Minutes: this.selectedQuestion.timeLimit2Minutes,
        timeLimit2Seconds: this.selectedQuestion.timeLimit2Seconds,
        timeLimit2Reached: this.selectedQuestion.timeLimit2Reached,

        scoringOptions: this.selectedQuestion.scoringOptions,
        selectedScoringOptions: this.selectedQuestion.selectedScoringOptions,
        selectedScoreInPreview: this.selectedQuestion.selectedScoreInPreview,
        audioRecording: this.selectedQuestion.audioRecording,
        audioRecordingTimeLimitMinutes: this.selectedQuestion
          .audioRecordingTimeLimitMinutes,
        audioRecordingTimeLimitSeconds: this.selectedQuestion
          .audioRecordingTimeLimitSeconds,
        audioClips: this.selectedQuestion.audioClips,
        videoClips: this.selectedQuestion.videoClips,

        selectedCameras: this.selectedQuestion.selectedCameras,
        procedureContent: this.selectedQuestion.procedureContent,
        promptContent1: this.selectedQuestion.promptContent1,
        promptContent2: this.selectedQuestion.promptContent2,
        dualApplication: this.selectedQuestion.dualApplication,

        locationLimit: this.selectedQuestion.locationLimit,
        country: this.selectedQuestion.country,
        region: this.selectedQuestion.region,

        selectedGraphTypes: this.selectedQuestion.selectedGraphTypes,

        typicalRange: this.selectedQuestion.typicalRange,
        absoluteRange: this.selectedQuestion.absoluteRange,

        tallyPromptPresses: this.selectedQuestion.tallyPromptPresses,
        tallyRepeatPresses: this.selectedQuestion.tallyRepeatPresses,
        repeatClicks: this.selectedQuestion.repeatClicks,
        promptClicks: this.selectedQuestion.promptClicks,
        bioSensors: this.selectedQuestion.bioSensors,
        eegSensitivity: this.selectedQuestion.eegSensitivity,
        emgSensitivity: this.selectedQuestion.emgSensitivity,
        ecgSensitivity: this.selectedQuestion.ecgSensitivity,
        gestureRecognition: this.selectedQuestion.gestureRecognition,
        frontCamSensitivity: this.selectedQuestion.frontCamSensitivity,
        rightCamSensitivity: this.selectedQuestion.rightCamSensitivity,
        leftCamSensitivity: this.selectedQuestion.leftCamSensitivity,
      };

      console.log("Question copy to create: ", this.questionCopyToCreate);

      this.selectedQuestion.id = "" + Math.ceil(Math.random() * 500);
      this.application.questionIDs.push(this.selectedQuestion.id);

      if (this.selectedQuestion.shared > 0) {
        this.selectedQuestion.shared = 0;
      }

      console.log("Current shared value 2: ", this.selectedQuestion.shared);
      console.log("New current selected ?: ", this.selectedQuestion);
      console.log(
        "New question ID list (including newly created after copy): ",
        this.application.questionIDs
      );

      this.$bvModal.hide("promptUserModal");
    },

    // To update question order permanently, must press Update button at bottom of "View Questions"
    changeQuestionOrderLocally() {
      var valid = false;
      var questionList = this.application.questions;
      var tempQuestionIDs = [];
      var tempID = "";
      var sum = 0;
      var newSum = 0;
      var i = 0;

      for (i = 0; i < this.application.questions.length; i++) {
        questionList[i].number = this.selectedOrder[i];
        sum += parseInt(this.application.questions[i].number);
        newSum += parseInt(questionList[i].number);
        console.log("Sum = ", sum);
        console.log("New sum = ", newSum);
      }

      if (sum === newSum) {
        valid = true;
      }

      if (valid == true) {
        for (i = 0; i < this.application.questions.length; i++) {
          this.application.questions[i].number = questionList[i].number;
        }
        this.application.questions.sort(
          (a, b) => parseInt(a.number) - parseInt(b.number)
        );

        for (i = 0; i < this.application.questions.length; i++) {
          tempID = this.application.questions.find((x) => x.number === i + 1)
            .id;
          tempQuestionIDs.push(tempID);

          console.log("TempID = , tempQuestionsID = ", tempID, tempQuestionIDs);
        }

        this.application.questionIDs = [];
        this.application.questionIDs = tempQuestionIDs;

        console.log(
          "New question IDs (reordered based on the new numbers): ",
          this.application.questionIDs
        );

        tempQuestionIDs = [];
        this.options = this.getQuestionsOrderOptions();
        this.selectedOrder = this.getTempOrder(this.options);
        this.$bvModal.hide("changeQuestionOrderModal");
      }
    },

    getTempOrder(options) {
      var i = 0;
      var tempOrder = [];

      for (i = 0; i < options.length; i++) {
        tempOrder.push(options[i].value);
      }

      console.log("Temp order = ", tempOrder);

      return tempOrder;
    },

    getQuestionsOrderOptions() {
      var i = 0;
      var options = [];

      for (i = 0; i < this.application.questions.length; i++) {
        options.push({
          text: this.application.questions[i].number,
          value: this.application.questions[i].number,
        });
      }

      console.log("Question order options = ", options);
      return options;
    },

    onCSVFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      this.csvFile = files[0];
      return files[0];
    },

    clickInstructionVideoButton() {
      document.getElementById("instructionVideoButton").click();
    },

    clickCSVButton() {
      document.getElementById("csvButton").click();
    },

    clickSpecialistImageButton() {
      document.getElementById("imageButton").click();
    },

    clickChildImageButton() {
      document.getElementById("childImageButton").click();
    },

    onInstructionVideoFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      this.selectedQuestion.instructionVideo = files[0];
      this.encodeInstructionVideoAsURL();
      return files[0];
    },

    onSpecialistImagesFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      var i = 0;
      for (i = 0; i < files.length; i++) {
        this.selectedQuestion.specialistImages.push(files[i]);
      }
      this.encodeSpecialistImageFilesAsURL();

      return files[0];
    },

    onChildImagesFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      var i = 0;
      for (i = 0; i < files.length; i++) {
        this.selectedQuestion.childImages.push(files[i]);
      }
      this.encodeChildImageFilesAsURL();

      return files[0];
    },

    getSelectedQuestion(openView) {
      if (openView == true) {
        this.setSelectedQuestion(this.application.questions[0]);
      }

      return this.selectedQuestion;
    },

    setSelectedQuestion(question) {
      this.selectedQuestion = question;
    },

    addQuestion(text, description, category, subCategory) {
      {
        var question = {
          shared: 0,
          number: this.application.questions.length
            ? this.application.questions.length + 1
            : 1,
          text: text,
          description: description,
          category: category,
          subCategory: subCategory,
          id: "" + Math.ceil(Math.random() * 500),
          instructionVideo: "",
          childImages: [],
          specialistImages: [],
          imageOrganization: "Horizontal",
          buttonOrganization: "Next to each other",
          questionType: "Single answer",
          displayType: "Multiple Choice",
          inputedAnswer: "",
          answerOptions: [],
          singleCorrectAnswer: "",
          multipleCorrectAnswers: [],
          childSelectedAnswerSingle: "",
          childSelectedAnswerMultiple: [],
          whenButtonPressed: "Red X",

          textToSpeech: false,
          textToSpeech1: "",
          textToSpeech2: "",
          textToSpeech3: "",

          timeLimit1Minutes: "0",
          timeLimit1Seconds: "0",
          timeLimit1Reached: "Show/Say Prompt 1",

          timeLimit2Minutes: "0",
          timeLimit2Seconds: "0",
          timeLimit2Reached: "Show/Say Prompt 1",

          scoringOptions: ["0", "+1", "+2", "+3", "+4"],
          selectedScoringOptions: ["0", "+1", "+2", "+3", "+4"],
          selectedScoreInPreview: "",
          audioRecording: "Enable Continuous",
          audioRecordingTimeLimitMinutes: "0",
          audioRecordingTimeLimitSeconds: "0",
          audioClips: [],
          videoClips: [],
          audioClipURLs: [],
          videoClipURLs: [],
          cameraOptions: [
            "Camera 1 - Front",
            "Camera 2 - Right",
            "Camera 3 - Left",
          ],
          selectedCameras: [
            "Camera 1 - Front",
            "Camera 2 - Right",
            "Camera 3 - Left",
          ],
          procedureContent: "",
          promptContent1: "",
          promptContent2: "",
          dualApplication: false,

          locationLimit: "Yes",
          country: "",
          region: "",

          graphTypes: ["Line Graph", "Bar Graph", "Pie Graph", "Radar Graph"],
          selectedGraphTypes: [
            "Line Graph",
            "Bar Graph",
            "Pie Graph",
            "Radar Graph",
          ],

          typicalRange: [2, 8],
          absoluteRange: [1, 9],

          tallyPromptPresses: true,
          tallyRepeatPresses: true,
          repeatClicks: 0,
          promptClicks: 0,
          bioSensors: false,
          eegSensitivity: 6,
          emgSensitivity: 6,
          ecgSensitivity: 6,
          gestureRecognition: false,
          frontCamSensitivity: 6,
          rightCamSensitivity: 6,
          leftCamSensitivity: 6,
          notes: "",
        };

        this.application.questions.push(question);
        var tempLength = this.application.questions.length;

        this.application.questionIDs.push(
          this.application.questions[tempLength - 1].id
        );

        return question;
      }
    },

    showSpreadsheetModal() {
      this.$modal.show("importSpreadsheet");
    },

    onSpreadsheetModalClose() {
      this.$modal.hide("importSpreadsheet");
    },

    addAnswer(inputedAnswer) {
      if (inputedAnswer.trim() != "") {
        console.log(
          "inputed answer = " +
            inputedAnswer +
            " and correctAnswers = " +
            this.selectedQuestion.correctAnswers
        );
        this.selectedQuestion.answerOptions.push(inputedAnswer);
        this.selectedQuestion.inputedAnswer = "";
      }
    },

    deleteQuestion(index) {
      var temp = this.application.questions[index];
      var i = 0;

      console.log(
        "QIDs before deletion of " +
          temp.id +
          ": " +
          this.application.questionIDs
      );
      console.log(
        "Questions before deletion of " +
          temp.id +
          ": " +
          this.application.questions
      );

      instance.delete("api/question/" + temp.id).then(() => {
        console.log("Question deleted with id: ", temp.id);
      });

      this.removeArr(
        this.application.questionIDs,
        this.application.questions[index].id
      );

      this.removeArr(
        this.questionInDatabase,
        this.application.questions[index].id
      );

      this.removeArr(
        this.application.questions,
        this.application.questions[index]
      );

      console.log("temp = ", temp);
      console.log(
        "QIDs after deletion of " +
          temp.id +
          ": " +
          this.application.questionIDs
      );
      console.log(
        "Questions after deletion of " +
          temp.id +
          ": " +
          this.application.questions
      );

      if (this.application.questions.length == 0) {
        this.setSelectedQuestion(this.addQuestion("", "", "", "", ""));
      } else if (index == 0 && this.selectedQuestion == temp) {
        this.setSelectedQuestion(this.application.questions[0]);
      } else if (
        index >= this.application.questions.length &&
        this.selectedQuestion == temp
      ) {
        this.setSelectedQuestion(this.application.questions[index - 1]);
      } else {
        this.setSelectedQuestion(this.selectedQuestion);
      }

      // 1, 2, 3, 4, 5

      this.application.questions.sort(
        (a, b) =>
          this.application.questionIDs.indexOf(a.id) -
          this.application.questionIDs.indexOf(b.id)
      );

      for (i = 0; i < this.application.questions.length; i++) {
        this.application.questions[i].number = i + 1;
      }
    },

    encodeSpecialistImageFilesAsURL() {
      var files = this.selectedQuestion.specialistImages;
      console.log("Images being encoded ", files);

      files.forEach((file, index) => {
        const reader = new FileReader();
        reader.addEventListener(
          "load",
          (e) =>
            (this.selectedQuestion.specialistImages[index] = e.target.result)
        );
        reader.readAsDataURL(file);

        console.log(
          "These are the encoded images: ",
          this.selectedQuestion.specialistImages
        );
      });
    },

    encodeChildImageFilesAsURL() {
      var files = this.selectedQuestion.childImages;
      console.log("Images being encoded ", files);

      files.forEach((file, index) => {
        const reader = new FileReader();
        reader.addEventListener(
          "load",
          (e) => (this.selectedQuestion.childImages[index] = e.target.result)
        );
        reader.readAsDataURL(file);

        console.log(
          "These are the encoded images: ",
          this.selectedQuestion.childImages
        );
      });
    },

    encodeInstructionVideoAsURL() {
      var file = this.selectedQuestion.instructionVideo;

      const reader = new FileReader();
      reader.addEventListener(
        "load",
        (e) => (this.selectedQuestion.instructionVideo = e.target.result)
      );
      reader.readAsDataURL(file);

      console.log(this.selectedQuestion.instructionVideo);
    },

    deleteAnswer(answer) {
      var answerToRemove = answer;

      this.removeArr(this.selectedQuestion.answerOptions, answerToRemove);

      if (answer == this.selectedQuestion.singleCorrectAnswer) {
        this.selectedQuestion.singleCorrectAnswer = "";
      }

      this.removeArr(
        this.selectedQuestion.multipleCorrectAnswers,
        answerToRemove
      );
    },

    removeArr(arr, value) {
      console.log("Inside removeArr: arr and value are: ", arr, value);
      var index = arr.indexOf(value);
      if (index > -1) {
        arr.splice(index, 1);
      }
      return arr;
    },

    saveQuestions(questions) {
      var i = 0;
      var z = 0;
      var tempID = "";
      var tempQuestionIDs = [];

      var questionList = questions;
      console.log(
        "Questions in database inside save question: ",
        this.questionInDatabase
      );

      if (this.questionCopyToCreate.number) {
        questionList.push(this.questionCopyToCreate);
        console.log("Question copy to create: ", this.questionCopyToCreate);
        console.log("Question list after copy: ", questionList);
      }

      if (this.questionCopyToDelete.number) {
        questionList.push(this.questionCopyToDelete);
        console.log(
          "Question copy to delete in save questions: ",
          this.questionCopyToDelete
        );
        console.log("Question list after copy of question to delete: ");
      }

      // let headers = "Content-Type: application/json";
      var disType = "";

      for (i = 0; i < questionList.length; i++) {
        console.log("Current question in save questions: ", questionList[i]);
        if (questionList[i].specialistImages && questionList[i].childImages) {
          if (questionList[i].answerOptions) {
            disType = "Text";
          } else {
            disType = "Multiple Choice";
          }
        } else {
          disType = "Media";
        }

        let question = {
          shared: questionList[i].shared,
          number: questionList[i].number,
          text: questionList[i].text,
          description: questionList[i].description,
          category: questionList[i].category,
          subCategory: questionList[i].subCategory,
          id: questionList[i].id,
          instructionVideo: questionList[i].instructionVideo,
          childImages: questionList[i].childImages,
          specialistImages: questionList[i].specialistImages,
          imageOrganization: questionList[i].imageOrganization,
          buttonOrganization: questionList[i].buttonOrganization,
          questionType: questionList[i].questionType,
          displayType: disType,
          answerOptions: questionList[i].answerOptions,
          singleCorrectAnswer: questionList[i].singleCorrectAnswer,
          multipleCorrectAnswers: questionList[i].multipleCorrectAnswers,
          childSelectedAnswerSingle: questionList[i].childSelectedAnswerSingle,
          childSelectedAnswerMultiple:
            questionList[i].childSelectedAnswerMultiple,
          whenButtonPressed: questionList[i].whenButtonPressed,

          textToSpeech: questionList[i].textToSpeech,
          textToSpeech1: questionList[i].textToSpeech1,
          textToSpeech2: questionList[i].textToSpeech2,
          textToSpeech3: questionList[i].textToSpeech3,

          timeLimit1Minutes: questionList[i].timeLimit1Minutes,
          timeLimit1Seconds: questionList[i].timeLimit1Seconds,
          timeLimit1Reached: questionList[i].timeLimit1Reached,

          timeLimit2Minutes: questionList[i].timeLimit2Minutes,
          timeLimit2Seconds: questionList[i].timeLimit2Seconds,
          timeLimit2Reached: questionList[i].timeLimit2Reached,

          scoringOptions: questionList[i].scoringOptions,
          selectedScoringOptions: questionList[i].selectedScoringOptions,
          selectedScoreInPreview: questionList[i].selectedScoreInPreview,
          audioRecording: questionList[i].audioRecording,
          audioRecordingTimeLimitMinutes:
            questionList[i].audioRecordingTimeLimitMinutes,
          audioRecordingTimeLimitSeconds:
            questionList[i].audioRecordingTimeLimitSeconds,
          audioClips: questionList[i].audioClips,
          videoClips: questionList[i].videoClips,

          selectedCameras: questionList[i].selectedCameras,
          procedureContent: questionList[i].procedureContent,
          promptContent1: questionList[i].promptContent1,
          promptContent2: questionList[i].promptContent2,
          dualApplication: questionList[i].dualApplication,

          locationLimit: questionList[i].locationLimit,
          country: questionList[i].country,
          region: questionList[i].region,

          selectedGraphTypes: questionList[i].selectedGraphTypes,

          typicalRange: questionList[i].typicalRange,
          absoluteRange: questionList[i].absoluteRange,

          tallyPromptPresses: questionList[i].tallyPromptPresses,
          tallyRepeatPresses: questionList[i].tallyRepeatPresses,
          repeatClicks: questionList[i].repeatClicks,
          promptClicks: questionList[i].promptClicks,
          bioSensors: questionList[i].bioSensors,
          eegSensitivity: questionList[i].eegSensitivity,
          emgSensitivity: questionList[i].emgSensitivity,
          ecgSensitivity: questionList[i].ecgSensitivity,
          gestureRecognition: questionList[i].gestureRecognition,
          frontCamSensitivity: questionList[i].frontCamSensitivity,
          rightCamSensitivity: questionList[i].rightCamSensitivity,
          leftCamSensitivity: questionList[i].leftCamSensitivity,
        };

        // After question IDs are all in place, push them to app admin table along with the new questions to questions table
        // See if question IDs are already present, if so, just patch those questions on the database instead of posting
        if (
          this.questionInDatabase.includes(question.id) &&
          this.noQuestionsOnDatabase == false
        ) {
          console.log("Questions are on db and can patch");
          instance
            .patch(
              "api/question/" + question.id,
              question
            )
            .then(() => {
              console.log("Question updated: id ", question.id);
            });
        }

        // If this question ID is new, post it to the questions table
        else {
          console.log("Question in database = ", this.questionInDatabase);

          console.log("Question is not on db, we must post", question);

          instance
            .post(
              "api/question",

              question
            )
            .then((response) => {
              console.log("new question created on server: ", response.data);
              this.noQuestionsOnDatabase = false;
            })
            .catch((error) => console.log(error));
        }
      }

      console.log(
        "Question IDs before updating application: ",
        this.application.questionIDs
      );

      if (this.questionCopyToCreate.id) {
        this.removeArr(
          this.application.questionIDs,
          this.questionCopyToCreate.id
        );
        this.removeArr(this.questionInDatabase, this.questionCopyToCreate.id);

        for (z = 0; z < this.application.questions.length; z++) {
          tempID = this.application.questions.find((x) => x.number === z + 1)
            .id;
          tempQuestionIDs.push(tempID);

          console.log(
            "Save ? after question editing: TempID = , tempQuestionsID = ",
            tempID,
            tempQuestionIDs
          );
        }

        this.application.questionIDs = [];
        this.application.questionIDs = tempQuestionIDs;
      }

      if (this.questionCopyToDelete.id) {
        this.removeArr(this.questionInDatabase, this.questionCopyToDelete.id);
        this.removeArr(this.application.questions, this.questionCopyToDelete);

        console.log(
          "New questions in database after deletion: ",
          this.questionInDatabase
        );
      }

      // Now that questions have been updated and/or pushed to server for the first time, update the application with latest question IDs
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
        addRemoveReportDestinations: this.application
          .addRemoveReportDestinations,
        reportHeaderContent: this.application.reportHeaderContent,
        reportFooterContent: this.application.reportFooterContent,
        reportColorTheme: this.application.reportColorTheme,
        userID: this.$store.getters.getCurrentUser,
      };

      console.log("App's question ids are: ", application.questionIDs);

      instance
        .patch(
          "api/appAdmin/" + this.application.id,
          application
        )
        .then(() => {
          console.log("Application updated: id ", this.application.id);

          this.questionCopyToCreate = {};
        });
    },

    exportQuestionsToCSV() {
      var csvFileData = [];
      var i = 0;
      var temp = [];
      var q = this.application.questions;

      for (i = 0; i < this.application.questions.length; i++) {
        temp.push(q[i].text);
        temp.push(q[i].description);
        temp.push(q[i].category);
        temp.push(q[i].subCategory);
        temp.push(q[i].id);

        csvFileData.push(temp);
        temp = [];
      }

      var csv =
        "QuestionText, QuestionDescription, QuestionCatgory, QuestionSubCategory, CustomID\n";

      csvFileData.forEach(function(row) {
        csv += row.join(",");
        csv += "\n";
      });

      var tempElement = document.createElement("a");
      tempElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
      tempElement.target = "_blank";

      tempElement.download = "Questions.csv";
      tempElement.click();
    },

    onSubmitSpreadsheet(evt) {
      evt.preventDefault();

      var tempThis = this;

      Papa.parse(this.csvFile, {
        complete: function(questions) {
          console.log(
            "Questions from CSV file, and length of array is",
            questions,
            questions.data.length
          );

          var i = 1;
          var tempQuestion;

          if (questions.data.length > 0) {
            console.log("Inside if statement");

            for (i = 1; i < questions.data.length; i++) {
              tempQuestion = questions.data[i];
              console.log("tempQuesion = ", tempQuestion);
              tempThis.addQuestion(
                tempQuestion[0],
                tempQuestion[1],
                tempQuestion[2],
                tempQuestion[3],
                tempQuestion[4]
              );
            }
          }
        },
      });

      this.onSpreadsheetModalClose();
    },
  },
};
</script>

<style scoped>
.fileUpload {
  width: 100px;
  height: 36px;
  text-align: left;
}

.fileUpload input.upload {
  padding: 0;
  position: absolute;
  top: 0;
  right: 0;
  margin: 0;
  padding: 0;
  width: 100px;
  height: 36px;
  font-size: 15px;
  opacity: 0;
  filter: alpha(opacity=0);
}

.borderGray {
  border: 1.4px solid #cccccc;
}

.questionSidebar::-webkit-scrollbar {
  width: 15px; /* width of the entire scrollbar */
}
.questionSidebar::-webkit-scrollbar-track {
  background: white; /* color of the tracking area */
}
.questionSidebar::-webkit-scrollbar-thumb {
  background-color: darkgray; /* color of the scroll thumb */
  border: 10px solid black; /* creates padding around scroll thumb */
}

.questionSidebar {
  max-height: 350px;
  max-width: 250px;
  margin-bottom: 10px;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}

.newQuestionButton {
  background-color: #ff930f;
  color: #ff930f;
  border-color: #ff930f;
}

.newQuestionButton:hover {
  background-color: #ff930f;
  color: #ff930f;
  border-color: #ff930f;
}
.newQuestionButton:active {
  background-color: #ff930f;
  color: #ff930f;
  border-color: #ff930f;
}
.newQuestionButton:focus {
  background-color: #ff930f;
  color: #ff930f;
  border-color: #ff930f;
}

.save {
  background-color: #ff930f;
  color: #ff930f;
  border-color: #ff930f;
}

.save:hover {
  background-color: #ff930f;
  color: #ff930f;
  border-color: #ff930f;
}

.save:active {
  background-color: #ff930f;
  color: #ff930f;
  border-color: #ff930f;
}

hr {
  border: 0.5px solid gray;
}

.vertical-center {
  min-height: 80%; /* Fallback for browsers do NOT support vh unit */
  min-height: 80vh; /* These two lines are counted as one :-)       */

  display: flex;
  align-items: center;
}
</style>
