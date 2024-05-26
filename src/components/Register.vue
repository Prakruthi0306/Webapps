<template>
  <b-container>
    <b-row class="justify-content-center vertical-center">
      <div class="col-md-10">
        <p id="name"></p>
        <br /><br /><br /><br /><br />

        <b-card bg-variant="white" class="container">
          <b-form>
            <br />
            <h3><b>NAME</b></h3>
            <hr />

            <b-row>
              <b-col cols="4"
                ><div>
                  <h5>
                    <label><b>First Name</b></label>
                  </h5>
                  <input
                    type="required"
                    name="firstName"
                    id="firstName"
                    class="reduceInputHeight"
                  />
                </div>
                <small>
                  <b-alert
                    :key="showAlertFirstName"
                    :show="showAlertFirstName == true"
                    variant="danger"
                    :style="'margin-top: 4px; padding: 4px;'"
                    >{{ errors.firstName }}</b-alert
                  ></small
                >
              </b-col>

              <b-col cols="4"
                ><div>
                  <h5>
                    <label><b>Middle Name</b></label>
                  </h5>
                  <input
                    type="required"
                    name="middleName"
                    id="middleName"
                    class="reduceInputHeight"
                  />
                </div>
              </b-col>
              <b-col cols="4"
                ><div>
                  <h5>
                    <label><b>Last Name</b></label>
                  </h5>
                  <input
                    type="required"
                    name="lastName"
                    id="lastName"
                    class="reduceInputHeight"
                  />
                </div>
                <small>
                  <b-alert
                    :key="showAlertLastName"
                    :show="showAlertLastName == true"
                    variant="danger"
                    :style="'margin-top: 4px; padding: 4px;'"
                    >{{ errors.lastName }}</b-alert
                  ></small
                ></b-col
              >
            </b-row>
            <br />

            <b-row>
              <b-col cols="4"
                ><div>
                  <h5>
                    <label><b>Pronouns</b></label>
                  </h5>
                  <select id="pronouns">
                    <option>His</option>
                    <option>Her</option>
                    <option>Other</option>
                  </select>
                </div>
              </b-col>

              <b-col cols="4"
                ><div>
                  <h5>
                    <label><b>Role</b></label>
                  </h5>
                  <input
                    type="required"
                    name="role"
                    id="role"
                    class="reduceInputHeight"
                  />
                </div>
                <small>
                  <b-alert
                    :key="showAlertRole"
                    :show="showAlertRole == true"
                    :style="'margin-top: 4px; padding: 4px;'"
                    variant="danger"
                    >{{ errors.role }}</b-alert
                  ></small
                ></b-col
              >

              <b-col cols="4"
                ><div>
                  <h5>
                    <label><b>Access Role</b></label>
                  </h5>
                  <select
                    id="userLevel"
                    v-model="userData.userLevel"
                    class="custom-select"
                  >
                    <option value="" disabled selected
                      >Select access type</option
                    >
                    <option value="App Admin">App Admin</option>
                    <option value="App User">App User</option>
                    <option value="Developer">Developer</option>
                    <option value="Organization">Organization</option>
                    <option value="Parent/Caretaker">Parent/Caretaker</option>
                    <option value="Specialist">Specialist</option>
                    <option value="Statistician/Analyst"
                      >Statistician/Analyst</option
                    >
                    <option value="Super Admin">Super Admin</option>
                  </select>
                </div>
                <small>
                  <b-alert
                    :key="showAlertRole"
                    :show="showAlertRole == true"
                    :style="'margin-top: 4px; padding: 4px;'"
                    variant="danger"
                    >{{ errors.role }}</b-alert
                  ></small
                ></b-col
              >

              <b-col v-if="showSpecialistFields" cols="4">
                <div>
                  <h5>
                    <label for="subSpecialist"><b>Specialist Type</b></label>
                  </h5>
                  <select
                    v-model="userData.subSpecialist"
                    id="subSpecialist"
                    class="custom-select"
                  >
                    <option value="" disabled selected
                      >Select Specialist type</option
                    >
                    <option value="Child Counselor">Child Counselor</option>
                    <option value="Language Therapist"
                      >Language Therapist</option
                    >
                    <option value="Neuro-pediatrician"
                      >Neuro-pediatrician</option
                    >
                    <option value="Occupational Therapist (OT)"
                      >Occupational Therapist (OT)</option
                    >
                    <option value="Occupational Therapist Assistant (OTA)"
                      >Occupational Therapist Assistant (OTA)</option
                    >
                    <option value="Physical Therapist/Kinesiologist"
                      >Physical Therapist/Kinesiologist</option
                    >
                    <option value="Psychotherapist">Psychotherapist</option>
                    <option value="Psychologist">Psychologist</option>
                    <option value="Reading Specialist (RSP)"
                      >Reading Specialist (RSP)</option
                    >
                    <option value="Social Worker">Social Worker</option>
                    <option value="Special Education Teacher"
                      >Special Education Teacher</option
                    >
                    <option value="Speech & Language Pathologist (SLP)"
                      >Speech & Language Pathologist (SLP)</option
                    >
                    <option
                      value="Speech & Language Pathologist Assistant (SLPA)"
                      >Speech & Language Pathologist Assistant (SLPA)</option
                    >
                    <option value="Speech Therapist">Speech Therapist</option>
                  </select>
                </div>
              </b-col>
              <b-col v-if="showSpecialistFields" cols="4">
                <div>
                  <h5>
                    <label for="certification"><b>Certification</b></label>
                  </h5>
                  <input
                    type="text"
                    v-model="userData.certification"
                    id="certification"
                    class="reduceInputHeight"
                    placeholder="Enter name of certification"
                  />
                </div>
              </b-col> </b-row
            ><br />

            <p id="work"></p>
            <br /><br /><br /><br />

            <h3><b>WORK</b></h3>
            <hr />

            <b-row>
              <b-col cols="4"
                ><div>
                  <h5>
                    <label><b>Organization Name</b></label>
                  </h5>
                  <input
                    type="required"
                    name="organizationName"
                    id="organizationName"
                    class="reduceInputHeight"
                  />
                </div>
                <small>
                  <b-alert
                    :key="showAlertOrganizationName"
                    :show="showAlertOrganizationName == true"
                    :style="'margin-top: 4px; padding: 4px;'"
                    variant="danger"
                    >{{ errors.organizationName }}</b-alert
                  ></small
                ></b-col
              ><b-col cols="4"
                ><div>
                  <h5>
                    <label><b>Department</b></label>
                  </h5>
                  <input
                    type="required"
                    name="department"
                    id="department"
                    class="reduceInputHeight"
                  />
                </div>
                <small>
                  <b-alert
                    :key="showAlertDepartment"
                    :show="showAlertDepartment == true"
                    variant="danger"
                    :style="'margin-top: 4px; padding: 4px;'"
                    >{{ errors.department }}</b-alert
                  ></small
                ></b-col
              >
            </b-row>
            <br />

            <b-row>
              <b-col cols="4"
                ><div>
                  <h5>
                    <label><b>Site Name</b></label>
                  </h5>
                  <input
                    type="required"
                    name="siteName"
                    id="siteName"
                    class="reduceInputHeight"
                  /></div
              ></b-col>
              <b-col cols="4"
                ><div>
                  <h5>
                    <label><b>Group Name</b></label>
                  </h5>
                  <input
                    type="required"
                    name="groupName"
                    id="groupName"
                    class="reduceInputHeight"
                  /></div></b-col></b-row
            ><br />

            <p id="location"></p>
            <br /><br /><br /><br />

            <h3><b>LOCATION</b></h3>
            <hr />

            <b-row>
              <b-col cols="4"
                ><div>
                  <h5>
                    <label><b>Address 1</b></label>
                  </h5>
                  <input
                    type="required"
                    name="addressLine1"
                    id="addressLine1"
                    class="reduceInputHeight"
                  />
                </div>
                <small>
                  <b-alert
                    :key="showAlertAddress1"
                    :show="showAlertAddress1 == true"
                    :style="'margin-top: 4px; padding: 4px;'"
                    variant="danger"
                    >{{ errors.addressLine1 }}</b-alert
                  ></small
                ></b-col
              >

              <b-col cols="4"
                ><div>
                  <h5>
                    <label><b>Address 2</b></label>
                  </h5>
                  <input
                    type="required"
                    name="addressLine2"
                    id="addressLine2"
                    class="reduceInputHeight"
                  /></div
              ></b-col> </b-row
            ><br />

            <b-row>
              <b-col cols="4"
                ><div>
                  <h5>
                    <label><b>City</b></label>
                  </h5>
                  <input
                    type="required"
                    name="city"
                    id="city"
                    class="reduceInputHeight"
                  />
                </div>
                <small>
                  <b-alert
                    :key="showAlertCity"
                    :show="showAlertCity == true"
                    :style="'margin-top: 4px; padding: 4px;'"
                    variant="danger"
                    >{{ errors.city }}</b-alert
                  ></small
                ></b-col
              >
              <b-col cols="4"
                ><div>
                  <h5>
                    <label><b>State or Province</b></label>
                  </h5>
                  <input
                    type="required"
                    name="state"
                    id="state"
                    class="reduceInputHeight"
                  />
                </div>
                <small>
                  <b-alert
                    :key="showAlertState"
                    :show="showAlertState == true"
                    :style="'margin-top: 4px; padding: 4px;'"
                    variant="danger"
                    >{{ errors.state }}</b-alert
                  ></small
                ></b-col
              ></b-row
            ><br />

            <b-row>
              <b-col cols="4"
                ><div>
                  <h5>
                    <label><b>Country</b></label>
                  </h5>
                  <input
                    type="required"
                    name="country"
                    id="country"
                    class="reduceInputHeight"
                  />
                </div>
                <small>
                  <b-alert
                    :key="showAlertCountry"
                    :show="showAlertCountry == true"
                    :style="'margin-top: 4px; padding: 4px;'"
                    variant="danger"
                    >{{ errors.country }}</b-alert
                  ></small
                ></b-col
              ><b-col cols="4"
                ><div>
                  <h5>
                    <label><b>Zip or Postal code</b></label>
                  </h5>
                  <input
                    type="required"
                    name="zipcode"
                    id="zipcode"
                    class="reduceInputHeight"
                  />
                </div>
                <small>
                  <b-alert
                    :key="showAlertZipCode"
                    :show="showAlertZipCode == true"
                    :style="'margin-top: 4px; padding: 4px;'"
                    variant="danger"
                    >{{ errors.zipcode }}</b-alert
                  ></small
                ></b-col
              > </b-row
            ><br />

            <b-row>
              <b-col cols="4"
                ><div>
                  <h5>
                    <label><b>Phone Number</b></label>
                  </h5>
                  <input
                    type="required"
                    name="phoneNumber"
                    id="phoneNumber"
                    class="reduceInputHeight"
                  />
                </div>
                <small>
                  <b-alert
                    :key="showAlertPhoneNumber"
                    :show="showAlertPhoneNumber == true"
                    :style="'margin-top: 4px; padding: 4px;'"
                    variant="danger"
                    >{{ errors.phone }}</b-alert
                  ></small
                ></b-col
              >
              <b-col cols="4"
                ><div>
                  <h5>
                    <label><b>Alternative Phone</b></label>
                  </h5>
                  <input
                    type="required"
                    name="alternatePhone"
                    id="alternatePhone"
                    class="reduceInputHeight"
                  /></div
              ></b-col> </b-row
            ><br />

            <p id="createLogin"></p>
            <br /><br /><br /><br />

            <h3><b>CREATE LOGIN</b></h3>
            <hr />

            <b-row>
              <b-col cols="4"
                ><div>
                  <h5>
                    <label><b>Email address</b></label>
                  </h5>
                  <input
                    type="required"
                    name="email"
                    id="email"
                    class="reduceInputHeight"
                  />
                </div>
                <small>
                  <b-alert
                    :key="showAlertEmail"
                    :style="'margin-top: 4px; padding: 4px;'"
                    :show="showAlertEmail == true"
                    variant="danger"
                    >{{ errors.email }}</b-alert
                  ></small
                >
              </b-col> </b-row
            ><br />

            <b-row>
              <b-col cols="4"
                ><div>
                  <h5>
                    <label><b>Password</b></label>
                  </h5>
                  <input
                    v-if="passwordShow1 == false"
                    type="password"
                    name="password"
                    id="password"
                    :style="'margin-top: 4px; padding: 4px;'"
                    class="reduceInputHeight"
                  />

                  <input
                    v-if="passwordShow1"
                    type="text"
                    name="password"
                    id="password"
                    :style="'margin-top: 4px; padding: 4px;'"
                    class="reduceInputHeight"
                  />

                  <b-icon-eye-fill
                    v-if="passwordShow1 == false"
                    style="margin-left: -30px; cursor: pointer;"
                    @click="togglePassword('1')"
                  ></b-icon-eye-fill>

                  <b-icon-eye-slash-fill
                    v-if="passwordShow1"
                    style="margin-left: -30px; cursor: pointer;"
                    @click="togglePassword('1')"
                  ></b-icon-eye-slash-fill>
                </div>
                <small>
                  <b-form-text id="password-help-block">
                    Password must contain at least 8 characters, 1 number, and 1
                    special character (e.g. '$', '%', '@').
                  </b-form-text></small
                ><small>
                  <b-alert
                    :key="showAlertPassword"
                    :show="showAlertPassword == true"
                    variant="danger"
                    :style="'margin-top: 4px; padding: 4px;'"
                    >{{ errors.password }}</b-alert
                  ></small
                >
              </b-col> </b-row
            ><br />

            <b-row>
              <b-col cols="4"
                ><div>
                  <h5>
                    <label><b>Confirm Password</b></label>
                  </h5>
                  <input
                    v-if="passwordShow2 == false"
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    class="reduceInputHeight"
                  />

                  <input
                    v-if="passwordShow2"
                    type="text"
                    name="confirmPassword"
                    id="confirmPassword"
                    class="reduceInputHeight"
                  />

                  <b-icon-eye-fill
                    v-if="passwordShow2 == false"
                    style="margin-left: -30px; cursor: pointer;"
                    @click="togglePassword('2')"
                  ></b-icon-eye-fill>

                  <b-icon-eye-slash-fill
                    v-if="passwordShow2"
                    style="margin-left: -30px; cursor: pointer;"
                    @click="togglePassword('2')"
                  ></b-icon-eye-slash-fill>
                </div>
                <small>
                  <b-alert
                    :key="showAlertConfirmPassword"
                    :show="showAlertConfirmPassword == true"
                    :style="'margin-top: 4px; padding: 4px;'"
                    variant="danger"
                    >{{ errors.confirmPassword }}</b-alert
                  ></small
                ></b-col
              > </b-row
            ><br />

            <b-button :key="loading" variant="warning" size="sm" @click="submit"
              ><b-spinner small v-if="loading"></b-spinner
              ><span v-if="loading">Registering</span
              ><span v-else>Register</span></b-button
            >
          </b-form>
        </b-card>
      </div>
    </b-row>
  </b-container>
</template>

<style scoped>
.reduceInputHeight {
  font-size: 11px;
  width: 100%;
  height: 50%;
  padding: 0.4em;
  border: 1px solid lightgray;
  background-color: lightgray;
}
select {
  width: 100%;
  height: 50%;
  padding: 0.4em;
  border: 1px solid lightgray;
  background-color: lightgray;
  font-size: 11px;
}

.custom-select option[disabled][selected] {
  color: #666; /* Light gray color */
  opacity: 0.7; /* Adjust opacity for transparency */
}
h5 {
  margin-bottom: -8px;
}
h1,
h2,
h3,
h3,
h5,
h6,
p,
input {
  color: black;
}
</style>

<script>
import instance from "../axios.js";
import emailjs from "emailjs-com";
import { init } from "emailjs-com";
import { BIconEyeFill, BIconEyeSlashFill } from "bootstrap-vue";

init("user_4emeb9XisHrwOnwGddizV");

export default {
  name: "Register",
  components: {
    BIconEyeFill,
    BIconEyeSlashFill,
  },

  data() {
    return {
      userData: {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        addressLine1: "",
        addressLine2: "",
        country: "",
        state: "",
        city: "",
        zipcode: "",
        phone: "",
        alternatePhone: "",
        userRegistrationModal: false,
        userLevel: "",
        subSpecialist: "",
        certification: "",
      },
      passwordShow1: false,
      passwordShow2: false,
      errors: {},

      valid: true,
      showAlertRegistrationFailure: false,

      showAlertEmail: false,
      showAlertPassword: false,
      showAlertConfirmPassword: false,

      showAlertFirstName: false,
      showAlertLastName: false,
      showAlertAddress1: false,
      showAlertCountry: false,
      showAlertState: false,
      showAlertCity: false,
      showAlertZipCode: false,
      showAlertPhoneNumber: false,
      showAlertOrganizationName: false,
      showAlertDepartment: false,
      showAlertRole: false,
      showUserLevel: false,
      showSpecialistFields: false,
    };
  },

  computed: {
    loading() {
      return this.$store.getters.getLoadStatus;
    },
  },

  watch: {
    // Watch for changes in the userLevel property
    "userData.userLevel"(newValue) {
      if (newValue === "Specialist") {
        this.showSpecialistFields = true;
      } else {
        this.showSpecialistFields = false;
        // Reset specialist fields when user level changes
        this.userData.subSpecialist = "";
        this.userData.certification = "";
      }
    },
  },

  methods: {
    togglePassword(number) {
      if (number == "1") {
        this.passwordShow1 = !this.passwordShow1;
      }

      if (number == "2") {
        this.passwordShow2 = !this.passwordShow2;
      }
    },

    validateEmail(email) {
      if (!email.length) {
        return { valid: false, error: "This field is required" };
      }
      if (email.match(/^\w+([.-]?\w+)_@\w+(_[_.-]?\w+)_(.\w{2,3})+$/)) {
        return {
          valid: false,
          error: "Please enter a valid email.",
        };
      }
      return { valid: true, error: null };
    },

    validatePassword(password) {
      if (!password.length) {
        return { valid: false, error: "This field is required" };
      }
      if (password.length < 8) {
        return {
          valid: false,
          error: "Password requires at least 8 characters",
        };
      }
      if (
        !/[~`!#$%@&*+=\-';,/{}|":<>]/g.test(password) ||
        !/\d/.test(password)
      ) {
        return {
          valid: false,
          error:
            "Password requires at least 1 number and 1 special character (e.g. '$', '%', '@').",
        };
      }
      return { valid: true, error: null };
    },

    validateConfirmPassword(confirmPassword, password) {
      if (!confirmPassword.length) {
        return { valid: false, error: "This field is required" };
      }
      if (confirmPassword != password) {
        return {
          valid: false,
          error: "The passwords you entered did not match",
        };
      }

      return { valid: true, error: null };
    },

    validatePronoun(pronoun) {
      if (pronoun === null || pronoun.length === 0) {
        return { valid: false, error: "This field is required" };
      }
      return { valid: true, error: null };
    },
    // Check if First Name is filled
    validateFirstName(firstName) {
      if (firstName === null || firstName.length === 0) {
        return { valid: false, error: "This field is required" };
      }
      return { valid: true, error: null };
    },
    //Check if Last Name is filled

    validateLastName(lastName) {
      if (lastName === null || lastName.length === 0) {
        return { valid: false, error: "This field is required" };
      }
      return { valid: true, error: null };
    },
    //Check if address is filled

    validateRole(role) {
      if (role === null || role.length === 0) {
        return { valid: false, error: "This field is required" };
      }
      return { valid: true, error: null };
    },

    validateUserLevel(userLevel) {
      if (userLevel === null || userLevel.length === 0) {
        return { valid: false, error: "This field is required" };
      }
      return { valid: true, error: null };
    },

    //Check if address is filled

    validateAddressLine1(addressLine1) {
      if (addressLine1 === null || addressLine1 === 0) {
        return { valid: false, error: "This field is required" };
      }
      return { valid: true, error: null };
    },

    //Check if organization name is filled
    validateOrganizationName(organizationName) {
      if (organizationName === null || organizationName === 0) {
        return { valid: false, error: "This field is required" };
      }
      return { valid: true, error: null };
    },

    //Check if department name is filled
    validateDepartment(department) {
      if (department === null || department === 0) {
        return { valid: false, error: "This field is required" };
      }
      return { valid: true, error: null };
    },
    //Check if country is filled

    validateCountry(country) {
      if (country === null || country.length === 0) {
        return { valid: false, error: "This field is required" };
      }
      return { valid: true, error: null };
    },

    //Check if state is filled
    validateState(state) {
      if (state === null || state.length === 0) {
        return { valid: false, error: "This field is required" };
      }
      return { valid: true, error: null };
    },
    //Check if city is filled

    validateCity(city) {
      if (city === null || city.length === 0) {
        return { valid: false, error: "This field is required" };
      }
      return { valid: true, error: null };
    },

    //check if zipcode is filled

    validateZipCode(zipcode) {
      if (zipcode === null || zipcode.length === 0) {
        return { valid: false, error: "This field is required" };
      }
      return { valid: true, error: null };
    },

    //Check phone Number

    validatePhoneNumber(phone) {
      if ((phone === null || phone.length === 0) && phone.length !== 10) {
        return { valid: false, error: "This field is required" };
      }
      return { valid: true, error: null };
    },

    submit() {
      this.showAlertLoginFailure = false;
      this.showAlertEmail = false;
      this.showAlertPassword = false;
      this.showAlertFirstName = false;
      this.showAlertLastName = false;
      this.showAlertAddress1 = false;
      this.showAlertOrganizationName = false;
      this.showAlertDepartment = false;
      this.showAlertRole = false;
      this.showUserLevel = false;

      this.showAlertCountry = false;
      this.showAlertState = false;
      this.showAlertCity = false;
      this.showAlertZipCode = false;
      this.showAlertPhoneNumber = false;

      this.valid = true;
      this.errors = {};

      var pronouns = document.getElementById("pronouns").value;
      var firstName = document.getElementById("firstName").value;
      var middleName = document.getElementById("middleName").value;
      var lastName = document.getElementById("lastName").value;
      var email = document.getElementById("email").value;
      var password = document.getElementById("password").value;
      var confirmPassword = document.getElementById("confirmPassword").value;
      var role = document.getElementById("role").value;
      var subSpecialistElement = document.getElementById("subSpecialist");
      var subSpecialist = subSpecialistElement
        ? subSpecialistElement.value
        : "";

      var certificationElement = document.getElementById("certification");
      var certification = certificationElement
        ? certificationElement.value
        : "";
      var userLevel = document.getElementById("userLevel").value;
      var organizationName = document.getElementById("organizationName").value;
      var department = document.getElementById("department").value;
      var siteName = document.getElementById("siteName").value;
      var groupName = document.getElementById("groupName").value;
      var addressLine1 = document.getElementById("addressLine1").value;
      var addressLine2 = document.getElementById("addressLine2").value;
      var city = document.getElementById("city").value;
      var state = document.getElementById("state").value;
      var country = document.getElementById("country").value;
      var zipcode = document.getElementById("zipcode").value;
      var phone = document.getElementById("phoneNumber").value;
      var alternatePhone = document.getElementById("alternatePhone").value;

      const validPronouns = this.validatePronoun(pronouns);
      this.errors.pronouns = validPronouns.pronouns;
      if (this.valid) {
        this.valid = validPronouns.valid;
        console.log("this.valid = ", this.valid);
      }

      const validFirstName = this.validateFirstName(firstName);
      this.errors.firstName = validFirstName.error;
      if (this.valid) {
        this.valid = validFirstName.valid;
        console.log("this.valid = ", this.valid);
      }

      if (this.valid == false) {
        this.showAlertFirstName = true;
        console.log("this.valid = ", this.valid);
      }

      const validLastName = this.validateLastName(lastName);
      this.errors.lastName = validLastName.error;
      if (this.valid) {
        this.valid = validLastName.valid;
        console.log("this.valid = ", this.valid);
      }

      if (this.valid == false) {
        this.showAlertLastName = true;
        console.log("this.valid = ", this.valid);
      }

      const validRole = this.validateRole(role);
      this.errors.role = validRole.error;
      if (this.valid) {
        this.valid = validRole.valid;
        console.log("this.valid = ", this.valid);
      }

      const user_role = this.validateUserLevel(userLevel);
      this.errors.userLevel = user_role.error;
      if (this.valid) {
        this.valid = user_role.valid;
        console.log("this.valid = ", this.valid);
      }

      if (this.valid == false) {
        this.showAlertRole = true;
        console.log("this.valid = ", this.valid);
      }

      const validOrganizationName = this.validateOrganizationName(
        organizationName
      );
      this.errors.organizationName = validOrganizationName.error;
      if (this.valid) {
        this.valid = validOrganizationName.valid;
        console.log("this.valid = ", this.valid);
      }

      if (this.valid == false) {
        this.showAlertOrganizationName = true;
        console.log("this.valid = ", this.valid);
      }

      const validDepartment = this.validateDepartment(department);
      this.errors.department = validDepartment.error;
      if (this.valid) {
        this.valid = validDepartment.valid;
        console.log("this.valid = ", this.valid);
      }

      if (this.valid == false) {
        this.showAlertDepartment = true;
        console.log("this.valid = ", this.valid);
      }

      const validAddressLine1 = this.validateAddressLine1(addressLine1);
      this.errors.addressLine1 = validAddressLine1.error;
      if (this.valid) {
        this.valid = validAddressLine1.valid;
        console.log("this.valid = ", this.valid);
      }

      if (this.valid == false) {
        this.showAlertAddress1 = true;
        console.log("this.valid = ", this.valid);
      }

      const validCountry = this.validateCountry(country);
      this.errors.country = validCountry.error;
      if (this.valid) {
        this.valid = validCountry.valid;
        console.log("this.valid = ", this.valid);
      }

      if (this.valid == false) {
        this.showAlertCountry = true;
        console.log("this.valid = ", this.valid);
      }

      const validState = this.validateState(state);
      this.errors.state = validState.error;
      if (this.valid) {
        this.valid = validState.valid;
        console.log("this.valid = ", this.valid);
      }

      if (this.valid == false) {
        this.showAlertState = true;
        console.log("this.valid = ", this.valid);
      }

      const validCity = this.validateCity(city);
      this.errors.city = validCity.error;
      if (this.valid) {
        this.valid = validCity.valid;
        console.log("this.valid = ", this.valid);
      }

      if (this.valid == false) {
        this.showAlertCity = true;
        console.log("this.valid = ", this.valid);
      }

      const validZipCode = this.validateZipCode(zipcode);
      this.errors.zipcode = validZipCode.error;
      if (this.valid) {
        this.valid = validZipCode.valid;
        console.log("this.valid = ", this.valid);
      }

      if (this.valid == false) {
        this.showAlertZipCode = true;
        console.log("this.valid = ", this.valid);
      }

      const validPhoneNumber = this.validatePhoneNumber(phone);
      this.errors.phone = validPhoneNumber.error;
      if (this.valid) {
        this.valid = validPhoneNumber.valid;
        console.log("this.valid = ", this.valid);
      }

      if (this.valid == false) {
        this.showAlertPhoneNumber = true;
        console.log("this.valid = ", this.valid);
      }

      const validEmail = this.validateEmail(email);
      this.errors.email = validEmail.error;
      if (this.valid) {
        this.valid = validEmail.valid;
        console.log("this.valid = ", this.valid);
      }

      if (this.valid == false) {
        this.showAlertEmail = true;
        console.log("this.valid = ", this.valid);
      }

      const validPassword = this.validatePassword(password);
      this.errors.password = validPassword.error;
      if (this.valid) {
        this.valid = validPassword.valid;
        console.log("this.valid = ", this.valid);
      }
      if (this.valid == false) {
        this.showAlertPassword = true;
        console.log("this.valid = ", this.valid);
      }

      const validConfirmPassword = this.validateConfirmPassword(
        confirmPassword,
        password
      );
      this.errors.confirmPassword = validConfirmPassword.error;
      if (this.valid) {
        this.valid = validConfirmPassword.valid;
        console.log("this.valid = ", this.valid);
      }
      if (this.valid == false) {
        this.showAlertConfirmPassword = true;
        console.log("this.valid = ", this.valid);
      }

      if (this.valid == true) {
        // let headers = "Content-Type: application/json";
        let dataToSubmit = {
          pronouns: pronouns,
          name: firstName + " " + middleName + ". " + lastName,
          role: role,
          userLevel: userLevel,
          organizationName: organizationName,
          department: department,
          siteName: siteName,
          groupName: groupName,
          addressLine1: addressLine1,
          addressLine2: addressLine2,
          city: city,
          state: state,
          country: country,
          zipcode: zipcode,
          phone: phone,
          alternatePhone: alternatePhone,
          email: email,
          password: password,
          subSpecialist: subSpecialist,
          certification: certification,
        };

        this.$store.commit("setLoading", true);

        console.log("User data to submit: ", dataToSubmit);

        instance
          .post(
            "api/auth/register",

            dataToSubmit
          )
          .then((response) => {
            console.log("new user created on server: ", response.data);

            if (!response.data.error) {
              var templateParams = {
                subject: "Registration request pending",
                user_email: "info@neuroleapmail.com",
                message1:
                  "A user has just attempted to create an account at NeuroLeap. Please review their information and decide if their account should be approved. Below is the auto-generated token you would send the user upon approval of their account, and they can enter it into the login page to remove their pending status.",
                token: response.data.pendingToken,

                message2:
                  "Name: " +
                  dataToSubmit.name +
                  " Organization name: " +
                  dataToSubmit.organizationName,
              };

              try {
                emailjs.send(
                  "default_service",
                  "template_nfgabmc",
                  templateParams
                );
              } catch (error) {
                console.log({ error });
              }

              this.$store.commit("setLoading", false);
              this.$router.push("/");
            } else if (response.data.error == "email already exists") {
              this.errors.email = "This email is already registered.";
              this.showAlertEmail = true;
              this.$store.commit("setLoading", false);
            }
          })
          .catch((error) => {
            this.$store.commit("setLoading", false);

            console.log("There was a registration problem");
            console.log(error);
          });
      }
    },
  },
};
</script>
