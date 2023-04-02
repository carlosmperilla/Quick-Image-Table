<template>
    <form ref="form" class="add-product__form">
        <fieldset>
            <legend>Datos adicionales</legend>
            <label for="product-name">Nombre de producto:</label>
            <input type="text" name="product-name" id="product-name" v-model.trim="productInfo.name" required maxlength="50" @keydown.enter="nextInputFocus">
            <label for="product-price">Precio de producto:</label>
            <input type="number" name="product-price" id="product-price" v-model="productInfo.price" required min="0.0" step="any" @keydown.enter="nextInputFocus">
            <label for="product-quantity">Cantidad de producto:</label>
            <input type="number" name="product-quantity" id="product-quantity" v-model="productInfo.quantity" required min="0" @keydown.enter="$emit('pressNextButton')">
        </fieldset>
    </form>
</template>

<script setup>
    const productInfo = inject('productInfo')
    const emit = defineEmits(['pressNextButton'])
    const form = ref(null)
    const reportValidity = () => form.value.reportValidity()

    function nextInputFocus(e) {
        let currentElement = e.target.nextElementSibling
        while (currentElement.tagName.toLowerCase() !== 'input') {
            currentElement = currentElement.nextElementSibling
            if (currentElement === null) break
        }
        currentElement.focus()
    }

    defineExpose({
        reportValidity,
    })
</script>

<style lang="scss" scoped>
    .add-product__form {
        margin-top: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        fieldset {
            border-radius: 15px;
            border: none;
            background-color: #caa377;
            display: flex;
            flex-direction: column;
            padding: 15px 10px;
            legend {
                font-size: 2em;
                font-weight: bold;
                text-align: center;
                background-color: #80742c;
                color: whitesmoke;
                border-radius: 10px;
                padding: 5px;
            }
            label {
                font-size: 1.5em;
                font-weight: bold;
                color: white;
                margin-bottom: 2px;
            }
            input {
                padding-left: 1em;
                border-radius: 25px;
                border: none;
                color: darkslategray;
                &:not(:last-child){
                    margin-bottom: 5px;
                }
            }
            &:focus-within {
            background-color: #a98862;
            }
        }
    }
</style>