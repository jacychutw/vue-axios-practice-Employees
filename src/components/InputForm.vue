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
      id: 10,
      name: "",
      phone: "",
      profession: ""
    }
  },
  created() {
    DataService.getData()
      //.get('http://localhost:3000/employees')
      .then(response => {
        this.id = response.data[response.data.length-1].id;
        console.log(this.id);
      })
      .catch(error => {
        console.log('There was an error:'+ error.response)
      })
  },
  methods: {
    addEmployee() {
      let newID = this.id + 1;
      let employeeData= {
        // 使用到 vuex
        "id": newID,
        "name": this.name,
        "phone": this.phone,
        "profession": this.profession
      };
      this.id = newID;
      DataService.addData(employeeData)
        .then(response => {
          console.log(response.data);
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
