import Link from "next/link"
import { cn } from "@/lib/utils"

interface CollectionCardProps {
  title: string
  issueCount: number
  coverUrl: string
  href: string
  aspectRatio?: "16-9" | "5-3" | "1-1" | "4-3"
  size?: "default" | "small"
  className?: string
  hideOnMobile?: boolean
  hideOnTablet?: boolean
}

export function CollectionCard({
  title,
  issueCount,
  coverUrl,
  href,
  aspectRatio = "16-9",
  size = "default",
  className,
  hideOnMobile = false,
  hideOnTablet = false,
}: CollectionCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col gap-2 group",
        "w-full md:w-auto",
        size === "default" && "md:flex-1",
        size === "small" && "md:flex-1",
        hideOnMobile && "hidden md:flex",
        hideOnTablet && "md:hidden lg:flex",
        className,
      )}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden",
          aspectRatio === "16-9" && "pb-[56.25%]",
          aspectRatio === "5-3" && "pb-[60%]",
          aspectRatio === "1-1" && "pb-[75%] md:pb-[100%]", // 4:3 on mobile, 1:1 on tablet/desktop
          aspectRatio === "4-3" && "pb-[75%]",
        )}
      >
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
