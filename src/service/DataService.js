import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
})

export default {
  getData() {
    return apiClient.get('/employees')
  },
  addData(employeeData) {
    return apiClient.post('/employees', employeeData)
  },
  deleteData(employeeID) {
    return apiClient.delete('/employees/' + employeeID)
  },
  editData(employeeID, employeeData) {
    return apiClient.put('/employees/' + employeeID, employeeData)
  }
}