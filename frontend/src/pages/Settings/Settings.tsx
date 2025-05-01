// import Settings from '@/pages/Settings/Settings'

// ====================< IMPORTS: REACT >=================================
import { useState } from 'react'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import SettingsTabs from '@/components/Settings/SettingsTabs/SettingsTabs'
import ThemeSettings from '@/components/Settings/ThemeSettings/ThemeSettings'
import ProfileImageSettings from '@/components/Settings/ProfileImageSettings/ProfileImageSettings'
import NotificationSettings from '@/components/Settings/NotificationSettings/NotificationSettings'
import UserNotes from '@/components/Settings/UserNotes/UserNotes'

// ====================< IMPORTS: TYPES >=================================
import { TABS, Tab } from '@/types'

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================
import './Settings.scss'


export default function Settings() {
  const [activeTab, setActiveTab] = useState<Tab>('Theme')


  return (
    <div className='Settings'>


      <SettingsTabs tabs={TABS} activeTab={activeTab} onTabClick={setActiveTab} />
      <div className='settings-panel'>
        {activeTab === 'Theme' && <ThemeSettings />}
        {activeTab === 'Profile Icon' && <ProfileImageSettings />}
        {activeTab === 'Notifications' && <NotificationSettings />}
        {activeTab === 'Notes' && <UserNotes />}
      </div>


    </div>
  )
}
