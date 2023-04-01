<template>
    <div class="layout-default">
        <header>
            <NavMenu />
        </header>
        <slot/>
    </div>
</template>

<style lang="scss">
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        font-size: 62.5%
    }
</style>