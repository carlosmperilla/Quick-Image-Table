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

        <button @click="testLocalStorageSize">Duplicación Limite</button>
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

    function testLocalStorageSize() {
        let baseProduct = products[0]
        let size = 0
        let n;
        try {
            for (let i=0; i < 100; i++){
                let data = JSON.stringify(products)
                size = new Blob([data]).size
                console.log(i)
                n = i
                localStorage.setItem('productsQuickImageTable', data)
                products.push(baseProduct)
            }
        } catch(e) {
            // console.log(e)
            alert(e)
            // console.log(i)
            alert(size)
        }
        finally {
            alert(size)
            alert('cantidad '+n.toString())
        }

        
    }

    watch(nameTable, () => {
        localStorage.setItem('nameQuickImageTable', nameTable.value)
    })
</script>