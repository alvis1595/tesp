export interface CRQStoDay {
  key: number;
  Cambio: string;
  Fecha: string;
  JFROG: Jfrog; // Cambiado de string a Jfrog
  Prioridad: string;
  Tipo: string;
  Estado: string;
  Clase: string;
  Grupoinformador: string;
  Implementador: string;
  expand: boolean;
  children: Child[];
}

export interface CRQSReport {
  key:           number;
  Cambio:        string;
  Fecha:         string;
  Descripcion:   string;
  Beneficio:     string;
  Solicitante:   string;
  Implementador: string;
  Producto:      string;
  Estado:        string;
  expand:        boolean;
  children:      Child[];
}

export interface Child {
  key:                     number;
  JustificacionDelNegocio: string;
  Elementos:               string;
  enlaceJfrog:             string;
}


interface Jfrog {
  status: 'Abierto' | 'PENDING' | 'DONE';
}

