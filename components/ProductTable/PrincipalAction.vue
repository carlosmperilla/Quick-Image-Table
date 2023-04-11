<template>
    <section id="principal-action">
        <ClientOnly>
            <button type="button" @click="$emit('showDialog')" :alt="text" :title="text">
                <font-awesome-icon :icon="['fas', 'circle-plus']" shake />
            </button>
            <template #fallback>
                <p class="principal-action--fallback">
                    {{ text }}...
                </p>
            </template>
        </ClientOnly>
    </section>
</template>

<script setup>
    const props = defineProps({
        text: {
            type: String,
            required: true
        }
    })
    
    const emit = defineEmits(['showDialog'])
</script>

<style lang="scss" scoped>
    @use '@/assets/styles/sass/components/product-table-principal-action';
</style>