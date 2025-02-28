<template>
    <section class="bg-gray-100 h-screen">
        <div class="container m-auto max-w-2xl py-">
            <BackButton />
            <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                <div v-if="state.isLoading">
                    <PulseLoader />
                </div>
                <form @submit.prevent="handleSubmit" v-else>
                    <h2 class="text-3xl text-center font-semibold mb-6">Edit device item</h2>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">Device Name</label>
                        <input type="text" v-model="state.form.name" id="device-name" name="device-name"
                            class="input-field" placeholder="eg. Apple iPhone 12 Pro Max" required />
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">Price</label>
                        <input type="text" v-model="state.form.price" id="price" name="price" class="input-field"
                            placeholder="eg. 99.99" required />
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">Category</label>
                        <input type="text" v-model="state.form.category" id="category" name="category"
                            class="input-field" placeholder="eg. smartphone" required />
                    </div>


                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">Color</label>
                        <input type="text" v-model="state.form.color" id="color" name="color" class="input-field"
                            placeholder="eg. black" required />
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">Storage</label>
                        <div class="grid grid-cols-2 gap-2 auto-rows-max">
                            <input type="number" v-model="state.form.storageSize" id="storageSize" name="storageSize"
                                required class="input-field" placeholder="eg. 64" />
                            <select id="storageUnit" name="storageUnit" v-model="state.form.storageUnit"
                                class="input-field bg-white pr-2" required>
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
import { onMounted, ref, computed, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { DeviceItem, ResponseData } from '@/types/main';
import { toast } from 'vue3-toastify';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

const route = useRoute();
const deviceId = route.params.id;
const router = useRouter();
const state = reactive({
    form: {} as DeviceItem,
    isLoading: true
})

onMounted(async () => {
    await axios.get<ResponseData>(`/api/objects/${deviceId}`).then((response) => {
        const { id, name, data } = response.data;
        const [storageSize, storageUnit] = data?.capacity?.split(' ') || [];

        state.form = {
            id,
            name,
            price: data?.price || 0,
            category: data?.category || '',
            color: data?.color || '',
            storageSize,
            storageUnit,
        };
    }).catch(() => {
        toast.error('Something went wrong')
    }).finally(() => state.isLoading = false)
});

const handleSubmit = async () => {
    if (isNaN(Number(state.form.price))) {
        toast.warning('Enter only numbers in the price field');
        return;
    }
    const { id, name, storageSize, storageUnit, ...formItems } = state.form;

    const updatedDevice: any = {
        id, name,
        data: {
            ...formItems,
        }
    };

    if (storageSize && storageUnit) {
        updatedDevice.data.capacity = `${storageSize} ${storageUnit}`;
    }
    await axios.put(`/api/objects/${deviceId}`, updatedDevice).then((response) => {
        toast.success('Device updated successsfully');
        router.push("/");
    }).catch(() => {
        toast.error('Error Updating');
    })
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