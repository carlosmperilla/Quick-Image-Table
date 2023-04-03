<template>
    <section 
        class="mode-selection"
        :class="{
            'mode-selection--edit': currentMode === tableModes.edit,
            'mode-selection--delete': currentMode === tableModes.delete,
        }"
    >
        <section 
            class="mode-selection__selection-panel">
            <span>Modo: </span>
            <select 
                :value="currentMode"
                @input="$emit('update:currentMode', $event.target.value)"
            >
                <option :value="tableModes.view">Visualización</option>
                <option :value="tableModes.edit">Edición</option>
                <option :value="tableModes.delete">Eliminación</option>
            </select>
        </section>
        <section class="mode-selection__button-panel" v-show="currentMode !== tableModes.view">
            <button class="mode-selection__box-buttons--edit" v-if="currentMode === tableModes.edit" @click="$emit('update:currentMode', props.tableModes.view)">Terminar edición</button>
            <button class="mode-selection__box-buttons--delete" v-if="currentMode === tableModes.delete" @click="$emit('preRemovalProducts')">Eliminar {{ checkedProducts.length }} productos</button>
            <button class="mode-selection__box-buttons--delete" v-if="currentMode === tableModes.delete" @click="$emit('preCleanProducts')">¡Eliminar Tabla!</button>
        </section>
    </section>
</template>

<script setup>
    const props = defineProps({
        currentMode: {
            type: String,
            required: true
        },
        tableModes: {
            type: Object,
            required: true
        },
        checkedProducts: {
            type: Array,
            required: true
        }
    }) 
    const emit = defineEmits(['update:currentMode', 'preRemovalProducts', 'preCleanProducts'])
</script>

<style lang="scss" scoped>
    @use '@/assets/styles/sass/components/product-table-mode';
</style>