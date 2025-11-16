"use client"

import { Header } from "@/components/header"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

// Mock data for 2024 monthly releases
const monthlyData = [
  { month: "Январь", releases: 25 },
  { month: "Февраль", releases: 32 },
  { month: "Март", releases: 38 },
  { month: "Апрель", releases: 42 },
  { month: "Май", releases: 28 },
  { month: "Июнь", releases: 24 },
  { month: "Июль", releases: 52 },
  { month: "Август", releases: 31 },
  { month: "Сентябрь", releases: 35 },
  { month: "Октябрь", releases: 39 },
  { month: "Ноябрь", releases: 45 },
  { month: "Декабрь", releases: 34 },
]

// Mock data for joint releases
const jointReleasesData = [
  { team: "PunkComics", count: 13 },
  { team: "Marvel-Comics", count: 11 },
  { team: "Hardy", count: 5 },
  { team: "Supercomics", count: 4 },
  { team: "Комиксы Гримм", count: 4 },
  { team: "CATCOM", count: 2 },
  { team: "DawComics", count: 1 },
  { team: "Frankengeek", count: 1 },
]

// Mock data for top scanlators
const topScanlators = [
  {
    name: "Ник",
    translated: 4,
    typed: 0,
    formatted: 0,
    edited: 0,
    total: 4,
  },
  {
    name: "Никнейм",
    translated: 1,
    typed: 7,
    formatted: 4,
    edited: 0,
    total: 12,
  },
  {
    name: "Длинный Никнейм",
    translated: 3,
    typed: 0,
    formatted: 0,
    edited: 0,
    total: 3,
  },
  {
    name: "Никнейм",
    translated: 4,
    typed: 95,
    formatted: 3,
    edited: 0,
    total: 102,
  },
  {
    name: "Длинный Никнейм",
    translated: 0,
    typed: 0,
    formatted: 0,
    edited: 2,
    total: 2,
  },
  {
    name: "Никнейм",
    translated: 15,
    typed: 0,
    formatted: 0,
    edited: 1,
    total: 15,
  },
  {
    name: "Никнейм",
    translated: 19,
    typed: 110,
    formatted: 114,
    edited: 117,
    total: 122,
  },
  {
    name: "Длинный Никнейм",
    translated: 2,
    typed: 0,
    formatted: 0,
    edited: 2,
    total: 2,
  },
  {
    name: "Никнейм",
    translated: 0,
    typed: 1,
    formatted: 1,
    edited: 0,
    total: 1,
  },
  {
    name: "Ник",
    translated: 4,
    typed: 95,
    formatted: 0,
    edited: 0,
    total: 96,
  },
]

const yearlyData = [
  { year: "2007", releases: 45 },
  { year: "2008", releases: 68 },
  { year: "2009", releases: 89 },
  { year: "2010", releases: 112 },
  { year: "2011", releases: 95 },
  { year: "2012", releases: 134 },
  { year: "2013", releases: 156 },
  { year: "2014", releases: 189 },
  { year: "2015", releases: 223 },
  { year: "2016", releases: 267 },
  { year: "2017", releases: 312 },
  { year: "2018", releases: 289 },
  { year: "2019", releases: 245 },
  { year: "2020", releases: 278 },
  { year: "2021", releases: 234 },
  { year: "2022", releases: 312 },
  { year: "2023", releases: 289 },
  { year: "2024", releases: 345 },
  { year: "2025", releases: 123 },
]

export default function StatsPage() {
  const [hoveredYearIndex, setHoveredYearIndex] = useState<number | null>(null)
  const [hoveredMonthIndex, setHoveredMonthIndex] = useState<number | null>(null)
  const [hoveredJointIndex, setHoveredJointIndex] = useState<number | null>(null)

  const maxYearlyReleases = Math.max(...yearlyData.map((d) => d.releases))
  const maxMonthlyReleases = Math.max(...monthlyData.map((d) => d.releases))
  const maxJointReleases = Math.max(...jointReleasesData.map((d) => d.count))

  return (
    <>
      <Header currentPage="team" activeTeamPage="stats" />

      <div className="container mx-auto px-4 py-8 md:py-12 max-w-[1312px]">
        <section className="mb-16">
          <h1 className="mb-8 font-extrabold text-[56px] leading-[64px]">Статистика за всё время</h1>

          {/* Large stat blocks - 2 rows of 3 */}
          <div className="mb-12 grid gap-6 md:grid-cols-3">
            <div>
              <div className="text-5xl font-extrabold md:text-6xl">7339</div>
              <p className="mt-2 text-base">Комиксов опубликовано за всё время</p>
            </div>
            <div>
              <div className="text-5xl font-extrabold md:text-6xl">5</div>
              <p className="mt-2 text-base">Готовится к выходу</p>
            </div>
            <div>
              <div className="text-5xl font-extrabold md:text-6xl">1</div>
              <p className="mt-2 text-base">Опубликован сегодня</p>
            </div>
            <div>
              <div className="text-5xl font-extrabold md:text-6xl">4</div>
              <p className="mt-2 text-base">На этой неделе</p>
            </div>
            <div>
              <div className="text-5xl font-extrabold md:text-6xl">20</div>
              <p className="mt-2 text-base">В этом месяце</p>
            </div>
          </div>

          <div>
            <h2 className="mb-6 font-extrabold text-[28px] leading-8">Динамика публикаций</h2>
            <div className="h-[360px] w-full relative">
              <div className="flex items-end justify-between h-[320px] gap-1">
                {yearlyData.map((item, index) => {
                  const barHeight = (item.releases / maxYearlyReleases) * 100
                  const isHovered = hoveredYearIndex === index

                  return (
                    <div key={index} className="flex-1 flex flex-col items-center justify-end h-full">
                      <div
                        className="w-full transition-colors cursor-pointer relative"
                        style={{
                          height: `${barHeight}%`,
                          backgroundColor: isHovered ? "#fc5621" : "#E0E0E0",
                        }}
                        onMouseEnter={() => setHoveredYearIndex(index)}
                        onMouseLeave={() => setHoveredYearIndex(null)}
                      >
                        {isHovered && (
                          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm font-normal text-[#212121] text-center leading-4 font-sans whitespace-nowrap">
                            {item.releases}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="flex items-center justify-between mt-2">
                {yearlyData.map((item, index) => (
                  <div key={index} className="flex-1 text-center text-sm text-[#212121] font-normal font-sans">
                    {item.year}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h1 className="mb-8 font-extrabold text-[56px] leading-[64px]">Итоги 2024 года</h1>

          {/* Large stat blocks */}
          <div className="mb-12 grid gap-6 md:grid-cols-3">
            <div>
              <div className="text-5xl font-extrabold md:text-6xl">385</div>
              <p className="mt-2 text-base">Комиксов опубликовано</p>
            </div>
            <div>
              <div className="text-5xl font-extrabold md:text-6xl">34</div>
              <p className="mt-2 text-base">Серии начато</p>
            </div>
            <div>
              <div className="text-5xl font-extrabold md:text-6xl">36</div>
              <p className="mt-2 text-base">Серий завершено</p>
            </div>
          </div>

          <div>
            <h2 className="mb-6 font-extrabold text-[28px] leading-8">Динамика публикаций</h2>
            <div className="h-[360px] w-full relative">
              <div className="flex items-end justify-between h-[320px] gap-1">
                {monthlyData.map((item, index) => {
                  const barHeight = (item.releases / maxMonthlyReleases) * 100
                  const isHovered = hoveredMonthIndex === index

                  return (
                    <div key={index} className="flex-1 flex flex-col items-center justify-end h-full">
                      <div
                        className="w-full transition-colors cursor-pointer relative"
                        style={{
                          height: `${barHeight}%`,
                          backgroundColor: isHovered ? "#fc5621" : "#E0E0E0",
                        }}
                        onMouseEnter={() => setHoveredMonthIndex(index)}
                        onMouseLeave={() => setHoveredMonthIndex(null)}
                      >
                        {isHovered && (
                          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm font-normal text-[#212121] text-center leading-4 font-sans whitespace-nowrap">
                            {item.releases}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="flex items-center justify-between mt-2">
                {monthlyData.map((item, index) => (
                  <div key={index} className="flex-1 text-center text-sm text-[#212121] font-normal font-sans">
                    {item.month}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Joint releases, support, and scanlators */}
        <section>
          <div className="mb-12">
            <h2 className="mb-6 font-extrabold text-[28px] leading-8">41 совместный релиз</h2>
            <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
              <div className="flex flex-col gap-2">
                {jointReleasesData.map((item, index) => {
                  const barWidth = (item.count / maxJointReleases) * 100
                  const isHovered = hoveredJointIndex === index

                  return (
                    <div key={index} className="flex items-center gap-4 h-8">
                      <div className="w-48 flex-shrink-0">
                        <Link
                          href={`/team/${item.team.toLowerCase().replace(/\s+/g, "-")}`}
                          className="text-[#212121] font-extrabold text-xl leading-8 underline decoration-[rgba(33,33,33,0.1)] decoration-1 underline-offset-[5px] hover:text-[#fc5621] transition-colors font-sans"
                          style={{
                            textDecorationSkipInk: "auto",
                            textUnderlinePosition: "from-font",
                          }}
                        >
                          {item.team}
                        </Link>
                      </div>
                      <div className="flex-1 flex items-center gap-2">
                        <div
                          className="h-8 transition-colors cursor-pointer"
                          style={{
                            width: `${barWidth}%`,
                            backgroundColor: isHovered ? "#fc5621" : "#E0E0E0",
                          }}
                          onMouseEnter={() => setHoveredJointIndex(index)}
                          onMouseLeave={() => setHoveredJointIndex(null)}
                        />
                        <span className="text-base font-normal text-[#212121] w-8 font-sans">{item.count}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="flex flex-col items-start border border-[#E0E0E0] p-6 justify-start">
                <div className="text-6xl font-extrabold">10%</div>
                <p className="mt-4 text-sm">Релизов в 2024 году были подготовлены совместно с другими командами</p>
              </div>
            </div>
          </div>

          {/* Support section */}
          <div className="mb-12">
            <h2 className="mb-6 font-extrabold text-[28px] leading-8">Поддержка</h2>
            <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
              <div className="border border-[#E0E0E0] p-6">
                <div className="text-6xl font-extrabold">169</div>
                <p className="mt-4 text-base">Комиксов выпущено при вашей поддержке</p>
                <Link
                  href="#"
                  className="mt-6 inline-flex items-center justify-center px-6 gap-2 rounded-lg font-extrabold text-xl leading-7 h-[52px] transition-colors bg-[#fc5621] text-white hover:bg-[#e64d1c]"
                >
                  Поддержать
                </Link>
              </div>
              <div className="flex flex-col">
                <p className="mb-4 text-base">
                  Ваши <span className="text-[#fc5621] font-normal">донаты</span> обеспечили почти половину всех релизов
                </p>
                <div className="flex flex-1 overflow-hidden">
                  <div
                    className="flex bg-[#fc5621] text-white justify-start items-start px-4 py-4 flex-row"
                    style={{ width: "43.9%" }}
                  >
                    <span className="font-normal text-base">43,9%</span>
                  </div>
                  <div
                    className="flex bg-[#E0E0E0] justify-start items-start mx-[0] px-4 py-4"
                    style={{ width: "56.1%" }}
                  >
                    <span className="text-[#212121] font-normal text-base">56,1%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top scanlators table */}
          <div>
            <h2 className="mb-6 font-extrabold text-[28px] leading-8">Топ сканлейтеров</h2>
            <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-sm font-normal leading-4">
                      <th className="pb-3 text-left"></th>
                      <th className="pb-3 text-right font-normal">Перевёл</th>
                      <th className="pb-3 text-right font-normal">Затайпил</th>
                      <th className="pb-3 text-right font-normal">Оформил</th>
                      <th className="pb-3 text-right font-normal">Отредактировал</th>
                      <th className="pb-3 text-right font-normal">Всего</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topScanlators.map((scanlator, index) => (
                      <tr key={index}>
                        <td className="py-2">
                          <Link
                            href={`/member/${scanlator.name.toLowerCase().replace(/\s+/g, "-")}`}
                            className="text-[#212121] font-extrabold text-xl leading-8 underline decoration-[rgba(33,33,33,0.1)] decoration-1 underline-offset-[5px] hover:text-[#fc5621] transition-colors font-sans"
                            style={{
                              textDecorationSkipInk: "auto",
                              textUnderlinePosition: "from-font",
                            }}
                          >
                            {scanlator.name}
                          </Link>
                        </td>
                        <td className="py-3 text-right text-xl font-normal leading-8 tabular-nums">
                          {scanlator.translated || ""}
                        </td>
                        <td className="py-3 text-right text-xl font-normal leading-8 tabular-nums">
                          {scanlator.typed || ""}
                        </td>
                        <td className="py-3 text-right text-xl font-normal leading-8 tabular-nums">
                          {scanlator.formatted || ""}
                        </td>
                        <td className="py-3 text-right text-xl font-normal leading-8 tabular-nums">
                          {scanlator.edited || ""}
                        </td>
                        <td className="py-3 text-right text-xl font-normal leading-8 tabular-nums">
                          {scanlator.total}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col items-center text-center gap-4">
                <div className="h-32 w-32 overflow-hidden rounded-full bg-muted">
                  <img
                    src="/placeholder.svg?height=128&width=128"
                    alt="Никнейм"
                    className="h-full w-full object-cover"
                  />
                </div>
                <Link
                  href="/member/nickname"
                  className="text-2xl font-extrabold text-[#212121] underline decoration-[rgba(33,33,33,0.1)] decoration-1 underline-offset-[5px] hover:text-[#fc5621] transition-colors font-sans"
                  style={{
                    textDecorationSkipInk: "auto",
                    textUnderlinePosition: "from-font",
                  }}
                >
                  Никнейм
                </Link>
                <div className="flex items-center justify-center gap-2">
                  <Image src="/palm-left.svg" alt="" width={32} height={56} className="flex-shrink-0" />
                  <div className="text-[#fc5621] font-extrabold text-2xl leading-tight">
                    <div>Сканлейтер</div>
                    <div>года 2024</div>
                  </div>
                  <Image src="/palm-right.svg" alt="" width={32} height={56} className="flex-shrink-0" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
