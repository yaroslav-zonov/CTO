"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState } from "react"

interface SoundEffect {
  sound: string
  translation: string
  meaning: string
  category: "emotions" | "actions" | "nature" | "speech" | "movement"
}

const soundEffects: SoundEffect[] = [
  { sound: "Ahaha", translation: "Хахаха", meaning: "Смех", category: "emotions" },
  { sound: "Aaa", translation: "Ааа", meaning: "Крик", category: "emotions" },
  {
    sound: "Ah, uh, oh, ack, agh, argh",
    translation: "А, ах, ох, ух",
    meaning: "Радость, удивление, предупреждение, страсть, боль, страх, гнев",
    category: "emotions",
  },
  {
    sound: "baBoom",
    translation: "Бах, шарах",
    meaning: "Взрыв, (тяжёлые / быстрые шаги) Удар",
    category: "actions",
  },
  {
    sound: "Ba-Dump",
    translation: "Пшз, тиск",
    meaning: "Напряжение, сжатие, (электрический разряд), (выходящий пар/газ)",
    category: "actions",
  },
  { sound: "Bam", translation: "Дун", meaning: "Удар", category: "actions" },
  {
    sound: "Bam, bang, crash, ka-boom, thump, thud, wham, whomp",
    translation: "Бам, бац, хрясть, стук, блысь, бах",
    meaning: "Быстрый удар",
    category: "actions",
  },
  {
    sound: "Bang, bam, slam",
    translation: "Бам",
    meaning: "Удар, выстрел, драматический эффект",
    category: "actions",
  },
  {
    sound: "Bawhoom, baboom",
    translation: "Быдых, бах, бабах, тыдых",
    meaning: "Взрыв, разрывы от выстрелов",
    category: "nature",
  },
  { sound: "Bite, gnaw", translation: "Хрум-хрум, хруп", meaning: "Кусать, грызть, есть", category: "actions" },
  { sound: "Blam", translation: "Бам", meaning: "Выстрел, взрыв", category: "actions" },
  { sound: "Boing", translation: "Бойнг", meaning: "Прыжок, отскок", category: "movement" },
  { sound: "Bonk", translation: "Бонк", meaning: "Удар по голове", category: "actions" },
  { sound: "Boom", translation: "Бум", meaning: "Взрыв, громкий звук", category: "nature" },
  { sound: "Buzz", translation: "Жжж, бзз", meaning: "Жужжание", category: "nature" },
]

const categoryNames = {
  emotions: "Эмоции",
  actions: "Действия",
  nature: "Природа",
  speech: "Речь",
  movement: "Движение",
}

export default function SoundsPage() {
  const [viewMode, setViewMode] = useState<"alphabetical" | "categories">("alphabetical")

  const sortedSounds = [...soundEffects].sort((a, b) => a.sound.localeCompare(b.sound))

  const groupedSounds = soundEffects.reduce(
    (acc, sound) => {
      if (!acc[sound.category]) {
        acc[sound.category] = []
      }
      acc[sound.category].push(sound)
      return acc
    },
    {} as Record<string, SoundEffect[]>,
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPage="team" activeTeamPage="sounds" />

      <main className="flex-1 bg-white">
        <div className="max-w-[1312px] mx-auto px-4 py-12">
          {/* Page Title */}
          <h1 className="font-extrabold text-[56px] leading-[64px] text-[#212121] mb-8">Звуки в комиксах</h1>

          {/* Filter Tabs */}
          <div className="flex gap-6 mb-8">
            <button
              onClick={() => setViewMode("alphabetical")}
              className={`pb-2 text-xl font-extrabold leading-8 transition-colors ${
                viewMode === "alphabetical"
                  ? "text-[#fc5621] border-b-2 border-[#fc5621]"
                  : "text-[#212121] hover:text-[#fc5621]"
              }`}
            >
              По алфавиту
            </button>
            <button
              onClick={() => setViewMode("categories")}
              className={`pb-2 text-xl font-extrabold leading-8 transition-colors ${
                viewMode === "categories"
                  ? "text-[#fc5621] border-b-2 border-[#fc5621]"
                  : "text-[#212121] hover:text-[#fc5621]"
              }`}
            >
              По категориям
            </button>
          </div>

          {/* Table */}
          <div className="w-full lg:w-2/3">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left py-4 text-sm font-normal leading-4 text-[#212121] align-top">Звук</th>
                    <th className="text-left py-4 text-sm font-normal leading-4 text-[#212121] px-8 align-top">
                      Перевод
                    </th>
                    <th className="text-left py-4 text-sm font-normal leading-4 text-[#212121] align-top">Значение</th>
                  </tr>
                </thead>
                <tbody>
                  {viewMode === "alphabetical" ? (
                    // Alphabetical view
                    sortedSounds.map((sound, index) => (
                      <tr key={index}>
                        <td className="py-4 text-xl font-normal leading-8 text-[#212121] tabular-nums align-top">
                          {sound.sound}
                        </td>
                        <td className="py-4 text-xl font-normal leading-8 text-[#212121] tabular-nums px-8 align-top">
                          {sound.translation}
                        </td>
                        <td className="py-4 text-xl font-normal leading-8 text-[#212121] tabular-nums italic align-top">
                          {sound.meaning}
                        </td>
                      </tr>
                    ))
                  ) : (
                    // Categories view
                    <>
                      {Object.entries(groupedSounds).map(([category, sounds], categoryIndex) => (
                        <>
                          {/* Category header row */}
                          <tr key={`category-${category}`}>
                            <td
                              colSpan={3}
                              className={`pt-8 pb-4 text-xl font-extrabold leading-8 text-[#212121] ${
                                categoryIndex > 0 ? "border-t border-[#E0E0E0]" : ""
                              }`}
                            >
                              {categoryNames[category as keyof typeof categoryNames]}
                            </td>
                          </tr>
                          {/* Sound rows for this category */}
                          {sounds.map((sound, soundIndex) => (
                            <tr key={`${category}-${soundIndex}`}>
                              <td className="py-4 text-xl font-normal leading-8 text-[#212121] tabular-nums align-top">
                                {sound.sound}
                              </td>
                              <td className="py-4 text-xl font-normal leading-8 text-[#212121] tabular-nums px-8 align-top">
                                {sound.translation}
                              </td>
                              <td className="py-4 text-xl font-normal leading-8 text-[#212121] tabular-nums italic align-top">
                                {sound.meaning}
                              </td>
                            </tr>
                          ))}
                        </>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
