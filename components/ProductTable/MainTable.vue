<template>
    <table ref="table">
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
            <!-- <tr v-for="({ imageData, name, price, quantity }, index) in products" :key="index"> -->
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
    const table = ref(null)

    function updateRemovableProducts(index, e) {
        if (e.target.checked) {
            emit('addRemovableProduct', index)
            return null
        }
        emit('substractRemovableProduct', index)
    }

    function getClone() {
        return table.value.cloneNode(true)
    }

    const isEditable = computed(() => props.mode === props.tableModes.edit)
    const isRemovable = computed(() => props.mode === props.tableModes.delete)

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

<style scoped>
    table {
        width: 100%;
        font: 17px Calibri;
    }

    table, th, td {
        border: solid 1px #DDD;
        border-collapse: collapse;
        padding: 2px 3px;
        text-align: center;
    }
</style>