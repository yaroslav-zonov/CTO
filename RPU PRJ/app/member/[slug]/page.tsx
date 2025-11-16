"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { IssueCard } from "@/components/issue-card"
import { FilterTabs } from "@/components/filter-tabs"

export default function MemberPage({ params }: { params: { slug: string } }) {
  const { slug } = params

  const roleTabs = [
    { id: "all", label: "Все" },
    { id: "translation", label: "Перевёл" },
    { id: "lettering", label: "Затайпил" },
    { id: "design", label: "Оформил" },
    { id: "editing", label: "Отредактировал" },
  ]

  const [activeRole, setActiveRole] = useState("all")

  // Mock data - replace with actual data fetching
  const member = {
    nickname: "Никнейм",
    totalIssues: 123,
  }

  const issues = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: "Issue Title",
    image: `/placeholder.svg?height=400&width=300&query=issue ${i + 1}`,
  }))

  return (
    <div className="w-full">
      <Header currentPage="team" />

      <div className="w-full pt-8 pb-8 max-w-[1312px] mx-auto px-4">
        <div className="flex flex-col">
          <h1 className="font-extrabold text-[28px] leading-8 md:text-[56px] md:leading-[64px] text-[#212121]">
            {member.nickname}
          </h1>

          <div className="mt-4">
            <FilterTabs tabs={roleTabs} activeTab={activeRole} onTabChange={setActiveRole} />
          </div>

          <div className="mt-8">
            <h2 className="font-extrabold text-xl md:text-[28px] leading-8 text-foreground mb-4">
              {member.totalIssues} выпуска
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-4 md:gap-x-3 md:gap-y-4 lg:gap-x-4 lg:gap-y-4">
              {issues.map((issue) => (
                <IssueCard
                  key={issue.id}
                  title={issue.title}
                  coverUrl={issue.image}
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
