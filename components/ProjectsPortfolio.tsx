'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProjectItem {
  name: string;
  category?: string;
  status?: string;
  location?: string;
  time?: string;
  activity?: string;
  role?: string;
  image?: string;
}

interface Props {
  items: ProjectItem[];
  filters: Record<string, string>;
  statusLabels: Record<string, string>;
  labels: Record<string, string>;
  attributionNote: string;
}

const CATEGORY_ORDER = ['all', 'corporate', 'digital', 'industrial', 'development', 'experience'];

const STATUS_CLASS: Record<string, string> = {
  completed: 'akaf-status-deployed',
  underExecution: 'akaf-status-exec',
  inDevelopment: 'akaf-status-dev',
  proposed: 'akaf-status-proposed'
};

export default function ProjectsPortfolio({ items, filters, statusLabels, labels, attributionNote }: Props) {
  const [active, setActive] = useState('all');
  const visible = active === 'all' ? items : items.filter((item) => item.category === active);

  return (
    <>
      <div className="akaf-filter-row" role="group" aria-label="Portfolio filters">
        {CATEGORY_ORDER.filter((key) => filters[key]).map((key) => (
          <button
            key={key}
            type="button"
            className={`akaf-filter-chip ${active === key ? 'active' : ''}`}
            onClick={() => setActive(key)}
            aria-pressed={active === key}
          >
            {filters[key]}
          </button>
        ))}
      </div>

      <p className="akaf-scope-note">{attributionNote}</p>

      <div className="akaf-project-story-list">
        {visible.map((project, index) => {
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
                <div className="akaf-product-head">
                  <h3>{project.name}</h3>
                  {project.status && statusLabels[project.status] && (
                    <span className={`akaf-status-badge ${STATUS_CLASS[project.status] ?? ''}`}>
                      {statusLabels[project.status]}
                    </span>
                  )}
                </div>

                <div className="akaf-project-meta-grid">
                  <div>
                    <span className="akaf-project-meta-label">{labels.location}</span>
                    <p>{project.location ?? '-'}</p>
                  </div>
                  <div>
                    <span className="akaf-project-meta-label">{labels.time}</span>
                    <p>{project.time ?? '-'}</p>
                  </div>
                  <div>
                    <span className="akaf-project-meta-label">{labels.activity}</span>
                    <p>{project.activity ?? '-'}</p>
                  </div>
                  <div>
                    <span className="akaf-project-meta-label">{labels.role}</span>
                    <p>{project.role ?? '-'}</p>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
