<template>
  <CFooter :fixed="true">
    <div class="mx-auto" id="footer-text">
      <div>All contents &copy; Copyright 2014-{{ currentDate() }} Neuro Leap Corp. All rights reserved.</div>
      <div><a href="https://vividkidsblog.page">vividkidsblog.page</a></div>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: "Footer",
  methods: {
    currentDate() {
      const current = new Date();
      const date = `${current.getFullYear()}`;
      return date;
    }
  }
};
</script>

<style lang="scss" scoped>
@use 'sharedSCSS/globalSharedVariables';

footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: globalSharedVariables.$footerbar-height;
  text-align: center;
  color: rgb(97, 97, 97);
  font-family: "Lucida Console";
  font-size: 12px;
  font-weight: bold;
  border-top: 1px solid rgb(151, 143, 143);
  /* background: #2e1406; fallback for old browsers */
  background-color: #FFFFFF;
  /*background: #AEBBFF;*/
}

#footer-text {
  margin-top: 10px;
}
</style>
