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

    watch(() => props.hasPicture, (value, prevValue) => {
        if (value){
            let canvas = document.createElement('canvas')

            canvas.setAttribute('height', height.value);
            canvas.setAttribute('width', width.value);
            
            video.value.pause()
            if (isFirefoxMobile.value) {
                let context = canvas.getContext('2d')
                context.rotate((Math.PI / 180) * -screen.orientation.angle)
                context.drawImage(video.value, 0, 0, width.value, height.value);
            } else {
                canvas.getContext('2d').drawImage(video.value, 0, 0, width.value, height.value);
            }
            let data = canvas.toDataURL('image/jpeg');
            emit('getImageData', data)
        } else if (streaming.value) {
            video.value.play()
        }
    })

    function OrientPlayback(){
        if (screen.orientation.angle === 90){
            video.value.classList.remove('video-giro-segundo')
            video.value.classList.add('video-giro-noventa')
        } else if (screen.orientation.angle === 270){
            video.value.classList.remove('video-giro-noventa')
            video.value.classList.add('video-giro-segundo')
        } else {
            video.value.classList.remove('video-giro-noventa')
            video.value.classList.remove('video-giro-segundo')
        }  
    }

    onMounted(async () => {
        if (/(Firefox.*Android)|(Android.*Firefox)/.test(navigator.userAgent)){
            // alert(navigator.userAgent)
            // alert(screen.orientation.type)
            // alert(screen.orientation.angle)
            // if (screen.orientation.angle === 90){
            //     // video.value.style.transform = "rotate(-90)"
            //     video.value.classList.remove('video-giro-segundo')
            //     video.value.classList.add('video-giro-noventa')
            // } else if (screen.orientation.angle === 270){
            //     // video.value.style.transform = "rotate(-2700)"
            //     video.value.classList.remove('video-giro-noventa')
            //     video.value.classList.add('video-giro-segundo')
            // } else {
            //     video.value.classList.remove('video-giro-noventa')
            //     video.value.classList.remove('video-giro-segundo')
            // }
            // alert(screen.orientation)
            isFirefoxMobile.value = true
            OrientPlayback()
            if (screen.orientation.onchange?.name !== 'firefoxMobileRotate'){
                screen.orientation.onchange = function firefoxMobileRotate() {
                    OrientPlayback()
                }
            }

        }
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

<style scoped>
    video {
        display: block;
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

    .video-giro-noventa {
        -moz-transform-origin: center;
        -moz-transform: rotate(-90deg) scale(.5);
    }

    .video-giro-segundo {
        -moz-transform-origin: center;
        -moz-transform: rotate(-270deg) scale(.5);
    }

    @media screen and (max-width: 600px) and (orientation: landscape) {
        /* .add-product img, 
        video {
            -moz-transform: rotate(-90%);
            -moz-transform-origin: bottom left;
        } */

        /* video {
            -moz-transform: rotate(-90%);
            -moz-transform-origin: bottom left;
        } */
    }
</style>