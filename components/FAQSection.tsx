'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function FAQSection() {
  const t = useTranslations('FAQ');
  const items = t.raw('items') as { question: string; answer: string }[];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="faq-section">
      <div className="container">
        <div className="section-header">
          <p className="eyebrow">{t('subtitle')}</p>
          <h2>{t('title')}</h2>
        </div>
        <div className="faq-list">
          {items.map((item, index) => (
            <div key={item.question} className={`faq-item ${openIndex === index ? 'open' : ''}`}>
              <button
                type="button"
                className="faq-question"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span>{item.question}</span>
                <span>{openIndex === index ? '−' : '+'}</span>
              </button>
              {openIndex === index && <p className="faq-answer">{item.answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


