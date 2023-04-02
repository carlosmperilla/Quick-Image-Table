<template>
    <div class="layout-default">
        <header>
            <NavMenu />
        </header>
        <slot/>
        <button @click="scrollToUp" class="button--scroll-to-up" :class="{'button--scroll-to-up--active': buttonToUpIsVisible}">
            <ClientOnly>
                <font-awesome-icon :icon="['fas', 'hand-point-up']" />
            </ClientOnly>
        </button>
        <footer class="bottom-element" ref="bottomElement"></footer>
    </div>
</template>

<script setup>
    const buttonToUpIsVisible = ref(false)
    const bottomElement = ref(null)

    function hasScrollHeight() {
        let rootElement = document.documentElement
        return rootElement.scrollHeight > rootElement.clientHeight
    }

    function callbackIntersection(entries, observer) {
        entries.forEach((entry) => {
            if (entry.isIntersecting && hasScrollHeight()) {
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
        let rootElement = document.documentElement
        let observer = new IntersectionObserver(callbackIntersection)
        let resizeObserver = new ResizeObserver(entries => {
            if (!hasScrollHeight()) buttonToUpIsVisible.value = false
        })
        
        observer.observe(bottomElement.value)
        resizeObserver.observe(rootElement)
    })
</script>

<style lang="scss">
    @use '@/assets/styles/sass/core/reset';
    @use '@/assets/styles/sass/layout';
</style>