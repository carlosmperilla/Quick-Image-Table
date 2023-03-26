<template>
    <section>
        <ProductTable :products="products" @update-product="updateProduct" @reload-products="reloadProducts"/>
        <button @click="clean">Clean</button>
        <button @click="showDialog">Mostrar</button>
        <dialog ref="dialog">
            <button @click="closeDialog">Ocultar</button>
            <AddProduct :products="products" :is-started="isModalOpen" @add-product="addProductAndPersist"/>
        </dialog>
    </section>
</template>

<script setup>
    const dialog = ref(null)
    const isModalOpen = ref(false)
    const products = reactive([])

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

    function reloadProducts() {
        Object.assign(products, fillProducts())
    }

    onMounted(() => {
        reloadProducts()
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

    function updateProduct(index, value){
        let key = Object.keys(value)
        products[index][key] = value[key]
        localStorage.setItem('productsQuickImageTable', JSON.stringify(products))
    }
</script>