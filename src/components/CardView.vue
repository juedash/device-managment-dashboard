<template>
    <div class="">
        <div class="grid md:grid-cols-4 2xl:grid-cols-6 grid-row gap-2 auto-rows-fr">
            <div v-for="item in devices">
                <DeviceCardtem :item="item" @deleteItem="emit('deleteItem', $event)" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { DeviceItem } from '@/types/main';
import DeviceCardtem from '@/components/DeviceCardtem.vue';

const props = defineProps({
    devices: {
        type: Array as PropType<DeviceItem[]>,
    }
})
const emit = defineEmits(['deleteItem'])

</script>

<style scoped></style>