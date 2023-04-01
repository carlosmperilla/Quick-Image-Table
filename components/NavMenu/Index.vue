<template>
    <nav class="principal-nav">
        <img src="~/assets/img/QuickImageTable_logo_min.jpg" alt="QuickImageTable Logo" @click="toHome"/>
        <div class="principal-nav__burger-menu-container">
            <button class="principal-nav__burger-menu-container--button" @click="toggleMenu">
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
    @use '@/assets/styles/sass/abstracts/variables';
    @use '@/assets/styles/sass/abstracts/mixins';

    nav {
        @include mixins.center-flexbox;
        justify-content: space-between;
        height: variables.$nav-height;
        
        .principal-nav__burger-menu-container {
            @include mixins.center-flexbox;
            @include mixins.expand-box-max;
            background-color: variables.$header-bg-color;
            .principal-nav__burger-menu-container--button {
                border: none;
                aspect-ratio: 1/1;
                height: 90%;
                border-radius: 50%;
                background-color: variables.$header-bg-color;
                color: variables.$header-color;
                &:active {
                    background-color: variables.$header-bg-color--active;
                    color: variables.$header-color--active;
                }
                .fa-bars,
                .fa-bars-staggered {
                    height: variables.$icon-height;
                }
            }
        }
        menu {
            display: none;
            list-style: none;

            .fa-house,
            .fa-info-circle,
            .fa-comments {
                vertical-align: baseline;
            }
        }
        .principal-nav__menu--active {
            @include mixins.center-flexbox;
            @include mixins.fixed-extend-banner;
            top: variables.$nav-height;
            flex-direction: column;
            justify-content: flex-start;
            background-color: variables.$menu-bg-color;
            padding: 10px variables.$thumb-space;
            padding-top: 100px;
            gap: 50px;
            font-size: 4.2rem;
            li {
                background: variables.$menu-li-bg-color;
                width: 100%;
                padding: 0;
                text-align: center;
                a {
                    @include mixins.expand-box-max;
                    display: block;
                    padding: 5px 10px;
                    text-decoration: none;
                    color: variables.$menu-li-color;
                }
            }
        }
    }
</style>