<template>
    <ul class="add-product__list">
        <li>
            <label>Nombre</label>
            <ul>
                <li v-text="productInfo.name"></li>
            </ul>
        </li>
        <li>
            <label>Precio</label>
            <ul>
                <li v-text="productInfo.price"></li>
            </ul>
        </li>
        <li>
            <label>Cantidad</label>
            <ul>
                <li v-text="productInfo.quantity"></li>
            </ul>
        </li>
    </ul>
</template>

<script setup>
    const productInfo = readonly(inject('productInfo'))
</script>

<style lang="scss" scoped>
    @use '@/assets/styles/sass/components/add-product-list';
</style>