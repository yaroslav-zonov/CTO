import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CollectionCard } from "@/components/collection-card"
import { getCollectionCardRules, getCollectionSectionLayout } from "@/lib/collection-rules"

interface CollectionCategoryPageProps {
  params: Promise<{
    category: string
  }>
}

export default async function CollectionCategoryPage({ params }: CollectionCategoryPageProps) {
  const { category } = await params

  // Mock data - in real app, fetch based on category
  const categoryData = {
    title: "Название коллекции",
    description: "Текст подводки коллекции",
    collections: [
      // First section - 2 cards
      {
        count: 2,
        items: Array.from({ length: 2 }).map((_, i) => ({
          id: `collection-${i}`,
          title: "Full сollection title",
          issueCount: 123,
          coverUrl: "/comic-collection-banner.jpg",
        })),
      },
      // Second section - 3 cards
      {
        count: 3,
        items: Array.from({ length: 3 }).map((_, i) => ({
          id: `collection-${i + 2}`,
          title: "Full сollection title",
          issueCount: 123,
          coverUrl: "/comic-collection-banner.jpg",
        })),
      },
      // Third section - 3 cards
      {
        count: 3,
        items: Array.from({ length: 3 }).map((_, i) => ({
          id: `collection-${i + 5}`,
          title: "Full сollection title",
          issueCount: 123,
          coverUrl: "/comic-collection-banner.jpg",
        })),
      },
    ],
  }

  return (
    <div className="w-full">
      <Header />

      <div className="w-full pt-8">
        <div className="flex flex-col gap-8 pb-8 max-w-[1312px] mx-auto px-4">
          {/* Page Title */}
          <div className="flex flex-col gap-4">
            <h1 className="font-extrabold text-[28px] leading-8 md:text-[56px] md:leading-[64px] text-foreground">
              {categoryData.title}
            </h1>
            <p className="text-xl font-normal leading-8 text-foreground tabular-nums">{categoryData.description}</p>
          </div>

          {/* Collection Sections */}
          {categoryData.collections.map((section, sectionIndex) => (
            <section key={sectionIndex} className="w-full">
              <div className={getCollectionSectionLayout(section.count as 1 | 2 | 3 | 4 | 5)}>
                {section.items.map((collection, i) => {
                  const rules = getCollectionCardRules(section.count as 1 | 2 | 3 | 4 | 5, i)
                  return (
                    <CollectionCard
                      key={collection.id}
                      title={collection.title}
                      issueCount={collection.issueCount}
                      coverUrl={collection.coverUrl}
                      href={`/collection/${collection.id}`}
                      aspectRatio={rules.aspectRatio}
                      hideOnMobile={rules.hideOnMobile}
                      hideOnTablet={rules.hideOnTablet}
                    />
                  )
                })}
              </div>
            </section>
          ))}
        </div>

        <div className="pb-8 max-w-[1312px] mx-auto w-full">
          <Footer />
        </div>
      </div>
    </div>
  )
}
