"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { IssueCard } from "@/components/issue-card"
import { SeriesCard } from "@/components/series-card"
import { CollectionCard } from "@/components/collection-card"
import { ContentSection } from "@/components/content-section"

export default function CollectionPage({ params }: { params: { slug: string } }) {
  const { slug } = params

  // Mock data - replace with actual data fetching
  const collection = {
    title: "Название подборки",
    description:
      "В нашей новой коллекции мы собрали работы, объединённые общей темой. Каждое произведение предлагает свой взгляд на эту идею, позволяя увидеть её с разных сторон. Мы надеемся, что эти материалы вдохновят вас и подарят новые мысли. Погружайтесь в мир, где каждое слово открывает новые грани темы.",
  }

  // Mixed content: series and issues
  const items = [
    {
      id: 1,
      type: "series" as const,
      title: "Full series title",
      issueCount: 123,
      image: `/placeholder.svg?height=400&width=300&query=series 1`,
    },
    {
      id: 2,
      type: "series" as const,
      title: "Full series title",
      issueCount: 123,
      image: `/placeholder.svg?height=400&width=300&query=series 2`,
    },
    {
      id: 3,
      type: "series" as const,
      title: "Full series title",
      issueCount: 123,
      image: `/placeholder.svg?height=400&width=300&query=series 3`,
    },
    {
      id: 4,
      type: "series" as const,
      title: "Full series title",
      issueCount: 123,
      image: `/placeholder.svg?height=400&width=300&query=series 4`,
    },
    {
      id: 5,
      type: "series" as const,
      title: "Full series title",
      issueCount: 123,
      image: `/placeholder.svg?height=400&width=300&query=series 5`,
    },
    {
      id: 6,
      type: "series" as const,
      title: "Full series title",
      issueCount: 123,
      image: `/placeholder.svg?height=400&width=300&query=series 6`,
    },
    {
      id: 7,
      type: "series" as const,
      title: "Full series title",
      issueCount: 123,
      image: `/placeholder.svg?height=400&width=300&query=series 7`,
    },
    {
      id: 8,
      type: "series" as const,
      title: "Full series title",
      issueCount: 123,
      image: `/placeholder.svg?height=400&width=300&query=series 8`,
    },
    {
      id: 9,
      type: "issue" as const,
      title: "Issue Title",
      image: `/placeholder.svg?height=400&width=300&query=issue 1`,
    },
    {
      id: 10,
      type: "issue" as const,
      title: "Issue Title",
      image: `/placeholder.svg?height=400&width=300&query=issue 2`,
    },
    {
      id: 11,
      type: "issue" as const,
      title: "Issue Title",
      image: `/placeholder.svg?height=400&width=300&query=issue 3`,
    },
    {
      id: 12,
      type: "issue" as const,
      title: "Issue Title",
      image: `/placeholder.svg?height=400&width=300&query=issue 4`,
    },
    {
      id: 13,
      type: "issue" as const,
      title: "Issue Title",
      image: `/placeholder.svg?height=400&width=300&query=issue 5`,
    },
  ]

  const similarCollections = Array.from({ length: 3 }, (_, i) => ({
    id: i + 1,
    title: "Full collection title",
    issueCount: 123,
    image: `/placeholder.svg?height=400&width=300&query=similar collection ${i + 1}`,
  }))

  return (
    <>
      <Header currentPage="collections" />

      <div className="max-w-[1312px] mx-auto px-4 pt-8 pb-8">
        {/* Collection Header */}
        <div className="mb-8">
          <h1 className="font-extrabold text-[56px] leading-[64px] text-foreground mb-4">{collection.title}</h1>
          <div className="lg:w-2/3">
            <p className="text-xl font-normal leading-8 text-foreground tabular-nums">{collection.description}</p>
          </div>
        </div>

        {/* Main Content Grid - Mixed Series and Issues */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-4 md:gap-x-3 md:gap-y-4 lg:gap-x-4 lg:gap-y-4 mb-8">
          {items.map((item) =>
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

        <hr className="border-t border-gray-200 mb-8" />

        {/* Similar Collections Section */}
        <ContentSection title="Похожие подборки">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {similarCollections.map((collection) => (
              <CollectionCard
                key={collection.id}
                title={collection.title}
                issueCount={collection.issueCount}
                coverUrl={collection.image}
                href={`/collection/${collection.id}`}
                aspectRatio="1-1"
              />
            ))}
          </div>
        </ContentSection>
      </div>

      <Footer />
    </>
  )
}
