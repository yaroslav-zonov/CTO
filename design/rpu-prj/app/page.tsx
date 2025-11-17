import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { IssueCard } from "@/components/issue-card"
import { SeriesCard } from "@/components/series-card"
import { CollectionCard } from "@/components/collection-card"
import { SectionHeader } from "@/components/section-header"
import { getCollectionCardRules, getCollectionSectionLayout } from "@/lib/collection-rules"

export default function HomePage() {
  return (
    <div className="w-full">
      <Header />

      <div className="w-full pt-8">
        <div className="flex flex-col gap-8 pb-8">
          {/* Новые релизы */}
          <section className="flex flex-col gap-4 w-full">
            <div className="max-w-[1312px] mx-auto px-4 w-full">
              <SectionHeader href="/releases">Новые релизы</SectionHeader>
            </div>
            <div className="overflow-x-auto md:overflow-x-visible scrollbar-hide">
              <div className="flex gap-2 md:gap-3 lg:gap-4 pl-4 pr-4 md:max-w-[1312px] md:mx-auto md:px-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <IssueCard
                    key={i}
                    title="Issue Title"
                    coverUrl="/comic-book-cover.png"
                    href={`/issue/${i}`}
                    className={i === 4 ? "md:hidden lg:flex" : ""}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Свежие подборки */}
          <section className="flex flex-col gap-4 w-full max-w-[1312px] mx-auto px-4">
            <SectionHeader href="/collections/fresh">Свежие подборки</SectionHeader>
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

          {/* Новинки издательства */}
          <section className="flex flex-col gap-4 w-full">
            <div className="max-w-[1312px] mx-auto px-4 w-full">
              <h2 className="font-extrabold text-[28px] leading-8 text-foreground">
                Новинки <SectionHeader href="/publisher">издательства</SectionHeader>
              </h2>
            </div>
            <div className="overflow-x-auto md:overflow-x-visible scrollbar-hide">
              <div className="flex gap-2 md:gap-3 lg:gap-4 pl-4 pr-4 md:max-w-[1312px] md:mx-auto md:px-4">
                {Array.from({ length: 7 }).map((_, i) => (
                  <IssueCard
                    key={i}
                    title="Issue Title"
                    coverUrl="/comic-book-cover.png"
                    href={`/issue/${i}`}
                    className={i >= 5 ? "md:hidden lg:flex" : ""}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Популярные подборки */}
          <section className="flex flex-col gap-4 w-full max-w-[1312px] mx-auto px-4">
            <h2 className="font-extrabold text-[28px] leading-8 text-foreground">Популярные подборки</h2>
            <div className={getCollectionSectionLayout(3)}>
              {Array.from({ length: 3 }).map((_, i) => {
                const rules = getCollectionCardRules(3, i)
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

          {/* Популярные серии */}
          <section className="flex flex-col gap-4 w-full">
            <div className="max-w-[1312px] mx-auto px-4 w-full">
              <h2 className="font-extrabold text-[28px] leading-8 text-foreground">Популярные серии</h2>
            </div>
            <div className="overflow-x-auto md:overflow-x-visible scrollbar-hide">
              <div className="flex gap-2 md:gap-3 lg:gap-4 pl-4 pr-4 md:max-w-[1312px] md:mx-auto md:px-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <SeriesCard
                    key={i}
                    title="Full series title"
                    issueCount={123}
                    coverUrl="/comic-series-cover.jpg"
                    href={`/series/${i}`}
                    className={i === 4 ? "md:hidden lg:flex" : ""}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Промо подборка */}
          <section className="flex flex-col gap-4 w-full max-w-[1312px] mx-auto px-4">
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

          {/* Новинки издательства (repeat) */}
          <section className="flex flex-col gap-4 w-full">
            <div className="max-w-[1312px] mx-auto px-4 w-full">
              <h2 className="font-extrabold text-[28px] leading-8 text-foreground">
                Новинки <SectionHeader href="/publisher">издательства</SectionHeader>
              </h2>
            </div>
            <div className="overflow-x-auto md:overflow-x-visible scrollbar-hide">
              <div className="flex gap-2 md:gap-3 lg:gap-4 pl-4 pr-4 md:max-w-[1312px] md:mx-auto md:px-4">
                {Array.from({ length: 7 }).map((_, i) => (
                  <IssueCard
                    key={i}
                    title="Issue Title"
                    coverUrl="/comic-book-cover.png"
                    href={`/issue/${i}`}
                    className={i >= 5 ? "md:hidden lg:flex" : ""}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Популярное за месяц */}
          <section className="flex flex-col gap-4 w-full">
            <div className="max-w-[1312px] mx-auto px-4 w-full">
              <h2 className="font-extrabold text-[28px] leading-8 text-foreground">Популярное за месяц</h2>
            </div>
            <div className="overflow-x-auto md:overflow-x-visible scrollbar-hide">
              <div className="flex gap-2 md:gap-3 lg:gap-4 pl-4 pr-4 md:max-w-[1312px] md:mx-auto md:px-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <IssueCard
                    key={i}
                    title="Issue Title"
                    coverUrl="/popular-comic-cover.jpg"
                    href={`/issue/${i}`}
                    size="large"
                    className="min-w-[calc(100vw-32px-16px)] md:min-w-0"
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Коллекция подборок */}
          <section className="flex flex-col gap-4 w-full max-w-[1312px] mx-auto px-4">
            <h2 className="font-extrabold text-[28px] leading-8 text-foreground">Коллекция подборок</h2>
            <div className={getCollectionSectionLayout(5)}>
              {Array.from({ length: 5 }).map((_, i) => {
                const rules = getCollectionCardRules(5, i)
                return (
                  <CollectionCard
                    key={i}
                    title="Full сollection title"
                    issueCount={123}
                    coverUrl="/comic-collection.jpg"
                    href={`/collection/${i}`}
                    aspectRatio={rules.aspectRatio}
                    hideOnMobile={rules.hideOnMobile}
                    hideOnTablet={rules.hideOnTablet}
                  />
                )
              })}
            </div>
          </section>

          {/* Популярные ваншоты */}
          <section className="flex flex-col gap-4 w-full">
            <div className="max-w-[1312px] mx-auto px-4 w-full">
              <h2 className="font-extrabold text-[28px] leading-8 text-foreground">
                Популярные <SectionHeader href="/one-shots">ваншоты</SectionHeader>
              </h2>
            </div>
            <div className="overflow-x-auto md:overflow-x-visible scrollbar-hide">
              <div className="flex gap-2 md:gap-3 lg:gap-4 pl-4 pr-4 md:max-w-[1312px] md:mx-auto md:px-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <IssueCard
                    key={i}
                    title="Issue Title"
                    coverUrl="/one-shot-comic-cover.jpg"
                    href={`/issue/${i}`}
                    className={i === 4 ? "md:hidden lg:flex" : ""}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Промо подборка 2 */}
          <section className="flex flex-col gap-4 w-full max-w-[1312px] mx-auto px-4">
            <SectionHeader href="/collections/promo-2">Промо подборка</SectionHeader>
            <div className={getCollectionSectionLayout(1)}>
              {(() => {
                const rules = getCollectionCardRules(1, 0)
                return (
                  <CollectionCard
                    title="Full сollection title"
                    issueCount={123}
                    coverUrl="/featured-comic-collection.jpg"
                    href="/collection/promo-2"
                    aspectRatio={rules.aspectRatio}
                    hideOnMobile={rules.hideOnMobile}
                    hideOnTablet={rules.hideOnTablet}
                  />
                )
              })()}
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
