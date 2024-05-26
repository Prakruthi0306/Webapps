<template>
  <CCarousel arrows
  indicators
  animate
  height="450px"
  >
  <CCarouselItem captionHeaders="School"
  image="@/assets/organisation.svg" />

  <CCarouselItem captionHeaders="Parent"
  image="@/assets/parent v2.svg" />

  </CCarousel>
</template>

<script>
export default {
    name:"Carousel"
}
</script>
<style scoped>
.carousel-content{
    position: relative;
    height: 200px;
    width: 400px;
    margin: 0 auto;
    
}
</style>