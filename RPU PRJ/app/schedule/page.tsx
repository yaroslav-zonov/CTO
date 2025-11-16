import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { IssueCard } from "@/components/issue-card"
import Link from "next/link"

export default function SchedulePage() {
  // Mock data for upcoming issues
  const upcomingIssues = Array.from({ length: 13 }, (_, i) => ({
    id: i,
    title: "Issue Title",
    coverUrl: "/comic-book-cover.png",
  }))

  return (
    <div className="w-full">
      <Header />

      <div className="w-full pt-8 pb-8 max-w-[1312px] mx-auto px-4">
        <div className="flex flex-col">
          {/* Page header with title and button */}
          <div className="flex items-start justify-between mb-8">
            <h1 className="font-extrabold text-[56px] leading-[64px] text-[#212121]">Релизная</h1>
            <Link
              href="/add-comic"
              className="bg-[#fc5621] text-white px-6 py-3 rounded-md font-semibold text-base hover:bg-[#e54d1d] transition-colors"
            >
              Добавить комикс
            </Link>
          </div>

          {/* Calendar section */}
          <div className="mb-12">
            <h2 className="font-extrabold text-[28px] leading-8 text-[#212121] mb-6">Календарь релизов</h2>
            <div className="w-full bg-white rounded-lg overflow-hidden border border-[#E0E0E0]">
              <iframe
                src="https://calendar.google.com/calendar/embed?height=600&wkst=2&ctz=Europe%2FMoscow&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&showTz=0&mode=MONTH"
                style={{ border: 0 }}
                width="100%"
                height="600"
                frameBorder="0"
                scrolling="no"
                title="Календарь релизов"
              />
            </div>
          </div>

          {/* Upcoming issues section */}
          <div>
            <h2 className="font-extrabold text-[28px] leading-8 text-[#212121] mb-6">Ожидают публикации</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-4 md:gap-x-3 md:gap-y-4 lg:gap-x-4 lg:gap-y-4">
              {upcomingIssues.map((issue) => (
                <IssueCard
                  key={issue.id}
                  title={issue.title}
                  coverUrl={issue.coverUrl}
                  href={`/issue/${issue.id}`}
                  className="!w-full"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
