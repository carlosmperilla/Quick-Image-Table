<template>
    <section class="name-and-cost">
        <header>
            <h1>
                <span>Nombre:</span> 
                <input 
                    type="text"
                    maxlength="20" 
                    :value="nameTable"
                    @input="$emit('update:nameTable', $event.target.value)"
                >
            </h1>
            <span class="name-subtitle">Cambie el nombre de ser pertinente</span>
        </header>
        <h2>Costo total: <span class="cost-value">$ {{ totalCost.toLocaleString().replaceAll('.', ' ') }}</span></h2>
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

<style lang="scss" scoped>
    @use '@/assets/styles/sass/components/product-table-name-and-cost';
</style>