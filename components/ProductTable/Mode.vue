<template>
    <section 
        class="mode-selection"
        :class="{
            'mode-selection--edit': isEditMode,
            'mode-selection--delete': isDeleteMode,
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
        <section class="mode-selection__button-panel" v-show="!isViewMode">
            <button class="mode-selection__box-buttons--edit" v-if="isEditMode" @click="$emit('update:currentMode', props.tableModes.view)">Terminar edición</button>
            <button class="mode-selection__box-buttons--delete" v-if="isDeleteMode" @click="$emit('preRemovalProducts')">Eliminar {{ checkedProducts.length }} productos</button>
            <button class="mode-selection__box-buttons--delete" v-if="isDeleteMode" @click="$emit('preCleanProducts')">¡Eliminar Tabla!</button>
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
    
    const isViewMode = computed(() => currentMode === tableModes.view)
    const isEditMode = computed(() => currentMode === tableModes.edit)
    const isDeleteMode = computed(() => currentMode === tableModes.delete)
</script>

<style lang="scss" scoped>
    @use '@/assets/styles/sass/components/product-table-mode';
</style>