<template>
    <table ref="table" :class="{'table--card': tableCard}">
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
                <td class="table--card__checkbox-delete" v-if="isRemovable">
                    <input type="checkbox" @change="(e) => updateRemovableProducts(index, e)">
                </td>
                <td class="table--card__img">
                    <img :src="product.imageData" :alt="product.name" :title="product.name" lazy="loading" width="90">
                </td>
                <td class="table--card__name">
                    {{ !isEditable ? product.name : '' }}
                    <input type="text" name="name" v-if="isEditable" v-model="product.name" @input="(e) => updateProduct(index, e)" maxlength="50">
                </td>
                <td class="table--card__price">
                    {{ !isEditable ? product.price : '' }}
                    <input type="number" name="price" min="0.0" step="0.01" v-if="isEditable" v-model="product.price" @input="(e) => updateProduct(index, e)">
                </td>
                <td class="table--card__quantity">
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
        tableCard: {
            type: Boolean,
            required: true
        }
    })
    const emit = defineEmits(['updateProduct', 'addRemovableProduct', 'substractRemovableProduct'])

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
    @use '@/assets/styles/sass/components/mainTable/principal';
    @use '@/assets/styles/sass/components/mainTable/card';

    table {
        width: 100%;
        font: 20px Calibri;
    }

    table, th, td {
        border: solid 1px darkslategrey;
        border-collapse: collapse;
        padding: 2px 3px;
        text-align: center;
        transition: all 500ms ease-in-out;
    }
</style>