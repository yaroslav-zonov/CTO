"use client"

import { useState } from "react"

import type React from "react"
import { Plus } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function AddComicPage() {
  const [formData, setFormData] = useState({
    cover: null as File | null,
    title: "",
    publisher: "",
    series: "",
    description: "",
    volumeNumber: "",
    storyTitle: "",
    downloadLink: "",
    translator: "",
    designer: "",
    typer: "",
    editor: "",
    team: "Russian Project Universe",
    jointTeam: "",
    support: "",
    reader: "",
    keywords: "",
  })

  const [coverPreview, setCoverPreview] = useState<string | null>(null)

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, cover: file })
      const reader = new FileReader()
      reader.onloadend = () => {
        setCoverPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const isFormValid = () => {
    return (
      formData.cover &&
      formData.title &&
      formData.publisher &&
      formData.series &&
      formData.translator &&
      formData.designer &&
      formData.downloadLink
    )
  }

  const getMissingFields = () => {
    const missing = []
    if (!formData.cover) missing.push("Обложка")
    if (!formData.title) missing.push("Заголовок")
    if (!formData.publisher) missing.push("Издательство")
    if (!formData.series) missing.push("Серия")
    if (!formData.translator) missing.push("Переводчик")
    if (!formData.designer) missing.push("Оформитель")
    if (!formData.downloadLink) missing.push("Ссылка на скачивание")
    return missing
  }

  return (
    <>
      <Header currentPage="comics" />
      <main className="mx-auto max-w-[1312px] px-4 py-8">
        <h1 className="mb-8 font-extrabold text-[56px] leading-[64px] text-[#212121]">Добавить комикс</h1>

        <div className="lg:w-2/3">
          <div className="bg-muted rounded-lg p-8">
            {/* Cover Upload */}
            <div className="mb-6 grid grid-cols-[200px_1fr] gap-4 items-start">
              <label className="text-right text-xl font-normal leading-8 text-[#212121] pt-2">Обложка</label>
              <div className="relative">
                <input type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" id="cover-upload" />
                <label
                  htmlFor="cover-upload"
                  className="flex items-center justify-center w-full aspect-[2/3] max-w-[240px] bg-white rounded-lg border-2 border-dashed border-[#E0E0E0] cursor-pointer hover:border-[#fc5621] transition-colors"
                >
                  {coverPreview ? (
                    <img
                      src={coverPreview || "/placeholder.svg"}
                      alt="Cover preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <Plus className="w-12 h-12 text-[#212121]" />
                  )}
                </label>
              </div>
            </div>

            {/* Title */}
            <div className="mb-6 grid grid-cols-[200px_1fr] gap-4 items-center">
              <label className="text-right text-xl font-normal leading-8 text-[#212121]">Заголовок</label>
              <Input
                placeholder="Например, Amazing Spider-Man #099"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="text-xl"
              />
            </div>

            {/* Publisher and Series */}
            <div className="mb-6 grid grid-cols-[200px_1fr] gap-4 items-center">
              <label className="text-right text-xl font-normal leading-8 text-[#212121]">Издательство,серия</label>
              <div className="flex gap-4">
                <Select
                  value={formData.publisher}
                  onValueChange={(value) => setFormData({ ...formData, publisher: value })}
                >
                  <SelectTrigger className="w-full text-xl">
                    <SelectValue placeholder="Издательство" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Marvel">Marvel</SelectItem>
                    <SelectItem value="DC">DC</SelectItem>
                    <SelectItem value="Image">Image</SelectItem>
                    <SelectItem value="Dark Horse">Dark Horse</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={formData.series} onValueChange={(value) => setFormData({ ...formData, series: value })}>
                  <SelectTrigger className="w-full text-xl">
                    <SelectValue placeholder="Серия" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1985 (2008)">1985 (2008)</SelectItem>
                    <SelectItem value="2000 (2018)">2000 (2018)</SelectItem>
                    <SelectItem value="2015 (2023)">2015 (2023)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6 grid grid-cols-[200px_1fr] gap-4 items-start">
              <label className="text-right text-xl font-normal leading-8 text-[#212121] pt-2">Описание</label>
              <Textarea
                placeholder="Краткий синопсис выпуска"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="min-h-[120px] text-xl"
              />
            </div>

            {/* Volume Number */}
            <div className="mb-6 grid grid-cols-[200px_1fr] gap-4 items-center">
              <label className="text-right text-xl font-normal leading-8 text-[#212121]">Номер тома</label>
              <Select
                value={formData.volumeNumber}
                onValueChange={(value) => setFormData({ ...formData, volumeNumber: value })}
              >
                <SelectTrigger className="w-full text-xl">
                  <SelectValue placeholder="Одиночный выпуск" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Одиночный выпуск</SelectItem>
                  <SelectItem value="vol1">Том 1</SelectItem>
                  <SelectItem value="vol2">Том 2</SelectItem>
                  <SelectItem value="vol3">Том 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Story Title */}
            <div className="mb-6 grid grid-cols-[200px_1fr] gap-4 items-center">
              <label className="text-right text-xl font-normal leading-8 text-[#212121]">Название сюжета</label>
              <Input
                placeholder="Например, Amazing Spider-Man #099"
                value={formData.storyTitle}
                onChange={(e) => setFormData({ ...formData, storyTitle: e.target.value })}
                className="text-xl"
              />
            </div>

            {/* Download Link */}
            <div className="mb-6 grid grid-cols-[200px_1fr] gap-4 items-center">
              <label className="text-right text-xl font-normal leading-8 text-[#212121]">Ссылка на скачивание</label>
              <Input
                placeholder="https://disk.yandex.ru/d/RuS51AnPr0J3c7"
                value={formData.downloadLink}
                onChange={(e) => setFormData({ ...formData, downloadLink: e.target.value })}
                className="text-xl"
              />
            </div>

            {/* Help Text */}
            <div className="mb-6 grid grid-cols-[200px_1fr] gap-4">
              <div />
              <p className="text-sm text-[#757575] leading-relaxed">
                Начните вводить никнейм, чтобы увидеть подсказку.
                <br />
                Обязательно укажите переводчика и оформителя.
              </p>
            </div>

            {/* Translator */}
            <div className="mb-6 grid grid-cols-[200px_1fr] gap-4 items-center">
              <label className="text-right text-xl font-normal leading-8 text-[#212121]">Переводчик</label>
              <Input
                placeholder="Никнейм"
                value={formData.translator}
                onChange={(e) => setFormData({ ...formData, translator: e.target.value })}
                className="text-xl"
              />
            </div>

            {/* Designer */}
            <div className="mb-6 grid grid-cols-[200px_1fr] gap-4 items-center">
              <label className="text-right text-xl font-normal leading-8 text-[#212121]">Оформитель</label>
              <Input
                placeholder="Никнейм"
                value={formData.designer}
                onChange={(e) => setFormData({ ...formData, designer: e.target.value })}
                className="text-xl"
              />
            </div>

            {/* Typer */}
            <div className="mb-6 grid grid-cols-[200px_1fr] gap-4 items-center">
              <label className="text-right text-xl font-normal leading-8 text-[#212121]">Тайпер</label>
              <Input
                placeholder="Никнейм"
                value={formData.typer}
                onChange={(e) => setFormData({ ...formData, typer: e.target.value })}
                className="text-xl"
              />
            </div>

            {/* Editor */}
            <div className="mb-6 grid grid-cols-[200px_1fr] gap-4 items-center">
              <label className="text-right text-xl font-normal leading-8 text-[#212121]">Редактор</label>
              <Input
                placeholder="Никнейм"
                value={formData.editor}
                onChange={(e) => setFormData({ ...formData, editor: e.target.value })}
                className="text-xl"
              />
            </div>

            {/* Optional Fields Help Text */}
            <div className="mb-6 grid grid-cols-[200px_1fr] gap-4">
              <div />
              <p className="text-sm text-[#757575] leading-relaxed">
                Опциональные поля.
                <br />
                Заполните, если необходимо.
              </p>
            </div>

            {/* Team */}
            <div className="mb-6 grid grid-cols-[200px_1fr] gap-4 items-center">
              <label className="text-right text-xl font-normal leading-8 text-[#212121]">Команда</label>
              <Input
                value={formData.team}
                onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                className="text-xl"
              />
            </div>

            {/* Joint Team */}
            <div className="mb-6 grid grid-cols-[200px_1fr] gap-4 items-center">
              <label className="text-right text-xl font-normal leading-8 text-[#212121]">Совместно с</label>
              <Input
                placeholder="Название команды"
                value={formData.jointTeam}
                onChange={(e) => setFormData({ ...formData, jointTeam: e.target.value })}
                className="text-xl"
              />
            </div>

            {/* Support */}
            <div className="mb-6 grid grid-cols-[200px_1fr] gap-4 items-start">
              <label className="text-right text-xl font-normal leading-8 text-[#212121] pt-2">При поддержке</label>
              <Textarea
                placeholder=""
                value={formData.support}
                onChange={(e) => setFormData({ ...formData, support: e.target.value })}
                className="min-h-[120px] text-xl"
              />
            </div>

            {/* Reader */}
            <div className="mb-6 grid grid-cols-[200px_1fr] gap-4 items-center">
              <label className="text-right text-xl font-normal leading-8 text-[#212121]">Читалка</label>
              <Input
                placeholder=""
                value={formData.reader}
                onChange={(e) => setFormData({ ...formData, reader: e.target.value })}
                className="text-xl"
              />
            </div>

            {/* Keywords */}
            <div className="mb-8 grid grid-cols-[200px_1fr] gap-4 items-center">
              <label className="text-right text-xl font-normal leading-8 text-[#212121]">Ключевые слова</label>
              <Input
                placeholder=""
                value={formData.keywords}
                onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                className="text-xl"
              />
            </div>

            {/* Submit Button */}
            <div className="grid grid-cols-[200px_1fr] gap-4">
              <div />
              <div>
                <Button
                  disabled={!isFormValid()}
                  className={`px-8 py-2 rounded-md text-white font-extrabold text-xl transition-colors ${
                    isFormValid() ? "bg-[#fc5621] hover:bg-[#e64a1a]" : "bg-[#E0E0E0] text-[#757575] cursor-not-allowed"
                  }`}
                >
                  Добавить
                </Button>
                {!isFormValid() && (
                  <p className="mt-2 text-sm text-[#757575]">Осталось заполнить: {getMissingFields().join(", ")}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
