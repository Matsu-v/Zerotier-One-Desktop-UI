<template>
    <v-navigation-drawer app v-model="Drawer">
        <h1 class="mt-1 text-center">Zerotier UI</h1>
        <v-switch v-model="DarkMode" @change="SetDarkMode(DarkMode)" :label="DarkModeLabel()"></v-switch>
        <v-divider></v-divider>
        <v-list>
            <v-list-item v-for="{ path, name, icon } in Routes" :key="path" :title="name" :prepend-icon="icon"
                @click="$router.push(path)">

            </v-list-item>
        </v-list>
    </v-navigation-drawer>
    <v-app-bar class="titlebar" :elevation="2">
        <template v-slot:prepend>
            <v-app-bar-nav-icon class="titlebar-button" @click="ToggleDrawer()"></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>Zerotier UI</v-app-bar-title>
    </v-app-bar>
</template>

<script setup>
import { useTheme } from 'vuetify'
import { ref } from 'vue'
import { useStore } from 'vuex';
const theme = useTheme()
const store = useStore()
// const name = 'NavBar';
var Drawer = ref(false);
var DarkMode = ref(true);

function DarkModeLabel() {
    return this.DarkMode ? "Dark Mode" : 'Light Mode';
}
function SetDarkMode(val) {
    theme.global.name.value = val ? 'dark' : 'light';
    store.state.darkMode = val;
}
function ToggleDrawer() {
    Drawer.value = !Drawer.value
}
const Routes = [
    {
        path:"/", 
        name:"HomePage",
        icon:"mdi-home"
    },
    {
        path:"/Networks",
        name:"Networks",
        icon:"mdi-table-network"
    }
]
</script>
<style>
.titlebar {
    -webkit-user-select: none;
    -webkit-app-region: drag;
}

.titlebar-button {
    -webkit-app-region: no-drag;
}
</style>