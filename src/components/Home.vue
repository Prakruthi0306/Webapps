<template>
  <div class="c-app">
    <CWrapper v-if="showDefault">
      <NavigationBar />
      <div style="background-color: #FCFEFF;">
        <main class="c-main" style="padding-top: 0px">
          <transition name="fade">
            <router-view class="page"></router-view>
          </transition>    
        </main>
      </div>
      <Footer /> 
    </CWrapper>

    <CWrapper v-else>
      <div style="background-color: #FCFEFF;">
        <main class="c-main" style="padding-top: 0px">
          <transition name="fade">
            <router-view class="page"></router-view>
          </transition>    
        </main>
      </div>
    </CWrapper>
  </div>
</template>

<script>
//import Sidebar from "./Sidebar";
import NavigationBar from "./NavigationBar";

import Footer from "./Footer";

export default {
  name: "Home",
  components: {
    //Sidebar,
    NavigationBar,
    Footer,
  },
  data() {
    return {
      showDefault: true,
    }
  },
  mounted() {
    function dynamicRetrieve(url) {
      let dynamicRoutes = [];

      if (url == "/reportsStatistics" || url == "/reportsStatistics/") {
        return null;
      }
      else {
        const parts = url.split("/");
        const lastPart = parts[parts.length - 1];
        dynamicRoutes.push(`/reportsStatistics/${lastPart}`);
      }
      
      return dynamicRoutes;    
    }

    const staticNavRoutes = ["/individualReport"];
    const hideNavRoutes = staticNavRoutes.concat(dynamicRetrieve(this.$route.path));
    this.showDefault = !hideNavRoutes.includes(this.$route.path);
  }
};
</script>

<style lang="scss" scoped>
@use 'sharedSCSS/globalSharedVariables';
.page {
  padding-top: globalSharedVariables.$navbar-height;
  padding-bottom: globalSharedVariables.$footerbar-height;
  padding-left: 0;
  padding-right: 0;
  min-height: 100dvh;
  min-width: 100dvw;
  color: #000000;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
