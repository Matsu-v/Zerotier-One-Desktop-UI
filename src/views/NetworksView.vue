<template>
    <div>
        <NetworkJoinDialog :showDialog="ShowNewNetworkDialog"
            @closeDialog="ShowNewNetworkDialog = false; fetchStatus()" />
        <v-data-table :headers="headers" :items="Data" item-value="id" @update:expanded-items="expandedRows = $event">
            <template v-slot:[`header.data-table-expand`]="{}">
                <v-btn @click="ShowNewNetworkDialog = true" color="primary">Join Network</v-btn>
            </template>
            <template v-slot:expanded-row="{ columns, item }">
                <tr>
                    <td class="pa-0" :colspan="columns.length">

                        <v-card class="ml-0;pa-1"><v-card-title> More info about {{ item.name }}</v-card-title>
                            <v-card-text>
                                <v-row dense>
                                    <v-col cols="12" sm="6">
                                        <v-checkbox @change="SettingsEdited = true" label="Allow DNS"
                                            v-model="item.allowDNS" dense></v-checkbox>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-checkbox @change="SettingsEdited = true" label="Allow Default"
                                            v-model="item.allowDefault" dense></v-checkbox>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-checkbox @change="SettingsEdited = true" label="Allow Global"
                                            v-model="item.allowGlobal" dense></v-checkbox>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-checkbox @change="SettingsEdited = true" label="Allow Managed"
                                            v-model="item.allowManaged" dense></v-checkbox>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-text-field label="Port Device Name" v-model="item.portDeviceName" readonly
                                            dense></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-text-field label="Bridge" v-model="item.bridge" readonly
                                            dense></v-text-field>
                                    </v-col>
                                    <v-col cols="6" sm="3">
                                        <v-text-field label="Broadcast Enabled" v-model="item.broadcastEnabled" readonly
                                            dense></v-text-field>
                                    </v-col>
                                    <v-col cols="6" sm="3">
                                        <v-text-field label="DHCP" v-model="item.dhcp" readonly dense></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-text-field label="DNS Domain" v-model="item.dns.domain" readonly
                                            dense></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-text-field label="DNS Servers" v-model="item.dns.servers" readonly
                                            dense></v-text-field>
                                    </v-col>
                                    <v-col cols="6" sm="3">
                                        <v-text-field label="Netconf Revision" v-model="item.netconfRevision" readonly
                                            dense></v-text-field>
                                    </v-col>
                                    <v-col cols="6" sm="3">
                                        <v-text-field label="Port Error" v-model="item.portError" readonly
                                            dense></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12">
                                        <v-text-field label="Routes" v-model="item.routes" readonly
                                            dense></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                            <v-card-actions>
                                <v-expand-transition>
                                    <div v-if="SettingsEdited">
                                        <v-btn :loading="UpdatingSettings" text color="success"
                                            @click="SaveSettings(item)">Save
                                            settings</v-btn>
                                        <v-btn text color="warning"
                                            @click="SettingsEdited = false; fetchStatus()">Discard
                                            changes</v-btn>
                                    </div>
                                </v-expand-transition>
                                <v-spacer></v-spacer>
                                <v-btn text color="error"
                                    @click="LeaveNetworkCheck ? LeaveNetwork(item) : LeaveNetworkCheck = true">{{ LeaveNetworkCheck == true ? "Are you sure?":"Leave network"}}</v-btn>
                            </v-card-actions>
                        </v-card>
                    </td>
                </tr>
            </template>
        </v-data-table>
    </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useStore } from 'vuex';
import NetworkJoinDialog from '@/components/NetworkJoinDialog.vue';
const store = useStore();

var Data = ref([]);
var SettingsEdited = ref(false);
var UpdatingSettings = ref(false);
var ShowNewNetworkDialog = ref(false);
var LeaveNetworkCheck = ref(false);


async function fetchStatus() {
    const data = await window.api.fetchData(
        "http://localhost:9993/network", // Endpoint
        store.state.Token // API-token
    );
    Data.value = data;
    console.log(Data.value);
    FormatData();
}

function LeaveNetwork(Item) {
    window.api.leaveNetwork(
        "http://localhost:9993/network/" + Item.id, // Endpoint
        store.state.Token // API-token
    ).then(() => {
        fetchStatus();
        LeaveNetworkCheck.value = false;
    });
}
function FormatData() {
    Data.value.forEach((element) => {
        element.assignedAddresses = element.assignedAddresses.join(", ");
    });
    Data.value.forEach((element) => {
        element.routes = element.routes.map(route => route.target);
    });
    Data.value.forEach((element) => {
        element.dns.servers = element.dns.servers.join(", ");
    });
}

async function SaveSettings(Item) {
    var UpdateItem = {
        allowDNS: Item.allowDNS,
        allowDefault: Item.allowDefault,
        allowGlobal: Item.allowGlobal,
        allowManaged: Item.allowManaged,
    };
    UpdatingSettings.value = true;
    window.api.saveNetworkSettings(
        "http://localhost:9993/network/" + Item.id, // Endpoint
        store.state.Token, // API-token
        UpdateItem
    ).then(() => {
        fetchStatus();
        UpdatingSettings.value = false;
        SettingsEdited.value = false;
    });
}
watchEffect(() => {
    if(LeaveNetworkCheck.value) {
        setTimeout(() => {
            LeaveNetworkCheck.value = false;
        }, 5000);
    }
});

const headers = ref([
    { title: '', key: 'data-table-expand' },
    { title: "Network ID", key: 'ID', value: 'id' },
    { title: "Name", key: 'Name', value: 'name' },
    { title: "MAC Address", key: 'MAC Address', value: 'mac' },
    { title: "MTU", key: 'MTU', value: 'mtu' },
    { title: "Status", key: 'Status', value: 'status' },
    { title: "Type", key: 'Type', value: 'type' },
    { title: "Assigned Addresses", key: 'Assigned Addresses', value: 'assignedAddresses' },
    { title: "Port Device Name", key: 'Port Device Name', value: 'portDeviceName' },
]);

fetchStatus();
setInterval(() => {
    fetchStatus();
}, 10000);
</script>