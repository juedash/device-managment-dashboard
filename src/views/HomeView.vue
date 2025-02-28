<template>
    <div class="p-6 bg-gray-100 min-h-screen" v-if="state.devices.length">
        <div class="bg-white p-4 shadow rounded-lg mb-4  m-auto">
            <div class="grid lg:grid-cols-3 items-center flex-wrap">
                <h2 class="text-lg font-semibold">Device List</h2>
                <input type="text" v-model="searchQuery" placeholder="Search by name or category"
                    class="border  rounded py-2 px-3 w-full  focus:border-green-400" />
                <div class="flex flex-col md:flex-row gap-2 justify-end">
                    <RouterLink to="/add-new" class="text-green-900 hover:text-green-500 rounded-md lg:px-3 py-2">
                        + Add new device
                    </RouterLink>
                    <div class="flex gap-2">
                        <button
                            :class="['px-4 py-2 bg-gray-200 rounded-lg', selectedView === 'card' ? 'activeTab' : 'inactiveTab']"
                            @click="selectedView = 'card'" id="cardButton">Card
                            View</button>
                        <button :class="[' px-4 py-2 bg-gray-200 rounded-lg', selectedView === 'list' ? 'activeTab'
                            : 'inactiveTab']" @click="selectedView = 'list'">List View</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="state.isLoading">
            <PulseLoader />
        </div>
        <div v-else>
            <CardView :devices="filteredItems" v-if="selectedView === 'card'" @deleteItem="deleteItem($event)" />
            <ListView :devices="filteredItems" v-else @deleteItem="deleteItem($event)" />
        </div>
    </div>

    <div v-else class="bg-white p-4 rounded-lg text-xl mx-auto my-20 text-center">
        <h2>No items found!</h2>
        <RouterLink to="/add-new" class="text-green-900 hover:text-green-500 rounded-md px-3 py-2">
            + Add new device
        </RouterLink>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, reactive } from 'vue';
import type { DeviceItem, ResponseData } from '@/types/main';
import axios from 'axios';
import CardView from '../components/CardView.vue';
import ListView from '../components/ListView.vue';
import { useDevicesStore } from '@/stores/customDevicesStore';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

const router = useRouter();
const selectedView = ref('card');

const state = reactive({
    devices: [] as ResponseData[],
    isLoading: true as Boolean,
});
const devicesStore = useDevicesStore();
const customDevices = devicesStore.getCustomDevices;
const searchQuery = ref('');

const filteredItems = computed(() => {
    if (!searchQuery.value) return state.devices;
    const searchLower = searchQuery.value.toLowerCase();
    const items =
        state.devices?.filter((item: DeviceItem) => {
            return (
                item.name.toLowerCase().includes(searchLower) ||
                (item.category && item.category.toLowerCase().includes(searchLower))
            );
        });
    return items;
});

onMounted(async () => {
    await axios.get<ResponseData[]>('api/objects').then(response => {
        state.devices = response.data.map(item => ({
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
            toast.error('Something went wrong!');

        }).finally(() => {
            state.isLoading = false; // Ensure loading stops
        });

    for (const id of customDevices) {
        axios.get(`api/objects/${id}`).then(response => {
            state.devices.push(response.data)
        })
    }
});

const deleteItem = async (id: string) => {
    await axios.delete(`api/objects/${id}`).then(() => {
        const items = state.devices;
        state.devices = items.filter(device => device.id !== id);
        toast.success('Item is deleted successfully!');
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

:deep(input:focus) {
    @apply focus:border-green-600 outline-none;
}
</style>