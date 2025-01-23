<template>
  <v-dialog v-model="LocalDialog">
    <v-card>
      <v-toolbar-title color="primary">
        <h2 class="ma-2">Nieuw network joinen</h2>
      </v-toolbar-title>
      <v-text-field v-model="networkId" label="Network name" />
      <v-btn @click="joinNetwork">Join</v-btn>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useStore } from 'vuex';

var networkId = ref('');
var LocalDialog = ref(false);

const props = defineProps(['showDialog']);
const emit = defineEmits(['closeDialog']);
const store = useStore();


function joinNetwork() {
  window.api.saveNetworkSettings(
    "http://localhost:9993/network/" + networkId.value, // Endpoint
    store.state.Token, // API-token
    null
  ).then(() => {

  });
  emit('closeDialog');
}
watchEffect(() => {
  LocalDialog.value = props.showDialog;
});
watchEffect(() => {
  if (LocalDialog.value == false) {
    emit('closeDialog');
  }
});

</script>
