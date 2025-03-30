// =========================< IMPORTS: REACT >=================================
import { useState, useEffect, useRef } from 'react'

// =========================< IMPORTS: OTHER >=================================
import { TableCellProps } from './TableTypes'
import { classNames, colIndexToLetter, normalizeTableColumnWidth } from '@/utils/usefulFunctions'


/**
 * Renders an individual table cell.
 *
 * Supports multiple types:
 *  - 'text' (default): click to edit
 *  - 'checkbox': toggles boolean
 *  - 'dropdown': shows select menu from column.options
 */
export default function UniversalTableCell({ column, value, row, rowIndex, colIndex, onChange, isSelected, setSelectedCell, editingCell, setEditingCell, colSpan, rowSpan }: TableCellProps) {
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(false)
  const [localValue, setLocalValue] = useState(value ?? '')


  const colLetter = colIndexToLetter(colIndex)
  const cellId = `${colLetter}${rowIndex + 1}`


  const alignStyle = { textAlign: column.textStyle?.align ?? 'left' }
  const fontSizeStyle = column.textStyle?.fontSize ? { fontSize: column.textStyle.fontSize } : {}
  const wrapStyle = column.textStyle?.wrap === false ? { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } : {}
  const normalizeColWidth = normalizeTableColumnWidth(column.width)
  const widthStyle = normalizeColWidth ? { width: normalizeColWidth } : {}


  const computedClassName = typeof column.className === 'function'
    ? column.className(value, row, rowIndex)
    : column.className


  // Determine if the cell is editable.
  const isEditable = typeof column.editable === 'boolean' ? column.editable : (column.type === 'input' || column.type === 'dropdown')
  // Display value uses formatting if defined.
  const formattedValue = column.format ? column.format(value, row, rowIndex) : value


  // Combined props for the td element.
  const cellProps = {
    style: { ...alignStyle, ...widthStyle, ...wrapStyle, ...fontSizeStyle },
    className: classNames(computedClassName, {
      editing: editing || open,
      selected: isSelected,
      'selected-editable': isSelected && isEditable,
    }),
    'data-row': rowIndex + 1,
    'data-col': colLetter,
    'data-cell': cellId,
    onClick: (e: React.MouseEvent) => {
      e.stopPropagation()
      setSelectedCell?.({ row: rowIndex, col: colIndex })
    },
    colSpan,
    rowSpan,
  }


  // Sync localValue when the external value changes.
  useEffect(() => {
    setLocalValue(value ?? '')
  }, [value, rowIndex])


  // Global listener to close dropdown/editing.
  useEffect(() => {
    const close = () => {
      setEditing(false)
      setOpen(false)
    }
    setTimeout(() => {
      document.addEventListener('click', close)
    }, 0)
    return () => document.removeEventListener('click', close)
  }, [editingCell, rowIndex, colIndex])


  // If the global editingCell changes and does not match this cell, ensure we're not editing.
  useEffect(() => {
    if (!editingCell || (editingCell.row !== rowIndex || editingCell.col !== colIndex)) {
      setEditing(false)
    }
  }, [editingCell, rowIndex, colIndex])


  // ===========================< TEXT CELL >=================================
  // In the input cell, we trigger editing only on double-click.
  if (column.type === 'input') {
    return (
      <td
        {...cellProps}
        onDoubleClick={() => {
          if (isEditable) {
            setEditing(true)
            setEditingCell?.({ row: rowIndex, col: colIndex })
          }
        }}
      >
        {isEditable && editing ? (
          <input
            type='text'
            value={localValue}
            autoFocus
            onChange={(e) => {
              const raw = e.target.value
              setLocalValue(raw)
              onChange?.(raw)
            }}
            onBlur={() => {
              setEditing(false)
              setEditingCell?.(null)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                (e.target as HTMLInputElement).blur()
              }
              if (e.key === 'Escape') {
                setEditing(false)
                setLocalValue(value ?? '')
                setEditingCell?.(null)
              }
            }}
            style={{
              width: '100%',
              height: '100%',
              textAlign: column.textStyle?.align,
              font: 'inherit',
            }}
          />
        ) : (formattedValue)}
      </td>
    )
  }


  // =========================< CHECKBOX CELL >===============================
  if (column.type === 'checkbox') {
    return (
      <td {...cellProps}>
        {isEditable ? (
          <input
            type='checkbox'
            checked={!!value}
            onChange={(e) => onChange?.(e.target.checked)}
          />
        ) : value ? '✔' : ''}
      </td>
    )
  }


  // =========================< DROPDOWN CELL >===============================
  if (column.type === 'dropdown') {
    // Close this dropdown if another cell is editing.
    useEffect(() => {
      if (editingCell && (editingCell.row !== rowIndex || editingCell.col !== colIndex)) {
        setOpen(false)
      }
    }, [editingCell, rowIndex, colIndex, column.type])

    return (
      <td
        {...cellProps}
        onClick={(e) => {
          e.stopPropagation()
          setSelectedCell?.({ row: rowIndex, col: colIndex })
        }}
        onDoubleClick={() => {
          if (isEditable) {
            setOpen(true)
            setEditingCell?.({ row: rowIndex, col: colIndex })
          }
        }}
      >
        <div className={`gs-dropdown-wrapper ${open ? 'open' : ''}`}>
          <span className='gs-value'>{value}</span>

          {!open && (
            <div
              className='caret-container'
              onClick={(e) => {
                e.stopPropagation()
                setOpen(true)
              }}
            >
              <div className='gs-caret' />
            </div>
          )}

          {open && (
            <div className='gs-dropdown-menu'>
              {(column.options || []).map((opt) => (
                <div
                  key={opt}
                  className='gs-dropdown-item'
                  onClick={() => {
                    onChange?.(opt)
                    setOpen(false)
                  }}
                >
                  {opt}
                </div>
              ))}
            </div>
          )}
        </div>
      </td>
    )
  }


  if (column.cellType === 'header') {
    return <th {...cellProps}>{formattedValue}</th>
  }


  return (
    <td {...cellProps}>
      {column.render ? column.render(value, row, rowIndex) : formattedValue}
    </td>
  )
}
