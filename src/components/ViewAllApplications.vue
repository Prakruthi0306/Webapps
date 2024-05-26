<template>
  <div class="container">
    <div class="function-buttons">
      <button class="filter-button" style="margin-right: 5px;">Filters (0)</button>
      <button class="new-button">Search</button>
    </div>
    <div class="cards-format">
      <div v-for="(app, index) in applicationList" class="app-card" :key="index">
        <div class="icon-row">
          <span>
            <span class="tooltip-icon" style="margin-right: 5px;">
              <span class="tooltiptext-icon">Clone</span>
            </span>
            <span class="tooltip-icon">
              <font-awesome-icon icon="fa-solid fa-eye" />
              <span class="tooltiptext-icon">Preview</span>
            </span>
          </span>
          <span class="tooltip-icon">
            <span class="tooltiptext-icon">Delete</span>
          </span>
        </div>
        <div class="app-card-title">{{ app.title }}</div>
        <div class="app-card-description">{{ app.subtitle }}</div>
      </div>
    </div>
  </div>
</template>

<script> 
  import axios from 'axios';

  export default {
    data() {
      return {
        applicationList: null,
      }
    },
    created() {
      axios.get('http://localhost:8080/api/appAdmin').then(res => {
        this.applicationList = res.data;
      });
    },
/*     mounted() {
      if (!this.$store.getters.isLoggedIn) {
        this.$router.push('/rolesPage');
      }
    }, */
  }
</script>

<style lang="scss" scoped>
  @use 'sharedSCSS/globalSharedVariables';

  .container {
    font-family: "Lucida Console";
    position: relative;
  }

  .cards-format {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
  }

  .function-buttons {
    background-color: #FCFEFF;
    display: inline-block;
    padding: .25rem;
    position: sticky;
    z-index: 99999;
    border-radius: 50rem;
    top: globalSharedVariables.$navbar-height;
  }

  .filter-button, .new-button {
    background-color: globalSharedVariables.$orange;
    border-radius: 50rem;
    width: 250px;
    padding: 0 1rem;
    font-size: 1.5rem;
    font-weight: 700;
  }

  .app-card {
    background-color: globalSharedVariables.$orange;
    padding: 1rem;
    border-radius: 1.5rem;
    width: 300px;
    height: 200px;
    margin: 1rem;
  }

  .icon-row {
    display: flex;
    justify-content: space-between;
  }

  .app-card-title {
    font-size: 1.5rem;
    font-weight: 700;
    text-align: center;
  }

  .app-card-description {
    font-size: 1rem;
    text-align: center;
  }

  .tooltip-icon {
    position: relative;
    display: inline-block;
  }

  .tooltip-icon .tooltiptext-icon {
    visibility: hidden;
    width: fit-content;
    background-color: lightgrey;
    text-align: center;
    border-radius: 6px;
    padding: 5px;
    position: absolute;
    z-index: 1;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    font-size: .8rem;
    font-weight: 400;
    transition: opacity 0s linear .5s;
    opacity: 0;
  }

  .tooltip-icon .tooltiptext-icon::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: lightgrey transparent transparent transparent;
  }

  .tooltip-icon:hover .tooltiptext-icon {
    visibility: visible;
    opacity: 1;
  }

</style>