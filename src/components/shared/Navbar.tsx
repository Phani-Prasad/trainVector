import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo_clean_transparent.png';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Products', to: '/products' },
    { label: 'Enterprise Consulting', to: '/consulting' },
    { label: 'Applied AI Academy', to: '/academy' },
    { label: 'About Us', to: '/about' },
    { label: 'FAQ', to: '/faq' },
  ];

  const isActive = (to: string) => location.pathname === to;

  return (
    <nav
      className={isMobileMenuOpen ? 'mobile-menu-open' : ''}
      style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 100,
        padding: '12px 5%',
        background: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(226, 232, 240, 0.9)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)'
      }}
    >
      <Link to="/" style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none' }}>
        <img
          src={logo}
          alt="trainVector Logo"
          draggable={false}
          style={{ height: '34px', width: 'auto', objectFit: 'contain', userSelect: 'none', display: 'block' } as React.CSSProperties}
        />
        <span style={{
          fontSize: '0.48rem',
          fontWeight: 800,
          letterSpacing: '1px',
          textTransform: 'uppercase',
          color: '#ea580c',
          lineHeight: 1,
          marginTop: '2px',
          width: '100%',
          textAlign: 'center',
          fontFamily: "'Plus Jakarta Sans', Inter, sans-serif",
          whiteSpace: 'nowrap',
        }}>
          Intelligence in Action
        </span>
      </Link>

      <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {navLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            onClick={() => setIsMobileMenuOpen(false)}
            className="nav-link-text"
            style={{
              color: isActive(link.to) ? '#ea580c' : '#334155',
              textDecoration: 'none',
              fontSize: '0.88rem',
              fontWeight: isActive(link.to) ? 800 : 600,
              padding: '6px 14px',
              borderRadius: '8px',
              transition: 'all 0.2s ease',
              background: isActive(link.to) ? 'rgba(249, 115, 22, 0.10)' : 'transparent',
              border: isActive(link.to) ? '1px solid rgba(249, 115, 22, 0.25)' : '1px solid transparent',
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <button
        className="hamburger-btn"
        onClick={() => setIsMobileMenuOpen(v => !v)}
        aria-label="Toggle menu"
        style={{
          display: 'none',
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '8px', padding: '8px', cursor: 'pointer',
          flexDirection: 'column', gap: '5px', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <span style={{ display: 'block', width: '22px', height: '2px', background: isMobileMenuOpen ? '#f97316' : '#cbd5e1', transition: 'all 0.3s ease', transform: isMobileMenuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
        <span style={{ display: 'block', width: '22px', height: '2px', background: isMobileMenuOpen ? '#f97316' : '#cbd5e1', transition: 'all 0.3s ease', opacity: isMobileMenuOpen ? 0 : 1 }} />
        <span style={{ display: 'block', width: '22px', height: '2px', background: isMobileMenuOpen ? '#f97316' : '#cbd5e1', transition: 'all 0.3s ease', transform: isMobileMenuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
      </button>

      {isMobileMenuOpen && (
        <div style={{
          position: 'fixed', top: '72px', left: 0, right: 0,
          background: 'rgba(18, 28, 48, 0.96)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)', padding: '16px 5%',
          display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 99
        }}>
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                color: isActive(link.to) ? '#f97316' : '#e2e8f0',
                textDecoration: 'none', fontSize: '1rem', fontWeight: 700,
                padding: '12px 16px', borderRadius: '10px',
                background: isActive(link.to) ? 'rgba(249, 115, 22, 0.15)' : 'transparent',
                border: isActive(link.to) ? '1px solid rgba(249, 115, 22, 0.3)' : '1px solid transparent',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
