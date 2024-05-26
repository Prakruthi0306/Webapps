<template>
    <router-link to="/hubSystem">
        <CButton
        @click="warningModal = true"
        class="hub-status"
        >
        Hub Status
    </CButton>
    </router-link>
</template>

<script>
export default {
    name:"HubStatusButton",
}
</script>

<style scoped>
.hub-status{
  background:#F7D8B4;
  color:#2E1406;
  margin-left: 90%;
  margin-top:2%;
  margin-bottom: 2%;
}
</style>