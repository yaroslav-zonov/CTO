"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { IssueCard } from "@/components/issue-card"
import { FilterTabs } from "@/components/filter-tabs"
import { ContentSection } from "@/components/content-section"

export default function ReleasesPage() {
  const years = ["2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "Архив"]
  const [activeYear, setActiveYear] = useState("2025")

  const yearTabs = years.map((year) => ({ id: year, label: year }))

  const months = [
    { name: "Март", issues: 10 },
    { name: "Февраль", issues: 8 },
    { name: "Январь", issues: 12 },
  ]

  return (
    <div className="w-full">
      <Header currentPage="comics" />

      <div className="w-full pt-8 pb-8 max-w-[1312px] mx-auto px-4">
        <div className="flex flex-col">
          <h1 className="font-extrabold text-[56px] leading-[64px] text-[#212121]">Релизы</h1>

          <div className="mt-4">
            <FilterTabs tabs={yearTabs} activeTab={activeYear} onTabChange={setActiveYear} />
          </div>

          <div className="flex flex-col gap-8 mt-8">
            {months.map((month) => (
              <ContentSection key={month.name} title={month.name}>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-4 md:gap-x-3 md:gap-y-4 lg:gap-x-4 lg:gap-y-4">
                  {Array.from({ length: month.issues }).map((_, i) => (
                    <IssueCard
                      key={i}
                      title="Issue Title"
                      coverUrl="/comic-book-cover.png"
                      href={`/issue/${i}`}
                      className="!w-full"
                    />
                  ))}
                </div>
              </ContentSection>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
