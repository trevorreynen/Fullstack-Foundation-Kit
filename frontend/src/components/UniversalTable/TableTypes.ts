
export type RowData = Record<string, any>


export type ColumnConfig = {
  key: string // Data key in row object
  label: string // Optional display label for the header
  type?: 'text' | 'input' | 'checkbox' | 'dropdown' | 'custom' // Cell type rendering
  editable?: boolean
  options?: string[] // Used for dropdowns
  className?: string | ((value: any, row: RowData, rowIndex: number) => string)
  width?: string | number

  textStyle?: {
    align?: 'left' | 'center' | 'right'
    fontSize?: string | number
    wrap?: boolean
  }

  // Allows specific formatting for a cell.
  format?: (value: any, row: RowData, rowIndex: number) => string
  render?: (value: any, row: RowData, rowIndex: number) => React.ReactNode

  // Optional per-cell config
  colSpan?: number | ((value: any, row: RowData, rowIndex: number) => number)
  rowSpan?: number | ((value: any, row: RowData, rowIndex: number) => number)

  // (optional) override cellType for fine-grain control
  cellType?: 'normal' | 'header' | ((value: any, row: RowData, rowIndex: number) => 'normal' | 'header')
}


export type UniversalTableProps = {
  columns: ColumnConfig[] // Column config
  data: RowData[] // Rows of data
  onChange?: (rowIndex: number, key: string, value: any) => void
  customHeaderRows?: React.ReactNode[] // Custom header rows. Used to add a header row in the middle of the table.
  showCoordinates?: boolean
}


export type TableCellProps = {
  column: ColumnConfig
  value: any
  row: RowData
  rowIndex: number
  colIndex: number
  onChange?: (value: any) => void
  isSelected?: boolean
  setSelectedCell?: (cell: { row: number; col: number } | null) => void
  editingCell?: { row: number; col: number } | null
  setEditingCell?: (cell: { row: number; col: number } | null) => void
  colSpan?: number
  rowSpan?: number
}
