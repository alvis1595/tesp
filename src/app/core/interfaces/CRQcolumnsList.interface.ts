import { NzTableFilterList } from "ng-zorro-antd/table";

export interface CRQcolumns {
  columns?: Column[];
}

export interface Column {
  title:          string;
  key:            string;
  filtro_visible: boolean;
  listOfFilter:   NzTableFilterList;
  filterMultiple: boolean;
  fixed: "left" | "right";
  filterFn: FilterFn
}



interface FilterFn {
  (list: string, item: any): boolean;
}
