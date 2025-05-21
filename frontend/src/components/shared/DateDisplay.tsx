// import DateDisplay from '@/components/shared/DateDisplay'

// ====================< IMPORTS: REACT >=================================

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import { Box, Tooltip, Typography } from '@mui/material'

// ====================< IMPORTS: TYPES >=================================
import { DateDisplayProps } from '@/types'

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================
import { convertISO8601ToFormatted } from '@/utils/usefulFunctions'

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================


export default function DateDisplay({
  createdAt,
  updatedAt,
  showLabel = true,
  displayFontSize = 16,
  withTooltip = true,
  tooltipFontSize = 14
}: DateDisplayProps) {
  // Format created date (short and full versions).
  const createdDate = convertISO8601ToFormatted(createdAt, { showTime: false })
  const createdDateTime = convertISO8601ToFormatted(createdAt)

  // Format edited date if available.
  const editedDate = updatedAt ? convertISO8601ToFormatted(updatedAt, { showTime: false }) : null
  const editedDateTime = updatedAt ? convertISO8601ToFormatted(updatedAt) : null

  // Determine label and editing state.
  const isEdited = updatedAt && updatedAt !== createdAt
  const displayLabel = isEdited ? 'Edited: ' : 'Created: '

  // Render formatted date text (with optional label).
  const dateText = (
    <Typography variant='caption' color='text.secondary' sx={{ fontSize: displayFontSize }}>
      {showLabel && displayLabel}
      {editedDate || createdDate}
    </Typography>
  )

  // Render date display with no tooltip if withTooltip is false.
  if (!withTooltip) {
    return dateText
  }


  // Render date display & tooltip.
  return (
    <Tooltip
      title={
        <Box>
          {isEdited && (
            <>
              <Typography sx={{ fontSize: tooltipFontSize, fontWeight: 'bold' }}>
                Edited: {editedDateTime}
              </Typography>
              <br />
            </>
          )}
          <Typography sx={{ fontSize: tooltipFontSize }}>Created: {createdDateTime}</Typography>
        </Box>
      }
      sx={{ fontSize: '16px' }}
    >
      {dateText}
    </Tooltip>
  )
}
