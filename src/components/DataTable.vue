<template>
<div>
  <v-data-table
    :headers="headers"
    :items="this.$store.state.employees"
    class="elevation-1"
  >
  <template v-slot:item.edit_data="{ item }">
    <v-icon
      @click="
        openEditModal = true;
        editDataID = item.id;
        editName = item.name;
        editPhone = item.phone;
        editProfession = item.profession;
      "
    >
      mdi-square-edit-outline
    </v-icon>
  </template>
  <template v-slot:item.del_data="{ item }">
    <v-icon
      @click="deleteData(item.id)">
      mdi-delete
    </v-icon>
  </template>
  </v-data-table>
  <!-- =====Modal====== -->
  <edit-modal
    :openModal ="openEditModal"
    :id="editDataID"
    :name="editName"
    :phone="editPhone"
    :profession="editProfession"
    @closeModal="openEditModal = false"
  >
  </edit-modal>
</div>
</template>

<script>
  import DataService from '@/service/DataService.js'
  import EditModal from './EditModal'

  export default {
    data () {
      return {
        editDataID: null,
        editName: null,
        editPhone: null,
        editProfession: null,
        openEditModal: false,
        headers: [
          {
            text: 'ID',
            align: 'start',
            sortable: true,
            value: 'id',
          },
          { text: 'Name', value: 'name' },
          { text: 'Phone', value: 'phone' },
          { text: 'Profession', value: 'profession' },
          { text: 'Edit', value: 'edit_data'},
          { text: 'Delete', value: 'del_data'}
        ],
      }
    },
    components: {
      "edit-modal": EditModal
    },
    // axios 是非同步處理
    // created() {
    //   axios
    //     .get('http://localhost:3000/employees')
    //     .then(response => {
    //       // 將 api 回傳的資料設定給 employees
    //       this.employees = response.data;
    //       console.log(response.data);
    //     })
    //     .catch(error => {
    //       console.log('There was an error:'+ error.response)
    //     })
    // },

    //刻意製作成同步處理
    // async created() {
    //   try {
    //     let result = await axios
    //       .get('http://localhost:3000/employees')
    //         this.employees = result.data;
    //         console.log('裡面改成同步處理了！')
    //   } catch (err) {
    //     console.log('There was an error:'+ err)
    //   }
    // },

    //axios 是非同步處理
    created() {
      DataService.getData()
        .then(response => {
          this.$store.state.employees = response.data;
          console.log(response.data);
        })
        .catch(error => {
          console.log('There was an error:'+ error.response)
        })
    },
    methods: {
      async deleteData(employeeID) {
        try {
          await DataService.deleteData(employeeID)
            .then(response => {
              console.log(response.data);
              location.reload();
            })
        } catch (err) {
          console.log('There was an error:'+ err)
        }
      },
    },
  }
</script>
