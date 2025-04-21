// import ProfileInfo from '@/components/ProfileInfo/ProfileInfo'

// ====================< IMPORTS: REACT >=================================

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================

// ====================< IMPORTS: TYPES >=================================
import { UserProfile } from '@/types/ProfilePageTypes'

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================
import './ProfileInfo.scss'


export default function ProfileInfo({ user }: { user: UserProfile }) {



  return (
    <div className='ProfileInfo'>

      <div className='profile-icon-wrapper'>
        <img
          src={`${process.env.API_BASE!.replace('/api', '')}${user.profileIconUrl}`}
          alt='Profile'
          className='profile-icon'
          draggable={false}
        />
      </div>
      <div className='right-content'>
        <div className='username-wrapper'>
          <h2 className='profile-username'>{user.username}</h2>
        </div>
        <div className='user-description-wrapper'>
          <div className='user-description'>
            Just an example filler description nothing more. If only this was much bigger<br />
            Things were super well done and clean.<br />
            Born to gods
          </div>
        </div>
      </div>


    </div>
  )
}
