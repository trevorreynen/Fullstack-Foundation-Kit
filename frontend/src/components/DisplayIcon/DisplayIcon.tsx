// import DisplayIcon from '@/components/DisplayIcon/DisplayIcon'

// ====================< IMPORTS: REACT >=================================
import { useState, useEffect, createContext, useContext, useMemo } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Link, useLocation } from 'react-router-dom'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================

// ====================< IMPORTS: TYPES >=================================

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================
import './DisplayIcon.scss'


interface IconProps {
  icon: string
  strokeWidth?: number
  color?: string
  width?: number | string
  height?: number | string
  className?: string
}


export default function DisplayIcon({
  icon,
  strokeWidth = 1.5,
  color = 'currentColor',
  width = 24,
  height = 24,
  className = ''
}: IconProps) {

  const commonProps = {
    width,
    height,
    stroke: color,
    strokeWidth,
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    className
  }


  switch (icon) {
    case 'arrow-left':
      // arrow-left (Dazzle).
      return (
        <svg {...commonProps}>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M5 12H19M5 12L11 6M5 12L11 18'
          />
        </svg>
      )

    case 'heart':
      return (
        <svg {...commonProps}>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 21C12 21 4 13.5 4 8.5C4 5.5 6.5 3 9.5 3C11 3 12 4 12 4C12 4 13 3 14.5 3C17.5 3 20 5.5 20 8.5C20 13.5 12 21 12 21Z'
          />
        </svg>
      )

    default:
      return null
  }
}

