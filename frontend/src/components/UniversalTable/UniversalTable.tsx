// import UniversalTable from '@/components/Tables/UniversalTable/UniversalTable'

// =========================< IMPORTS: REACT >=================================
import React, { useState, useEffect, useRef } from 'react'

// =========================< IMPORTS: OTHER >=================================
import { colIndexToLetter, normalizeTableColumnWidth } from '@/utils/usefulFunctions'
import { UniversalTableProps } from './TableTypes'

// =========================< IMPORTS: COMPONENTS >============================
import UniversalTableCell from './UniversalTableCell'
import WidthTooltip from '@/components/WidthTooltip/WidthTooltip'

// =========================< IMPORTS: CSS >===================================
import './UniversalTable.scss'


/**
 * Main interactive spreadsheet-like table (W.I.P.).
 *
 * Features:
 * - Editable cells (text, checkbox, dropdown)
 * - Cell coordinate toggling (e.g., "A1")
 * - Custom headers with support for merged cells
 * - Auto-resizing support using ResizeObserver
 */
export default function UniversalTable({ data, columns, onChange, customHeaderRows }: UniversalTableProps) {
  // Tracks which cell is currently selected (for styling/highlighting)
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null)

  // Tracks which cell is in editing mode (for input/dropdown behavior)
  const [editingCell, setEditingCell] = useState<{ row: number; col: number } | null>(null)

  // Toggles display of column/row coordinate headers (like A1, B1, etc)
  const [showCoords, setShowCoords] = useState(false)

  // Measures container width for positioning coordinate toggle button
  const [tableWidth, setTableWidth] = useState(0)

  const tableRef = useRef<HTMLDivElement>(null)


  // Auto-track the width of the table container for positioning the toggle coords button.
  useEffect(() => {
    if (!tableRef.current) {
      return
    }

    const observer = new ResizeObserver(([entry]) => {
      setTableWidth(entry.contentRect.width)
    })

    observer.observe(tableRef.current)

    return () => observer.disconnect()
  }, [])


  // Reset cell selections on outside click or escape key.
  useEffect(() => {
    const handleClickOutside = () => {
      setSelectedCell(null)
      setEditingCell(null)
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCell(null)
        setEditingCell(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])


  // Global "Enter" key listener: only trigger if no cell is already in editing mode.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !editingCell) {
        // When Enter is pressed and no cell is editing, if a cell is selected and it is editable, we instruct that cell to edit.
        // We'll pass a prop (enterToEdit) down to the cell. (Here we simply set a flag in editingCell for the selected cell.)
        if (selectedCell) {
          setEditingCell({ ...selectedCell })
        }
      }
    }

    document.addEventListener('keydown', handler)

    return () => document.removeEventListener('keydown', handler)
  }, [selectedCell, editingCell])


  const headerRowCount = customHeaderRows?.length ?? 0


  return (
    <div className='UniversalTableWrapper'>


      <div className='UniversalTable' ref={tableRef}>
        <table>
          <thead>
            {/* Inject column coordinate row if showCoords is true */}
            {showCoords && (
              <tr className='coordinate-row'>
                <th className='coord-cell'></th>
                {columns.map((_, i) => (
                  <th key={`coord-${i}`} className='coord-cell'>
                    {colIndexToLetter(i)}
                  </th>
                ))}
              </tr>
            )}

            {/* Render all custom header rows, injecting coord-cell into the first */}
            {customHeaderRows?.map((row: any, headerRowIndex) => {
              const newChildren = React.Children.map(row.props.children, (child, j) => {
                const dataCol = colIndexToLetter(j)

                return React.cloneElement(child, {
                  key: `custom-col-${j}`,
                  'data-row': headerRowIndex + 1,
                  'data-col': dataCol,
                  'data-cell': `${dataCol}${headerRowIndex + 1}`,
                })
              })

              return (
                <tr key={`custom-header-${headerRowIndex}`}>
                  {showCoords && <th className='coord-cell'></th>}
                  {newChildren}
                </tr>
              )
            })}
          </thead>


          <tbody>
            {data.map((row, rowIndex) => {
              const renderedCols: React.ReactNode[] = []
              const skipMap = new Set<number>() // Track skipped columns for colSpan

              columns.forEach((col, colIndex) => {
                if (skipMap.has(colIndex)) {
                  return
                }

                const value = row[col.key]
                const colSpan = typeof col.colSpan === 'function' ? col.colSpan(value, row, rowIndex) : col.colSpan ?? 1
                const rowSpan = typeof col.rowSpan === 'function' ? col.rowSpan(value, row, rowIndex) : col.rowSpan ?? 1

                if (colSpan > 1) {
                  for (let i = 1; i < colSpan; i++) {
                    skipMap.add(colIndex + i)
                  }
                }

                renderedCols.push(
                  <UniversalTableCell
                    key={`${col.key}-${rowIndex}`}
                    value={value}
                    column={col}
                    row={row}
                    rowIndex={rowIndex + headerRowCount}
                    colIndex={colIndex}
                    onChange={(val) => onChange?.(rowIndex, col.key, val)}
                    isSelected={selectedCell?.row === rowIndex && selectedCell?.col === colIndex}
                    setSelectedCell={setSelectedCell}
                    editingCell={editingCell}
                    setEditingCell={setEditingCell}
                    colSpan={colSpan}
                    rowSpan={rowSpan}
                  />
                )
              })

              // Used to visually separate sections
              const separatorKeys = ['18'] // TODO: Add functionality to be able to add this as a prop.
              const rowKey = row.nutrient?.key ?? ''

              let rowClassName = ''

              if (row.isSubheader) {
                rowClassName = 'subheader-row'
              } else if (separatorKeys.includes(rowKey)) {
                rowClassName = 'section-separator'
              }

              return (
                <tr key={rowIndex} className={rowClassName}>
                  {showCoords && <td className='coord-cell'>{rowIndex + 1}</td>}
                  {renderedCols}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>


      {/* Toggle for coordinate headers */}
      <label className='toggle-coords' style={{ left: `${tableWidth + 6}px` }}>
        <input type='checkbox' checked={showCoords} onChange={(e) => setShowCoords(e.target.checked)} />
      </label>


    </div>
  )
}

