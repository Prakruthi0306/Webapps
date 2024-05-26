<template>
  <div class="d-flex flex-column align-items-center">
    <div v-for="value in array" :key="value.id">
      <video width="320" height="240" controls>
        <source :src=value />
      </video>
    </div>
  </div>
</template>
  
<script>
  export default {
    props: ['array'],
  }
</script>