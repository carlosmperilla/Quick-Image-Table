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

    onMounted(() => {
        navigator.getMedia = ( navigator.getUserMedia ||
                               navigator.webkitGetUserMedia ||
                               navigator.mozGetUserMedia )

        navigator.getMedia(
            {
              video: true,
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


    function resizingDefaultVideo() {
        if (!streaming.value) {
            height.value = video.value.videoHeight / (video.value.videoWidth/width.value);
            streaming.value = true;
        }
    }

    watchEffect(() => {
        if (props.hasPicture){
            video.value.pause()
        } else if (streaming.value) {
            video.value.play()
        }
    })
    
</script>