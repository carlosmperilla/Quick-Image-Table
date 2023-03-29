<template>
    <article>
        <header>
            <h1>Acerca de QuickImageTable</h1>
            <p>
                QuickImageTable es un generador rápido de tablas de productos apoyadas con imágenes.
            </p>
        </header>
        <section>
            <p>
                Su propósito es generar tablas a partir de fotografías, nombre, precio y cantidad. Por ser estos los requisitos mínimos para identificar un producto nuevo.
            </p>
            <p>
                Para conservar las tablas, estas deben exportarse en:
                <ul>
                    <li>
                        <strong>Formato PDF: </strong>Conservan su estilo, estructura, datos por producto (imagen, nombre, precio, cantidad), su costo total y su nombre de tabla.
                    </li>
                    <li>
                        <strong>Archivo comprimido ZIP: </strong>Contiene las imágenes, cada imagen posee los datos de cada producto, para su fácil identificación.
                    </li>
                </ul>
            </p>
        </section>
        <section>
            <h2>¿Para qué es útil QuickImageTable?</h2>
            <ul>
                <li>
                    Generar tablas de productos de compra/venta, con apoyo visual.
                </li>
                <li>
                    Conservar imágenes con información condensada, sin edición visual.
                </li>
                <li>
                    Revisar costos de compra en tiempo real.
                </li>
                <li>
                    Obtención de tablas e imágenes de productos nuevos en tiempos mínimos.
                </li>
                <li>
                    Generación de tablas de productos con nombres únicos (si se repite un nombre, automáticamente lo readapta en su ingreso).
                </li>
            </ul>
        </section>
        <section>
            <h2>¿Para qué NO es útil QuickImageTable?</h2>
            <ul>
                <li>
                    La mayor parte de estas características no están incluidas porque reducen la velocidad de creación de la tabla.
                </li>
                <li>
                    Generar tablas a partir de un archivo (PDF, CSV, Excel, etcétera).
                </li>
                <li>
                    Varias imágenes por producto.
                </li>
                <li>
                    Edición avanzada para múltiples productos.
                </li>
                <li>
                    Filtrado de productos.
                </li>
                <li>
                    Tablas complejas con campos distintos a los que están por defecto. Lo mejor sería exportar a PDF la tabla e importarla a otra aplicación web.
                </li>
            </ul>
        </section>
    </article>
</template>

<script setup>
    useHead({
        title: 'QuickImageTable - Acerca de',
        meta: [
            { name: 'description', content: 'Sobre el desarrollo y objetivos de QuickImageTable.' }
        ],
    })
</script>