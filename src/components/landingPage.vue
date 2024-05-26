<template>
  <div>
  <div :key="displayWebsite" v-if="displayWebsite == true">
    <CRow alignVertical="center" alignHorizontal="center">
      <CCol>
        <Card />
      </CCol>
    </CRow>

    <CRow alignVertical="center" alignHorizontal="center">
      <CCol>
        <Settings />
      </CCol>
    </CRow>

    <CRow>
      <CCol>
        <Updates />
      </CCol>
    </CRow>

    <HubStatusButton />
  </div>

  <div :key="displayWebsite" v-if="displayWebsite == false">
    <LandingMain />
  </div>
  </div>
</template>
<script>
import Card from "./Card";
import Settings from "./Settings";
import Updates from "./Updates";
import HubStatusButton from "./HubStatusButton";
import LandingMain from "./LandingMain";

export default {
  name: "landingPage",
  components: {
    Card,
    Settings,
    Updates,
    HubStatusButton,
    LandingMain,
  },

  computed: {
    displayWebsite() {
      return this.$store.getters.isLoggedIn;
    },
  },
};
</script>