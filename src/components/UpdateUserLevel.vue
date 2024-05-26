<template>
  <b-container
    :key="usersLoaded"
    v-if="usersLoaded == true"
    style="margin-top: 100px;"
  >
    <b-row class="justify-content-center">
      <div class="col-md-12">
        <h4 class="mx-auto">
          <b>Set user levels</b>
        </h4>
        <br /><br />
        <b-card bg-variant="white" class="container">
          <b-form @submit="onSubmit">
            <b-row v-for="user in users" v-bind:key="user">
              <b-col cols="4">
                <p>
                  <label
                    ><b>{{ user.email }}</b></label
                  >
                </p>
              </b-col>

              <b-col cols="2">
                <p>
                  <label
                    ><b>{{ user.name }}</b></label
                  >
                </p>
              </b-col>

              <b-col cols="2">
                <p>
                  <label
                    ><b>{{ user.userLevel }}</b></label
                  >
                </p>
              </b-col>

              <b-col cols="2">
                <b-dropdown
                  variant="warning"
                  text="Modify level"
                  class="m-md-2"
                >
                  <b-dropdown-item
                    v-for="userLevel in userLevelOptions"
                    :key="userLevel"
                    @click="setNewLevel(user, userLevel)"
                    >{{ userLevel }}</b-dropdown-item
                  >
                </b-dropdown>
              </b-col> </b-row
            ><br />
            <div>
              <b-button
                squared
                type="submit"
                size="lg"
                @click="onSubmit"
                class="createNewApp text-dark"
              >
                <b>Save changes</b>
              </b-button>
              <small>
                <b-alert
                  :key="showAlertUpdated"
                  :show="showAlertUpdated == true"
                  variant="danger"
                  :style="'margin-top: 4px; padding: 4px;'"
                  >Successfully updated user levels!</b-alert
                ></small
              >
            </div>
          </b-form></b-card
        >
      </div>
    </b-row>
  </b-container>

  <b-container style="margin-top: 90px;" v-else>
    <Spinner size="big" message="Loading..." speed="0.4"></Spinner>
  </b-container>
</template>

<script>
import instance from "../axios.js"
import Spinner from "vue-simple-spinner";

export default {
  name: "updateUserLevel",

  data() {
    return {
      usersLoaded: false,
      users: [],
      showAlertUpdated: false,
      userLevelOptions: [],
    };
  },

  components: {
    Spinner,
  },

  mounted: function() {
    instance
      .get("api/auth/get-all-users")
      .then((response) => {
        this.users = response.data;
        console.log("response data = ", response.data);

        this.userLevelOptions.push("App Admin");
        this.userLevelOptions.push("Organization");
        this.userLevelOptions.push("Parent/Caretaker");
        this.userLevelOptions.push("Specialist");
        this.userLevelOptions.push("Statistician/Analyst");

        this.usersLoaded = true;
      })
      .catch((error) => console.log(error));
  },

  methods: {
    setNewLevel(user, newLevel) {
      user.userLevel = newLevel;
      console.log("New user level: ", user.email, user.userLevel);
    },

    onSubmit(evt) {
      evt.preventDefault();

      // let headers = "Content-Type: application/json";
      var i = 0;
      var j = 0;

      for (i = 0; i < this.users.length; i++) {
        var userLevelObject = {
          email: this.users[i].email,
          userLevel: this.users[i].userLevel,
        };

        console.log("User level object to be written: ", userLevelObject);
        instance
          .post(
            "api/auth/update-user-level",
            userLevelObject
          )
          .then((response) => {
            console.log("user level updated: ", response.data);

            if (i >= this.users.length - 1 && j >= this.users.length - 1) {
              this.showAlertUpdated = true;

              setTimeout(() => {
                this.showAlertUpdated = false;
              }, 4000);
            }

            j++;
          })
          .catch((error) => console.log(error));
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
