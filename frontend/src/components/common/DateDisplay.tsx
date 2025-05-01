// import DateDisplay from '@/components/common/DateDisplay'

// ====================< IMPORTS: REACT >=================================

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import { Box, Tooltip, Typography } from '@mui/material'

// ====================< IMPORTS: TYPES >=================================

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================
import { convertISO8601ToFormatted } from '@/utils/usefulFunctions'

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================


interface DateDisplayProps {
  createdAt: string
  updatedAt?: string | null
}


export default function DateDisplay({ createdAt, updatedAt }: DateDisplayProps) {
  // 1. Created date logic.
  const createdDate = convertISO8601ToFormatted(createdAt, { showTime: false })
  const createdDateTime = convertISO8601ToFormatted(createdAt)

  // 2. Edited date logic.
  const editedDate = updatedAt ? convertISO8601ToFormatted(updatedAt, { showTime: false }) : null
  const editedDateTime = updatedAt ? convertISO8601ToFormatted(updatedAt) : null

  // 3. Display label logic.
  const showEdited = !!editedDate
  const displayLabel = showEdited ? 'Edited: ' : 'Created: '


  // 4. Render date display & tooltip.
  return (
    <Tooltip
      title={
        <Box sx={{ fontFamily: "'Inconsolata', monospace" }}>
          {editedDateTime && (
            <Typography variant='caption' sx={{ fontFamily: 'inherit', fontSize: '14px', fontWeight: 'bold' }}>
              Edited:&nbsp;&nbsp;{editedDateTime}
            </Typography>
          )}
          {editedDateTime && <br />}
          <Typography variant='caption' sx={{ fontFamily: 'inherit', fontSize: '14px' }}>Created: {createdDateTime}</Typography>
        </Box>
      }
      sx={{ fontFamily: "'Inconsolata', monospace", fontSize: '16px' }}
    >


      <Typography variant='caption' color='text.secondary'>
        {displayLabel}
        {editedDate || createdDate}
      </Typography>


    </Tooltip>
  )
}
