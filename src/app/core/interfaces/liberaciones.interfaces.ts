export interface Liberaciones {
    key?:           number;
    Rep?:           string;
    Cambio?:        string;
    Fecha?:         Date;
    Prioridad?:     Prioridad;
    Tipo?:          Tipo;
    Estado?:        Estado;
    Clase?:         Clase;
    Descripcion?:   string;
    Implementador?: string;
    JFROG?:         Jfrog;
    SERVICIO?:      string;
    expand?:        boolean;
    Fecha_Ejecucion?: any;
    children?:      Child[];
    Entorno?:       Entorno;
    Usuario?: string;
    pipelines: any[];
}

export enum Clase {
    Normal = "Normal",
}

export enum Estado {
    EnEjecuciónDelCambio = "En ejecución del cambio",
    EnRevisiónPostEjecución = "En revisión post ejecución",
}

export enum Jfrog {
    Done = "DONE",
}

export enum Entorno {
    produccion = "Producción",
    contingencia = "Contingencia",
}

export enum Prioridad {
    Medium = "Medium",
}

export enum Tipo {
    DiaADiaFuncional = "Dia a Dia / Funcional",
    DiaADiaScript = "Dia a Dia / Script",
    EstabilizaciónFuncional = "Estabilización / Funcional",
}

export interface Child {
    key?:                     number;
    JustificacionDelNegocio?: string;
    Elementos?:               string;
    enlaceJfrog?:             string;
}
