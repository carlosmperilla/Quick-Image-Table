<template>
    <section class="add-product">
        <AddProductVideoCamera :hasPicture="hasPicture" v-if="isStarted" @get-image-data="(data) => productImageData = data"/>
        <button 
            @click="photoAction" 
            v-if="step === 0"
            class="add-product__button-take-photo"
        >
        <ClientOnly>
            <font-awesome-icon :icon="['fas', takePhotoIcon]" />
        </ClientOnly>
         {{ CameraControlButtonContent }}</button>
        <section v-if="hasPicture" class="add-product__box-arrow-buttons">
            <button v-text="prevButtonContent" v-if="step > 0" @click="prevStep"></button>
            <button @click="nextStep">
                {{ nextButtonContent }}&nbsp;
                <ClientOnly>
                    <font-awesome-icon :icon="['fas', 'arrow-right']" />
                </ClientOnly>
            </button>
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

    // Constantes no reactivas.
    const prevButtonDefaultContent = '<-- Retroceder a "Tomar Foto"' 
    const nextButtonDefaultContent = 'Anexar más datos'
    const takePictureDefaultContent = 'Tomar foto de producto'

    const CameraControlButtonContent = ref(takePictureDefaultContent)
    const prevButtonContent = ref(prevButtonDefaultContent)
    const nextButtonContent = ref(nextButtonDefaultContent)
    const productImageData = ref('')
    const isFormValid = ref(false)
    const hasPicture = ref(false)
    const step = ref(0)
    
    const productInfo = reactive({
        name: '',
        price: 0,
        quantity: 0
    })
    
    const addProductForm = ref()
    
    provide('productInfo', productInfo)
    
    const takePhotoIcon = computed(() => !hasPicture.value ? 'camera' : 'camera-rotate')

    // Funciones Generales.
    function capitalize(oldName){
        productInfo.name = oldName.charAt(0).toUpperCase() + oldName.slice(1)
    }

    function generateUniqueNameProduct(){
        let randomId = Math.round(Math.random()*(10**5)).toString()

        if (props.products.findIndex((product) => product.name === productInfo.name) !== -1) {
            productInfo.name += ' - ' + randomId
        }
    }

    function reset() {
        step.value = 0
        productImageData.value = ''
        hasPicture.value = false
        Object.assign(productInfo, {name: '', price: 0, quantity: 0})
        CameraControlButtonContent.value = takePictureDefaultContent
    }

    // Funciones de Evento.
    const prevStep = () => step.value > 0 ? step.value-- : step.value
    const nextStep = () => step.value < 3 ? step.value++ : step.value

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

            capitalize(productInfo.name)
            prevButtonContent.value = '<-- Retroceder a "Formulario Producto"'
            nextButtonContent.value = 'Añadir producto a tabla -->'
        }

        if (step.value === 3) {
            // añadir a la tabla
            generateUniqueNameProduct()
            emit('addProduct', {imageData: productImageData.value, ...productInfo})
            reset()
        }
    })
</script>

<style lang="scss" scoped>

    @mixin config-text-dialog-button($color) {
        color: $color;
        font-weight: bold;
        font-size: 1.8rem;
    }
    .add-product {
        display: flex;
        flex-direction: column;
        .add-product__button-take-photo {
            @include config-text-dialog-button(antiquewhite);
            border-radius: 0 0 25px 25px;
            border: none;
            background-color: #9e7e2d;
            padding: 10px;
            max-width: 320px;
            margin-bottom: 20px;
        }
        .add-product__box-arrow-buttons {
            border-radius: 25px;
            display: flex;
            flex-direction: row;
            contain: content;
            height: 40px;
            button {
                @include config-text-dialog-button(#e0f2ff);
                display: flex;
                flex-grow: 1;
                height: 100%;
                border: none;
                background-color: steelblue;
                text-align: center;
                justify-content: center;
                align-items: center;
            }
        }
    }
</style>