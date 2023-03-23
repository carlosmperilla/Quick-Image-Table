<template>
    <table>
        <thead>
            <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="{ imageData, name, price, quantity } in products" :key="name">
                <td>
                    <img :src="imageData" alt="" width="90">
                </td>
                <td>{{ name }}</td>
                <td>{{ price }}</td>
                <td>{{ quantity }}</td>
            </tr>
        </tbody>
    </table>
    <button @click="showDialog">Mostrar</button>
    <dialog ref="dialog">
        <button @click="closeDialog">Ocultar</button>
        <AddProduct :products="products" @add-product="(product) => products.push(product)"/>
    </dialog>
</template>

<script setup>
    const dialog = ref(null)
    const products = reactive([
        {
            imageData: '',
            name: 'Muebles',
            price: 1233.34,
            quantity: 2323
        },
        {
            imageData: '',
            name: 'Juguets',
            price: 7233.34,
            quantity: 5050
        }, 
        {
            imageData: '',
            name: 'Accesorios',
            price: 323233.34,
            quantity: 789
        },        
    ])

    function showDialog(){
        dialog.value.showModal()
    }

    function closeDialog(){
        dialog.value.close()
    }
</script>