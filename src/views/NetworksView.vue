<template>
    <v-data-table :headers="headers" :items="Data" />
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
const store = useStore()

// var Version = ref("0.0.0")
var Data = ref([])
async function fetchStatus() {
    console.log("Test")
    const data = await window.api.fetchData(
        "http://localhost:9993/network", // Endpoint
        store.state.Token // API-token
    );
    console.log(data)
    Data.value = data
}
const headers= ref([
{ title: "ID", key: 'ID', value: 'id' },
      { title: "Name", key: 'Name', value: 'name' },
      { title: "MAC Address", key: 'MAC Address', value: 'mac' },
      { title: "MTU", key: 'MTU', value: 'mtu' },
      { title: "Status", key: 'Status', value: 'status' },
      { title: "Type", key: 'Type', value: 'type' },
      { title: "Assigned Addresses", key: 'Assigned Addresses', value: 'assignedAddresses' },
      { title: "Port Device Name", key: 'Port Device Name', value: 'portDeviceName' }
])
fetchStatus()
</script>