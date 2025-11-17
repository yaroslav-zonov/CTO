import type { ReactNode } from "react"

interface ContentSectionProps {
  title?: string
  children: ReactNode
  className?: string
}

export function ContentSection({ title, children, className = "" }: ContentSectionProps) {
  return (
    <section className={`flex flex-col gap-4 w-full ${className}`}>
      {title && <h2 className="font-extrabold text-[28px] leading-8 text-[#212121]">{title}</h2>}
      {children}
    </section>
  )
}
