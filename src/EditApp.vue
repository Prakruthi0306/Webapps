<template>
  <div>
    <br />
    <b-container>
      <b-icon icon="arrow-left"></b-icon>
      <router-link class="text-dark" to="/">RETURN TO DASHBOARD</router-link>
      <br />
      <b-card bg-variant="white" class="container">
        <b-form @submit="onSubmit">
          <b-row>
            <b-col>
              <h4>
                <b>{{ title }} App Information</b>
              </h4>
              <br />

              <h5>Localizable Information</h5>
              <br />

              <b-form-group id="title-group" label-for="nested-title" label="Title">
                <b-form-input
                  id="nested-title"
                  v-model="form.title"
                  type="title"
                  required
                  maxlength="140"
                ></b-form-input>
                <b-form-text class="text-right">(Max 140 characters)</b-form-text>
              </b-form-group>

              <b-form-group id="subtitle-groupinp" label="Subtitle" label-for="nested-subtitle">
                <b-form-input
                  id="nested-subtitle"
                  v-model="form.subtitle"
                  type="subtitle"
                  required
                  maxlength="255"
                ></b-form-input>
                <b-form-text class="text-right">(Max 255 characters)</b-form-text>
              </b-form-group>
            </b-col>

            <b-col>
              <br />
              <h4 class="hideButTakeUpSpace">
                <b>App Information</b>
              </h4>
              <br />

              <h5 class="hideButTakeUpSpace">
                <b>Localizable Information</b>
              </h5>

              <b-form-group
                id="privacyPolicy-group"
                label-for="nested-privacyPolicyURL"
                label="Privacy Policy URL"
              >
                <b-form-input
                  id="nested-privacyPolicyURL"
                  v-model="form.privacyPolicy"
                  type="privacyPolicy"
                  required
                  maxlength="140"
                ></b-form-input>
                <b-form-text class="text-right">(Max 140 characters)</b-form-text>
              </b-form-group>

              <b-form-group
                id="customID-group"
                label="Custom Application ID"
                label-for="nested-customID"
              >
                <b-form-input
                  id="nested-customID"
                  v-model="form.customID"
                  type="customID"
                  required
                  maxlength="255"
                ></b-form-input>
                <b-form-text class="text-right">(Max 255 characters)</b-form-text>
              </b-form-group>
            </b-col>
          </b-row>

          <hr />

          <b-row>
            <b-col>
              <h5>General Information</h5>
              <br />

              <b-form-group
                id="companyName-group"
                label-for="nested-companyName"
                label="Company Name"
              >
                <b-form-input
                  id="nested-companyName"
                  v-model="form.companyName"
                  type="name"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="applicationLogotype"
                label="Application Logotype"
                label-for="nested-applicationLogotype"
              >
                <b-row>
                  <b-col>
                    <b-form-input
                      id="nested-applicationLogotype"
                      v-model="form.applicationLogotype"
                      type="applicationLogotype"
                      required
                    ></b-form-input>
                  </b-col>

                  <b-col>
                    <b-form-file v-model="file2" class="mt-1" plain></b-form-file>
                  </b-col>
                </b-row>
              </b-form-group>
            </b-col>

            <b-col>
              <br />

              <h5 class="hideButTakeUpSpace">
                <b>Localizable Information</b>
              </h5>

              <b-form-group
                class="companyLogotype"
                id="companyLogotypeGroup"
                label="Company Logotype"
                label-for="nested-companyLogotype"
              >
                <b-row>
                  <b-col>
                    <b-form-input
                      id="nested-companyLogotype"
                      v-model="form.companyLogotype"
                      type="companyLogotype"
                      required
                    ></b-form-input>
                  </b-col>

                  <b-col>
                    <b-form-file v-model="file2" class="mt-1" plain></b-form-file>
                  </b-col>
                </b-row>
              </b-form-group>
            </b-col>
          </b-row>
          <br />

          <label for="textarea-appDescriptions">Application Descriptions</label>

          <b-row class="mt-2">
            <b-col sm="10">
              <b-form-textarea id="textarea-appDescriptions" rows="5"></b-form-textarea>
            </b-col>
          </b-row>

          <br />
          <label for="textarea-appScreenshots">Application Screenshots</label>

          <b-row class="mt-2">
            <b-col sm="4">
              <b-form-textarea id="textarea-appScreenshots" rows="5"></b-form-textarea>
            </b-col>

            <b-col>
              <b-form-file v-model="file2" class="mt-1" plain></b-form-file>
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
                  v-model="form.certifications"
                  type="certifications"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <br />

          <b-row>
            <b-col>
              <label for="textarea-appScreenshots">Type</label>

              <select class="browser-default custom-select" required>
                <option selected>Assessment</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>

              <br />
              <br />
              <b-form-group id="bundleID-group" label-for="nested-bundleID" label="Bundle ID">
                <b-form-input id="nested-bundleID" v-model="form.bundleID" type="bundleID" required></b-form-input>
              </b-form-group>

              <b-form-group id="SKU-group" label="SKU" label-for="nested-SKU">
                <b-row>
                  <b-col>
                    <b-form-input id="nested-SKU" v-model="form.SKU" type="SKU" required></b-form-input>
                  </b-col>
                </b-row>
              </b-form-group>

              <b-form-group id="ageRating-group" label="Age Rating" label-for="nested-ageRating">
                <b-row>
                  <b-col>
                    <b-form-input
                      id="nested-ageRating"
                      v-model="form.ageRating"
                      type="ageRating"
                      required
                    ></b-form-input>
                  </b-col>
                </b-row>
              </b-form-group>
            </b-col>

            <br />
            <b-col>
              <b-form-group id="timeRange" label="Max and Min Time" label-for="nested-timeRange">
                <span class="col-xs-1">{{ value[0] }} minute(s)</span>
                <span class="col-xs-1" style="float: right;">{{ value[1] }} minute(s)</span>

                <vue-slider v-model="value"></vue-slider>
              </b-form-group>
              <label for="textarea-appScreenshots">Primary Language</label>

              <select browser-default class="custom-select" required>
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

              <label for="textarea-appScreenshots">Category</label>

              <select class="browser-default custom-select" required>
                <option selected>Education</option>
              </select>

              <br />
              <br />

              <select class="browser-default custom-select" required>
                <option selected>Health & Fitness</option>
              </select>
            </b-col>
          </b-row>

          <hr />

          <b-row>
            <b-col>
              <h5>Pricing and Availability</h5>
            </b-col>
          </b-row>

          <br />
          <b-row>
            <b-col cols="3">
              <b-form-group id="price-group" label-for="nested-price" label="Price">
                <b-input-group prepend="USD">
                  <b-form-input
                    id="nested-price"
                    v-model="form.price"
                    type="price"
                    required
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
                    v-model="form.discounted1"
                    type="discounted1"
                    required
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
                    v-model="form.discounted2"
                    type="discounted2"
                    required
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
                <b-form-radio
                  v-model="selected"
                  name="some-radios"
                  value="A"
                >All countries or region selected</b-form-radio>
              </b-col>

              <b-col cols="3">
                <b-button variant="outline-secondary" class="text-dark">Change country</b-button>
              </b-col>
            </b-row>
            <b-form-radio v-model="selected" name="some-radios" value="B">Remove from sale</b-form-radio>
          </b-form-group>
          <br />
          <b-button type="submit" size="lg" class="save text-dark">
            <b>Save</b>
          </b-button>
        </b-form>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import VueSlider from "vue-slider-component";

export default {
  name: "EditApp",
  props: {
    title: String,
    subtitle: String,
    customID: String
  },
  components: {
    VueSlider
  },
  data() {
    return {
      form: {
        title: "",
        subtitle: "",
        customID: null,
        privacyPolicyURL: "",
        companyName: "",
        applicationLogotype: null,
        companyLogotype: null,
        checked: []
      },
      value: [30, 60],
      show: true
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    }
  }
};
</script>

<style scoped>
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
