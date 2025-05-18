// import UserAvatar from '@/components/shared/UserAvatar'

// ====================< IMPORTS: REACT >=================================

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import { Avatar } from '@mui/material'

// ====================< IMPORTS: TYPES >=================================

// ====================< IMPORTS: CONTEXTS/HOOKS >========================


// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================
import { SxProps, Theme } from '@mui/material/styles'


type UserAvatarSize = 64 | 128 | 256 | 'original'

interface UserAvatarProps {
  profileIconKey: string | null
  urlSize: UserAvatarSize
  renderSize?: string | number
  draggable?: boolean
  alt?: string
  sx?: SxProps<Theme>
}


export default function UserAvatar({ profileIconKey, urlSize = 64, renderSize, alt, sx = {}, draggable = false }: UserAvatarProps) {
  // Get base URL and avatar path.
  if (!process.env.API_BASE) {
    throw new Error('Missing API_BASE in env')
  }

  // Avatar image URL based on key + size (or fallback to default avatar).
  const baseUrl = process.env.API_BASE.replace('/api', '')
  const suffix = urlSize === 'original' ? 'original' : `${urlSize}x${urlSize}`
  const src = profileIconKey
    ? `${baseUrl}/uploads/profile-icons/${profileIconKey}-${suffix}.webp`
    : `${baseUrl}/uploads/default-profile-icon.png`


  // Render user avatar.
  return (
    <Avatar
      src={src}
      alt={alt}
      draggable={draggable}
      sx={{
        width: renderSize,
        height: renderSize,
        ...sx,
      }}
    />
  )
}
