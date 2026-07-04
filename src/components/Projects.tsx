import { useState, useEffect, useRef } from "react"
import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Мангал «Классик»",
    category: "Складной",
    location: "Сталь 3 мм",
    year: "от 6 900 ₽",
    image: "https://cdn.poehali.dev/projects/b0762b92-fc27-4bcb-b289-ae8eaef5bae7/files/b11ed849-3c36-428f-bb00-c56668d38d74.jpg",
  },
  {
    id: 2,
    title: "Мангал «Дачник»",
    category: "Стационарный с крышей",
    location: "Сталь 4 мм",
    year: "от 24 900 ₽",
    image: "https://cdn.poehali.dev/projects/b0762b92-fc27-4bcb-b289-ae8eaef5bae7/files/a063bc66-151e-4316-8a7d-59e35e39dd0d.jpg",
  },
  {
    id: 3,
    title: "Мангал «Компакт»",
    category: "Переносной",
    location: "Сталь 2 мм",
    year: "от 4 500 ₽",
    image: "https://cdn.poehali.dev/projects/b0762b92-fc27-4bcb-b289-ae8eaef5bae7/files/3107c7b5-1fa0-4a41-b3b7-7365b4604a09.jpg",
  },
  {
    id: 4,
    title: "Набор «Шеф»",
    category: "Мангал + шампуры",
    location: "Нержавеющая сталь",
    year: "от 9 900 ₽",
    image: "https://cdn.poehali.dev/projects/b0762b92-fc27-4bcb-b289-ae8eaef5bae7/files/608629b1-4355-4995-adc6-192aae91e5ce.jpg",
  },
  {
    id: 5,
    title: "Качели «Лофт»",
    category: "Садовые качели",
    location: "Сталь и дерево",
    year: "от 19 900 ₽",
    image: "https://cdn.poehali.dev/projects/b0762b92-fc27-4bcb-b289-ae8eaef5bae7/files/6ef90b39-cfb0-45c3-b90a-1f14cea6f3ab.jpg",
  },
  {
    id: 6,
    title: "Комплект «Брутал»",
    category: "Садовая мебель",
    location: "Стол и лавки",
    year: "от 27 900 ₽",
    image: "https://cdn.poehali.dev/projects/b0762b92-fc27-4bcb-b289-ae8eaef5bae7/files/25092e31-a32a-4942-9aa9-201e7c05d656.jpg",
  },
]

export function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
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
            <article
              key={project.id}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div ref={(el) => (imageRefs.current[index] = el)} className="relative overflow-hidden aspect-[4/3] mb-6">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredId === project.id ? "scale-105" : "scale-100"
                  }`}
                />
                <div
                  className="absolute inset-0 bg-primary origin-top"
                  style={{
                    transform: revealedImages.has(project.id) ? "scaleY(0)" : "scaleY(1)",
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
          ))}
        </div>
      </div>
    </section>
  )
}