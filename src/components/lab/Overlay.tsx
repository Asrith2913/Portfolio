import Image from "next/image";
import type { ReactNode } from "react";
import { education, experience, projects, site, skills } from "@/data/site";

function Sign({
  children,
  side = "left",
  className = "",
}: {
  children: ReactNode;
  side?: "left" | "right";
  className?: string;
}) {
  return (
    <div
      className={`trail-sign pointer-events-auto rounded-sm px-6 py-6 sm:px-8 sm:py-7 ${
        side === "right" ? "ml-auto" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

function Kicker({ children }: { children: ReactNode }) {
  return <p className="trail-kicker">{children}</p>;
}

export function Overlay() {
  return (
    <main className="relative z-10 pointer-events-none">
      <section id="top" className="flex min-h-[100svh] items-end px-6 pb-20 sm:px-8 lg:items-center lg:px-16 lg:pb-0">
        <Sign className="max-w-md">
          <Kicker>{site.availability}</Kicker>
          <h1 className="trail-title mt-4 font-serif text-5xl leading-[0.94] tracking-tight sm:text-7xl">
            {site.shortName}
            <span className="mt-1 block text-[0.72em] text-[#5c4a32]">{site.name.split(" ").slice(-1)}</span>
          </h1>
          <p className="trail-meta mt-4 font-mono text-[11px] uppercase tracking-[0.16em]">
            {site.title} · {site.location}
          </p>
          <p className="trail-body mt-5 text-[15px] leading-relaxed">{site.pitch}</p>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em]">
            <a href={`mailto:${site.email}`} className="trail-link">
              Email
            </a>
            <a href={site.phoneHref} className="trail-link">
              Call
            </a>
            <a href={site.github} target="_blank" rel="noopener noreferrer" className="trail-link">
              GitHub
            </a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="trail-link">
              LinkedIn
            </a>
            <a href={site.resumeHref} className="trail-link">
              Resume
            </a>
          </div>
        </Sign>
      </section>

      <section id="about" className="flex min-h-[100svh] items-center px-6 py-24 sm:px-8 lg:px-16">
        <Sign side="right" className="max-w-lg">
          <Kicker>About</Kicker>
          <h2 className="trail-title mt-3 font-serif text-4xl leading-tight sm:text-5xl">
            Training is the interesting part. The work is getting a model behind an API.
          </h2>
          <div className="trail-body mt-5 space-y-4 text-[15px] leading-relaxed">
            {site.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Sign>
      </section>

      <section id="experience" className="min-h-[140svh] px-6 py-28 sm:px-8 lg:px-16">
        <Sign className="max-w-2xl">
          <Kicker>The path so far</Kicker>
          <h2 className="trail-title mt-3 max-w-xl font-serif text-4xl leading-tight sm:text-5xl">
            Four teams. Messy inputs, a model that has to hold, and a number I can defend.
          </h2>
          <ol className="mt-10 space-y-8">
            {experience.map((job, index) => (
              <li key={`${job.company}-${job.dates}`} className="border-t border-[#c9b89a] pt-5">
                <p className="trail-kicker">{String(index + 1).padStart(2, "0")}</p>
                <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="trail-title text-lg font-medium sm:text-xl">
                    {job.href ? (
                      <a href={job.href} target="_blank" rel="noopener noreferrer" className="hover:text-[#7a4e22]">
                        {job.role} · {job.company}
                      </a>
                    ) : (
                      <>
                        {job.role} · {job.company}
                      </>
                    )}
                  </h3>
                  <p className="trail-kicker">{job.dates}</p>
                </div>
                <p className="trail-meta mt-1 text-sm">{job.location}</p>
                <ul className="trail-body mt-3 space-y-2 text-sm leading-relaxed">
                  {job.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {job.stack.map((item) => (
                    <li key={item} className="trail-chip rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider">
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Sign>
      </section>

      <section id="projects" className="min-h-[140svh] px-6 py-28 sm:px-8 lg:px-16">
        <Sign className="max-w-xl">
          <Kicker>Built on the way</Kicker>
          <h2 className="trail-title mt-3 font-serif text-4xl leading-tight sm:text-5xl">
            Fraud, agents, guarded RAG, retinal scans, live video.
          </h2>
        </Sign>
        <ol className="mt-8 grid gap-6 lg:grid-cols-2">
          {projects.map((project, index) => (
            <li key={project.name}>
              <Sign className="h-full">
                <p className="trail-kicker">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="trail-title mt-3 font-serif text-3xl">{project.short}</h3>
                <p className="trail-meta mt-1 text-sm">{project.name}</p>
                <p className="trail-body mt-4 text-[15px] leading-relaxed">{project.summary}</p>
                <ul className="trail-title mt-4 space-y-1 text-sm">
                  {project.results.map((result) => (
                    <li key={result}>↳ {result}</li>
                  ))}
                </ul>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <li key={item} className="trail-chip rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider">
                      {item}
                    </li>
                  ))}
                </ul>
              </Sign>
            </li>
          ))}
        </ol>
      </section>

      <section id="skills" className="flex min-h-[100svh] items-center px-6 py-28 sm:px-8 lg:px-16">
        <Sign className="w-full max-w-3xl">
          <Kicker>What I carry</Kicker>
          <h2 className="trail-title mt-3 font-serif text-4xl leading-tight sm:text-5xl">
            Python and PyTorch for the model. LangGraph and FastAPI for the path to production.
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {skills.map((group) => (
              <div key={group.label} className="border-t border-[#c9b89a] pt-4">
                <h3 className="trail-kicker">{group.label}</h3>
                <p className="trail-body mt-3 text-sm leading-7">{group.items.join(" · ")}</p>
              </div>
            ))}
          </div>
        </Sign>
      </section>

      <section id="education" className="flex min-h-[100svh] items-center px-6 py-28 sm:px-8 lg:px-16">
        <Sign side="right" className="max-w-xl">
          <Kicker>Schooling</Kicker>
          <h2 className="trail-title mt-3 font-serif text-4xl leading-tight sm:text-5xl">
            M.S. at NJIT in 2025, after a B.Tech and vision work in Chennai.
          </h2>
          <ul className="mt-8 space-y-6">
            {education.map((item) => (
              <li key={item.school} className="border-t border-[#c9b89a] pt-4">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="trail-title font-serif text-3xl">{item.degree}</h3>
                  <p className="trail-kicker">{item.dates}</p>
                </div>
                <p className="trail-meta mt-1 text-sm">
                  {item.school} · {item.location}
                </p>
              </li>
            ))}
          </ul>
        </Sign>
      </section>

      <section id="contact" className="flex min-h-[100svh] items-end px-6 py-24 sm:px-8 lg:px-16">
        <Sign className="flex w-full max-w-2xl flex-col gap-8 sm:flex-row sm:items-end">
          <div className="relative aspect-[4/5] w-36 overflow-hidden border border-[#c9b89a] bg-[#e7d8be]">
            <Image
              src={site.photo}
              alt={site.photoAlt}
              fill
              sizes="144px"
              className="object-cover object-[center_12%]"
            />
          </div>
          <div>
            <Kicker>Write</Kicker>
            <h2 className="trail-title mt-3 font-serif text-4xl leading-tight sm:text-5xl">
              If you have a messy production problem, I want to hear it.
            </h2>
            <div className="mt-5 flex flex-col gap-2.5 font-mono text-sm">
              <a href={`mailto:${site.email}`} className="trail-link">
                {site.email}
              </a>
              <a href={site.phoneHref} className="trail-link">
                {site.phone}
              </a>
              <a href={site.github} target="_blank" rel="noopener noreferrer" className="trail-link">
                {site.githubLabel}
              </a>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="trail-link">
                {site.linkedinLabel}
              </a>
              <a href={site.resumeHref} className="trail-link">
                Download resume
              </a>
            </div>
          </div>
        </Sign>
      </section>

      <section
        id="thanks"
        className="flex min-h-[100svh] items-center justify-center px-6 py-28 sm:px-8 lg:px-16"
      >
        <div className="max-w-lg text-center pointer-events-auto">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#e0b888]">The path ends here</p>
          <h2 className="trail-inscribe mt-6 font-serif text-6xl leading-[0.92] tracking-tight sm:text-8xl">
            Thank you
          </h2>
          <p className="trail-inscribe-soft mx-auto mt-6 max-w-sm text-base leading-relaxed">
            He walked out past the last gate. If you want to take the next stretch together, write.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-8 inline-block font-mono text-[11px] uppercase tracking-[0.18em] text-[#e0b888] hover:text-[#f3d7a0]"
          >
            {site.email}
          </a>
        </div>
      </section>

      <footer className="relative z-10 pointer-events-auto border-t border-white/10 px-6 py-8 text-xs text-[#d8cbb8] sm:px-8 lg:px-16">
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="font-mono tracking-wide text-[#e0b888]">Press ⌘K to jump</p>
        </div>
      </footer>
    </main>
  );
}
