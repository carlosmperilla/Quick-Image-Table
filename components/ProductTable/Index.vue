<template>
    <section class="product-table">
        <ProductTableMode
            v-model:current-mode="currentMode"
            :table-modes="tableModes"
            :checked-products="checkedProducts"
            @pre-removal-products="preRemovalProducts"
            @pre-clean-products="preCleanProducts"
        />
        <ProductTableNameAndCost
            v-model:name-table="nameTable"
            :total-cost="totalCost"
        />
        <ProductTableMainTable 
            ref="mainTable" 
            :table-modes="tableModes"
            :mode="currentMode" 
            :products="products" 
            @update-product="(index, value) => emit('updateProduct', index, value) "
            @add-removable-product="(index) => checkedProducts.push(index)"
            @substract-removable-product="(index) => checkedProducts.splice(checkedProducts.indexOf(index), 1)"
        />
        <button @click="createPDF">Crear pdf</button>
    </section>
</template>

<script setup>
    const props = defineProps({
        products: {
            type: Array,
            required: true
        }
    })
    const emit = defineEmits(['updateProduct', 'reloadProducts', 'removeProducts', 'cleanProducts'])
    const tableModes = {
        view: 'view',
        edit: 'edit',
        delete: 'delete'
    }
    const mainTable = ref()
    const defaultNameTable = 'MyQuickTable'
    const nameTable = ref('')
    const currentMode = ref(tableModes.view)
    const checkedProducts = reactive([])

    function persistName(){
        let localNameTable = localStorage.getItem('nameQuickImageTable')
        if (localNameTable !== null) {
            return localNameTable
        }
        return defaultNameTable
    }

    function preRemovalProducts() {
        let nameProductToRemoval = checkedProducts.map((index) => props.products[index].name).join(', ')
        if (checkedProducts.length === 0) {
            alert('No hay productos para eliminar')
            return null
        }
        if (window.confirm(`¿Realmente quiere eliminar [${nameProductToRemoval}]?`)) {
            emit('removeProducts', checkedProducts)
            currentMode.value = tableModes.view
        }
    }

    function preCleanProducts() {
        if (window.confirm(`¿Realmente quiere eliminar la tabla entera?`)) {
            emit('cleanProducts')
            currentMode.value = tableModes.view
        }
    }

    function createPDF(){
        currentMode.value = tableModes.view // Forzamos el modo: vista.

        // Cuando se actualice el DOM clonamos y exportamos el PDF
        nextTick(() => {
            let table = mainTable.value.getClone()
            let container = document.createElement('div')
            let tableNameContainer = document.createElement('h1')
            let totalCostContainer = document.createElement('h2')
            let fileName =  props.name !== '' ? `${nameTable.value}.pdf` : 'MyQuickTable.pdf'
            
            tableNameContainer.innerText = nameTable.value
            tableNameContainer.style.textAlign = "center"
            console.log(totalCost)
            totalCostContainer.innerText = 'Costo total: $ ' + totalCost.value.toString()
            totalCostContainer.style.textAlign = "left"
            container.style.width = "595.28pt"  // Para que ocupe todo el ancho.
            container.append(tableNameContainer, totalCostContainer, table)

            // https://sidebase.io/nuxt-pdf/getting-started/quick-start
            exportToPDF(fileName, container, {
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
        })


    }

    onMounted(() => {
        nameTable.value = persistName()
    })

    const totalCost = computed(() =>  props.products.reduce(
        (accumulator, currentValue) => accumulator + currentValue.price*currentValue.quantity,
        0
    ))

    watch(nameTable, () => {
        localStorage.setItem('nameQuickImageTable', nameTable.value)
    })

    watch(currentMode, () => {
        if (currentMode.value === tableModes.view) {
            emit('reloadProducts') // recargamos la tabla de productos.
        }

        if (currentMode.value === tableModes.edit) {

        }

        if (currentMode.value === tableModes.delete) {
            checkedProducts.length = 0 // reseteamos la lista de productos checkeados.
        }
    })
</script>