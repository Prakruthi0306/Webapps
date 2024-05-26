<template>
  <div id="app">
    <v-app>
      <Home />
    </v-app>
  </div>
</template>

<script>
import Home from "./components/Home";

export default {
  name: "App",
  components: {
    Home,
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: "Lexia";
}

@font-face {
  font-family: "Lexia";
  src: url(./assets/fonts/lexia.ttf) format("truetype");
}

body {
  margin: 0;
  padding: 0;
  font-family: "Lexia";
  line-height: 1.4;
  background: #f7f7f7;
}

header {
  width: 100vw;
  background-color: #f7f7f7;
  padding: 15px;
  border-bottom: 3px solid transparent;
}
router-view {
  width: 100%;
  height: 100%;
  top: 5px;
  left: 0px;
  background-color: #ffffff !important;
  padding: 10px;
  overflow: hidden;
  visibility: visible;
  display: block;
  z-index: 500 !important;
  position: relative;
}
</style>
