import type React from "react"
import Link from "next/link"

interface SectionHeaderProps {
  children: React.ReactNode
  href?: string
}

export function SectionHeader({ children, href }: SectionHeaderProps) {
  const className =
    "font-extrabold text-[28px] leading-8 text-[#212121] underline decoration-[rgba(33,33,33,0.1)] decoration-1 underline-offset-[5px] hover:text-[#fc5621] hover:decoration-[#fc5621] transition-colors"

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    )
  }

  return <h2 className={className}>{children}</h2>
}
