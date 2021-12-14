<template>
  <v-dialog
    v-model="openModal"
    width="500px"
  >
    <v-card style="padding:40px;">
      <h2 style="color:#00897b">Edit Data</h2>
      <v-btn
        color="transparent"
        depressed
        @click="closeForm()"
        style="position:absolute; right:20px; top:40px">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <br>
      <div>Original Name: {{name}}</div>
      <div>Original Phone: {{phone}}</div>
      <div>Original Profession: {{profession}}</div>
      <br>
      <v-text-field
        label="New Name"
        v-model = "changename"
      ></v-text-field>
      <v-text-field
        label="New Phone"
        v-model = "changephone"
      ></v-text-field>
      <v-text-field
        label="New Profession"
        v-model = "changeprofession"
      ></v-text-field>
      <br>
      <v-btn @click="sumitForm(id)" outlined color="primary">Submit</v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
import DataService from '@/service/DataService.js'
export default {
  data() {
    return {
      changename: "",
      changephone: null,
      changeprofession: null,
    }
  },
  props: ["openModal","id","name","phone","profession"],
  methods: {
    closeForm() {
      this.$emit("closeModal");
    },
    sumitForm(id) {
      try {
        let employeeData= {
          "name": this.changename,
          "phone": this.changephone,
          "profession": this.changeprofession
        };
        DataService.editData(id,employeeData)
          .then(response => {
            console.log(response.data);
            this.$emit("closeModal");
            location.reload();
          })
      } catch (err) {
        console.log('There was an error:'+ err)
      }
    },
  },
}
</script>
