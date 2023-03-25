<template>
    <section>
        <button v-text="prevButtonContent" v-if="step > 0" @click="prevStep"></button>
        <AddProductVideoCamera :hasPicture="hasPicture" v-if="props.isStarted" @get-image-data="(data) => productImageData = data"/>
        <button v-text="CameraControlButtonContent" @click="photoAction" v-if="step === 0"></button>
        <section v-if="hasPicture">
            <button v-text="nextButtonContent" @click="nextStep"></button>
        </section>
        <AddProductForm 
            v-show="step === 1"
            ref="addProductForm"
            @press-next-button="nextStep"
        />
        <AddProductList
            v-show="isFormValid && step === 2"
        />
    </section>
</template>

<script setup>
    const prevButtonDefaultContent = '<-- Retroceder a "Tomar Foto"' 
    const nextButtonDefaultContent = 'Anexar más datos -->'
    const takePictureDefaultContent = 'Tomar foto de producto'

    const CameraControlButtonContent = ref(takePictureDefaultContent)
    const hasPicture = ref(false)
    
    const step = ref(0)
    const nextButtonContent = ref(nextButtonDefaultContent)
    const prevButtonContent = ref(prevButtonDefaultContent)
    const addProductForm = ref()
    const isFormValid = ref(false)

    const productImageData = ref('')
    const productInfo = reactive({
        name: '',
        price: 0,
        quantity: 0
    })

    const props = defineProps({
        products: {
            type: Array,
            required: true
        },
        isStarted: {
            type: Boolean,
            required: true
        }
    })
    const emit = defineEmits(['addProduct'])

    provide('productInfo', productInfo)
    
    function photoAction() {

        let takePictureAgainText = 'Volver a tomar foto'

        if (hasPicture.value === true) {
            hasPicture.value = false
            CameraControlButtonContent.value = takePictureDefaultContent
            return null
        }

        hasPicture.value = true
        CameraControlButtonContent.value = takePictureAgainText
        
    }

    function reset() {
        step.value = 0
        productImageData.value = ''
        hasPicture.value = false
        Object.assign(productInfo, {name: '', price: 0, quantity: 0})
        CameraControlButtonContent.value = takePictureDefaultContent
    }
    
    const prevStep = () => step.value > 0 ? step.value-- : step.value
    const nextStep = () => step.value < 3 ? step.value++ : step.value

    watch(step, () => {
        if (step.value === 0) {
            nextButtonContent.value = nextButtonDefaultContent
        }

        if (step.value === 1) {
            isFormValid.value = false
            prevButtonContent.value = prevButtonDefaultContent
            nextButtonContent.value = 'Vista previa -->'
        }

        if (step.value === 2) {
            isFormValid.value = addProductForm.value.reportValidity()
            
            if (!isFormValid.value) {
                step.value--
                return null
            }

            let oldName = productInfo.name
            productInfo.name = oldName.charAt(0).toUpperCase() + oldName.slice(1)

            prevButtonContent.value = '<-- Retroceder a "Formulario Producto"'
            nextButtonContent.value = 'Añadir producto a tabla -->'
        }

        if (step.value === 3) {
            // añadir a la tabla
            if (props.products.findIndex((product) => product.name === productInfo.name) !== -1) {
                let randomId = Math.round(Math.random()*(10**5)).toString()
                productInfo.name += ' - ' + randomId
            }
            
            emit('addProduct', {imageData: productImageData.value, ...productInfo})
            reset()
        }
    })
</script>