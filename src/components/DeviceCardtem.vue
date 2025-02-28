<template>
    <div class="bg-white p-4 rounded-xl shadow-md relative min-h-full flex flex-col justify-between">
        <div class="mb-6">
            <h3 class="text-xl font-bold text-center">{{ item?.name }}</h3>
        </div>
        <div class="mb-5 flex flex-col divide-y content-between" v-if="item?.data">
            <div v-for="(data, key) in item?.data">
                <p class="py-1 flex justify-between">
                    <span class="capitalize font-bold" v-if="key !== 'Description'">{{ key }}</span> {{ data ? data :
                        "-" }}

                </p>
            </div>
        </div>
        <div v-else class="text-center">
            No data available! Click edit button to add new information
        </div>
        <div class="flex gap-2 self-end">
            <RouterLink :to="`/edit/${item?.id}`" class=" bg-green-500 hover:bg-green-600 text-white text-center font-bold py-1.5 text-sm px-4 rounded-md
                focus:outline-none focus:shadow-outline mt-4 block">
                Edit</RouterLink>
            <button @click="emit('deleteItem', item?.id)"
                class="bg-red-500 hover:bg-red-600 text-white font-bold py-1.5 px-4 rounded-md focus:outline-none focus:shadow-outline  py-1.5 text-sm  mt-4 block">
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
    }
})

const emit = defineEmits(["deleteItem"]);


// const deleteItem = async (id: number) => {
//     await axios.delete(`https://api.restful-api.dev/objects/${id}`).then((response) => {
//         router.go(0);
//     })
// }

</script>

<style scoped></style>