<template>
    <div class="bg-white p-4 rounded-xl shadow-md relative min-h-full flex flex-col justify-between">
        <div class="mb-6">
            <h3 class="text-xl font-bold text-center">{{ item?.name }}</h3>
        </div>

        <div class="mb-5 flex flex-col divide-y content-between" v-if="item?.data">
            <div v-for="(data, key) in item?.data" :key="key">
                <p class="py-1 flex justify-between">
                    <span class="capitalize font-bold">{{ key }}</span>
                    <span>{{ data ? data : "-" }}</span>
                </p>
            </div>
        </div>
        <div v-else class="text-center">
            No data available! Click edit button to add new information
        </div>

        <div class="flex gap-2 self-end mt-4">
            <RouterLink :to="`/edit/${item?.id}`"
                class="bg-green-700 hover:bg-green-600 text-white font-bold py-1.5 px-4 rounded-md focus:outline-none focus:shadow-outline block">
                Edit
            </RouterLink>
            <button @click="onDeleteClick(item?.id)"
                class="bg-gray-500 hover:bg-red-600 text-white font-bold py-1.5 px-4 rounded-md focus:outline-none focus:shadow-outline block">
                Delete
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ResponseData } from '@/types/main';
import type { PropType } from 'vue';

const props = defineProps({
    item: {
        type: Object as PropType<ResponseData>,
        required: true,
    },
});

const emit = defineEmits(['deleteItem']);

const onDeleteClick = (id: string | undefined) => {
    if (id && window.confirm('Do you want to delete the item?')) {
        emit('deleteItem', id);
    }
};
</script>

<style scoped></style>