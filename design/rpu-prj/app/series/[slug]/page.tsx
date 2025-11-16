"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { IssueCard } from "@/components/issue-card"
import { SeriesCard } from "@/components/series-card"
import { CollectionCard } from "@/components/collection-card"
import { ContentSection } from "@/components/content-section"
import { DownloadButton } from "@/components/ui/download-button"
import { Bookmark } from "lucide-react"
import Link from "next/link"
import { getCollectionCardRules, getCollectionSectionLayout } from "@/lib/collection-rules"

export default function SeriesPage({ params }: { params: { slug: string } }) {
  const { slug } = params

  // Mock data - replace with actual data fetching
  const series = {
    title: "Название серии",
    publisher: "Издательство",
    type: "Тип серии",
    issuesCount: "N выпуск(ов) из N",
    status: "Статус перевода",
  }

  const issues = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    title: "Issue Title",
    image: `/placeholder.svg?height=400&width=300&query=comic issue ${i + 1}`,
  }))

  const relatedCollections = Array.from({ length: 3 }, (_, i) => ({
    id: i + 1,
    title: "Full collection title",
    issueCount: 123,
    image: `/placeholder.svg?height=400&width=300&query=collection ${i + 1}`,
  }))

  const publisherNews = Array.from({ length: 7 }, (_, i) => ({
    id: i + 1,
    title: "Issue Title",
    image: `/placeholder.svg?height=400&width=300&query=publisher news ${i + 1}`,
  }))

  const readAlso = [
    {
      id: 1,
      type: "series" as const,
      title: "Full series title",
      issueCount: 123,
      image: `/placeholder.svg?height=400&width=300&query=read also series`,
    },
    {
      id: 2,
      type: "issue" as const,
      title: "Issue Title",
      image: `/placeholder.svg?height=400&width=300&query=read also issue 1`,
    },
    {
      id: 3,
      type: "issue" as const,
      title: "Issue Title",
      image: `/placeholder.svg?height=400&width=300&query=read also issue 2`,
    },
  ]

  return (
    <>
      <Header currentPage="comics" activePublisher="marvel" />

      <div className="max-w-[1312px] mx-auto px-4 pt-8 pb-8">
        {/* Series Header */}
        <div className="mb-8">
          <h1 className="font-extrabold text-[28px] leading-8 md:text-[56px] md:leading-[64px] text-foreground mb-4">
            {series.title}
          </h1>

          <p className="text-xl md:text-[28px] font-extrabold leading-8 text-foreground mb-6">
            <Link
              href="/publisher/marvel"
              className="underline decoration-[rgba(33,33,33,0.1)] decoration-1 underline-offset-[5px] hover:text-[#fc5621] hover:decoration-[#fc5621]"
            >
              {series.publisher}
            </Link>
            {" • "}
            {series.type}
            {" • "}
            {series.issuesCount}
            {" • "}
            {series.status}
          </p>

          <div className="flex items-center gap-4">
            <DownloadButton href="#">Скачать все выпуски</DownloadButton>
            <button className="p-3 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Добавить в закладки">
              <Bookmark className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Issues Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-4 md:gap-x-3 md:gap-y-4 lg:gap-x-4 lg:gap-y-4 mb-8">
          {issues.map((issue) => (
            <IssueCard
              key={issue.id}
              title={issue.title}
              image={issue.image}
              href={`/issue/${issue.id}`}
              className="!w-full"
            />
          ))}
        </div>

        <hr className="border-t border-gray-200 mb-8" />

        {/* Read Also Section */}
        <ContentSection title="Читайте также">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-4 md:gap-x-3 md:gap-y-4 lg:gap-x-4 lg:gap-y-4">
            {readAlso.map((item) =>
              item.type === "series" ? (
                <SeriesCard
                  key={item.id}
                  title={item.title}
                  issueCount={item.issueCount}
                  coverUrl={item.image}
                  href={`/series/${item.id}`}
                  className="!w-full"
                />
              ) : (
                <IssueCard
                  key={item.id}
                  title={item.title}
                  coverUrl={item.image}
                  href={`/issue/${item.id}`}
                  className="!w-full"
                />
              ),
            )}
          </div>
        </ContentSection>

        <hr className="border-t border-gray-200 mt-8 mb-8" />

        {/* Related Collections Section */}
        <ContentSection title="Связанные подборки">
          <div className={getCollectionSectionLayout(3)}>
            {relatedCollections.map((collection, i) => {
              const rules = getCollectionCardRules(3, i)
              return (
                <CollectionCard
                  key={collection.id}
                  title={collection.title}
                  issueCount={collection.issueCount}
                  coverUrl={collection.image}
                  href={`/collection/${collection.id}`}
                  aspectRatio={rules.aspectRatio}
                  hideOnMobile={rules.hideOnMobile}
                  hideOnTablet={rules.hideOnTablet}
                />
              )
            })}
          </div>
        </ContentSection>

        <hr className="border-t border-gray-200 mt-8 mb-8" />

        {/* Publisher News Section */}
        <ContentSection title="Новинки издательства">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {publisherNews.map((issue) => (
              <IssueCard key={issue.id} title={issue.title} coverUrl={issue.image} href={`/issue/${issue.id}`} />
            ))}
          </div>
        </ContentSection>
      </div>

      <Footer />
    </>
  )
}
