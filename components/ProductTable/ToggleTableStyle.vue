<template>
    <ClientOnly>
        <button 
            alt="Cambiar visualización de tabla" 
            title="Cambiar visualización de tabla" 
            class="product-table__toggle-table-style" 
            @click="$emit('toggleTableCard')"
        >
            <div :class="{'product-table__toggle-table-style--selected': !tableCard}">
                <font-awesome-icon :icon="['fas', 'table-cells']" beat />
            </div>
            <div :class="{'product-table__toggle-table-style--selected': tableCard}">
                <font-awesome-icon :icon="['fas', 'panorama']" beat />
            </div>
        </button>
    </ClientOnly>
</template>

<script setup>
    const props = defineProps({
        tableCard: {
            type: Boolean,
            required: true
        }
    })

    const emit = defineEmits(['toggleTableCard'])
</script>

<style lang="scss" scoped>
    @use '@/assets/styles/sass/components/product-table-toggle-button';
</style>