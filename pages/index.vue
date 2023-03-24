<template>
    <div id="tab">
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
    </div>
    <button @click="createPDF">Crear pdf</button>
    <button @click="showDialog">Mostrar</button>
    <dialog ref="dialog">
        <button @click="closeDialog">Ocultar</button>
        <AddProduct :products="products" :is-started="isModalOpen" @add-product="addProductAndPersist"/>
    </dialog>
</template>

<script setup>
    const dialog = ref(null)
    const isModalOpen = ref(false)
    // const products = reactive([
    //     {
    //         imageData: '',
    //         name: 'Muebles',
    //         price: 1233.34,
    //         quantity: 2323
    //     },
    //     {
    //         imageData: '',
    //         name: 'Juguets',
    //         price: 7233.34,
    //         quantity: 5050
    //     }, 
    //     {
    //         imageData: '',
    //         name: 'Accesorios',
    //         price: 323233.34,
    //         quantity: 789
    //     },        
    // ])
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

    onMounted(() => {
        Object.assign(products, fillProducts())
    })

    function addProductAndPersist(product){
        products.push(product)
        localStorage.setItem('productsQuickImageTable', JSON.stringify(products))
        // JSON.parse(localStorage.getItem('productsQuickImageTable'))
        closeDialog()
    }

    function createPDF(){
        var sTable = document.getElementById('tab').innerHTML;

        var style = "<style>";
        style = style + "table {width: 100%;font: 17px Calibri;}";
        style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
        style = style + "padding: 2px 3px;text-align: center;}";
        style = style + "</style>";

        // CREATE A WINDOW OBJECT.
        var win = window.open('', '', 'height=700,width=700');

        win.document.write('<html><head>');
        win.document.write('<title>Profile</title>');   // <title> FOR PDF HEADER.
        win.document.write(style);          // ADD STYLE INSIDE THE HEAD TAG.
        win.document.write('</head>');
        win.document.write('<body>');
        win.document.write(sTable);         // THE TABLE CONTENTS INSIDE THE BODY TAG.
        win.document.write('</body></html>');

        win.document.close(); 	// CLOSE THE CURRENT WINDOW.

        win.print();    // PRINT THE CONTENTS.
    }

</script>