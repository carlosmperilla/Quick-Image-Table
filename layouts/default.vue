<template>
    <div class="layout-default">
        <header ref="headerNav">
            <NavMenu />
        </header>
        <slot/>
        <button 
            alt="Botón de 'Subir hacia arriba de la página'"
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
    const buttonToUpIsVisible = ref(false)
    const headerNav = ref(null)

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
</style>