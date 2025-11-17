"use client"

import type React from "react"
import Link from "next/link"

interface DownloadButtonProps {
  href?: string
  disabled?: boolean
  children: React.ReactNode
  onClick?: () => void
}

export function DownloadButton({ href, disabled = false, children, onClick }: DownloadButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center px-6 gap-2 rounded-lg font-bold text-xl leading-7 h-[52px] transition-colors"
  const activeClasses = "bg-[#fc5621] text-white hover:bg-[#e64d1c]"
  const disabledClasses = "bg-gray-200 text-gray-400 cursor-not-allowed"

  const classes = `${baseClasses} ${disabled ? disabledClasses : activeClasses}`

  if (href && !disabled) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}
