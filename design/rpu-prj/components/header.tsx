"use client"

import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface HeaderProps {
  showPublishers?: boolean
  currentPage?: "comics" | "collections" | "team"
  activePublisher?: string
  activeTeamPage?: "stats" | "vacancies" | "sounds"
}

export function Header({ showPublishers = false, currentPage, activePublisher, activeTeamPage }: HeaderProps = {}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchOpen])

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const publisherSlugs: Record<string, string> = {
    marvel: "Marvel",
    dc: "DC",
    "dark-horse": "Dark Horse",
    image: "Image",
    idw: "IDW",
    "boom-studios": "Boom! Studios",
    dynamite: "Dynamite",
    other: "Другие",
  }

  const publishers = [
    { slug: "marvel", name: "Marvel" },
    { slug: "dc", name: "DC" },
    { slug: "dark-horse", name: "Dark Horse" },
    { slug: "image", name: "Image" },
    { slug: "idw", name: "IDW" },
    { slug: "boom-studios", name: "Boom! Studios" },
    { slug: "dynamite", name: "Dynamite" },
    { slug: "other", name: "Другие", href: "/others" },
  ]

  const shouldShowPublishers = showPublishers || currentPage === "comics"
  const shouldShowTeamMenu = currentPage === "team"

  const teamMenuItems = [
    { slug: "stats", name: "Статистика", href: "/team/stats" },
    { slug: "vacancies", name: "Вакансии", href: "/vacancies" },
    { slug: "sounds", name: "Звуки в комиксах", href: "/sounds" },
  ]

  return (
    <header className="bg-white w-full">
      <div className="hidden lg:flex items-end justify-between px-4 py-2 mx-auto h-[60px] max-w-[1312px]">
        <div className="flex gap-4 items-end">
          <Link href="/" className="w-[120px] h-11">
            <img src="/rpu-logo.svg" alt="RPU Logo" className="w-full h-full" />
          </Link>
          <nav className="flex flex-col h-11 pt-1">
            <div className="flex gap-3 h-4 items-end">
              <Link href="/releases" className="flex items-center justify-center gap-2 group">
                <p
                  className={`font-semibold text-sm leading-4 whitespace-pre transition-colors ${
                    currentPage === "comics"
                      ? "text-[#fc5621] underline decoration-[#fc5621] decoration-1 underline-offset-[5px]"
                      : "text-foreground group-hover:text-[#fc5621]"
                  }`}
                >
                  Комиксы
                </p>
              </Link>
              <Link href="/collections" className="flex items-center justify-center gap-2 group">
                <p
                  className={`font-semibold text-sm leading-4 whitespace-pre transition-colors ${
                    currentPage === "collections"
                      ? "text-[#fc5621] underline decoration-[#fc5621] decoration-1 underline-offset-[5px]"
                      : "text-foreground group-hover:text-[#fc5621]"
                  }`}
                >
                  Подборки
                </p>
              </Link>
              <Link href="/team/stats" className="flex items-center justify-center gap-2 group">
                <p
                  className={`font-semibold text-sm leading-4 whitespace-pre transition-colors ${
                    currentPage === "team"
                      ? "text-[#fc5621] underline decoration-[#fc5621] decoration-1 underline-offset-[5px]"
                      : "text-foreground group-hover:text-[#fc5621]"
                  }`}
                >
                  Команда
                </p>
              </Link>
            </div>
            {/* Second level menu */}
            <div className="h-6 flex items-end">
              {shouldShowPublishers && (
                <div className="flex gap-3">
                  {publishers.map((publisher) => (
                    <Link
                      key={publisher.slug}
                      href={publisher.href || `/publisher/${publisher.slug}`}
                      className="group"
                    >
                      <p
                        className={`font-semibold text-sm leading-4 whitespace-pre transition-colors ${
                          activePublisher === publisher.slug
                            ? "text-[#fc5621] underline decoration-[#fc5621] decoration-1 underline-offset-[5px]"
                            : "text-foreground group-hover:text-[#fc5621]"
                        }`}
                      >
                        {publisher.name}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
              {shouldShowTeamMenu && (
                <div className="flex gap-3">
                  {teamMenuItems.map((item) => (
                    <Link key={item.slug} href={item.href} className="group">
                      <p
                        className={`font-semibold text-sm leading-4 whitespace-pre transition-colors ${
                          activeTeamPage === item.slug
                            ? "text-[#fc5621] underline decoration-[#fc5621] decoration-1 underline-offset-[5px]"
                            : "text-foreground group-hover:text-[#fc5621]"
                        }`}
                      >
                        {item.name}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>

        <div className="flex-1 flex justify-end items-center mx-4">
          {isSearchOpen && (
            <div className="flex-1 max-w-md relative flex items-center h-12">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Поиск"
                className="w-full h-full bg-transparent border-b border-[#212121] pr-12 text-base text-foreground placeholder:text-[rgba(33,33,33,0.4)] focus:outline-none focus:border-[#fc5621] transition-colors"
              />
            </div>
          )}
        </div>

        <div className="flex gap-4 items-center">
          <button onClick={handleSearchToggle} className="w-10 h-10 flex items-center justify-center">
            <span className="material-symbols-outlined text-foreground" style={{ fontSize: "32px", fontWeight: 600 }}>
              search
            </span>
          </button>
          <button className="w-10 h-10 flex items-center justify-center">
            <span className="material-symbols-outlined text-foreground" style={{ fontSize: "32px", fontWeight: 600 }}>
              bookmark
            </span>
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-11 h-11 rounded-full overflow-hidden cursor-pointer">
                <img src="/diverse-user-avatars.png" alt="Avatar" className="w-full h-full object-cover" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild className="focus:bg-muted focus:text-foreground">
                <Link href="/schedule" className="cursor-pointer">
                  Релизная
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="focus:bg-muted focus:text-foreground">
                <Link href="/profile" className="cursor-pointer">
                  Профиль
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer focus:bg-muted focus:text-foreground">Выйти</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex lg:hidden items-center justify-between px-4 py-2 h-[60px]">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-11 h-11 rounded-full overflow-hidden cursor-pointer">
              <img src="/diverse-user-avatars.png" alt="Avatar" className="w-full h-full object-cover" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuItem asChild className="focus:bg-muted focus:text-foreground">
              <Link href="/schedule" className="cursor-pointer">
                Релизная
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="focus:bg-muted focus:text-foreground">
              <Link href="/profile" className="cursor-pointer">
                Профиль
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer focus:bg-muted focus:text-foreground">Выйти</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Link href="/" className="w-[120px] h-11">
          <img src="/rpu-logo.svg" alt="RPU Logo" className="w-full h-full" />
        </Link>

        <button onClick={handleMobileMenuToggle} className="w-10 h-10 flex items-center justify-center">
          <span className="material-symbols-outlined text-foreground" style={{ fontSize: "32px", fontWeight: 600 }}>
            menu
          </span>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-50 p-4">
          <div className="flex justify-between items-center mb-8">
            <Link href="/" className="w-[120px] h-11" onClick={() => setIsMobileMenuOpen(false)}>
              <img src="/rpu-logo.svg" alt="RPU Logo" className="w-full h-full" />
            </Link>
            <button onClick={handleMobileMenuToggle} className="w-10 h-10 flex items-center justify-center">
              <span className="material-symbols-outlined text-foreground" style={{ fontSize: "32px", fontWeight: 600 }}>
                close
              </span>
            </button>
          </div>
          <nav className="flex flex-col gap-6">
            <Link
              href="/releases"
              className="text-2xl font-semibold text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Комиксы
            </Link>
            <Link
              href="/collections"
              className="text-2xl font-semibold text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Подборки
            </Link>
            <Link
              href="/team/stats"
              className="text-2xl font-semibold text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Команда
            </Link>
            {shouldShowTeamMenu && (
              <div className="flex flex-col gap-2">
                {teamMenuItems.map((item) => (
                  <Link key={item.slug} href={item.href} className="text-xl font-semibold text-foreground">
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
