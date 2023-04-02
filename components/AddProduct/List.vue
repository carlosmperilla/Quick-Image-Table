<template>
    <ul class="add-product__list">
        <li>
            <strong>Nombre</strong>
            <ul>
                <li v-text="productInfo.name"></li>
            </ul>
        </li>
        <li>
            <strong>Precio</strong>
            <ul>
                <li v-text="productInfo.price"></li>
            </ul>
        </li>
        <li>
            <strong>Cantidad</strong>
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
    .add-product__list {
        margin: 20px;
        overflow-y: scroll;
        strong {
            font-size: 2em;
            background-color: #b8d7d8;
            padding: 0 5px;
            border-radius: 5px;
            display: inline-block;
            margin-bottom: 5px;
            color: #213c3c;
        }
        ul {
            font-size: 1.8em;
            margin-bottom: 10px;
            li {
                overflow-wrap: break-word;
                margin-left: 5em;
                color: darkslategray;
            }
        }
        li {
            list-style: none;
        }
    }
</style>