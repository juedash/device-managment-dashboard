<template>
    <div class="bg-white p-4 rounded-xl shadow-md relative h-full flex flex-col justify-between">
        <div class="mb-6">
            <h3 class="text-xl font-bold">{{ item?.name }}</h3>
        </div>
        <div class="text-gray-600 my-2">Info</div>
        <div class="mb-5">
            <p v-for="(data, key) in item?.data">
                <i :class="['pi text-orange-700 mr-1', icons[key]]" v-if="icons[key]"></i>
                <span class="capitalize">{{ key }}</span>: {{ data }}
            </p>
        </div>
        <div class="flex gap-4 self-end">
            <button
                class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline mt-4 block">
                Edit</button>
            <button @click=""
                class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline mt-4 block">
                Delete
            </button>
        </div>

    </div>
</template>

<script setup lang="ts">
import type { DeviceItem } from '@/types/main';
import type { PropType } from 'vue';

const props = defineProps({
    item: {
        type: Object as PropType<DeviceItem>,
    }
})

const icons = {
    color: 'pi-palette',
    capacity: 'pi-save',
    price: 'pi-euro'
} as Record<string, string>;

</script>

<style scoped></style>