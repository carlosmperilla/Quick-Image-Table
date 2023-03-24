<template>
    <section>
        <ProductTableMainTable :products="products" ref="mainTable"/>
        <button @click="createPDF">Crear pdf</button>
        <div ref="imprimible">
            imprimible xD
        </div>
    </section>
</template>

<script setup>
    const props = defineProps({
        products: {
            type: Array,
            required: true
        }
    })
    const mainTable = ref()
    // const imprimible = ref(null)

    function createPDF(){
        exportToPDF('my-pdf-file.pdf', mainTable.value.getClone())
    }
    function createPDF_(){
        // let table = document.getElementsByTagName('table')[0].cloneNode(true)
        let table = mainTable.value.getClone()
        let style =  `
            <style>
                table {width: 100%;font: 17px Calibri;}
                table, th, td {border: solid 1px #DDD; border-collapse: collapse;
                padding: 2px 3px;text-align: center;}
            </style>
        `
        // CREATE A WINDOW OBJECT.
        let tableWindow = window.open('', '', 'height=700,width=700');

        tableWindow.document.write(`
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                </head>
                <body>
                </body>
            </html>
        `)
        tableWindow.document.head.innerHTML += style
        tableWindow.document.body.append(table)
        
        tableWindow.print();    // PRINT THE CONTENTS.
        tableWindow.close(); 	// CLOSE THE CURRENT WINDOW.
    }
</script>