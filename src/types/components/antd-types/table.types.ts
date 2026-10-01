import type { Key } from "react";
import type { ColumnsType } from "antd/es/table";

export interface DataTableProps<T extends Record<string, unknown> = Record<string, unknown>> {
  columns: ColumnsType<T>;
  data: T[];
  className?: string;
  pageSize?: number | null;
  selectedRows?: string[] | number[] | null;
  setSelectedRows?: ((keys: Key[]) => void) | null;
  currentPage?: number | null;
  setCurrentPage?: ((page: number) => void) | null;
  total?: number | null;
  loading?: boolean;
  rowClassName?: string | ((record: T, index: number) => string);
  customStyles?: string;
  rowKeyProp?: string;
  filterFunction?: ((record: T) => boolean) | null;
}
