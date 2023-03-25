<template>
    <section>
        <span>Nombre:</span> 
        <input type="text" v-model="nameTable">
        <span>Cambie el nombre de ser pertinente</span>
        <ProductTable :products="products" :name="nameTable"/>
        <button @click="clean">Clean</button>
        <button @click="showDialog">Mostrar</button>
        <dialog ref="dialog">
            <button @click="closeDialog">Ocultar</button>
            <AddProduct :products="products" :is-started="isModalOpen" @add-product="addProductAndPersist"/>
        </dialog>
    </section>
</template>

<script setup>
    const defaultNameTable = 'MyQuickTable'

    const dialog = ref(null)
    const isModalOpen = ref(false)
    const products = reactive([])
    const nameTable = ref('')

    function showDialog(){
        dialog.value.showModal()
        isModalOpen.value = true
    }
    
    function closeDialog(){
        dialog.value.close()
        isModalOpen.value = false
    }

    function fillProducts(){
        let localProducts = localStorage.getItem('productsQuickImageTable')
        if (localProducts !== null) {
            return JSON.parse(localProducts)
        }
        return []
    }

    function persistName(){
        let localNameTable = localStorage.getItem('nameQuickImageTable')
        if (localNameTable !== null) {
            return localNameTable
        }
        return defaultNameTable
    }

    onMounted(() => {
        Object.assign(products, fillProducts())
        nameTable.value = persistName()
    })

    function addProductAndPersist(product){
        products.push(product)
        localStorage.setItem('productsQuickImageTable', JSON.stringify(products))
        closeDialog()
    }

    function clean(){
        localStorage.clear()
        products.length = 0
    }

    watch(nameTable, () => {
        localStorage.setItem('nameQuickImageTable', nameTable.value)
    })
</script>