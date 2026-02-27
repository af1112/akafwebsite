import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Image from 'next/image';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ProjectsPage' });

  return {
    title: t('title'),
    description: t('description')
  };
}

export default async function ProjectsPage() {
  const t = await getTranslations('ProjectsPage');
  const stats = t.raw('stats') as Array<{ label: string; value: string }>;
  const labels = t.raw('labels') as Record<string, string>;
  const projects = t.raw('items') as Array<{
    name: string;
    location?: string;
    time?: string;
    activity?: string;
    role?: string;
    image?: string;
    challenge?: string;
    solution?: string;
    result?: string;
    sector?: string;
    status?: string;
  }>;

  return (
    <>
      <section className="akaf-page-hero akaf-section-light">
        <div className="container akaf-page-hero-grid">
          <div>
            <h1>{t('title')}</h1>
            <p className="section-subtitle">{t('description')}</p>
            <div className="akaf-page-chip-row">
              {stats.map((stat) => (
                <span key={stat.label} className="akaf-page-chip">{stat.label}: {stat.value}</span>
              ))}
            </div>
          </div>
          <div className="akaf-page-hero-image">
            <Image
              src="/images/hero/projects-hero.webp"
              alt={t('title')}
              fill
              sizes="(max-width: 900px) 100vw, 40vw"
              priority
            />
          </div>
        </div>
      </section>

      <section className="akaf-section">
        <div className="container">
          <div className="section-header">
            <h2>{t('title')}</h2>
            <p className="section-subtitle">{t('description')}</p>
          </div>

          <div className="akaf-stats-grid">
            {stats.map((stat) => (
              <article key={stat.label} className="akaf-stat-card">
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </article>
            ))}
          </div>

          <div className="akaf-project-story-list">
            {projects.map((project, index) => {
              const location = project.location ?? '-';
              const time = project.time ?? project.status ?? '-';
              const activity = project.activity ?? project.sector ?? project.challenge ?? '-';
              const role = project.role ?? project.solution ?? project.result ?? '-';
              const image = project.image ?? '/images/hero/projects-hero.webp';

              return (
                <article
                  key={project.name}
                  className={`akaf-project-story ${index % 2 === 1 ? 'akaf-project-story-reverse' : ''}`}
                >
                  <div className="akaf-project-story-media">
                    <Image
                      src={image}
                      alt={project.name}
                      fill
                      sizes="(max-width: 900px) 100vw, 50vw"
                      className="akaf-project-story-image"
                    />
                  </div>

                  <div className="akaf-project-story-content">
                    <h3>{project.name}</h3>

                    <div className="akaf-project-meta-grid">
                      <div>
                        <span className="akaf-project-meta-label">{labels.location ?? 'Location'}</span>
                        <p>{location}</p>
                      </div>
                      <div>
                        <span className="akaf-project-meta-label">{labels.time ?? 'Execution Time'}</span>
                        <p>{time}</p>
                      </div>
                      <div>
                        <span className="akaf-project-meta-label">{labels.activity ?? 'Activity'}</span>
                        <p>{activity}</p>
                      </div>
                      <div>
                        <span className="akaf-project-meta-label">{labels.role ?? 'AKAF Role'}</span>
                        <p>{role}</p>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
