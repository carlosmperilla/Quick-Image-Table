<template>
    <div class="layout-default">
        <header>
            <nav>
                <menu>
                    <li><NuxtLink to="/">Inicio</NuxtLink></li>
                    <li><NuxtLink to="/howtouse">¿Cómo usar?</NuxtLink></li>
                    <li><NuxtLink to="/about">Acerca de QuickImageTable</NuxtLink></li>
                    <li><NuxtLink to="/contact">Mi contacto</NuxtLink></li>
                </menu>
            </nav>
        </header>
        <slot/>
    </div>
</template>