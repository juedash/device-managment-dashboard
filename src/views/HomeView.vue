<template>
    <div class="p-6 bg-gray-100 h-screen">
        <div class="bg-white p-4 shadow rounded-lg">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-lg font-semibold">Device List</h2>
                <div class="flex gap-2">
                    <button
                        :class="['px-4 py-2 bg-gray-200 rounded-lg', selectedView === 'list' ? 'activeTab' : 'inactiveTab']"
                        @click="selectedView = 'list'">List View</button>
                    <button
                        :class="['px-4 py-2 bg-gray-200 rounded-lg', selectedView === 'card' ? 'activeTab' : 'inactiveTab']"
                        @click="selectedView = 'card'">Card
                        View</button>
                </div>
            </div>
            <CardView :devices="devices" v-if="selectedView === 'card'" />
            <ListView :devices="devices" v-else />
        </div>

    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { DeviceItem } from '@/types/main';
import axios from 'axios';
import CardView from './CardView.vue';
import ListView from './ListView.vue';

const selectedView = ref('card');
const devices = ref();

onMounted(async () => {
    axios.get<DeviceItem[]>('https://api.restful-api.dev/objects')  // Specify the type here
        .then(response => {
            console.log(response.data);
            devices.value = response.data;
        })
        .catch(error => {
            console.error(error);
        });
});
</script>

<style scoped>
.activeTab {
    @apply bg-green-500 text-white
}

.inactiveTab {
    @apply text-gray-700 bg-gray-200
}
</style>