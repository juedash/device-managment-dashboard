<template>
    <div>
        <section class="bg-gray-100 h-screen">
            <div class="container m-auto max-w-2xl py-24">
                <BackButton />
                <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                    <form @submit.prevent="handleSubmit">
                        <h2 class="text-3xl text-center font-semibold mb-6">Add a new device</h2>

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
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { DeviceItem } from '@/types/main';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useDevicesStore } from '@/stores/customDevicesStore';
import BackButton from '@/components/BackButton.vue';
import { toast } from 'vue3-toastify';

const router = useRouter();
const devicesStore = useDevicesStore();

const form = ref({
    name: '',
    price: '',
    category: '',
    color: '',
    storageSize: null,
    storageUnit: ''
});


const handleSubmit = () => {
    const { name, storageSize, storageUnit, ...rest } = form.value;
    const capacity = `${storageSize} ${storageUnit}`;
    const formData = {
        name,
        data: {
            capacity,
            ...rest
        }
    };

    // axios.post('https://api.restful-api.dev/objects', formData)
    //     .then(response => {
    //         console.log('Response:', response);
    //         console.log("response.data.id", response.data.id);
    //         devicesStore.addDevice(response.data.id);
    //         router.push('/');
    //     })
    //     .catch(error => {
    //         console.error('Error:', error);
    //     });


    axios.post('api/objects', formData)
        .then(response => {
            devicesStore.addDevice(response.data.id);
            toast.success('Device was added successsfully');
            setTimeout(() => {
                router.push('/');
            }, 3500)
        })
        .catch(error => {
            console.error('Error:', error);
        });
};
</script>

<style scoped></style>