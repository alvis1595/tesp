import { editForm } from './../interfaces/edit.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { sesion } from '../interfaces/sesion.interface';
import { login } from '../interfaces/login.interface';
import { catchError, map, Observable, retry, throwError, timeout } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ListaDeCRQ } from '../interfaces/listaCRQ.interface';
import { cat } from '../interfaces/cat.interfaces';
import { servicio } from '../interfaces/estados.interface';
import { Capa } from '../interfaces/capa.interfaces';
import { Catalogo, Estados } from '../interfaces/catalogo.interfaces';
import { Content, Manifest, ManifestRequest } from '../interfaces/manifest';
import { CMDB, CMDBDelete, CMDBFORM } from '../interfaces/cmdb.interfaces';
import { Liberaciones } from '../interfaces/liberaciones.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GetChangesService {
  UrlEstadosRepValidos = environment.baseUrlApiCrqs + '/get_arg_estados';
  UrlEntornosRepValidos = environment.baseUrlApiCrqs + '/get_arg_entornos';
  UrlObtenerCrq = environment.baseUrlApiCrqTracking + '/getcrq';
  UrlObtenerComponente = environment.baseUrlApiCrqTracking + '/getcomponent';
  UrlObtenerCRQDate = environment.baseUrlApiCrqTracking + '/getcrqdate';
  UrlPaseExpresss = environment.baseUrlApiPaseExpress;
  UrlbaseApiUrlAudit = environment.baseUrlApiAudit + '/addaudit';
  UrlLiberacionUser = environment.baseUrlApiLiberacion + '/testnet';
  UrlEstadoLiberaciones = environment.baseUrlApiLiberacion + '/check_estado';
  Urlliberar = environment.baseUrlApiLiberacion + '/liberar';
  UrlliberarAccion = environment.baseUrlApiLiberacion + '/aux';
  UrlApiUrlestado = environment.baseUrlApiLiberacion + '/check_estado_active';
  UrlApireLiberar = environment.baseUrlApiLiberacion + '/reLiberar';
  UrlApiCatalogoCmdb = environment.baseUrlApiCmdb + '/cmdb';

  private userApiUrl = environment.baseUrlApiCrqs;
  private loginApiUrl = environment.baseUrlApiLogin;

  constructor(private http: HttpClient) {}

  private handleError(error: any): Observable<never> {
    return throwError(() => error);
  }

  public postlogin(login: login): Observable<sesion[]> {
    const url = `${this.loginApiUrl}/login`;
    return this.http.post<sesion[]>(url, login).pipe(
      catchError(this.handleError) // Adding error handling
    );
  }

  public postCRQ(varcredential: Credential): Observable<ListaDeCRQ[]> {
    const url = `${this.userApiUrl}/getInfo`;
    return this.http
      .post<ListaDeCRQ[]>(url, varcredential)
      .pipe(catchError(this.handleError));
  }

  get_arg_estados(module: string): Observable<any> {
    const formData = new FormData();
    formData.append('module', module);
    return this.http.post(this.UrlEstadosRepValidos, formData);
  }

  get_arg_entornos(module: string): Observable<any> {
    const formData = new FormData();
    formData.append('module', module);
    return this.http.post(this.UrlEntornosRepValidos, formData);
  }

  getCrqTracking(valor: string): Observable<cat[]> {
    const formData = new FormData();
    formData.append('crq', valor);
    return this.http.post<cat[]>(this.UrlObtenerCrq, formData);
  }

  getComponent(valor: string): Observable<cat[]> {
    const formData = new FormData();
    formData.append('component', valor);
    return this.http.post<cat[]>(this.UrlObtenerComponente, formData);
  }

  getCrqDate(valor: string): Observable<cat[]> {
    const formData = new FormData();
    formData.append('date', valor);
    return this.http.post<cat[]>(this.UrlObtenerCRQDate, formData);
  }

  getServicio(): Observable<servicio[]> {
    return this.http.get<servicio[]>(this.UrlPaseExpresss + '/getcatalog');
  }

  postCapa(Producto: string): Observable<any> {
    const formData = new FormData();
    formData.append('Producto', Producto);
    return this.http.post(this.UrlPaseExpresss + '/postcapa', formData);
  }

  upload(file: any, CRQ: any, Producto: any, Capa: any): Observable<any> {
    const formData = new FormData();
    if (file.length) {
      for (let i = 0; i < file.length; i++) {
        formData.append('file', file[i], file[i].name);
        formData.append('CRQ', CRQ);
        formData.append('Producto', Producto);
        formData.append('Capa', Capa);
      }
    }
    //console.log(CRQ);
    this.addaudit(
      'upload',
      formData,
      `Se agregan archivos al ${CRQ}`
    ).subscribe();
    return this.http.post(this.UrlPaseExpresss + '/upload', formData);
  }

  addaudit(aa_action: any, aa_data: any, aa_descripcion: any): Observable<any> {
    const formAuditData = new FormData();
    const formDataString = this.formDataToString(aa_data);
    const fusuario = sessionStorage.getItem('fusuario') ?? '';
    formAuditData.append('aa_action', aa_action);
    formAuditData.append('aa_user', fusuario);
    formAuditData.append('aa_data', formDataString);
    formAuditData.append('aa_descripcion', aa_descripcion);
    return this.http.post<any>(this.UrlbaseApiUrlAudit, formAuditData);
  }

  private formDataToString(formData: any): string {
    let formDataString = '';

    // Convertir objeto a FormData si no lo es
    if (!(formData instanceof FormData)) {
      const tempFormData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (typeof value === 'string' || value instanceof Blob) {
          tempFormData.append(key, value);
        } else {
          console.warn(
            `El valor de ${key} no es un string ni un Blob y no se añadirá a FormData.`
          );
        }
      });
      formData = tempFormData;
    }

    formData.forEach((value: string | Blob, key: string) => {
      formDataString += `${key}=${value},`;
    });

    // Eliminar el último ',' añadido
    formDataString = formDataString.slice(0, -1);
    return formDataString;
  }

  getFiles(CRQ: string): Observable<any> {
    const formData = new FormData();
    formData.append('CRQ', CRQ);
    return this.http.post(this.UrlPaseExpresss + '/getfiles', formData);
  }

  deletedFiles(deletefiles: any): Observable<any> {
    const formData = new FormData();
    formData.append('deletefiles', deletefiles);
    this.addaudit(
      'postedit',
      formData,
      `Se agregan eliminan archivos del pase`
    ).subscribe();
    return this.http.post(this.UrlPaseExpresss + '/deletefiles', deletefiles);
  }

  check_estado(CRQ: string): Observable<any> {
    let fusuario = sessionStorage.getItem('fusuario') ?? '';
    let fpassword = sessionStorage.getItem('fpassword') ?? '';
    const formData = new FormData();
    formData.append('CRQ', CRQ);
    formData.append('authu', fusuario);
    formData.append('authp', fpassword);
    //console.log(CRQ);

    return this.http.post(this.UrlEstadoLiberaciones, formData).pipe(
      retry(3) // 3 intentos en total (1 original + 3 reintentos)
    );
  }

  cpci_status(CRQ: string, detalle: string): Observable<any> {
    const baseApiUrlcpci = environment.baseUrlApiLiberacion + '/cpci_status';
    const formData = new FormData();
    formData.append('CRQ', CRQ);
    formData.append('detalle', detalle);
    //console.log(CRQ);

    return this.http.post(baseApiUrlcpci, formData);
  }

  liberar(
    CRQ: string,
    nomb_estado: string,
    crqurl: string,
    CUSTOMENV: string
  ): Observable<any> {
    let fusuario = sessionStorage.getItem('fusuario') ?? '';
    let fpassword = sessionStorage.getItem('fpassword') ?? '';

    const formData = new FormData();
    formData.append('CRQ', CRQ);
    formData.append('customenv', CUSTOMENV);
    formData.append('crqurl', crqurl);
    formData.append('authu', fusuario);
    formData.append('authp', fpassword);
    formData.append('nomb_estado', nomb_estado.toLocaleLowerCase());
    //console.log(CRQ);

    return this.http.post(this.Urlliberar, formData);
  }

  Reliberar(
    CRQ: string,
    nomb_estado: string,
    crqurl: string,
    jobUrl: string,
    CUSTOMENV: string
  ): Observable<any> {
    let fusuario = sessionStorage.getItem('fusuario') ?? '';
    let fpassword = sessionStorage.getItem('fpassword') ?? '';
    let httpOptions = {
      headers: new HttpHeaders({ Authorization: `${environment.API_TOKEN}` }),
    };
    const formData = new FormData();
    formData.append('CRQ', CRQ);
    formData.append('customenv', CUSTOMENV);
    formData.append('jobUrl', jobUrl);
    formData.append('crqurl', crqurl);
    formData.append('authu', fusuario);
    formData.append('authp', fpassword);
    formData.append('nomb_estado', nomb_estado);
    //console.log(CRQ);

    return this.http.post(this.UrlApireLiberar, formData);
  }

  act_deplot(
    CRQ: string,
    url: any,
    act: string,
    nomb_estado: string
  ): Observable<any> {
    let fusuario = sessionStorage.getItem('fusuario') ?? '';
    let fpassword = sessionStorage.getItem('fpassword') ?? '';

    const formData = new FormData();
    formData.append('CRQ', CRQ);
    formData.append('url', url);
    formData.append('authu', fusuario);
    formData.append('authp', fpassword);
    formData.append('act', act);
    formData.append('nomb_estado', nomb_estado);
    return this.http.post(this.UrlliberarAccion, formData).pipe(retry(3));
  }

  check_estado_active_job(CRQ: string, nomb_estado: string): Observable<any> {
    const formData = new FormData();
    formData.append('CRQ', CRQ);
    formData.append('nomb_estado', nomb_estado);
    return this.http.post(this.UrlApiUrlestado, formData);
  }

  get_user_job(ListaCRQ: Liberaciones, diabusquedad: Date) {
    let fusuario = sessionStorage.getItem('fusuario');
    const formData = new FormData();
    formData.append('CRQ', ListaCRQ.Rep ?? '');
    formData.append('authu', fusuario ?? '');

    return this.http.post(this.UrlLiberacionUser, formData);
  }

  get_capa(): Observable<Capa[]> {
    const url = `${this.UrlPaseExpresss}/getcapa`;
    return this.http.get<Capa[]>(url);
  }

  get_catalogo(): Observable<Catalogo[]> {
    const url = `${this.UrlPaseExpresss}/getcatalog`;
    return this.http.get<Catalogo[]>(url);
  }

  get_catalogo_cmdb(): Observable<any[]> {
    const url = `${this.UrlApiCatalogoCmdb}/catalog`;
    return this.http.get<any[]>(url);
  }

  edit_form(
    editForm: editForm,
    form: any,
    addvalue: any = {}
  ): Observable<any[]> {
    const formData = new FormData();
    for (const key in form) {
      if (form.hasOwnProperty(key)) {
        let newKey = key;

        // Reglas para cambiar nombres de claves
        if (
          editForm.action === 'editCatalog' ||
          editForm.action === 'deleteCatalog'
        ) {
          const keyMap: { [originalKey: string]: string } = {
            ca_id: 'id',
            ca_tipo_alojamiento: 'value',
            joya: 'joya',
          };

          if (keyMap[key]) {
            newKey = keyMap[key];
          }
        }

        // Reglas para otras acciones
        if (
          ['editCapa', 'delCapa', 'editAplic', 'addAplic'].includes(
            editForm.action
          )
        ) {
          if (key === 'cc_id' || key === 'ape_id') {
            newKey = key.replace('_', '');
          }
        }
        formData.append(newKey, form[key]);
      }
    }

    // Agregar valores adicionales si aplica
    if (addvalue && editForm.action === 'editCapa') {
      formData.append('originname', addvalue.nombre);
    }

    if (editForm.action === 'editCatalog' && !('joya' in form)) {
      formData.append('joya', 'undefined');
    }

    if (addvalue && editForm.action === 'editAplic') {
      formData.append('originid', addvalue.ape_id);
    }

    this.addaudit(editForm.action, formData, editForm.description).subscribe();
    return this.http.post<any[]>(editForm.url!, formData);
  }

  get_detalle_catalogo(apeId: string): Observable<Catalogo[]> {
    const url = environment.baseUrlApiPaseExpress + '/getdbdialog';
    const formData = new FormData();
    formData.append('apeid', apeId);
    return this.http.post<Catalogo[]>(url, formData);
  }

  get_estados_catalogo(apeId: string, cc_id: string): Observable<Estados[]> {
    const url = environment.baseUrlApiPaseExpress + '/getEstadoscapa';
    const formData = new FormData();
    formData.append('apeid', apeId);
    formData.append('cc_id', cc_id);

    return this.http.post<Estados[]>(url, formData);
  }

  send_estados(
    apeid: string,
    cc_id: string,
    activo_new: string,
    estado_new: string,
    pase_new: string
  ): Observable<any[]> {
    const url = environment.baseUrlApiPaseExpress + '/updateEstados';
    const formData = new FormData();
    formData.append('apeid', apeid);
    formData.append('cc_id', cc_id);
    formData.append('activo_new', activo_new);
    formData.append('estado_new', estado_new);
    formData.append('pase_new', pase_new);
    this.addaudit(
      'postEstados',
      formData,
      'Se edito el estado del servicio del catalogo'
    ).subscribe();
    return this.http.post<any[]>(url, formData);
  }

  postEstados(
    apeid: string,
    cc_id: string,
    activo_new: string,
    estado_new: string,
    pase_new: string
  ): Observable<any[]> {
    const url = environment.baseUrlApiPaseExpress + '/updateEstados';
    const formData = new FormData();
    formData.append('apeid', apeid);
    formData.append('cc_id', cc_id);
    formData.append('activo_new', activo_new);
    formData.append('estado_new', estado_new);
    formData.append('pase_new', pase_new);
    this.addaudit(
      'postEstados',
      formData,
      'Se edito el estado del servicio del catalogo'
    ).subscribe();
    return this.http.post<any[]>(url, formData);
  }

  getManifest(request: ManifestRequest): Observable<Manifest> {
    const url = `${this.userApiUrl}/manifest`;
    return this.http
      .post<Manifest>(url, request)
      .pipe(catchError(this.handleError));
  }

  editManifest(manifest: Content | string, rep: string): Observable<any> {
    const url = `${this.userApiUrl}/manifest/${rep}`;
    return this.http
      .post<any>(url, manifest)
      .pipe(catchError(this.handleError));
  }

  //CMDB
  getRegistrosCmdb(): Observable<CMDB[]> {
    return this.http.get<any[]>(this.UrlApiCatalogoCmdb);
  }

  getCatalogos(): Observable<CMDBFORM> {
    return this.http.get<CMDBFORM>(this.UrlApiCatalogoCmdb + '/get_catalogos');
  }

  getJoya(app: string): Observable<any[]> {
    const formData = new FormData();
    formData.append('app', app);
    return this.http.post<any>(this.UrlApiCatalogoCmdb + '/get_joya', formData);
  }

  createRecord(registro: CMDB) {
    this.addaudit(
      'createRecord',
      JSON.stringify(registro),
      'Se agrega el registro de la CMDB'
    ).subscribe();
    return this.http.post(this.UrlApiCatalogoCmdb + '/create', registro);
  }

  editRecord(registro: CMDB) {
    this.addaudit(
      'editRecord',
      JSON.stringify(registro),
      'Se edito el registro CMDB'
    ).subscribe();
    return this.http.post<any>(this.UrlApiCatalogoCmdb + '/edit', registro);
  }

  deleteRecord(item: CMDBDelete) {
    let endPoint = `${this.UrlApiCatalogoCmdb}/delete`;
    this.addaudit(
      'deleteRecord',
      JSON.stringify(item),
      'Se elimina el registro de la CMDB'
    ).subscribe();
    return this.http.post<any>(endPoint, item);
  }

  get_cmdb_report() {
    const url = environment.baseUrlApiCmdbReport;
    return this.http.get(url);
  }

  checkAccess(groups: string, app: string): Observable<any[]> {
    const body = {
      groups: groups,
      app: app,
    };

    return this.http.post<any>(this.loginApiUrl + '/check_access', body, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  reversaCompleta(
    crq: string,
    crqurl: string,
    nomb_estado: string
  ): Observable<any> {
    const fusuario = sessionStorage.getItem('fusuario') ?? '';
    let endPoint = `${environment.baseUrlApiLiberacion}/reversaCompleta`;

    const formData = new FormData();
    formData.append('CRQ', crq);
    formData.append('authu', fusuario);
    formData.append('crqurl', crqurl);
    formData.append('nomb_estado', nomb_estado.toLocaleLowerCase());
    formData.append('jobUrl', 'reversaCompleta');
    return this.http
      .post(endPoint, formData, {
        responseType: 'text', // <- clave: el backend devuelve texto ("Ejecutado")
        // opcional: si el backend decide devolver JSON más adelante, ver Solución 3
      })
      .pipe(
        timeout(180_000),
        catchError((err) => {
          if (err.name === 'TimeoutError') {
            return throwError(
              () =>
                new Error(
                  'La petición excedió el tiempo máximo de espera (180s).'
                )
            );
          }
          return throwError(() => err);
        })
      );
  }

  reversaElementos(
    crq: string,
    crqurl: string,
    elementos: string,
    nomb_estado: string
  ): Observable<any> {
    const fusuario = sessionStorage.getItem('fusuario') ?? '';
    let endPoint = `${environment.baseUrlApiLiberacion}/reversaElementos`;

    const formData = new FormData();
    formData.append('CRQ', crq);
    formData.append('authu', fusuario);
    formData.append('crqurl', crqurl);
    formData.append('elementos', elementos);
    formData.append('nomb_estado', nomb_estado.toLocaleLowerCase());
    formData.append('jobUrl', 'reversaElementos');

    return this.http
      .post(endPoint, formData, {
        responseType: 'text', // <- clave: el backend devuelve texto ("Ejecutado")
        // opcional: si el backend decide devolver JSON más adelante, ver Solución 3
      })
      .pipe(
        timeout(180_000),
        catchError((err) => {
          if (err.name === 'TimeoutError') {
            return throwError(
              () =>
                new Error(
                  'La petición excedió el tiempo máximo de espera (180s).'
                )
            );
          }
          return throwError(() => err);
        })
      );
  }
}
