# Quick Image Table
QuickImageTable es una herramienta para generar tablas de productos apoyadas con imágenes.
Su finalidad es generar tablas a partir de fotografías, nombre, precio y cantidad. Debido a que estos son los requisitos mínimos para identificar un producto nuevo.

Para conservar las tablas, se pueden exportar en:
* **Formato PDF:** Se conserva su estilo, estructura, datos por producto (imagen, nombre, precio, cantidad), costo total y nombre de tabla.
* **Archivo comprimido ZIP:** Se compone de las imágenes, cada una de ellas contiene los datos de cada producto, para que pueda ser identificado con facilidad.

## Deploy URL
https://quickimagetable.netlify.app/

## Dependencies
* npm 9.6.0

## Local Use - Nuxt 3 Minimal Starter
Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

### Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

### Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

### Production

Build the application for production:

```bash
npm run build
```

### Generate Static Files

Generate static files:

```bash
npm run generate
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## About QuickImageTable
### ¿Para qué es útil QuickImageTable?
* Crear tablas de productos de compra/venta, con apoyo visual.
* Conservar imágenes con información condensada, sin edición visual.
* Revisar costos de compra en tiempo real.
* Obtención de tablas e imágenes de productos nuevos en tiempos mínimos.
* Creación de tablas de productos con nombres únicos (si se repite un nombre, automáticamente lo readapta en su ingreso).

## ¿How To Use?
### ¿Cómo empezar?
* Da clic en [Icono Circle-Plus](https://fontawesome.com/icons/circle-plus?f=classic&s=regular) para **Añadir producto**.
* Permite el acceso a la cámara, para poder tomar fotos de los productos desde la página web.
* A continuación, sigue los pasos para ingresar el producto. Puedes modificar los datos, incluyendo la fotografía, en caso de ser necesario. Recuerda que el nombre tiene un _límite de 50 caracteres_ como máximo.
* Asegúrate de tomar la foto correcta, después de **Añadir producto**, no podrás volver a editar la imagen.

### ¿Puedo cambiar el nombre de la tabla?
El nombre por defecto es _MyQuickTable_, si haces clic en él, puedes modificarlo al que más te convenga. Tiene un _límite de 20 caracteres_ como máximo.

### Ya he ingresado un producto ¿Cómo lo edito?
* Vas a Modo y eliges **Edición**.
* Recuerda que solo puedes editar _Nombre, Precio y Cantidad_. No se puede cambiar de imagen por producto.
* La edición es automática, el botón de **Terminar edición** solo te cambia del modo _Editar_ al modo _Visualización_.

### ¿Cómo elimino un producto?
* Vas a Modo y eliges **Eliminación**.
* Seleccionas todos los productos a eliminar.
* Cliqueas en **Eliminar X productos**.

### ¿Cómo elimino la tabla de productos?
* Vas a Modo y eliges **Eliminación**.
* Cliqueas en **¡Eliminar Tabla!**.

### ¿Cómo puedo exportar la tabla?
* En el apartado de **Exportar tabla**, selecciona el formato de exportación de preferencia (PDF o ZIP).
* El archivo ZIP contiene las imágenes, cada una, con su nombre, precio y cantidad.
* El **Costo total** no se conserva en el formato ZIP, sí lo hace en el PDF.

### Otras funciones
* [Icono Hand-Point-Up](https://fontawesome.com/icons/hand-point-up?f=classic&s=solid) al darle clic subes al tope de la página.
* [Icono Table-Cells](https://fontawesome.com/icons/table-cells?f=classic&s=regular) **Modo normal** de tabla.
* [Icono Panorama](https://fontawesome.com/icons/panorama?f=classic&s=solid) **Modo tarjetas** de tabla. De arriba a abajo la información corresponde a _Image, Nombre, Precio y Cantidad._

## Example Images
