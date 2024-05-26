<template>
<div>
      <CRow alignVertical="start" alignHorizontal="start" >
    <CInputFile
                label="CSV Import"
                horizontal
                custom
                v-on:click=
                "onCSVSubmit(e)"
                />
          </CRow>
          
          <h2 class="mx-auto">or</h2>
          
</div>
</template>

<script>
export default {
    name:'CVSImport',
    methods:{
      onCSVSubmit(e){
        e.preventDefault();
        //csv partial working
        this.Papa.parse(this.file, {
	complete: function(results) {
	console.log("Finished:", results.data);
	}
});
      }
    }
      
    
}
</script>