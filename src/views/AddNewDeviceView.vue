<template>
    <div>
        <section class="bg-gray-100 h-screen">
            <div class="container m-auto max-w-2xl py-6">
                <BackButton />
                <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                    <form @submit.prevent="handleSubmit">
                        <h2 class="text-3xl text-center font-semibold mb-6">
                            Add a new device
                        </h2>

                        <div class="mb-4">
                            <label class="block text-gray-700 font-bold mb-2">Device Name</label>
                            <input type="text" v-model="form.name" id="device-name" name="device-name"
                                class="input-field" placeholder="eg. Apple iPhone 12 Pro Max" required />
                        </div>

                        <div class="mb-4">
                            <label class="block text-gray-700 font-bold mb-2">Price</label>
                            <input type="text" v-model="form.price" id="price" name="price" class="input-field"
                                placeholder="eg. 99.99" required />
                        </div>

                        <div class="mb-4">
                            <label class="block text-gray-700 font-bold mb-2">Category</label>
                            <input type="text" v-model="form.category" id="category" name="category" class="input-field"
                                placeholder="eg. smartphone" required />
                        </div>


                        <div class="mb-4">
                            <label class="block text-gray-700 font-bold mb-2">Color</label>
                            <input type="text" v-model="form.color" id="color" name="color" class="input-field"
                                placeholder="eg. black" required />
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 font-bold mb-2">Storage</label>
                            <div class="grid grid-cols-2 gap-2 auto-rows-max">
                                <input type="number" v-model="form.storageSize" id="storageSize" name="storageSize"
                                    class="input-field" placeholder="eg. 64" required />
                                <select id="storageUnit" name="storageUnit" v-model="form.storageUnit"
                                    class="input-field bg-white mr-6" required>
                                    <option disabled selected value> -- select storage unit -- </option>
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

    axios.post('api/objects', formData)
        .then(response => {
            devicesStore.addDevice(response.data.id);
            toast.success('Device was added successsfully');
            router.push('/');

        })
        .catch((error) => {
            if (error.status === 405) {
                toast.error('Not allowed');
            } else {
                toast.error('Something went wrong please try adding the item again!');
            }
        });
};
</script>

<style scoped>
.input-field {
    @apply border rounded w-full py-2 px-3 mb-2 focus:border-green-600;
}

:deep(.input-field:focus) {
    @apply focus:border-green-600 outline-none invalid:border-pink-500;
}
</style>