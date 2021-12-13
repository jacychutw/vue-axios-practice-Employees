<template>
<div>
  <v-data-table
    :headers="headers"
    :items="this.$store.state.employees"
    class="elevation-1"
  ></v-data-table>
</div>
</template>

<script>
  import DataService from '@/service/DataService.js'

  export default {
    data () {
      return {
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
        ],
      }
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
        //.get('http://localhost:3000/employees')
        .then(response => {
          this.$store.state.employees = response.data;
          console.log(response.data);
        })
        .catch(error => {
          console.log('There was an error:'+ error.response)
        })
    },
  }
</script>
