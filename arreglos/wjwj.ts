// ========================================
// MÉTODO onChange() CON COMENTARIOS
// ORIGINAL = código que ya existía
// NUEVO = código agregado para el filtro
// ========================================

onChange() {
  // ========== TODO ESTE BLOQUE ES ORIGINAL ==========
  const todayWithoutFormat: any = this.getFormattedDate();
  const credential: Credential = setGeneralCredential(todayWithoutFormat);
  const { password, usuario } = credential;

  let index: number = 0;
  let body: any = {};
  this.muestraLoading = true;
  this.listaDeCRM = [];
  this.data = [];
  // ========== FIN BLOQUE ORIGINAL ==========

  // ========== ESTE IF ES ORIGINAL ==========
  if (this.modeSelect == 'REP') {
    const hoy = new Date();
    const dia = String(hoy.getDate()).padStart(2, '0');
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const año = hoy.getFullYear();

    const fechaFormateada = `${dia}/${mes}/${año}`;
    const timeinicio = `${fechaFormateada} 00:00:00`;
    const tiempofinal = `${fechaFormateada} 23:59:59`;

    this.listaDeCRM = [];
    this.data = [];
    body = {
      password,
      usuario,
      repValue: this.elementSearch,
      timeinicio,
      tiempofinal
    };
  }
  // ========== FIN IF ORIGINAL ==========

  // ========== ESTE IF ES ORIGINAL ==========
  if (this.modeSelect == 'Fecha') {
    const date = new Date(this.elementSearch);

    const formattedDate = String(date.getDate()).padStart(2, '0') + '/' +
      String(date.getMonth() + 1).padStart(2, '0') + '/' +
      date.getFullYear();

    this.listaDeCRM = [];
    this.data = [];
    body = {
      usuario,
      password,
      tiempofinal: `${formattedDate} 23:59:59`,
      timeinicio: `${formattedDate} 00:00:00`
    }
  }
  // ========== FIN IF ORIGINAL ==========

  // ✅✅✅ NUEVO: Cargar estados válidos de Argos ANTES de filtrar ✅✅✅
  this.getChangeServices.get_arg_estados('pase').subscribe((estados) => {
    // ✅✅✅ NUEVO: Guardar estados en la variable ✅✅✅
    this.estadosArgos = estados;

    // ========== ESTA LÍNEA ES ORIGINAL (postCRQ) ==========
    this.getChangeServices.postCRQ(body).subscribe({
      next: (result) => {
        // ========== ESTE FOR ES ORIGINAL ==========
        for (let i = 0; i < result.length; i++) {
          // ========== ESTE IF ES ORIGINAL ==========
          if (result[i].varJfrogVar == 'PENDING') {
            // ✅✅✅ NUEVO: Filtrar por estados válidos de Argos ✅✅✅
            if (this.estadosArgos.includes(result[i].varEstado)) {
              // ========== ESTA LÍNEA ES ORIGINAL ==========
              this.listaDeCRM.push(result[i]);
            } // ✅✅✅ FIN NUEVO ✅✅✅
          }
          // ========== FIN IF ORIGINAL ==========
        }
        // ========== FIN FOR ORIGINAL ==========

        // ========== TODO ESTE BLOQUE forEach ES ORIGINAL ==========
        this.listaDeCRM.forEach((element) => {
          const indice = environment.listaEstados.indexOf(
            element.varRequestType
          );
          element.varOrden = indice >= 0 ? indice : 100;

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
          }

          if (element.varFechaDeSalida.length >= 18) {
            element.varFechaDeSalida = element.varFechaDeSalida.substring(
              0,
              10
            );
          }

          if (element.varCambio2.includes('REP')) {
            element.REP = element.varCambio2;
            element.varCambio2 = `<a href="${environment.urlAtlasianApi}/browse/${element.varCambio2}" target="_blank">${element.varCambio2}</a>`;
          }
          if (element.varTipo == 'null') {
            element.varTipo = 'Infraestructura';
          }
          this.listaDeCRM.sort(function (a, b) {
            return a.varOrden - b.varOrden;
          });
          index++;
        });
        // ========== FIN forEach ORIGINAL ==========

        // ========== TODO ESTE BLOQUE map ES ORIGINAL ==========
        this.data = this.listaDeCRM.map((element, index) => ({
          key: index,
          REP: element.REP,
          Cambio: element.varCambio2,
          Fecha: element.varFechaDeSalida,
          Prioridad: element.varPrioridad,
          Tipo: element.varTipo,
          Estado: element.varEstado,
          Clase: element.varClase,
          Implementador: element.varImplementador,
          JFROG: element.varJfrogVar,
          expand: false,
          children: [
            {
              key: index,
              JustificacionDelNegocio: element.varJustificacion,
              Elementos: element.varListadoElementos,
              enlaceJfrog: element.varInfra,
            },
          ],
        }));
        // ========== FIN map ORIGINAL ==========

        // ========== ESTA LÍNEA ES ORIGINAL ==========
        this.muestraLoading = false;
      },
      // ========== ESTE BLOQUE error ES ORIGINAL ==========
      error: (error) => {
        console.error('hubo un error');
        this.muestraLoading = false;
      },
      // ========== FIN error ORIGINAL ==========
    }); // ========== Cierre de postCRQ (ORIGINAL) ==========
  // ✅✅✅ NUEVO: Cierre de get_arg_estados ✅✅✅
  }); 
} // ========== Cierre de onChange (ORIGINAL) ==========


// ========================================
// RESUMEN DE CAMBIOS:
// ========================================
// LÍNEAS NUEVAS (solo 4):
// 1. this.getChangeServices.get_arg_estados('pase').subscribe((estados) => {
// 2. this.estadosArgos = estados;
// 3. if (this.estadosArgos.includes(result[i].varEstado)) {
// 4. }); (cierre de get_arg_estados)
//
// TOTAL: ~150 líneas de código
// ORIGINAL: ~146 líneas
// NUEVO: 4 líneas
// ========================================