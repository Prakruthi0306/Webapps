<template>
  <nav>
    <img class="logo" src="../images/neuroleap_logo.png" />

    <span v-if="$route.name == 'adminDashboard'">
      <router-link to="/">
        <h5 class="navbarHeader">Neuro Leap</h5>
      </router-link>
    </span>

    <span v-else>
      <router-link to="/adminDashboard">
        <h5 class="navbarHeader">APPLICATION ADMINISTRATION</h5>
      </router-link>
    </span>

    <b-button class="navbarHeader">
      <router-link to="/selectApp">Select application page</router-link>
    </b-button>

    <b-button
      type="button"
      squared
      size="lg"
      v-b-modal.modal-xl
      class="navbarButton text-dark font-weight-bold"
      @click="showModal"
    >+ New Application</b-button>

    <modal name="fs" :adaptive="true" style="opacity: 0.98;" width="100%" height="100%">
      <newApplicationForm @clicked="onModalClose" />
    </modal>
  </nav>
</template>

<script>
import newApplicationForm from "./newApplicationForm.vue";
export default {
  name: "Navbar",
  components: { newApplicationForm },
  methods: {
    showModal() {
      this.$modal.show("fs");
    },

    onModalClose() {
      this.$modal.hide("fs");
    },
  },
};
</script>

<style scoped>
.logo {
  width: 75px;
  height: auto;
}
.navbarHeader {
  font-family: Optima, sans-serif;
  font-weight: 300;
  text-align: left;
  display: inline;
  text-indent: 30px;
  padding: 20px;
}
.navbarButton {
  text-decoration: none;
  float: right;
  background-color: #ff930f;
  color: #ff930f;
  border-color: #ff930f;
  cursor: pointer;
  list-style-type: none;
  text-align: center;
  position: absolute;
  right: 40px;
  padding: 20px;
  font-weight: 800;
  font-size: 20px;
}
.navbarButton:hover {
  background-color: #ff930f;
  color: #ff930f;
  border-color: #ff930f;
}
.navbarButton:active {
  background-color: #ff930f;
  color: #ff930f;
  border-color: #ff930f;
}
.navbarButton:focus {
  background-color: #ff930f;
  color: #ff930f;
  border-color: #ff930f;
}
a {
  text-decoration: none;
  color: black;
}
nav {
  background-color: white;
  padding: 15px;
  border-bottom: 3px solid transparent;
  box-shadow: 3px 3px 3px gray;
}
</style>
