<template>
  <div>
    <br />
    <b-container style="margin-top: 80px;">
      <b>
        <b-icon-arrow-left></b-icon-arrow-left>
      </b>
      <router-link class="text-dark" to="/adminDashboard">
        &nbsp;
        <b>RETURN TO ADMIN DASHBOARD</b>
      </router-link>
      <br />
      <br />
      <b-row>
        <b-col cols="6"
          ><h3>
            <b>{{ application.title }}</b>
          </h3>
        </b-col>
        <b-col cols="6">
          <div class="text-right">
            <b-button
              squared
              variant="light"
              size="lg"
              @click="toggleEditOn"
              type="submit"
              class="text-dark borderGray"
            >
              <h4>Edit app info</h4>
            </b-button>
          </div>
        </b-col>
      </b-row>
      <br />

      <b-card bg-variant="white" class="container">
        <b-form @submit="onSubmit">
          <b-row>
            <b-col>
              <h3>
                <b>App Information</b>
              </h3>
              <br />
              <h4>Localizable Information</h4>
              <br />

              <b-form-group
                id="title-group"
                label-for="nested-title"
                label="Title"
              >
                <b-form-input
                  id="nested-title"
                  v-model="form.title"
                  type="title"
                  required
                  :disabled="editingOff"
                  maxlength="140"
                  class="borderGray"
                ></b-form-input>
                <b-form-text class="text-right"
                  ><i><b>(Max 140 characters)</b></i></b-form-text
                >
              </b-form-group>

              <b-form-group
                id="subtitle-groupinp"
                label="Subtitle"
                label-for="nested-subtitle"
              >
                <b-form-input
                  id="nested-subtitle"
                  v-model="form.subtitle"
                  type="subtitle"
                  class="borderGray"
                  :disabled="editingOff"
                  required
                  maxlength="255"
                ></b-form-input>
                <b-form-text class="text-right"
                  ><i><b>(Max 255 characters)</b></i></b-form-text
                >
              </b-form-group>
            </b-col>

            <b-col>
              <br />
              <h3 class="hideButTakeUpSpace">
                <b>App Information</b>
              </h3>
              <br />

              <h4 class="hideButTakeUpSpace">
                <b>Localizable Information</b>
              </h4>

              <b-form-group
                id="privacyPolicy-group"
                label-for="nested-privacyPolicyURL"
                label="Privacy Policy URL"
              >
                <b-form-input
                  id="nested-privacyPolicyURL"
                  v-model="form.privacyPolicyURL"
                  class="borderGray"
                  type="privacyPolicy"
                  :disabled="editingOff"
                  maxlength="140"
                ></b-form-input>
                <b-form-text class="text-right"
                  ><i><b>(Max 140 characters)</b></i></b-form-text
                >
              </b-form-group>

              <b-form-group
                id="customID-group"
                label="Custom Application ID"
                label-for="nested-customID"
              >
                <b-form-input
                  id="nested-customID"
                  v-model="form.id"
                  type="customID"
                  class="borderGray"
                  disabled
                  required
                  maxlength="255"
                ></b-form-input>
                <b-form-text class="text-right"
                  ><i><b>(Max 255 characters)</b></i></b-form-text
                >
              </b-form-group>
            </b-col>
          </b-row>

          <hr />

          <b-row>
            <b-col>
              <h4>General Information</h4>
              <br />

              <b-form-group
                id="companyName-group"
                label-for="nested-companyName"
                label="Company Name"
              >
                <b-form-input
                  id="nested-companyName"
                  v-model="form.companyName"
                  class="borderGray"
                  :disabled="editingOff"
                  type="name"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="appLogotype"
                label="Application Logotype"
                label-for="nested-appLogotype"
              >
                <b-row>
                  <b-col>
                    <div v-if="form.appLogotype != ''">
                      <b-form-input
                        id="nested-appLogotype"
                        type="appLogotype"
                        :disabled="editingOff"
                        class="borderGray"
                        placeholder="Temporary filler text"
                      ></b-form-input>
                    </div>

                    <div v-else>
                      <b-form-input
                        id="nested-appLogotype"
                        type="appLogotype"
                        :disabled="editingOff"
                        class="borderGray"
                        placeholder="Temporary filler text"
                      ></b-form-input>
                    </div>
                  </b-col>

                  <b-col>
                    <div
                      @click="clickAppLogotypeButton"
                      class="fileUpload btn btn-light borderGray"
                    >
                      <span>+ upload</span>
                      <input
                        type="file"
                        id="appLogotypeButton"
                        @change="onAppLogotypeChange"
                        class="mt-1 upload"
                        :disabled="editingOff"
                        size="sm"
                        plain
                      />
                    </div>
                  </b-col>
                </b-row>
              </b-form-group>
            </b-col>

            <b-col>
              <br />

              <h4 class="hideButTakeUpSpace">
                <b>Localizable Information</b>
              </h4>

              <b-form-group
                class="companyLogotype"
                id="companyLogotypeGroup"
                label="Company Logotype"
                label-for="nested-companyLogotype"
              >
                <b-row>
                  <b-col>
                    <div v-if="form.companyLogotype != ''">
                      <b-form-input
                        id="nested-companyLogotype"
                        type="companyLogotype"
                        :disabled="editingOff"
                        class="borderGray"
                        placeholder="Temporary filler text"
                      ></b-form-input>
                    </div>

                    <div v-else>
                      <b-form-input
                        id="nested-companyLogotype"
                        class="borderGray"
                        :disabled="editingOff"
                        placeholder="Temporary filler text"
                        type="companyLogotype"
                      ></b-form-input>
                    </div>
                  </b-col>

                  <b-col
                    ><div
                      @click="clickCompanyLogotypeButton"
                      class="fileUpload btn btn-light borderGray"
                    >
                      <span>+ upload</span>
                      <input
                        type="file"
                        :disabled="editingOff"
                        id="companyLogotypeButton"
                        @change="onCompanyLogotypeChange"
                        class="mt-1 upload"
                        plain
                      />
                    </div>
                  </b-col>
                </b-row>
              </b-form-group>
            </b-col>
          </b-row>
          <br />

          <label for="textarea-appDescription">Application Description</label>

          <b-row class="mt-2">
            <b-col sm="10">
              <b-form-textarea
                id="textarea-appDescription"
                class="borderGray"
                :disabled="editingOff"
                v-model="form.appDescription"
                rows="5"
              ></b-form-textarea>
            </b-col>
          </b-row>

          <br />
          <label for="textarea-appScreenshots">Application Screenshots</label>

          <b-row class="mt-2">
            <b-col sm="4">
              <div v-if="form.appScreenshots.length > 0">
                <b-form-textarea
                  class="borderGray"
                  id="textarea-appScreenshots"
                  :disabled="editingOff"
                  rows="5"
                  placeholder="Temporary filler text"
                ></b-form-textarea>
              </div>

              <div v-else>
                <b-form-textarea
                  class="borderGray"
                  id="textarea-appScreenshots"
                  :disabled="editingOff"
                  rows="5"
                  placeholder="Temporary filler text"
                ></b-form-textarea>
              </div>
            </b-col>

            <b-col>
              <div
                @click="clickAppScreenShotButton"
                class="fileUpload btn btn-light borderGray"
              >
                <span>+ upload</span>
                <input
                  type="file"
                  multiple
                  id="appScreenShotButton"
                  @change="onAppScreenShotChange"
                  class="mt-1 upload"
                  plain
                  accept="image/*"
                />
              </div>
            </b-col>
          </b-row>

          <br />

          <b-row>
            <b-col>
              <b-form-group
                id="certifications-group"
                label-for="nested-certifications"
                label="Certifications/Credentials Needed"
              >
                <b-form-input
                  id="nested-certifications"
                  class="borderGray"
                  :disabled="editingOff"
                  v-model="form.certifications"
                  type="certifications"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <br />

          <b-row>
            <b-col>
              <label for="textarea-typeOfApplication">Type</label>

              <select
                id="typeOfApplication"
                :disabled="editingOff"
                class="browser-default custom-select borderGray"
              >
                <option selected>Assessment</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>

              <br />
              <br />
              <b-form-group
                id="bundleID-group"
                label-for="nested-bundleID"
                label="Bundle ID"
              >
                <b-form-input
                  id="nested-bundleID"
                  v-model="form.bundleID"
                  :disabled="editingOff"
                  type="bundleID"
                  class="borderGray"
                ></b-form-input>
              </b-form-group>

              <b-form-group id="SKU-group" label="SKU" label-for="nested-SKU">
                <b-row>
                  <b-col>
                    <b-form-input
                      id="nested-SKU"
                      v-model="form.SKU"
                      type="SKU"
                      :disabled="editingOff"
                      class="borderGray"
                    ></b-form-input>
                  </b-col>
                </b-row>
              </b-form-group>

              <b-form-group
                id="ageRating-group"
                label="Age Rating"
                label-for="nested-ageRating"
              >
                <b-row>
                  <b-col>
                    <b-form-input
                      id="nested-ageRating"
                      v-model="form.ageRating"
                      type="ageRating"
                      :disabled="editingOff"
                      class="borderGray"
                    ></b-form-input>
                  </b-col>
                </b-row>
              </b-form-group>
            </b-col>

            <br />
            <b-col>
              <b-form-group
                id="timeRange"
                label="Max and Min Time"
                label-for="nested-timeRange"
              >
                <span class="col-xs-1"
                  >{{ parseInt(form.maxAndMin[0]) }} minute(s)</span
                >
                <span class="col-xs-1" style="float: right;"
                  >{{ parseInt(form.maxAndMin[1]) }} minute(s)</span
                >

                <vue-slider v-model="form.maxAndMin"></vue-slider>
              </b-form-group>
              <label>Primary Language</label>

              <select
                browser-default
                :disabled="editingOff"
                v-model="form.primaryLanguage"
                class="custom-select borderGray"
              >
                <option selected>English (U.S.)</option>
                <option value="1">Spanish</option>
                <option value="2">French</option>
                <option value="3">German</option>
                <option value="4">Italian</option>
                <option value="5">Polish</option>
                <option value="6">Japanese</option>
                <option value="7">Vietnamese</option>
                <option value="8">Malay</option>
              </select>

              <br />
              <br />

              <label>Category</label>

              <select
                :disabled="editingOff"
                class="browser-default custom-select borderGray"
              >
                <option selected>{{ form.category[0] }}</option>
              </select>

              <br />
              <br />

              <select
                :disabled="editingOff"
                class="browser-default custom-select borderGray"
              >
                <option selected>{{ form.category[1] }}</option>
              </select>
            </b-col>
          </b-row>

          <hr />

          <b-row>
            <b-col>
              <h4>Pricing and Availability</h4>
              <b-form-text class="text-left"
                ><i
                  ><b>(Mark application on sale to edit prices)</b></i
                ></b-form-text
              >
            </b-col>
          </b-row>

          <br />
          <b-row>
            <b-col cols="3">
              <b-form-group
                id="price-group"
                label-for="nested-price"
                label="Price"
              >
                <b-input-group prepend="USD">
                  <b-form-input
                    id="nested-price"
                    :disabled="form.onSale == 'B' || editingOff == true"
                    v-model="form.price"
                    class="borderGray"
                    type="price"
                    maxlength="140"
                  ></b-form-input>
                </b-input-group>
              </b-form-group>
            </b-col>

            <b-col cols="3">
              <b-form-group
                id="discounted1-group"
                label-for="nested-discounted1"
                label="Discounted Price 1"
              >
                <b-input-group prepend="USD">
                  <b-form-input
                    id="nested-discounted1"
                    class="borderGray"
                    v-model="form.discountedPrice1"
                    :disabled="form.onSale == 'B' || editingOff == true"
                    type="discounted1"
                    maxlength="140"
                  ></b-form-input>
                </b-input-group>
              </b-form-group>
            </b-col>

            <b-col cols="3">
              <b-form-group
                id="discounted2-group"
                label-for="nested-discounted2"
                label="Discounted Price 2"
              >
                <b-input-group prepend="USD">
                  <b-form-input
                    id="nested-discounted2"
                    v-model="form.discountedPrice2"
                    class="borderGray"
                    :disabled="form.onSale == 'B' || editingOff == true"
                    type="discounted2"
                    maxlength="140"
                  ></b-form-input>
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>

          <br />
          <b-form-group label="Availability">
            <b-row>
              <b-col cols="3">
                <country-select
                  v-model="form.country"
                  :country="form.country"
                  topCountry="US"
                />
                <region-select
                  v-model="form.region"
                  :country="form.country"
                  :region="form.region"
                />
              </b-col>
            </b-row>
            <br />
            <b-form-radio
              :disabled="editingOff"
              v-model="form.onSale"
              name="some-radios"
              value="A"
              >For sale</b-form-radio
            >

            <b-form-radio
              :disabled="editingOff"
              v-model="form.onSale"
              name="some-radios"
              value="B"
              >Not for sale</b-form-radio
            >
          </b-form-group>
          <br />

          <b-button
            squared
            type="submit"
            size="lg"
            class="save text-dark borderGray"
          >
            <b>Save Changes</b>
          </b-button>

          <br />
        </b-form>
      </b-card>

      <br />
      <br />
      <br />
    </b-container>
  </div>
</template>

<script>
import VueSlider from "vue-slider-component";
import { BIconArrowLeft } from "bootstrap-vue";
import instance from "../axios.js"

export default {
  name: "EditApp",
  props: {
    application: Object,
  },
  components: {
    VueSlider,
    BIconArrowLeft,
  },
  data() {
    return {
      form: {
        title: this.application.title,
        subtitle: this.application.subtitle,
        id: this.application.id,
        privacyPolicyURL: this.application.privacyPolicyURL,
        companyName: this.application.companyName,
        appLogotype: this.application.appLogotype,
        companyLogotype: this.application.companyLogotype,
        maxAndMin: this.application.maxAndMin,
        appDescription: this.application.appDescription,
        appScreenshots: this.application.appScreenshots,
        certifications: this.application.certifications,
        type: this.application.type,
        bundleID: this.application.bundleID,
        SKU: this.application.SKU,
        ageRating: this.application.ageRating,
        primaryLanguage: this.application.primaryLanguage,
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
        checked: [],
      },

      show: true,
      editingOff: true,
    };
  },
  methods: {
    toggleEditOn() {
      this.editingOff = !this.editingOff;
    },

    clickAppScreenShotButton() {
      document.getElementById("appScreenShotButton").click();
    },

    clickAppLogotypeButton() {
      document.getElementById("appLogotypeButton").click();
    },

    clickCompanyLogotypeButton() {
      document.getElementById("companyLogotypeButton").click();
    },

    onAppScreenShotChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      this.form.appScreenshots = files;

      this.encodeAppScreenshotsAsURL();
      return files[0];
    },

    encodeAppScreenshotsAsURL() {
      var files = this.form.appScreenshots;
      console.log("Images being encoded ", files);

      Array.from(files).forEach((file, index) => {
        const reader = new FileReader();
        reader.addEventListener("load", (e) => {
          this.application.appScreenshots = Array.from(
            this.form.appScreenshots
          );
          this.application.appScreenshots[index] = e.target.result;
          console.log("App screenshots: ", this.application.appScreenshots);
        });
        reader.readAsDataURL(file);

        console.log("These are the encoded images: ", this.form.appScreenshots);
      });
    },

    encodeAppLogotypeAsURL() {
      var file = this.form.appLogotype;
      console.log("Images being encoded ", file);

      const reader = new FileReader();
      reader.addEventListener("load", (e) => {
        this.application.appLogotype = Array.from(this.form.appLogotype);
        this.application.appLogotype = e.target.result;
        console.log("App logotype: ", this.application.appLogotype);
      });
      reader.readAsDataURL(file);

      console.log("These are the encoded images: ", this.form.appLogotype);
    },

    encodeCompanyLogotypeAsURL() {
      var file = this.form.companyLogotype;
      console.log("Images being encoded ", file);

      const reader = new FileReader();
      reader.addEventListener("load", (e) => {
        this.application.companyLogotype = Array.from(
          this.form.companyLogotype
        );
        this.application.companyLogotype = e.target.result;
        console.log(
          "companyLogotype logotype: ",
          this.application.companyLogotype
        );
      });

      reader.readAsDataURL(file);

      console.log("These are the encoded images: ", this.form.companyLogotype);
    },

    onCompanyLogotypeChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      this.application.companyLogotype = files[0];
      this.form.companyLogotype = files[0];

      this.encodeCompanyLogotypeAsURL();
      return files[0];
    },

    onAppLogotypeChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      this.application.appLogotype = files[0];
      this.form.appLogotype = files[0];

      this.encodeAppLogotypeAsURL();
      return files[0];
    },

    onSubmit(evt) {
      evt.preventDefault();

      this.application.title = this.form.title;
      this.application.subtitle = this.form.subtitle;
      this.application.id = this.form.id;
      this.application.privacyPolicyURL = this.form.privacyPolicyURL;
      this.application.companyName = this.form.companyName;
      // this.application.companyLogotype = this.form.companyLogotype;
      // this.application.appLogotype = this.form.appLogotype;
      this.application.appDescription = this.form.appDescription;
      // this.application.appScreenshots = this.form.appScreenshots.trim();
      this.application.certifications = this.form.certifications;
      this.application.type = this.form.type;
      this.application.bundleID = this.form.bundleID;
      this.application.SKU = this.form.SKU;
      this.application.ageRating = this.form.ageRating;
      this.application.maxAndMin = [
        this.form.maxAndMin[0].toString(),
        this.form.maxAndMin[1].toString(),
      ];
      this.application.questions = [];
      this.application.primaryLanguage = this.form.primaryLanguage;
      this.application.category = this.form.category;
      this.application.price = this.form.price;
      this.application.discountedPrice1 = this.form.discountedPrice1;
      this.application.discountedPrice2 = this.form.discountedPrice2;
      this.application.country = this.form.country;
      this.application.region = this.form.region;
      this.application.onSale = this.form.onSale;
      this.application.version = this.form.version;
      this.application.status = this.form.status;
      this.application.deploymentDate = this.form.deploymentDate;
      this.application.deploymentCode = this.form.deploymentCode;

      // let headers = "Content-Type: application/json";

      instance
        .patch(
          "api/appAdmin/" + this.application.id,
          this.application
        )
        .then(() => {
          console.log("Application updated: id ", this.application.id);
          this.$router.push("/adminDashboard");
        });
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
  font-size: 15px;
  opacity: 0;
  filter: alpha(opacity=0);
}

.borderGray {
  border: 1.4px solid #cccccc;
}

.hideButTakeUpSpace {
  visibility: hidden;
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
</style>
