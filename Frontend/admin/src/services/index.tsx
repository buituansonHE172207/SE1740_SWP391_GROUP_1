import { TablePaginationConfig } from "antd";

export interface BaseQuery {
  page?: number;
  size?: number;
  sort_column?: string;
  sort_type?: string;
}

export interface TableParams {
  pagination?: TablePaginationConfig;
  // sortField?: string;
  // sortOrder?: string;
  // filters?: Record<string, FilterValue>;
}
