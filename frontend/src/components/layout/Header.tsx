// import Header from '@/components/layout/Header'

// ====================< IMPORTS: REACT >=================================
import { useState, MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Tooltip, Chip, Menu, MenuItem } from '@mui/material'
import UserAvatar from '@/components/shared/UserAvatar'
import DropdownMenu from '@/components/dropdown/DropdownMenu'

// ====================< IMPORTS: TYPES >=================================

// ====================< IMPORTS: CONTEXTS/HOOKS >========================
import { useGlobalUI } from '@/hooks/useGlobalUI'
import { useUser } from '@/hooks/useUser'

// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import AddIcon from '@mui/icons-material/Add'
import CheckIcon from '@mui/icons-material/Check'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp'
import NightlightRoundIcon from '@mui/icons-material/NightlightRound'
import SettingsIcon from '@mui/icons-material/Settings'


const pages = [
  { label: 'Landing', path: '/' },
  { label: 'Explore', path: '/explore' },
  { label: 'About', path: '/about' },
]


export default function Header() {
  // React router navigate hook.
  const navigate = useNavigate()

  // Global authenticated user context.
  const { user, logoutUser } = useUser()

  // Global theme management via UI context.
  const { theme, setTheme } = useGlobalUI()

  // Anchor element state for mobile nav dropdown.
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

  // Nav menu open/close handlers.
  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => setAnchorElNav(event.currentTarget)
  const handleCloseNavMenu = () => setAnchorElNav(null)


  // Render header.
  return (
    <AppBar position='static' color='inherit' elevation={6} sx={{ height: '56px', maxHeight: '56px', minHeight: '56px' }}>
      <Toolbar color='inherit' sx={{ justifyContent: 'space-between', position: 'relative', maxHeight: '56px', minHeight: '56px !important' }}>


        <Box display='flex' alignItems='center' gap={2} color='inherit'>
          <Box color='inherit' sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              color='inherit'
              aria-label='Nav Menu'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              color='inherit'
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map(({ label, path }) => (
                <MenuItem
                  key={path}
                  color='inherit'
                  onClick={() => {
                    navigate(path)
                    handleCloseNavMenu()
                  }}>
                  <Typography textAlign='center' color='inherit'>
                    {label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box color='inherit' sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(({ label, path }) => (
              <Button key={path} color='inherit' onClick={() => navigate(path)} sx={{ my: 2, color: 'inherit', display: 'block' }}>
                {label}
              </Button>
            ))}
          </Box>
        </Box>


        <Box
          color='inherit'
          sx={{
            display: { xs: 'none', sm: 'none', md: 'block' },
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}>
          <Typography variant='h5'>Test Project by Trevor Reynen</Typography>
        </Box>


        <Box display='flex' alignItems='center' gap={2} color='inherit'>
          {!user ? (
            <>
              <DropdownMenu
                button={
                  <Tooltip color='inherit' title='Settings'>
                    <IconButton color='inherit'>
                      <MoreVertSharpIcon />
                    </IconButton>
                  </Tooltip>
                }
                items={[
                  {
                    type: 'submenu',
                    label: 'Appearance',
                    icon: <NightlightRoundIcon fontSize='small' />,
                    submenu: [
                      { type: 'item-text', label: 'Setting applies to this browser only' },
                      {
                        type: 'item',
                        label: 'Dark theme',
                        icon: theme === 'dark' ? <CheckIcon fontSize='small' /> : <CheckIcon fontSize='small' sx={{ visibility: 'hidden' }} />,
                        onClick: () => setTheme('dark'),
                      },
                      {
                        type: 'item',
                        label: 'Light theme',
                        icon: theme === 'light' ? <CheckIcon fontSize='small' /> : <CheckIcon fontSize='small' sx={{ visibility: 'hidden' }} />,
                        onClick: () => setTheme('light'),
                      },
                      {
                        type: 'item',
                        label: 'System',
                        icon: theme === 'system' ? <CheckIcon fontSize='small' /> : <CheckIcon fontSize='small' sx={{ visibility: 'hidden' }} />,
                        onClick: () => setTheme('system'),
                      },
                    ],
                  },
                  { type: 'divider' },
                  { type: 'item', label: 'Settings', onClick: () => {}, icon: <SettingsIcon fontSize='small' /> },
                ]}
              />

              <Chip avatar={<AccountCircleIcon />} label='Sign In' variant='outlined' color='info' onClick={() => navigate('/login')} />
            </>
          ) : (
            <>
              <Chip
                avatar={<AddIcon />}
                label='Create Post'
                variant='outlined'
                onClick={() => navigate('/create', { state: { backgroundLocation: { pathname: location.pathname, search: location.search, hash: location.hash } } })}
              />

              <DropdownMenu
                button={
                  <UserAvatar
                    profileIconKey={user.profileIconKey}
                    urlSize={64}
                    renderSize={40}
                    draggable={false}
                  />
                }
                items={[
                  { type: 'header', username: user.username, profileIconKey: user.profileIconKey, onViewProfile: () => navigate(`/user/${user.username}`) },
                  { type: 'divider' },
                  { type: 'item', label: 'Sign Out', onClick: () => logoutUser(), icon: <LogoutIcon fontSize='small' /> },
                  { type: 'divider' },
                  {
                    type: 'submenu',
                    label: 'Appearance',
                    icon: <NightlightRoundIcon fontSize='small' />,
                    submenu: [
                      { type: 'item-text', label: 'Setting applies to this browser only' },
                      {
                        type: 'item',
                        label: 'Dark theme',
                        icon: theme === 'dark' ? <CheckIcon fontSize='small' /> : <CheckIcon fontSize='small' sx={{ visibility: 'hidden' }} />,
                        onClick: () => setTheme('dark'),
                      },
                      {
                        type: 'item',
                        label: 'Light theme',
                        icon: theme === 'light' ? <CheckIcon fontSize='small' /> : <CheckIcon fontSize='small' sx={{ visibility: 'hidden' }} />,
                        onClick: () => setTheme('light'),
                      },
                    ],
                  },
                  { type: 'item', label: 'Settings', onClick: () => navigate('/settings'), icon: <SettingsIcon fontSize='small' /> },
                ]}
              />
            </>
          )}
        </Box>


      </Toolbar>
    </AppBar>
  )
}
