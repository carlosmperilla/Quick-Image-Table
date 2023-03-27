<template>
    <section class="mode-selection">
        <span>Modo: </span>
        <select 
            :value="currentMode"
            @input="$emit('update:currentMode', $event.target.value)"
        >
            <option :value="tableModes.view">Visualización</option>
            <option :value="tableModes.edit">Edición</option>
            <option :value="tableModes.delete">Eliminación</option>
        </select>
        <button v-if="currentMode === tableModes.edit" @click="() => currentMode = tableModes.view">Terminar edición</button>
        <button v-if="currentMode === tableModes.delete" @click="$emit('preRemovalProducts')">Eliminar {{ checkedProducts.length }} productos</button>
        <button v-if="currentMode === tableModes.delete" @click="$emit('preCleanProducts')">¡Eliminar Tabla!</button>
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