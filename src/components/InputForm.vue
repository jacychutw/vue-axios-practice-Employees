<template>
  <div>
    <v-form>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="3"
          >
            <v-text-field
              label="Name"
              v-model="name"
              required
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="3"
          >
            <v-text-field
              label="Phone"
              v-model="phone"
              required
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="3"
          >
            <v-text-field
              label="Profession"
              v-model="profession"
              required
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="3"
          >
          <!-- <button>Send</button> -->
          <v-btn class="mt-3" @click="addEmployee">
            Send
          </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import DataService from '@/service/DataService.js'

export default {
  mixins: [validationMixin],
  validations: {
    name: { required },
    phone: { required },
    profession: { required },
  },
  data() {
    return {
      name: "",
      phone: "",
      profession: ""
    }
  },
  methods: {
    addEmployee() {
      let employeeData= {
        // 使用到 vuex
        "id": this.$store.state.employees.length + 1,
        "name": this.name,
        "phone": this.phone,
        "profession": this.profession
      };
      DataService.addData(employeeData)
        .then(response => {
          console.log(response.data);
          // 完成 post api 時，把整個頁面重新載入，更新 table
          location.reload();
        })
        .catch(error => {
          console.log('There was an error:'+ error.response)
        })

      this.name = "";
      this.phone = "";
      this.profession= "";
    }
  }
}
</script>
