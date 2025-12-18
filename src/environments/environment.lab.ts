/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
const serverUrl = (window as any).serverUrl;
let urlApiLogin: string;
let urlApiAudit: string;
let urlApiCrqs: string;
let urlApiCmdb: string;
let urlApiCmdbReport: string;
let urlApiCatalogo: string;
let urlApiLiberacion: string;
let urlApiPaseExpress: string;
let urlApiCrqTracking: string;
let urlJfrogApi:string;
let urlAtlasianApi:string;

let urlApiProd = 'https://argoslabapi.bgeneral.com';
urlJfrogApi = 'https://bgxpa.jfrog.io/artifactory',
urlAtlasianApi = 'https://bgx-pa.atlassian.net',
urlApiLogin = urlApiProd + ':5000/argoapiv2';
urlApiAudit = urlApiProd + ':5070/argosaudit';
urlApiCrqs = urlApiProd + ':5010/crqs';
urlApiCatalogo = urlApiProd + ':5020/argoapiv2';
urlApiCmdb = urlApiProd + ':5050/argoapiv2';
urlApiCmdbReport = urlApiProd + ':5050/cmdb/report';
urlApiLiberacion = urlApiProd + ':5025/liberacion';
urlApiPaseExpress = urlApiProd + ':5035/pase_express';
urlApiCrqTracking = urlApiProd + ':5030/track';


export const environment = {
  production: false,
  urlJfrogApi: urlJfrogApi,
  urlAtlasianApi: urlAtlasianApi,
  baseUrlApiLogin: urlApiLogin,
  baseUrlApiAudit: urlApiAudit,
  baseUrlApiCrqs: urlApiCrqs,
  baseUrlApiCmdb: urlApiCmdb,
  baseUrlApiCmdbReport: urlApiCmdbReport,
  baseUrlApiCatalogo: urlApiCatalogo,
  baseUrlApiLiberacion: urlApiLiberacion,
  baseUrlApiPaseExpress: urlApiPaseExpress,
  baseUrlApiCrqTracking: urlApiCrqTracking,
  jenkinsUrl: 'jenkinslab',
  socketUrl: 'wss://argoslabapi.bgeneral.com' + ':5025/',
  API_TOKEN: 'CYmJz_GveNrLk?!Zn4dKuteJWYTcVnmDyA6KCbu?jgvXx?n8wAL!S_ZB2kQW3cPFg9YNvXD3MexsS48?2TVkP_cChKNcFfzVUC_Z9G76s!LE2S',
  listaEstados: ["Borrador",
                "Petición de Cambio",
                "Planificación en curso",
                "Programado para aprobación",
                "Programado",
                "Implantación en curso",
                "Terminado",
                "Cerrado",
                "Rechazado"],

};
