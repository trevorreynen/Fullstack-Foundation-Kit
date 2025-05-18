// import Settings from '@/pages/Settings/Settings'

// ====================< IMPORTS: REACT >=================================
import { useState, useEffect } from 'react'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import { Box, Divider, Tab, Tabs, Typography } from '@mui/material'
import AccountSettings from '@/components/settings/AccountSettings'
import NotificationSettings from '@/components/settings/NotificationSettings'
import ProfileImageSettings from '@/components/settings/ProfileImageSettings'
import ThemeSettings from '@/components/settings/ThemeSettings'
import UserNotes from '@/components/settings/UserNotes'
import FullPageLoader from '@/components/loading/FullPageLoader'

// ====================< IMPORTS: TYPES >=================================

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================
import { api } from '@/utils/api'

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================


function TabPanel({ children, value, index }: { children: React.ReactNode, value: number, index: number }) {
  return value === index ? <Box sx={{ mt: 3 }}>{children}</Box> : null
}


export default function Settings() {
  // Local tab state.
  const [activeTab, setActiveTab] = useState(0)

  // Local loading state.
  const [loading, setLoading] = useState(true)

  // Local settings state.
  const [settings, setSettings] = useState<{
    theme: string
    notificationsEnabled: boolean
    customNote: string
  } | null>(null)

  // Fetch settings on load
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api('/settings', { method: 'GET' })
        setSettings(res.data)
      } catch (err) {
        console.error('Failed to fetch settings:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [])

  // Handle changing tab.
  const handleTabChange = (_: any, newValue: number) => {
    setActiveTab(newValue)
  }

  // Handle loading and invalid settings fallbacks.
  if (loading || !settings) {
    return <FullPageLoader />
  }


  // Render settings page.
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: { xs: '95%', sm: '85%', md: '70%', lg: '65%' },
        px: { xs: 0, sm: 2 }, py: { xs: 1, sm: 2 },
        mx: 'auto'
      }}
    >


      <Typography variant='h5' fontWeight={600} sx={{ mb: 2 }}>Settings</Typography>

      <Divider />

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant='scrollable'
        scrollButtons='auto'
        sx={{ mt: 2 }}
      >
        <Tab label='Account' />
        <Tab label='Profile Image' />
        <Tab label='Notifications' />
        <Tab label='Theme' />
        <Tab label='Notes' />
      </Tabs>

      <Divider />

      <TabPanel value={activeTab} index={0}><AccountSettings /></TabPanel>
      <TabPanel value={activeTab} index={1}><ProfileImageSettings /></TabPanel>
      <TabPanel value={activeTab} index={2}><NotificationSettings initialNotifications={settings?.notificationsEnabled ?? true} /></TabPanel>
      <TabPanel value={activeTab} index={3}><ThemeSettings /></TabPanel>
      <TabPanel value={activeTab} index={4}><UserNotes initialNote={settings.customNote} /></TabPanel>


    </Box>
  )
}
