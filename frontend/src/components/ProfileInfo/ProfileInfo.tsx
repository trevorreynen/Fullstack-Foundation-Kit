// import ProfileInfo from '@/components/ProfileInfo/ProfileInfo'

// ====================< IMPORTS: REACT >=================================

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import { Avatar, Box, Divider, Paper, Stack, Typography } from '@mui/material'

// ====================< IMPORTS: TYPES >=================================
import { UserProfile } from '@/types'

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================


export default function ProfileInfo({ user }: { user: UserProfile }) {



  return (
    // TODO: Decide to keep or remove custom classes when not using custom style sheets.
    <Paper
      className='ProfileInfo'
      elevation={3}
      sx={{
        display: 'flex', alignItems: 'center', width: '100%', maxHeight: '200px', mb: 3, px: { xs: 1, sm: 4 }, py: { xs: 1, sm: 2 }
      }}
    >

      <Stack
        direction='row'
        divider={<Divider orientation='vertical' flexItem />}
        spacing={2}
        sx={{ width: '100%', height: '100%' }}
      >
        <Avatar
          src={`${process.env.API_BASE!.replace('/api', '')}${user.profileIconUrl || '/uploads/default-profile-icon.png'}`}
          draggable={false}
          sx={{ width: { xs: 50, sm: 100 }, height: { xs: 50, sm: 100 }, alignSelf: 'center' }}
        />
        <Stack sx={{ width: '100%', height: '100%' }}>
          <Typography variant='h3' fontWeight={600} sx={{ fontSize: { xs: '24px', sm: '40px' } }}>{user.username}</Typography>
          <Box sx={{ fontSize: { xs: '12px', sm: '14px' } }}>
            Just an example filler description nothing more. If only this was much bigger<br />
            Things were super well done and clean.<br />
            Born to gods
          </Box>
        </Stack>
      </Stack>


    </Paper>
  )
}
