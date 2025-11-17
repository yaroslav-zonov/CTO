import Link from "next/link"
import { cn } from "@/lib/utils"

interface IssueCardProps {
  title: string
  coverUrl: string
  href: string
  size?: "default" | "large"
  className?: string
}

export function IssueCard({ title, coverUrl, href, size = "default", className }: IssueCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col gap-2 group shrink-0",
        size === "default" && "w-[calc((100vw-48px)/2)] md:w-auto md:flex-1 md:min-w-[128px]",
        size === "large" && "w-[calc(100vw-40px)] md:w-auto md:flex-1 md:min-w-[272px]",
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
      <p className="font-normal text-sm leading-4 text-foreground transition-opacity group-hover:opacity-90">{title}</p>
    </Link>
  )
}
