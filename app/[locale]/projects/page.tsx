import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Image from 'next/image';
import ProjectsPortfolio from '@/components/ProjectsPortfolio';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ProjectsPage' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/projects`,
      languages: {
        'en': '/en/projects',
        'fa': '/fa/projects',
        'ar': '/ar/projects'
      }
    }
  };
}

export default async function ProjectsPage() {
  const t = await getTranslations('ProjectsPage');
  const stats = t.raw('stats') as Array<{ label: string; value: string }>;
  const filters = t.raw('filters') as Record<string, string>;
  const statusLabels = t.raw('statusLabels') as Record<string, string>;
  const labels = t.raw('labels') as Record<string, string>;
  const projects = t.raw('items') as Array<{
    name: string;
    category?: string;
    status?: string;
    location?: string;
    time?: string;
    activity?: string;
    role?: string;
    image?: string;
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
          <ProjectsPortfolio
            items={projects}
            filters={filters}
            statusLabels={statusLabels}
            labels={labels}
            attributionNote={t('attributionNote')}
          />
        </div>
      </section>
    </>
  );
}
