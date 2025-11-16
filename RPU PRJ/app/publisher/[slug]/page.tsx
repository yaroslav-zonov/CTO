"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SeriesCard } from "@/components/series-card"
import { IssueCard } from "@/components/issue-card"
import { FilterTabs } from "@/components/filter-tabs"
import { ContentSection } from "@/components/content-section"

const publishers: Record<string, string> = {
  marvel: "Marvel",
  dc: "DC",
  "dark-horse": "Dark Horse",
  image: "Image",
  idw: "IDW",
  "boom-studios": "Boom! Studios",
  dynamite: "Dynamite",
  other: "Другие",
}

const filterTabs = [
  { id: "alphabetical", label: "По алфавиту" },
  { id: "popularity", label: "По популярности" },
  { id: "newest", label: "Сначала новые" },
  { id: "oldest", label: "Сначала старые" },
]

export default function PublisherPage({ params }: { params: { slug: string } }) {
  const [activeFilter, setActiveFilter] = useState("alphabetical")

  const { slug } = params
  const publisherName = publishers[slug] || "Marvel"

  return (
    <div className="w-full bg-white">
      <Header currentPage="comics" activePublisher={slug} />

      <main>
        <div className="max-w-[1312px] mx-auto px-4 py-8">
          <h1 className="text-[28px] leading-8 md:text-[56px] font-extrabold md:leading-[64px] text-[#212121]">
            Комиксы {publisherName} на русском
          </h1>

          <div className="mt-4">
            <FilterTabs tabs={filterTabs} activeTab={activeFilter} onTabChange={setActiveFilter} />
          </div>

          <div className="flex flex-col gap-8 mt-8">
            <ContentSection title="Серии">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-4 md:gap-x-3 md:gap-y-4 lg:gap-x-4 lg:gap-y-4">
                {Array.from({ length: 10 }).map((_, i) => (
                  <SeriesCard
                    key={i}
                    title="Full series title"
                    issueCount={123}
                    coverUrl="/comic-book-cover.png"
                    href={`/series/${i}`}
                    className="!w-full"
                  />
                ))}
              </div>
            </ContentSection>

            <ContentSection title="Ваншоты">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-4 md:gap-x-3 md:gap-y-4 lg:gap-x-4 lg:gap-y-4">
                {Array.from({ length: 10 }).map((_, i) => (
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
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
