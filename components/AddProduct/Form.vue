<template>
    <form ref="form">
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