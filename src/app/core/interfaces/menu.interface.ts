export interface Menu {
  name: string;
  icon: string;
  url?: string;
  children: Children[];
}

export interface Children {
  name: string;
  url: string;
}
