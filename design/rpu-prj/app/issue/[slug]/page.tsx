"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { IssueCard } from "@/components/issue-card"
import { SeriesCard } from "@/components/series-card"
import { CollectionCard } from "@/components/collection-card"
import { ContentSection } from "@/components/content-section"
import { SectionHeader } from "@/components/section-header"
import { DownloadButton } from "@/components/ui/download-button"
import { Bookmark, BookOpen, Heart } from "lucide-react"
import Link from "next/link"

// Helper functions for layout and rules
function getCollectionSectionLayout(columnCount: number): string {
  return `grid grid-cols-1 md:grid-cols-${columnCount} gap-4`
}

function getCollectionCardRules(
  columnCount: number,
  index: number,
): { aspectRatio: string; hideOnMobile: boolean; hideOnTablet: boolean } {
  const baseRules = {
    aspectRatio: "1-1",
    hideOnMobile: false,
    hideOnTablet: false,
  }

  if (columnCount === 3) {
    if (index >= 3) {
      baseRules.hideOnMobile = true
    }
  }

  return baseRules
}

export default function IssuePage({ params }: { params: { slug: string } }) {
  const { slug } = params

  // Mock data - replace with actual data fetching
  const issue = {
    title: "Название выпуска",
    publisher: "Издательство",
    publisherSlug: "marvel",
    series: "Серия",
    seriesSlug: "series-1",
    volume: "Том",
    coverUrl: "/comic-issue-cover.jpg",
    description:
      'Новый выпуск комикса "[Название комикса]" продолжает захватывающую историю. Главные герои сталкиваются с новыми вызовами, которые испытывают их дружбу. В этом выпуске появляются новые персонажи, а яркие иллюстрации подчеркивают эмоции происходящего. Темы, такие как [основные темы], актуальны и заставляют задуматься.',
    translationTeam: "Название команды",
    translationTeamSlug: "team-1",
    credits: {
      translation: ["Никнейм", "Никнейм"],
      lettering: ["Никнейм"],
      design: ["Никнейм", "Никнейм", "Никнейм"],
      editing: ["Никнейм"],
    },
  }

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

  return (
    <>
      <Header currentPage="comics" activePublisher={issue.publisherSlug} />

      <div className="max-w-[1312px] mx-auto px-4 pt-8 pb-8">
        <div className="mb-6 lg:hidden">
          <h1 className="font-extrabold text-[28px] leading-8 md:text-[56px] md:leading-[64px] text-foreground mb-4">
            {issue.title}
          </h1>

          <p className="text-xl md:text-[28px] font-extrabold leading-8 text-foreground">
            <Link
              href={`/publisher/${issue.publisherSlug}`}
              className="underline decoration-[rgba(33,33,33,0.1)] decoration-1 underline-offset-[5px] hover:text-[#fc5621] hover:decoration-[#fc5621] transition-colors"
            >
              {issue.publisher}
            </Link>
            <span> • </span>
            <Link
              href={`/series/${issue.seriesSlug}`}
              className="underline decoration-[rgba(33,33,33,0.1)] decoration-1 underline-offset-[5px] hover:text-[#fc5621] hover:decoration-[#fc5621] transition-colors"
            >
              {issue.series}
            </Link>
            <span> • {issue.volume}</span>
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-8">
          {/* Cover Image */}
          <div className="w-full md:w-[400px] flex-shrink-0">
            <img
              src={issue.coverUrl || "/placeholder.svg"}
              alt={issue.title}
              className="w-full h-auto object-cover"
              style={{ aspectRatio: "2/3" }}
            />
          </div>

          {/* Issue Details */}
          <div className="flex-1">
            <div className="hidden lg:block mb-6">
              <h1 className="font-extrabold text-[56px] leading-[64px] text-foreground mb-4">{issue.title}</h1>

              <p className="text-xl md:text-[28px] font-extrabold leading-8 text-foreground">
                <Link
                  href={`/publisher/${issue.publisherSlug}`}
                  className="underline decoration-[rgba(33,33,33,0.1)] decoration-1 underline-offset-[5px] hover:text-[#fc5621] hover:decoration-[#fc5621] transition-colors"
                >
                  {issue.publisher}
                </Link>
                <span> • </span>
                <Link
                  href={`/series/${issue.seriesSlug}`}
                  className="underline decoration-[rgba(33,33,33,0.1)] decoration-1 underline-offset-[5px] hover:text-[#fc5621] hover:decoration-[#fc5621] transition-colors"
                >
                  {issue.series}
                </Link>
                <span> • {issue.volume}</span>
              </p>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <DownloadButton href="#" className="flex-1 md:flex-initial md:w-auto">
                Скачать
              </DownloadButton>
              <button
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                aria-label="Читать онлайн"
              >
                <BookOpen className="w-8 h-8 stroke-[2.5]" strokeWidth={2.5} />
              </button>
              <button
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                aria-label="Добавить в избранное"
              >
                <Heart className="w-8 h-8 stroke-[2.5]" strokeWidth={2.5} />
              </button>
              <button
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                aria-label="Добавить в закладки"
              >
                <Bookmark className="w-8 h-8 stroke-[2.5]" strokeWidth={2.5} />
              </button>
            </div>

            <p className="text-[20px] leading-[32px] text-foreground mb-6 font-normal [font-variant-numeric:lining-nums_tabular-nums]">
              {issue.description}
            </p>

            <hr className="border-t border-gray-200 my-6" />

            <p className="text-xl font-normal leading-8 text-foreground tabular-nums mb-4">
              Переведено совместно с{" "}
              <Link
                href={`/team/${issue.translationTeamSlug}`}
                className="font-extrabold underline decoration-[rgba(33,33,33,0.1)] decoration-1 underline-offset-[5px] hover:text-[#fc5621] hover:decoration-[#fc5621] transition-colors"
              >
                {issue.translationTeam}
              </Link>
            </p>

            <hr className="border-t border-gray-200 my-6" />

            {/* Credits Table */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <h3 className="text-[16px] leading-6 font-normal text-foreground mb-2">Перевод</h3>
                {issue.credits.translation.map((name, i) => (
                  <Link
                    key={i}
                    href={`/member/${name}`}
                    className="block text-[20px] leading-[32px] font-extrabold text-foreground mb-1 underline decoration-[rgba(33,33,33,0.1)] decoration-1 underline-offset-[5px] hover:text-[#fc5621] hover:decoration-[#fc5621] transition-colors"
                  >
                    {name}
                  </Link>
                ))}
              </div>
              <div>
                <h3 className="text-[16px] leading-6 font-normal text-foreground mb-2">Тайп</h3>
                {issue.credits.lettering.map((name, i) => (
                  <Link
                    key={i}
                    href={`/member/${name}`}
                    className="block text-[20px] leading-[32px] font-extrabold text-foreground mb-1 underline decoration-[rgba(33,33,33,0.1)] decoration-1 underline-offset-[5px] hover:text-[#fc5621] hover:decoration-[#fc5621] transition-colors"
                  >
                    {name}
                  </Link>
                ))}
              </div>
              <div>
                <h3 className="text-[16px] leading-6 font-normal text-foreground mb-2">Оформление</h3>
                {issue.credits.design.map((name, i) => (
                  <Link
                    key={i}
                    href={`/member/${name}`}
                    className="block text-[20px] leading-[32px] font-extrabold text-foreground mb-1 underline decoration-[rgba(33,33,33,0.1)] decoration-1 underline-offset-[5px] hover:text-[#fc5621] hover:decoration-[#fc5621] transition-colors"
                  >
                    {name}
                  </Link>
                ))}
              </div>
              <div>
                <h3 className="text-[16px] leading-6 font-normal text-foreground mb-2">Редактура</h3>
                {issue.credits.editing.map((name, i) => (
                  <Link
                    key={i}
                    href={`/member/${name}`}
                    className="block text-[20px] leading-[32px] font-extrabold text-foreground mb-1 underline decoration-[rgba(33,33,33,0.1)] decoration-1 underline-offset-[5px] hover:text-[#fc5621] hover:decoration-[#fc5621] transition-colors"
                  >
                    {name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <hr className="border-t border-gray-200 my-8" />

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

        <hr className="border-t border-gray-200 my-8" />

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

        <hr className="border-t border-gray-200 my-8" />

        {/* Publisher News Section */}
        <div className="flex flex-col gap-4 w-full">
          <h2 className="font-extrabold text-[28px] leading-8 text-foreground">
            Новинки <SectionHeader href={`/publisher/${issue.publisherSlug}`}>издательства</SectionHeader>
          </h2>
          <div className="overflow-x-auto md:overflow-x-visible scrollbar-hide -mx-4 px-4">
            <div className="flex gap-2 md:gap-3 lg:gap-4">
              {publisherNews.map((newsItem, i) => (
                <IssueCard
                  key={newsItem.id}
                  title={newsItem.title}
                  coverUrl={newsItem.image}
                  href={`/issue/${newsItem.id}`}
                  className={i >= 5 ? "md:hidden lg:flex" : ""}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
