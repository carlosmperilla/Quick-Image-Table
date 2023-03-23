<template>
    <section>
        <button v-text="prevButtonContent" v-if="step > 0" @click="prevStep"></button>
        <AddProductVideoCamera v-if="isStarted" :hasPicture="hasPicture" @get-image-data="(data) => productImageData = data"/>
        <button v-text="CameraControlButtonContent" @click="photoAction" v-if="step === 0"></button>
        <section v-if="hasPicture">
            <button v-text="nextButtonContent" @click="nextStep"></button>
        </section>
        <AddProductForm 
            v-show="step === 1"
            ref="addProductForm"
        />
        <AddProductList
            v-show="isFormValid"
        />
    </section>
</template>

<script setup>
    const prevButtonDefaultContent = '<-- Retroceder a "Tomar Foto"' 
    const nextButtonDefaultContent = 'Anexar más datos -->'

    const CameraControlButtonContent = ref('Empezar')
    const isStarted = ref(false)
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

    const props = defineProps(['products'])
    const emit = defineEmits(['addProduct'])

    provide('productInfo', productInfo)

    function photoAction() {

        let takePictureText = 'Tomar foto de producto'
        let takePictureAgainText = 'Volver a tomar foto'

        if (!isStarted.value) {
            isStarted.value = true
            CameraControlButtonContent.value = takePictureText
            return null
        }
        
        if (hasPicture.value === true) {
            hasPicture.value = false
            CameraControlButtonContent.value = takePictureText
            return null
        }

        hasPicture.value = true
        CameraControlButtonContent.value = takePictureAgainText
        
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
        }
    })
</script>