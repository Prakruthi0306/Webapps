<template>
  <div >
    <CRow
      ><span class="display-4 ml-1 pl-5 pb-4 text-secondary">
        <!-- Welcome -->
      </span></CRow
    >
    <CRow class="mx-auto" alignVertical="center" alignHorizontal="center">
      <CCol v-if="userLevel == 'Organization' || userLevel == 'Superuser'" sm="2" class="mx-auto">
        <router-link class="text-secondary mx-auto" to="/pageNotAvailable">
          <CCard
            style="width: 10rem; height: 15rem"
            alignVertical="center"
            alignHorizontal="center"
          >
            <h6 class="mx-auto">Organization</h6>

            <CCardBody class="bg-warning">
              <img
                src="@/assets/organisation.svg"
                alt="Organisation"
                class="img-fluid p-1"
                width="500px"
                height="100px"
              />
            </CCardBody>
          </CCard>
        </router-link>
      </CCol>

<CCol v-else sm="2" class="mx-auto">
          <CCard
            style="width: 10rem; height: 15rem"
            alignVertical="center"
            alignHorizontal="center"
            id = "tooltip-organization"
          >
            <h6 class="mx-auto">Organization</h6>

            <CCardBody class="bg-dark">
              <img
                src="@/assets/organisation.svg"
                alt="Organisation"
                class="img-fluid p-1"
                width="500px"
                height="100px"
              />
            </CCardBody>
          </CCard>

          <b-tooltip target="tooltip-organization" variant="danger" placement="topright" triggers="hover">
    <b style="color: black;">You don't have permission to access this feature.</b>
  </b-tooltip>
      </CCol>

      <CCol v-if="userLevel == 'Specialist' || userLevel == 'Superuser'"  sm="2" class="mx-auto">
        <router-link to="/specialist" class="text-secondary mx-auto"
          ><CCard
            style="width: 10rem; height: 15rem"
            alignVertical="center"
            alignHorizontal="center"
          >
            <h6 class="mx-auto">Specialist</h6>

            <CCardBody class="bg-warning">
              <img
                src="@/assets/Specialist V2.svg"
                alt="Organisation"
                class="img-fluid mx-auto"
                width="90px"
                height="80px"
              />
            </CCardBody>
          </CCard>
        </router-link>
      </CCol>

<CCol v-else  sm="2" class="mx-auto">
          <CCard
            style="width: 10rem; height: 15rem"
            alignVertical="center"
            alignHorizontal="center"
            id="tooltip-specialist"
          >
            <h6 class="mx-auto">Specialist</h6>

            <CCardBody class="bg-dark">
              <img
                src="@/assets/Specialist V2.svg"
                alt="Organisation"
                class="img-fluid mx-auto"
                width="90px"
                height="80px"
              />
            </CCardBody>
          </CCard>

          <b-tooltip target="tooltip-specialist" variant="danger" placement="topright" triggers="hover">
    <b style="color: black;">You don't have permission to access this feature.</b>
  </b-tooltip>
      </CCol>

      <CCol v-if="userLevel == 'Parent/Caretaker' || userLevel == 'Superuser'"  sm="2" class="mx-auto">
        <router-link to="/pageNotAvailable" class="text-secondary mx-auto"
          ><CCard style="width: 10rem; height: 15rem">
            <h6 class="mx-auto">Parent/Caretaker</h6>

            <CCardBody class="bg-warning">
              <img
                src="@/assets/parent v2.svg"
                alt="Organisation"
                class="img-fluid mx-auto"
                width="100px"
                height="100px"
              />
            </CCardBody>
          </CCard>
        </router-link>
      </CCol>

      <CCol v-else  sm="2" class="mx-auto">
          <CCard style="width: 10rem; height: 15rem" id = "tooltip-parent-caretaker">
            <h6 class="mx-auto">Parent/Caretaker</h6>

            <CCardBody class="bg-dark">
              <img
                src="@/assets/parent v2.svg"
                alt="Organisation"
                class="img-fluid mx-auto"
                width="100px"
                height="100px"
              />
            </CCardBody>
          </CCard>
          <b-tooltip target="tooltip-parent-caretaker" variant="danger" placement="topright" triggers="hover">
    <b style="color: black;">You don't have permission to access this feature.</b>
  </b-tooltip>
      </CCol>

      <CCol v-if="userLevel == 'Statistician/Analyst' || userLevel == 'Superuser'"  sm="2" class="mx-auto">
        <router-link to="/pageNotAvailable" class="text-secondary mx-auto"
          ><CCard style="width: 10rem; height: 15rem">
            <h6 class="mx-auto">Statistician/Analyst</h6>

            <CCardBody class="bg-warning">
              <img
                src="@/assets/App Admin v2.svg"
                alt="Organisation"
                class="img-fluid mx-auto"
                width="100px"
                height="100px"
              />
            </CCardBody> </CCard
        ></router-link>
      </CCol>


  <CCol v-else sm="2" class="mx-auto">
          <CCard style="width: 10rem; height: 15rem" id = "tooltip-statistician-analyst">
            <h6 class="mx-auto">Statistician/Analyst</h6>

            <CCardBody class="bg-dark">
              <img
                src="@/assets/App Admin v2.svg"
                alt="Organisation"
                class="img-fluid mx-auto"
                width="100px"
                height="100px"
              />
            </CCardBody> </CCard
        >
        <b-tooltip target="tooltip-statistician-analyst" variant="danger" placement="topright" triggers="hover">
    <b style="color: black;">You don't have permission to access this feature.</b>
  </b-tooltip>
      </CCol>

      <CCol v-if="userLevel == 'App Admin' || userLevel == 'Superuser'"     sm="2" class="mx-auto">
        <router-link to="/adminDashboard" class="text-secondary mx-auto">
          <CCard style="width: 10rem; height: 15rem">
            <h6 class="mx-auto">App Admin</h6>

            <CCardBody class="bg-warning">
              <img
                src="@/assets/Developer v2.svg"
                alt="Organisation"
                class="img-fluid mx-auto"
                width="100px"
                height="100px"
              />
            </CCardBody> 
        
            </CCard
        ></router-link>
      </CCol>

      <CCol v-else     sm="2" class="mx-auto">
          <CCard style="width: 10rem; height: 15rem" id = "tooltip-appadmin">
            <h6 class="mx-auto">App Admin</h6>

            <CCardBody class="bg-dark">
              <img
                src="@/assets/Developer v2.svg"
                alt="Organisation"
                class="img-fluid mx-auto"
                width="100px"
                height="100px"
              />
            </CCardBody> 
        
            </CCard
        >
        <b-tooltip target="tooltip-appadmin" variant="danger" placement="topright" triggers="hover">
    <b style="color: black;">You don't have permission to access this feature.</b>
  </b-tooltip>
      </CCol>
      
    </CRow>
  </div>
</template>

<script>
export default {
  name: "Card",

  data() {

    return {
      userLevel: "",
    };
  },

  mounted() {

    var userLevel = this.$store.getters.getUserLevel;
    this.userLevel = userLevel;
  },
};
</script>

<style scoped>
img {
  padding: 10px 10px;
  position: relative;

  color: #f7d8b4;
  margin: 0 auto;
}