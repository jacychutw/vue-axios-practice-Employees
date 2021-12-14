<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-icon class="mr-2">
        mdi-account-box-multiple
      </v-icon>
        Employee Data
    </v-app-bar>

    <v-main>
    <InputForm/>
    <DataTable/>
    </v-main>
  </v-app>
</template>

<script>
import InputForm from './components/InputForm.vue'
import DataTable from './components/DataTable.vue'

export default {
  name: 'App',
  components: {
    InputForm,
    DataTable
  }
}
</script>
