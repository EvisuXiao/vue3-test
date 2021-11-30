export interface ServerSideOption {
  enabled?: boolean
  dataKey?: string
  totalKey?: string
}

interface ToolBtn {
  label: string
  icon?: string
}

export interface TableToolBtn extends ToolBtn {
  visible?: boolean
  handler: () => void
}

export interface RowToolBtn extends ToolBtn {
  visible?: (row: any) => boolean
  handler: (row: any) => void
}
