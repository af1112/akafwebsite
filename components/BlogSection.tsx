'use client';

import { useTranslations } from 'next-intl';

export default function BlogSection() {
  const t = useTranslations('Blog');
  const posts = t.raw('posts') as { title: string; excerpt: string; tag: string }[];

  return (
    <section className="blog-section">
      <div className="container">
        <div className="section-header">
          <p className="eyebrow">{t('subtitle')}</p>
          <h2>{t('title')}</h2>
        </div>
        <div className="blog-grid">
          {posts.map((post) => (
            <article key={post.title} className="blog-card">
              <span className="blog-tag">{post.tag}</span>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <button type="button" className="blog-link">
                {t('readMore')} →
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

