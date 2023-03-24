<template>
    <table ref="table">
        <thead>
            <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="{ imageData, name, price, quantity } in props.products" :key="name">
                <td>
                    <img :src="imageData" alt="" width="90">
                </td>
                <td>{{ name }}</td>
                <td>{{ price }}</td>
                <td>{{ quantity }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
    const props = defineProps({
        products: {
            type: Array,
            required: true
        }
    })
    const table = ref(null)

    function getClone() {
        return table.value.cloneNode(true)
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