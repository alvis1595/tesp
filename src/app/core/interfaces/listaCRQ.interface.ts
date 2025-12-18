export interface ListaDeCRQ {
	varCambio: string;
	varCambio2: string;
	varCambio3: string;
	varConsole: string;
	varEstadolibera: string;
	varestadofinal: string;
	varFecha_liberacion: string;
	varResponsable: string;
	varOrganizacion: string;
	varGrupoInformador: string;
	varGrupo: string;
	varPrioridad: string;
	varTipo: string;
	varEstado: string;
	varRequestType: string;
	varFechaDeSalida: string;
	varDescripcion: string;
	varBeneficio: string;
	varSolicitante: string;
	varImplementador: string;
	varProducto: string;
	varClase: string;
	varJustificacion: string;
	varEnlanceJira: string;
	varArquitectura: string;
	varOped: string;
	varAuditoria: string;
	varInfra: string;
	varSoporte: string;
	varOperacionesseguridad: string;
	varListadoElementos: string;
	varJfrogVar: string;
	varServiceCI: string;
	varAreasInvolucradas: string;
	varGrupoAsignadoTareaPro: string;
	varOrden: number;
	varEntorno: string;
  REP?: string;
}


export interface DeployItem {
  crq: string;
  nomb_estado: string;
  url: number;
  l_user: string;
  estadoinput: string | null;
  estado: string;
  fecha_liberacion: string;
  reliberado: string;
  reversado: string;
}
