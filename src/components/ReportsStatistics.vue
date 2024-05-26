reports statistics

<template>
  <div id="container">
    <!-- login page -->
    <div v-if="!displayWebsite" class="d-flex justify-content-center align-items-center h-100">
      <div id="innerBox">
        <div class="d-flex justify-content-center align-items-center h-100">
          <div class="w-75">
            <h1 class="font-weight-bold text-center mb-5">
              Reports/Statistics
            </h1>
            <div class="mt-5 mb-5">
              <div class="mb-2">Username:</div>
              <b-form-input v-model="inputVariables.username" class="rounded-pill"></b-form-input>
              <div class="forgotText text-right font-weight-bold mt-2">Forgot Username?</div>
            </div>
            <div class="mb-5">
              <div class="mb-2">Password:</div>
              <b-form-input v-model="inputVariables.password" class="rounded-pill"></b-form-input>
              <div class="forgotText text-right font-weight-bold mt-2">Forgot Password?</div>
            </div>
            <b-button pill variant="light" class="font-weight-bold w-100 mt-5 mb-5">Sign-In</b-button>
            <b-form-checkbox
              id="checkbox-1"
              name="checkbox-1"
              value="true"
              unchecked-value="false"
              style="font-size: .7em"
              class="font-weight-bold"
            >
              Keep me signed-in.
            </b-form-checkbox>
            <b-button pill variant="orangeLight" class="font-weight-bold w-100 mt-5 mb-5 border border-dark">Register Now</b-button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <!-- intermediary page to go to statistics or dashboard -->
      <div v-if="!showVariables.showIntermediary" class="d-flex justify-content-around align-items-center h-100">
        <div class="intermediaryChoicesBox">
          <div class="d-flex justify-content-center align-items-center h-100" @click="showToggles('intermediary')">
            App Admin Report Configuration
          </div>
        </div>
        <div class="intermediaryChoicesBox">
          <div class="d-flex justify-content-center align-items-center h-100" @click="goDashboard">
            Dashboard Report
          </div>
        </div>
      </div>

      <!-- report statistics -->
      <div v-else class="d-flex justify-content-around align-items-center">
        <div id="applicationsBox" class="m-4">
          <div>
            <h4 class="text-center p-2 font-weight-bold">Applications</h4>
          </div>
          <div class="w-100 d-flex justify-content-center align-items-center mb-5">
            <div class="rounded-pill border border-dark w-50">
              <div class="d-flex justify-content-center align-items-center w-100">
                <font-awesome-icon :icon="['fas', 'magnifying-glass']" size="sm" class="w-25"/>
                <b-form-input v-model="searchApp" id="searchApp" placeholder="Search" size="sm" class="border-0 rounded-pill w-50"></b-form-input>
              </div>
            </div>
          </div>
          <div style="height: 82%; overflow: auto;">
            <div v-for="(item, index) in 20" :key="index">
              <div class="mb-3" >
                Application Name
              </div>   
            </div>
          </div>
        </div>
        <div id="reportAppBox" class="m-4">
          <div class="d-flex justify-content-center align-items-center h-100" >
            <div class="flex-column d-flex justify-content-center align-items-center w-100 p-5">
              <h2 id="reportTitle" class="text-center p-2 font-weight-bold w-75">Report Application Name 1</h2>
              <div class="w-100" id="informationScroll" style="overflow: auto; height: 68vh;">
                <b-container>
                  <b-row>
                    <b-col cols="3" class="d-flex justify-content-end align-items-center text-right">Name:</b-col>
                    <b-col cols="9"><b-form-input v-model="inputVariables.name" id="name" size="sm" class="rounded-pill" autocomplete="off" placeholder="New User Score Report"></b-form-input></b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="3" class="d-flex justify-content-end align-items-start text-right">Select Users that:</b-col>
                    <b-col cols="9">
                      <b-container>
                        <b-row>
                          <b-col cols="5" class="pl-0">
                            <b-form-select v-model="selectVariables.ageRange" :options="selectVariables.optionsAge" id="ageRange" size="sm" class="rounded-pill font-weight-bold" style="color: #000000"></b-form-select>
                          </b-col>
                          <b-col cols="3"><b-form-input v-model="dateStart" id="dateStart" placeholder="MM/DD/YYYY" size="sm" class="rounded-pill"></b-form-input></b-col>
                          <b-col cols="1" class="text-center">-</b-col>
                          <b-col cols="3"><b-form-input v-model="dateEnd" id="dateEnd" placeholder="MM/DD/YYYY" size="sm" class="rounded-pill"></b-form-input></b-col>
                        </b-row>
                        <b-row>
                          <b-col cols="5" class="pl-0">
                            <b-form-select v-model="selectVariables.active" id="active" :options="selectVariables.optionsActive" size="sm" class="rounded-pill font-weight-bold" style="color: #000000"></b-form-select>
                          </b-col>
                        </b-row>
                        <b-row v-for="rule in tagsArray.ruleSelect" :key="rule">
                          <b-col cols="5" class="pl-0">
                            <b-form-input v-model="dateEnd" id="dateEnd" :placeholder="rule" size="sm" class="rounded-pill"></b-form-input>
                          </b-col>
                          <b-col cols="1">
                            <font-awesome-icon :icon="['fas', 'x']" @click="deleteRule(rule)"/>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col cols="5" class="pl-0">
                            <div @click="showToggles('rule')">
                              <font-awesome-icon :icon="['fas', 'plus']" />
                              <span class="iconText position-relative">Add Rule</span>
                            </div>
                            <div v-if="showVariables.showAddRule" class="addRuleStyle">
                              <div>
                                <div v-for="rule in tagsArray.addRuleSelect" @click="addRule(rule)" :key="rule" class="chooseRuleStyle font-weight-normal border border-dark m-2 p-1 d-inline-block">
                                  {{ rule }}
                                </div>
                              </div>
                            </div>
                          </b-col>
                        </b-row>
                      </b-container>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="3" class="d-flex justify-content-end align-items-start text-right">Variables:</b-col>
                    <b-col cols="9">
                      <div class="tagBox" style="position: relative">
                        <div class="flex-column d-flex justify-content-between align-items-center" style="min-height: 100px;">
                          <div class="d-flex justify-content-left align-items-center flex-wrap w-100">
                            <div v-for="tag in tagsArray.tagsVariable" class="tags m-2 p-1" :key="tag">
                              <font-awesome-icon :icon="['fas', 'x']" @click="deleteTag(tag, 'variable')"/>  
                              {{ tag }}
                            </div>
                          </div>
                          <div>
                            <div @click="showToggles('variable')">
                              <font-awesome-icon :icon="['fas', 'plus']" />
                              <span class="iconText">Add</span>
                            </div>
                            <div v-if="showVariables.showAddTagVariable" class="addTagStyle">
                              <div>
                                <div v-for="tag in tagsArray.addTagsVariable" @click="addTag(tag, 'variable')" class="chooseTagStyle font-weight-normal border border-dark m-2 p-1 d-inline-block" :key="tag">
                                  {{ tag }}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="3" class="d-flex justify-content-end align-items-start text-right">Output:</b-col>
                    <b-col cols="9">
                      <div class="tagBox" style="position: relative">
                        <div class="flex-column d-flex justify-content-between align-items-center" style="min-height: 100px;">
                          <div class="d-flex justify-content-left align-items-center flex-wrap w-100">
                            <div v-for="tag in tagsArray.tagsOutput" class="tags m-2 p-1" :key="tag">
                              <font-awesome-icon :icon="['fas', 'x']" @click="deleteTag(tag, 'output')"/>  
                              {{ tag }}
                            </div>
                          </div>
                          <div>
                            <div @click="showToggles('output')">
                              <font-awesome-icon :icon="['fas', 'plus']" />
                              <span class="iconText">Add</span>
                            </div>
                            <div v-if="showVariables.showAddTagOutput" class="addTagStyle">
                              <div>
                                <div v-for="tag in tagsArray.addTagsOutput" @click="addTag(tag, 'output')" class="chooseTagStyle font-weight-normal border border-dark m-2 p-1 d-inline-block" :key="tag">
                                  {{ tag }}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="3" class="d-flex justify-content-end align-items-center text-right">Top Outliers:</b-col>
                    <b-col cols="9">
                      <b-form-select v-model="selectVariables.topOutlier" :options="selectVariables.optionsTopOutlier" size="sm" class="rounded-pill font-weight-bold w-25" style="color: #000000"></b-form-select>
                      <span>: {{ inputVariables.topOutlierRange }}%</span>
                      <b-form-input v-model="inputVariables.topOutlierRange" id="range-topOutlier" variant="danger" type="range" min="60" max="100" step="1"></b-form-input>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="3" class="d-flex justify-content-end align-items-center text-right">Bottom Outliers:</b-col>
                    <b-col cols="9">
                      <b-form-select v-model="selectVariables.bottomOutlier" :options="selectVariables.optionsBottomOutlier" size="sm" class="rounded-pill font-weight-bold w-25" style="color: #000000"></b-form-select>
                      <span>: {{ inputVariables.bottomOutlierRange }}%</span>
                      <b-form-input v-model="inputVariables.bottomOutlierRange" id="range-botOutlier" type="range" min="0" max="40" step="1"></b-form-input>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="3" class="d-flex justify-content-end align-items-center text-right">Time Period: </b-col>
                    <b-col cols="2"><b-form-input v-model="dateStart" id="dateStart" placeholder="MM/DD/YYYY" size="sm" class="rounded-pill"></b-form-input></b-col>
                    <b-col cols="1" class="text-center">-</b-col>
                    <b-col cols="2"><b-form-input v-model="dateStart" id="dateStart" placeholder="MM/DD/YYYY" size="sm" class="rounded-pill"></b-form-input></b-col>
                    <b-col cols="2" class="text-right">Compare to: </b-col>
                    <b-col cols="2"><b-form-select v-model="selectVariables.active" id="active" :options="selectVariables.optionsActive" size="sm" class="rounded-pill font-weight-bold" style="color: #000000"></b-form-select></b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="3" class="d-flex justify-content-end align-items-center text-right">Compare Different Groups: </b-col>
                    <b-col cols="3"><b-form-select v-model="selectVariables.compDiffGroup" id="active" :options="selectVariables.optionsCompDiffGroup" size="sm" class="rounded-pill font-weight-bold" style="color: #000000"></b-form-select></b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="3" class="d-flex justify-content-end align-items-center text-right">Compare Different Variables: </b-col>
                    <b-col cols="9">
                      <div class="tagBox"  style="position: relative">
                        <div class="flex-column d-flex justify-content-between align-items-center" style="min-height: 100px;">
                          <div class="d-flex justify-content-left align-items-center flex-wrap w-100">
                            <div v-for="tag in tagsArray.tagsCompare" class="tags m-2 p-1" :key="tag">
                              <font-awesome-icon :icon="['fas', 'x']" @click="deleteTag(tag, 'compare')"/>  
                              {{ tag }}
                            </div>
                          </div>
                          <div>
                            <div @click="showToggles('compare')">
                              <font-awesome-icon :icon="['fas', 'plus']" />
                              <span class="iconText">Add</span>
                            </div>
                            <div v-if="showVariables.showAddTagCompare" class="addTagStyle">
                              <div>
                                <div v-for="tag in tagsArray.addTagsCompare" @click="addTag(tag, 'compare')" class="chooseTagStyle font-weight-normal border border-dark m-2 p-1 d-inline-block" :key="tag">
                                  {{ tag }}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="3" class="d-flex justify-content-end align-items-center">Closure: </b-col>
                    <b-col cols="3"><b-form-input v-model="dateStart" id="dateStart" placeholder="Video Clip" size="sm" class="rounded-pill"></b-form-input></b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="3" class="d-flex justify-content-end align-items-center text-right">Subjective Scoring: </b-col>
                    <b-col cols="9">
                      <b-container >
                        <b-row>
                          <b-col cols="2" class="pl-0"><b-form-select v-model="selectVariables.subjScoring" id="active" :options="selectVariables.optionsSubjScoring" size="sm" class="rounded-pill font-weight-bold" style="color: #000000"></b-form-select></b-col>
                          <b-col cols="3" class="text-right">Number of Sliders: </b-col>
                          <b-col cols="2"><b-form-select v-model="selectVariables.numberSliders" id="active" :options="selectVariables.optionsNumberSliders" size="sm" class="rounded-pill font-weight-bold" style="color: #000000"></b-form-select></b-col>
                          <b-col cols="3" class="text-right">Score Range: </b-col>
                          <b-col cols="2"><b-form-select v-model="selectVariables.scoreRange" id="active" :options="selectVariables.optionsScoreRange" size="sm" class="rounded-pill font-weight-bold" style="color: #000000"></b-form-select></b-col>
                        </b-row>
                      </b-container>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="3" class="d-flex justify-content-end align-items-center text-right">Colorcoding: </b-col>
                    <b-col cols="2"><b-form-select v-model="selectVariables.colorCoding" id="active" :options="selectVariables.optionscolorCoding" size="sm" class="rounded-pill font-weight-bold w-75 mr-1" style="color: #000000"></b-form-select><font-awesome-icon :icon="['far', 'pen-to-square']" /></b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="8" offset="3" class="text-center pb-0 border border-dark border-top-0 border-left-0 border-right-0">Report Automation</b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="3" class="d-flex justify-content-end align-items-center text-right">Format: </b-col>
                    <b-col cols="2"><b-form-select v-model="selectVariables.format" id="active" :options="selectVariables.optionsFormat" size="sm" class="rounded-pill font-weight-bold w-75" style="color: #000000"></b-form-select></b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="3" class="d-flex justify-content-end align-items-center text-right">Schedule: </b-col>
                    <b-col cols="3"><b-form-select v-model="selectVariables.schedule" id="active" :options="selectVariables.optionsSchdule" size="sm" class="rounded-pill font-weight-bold" style="color: #000000"></b-form-select></b-col>
                    <b-col cols="3" offset="2"><b-form-select v-model="selectVariables.customRecip" id="active" :options="selectVariables.optionscustomRecip" size="sm" class="rounded-pill font-weight-bold" style="color: #000000"></b-form-select></b-col>
                  </b-row>
                </b-container> 
                <div class="text-center">
                  <b-button pill variant="light" class="font-weight-bold border border-dark w-50 m-2"  @click="makeReport">Configure Report</b-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        searchApp: '',
        showVariables: {
          showIntermediary: false,
          showAppsFiltering: false,
          showAddRule: false,
          showAddTagVariable: false,
          showAddTagOutput: false,
          showAddTagCompare: false,
        },
        inputVariables: {
          username: '',
          password: '',
          name: '',
          topOutlierRange: '80',
          bottomOutlierRange: '20',
          0: '',
          1: '',
          2: '',
        },
        dateStart: '',
        dateEnd: '',
        selectVariables: {
          ageRange: null,
          optionsAge: [
            { value: null, text: 'Biological Age Range'},
            { value: 'a', text: 'A'},
            { value: 'b', text: 'B'},
          ],
          active: 'Active',
          optionsActive: [
            { value: 'Active', text: 'Are Active'},
            { value: 'notActive', text: 'Are Not Active'},
          ],
          topOutlier: "Keep",
          optionsTopOutlier: [
            { value: "Keep", text: 'Keep'},
            { value: "Not Keep", text: 'Not Keep'}
          ],
          bottomOutlier: "Keep",
          optionsBottomOutlier: [
            { value: "Keep", text: 'Keep'},
            { value: "Not Keep", text: 'Not Keep'}
          ],
          compDiffGroup: "Age",
          optionsCompDiffGroup: [
            { value: "Age", text: "Age Group" }  
          ],
          subjScoring: "Yes",
          optionsSubjScoring: [
            { value: "Yes", text: "Yes"},
            { value: "No", text: "No"},
          ],
          numberSliders: "2",
          optionsNumberSliders: [
            { value: "2", text: "2"},
          ],
          scoreRange: "0-100",
          optionsScoreRange: [
            { value: "0-100", text: "0-100"}
          ],
          colorCoding: "Yes",
          optionscolorCoding: [
            { value: "Yes", text: "Yes"},
            { value: "No", text: "No"},
          ],
          format: "PDF",
          optionsFormat: [
            { value: "PDF", text: "PDF" }
          ],
          schedule: "Every Week",
          optionsSchdule: [
            { value: "Every Week", text: "Every Week" }
          ],
          customRecip: "Custom Recipients",
          optionscustomRecip: [
            { value: "Custom Recipients", text: "Custom Recipients"}
          ]
        },
        tagsArray: {
          ruleSelect: [
          ],
          addRuleSelect: [
          "Age", "Gender", "Ethnicity", "Disibility Status", "Location", "Worst Categories"
          ],  
          tagsVariable: [  
          ],
          addTagsVariable: [
            "Number of Users", "Attempts", "Score", "Media", "Repeats", "Hints"
          ],
          tagsOutput: [
          ],
          addTagsOutput: [
            "Median", "Mean", "Mode", "Range", "Standard Deviation", "Percentile", "Variance",
            "Quartiles", "Cofidence Interval"
          ],
          tagsCompare: [
          ],
          addTagsCompare: [
            "comparetag1", "comparetag2"
          ],
        },
      }
    },
    computed: {
      displayWebsite() {
        return this.$store.getters.isLoggedIn;
      },
    },
    methods: {
      addRule(rule) {
        if (this.tagsArray.ruleSelect.find(element => element === rule) == undefined) {
          this.tagsArray.ruleSelect.push(rule);
          this.$set(this.inputVariables, rule, '');
        }
      },
      deleteRule(rule) {
        function delElement(array) {
          let filtered = array.filter(value => { 
              return value != rule;
          });
          return filtered;
        }

        this.tagsArray.ruleSelect = delElement(this.tagsArray.ruleSelect);
      },
      addTag(tag, location) {
        if (location == "variable") {
          if (this.tagsArray.tagsVariable.find(element => element === tag) == undefined) {
            this.tagsArray.tagsVariable.push(tag);
          }
        }
        else if (location == "output") {
          if (this.tagsArray.tagsOutput.find(element => element === tag) == undefined) {
            this.tagsArray.tagsOutput.push(tag);
          }
        }
        else if (location == "compare") {
          if (this.tagsArray.tagsCompare.find(element => element === tag) == undefined) {
            this.tagsArray.tagsCompare.push(tag);
          }
        }
      },
      deleteTag(tag, location) {
        function delElement(array) {
          let filtered = array.filter(value => { 
              return value != tag;
          });
          return filtered;
        }

        if (location == "variable") {
          this.tagsArray.tagsVariable = delElement(this.tagsArray.tagsVariable);
        }
        else if (location == "output") {
          this.tagsArray.tagsOutput = delElement(this.tagsArray.tagsOutput);
        }
        else if (location == "compare") {
          this.tagsArray.tagsCompare = delElement(this.tagsArray.tagsCompare);
        }
      },
      showToggles(name) {
        if (name == "intermediary") {
          this.showVariables.showIntermediary = !this.showVariables.showIntermediary;
        }
        else if (name == "variable") {
          this.showVariables.showAddTagVariable = !this.showVariables.showAddTagVariable;
        }
        else if (name == "output") {
          this.showVariables.showAddTagOutput = !this.showVariables.showAddTagOutput;
        }
        else if (name == "compare") {
          this.showVariables.showAddTagCompare = !this.showVariables.showAddTagCompare;
        }
        else if (name == "rule") {
          this.showVariables.showAddRule = !this.showVariables.showAddRule;
        }
      },
      goDashboard() {
        this.$router.push("/adminDashboard");
      },
      makeReport() {

        const additionalPath = "test";
        let currentPath = this.$router.currentRoute.path;

        if (currentPath.endsWith("/")) {
          currentPath = currentPath.slice(0, -1);
        }

        const newUrl = currentPath + '/' + additionalPath;
        window.open(newUrl, '_blank');
      }
    }
  }
</script>

<style lang="scss">
  @use 'sharedSCSS/globalSharedVariables';

  .btn-orangeLight {
    background-color: #eba958 !important;
  }

  #container {
    font-family: "Lucida Console";
    font-weight: 700;
    color: #000000;
  }

  //login page
  #innerBox {
    height: 70vh;
    width: 70vw;
    background-color: globalSharedVariables.$orange;
    border-radius: 35px;
  }

  .forgotText {
    font-size: .7em;
    opacity: .8;
  }

  //report statistics
  #reportAppBox {
    height: 80vh;
    flex: 3;
    background-color: globalSharedVariables.$orange;
    border-radius: 20px;
  }

  #applicationsBox {
    flex: 1;
    height: 80vh;
  }

  #reportTitle {
    border: solid 1.8px #000000;
    border-radius: 10px;
    background-color: #F4A127;
  }

  #searchApp:focus {
    box-shadow: none;
  }

  #searchApp::placeholder, #name::placeholder,
  #dateStart::placeholder, #dateEnd::placeholder {
    font-weight: 700;
    color: #000000;
  }

  #ageRange::placeholder {
    color: blue;
  }

  .iconText {
    font-size: .9rem;
    cursor: default;
  }

  .tagBox {
    background-color: white;
    min-height: 100px;
  }

  .tags {
    background-color: globalSharedVariables.$orange;
    font-size: small;
    font-weight: 400;
  }

  .addTagStyle {
    position: absolute;
    width: 100%;
    left: 0;
    background-color: rgb(240, 240, 240);
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    font-size: .9em;
    min-height: 100px;
  }

  .chooseRuleStyle,
  .chooseTagStyle {
    background-color: globalSharedVariables.$orange;
  }

  .chooseRuleStyle:hover,
  .chooseTagStyle:hover {
    opacity: .7;
  }

  .addRuleStyle {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    background-color: rgb(240, 240, 240);
    z-index: 5;
    min-height: 100px;
    width: 150%;
    left: 0;
  }

  #range-topOutlier::-webkit-slider-thumb, 
  #range-botOutlier::-webkit-slider-thumb {
    background-color: #bb7103;
  }

  #range-topOutlier::-webkit-slider-thumb:active,
  #range-botOutlier::-webkit-slider-thumb:active {
    background-color: #bb7103;
  }

  //intermediary page
  .intermediaryChoicesBox {
    width: 40vw;
    height: 70vh;
    background-color: globalSharedVariables.$orange;
    border-radius: 35px;
    font-size: 2.5em;
    text-align: center;
    color: #000000;
  }

  .intermediaryChoicesBox:hover {
    box-shadow: 2px 5px 5px darkgrey;
    opacity: .8;
  }

  //scrollbar
  #informationScroll::-webkit-scrollbar {
    width: 17px;
    border: 1px solid #8A8A8A;
  }

  #informationScroll::-webkit-scrollbar-track {
    background: #D0BC9D;
    border: 1px solid #8A8A8A;
  }

  #informationScroll::-webkit-scrollbar-thumb {
    background-color: #C4C4C4;
    border-radius: 0px;
    border: 1px solid #797979;
  }
</style>