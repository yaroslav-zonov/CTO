"use client"

interface FilterTab {
  id: string
  label: string
}

interface FilterTabsProps {
  tabs: FilterTab[]
  activeTab: string
  onTabChange: (tabId: string) => void
}

export function FilterTabs({ tabs, activeTab, onTabChange }: FilterTabsProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`font-extrabold text-[20px] leading-6 underline decoration-1 underline-offset-[5px] transition-colors ${
            tab.id === activeTab
              ? "text-[#fc5621] decoration-[#fc5621]"
              : "text-[#212121] decoration-[rgba(33,33,33,0.1)] hover:text-[#fc5621] hover:decoration-[#fc5621]"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
