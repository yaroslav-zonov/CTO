"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FilterTabs } from "@/components/filter-tabs"
import { ContentSection } from "@/components/content-section"
import { SeriesCard } from "@/components/series-card"
import { IssueCard } from "@/components/issue-card"

type FilterType = "alphabetical" | "series-count"

interface PublisherData {
  name: string
  slug: string
  items: Array<{
    type: "series" | "issue"
    title: string
    issueCount?: number
    image: string
  }>
}

export default function OthersPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("alphabetical")

  const filters = [
    { id: "alphabetical" as FilterType, label: "По алфавиту" },
    { id: "series-count" as FilterType, label: "По количеству серий" },
  ]

  // Mock data for small publishers
  const publishers: PublisherData[] = [
    {
      name: "Издательство",
      slug: "publisher-1",
      items: [
        {
          type: "series",
          title: "Full series title",
          issueCount: 123,
          image: "/placeholder.svg?height=400&width=300",
        },
        {
          type: "series",
          title: "Full series title",
          issueCount: 123,
          image: "/placeholder.svg?height=400&width=300",
        },
        {
          type: "series",
          title: "Full series title",
          issueCount: 123,
          image: "/placeholder.svg?height=400&width=300",
        },
        { type: "issue", title: "Issue Title", image: "/placeholder.svg?height=400&width=300" },
        { type: "issue", title: "Issue Title", image: "/placeholder.svg?height=400&width=300" },
        {
          type: "series",
          title: "Full series title",
          issueCount: 123,
          image: "/placeholder.svg?height=400&width=300",
        },
        {
          type: "series",
          title: "Full series title",
          issueCount: 123,
          image: "/placeholder.svg?height=400&width=300",
        },
        {
          type: "series",
          title: "Full series title",
          issueCount: 123,
          image: "/placeholder.svg?height=400&width=300",
        },
        {
          type: "series",
          title: "Full series title",
          issueCount: 123,
          image: "/placeholder.svg?height=400&width=300",
        },
        { type: "issue", title: "Issue Title", image: "/placeholder.svg?height=400&width=300" },
      ],
    },
    {
      name: "Издательство",
      slug: "publisher-2",
      items: [
        {
          type: "series",
          title: "Full series title",
          issueCount: 123,
          image: "/placeholder.svg?height=400&width=300",
        },
        {
          type: "series",
          title: "Full series title",
          issueCount: 123,
          image: "/placeholder.svg?height=400&width=300",
        },
        {
          type: "series",
          title: "Full series title",
          issueCount: 123,
          image: "/placeholder.svg?height=400&width=300",
        },
        {
          type: "series",
          title: "Full series title",
          issueCount: 123,
          image: "/placeholder.svg?height=400&width=300",
        },
        { type: "issue", title: "Issue Title", image: "/placeholder.svg?height=400&width=300" },
        { type: "issue", title: "Issue Title", image: "/placeholder.svg?height=400&width=300" },
        {
          type: "series",
          title: "Full series title",
          issueCount: 123,
          image: "/placeholder.svg?height=400&width=300",
        },
        {
          type: "series",
          title: "Full series title",
          issueCount: 123,
          image: "/placeholder.svg?height=400&width=300",
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage="comics" activePublisher="other" />

      <main className="max-w-[1312px] mx-auto px-4">
        <div className="pt-8 pb-8">
          <h1 className="text-[56px] font-extrabold leading-[64px] text-[#212121] mb-4">
            Альтернативные комиксы на русском
          </h1>

          <FilterTabs tabs={filters} activeTab={activeFilter} onTabChange={setActiveFilter} />

          <div className="flex flex-col gap-8 mt-8">
            {publishers.map((publisher, index) => (
              <ContentSection key={index}>
                <Link href={`/publisher/${publisher.slug}`} className="w-fit">
                  <h2 className="font-extrabold text-[28px] leading-8 text-[#212121] underline decoration-[rgba(33,33,33,0.1)] decoration-1 underline-offset-[5px] hover:text-[#fc5621] hover:decoration-[#fc5621] transition-colors">
                    {publisher.name}
                  </h2>
                </Link>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-4 md:gap-x-3 lg:gap-x-4">
                  {publisher.items.map((item, itemIndex) =>
                    item.type === "series" ? (
                      <SeriesCard
                        key={itemIndex}
                        title={item.title}
                        issueCount={item.issueCount!}
                        coverUrl={item.image}
                        href={`/series/${itemIndex}`}
                        className="!w-full"
                      />
                    ) : (
                      <IssueCard
                        key={itemIndex}
                        title={item.title}
                        coverUrl={item.image}
                        href={`/issue/${itemIndex}`}
                        className="!w-full"
                      />
                    ),
                  )}
                </div>
              </ContentSection>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
