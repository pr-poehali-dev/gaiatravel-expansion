import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "В какие регионы доставляете мангалы?",
    answer:
      "Отправляем заказы по всей России транспортными компаниями и курьерскими службами. Упаковываем каждый мангал бережно, чтобы он доехал в идеальном состоянии.",
  },
  {
    question: "Сколько времени занимает изготовление?",
    answer:
      "Стандартные модели отгружаем со склада за 1-2 дня. Мангалы под индивидуальный заказ (нестандартные размеры, гравировка) изготавливаем за 5-10 рабочих дней.",
  },
  {
    question: "Из какой стали делаете мангалы?",
    answer:
      "Используем конструкционную сталь толщиной от 3 до 5 мм в зависимости от модели. Такая толщина не прогорает и служит долгие годы даже при частом использовании.",
  },
  {
    question: "Есть ли гарантия на мангалы?",
    answer:
      "Да, даём гарантию на сварные швы и покрытие. Если обнаружите заводской брак — заменим мангал или отремонтируем бесплатно.",
  },
  {
    question: "Можно ли заказать мангал по индивидуальным размерам?",
    answer:
      "Конечно. Изготавливаем мангалы под любые размеры, с нужной вам высотой, шириной и дополнительными опциями — полкой, крючками, чехлом.",
  },
  {
    question: "Работаете ли вы с бизнесом и базами отдыха?",
    answer:
      "Да, помимо частных заказов делаем мангалы для кафе, ресторанов, баз отдыха и глэмпингов — от одиночных моделей до комплектов на несколько зон отдыха. Возможны оптовые цены и индивидуальные условия.",
  },
  {
    question: "Как оформить заказ?",
    answer:
      "Напишите нам в Telegram @fryingzone или оставьте заявку через форму на сайте — мы свяжемся с вами, поможем выбрать модель и оформим доставку.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Вопросы</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            Частые вопросы
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
              >
                <span className="text-lg font-medium text-foreground transition-colors group-hover:text-foreground/70">
                  {faq.question}
                </span>
                <Plus
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed pb-6 pr-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}