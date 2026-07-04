import { useState, useEffect, useRef } from "react"
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"

const projects = [
  {
    id: 0,
    title: "Мангал «Всё Включено»",
    category: "Раковина, 2 столешницы, жаровня, ракетная печь, дровница",
    location: "280×48×90 см",
    year: "63 000 ₽",
    images: [
      "https://cdn.poehali.dev/projects/b0762b92-fc27-4bcb-b289-ae8eaef5bae7/bucket/a2c2933f-7e1b-4ecb-9afe-ccac0f1b579c.jpeg",
      "https://cdn.poehali.dev/projects/b0762b92-fc27-4bcb-b289-ae8eaef5bae7/bucket/e28349af-747e-481e-8783-7dc79e1b5c51.jpeg",
      "https://cdn.poehali.dev/projects/b0762b92-fc27-4bcb-b289-ae8eaef5bae7/bucket/9045f4db-b1cd-40c5-ad2a-227e771f768e.jpeg",
      "https://cdn.poehali.dev/projects/b0762b92-fc27-4bcb-b289-ae8eaef5bae7/bucket/3b03cbea-467e-4ef4-a7af-f44aa17c19ba.jpeg",
    ],
    isNew: true,
  },
  {
    id: 1,
    title: "Мангал «Мини»",
    category: "Мангал из стали, крышка",
    location: "59×39 см",
    year: "7 000 ₽",
    images: [
      "https://cdn.poehali.dev/projects/b0762b92-fc27-4bcb-b289-ae8eaef5bae7/bucket/ed208f0c-0192-4944-b885-a7b0f806e0e7.jpeg",
      "https://cdn.poehali.dev/projects/b0762b92-fc27-4bcb-b289-ae8eaef5bae7/bucket/2939256f-2d03-4836-b40a-59769bcc928f.jpeg",
      "https://cdn.poehali.dev/projects/b0762b92-fc27-4bcb-b289-ae8eaef5bae7/bucket/611be8da-4d80-4ea8-8e25-3b91922b7ec0.jpeg",
    ],
  },
  {
    id: 2,
    title: "Мангал «Зигзаг»",
    category: "Мангал из стали, узорчатая подошва",
    location: "150×47×86 см",
    year: "20 000 ₽",
    images: [
      "https://cdn.poehali.dev/projects/b0762b92-fc27-4bcb-b289-ae8eaef5bae7/bucket/863280e2-9b49-4daa-95ad-75a5c4883798.jpeg",
      "https://cdn.poehali.dev/projects/b0762b92-fc27-4bcb-b289-ae8eaef5bae7/bucket/d3f84337-2285-4191-b753-a549ec622663.jpeg",
    ],
  },
  {
    id: 3,
    title: "Мангал «Компакт»",
    category: "Переносной",
    location: "Сталь 2 мм",
    year: "от 4 500 ₽",
    images: ["https://cdn.poehali.dev/projects/b0762b92-fc27-4bcb-b289-ae8eaef5bae7/files/3107c7b5-1fa0-4a41-b3b7-7365b4604a09.jpg"],
  },
  {
    id: 4,
    title: "Набор «Шеф»",
    category: "Мангал + шампуры",
    location: "Нержавеющая сталь",
    year: "от 9 900 ₽",
    images: ["https://cdn.poehali.dev/projects/b0762b92-fc27-4bcb-b289-ae8eaef5bae7/files/608629b1-4355-4995-adc6-192aae91e5ce.jpg"],
  },
  {
    id: 5,
    title: "Качели «Лофт»",
    category: "Садовые качели",
    location: "Сталь и дерево",
    year: "от 19 900 ₽",
    images: ["https://cdn.poehali.dev/projects/b0762b92-fc27-4bcb-b289-ae8eaef5bae7/files/6ef90b39-cfb0-45c3-b90a-1f14cea6f3ab.jpg"],
  },
  {
    id: 6,
    title: "Комплект «Брутал»",
    category: "Садовая мебель",
    location: "Стол и лавки",
    year: "от 27 900 ₽",
    images: ["https://cdn.poehali.dev/projects/b0762b92-fc27-4bcb-b289-ae8eaef5bae7/files/25092e31-a32a-4942-9aa9-201e7c05d656.jpg"],
  },
]

interface Project {
  id: number
  title: string
  category: string
  location: string
  year: string
  images: string[]
  isNew?: boolean
}

function ProjectCard({
  project,
  isRevealed,
  cardRef,
}: {
  project: Project
  isRevealed: boolean
  cardRef: (el: HTMLDivElement | null) => void
}) {
  const [hovered, setHovered] = useState(false)
  const [slide, setSlide] = useState(0)
  const hasMultiple = project.images.length > 1

  const goPrev = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setSlide((prev) => (prev === 0 ? project.images.length - 1 : prev - 1))
  }

  const goNext = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setSlide((prev) => (prev === project.images.length - 1 ? 0 : prev + 1))
  }

  return (
    <article
      className="group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        ref={cardRef}
        className={`relative overflow-hidden mb-6 ${
          project.isNew ? "aspect-[4/5] bg-background" : "aspect-[4/3]"
        }`}
      >
        {project.isNew && (
          <span className="absolute top-4 left-4 z-10 bg-orange-200 text-foreground text-xs font-medium tracking-wide uppercase px-3 py-1.5 rounded-full">
            Новинка
          </span>
        )}

        <img
          src={project.images[slide] || "/placeholder.svg"}
          alt={project.title}
          className={`w-full h-full transition-transform duration-700 ${
            project.isNew ? "object-contain" : "object-cover"
          } ${hovered ? "scale-105" : "scale-100"}`}
        />

        {hasMultiple && (
          <>
            <button
              onClick={goPrev}
              aria-label="Предыдущее фото"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={goNext}
              aria-label="Следующее фото"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
              {project.images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setSlide(i)
                  }}
                  aria-label={`Фото ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === slide ? "w-5 bg-white" : "w-1.5 bg-white/60"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        <div
          className="absolute inset-0 bg-primary origin-top"
          style={{
            transform: isRevealed ? "scaleY(0)" : "scaleY(1)",
            transition: "transform 1.5s cubic-bezier(0.76, 0, 0.24, 1)",
          }}
        />
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-medium mb-2 group-hover:underline underline-offset-4">{project.title}</h3>
          <p className="text-muted-foreground text-sm">
            {project.category} · {project.location}
          </p>
        </div>
        <span className="text-muted-foreground/60 text-sm">{project.year}</span>
      </div>
    </article>
  )
}

export function Projects() {
  const [revealedImages, setRevealedImages] = useState<Set<number>>(new Set())
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = imageRefs.current.indexOf(entry.target as HTMLDivElement)
            if (index !== -1) {
              setRevealedImages((prev) => new Set(prev).add(projects[index].id))
            }
          }
        })
      },
      { threshold: 0.2 },
    )

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="py-32 md:py-29 bg-secondary/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Каталог</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">Наши мангалы</h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            Смотреть весь каталог
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              isRevealed={revealedImages.has(project.id)}
              cardRef={(el) => (imageRefs.current[index] = el)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}