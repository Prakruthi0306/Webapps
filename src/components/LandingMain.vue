<template>
  <div class="dashboard">
    
    <img src="../images/landingpage.jpg">
    <div id="blob">
        <p id="title">
            NeuroLeap ONE
        </p>
        <p>
          NeuroLeap enables children with potential disabilities/impairements via healthcare organizations, 
          to receive a higher quality assessment and intervention regarding cognitive skills (IQ), mental 
          health (EQ) and motor skills. We also provide the optimal tools for schools to satisfy their legal 
          obligation in identifying and educating children with learning disabilities (LD), including dyslexia, 
          and speech & language impairment (SLI).
        </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "LandingMain"
  };
</script>

<style scoped>
.dashboard {
  position: absolute;
  left: 2vw;
  margin-top: 2vw;
  width: 96vw;
  height: 85vh;
}
img {
  width: 100%;
  height: 35vw;
  object-fit: cover;
}
#blob {
  position: absolute;
  font-family: "Lucida Console";
  color: white;
  background-color: #df9c0c;
  border-radius: 1vw;
  top: 20vw;
  left: 5vw;
  width: 30vw;
  padding-top: 1.5vw;
  padding-bottom: 1.5vw;
  padding-left: 3.5vw;
  padding-right: 3.5vw;
}
#title {
  font-size: 2vw;
  font-weight: bold;
}

p {
  font-size: 0.8vw;
}
</style>