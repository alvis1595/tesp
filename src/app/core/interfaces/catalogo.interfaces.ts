export interface Catalogo {
  id?: number
  ape_id: string
  aplicacion: string
  equipo_resp_desa: string
  equipo_resp_infra: string
  expand?: boolean
  descripcion?: string
  estadodc?: string
  requiere_pase_comp?: string
  activo?: string
  cc_id?: number;
}


export interface Estados {
  activo: string
  estadodc: string
  requiere_pase_comp: string
}
