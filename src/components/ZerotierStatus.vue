<template>
  <v-container>
    <h1>{{ TimeText }}</h1>
    <li>
      Zerotier Device address:{{ Data.address }}
    </li>
    <li>
      Using Zerotier Version {{ Data.version }}
    </li>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
const store = useStore()

// var Version = ref("0.0.0")
var Data = ref({})
async function fetchStatus() {
  console.log("Test")
  const data = await window.api.fetchData(
    "http://localhost:9993/status", // Endpoint
    store.state.Token // API-token
  );
  console.log(data)
  Data.value = data
}
fetchStatus()

const TimeText = ref(getTimeString())
function getTimeString() {
  const date = new Date();
  if (date.getHours() < 6) {
    return "Good night!";
  } else if (date.getHours() < 12) {
    return "Good morning!";
  } else if (date.getHours() < 18) {
    return "Good afternoon!";
  } else {
    return "Good evening!";
  }
}
</script>
