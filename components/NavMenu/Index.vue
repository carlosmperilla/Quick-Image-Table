<template>
    <nav class="principal-nav">
        <img src="~/assets/img/QuickImageTable_logo_min.jpg" alt="QuickImageTable Logo" @click="toHome" height="43px"/>
        <div class="principal-nav__burger-menu-container">
            <button alt="Mostrar menu" title="Mostrar menu" class="principal-nav__burger-menu-container--button" @click="toggleMenu">
                <ClientOnly fallback-tag="span" fallback="Menu...">
                    <font-awesome-icon :icon="['fas', burgerMenuIcon]" />
                </ClientOnly>
            </button>
        </div>
        <menu :class="{ 'principal-nav__menu--active': isMenuOpen  }">
            <li v-for="(menuLink, index) in menuLinkList" :key="index" @click="toggleMenu">
                <NuxtLink :to="menuLink.route">
                    <ClientOnly><font-awesome-icon :icon="menuLink.icon"/></ClientOnly> {{ menuLink.text }}
                </NuxtLink>
            </li>
        </menu>
    </nav>
</template>

<script setup>
    const router = useRouter()

    const isMenuOpen = ref(false)
    const menuLinkList = reactive([
        {
            text: 'Inicio',
            route: '/',
            icon: ['fas', 'house']
        },
        {
            text: '¿Cómo usar?',
            route: '/howtouse',
            icon: ['fab', 'readme']
        },
        {
            text: 'Acerca de QuickImageTable',
            route: '/about',
            icon: ['fas', 'info-circle']
        },
        {
            text: 'Mi contacto',
            route: '/contact',
            icon: ['fas', 'comments']
        },
    ])

    const burgerMenuIcon = computed(() => isMenuOpen.value ? 'bars-staggered' : 'bars')

    function toggleMenu(){
        isMenuOpen.value = !isMenuOpen.value
    }

    function toHome(){
        isMenuOpen.value = false
        router.push('/')
    }
</script>

<style lang="scss" scoped>
    @use '@/assets/styles/sass/layout/navigation';
</style>