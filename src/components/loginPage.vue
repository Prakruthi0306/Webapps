<template>
  <b-container>
    <b-row class="justify-content-center vertical-center">
      <div class="col-md-10">
        <p id="login"></p>
        <br /><br /><br /><br /><br />
        <b-card bg-variant="white" class="container">
          <b-form>
            <br />

            <h3><b>LOGIN</b></h3>
            <hr />

            <b-row>
              <b-col cols="6"
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
                    :show="showAlertEmail == true"
                    variant="danger"
                    :style="'margin-top: 4px; padding: 4px;'"
                    >{{ errors.email }}</b-alert
                  ></small
                >
              </b-col> </b-row
            ><br />

            <b-row>
              <b-col cols="6"
                ><div>
                  <h5>
                    <label><b>Password</b></label>
                  </h5>
                  <input
                    v-if="passwordShow1 == false"
                    type="password"
                    name="password"
                    id="password"
                    class="reduceInputHeight"
                  />

                  <input
                    v-if="passwordShow1"
                    type="text"
                    name="password"
                    id="password"
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

                  <small>
                    <b-form-text id="password-help-block">
                      Password must contain at least 8 characters, 1 number, and
                      1 special character (e.g. '$', '%', '@')
                    </b-form-text></small
                  >
                </div>
                <small>
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
            <small>
              <b-alert
                :key="showAlertLoginFailure"
                :show="showAlertLoginFailure == true"
                variant="danger"
              >
                {{ loginErrorMessage }}
              </b-alert></small
            >

            <br />

            <b-row>
              <b-col cols="6"
                ><div>
                  <h5>
                    <label><b>Verify token for pending accounts</b></label>
                  </h5>
                  <input
                    type="required"
                    name="pendingToken"
                    id="pendingToken"
                    class="reduceInputHeight"
                  />
                </div>
                <small>
                  <b-form-text>
                    This field is only required if your account is still pending
                    approval by NeuroLeap.
                  </b-form-text></small
                >
              </b-col> </b-row
            ><br />

            <br />
            <b-button :key="loading" variant="warning" size="sm" @click="submit"
              ><b-spinner small v-if="loading"></b-spinner
              ><span v-if="loading">Logging in</span
              ><span v-else>Login</span></b-button
            >

            <p id="forgotpassword"></p>
            <br /><br /><br /><br /><br />
            <h3><b>FORGOT PASSWORD</b></h3>
            <hr />
            <br />

            <b-row>
              <b-col cols="6"
                ><div>
                  <h5>
                    <label><b>Registered Email</b></label>
                  </h5>
                  <input
                    type="required"
                    name="registeredEmail"
                    id="registeredEmail"
                    class="reduceInputHeight"
                  />
                </div>
                <small>
                  <b-alert
                    :key="showAlertForgotPassword"
                    :show="showAlertForgotPassword == true"
                    variant="danger"
                    :style="'margin-top: 4px; padding: 4px;'"
                    >{{ errors.forgotPassword }}</b-alert
                  ></small
                >
              </b-col> </b-row
            ><br /><small>
              <b-alert
                v-if="emailSent"
                :key="emailSent"
                :show="emailSent == true"
                variant="success"
                :style="'margin-top: 4px; padding: 4px;'"
                >A reset token has been emailed to your account. Enter it along
                with your new passwords in the new section.</b-alert
              ></small
            >
            <b-button
              :key="loadingForgotPassword"
              variant="warning"
              size="sm"
              @click="submitForgotPassword"
              ><b-spinner small v-if="loadingForgotPassword"></b-spinner
              ><span v-if="loadingForgotPassword">Sending email</span
              ><span v-else>Send Email</span>
            </b-button>

            <p id="resetpassword"></p>
            <br /><br /><br /><br /><br />
            <h3><b>RESET PASSWORD</b></h3>
            <hr />
            <br />

            <b-row>
              <b-col cols="6"
                ><div>
                  <h5>
                    <label><b>Email address</b></label>
                  </h5>
                  <input
                    type="text"
                    name="registeredEmail2"
                    id="registeredEmail2"
                    class="reduceInputHeight"
                  />
                </div>
              </b-col> </b-row
            ><br />

            <b-row>
              <b-col cols="6"
                ><div>
                  <h5>
                    <label><b>Verify token</b></label>
                  </h5>
                  <input
                    type="text"
                    name="verifyToken"
                    id="verifyToken"
                    class="reduceInputHeight"
                  />
                </div>
              </b-col> </b-row
            ><br />

            <b-row>
              <b-col cols="6"
                ><div>
                  <h5>
                    <label><b>New Password</b></label>
                  </h5>
                  <input
                    v-if="passwordShow2 == false"
                    type="password"
                    name="resetPassword"
                    id="resetPassword"
                    class="reduceInputHeight"
                  />

                  <input
                    v-if="passwordShow2"
                    type="text"
                    name="resetPassword"
                    id="resetPassword"
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
                    :key="showAlertResetPassword"
                    :show="showAlertResetPassword == true"
                    variant="danger"
                    :style="'margin-top: 4px; padding: 4px;'"
                    >{{ errors.resetPassword }}</b-alert
                  ></small
                >
              </b-col> </b-row
            ><br />

            <b-row>
              <b-col cols="6"
                ><div>
                  <h5>
                    <label><b>Confirm New Password</b></label>
                  </h5>
                  <input
                    v-if="passwordShow3 == false"
                    type="password"
                    name="confirmResetPassword"
                    id="confirmResetPassword"
                    class="reduceInputHeight"
                  />

                  <input
                    v-if="passwordShow3"
                    type="text"
                    name="confirmResetPassword"
                    id="confirmResetPassword"
                    class="reduceInputHeight"
                  />

                  <b-icon-eye-fill
                    v-if="passwordShow3 == false"
                    style="margin-left: -30px; cursor: pointer;"
                    @click="togglePassword('3')"
                  ></b-icon-eye-fill>

                  <b-icon-eye-slash-fill
                    v-if="passwordShow3"
                    style="margin-left: -30px; cursor: pointer;"
                    @click="togglePassword('3')"
                  ></b-icon-eye-slash-fill>
                </div>
                <small>
                  <b-alert
                    :key="showAlertConfirmResetPassword"
                    :show="showAlertConfirmResetPassword == true"
                    variant="danger"
                    :style="'margin-top: 4px; padding: 4px;'"
                    >{{ errors.confirmResetPassword }}</b-alert
                  ></small
                >
              </b-col> </b-row
            ><br />
            <small>
              <b-alert
                v-if="passwordSuccessfullyReset"
                :key="passwordSuccessfullyReset"
                :show="passwordSuccessfullyReset == true"
                variant="success"
                :style="'margin-top: 4px; padding: 4px;'"
                >Your password has been successfully reset! Use the new password
                to login.</b-alert
              ></small
            >
            <b-button
              :key="loadingResetPassword"
              variant="warning"
              size="sm"
              @click="submitResetPassword"
              ><b-spinner small v-if="loadingResetPassword"></b-spinner
              ><span v-if="loadingResetPassword">Updating password</span
              ><span v-else>Submit</span></b-button
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
  components: {
    BIconEyeFill,
    BIconEyeSlashFill,
  },
  name: "loginPage",

  data() {
    return {
      userData: {
        email: "",
        password: "",
      },

      passwordShow1: false,
      passwordShow2: false,

      passwordShow3: false,

      valid: true,
      errors: {},
      showAlertEmail: false,
      showAlertPassword: false,
      showAlertLoginFailure: false,
      showAlertForgotPassword: false,
      showAlertResetPassword: false,
      showAlertConfirmResetPassword: false,
      emailSent: false,
      passwordSuccessfullyReset: false,
      loginErrorMessage: "",
    };
  },
  computed: {
    loading() {
      return this.$store.getters.getLoadStatus;
    },

    loadingForgotPassword() {
      return this.$store.getters.getLoadStatusForgotPassword;
    },

    loadingResetPassword() {
      return this.$store.getters.getLoadStatusResetPassword;
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

      if (number == "3") {
        this.passwordShow3 = !this.passwordShow3;
      }
    },

    sendResetEmail() {
      this.emailSent = false;
      var registeredEmail = document.getElementById("registeredEmail").value;
      var genToken = "";
      // let headers = "Content-Type: application/json";

      let dataToSubmit = {
        email: registeredEmail,
        password: "",
      };

      instance
        .post("api/auth/forgot-pass", dataToSubmit)
        .then((response) => {
          genToken = response.data.token;
          // console.log(genToken);

          var templateParams = {
            user_email: registeredEmail,
            token: genToken,
          };

          try {
            emailjs.send("default_service", "template_t7i6igf", templateParams);
            this.$store.commit("setLoadingForgotPassword", false);
            this.emailSent = true;
            console.log(this.emailSent);
          } catch (error) {
            console.log({ error });
          }
        })
        .catch((error) => console.log(error));
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
        !/[~`!#$@%&*+=\-';,/{}|":<>]/g.test(password) ||
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

    validateResetPassword(resetPassword) {
      if (!resetPassword.length) {
        return { valid: false, error: "This field is required" };
      }
      if (resetPassword.length < 8) {
        return {
          valid: false,
          error: "Password requires at least 8 characters",
        };
      }
      if (
        !/[~`!#$@%&*+=\-';,/{}|":<>]/g.test(resetPassword) ||
        !/\d/.test(resetPassword)
      ) {
        return {
          valid: false,
          error:
            "Password requires at least 1 number and 1 special character (e.g. '$', '%', '@').",
        };
      }
      return { valid: true, error: null };
    },

    validateConfirmResetPassword(confirmResetPassword, password) {
      if (confirmResetPassword != password) {
        return {
          valid: false,
          error: "The passwords you entered did not match",
        };
      }

      return { valid: true, error: null };
    },

    validateForgotPassword(forgotPassword) {
      if (!forgotPassword.length) {
        return { valid: false, error: "This field is required" };
      }
      if (
        forgotPassword.match(/^\w+([.-]?\w+)_@\w+(_[_.-]?\w+)_(.\w{2,3})+$/)
      ) {
        return {
          valid: false,
          error: "Please enter a valid email.",
        };
      }
      return { valid: true, error: null };
    },

    submitForgotPassword() {
      this.showAlertForgotPassword = false;
      this.valid = true;
      this.errors = {};

      var forgotPassword = document.getElementById("registeredEmail").value;

      const validForgotPassword = this.validateForgotPassword(forgotPassword);
      this.errors.forgotPassword = validForgotPassword.error;
      if (this.valid) {
        this.valid = validForgotPassword.valid;
        console.log("this.valid = ", this.valid);
      }

      if (this.valid == false) {
        this.showAlertForgotPassword = true;
        console.log("this.valid = ", this.valid);
      }

      if (this.valid == true) {
        this.$store.commit("setLoadingForgotPassword", true);
        this.sendResetEmail();
      }
    },

    submitResetPassword() {
      this.showAlertResetPassword = false;
      this.valid = true;
      this.errors = {};
      var verifyToken = document.getElementById("verifyToken").value;
      var registeredEmail = document.getElementById("registeredEmail2").value;
      var resetPassword = document.getElementById("resetPassword").value;
      var confirmResetPassword = document.getElementById("confirmResetPassword")
        .value;

      const validResetPassword = this.validateResetPassword(resetPassword);
      this.errors.resetPassword = validResetPassword.error;
      if (this.valid) {
        this.valid = validResetPassword.valid;
        console.log("this.valid = ", this.valid);
      }

      if (this.valid == false) {
        this.showAlertResetPassword = true;
        console.log("this.valid = ", this.valid);
      }

      const validConfirmResetPassword = this.validateConfirmResetPassword(
        confirmResetPassword,
        resetPassword
      );
      this.errors.confirmResetPassword = validConfirmResetPassword.error;
      if (this.valid) {
        this.valid = validConfirmResetPassword.valid;
        console.log("this.valid = ", this.valid);
      }

      if (this.valid == false) {
        this.showAlertConfirmResetPassword = true;
        console.log("this.valid = ", this.valid);
      }

      if (this.valid == true) {
        this.$store.commit("setLoadingResetPassword", true);

        // let headers = "Content-Type: application/json";

        let dataToSubmit = {
          token: verifyToken,
        };

        instance
          .post("api/auth/verify-token", dataToSubmit)
          .then((response) => {
            var message = response.data.message;
            if (message == "successfully verified") {
              console.log("Successfully verified!");

              let dataToSubmit2 = {
                id: response.data.userId,
                email: registeredEmail,
                password: resetPassword,
                pending: "",
                token: "",
              };

              instance
                .post("api/auth/reset-pass", dataToSubmit2)
                .then((response) => {
                  console.log(response.data.message);
                  this.$store.commit("setLoadingResetPassword", false);
                  this.passwordSuccessfullyReset = true;
                })
                .catch((error) => {
                  this.$store.commit("setLoadingResetPassword", false);
                  console.log(error);
                });
            }
          })
          .catch((error) => console.log(error));
      }
    },

    submit() {
      this.showAlertLoginFailure = false;
      this.showAlertEmail = false;
      this.showAlertPassword = false;
      this.valid = true;
      this.errors = {};
      var email = document.getElementById("email").value;
      var password = document.getElementById("password").value;
      var pendingToken = document.getElementById("pendingToken").value;

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

      console.log("valid email and valid password: ", this.errors);
      if (this.valid == true) {
        // let headers = "Content-Type: application/json";

        this.$store.commit("setLoading", true);

        let dataToSubmit = {
          id: "",
          email: email,
          password: password,
          pending: "",
          token: pendingToken,
        };

        // console.log("User data to submit: ", dataToSubmit);

        instance
          .post(
            "/api/auth/login",

            dataToSubmit
            //  headers
          )
          .then((response) => {
            if (response.data.userId != "") {
              if (response.data.message == "pending") {
                this.loginErrorMessage =
                  "This account is still pending approval. Please enter the approval token or wait for NeuroLeap to send you one.";
                this.showAlertLoginFailure = true;
                this.$store.commit("setLoading", false);
              } else {
                // console.log("user logged in: ", response.data);

                this.$store.commit("setAuthUser", response.data.userId);
                this.$store.commit("setCurrentEmail", response.data.email);
                this.$store.commit("setUserLevel", response.data.userLevel);

                // console.log("current email is ", this.$store.getters.getCurrentEmail);

                this.$store.commit("setLoading", false);
                this.$router.push("/");
              }
            }
          })
          .catch((error) => {
            this.loginErrorMessage =
              "The provided email or password is incorrect.";
            this.showAlertLoginFailure = true;
            this.$store.commit("setLoading", false);
            console.log(error);
          });
      }
    },
  },
};
</script>
