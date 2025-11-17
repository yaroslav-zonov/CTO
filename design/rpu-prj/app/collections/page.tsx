import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CollectionCard } from "@/components/collection-card"
import { SectionHeader } from "@/components/section-header"
import { getCollectionCardRules, getCollectionSectionLayout } from "@/lib/collection-rules"

export default function CollectionsPage() {
  return (
    <div className="w-full">
      <Header />

      <div className="w-full pt-8">
        <div className="flex flex-col gap-8 pb-8 max-w-[1312px] mx-auto px-4">
          {/* Page Title */}
          <h1 className="font-extrabold text-[28px] leading-8 md:text-[56px] md:leading-[64px] text-foreground">
            Подборки
          </h1>

          {/* Новые - 2 cards */}
          <section className="flex flex-col gap-4 w-full">
            <h2 className="font-extrabold text-[28px] leading-8 text-foreground">Новые</h2>
            <div className={getCollectionSectionLayout(2)}>
              {Array.from({ length: 2 }).map((_, i) => {
                const rules = getCollectionCardRules(2, i)
                return (
                  <CollectionCard
                    key={i}
                    title="Full сollection title"
                    issueCount={123}
                    coverUrl="/comic-collection-banner.jpg"
                    href={`/collection/${i}`}
                    aspectRatio={rules.aspectRatio}
                    hideOnMobile={rules.hideOnMobile}
                    hideOnTablet={rules.hideOnTablet}
                  />
                )
              })}
            </div>
          </section>

          {/* Популярные - 3 cards */}
          <section className="flex flex-col gap-4 w-full">
            <h2 className="font-extrabold text-[28px] leading-8 text-foreground">Популярные</h2>
            <div className={getCollectionSectionLayout(3)}>
              {Array.from({ length: 3 }).map((_, i) => {
                const rules = getCollectionCardRules(3, i)
                return (
                  <CollectionCard
                    key={i}
                    title="Full сollection title"
                    issueCount={123}
                    coverUrl="/comic-collection-banner.jpg"
                    href={`/collection/popular-${i}`}
                    aspectRatio={rules.aspectRatio}
                    hideOnMobile={rules.hideOnMobile}
                    hideOnTablet={rules.hideOnTablet}
                  />
                )
              })}
            </div>
          </section>

          {/* Промо подборка - 1 card */}
          <section className="flex flex-col gap-4 w-full">
            <SectionHeader href="/collections/promo">Промо подборка</SectionHeader>
            <div className={getCollectionSectionLayout(1)}>
              {(() => {
                const rules = getCollectionCardRules(1, 0)
                return (
                  <CollectionCard
                    title="Full сollection title"
                    issueCount={123}
                    coverUrl="/featured-comic-collection.jpg"
                    href="/collection/promo"
                    aspectRatio={rules.aspectRatio}
                    hideOnMobile={rules.hideOnMobile}
                    hideOnTablet={rules.hideOnTablet}
                  />
                )
              })()}
            </div>
          </section>

          {/* Издательства - 3 cards */}
          <section className="flex flex-col gap-4 w-full">
            <SectionHeader href="/collections/publishers">Издательства</SectionHeader>
            <div className={getCollectionSectionLayout(3)}>
              {Array.from({ length: 3 }).map((_, i) => {
                const rules = getCollectionCardRules(3, i)
                return (
                  <CollectionCard
                    key={i}
                    title="Full сollection title"
                    issueCount={123}
                    coverUrl="/comic-collection-banner.jpg"
                    href={`/collections/publisher-${i}`}
                    aspectRatio={rules.aspectRatio}
                    hideOnMobile={rules.hideOnMobile}
                    hideOnTablet={rules.hideOnTablet}
                  />
                )
              })}
            </div>
          </section>

          {/* Авторы - 5 cards */}
          <section className="flex flex-col gap-4 w-full">
            <SectionHeader href="/collections/authors">Авторы</SectionHeader>
            <div className={getCollectionSectionLayout(5)}>
              {Array.from({ length: 5 }).map((_, i) => {
                const rules = getCollectionCardRules(5, i)
                return (
                  <CollectionCard
                    key={i}
                    title="Full сollection title"
                    issueCount={123}
                    coverUrl="/comic-collection-banner.jpg"
                    href={`/collection/author-${i}`}
                    aspectRatio={rules.aspectRatio}
                    hideOnMobile={rules.hideOnMobile}
                    hideOnTablet={rules.hideOnTablet}
                  />
                )
              })}
            </div>
          </section>

          {/* Персонажи - 4 cards */}
          <section className="flex flex-col gap-4 w-full">
            <SectionHeader href="/collections/characters">Персонажи</SectionHeader>
            <div className={getCollectionSectionLayout(4)}>
              {Array.from({ length: 4 }).map((_, i) => {
                const rules = getCollectionCardRules(4, i)
                return (
                  <CollectionCard
                    key={i}
                    title="Full сollection title"
                    issueCount={123}
                    coverUrl="/comic-collection-banner.jpg"
                    href={`/collection/character-${i}`}
                    aspectRatio={rules.aspectRatio}
                    hideOnMobile={rules.hideOnMobile}
                    hideOnTablet={rules.hideOnTablet}
                  />
                )
              })}
            </div>
          </section>

          {/* Глобальные события - 3 cards */}
          <section className="flex flex-col gap-4 w-full">
            <SectionHeader href="/collections/events">Глобальные события</SectionHeader>
            <div className={getCollectionSectionLayout(3)}>
              {Array.from({ length: 3 }).map((_, i) => {
                const rules = getCollectionCardRules(3, i)
                return (
                  <CollectionCard
                    key={i}
                    title="Full сollection title"
                    issueCount={123}
                    coverUrl="/comic-collection-banner.jpg"
                    href={`/collection/event-${i}`}
                    aspectRatio={rules.aspectRatio}
                    hideOnMobile={rules.hideOnMobile}
                    hideOnTablet={rules.hideOnTablet}
                  />
                )
              })}
            </div>
          </section>

          {/* Жанры - 5 cards */}
          <section className="flex flex-col gap-4 w-full">
            <SectionHeader href="/collections/genres">Жанры</SectionHeader>
            <div className={getCollectionSectionLayout(5)}>
              {Array.from({ length: 5 }).map((_, i) => {
                const rules = getCollectionCardRules(5, i)
                return (
                  <CollectionCard
                    key={i}
                    title="Full сollection title"
                    issueCount={123}
                    coverUrl="/comic-collection-banner.jpg"
                    href={`/collection/genre-${i}`}
                    aspectRatio={rules.aspectRatio}
                    hideOnMobile={rules.hideOnMobile}
                    hideOnTablet={rules.hideOnTablet}
                  />
                )
              })}
            </div>
          </section>
        </div>

        <div className="pb-8 max-w-[1312px] mx-auto w-full">
          <Footer />
        </div>
      </div>
    </div>
  )
}
