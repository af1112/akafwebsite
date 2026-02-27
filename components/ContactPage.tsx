'use client';

import { useTranslations } from 'next-intl';
import ContactForm from './ContactForm';
import Image from 'next/image';

export default function ContactPage() {
  const t = useTranslations('ContactPage');

  return (
    <>
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <h1 className="contact-hero-title">{t('title')}</h1>
          <p className="contact-hero-subtitle">{t('description')}</p>
          <div className="akaf-page-hero-image akaf-page-inline-visual">
            <Image
              src="/images/hero/contact-hero.png"
              alt={t('title')}
              fill
              sizes="(max-width: 900px) 100vw, 70vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="contact-main">
        <div className="container">
          <div className="contact-layout">
            {/* Left Side - Map */}
            <div className="contact-map-section">
              <h2 className="section-title">{t('map.title')}</h2>
              <p className="section-subtitle">{t('map.description')}</p>
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.5!2d58.2605!3d23.6242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDM3JzI3LjQiTiA1OMKwMTUnMzcuNyJF!5e0!3m2!1sen!2som!4v1700000000000!5m2!1sen!2som"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: '1rem' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="AKAF Office Location - Muscat, Oman"
                />
              </div>
            </div>

            {/* Right Side - Contact Info & Form */}
            <div className="contact-info-section">
              {/* Offices Info */}
              <div className="offices-section">
                <h2 className="section-title">{t('offices.title')}</h2>
                
                {/* Oman Office */}
                <div className="office-card">
                  <div className="office-header">
                    <div className="office-icon">📍</div>
                    <h3>{t('offices.oman.title')}</h3>
                  </div>
                  <div className="office-details">
                    <div className="office-item">
                      <span className="office-label">{t('address')}:</span>
                      <span className="office-value">{t('offices.oman.address')}</span>
                    </div>
                    <div className="office-item">
                      <span className="office-label">{t('phone')}:</span>
                      <a href={`tel:${t('offices.oman.phone').replace(/\s/g, '')}`} className="office-value office-link">
                        {t('offices.oman.phone')}
                      </a>
                    </div>
                    <div className="office-item">
                      <span className="office-label">{t('email')}:</span>
                      <a href={`mailto:${t('offices.oman.email')}`} className="office-value office-link">
                        {t('offices.oman.email')}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Iran Office */}
                <div className="office-card">
                  <div className="office-header">
                    <div className="office-icon">📍</div>
                    <h3>{t('offices.iran.title')}</h3>
                  </div>
                  <div className="office-details">
                    <div className="office-item">
                      <span className="office-label">{t('address')}:</span>
                      <span className="office-value">{t('offices.iran.address')}</span>
                    </div>
                    <div className="office-item">
                      <span className="office-label">{t('postalCode')}:</span>
                      <span className="office-value">{t('offices.iran.postalCode')}</span>
                    </div>
                    <div className="office-item">
                      <span className="office-label">{t('phone')}:</span>
                      <a href={`tel:${t('offices.iran.phone').replace(/\s/g, '')}`} className="office-value office-link">
                        {t('offices.iran.phone')}
                      </a>
                    </div>
                    <div className="office-item">
                      <span className="office-label">{t('whatsapp')}:</span>
                      <a href={`https://wa.me/${t('offices.iran.whatsapp').replace(/\s/g, '')}`} className="office-value office-link" target="_blank" rel="noopener noreferrer">
                        {t('offices.iran.whatsapp')}
                      </a>
                    </div>
                    <div className="office-item">
                      <span className="office-label">{t('email')}:</span>
                      <a href={`mailto:${t('offices.iran.email')}`} className="office-value office-link">
                        {t('offices.iran.email')}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="contact-form-section">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
