<template>
    <div class="decoration" v-show="loadingVideo" :style="{'background-color': 'grey', width: width + 'px', height: width+'px' }"></div>
    <video id="video" ref="video" @canplay="resizingDefaultVideo" :width="width" :height="height" v-show="!hasPicture"></video>
</template>

<script setup>
    const props = defineProps({
        hasPicture: Boolean,
    })
    const emit = defineEmits(['getImageData'])
    
    const streaming = ref(false)
    const width = ref(320)
    const height = ref(0)
    const loadingVideo = ref(false)
    
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

        loadingVideo.value = true
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
              console.log('hola')
              loadingVideo.value = false
            },
            (err) => {
              console.log("An error occured! " + err);
            }
          )
          console.log('chao')
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
</style>