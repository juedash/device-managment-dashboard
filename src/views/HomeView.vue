<template>
    <div class="p-6 bg-gray-100 min-h-screen">
        <div class="bg-white p-4 shadow rounded-lg  mb-4">
            <div class="flex justify-between flex-wrap items-center">
                <h2 class="text-lg font-semibold">Device List</h2>
                <input type="text" v-model="searchQuery" placeholder="Search by name or category"
                    class="border rounded py-2 px-3 mb-2 w-full md:w-64 xl:w-96" />
                <div class="flex gap-2">
                    <RouterLink to="/add-new" class="text-green-900 hover:text-green-500 rounded-md px-3 py-2">
                        <i class="pi pi-plus mr-1 text-sm"></i>Add new
                        device
                    </RouterLink>

                    <button
                        :class="['px-4 py-2 bg-gray-200 rounded-lg', selectedView === 'card' ? 'activeTab' : 'inactiveTab']"
                        @click="selectedView = 'card'">Card
                        View</button>
                    <button :class="[' px-4 py-2 bg-gray-200 rounded-lg', selectedView === 'list' ? 'activeTab'
                        : 'inactiveTab']" @click="selectedView = 'list'">List View</button>
                </div>
            </div>
        </div>
        <CardView :devices="filteredItems" v-if="selectedView === 'card'" @deleteItem="deleteItem($event)" />
        <ListView :devices="filteredItems" v-else @deleteItem="deleteItem($event)" />

    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import type { DeviceItem, ResponseData } from '@/types/main';
import axios, { type AxiosResponse } from 'axios';
import CardView from '../components/CardView.vue';
import ListView from '../components/ListView.vue';
import { useDevicesStore } from '@/stores/customDevicesStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const selectedView = ref('card');
const devices = ref<ResponseData[]>([]);

const devicesStore = useDevicesStore();
const customDevices = devicesStore.getCustomDevices;
const searchQuery = ref('');

const filteredItems = computed(() => {
    if (!searchQuery.value) return devices.value;
    const searchLower = searchQuery.value.toLowerCase();
    return devices?.value?.filter((item: DeviceItem) => {
        return (
            item.name.toLowerCase().includes(searchLower) ||
            (item.category && item.category.toLowerCase().includes(searchLower))
        );
    });
});

// onMounted(async () => {
//     axios.get<DeviceItem[]>('https://api.restful-api.dev/objects')  // Specify the type here
//         .then(response => {
//             devices.value = response.data;
//         })
//         .catch(error => {
//             console.error(error);
//         });

//     for (const id of customDevices) {
//         axios.get(`https://api.restful-api.dev/objects/${id}`).then(response => {
//             devices.value.push(response.data)
//         })
//     }
// });

onMounted(async () => {
    await axios.get<ResponseData[]>('api/objects').then(response => {
        devices.value = response.data.map(item => ({
            id: item.id,
            name: item.name,
            data: {
                price: item?.data?.price,
                category: item?.data?.category,
                color: item?.data?.color,
                storage: item?.data?.capacity,
            }

        }));
    })
        .catch(error => {
            console.error(error);
        });

    for (const id of customDevices) {
        axios.get(`api/objects/${id}`).then(response => {
            devices.value.push(response.data)
        })
    }
});

const deleteItem = async (id: number) => {
    await axios.delete(`api/objects/${id}`).then(() => {
        router.go(0);
    })
}

</script>

<style scoped>
.activeTab {
    @apply bg-green-500 text-white
}

.inactiveTab {
    @apply text-gray-700 bg-gray-200
}
</style>