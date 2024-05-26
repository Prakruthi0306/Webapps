<template>
  <div class="flexCenterCenter">
    <section>
      <div>
        <h3>New Application</h3>
        <div style="text-align: right;">
          <label for="import-csv-example" class="input-file-label mr-2" @click="downloadExampleCSV()">Example CSV
            <font-awesome-icon :icon="['fas', 'file-arrow-down']" style="margin-left: 10px;" />
            <a style="display: none;" id="import-csv-example" href="/static/Import_AppAdmin_Example.csv" download></a>
          </label>
          <label for="imported-csv" class="input-file-label">Import from CSV
            <font-awesome-icon :icon="['fas', 'file-arrow-up']" style="margin-left: 10px;" />
            <input id="imported-csv" @change="csvChange()" accept=".csv" type="file">
          </label>
        </div>
        <div style="text-align: right;">{{ csvName }}</div>
      </div>
      <form @submit.prevent="submit">
        <table style="border-spacing: 5px;">
          <tr>
            <td>
              <label>Classification*:</label>
            </td>
            <td style="width: 80%;">
              <select v-model="inputObject.classification">
                <option value="Assessment/Test">Assessment/Test</option>
                <option value="Screening/Mini-Test">Screening/Mini-Test</option>
                <option value="Intervention/Training/Lesson">Intervention/Trainging/Lesson</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <label>Title*:</label>
            </td>
            <td>
              <input type="text" v-model="inputObject.title" required>
            </td>
          </tr>
          <tr>
            <td>
              <label>Subtitle:</label>
            </td>
            <td>
              <input type="text" v-model="inputObject.subtitle">
            </td>
          </tr>
          <tr>
            <td>
              <label>Custom Id*:</label>
            </td>
            <td>
              <input type="text" v-model="inputObject.customID" required>
            </td>
          </tr>
          <tr>
            <td>
              <label>Info:</label >
            </td>
            <td>
              <input type="text" v-model="inputObject.info">
            </td>
          </tr>
          <tr>
            <td>
              <label>Image/Logo:</label>
            </td>
            <td>
              <label class="input-file-label">Upload
                <font-awesome-icon :icon="['fas', 'file-arrow-up']" style="margin-left: 10px;" />
                <input id="imported-logo" @change="logoChange()" type="file" accept=".jpg, .jpeg, .png, .gif">
              </label>
              <div class="flexCenterCenter">
                <img id="preview-image">
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <label>On Sale:</label>
            </td>
            <td>
              <select v-model="inputObject.onSale">
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </td>
          </tr>
          <tr>
            <th colspan="2" class="table-section-divider">Pricing Options</th>
          </tr>
          <tr>
            <td>
              Single Unit Price:
            </td>
            <td>
              <select style="width: fit-content; display: inline-block; margin-right: .5rem;" v-model="inputObject.pricingUnit">
                <option value="USD">$ (USD)</option>
                <option value="EUR">€ (EUR)</option>
                <option value="GBP">£ (GBP)</option>
                <option value="JPY">¥ (JPY)</option>
                <option value="CHF">CHF (Swiss Franc)</option>
                <option value="CAD">$ (CAD)</option>
                <option value="AUD">$ (AUD)</option>
                <option value="CNY">¥ (CNY)</option>
                <option value="INR">₹ (INR)</option>
                <option value="BRL">R$ (BRL)</option>
                <option value="ZAR">R (ZAR)</option>
                <option value="RUB">₽ (RUB)</option>
                <option value="MXN">$ (MXN)</option>
              </select>
              <input type="number" v-model="inputObject.pricingNumber" style="width: fit-content; display: inline-block;">
            </td>
          </tr>
          <tr>
            <td>
              Large Quantity Discount:
            </td>
            <td>
              <input type="number" min="0" v-model="inputObject.largeQuantityPricingAmounts" style="width: fit-content;"> 
              Units for
              <input type="number" v-model="inputObject.largeQuantityPricingDiscount" min="0" max="100" pattern="[0-9]*" style="width: fit-content;">
              % Discount
            </td>
          </tr>
          <tr>
            <td>
              Monthly Subscription:
            </td>
            <td>
              <select style="width: fit-content; margin-right: .5rem;" v-model="inputObject.pricingUnit">
                <option value="USD">$ (USD)</option>
                <option value="EUR">€ (EUR)</option>
                <option value="GBP">£ (GBP)</option>
                <option value="JPY">¥ (JPY)</option>
                <option value="CHF">CHF (Swiss Franc)</option>
                <option value="CAD">$ (CAD)</option>
                <option value="AUD">$ (AUD)</option>
                <option value="CNY">¥ (CNY)</option>
                <option value="INR">₹ (INR)</option>
                <option value="BRL">R$ (BRL)</option>
                <option value="ZAR">R (ZAR)</option>
                <option value="RUB">₽ (RUB)</option>
                <option value="MXN">$ (MXN)</option>
              </select>
              <input type="number" v-model="inputObject.monthlySubscription" style="width: fit-content; display: inline-block;">
              per Month
            </td>
          </tr>
        </table>
        <div style="text-align: center;">
          <button type="submit">Create Application</button>
        </div>
      </form>
    </section>
  </div>
</template>
<script>
  import axios from 'axios';
  import { v4 as uuidv4 } from 'uuid';
  import Papa from 'papaparse';

  export default {
    data() {
      return {
        csvName: null,
        logoName: null,
        inputObject: {
          classification: 'Assessment/Test',
          title: '',
          subtitle: '',
          customID: '',
          info: '',
          logo: '',
          onSale: 'No',
          pricingUnit: 'USD',
          pricingNumber: '',
          largeQuantityPricingAmount: '',
          largeQuantityPricingDiscount: '',
          monthlySubscription: '',
        }
      }
    },
    methods: {
      downloadExampleCSV() {
        let reference = document.getElementById('import-csv-example');
        reference.click();
      },
      csvChange() {
        let csvRef = document.getElementById('imported-csv');
        if (csvRef.files.length > 0) {
          let file = csvRef.files[0];
          this.csvName = file.name;
        }
      },
      logoChange() {
        const inputElement = document.getElementById("imported-logo");
        const previewImage = document.getElementById("preview-image");
        if (inputElement.files.length > 0) {
          const selectedFile = inputElement.files[0];          
          previewImage.src = URL.createObjectURL(selectedFile);
          previewImage.style.display = "block";
          this.inputObject.logo = selectedFile;
        } 
        else {
          previewImage.src = "";
          previewImage.style.display = "none";
        }
      },
      submit() {
        let csvRef = document.getElementById('imported-csv');
        if (csvRef.files.length > 0) {
          Papa.parse(csvRef.files[0], {
            complete: (result) => {
              // Remove empty rows
              const filteredData = result.data.filter(row => Object.values(row).some(value => value !== ''));
              const headers = filteredData[0];

              let allQuestions = [];
              let activity_id = uuidv4();
              for (let i = 1; i < filteredData.length; i++) {
                const rowData = filteredData[i];
            
                const obj = {};
                for (let j = 0; j < headers.length; j++) {
                  obj[headers[j]] = rowData[j];
                }
                allQuestions.push({
                  ...obj,
                  application_id: activity_id,
                  question_order: parseInt(obj.question_order, 10),
                  area_order: parseInt(obj.question_order, 10),
                  type_order: parseInt(obj.question_order, 10),
                  category_order: parseInt(obj.question_order, 10),
                  sub_category_order: parseInt(obj.question_order, 10),
                  TTS_child_prompts: JSON.parse(obj.TTS_child_prompts),
                  question_id: uuidv4()
                });
              }
              axios.post('http://localhost:8080/api/appAdmin', {
                "application_id": activity_id,
                "application_custom_id": this.inputObject.customID,
                "owner_uuid": "550e8400-e29b-41d4-a716-446655440000",
                "classification": this.inputObject.classification, 
                "title":this.inputObject.title, 
                "subtitle":this.inputObject.subtitle, 
                "info": this.inputObject.info,
                "image": this.inputObject.logo.name,
                "on_sale": this.inputObject.onSale,
                "single_unit_pricing": `${this.inputObject.pricingNumber} ${this.inputObject.pricingUnit}`,
                "large_quantity_discount": `${this.inputObject.largeQuantityPricingAmounts} Units for ${this.inputObject.largeQuantityPricingDiscount}% Discount`,
                "montly_subscription_pricing": `${this.inputObject.largeQuantityPricingAmounts} ${this.inputObject.monthlySubscription}`,
                "published": false
              })
              .then(res => {
                console.log(res.data);
                axios.post('http://localhost:8080/api/question-admin/questions', allQuestions)
                .then(res => {
                  console.log(res.data);
                  this.$router.push(`/rolesPage/searchAppAdminApps/viewAppAdminApps/newAppCard/${activity_id}`);
                })
                .catch(err => {
                  console.error(err);
                });
              })
              .catch(err => {
                console.error(err);
              });
            },
            error: (error) => {
              console.error('CSV parsing error:', error.message);
            },
          });
        }
        else {
          let activity_id = uuidv4();
          axios.post('http://localhost:8080/api/appAdmin', {
            "application_id": activity_id,
            "application_custom_id": this.inputObject.customID,
            "owner_uuid": "550e8400-e29b-41d4-a716-446655440000",
            "classification": this.inputObject.classification, 
            "title":this.inputObject.title,
            "subtitle":this.inputObject.subtitle, 
            "info": this.inputObject.info,
            "image": this.inputObject.logo.name,
            "on_sale": this.inputObject.onSale,
            "single_unit_pricing": `${this.inputObject.pricingNumber} ${this.inputObject.pricingUnit}`,
            "large_quantity_discount": `${this.inputObject.largeQuantityPricingAmounts} Units for ${this.inputObject.largeQuantityPricingDiscount}% Discount`,
            "montly_subscription_pricing": `${this.inputObject.largeQuantityPricingAmounts} ${this.inputObject.monthlySubscription}`,
            "published": false
          })
          .then(res => {
            console.log(res.data);
            this.$router.push(`/rolesPage/searchAppAdminApps/viewAppAdminApps/newAppCard/${activity_id}`);
          })
          .catch(err => {
            console.error(err);
          });
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @use 'sharedSCSS/globalSharedVariables';

  .flexCenterCenter {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .flexBtwCenter {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  section {
    background-color: globalSharedVariables.$orange;
    border-radius: 2rem;
    min-height: calc(70vh - #{globalSharedVariables.$navbar-height + globalSharedVariables.$footerbar-height});
    width: 50vw;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-family: "Lucida Console";

    h3 {
      text-align: center;
      font-weight: 700;
    }
  }

  table {
    td {
      padding: 5px;
      font-size: 1rem;
      font-weight: 700;
    }

    input {
      background-color: white;
      border-radius: 50rem;
      padding-left: .5rem;
      padding-right: .5rem;
      width: 100%;
      font-size: 1rem;
      font-weight: 400;
    }

    select {
      font-size: 1rem;
      font-weight: 400;
      background-color: white;
      border-radius: 50rem;
      padding: 0 1rem;
      appearance: auto;
    }

    tr td:first-child {
      font-weight: 700;
      display: flex;
      align-items: center;
    }

    label {
      display: inline-block;
      margin-bottom: 0;
    }

    .table-section-divider {
      text-align: center;
      border-top: dashed black 1px;
      border-top-width: 2px;
    }
  }

  .input-file-label {
    border-radius: 50rem;
    padding-left: .5rem;
    padding-right: .5rem;
    background-color: white;
    width: fit-content;
    font-weight: 400;
    font-size: 1rem;
  }

  .input-file-label input[type="file"] {
    display: none;
  }

  button {
    background-color: white;
    border-radius: 50rem;
    padding-left: .5rem;
    padding-right: .5rem;
    display: inline-block;
    font-weight: 700;
  }

  #preview-image {
    display: none;
    margin-top: .5rem;
    margin-bottom: .5rem;
    width: 100%;
  }

</style>