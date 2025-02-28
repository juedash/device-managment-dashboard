<template>
    <section class="bg-gray-100 h-screen">
        <div class="container m-auto max-w-2xl py-24">
            <BackButton />
            <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                <form @submit.prevent="handleSubmit" v-if="form">
                    <h2 class="text-3xl text-center font-semibold mb-6">Edit device item</h2>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">Device Name</label>
                        <input type="text" v-model="form.name" id="device-name" name="device-name"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="eg. Apple iPhone 12 Pro Max"
                            required />
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">Price</label>
                        <input type="number" v-model="form.price" id="name" name="name"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="eg. 99.99" />
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">Category</label>
                        <input type="text" v-model="form.category" id="name" name="name"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="eg. smartphone" />
                    </div>


                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">Color</label>
                        <input type="text" v-model="form.color" id="name" name="capacity"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="eg. black" />
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">Storage</label>
                        <div class="grid grid-cols-2 gap-2 auto-rows-max">
                            <input type="number" v-model="form.storageSize" id="capacity" name="capacity"
                                class="border rounded w-full py-2 px-3 mb-2" placeholder="eg. 64" />
                            <select id="salary" name="salary" v-model="form.storageUnit"
                                class="border rounded w-full py-2 px-3 mb-2 bg-white pr-2" required>
                                <option disabled selected value> -- select storage unit -- </option>
                                <option value="B">B</option>
                                <option value="KB">KB</option>
                                <option value="MB">MB</option>
                                <option value="GB">GB</option>
                                <option value="TB">TB</option>
                            </select>
                        </div>

                    </div>
                    <div>
                        <button
                            class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                            type="submit">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import BackButton from '@/components/BackButton.vue';
import axios from 'axios';
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import type { DeviceItem, ResponseData } from '@/types/main';

const route = useRoute();
const deviceId = route.params.id;
const form = ref<DeviceItem>({
    id: '',
    name: '',
    price: 0,
    category: '',
    color: '',
    storageSize: '',
    storageUnit: '',
});


onMounted(async () => {
    try {
        const response = await axios.get<ResponseData>(`/api/objects/${deviceId}`);
        const { id, name, data } = response.data;
        const [storageSize, storageUnit] = data?.capacity?.split(' ') || [];

        form.value = {
            id,
            name,
            price: data?.price || 0,
            category: data?.category || '',
            color: data?.color || '',
            storageSize,
            storageUnit,
        };
    } catch (error) {
        console.error('Error fetching device', error);
    }
});

const handleSubmit = async () => {
    const { storageSize, storageUnit, ...formItems } = form.value;

    const updatedDevice: any = {
        ...formItems,
    };

    if (storageSize && storageUnit) {
        updatedDevice.capacity = `${storageSize} ${storageUnit}`;
    }

    try {
        const response = await axios.put(`/api/objects/${deviceId}`, updatedDevice);
        console.log('Device updated successfully:', response.data);
    } catch (error) {
        console.error('Error updating device:', error);
    }
};

</script>

<style scoped></style>