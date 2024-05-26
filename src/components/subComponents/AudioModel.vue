<template>
  <div class="d-flex flex-column align-items-center">
    <div v-for="value in array" :key="value.id">
      <audio controls>
        <source :src=value>
      </audio>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['array']
  }
</script>