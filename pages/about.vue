<template>
    <article>
        <header>
            <h1>Acerca de QuickImageTable</h1>
            <p>
                QuickImageTable es una herramienta para generar tablas de productos apoyadas con imágenes.
            </p>
        </header>
        <section>
            <p>
                Su finalidad es generar tablas a partir de fotografías, nombre, precio y cantidad. Debido a que estos son los requisitos mínimos para identificar un producto nuevo.
            </p>
            <p>
                Para conservar las tablas, se pueden exportar en:
                <ul>
                    <li>
                        <strong>Formato PDF: </strong> Se conserva su estilo, estructura, datos por producto (imagen, nombre, precio, cantidad), costo total y nombre de tabla.
                    </li>
                    <li>
                        <strong>Archivo comprimido ZIP: </strong>Se compone de las imágenes, cada una de ellas contiene los datos de cada producto, para que pueda ser identificado con facilidad.
                    </li>
                </ul>
            </p>
        </section>
        <section>
            <h2>¿Para qué es útil QuickImageTable?</h2>
            <ul>
                <li>
                    Crear tablas de productos de compra/venta, con apoyo visual.
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
                    Creación de tablas de productos con nombres únicos (si se repite un nombre, automáticamente lo readapta en su ingreso).
                </li>
            </ul>
        </section>
        <section>
            <h2>¿Para qué NO es útil QuickImageTable?</h2>
            <p>
                La mayoría de estas características no están incluidas porque reducen la velocidad de creación de la tabla.
            </p>
            <ul>
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
                    Tablas complejas con campos diferentes a los que se encuentran por defecto. Lo mejor sería exportar a PDF la tabla e importarla a otra aplicación web.
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