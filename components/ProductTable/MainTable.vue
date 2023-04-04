<template>
    <table ref="table" :class="{'table--card': condi}">
        <thead>
            <tr>
                <th v-if="isRemovable">¿Eliminar?</th>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(product, index) in products" :key="index">
                <td v-if="isRemovable">
                    <input type="checkbox" @change="(e) => updateRemovableProducts(index, e)">
                </td>
                <td>
                    <img :src="product.imageData" alt="" width="90">
                </td>
                <td>
                    {{ !isEditable ? product.name : '' }}
                    <input type="text" name="name" v-if="isEditable" v-model="product.name" @input="(e) => updateProduct(index, e)" maxlength="50">
                </td>
                <td>
                    {{ !isEditable ? product.price : '' }}
                    <input type="number" name="price" min="0.0" step="0.01" v-if="isEditable" v-model="product.price" @input="(e) => updateProduct(index, e)">
                </td>
                <td>
                {{ !isEditable ? product.quantity : '' }}
                <input type="number" name="quantity" v-if="isEditable" v-model="product.quantity" @input="(e) => updateProduct(index, e)" min="0">
            </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
    const props = defineProps({
        products: {
            type: Array,
            required: true
        },
        mode: {
            type: String,
            required: true
        },
        tableModes: {
            type: Object,
            required: true
        },
    })
    const emit = defineEmits(['updateProduct', 'addRemovableProduct', 'substractRemovableProduct'])
    
    const condi = ref(true)
    const table = ref(null)

    const isEditable = computed(() => props.mode === props.tableModes.edit)
    const isRemovable = computed(() => props.mode === props.tableModes.delete)

    //Funciones Generales.
    function getClone() {
        return table.value.cloneNode(true)
    }
    
    function filterByField(field, data) {
            
        if (field === 'name') {
            return data.slice(0, 50)
        }
        
        if (data < 0) {
            return 0
        }
        
        if (field === 'price') {
            let newData = data.endsWith('.') ? data + '0' : data
            return Number.parseFloat(newData)
        }
        
        if (field === 'quantity') {
            return Number.parseInt(data)
        }        
    }

    // Funciones Eventos.

    function updateRemovableProducts(index, e) {
        if (e.target.checked) {
            emit('addRemovableProduct', index)
            return null
        }
        emit('substractRemovableProduct', index)
    }

    function updateProduct(index, event){
        if (event.target.value === '') {
            return null
        }

        let filterData = filterByField(event.target.name, event.target.value)
        
        emit('updateProduct', index, { [event.target.name]: filterData })
    }

    defineExpose({
        getClone,
    })
</script>

<style lang="scss">
    table {
        width: 100%;
        font: 20px Calibri;
    }

    table, th, td {
        border: solid 1px darkslategrey;
        border-collapse: collapse;
        padding: 2px 3px;
        text-align: center;
    }

    .table--card {
        border: none;
        thead {
            display: none;
        }
        tbody {
            display: flex;
            flex-direction: column;
            gap: 25px;
            align-items: center;
            padding: 30px;
            tr {
                display: flex;
                flex-direction: column;
                width: 95%;
                border: none;
                border-radius: 25px;
                contain: content;
                box-shadow: 5px 7px 8px -4px darkgoldenrod;
                td {
                    padding: 0;
                    border: none;
                    background-color: #f8db9f;
                    color: darkslategrey;
                    font-size: 2em;
                    font-weight: bold;
                    img {
                        width: 100%;
                    }   
                    &:nth-child(n+2) {
                        word-break: break-all;
                        font-weight: normal;
                        padding: 3px 20px;
                    }
                    &:nth-child(n+3) {
                        font-size: 1.5em;
                    }
                    &:nth-child(3) {
                        background-color: #3196bd;
                        color: #00139c;
                    }
                    &:nth-child(4) {
                        background-color: seagreen;
                        color: #ffe1c7;
                    }
                }
            }
        }
    }
</style>