# Quick Image Table

<section>
    <details>
        <summary>¿Cómo empezar?</summary>
        <ul>
            <li>
                Da clic en + para <strong>Añadir producto</strong>.
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



# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
