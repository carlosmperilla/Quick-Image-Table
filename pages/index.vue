<template>
    <main>
        <ProductTable 
            :products="products" 
            @update-product="updateProduct" 
            @reload-products="reloadProducts"
            @remove-products="removeProducts"
            @clean-products="clean"
        />
        <section class="principal-action">
            <button @click="showDialog">Mostrar</button>
        </section>
        <dialog ref="dialog">
            <button @click="closeDialog">Ocultar</button>
            <AddProduct :products="products" :is-started="isModalOpen" @add-product="addProductAndPersist"/>
        </dialog>
    </main>
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

    function removeProducts(indexList) {
        for (let index of indexList.sort((a, b) => b - a)) {
            products.splice(index, 1)
            localStorage.setItem('productsQuickImageTable', JSON.stringify(products))
        }
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
        for(let u=0; u< 40; u++){
            products.push({...product, name: u.toString()})
        }
        localStorage.setItem('productsQuickImageTable', JSON.stringify(products))
        closeDialog()
    }

    function clean(){
        localStorage.setItem('productsQuickImageTable', '[]')
        products.length = 0
    }

    function updateProduct(index, value){
        let key = Object.keys(value)
        products[index][key] = value[key]
        localStorage.setItem('productsQuickImageTable', JSON.stringify(products))
    }
</script>