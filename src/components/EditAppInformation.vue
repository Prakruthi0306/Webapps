<template>
  <div>
    <h4>
      <b>{{ title }}</b>
    </h4>
    <br />

    <b-card bg-variant="white">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-container class="container">
          <b-row>
            <b-col>
              <h4>
                <b>App Information</b>
              </h4>
              <br />

              <h5>Localizable Information</h5>
              <br />

              <b-form-group
                id="input-group-1"
                label-for="nested-title"
                label="Title:"
                label-cols-sm="4"
              >
                <b-form-input
                  inline
                  id="nested-title"
                  v-model="form.title"
                  type="title"
                  required
                  placeholder="Enter title"
                  maxlength="140"
                ></b-form-input>
                <b-form-text class="text-right">(Max 140 characters)</b-form-text>
              </b-form-group>

              <b-form-group
                id="input-group-2"
                label="Subtitle:"
                label-for="nested-subtitle"
                label-cols-sm="4"
              >
                <b-form-input
                  id="nested-subtitle"
                  v-model="form.subtitle"
                  type="subtitle"
                  required
                  placeholder="Enter subtitle"
                  maxlength="255"
                ></b-form-input>
                <b-form-text class="text-right">(Max 255 characters)</b-form-text>
              </b-form-group>
            </b-col>

            <b-col>
              <br />
              <h4 class="hideButTakeUpSpace">
                <b>App Information</b>
              </h4>
              <br />

              <h5 class="hideButTakeUpSpace">
                <b>Localizable Information</b>
              </h5>

              <b-form-group
                id="input-group-1"
                label-for="nested-privacyPolicy"
                label="Privacy Policy:"
                label-cols-sm="4"
              >
                <b-form-input
                  inline
                  id="nested-privacyPolicy"
                  v-model="form.privacyPolicy"
                  type="privacyPolicy"
                  required
                  placeholder="Enter privacy policy"
                  maxlength="140"
                ></b-form-input>
                <b-form-text class="text-right">(Max 140 characters)</b-form-text>
              </b-form-group>

              <b-form-group
                id="input-group-2"
                label="Custom Application ID:"
                label-for="nested-customID"
                label-cols-sm="4"
              >
                <b-form-input
                  id="nested-customID"
                  v-model="form.customID"
                  type="subtitle"
                  required
                  placeholder="Enter customID"
                  maxlength="255"
                ></b-form-input>
                <b-form-text class="text-right">(Max 255 characters)</b-form-text>
              </b-form-group>
            </b-col>
          </b-row>
        </b-container>
      </b-form>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "EditAppInformation",
  props: {
    title: String
  },
  data() {
    return {
      form: {
        title: "",
        subtitle: "",
        customID: null,
        privacyPolicy: null,
        checked: []
      },
      show: true
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.food = null;
      this.form.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>

<style scoped>

.hideButTakeUpSpace {
  visibility: hidden;
}
</style>