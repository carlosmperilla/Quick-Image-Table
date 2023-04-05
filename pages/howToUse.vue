<template>
    <article class="page">
        <header>
            <h1>QuickImageTable: Instrucciones de uso</h1>
        </header>
        <section>
            <details>
                <summary>¿Cómo empezar?</summary>
                <ul>
                    <li>
                        Da clic en <ClientOnly><font-awesome-icon :icon="['fas', 'circle-plus']" /></ClientOnly>
                        para <strong>Añadir producto</strong>.
                    </li>
                    <li>
                        Permite el acceso a la cámara, para poder tomar fotos de los productos desde la página web.
                    </li>
                    <li>
                        A continuación, sigue los pasos para ingresar el producto. Puedes modificar los datos, incluyendo la fotografía, en caso de ser necesario. Recuerda que el nombre tiene un <em>límite de 50 caracteres</em> como máximo.
                    </li>
                    <li>
                        Asegúrate de tomar la foto correcta, después de <strong>Añadir producto</strong>, no podrás volver a editar la imagen.
                    </li>
                </ul>
            </details>
            <details>
                <summary>¿Puedo cambiar el nombre de la tabla?</summary>
                <p>
                    El nombre por defecto es <em>MyQuickTable</em>, si haces clic en él, puedes modificarlo al que más te convenga. Tiene un <em>límite de 20 caracteres</em> como máximo.
                </p>
            </details>
            <details>
                <summary>Ya he ingresado un producto ¿Cómo lo edito?</summary>
                <ul>
                    <li>
                        Vas a Modo y eliges <strong>Edición</strong>.
                    </li>
                    <li>
                        Recuerda que solo puedes editar <em>Nombre, Precio y Cantidad</em>. No se puede cambiar de imagen por producto.
                    </li>
                    <li>
                        La edición es automática, el botón de <strong>Terminar edición</strong> solo te cambia del modo <em>Editar</em>> al modo <em>Visualización</em>.
                    </li>
                </ul>
            </details>
            <details>
                <summary>¿Cómo elimino un producto?</summary>
                <ul>
                    <li>
                        Vas a Modo y eliges <strong>Eliminación</strong>.
                    </li>
                    <li>
                        Seleccionas todos los productos a eliminar.
                    </li>
                    <li>
                        Cliqueas en <strong>Eliminar X productos</strong>.
                    </li>
                </ul>
            </details>
            <details>
                <summary>¿Cómo elimino la tabla de productos?</summary>
                <ul>
                    <li>
                        Vas a Modo y eliges <strong>Eliminación</strong>.
                    </li>
                    <li>
                        Cliqueas en <strong>¡Eliminar Tabla!</strong>.
                    </li>
                </ul>
            </details>
            <details>
                <summary>¿Cómo puedo exportar la tabla?</summary>
                <ul>
                    <li>
                        En el apartado de <strong>Exportar tabla</strong>, selecciona el formato de exportación de preferencia (PDF o ZIP).
                    </li>
                    <li>
                        El archivo ZIP contiene las imágenes, cada una, con su nombre, precio y cantidad.
                    </li>
                    <li>
                        El <strong>Costo total</strong> no se conserva en el formato ZIP, sí lo hace en el PDF.
                    </li>
                </ul>
            </details>
            <details>
                <summary>Otras funciones</summary>
                <ul>
                    <li>
                        <ClientOnly><font-awesome-icon :icon="['fas', 'hand-point-up']" /></ClientOnly>
                         al darle clic subes al tope de la página.
                    </li>
                    <li>
                        <ClientOnly><font-awesome-icon :icon="['fas', 'table-cells']" /></ClientOnly>
                        <strong> Modo normal</strong> de tabla.
                    </li>
                    <li>
                        <ClientOnly><font-awesome-icon :icon="['fas', 'panorama']" /></ClientOnly>
                        <strong> Modo tarjetas</strong> de tabla. De arriba a abajo la información corresponde a <em>Image, Nombre, Precio y Cantidad.</em>
                    </li>
                </ul>
            </details>
        </section>
        <footer class="page-limitations">
            <details>
                <summary>Limitaciones de QuickImageTable</summary>
                <ul>
                    <li>
                        Cada tabla puede tener como <strong>máximo alrededor de 90-100 productos</strong>. QuickImageTable prioriza su uso, sin necesidad de internet para tablas pequeñas. Esto se debe a que el almacenamiento de productos se da localmente, no en un servidor.
                    </li>
                    <li>
                        El nombre de cada producto está <strong>limitado a 50 caracteres</strong>.
                    </li>
                    <li>
                        El nombre de la tabla está <strong>limitado a 20 caracteres</strong>.
                    </li>
                    <li>
                        La calidad de la imagen por producto es estándar. Se prioriza la información y la rapidez, sobre la "Estética" y el contenido "Especifico".
                    </li>
                    <li>
                        No se puede adaptar el diseño de PDF exportado, ni de los datos por imágenes en el ZIP.
                    </li>
                </ul>
            </details>
        </footer>
    </article>
</template>

<script setup>
    useHead({
        title: 'QuickImageTable - ¿Cómo usar?',
        meta: [
            { name: 'description', content: 'Cómo usar QuickImageTable, instrucciones.' }
        ],
    })
</script>