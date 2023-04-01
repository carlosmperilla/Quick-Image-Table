<template>
    <nav>
        <img src="~/assets/img/QuickImageTable_logo_min.jpg" alt="QuickImageTable Logo" />
        <menu>
            <li><NuxtLink to="/"><font-awesome-icon :icon="['fas', 'house']" /> Inicio</NuxtLink></li>
            <li><NuxtLink to="/howtouse">¿Cómo usar?</NuxtLink></li>
            <li><NuxtLink to="/about">Acerca de QuickImageTable</NuxtLink></li>
            <li><NuxtLink to="/contact">Mi contacto</NuxtLink></li>
        </menu>
    </nav>
</template>

<style lang="scss" scoped>
    nav {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        menu {
            display: inline-flex;
            list-style: none;
        }   
    }
</style>