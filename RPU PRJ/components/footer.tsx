import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-white flex flex-col gap-4 pt-8 pb-8 border-t border-border max-w-[1312px] mx-auto px-4">
      <div className="flex gap-3 items-center">
        <Link href="/telegram" className="group">
          <p className="font-semibold text-sm leading-4 text-foreground group-hover:text-[#fc5621] transition-colors">
            Телеграм
          </p>
        </Link>
        <Link href="/vk" className="group">
          <p className="font-semibold text-sm leading-4 text-foreground group-hover:text-[#fc5621] transition-colors">
            Вконтакте
          </p>
        </Link>
        <Link href="/translations" className="group">
          <p className="font-semibold text-sm leading-4 text-foreground group-hover:text-[#fc5621] transition-colors">
            База переводов
          </p>
        </Link>
        <Link href="/rss" className="group">
          <p className="font-semibold text-sm leading-4 text-foreground group-hover:text-[#fc5621] transition-colors">
            RSS
          </p>
        </Link>
      </div>
      <p className="font-normal text-sm leading-4 text-foreground">© 2007...2025 Russian Project Universe</p>
    </footer>
  )
}
