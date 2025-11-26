'use client';

import { useTranslations } from 'next-intl';

export default function Testimonials() {
  const t = useTranslations('Testimonials');

  const testimonials = [
    {
      name: 'Ahmed Al-Mansoori',
      restaurant: 'Al-Bustan Restaurant',
      location: 'Muscat, Oman',
      rating: 5,
      text: 'The digital menu system transformed our restaurant. Orders increased by 40% and customers love the easy ordering process.',
      avatar: '👨‍🍳'
    },
    {
      name: 'Sara Khoury',
      restaurant: 'Café Beirut',
      location: 'Beirut, Lebanon',
      rating: 5,
      text: 'Best investment we made! Setup was quick, and the multilingual support is perfect for our international customers.',
      avatar: '👩‍💼'
    },
    {
      name: 'محمد رضایی',
      restaurant: 'رستوران سنتی تهران',
      location: 'تهران، ایران',
      rating: 5,
      text: 'سیستم منوی دیجیتال عالی است. مدیریت منو خیلی آسان شده و مشتریان راضی هستند.',
      avatar: '👨‍💻'
    }
  ];

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <h2>{t('title')}</h2>
          <p className="section-subtitle">{t('subtitle')}</p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-rating">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{testimonial.avatar}</div>
                <div className="testimonial-info">
                  <div className="testimonial-name">{testimonial.name}</div>
                  <div className="testimonial-restaurant">{testimonial.restaurant}</div>
                  <div className="testimonial-location">{testimonial.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


