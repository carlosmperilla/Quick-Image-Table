<template>
    <section class="name-and-cost">
        <h1>
            <span>Nombre:</span> 
            <input 
                type="text"
                maxlength="20" 
                :value="nameTable"
                @input="$emit('update:nameTable', $event.target.value)"
            >
            <span>Cambie el nombre de ser pertinente</span>
        </h1>
        <h2>Costo total: $ {{ totalCost }}</h2>
    </section>
</template>

<script setup>
    const props = defineProps({
        nameTable: {
            type: String,
            required: true
        },
        totalCost: {
            type: Number,
            required: true
        }
    })
    const emit = defineEmits(['update:nameTable'])
</script>