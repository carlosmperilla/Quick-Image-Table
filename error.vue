<template>
    <section v-if="error.statusCode === 404">
        <ClientOnly>
            <div class="error-icon">
                <font-awesome-icon :icon="['fas', 'robot']" />
            </div>
            <p><strong>Error 404:</strong> Pagina no encontrada.</p>
            <button @click="handleError">
                    <font-awesome-icon :icon="['fas', 'house']"/>
                Volver al Inicio
            </button>
        </ClientOnly>
    </section>
    <section v-if="error.statusCode === 500">
        <ClientOnly>
            <div class="error-icon">
                <font-awesome-icon :icon="['fas', 'robot']" />
            </div>
            <p><strong>Error 500:</strong> Error en el servidor. <br>Se arreglara tan pronto como sea posible.</p>
        </ClientOnly>
    </section>
</template>
  
<script setup>
    // https://nuxt.com/docs/getting-started/error-handling
    const props = defineProps({
        error: Object
    })

    const handleError = () => clearError({ redirect: '/' })
</script>

<style lang="scss" scoped>
    section {
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 30px;
        font-size: 4.3rem;
        .error-icon {
            font-size: 2em;
            color: steelblue;
        }
        p {
            max-width: 80%;
            text-align: center;
            font-size: 1em;
            color: #3d3c33;
            strong {
                color: rgb(180, 70, 70);
            }
        }
        button {
            border: none;
            border-radius: 15px;
            font-size: 0.8em;
            background-color: steelblue;
            color: white;
            padding: 4px 12px;
        }
    }
</style>
