import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Image from 'next/image';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'PartnershipsPage' });

  return {
    title: t('title'),
    description: t('description')
  };
}

export default async function PartnershipsPage() {
  const t = await getTranslations('PartnershipsPage');
  const areas = t.raw('areas') as string[];
  const highlights = t.raw('highlights') as Array<{ title: string; value: string }>;
  const partners = t.raw('partners') as Array<{
    name: string;
    country: string;
    role: string;
    focus: string;
    status: string;
    website: string;
    logo: string;
    summary: string;
    expertise: string[];
  }>;
  const references = t.raw('galvatoreReferences') as Array<{ label: string; file: string }>;
  const partnerVisuals: Record<string, string> = {
    Galvatore: '/images/partners/galvatore-scene.webp',
    DKM: '/images/partners/dkm-scene.jpg',
    SINO: '/images/partners/sino-scene.jpg',
    'Baixin Machinery': '/images/partners/baixin-scene.jpg',
    FRAMECAD: '/images/partners/framecad-scene.webp',
    CMS: '/images/partners/cms-scene.png'
  };

  return (
    <>
      <section className="akaf-page-hero akaf-section-light">
        <div className="container akaf-page-hero-grid">
          <div>
            <h1>{t('title')}</h1>
            <p className="section-subtitle">{t('description')}</p>
            <div className="akaf-page-chip-row">
              {highlights.map((highlight) => (
                <span key={highlight.title} className="akaf-page-chip">
                  {highlight.title}: {highlight.value}
                </span>
              ))}
            </div>
          </div>
          <div className="akaf-page-hero-image">
            <Image
              src="/images/hero/partnerships-hero.png"
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
            <h2>{t('strategicTitle')}</h2>
            <p className="section-subtitle">{t('strategicDescription')}</p>
          </div>

          <div className="akaf-two-col">
            <article className="akaf-info-card">
              <h3>{t('growthTitle')}</h3>
              <p>{t('growthDescription')}</p>
            </article>
            <article className="akaf-info-card">
              <h3>{t('teamTitle')}</h3>
              <p>{t('teamDescription')}</p>
            </article>
          </div>

          <div className="section-header" style={{ marginTop: '2rem' }}>
            <h2>{t('partnersTitle')}</h2>
            <p className="section-subtitle">{t('partnersSubtitle')}</p>
          </div>
          <div className="akaf-partner-story-list">
            {partners.map((partner, index) => {
              const visual = partnerVisuals[partner.name] ?? '/images/hero/partnerships-hero.png';

              return (
                <article
                  key={partner.name}
                  className={`akaf-partner-story ${index % 2 === 1 ? 'akaf-partner-story-reverse' : ''}`}
                >
                  <div className="akaf-partner-story-media">
                    <Image
                      src={visual}
                      alt={`${partner.name} partnership visual`}
                      fill
                      sizes="(max-width: 900px) 100vw, 50vw"
                      className="akaf-partner-story-image"
                    />
                  </div>

                  <div className="akaf-partner-story-content">
                    <div className="akaf-partner-story-top">
                      <span className="akaf-service-index">{String(index + 1).padStart(2, '0')}</span>
                      <div className="akaf-partner-logo-wrap">
                        <Image
                          src={partner.logo}
                          alt={`${partner.name} logo`}
                          width={210}
                          height={80}
                          className="akaf-partner-logo"
                        />
                      </div>
                    </div>

                    <h3>{partner.name}</h3>
                    <p className="akaf-partner-story-lead">{partner.summary}</p>
                    <p><strong>{t('labels.focus')}:</strong> {partner.focus}</p>
                    <p><strong>{t('labels.role')}:</strong> {partner.role}</p>
                    <p><strong>{t('labels.country')}:</strong> {partner.country}</p>
                    <p><strong>{t('labels.status')}:</strong> {partner.status}</p>

                    <div className="akaf-project-meta">
                      {partner.expertise.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>

                    <a className="akaf-partner-link akaf-partner-link-cta" href={partner.website} target="_blank" rel="noopener noreferrer">
                      {t('labels.website')}
                    </a>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="section-header" style={{ marginTop: '2rem' }}>
            <h2>{t('galvatoreNoteTitle')}</h2>
            <p className="section-subtitle">{t('galvatoreNoteDescription')}</p>
          </div>
          <div className="akaf-two-col">
            <article className="akaf-info-card">
              <h3>{t('galvatoreHydrogenTitle')}</h3>
              <p>{t('galvatoreHydrogenDescription')}</p>
            </article>
            <article className="akaf-info-card">
              <h3>{t('galvatoreOilGasTitle')}</h3>
              <p>{t('galvatoreOilGasDescription')}</p>
            </article>
          </div>

          <div className="akaf-page-chip-row" style={{ marginTop: '1.25rem' }}>
            {references.map((reference) => (
              <a
                key={reference.file}
                className="akaf-partner-link akaf-page-chip"
                href={`/Temp/${reference.file}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {reference.label}
              </a>
            ))}
          </div>

          <div className="section-header" style={{ marginTop: '2rem' }}>
            <h2>{t('areasTitle')}</h2>
          </div>
          <div className="akaf-services-grid">
            {areas.map((area, index) => (
              <article key={area} className="akaf-service-card">
                <span className="akaf-service-index">{String(index + 1).padStart(2, '0')}</span>
                <p>{area}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
