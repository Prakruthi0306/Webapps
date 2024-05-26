<template>
  <div id="container" v-if="dataSet != null && applicationData != null">
    <div v-if="currStep == 'area'">
      <section class="sideBar-box">
        <div>
          <h4 class="text-center">
            {{ applicationData.title }}
          </h4>
          <div v-if="editToggle" style="text-align: left">
            <span class="modify-buttons" @click="addtoList('area', true)">
              +
            </span>
            <span class="modify-buttons" @click="removefromList('area', null)">
              -
            </span>
          </div>
        </div>
        <draggable class="sideBar-list" v-model="arrayDataArea" v-bind="{animation: 200}" handle=".draggable-handle">
          <div v-for="(item,index) in arrayDataArea" :key="index" class="draggable-handle">
            <details @click="() => changeIndex('area', index)">
              <summary :class="[index == areaIndex ? 'detailsSelect' : null]">
                <span v-if="editToggle">
                  <input type="text" v-model="item.areaNameTitle" @click="e => preventProp(e)">
                </span>
                <span v-else>
                  {{ item.areaNameTitle }}
                </span>
              </summary>
              <draggable v-model="item.typeNameData" v-bind="{animation: 200}" handle=".draggable-handle">
                <div v-for="(item2,index2) in item.typeNameData" :key="index2" class="draggable-handle">
                  <p class="textHoverSelect" @click="switchStep('type'); changeIndex('area',index); changeIndex('type', index2);">
                    <span v-if="editToggle">
                      <input type="text" v-model="item2.typeNameTitle" @click="e => preventProp(e)">
                    </span>
                    <span v-else>
                      {{ item2.typeNameTitle }}
                    </span>
                  </p>
                </div>
              </draggable>
            </details>
          </div>
        </draggable>
        <button class="orange-button" @click="saveAllData">
          Save All Changes
        </button>
        <button class="orange-button" @click="generate">
          Generate
        </button>
      </section>
      <section class="main-box">
        <button class="editorMode-button" @click="toggleEdit(null)">
          {{ editToggle ? 'Editor Mode' : 'View Mode' }}
          <font-awesome-icon :icon="['fas', 'pencil']" class="pencil-icon" />
        </button>
        <div v-if="arrayDataArea.length > 0">
          <div class="flexBtwCenter">
            <div class="flexCenterCenter">
              <input id="areaNameTitleInput" type="text" :disabled="!editToggle" v-model="dataSet[areaIndex].areaNameTitle">
            </div>
            <div style="font-size: 30px;">
              <span :class="[formatType=='grid'?'formatIcons':null, 'p-1']" @click="formatType = 'grid'"><font-awesome-icon :icon="['fas', 'table-cells']" /></span>
              <span :class="[formatType!='grid'?'formatIcons':null, 'p-1']" @click="formatType = 'list'"><font-awesome-icon :icon="['fas', 'table-list']" /></span>
            </div>
          </div>
          <textarea id="areaNameDescripInput" rows="4" type="text" :disabled="!editToggle" v-model="dataSet[areaIndex].areaNameDescription" class="descripText w-100" style="resize: none;"></textarea>
          <div v-if="editToggle" style="text-align: left">
            <span class="modify-buttons" @click="addtoList('type', false)">
              +
            </span>
          </div>
          <div v-if="formatType == 'grid'" class="grid-container">
            <div v-for="(item,index) in arrayDataType" @click="switchStep('type'); changeIndex('type', index)" :key="index" class="list-box">
              <h5>
                {{ item.typeNameTitle }}
              </h5>
              <div class="descripText" style="font-size: .8em;">
                {{ item.typeNameDescription }}
              </div>
              <div v-if="editToggle">
                <font-awesome-icon :icon="['far', 'pen-to-square']" @click="e => {preventProp(e);switchStep('type');toggleEdit(true);changeIndex('question', index)}"/>
                <font-awesome-icon :icon="['far', 'trash-can']" @click="e => {preventProp(e);removefromList('type',index)}"/>
              </div>
            </div>
          </div>
          <div v-else class="mt-5">
            <div v-for="(item,index) in arrayDataType" :key="index">
              <div @click.stop="showDropdown(index); changeIndex('type', index)" class="styleList-container">
                <span>{{ item.typeNameTitle }}</span>
                <div class="descripText ml-2 mr-2" style="flex: 1; font-size: .8em;">
                  {{ item.typeNameDescription }}
                </div>
                <span>
                  <span v-if="editToggle">
                    <font-awesome-icon :icon="['far', 'pen-to-square']" class="mr-2" @click="e => {preventProp(e);switchStep('type');toggleEdit(true);changeIndex('question', index)}"/>
                    <font-awesome-icon :icon="['far', 'trash-can']" class="mr-2" @click="e => {preventProp(e);removefromList('type',index)}"/>
                  </span>
                  <font-awesome-icon :icon="['fas', 'caret-down']" class="mr-2"/>
                </span>
              </div>
              <div :id="`${index}-typeName`" class="visibility">
                <div v-for="(subItem, subIndex) in item.categoryNameData" @click="switchStep('categ'); changeIndex('categ', subIndex)" :key="subIndex" class="ml-5" style="font-size: .8em;">
                  <span class="textHoverSelect">{{ subItem.categoryNameTitle }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div v-else-if="currStep == 'type'">
      <section class="sideBar-box">
        <div>
          <h4 class="text-center">
            <font-awesome-icon :icon="['fas', 'caret-left']" @click="switchStep('area')"/> 
            Application Name 1
          </h4>
          <div v-if="editToggle" style="text-align: left">
            <span class="modify-buttons" @click="addtoList('type', true)">
              +
            </span>
            <span class="modify-buttons" @click="removefromList('type', null)">
              -
            </span>
          </div>
        </div>
        <draggable class="sideBar-list" v-model="arrayDataType" v-bind="{animation: 200}" handle=".draggable-handle">
          <div v-for="(item,index) in arrayDataType" :key="index" class="draggable-handle">
            <details @click="() => changeIndex('type', index)">
              <summary :class="[index == typeIndex ? 'detailsSelect' : null]">
                <span v-if="editToggle">
                  <input type="text" v-model="item.typeNameTitle" @click="e => preventProp(e)">
                </span>
                <span v-else>
                  {{ item.typeNameTitle }}
                </span>
              </summary>
              <draggable v-model="item.categoryNameData" v-bind="{animation: 200}" handle=".draggable-handle">
                <div v-for="(item2,index2) in item.categoryNameData" :key="index2" class="draggable-handle">
                  <p class="textHoverSelect" @click="switchStep('categ'); changeIndex('type',index); changeIndex('categ', index2)">
                    <span v-if="editToggle">
                      <input type="text" v-model="item2.categoryNameTitle" @click="e => preventProp(e)">
                    </span>
                    <span v-else>
                      {{ item2.categoryNameTitle }}
                    </span>
                  </p>
                </div>
              </draggable>
            </details>
          </div>
        </draggable>
        <button class="orange-button" @click="saveAllData">
          Save All Changes
        </button>
        <button class="orange-button" @click="generate">
          Generate
        </button>
      </section>
      <section class="main-box">
        <button class="editorMode-button" @click="toggleEdit(null)">
          {{ editToggle ? 'Editor Mode' : 'View Mode' }}
          <font-awesome-icon :icon="['fas', 'pencil']" style="color: grey; display: inline;" />
        </button>
        <div v-if="arrayDataType.length > 0">
          <div class="flexBtwCenter">
            <div class="flexCenterCenter">
              <input id="typeNameTitleInput" type="text" :disabled="!editToggle" v-model="arrayDataType[typeIndex].typeNameTitle">
            </div>
            <div style="font-size: 30px;">
              <span :class="[formatType=='grid'?'formatIcons':null, 'p-1']" @click="formatType = 'grid'"><font-awesome-icon :icon="['fas', 'table-cells']" /></span>
              <span :class="[formatType!='grid'?'formatIcons':null, 'p-1']" @click="formatType = 'list'"><font-awesome-icon :icon="['fas', 'table-list']" /></span>
            </div>
          </div>
          <textarea id="typeNameDescripInput" rows="4" type="text" :disabled="!editToggle" v-model="arrayDataType[typeIndex].typeNameDescription" class="descripText"></textarea>
          <div v-if="editToggle" style="text-align: left">
            <span class="modify-buttons" @click="addtoList('categ', false)">
              +
            </span>
          </div>
          <div v-if="formatType == 'grid'" class="grid-container">
            <div v-for="(item,index) in arrayDataCateg" @click="switchStep('categ');changeIndex('categ', index)" :key="index" class="list-box">
              <h5>
                {{ item.categoryNameTitle }}
              </h5>
              <div class="descripText" style="font-size: .8em;">
                {{ item.categoryNameDescription }}
              </div>
              <div v-if="editToggle">
                <font-awesome-icon :icon="['far', 'pen-to-square']" @click="e => {preventProp(e);switchStep('categ');toggleEdit(true)}"/>
                <font-awesome-icon :icon="['far', 'trash-can']" @click="e => {preventProp(e);removefromList('categ',index)}"/>
              </div>
            </div>
          </div>
          <div v-else class="mt-5">
            <div v-for="(item,index) in arrayDataCateg" :key="index">
              <div @click.stop="showDropdown(index); changeIndex('categ', index)" class="styleList-container">
                <span>{{ item.categoryNameTitle }}</span>
                <div class="descripText ml-2 mr-2" style="flex: 1; font-size: .8em;">
                  {{ item.categoryNameDescription }}
                </div>
                <span>
                  <span v-if="editToggle">
                    <font-awesome-icon :icon="['far', 'pen-to-square']" class="mr-2" @click="e => {preventProp(e);switchStep('categ');toggleEdit(true)}"/>
                    <font-awesome-icon :icon="['far', 'trash-can']" class="mr-2" @click="e => {preventProp(e);removefromList('categ',index)}"/>
                  </span>
                  <font-awesome-icon :icon="['fas', 'caret-down']" class="mr-2"/>
                </span>
              </div>
              <div :id="`${index}-typeName`" class="visibility">
                <div v-for="(subItem, subIndex) in item.subCategoryNameData" @click="switchStep('subCateg'); changeIndex('subCateg', subIndex)" :key="subIndex" class="ml-5" style="font-size: .8em;">
                  <span class="textHoverSelect">{{ subItem.subCategoryNameTitle }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div v-else-if="currStep == 'categ'">
      <section class="sideBar-box">
        <div>
          <h4 class="text-center">
            <font-awesome-icon :icon="['fas', 'caret-left']" @click="switchStep('type')"/> 
            Application Name 1
          </h4>
          <div v-if="editToggle" style="text-align: left">
            <span class="modify-buttons" @click="addtoList('categ', true)">
              +
            </span>
            <span class="modify-buttons" @click="removefromList('categ', null)">
              -
            </span>
          </div>
        </div>
        <draggable class="sideBar-list" v-model="arrayDataCateg" v-bind="{animation: 200}" handle=".draggable-handle">
          <div v-for="(item,index) in arrayDataCateg" :key="index" class="draggable-handle">
            <details @click="/* do not remove */() => changeIndex('categ', index)">
              <summary :class="[index == categIndex ? 'detailsSelect' : null]">
                <span v-if="editToggle">
                  <input type="text" v-model="item.categoryNameTitle" @click="e => preventProp(e)">
                </span>
                <span v-else>
                  {{ item.categoryNameTitle }}
                </span>
              </summary>
              <draggable v-model="item.subCategoryNameData" v-bind="{animation: 200}" handle=".draggable-handle">
                <div v-for="(item2,index2) in item.subCategoryNameData" :key="index2" class="draggable-handle">
                  <p class="textHoverSelect" @click="switchStep('subCateg'); changeIndex('categ',index); changeIndex('subCateg', index2)">
                    <span v-if="editToggle">
                      <input type="text" v-model="item2.subCategoryNameTitle" @click="e => preventProp(e)">
                    </span>
                    <span v-else>
                      {{ item2.subCategoryNameTitle }}
                    </span>
                  </p>
                </div>
              </draggable>
            </details>
          </div>
        </draggable>
        <button class="orange-button" @click="() => saveAllData()">
          Save
        </button>
        <button class="orange-button" @click="() => generate()">
          Generate
        </button>
      </section>
      <section class="main-box">
        <button class="editorMode-button" @click="toggleEdit(null)">
          {{ editToggle ? 'Editor Mode' : 'View Mode' }}
          <font-awesome-icon :icon="['fas', 'pencil']" class="pencil-icon" />
        </button>
        <div v-if="arrayDataCateg.length > 0">
          <div class="d-flex justify-content-between">
            <div class="d-flex align-items-center">
              <input id="categoryNameTitleInput" type="text" :disabled="!editToggle" v-model="arrayDataCateg[categIndex].categoryNameTitle">
            </div>
            <div style="font-size: 30px;">
              <span :class="[formatType=='grid'?'formatIcons':null, 'p-1']" @click="formatType = 'grid'"><font-awesome-icon :icon="['fas', 'table-cells']" /></span>
              <span :class="[formatType!='grid'?'formatIcons':null, 'p-1']" @click="formatType = 'list'"><font-awesome-icon :icon="['fas', 'table-list']" /></span>
            </div>
          </div>
          <textarea id="categoryNameDescripInput" rows="4" type="text" :disabled="!editToggle" v-model="arrayDataCateg[categIndex].categoryNameDescription" class="descripText w-100" style="resize: none;"></textarea>
          <div v-if="editToggle" style="text-align: left">
            <span class="modify-buttons" @click="addtoList('subCateg', false)">
              +
            </span>
          </div>
          <div v-if="formatType == 'grid'" class="grid-container">
            <div v-for="(item,index) in arrayDataSubCateg" @click="switchStep('subCateg'); changeIndex('subCateg', index)" :key="index" class="list-box">
              <h5>
                {{ item.subCategoryNameTitle }}
              </h5>
              <div class="descripText" style="font-size: .8em;">
                {{ item.subCategoryDescription }}
              </div>
              <div v-if="editToggle">
                <font-awesome-icon :icon="['far', 'pen-to-square']" @click="e => {preventProp(e);switchStep('subCateg');toggleEdit(true)}"/>
                <font-awesome-icon :icon="['far', 'trash-can']" @click="e => {preventProp(e);removefromList('subCateg',index)}"/>
              </div>
            </div>
          </div>
          <div v-else class="mt-5">
            <div v-for="(item,index) in arrayDataSubCateg" :key="index">
              <div @click.stop="showDropdown(index); changeIndex('subCateg', index)" class="styleList-container">
                <span>{{ item.subCategoryNameTitle }}</span>
                <div class="descripText ml-2 mr-2" style="flex: 1; font-size: .8em;">
                  {{ item.subCategoryDescription }}
                </div>
                <span>
                  <span v-if="editToggle">
                    <font-awesome-icon :icon="['far', 'pen-to-square']" class="mr-2" @click="e => {preventProp(e);switchStep('subCateg');toggleEdit(true)}"/>
                    <font-awesome-icon :icon="['far', 'trash-can']" class="mr-2" @click="e => {preventProp(e);removefromList('subCateg',index)}"/>
                  </span>
                  <font-awesome-icon :icon="['fas', 'caret-down']" class="mr-2"/>
                </span>
              </div>
              <div :id="`${index}-typeName`" class="visibility">
                <div v-for="(subItem, subIndex) in item.questionData" @click="switchStep('question');changeIndex('question', subIndex)" :key="subIndex" class="ml-5" style="font-size: .8em;">
                  <span class="textHoverSelect">{{ subItem.questionNameTitle }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div v-else-if="currStep == 'subCateg'">
      <section class="sideBar-box">
        <div>
          <h4 class="text-center">
            <font-awesome-icon :icon="['fas', 'caret-left']" @click="switchStep('categ')"/> 
            Application Name 1
          </h4>
          <div v-if="editToggle" style="text-align: left">
            <span class="modify-buttons" @click="addtoList('subCateg', true)">
              +
            </span>
            <span class="modify-buttons" @click="removefromList('subCateg', null)">
              -
            </span>
          </div>
        </div>
        <draggable class="sideBar-list" v-model="arrayDataSubCateg" v-bind="{animation: 200}" handle=".draggable-handle">
          <div v-for="(item,index) in arrayDataSubCateg" :key="index">
            <details @click="/* do not remove */() => changeIndex('subCateg', index)">
              <summary :class="[index == subCategIndex ? 'detailsSelect' : null]">
                <span v-if="editToggle">
                  <input type="text" v-model="item.subCategoryNameTitle" @click="e => preventProp(e)">
                </span>
                <span v-else>
                  {{ item.subCategoryNameTitle }}
                </span>
              </summary>
              <draggable v-model="item.questionData" v-bind="{animation: 200}" handle=".draggable-handle">
                <div v-for="(item2,index2) in item.questionData" :key="index2" class="draggable-handle">
                  <p class="textHoverSelect" @click="switchStep('question'); changeIndex('subCateg',index); changeIndex('question', index2)">
                    <span v-if="editToggle">
                      <input type="text" v-model="item2.questionNameTitle" @click="e => preventProp(e)">
                    </span>
                    <span v-else>
                      {{ item2.questionNameTitle }}
                    </span>
                  </p>
                </div>
              </draggable>
            </details>
          </div>
        </draggable>
        <button class="orange-button" @click="saveAllData">
          Save All Changes
        </button>
        <button class="orange-button" @click="generate">
          Generate
        </button>
      </section>
      <section class="main-box">
        <button class="editorMode-button" @click="toggleEdit(null)">
          {{ editToggle ? 'Editor Mode' : 'View Mode' }}
          <font-awesome-icon :icon="['fas', 'pencil']" class="pencil-icon" />
        </button>
        <div v-if="arrayDataSubCateg.length > 0">
          <div class="d-flex justify-content-between">
            <div class="d-flex align-items-center">
              <input id="subCategoryNameTitleInput" type="text" :disabled="!editToggle" v-model="arrayDataSubCateg[subCategIndex].subCategoryNameTitle">
            </div>
            <div style="font-size: 30px;">
              <span :class="[formatType=='grid'?'formatIcons':null, 'p-1']" @click="formatType = 'grid'"><font-awesome-icon :icon="['fas', 'table-cells']" /></span>
              <span :class="[formatType!='grid'?'formatIcons':null, 'p-1']" @click="formatType = 'list'"><font-awesome-icon :icon="['fas', 'table-list']" /></span>
            </div>
          </div>
          <textarea id="subCategoryNameDescripInput" rows="4" type="text" :disabled="!editToggle" v-model="arrayDataSubCateg[subCategIndex].subCategoryDescription" class="descripText w-100" style="resize: none;"></textarea>
          <div v-if="editToggle" style="text-align: left">
            <span class="modify-buttons" @click="addtoList('question', false)">
              +
            </span>
          </div>
          <div v-if="formatType == 'grid'" class="grid-container">
            <div v-for="(item,index) in arrayDataQuestion" @click="switchStep('question');changeIndex('question', index)" :key="index" class="list-box">
              <h5>
                {{ item.questionNameTitle }}
              </h5>
              <div class="descripText" style="font-size: .8em;">
                {{ item.questionNameDescription }}
              </div>
              <div v-if="editToggle">
                <font-awesome-icon :icon="['far', 'pen-to-square']" @click="e => {preventProp(e);switchStep('question');toggleEdit(true)}"/>
                <font-awesome-icon :icon="['far', 'trash-can']" @click="e => {preventProp(e);removefromList('question',index)}"/>
              </div>
            </div>
          </div>
          <div v-else class="mt-5">
            <div v-for="(item,index) in arrayDataQuestion" :key="index">
              <div @click="switchStep('question'); changeIndex('question', index)" class="styleList-container">
                <span>{{ item.questionNameTitle }}</span>
                <div class="descripText ml-2 mr-2" style="flex: 1; font-size: .8em;">
                  {{ item.questionNameDescription }}
                </div>
                <span v-if="editToggle">
                  <font-awesome-icon :icon="['far', 'pen-to-square']" class="mr-2" @click="e => {preventProp(e);switchStep('question');toggleEdit(true)}"/>
                  <font-awesome-icon :icon="['far', 'trash-can']" class="mr-2" @click="e => {preventProp(e);removefromList('question',index)}"/>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div v-else-if="currStep == 'question'">
      <div class="modal-overlay-screen" id="modal-child-format">
        <span class="modal-content-screen">
          <h3>Format</h3>
          <table>
            <tr>
              <td>Number of Child Images</td>
              <td>
                <input type="number" v-model="arrayDataQuestion[questionIndex].numberChildImages" @change="numberFormatImageChange(arrayDataQuestion[questionIndex], 'childImagesConfig', arrayDataQuestion[questionIndex].numberChildImages)" min="0" max="12" :disabled="!editToggle">
              </td>
            </tr>
            <tr>
              <td>
                Child Images:
              </td>
              <td>
                <div v-for="(childImage, index2) in arrayDataQuestion[questionIndex].childImagesConfig" :key="index2">
                  <label :for="`childImage-${index2+1}`" class="custom-label-group">
                    <span v-if="childImage.file == null">
                      Image <font-awesome-icon :icon="['fas', 'file-arrow-up']" />
                    </span>
                    <span v-else>
                      {{ childImage.file.name }}
                    </span>
                    <input type="file" :id="`childImage-${index2+1}`" @change="e => handleFileChangeObject(e, childImage, 'file')" accept=".jpg, .jpeg, .png, .gif" :disabled="!editToggle">
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                Number of Child Buttons:
              </td>
              <td>
                <input type="number" v-model="arrayDataQuestion[questionIndex].numberChildButtons" @change="numberFormatButtonChange(arrayDataQuestion[questionIndex], 'childButtonsConfig', arrayDataQuestion[questionIndex].numberChildButtons)" min="0" max="12" :disabled="!editToggle">
              </td>
            </tr>
            <tr>
              <td>
                Child Buttons:
              </td>
              <td>
                <div v-for="(childButton, index2) in arrayDataQuestion[questionIndex].childButtonsConfig" :key="index2">
                  Text: <input type="text" v-model="childButton.text" :disabled="!editToggle">
                  <label :for="`childImageButton-${index2+1}`" class="custom-label-group">
                    <span v-if="childButton.file == null">
                      Image <font-awesome-icon :icon="['fas', 'file-arrow-up']" />
                    </span>
                    <span v-else>
                      {{ childButton.file.name }}
                    </span>
                    <input type="file" :id="`childImageButton-${index2+1}`" @change="e => handleFileChangeObject(e, childButton, 'file')" accept=".jpg, .jpeg, .png, .gif" :disabled="!editToggle">
                  </label>
                </div>
              </td>
            </tr>
          </table>
          <div>
            <div
              :style="{
                position: 'relative',
                background: 'linear-gradient(-90deg, rgba(0, 0, 0, .1) 1px, transparent 1px), linear-gradient(rgba(0, 0, 0, .1) 1px, transparent 1px)',
                backgroundSize: '20px 20px, 20px 20px',
                width: `804px`,
                height: `640px`,
              }"
              class="border-color-primary"
              id="modal-child-format-screen"
            >

              <vue-draggable-resizable
                v-for="(image, index2) in arrayDataQuestion[questionIndex].childImagesConfig" :key="`image-${index2}`"
                :grid="[20, 20]"
                :x="image.x"
                :y="image.y"
                :w="image.width"
                :h="image.height"
                :parent="true"
                style="background-color: #FF9B00;"
                @dragstop="(left, top) => draggingChange(left, top, image)"
                @resizestop="(left, top, width, height) => resizeChange(width, height, image)"
              >
                <img :src="getImageFileSrc(image.file)" width="100%" height="100%">
              </vue-draggable-resizable>

              <vue-draggable-resizable
                v-for="(button, index2) in arrayDataQuestion[questionIndex].childButtonsConfig" :key="`button-${index2}`"
                :grid="[20, 20]"
                :x="button.x"
                :y="button.y"
                :w="button.width"
                :h="button.height"
                :parent="true"
                @dragstop="(left, top) => draggingChange(left, top, button)"
                @resizestop="(left, top, width, height) => resizeChange(width, height, button)"
                style="position: relative"
              >
                <img :src="getImageFileSrc(button.file)" width="100%" height="100%">
                <div style="position: absolute; top: 0; left: 0; word-wrap: break-word; width: 100%;">{{ button.text }}</div>
              </vue-draggable-resizable>
            </div>
          </div>
          <button @click="closeModal('modal-child-format')" class="mt-3">Close</button>
        </span>
      </div>
      <section class="sideBar-box">
        <div>
          <h4 class="text-center">
            <font-awesome-icon :icon="['fas', 'caret-left']" @click="switchStep('subCateg')"/> 
            Application Name 1
          </h4>
          <div v-if="editToggle" style="text-align: left">
            <span class="modify-buttons" @click="addtoList('question', true)">
              +
            </span>
            <span class="modify-buttons" @click="removefromList('question', null)">
              -
            </span>
          </div>
        </div>
        <draggable class="sideBar-list" v-model="arrayDataQuestion" v-bind="{animation: 200}" handle=".draggable-handle">
          <div v-for="(item,index) in arrayDataQuestion" :key="index" class="draggable-handle">
            <input type="text" v-model="item.questionNameTitle" :disabled="!editToggle" @click="e => preventProp(e)">
          </div>
        </draggable>
        <button class="orange-button" @click="switchStep('preview'); previewTimingPack(arrayDataQuestion[questionIndex], true); formatForNewResolution('preview-screen-specialist')">
          Preview
          <font-awesome-icon :icon="['fas', 'eye']" />
        </button>
        <button class="orange-button" @click="saveAllData">
          Save All Changes
        </button>
        <button class="orange-button" @click="generate">
          Generate
        </button>
      </section>
      <section class="main-box">
        <div class="d-flex justify-content-between mb-5">
          <button class="editorMode-button" @click="toggleEdit(null)">
            {{ editToggle ? 'Editor Mode' : 'View Mode' }}
            <font-awesome-icon :icon="['fas', 'pencil']" class="pencil-icon" />
          </button>
        </div>
        <div v-for="(item,index) in arrayDataQuestion" :key="index">
          <div @click.stop="showDropdown(index); changeIndex('question', index)" class="styleList-container">
            <span>{{ item.questionNameTitle }}</span>
            <div class="descripText ml-2 mr-2" style="flex: 1; font-size: .8em;">
              {{ item.questionNameDescription }}
            </div>
            <span>
              <font-awesome-icon :icon="['far', 'clipboard']" class="mr-2"/>
              <font-awesome-icon :icon="['far', 'folder']" class="mr-2"/>
              <span v-if="editToggle">
                <font-awesome-icon :icon="['far', 'trash-can']" class="mr-2" @click="e => {preventProp(e);removefromList('question',index)}"/>
              </span>
              <font-awesome-icon :icon="['fas', 'caret-down']" class="mr-2"/>
            </span>
          </div>
          <div :id="`${index}-typeName`" class="question-dropdown question-config visibility">
            <table>
              <colgroup>
                <col style="width: 20%;">
                <col style="width: 80%;">
              </colgroup>
              <tbody>
                <tr>
                  <td>
                    Question ID:
                  </td>
                  <td>
                    <span>
                      . . .{{ item.questionID.slice(-4) }}
                      <img src="../images/icons_svg/general/checkmark.svg" width="20px" height="auto"/>
                    </span>
                    <label>
                      Custom QID:
                      <input type="text" v-model="item.customQID" :disabled="!editToggle">
                    </label>
                    Background Color:
                    <label :for="`backColor-picker-${item.questionID}`" class="custom-label-group">
                      {{ item.backgroundColor }}
                      <img src="../images/icons_svg/general/color-picker.svg" />
                      <input :id="`backColor-picker-${item.questionID}`" v-model="item.backgroundColor" type="color" :disabled="!editToggle">
                    </label>
                    <label>
                      Transparent:
                      <input type="checkbox" v-model="item.transparent" :disabled="!editToggle">
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>
                    Question:
                  </td>
                  <td>
                    <input type="text" v-model="item.questionNameTitle" :disabled="!editToggle">
                  </td>
                </tr>
                <tr>
                  <td>
                    Description:
                  </td>
                  <td>
                    <textarea v-model="item.questionNameDescription" :disabled="!editToggle"></textarea>
                  </td>
                </tr>
                <tr>
                  <td>
                    Procedure:
                  </td>
                  <td>
                    <textarea v-model="item.procedure" :disabled="!editToggle"></textarea>
                  </td>
                </tr>
                <tr>
                  <td>
                    Specialist Prompt:
                  </td>
                  <td>
                    <input type="text" v-model="item.specialistPrompt" :disabled="!editToggle">
                  </td>
                </tr>
                <tr>
                  <td>
                    Upload Intro:
                  </td>
                  <td>
                    <label :for="`uploadIntro-${item.questionID}`" class="custom-label-group">
                      <span v-if="item.uploadIntro == null">
                        Text/Video Clip/Image <font-awesome-icon :icon="['fas', 'file-arrow-up']" />
                      </span>
                      <span v-else>
                        {{ item.uploadIntro.name }}
                      </span>
                      <input :id="`uploadIntro-${item.questionID}`" :disabled="!editToggle" type="file" @change="e => handleFileChangeObject(e, item, 'uploadIntro')" >
                    </label>
                    <label>
                      Intro Description:
                      <label :for="`introDescription-${item.questionID}`" class="custom-label-group">
                        <span v-if="item.introDescription == null">
                          Text <font-awesome-icon :icon="['fas', 'file-arrow-up']" />
                        </span>
                        <span v-else>
                          {{ item.introDescription.name }}
                        </span>
                        <input :id="`introDescription-${item.questionID}`" :disabled="!editToggle" type="file" @change="e => handleFileChangeObject(e, item, 'introDescription')">
                      </label>
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>
                    Closure:
                  </td>
                  <td>
                    <label :for="`closure-${item.questionID}`" class="custom-label-group">
                      <span v-if="item.closure == null">
                        Text/Video Clip/Image <font-awesome-icon :icon="['fas', 'file-arrow-up']" />
                      </span>
                      <span v-else>
                        {{ item.closure.name }}
                      </span>
                      <input :id="`closure-${item.questionID}`" :disabled="!editToggle" type="file" @change="e => handleFileChangeObject(e, item, 'closure')">
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>
                    Request Instruction Video:
                  </td>
                  <td>
                    <label>
                      <label :for="`requestInstructionVideo-${item.questionID}`" class="custom-label-group">
                        <span v-if="item.requestInstructionVideo == null">
                          Upload  
                        </span>
                        <span v-else>
                          {{ item.requestInstructionVideo.name }}
                        </span>
                         <font-awesome-icon :icon="['fas', 'file-arrow-up']" />
                        <input :id="`requestInstructionVideo-${item.questionID}`" :disabled="!editToggle" type="file" @change="e => handleFileChangeObject(e, item, 'requestInstructionVideo')">
                      </label>
                    </label>
                    <label>
                      Request Main Image:
                      <label :for="`requestMainImage-${item.questionID}`" class="custom-label-group">
                        <span v-if="item.requestMainImage == null">
                          Upload <font-awesome-icon :icon="['fas', 'file-arrow-up']" />
                        </span>
                        <span v-else>
                          {{ item.requestMainImage.name }}
                        </span>
                        <input :id="`requestMainImage-${item.questionID}`" :disabled="!editToggle" type="file" @change="e => handleFileChangeObject(e, item, 'requestMainImage')">
                      </label>
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>
                    Request Create Intro:
                  </td>
                  <td>
                    <select v-model="item.requestCreateIntro" :disabled="!editToggle">
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    <label>
                      Request Create Closure:
                      <select v-model="item.requestCreateClosure" :disabled="!editToggle">
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>
                    Type of Answers:
                  </td>
                  <td>
                    <select v-model="item.typeOfAnswer" :disabled="!editToggle">
                      <option value="Multiple Choice">Multiple Choice</option>
                      <option value="Select One">Select One</option>
                      <option value="Verbal">Verbal</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    Number of Specialist Buttons:
                  </td>
                  <td>
                    <input type="number" v-model="arrayDataQuestion[questionIndex].numberSpecialistButtons" @change="numberFormatButtonChange(arrayDataQuestion[questionIndex], 'specialistButtonsConfig', arrayDataQuestion[questionIndex].numberSpecialistButtons)" min="0" max="12" :disabled="!editToggle">
                  </td>
                </tr>
                <tr>
                  <td>
                    Specialist Buttons:
                  </td>
                  <td>
                    <div v-for="(specialButton, index2) in arrayDataQuestion[questionIndex].specialistButtonsConfig" :key="index2">
                      Text: <input type="text" v-model="specialButton.text" :disabled="!editToggle">
                      <label :for="`specialistImageButton-${index2+1}`" class="custom-label-group">
                        <span v-if="specialButton.file == null">
                          Image <font-awesome-icon :icon="['fas', 'file-arrow-up']" />
                        </span>
                        <span v-else>
                          {{ specialButton.file.name }}
                        </span>
                        <input type="file" :id="`specialistImageButton-${index2+1}`" @change="e => handleFileChangeObject(e, specialButton, 'file')" accept=".jpg, .jpeg, .png, .gif" :disabled="!editToggle">
                      </label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    Child View Format
                  </td>
                  <td>
                    <button @click="openModal('modal-child-format');formatForNewResolution('modal-child-format-screen')" class="white-pill-button" :disabled="!editToggle">Format</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    Default Options:
                  </td>
                  <td>
                    <select v-model="item.defaultOptions" :disabled="!editToggle">
                      <option value="Unsure/Confident/Unresponsive">Unsure/Confident/Unresponsive</option>
                      <option value="Unsure/Confident">Unsure/Confident</option>
                      <option value="Unsure/Unresponsive">Unsure/Unresponsive</option>
                      <option value="Confident/Unresponsive">Confident/Unresponsive</option>
                      <option value="Unsure">Unsure</option>
                      <option value="Confident">Confident</option>
                      <option value="Unresponsive">Unresponsive</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    When Button is Pressed:
                  </td>
                  <td>
                    <select v-model="item.whenButtonPressed" :disabled="!editToggle">
                      <option value="Red X">Red X</option>
                      <option value="Red O">Red O</option>
                      <option value="Green X">Green X</option>
                      <option value="Green O">Green O</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    Number of TTS Prompts:
                  </td>
                  <td>
                    <input type="number" v-model="item.numberTTSPrompts" @change="numberTTSPromptChange(item, 'TTSChildPrompts', item.numberTTSPrompts)" min="0" max="3" :disabled="!editToggle">
                  </td>
                </tr>
                <tr>
                  <td>
                    Upload Audio File for TTS Prompts:
                  </td>
                  <td>
                    <div v-for="(prompt, index2) in item.TTSChildPrompts" :key="index2">
                      Text: <input type="text" :value="prompt" @input="e => updateTTSPrompt(item.TTSChildPrompts,index2, e)" :disabled="!editToggle">
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    Score:
                  </td>
                  <td>
                    <select v-model="item.score" :disabled="!editToggle">
                      <option value="Pass/Fail">Pass/Fail</option>
                      <option value="Score/Points">Score/Points</option>
                    </select>
                    <label>
                      Technology:
                      <select v-model="item.technology" :disabled="!editToggle">
                        <option value="Gesture">Gesture</option>
                        <option value="Screen">Screen</option>
                      </select>
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>
                    Score Points:
                  </td>
                  <td>
                    <select v-model="item.scorePoints" :disabled="!editToggle" @change="parseScorePointsValue(arrayDataQuestion[questionIndex])">
                      <option value="Pass: +1 / Fail: -1">Pass: +1 / Fail: -1</option>
                      <option value="Pass: +2 / Fail: -1">Pass: +2 / Fail: -1</option>
                      <option value="Pass: +3 / Fail: -1">Pass: +3 / Fail: -1</option>
                      <option value="Pass: +4 / Fail: -1">Pass: +4 / Fail: -1</option>
                      <option value="Pass: +1 / Fail: 0">Pass: +1 / Fail: 0</option>
                      <option value="Pass: +2 / Fail: 0">Pass: +2 / Fail: 0</option>
                      <option value="Pass: +3 / Fail: 0">Pass: +3 / Fail: 0</option>
                      <option value="Pass: +4 / Fail: 0">Pass: +4 / Fail: 0</option>
                    </select>
                    <label>
                      Material:
                      <input type="text" v-model="item.material" :disabled="!editToggle">
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>
                    Time Limit:
                  </td>
                  <td>
                    <select v-model="item.timeLimit" :disabled="!editToggle">
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    <label>
                      Time Out:
                      <input type="number" v-model="item.timeOut" :disabled="!editToggle">
                    </label>
                    <label>
                      Typical Duration:
                      <input type="number" v-model="item.typicalDuration" :disabled="!editToggle">
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>
                    Biosensors:
                  </td>
                  <td>
                    <select v-model="item.bioSensors" :disabled="!editToggle">
                      <option value="LOCKED">LOCKED</option>
                      <option value="EEG">EEG</option>
                      <option value="EMG">EMG</option>
                      <option value="ECG">ECG</option>
                    </select>
                    <label>
                      Eye-tracking:
                      <select v-model="item.eyeTracking" :disabled="!editToggle">
                        <option value="Enabled">Enabled</option>
                        <option value="Disabled">Disabled</option>
                      </select>
                    </label>
                    <label>
                      VR:
                      <select v-model="item.vr" :disabled="!editToggle">
                        <option value="Enabled">Enabled</option>
                        <option value="Disabled">Disabled</option>
                      </select>
                    </label>
                    <label>
                      AR:
                      <select v-model="item.ar" :disabled="!editToggle">
                        <option value="Enabled">Enabled</option>
                        <option value="Disabled">Disabled</option>
                      </select>
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
    <div v-else-if="currStep == 'preview'">
      <section v-if="!showChildView" class="main-box" style="position: relative; margin-left: 0;">
        <div class="modal-overlay-partial" id="modal-procedure">
          <span class="modal-content-partial">
            <h3>Procedure</h3>
            <p>{{ arrayDataQuestion[questionIndex].procedure }}</p>
            <button @click="closeModal('modal-procedure')">Close</button>
          </span>
        </div>
        <div class="modal-overlay-partial" id="modal-childPrompts">
          <span class="modal-content-partial">
            <h3>TTS Child Prompts</h3>
            <div v-for="(item,index) in arrayDataQuestion[questionIndex].TTSChildPrompts" :key="index">
              <p>{{ item }}</p>
              <button class="subButton" @click="convertToSpeech(item)">TTS</button>
            </div>
            <button @click="closeModal('modal-childPrompts'); stopAllConvertToSpeech(); stopAllAudio()">Close</button>
          </span>
        </div>
        <div class="modal-overlay-partial" id="modal-specialistPrompt">
          <span class="modal-content-partial">
            <h3>Specialist Prompt</h3>
            <p>{{ arrayDataQuestion[questionIndex].specialistPrompt }}</p>
            <button @click="closeModal('modal-specialistPrompt')">Close</button>
          </span>
        </div>
        <div class="modal-overlay-partial" id="modal-notes">
          <span class="modal-content-partial">
            <h3>Notes</h3>
            <textarea style="border: solid black 1px"></textarea>
            <button @click="closeModal('modal-notes')">Close</button>
          </span>
        </div>
        <div style="text-align: center;">
          <button class="orange-button" @click="switchStep('question'); previewTimingPack(arrayDataQuestion[questionIndex], false)">
            Back to Questions
            <font-awesome-icon :icon="['fas', 'eye']" />
          </button>
        </div>
        <div id="control-box-specialist">
          <div class="d-flex justify-content-between w-100">
            <div>
              <span class="mr-3">
                <img src="../images/icons_svg/general/left-circle.svg" class="prev-ques-nav-buttons" @click="changePreviewQuestion(questionIndex-1,questionIndex)"/>
              </span>
              <span class="mr-3">
                <img src="../images/icons_svg/general/right-circle.svg" class="prev-ques-nav-buttons" @click="changePreviewQuestion(questionIndex+1,questionIndex)"/>
              </span>
              <span>
                <img src="../images/icons_svg/general/rotate-circle.svg" class="prev-ques-nav-buttons" @click="previewTimingResetPack(arrayDataQuestion[questionIndex])"/>
              </span>
            </div>
            <div>
              {{ arrayDataQuestion[questionIndex].questionNameTitle }}
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <span class="preview-icon-container">
                <img src="../images/icons_svg/general/list-search.svg" class='preview-icons'/>
                <div>Previous Results</div>
              </span>
              <span class="preview-icon-container">
                <img src="../images/icons_svg/general/graph.svg" class='preview-icons'/>
                <div>Reports</div>
              </span>
              <span class="preview-icon-container" @click="childViewToggle();formatForNewResolution('preview-screen-child')">
                <img src="../images/icons_svg/general/student-graduation.svg" class='preview-icons'/>
                <div>Child View</div>
              </span>
            </div>
          </div>
          <div class="d-flex justify-content-between w-100 flex-grow-1 mt-5 mb-5" style="font-weight: 400;">
            <div class="d-flex flex-column justify-content-between m-3 flex-shrink-0">
              <div style="font-size: .9em;">
                <div class="mt-3">{{ `Q. ${questionIndex+1}` }}</div>
                <div class="mt-3"><span style="text-decoration: underline;">Category: </span> {{ arrayDataCateg[categIndex].categoryNameTitle }}</div>
                <div class="mt-3"><span style="text-decoration: underline;">Subcategory: </span> {{ arrayDataSubCateg[subCategIndex].subCategoryNameTitle }}</div>
                <div class="mt-3">
                  <span>
                    <span style="text-decoration: underline;">Question ID: </span>
                    ...{{ arrayDataQuestion[questionIndex].questionID.slice(-4) }}
                  </span>
                  <div>
                    <span>
                      <span style="text-decoration: underline;">Custom QID: </span>
                      ...{{ arrayDataQuestion[questionIndex].customQID.slice(-4) }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="d-flex flex-column">
                <div v-for="(item, index) in arrayDataQuestion[questionIndex].specialistButtonsConfig" :key="index">
                  <div v-if="index % 2 === 0" class="exampleButton">{{ item.text }}</div>
                </div>
              </div>
            </div>
            <div class="border-color-primary w-75" id="preview-screen-specialist" :style="{backgroundColor:arrayDataQuestion[questionIndex].backgroundColor, position: 'relative', height: '500px'}">
              <div v-for="(image, index) in arrayDataQuestion[questionIndex].childImagesConfig" :key="`preview-screen-image${index}`"
                :style="{
                  position: 'absolute',
                  top: `${image.y}px`,
                  left: `${image.x}px`,
                  height: `${image.height}px`,
                  width: `${image.width}px`,
                  backgroundColor: '#FF9B00'
                }"
              >
                <img :src="getImageFileSrc(image.file)" width="100%" height="100%">
              </div>
              <div v-for="(button, index) in arrayDataQuestion[questionIndex].childButtonsConfig" :key="`preview-screen-button${index}`"
                :style="{
                  position: 'absolute',
                  top: `${button.y}px`,
                  left: `${button.x}px`,
                  height: `${button.height}px`,
                  width: `${button.width}px`,
                  backgroundColor: '#FF9B00'
                }"
              >
                <img :src="getImageFileSrc(button.file)" width="100%" height="100%">
                <div style="position: absolute; top: 0; left: 0; word-wrap: break-word; width: 100%;">{{ button.text }}</div>
              </div>
            </div>
            <div class="d-flex flex-column justify-content-between m-3 flex-shrink-0">
              <div style="font-size: .9em;">
                <div class="typicalDuration" :style="{border: arrayDataQuestion[questionIndex].typicalDurationTimerElapsedTime == 0 ? 'red 2px solid' : null}">Typ: {{ formatTime(arrayDataQuestion[questionIndex].typicalDurationTimerElapsedTime) }}</div>
                <div class="timeOut" :style="{border: arrayDataQuestion[questionIndex].timeOutTimerElapsedTime == 0 ? 'red 2px solid' : null}">Time Out: {{ formatTime(arrayDataQuestion[questionIndex].timeOutTimerElapsedTime) }}</div>
                <div class="totalDuration">Duration: {{ formatTime(arrayDataQuestion[questionIndex].questionDurationTimerElapse) }}</div>
              </div>
              <div class="d-flex flex-column">
                <div v-for="(item, index) in arrayDataQuestion[questionIndex].specialistButtonsConfig" :key="index">
                  <div v-if="index % 2 !== 0" class="exampleButton">{{ item.text }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="icons-grid w-100" >
            <span class="preview-icon-container">
              <img src="../images/icons_svg/general/question-circle.svg" class='preview-icons'/>
            </span>
            <span class="preview-icon-container" @click="leftCamera">
              <img src="../images/icons_svg/general/video.svg" class='preview-icons'/>
              <div>Left</div>
            </span>
            <span class="preview-icon-container" @click="centerCamera">
              <img src="../images/icons_svg/general/video-off.svg" class='preview-icons'/>
              <div>Center</div>
            </span>
            <span class="preview-icon-container" @click="rightCamera">
              <img src="../images/icons_svg/general/video.svg" class='preview-icons'/>
              <div>Right</div>
            </span>
            <div class="d-inline-block">
              <div class="circle-button red-button">{{ arrayDataQuestion[questionIndex].scorePointsFail }}</div>
            </div>
            <div class="d-inline-block">
              <div class="circle-button yellow-button">0</div>
            </div>
            <div class="d-inline-block">
              <div class="circle-button green-button">{{ arrayDataQuestion[questionIndex].scorePointsPass }}</div>
            </div>
            <span class="preview-icon-container" @click="openModal('modal-childPrompts')">
              <img src="../images/icons_svg/general/audio-file.svg" class='preview-icons'/>
              <div>Child Prompts</div>
            </span>
            <span class="preview-icon-container" @click="openModal('modal-procedure')">
              <img src="../images/icons_svg/general/info-circle.svg" class='preview-icons'/>
            </span>
            <span class="preview-icon-container" @click="openModal('modal-notes')">
              <img src="../images/icons_svg/general/list-edit.svg" class='preview-icons'/>
            </span>
            <span class="preview-icon-container" @click="openModal('modal-specialistPrompt')">
              <img src="../images/icons_svg/general/lightbulb.svg" class='preview-icons'/>
              <div>Specialist Prompt</div>
            </span>
            <span class="preview-icon-container">
              <img src="../images/icons_svg/general/mike.svg" class='preview-icons'/>
            </span>
            <span class="preview-icon-container">
              <img src="../images/icons_svg/general/camera.svg" class='preview-icons'/>
            </span>
            <span class="preview-icon-container">
              <img src="../images/icons_svg/general/play.svg" class='preview-icons'/>
              <div>Instruction</div>
            </span>
            <span class="preview-icon-container">
              <img src="../images/icons_svg/general/eye-tracking.svg" class='preview-icons'/>
              <div>Eye-tracking</div>
            </span>
            <span class="preview-icon-container">
              <img src="../images/icons_svg/general/head-eeg.svg" class='preview-icons'/>
              <div>EEG</div>
            </span>
            <span class="preview-icon-container">
              <img src="../images/icons_svg/general/arm-emg.svg" class='preview-icons'/>
              <div>EMG</div>
            </span>
            <span class="preview-icon-container">
              <img src="../images/icons_svg/general/heart-pulse.svg" class='preview-icons'/>
              <div>ECG</div>
            </span>
            <span class="preview-icon-container">
              <img src="../images/icons_svg/general/augment-reality.svg" class='preview-icons'/>
              <div>Augmented Reality</div>
            </span>
            <span class="preview-icon-container">
              <img src="../images/icons_svg/general/virtual-reality.svg" class='preview-icons'/>
              <div>Virtual Reality</div>
            </span>
          </div>
        </div>
      </section>
      <section v-else class="main-box" style="margin-left: 0">
        <div class="d-flex">
          <div id="control-box-child" class="flexBtwCenter p-2 flex-grow-1">
            <div class="d-flex flex-column justify-content-end h-100">
              <span class="mb-3">
                <img src="../images/icons_svg/general/question-circle.svg" class="prev-ques-nav-buttons" style="width: 40px;"/>
              </span>
              <span>
                <img src="../images/icons_svg/general/rotate-circle.svg" class="prev-ques-nav-buttons" style="width: 40px;"/>
              </span>
            </div>
            <div class="flex-grow-1 h-100 m-3" id="preview-screen-child" style="position: relative">
              <div v-for="(image, index) in arrayDataQuestion[questionIndex].childImagesConfig" :key="`preview-screen-image${index}`"
                :style="{
                  position: 'absolute',
                  left: `${image.x}px`,
                  top: `${image.y}px`,
                  width: `${image.width}px`,
                  height: `${image.height}px`,
                  backgroundColor: '#FF9B00'
                }"
              >
                <img :src="getImageFileSrc(image.file)" width="100%" height="100%">
              </div>
              <div v-for="(button, index) in arrayDataQuestion[questionIndex].childButtonsConfig" :key="`preview-screen-button${index}`"
                :style="{
                  position: 'absolute',
                  left: `${button.x}px`,
                  top: `${button.y}px`,
                  width: `${button.width}px`,
                  height: `${button.height}px`,
                  backgroundColor: '#FF9B00'
                }"
              >
                <img :src="getImageFileSrc(button.file)" width="100%" height="100%">
                <div style="position: absolute; top: 0; left: 0; word-wrap: break-word; width: 100%;">{{ button.text }}</div>
              </div>
            </div>
          </div>
          <span class="preview-icon-container" @click="childViewToggle(); formatForNewResolution('preview-screen-specialist')">
            <img src="../images/icons_svg/general/specialist-view.svg" class='preview-icons'/>
            <div>Specialist View</div>
          </span>
        </div>
      </section>
    </div>
  </div>
</template>
  
  <script>
    import axios from 'axios';
    import draggable from 'vuedraggable';
    import { v4 as uuidv4 } from 'uuid';
    import VueDraggableResizable from 'vue-draggable-resizable';
    import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

    export default {
      components: {
        draggable,
        VueDraggableResizable
      },
      data() {
        return {
          applicationID: null,
          applicationData: null,
          currStep: 'area',
          areaIndex: -1,
          typeIndex: -1,
          categIndex: -1,
          subCategIndex: -1,
          questionIndex: -1,
          editToggle: false,
          dataSet: null,
          formatType: 'grid',
          showChildView: false,
          leftCameraActive: false,
          centerCameraActive: false,
          rightCameraActive: false,
        }
      },
      computed: {
        arrayDataArea() {
          return this.dataSet;
        },
        arrayDataType() {
          return this.dataSet[this.areaIndex].typeNameData;
        },
        arrayDataCateg() {
          return this.dataSet[this.areaIndex].typeNameData[this.typeIndex].categoryNameData;
        },
        arrayDataSubCateg() {
          return this.dataSet[this.areaIndex].typeNameData[this.typeIndex].categoryNameData[this.categIndex].subCategoryNameData;
        },
        arrayDataQuestion() {
          return this.dataSet[this.areaIndex].typeNameData[this.typeIndex].categoryNameData[this.categIndex].subCategoryNameData[this.subCategIndex].questionData;
        }
      },
      async created() {
        function placeInArray(arr, value, variableToCheck, findOrder) {
          let low = 0;
          let high = arr.length - 1;
          // Binary search to find the insertion point
          while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            if (arr[mid][variableToCheck] < findOrder) {
              low = mid + 1;
            } else {
              high = mid - 1;
            }
          }

          // If the value is not in the array, insert it at the correct position
          arr.splice(low, 0, value);
          return arr;
        }

        this.applicationID = this.$route.params.applicationID;
        window.addEventListener("beforeunload", function(event) {
          event.returnValue = 'Save Values';
        });

        try {
          let applicationResponse = await axios.get(`http://localhost:8080/api/appAdmin/application/${this.applicationID}`);
          this.applicationData = applicationResponse.data;
          let questionsReseponse = await axios.get(`http://localhost:8080/api/question-admin/application/${this.applicationID}`)
          let data = questionsReseponse.data;
          let result = [];
          if (data.length > 0) {
            this.areaIndex = 0;
            this.typeIndex = 0;
            this.categIndex = 0;
            this.subCategIndex = 0;
            this.questionIndex = 0;
          }
          for (let i = 0; i < data.length; i++) {
            let area = result.find(a => a.areaNameTitle === data[i].area);
            if (!area) {
              area = {
                areaNameTitle: data[i].area,
                areaNameDescription: data[i].area_description,
                areaOrder: data[i].area_order,
                typeNameData: []
              }
              placeInArray(result, area, 'areaOrder', data[i].area_order);
            }

            let type = area.typeNameData.find(t => t.typeNameTitle === data[i].type);
            if (!type) {
              type = {
                typeNameTitle: data[i].type,
                typeNameDescription: data[i].type_description,
                typeOrder: data[i].type_order,
                categoryNameData: []
              }
              placeInArray(area.typeNameData, type, 'typeOrder', data[i].type_order);
            }
            
            let category = type.categoryNameData.find(c => c.categoryNameTitle === data[i].category);
            if (!category) {
              category = {
                categoryNameTitle: data[i].category,
                categoryNameDescription: data[i].category_description,
                categoryOrder: data[i].category_order,
                subCategoryNameData: []
              }
              placeInArray(type.categoryNameData, category, 'categoryOrder', data[i].category_order);
            }
            
            let subCategory = category.subCategoryNameData.find(sc => sc.subCategoryNameTitle === data[i].sub_category);
            if (!subCategory) {
              subCategory = {
                subCategoryNameTitle: data[i].sub_category,
                subCategoryDescription: data[i].sub_category_description,
                subCategoryOrder: data[i].sub_category_order,
                questionData: []
              }
              placeInArray(category.subCategoryNameData, subCategory, 'subCategoryOrder', data[i].sub_category_order);
            }
            
            //turn json string to json
            data[i].child_buttons = JSON.parse(data[i].child_buttons);
            data[i].specialist_buttons = JSON.parse(data[i].specialist_buttons);
            data[i].child_images = JSON.parse(data[i].child_images);

            //parse the score points into usuable strings
            let tempSplit = data[i].score_points.split(' ');
            let scorePointsPass = tempSplit[1];
            let scorePointsFail = tempSplit[4];
            //add temperary variables for functionality
            placeInArray(subCategory.questionData, {
              applicationID: data[i].application_id,
              questionID: data[i].question_id,
              customQID: data[i].custom_id,
              questionNameTitle: data[i].question,
              questionNameDescription: data[i].question_description,
              questionOrder:  data[i].question_order,
              areaNameTitle: data[i].area,
              areaNameDescription: data[i].area_description,
              areaOrder:  data[i].area_order,
              typeNameTitle: data[i].type,
              typeNameDescription: data[i].type_description,
              typeOrder:  data[i].type_order,
              categoryNameTitle: data[i].category,
              categoryNameDescription: data[i].category_description,
              categoryOrder:  data[i].category_order,
              subCategoryNameTitle: data[i].sub_category,
              subCategoryDescription: data[i].sub_category_description,
              subCategoryOrder:  data[i].subCategory_order,
              backgroundColor: data[i].background_color,
              transparent: data[i].transparent,
              procedure: data[i].procedure,
              ageGroup: data[i].age_group,
              specialistPrompt: data[i].specialist_prompt,
              childButtonsConfig: data[i].child_buttons,
              specialistButtonsConfig: data[i].specialist_buttons,
              childImagesConfig: data[i].child_images,
              childViewOriginalScreenResolution: data[i].child_view_original_screen_resolution,
              uploadIntro: data[i].intro,
              introDescription: data[i].intro_description,
              closure: data[i].closure,
              requestInstructionVideo: data[i].request_instruction_video,
              requestMainImage: data[i].request_main_image,
              requestCreateIntro: data[i].request_create_intro,
              requestCreateClosure: data[i].request_create_closure,
              typeOfAnswer: data[i].type_of_answer,
              defaultOptions: data[i].default_options,
              whenButtonPressed: data[i].when_button_pressed,
              TTSChildPrompts: data[i].tts_child_prompts,
              score: data[i].score,
              technology: data[i].technology,
              scorePoints: data[i].score_points,
              timeLimit: data[i].time_limit,
              material: data[i].material,
              timeOut: parseInt(data[i].time_out),
              typicalDuration: parseInt(data[i].typical_duration),
              bioSensors: data[i].bio_sensors,
              eyeTracking: data[i].eye_tracking,
              eeg: data[i].eeg,
              emg: data[i].emg,
              ecg: data[i].ecg,
              ar: data[i].ar,
              vr: data[i].vr,
              note: data[i].note,

              //temporary variables not part of the post request
              typicalDurationTimer: null,
              timeOutTimer: null,
              questionDuration: null,
              typicalDurationTimerElapsedTime: parseInt(data[i].typical_duration),
              timeOutTimerElapsedTime: parseInt(data[i].time_out),
              questionDurationTimerElapse: 0,
              scorePointsPass: scorePointsPass,
              scorePointsFail: scorePointsFail,
              numberChildButtons: data[i].child_buttons.length,
              numberSpecialistButtons: data[i].specialist_buttons.length,
              numberChildImages: data[i].child_images.length,
              numberTTSPrompts: data[i].tts_child_prompts.length,
            }, 'question_order', data[i].question_order);              
          }
          this.dataSet = result;

        } catch (err) {
          console.error(err);
        }
      },
      methods: {
        switchStep(step) {
          this.currStep = step;
        },
        pushURL(url) {
          this.$router.push(url);
        },
        changeIndex(step, index) {
          if (step == 'area') {
            this.areaIndex = index;
          }
          else if (step == 'type') {
            this.typeIndex = index;
          }
          else if (step == 'categ') {
            this.categIndex = index;
          }
          else if (step == 'subCateg') {
            this.subCategIndex = index;
          }
          else if (step == 'question') {
            if (index < 0) {
              this.questionIndex = 0;
            }
            else if (index >= this.arrayDataQuestion.length) {
              this.questionIndex = this.arrayDataQuestion.length-1;
            }
            else {
              this.questionIndex = index;
            }
          }
        },
        changePreviewQuestion(newIndex, previousIndex) {
          this.changeIndex('question', newIndex);
          if (0 <= newIndex && newIndex < this.arrayDataQuestion.length) {
            this.previewTimingPack(this.arrayDataQuestion[previousIndex], false);
            this.previewTimingPack(this.arrayDataQuestion[newIndex], true);
          }
        },
        showDropdown(index) {
          document.getElementById(`${index}-typeName`).classList.toggle('visibility');
        },
        toggleEdit(determination) {
          if (determination == null) {
            this.editToggle = !this.editToggle;
          }
          else if (determination) {
            this.editToggle = true;
          }
          else if (!determination) {
            this.editToggle = false;
          }
        },
        leftCamera() {
          console.log('Left Camera');
        },
        centerCamera() {
          console.log('Center Camera');
        },
        rightCamera() {
          console.log('Center Camera');
        },
        childViewToggle() {
          this.showChildView = !this.showChildView;
        },
        addtoList(location, updateIndex) {
          if (location == 'area') {
            this.arrayDataArea.splice(this.areaIndex+1, 0, {
              "areaNameTitle": "(insert area)",
              "areaNameDescription": "(insert area description)",
              "typeNameData": []
            });
            if (updateIndex) {
              this.areaIndex = this.areaIndex+1;
            }
          }
          else if (location == 'type') {
            this.arrayDataType.splice(this.typeIndex+1, 0, {
              "typeNameTitle": "(insert type)",
              "typeNameDescription": "(insert type description)",
              "categoryNameData": []
            });
            if (updateIndex) {
              this.arrayDataType = this.arrayDataType+1;
            }
          }
          else if (location == 'categ') {
            this.arrayDataCateg.splice(this.categIndex+1, 0, {
              "categoryNameTitle": "(insert category)",
              "categoryNameDescription": "(insert cateogry description)",
              "subCategoryNameData": []
            });
            if (updateIndex) {
              this.arrayDataCateg = this.arrayDataCateg+1;
            }
          }
          else if (location == 'subCateg') {
            this.arrayDataSubCateg.splice(this.subCategIndex+1, 0, {
              "subCategoryNameTitle": "(insert sub category)",
              "subCategoryDescription": "(insert sub category description)",
              "questionData": []
            });
            if (updateIndex) {
              this.subCategIndex = this.subCategIndex+1;
            }
          }
          else if (location == 'question') {
            let id = uuidv4();
            let timeOut = 15;
            let typicalDuration = 15;
            this.arrayDataQuestion.splice(this.questionIndex+1, 0, {
              applicationID: this.applicationID,
              questionID: id,
              customQID: '',
              questionNameTitle: '(Insert Question)',
              questionNameDescription: '(Insert Question Description)',
              areaNameTitle: this.arrayDataArea.areaNameTitle,
              areaNameDescription: this.arrayDataArea.areaNameDescription,
              typeNameTitle: this.arrayDataType.typeNameTitle,
              typeNameDescription: this.arrayDataType.typeNameDescription,
              categoryNameTitle: this.arrayDataCateg.categoryNameTitle,
              categoryNameDescription: this.arrayDataCateg.categoryNameDescription,
              subCategoryNameTitle: this.arrayDataSubCateg.subCategoryNameTitle,
              subCategoryDescription: this.arrayDataSubCateg.subCategoryDescription,
              backgroundColor: '#FFFFFF',
              transparent: false,
              procedure: '',
              ageGroup: '0-18',
              specialistPrompt: '',
              childButtonsConfig: [],
              specialistButtonsConfig: [],
              childImagesConfig: [],
              childViewOriginalScreenResolution: '804x640',
              uploadIntro: null,
              introDescription: null,
              closure: null,
              requestInstructionVideo: null,
              requestMainImage: null,
              requestCreateIntro: "No",
              requestCreateClosure: "No",
              typeOfAnswer: 'Multiple Choice',
              defaultOptions: 'Unsure/Confident/Unresponsive',
              whenButtonPressed: 'Red X',
              TTSChildPrompts: [],
              score: 'Pass/Fail',
              technology: 'Gesture',
              scorePoints: 'Pass: +1 / Fail: -1',
              timeLimit: 'Yes',
              material: '',
              timeOut: timeOut,
              typicalDuration: typicalDuration,
              bioSensors: 'LOCKED',
              eyeTracking: 'No',
              eeg: 'No',
              emg: 'No',
              ecg: 'No',
              ar: 'No',
              vr: 'No',
              note: '',

              typicalDurationTimer: null,
              timeOutTimer: null,
              questionDuration: null,
              typicalDurationTimerElapsedTime: timeOut,
              timeOutTimerElapsedTime: typicalDuration,
              questionDurationTimerElapse: 0,
              scorePointsPass: '+1',
              scorePointsFail: '-1',

              numberChildButtons: 0,
              numberSpecialistButtons: 0,
              numberTTSPrompts: 0,
              numberChildImages: 0,
              numberSpecialistImages: 0,
            });
            if (updateIndex) {
              this.questionIndex = this.questionIndex+1;
            }
          }
        },
        removefromList(location, index) {
          if (location == 'area') {
            index == null ? this.arrayDataArea.splice(this.areaIndex, 1) : this.arrayDataArea.splice(index, 1);
            if (this.arrayDataArea.length == this.areaIndex) {
              this.areaIndex = this.areaIndex-1;
            }
          }
          else if (location == 'type') {
            index == null ? this.arrayDataType.splice(this.typeIndex, 1) : this.arrayDataType.splice(index, 1);
            if (this.arrayDataType.length == this.typeIndex) {
              this.typeIndex = this.typeIndex-1;
            }
          }
          else if (location == 'categ') {
            index == null ? this.arrayDataCateg.splice(this.categIndex, 1) : this.arrayDataCateg.splice(index, 1);
            if (this.arrayDataCateg.length == this.categIndex) {
              this.categIndex = this.categIndex-1;
            }
          }
          else if (location == 'subCateg') {
            index == null ? this.arrayDataSubCateg.splice(this.subCategIndex, 1) : this.arrayDataSubCateg.splice(index, 1);
            if (this.arrayDataSubCateg.length == this.subCategIndex) {
              this.subCategIndex = this.subCategIndex-1;
            }
          }
          else if (location == 'question') {
            index == null ? this.arrayDataQuestion.splice(this.questionIndex, 1) : this.arrayDataQuestion.splice(index, 1);
            if (this.arrayDataQuestion.length == this.questionIndex) {
              this.questionIndex = this.questionIndex-1;
            }
          } 
        },
        preventProp(event) {
          event.stopPropagation();
        },
        handleFileChangeObject(event, object, variable) {
          //object is reference and variable is property to change
          let file = event.target.files[0];
          object[variable] = file;
        },
        numberFormatImageChange(question, config, number) {
          //tells when to add or remove array element for button number change
          //config is a string for reference
          let difference = number - question[config].length;
          if (difference < 0) {
            question[config].splice(number, -difference);
          }
          else {
            const newArray = new Array(difference).fill({
              file: null,
              x: 0,
              y: 0,
              width: 400,
              height: 200
            });
            question[config] = question[config].concat(newArray);
          }
        },
        numberFormatButtonChange(question, config, number) {
          //tells when to add or remove array element for button number change
          //config is a string for reference
          let difference = number - question[config].length;
          if (difference < 0) {
            question[config].splice(number, -difference);
          }
          else {
            const newArray = new Array(difference).fill({
              text: '',
              file: null,
              x: 0,
              y: 0,
              width: 400,
              height: 200
            });
            question[config] = question[config].concat(newArray);
          }
        },
        numberTTSPromptChange(question,config,number) {
          //tells when to add or remove array element for button number change
          //config is a string for reference
          let difference = number - question[config].length;
          if (difference < 0) {
            question[config].splice(number, -difference);
          }
          else {
            const newArray = new Array(difference).fill('');
            question[config] = question[config].concat(newArray);
          }
        },
        updateTTSPrompt(array, index, event) {
          array[index] = event.target.value;
        },
        getAudioFileSrc(fileObject) {
          if (fileObject != null) {
            return URL.createObjectURL(fileObject);
          }
          return null;
        },
        getImageFileSrc(fileObject) {
          if (fileObject != null) {
            return URL.createObjectURL(fileObject);
          }
          return null;
        },
        startStopWatch(questionFunctions, stopWatchName, stopWatchElapseTimeName) {
          //questionFunctions is Object
          questionFunctions[stopWatchName] = setInterval(() => {
            questionFunctions[stopWatchElapseTimeName]++;
          }, 1000);
        },
        stopStopWatch(questionFunctions, stopWatchName) {
          //questionFunctions is Object
          clearInterval(questionFunctions[stopWatchName]);
          questionFunctions[stopWatchName] = null;
        },
        resetStopWatch(questionObject, stopWatchName, stopWatchElapseTimeName) {
          let questionFunctions = questionObject;
          questionFunctions[stopWatchElapseTimeName] = 0;
          this.stopStopWatch(questionFunctions, stopWatchName);
          this.startStopWatch(questionFunctions, stopWatchName, stopWatchElapseTimeName);
        },
        startTimer(questionFunctions, timerName, timerElapseTimeName) {
          //questionFunctions is Object
          questionFunctions[timerName] = setInterval(() => {
            let temp = questionFunctions[timerElapseTimeName];
            if (temp - 1 < 0) {
              this.stopTimer(questionFunctions, timerName);
            }
            else {
              questionFunctions[timerElapseTimeName]--;
            }
          }, 1000);
        },
        stopTimer(questionFunctions, timerName) {
          //questionFunctions is Object
          clearInterval(questionFunctions[timerName]);
          questionFunctions[timerName] = null;
        },
        resetTimer(questionObject, timerName, timerElapseTimeName, originalTimeName) {
          let questionFunctions = questionObject;
          questionFunctions[timerElapseTimeName] = questionObject[originalTimeName];
          this.stopTimer(questionFunctions, timerName);
          this.startTimer(questionFunctions, timerName, timerElapseTimeName);
        },
        previewTimingPack(questionObject, setting) {
          let questionFunctions = questionObject;
          //turn on timings
          if (setting) {
            this.startTimer(questionFunctions, 'typicalDurationTimer', 'typicalDurationTimerElapsedTime');
            this.startTimer(questionFunctions, 'timeOutTimer', 'timeOutTimerElapsedTime');
            this.startStopWatch(questionFunctions, 'questionDuration', 'questionDurationTimerElapse');
          }
          else {
            this.stopTimer(questionFunctions, 'typicalDurationTimer');
            this.stopTimer(questionFunctions, 'timeOutTimer');
            this.stopStopWatch(questionFunctions, 'questionDuration');
          }
        },
        previewTimingResetPack(questionObject) {
          this.resetTimer(questionObject, 'typicalDurationTimer', 'typicalDurationTimerElapsedTime', 'typicalDuration');
          this.resetTimer(questionObject, 'timeOutTimer', 'timeOutTimerElapsedTime', 'timeOut');
          this.resetStopWatch(questionObject, 'questionDuration', 'questionDurationTimerElapse');
        },
        formatTime(totalSeconds) {
          const minutes = Math.floor(totalSeconds / 60);
          const seconds = totalSeconds % 60;
          return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        },
        parseScorePointsValue(questionObject) {
          //render proper button based on score points
          let questionFunctions = questionObject;

          let tempSplit = questionObject.scorePoints.split(' ');
          questionFunctions['scorePointsPass'] = tempSplit[1];
          questionFunctions['scorePointsFail'] = tempSplit[4];
        },
        openModal(id) {
          document.getElementById(id).style.display = 'flex';
        },
        closeModal(id) {
          document.getElementById(id).style.display = 'none';
        },
        convertToSpeech(textInput) {
          if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(textInput);
            window.speechSynthesis.speak(utterance);
          }
          else {
            alert('Web Speech API is not supported in this browser.');
          }
        },
        stopAllConvertToSpeech() {
          if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
          }
        },
        playAudio(id) {
          this.stopAllAudio();
          let audio = document.getElementById(id);
          if (audio.paused) {
            audio.play();
          }
          else {
            audio.currentTime = 0;
          }
        },
        stopAllAudio() {
          let audioElements = document.getElementsByClassName('audio-tag');
          for (let i = 0; i < audioElements.length; i++) {
            audioElements[i].pause();
            audioElements[i].currentTime = 0;
          }
        },
        draggingChange(left, top, object) {
          object.x = left;
          object.y = top;
        },
        resizeChange(width, height, object) {
          object.width = width;
          object.height = height;
        },
        formatForNewResolution(elementID) {
          this.$nextTick(() => {
            let currentQuestionInstance = this.arrayDataQuestion[this.questionIndex];
            let [originalWidth, originalHeight] = currentQuestionInstance.childViewOriginalScreenResolution.split('x').map(Number);

            let newWidth = document.getElementById(elementID).offsetWidth;
            let newHeight = document.getElementById(elementID).offsetHeight;
            if (newWidth == originalWidth && newHeight == originalHeight) {
              return;
            }

            //[x,y] transform coordinates from original to new resolution
            let xTransform = newWidth / originalWidth;
            let yTransform = newHeight / originalHeight;

            for (let i = 0; i < currentQuestionInstance.childButtonsConfig.length; i++) {
              currentQuestionInstance.childButtonsConfig[i].x *= xTransform;
              currentQuestionInstance.childButtonsConfig[i].y *= yTransform;
              currentQuestionInstance.childButtonsConfig[i].height *= yTransform;
              currentQuestionInstance.childButtonsConfig[i].width *= xTransform;
            }

            for (let i = 0; i < currentQuestionInstance.childImagesConfig.length; i++) {
              currentQuestionInstance.childImagesConfig[i].x *= xTransform;
              currentQuestionInstance.childImagesConfig[i].y *= yTransform;
              currentQuestionInstance.childImagesConfig[i].height *= yTransform;
              currentQuestionInstance.childImagesConfig[i].width *= xTransform;
            }

            currentQuestionInstance.childViewOriginalScreenResolution = `${newWidth}x${newHeight}`;
          });
        },
        async saveAllData() {
          let allQuestions = [];
          this.dataSet.forEach((area, areaIndex) => {
            area.typeNameData.forEach((type, typeIndex) => {
              type.categoryNameData.forEach((category, categoryIndex) => {
                category.subCategoryNameData.forEach((subCategory, subCategoryIndex) => {
                  subCategory.questionData.forEach((question, questionIndex) => {
                    allQuestions.push({
                      "application_id": this.applicationID,
                      "question_id": question.questionID,
                      "custom_id": question.customQID,
                      "question": question.questionNameTitle,
                      "question_description": question.questionNameDescription,
                      "question_order": questionIndex,
                      "area": area.areaNameTitle,
                      "area_description": area.areaNameDescription,
                      "area_order": areaIndex,
                      "type": type.typeNameTitle,
                      "type_description": type.typeNameDescription,
                      "type_order": typeIndex,
                      "category": category.categoryNameTitle,
                      "category_description": category.categoryNameDescription,
                      "category_order": categoryIndex,
                      "sub_category": subCategory.subCategoryNameTitle,
                      "sub_category_description": subCategory.subCategoryDescription,
                      "sub_category_order": subCategoryIndex,
                      "background_color": question.backgroundColor,
                      "transparent": question.transparent,
                      "procedure": question.procedure,
                      "age_group": question.ageGroup,
                      "specialist_prompt": question.specialistPrompt,
                      "child_buttons": JSON.stringify(question.childButtonsConfig),
                      "specialist_buttons": JSON.stringify(question.specialistButtonsConfig),
                      "child_images": JSON.stringify(question.childImagesConfig),
                      "child_view_original_screen_resolution": question.childViewOriginalScreenResolution,
                      "intro": question.uploadIntro,
                      "intro_description": question.introDescription,
                      "closure": question.closure,
                      "request_instruction_video": question.requestInstructionVideo,
                      "request_main_image": question.requestMainImage,
                      "request_create_intro": question.requestCreateIntro,
                      "request_create_closure": question.requestCreateClosure,
                      "type_of_answer": question.typeOfAnswer,
                      "default_options": question.defaultOptions,
                      "when_button_pressed": question.whenButtonPressed,
                      "TTS_child_prompts": question.TTSChildPrompts,
                      "score": question.score,
                      "technology": question.technology,
                      "score_points": question.scorePoints,
                      "time_limit": question.timeLimit,
                      "material": question.material,
                      "time_out": question.timeOut.toString(),
                      "typical_duration": question.typicalDuration.toString(),
                      "bio_sensors": question.bioSensors,
                      "eye_tracking": question.eyeTracking,
                      "eeg": question.eeg,
                      "emg": question.emg,
                      "ecg": question.ecg,
                      "ar": question.ar,
                      "vr": question.var,
                      "note": question.note
                    })
                  })
                })
              })
            })
          })
          let response = await axios.patch('http://localhost:8080/api/question-admin/questions', allQuestions);
          console.log(response);
        },
        generate() {
/*           axios.post('http://localhost:8080/api/appAdmin', {
            "classification": this.inputObject.classification, 
            "title":this.inputObject.title, 
            "subtitle":this.inputObject.subtitle, 
            "id":this.inputObject.customID, 
            "info": this.inputObject.info,
            "image": this.inputObject.logo.name,
            "on_sale": this.inputObject.on_sale,
            "owner_uuid": "550e8400-e29b-41d4-a716-446655440000",
          })
          .then(res => {
            console.log(res.data);
          })
          .catch(err => {
            console.error(err);
          }); */
        }
      },
    }
  </script>
  
  <style lang="scss" scoped>
    @use 'sharedSCSS/globalSharedVariables';

    $sidebar-width: 400px;
    $primary-color: globalSharedVariables.$orange;

    .flexCenterCenter {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .flexBtwCenter {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .border-color-primary {
      border: solid 2px $primary-color;
    }

    .sideBar-box {
      width: $sidebar-width;
      position: fixed;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: calc(100vh - #{globalSharedVariables.$navbar-height + globalSharedVariables.$footerbar-height});
    }

    .sideBar-list {
      overflow-y: scroll;
      flex-grow: 1;
      margin-bottom: 1.5rem;
    }

    .main-box {
      margin-left: $sidebar-width;
    }
  
    .grid-container{
      display: grid;
      grid-template-columns: auto auto auto;
      gap: 10px 10px;
      margin-top: 3rem;
    }

    .list-box {
      background-color: $primary-color;
      border-radius: 10px;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      user-select: none;
    }

    .list-box:hover {
      border: solid #d17d00 1px;
      scale: 1.05;
    }

    .orange-button {
      border: solid black 1px;
      background-color: $primary-color;
      width: 75%;
      padding: .25rem;
      border-radius: 50rem;
      align-self: center;
      margin: 5px;
    }

    .modify-buttons {
      display: inline-block;
      background-color: $primary-color;
      border-radius: 5px;
      margin: 0 .25rem;
      width: 50px;
      text-align: center;
    }

    .white-pill-button {
      background-color: white;
      border-radius: 50rem;
      padding: 0 1rem;
      font-size: 1rem;
      font-weight: 400;
    }

    .formatIcons {
      background-color: $primary-color;
      border-radius: 10px;
    }

    .styleList-container {
      background-color: $primary-color;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: .25rem 1rem;
      margin-bottom: .25rem;
      border-radius: 50rem;
      user-select: none;
    }

    .styleList-container:hover {
      border: solid #d17d00 1px;
      scale: 1.05;
    }

    .editorMode-button {
      color: grey;
      border: solid grey 1px;
      font-size: .6em;
      width: 150px;
      border-radius: 50rem;
      padding-left: .5rem;
      padding-right: .5rem;
      margin-top: .25rem;
      margin-left: .5rem;
    }

    .question-config {
      background-color: $primary-color;
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: .5rem;
      font-family: 'Roboto', sans-serif;
    }

    .pencil-icon {
      color: grey;
    }
    .descripText {
      font-weight: 400;
      color: #606060;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .textHoverSelect:hover {
      opacity: .5;
      cursor: pointer;
    }

    .visibility {
      display: none;
    }

    #control-box-specialist {
      border: 4px solid $primary-color;
      flex-direction: column;
      border-radius: 10px;
      min-height: 75vh;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem
    }

    #control-box-child {
      border: 4px solid $primary-color;
      border-radius: 10px;
      min-height: 75vh;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem
    }

    .prev-ques-nav-buttons {
      width: 30px;
    }

    .prev-ques-nav-buttons:hover {
      scale: 1.05;
    }

    .questionSelect {
      color: $primary-color;
    }

    .circle-button {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .circle-button:hover {
      scale: 1.05;
    }

    .green-button {
      box-shadow: inset 0 0 2px 2px #2B870B;
      color: #2B870B;
      border: 1px solid black;
      -webkit-text-stroke: 1px black;
    }

    .yellow-button {
      box-shadow: inset 0 0 2px 2px #FAFD5F;
      color: #FAFD5F;
      border: 1px solid black;
      -webkit-text-stroke: 1px black;
    }

    .red-button {
      box-shadow: inset 0 0 2px 2px #C40000;
      color: #C40000;
      border: 1px solid black;
      -webkit-text-stroke: 1px black; 
    }

    .typicalDuration {
      border: solid #FAFD5F 2px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 1rem;
    }

    .timeOut {
      border: solid #2B870B 2px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 1rem;
    }

    .totalDuration {
      border: solid black 2px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 1rem;
    }

    .exampleButton {
      border: solid black 1px;
      margin-bottom: 5px;
      border-radius: 50rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .exampleButton:hover {
      scale: 1.05;
    }

    .preview-icons {
      width: 50px;
      height: 24px;
    }

    .preview-icon-container {
      font-size: xx-small;
      text-align: center;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      height: 50px;
      width: 50px;
    }

    .preview-icon-container:hover {
      scale: 1.05;
    }

    .preview-icon-container div {
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translate(-50%, 50%);
    }

    .icons-grid {
      display: grid;
      grid-template-columns: repeat(11, auto);
    }

    .modal-overlay-screen {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(192, 192, 192, 0.8);
      align-items: center;
      justify-content: center;
      z-index: 9999;
    }

    .modal-overlay-partial {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(192, 192, 192, 0.8);
      align-items: center;
      justify-content: center;
      z-index: 9999;
    }

    .modal-content-screen, .modal-content-partial {
      background-color: white;
      width: 75%;
      height: 75%;
      padding: 1rem;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      overflow: auto;
    }

    .modal-content-screen .subButton, .modal-content-partial .subButton  {
      background-color: lightcoral;
      font-weight: 400;
      font-size: 1rem;
    }

    .modal-content-screen button, .modal-content-partial button {
      background-color: $primary-color;
      border-radius: 50rem;
      padding: 0 .5rem;
    }

    .modal-content-screen audio, .modal-content-partial audio {
      display: none;
    }

    section {
      padding: 20px;
    }

    h4 {
      padding: 0.5rem;
      font-weight: 700;
      user-select: none;
    }

    details {
      user-select: none;
    }

    details summary {
      font-weight: 700;
    }

    .detailsSelect::marker {
      color: $primary-color;
    }

    p {
      font-weight: 400;
      font-size: 1rem;
    }

    details p {
      margin: 0 .25rem;
      margin-left: .25rem;
      padding: 0 1rem;
      border-left: lightgrey 1px solid;
      font-weight: 400;
      font-size: 1rem;
    }

    table td {
      padding: .5rem;
    }

    table input[type="text"] {
      display: inline-block;
      font-weight: 400;
    }

    table input[type="text"]:disabled, table textarea {
      color: black;
      background-color: white;
      border-radius: 10px;
      font-weight: 400;
    }

    table input[type="number"] {
      font-weight: 400;
      background-color: white;
      font-size: 1rem;
    }
    
    table tr td:nth-child(1) {
      text-align: right;
      line-height: .9;
    }

    table tr td:nth-child(2) > span {
      background-color: white;
      border-radius: 50rem;
      padding: 0 .5rem;
      font-size: 1rem;
      font-weight: 400;
    }

    table select {
      font-size: 1rem;
      font-weight: 400;
      background-color: white;
      border-radius: 50rem;
      padding: 0 1rem;
    }

    table input {
      border-radius: 50rem;
      padding-left: .5rem;
      padding-right: .5rem;
    }

    table input[type="file"] {
      display: none;
    }

    .tts-child-prompt {
      width: 100%;
      text-align: right;
    }

    .custom-label-group {
      border-radius: 50rem;
      padding: 0 .5rem;
      background-color: white;
      font-weight: 400;
      font-size: 1rem;
    }

    .custom-label-group input {
      display: none;
    }

    label {
      font-family: inherit;
      margin: .25rem;
    }

    input[type="text"] {
      height: 70%;
      background-color: white;
      font-weight: 400;
      font-size: 1rem;
      color: black;
      font-weight: inherit;
    }

    textarea {
      height: 100px;
      width: 100%;
      resize: none;
      padding: .5rem;
      font-weight: 400;
      font-size: 1rem;
    }
  </style>