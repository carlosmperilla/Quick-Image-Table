<template>
    <div>
        <ClientOnly>
            <div class="video--fallback" v-show="!streaming && !hasPicture" :style="{ width: width + 'px' }">
                <font-awesome-icon :icon="['fas', 'spinner']" spin-pulse />
            </div>
        </ClientOnly>
        <video id="video" ref="video" @canplay="resizingDefaultVideo" :width="width" :height="height" v-show="!hasPicture"></video>
    </div>
</template>

<script setup>
    const props = defineProps({
        hasPicture: Boolean,
    })
    const emit = defineEmits(['getImageData'])
    
    const streaming = ref(false)
    const width = ref(320)
    const height = ref(0)
    
    const video = ref(null)
    const isFirefoxMobile = ref(false)
    
    function resizingDefaultVideo() {
        if (!streaming.value) {
            height.value = video.value.videoHeight / (video.value.videoWidth/width.value);
            streaming.value = true;
        }
    }

    // Compatibilidad con Firefox Mobile - Inicio
    function OrientPlayback(){
        if (screen.orientation.angle === 90){
            video.value.classList.remove('rotate-ninety-plus')
            video.value.classList.add('rotate-ninety-minus')
        } else if (screen.orientation.angle === 270){
            video.value.classList.remove('rotate-ninety-minus')
            video.value.classList.add('rotate-ninety-plus')
        } else {
            video.value.classList.remove('rotate-ninety-minus')
            video.value.classList.remove('rotate-ninety-plus')
        }  
    }

    function addStyleForFirefoxMobile(){
        if (/(Firefox.*Android)|(Android.*Firefox)/.test(navigator.userAgent)){
            isFirefoxMobile.value = true
            OrientPlayback()
            if (screen.orientation.onchange?.name !== 'firefoxMobileRotate'){
                screen.orientation.onchange = function firefoxMobileRotate() {
                    OrientPlayback()
                }
            }
        }
    }

    function rotateForLandscapeAngle(canvas, context){
        canvas.width = height.value
        canvas.height = width.value
        context.translate (
            screen.orientation.angle === 270 ? height.value : 0, 
            screen.orientation.angle === 90 ? width.value : 0
        )
        context.rotate((Math.PI / 180) * -screen.orientation.angle)
    }
    // Compatibilidad con Firefox Mobile - Final

    watch(() => props.hasPicture, (value, prevValue) => {
        if (value){
            let canvas = document.createElement('canvas')

            canvas.setAttribute('height', height.value);
            canvas.setAttribute('width', width.value);
            
            video.value.pause()
            
            let context = canvas.getContext('2d')
            if (isFirefoxMobile.value && screen.orientation.angle !== 0) {
                rotateForLandscapeAngle(canvas, context)
            }
            context.drawImage(video.value, 0, 0, width.value, height.value)
            
            let data = canvas.toDataURL('image/jpeg');
            emit('getImageData', data)
        } else if (streaming.value) {
            video.value.play()
        }
    })

    onMounted(async () => {
        // Compatiblidad con Firefox Mobile
        addStyleForFirefoxMobile()

        // Compatiblidad con Firefox Mobile
        navigator.getMedia = ( navigator.getUserMedia ||
                               navigator.webkitGetUserMedia ||
                               navigator.mozGetUserMedia )

        // Open and record video
        navigator.getMedia(
            {
              video: {
                facingMode: 'environment' // Fuerza la camara trasera o principal para celulares.
            },
              audio: false
            },
            (stream) => {
              video.value.srcObject=stream;
              video.value.play();
            },
            (err) => {
              console.log("An error occured! " + err);
            }
          )
    })
    
    onBeforeUnmount(() => {
        // Close Video-Camera
        video.value.srcObject.getTracks()[0].stop()
    })    
</script>

<style lang="scss" scoped>
    video {
        display: block;

        // Compatilidad con Firefox Mobile.
        &.rotate-ninety-minus {
            -moz-transform-origin: center;
            -moz-transform: rotate(-90deg) scale(.5);
        }
        &.rotate-ninety-plus {
            -moz-transform-origin: center;
            -moz-transform: rotate(90deg) scale(.5);
        }
    }

    .video--fallback {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: lightgrey;
        aspect-ratio: 1/1;
        color: white;
        font-size: 6rem;
    }

</style>