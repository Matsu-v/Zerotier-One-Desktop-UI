<template>
  <v-app>
    <NavBar></NavBar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar.vue'
export default {
  name: 'App',
  data: () => ({
    //
  }),
  components : {
    NavBar
  }
}
</script>./components/NavBar.vue./components/nav-bar.vue
