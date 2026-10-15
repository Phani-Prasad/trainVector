import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Instagram, Youtube, Phone, MapPin, Mail, ArrowUpRight } from 'lucide-react';
import logo from '../../assets/logo_clean_transparent.png';

const Footer: React.FC = () => (
  <footer className="footer" style={{
    position: 'relative',
    padding: '24px 5% 14px',
    background: '#626a7c',
    borderTop: '1px solid rgba(255, 255, 255, 0.18)',
    color: '#f1f5f9',
    overflow: 'hidden',
  }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
      {/* Top Structured Row: Compact Executive Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '24px',
        alignItems: 'start',
        marginBottom: '18px',
      }}>
        {/* Column 1: Brand & Socials */}
        <div>
          <div style={{
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: '#ffffff',
            padding: '7px 14px',
            borderRadius: '9px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
            marginBottom: '10px',
          }}>
            <img
              src={logo}
              alt="trainVector Logo"
              draggable={false}
              style={{ height: '26px', width: 'auto', objectFit: 'contain', display: 'block', userSelect: 'none' }}
            />
            <span style={{
              color: '#ea580c',
              fontSize: '0.44rem',
              fontWeight: 800,
              letterSpacing: '0.9px',
              textTransform: 'uppercase',
              marginTop: '2px',
              textAlign: 'center',
              width: '100%',
              whiteSpace: 'nowrap',
            }}>
              Intelligence in Action
            </span>
          </div>
          <p style={{
            color: '#f1f5f9',
            fontSize: '0.78rem',
            lineHeight: 1.45,
            maxWidth: '300px',
            marginBottom: '10px',
          }}>
            Applied AI Ecosystem delivering AI products, enterprise cognitive systems architecture and practitioner capability building.
          </p>

          {/* Compact Social Icons */}
          <div style={{ display: 'flex', gap: '6px' }}>
            {[
              { Icon: Linkedin, href: 'https://www.linkedin.com/company/trainvector/about/?viewAsMember=true', label: 'LinkedIn' },
              { Icon: Twitter, href: 'https://x.com/TrainVector9', label: 'Twitter' },
              { Icon: Instagram, href: 'https://www.instagram.com/trainvector9/', label: 'Instagram' },
              { Icon: Youtube, href: 'https://www.youtube.com/@trainVector', label: 'YouTube' },
            ].map(({ Icon, href, label }, idx) => (
              <a
                key={idx}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.12)',
                  border: '1px solid rgba(255, 255, 255, 0.20)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  transition: 'all 0.2s ease',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#f97316';
                  e.currentTarget.style.borderColor = '#f97316';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.20)';
                  e.currentTarget.style.color = '#ffffff';
                }}
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Quick Navigation */}
        <div>
          <div style={{
            fontSize: '0.72rem',
            fontWeight: 800,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            color: '#fed7aa',
            marginBottom: '8px',
          }}>
            Platform & Solutions
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px 12px' }}>
            {[
              { label: 'Home', to: '/' },
              { label: 'AI Products', to: '/products' },
              { label: 'Enterprise Consulting', to: '/consulting' },
              { label: 'Applied Academy', to: '/academy' },
              { label: 'About Us', to: '/about' },
              { label: 'FAQ', to: '/faq' },
            ].map(link => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  color: '#f8fafc',
                  textDecoration: 'none',
                  fontSize: '0.80rem',
                  fontWeight: 600,
                  transition: 'color 0.2s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#fed7aa'}
                onMouseLeave={e => e.currentTarget.style.color = '#f8fafc'}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Column 3: Contact & Headquarters */}
        <div>
          <div style={{
            fontSize: '0.72rem',
            fontWeight: 800,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            color: '#fed7aa',
            marginBottom: '8px',
          }}>
            Contact
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* Phone */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '24px', height: '24px', borderRadius: '5px',
                background: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }}>
                <Phone size={12} color="#fed7aa" />
              </div>
              <a
                href="tel:+918310590859"
                style={{ color: '#ffffff', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 700 }}
                onMouseEnter={e => e.currentTarget.style.color = '#fed7aa'}
                onMouseLeave={e => e.currentTarget.style.color = '#ffffff'}
              >
                +91 83105 90859
              </a>
            </div>

            {/* Address */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <div style={{
                width: '24px', height: '24px', borderRadius: '5px',
                background: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px'
              }}>
                <MapPin size={12} color="#fed7aa" />
              </div>
              <span style={{ fontSize: '0.78rem', color: '#f1f5f9', lineHeight: 1.35 }}>
                50, Bethel Nagar, KR Puram,<br />Bangalore - 560036, India
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Status Tag */}
      <div style={{
        paddingTop: '12px',
        borderTop: '1px solid rgba(255, 255, 255, 0.15)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '8px',
        fontSize: '0.74rem',
        color: '#e2e8f0',
      }}>
        <div>
          &copy; {new Date().getFullYear()} <span style={{ color: '#ffffff', fontWeight: 700 }}>trainVector™</span> · Applied AI Company. All Rights Reserved.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', display: 'inline-block', boxShadow: '0 0 6px #4ade80' }} />
          <span style={{ color: '#f1f5f9', fontSize: '0.72rem', fontWeight: 500 }}>Production AI Systems Active</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

