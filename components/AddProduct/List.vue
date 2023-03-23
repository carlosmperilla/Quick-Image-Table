<template>
    <ul>
        <li>
            <strong>Nombre:</strong>
            <ul>
                <li v-text="productInfo.name"></li>
            </ul>
        </li>
        <li>
            <strong>Precio:</strong>
            <ul>
                <li v-text="productInfo.price"></li>
            </ul>
        </li>
        <li>
            <strong>Cantidad:</strong>
            <ul>
                <li v-text="productInfo.quantity"></li>
            </ul>
        </li>
    </ul>
</template>

<script setup>
    const productInfo = readonly(inject('productInfo'))
</script>