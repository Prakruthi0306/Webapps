<template>
  <div class="dashboard">
    <CButton
      textHtml="Dashboard Configuration"
      class="configuration-button mx-auto"
      ><router-link to="/dashboardSetting" class="text-secondary">
        Dashboard Configuration</router-link
      >
    </CButton>
  </div>
</template>

<script>
export default {
  name: "Settings",
  data() {
    return {
      dashboardModal: false,
    };
  },
};
</script>

<style scoped>
.dashboard {
  position: relative;
  margin-top: 2%;
  padding: 1%;
  margin-left: 40%;
}
.configuration-button {
  background-color: #f7d8b4;
  color: #2e1406;
  border-radius: 18px;
  font-weight: bold;
}
.setting-modal {
  background-color: #f7d8b4;
  color: #2e1406;
}
</style>
