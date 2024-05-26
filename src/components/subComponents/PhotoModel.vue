<template>
  <span>
    <span v-for="(value, index) in array" :key="value.index">
      <img :src=value @click="enlarge(`${index}`)"/>
      <modal :name="`${index}`" height="80%" width="80%" >
        <div class="d-flex justify-content-center align-items-center h-100">
          <img :src=value style="transform: scale(3)"/>
        </div>
      </modal>
    </span>
  </span>
</template>
    
<script>
  export default {
    props: ['array'],
    methods: {
      enlarge(name) {
        this.$modal.show(name);
      }
    }
  }
</script>