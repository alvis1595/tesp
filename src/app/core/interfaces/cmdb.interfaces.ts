export interface CMDB {
  alojamiento: Alojamiento;
  aplicacion: string;
  cr_id: number;
  creador: string;
  desarrollo: Desarrollo;
  entorno_ci: EntornoCi;
  esquema_de_continuidad: EsquemaDeContinuidad;
  estrategias_de_recuperacion_datos: EstrategiasDeRecuperacionDatos;
  estrategias_de_recuperacion_infra: EstrategiasDeRecuperacionInfra;
  fecha: string;
  ip: string;
  joya_de_la_corona: string;
  lenguaje: Lenguaje;
  pais: Pais;
  proveedor: string;
  rep: string;
  responsable: Responsable;
  servidor: string;
  tiempo_de_instalacion_aplicacion: TiempoDeInstalacionAplicacion;
  tiempo_de_instalacion_servidor: TiempoDeInstalacionServidor;
  tipo_servidor: TipoServidor;
  upwd?:string;
}

export interface CMDBDelete{
  cr_id: string | number;
  creador: string;
  upwd?: string;
}

export interface CMDBFORM {
  alojamientos: string[];
  aplicaciones: string[];
  desarrollo: string[];
  entornos: string[];
  esquema_de_continuidad_: string[];
  estrategias_de_recuperacion_datos_: string[];
  estrategias_de_recuperacion_infra_: string[];
  joya_de_la_corona_: string[];
  lenguajes: string[];
  mesas: string[];
  paises: string[];
  proveedores: string[];
  tiempo_de_instalacion_aplicacion_: string[];
  tiempo_de_instalacion_servidor_: string[];
  tipos_servidor: string[];
}

export enum Alojamiento {
  Nube = 'Nube',
  OnPremise = 'On premise',
  PruebasA = 'Pruebas A',
  PruebasB = 'Pruebas B',
}

export enum Desarrollo {
  DesarrolloProveedorComercial = 'proveedor Comercial',
  NoDisponible = 'No disponible',
  Propio = 'Propio',
  ProveedorComercial = 'Proveedor Comercial',
  Tercerizado = 'Tercerizado',
}

export enum EntornoCi {
  Contingencia = 'Contingencia',
  Desarrollo = 'Desarrollo',
  Producción = 'Producción',
  Pruebas = 'Pruebas',
}

export enum EsquemaDeContinuidad {
  Empty = '',
  EsquemaParcial = 'Esquema parcial',
  EsquemaTotal = 'Esquema total',
  NaN = 'NaN',
  NoDisponible = 'No disponible',
  SinEsquema = 'Sin esquema',
}

export enum EstrategiasDeRecuperacionDatos {
  Empty = '',
  NaN = 'NaN',
  NoDisponible = 'No disponible',
  ReplicaciónDiferida = 'Replicación diferida',
  ReplicaciónEnLínea = 'Replicación en línea',
  RespaldoACaja = 'Respaldo a caja',
  RespaldoADisco = 'Respaldo a disco',
  RespaldoRestauración = 'Respaldo/Restauración',
  SinRespaldos = 'Sin respaldos',
  SoloRespaldo = 'Solo respaldo',
}

export enum EstrategiasDeRecuperacionInfra {
  ActivoActivo = 'Activo – Activo',
  ActivoActivoBalanceado = 'Activo – Activo Balanceado',
  ActivoActivoDistribuido = 'Activo – Activo Distribuido',
  ActivoPasivo = 'Activo – Pasivo',
  ActivoPasivoCompartido = 'Activo – Pasivo Compartido',
  AltaDisponibilidad = 'Alta disponibilidad',
  Empty = '',
  NaN = 'NaN',
  NoDisponible = 'No disponible',
  PasivoStandBy = 'Pasivo (Stand by)',
  RecuperaciónEnSitio = 'Recuperación en sitio',
}



export enum Lenguaje {
  ASPNet = 'ASP.net',
  ASPVbscripJavascriptDLLEnLenjuageC = 'ASP, Vbscrip, Javascript, DLL en lenjuage C',
  COTSSinPersonalización = 'COTS sin personalización',
  Clipper = 'CLIPPER',
  HTMLASP = 'HTML, ASP',
  Java = 'Java',
  JavaJavaServletsGlassFish21 = 'Java, Java Servlets,GlassFish 2.1',
  JavaVisualBasicNetWebServices = 'Java, Visual Basic, .Net, Web Services',
  LenguajeC = 'Lenguaje C',
  LenguajeJava = 'java',
  NoDisponible = 'No disponible',
  PLSQLOracle = 'PL SQL (Oracle)',
  VisualBasic60 = 'VisualBasic 6.0',
  XMLWebpartsHTML = 'XML, webparts, HTML',
}

export enum Pais {
  BGValores = 'BG Valores',
  CostaRica = 'Costa Rica',
  FundaciónSUSBuenosVecinos = 'Fundación Sus Buenos Vecinos',
  GeneralDeSeguros = 'General de Seguros',
  Panamá = 'Panamá',
  Profuturo = 'Profuturo',
  Regionales = 'Regionales',
  ValeGeneral = 'Vale General',
}

export enum Responsable {
  AppOpsPlataformasCentrales = 'App Ops Plataformas Centrales',
  AppOpsPlataformasDeApoyo = 'App Ops Plataformas de Apoyo',
  CostaRica = 'COSTA RICA',
  Cpci = 'CPCI',
  NoDisponible = 'No disponible',
  PlataformasDeInfraestructura = 'Plataformas de Infraestructura',
  PlataformasDeInfraestructuraCloud = 'Plataformas de Infraestructura Cloud',
  SRECanales = 'SRE Canales',
  SRECobis = 'SRE Cobis',
  SREStella = 'SRE Stella',
  SreCanales = 'SRE CANALES',
  SreCobis = 'SRE COBIS',
  SreStella = 'SRE STELLA',
  Telematica = 'Telematica',
}

export enum TiempoDeInstalacionAplicacion {
  Empty = '',
  MásDe24Horas = 'Más de 24 horas',
  NaN = 'NaN',
  NoDisponible = 'No disponible',
  The02Hrs = '0-2hrs',
  The1214Hrs = '12-14hrs',
  The1618Hrs = '16-18hrs',
  The1820Hrs = '18-20hrs',
  The2224Hrs = '22-24hrs',
  The24Hrs = '2-4hrs',
  The46Hrs = '4-6hrs',
  The68Hrs = '6-8hrs',
  The810Hrs = '8-10hrs',
}

export enum TiempoDeInstalacionServidor {
  CentOS3Días = 'Cent OS 3 días',
  Empty = '',
  NaN = 'NaN',
  NoDisponible = 'No disponible',
  OracleLinuxConDB3Días = 'Oracle Linux con DB 3 días',
  OracleLinuxSinDB2Días = 'Oracle Linux Sin DB 2 días',
  RedHatConBD3Días = 'Red Hat con BD 3 días',
  RedHatSinBD2Días = 'Red Hat sin BD 2 días',
  ServidoresFísicosPasiva4560DíasCompraEInstalación = 'Servidores Físicos (pasiva) 45-60 días (compra e instalación)',
  SolarisSinBD3Días = 'Solaris sin BD 3 días',
  WindowsVirtualConDB35Días = 'Windows Virtual con DB 3.5 días',
  WindowsVirtualSinDB25Días = 'Windows Virtual sin DB 2.5 días',
}

export enum TipoServidor {
  Alquilado = 'Alquilado',
  Propio = 'Propio',
}
