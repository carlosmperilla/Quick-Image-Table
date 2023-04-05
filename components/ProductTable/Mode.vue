<template>
    <section 
        class="mode-selection"
        :class="{
            'mode-selection--edit': isEditMode,
            'mode-selection--delete': isDeleteMode,
        }"
    >
        <section 
            class="mode-selection__selection-panel">
            <span>Modo: </span>
            <select 
                :value="currentMode"
                @input="$emit('update:currentMode', $event.target.value)"
            >
                <option :value="tableModes.view">Visualización</option>
                <option :value="tableModes.edit">Edición</option>
                <option :value="tableModes.delete">Eliminación</option>
            </select>
        </section>
        <section class="mode-selection__button-panel" v-show="!isViewMode">
            <button 
                class="mode-selection__box-buttons--edit" 
                v-if="isEditMode" 
                @click="finishEditMode"
            >
                <ClientOnly>
                    <font-awesome-icon :icon="['fas', 'circle-check']" />
                </ClientOnly>
                 Terminar edición
            </button>
            <button 
                class="mode-selection__box-buttons--delete" 
                v-if="isDeleteMode" 
                @click="removeSomeProducts"
            >
                Eliminar {{ checkedProducts.length }} productos
            </button>
            <button 
                class="mode-selection__box-buttons--delete" 
                v-if="isDeleteMode" 
                @click="removeAllProducts"
            >
                <ClientOnly>
                    <font-awesome-icon :icon="['fas', 'dumpster-fire']" />
                </ClientOnly>
                 ¡Eliminar Tabla!
            </button>
        </section>
    </section>
</template>

<script setup>
    import { useNotification } from "@kyvg/vue3-notification";
    const { notify}  = useNotification()

    const props = defineProps({
        currentMode: {
            type: String,
            required: true
        },
        tableModes: {
            type: Object,
            required: true
        },
        checkedProducts: {
            type: Array,
            required: true
        }
    })

    const emit = defineEmits(['update:currentMode', 'preRemovalProducts', 'preCleanProducts'])
    
    const isViewMode = computed(() => props.currentMode === props.tableModes.view)
    const isEditMode = computed(() => props.currentMode === props.tableModes.edit)
    const isDeleteMode = computed(() => props.currentMode === props.tableModes.delete)

    function finishEditMode(){
        try {
            emit('update:currentMode', props.tableModes.view)
            notify({
                type: "success",
                text: "¡Edición realizada correctamente!",
                duration: 500,
            });
        } catch (error) {
            console.log(error)
        }
    }

    function removeSomeProducts() {
        try {
            emit('preRemovalProducts')
            notify({
                type: "error",
                text: "¡Productos eliminados correctamente!",
                duration: 500,
            });
        } catch (error) {
            console.log(error)
        }
    }

    function removeAllProducts() {
        try {
            emit('preCleanProducts')
            notify({
                type: "error",
                text: "¡Tabla eliminada correctamente!",
                duration: 500,
            });
        } catch (error) {
            console.log(error)
        }
    }
</script>

<style lang="scss" scoped>
    @use '@/assets/styles/sass/components/product-table-mode';
</style>