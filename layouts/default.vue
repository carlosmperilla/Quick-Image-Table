<template>
    <div class="layout-default" ref="defaultLayout" :class="{'block-layout': isMenuOpen}">
        <a class="skip-to-content-link" href="#main">
            ¡Saltar al contenido!
        </a>
        <header ref="headerNav">
            <NavMenu />
        </header>
        <main id="main">
            <slot/>
        </main>
        <button 
            alt="Botón de 'Subir hacia arriba de la página'"
            title="Subir al inicio de la página"
            @click="scrollToUp" 
            class="button--scroll-to-up" 
            :class="{
                    'button--scroll-to-up--active': buttonToUpIsVisible
                    }"
        >
            <ClientOnly>
                <font-awesome-icon :icon="['fas', 'hand-point-up']" />
            </ClientOnly>
        </button>
    </div>
</template>

<script setup>
    const isMenuOpen = useState('isMenuOpen')

    const buttonToUpIsVisible = ref(false)
    const headerNav = ref(null)
    const defaultLayout = ref(null)

    function callbackIntersection(entries, observer) {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                buttonToUpIsVisible.value = true
                return null
            }
            buttonToUpIsVisible.value = false
        })
    }
    
    function scrollToUp(){
        let rootElement = document.documentElement
        rootElement.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    onMounted(() => {
        let observer = new IntersectionObserver(callbackIntersection)
        observer.observe(headerNav.value)
    })
</script>

<style lang="scss">
    @use '@/assets/styles/sass/core/reset';
    @use '@/assets/styles/sass/layout';

    .block-layout {
        height: 50vh;
        overflow: hidden;
        user-select: none;
    }
</style>