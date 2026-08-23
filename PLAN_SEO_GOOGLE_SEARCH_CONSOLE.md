# 🚀 Plan de Acción SEO: Google Search Console y Optimización de URLs
**Proyecto:** Life Fitness Venezuela (`lifefitness.com.ve`)  
**Fecha de actualización:** 23 de Agosto de 2026  
**Estado general:** ✅ Pasos técnicos base completados en código / ⏳ Pendiente ejecución manual en Google Search Console

---

## 📊 Resumen del Estado de los 4 Pasos

| Paso | Tarea | Estado | Dónde se ejecuta |
|---|---|---|---|
| **1** | **Configurar Redirecciones 301** | ✅ **Completado y blindado** | Archivo `.htaccess` + SPA Router |
| **2** | **Solicitar Indexación en GSC** | ⏳ **Acción manual pendiente** | Panel de Google Search Console |
| **3** | **Eliminar URLs Inexistentes / Infectadas** | ⏳ **Acción manual pendiente** | Herramienta de Retirada de URLs en GSC |
| **4** | **Actualizar y Enviar Sitemap XML** | ✅ **Sitemap listo** / ⏳ **Reenvío en GSC** | `public/sitemap.xml` + Panel GSC |

---

## 🛠️ Paso 1: Configurar Redirecciones 301 (Imprescindible)
> **Estado:** ✅ **Completado y Optimizado**

### ¿Qué se adelantó?
Se configuró el archivo `public/.htaccess` con reglas que capturan cualquier variante (con o sin barra final, mayúsculas/minúsculas con flag `[NC]` y sin codificar el `#` con flag `[NE]`):

1. **`equipos-para-el-hogar`** ➡️ Redirige con **301** hacia `/hogar`.
2. **`planos`** ➡️ Redirige con **301** hacia `/gimnasio#serie-selectorizada`.
3. **`caminadoras`** ➡️ `/gimnasio#trotadoras`.
4. **`elipticas`** ➡️ `/gimnasio#elipticas`.
5. **`ciclismo-estacionario`** ➡️ `/gimnasio#ciclismo-indoor`.
6. **`multifuerzas`** ➡️ `/gimnasio#multigimnasios`.
7. **`bicicletas-de-ejercicio-lifecycle`** ➡️ `/gimnasio#bicicletas-verticales`.
8. **`contactanos`** ➡️ `/#contacto`.
9. **`home` / `pagina-home`** ➡️ `/`.

Adicionalmente, se configuró el enrutador de React (`src/App.jsx`) y el controlador de anclas (`src/components/ScrollToHash.jsx`) para que, incluso en navegación local o SPA, estas rutas lleven al usuario automáticamente a su sección correspondiente.

---

## 🔍 Paso 2: Solicitar Indexación en Google Search Console
> **Estado:** ⏳ **Paso a realizar en el Panel de Google**

Google necesita ser notificado de que la estructura de la web cambió y que las páginas principales tienen nuevo contenido.

### Instrucciones paso a paso:
1. Ingresa a [Google Search Console](https://search.google.com/search-console).
2. Selecciona la propiedad `https://lifefitness.com.ve/` (o dominio `lifefitness.com.ve`).
3. En la barra superior **"Inspeccionar cualquier URL..."**, escribe una por una las URLs principales:
   - `https://lifefitness.com.ve/`
   - `https://lifefitness.com.ve/gimnasio`
   - `https://lifefitness.com.ve/hogar`
4. Presiona **Enter** y espera a que Google consulte los datos del índice.
5. Haz clic en el botón **"SOLICITAR INDEXACIÓN"** (o *"Request Indexing"*).
6. Repite el proceso para cada una de las 3 URLs principales.

---

## 🗑️ Paso 3: Eliminar URLs Inexistentes o Infectadas
> **Estado:** ⏳ **Paso a realizar en el Panel de Google**

Si en el pasado existieron URLs con virus, spam, enlaces hackeados o páginas que ya no existen ni deben redirigirse, debes solicitar a Google que las retire del buscador para limpiar la reputación de dominio.

### Instrucciones paso a paso:
1. En el menú lateral izquierdo de **Google Search Console**, ve a la sección **Indexación** > **Retiradas de URLs** (*Removals*).
2. Haz clic en la pestaña **"Retiradas temporales"** y luego en el botón **"Nueva solicitud"**.
3. Elige una de las dos opciones:
   - **Retirar solo esta URL:** Para enlaces específicos infectados (ej. `https://lifefitness.com.ve/antigua-url-spam.php`).
   - **Retirar todas las URLs con este prefijo:** Si el ataque o URLs viejas estaban en una subcarpeta (ej. `https://lifefitness.com.ve/wp-content/spam/`).
4. Ingresa la URL o prefijo y haz clic en **Siguiente** > **Enviar solicitud**.
5. Las URLs desaparecerán de los resultados de búsqueda de Google en un lapso de 24 a 48 horas.

---

## 🗺️ Paso 4: Actualizar y Enviar el Sitemap XML
> **Estado:** ✅ **Archivo generado** / ⏳ **Envío en GSC**

### ¿Qué se adelantó?
Se actualizó el archivo `public/sitemap.xml` con las rutas limpias oficiales y la fecha vigente:
- `https://lifefitness.com.ve/` (Prioridad 1.0)
- `https://lifefitness.com.ve/gimnasio` (Prioridad 0.9)
- `https://lifefitness.com.ve/hogar` (Prioridad 0.9)
- `https://lifefitness.com.ve/contacto` (Prioridad 0.8)

El archivo `public/robots.txt` ya apunta correctamente a:
`Sitemap: https://lifefitness.com.ve/sitemap.xml`

### Instrucciones para reenviar en Search Console:
1. En el menú lateral izquierdo de **Google Search Console**, haz clic en **Sitemaps** (dentro de *Indexación*).
2. En el campo **"Añadir un nuevo sitemap"**, escribe:
   `sitemap.xml`
3. Haz clic en **ENVIAR**.
4. Verifica que en la columna **Estado** aparezca en color verde como **"Correcto"** (*Success*).

---

## 📌 Checklist de Verificación Final

- [x] Reglas 301 en `.htaccess` corregidas con flags `[R=301,NC,NE,L]`.
- [x] Redirección de `equipos-para-el-hogar` hacia `/hogar`.
- [x] Redirección de `planos` hacia `/gimnasio#serie-selectorizada`.
- [x] Soporte de fallback en React Router (`App.jsx`).
- [x] Sitemap XML actualizado con fecha actual (`2026-08-23`).
- [ ] Solicitar indexación de `/`, `/gimnasio` y `/hogar` en GSC.
- [ ] Enviar solicitudes de retirada en GSC para URLs basura/infectadas.
- [ ] Reenviar `sitemap.xml` en la pestaña Sitemaps de GSC.
