<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <section>
        <div class="container m-auto py-6">
            <RouterLink to="/" class="text-green-900 hover:text-green-500 flex items-center">
                <i class="pi pi-arrow-circle-left mr-2"></i> Back to Device Listing
            </RouterLink>
        </div>
    </section>
</template>