import React from 'react';
import { subscriptionsData } from '../data/subscriptions';
import './Subscriptions.css';

export default function Subscriptions({ onSubscribeClick }) {
  return (
    <section id="subscriptions" className="subscriptions-section">
      <div className="section-header">
        <span className="section-tag">Planes Exclusivos</span>
        <h2>Suscripciones Mensuales Certificadas</h2>
        <p>Selecciona el paquete óptimo adaptado a tu nivel de consumo y exigencia.</p>
      </div>

      <div className="subscriptions-grid">
        {subscriptionsData.map((plan) => (
          <div key={plan.id} className="subscription-card">
            {plan.badge && <span className="card-badge">{plan.badge}</span>}
            <h3 className="plan-title">{plan.title}</h3>
            <div className="plan-price-container">
              <span className="plan-currency">$</span>
              <span className="plan-price">{plan.price}</span>
              <span className="plan-period">/ {plan.period}</span>
            </div>
            <p className="plan-description">{plan.description}</p>
            <ul className="plan-features">
              {plan.features.map((feature, idx) => (
                <li key={idx}>✓ {feature}</li>
              ))}
            </ul>
            <button className="subscribe-btn" onClick={() => onSubscribeClick(plan.title)}>
              Suscribirme Ahora
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}