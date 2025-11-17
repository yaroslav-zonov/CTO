import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

export default function VacanciesPage() {
  const jobPositions = [
    {
      title: "Переводчик",
      description:
        "Чтобы стать переводчиком, пройди тест: переведи комикс. Срок выполнения — 2 недели. Главное — это твой навык.\n\nРаботай в Google Docs или Word, переводя все, включая имена и надписи, указывая номера страниц. Каждый пузырь должен быть на отдельной строке, а слова, которые нужно выделить, отмечай жирным и курсивом, как в оригинале.",
    },
    {
      title: "Оформитель",
      description:
        "Чтобы стать оформителем, нужно сдать один комикс или предоставить уже оформленный. Срок выполнения — 2 недели, но если нужно больше времени, просто сообщи. Проверка теста занимает 2-5 дней. Опыт не важен, главное — желание учиться.",
    },
    {
      title: "Тайпер",
      description:
        "Тайпер занимается вставкой текста в пузыри. Это проще, чем у оформителя. Опыт не нужен, главное — желание учиться.",
    },
    {
      title: "Универсал",
      description: "Чтобы стать универсалом, пройди тесты на переводчика и оформителя отдельно.",
    },
    {
      title: "Редактор",
      description:
        'Редактор проверяет и корректирует переводы. Для этой роли нужно хорошо знать русский язык (не ниже уровня "хорошист").',
    },
  ]

  return (
    <div className="w-full">
      <Header currentPage="team" activeTeamPage="vacancies" />

      <div className="w-full pt-8">
        <div className="max-w-[1312px] mx-auto px-4 pb-8">
          <h1 className="mb-6 font-extrabold text-[56px] leading-[64px] text-foreground">Вакансии</h1>

          <div className="lg:w-2/3">
            <p className="mb-8 font-normal text-xl leading-8 text-foreground tabular-nums">
              Мы ищем увлеченных и талантливых людей в нашу команду! Если ты хочешь работать в дружной атмосфере и
              развиваться, ознакомься с вакансиями ниже.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            {/* Job listings */}
            <div className="flex flex-col gap-8">
              {jobPositions.map((job, index) => (
                <div key={index}>
                  <h2 className="mb-4 font-extrabold text-[28px] leading-8 text-foreground">{job.title}</h2>
                  <p className="font-normal text-xl leading-8 text-foreground tabular-nums whitespace-pre-line">
                    {job.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Contact card */}
            <div className="lg:sticky lg:top-8 h-fit">
              <div className="border border-border p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Oleg_D" />
                    <AvatarFallback>OD</AvatarFallback>
                  </Avatar>
                  <Link
                    href="/member/oleg-d"
                    className="font-extrabold text-xl leading-8 text-foreground underline decoration-[rgba(33,33,33,0.1)] decoration-1 underline-offset-[5px] hover:text-[#fc5621] transition-colors"
                  >
                    Oleg_D
                  </Link>
                </div>
                <p className="font-normal text-xl leading-8 text-foreground tabular-nums">
                  Чтобы получить тестовое задание, пиши Олегу в личные сообщения
                </p>
                <Link
                  href="https://vk.com/oleg_d"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-extrabold text-xl leading-8 text-foreground underline decoration-[rgba(33,33,33,0.1)] decoration-1 underline-offset-[5px] hover:text-[#fc5621] transition-colors"
                >
                  Вконтакте
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="pb-8 max-w-[1312px] mx-auto w-full">
          <Footer />
        </div>
      </div>
    </div>
  )
}
