<template>
    <nav class="principal-nav">
        <img src="~/assets/img/QuickImageTable_logo_min.jpg" alt="QuickImageTable Logo" @click="toHome"/>
        <div class="principal-nav__burger-menu-container">
            <button class="principal-nav__burger-menu-container--button" @click="toggleMenu">
                <font-awesome-icon :icon="['fas', burgerMenuIcon]" />
            </button>
        </div>
        <menu :class="{ 'principal-nav__menu--active': isMenuOpen  }">
            <li v-for="(menuLink, index) in menuLinkList" :key="index" @click="toggleMenu">
                <NuxtLink :to="menuLink.route"><font-awesome-icon :icon="menuLink.icon" /> {{ menuLink.text }}</NuxtLink>
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

    $header-bg-color: #0e5161;
    $header-bg-color--active: #0b424f;
    $menu-bg-color: antiquewhite;
    $menu-li-bg-color: #eac786;
    
    $header-color: whitesmoke;
    $header-color--active: white;
    $menu-li-color: #30434f;
    
    $nav-height: 43px;
    $icon-height: 60%;

    @mixin center-flexbox {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    @mixin fixed-extend-banner {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 2;
    }

    @mixin expand-box-max {
        width: 100%;
        height: 100%;
        padding: 0;
    }

    nav {
        @include center-flexbox;
        justify-content: space-between;
        height: $nav-height;
        
        .principal-nav__burger-menu-container {
            @include center-flexbox;
            @include expand-box-max;
            background-color: $header-bg-color;
            .principal-nav__burger-menu-container--button {
                border: none;
                // background: none;
                aspect-ratio: 1/1;
                height: 90%;
                border-radius: 50%;
                background-color: $header-bg-color;
                color: $header-color;
                &:active {
                    background-color: $header-bg-color--active;
                    color: $header-color--active;
                }
                .fa-bars,
                .fa-bars-staggered {
                    height: $icon-height;
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
            @include center-flexbox;
            @include fixed-extend-banner;
            top: $nav-height;
            flex-direction: column;
            background-color: $menu-bg-color;
            padding: 10px variables.$thumb-space;
            padding-top: 100px;
            gap: 50px;
            font-size: 4.2rem;
            li {
                background: $menu-li-bg-color;
                width: 100%;
                padding: 0;
                text-align: center;
                a {
                    @include expand-box-max;
                    display: block;
                    padding: 5px 10px;
                    text-decoration: none;
                    color: $menu-li-color;
                }
            }
        }
    }
</style>