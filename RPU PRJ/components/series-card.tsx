import Link from "next/link"
import { cn } from "@/lib/utils"

interface SeriesCardProps {
  title: string
  issueCount: number
  coverUrl: string
  href: string
  className?: string
}

export function SeriesCard({ title, issueCount, coverUrl, href, className }: SeriesCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col gap-2 group shrink-0",
        "w-[calc((100vw-48px)/2)] md:w-auto md:flex-1 md:min-w-[128px]",
        className,
      )}
    >
      <div className="relative w-full overflow-hidden pb-[150%]">
        <img
          src={coverUrl || "/placeholder.svg"}
          alt={title}
          className="absolute top-0 left-0 w-full h-full object-cover object-center"
        />
      </div>
      <div className="flex flex-col gap-1 text-[#151515]">
        <p className="font-semibold text-base leading-[18px] transition-opacity group-hover:opacity-90">{title}</p>
        <p className="font-normal text-sm leading-4">{issueCount} выпуска -&gt;</p>
      </div>
    </Link>
  )
}
