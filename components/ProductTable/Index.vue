<template>
    <section>
        <ProductTableMainTable :products="products" ref="mainTable"/>
        <button @click="createPDF">Crear pdf</button>
    </section>
</template>

<script setup>
    const props = defineProps({
        products: {
            type: Array,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    })
    const mainTable = ref()

    async function createPDF(){
        let table = mainTable.value.getClone()
        let fileName =  props.name !== '' ? `${props.name}.pdf` : 'MyQuickTable.pdf' 
        table.style.width = "595.28pt" // Para que ocupe todo el ancho.

        // https://sidebase.io/nuxt-pdf/getting-started/quick-start
        await exportToPDF(fileName, table, {
            orientation: 'l',
            unit: 'pt',
            format: 'a4',
            putOnlyUsedFonts: true,
            floatPrecision: 'smart',
            compress: true
        }, {
            margin: [60, 30, 60, 30], // Para conservar unos margenes.
            autoPaging:'text' // Evita que el texto aparezca cortado entre pagina y pagina.
        })
    }
</script>