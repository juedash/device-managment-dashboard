<template>
    <div class="overflow-x-auto">
        <table class="w-full border-collapse rounded-lg overflow-hidden">
            <thead>
                <tr class="bg-gray-200 text-left text-gray-600">
                    <th class="p-3">Device Name</th>
                    <th class="p-3">Price</th>
                    <th class="p-3">Category</th>
                    <th class="p-3">Color</th>
                    <th class="p-3">Storage</th>
                    <th class="p-3">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(device, index) in devices" :key="index" class="border-b hover:bg-gray-100">
                    <td class="p-3 flex items-center gap-2">
                        <span>{{ device.name }}</span>
                    </td>

                    <td class="p-3">{{ device?.data?.price }}</td>
                    <td class="p-3">{{ device?.data?.category }}</td>
                    <td class="p-3">{{ device?.data?.color }}</td>
                    <td class="p-3">{{ device?.data?.capacity }}</td>

                    <td class="p-3 flex gap-1">
                        <div class="flex gap-2 self-end">
                            <RouterLink :to="`/edit/${device.id}`" class=" bg-green-700 hover:bg-green-600 text-white text-center font-bold py-1.5 text-sm px-4 rounded-md
                focus:outline-none focus:shadow-outline mt-4 block">
                                Edit</RouterLink>
                            <button @click="emit('deleteItem', device.id)"
                                class="bg-gray-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline  py-1.5 text-sm  mt-4 block">
                                Delete
                            </button>
                        </div>

                    </td>
                </tr>
            </tbody>
        </table>
    </div>

</template>


<script setup lang="ts">
import type { PropType } from 'vue';
import type { ResponseData } from '@/types/main';

const props = defineProps({
    devices: {
        type: Array as PropType<ResponseData[]>,
    }
})

const emit = defineEmits(['deleteItem'])
</script>

<style scoped></style>