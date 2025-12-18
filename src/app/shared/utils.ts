import { formatDate } from "@angular/common";
import { Credential } from "../core/interfaces/credential.interface";

export function formatDateRange(date: Date): { fecha: string, diaBusquedaFecha: string, listaFechaInicial: string, listaFechaFinal: string } {
  const fecha = formatDate(date, 'dd/MM/yyyy', 'en-US');
  const diaBusquedaFecha = formatDate(date, 'dd', 'en-US');
  const listaFechaInicial = `${fecha} 00:00:00`;
  const listaFechaFinal = `${fecha} 23:59:59`;

  return { fecha, diaBusquedaFecha, listaFechaInicial, listaFechaFinal };
}


export function setGeneralCredential(date:Date): Credential {

  const { fecha, diaBusquedaFecha, listaFechaInicial, listaFechaFinal } = formatDateRange(date);

  return {
    id: '',
    type: '',
    usuario: sessionStorage.getItem("fusuario") ?? "",
    password: sessionStorage.getItem("fpassword") ?? "",
    timeinicio: listaFechaInicial,
    tiempofinal: listaFechaFinal
  }
}

const cadenaJfrog:string = "Elementos en Jfrog:";

export function setElementList(element: string): string {
  const crq_elements =  element.split("Elementos en el CRQ Artifacts:")[1].split(cadenaJfrog);
  const jfrog_elements = element.split(cadenaJfrog)[1].trim();



  // Obtener los elementos entre las dos partes y eliminar los caracteres de nueva línea
  const elementos = crq_elements[0].trim().split("\n").map((elemento: string) => elemento.trim()).filter((elemento: string) => elemento !== "");

  const crq_list_items = elementos.map((item: string) => `<li>CRQ: ${item}</li>`).join("");
  const jfrog_list_items = jfrog_elements.split("\n").map((item: string) => `<li>Jfrog: ${item}</li>`).join("");

  const ul_list = `<ul>${crq_list_items}${jfrog_list_items}</ul>`;

  return ul_list;
}


export function getUrlFromA(html:string): string{
  const htmlString = html;
  const urlMatch = htmlString.match(/href="([^"]*)"/);
  const url = urlMatch ? urlMatch[1] : '';
  return url
}


export function setElementListJfrogCrq(element: string): string[][] {
  const cadenaJfrog = "Elementos en Jfrog:";

  const crq_elements = element
    .split("Elementos en el CRQ Artifacts:")[1]
    .split(cadenaJfrog)[0]
    .trim()
    .split("\n")
    .map((e) => e.trim())
    .filter((e) => e !== "");

  const jfrog_elements = element
    .split(cadenaJfrog)[1]
    .trim()
    .split("\n")
    .map((e) => e.trim())
    .filter((e) => e !== "");

  return [crq_elements, jfrog_elements];
}


export function getRepUrl(url: string): string | null {
  const regex = /REP-\d+/;
  const match = url.match(regex);

  return match ? match[0] : null;
}

export function setDateFormatCRQTracking (date: any){
  const { fecha, diaBusquedaFecha, listaFechaInicial, listaFechaFinal } = formatDateRange(date);
  const dateParts = fecha.split('/');
  const day = dateParts[0];
  const month = dateParts[1];
  const year = dateParts[2];
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

export function getJfrogUrl(htmlString:string){
  const urlRegex = /href='([^']*)'/;
  const match = htmlString.match(urlRegex);

  if (match && match[1]) {
    const url = match[1];
    return url
  } else {
    console.error('No se pudo extraer la URL');
    return ""
  }
}

export function filterData(data: any[], value: string, key:string): any[] {
  if (!value || !data) return data;

  const lowerValue = value.toLowerCase();

  const filtered = data.filter(item =>
    Object.values(item).some(field =>
      typeof field === 'string' && field.toLowerCase().includes(lowerValue)
    )
  );
  return filtered.length > 0 ? filtered : [];
}



