# A1 Maquetas — Publicación oficial + correo corporativo
Preparación de NovaTec · 3 de noviembre de 2026

## Estado
- Fuente del sitio: https://github.com/Thiago15da/dental
- Demo existente: https://thiago15da.github.io/dental/
- Dominio adquirido, según el cliente: **a1maquetas.com.py**
- Plataforma web: GitHub Pages, repositorio `Thiago15da/dental`.
- DNS previsto: Cloudflare. La delegación del dominio a Cloudflare aún NO está confirmada.
- Correo previsto: Zoho Mail. La cuenta, organización y verificación de dominio aún NO están configuradas.
- Esta rama de lanzamiento está preparada pero no está fusionada en `main`; no modificar DNS ni cambiar MX hasta confirmar servicios y permisos.

## Sitio web: orden de activación
1. Crear el dominio `a1maquetas.com.py` en Cloudflare, revisar DNS actual y copiar los **dos nameservers individuales** asignados al dominio. En NIC Paraguay / registrador, sustituir los nameservers actuales por esos valores exactos, **solo después de revisar todos los registros existentes**.
2. En GitHub > repositorio `dental` > Settings > Pages, indicar **Custom domain: a1maquetas.com.py**. GitHub debe reconocer el dominio antes de apuntar el DNS a él. Confirmar que GitHub Pages está publicando desde rama `main` raíz. La rama de lanzamiento incluye un archivo `CNAME`; al fusionar se aplicará al repositorio con Pages por rama.
3. En Cloudflare DNS configurar:

   | Tipo | Nombre | Valor | Proxy |
   |---|---|---|---|
   | A | @ | 185.199.108.153 | DNS only |
   | A | @ | 185.199.109.153 | DNS only |
   | A | @ | 185.199.110.153 | DNS only |
   | A | @ | 185.199.111.153 | DNS only |
   | CNAME | www | Thiago15da.github.io | DNS only |

   No usar comodines ni registros A contradictorios. Cloudflare no debe usar el proxy naranja inicialmente en este esquema; GitHub gestiona el certificado HTTPS.
4. Una vez que el dominio y los nameservers estén correctamente delegados, publicar la rama de lanzamiento (merge de PR) y verificar dominio/HTTPS en Settings > Pages. Activar **Enforce HTTPS** cuando esté disponible.
5. Comprobar URL raíz, `www` (redirección a raíz), navegación, fotos, cotizaciones, favicon, Search Console, sitemap y ausencia de `noindex` en las nueve páginas canónicas.
6. Si GitHub Pages genera y gestiona correctamente el certificado, NO configurar certificados separados ni "Flexible" de Cloudflare.

Referencia técnica de GitHub (actualizable): https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

## Zoho Mail: activación independiente
1. Crear una **organización Zoho Mail del cliente** (no usar cuenta privada de NovaTec como propietaria). Seleccionar región y plan de Zoho con las licencias que hagan falta. Contraseña, recuperación y 2FA deben quedar bajo control del cliente.
2. En Zoho Mail Admin Console > Domains > Add Domain agregar `a1maquetas.com.py`.
3. Usar la verificación de dominio **Cloudflare One-click / Domain Connect**, si se ofrece. Alternativamente copiar el TXT/CNAME de verificación generado por Zoho a Cloudflare y validar.
4. Crear la primera casilla principal (ej.: `hernan@a1maquetas.com.py`) y decidir si `contacto@`, `cotizaciones@` e `info@` serán casillas separadas o **alias** de la cuenta principal. No suponer que un alias tiene buzón independiente.
5. Tomar los valores **MX** exactos de Zoho Admin Console > DNS Mapping, porque dependen de la región/centro de datos y del plan. No inventarlos. Antes de sustituir MX, verificar que el dominio no recibe correo por un proveedor anterior.
6. Completar el **único SPF TXT** requerido, seleccionar y verificar el **DKIM TXT** generado por Zoho; agregar DMARC TXT inicial con una política de monitoreo, revisar informes, luego endurecer la política cuando la autenticación esté validada.
7. En Cloudflare: valores TXT, MX y verificación con **DNS only**. No habilitar Cloudflare Email Routing si Zoho debe recibir el correo y no instalar MX de ambos servicios.
8. Probar desde y hacia Gmail/Outlook con casilla real, comprobar respuesta, spam, SPF/DKIM/DMARC. No dar por terminado hasta probar entrega externa en ambos sentidos.

Zoho + Cloudflare: https://www.zoho.com/mail/help/adminconsole/cloudflare.html
Zoho - Dominios: https://www.zoho.com/mail/help/adminconsole/add-domains.html

## Seguridad y entrega
- El acceso de Cloudflare, Zoho Mail y dominio debe quedar a nombre de A1 Maquetas. Dar acceso administrativo delegado a NovaTec si es necesario, sin solicitar contraseñas por chat.
- Cuentas de personas con autenticación de dos factores, métodos de recuperación, documento de acceso y responsables definidos.
- Si se necesita que los clientes contacten desde la web por email, agregar enlace `mailto:` **solamente una vez que el buzón real esté activado** y probado.
- El SEO en esta rama incluye canonicals del dominio, indexación, sitemap y robots. La web aún necesita fotografías y logo autorizados del cliente; no asumir que imágenes de archivo son fotografías finales.

## Observaciones
- La configuración DNS no altera el costo de GitHub Pages de este repositorio público.
- El plan gratuito de Zoho, si está disponible, puede tener restricciones de usuarios/funciones; consultar disponibilidad actual y necesidades antes de elegir licencias.
- Es prudente no crear registros para un proveedor de correo hasta contar con la zona correcta de Zoho.
