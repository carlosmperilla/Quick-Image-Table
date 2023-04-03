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
            <button @click="showDialog">Ingresar producto</button>
        </section>
        <Teleport to="body">
            <dialog ref="dialog" @click.self="closeDialog">
                <section class="dialog__inner-box">
                    <button 
                        alt="Botón de 'Cerrar'"
                        @click="closeDialog" 
                        class="dialog__close-button"
                    >
                        <ClientOnly>
                            <font-awesome-icon :icon="['fas', 'circle-xmark']" />
                        </ClientOnly>
                    </button>
                    <AddProduct :products="products" :is-started="isModalOpen" @add-product="addProductAndPersist"/>
                </section>
            </dialog>
        </Teleport>
    </main>
</template>

<script setup>
    const isModalOpen = ref(false)
    const products = reactive([])
    const dialog = ref(null)
    
    function fillProducts(){
        let localProducts = localStorage.getItem('productsQuickImageTable')
        if (localProducts !== null) {
            return JSON.parse(localProducts)
        }
        return []
    }

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

    function reloadProducts() {
        Object.assign(products, fillProducts())
    }

    function addProductAndPersist(product){
        products.push(product)
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

    onMounted(() => {
        reloadProducts()
    })
</script>

<style lang="scss">
    dialog {
        position: inherit;
        border: none;
        padding: 0;
        background: none;
        overflow: hidden;
        .dialog__inner-box {
            border-radius: 25px;
            border: none;
            box-shadow: inset #365e5f 2px 2px 10px 1px;
            padding: 35px 20px;
            background-color: whitesmoke;
            position: relative;
            overflow: hidden;
            .dialog__close-button {
                height: 20px;
                aspect-ratio: 1/1;
                position: absolute;
                top: 10px;
                right: 20px;
                background: none;
                border: none;
                color: darkred;
                .fa-circle-xmark {
                    height: 100%;
                }
            }
        }
        &::backdrop {
            background: rgba(0, 0, 0, 0.5);
        }
    }
</style>