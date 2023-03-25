<template>
    <video id="video" ref="video" @canplay="resizingDefaultVideo" :width="width" :height="height"></video>
</template>

<script setup>

    const streaming = ref(false)
    const video = ref(null)
    const width = ref(320)
    const height = ref(0)

    const props = defineProps({
        hasPicture: Boolean,
    })

    const emit = defineEmits(['getImageData'])

    onMounted(() => {
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

    
    function resizingDefaultVideo() {
        if (!streaming.value) {
            height.value = video.value.videoHeight / (video.value.videoWidth/width.value);
            streaming.value = true;
        }
    }
    
    watchEffect(() => {
        if (props.hasPicture){
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
    
</script>