<template>
    <details class="product-table__export-panel" v-if="hasProducts">
        <summary>Exportar tabla: <br><span class="product-table__export-panel__name-table">{{ nameTable }}</span></summary>
        <button type="button" @click="$emit('createPdf')">
            <ClientOnly>
                <font-awesome-icon :icon="['fas', 'file-pdf']" />
            </ClientOnly>
                PDF
        </button>
        <button type="button" @click="$emit('createZip')">
            <ClientOnly>
                <font-awesome-icon :icon="['fas', 'file-zipper']" />
            </ClientOnly>
                ZIP
        </button>
    </details>
</template>

<script setup>
    const props = defineProps({
        hasProducts: {
            type: Boolean,
            required: true
        },
        nameTable: {
            type: String,
            required: true
        }
    })
    
    const emit = defineEmits(['createPdf', 'createZip'])
</script>

<style lang="scss" scoped>
    @use '@/assets/styles/sass/components/product-table-export-panel';
</style>