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
            <tr v-for="({ imageData, name, price, quantity }, index) in props.products" :key="index">
                <td v-if="isRemovable">
                    <input type="checkbox" @change="(e) => updateRemovableProducts(index, e)">
                </td>
                <td>
                    <img :src="imageData" alt="" width="90">
                </td>
                <td 
                    @input="(e) => updateProduct(index, 'name', e)"
                    :contenteditable="isEditable"
                >{{ name }}</td>
                <td 
                    @input="(e) => updateProduct(index, 'price', e)"
                    :contenteditable="isEditable"
                >{{ price }}</td>
                <td 
                    @input="(e) => updateProduct(index, 'quantity', e)"
                    :contenteditable="isEditable"
                >{{ quantity }}</td>
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
        }
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
        
        if (isNaN(data) || data < 0) {
            return NaN
        }
        
        return data
    }
 
    function updateProduct(index, field, event){
        let filterData = filterByField(field, event.target.innerText)
        emit('updateProduct', index, { [field]: filterData })
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