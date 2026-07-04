import { useEffect, useRef, useState } from "react"
import { HighlightedText } from "./HighlightedText"

const philosophyItems = [
  {
    title: "Толстый металл",
    description:
      "Используем сталь от 3 мм — мангал не прогорает годами и держит жар стабильно, для сочного шашлыка каждый раз.",
  },
  {
    title: "Собственное производство",
    description:
      "Варим и красим мангалы на своей площадке — без посредников. Поэтому цена честная, а качество под нашим контролем.",
  },
  {
    title: "Удобство в быту",
    description:
      "Складные ножки, ручки для переноски, продуманная высота углей — мангал легко перевозить и хранить.",
  },
  {
    title: "Гарантия и сервис",
    description: "Даём гарантию на сварные швы и покрытие. Если что-то не так — заменим или отремонтируем бесплатно.",
  },
]

export function Philosophy() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"))
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.3 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-32 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left column - Title and image */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">О нас</p>
            <h2 className="text-6xl md:text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl">
              Мангалы с
              <br />
              <HighlightedText>характером</HighlightedText>
            </h2>

            <div className="relative hidden lg:block">
              <img
                src="https://cdn.poehali.dev/projects/b0762b92-fc27-4bcb-b289-ae8eaef5bae7/files/b7b87ae9-65de-438b-8a52-2e1c4652c3f2.jpg"
                alt="Мангал в саду на закате"
                className="opacity-90 relative z-10 w-full rounded-sm"
              />
            </div>
          </div>

          {/* Right column - Description and Philosophy items */}
          <div className="space-y-6 lg:pt-48">
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md mb-12">
              Мы — команда @fryingzone, Зона Жарки. Делаем мангалы для тех, кто любит собираться с друзьями у огня. Каждый мангал варим сами и проверяем перед отправкой.
            </p>

            {philosophyItems.map((item, index) => (
              <div
                key={item.title}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                data-index={index}
                className={`transition-all duration-700 ${
                  visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex gap-6">
                  <span className="text-muted-foreground/50 text-sm font-medium">0{index + 1}</span>
                  <div>
                    <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}