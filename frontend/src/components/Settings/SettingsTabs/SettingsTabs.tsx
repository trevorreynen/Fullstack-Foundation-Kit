// import SettingsTabs from '@/components/Settings/SettingsTabs/SettingsTabs'

// ====================< IMPORTS: REACT >=================================

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================

// ====================< IMPORTS: TYPES >=================================
import { SettingsTabsProps } from '@/types/SettingsTabsTypes'

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================
import './SettingsTabs.scss'


export default function SettingsTabs({ tabs, activeTab, onTabClick }: SettingsTabsProps) {


  return (
    <div className='SettingsTabs'>


      {tabs.map(tab => (
        <button
          key={tab}
          className={`tab-button ${tab === activeTab ? 'active' : ''}`}
          onClick={() => onTabClick(tab)}
        >
          {tab}
        </button>
      ))}


    </div>
  )
}
