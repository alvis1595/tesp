export interface Manifest {
  manifest: Content
  status: string
}

export interface Technology {
  type?: string
  "application-name": string
  artifact: string
  repository: string
  deployOrder?: number
  parallelism?: boolean
  skipRegions?: string[];
}

export interface Content {
  area: string;
  date: string;
  request: string;
  team: string;
  areas?: string;
  crq?: string;
  fecha?: string;
  tecnology?: Technology | object;
  mesa?: string;
  status?: string;
  last_modified?: string;
  customOrder?: boolean
}

export interface ManifestRequest {
    "REP": string,
    "ENV": string
}

export interface RepoFlat {
  tech: string;
  repository: string;
  "application-name": string;
  artifact: number;
  parallelism: boolean;
  deployOrder?: number;
  skipRegions?: string[];
}