// import { TABS, Tab, SettingsTabsProps } from '@/types/SettingsTabsTypes'


export const TABS = ['Theme', 'Profile Icon', 'Notifications', 'Notes'] as const


export type Tab = typeof TABS[number]


export interface SettingsTabsProps {
  tabs: readonly Tab[]
  activeTab: Tab
  onTabClick: (tab: Tab) => void
}
