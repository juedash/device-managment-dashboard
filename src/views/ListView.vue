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
                        <button class="px-3 py-1 text-white bg-red-500 rounded-lg">Delete</button>
                        <button class="px-3 py-1 text-white bg-green-500 rounded-lg">Edit</button>

                    </td>
                </tr>
            </tbody>
        </table>
    </div>

</template>


<script setup lang="ts">
import type { PropType } from 'vue';
import type { DeviceItem } from '@/types/main';

const props = defineProps({
    devices: {
        type: Array as PropType<DeviceItem[]>,
    }
})
</script>

<style scoped></style>