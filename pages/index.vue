<template>
    <button @click="showDialog">Mostrar</button>
    <dialog ref="dialog">
        <button @click="closeDialog">Ocultar</button>
        <AddProduct />
    </dialog>
</template>

<script setup>
    const dialog = ref(null)

    function showDialog(){
        dialog.value.showModal()
    }

    function closeDialog(){
        dialog.value.close()
    }
</script>