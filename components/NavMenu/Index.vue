<template>
    <nav class="principal-nav">
        <img src="~/assets/img/QuickImageTable_logo_min.jpg" alt="QuickImageTable Logo" @click="toHome"/>
        <div class="principal-nav__burger-menu-container">
            <button class="principal-nav__burger-menu-container--button" @click="toggleMenu">
                <font-awesome-icon :icon="['fas', burgerMenuIcon]" />
            </button>
        </div>
        <menu :class="{ 'principal-nav__menu--active': isMenuOpen  }">
            <li v-for="n in menuLinkList">
                <NuxtLink :to="n.route">{{n.text}}</NuxtLink>
            </li>
            <li @click="toggleMenu">
                <NuxtLink to="/"><font-awesome-icon :icon="['fas', 'house']" /> Inicio</NuxtLink>
            </li>
            <li @click="toggleMenu">
                <NuxtLink to="/howtouse"><font-awesome-icon :icon="['fab', 'readme']" /> ¿Cómo usar?</NuxtLink>
            </li>
            <li @click="toggleMenu">
                <NuxtLink to="/about"><font-awesome-icon :icon="['fas', 'info-circle']" /> Acerca de QuickImageTable</NuxtLink>
            </li>
            <li @click="toggleMenu">
                <NuxtLink to="/contact"><font-awesome-icon :icon="['fas', 'comments']" /> Mi contacto</NuxtLink>
            </li>
        </menu>
    </nav>
</template>

<script setup>
    const router = useRouter()
    const isMenuOpen = ref(false)
    const menuLinkList = reactive([
        {
            text: ' Inicio',
            route: '/',
            icon: ['fas', 'house']
        }
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

    nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 43px;

        .principal-nav__burger-menu-container {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            background-color: #0e5161;
            .principal-nav__burger-menu-container--button {
                border: none;
                background: none;
                aspect-ratio: 1/1;
                height: 90%;
                border-radius: 50%;
                background-color: #0e5161;
                color: whitesmoke;
                &:active {
                    background-color: #0b424f;
                    color: white;
                }
                .fa-bars,
                .fa-bars-staggered {
                    height: 60%;
                }
            }
        }
        menu {
            // display: inline-flex;
            display: none;
            list-style: none;

            .fa-house {
                vertical-align: baseline;
            }
        }
        .principal-nav__menu--active {
            display: flex;
            background: antiquewhite;
            position: fixed;
            padding: 10px variables.$thumb-space;
            top: 43px;
            bottom: 0;
            left: 0;
            right: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 50px;
            padding-top: 100px;
            font-size: 4.2rem;
            z-index: 2;
            li {
                text-align: center;
                background: #eac786;
                padding: 0;
                width: 100%;
                a {
                    display: block;
                    width: 100%;
                    height: 100%;
                    padding: 5px 10px;
                    text-decoration: none;
                    color: #30434f;
                }
            }
        }
    }
</style>