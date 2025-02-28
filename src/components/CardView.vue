<template>
    <div class="grid md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 grid-row gap-2 auto-rows-fr">
        <div v-for="item in devices" :key="item.id">
            <DeviceCardtem :item="item" @deleteItem="emit('deleteItem', $event)" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { ResponseData } from '@/types/main';
import DeviceCardtem from '@/components/DeviceCardtem.vue';

const props = defineProps({
    devices: {
        type: Array as PropType<ResponseData[]>,
    }
})
const emit = defineEmits(['deleteItem'])

</script>

<style scoped></style>