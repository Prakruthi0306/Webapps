<template>
	<div id="container">
    <div v-if="!showRegVariables.preview">
      <nav id="sideBar-box">
        <div class="d-flex flex-column justify-content-center align-items-center w-100">
          <img class="logo" src="../images/neuroleap_logo_transparent.png" />
          <div class="w-100">
            <div :class="['navText', 'p-3', {'navClick': showNavVariables.toggleNavSelect == 'showInitInfo'}]" @click="toggleAllNavShows('showInitInfo')">
              <font-awesome-icon :icon="['fas', 'user']" />
              <span>Initial Information</span>
            </div>
            <div :class="['navText', 'p-3', {'navClick': showNavVariables.toggleNavSelect == 'showTestScore'}]" @click="toggleAllNavShows('showTestScore')">
              <font-awesome-icon :icon="['fas', 'gauge-simple-high']" />
              <span>Test Score</span>
            </div>
            <div :class="['navText', 'p-3', {'navClick': showNavVariables.toggleNavSelect == 'showAttention'}]" @click="toggleAllNavShows('showAttention')">
              <font-awesome-icon :icon="['fas', 'face-smile']" />
              <span>Attention & Emotion</span>
            </div>
            <div :class="['navText', 'p-3', {'navClick': showNavVariables.toggleNavSelect == 'showGraphs'}]" @click="toggleAllNavShows('showGraphs')">
              <font-awesome-icon :icon="['fas', 'chart-line']" />
              <span>Graph & Plots</span>
            </div>
            <div :class="['navText', 'p-3', {'navClick': showNavVariables.toggleNavSelect == 'showSummary'}]" @click="toggleAllNavShows('showSummary')">
              <font-awesome-icon :icon="['fas', 'clipboard']" />
              <span>Summary & Recommendations</span>
            </div>
            <div :class="['navText', 'p-3', {'navClick': showNavVariables.toggleNavSelect == 'showRootCause'}]" @click="toggleAllNavShows('showRootCause')">
              <font-awesome-icon :icon="['fas', 'microscope']" />
              <span>Root Cause Analysis</span>
            </div>
            <div :class="['navText', 'p-3', {'navClick': showNavVariables.toggleNavSelect == 'showConfig'}]" @click="toggleAllNavShows('showConfig')">
              <font-awesome-icon :icon="['fas', 'bars-staggered']" />
              <span>Configure Menu</span>
            </div>
          </div>
        </div>
        <div class="d-flex flex-column justify-content-around align-items-center w-100">
          <button @click="showPreview()" class="orange-button">Preview</button>
          <button @click="showPreview()" class="orange-button">Generate</button>
        </div>
      </nav>
      <section id="main-box">
        <div v-if="showNavVariables.showInitInfo">
          <div>
            <h2 class="font-weight-bold" style="display: inline-block;">Initial Information</h2>
            <h4 style="display: inline-block;"><font-awesome-icon id="configRepOrderInfoIcon" :icon="['fas', 'circle-info']" style="color: #FF9B00"/></h4>
            <b-tooltip target="configRepOrderInfoIcon" triggers="hover">
              Order the Report
            </b-tooltip>
          </div>
          <h4>
            [First Name] ([preferred Name]) [Last Name]
          </h4>
          <b-container class="bv-example-row">
            <b-row>
              <b-col class="pl-0">
                School/Clinic/Hosptial Name:
                <div class="initInfo-infoPill rounded-pill d-flex justify-content-start align-items-center font-weight-normal pl-2 pr-2 w-75">
                  Tempora High School
                </div>
              </b-col>
              <b-col>
                Parent/Guardian 1 Name:
                <div class="initInfo-infoPill rounded-pill d-flex justify-content-start align-items-center font-weight-normal pl-2 pr-2 w-75">
                  Joshua Kim
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col class="pl-0">
                City & State:
                <div class="initInfo-infoPill rounded-pill d-flex justify-content-start align-items-center font-weight-normal pl-2 pr-2  w-75">
                  La Jolla, CA
                </div>
              </b-col>
              <b-col>
                Parent/Guardian 2 Name:
                <div class="initInfo-infoPill rounded-pill d-flex justify-content-start align-items-center font-weight-normal pl-2 pr-2  w-75">
                  Kaley Kim
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col class="pl-0">
                School Grade:
                <div class="initInfo-infoPill rounded-pill d-flex justify-content-start align-items-center font-weight-normal pl-2 pr-2  w-75">
                  5th
                </div>
              </b-col>
              <b-col>
                Med # / Student ID:
                <div class="initInfo-infoPill rounded-pill d-flex justify-content-start align-items-center font-weight-normal pl-2 pr-2  w-75">
                  8956751
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col class="pl-0">
                Date of Birth:
                <div class="initInfo-infoPill rounded-pill d-flex justify-content-start align-items-center font-weight-normal pl-2 pr-2  w-75">
                  02/05/2007
                </div>
              </b-col>
              <b-col>
                Admin / Case Manager:
                <div class="initInfo-infoPill rounded-pill d-flex justify-content-start align-items-center font-weight-normal pl-2 pr-2  w-75">
                  Eliot Mane
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col class="pl-0">
                Cognitive Age:
                <div class="initInfo-infoPill rounded-pill d-flex justify-content-start align-items-center font-weight-normal pl-2 pr-2  w-75">
                  10
                </div>
              </b-col>
              <b-col>
                Custom ID:
                <div class="initInfo-infoPill rounded-pill d-flex justify-content-start align-items-center font-weight-normal pl-2 pr-2  w-75">
                  579834
                </div>
              </b-col>
            </b-row>
          </b-container>
          <div>
            Test Score
            <div style="color: #8F9294; font-size: .7em;">
              Up-to-Date Overview of Results. <br /> This Chart will Apppear in the Final Report.
            </div>
          </div>
          <div class="displayCard flex-column justify-content-between align-items-center p-3 m-3" style="width: 500px">
            <div class="d-flex flex-column justify-content-center align-items-center text-center" >
              Total score
              <div class="d-flex">
                <TotalScoreCircle />
                <div style="display: grid; grid-template-columns: 15px 100px 50px; font-size: 1em; font-weight: 400; align-items: center;" class="ml-4">
                  <div style="background-color: #427733;width: 10px; height: 10px"></div>
                  <div>Correct:</div>
                  <div>71/100</div>
                  <div style="background-color: #F29233;width: 10px; height: 10px "></div>
                  <div>Incorrect:</div>
                  <div>22</div>
                  <div style="background-color: #575B59;width: 10px; height: 10px"></div>
                  <div>Skipped:</div>
                  <div>7</div>
                </div>
              </div>
              Needs Improvement
            </div>
          </div>
          <div class="displayCard flex-column justify-content-between align-items-center p-3 m-3">
            Top Category Skipped
            <div style="background-color: lightgrey; border-radius: .25rem; padding: 5px;" class="text-center w-75">category skipped</div>
            Category Amount Skipped
            <div style="background-color: lightgrey; border-radius: .25rem; padding: 5px;" class="text-center w-75">Category Amount Skipped</div>
          </div>
          <div class="displayCard flex-column justify-content-between align-items-center p-3 m-3">
            Strongest Category
            <div style="background-color: #427733; border-radius: .25rem; padding: 5px;" class="text-center w-75">Strongest</div>
            Weakest Category
            <div style="background-color: #F29233; border-radius: .25rem; padding: 5px;" class="text-center w-75">Weakest</div>
          </div>
          <div>
            <div class="d-flex justify-content-between mt-5">
              <div>Subjective Scoring</div>
              <b-form-checkbox v-model="keyToFactor.subScore.optsOut" true-value="true" false-value="false">
                Opt-Out
              </b-form-checkbox>
            </div>
            <div class="displayCard flex-column w-100 p-2">
              <div class="text-right m-2">
                <b-button variant="light" size="md" class="font-weight-bold border border-dark rounded" style="background-color: #FF9B00;" @click="toggleShowRegVariables('modifySubjScore')">{{ !showRegVariables.modifySubjScore ? 'Modify Score' : 'Close' }}</b-button>
              </div>
              <div v-if="!showRegVariables.modifySubjScore" class="d-flex flex-column justify-content-around align-items-center">
                <div class="d-flex justify-content-around align-items-center w-100">
                  <div class="d-flex flex-column justify-content-center align-items-center">
                    <div>
                      Comprehension
                      <font-awesome-icon id="comprehInfoIcon" :icon="['fas', 'circle-info']" />
                      <b-tooltip target="comprehInfoIcon" triggers="hover">
                        listener's perception of how difficult it is to understand
                      </b-tooltip>
                    </div>
                    <div style="border-radius: 50%;background-color: #FFD449;width: 100px;height: 100px;" class="d-flex justify-content-center align-items-center">
                      {{ keyToFactor.subScore.list.compreh.variable == 'N/A' ? 'N/A' : `${keyToFactor.subScore.list.compreh.variable}/10` }}
                    </div>
                  </div>
                  <div class="d-flex flex-column justify-content-center align-items-center">
                    <div>
                      Problem Solving
                      <font-awesome-icon id="probSolvInfoIcon" :icon="['fas', 'circle-info']" />
                      <b-tooltip target="probSolvInfoIcon" triggers="hover">
                        solving ability
                      </b-tooltip>
                    </div>
                    <div style="border-radius: 50%;background-color: #F87B7B;width: 100px;height: 100px;" class="d-flex justify-content-center align-items-center">
                      {{ keyToFactor.subScore.list.probSolv.variable == 'N/A' ? 'N/A' : `${keyToFactor.subScore.list.probSolv.variable}/10` }}
                    </div>
                  </div>
                  <div class="d-flex flex-column justify-content-center align-items-center">
                    <div>
                      Intelligibility
                      <font-awesome-icon id="intelInfoIcon" :icon="['fas', 'circle-info']" />
                      <b-tooltip target="intelInfoIcon" triggers="hover">
                        extent to which a listner actually understands
                      </b-tooltip>
                    </div>
                    <div style="border-radius: 50%;background-color: #B6E2A1;width: 100px;height: 100px;" class="d-flex justify-content-center align-items-center">
                      {{ keyToFactor.subScore.list.intell.variable == 'N/A' ? 'N/A' : `${keyToFactor.subScore.list.intell.variable}/10` }}
                    </div>
                  </div>
                </div>
                <div class="mt-5">
                  Auto Populations
                  <div style="font-weight: 400">
                    A
                    <span class="font-weight-bold">{{ keyToFactor.subScore.dropDownMood.selectedValue }}</span> 
                    &nbsp;
                    <span class="font-weight-bold">{{ preferredName }}</span> in
                    <span class="font-weight-bold">{{ keyToFactor.subScore.dropDownShirtColor.selectedValue }}</span> 
                    shirt was seen for evaluation of 
                    <span class="font-weight-bold">{{ appSubtitle }}</span>.
                    <span class="font-weight-bold">{{ includeCateg }}</span>
                    type questions were included in the screening.
                  </div>
                </div>
              </div>
              <div v-else class="rounded pb-5 pl-3 pr-3">
                <h3 class="font-weight-normal m-3">
                  Compared to other children this age, how would you rate this child for below categories? 
                </h3>
                <div class="font-weight-normal mb-4">
                  Please move the slider button right or left on a 10-graded scale to rate the child's overall development based on your own experience and understanding.
                </div>
                <div>
                  <div class="d-flex justify-content-between">
                    Comprehension
                    <b-form-checkbox v-model="keyToFactor.subScore.list.compreh.optsOut" true-value="true" false-value="false">
                      Opt-Out
                    </b-form-checkbox>
                  </div>
                  <div class="d-flex justify-content-center">
                    <vue-slider v-model="keyToFactor.subScore.list.compreh.variable" :data="sliders.data" :marks='true' :process="sliders.process"
                      :dotStyle="{background: '#FF9B00', border: '2px solid #FF9B00'}" :included="true" style="width: 95%">
                      <template v-slot:step="{ label, sliderActive }">
                        <div :class="['custom-slider-step', { sliderActive }]"></div>
                      </template>
                    </vue-slider>
                  </div>
                </div>
                <div class="mt-5">
                  <div class="d-flex justify-content-between">
                    Problem Solving
                    <b-form-checkbox v-model="keyToFactor.subScore.list.probSolv.optsOut" true-value="true" false-value="false">
                      Opt-Out
                    </b-form-checkbox>
                  </div>
                  <div class="d-flex justify-content-center">
                    <vue-slider v-model="keyToFactor.subScore.list.probSolv.variable" :data="sliders.data" :marks='true' :process="sliders.process" 
                      :dotStyle="{background: '#FF9B00', border: '2px solid #FF9B00'}" :included="true" style="width: 95%">
                      <template v-slot:step="{ label, sliderActive }">
                        <div :class="['custom-slider-step', { sliderActive }]"></div>
                      </template>\
                    </vue-slider>
                  </div>
                </div>
                <div class="mt-5 mb-5">
                  <div class="d-flex justify-content-between">
                    Intelligibility
                    <b-form-checkbox v-model="keyToFactor.subScore.list.intell.optsOut" true-value="true" false-value="false">
                      Opt-Out
                    </b-form-checkbox>
                  </div>
                  <div class="d-flex justify-content-center">
                    <vue-slider v-model="keyToFactor.subScore.list.intell.variable" :data="sliders.data" :marks='true' :process="sliders.process" 
                      :dotStyle="{background: '#FF9B00', border: '2px solid #FF9B00'}" :included="true" style="width: 95%">
                    <template v-slot:step="{ label, sliderActive }">
                        <div :class="['custom-slider-step', { sliderActive }]"></div>
                      </template>
                    </vue-slider>
                  </div>
                </div>
                <div style="font-weight: 400">
                  A
                  <div class="custom-dropdown w-25 m-1">
                    <div class="selected-option d-flex justify-content-between align-items-center" @click="toggleGeneralDropDowns('mood')">
                      {{ keyToFactor.subScore.dropDownMood.selectedValue }}
                      <font-awesome-icon :icon="['fas', 'angle-down']" />
                    </div>
                    <ul v-show="keyToFactor.subScore.dropDownMood.isDropdownOpen" class='p-0 w-100'>
                      <li v-for="option in keyToFactor.subScore.dropDownMood.options" :key="option" @click="selectOptionGeneral(option, 'mood')">
                        <span :style="option == keyToFactor.subScore.dropDownMood.selectedValue ? 'visibility: visible' : 'visibility: hidden;'">
                          <font-awesome-icon :icon="['fas', 'check']" />
                        </span>
                        {{ option }}
                      </li>
                    </ul>
                  </div>
                  <span class="font-weight-bold">{{ preferredName }}</span> in 
                  <div class="custom-dropdown w-25 m-1">
                    <div class="selected-option d-flex justify-content-between align-items-center" @click="toggleGeneralDropDowns('shirtColor')">
                      {{ keyToFactor.subScore.dropDownShirtColor.selectedValue }}
                      <font-awesome-icon :icon="['fas', 'angle-down']" />
                    </div>
                    <ul v-show="keyToFactor.subScore.dropDownShirtColor.isDropdownOpen" class='p-0 w-100'>
                      <li v-for="option in keyToFactor.subScore.dropDownShirtColor.options" :key="option" @click="selectOptionGeneral(option, 'shirtColor')">
                        <span :style="option == keyToFactor.subScore.dropDownShirtColor.selectedValue ? 'visibility: visible' : 'visibility: hidden;'">
                          <font-awesome-icon :icon="['fas', 'check']" />
                        </span>
                        {{ option }}
                      </li>
                    </ul>
                  </div>
                  shirt was seen for evaluation of 
                  <span class="font-weight-bold">{{ appSubtitle }}</span>.
                  <span class="font-weight-bold">{{ includeCateg }}</span>
                  type questions were included in the screening.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="showNavVariables.showConfig">
          <div>
            <h2 class="font-weight-bold" style="display: inline-block;">Configure Order</h2>
            <h4 style="display: inline-block;"><font-awesome-icon id="configRepOrderInfoIcon" :icon="['fas', 'circle-info']" style="color: #FF9B00"/></h4>
            <b-tooltip target="configRepOrderInfoIcon" triggers="hover">
              Order the Report
            </b-tooltip>
          </div>
          <div class="font-weight-normal mt-3">
            The following items will appear in the report. <br> You may drag items to customize the order of items to display.
          </div>
          <div class="mt-1">
            <div style="font-size: small" class="text-right mr-3">
              Opt-Out 
            </div>
            <draggable v-model="list" v-bind="dragOptions" handle=".handle">
              <div v-for="(item, index) in list" :key="index" class="handle p-1">
                <div class="drag-item">
                  <div class="d-flex align-items-center" :class="[keyToFactor[item.ref].optsOut?'drag-item-deactivated':null]">=</div>
                  <div class="d-flex align-items-center" :style="index % 2 != 0 ? 'color: #5A5A5A' : ''" :class="[keyToFactor[item.ref].optsOut?'drag-item-deactivated':null]">{{ item.label }}</div>
                  <b-form-checkbox v-model="keyToFactor[item.ref].optsOut" true-value="true" false-value="false"></b-form-checkbox>
                </div>
              </div>
            </draggable>
          </div>
        </div>
        <div v-else-if="showNavVariables.showTestScore">
          <div v-if="showRegVariables.basicInfo">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h2 class="font-weight-bold" style="display: inline-block;">Basic Info</h2>
                <h4 style="display: inline-block;"><font-awesome-icon id="basicInfoIcon" :icon="['fas', 'circle-info']" style="color: #FF9B00"/></h4>
                <b-tooltip target="basicInfoIcon" triggers="hover">
                  Patient's General Information
                </b-tooltip>
              </div>
              <b-button variant="light" size="md" class="font-weight-bold border border-dark rounded" style="background-color: #FF9B00;" @click="toggleShowRegVariables('basicInfo')">Go Back</b-button>
            </div>
            <div class="d-flex justify-content-around">
              <div class="flex-grow-1">
                <div>
                  Name
                </div>
                <b-container class="bv-example-row">
                  <b-row>
                    <b-col class="pl-0">School/Clinic/Hosptial Name:</b-col>
                    <b-col>Parent/Guardian:</b-col>
                  </b-row>
                  <b-row>
                    <b-col class="pl-0">Location:</b-col>
                    <b-col>Med #/Student ID:</b-col>
                  </b-row>
                  <b-row>
                    <b-col class="pl-0">Date of Bith:</b-col>
                    <b-col>Admin/Case Manager:</b-col>
                  </b-row>
                  <b-row>
                    <b-col class="pl-0">Cognitive Age:</b-col>
                    <b-col>Custom ID:</b-col>
                  </b-row>
                </b-container>
                <div class="textBox1 p-3 mt-5">
                  History/Background Information
                </div>
                <div class="textBox1 p-3 mt-5">
                  Reason for Referral
                </div>
                <div class="mt-5">
                  Previous External Test
                  <table class="w-100">
                    <tr class="tableHeader">
                      <th style="width: 20%">Name</th>
                      <th style="width: 20%">Score</th>
                      <th style="width: 20%">Date</th>
                      <th style="width: 20%"> PDF Report</th>
                    </tr>
                    <tr v-for="(value,index) in griddings.prevExtTest" :key="value.name">
                      <td class="tableElements">{{ value.name }}</td>
                      <td class="tableElements">{{ value.score }}</td>
                      <td class="tableElements">{{ value.date }}</td>
                      <td class="tableElements" style="position: relative;">
                        <div v-for="(file, index) in value.files" :key="index">
                          <a :href="createObjectURL(file)" target="_blank">{{ file.name }}</a>
                        </div>
                        <div v-if="showRegVariables.prevExtTestAdd" style="position: absolute; top: 0; left: 100%" class="d-flex justify-content-center align-items-center ml-1 h-100">
                          <font-awesome-icon :icon="['fas', 'x']" @click="prevExtTestRemoveItem(index)"/>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="showRegVariables.prevExtTestAdd" id="prevExtTest-add">
                      <td class="tableElements-add"><input v-model="griddings.prevExtTestName" type="text" placeholder="Enter Name" class="w-100"/></td>
                      <td class="tableElements-add"><input v-model="griddings.prevExtTestScore" type="number" placeholder="Enter Score" class="w-100"/></td>
                      <td class="tableElements-add"><input v-model="griddings.prevExtTestDate" type="date" placeholder="Enter Date" class="w-100"/></td>
                      <td class="tableElements-add " >
                        <label for="prevExtTest-file" style="margin-bottom: 0">
                          <font-awesome-icon :icon="['far', 'file-pdf']" />
                          Add PDF
                        </label>
                        <input id="prevExtTest-file" @change="addFile" type="file">
                        <div v-for="(file,index) in this.griddings.prevExtTestFiles" :key="index" class="d-flex justify-content-between align-items-center pl-1 pr-1 w-100">
                          <a :href="createObjectURL(file)" target="_blank">{{ file.name }}</a>
                          <font-awesome-icon :icon="['fas', 'x']" @click="removeFile(index)"/>
                        </div>
                      </td>
                    </tr>
                  </table>
                  <div class="d-flex justify-content-between">
                    <span @click="toggleShowRegVariables('prevExtTestAdd')" class="tableElements-button p-1">{{ showRegVariables.prevExtTestAdd ? 'Close' : 'Add External Test' }}</span>
                    <span @click="prevExtTestAddItem()" :class="['tableElements-button', showRegVariables.prevExtTestAdd ? 'p-1' : null]">{{ showRegVariables.prevExtTestAdd ? 'Add' : '' }}</span>
                  </div>
                </div>
                <div class="mt-5">
                  Previous Internal Test
                  <table class="w-100">
                    <tr class="tableHeader">
                      <th>Name</th>
                      <th>Score</th>
                      <th>Date</th>
                      <th>PDF Report</th>
                    </tr>
                    <tr v-for="value in griddings.gridPrevIntTest" :key="value.name">
                      <td class="tableElements">{{ value.name }}</td>
                      <td class="tableElements">{{ value.score }}</td>
                      <td class="tableElements">{{ value.date }}</td>
                      <td class="tableElements">
                        <div v-for="(file, index) in value.file" :key="index">
                          {{ file }}
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
              <div class="m-4">
                <modal name="editProf" :adaptive="true" :clickToClose="false" width="30%" height="auto">
                  <div class="d-flex flex-column align-items-center">
                    <div class="text-center">Profile Picture</div>
                    <b-avatar :src="profilePicTemp" id="editProfilePict" size="10rem"></b-avatar>
                    <input id="editProfFile" type="file" style="display: none" @change="changeProfPic($event)" accept="image/*"/>
                    <label for="editProfFile"><font-awesome-icon :icon="['far', 'pen-to-square']" /> Edit</label>
                    <div class="d-flex justify-content-around w-100">
                      <button @click="saveProfPic" class="simpleBackground rounded p-1 pl-5 pr-5 m-1">Save</button>
                      <button @click="closeModal('editProf')" class="simpleBackground rounded p-1 pl-5 pr-5 m-1">Close</button>
                    </div>
                  </div>
                </modal>
                <div class="d-flex justify-content-center align-items-center">
                  <b-avatar size="9em" :src="profilePic" style="background-color: #eecc9a;color: black;"></b-avatar>
                </div>
                <button @click="openModal('editProf')" class="w-100">
                  Edit Profile
                </button>
                <div class="infoBox w-100 p-3 mt-5">
                  <div>Accomodations</div>
                  <div v-for="item in listings.accomondations" :key="item" class="d-flex justify-content-center align-items-center rounded m-1 p-1" style="background-color: #D9D9D9; font-size: .7em;">
                    {{ item }}
                  </div>
                </div>
                <div class="infoBox w-100 p-3 mt-5">
                  <div>Specialists</div>
                  <div v-for="item in listings.specialists" :key="item.name" class="d-flex justify-content-around align-items-center rounded m-1 p-1" style="background-color: #D9D9D9; font-size: .7em;">
                    <b-avatar variant="primary" text="JD"></b-avatar>
                    <div>
                      <div>{{ item.name }}</div>
                      <div>{{ item.role }}</div>
                    </div>
                  </div>
                </div>
                <div class="infoBox w-100 p-3 mt-5">
                  <div>Admin/Case Manager</div>
                  <div v-for="item in listings.admin" :key="item" class="d-flex justify-content-center align-items-center rounded m-1 p-1" style="background-color: #D9D9D9; font-size: .7em;">
                    {{ item }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else>
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h2 class="font-weight-bold" style="display: inline-block;">Test Scores</h2>
                <h4 style="display: inline-block;"><font-awesome-icon id="testScoreInfoIcon" :icon="['fas', 'circle-info']" style="color: #FF9B00"/></h4>
                <b-tooltip target="testScoreInfoIcon" triggers="hover">
                  Patient's Scores
                </b-tooltip>
              </div>
              <b-button variant="light" size="md" class="font-weight-bold border border-dark rounded" style="background-color: #FF9B00;" @click="toggleShowRegVariables('basicInfo')">Basic Info</b-button>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <div class="round-search rounded-pill d-flex justify-content-around align-items-center">
                <input type="text" placeholder="Search" class="p-1" style="width: 70%;">
                <font-awesome-icon :icon="['fas', 'magnifying-glass']" size="sm"/>
              </div>
              <div>
                <div id="leftPill" :class="[showRegVariables.testScoreDefault ? 'selectedPillHalf':null, 'left-half', 'half-pill']" @click="selectPill('left')">Default</div>
                <div id="rightPill" :class="[!showRegVariables.testScoreDefault ? 'selectedPillHalf':null, 'right-half', 'half-pill']" @click="selectPill('right')">A category at a time</div>
              </div>
            </div>

            <div v-if="showRegVariables.testScoreDefault">
              <div class="d-flex justify-content-between align-items-center mt-5">
                <div>Details</div>
                <div class="d-flex flex-nowrap">
                  <span class="d-flex flex-column justify-content-center align-items-center m-2" style="font-size: small;"><font-awesome-icon :icon="['fas', 'cloud-arrow-down']" /> Download</span>
                  <span class="d-flex flex-column justify-content-center align-items-center m-2" style="font-size: small;"><font-awesome-icon :icon="['fas', 'cloud-arrow-up']" /> Upload</span>
                </div>
              </div>
              <div style="max-height: 400px; width: 100%; overflow: auto">
                <table class="w-100">
                  <tr class="tableHeader">
                    <th>ID</th>
                    <th>Media</th>
                    <th>Question</th>
                    <th>P/R</th>
                    <th>Category</th>
                    <th>Note</th>
                    <th>Selected Answer</th>
                    <th>EEG</th>
                    <th>ECG</th>
                    <th>EMG</th>
                    <th>MotSensL</th>
                    <th>MotSensR</th>
                  </tr>
                  <tr v-for="value in griddings.gridElemDefault" :key="value.id">
                    <td class="tableElements">{{ value.id }}</td>
                    <td class="tableElements">
                      <div class="d-flex">
                        <font-awesome-icon :icon="['fas', 'video']" @click="openModelMedia(value, 'video')" class="m-1"/>
                        <font-awesome-icon :icon="['fas', 'headphones']" @click="openModelMedia(value, 'audio')" class="m-1"/>
                        <font-awesome-icon :icon="['fas', 'camera']" @click="openModelMedia(value, 'photo')" class="m-1"/>
                      </div>
                    </td>
                    <td class="tableElements">{{ value.question }}</td>
                    <td class="tableElements">{{ value.pr }}</td>
                    <td class="tableElements">{{ value.category }}</td>
                    <td class="tableElements">{{ value.note }}</td>
                    <td class="tableElements">{{ value.answer }}</td>
                    <td class="tableElements">{{ value.eeg }}</td>
                    <td class="tableElements">{{ value.ecg }}</td>
                    <td class="tableElements">{{ value.emg }}</td>
                    <td class="tableElements">{{ value.motSensL }}</td>
                    <td class="tableElements">{{ value.motSensR }}</td>
                  </tr>
                </table>
              </div>
              <div class="mt-5">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    Observer Comments
                    <font-awesome-icon id="obserCommentsInfoIcon" :icon="['fas', 'circle-info']"/>
                    <b-tooltip target="obserCommentsInfoIcon" triggers="hover">
                      Overall Test Comments
                    </b-tooltip>
                  </div>
                  <b-form-checkbox v-model="keyToFactor.obserComments.optsOut" true-value="true" false-value="false">
                    Opt-out
                  </b-form-checkbox>
                </div>
                <div>
                  <QuillEditor v-model="keyToFactor.obserComments.variable" />
                </div>
              </div>
            </div>
            <div v-else>
              <div class="gridParent-categ">
                <div>
                  <div class="d-flex justify-content-center align-items-center">Observation Comments</div>
                  <div id="quill-categComment">
                      <QuillEditor v-model="keyToFactor.categComments.list[`categComment` + `${griddings.elemCategIndex}`].variable" :forceSet="griddings.elemCategIndex"/>
                  </div>
                </div>
                <div style="padding: 0 1rem;">
                  <div class="d-flex justify-content-between align-items-center">
                  <div>Scores</div>
                    <div class="d-flex flex-nowrap">
                      <span class="d-flex flex-column justify-content-center align-items-center m-2" style="font-size: small;"><font-awesome-icon :icon="['fas', 'cloud-arrow-down']" /> Download</span>
                      <span class="d-flex flex-column justify-content-center align-items-center m-2" style="font-size: small;"><font-awesome-icon :icon="['fas', 'cloud-arrow-up']" /> Upload</span>
                    </div>
                  </div>
                  <div>
                    <table class="w-100 mb-5">
                      <tr class="tableHeader">
                        <th>Raw Score</th>
                        <th>Percentile</th>
                        <th>Scaled Score</th>
                        <th>Rating</th>
                      </tr>
                      <tr>
                        <td class="tableElements">1234</td>
                        <td class="tableElements">0</td>
                        <td class="tableElements">0</td>
                        <td class="tableElements">0</td>
                      </tr>
                    </table>
                  </div>
                  <div style="width: 100%; height: 50vh; overflow: auto;">
                    <table>
                      <tr class="tableHeader">
                        <th>ID</th>
                        <th>Media</th>
                        <th>Question/Task</th>
                        <th>P/R</th>
                        <th>Note</th>
                        <th>Score</th>
                        <th>EEG</th>
                        <th>ECG</th>
                        <th>EMG</th>
                        <th>MotSensL</th>
                        <th>MotSensR</th>
                      </tr>
                      <tr v-for="value in griddings.gridElemCateg[griddings.elemCategIndex]" :key="value.id">
                        <td class="tableElements">{{ value.id }}</td>
                        <td class="tableElements">
                          <div class="d-flex">
                            <font-awesome-icon :icon="['fas', 'video']" @click="openModelMedia(value, 'video')" class="m-1"/>
                            <font-awesome-icon :icon="['fas', 'headphones']" @click="openModelMedia(value, 'audio')" class="m-1"/>
                            <font-awesome-icon :icon="['fas', 'camera']" @click="openModelMedia(value, 'photo')" class="m-1"/>
                          </div>
                        </td>
                        <td class="tableElements">{{ value.question }}</td>
                        <td class="tableElements">{{ value.pr }}</td>
                        <td class="tableElements">{{ value.note }}</td>
                        <td class="tableElements">{{ value.score }}</td>
                        <td class="tableElements">{{ value.eeg }}</td>
                        <td class="tableElements">{{ value.ecg }}</td>
                        <td class="tableElements">{{ value.emg }}</td>
                        <td class="tableElements">{{ value.motSensL }}</td>
                        <td class="tableElements">{{ value.motSensR }}</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
              <b-form-checkbox v-model="keyToFactor.categComments.list[`categComment` + `${griddings.elemCategIndex}`].optsOut" true-value="true" false-value="false">
                  Opt-out
              </b-form-checkbox>
              <div class="d-flex justify-content-center align-items-center" style="font-size: xx-large; user-select: none;">
                <font-awesome-icon :icon="['fas', 'caret-left']" @click="rotateCategory('left')"/>
                {{ griddings.gridElemCateg[griddings.elemCategIndex][0].category }}
                <font-awesome-icon :icon="['fas', 'caret-right']" @click="rotateCategory('right')"/>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="showNavVariables.showAttention">
          <h2 class="font-weight-bold" style="display: inline-block;">Attention & Emotion</h2>
          <h4 style="display: inline-block;"><font-awesome-icon id="configRepAttEmoInfoIcon" :icon="['fas', 'circle-info']" style="color: #FF9B00"/></h4>
          <b-tooltip target="configRepAttEmoInfoIcon" triggers="hover">
            Patient Social Functioning Notes
          </b-tooltip>
          <div class="mt-5">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                {{ keyToFactor.atteSocEmoFunc.label }}
                <font-awesome-icon id="atteSocEmoFuncInfoIcon" :icon="['fas', 'circle-info']"/>
                <b-tooltip target="atteSocEmoFuncInfoIcon" triggers="hover">
                  Social Function Notes
                </b-tooltip>
              </div>
              <b-form-checkbox v-model="keyToFactor.atteSocEmoFunc.optsOut" true-value="true" false-value="false">
                Opt-out
              </b-form-checkbox>
            </div>
            <div>
              <QuillEditor v-model="keyToFactor.atteSocEmoFunc.variable" />
            </div>
          </div>
          <div class="mt-5">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                {{ keyToFactor.riskSum.label }}
                <font-awesome-icon id="riskSumInfoIcon" :icon="['fas', 'circle-info']"/>
                <b-tooltip target="riskSumInfoIcon" triggers="hover">
                  Summary of Social Risks
                </b-tooltip>
              </div>
              <b-form-checkbox v-model="keyToFactor.riskSum.optsOut" true-value="true" false-value="false">
                Opt-out
              </b-form-checkbox>
            </div>
            <div>
              <QuillEditor v-model="keyToFactor.riskSum.variable" />
            </div>
          </div>
        </div>
        <div v-else-if="showNavVariables.showGraphs">
          <h2 class="font-weight-bold" style="display: inline-block;">Graphs & Plots</h2>
          <h4 style="display: inline-block;"><font-awesome-icon id="configRepAttEmoInfoIcon" :icon="['fas', 'circle-info']" style="color: #FF9B00"/></h4>
          <b-tooltip target="configRepAttEmoInfoIcon" triggers="hover">
            Patient Social Functioning Notes
          </b-tooltip>
          <h4 class="mt-5">Diagram</h4>
          <div>
            <div class="radioGrid mb-5">
              <div>Types:</div>
              <div v-for="(item) in plotVariables.plotSelect" :key="item.label">
                <span @click="chooseGraphics(item.label)">
                  <span :class="[keyToFactor[item.ref].optsOut ? 'categGraphOptedOut' : null ,item.isActive ? 'categGraphSelected' : null, 'categGraphOptions']"></span>
                  {{ item.label }}
                </span>
              </div>
              <div>Categories:</div>
              <div @click="chooseGraphics('worse 3')">
                <div class="categGraphOptions" id="selectWorst3Opt"></div>
                Weakest 3
              </div>
              <div @click="chooseGraphics('all')">
                <div class="categGraphOptions" id="selectAllOpt"></div>
                All
              </div>
            </div>
          </div>

          <div v-if="keyToFactor.barChart.worst.isActive && !keyToFactor.barChart.optsOut" class="plotDrop-container">
            <div @click="toggleCustomizeDropDown('barChart', 'worst')" class="plotDrop-title d-flex justify-content-center align-items-center position-relative">
              Bar Chart: Weakest 3
              <font-awesome-icon :icon="['fas', 'angle-down']" style="position: absolute; right: 10"/>
            </div>
            <div :class="['plotDrop-body', keyToFactor.barChart.worst.plotCustomize.dropDownActive ? 'plotDrop-body-open' : null]">
              <div class="d-flex justify-content-center align-items-center position-relative w-100 h-100">
                <div class="displayCard flex-column justify-content-between align-items-center p-3 m-2">
                  <div class="d-flex justify-content-center align-items-center position-relative w-100">
                    <div class="custom-dropdown w-50 m-1">
                      <div class="selected-option d-flex justify-content-between align-items-center" @click="toggleGeneralDropDowns('weakest')">
                        {{ keyToFactor.barChart.worst.dropDownWeakest.selectedValue }}
                        <font-awesome-icon :icon="['fas', 'angle-down']" />
                      </div>
                      <ul v-show="keyToFactor.barChart.worst.dropDownWeakest.isDropdownOpen" class='p-0 w-100'>
                        <li v-for="option in keyToFactor.barChart.worst.dropDownWeakest.options" :key="option" @click="selectOptionGeneral(option, 'barChartWeak3')">
                          <span :style="option == keyToFactor.barChart.worst.dropDownWeakest.selectedValue ? 'visibility: visible' : 'visibility: hidden;'">
                            <font-awesome-icon :icon="['fas', 'check']" />
                          </span>
                          {{ option }}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="d-flex flex-column justify-content-between align-items-center m-2">
                    <div class="pillSelection rounded-pill p-1 d-flex">
                      <span v-for="(item, index) in keyToFactor.barChart.worst.pastChoose" :class="[item.isActive ? 'pillSelected' : null, 'p-1', 'rounded-pill']" :key="index" @click="changePastWorstCateg(item.label)">{{ item.label }}</span>
                    </div>
                    <BarChartVertical :ref="keyToFactor.barChart.worst.ref" :dataInput="usedDataBarChartWorst" :suggest="keyToFactor.barChart.worst.suggest" :width="screenWidth*.5" :height="190" 
                      :mean="keyToFactor.barChart.worst.mean" :median="keyToFactor.barChart.worst.median" :standDeviation="keyToFactor.barChart.worst.stanDeviation" :variance="keyToFactor.barChart.worst.variance"/>
                  </div>
                </div>
                <div :class="['plotDrop-sideBar', keyToFactor.barChart.worst.plotCustomize.sideBarActive ? 'plotDrop-sideBar-open' : null]">
                  <div class="d-flex justify-content-center">
                    <b-form-checkbox class="m-1" v-model="keyToFactor.barChart.worst.mean" true-value="true" false-value="false">
                      Mean
                    </b-form-checkbox>
                    <b-form-checkbox class="m-1" v-model="keyToFactor.barChart.worst.median" true-value="true" false-value="false">
                      Median
                    </b-form-checkbox>
                    <b-form-checkbox class="m-1" v-model="keyToFactor.barChart.worst.stanDeviation" true-value="true" false-value="false">
                      Standard Deviation
                    </b-form-checkbox>
                    <b-form-checkbox class="m-1" v-model="keyToFactor.barChart.worst.variance" true-value="true" false-value="false">
                      Variance
                    </b-form-checkbox>
                  </div>
                  <div class="d-flex justify-content-center">
                    <b-form-checkbox class="m-1" v-model="keyToFactor.barChart.worst.suggest" true-value="true" false-value="false">
                      Suggestions
                    </b-form-checkbox>
                  </div>
                  <div class="text-center" style="font-size: 1.3em">Remove Outliers</div>
                  <div class="d-flex justify-content-center m-2">
                    <vue-slider v-model="keyToFactor.barChart.worst.outlierValues" :dotStyle="{background: '#FF9B00', border: '2px solid #FF9B00'}" :enable-cross="false" class="w-75">
                    </vue-slider>
                  </div>
                  <div class="text-center" style="font-size:1.3em">Drag to Choose which Data is Used</div>
                  <div class="d-flex justify-content-center">
                    <div class="plotDrop-draggable-used">
                      <div class="text-center" style="font-size: 1.2em">Used Categories (max 3)</div>
                      <draggable v-model="keyToFactor.barChart.worst.worstData" group="barChartWorst" v-bind="dragOptions" style="column-width: 150px; flex-grow: 1;">
                        <div v-for="(item,index) in usedDataBarChartWorst" :key="index">
                          {{ `${item.variable}` }}
                        </div>
                      </draggable>
                    </div>
                    <div class="plotDrop-draggable-removed">
                      <div class="text-center" style="font-size: 1.2em">Removed Categories</div>
                      <draggable v-model="keyToFactor.barChart.worst.worstDataRemoved" group="barChartWorst" :move="checkMoveWorst" v-bind="dragOptions" style="column-width: 150px; flex-grow: 1;">
                        <div v-for="(item,index) in removedDataBarChartWorst" :key="index">
                          {{ item.variable }}
                        </div>
                      </draggable>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-center align-items-center w-100">
                <div @click="toggleCustomizeSideBar('barChart', 'worst'); reDrawGraphs(keyToFactor.barChart.worst.ref)" class="plotDrop-customizeB">
                  {{ keyToFactor.barChart.worst.plotCustomize.sideBarActive ? 'Close' : 'Customize' }}
                </div>
              </div>
            </div>  
          </div>
          <div v-if="keyToFactor.barChart.all.isActive && !keyToFactor.barChart.optsOut" class="plotDrop-container">
            <div @click="toggleCustomizeDropDown('barChart', 'all')" class="plotDrop-title d-flex justify-content-center align-items-center position-relative">
              Bar Chart: All
              <font-awesome-icon :icon="['fas', 'angle-down']" style="position: absolute; right: 10"/>
            </div>
            <div :class="['plotDrop-body', keyToFactor.barChart.all.plotCustomize.dropDownActive ? 'plotDrop-body-open' : null]">
              <div class="d-flex justify-content-center align-items-center position-relative w-100 h-100">
                <div class="displayCard flex-column justify-content-between align-items-center position-relative p-3 m-2">
                  <div>All</div>
                  <BarChartHorizontal :ref="keyToFactor.barChart.all.ref" :dataInput="usedDataBarChartAll" :suggest="keyToFactor.barChart.all.suggest" :width="screenWidth*.5" :height="10*griddings.numberOfCateg" 
                    :mean="keyToFactor.barChart.all.mean" :median="keyToFactor.barChart.all.median" :standDeviation="keyToFactor.barChart.all.stanDeviation" :variance="keyToFactor.barChart.all.variance"/>
                </div>
                <div :class="['plotDrop-sideBar', keyToFactor.barChart.all.plotCustomize.sideBarActive ? 'plotDrop-sideBar-open' : null]">
                  <div class="d-flex justify-content-center">
                    <b-form-checkbox class="m-1" v-model="keyToFactor.barChart.all.mean" true-value="true" false-value="false">
                      Mean
                    </b-form-checkbox>
                    <b-form-checkbox class="m-1" v-model="keyToFactor.barChart.all.median" true-value="true" false-value="false">
                      Median
                    </b-form-checkbox>
                    <b-form-checkbox class="m-1" v-model="keyToFactor.barChart.all.stanDeviation" true-value="true" false-value="false">
                      Standard Deviation
                    </b-form-checkbox>
                    <b-form-checkbox class="m-1" v-model="keyToFactor.barChart.all.variance" true-value="true" false-value="false">
                      Variance
                    </b-form-checkbox>
                  </div>
                  <div class="d-flex justify-content-center">
                    <b-form-checkbox class="m-1" v-model="keyToFactor.barChart.all.suggest" true-value="true" false-value="false">
                      Suggest
                    </b-form-checkbox>
                  </div>
                  <div class="text-center" style="font-size: 1.3em">Remove Outliers</div>
                  <div class="d-flex justify-content-center m-2">
                    <vue-slider v-model="keyToFactor.barChart.all.outlierValues" :dotStyle="{background: '#FF9B00', border: '2px solid #FF9B00'}" :enable-cross="false" class="w-75"></vue-slider>
                  </div>
                  <div class="text-center" style="font-size: 1.3em">Drag to Order & Choose which Data is Used</div>
                  <div class="d-flex justify-content-center">
                    <div class="plotDrop-draggable-used">
                      <div class="text-center" style="font-size: 1.2em">Used Categories</div>
                      <draggable v-model="keyToFactor.barChart.all.allData" group="barChartAll" v-bind="dragOptions" style="column-width: 150px; flex-grow: 1;">
                        <div v-for="(item,index) in usedDataBarChartAll" :key="index">
                          {{ `${index+1}: ${item.variable}: ${item.value}` }}
                        </div>
                      </draggable>
                    </div>
                    <div class="plotDrop-draggable-removed">
                      <div class="text-center" style="font-size: 1.2em">Removed Categories</div>
                      <draggable v-model="keyToFactor.barChart.all.allDataRemoved" group="barChartAll" v-bind="dragOptions" style="column-width: 150px; flex-grow: 1;">
                        <div v-for="(item,index) in removedDataBarChartAll" :key="index">
                          {{ item.variable }}
                        </div>
                      </draggable>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-center align-items-center w-100">
                <div @click="toggleCustomizeSideBar('barChart', 'all'); reDrawGraphs(keyToFactor.barChart.all.ref)" class="plotDrop-customizeB">
                  {{ keyToFactor.barChart.all.plotCustomize.sideBarActive ? 'Close' : 'Customize' }} 
                </div>
              </div>
            </div>  
          </div>
          <div v-if="keyToFactor.scattPlot.worst.isActive && !keyToFactor.scattPlot.optsOut" class="plotDrop-container">
            <div @click="toggleCustomizeDropDown('scattPlot', 'worst')" class="plotDrop-title d-flex justify-content-center align-items-center position-relative">
              Scatter Plot: Weakest 3
              <font-awesome-icon :icon="['fas', 'angle-down']" style="position: absolute; right: 10"/>
            </div>
            <div :class="['plotDrop-body', keyToFactor.scattPlot.worst.plotCustomize.dropDownActive ? 'plotDrop-body-open' : null]">
              <div class="d-flex justify-content-center align-items-center position-relative w-100 h-100">
                <div class="displayCard flex-column justify-content-between align-items-center p-3 m-2">
                  <div class="d-flex flex-column justify-content-between align-items-center m-2">
                    <div>Weakest</div>
                    <ScatterPlot :ref="keyToFactor.scattPlot.worst.ref" :dataInput="usedDataScattPlotWorst" :suggest="keyToFactor.scattPlot.worst.suggest" :width="screenWidth*.5" :height="190" 
                      :mean="keyToFactor.scattPlot.worst.mean" :median="keyToFactor.scattPlot.worst.median" :standDeviation="keyToFactor.scattPlot.worst.stanDeviation" :variance="keyToFactor.scattPlot.worst.variance"/>
                  </div>
                </div>
                <div :class="['plotDrop-sideBar', keyToFactor.scattPlot.worst.plotCustomize.sideBarActive ? 'plotDrop-sideBar-open' : null]">
                  <div class="d-flex justify-content-center">
                    <b-form-checkbox class="m-1" v-model="keyToFactor.scattPlot.worst.mean" true-value="true" false-value="false">
                      Mean
                    </b-form-checkbox>
                    <b-form-checkbox class="m-1" v-model="keyToFactor.scattPlot.worst.median" true-value="true" false-value="false">
                      Median
                    </b-form-checkbox>
                    <b-form-checkbox class="m-1" v-model="keyToFactor.scattPlot.worst.stanDeviation" true-value="true" false-value="false">
                      Standard Deviation
                    </b-form-checkbox>
                    <b-form-checkbox class="m-1" v-model="keyToFactor.scattPlot.worst.variance" true-value="true" false-value="false">
                      Variance
                    </b-form-checkbox>
                  </div>
                  <div class="d-flex justify-content-center">
                    <b-form-checkbox class="m-1" v-model="keyToFactor.scattPlot.worst.suggest" true-value="true" false-value="false">
                      Suggestions
                    </b-form-checkbox>
                  </div>
                  <div class="text-center" style="font-size: 1.3em">Remove Outliers</div>
                  <div class="d-flex justify-content-center m-2">
                    <vue-slider v-model="keyToFactor.scattPlot.worst.outlierValues" :dotStyle="{background: '#FF9B00', border: '2px solid #FF9B00'}" :enable-cross="false" class="w-75"></vue-slider>
                  </div>
                  <div class="text-center" style="font-size:1.3em">Drag to Choose which Data is Used</div>
                  <div class="d-flex justify-content-center">
                    <div class="plotDrop-draggable-used">
                      <div class="text-center" style="font-size: 1.2em">Used Categories (max 3)</div>
                      <draggable v-model="keyToFactor.scattPlot.worst.worstData" group="scattPlotWorst" v-bind="dragOptions" style="column-width: 150px; flex-grow: 1;">
                        <div v-for="(item,index) in usedDataScattPlotWorst" :key="index">
                          {{ `${item.variable}` }}
                        </div>
                      </draggable>
                    </div>
                    <div class="plotDrop-draggable-removed">
                      <div class="text-center" style="font-size: 1.2em">Removed Categories</div>
                      <draggable v-model="keyToFactor.scattPlot.worst.worstDataRemoved" group="scattPlotWorst" :move="checkMoveWorst" v-bind="dragOptions" style="column-width: 150px; flex-grow: 1;">
                        <div v-for="(item,index) in removedDataScattPlotWorst" :key="index">
                          {{ item.variable }}
                        </div>
                      </draggable>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-center align-items-center w-100">
                <div @click="toggleCustomizeSideBar('scattPlot', 'worst'); reDrawGraphs(keyToFactor.scattPlot.worst.ref)" class="plotDrop-customizeB">
                  {{ keyToFactor.scattPlot.worst.plotCustomize.sideBarActive ? 'Close' : 'Customize' }}
                </div>
              </div>
            </div> 
          </div>
          <div v-if="keyToFactor.scattPlot.all.isActive && !keyToFactor.scattPlot.optsOut" class="plotDrop-container">
            <div @click="toggleCustomizeDropDown('scattPlot', 'all')" class="plotDrop-title d-flex justify-content-center align-items-center position-relative">
              Scatter Plot: All
              <font-awesome-icon :icon="['fas', 'angle-down']" style="position: absolute; right: 10"/>
            </div>
            <div :class="['plotDrop-body', keyToFactor.scattPlot.all.plotCustomize.dropDownActive ? 'plotDrop-body-open' : null]">
              <div class="d-flex justify-content-center align-items-center position-relative w-100 h-100">
                <div class="displayCard flex-column justify-content-between align-items-center position-relative p-3 m-2">
                  <div>All</div>
                  <ScatterPlot :ref="keyToFactor.scattPlot.all.ref" :dataInput="usedDataScattPlotAll" :suggest="keyToFactor.scattPlot.all.suggest" :width="screenWidth*.5" :height="10*griddings.numberOfCateg" 
                    :mean="keyToFactor.scattPlot.all.mean" :median="keyToFactor.scattPlot.all.median" :standDeviation="keyToFactor.scattPlot.all.stanDeviation" :variance="keyToFactor.scattPlot.all.variance"/>
                </div>
                <div :class="['plotDrop-sideBar', keyToFactor.scattPlot.all.plotCustomize.sideBarActive ? 'plotDrop-sideBar-open' : null]">
                  <div class="d-flex justify-content-center">
                    <b-form-checkbox class="m-1" v-model="keyToFactor.scattPlot.all.mean" true-value="true" false-value="false">
                      Mean
                    </b-form-checkbox>
                    <b-form-checkbox class="m-1" v-model="keyToFactor.scattPlot.all.median" true-value="true" false-value="false">
                      Median
                    </b-form-checkbox>
                    <b-form-checkbox class="m-1" v-model="keyToFactor.scattPlot.all.stanDeviation" true-value="true" false-value="false">
                      Standard Deviation
                    </b-form-checkbox>
                    <b-form-checkbox class="m-1" v-model="keyToFactor.scattPlot.all.variance" true-value="true" false-value="false">
                      Variance
                    </b-form-checkbox>
                  </div>
                  <div class="d-flex justify-content-center">
                    <b-form-checkbox class="m-1" v-model="keyToFactor.scattPlot.all.suggest" true-value="true" false-value="false">
                      Suggestions
                    </b-form-checkbox>
                  </div>
                  <div class="text-center" style="font-size: 1.3em">Remove Outliers</div>
                  <div class="d-flex justify-content-center m-2">
                    <vue-slider v-model="keyToFactor.scattPlot.all.outlierValues" :dotStyle="{background: '#FF9B00', border: '2px solid #FF9B00'}" :enable-cross="false" class="w-75"></vue-slider>
                  </div>
                  <div class="text-center" style="font-size: 1.3em">Drag to Order & Choose which Data is Used</div>

                  <div class="d-flex justify-content-center">
                    <div class="plotDrop-draggable-used">
                      <div class="text-center" style="font-size: 1.2em">Used Categories</div>
                      <draggable v-model="keyToFactor.scattPlot.all.allData" group="scattPlotAll" v-bind="dragOptions" style="column-width: 150px; flex-grow: 1;">
                        <div v-for="(item,index) in usedDataScattPlotAll" :key="index">
                          {{ `${index+1}: ${item.variable}` }}
                        </div>
                      </draggable>
                    </div>
                    <div class="plotDrop-draggable-removed">
                      <div class="text-center" style="font-size: 1.2em">Removed Categories</div>
                      <draggable v-model="keyToFactor.scattPlot.all.allDataRemoved" group="scattPlotAll" v-bind="dragOptions" style="column-width: 150px; flex-grow: 1;">
                        <div v-for="(item,index) in removedDataScattPlotAll" :key="index">
                          {{ item.variable }}
                        </div>
                      </draggable>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-center align-items-center w-100">
                <div @click="toggleCustomizeSideBar('scattPlot', 'all'); reDrawGraphs(keyToFactor.scattPlot.all.ref)" class="plotDrop-customizeB">
                  {{ keyToFactor.scattPlot.all.plotCustomize.sideBarActive ? 'Close' : 'Customize' }} 
                </div>
              </div>
            </div>  
          </div>
          <div v-if="keyToFactor.radarChart.worst.isActive && !keyToFactor.radarChart.optsOut" class="plotDrop-container">
            <div @click="toggleCustomizeDropDown('radarChart', 'worst')" class="plotDrop-title d-flex justify-content-center align-items-center position-relative">
              Radar Chart: Weakest 3
              <font-awesome-icon :icon="['fas', 'angle-down']" style="position: absolute; right: 10"/>
            </div>
            <div :class="['plotDrop-body', keyToFactor.radarChart.worst.plotCustomize.dropDownActive ? 'plotDrop-body-open' : null]">
              <div class="d-flex justify-content-center align-items-center position-relative w-100 h-100">
                <div class="displayCard flex-column justify-content-between align-items-center p-3 m-2">
                  <div class="d-flex flex-column justify-content-between align-items-center m-2">
                    <div>Weakest</div>
                    <RadarChart :ref="keyToFactor.radarChart.worst.ref" :dataInput="usedDataRadarChartWorst" :suggest="keyToFactor.radarChart.worst.suggest" :width="screenWidth*.5" :height="190"/>
                  </div>
                </div>
                <div :class="['plotDrop-sideBar', keyToFactor.radarChart.worst.plotCustomize.sideBarActive ? 'plotDrop-sideBar-open' : null]">
                  <div class="d-flex justify-content-center">
                    <b-form-checkbox class="m-1" v-model="keyToFactor.radarChart.worst.suggest" true-value="true" false-value="false">
                      Suggestions
                    </b-form-checkbox>
                  </div>
                  <div class="text-center" style="font-size: 1.3em">Remove Outliers</div>
                  <div class="d-flex justify-content-center m-2">
                    <vue-slider v-model="keyToFactor.radarChart.worst.outlierValues" :dotStyle="{background: '#FF9B00', border: '2px solid #FF9B00'}" :enable-cross="false" class="w-75"></vue-slider>
                  </div>
                  <div class="text-center" style="font-size:1.3em">Drag to Choose which Data is Used</div>
                  <div class="d-flex justify-content-center">
                    <div class="plotDrop-draggable-used">
                      <div class="text-center" style="font-size: 1.2em">Used Categories (max 3)</div>
                      <draggable v-model="keyToFactor.radarChart.worst.worstData" group="radarChartWorst" v-bind="dragOptions" style="column-width: 150px; flex-grow: 1;">
                        <div v-for="(item,index) in usedDataRadarChartWorst" :key="index">
                          {{ `${item.variable}` }}
                        </div>
                      </draggable>
                    </div>
                    <div class="plotDrop-draggable-removed">
                      <div class="text-center" style="font-size: 1.2em">Removed Categories</div>
                      <draggable v-model="keyToFactor.radarChart.worst.worstDataRemoved" group="radarChartWorst" :move="checkMoveWorst" v-bind="dragOptions" style="column-width: 150px; flex-grow: 1;">
                        <div v-for="(item,index) in removedDataRadarChartWorst" :key="index">
                          {{ item.variable }}
                        </div>
                      </draggable>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-center align-items-center w-100">
                <div @click="toggleCustomizeSideBar('radarChart', 'worst'); reDrawGraphs(keyToFactor.radarChart.worst.ref)" class="plotDrop-customizeB">
                  {{ keyToFactor.radarChart.worst.plotCustomize.sideBarActive ? 'Close' : 'Customize' }}
                </div>
              </div>
            </div> 
          </div>
          <div v-if="keyToFactor.radarChart.all.isActive && !keyToFactor.radarChart.optsOut" class="plotDrop-container">
            <div @click="toggleCustomizeDropDown('radarChart', 'all')" class="plotDrop-title d-flex justify-content-center align-items-center position-relative">
              Radar Chart: All
              <font-awesome-icon :icon="['fas', 'angle-down']" style="position: absolute; right: 10"/>
            </div>
            <div :class="['plotDrop-body', keyToFactor.radarChart.all.plotCustomize.dropDownActive ? 'plotDrop-body-open' : null]">
              <div class="d-flex justify-content-center align-items-center position-relative w-100 h-100">
                <div class="displayCard flex-column justify-content-between align-items-center position-relative p-3 m-2">
                  <div>All</div>
                  <RadarChart :ref="keyToFactor.radarChart.all.ref" :dataInput="usedDataRadarChartAll" :suggest="keyToFactor.radarChart.all.suggest" :width="screenWidth*.5" :height="10*griddings.numberOfCateg"/>
                </div>
                <div :class="['plotDrop-sideBar', keyToFactor.radarChart.all.plotCustomize.sideBarActive ? 'plotDrop-sideBar-open' : null]">
                  <div class="d-flex justify-content-center">
                    <b-form-checkbox class="m-1" v-model="keyToFactor.radarChart.all.suggest" true-value="true" false-value="false">
                      Suggestions
                    </b-form-checkbox>
                  </div>
                  <div class="text-center" style="font-size: 1.3em">Remove Outliers</div>
                  <div class="d-flex justify-content-center m-2">
                    <vue-slider v-model="keyToFactor.radarChart.all.outlierValues" :dotStyle="{background: '#FF9B00', border: '2px solid #FF9B00'}" :enable-cross="false" class="w-75"></vue-slider>
                  </div>
                  <div class="text-center" style="font-size: 1.3em">Drag to Order & Choose which Data is Used</div>
                  <div class="d-flex justify-content-center">
                    <div class="plotDrop-draggable-used">
                      <div class="text-center" style="font-size: 1.2em">Used Categories</div>
                      <draggable v-model="keyToFactor.radarChart.all.allData" group="radarChartAll" v-bind="dragOptions" style="column-width: 150px; flex-grow: 1;">
                        <div v-for="(item,index) in usedDataRadarChartAll" :key="index">
                          {{ `${index+1}: ${item.variable}` }}
                        </div>
                      </draggable>
                    </div>
                    <div class="plotDrop-draggable-removed">
                      <div class="text-center" style="font-size: 1.2em">Removed Categories</div>
                      <draggable v-model="keyToFactor.radarChart.all.allDataRemoved" group="radarChartAll" v-bind="dragOptions" style="column-width: 150px; flex-grow: 1;">
                        <div v-for="(item,index) in removedDataRadarChartAll" :key="index">
                          {{ item.variable }}
                        </div>
                      </draggable>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-center align-items-center w-100">
                <div @click="toggleCustomizeSideBar('radarChart', 'all'); reDrawGraphs(keyToFactor.radarChart.all.ref)" class="plotDrop-customizeB">
                  {{ keyToFactor.radarChart.all.plotCustomize.sideBarActive ? 'Close' : 'Customize' }}
                </div>
              </div>
            </div>  
          </div>
          <div v-if="keyToFactor.pieChart.worst.isActive && !keyToFactor.pieChart.optsOut" class="plotDrop-container">
            <div @click="toggleCustomizeDropDown('pieChart', 'worst')" class="plotDrop-title d-flex justify-content-center align-items-center position-relative">
              Pie Chart: Weakest 3
              <font-awesome-icon :icon="['fas', 'angle-down']" style="position: absolute; right: 10"/>
            </div>
            <div :class="['plotDrop-body', keyToFactor.pieChart.worst.plotCustomize.dropDownActive ? 'plotDrop-body-open' : null]">
              <div class="d-flex justify-content-center align-items-center position-relative w-100 h-100">
                <div class="displayCard flex-column justify-content-between align-items-center p-3 m-2">
                  <div class="d-flex flex-column justify-content-between align-items-center m-2">
                    <div>Weakest</div>
                    <PieChart :dataInput="usedDataPieChartWorst" :width="screenWidth*.5" :height="190"/>
                  </div>
                </div>
                <div :class="['plotDrop-sideBar', keyToFactor.pieChart.worst.plotCustomize.sideBarActive ? 'plotDrop-sideBar-open' : null]">
                  <div class="text-center" style="font-size: 1.3em">Remove Outliers</div>
                  <div class="d-flex justify-content-center m-2">
                    <vue-slider v-model="keyToFactor.pieChart.worst.outlierValues" :dotStyle="{background: '#FF9B00', border: '2px solid #FF9B00'}" :enable-cross="false" class="w-75"></vue-slider>
                  </div>
                  <div class="text-center" style="font-size:1.3em">Drag to Choose which Data is Used</div>
                  <div class="d-flex justify-content-center">
                    <div class="plotDrop-draggable-used">
                      <div class="text-center" style="font-size: 1.2em">Used Categories (max 3)</div>
                      <draggable v-model="keyToFactor.pieChart.worst.worstData" group="pieChartWorst" v-bind="dragOptions" style="column-width: 150px; flex-grow: 1;">
                        <div v-for="(item,index) in usedDataPieChartWorst" :key="index">
                          {{ `${item.variable}` }}
                        </div>
                      </draggable>
                    </div>
                    <div class="plotDrop-draggable-removed">
                      <div class="text-center" style="font-size: 1.2em">Removed Categories</div>
                      <draggable v-model="keyToFactor.pieChart.worst.worstDataRemoved" group="pieChartWorst" :move="checkMoveWorst" v-bind="dragOptions" style="column-width: 150px; flex-grow: 1;">
                        <div v-for="(item,index) in removedDataPieChartWorst" :key="index">
                          {{ item.variable }}
                        </div>
                      </draggable>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-center align-items-center w-100">
                <div @click="toggleCustomizeSideBar('pieChart', 'worst')" class="plotDrop-customizeB">
                  {{ keyToFactor.pieChart.worst.plotCustomize.sideBarActive ? 'Close' : 'Customize' }}
                </div>
              </div>
            </div> 
          </div>
          <div v-if="keyToFactor.pieChart.all.isActive && !keyToFactor.pieChart.optsOut" class="plotDrop-container">
            <div @click="toggleCustomizeDropDown('pieChart', 'all')" class="plotDrop-title d-flex justify-content-center align-items-center position-relative">
              Pie Chart: All
              <font-awesome-icon :icon="['fas', 'angle-down']" style="position: absolute; right: 10"/>
            </div>
            <div :class="['plotDrop-body', keyToFactor.pieChart.all.plotCustomize.dropDownActive ? 'plotDrop-body-open' : null]">
              <div class="d-flex justify-content-center align-items-center position-relative w-100 h-100">
                <div class="displayCard flex-column justify-content-between align-items-center position-relative p-3 m-2">
                  <div>All</div>
                  <PieChart :dataInput="usedDataPieChartAll" :width="screenWidth*.5" :height="10*griddings.numberOfCateg"/>
                </div>
                <div :class="['plotDrop-sideBar', keyToFactor.pieChart.all.plotCustomize.sideBarActive ? 'plotDrop-sideBar-open' : null]">
                  <div class="text-center" style="font-size: 1.3em">Remove Outliers</div>
                  <div class="d-flex justify-content-center m-2">
                    <vue-slider v-model="keyToFactor.pieChart.all.outlierValues" :dotStyle="{background: '#FF9B00', border: '2px solid #FF9B00'}" :enable-cross="false" class="w-75"></vue-slider>
                  </div>
                  <div class="text-center" style="font-size: 1.3em">Drag to Order & Choose which Data is Used</div>
                  <div class="d-flex justify-content-center">
                    <div class="plotDrop-draggable-used">
                      <div class="text-center" style="font-size: 1.2em">Used Categories</div>
                      <draggable v-model="keyToFactor.pieChart.all.allData" group="pieChartAll" v-bind="dragOptions" style="column-width: 150px; flex-grow: 1;">
                        <div v-for="(item,index) in usedDataPieChartAll" :key="index">
                          {{ `${index+1}: ${item.variable}` }}
                        </div>
                      </draggable>
                    </div>
                    <div class="plotDrop-draggable-removed">
                      <div class="text-center" style="font-size: 1.2em">Removed Categories</div>
                      <draggable v-model="keyToFactor.pieChart.all.allDataRemoved" group="pieChartAll" v-bind="dragOptions" style="column-width: 150px; flex-grow: 1;">
                        <div v-for="(item,index) in removedDataPieChartAll" :key="index">
                          {{ item.variable }}
                        </div>
                      </draggable>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-center align-items-center w-100">
                <div @click="toggleCustomizeSideBar('pieChart', 'all')" class="plotDrop-customizeB">
                  {{ keyToFactor.pieChart.all.plotCustomize.sideBarActive ? 'Close' : 'Customize' }} 
                </div>
              </div>
            </div>  
          </div>
          <div v-if="keyToFactor.lineChart.worst.isActive && !keyToFactor.lineChart.optsOut" class="plotDrop-container">
            <div @click="toggleCustomizeDropDown('lineChart', 'worst')" class="plotDrop-title d-flex justify-content-center align-items-center position-relative">
              Line Chart: Weakest 3
              <font-awesome-icon :icon="['fas', 'angle-down']" style="position: absolute; right: 10"/>
            </div>
            <div :class="['plotDrop-body', keyToFactor.lineChart.worst.plotCustomize.dropDownActive ? 'plotDrop-body-open' : null]">
              <div class="d-flex justify-content-center align-items-center position-relative w-100 h-100">
                <div class="displayCard flex-column justify-content-between align-items-center p-3 m-2">
                  <div class="d-flex flex-column justify-content-between align-items-center m-2">
                    <div>Weakest</div>
                    <LineChart :ref="keyToFactor.lineChart.worst.ref" :dataInput="usedDataLineChartWorst" :suggest="keyToFactor.lineChart.worst.suggest" :width="screenWidth*.5" :height="190" 
                      :mean="keyToFactor.lineChart.worst.mean" :median="keyToFactor.lineChart.worst.median" :standDeviation="keyToFactor.lineChart.worst.stanDeviation" :variance="keyToFactor.lineChart.worst.variance"/>
                  </div>
                </div>
                <div :class="['plotDrop-sideBar', keyToFactor.lineChart.worst.plotCustomize.sideBarActive ? 'plotDrop-sideBar-open' : null]">
                  <div class="d-flex justify-content-center">
                    <b-form-checkbox class="m-1" v-model="keyToFactor.lineChart.worst.mean" true-value="true" false-value="false">
                      Mean
                    </b-form-checkbox>
                    <b-form-checkbox class="m-1" v-model="keyToFactor.lineChart.worst.median" true-value="true" false-value="false">
                      Median
                    </b-form-checkbox>
                    <b-form-checkbox class="m-1" v-model="keyToFactor.lineChart.worst.stanDeviation" true-value="true" false-value="false">
                      Standard Deviation
                    </b-form-checkbox>
                    <b-form-checkbox class="m-1" v-model="keyToFactor.lineChart.worst.variance" true-value="true" false-value="false">
                      Variance
                    </b-form-checkbox>
                  </div>
                  <div class="d-flex justify-content-center">
                    <b-form-checkbox class="m-1" v-model="keyToFactor.lineChart.worst.suggest" true-value="true" false-value="false">
                      Suggestions
                    </b-form-checkbox>
                  </div>
                  <div class="text-center" style="font-size: 1.3em">Remove Outliers</div>
                  <div class="d-flex justify-content-center m-2">
                    <vue-slider v-model="keyToFactor.lineChart.worst.outlierValues" :dotStyle="{background: '#FF9B00', border: '2px solid #FF9B00'}" :enable-cross="false" class="w-75"></vue-slider>
                  </div>
                  <div class="text-center" style="font-size:1.3em">Drag to Choose which Data is Used</div>
                  <div class="d-flex justify-content-center">
                    <div class="plotDrop-draggable-used">
                      <div class="text-center" style="font-size: 1.2em">Used Categories (max 3)</div>
                      <draggable v-model="keyToFactor.lineChart.worst.worstData" group="lineChartWorst" v-bind="dragOptions" style="column-width: 150px; flex-grow: 1;">
                        <div v-for="(item,index) in usedDataLineChartWorst" :key="index">
                          {{ `${item.variable}` }}
                        </div>
                      </draggable>
                    </div>
                    <div class="plotDrop-draggable-removed">
                      <div class="text-center" style="font-size: 1.2em">Removed Categories</div>
                      <draggable v-model="keyToFactor.lineChart.worst.worstDataRemoved" group="lineChartWorst" :move="checkMoveWorst" v-bind="dragOptions" style="column-width: 150px; flex-grow: 1;">
                        <div v-for="(item,index) in removedDataLineChartWorst" :key="index">
                          {{ item.variable }}
                        </div>
                      </draggable>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-center align-items-center w-100">
                <div @click="toggleCustomizeSideBar('lineChart', 'worst'); reDrawGraphs(keyToFactor.lineChart.worst.ref)" class="plotDrop-customizeB">
                  {{ keyToFactor.lineChart.worst.plotCustomize.sideBarActive ? 'Close' : 'Customize' }}
                </div>
              </div>
            </div> 
          </div>
          <div v-if="keyToFactor.lineChart.all.isActive && !keyToFactor.lineChart.optsOut" class="plotDrop-container">
            <div @click="toggleCustomizeDropDown('lineChart', 'all')" class="plotDrop-title d-flex justify-content-center align-items-center position-relative">
              Line Chart: All
              <font-awesome-icon :icon="['fas', 'angle-down']" style="position: absolute; right: 10"/>
            </div>
            <div :class="['plotDrop-body', keyToFactor.lineChart.all.plotCustomize.dropDownActive ? 'plotDrop-body-open' : null]">
              <div class="d-flex justify-content-center align-items-center position-relative w-100 h-100">
                <div class="displayCard flex-column justify-content-between align-items-center position-relative p-3 m-2">
                  <div>All</div>
                  <LineChart :ref="keyToFactor.lineChart.all.ref" :dataInput="usedDataLineChartAll" :suggest="keyToFactor.lineChart.all.suggest" :width="screenWidth*.5" :height="10*griddings.numberOfCateg" 
                    :mean="keyToFactor.lineChart.all.mean" :median="keyToFactor.lineChart.all.median" :standDeviation="keyToFactor.lineChart.all.stanDeviation" :variance="keyToFactor.lineChart.all.variance"/>
                </div>
                <div :class="['plotDrop-sideBar', keyToFactor.lineChart.all.plotCustomize.sideBarActive ? 'plotDrop-sideBar-open' : null]">
                  <div class="d-flex justify-content-center">
                    <b-form-checkbox class="m-1" v-model="keyToFactor.lineChart.all.mean" true-value="true" false-value="false">
                      Mean
                    </b-form-checkbox>
                    <b-form-checkbox class="m-1" v-model="keyToFactor.lineChart.all.median" true-value="true" false-value="false">
                      Median
                    </b-form-checkbox>
                    <b-form-checkbox class="m-1" v-model="keyToFactor.lineChart.all.stanDeviation" true-value="true" false-value="false">
                      Standard Deviation
                    </b-form-checkbox>
                    <b-form-checkbox class="m-1" v-model="keyToFactor.lineChart.all.variance" true-value="true" false-value="false">
                      Variance
                    </b-form-checkbox>
                  </div>
                  <div class="d-flex justify-content-center">
                    <b-form-checkbox class="m-1" v-model="keyToFactor.lineChart.all.suggest" true-value="true" false-value="false">
                      Suggestions
                    </b-form-checkbox>
                  </div>
                  <div class="text-center" style="font-size: 1.3em">Remove Outliers</div>
                  <div class="d-flex justify-content-center m-2">
                    <vue-slider v-model="keyToFactor.lineChart.all.outlierValues" :dotStyle="{background: '#FF9B00', border: '2px solid #FF9B00'}" :enable-cross="false" class="w-75"></vue-slider>
                  </div>
                  <div class="text-center" style="font-size: 1.3em">Drag to Order & Choose which Data is Used</div>
                  <div class="d-flex justify-content-center">
                    <div class="plotDrop-draggable-used">
                      <div class="text-center" style="font-size: 1.2em">Used Categories</div>
                      <draggable v-model="keyToFactor.lineChart.all.allData" group="lineChartAll" v-bind="dragOptions" style="column-width: 150px; flex-grow: 1;">
                        <div v-for="(item,index) in usedDataLineChartAll" :key="index">
                          {{ `${index+1}: ${item.variable}` }}
                        </div>
                      </draggable>
                    </div>
                    <div class="plotDrop-draggable-removed">
                      <div class="text-center" style="font-size: 1.2em">Removed Categories</div>
                      <draggable v-model="keyToFactor.lineChart.all.allDataRemoved" group="lineChartAll" v-bind="dragOptions" style="column-width: 150px; flex-grow: 1;">
                        <div v-for="(item,index) in removedDataLineChartAll" :key="index">
                          {{ item.variable }}
                        </div>
                      </draggable>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-center align-items-center w-100">
                <div @click="toggleCustomizeSideBar('lineChart', 'all'); reDrawGraphs(keyToFactor.lineChart.all.ref)" class="plotDrop-customizeB">
                  {{ keyToFactor.lineChart.all.plotCustomize.sideBarActive ? 'Close' : 'Customize' }}
                </div>
              </div>
            </div>  
          </div>
        </div>
        <div v-else-if="showNavVariables.showRootCause">
          <div>
            <h2 class="font-weight-bold" style="display: inline-block;">Root Cause Analysis</h2>
            <h4 style="display: inline-block;"><font-awesome-icon id="rootCauseIcon" :icon="['fas', 'circle-info']" style="color: #FF9B00"/></h4>
            <b-tooltip target="rootCauseIcon" triggers="hover">
              Score Comparisons
            </b-tooltip>
          </div>
        </div>
        <div v-else-if="showNavVariables.showSummary">
          <div>
            <h2 class="font-weight-bold" style="display: inline-block;">Summary & Recommendation</h2>
            <h4 style="display: inline-block;"><font-awesome-icon id="configRepGrahicsInfoIcon" :icon="['fas', 'circle-info']" style="color: #FF9B00"/></h4>
            <b-tooltip target="configRepGrahicsInfoIcon" triggers="hover">
              Custom Graphics Representations
            </b-tooltip>
          </div>
          <div class="mt-5">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                {{ keyToFactor.summConclus.label }}
              </div>
              <b-form-checkbox v-model="keyToFactor.summConclus.optsOut" true-value="true" false-value="false">
                Opt-out
              </b-form-checkbox>
            </div>
            <div>
              <QuillEditor v-model="keyToFactor.summConclus.variable" />
            </div>
          </div>
          <div class="mt-5">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                {{ keyToFactor.furthTask.label }}
              </div>
              <b-form-checkbox v-model="keyToFactor.furthTask.optsOut" true-value="true" false-value="false">
                Opt-out
              </b-form-checkbox>
            </div>
            <div>
              <QuillEditor v-model="keyToFactor.furthTask.variable" />
            </div>
          </div>
          <div class="mt-5">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                {{ keyToFactor.accomInstru.label }}
              </div>
              <b-form-checkbox v-model="keyToFactor.accomInstru.optsOut" true-value="true" false-value="false">
                Opt-out
              </b-form-checkbox>
            </div>
            <div>
              <QuillEditor v-model="keyToFactor.accomInstru.variable" />
            </div>
          </div>
          <div class="mt-5">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                {{ keyToFactor.additComments.label }}
              </div>
              <b-form-checkbox v-model="keyToFactor.additComments.optsOut" true-value="true" false-value="false">
                Opt-out
              </b-form-checkbox>
            </div>
            <div>
              <QuillEditor v-model="keyToFactor.additComments.variable" />
            </div>
          </div>
          <div class="mt-5">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                {{ keyToFactor.techDetail.label }}-Additional Comments
                <font-awesome-icon id="techDetailsInfoIcon" :icon="['fas', 'circle-info']"/>
                <b-tooltip target="techDetailsInfoIcon" triggers="hover">
                  Browser, Scanner, ....
                </b-tooltip>
              </div>
              <b-form-checkbox v-model="keyToFactor.techDetail.optsOut" true-value="true" false-value="false">
                Opt-out
              </b-form-checkbox>
            </div>
            <div>
              <span class="mr-5">Browser: {{ browserInfo.name }}</span>
              <span class="mr-5">Version: {{browserInfo.version}}</span>
              <span class="mr-5">Hardware: Unknown</span>
            </div>
            <div>
              <QuillEditor v-model="keyToFactor.techDetail.variable" />
            </div>
          </div>
        </div>
      </section>
    </div>
    <div v-else id="preview-container" class="d-flex justify-content-center">
      <div class="d-flex flex-column justify-content-center align-items-center" style="width: 85%;">
        <div class="d-flex justify-content-end w-100">
          <font-awesome-icon :icon="['fas ', 'circle-xmark']" style="font-size: 40px;" @click="showPreview"/>
        </div>
        <div style="font-size: 50px;">Final Report</div>
        <div class="d-flex justify-content-around align-items-center w-100">
          <div class="d-flex flex-column justify-content-center align-items-center">
            <b-avatar id="avatarPDF" size="9em" style="background-color: #eecc9a;color: black;" :src=profilePic></b-avatar>
            <div style="font-size: 50px;" >Jeff</div>
          </div>
          <div class="preview-InfoLabels d-flex justify-content-around align-items-center w-75" style="height: 300px">
            <div style="width:40%">
              <div>
                Date of Birth:
              </div>
              <div class="preview-InfoText d-flex justify-content-center align-items-center rounded-pill pl-3 pr-3">
                02/05/2007
              </div>
              <div>
                Age:
              </div>
              <div class="preview-InfoText d-flex justify-content-center align-items-center rounded-pill pl-3 pr-3">
                15
              </div>
              <div>
                Parents/Guardian:
              </div>
              <div class="preview-InfoText d-flex justify-content-center align-items-center rounded-pill pl-3 pr-3">
                Joshua Kim
              </div>
            </div>
            <div style="width:40%">
              <div>
                School:
              </div>
              <div class="preview-InfoText d-flex justify-content-center align-items-center rounded-pill pl-3 pr-3">
                Tempora High School
              </div>
              <div>
                Buildings/Room:
              </div>
              <div class="preview-InfoText d-flex justify-content-center align-items-center rounded-pill pl-3 pr-3">
                2532
              </div>
              <div>
                Total %
              </div>
              <div class="preview-InfoText d-flex justify-content-center align-items-center rounded-pill pl-3 pr-3">
                90
              </div>
            </div>
          </div>
        </div>
        <div class="displayCard flex-column justify-content-between align-items-center p-3 m-3" style="width: 350px">
          <div class="d-flex flex-column justify-content-center align-items-center text-center" >
            Total score
            <div class="d-flex">
              <div id="totalScoreCirclePDF">
                <TotalScoreCircle />
              </div>
              <div id="totalScoreTablePDF">
                <svg width="150" height="60">
                  <rect width="300" height="60" fill="none" />
                  <rect x="15" y="10" width="10" height="10" fill="#427733" />
                  <text x="30" y="20" font-size="10" font-weight="400">Correct:</text>
                  <text x="100" y="20" font-size="10" font-weight="400">71/100</text>
                  <rect x="15" y="30" width="10" height="10" fill="#F29233" />
                  <text x="30" y="40" font-size="10" font-weight="400">Incorrect:</text>
                  <text x="100" y="40" font-size="10" font-weight="400">22</text>
                  <rect x="15" y="50" width="10" height="10" fill="#575B59" />
                  <text x="30" y="60" font-size="10" font-weight="400">Skipped:</text>
                  <text x="100" y="60" font-size="10" font-weight="400">7</text>
                </svg>
              </div>
            </div>
            Needs Improvement
          </div>
        </div>
        <div class="d-flex flex-column justify-content-center align-items-center w-100">
          <div v-for="(value,index) in listDisplayTextBoxes" :key="index" class="w-100">
            <div v-if="value.label == 'Bar Chart' && !value.optsOut && (value.worst.isActive == true || value.all.isActive == true)" :style="{order: index+1}" class="d-flex flex-column justify-content-around">
              <div v-if="keyToFactor.barChart.worst.isActive" class="displayCard flex-column justify-content-between align-items-center p-3 mt-3">
                <div>Bar Chart Weakest 3 Categories</div>
                <div class="d-flex flex-column justify-content-between align-items-center flex-grow-1">
                  <div class="pillSelection rounded-pill p-1 d-flex">
                    <span v-for="(item, index) in keyToFactor.barChart.worst.pastChoose" :class="[item.isActive ? 'pillSelected' : null, 'p-1', 'rounded-pill']" :key="index">{{ item.label }}</span>
                  </div>
                  <div id="barChartVertPDF">
                    <BarChartVertical :dataInput="keyToFactor.barChart.worst.worstData" :suggest="keyToFactor.barChart.worst.suggest" :width="screenWidth*.6" :height="200" 
                      :mean="keyToFactor.barChart.worst.mean" :median="keyToFactor.barChart.worst.median" :standDeviation="keyToFactor.barChart.worst.stanDeviation" :variance="keyToFactor.barChart.worst.variance"/>
                  </div>
                </div>
              </div>
              <div v-if="keyToFactor.barChart.all.isActive" class="displayCard flex-column justify-content-between align-items-center p-3 mt-3">
                <div>Bar Chart All Categories</div>
                <div id="barChartHorizPDF">
                  <BarChartHorizontal :dataInput="keyToFactor.barChart.all.allData" :suggest="keyToFactor.barChart.all.suggest" :width="screenWidth*.6" :height="10*griddings.numberOfCateg" 
                    :mean="keyToFactor.barChart.all.mean" :median="keyToFactor.barChart.all.median" :standDeviation="keyToFactor.barChart.all.stanDeviation" :variance="keyToFactor.barChart.all.variance"/>
                </div>
              </div>
            </div>
            <div v-else-if="value.label == 'Scatter Plot' && !value.optsOut && (value.worst.isActive == true || value.all.isActive == true)" :style="{order: index+1}" class="d-flex flex-column justify-content-around">
              <div v-if="keyToFactor.scattPlot.worst.isActive" class="displayCard flex-column justify-content-between align-items-center p-3 mt-3">
                <div>Scatter Plot Weakest 3 Categories</div>
                <div id="scattPlotWorstPDF">
                  <ScatterPlot :dataInput="keyToFactor.scattPlot.worst.worstData" :suggest="keyToFactor.scattPlot.worst.suggest" :width="210" :height="200" 
                    :mean="keyToFactor.scattPlot.worst.mean" :median="keyToFactor.scattPlot.worst.median" :standDeviation="keyToFactor.scattPlot.worst.stanDeviation" :variance="keyToFactor.scattPlot.worst.variance"/>
                </div>
              </div>
              <div v-if="keyToFactor.scattPlot.all.isActive" class="displayCard flex-column justify-content-between align-items-center p-3 mt-3">
                <div>Scatter Plot All Categories</div>
                <div id="scattPlotAllPDF">
                  <ScatterPlot :dataInput="keyToFactor.scattPlot.all.allData" :suggest="keyToFactor.scattPlot.all.suggest" :width="screenWidth*.6" :height="200" 
                    :mean="keyToFactor.scattPlot.all.mean" :median="keyToFactor.scattPlot.all.median" :standDeviation="keyToFactor.scattPlot.all.stanDeviation" :variance="keyToFactor.scattPlot.all.variance"/>
                </div>
              </div>
            </div>
            <div v-else-if="value.label == 'Radar Chart' && !value.optsOut && (value.worst.isActive == true || value.all.isActive == true)" :style="{order: index+1}" class="d-flex flex-column justify-content-around">
              <div v-if="keyToFactor.radarChart.worst.isActive" class="displayCard flex-column justify-content-between align-items-center p-3 mt-3">
                <div>Radar Chart Weakest 3 Categories</div>
                <div id="radarChartWorstPDF">
                  <RadarChart :dataInput="keyToFactor.radarChart.worst.worstData" :suggest="keyToFactor.radarChart.worst.suggest" :width="screenWidth*.6" :height="300" />
                </div>
              </div>
              <div v-if="keyToFactor.radarChart.all.isActive" class="displayCard flex-column justify-content-between align-items-center p-3 mt-3">
                <div>Radar Chart All Categories</div>
                <div id="radarChartAllPDF">
                  <RadarChart :dataInput="keyToFactor.radarChart.all.allData" :suggest="keyToFactor.radarChart.all.suggest" :width="screenWidth*.6" :height="300"/>
                </div>
              </div>
            </div>
            <div v-else-if="value.label == 'Pie Chart' && !value.optsOut && (value.worst.isActive == true || value.all.isActive == true)" :style="{order: index+1}" class="d-flex flex-column justify-content-around">
              <div v-if="keyToFactor.pieChart.worst.isActive" class="displayCard flex-column justify-content-between align-items-center p-3 mt-3">
                <div>Pie Chart Weakest 3 Categories</div>
                <div id="pieChartWorstPDF">
                  <PieChart :dataInput="keyToFactor.pieChart.worst.worstData" :width="screenWidth*.6" :height="300"/>
                </div>
              </div>
              <div v-if="keyToFactor.pieChart.all.isActive" class="displayCard flex-column justify-content-between align-items-center p-3 mt-3">
                <div>Pie Chart All Categories</div>
                <div id="pieChartAllPDF">
                  <PieChart :dataInput="keyToFactor.pieChart.all.allData" :width="screenWidth*.6" :height="350"/>
                </div>
              </div>
            </div>
            <div v-else-if="value.label == 'Line Chart' && !value.optsOut && (value.worst.isActive == true || value.all.isActive == true)" :style="{order: index+1}" class="d-flex flex-column justify-content-around">
              <div v-if="keyToFactor.lineChart.worst.isActive" class="displayCard flex-column justify-content-between align-items-center p-3 mt-3">
                <div>Line Chart Weakest 3 Categories</div>
                <div id="lineChartWorstPDF">
                  <LineChart :dataInput="keyToFactor.lineChart.worst.worstData" :suggest="keyToFactor.lineChart.worst.suggest" :width="screenWidth*.6" :height="200" 
                    :mean="keyToFactor.lineChart.worst.mean" :median="keyToFactor.lineChart.worst.median" :standDeviation="keyToFactor.lineChart.worst.stanDeviation" :variance="keyToFactor.lineChart.worst.variance"/>
                </div>
              </div>
              <div v-if="keyToFactor.lineChart.all.isActive" class="displayCard flex-column justify-content-between align-items-center p-3 mt-3">
                <div>Line Chart All Categories</div>
                <div id="lineChartAllPDF">
                  <LineChart :dataInput="keyToFactor.lineChart.all.allData" :suggest="keyToFactor.lineChart.all.suggest" :width="screenWidth*.6" :height="200" 
                    :mean="keyToFactor.lineChart.all.mean" :median="keyToFactor.lineChart.all.median" :standDeviation="keyToFactor.lineChart.all.stanDeviation" :variance="keyToFactor.lineChart.all.variance"/>
                </div>
              </div>
            </div>
            <div v-else-if="value.label == 'Category Comments' && !value.optsOut" :style="{order: index+1}" class="mt-3">
              <div v-for="item in keyToFactor.categComments.list" :key="item.label" class="preview-textBoxes p-2 mt-3">
                {{ item.label }} 
                <div v-html="item.variable" style="font-weight: 400; font-size: .7em;"></div>
              </div>
            </div>
            <div v-else-if="value.hasOwnProperty('variable') && !value.optsOut" :style="{order: index+1}" class="preview-textBoxes p-2 mt-3">
              {{ value.label }}
              <div v-html="value.variable" style="font-weight: 400; font-size: .7em;"></div>
            </div>
            <div v-else-if="value.label == 'Test Score' && !value.optsOut" :style="{order: index+1}" class="mt-3">
              <div id="tableDataPDF">
                <table class="w-100">
                <tr class="tableHeader">
                  <th>ID</th>
                  <th>Question</th>
                  <th>P/R/OT</th>
                  <th>Category</th>
                  <th>Note</th>
                  <th>Selected Answer</th>
                </tr>
                <tr v-for="value in griddings.gridElemDefault" :key="value.id" class="mt-3">
                  <td class="tableElements">{{ value.id }}</td>
                  <td class="tableElements">{{ value.question }}</td>
                  <td class="tableElements">{{ value.pr }}</td>
                  <td class="tableElements">{{ value.category }}</td>
                  <td class="tableElements">{{ value.note }}</td>
                  <td class="tableElements">{{ value.answer }}</td>
                </tr>
              </table>
              </div>

            </div>
            <div v-else-if="value.label == 'Subjective Scoring' && !value.optsOut" :style="{order: index+1}" class="preview-textBoxes p-2 mt-5 mb-5">
              <div>Introduction & Subjective Scoring</div>
              <div class="mt-5">
                <div style="font-weight: 400">
                  A
                  <span>{{ keyToFactor.subScore.dropDownMood.selectedValue }}</span> 
                  <span>{{ preferredName }}</span> in 
                  <span>{{ keyToFactor.subScore.dropDownShirtColor.selectedValue }}</span> 
                  shirt was seen for evaluation of 
                  <span>{{ appSubtitle }}</span>.
                  <span>{{ includeCateg }}</span>
                  type questions were included in the screening.
                </div>
              </div>
              <div id="subjectiveScorePDF">
                <svg width="100%" height="150">
                  <rect x="0" y="0" width="100%" height="150" rx="5" ry="5" stroke="black" fill="none" />
                  <circle cx="20%" cy="90" r="50" fill="#FFD449" />
                  <text x="20%" y="30" fill="black" text-anchor="middle">Comprehension</text>
                  <text x="20%" y="95" fill="black" text-anchor="middle">{{ keyToFactor.subScore.list.compreh.variable == 'N/A' ? 'N/A' : `${keyToFactor.subScore.list.compreh.variable}/10` }}</text>
                  <circle cx="50%" cy="90" r="50" fill="#F87B7B" />
                  <text x="50%" y="30" fill="black" text-anchor="middle">Problem Solving</text>
                  <text x="50%" y="95" fill="black" text-anchor="middle">{{ keyToFactor.subScore.list.probSolv.variable == 'N/A' ? 'N/A' : `${keyToFactor.subScore.list.probSolv.variable}/10` }}</text>
                  <circle cx="80%" cy="90" r="50" fill="#B6E2A1" />
                  <text x="80%" y="30" fill="black" text-anchor="middle">Intelligibility</text>
                  <text x="80%" y="95" fill="black" text-anchor="middle">{{ keyToFactor.subScore.list.intell.variable == 'N/A' ? 'N/A' : `${keyToFactor.subScore.list.intell.variable}/10` }}</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-center mt-5 w-75" style="position: fixed; bottom: 0">
          <span class="d-flex flex-column justify-content-center align-items-center m-2"><font-awesome-icon :icon="['fas', 'cloud-arrow-down']" />Upload to Server</span>
          <span class="d-flex flex-column justify-content-center align-items-center m-2" @click="downloadPDF"><font-awesome-icon :icon="['fas', 'file-arrow-down']" /> Download</span>
          <span class="d-flex flex-column justify-content-center align-items-center m-2"><font-awesome-icon :icon="['fas', 'envelope']" />Email</span>
          <font-awesome-icon :icon="['far ', 'circle-xmark']" style="font-size: 40px;" @click="showPreview"/>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
  import BarChartVertical from './subComponents/BarChartVertical.vue';
  import BarChartHorizontal from './subComponents/BarChartHorizontal.vue';
  import ScatterPlot from './subComponents/ScatterPlot.vue';
  import RadarChart from './subComponents/RadarChart.vue';
  import PieChart from './subComponents/PieChart.vue';
  import LineChart from './subComponents/LineChart.vue';
  import VueSlider from 'vue-slider-component';
  import 'vue-slider-component/theme/default.css';
  import QuillEditor from './subComponents/QuillEditor.vue';
  import draggable from 'vuedraggable';
  import VideoModel from './subComponents/VideoModel.vue';
  import AudioModel from './subComponents/AudioModel.vue';
  import PhotoModel from './subComponents/PhotoModel.vue'

  import pdfMake from 'pdfmake/build/pdfmake';
  import pdfFonts from "pdfmake/build/vfs_fonts";
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  import htmlToPdfmake from 'html-to-pdfmake';

  import TotalScoreCircle from './subComponents/TotalScoreCircle.vue'

	export default {
    components: {
      BarChartVertical,
      BarChartHorizontal,
      ScatterPlot,
      RadarChart,
      PieChart,
      LineChart,
      draggable,
      VueSlider,
      QuillEditor,
      TotalScoreCircle
    },
    data() {
      return {     
        browserInfo: {name: null, version: null},
        screenWidth: null,
        preferredName: 'Phil Thomson',
        appSubtitle: 'null',
        includeCateg: 'null',

        profilePic: null,
        profilePicTemp: null,
        orderedScoresByCateg: null,
        listDisplayTextBoxes: null,
        keyToFactor: {
          subScore: {
            label: "Subjective Scoring",
            optsOut: false,
            list:{ 
              compreh: {label: 'Comprehension', variable: 'N/A', optsOut: false},
              probSolv: {label: 'Problem Solving', variable: 'N/A', optsOut: false},
              intell: {label: 'Intelligibility', variable: 'N/A', optsOut: false}
            },
            dropDownMood: {
              selectedValue: 'Select Mood',
              isDropdownOpen: false,
              options: ['tense', 'excited', 'cheerful', 'relaxed', 'calm', 'bored', 'sad', 'irrated', 'neutral'],
            },
            dropDownShirtColor: {
              selectedValue: 'Select Shirt Color',
              isDropdownOpen: false,
              options: ['red', 'green', 'blue', 'orange', 'yellow', 'indigo', 'violet'],
            },
          },
          additComments: {
            label: "Additional Comments",
            variable: null,
            optsOut: false
          },
          categComments: {
            label: "Category Comments",
            optsOut: false,
            list: {}
          },
          barChart: {
            label: "Bar Chart",
            optsOut: false,
            worst: {
              ref: 'barChartWorstRef',
              isActive: true,
              worstData: null,
              worstDataRemoved: [],
              mean: true,
              median: true,
              stanDeviation: true,
              variance: true,
              suggest: false,
              outlierValues: [0,100],
              plotCustomize: {
                dropDownActive: false,
                sideBarActive: false,
              },
              dropDownWeakest: {
                selectedValue: 'Weakest Three Categories',
                isDropdownOpen: false,
                options: ['Weakest Category', 'Weakest Two Categories', 'Weakest Three Categories'],
              },
              pastChoose: [
                {label: "past 1 month",isActive: true},
                {label: "past 3 months",isActive: false},
                {label: "past 1 year",isActive: false},
                {label: "past 3 years",isActive: false},
                {label: "all",isActive: false},
              ],
            },
            all: {
              ref: 'barChartAllRef',
              isActive: true,
              allData: null,
              allDataRemoved: [],
              mean: true,
              median: true,
              stanDeviation: true,
              variance: true,
              suggest: true,
              outlierValues: [0,100],
              plotCustomize: {
                dropDownActive: false,
                sideBarActive: false,
              },
            },
          },
          scattPlot: {
            label: "Scatter Plot",
            optsOut: false,
            worst: {
              ref: 'scattPlotWorstRef',
              isActive: true,
              worstData: null,
              worstDataRemoved: [],
              mean: true,
              median: true,
              stanDeviation: true,
              variance: true,
              suggest: false,
              outlierValues: [0,100],
              plotCustomize: {
                dropDownActive: false,
                sideBarActive: false,
              },
            },
            all: {
              ref: 'scattPlotAllRef',
              isActive: true,
              allData: null,
              allDataRemoved: [],
              mean: true,
              median: true,
              stanDeviation: true,
              variance: true,
              suggest: true,
              outlierValues: [0,100],
              plotCustomize: {
                dropDownActive: false,
                sideBarActive: false,
              },
            },
          },
          lineChart: {
            label: "Line Chart",
            optsOut: false,
            worst: {
              ref: 'lineChartWorstRef',
              isActive: true,
              worstData: null,
              worstDataRemoved: [],
              mean: true,
              median: true,
              stanDeviation: true,
              variance: true,
              suggest: false,
              outlierValues: [0,100],
              plotCustomize: {
                dropDownActive: false,
                sideBarActive: false,
              },
            },
            all: {
              ref: 'lineChartAllRef',
              isActive: true,
              allData: null,
              allDataRemoved: [],
              mean: true,
              median: true,
              stanDeviation: true,
              variance: true,
              suggest: true,
              outlierValues: [0,100],
              plotCustomize: {
                dropDownActive: false,
                sideBarActive: false,
              },
            },
          },
          pieChart: {
            label: "Pie Chart",
            optsOut: false,
            worst: {
              isActive: true,
              worstData: null,
              worstDataRemoved: [],
              outlierValues: [0,100],
              plotCustomize: {
                dropDownActive: false,
                sideBarActive: false,
              },
            },
            all: {
              isActive: true,
              allData: null,
              allDataRemoved: [],
              outlierValues: [0,100],
              plotCustomize: {
                dropDownActive: false,
                sideBarActive: false,
              },
            },
          },
          radarChart: {
            label: "Radar Chart",
            optsOut: false,
            worst: {
              ref: 'radarChartWorstRef',
              isActive: true,
              worstData: null,
              worstDataRemoved: [],
              suggest: false,
              outlierValues: [0,100],
              plotCustomize: {
                dropDownActive: false,
                sideBarActive: false,
              },
            },
            all: {
              ref: 'radarChartAllRef',
              isActive: true,
              allData: null,
              allDataRemoved: [],
              suggest: true,
              outlierValues: [0,100],
              plotCustomize: {
                dropDownActive: false,
                sideBarActive: false,
              },
            },
          },
          obserComments: {
            label: "Observation + Impression Comments",
            variable: null,
            optsOut: false
          },
          atteSocEmoFunc: {
            label: "Attention, Social & Emotional Functioning",
            variable: null,
            optsOut: false
          },
          riskSum: {
            label: "Risk Summary",
            variable: null,
            optsOut: false
          },
          summConclus: {
            label: "Summary of Conclusion",
            variable: null,
            optsOut: false
          },
          furthTask: {
            label: "Furthur Task + Recommendation",
            variable: null,
            optsOut: false
          },
          accomInstru: {
            label: "Accommodation",
            variable: null,
            optsOut: false
          },
          techDetail: {
            label: "Technology Details",
            variable: null,
            optsOut: false
          },
          testScore: {
            label: "Test Score",
            optsOut: true
          }
        },
        list: [
          {label: 'Subjective scoring (intelligibility, comprehension etc)', ref: 'subScore'},
          {label: 'Bar chart', ref: 'barChart'},
          {label: 'Scatter plot', ref: 'scattPlot'},
          {label: 'Line chart', ref: 'lineChart'},
          {label: 'Pie chart', ref: 'pieChart'},
          {label: 'Radar chart', ref: 'radarChart'},
          {label: 'Additional Comments', ref: 'additComments'},
          {label: 'Category Comments', ref: 'categComments'},
          {label: 'Observations & Impression (for each category typically)', ref: 'obserComments'},
          {label: 'Attention, Emotions & Social Functioning (mood i.e.)', ref: 'atteSocEmoFunc'},
          {label: 'Risk Summary', ref: 'riskSum'},
          {label: 'Summary of Conclusion', ref: 'summConclus'},
          {label: 'Futher testing and Recommendation', ref: 'furthTask'},
          {label: 'Accommodation and Instruction', ref: 'accomInstru'},
          {label: 'Technology details (AAC device i.e.)', ref: 'techDetail'},
          {label: 'Test Score', ref: 'testScore'},
        ],
        dragOptions: {
          animation: 200,
        },
        sliders: {
          data: ['N/A', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
          process: () => [
            [0, 10, { backgroundColor: '#878587' }],
            [10, 50, { backgroundColor: '#E69D95' }],
            [50, 80, { backgroundColor: '#FFF9AA' }],
            [80, 100, { backgroundColor: '#9AE69F' }]
          ],
        },
        showRegVariables: {
          basicInfo: false,
          testScoreDefault: true,
          preview: false,
          modifySubjScore: false,
          prevExtTestAdd: false,
          editProfile: false,
        },
        showNavVariables: {
          showInitInfo: true,
          showConfig: false,
          showTestScore: false,
          showAttention: false,
          showGraphs: false,
          showSummary: false,
          showRootCause: false,
          toggleNavSelect: "showInitInfo",
        },
        listings: {
          accomondations: ["Wheel Chair", "AAC Device"],
          specialists: [
            {name: 'Specialist1', role: 'Role1'}, 
            {name: 'Specialist2', role: 'Role2'}
          ],
          admin: ['Admin1'],
        },
        griddings: {
          prevExtTestName: null,
          prevExtTestScore: null,
          prevExtTestDate: null,
          prevExtTestFiles: [],
          prevExtTest: [],
          gridPrevIntTest: [
            {name: "Name1", score: "80%", date: "5/21/2009", file: ["PDF"]},
            {name: "Name2", score: "95%", date: "1/12/2020", file: ["PDF"]},
            {name: "Name3", score: "62%", date: "11/8/2023", file: ["PDF"]},
            {name: "Name4", score: "5%", date: "7/2/2023", file: ["PDF"]},
          ],
          gridElemDefault: [
            {id: '1', media: {video: ['http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4','http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'], 
            audio: ['https://actions.google.com/sounds/v1/alarms/spaceship_alarm.ogg','https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg'], 
            photo: ['https://www.kasandbox.org/programming-images/avatars/spunky-sam.png','https://www.kasandbox.org/programming-images/avatars/spunky-sam-green.png']}, question: '', pr: '', category: 'category1', note: '', answer: '', score:0},
            {id: '51', media: {video: ['a','b'], audio: ['a','b'], photo: ['a','b']}, question: 'How was your fffffffffffffffffffffffffffffffffffffffffffday?', pr: '2/5/3:00', category: 'category1', note: 'Answered Quickly', answer: 'D: Very Good', score: 1, eeg: '5|3', ecg: 102, emg: '1|4', motSensL: 123, motSensR: 122},
            {id: '51', media: {video: ['a','b'], audio: ['a','b'], photo: ['a','b']}, question: 'How was your fffffffffffffffffffffffffffffffffffffffffffday?', pr: '2/5/3:00', category: 'category1', note: 'Answered Quickly', answer: 'D: Very Good', score: 1, eeg: '5|3', ecg: 102, emg: '1|4', motSensL: 123, motSensR: 122},
            {id: '51', media: {video: ['a','b'], audio: ['a','b'], photo: ['a','b']}, question: 'How was your fffffffffffffffffffffffffffffffffffffffffffday?', pr: '2/5/3:00', category: 'category1', note: 'Answered Quickly', answer: 'D: Very Good', score: 1, eeg: '5|3', ecg: 102, emg: '1|4', motSensL: 123, motSensR: 122},
            {id: '51', media: {video: ['a','b'], audio: ['a','b'], photo: ['a','b']}, question: 'How was your fffffffffffffffffffffffffffffffffffffffffffday?', pr: '2/5/3:00', category: 'category1', note: 'Answered Quickly', answer: 'D: Very Good', score: 1, eeg: '5|3', ecg: 102, emg: '1|4', motSensL: 123, motSensR: 122},
            {id: '51', media: {video: ['a','b'], audio: ['a','b'], photo: ['a','b']}, question: 'How was your fffffffffffffffffffffffffffffffffffffffffffday?', pr: '2/5/3:00', category: 'category1', note: 'Answered Quickly', answer: 'D: Very Good', score: 1, eeg: '5|3', ecg: 102, emg: '1|4', motSensL: 123, motSensR: 122},
            {id: '51', media: {video: ['a','b'], audio: ['a','b'], photo: ['a','b']}, question: 'How was your fffffffffffffffffffffffffffffffffffffffffffday?', pr: '2/5/3:00', category: 'category1', note: 'Answered Quickly', answer: 'D: Very Good', score: 1, eeg: '5|3', ecg: 102, emg: '1|4', motSensL: 123, motSensR: 122},
            {id: '51', media: {video: ['a','b'], audio: ['a','b'], photo: ['a','b']}, question: 'How was your fffffffffffffffffffffffffffffffffffffffffffday?', pr: '2/5/3:00', category: 'category1', note: 'Answered Quickly', answer: 'D: Very Good', score: 1, eeg: '5|3', ecg: 102, emg: '1|4', motSensL: 123, motSensR: 122},
            {id: '51', media: {video: ['a','b'], audio: ['a','b'], photo: ['a','b']}, question: 'How was your fffffffffffffffffffffffffffffffffffffffffffday?', pr: '2/5/3:00', category: 'category1', note: 'Answered Quickly', answer: 'D: Very Good', score: 1, eeg: '5|3', ecg: 102, emg: '1|4', motSensL: 123, motSensR: 122},
            {id: '51', media: {video: ['a','b'], audio: ['a','b'], photo: ['a','b']}, question: 'How was your fffffffffffffffffffffffffffffffffffffffffffday?', pr: '2/5/3:00', category: 'category1', note: 'Answered Quickly', answer: 'D: Very Good', score: 1, eeg: '5|3', ecg: 102, emg: '1|4', motSensL: 123, motSensR: 122},
            {id: '51', media: {video: ['a','b'], audio: ['a','b'], photo: ['a','b']}, question: 'How was your fffffffffffffffffffffffffffffffffffffffffffday?', pr: '2/5/3:00', category: 'category1', note: 'Answered Quickly', answer: 'D: Very Good', score: 1, eeg: '5|3', ecg: 102, emg: '1|4', motSensL: 123, motSensR: 122},
            {id: '51', media: {video: ['a','b'], audio: ['a','b'], photo: ['a','b']}, question: 'How was your fffffffffffffffffffffffffffffffffffffffffffday?', pr: '2/5/3:00', category: 'category1', note: 'Answered Quickly', answer: 'D: Very Good', score: 1, eeg: '5|3', ecg: 102, emg: '1|4', motSensL: 123, motSensR: 122},
            {id: '51', media: {video: ['a','b'], audio: ['a','b'], photo: ['a','b']}, question: 'How was your fffffffffffffffffffffffffffffffffffffffffffday?', pr: '2/5/3:00', category: 'category1', note: 'Answered Quickly', answer: 'D: Very Good', score: 1, eeg: '5|3', ecg: 102, emg: '1|4', motSensL: 123, motSensR: 122},
          ],
          elemCategIndex: 0,
          gridElemCateg: null,
          numberOfCateg: null,
        },
        plotVariables: {
          plotSelect: {
            barChart: {label: "Bar Chart", isActive: false, ref: 'barChart'},
            scattPlot: {label: "Scatter Plot", isActive: false, ref: 'scattPlot'},
            radarChart: {label: "Radar Chart", isActive: false, ref: 'radarChart'},
            pieChart: {label: "Pie Chart", isActive: false, ref: 'pieChart'},
            lineChart: {label: "Line Chart", isActive: false, ref: 'lineChart'}
          },
        },
      }
    },
    created() {
      this.screenWidth = window.innerWidth;
      this.browserInfo = this.getBrowserInfo();
      for (let i = 0; i < this.list.length; i++) {
        this.list[i].letter = `${String.fromCharCode(i+65)}`
      }

      //make array of arrays organized by category
      const data = this.griddings.gridElemDefault;
      this.griddings.gridElemCateg = data.reduce((acc, obj) => {
        const foundCategory = acc.find(group => group[0].category === obj.category);
        if (foundCategory) {
          foundCategory.push(obj);
        } else {
          acc.push([obj]);
        }
        return acc;
      }, []);

      //make griddings
      this.griddings.numberOfCateg = this.griddings.gridElemCateg.length;

      //set variables for each category
      for (let i = 0; i < this.griddings.gridElemCateg.length; i++) {
        this.$set(this.keyToFactor.categComments.list, `categComment` + `${i}`, 
          {variable: null, label: this.griddings.gridElemCateg[i][0].category, optsOut: false}
        );
      }

      //sort by totalscore in ascending order if tie then sort by numofquestions in descending order
      let scoreArray = [];
      let counter;
      for (const item of this.griddings.gridElemCateg) {
        counter = 0;
        for (const element of item) {
          counter = element.score + counter;
        }
        scoreArray.push({name: item[0].category, totalScore: (Math.round((counter/item.length) * 10) / 10)*100, numOfQuestions: item.length});
      }
      scoreArray.sort((a, b) => { 
        if (a.totalScore !== b.totalScore) {
          return a.totalScore - b.totalScore;
        }
        else {
          return b.numOfQuestions - a.numOfQuestions
        }
      });
      //make & set graph data for alldata and worstdata
      let graphDataWorst = [];
      let graphDataWorstRemoved = [];
      let graphDataAll = scoreArray.map(obj => {  //{variable, value}
        return {variable: obj.name, value: obj.totalScore};
      })
      if (scoreArray.length >= 3) {
        graphDataWorst = graphDataAll.slice(0,3);
        graphDataWorstRemoved = graphDataAll.slice(3,scoreArray.length);
      }
      else {
        graphDataWorst = graphDataAll.slice(0,scoreArray.length);
      }
      Object.values(this.plotVariables.plotSelect).forEach(item => {
        this.keyToFactor[item.ref].all.allData = [...graphDataAll];
        this.keyToFactor[item.ref].worst.worstData = [...graphDataWorst];
        this.keyToFactor[item.ref].worst.worstDataRemoved = [...graphDataWorstRemoved];
      });
      this.orderedScoresByCateg = [...graphDataAll];

    },
    watch: {
      'showNavVariables.showGraphs': function(newV) {
        if (newV) {
          for (const key in this.plotVariables.plotSelect) {
            this.plotVariables.plotSelect[key].isActive = false;
          }
        }
      }
    },
    computed: {
      usedDataBarChartAll() {
        let temp = [...this.keyToFactor.barChart.all.allData];
        return temp.filter(element => (element.value >= this.keyToFactor.barChart.all.outlierValues[0] && element.value <= this.keyToFactor.barChart.all.outlierValues[1]));
      },
      removedDataBarChartAll() {
        let temp = [...this.keyToFactor.barChart.all.allDataRemoved];
        return temp.filter(element => (element.value >= this.keyToFactor.barChart.all.outlierValues[0] && element.value <= this.keyToFactor.barChart.all.outlierValues[1]));
      },
      usedDataScattPlotAll() {
        let temp = [...this.keyToFactor.scattPlot.all.allData];
        return temp.filter(element => (element.value >= this.keyToFactor.scattPlot.all.outlierValues[0] && element.value <= this.keyToFactor.scattPlot.all.outlierValues[1]));
      },
      removedDataScattPlotAll() {
        let temp = [...this.keyToFactor.scattPlot.all.allDataRemoved];
        return temp.filter(element => (element.value >= this.keyToFactor.scattPlot.all.outlierValues[0] && element.value <= this.keyToFactor.scattPlot.all.outlierValues[1]));
      },
      usedDataRadarChartAll() {
        let temp = [...this.keyToFactor.radarChart.all.allData];
        return temp.filter(element => (element.value >= this.keyToFactor.radarChart.all.outlierValues[0] && element.value <= this.keyToFactor.radarChart.all.outlierValues[1]));
      },
      removedDataRadarChartAll() {
        let temp = [...this.keyToFactor.radarChart.all.allDataRemoved];
        return temp.filter(element => (element.value >= this.keyToFactor.radarChart.all.outlierValues[0] && element.value <= this.keyToFactor.radarChart.all.outlierValues[1]));
      },
      usedDataPieChartAll() {
        let temp = [...this.keyToFactor.pieChart.all.allData];
        return temp.filter(element => (element.value >= this.keyToFactor.pieChart.all.outlierValues[0] && element.value <= this.keyToFactor.pieChart.all.outlierValues[1]));
      },
      removedDataPieChartAll() {
        let temp = [...this.keyToFactor.pieChart.all.allDataRemoved];
        return temp.filter(element => (element.value >= this.keyToFactor.pieChart.all.outlierValues[0] && element.value <= this.keyToFactor.pieChart.all.outlierValues[1]));
      },
      usedDataLineChartAll() {
        let temp = [...this.keyToFactor.lineChart.all.allData];
        return temp.filter(element => (element.value >= this.keyToFactor.lineChart.all.outlierValues[0] && element.value <= this.keyToFactor.lineChart.all.outlierValues[1]));
      },
      removedDataLineChartAll() {
        let temp = [...this.keyToFactor.lineChart.all.allDataRemoved];
        return temp.filter(element => (element.value >= this.keyToFactor.lineChart.all.outlierValues[0] && element.value <= this.keyToFactor.lineChart.all.outlierValues[1]));
      },

      usedDataBarChartWorst() {
        let temp = [...this.keyToFactor.barChart.worst.worstData];
        let newV = this.keyToFactor.barChart.worst.dropDownWeakest.selectedValue;
        temp = temp.filter(element => (element.value >= this.keyToFactor.barChart.worst.outlierValues[0] && element.value <= this.keyToFactor.barChart.worst.outlierValues[1]));
        temp.sort((a, b) => a.value - b.value);
        if (newV == 'Weakest Category') {
          return temp.slice(0,1);
        }
        else if (newV == 'Weakest Two Categories') {
          return temp.slice(0,2);
        }
        else {
          return temp.slice(0,3);
        }
      },
      removedDataBarChartWorst() {
        let temp = [...this.keyToFactor.barChart.worst.worstDataRemoved];
        return temp.filter(element => (element.value >= this.keyToFactor.barChart.worst.outlierValues[0] && element.value <= this.keyToFactor.barChart.worst.outlierValues[1]));
      },
      usedDataScattPlotWorst() {
        let temp = [...this.keyToFactor.scattPlot.worst.worstData];
        return temp.filter(element => (element.value >= this.keyToFactor.scattPlot.worst.outlierValues[0] && element.value <= this.keyToFactor.scattPlot.worst.outlierValues[1]));
      },
      removedDataScattPlotWorst() {
        let temp = [...this.keyToFactor.scattPlot.worst.worstDataRemoved];
        return temp.filter(element => (element.value >= this.keyToFactor.scattPlot.worst.outlierValues[0] && element.value <= this.keyToFactor.scattPlot.worst.outlierValues[1]));
      },
      usedDataRadarChartWorst() {
        let temp = [...this.keyToFactor.radarChart.worst.worstData];
        return temp.filter(element => (element.value >= this.keyToFactor.radarChart.worst.outlierValues[0] && element.value <= this.keyToFactor.radarChart.worst.outlierValues[1]));
      },
      removedDataRadarChartWorst() {
        let temp = [...this.keyToFactor.radarChart.worst.worstDataRemoved];
        return temp.filter(element => (element.value >= this.keyToFactor.radarChart.worst.outlierValues[0] && element.value <= this.keyToFactor.radarChart.worst.outlierValues[1]));
      },
      usedDataPieChartWorst() {
        let temp = [...this.keyToFactor.pieChart.worst.worstData];
        return temp.filter(element => (element.value >= this.keyToFactor.pieChart.worst.outlierValues[0] && element.value <= this.keyToFactor.pieChart.worst.outlierValues[1]));
      },
      removedDataPieChartWorst() {
        let temp = [...this.keyToFactor.pieChart.worst.worstDataRemoved];
        return temp.filter(element => (element.value >= this.keyToFactor.pieChart.worst.outlierValues[0] && element.value <= this.keyToFactor.pieChart.worst.outlierValues[1]));
      },
      usedDataLineChartWorst() {
        let temp = [...this.keyToFactor.lineChart.worst.worstData];
        return temp.filter(element => (element.value >= this.keyToFactor.lineChart.worst.outlierValues[0] && element.value <= this.keyToFactor.lineChart.worst.outlierValues[1]));
      },
      removedDataLineChartWorst() {
        let temp = [...this.keyToFactor.lineChart.worst.worstDataRemoved];
        return temp.filter(element => (element.value >= this.keyToFactor.lineChart.worst.outlierValues[0] && element.value <= this.keyToFactor.lineChart.worst.outlierValues[1]));
      },
    },
    methods: {
        getBrowserInfo() {
          var ua = navigator.userAgent;
          var name, version;

          if (ua.indexOf("Chrome") !== -1) {
              name = "Google Chrome";
              version = ua.match(/Chrome\/([\d.]+)/)[1];
          } else if (ua.indexOf("Firefox") !== -1) {
              name = "Mozilla Firefox";
              version = ua.match(/Firefox\/([\d.]+)/)[1];
          } else if (ua.indexOf("Safari") !== -1) {
              name = "Safari";
              version = ua.match(/Version\/([\d.]+)/)[1];
          } else if (ua.indexOf("MSIE") !== -1 || ua.indexOf("Trident") !== -1) {
              name = "Internet Explorer";
              version = ua.match(/(?:MSIE |rv:)(\d+(\.\d+)?)/)[1];
          } else {
              name = "Unknown Browser";
              version = "N/A";
          }

          return {
              name: name,
              version: version.trim()
          };
      },
      reDrawGraphs(ref) {
        this.$refs[ref].drawChart();
      },
      toggleAllNavShows(variable) {
        this.showNavVariables.showTestScore = variable === "showTestScore";
        this.showNavVariables.showAttention = variable === "showAttention";
        this.showNavVariables.showSummary = variable === "showSummary";
        this.showNavVariables.showConfig = variable === "showConfig";
        this.showNavVariables.showInitInfo = variable === "showInitInfo";
        this.showNavVariables.showGraphs = variable === "showGraphs";
        this.showNavVariables.showRootCause = variable == "showRootCause";
        this.showNavVariables.toggleNavSelect = variable;
      },
      selectPill(side) {
        if (side == "left") {
          document.getElementById("leftPill").classList.add('selectedPillHalf');
          document.getElementById("rightPill").classList.remove('selectedPillHalf');
          this.showRegVariables.testScoreDefault = true;
        }
        else {
          document.getElementById("leftPill").classList.remove('selectedPillHalf');
          document.getElementById("rightPill").classList.add('selectedPillHalf');
          this.showRegVariables.testScoreDefault = false;
        }
      },
      rotateCategory(direction) {
        function positModulo(dividend, divisor) {
          return ((dividend % divisor) + divisor) % divisor;
        }

        const categArrayLength = this.griddings.gridElemCateg.length;
        if (direction == "left") {
          this.griddings.elemCategIndex = positModulo(this.griddings.elemCategIndex - 1,categArrayLength);
        }
        else {
          this.griddings.elemCategIndex = positModulo(this.griddings.elemCategIndex + 1,categArrayLength);
        }
      },
      showPreview() {
        this.showRegVariables.preview = !this.showRegVariables.preview;
        let tempArray = this.list.filter(element => this.keyToFactor[element.ref].optsOut == false);
        this.listDisplayTextBoxes = tempArray.map(element => this.keyToFactor[element.ref]);
      },
      async downloadPDF() {
        try {
          let pageWidth = 595.276; //A4 pdf
          let leftMargin = 40; //.5555 inches
          let rightMargin = 40; 
          let contentWidth = pageWidth - leftMargin - rightMargin;
          let temp = [];

          let htmlInner = null;
          let ref = null;

          for (const value of this.listDisplayTextBoxes) {
            if (value.label == 'Bar Chart') {
              if (this.keyToFactor.barChart.worst.isActive) {
                temp.push(htmlToPdfmake(`
                  <h6>Bar Chart Worst</h6>
                `))
                ref = document.getElementById('barChartVertPDF').children[0].children[0];

                htmlInner = ref.outerHTML.replace(new RegExp('currentColor', 'g'), 'black');
                temp.push(htmlToPdfmake(htmlInner));
                ref.removeAttribute("viewBox");
              }
              if (this.keyToFactor.barChart.all.isActive) {
                temp.push(htmlToPdfmake(`
                  <h6>Bar Chart All</h6>
                `))
                ref = document.getElementById('barChartHorizPDF').children[0].children[0];
                ref.setAttribute("viewBox", "0 0 2250 500");
                htmlInner = ref.outerHTML.replace(new RegExp('currentColor', 'g'), 'black');
                temp.push(htmlToPdfmake(htmlInner));
                ref.removeAttribute("viewBox");
              }
            }
            else if (value.label == 'Scatter Plot') {
              if (this.keyToFactor.scattPlot.worst.isActive) {
                temp.push(htmlToPdfmake(`
                  <h6>Scatter Plot Worst</h6>
                `))
                ref = document.getElementById('scattPlotWorstPDF').children[0].children[0];
                ref.setAttribute("viewBox", "800 0 800 600");
                htmlInner = ref.outerHTML.replace(new RegExp('currentColor', 'g'), 'black');
                temp.push(htmlToPdfmake(htmlInner));
                ref.removeAttribute("viewBox");
              }
              if (this.keyToFactor.scattPlot.all.isActive) {
                temp.push(htmlToPdfmake(`
                  <h6>Scatter Plot All</h6>
                `))
                ref = document.getElementById('scattPlotAllPDF').children[0].children[0];
                ref.setAttribute("viewBox", "800 0 800 600");
                htmlInner = ref.outerHTML.replace(new RegExp('currentColor', 'g'), 'black');
                temp.push(htmlToPdfmake(htmlInner));
                ref.removeAttribute("viewBox");
              }
            }
            else if (value.label == 'Radar Chart') {
              if (this.keyToFactor.radarChart.worst.isActive) {
                temp.push(htmlToPdfmake(`
                  <h6>Radar Chart Worst</h6>
                `))
                ref = document.getElementById('radarChartWorstPDF').children[0];
                ref.setAttribute("viewBox", "450 0 500 500");
                htmlInner = ref.outerHTML;
                temp.push(htmlToPdfmake(htmlInner));
                ref.removeAttribute("viewBox");
              }
              if (this.keyToFactor.radarChart.all.isActive) {
                temp.push(htmlToPdfmake(`
                  <h6>Radar Chart All</h6>
                `))
                ref = document.getElementById('radarChartAllPDF').children[0];
                ref.setAttribute("viewBox", "450 0 500 500");
                htmlInner = ref.outerHTML;
                temp.push(htmlToPdfmake(htmlInner));
                ref.removeAttribute("viewBox");
              }
            }
            else if (value.label == 'Pie Chart') {
              if (this.keyToFactor.pieChart.worst.isActive) {
                temp.push(htmlToPdfmake(`
                  <h6>Pie Chart Worst</h6>
                `))
                ref = document.getElementById('pieChartWorstPDF').children[0];
                ref.setAttribute("viewBox", "450 0 500 500");
                htmlInner = ref.outerHTML;
                temp.push(htmlToPdfmake(htmlInner));
                ref.removeAttribute("viewBox");
              }
              if (this.keyToFactor.pieChart.all.isActive) {
                temp.push(htmlToPdfmake(`
                  <h6>Pie Chart All</h6>
                `))
                ref = document.getElementById('pieChartAllPDF').children[0];
                ref.setAttribute("viewBox", "600 0 500 500");
                htmlInner = ref.outerHTML;
                temp.push(htmlToPdfmake(htmlInner));
                ref.removeAttribute("viewBox");
              }
            }
            else if (value.label == 'Line Chart') {
              if (this.keyToFactor.lineChart.worst.isActive) {
                temp.push(htmlToPdfmake(`
                  <h6>Line Chart Worst</h6>
                `))
                ref = document.getElementById('lineChartWorstPDF').children[0].children[0];
                ref.setAttribute("viewBox", "800 0 800 600");
                htmlInner = ref.outerHTML.replace(new RegExp('currentColor', 'g'), 'black');
                temp.push(htmlToPdfmake(htmlInner));
                ref.removeAttribute("viewBox");
              }
              if (this.keyToFactor.lineChart.all.isActive) {
                temp.push(htmlToPdfmake(`
                  <h6>Line Chart All</h6>
                `))
                ref = document.getElementById('lineChartAllPDF').children[0].children[0];
                ref.setAttribute("viewBox", "800 0 800 600");
                htmlInner = ref.outerHTML.replace(new RegExp('currentColor', 'g'), 'black');
                temp.push(htmlToPdfmake(htmlInner));
                ref.removeAttribute("viewBox");
              }
            }
            else if (value.label == 'Category Comments') {
              temp.push(htmlToPdfmake(`
                <h6>Category Comments</h6>
              `))
              for (const item in value.list) {
                temp.push(htmlToPdfmake(`
                  <table>
                    <tr>
                      <th style="width: ${contentWidth}">${value.list[item].label}</th>
                    </tr>
                    <tr>
                      <td>
                        <div>${value.list[item].variable}</div>
                      </td>
                    </tr>
                  </table>
                `, {tableAutoSize: true}))
              }
            }
            else if ('variable' in value) {
              temp.push(htmlToPdfmake(`
              <table>
                <tr>
                  <th style="width: ${contentWidth}">${value.label}</th>
                </tr>
                <tr>
                  <td>
                    <div>${value.variable}</div>
                  </td>
                </tr>
              </table>
              `, {tableAutoSize: true}))
            }
            else if (value.label == 'Test Score') {
              temp.push(htmlToPdfmake(`
                <h6>Test Scores</h6>
              `))
              htmlInner = document.getElementById('tableDataPDF').innerHTML;
              temp.push(htmlToPdfmake(htmlInner));
            }
            else if (value.label == 'Subjective Scoring') {
              temp.push(htmlToPdfmake(`
                <div>
                  <h6 style="margin-bottom: 2px">Subjective Scoring</h6>
                  <div style="font-weight: 400">
                    A
                    <span>${this.keyToFactor.subScore.dropDownMood.selectedValue}</span> 
                    <span>${this.preferredName}</span> in 
                    <span>${this.keyToFactor.subScore.dropDownShirtColor.selectedValue}</span> 
                    shirt was seen for evaluation of 
                    <span>${this.appSubtitle}</span>.
                    <span>${this.includeCateg}</span>
                    type questions were included in the screening.
                  </div>
                </div>
              `))
              htmlInner = document.getElementById('subjectiveScorePDF').innerHTML;
              temp.push(htmlToPdfmake(`
                <svg width="${contentWidth}" height="150">
                  ${htmlInner}
                </svg>
              `));
            }
          }
          
          let totalScoreCircle = document.getElementById('totalScoreCirclePDF').innerHTML;
          totalScoreCircle = (htmlToPdfmake(totalScoreCircle));

          let totalScoreTable = document.getElementById('totalScoreTablePDF').innerHTML;
          totalScoreTable = (htmlToPdfmake(totalScoreTable));

          let docDefinition = {
            content: [
              {
                text: "Final Report",
                fontSize: 40,
                alignment: 'center'
              },
/*               {
                columns: [
                  {
                    width: 200,
                    stack: [
                      {
                        image: chartResults[0].toDataURL('image/png'),
                        width: 100,
                        alignment: 'center'
                      },
                      {
                        text: this.preferredName,
                        alignment: 'center',
                        fontSize: 18
                      }
                    ]
                  },
                  {
                    table: {
                      widths: ['*','*'],
                      body: [
                        ['Date of Birth:', 'School:'],
                        ['Sample value 1', 'Sample value 2'],
                        ['Age:', 'Buildings/Room:'],
                        ['Sample value 1', 'Sample value 2'],
                        ['Parent/Guardian', 'Total %'],
                        ['Age:', 'Buildings/Room:'],
                      ]
                    },
                    layout: {
                      fillColor: function (rowIndex) {
                        return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
                      }
                    },
                  }
                ],
                margin: [0, 25]
              }, */
              {
                stack: [
                  {
                    text: "Total Score",
                    alignment: 'center'
                  },
                  {
                    columns: [
                      totalScoreCircle,
                      totalScoreTable
                    ]
                  }
                ]
              },
              temp,
            ]
          }
          pdfMake.createPdf(docDefinition).open()
        } catch (e) {
          console.error('Error', e);
        }
      },
      changePastWorstCateg(label) {
        this.keyToFactor.barChart.worst.pastChoose.forEach(item => {
          item.isActive = item.label === label;
        });
      },
      chooseGraphics(label) {
        const threeRef = document.getElementById('selectWorst3Opt');
        const allRef = document.getElementById('selectAllOpt');

        //categories selection
        if (label === "worse 3" || label === "all") {
          let shortenRef = this.plotVariables.plotSelect;
          for (const item in shortenRef) {
            if (shortenRef[item].isActive && !this.keyToFactor[item].optsOut) {
              if (label === "worse 3") {
                this.keyToFactor[shortenRef[item].ref].worst.isActive = !this.keyToFactor[shortenRef[item].ref].worst.isActive;
                threeRef.classList.toggle('categGraphSelected');
              }
              else {
                this.keyToFactor[shortenRef[item].ref].all.isActive = !this.keyToFactor[shortenRef[item].ref].all.isActive;
                allRef.classList.toggle('categGraphSelected');
              }
              return;
            }
          }
        }
        else {
          //types selection
          let shortenRef = this.plotVariables.plotSelect;
          for (let item in shortenRef) {
            if (shortenRef[item].label === label) {
              if (this.keyToFactor[shortenRef[item].ref].optsOut) {
                return;
              }
            }
            shortenRef[item].isActive = shortenRef[item].label === label;
            if (shortenRef[item].isActive) {
              this.keyToFactor[shortenRef[item].ref].worst.isActive ? threeRef.classList.add('categGraphSelected') : threeRef.classList.remove('categGraphSelected');
              this.keyToFactor[shortenRef[item].ref].all.isActive ? allRef.classList.add('categGraphSelected') : allRef.classList.remove('categGraphSelected');
            }
          }
        }
      },
      toggleGeneralDropDowns(label) {
        if (label == 'mood') {
          this.keyToFactor.subScore.dropDownMood.isDropdownOpen = !this.keyToFactor.subScore.dropDownMood.isDropdownOpen; 
        }
        else if (label == 'shirtColor') {
          this.keyToFactor.subScore.dropDownShirtColor.isDropdownOpen = !this.keyToFactor.subScore.dropDownShirtColor.isDropdownOpen; 
        }
        else if (label == 'weakest') {
          this.keyToFactor.barChart.worst.dropDownWeakest.isDropdownOpen = !this.keyToFactor.barChart.worst.dropDownWeakest.isDropdownOpen; 
        }
      },
      selectOptionGeneral(option, label) {
        if (label == 'mood') {
          this.keyToFactor.subScore.dropDownMood.selectedValue = option; 
          this.keyToFactor.subScore.dropDownMood.isDropdownOpen = false; 
        }
        else if (label == 'shirtColor') {
          this.keyToFactor.subScore.dropDownShirtColor.selectedValue = option; 
          this.keyToFactor.subScore.dropDownShirtColor.isDropdownOpen = false; 
        }
        else if (label == 'barChartWeak3') {
          this.keyToFactor.barChart.worst.dropDownWeakest.selectedValue = option; 
          this.keyToFactor.barChart.worst.dropDownWeakest.isDropdownOpen = false; 
        }
      },
      toggleCustomizeDropDown(plot, type) {
        type == 'worst' ? this.keyToFactor[plot]['worst'].plotCustomize.dropDownActive = !this.keyToFactor[plot]['worst'].plotCustomize.dropDownActive
          : this.keyToFactor[plot]['all'].plotCustomize.dropDownActive = !this.keyToFactor[plot]['all'].plotCustomize.dropDownActive;
      },
      toggleCustomizeSideBar(plot, type) {
        type == 'worst' ? this.keyToFactor[plot]['worst'].plotCustomize.sideBarActive = !this.keyToFactor[plot]['worst'].plotCustomize.sideBarActive
          : this.keyToFactor[plot]['all'].plotCustomize.sideBarActive = !this.keyToFactor[plot]['all'].plotCustomize.sideBarActive;
      },
      checkMoveWorst(e) {
        return e.to.childElementCount >= 3 ? false : null; 
      },
      prevExtTestAddItem() {
        let temp = [...this.griddings.prevExtTest];
        temp.push({name: this.griddings.prevExtTestName, score: this.griddings.prevExtTestScore,
        date: this.griddings.prevExtTestDate, files: [...this.griddings.prevExtTestFiles]});
        this.griddings.prevExtTest = temp;

        this.griddings.prevExtTestName = null;
        this.griddings.prevExtTestScore = null;
        this.griddings.prevExtTestDate = null;
        this.griddings.prevExtTestFiles = [];
      },
      prevExtTestRemoveItem(index) {
        let temp = [...this.griddings.prevExtTest];
        temp.splice(index, 1);
        this.griddings.prevExtTest = temp;
      },
      addFile() {
        let ref = document.getElementById('prevExtTest-file');
        let thereIsDup = false;

        for (const element of this.griddings.prevExtTestFiles) {
          if (ref.files[0].name == element.name ) {
            thereIsDup = true;
            break;
          }
        }
        if (thereIsDup) {
          ref.value = '';
          alert('Files must have different names');
        }
        else {
          this.griddings.prevExtTestFiles.push(ref.files[0])
          ref.value = '';
        }
      },
      removeFile(index) {
        let temp = [...this.griddings.prevExtTestFiles];
        temp.splice(index, 1);
        this.griddings.prevExtTestFiles = temp;
      },
      toggleShowRegVariables(label) {
        if (label == 'basicInfo') {
          this.showRegVariables.basicInfo = !this.showRegVariables.basicInfo;
        }
        else if (label == 'modifySubjScore') {
          this.showRegVariables.modifySubjScore = !this.showRegVariables.modifySubjScore;
        }
        else if (label == 'prevExtTestAdd') {
          this.showRegVariables.prevExtTestAdd = !this.showRegVariables.prevExtTestAdd;
        }
      },
      createObjectURL(file) {
        return URL.createObjectURL(file);
      },
      openModal(name) {
        this.$modal.show(name);
      },
      closeModal(name) {
        this.$modal.hide(name);
      },
      openModelMedia(value, type) {
        if (type == 'video') {
          this.$modal.show(VideoModel, {
            array: value.media.video
          },
          {
            height: 'auto'
          })
        }
        else if (type == 'audio') {
          this.$modal.show(AudioModel, {
            array: value.media.audio
          },
          {
            height: 'auto'
          })
        }
        else if (type == 'photo') {
          this.$modal.show(PhotoModel, {
            array: value.media.photo
          },
          {
            height: 'auto'
          })
        }
      },
      changeProfPic(e) {
        const file = e.target.files[0];
        this.profilePicTemp = URL.createObjectURL(file);
      },
      saveProfPic() {
        this.profilePic = this.profilePicTemp;
      }
    }
  };
</script>

<style lang="scss" scoped>
  $sidebar-width: 300px;
	$reportOrange: #FF9B00;
	$reportOrangeLight: #eecc9a;
  
  .simpleBackground {
    background-color: $reportOrangeLight;
  }


  #container {
    font-family: 'Roboto', sans-serif;
    color: #000000;
    padding-top: 0;
    padding-bottom: 0;
  }

  #main-box {
    margin-left: $sidebar-width;
    padding: 1.5rem;
  }

  /* Navigation */
	#sideBar-box {
    width: $sidebar-width;
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
    overflow: auto;
	}

	.logo {
		width: 50%;
		height: auto;
	}
	.navText:hover {
		opacity: .5;
		background-color: $reportOrange;
	}

  .navText span {
    margin-left: 1rem;
  }

	.navClick {
		background-color: $reportOrange;
    position: relative;
	}

/*   .navClick::before {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: -10px;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 10px solid $reportOrange;
    z-index: 30;
  } */

  .orange-button {
    border: solid black 1px;
    background-color: $reportOrange;
    width: 75%;
    padding: .25rem;
    border-radius: 50rem;
    align-self: center;
    margin: 5px;
  }

  /* TextBox */
  .textBox1, .infoBox, #obserComments, #atteSocEmoFunc, #riskSum, #summConclus,
  #furthTask, #techDetail {
    background-color: $reportOrangeLight;
    border-radius: 8px;
    border: 2px $reportOrange solid;
  }

  #quill-categComment .ql-container {
    height: 60vh;
  }

  #quill-categComment .ql-toolbar {
    background-color:$reportOrangeLight;
    border: 2px $reportOrange solid;
  }

	.textBox1 {
		min-height: 200px;
	}

  .infoBox {
    min-height: 150px;
  }

  .initInfo-infoPill {
    overflow: hidden;
    box-shadow: inset 0px 1px 2px 0px grey;
    background-color: #ECECEC;
  }

  /* Slider */

  .custom-slider-step {
    border-left: 2px solid #8CB7DF;
    height: 10px;
  }

  /* Searchbar */
  .round-search {
    width: 30%;
    border: $reportOrange 2px solid;
    background-color: $reportOrangeLight;
  }

  .round-search input[type="text"] {
    border: none;
    outline: none;
    width: 100%;
    font-size: 12px;
    font-weight: 400;
  }

  /* Category Pill */
  .half-pill {
    display: inline-block;
    height: 30px;
    padding-left: 10px;
    padding-right: 10px;
    cursor: default;
  }

  .left-half {
    border-radius: 15px 0 0 15px;
    border: 2px solid #CCCCCC;
  }

  .right-half {
    border-radius: 0 15px 15px 0;
    border: 2px solid #CCCCCC;
  }

  .selectedPillHalf {
    border: 2px solid $reportOrange;
    background-color: $reportOrangeLight;
  }

  /* Gridding*/
  .gridParent-categ {
    display: grid;
    grid-template-columns: 30% 70%;
  }

  .tableHeader {
    background-color: $reportOrangeLight;
    border: solid $reportOrange 2px;
  }

  .tableHeader th {
    padding: .5rem;
    text-align: center;
  }

  .tableElements {
    border: solid black 1px;
  }

  #prevExtTest-add {
    background-color: $reportOrangeLight;
    border: solid $reportOrange 2px;
  }

  .tableElements-add input::placeholder {
    font-style: italic;
    color: black;
    font-size: .8em;
  }

  .tableElements-add input[type="file"] {
    display: none;
  }

  .tableElements-add label {
    font-size: .8em;
  }

  .tableElements-button {
    background-color: #8CB7DF;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .drag-item {
    cursor: grab;
    font-size: medium;
    display: grid;
    grid-template-columns: 15px auto 25px;
  }

  .drag-item-deactivated {
    cursor: grab;
    display: grid;
    grid-template-columns: 25px auto 25px;
    opacity: .5;
    position: relative;
  }

  .drag-item-deactivated::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    border-top: 1px solid black;
  }

  /* Review Summary */
  .displayCard {
    box-shadow: 0px 2px 2px lightgrey;
    display: inline-flex;
    border-radius: 20px;
    border: solid lightgrey 1px;
  }

  .graphCustomConfig {
    position: absolute;
    left: 10px;
    top: 15px;
  }

  .graphConfigDetails {
    background-color: $reportOrangeLight;
    width: 100px;
    z-index: 20;
    font-weight: 400;
    font-size: small;
  }

  .smallCircleSummary {
    background-color: $reportOrangeLight;
    height: 80px;
    width: 80px;
  }

  .bigCircleSummary {
    background-color: $reportOrangeLight;
    height: 130px;
    width: 130px;
  }

  .radioGrid {
    display: grid;
    grid-template-columns: 150px 150px 150px 150px 150px 150px;
  }

  .categGraphOptions {
    display: inline-block;
    width: 15px;
    height: 15px;
    background-color: #ccc;
  }

  .categGraphSelected {
    background-color: $reportOrange;
  }

  .categGraphOptedOut {
    background-color: #000000;
  }

  .pillSelection {
    font-size: .6em;
    background-color: #D9D9D9;
    width: 450px;
  }

  .pillSelection span {
    flex: 1;
    white-space: nowrap;
    text-align: center;
  }

  .pillSelected {
    background-color: $reportOrangeLight;
  }


  /* dropdown */
  .selected-option {
    padding: 10px;
    border: 1px solid #ccc;
    cursor: pointer;
    font-weight: 400;
    font-size: medium;
    border-radius: 10px;
  }

  .custom-dropdown {
    position: relative;
    display: inline-block;
  }

  .custom-dropdown ul {
    list-style: none;
    margin: 0;
    position: absolute;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 10px;
    z-index: 1;
  }

  .custom-dropdown ul li {
    padding: 10px;
    cursor: pointer;
    font-weight: 400;
    font-size: smaller;
  }

  .custom-dropdown ul li:hover {
    background-color: #f1f1f1;
  }
  /* preview */
  .preview-textBoxes {
    background-color: $reportOrangeLight;
    border-radius: 8px;
    border: 2px $reportOrange solid;
    min-height: 150px;
  }

  .displayCard-preview {
    box-shadow: 0px 2px 2px lightgrey;
    border-radius: 20px;
    border: solid lightgrey 1px;
    height: 250px;
    width: 250px;
  }

  .smallCircle{
    border-radius: 50%;
    background-color: $reportOrange;
    height: 100px;
    width: 100px;
  }

  .preview-InfoLabels {
    font-size: larger
  }

  .preview-InfoText {
    background-color: $reportOrangeLight;
  }

  /* plots DropDowns */
  .plotDrop-container {
    margin-top: 5px;
  }

  .plotDrop-title {
    background-color: $reportOrangeLight;
    border: 2px solid $reportOrange;
    border-radius: 3px;
  }

  .plotDrop-title:hover {
    opacity: .8;
  }

  .plotDrop-body {
    overflow: hidden;
    max-height: 0;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .plotDrop-body-open {
    max-height: 700px;
  }

  .plotDrop-sideBar {
    background-color: rgb(240, 240, 240);
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    font-size: .7em;
    overflow: auto;
  }

  .plotDrop-sideBar-open {
    width: 100%;
    height: 100%;
    max-height: 900px;
  }

  .plotDrop-customizeB {
    text-align: center;
    width: 90%;
    background-color: #D7DCE1;
    border: 2px solid #b1b4b8;
    border-radius: 3px;
  }

  .plotDrop-customizeB:hover {
    opacity: .8;
  }

  .plotDrop-draggable-used {
    flex: 1;
    border: 2px solid $reportOrange;
    border-radius: 5px;
    margin: 5px;
    padding: 10px;
    display: flex;
    flex-direction: column;
  }

  .plotDrop-draggable-removed {
    flex: 1;
    border: 2px solid $reportOrange;
    padding: 10px;
    border-radius: 5px;
    margin: 5px;
    display: flex;
    flex-direction: column;
  }

</style>