<template>
  <ZerotierStatus />
</template>

<script>
import { defineComponent } from 'vue';

// Components
import ZerotierStatus from '../components/ZerotierStatus.vue';

export default defineComponent({
  name: 'HomeView',

  components: {
    ZerotierStatus,
  },
});
</script>
