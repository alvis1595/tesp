src/app/feature/crqs/pages/reporte-produccion/reporte-produccion.component.ts

// ========================================
// ARCHIVO: reporte-produccion.component.ts
// FIX: Usar REP limpio en el texto del enlace JFROG
// ========================================

// ✅ CAMBIO CORRECTO: Líneas ~232-241 en consultardata()

// ORIGINAL (INCORRECTO):
            if (element.varInfra.length > 10) {
              const toArrayinfra = element.varInfra.split('\n');

              if (toArrayinfra.length > 3) {
                const matchedLink = toArrayinfra.find((link) =>
                  link.includes(element.varCambio2 + '.')
                );
                element.varInfra = matchedLink || toArrayinfra[0];
              } else {
                element.varInfra = toArrayinfra[0];
              }

              const baseUrl = `${environment.urlJfrogApi}/api/storage/change-request/`;
              const newUrl = `${environment.urlJfrogApi}/change-request/`;
              element.varInfra = `<a href='${element.varInfra.replace(
                baseUrl,
                newUrl
              )}' target='_blank'>${element.varCambio2}</a>`;
              //                   ^^^^^^^^^^^^^^^^^^^ PROBLEMA: esto ya es un <a> con URL de Atlassian
            }


// NUEVO (CORRECTO):
            if (element.varInfra.length > 10) {
              const toArrayinfra = element.varInfra.split('\n');

              if (toArrayinfra.length > 3) {
                const matchedLink = toArrayinfra.find((link) =>
                  link.includes(element.varCambio2 + '.')
                );
                element.varInfra = matchedLink || toArrayinfra[0];
              } else {
                element.varInfra = toArrayinfra[0];
              }

              const baseUrl = `${environment.urlJfrogApi}/api/storage/change-request/`;
              const newUrl = `${environment.urlJfrogApi}/change-request/`;
              // Criterio #5: Usar element.REP (limpio) en vez de element.varCambio2 (que tiene <a> de Atlassian)
              element.varInfra = `<a href='${element.varInfra.replace(
                baseUrl,
                newUrl
              )}' target='_blank'>${element.REP}</a>`;
              //                   ^^^^^^^^^^^^ CORRECCIÓN: Usar REP limpio
            }


// ========================================
// EXPLICACIÓN DEL PROBLEMA:
// ========================================
// 
// ANTES (línea 240):
// ${element.varCambio2}
// 
// element.varCambio2 contiene:
// "<a href='https://bgx-pa.atlassian.net/browse/REP-278436'>REP-278436</a>"
//                                                           
// Entonces el <a> de JFROG quedaba así:
// <a href='JFROG_URL' target='_blank'>
//   <a href='ATLASSIAN_URL'>REP-278436</a>  ← Link anidado (mal)
// </a>
//
// Por eso mostraba argos.com (Atlassian) en vez de jfrog.io
//
// ========================================
// 
// DESPUÉS (línea 240):
// ${element.REP}
// 
// element.REP contiene solo:
// "REP-278436"
// 
// Ahora el <a> queda:
// <a href='JFROG_URL' target='_blank'>REP-278436</a>  ← Correcto
//
// ========================================


// ========================================
// RESUMEN DEL CAMBIO:
// ========================================
// Línea 240: Cambiar ${element.varCambio2} por ${element.REP}
//            (solo 1 palabra diferente)
// ========================================