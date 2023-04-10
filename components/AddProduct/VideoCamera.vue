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
            canvas.getContext('2d').drawImage(video.value, 0, 0, width.value, height.value);
            let data = canvas.toDataURL('image/jpeg');
            emit('getImageData', data)
        } else if (streaming.value) {
            video.value.play()
        }
    })

    onMounted(async () => {
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
              alert(navigator.userAgent)
              alert(navigator.userAgentData)
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
</style>