import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useContactSettings } from '../../hooks/useContactSettings';
import { useSocialSettings } from '../../hooks/useSocialSettings';

const SocialIcon = ({ platform }) => {
  const common = "h-6 w-6";
  switch (platform) {
    case 'facebook':
      return (
        <svg className={common} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M22 12a10 10 0 1 0-11.563 9.875v-6.988H7.898V12h2.54V9.797c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.887h-2.33v6.989A10.002 10.002 0 0 0 22 12Z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg className={common} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 7.338A4.667 4.667 0 1 0 12 16.67a4.667 4.667 0 0 0 0-9.333Zm0 7.6a2.933 2.933 0 1 1 0-5.866 2.933 2.933 0 0 1 0 5.866ZM16.79 6.2a1.09 1.09 0 1 1 0-2.18 1.09 1.09 0 0 1 0 2.18Z" />
          <path d="M20.4 4.2A4.2 4.2 0 0 0 15.8 0H8.2A4.2 4.2 0 0 0 4 4.2v7.6h0v8A4.2 4.2 0 0 0 8.2 24h7.6a4.2 4.2 0 0 0 4.2-4.2v-8h0V4.2ZM19 19.8a2.8 2.8 0 0 1-2.8 2.8H7.8A2.8 2.8 0 0 1 5 19.8V11h0V4.2A2.8 2.8 0 0 1 7.8 1.4h8.4A2.8 2.8 0 0 1 19 4.2V11h0v8.8Z" />
        </svg>
      );
    case 'twitter':
      return (
        <svg className={common} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M22.46 6.01c-.77.35-1.6.58-2.46.69a4.28 4.28 0 0 0 1.88-2.37 8.47 8.47 0 0 1-2.7 1.03 4.24 4.24 0 0 0-7.3 3.87 12.03 12.03 0 0 1-8.73-4.42 4.23 4.23 0 0 0 1.31 5.66 4.2 4.2 0 0 1-1.92-.53v.05a4.24 4.24 0 0 0 3.4 4.16c-.33.1-.67.15-1.03.15-.25 0-.5-.02-.74-.07a4.25 4.25 0 0 0 3.96 2.94 8.51 8.51 0 0 1-5.27 1.82c-.34 0-.68-.02-1.01-.06A12 12 0 0 0 8.1 21c7.73 0 11.96-6.41 11.96-11.97 0-.18-.01-.36-.02-.54a8.45 8.45 0 0 0 2.07-2.16Z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg className={common} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4.98 3.5a2.49 2.49 0 1 1 0 4.98 2.49 2.49 0 0 1 0-4.98ZM3 9h4v12H3V9Zm7 0h3.8v1.64h.05a4.17 4.17 0 0 1 3.75-2.06C20.5 8.58 22 10.5 22 13.71V21h-4v-6.36c0-1.52-.03-3.48-2.12-3.48-2.12 0-2.45 1.65-2.45 3.37V21H10V9Z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg className={common} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M21.6 7.2a2.4 2.4 0 0 0-1.69-1.7C18.16 5 12 5 12 5s-6.16 0-7.91.5a2.4 2.4 0 0 0-1.69 1.7A25.5 25.5 0 0 0 2.9 12a25.5 25.5 0 0 0-.5 4.8 2.4 2.4 0 0 0 1.69 1.7C5.84 19 12 19 12 19s6.16 0 7.91-.5a2.4 2.4 0 0 0 1.69-1.7A25.5 25.5 0 0 0 21.1 12a25.5 25.5 0 0 0 .5-4.8Zm-11.5 7.7V9.1l4.7 2.9-4.7 2.9Z" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg className={common} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M21.1 8.1c-1.73-.06-3.19-.5-4.45-1.4-.12-.08-.24-.17-.36-.26v6.32a5.14 5.14 0 1 1-5.13-5.13c.35 0 .69.04 1.02.1v2.1a2.95 2.95 0 1 0 1.45 2.56V2h2.13c.12 1.23.59 2.2 1.42 2.93.82.73 1.94 1.17 3.38 1.3v1.87Z" />
        </svg>
      );
    case 'whatsapp':
      return (
        <svg className={common} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12.02 2a9.8 9.8 0 0 0-8.4 14.8L2 22l5.35-1.6A9.78 9.78 0 0 0 12.02 22 9.8 9.8 0 0 0 12.02 2Zm0 17.54c-1.5 0-2.96-.4-4.24-1.17l-.3-.18-3.17.94.94-3.09-.2-.32a7.56 7.56 0 1 1 13.45-4.48 7.56 7.56 0 0 1-7.48 7.1Zm4.1-5.68c-.22-.11-1.3-.64-1.5-.71-.2-.08-.35-.11-.5.1-.15.22-.58.7-.7.85-.13.15-.26.17-.48.06-.22-.11-.92-.34-1.75-1.1-.64-.57-1.07-1.27-1.2-1.48-.13-.22-.01-.34.1-.46.1-.1.22-.26.33-.38.11-.13.15-.22.22-.37.07-.15.04-.28-.02-.4-.06-.11-.5-1.2-.68-1.64-.18-.44-.37-.38-.5-.39h-.43c-.15 0-.4.06-.61.28-.2.22-.8.78-.8 1.9 0 1.12.82 2.2.93 2.35.11.15 1.6 2.43 3.86 3.34.54.23.96.37 1.29.48.54.17 1.04.15 1.43.09.44-.06 1.3-.53 1.48-1.05.18-.52.18-.97.12-1.05-.06-.08-.2-.13-.42-.24Z" />
        </svg>
      );
    default:
      return null;
  }
};

const Footer = () => {
  const { contactSettings } = useContactSettings();
  const { socialSettings } = useSocialSettings();

  const socialLinks = [
    { name: 'Facebook', key: 'facebook', href: socialSettings.facebook },
    { name: 'Instagram', key: 'instagram', href: socialSettings.instagram },
    { name: 'Twitter', key: 'twitter', href: socialSettings.twitter },
    { name: 'LinkedIn', key: 'linkedin', href: socialSettings.linkedin },
    { name: 'YouTube', key: 'youtube', href: socialSettings.youtube },
    { name: 'TikTok', key: 'tiktok', href: socialSettings.tiktok },
    { name: 'WhatsApp', key: 'whatsapp', href: socialSettings.whatsapp },
  ].filter(link => Boolean(link.href));

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        {/* Back to top button */}
        <div className="text-center mb-10">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-6 rounded-md transition duration-300"
          >
            Back to top
          </button>
        </div>

        {/* Main footer sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <img 
                src="/uploads/logo-main.png" 
                alt="Surgical Mart Nepal" 
                className="h-10 w-auto object-contain brightness-0 invert mr-3"
              />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-primary-400 leading-tight">Surgical Mart</span>
                <span className="text-primary-300/80 text-xs leading-tight">Nepal</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Your trusted partner for quality medical supplies and equipment in Nepal.
            </p>
            
            {/* Contact Information */}
            <div className="space-y-2">
              <a 
                href={`mailto:${contactSettings.email}`}
                className="flex items-center text-sm text-gray-400 hover:text-primary-400 transition-colors"
              >
                <Mail className="w-4 h-4 mr-2" />
                {contactSettings.email}
              </a>
              <a 
                href={`tel:${contactSettings.phone}`}
                className="flex items-center text-sm text-gray-400 hover:text-primary-400 transition-colors"
              >
                <Phone className="w-4 h-4 mr-2" />
                {contactSettings.phone}
              </a>
              <div className="flex items-start text-sm text-gray-400">
                <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                <span>
                  {contactSettings.streetAddress && `${contactSettings.streetAddress},`}
                  {contactSettings.city && <><br />{contactSettings.city},</>}
                  {contactSettings.province && <><br />{contactSettings.province}</>}
                </span>
              </div>
              <div className="flex items-start text-sm text-gray-400">
                <Clock className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <div>Weekdays: {contactSettings.weekdaysHours}</div>
                  <div>Weekends: {contactSettings.weekendsHours}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary-400">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="hover:text-primary-400 transition-colors">All Products</Link></li>
              <li><Link to="/categories" className="hover:text-primary-400 transition-colors">Categories</Link></li>
              <li><Link to="/brands" className="hover:text-primary-400 transition-colors">Brands</Link></li>
            </ul>
          </div>

          {/* My Account */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary-400">My Account</h3>
            <ul className="space-y-2">
              <li><Link to="/login" className="hover:text-primary-400 transition-colors">Login</Link></li>
              <li><Link to="/signup" className="hover:text-primary-400 transition-colors">Sign Up</Link></li>
              <li><Link to="/account" className="hover:text-primary-400 transition-colors">Dashboard</Link></li>
              <li><Link to="/account/orders" className="hover:text-primary-400 transition-colors">My Orders</Link></li>
              <li><Link to="/account/wishlist" className="hover:text-primary-400 transition-colors">My Wishlist</Link></li>
              <li><Link to="/cart" className="hover:text-primary-400 transition-colors">Shopping Cart</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary-400">Stay Connected</h3>
            <p className="mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="mb-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-2 w-full border border-gray-700 bg-gray-800 rounded-l focus:outline-none focus:border-primary-500"
                />
                <button
                  type="submit"
                  className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-r transition duration-300"
                >
                  Subscribe
                </button>
              </div>
            </form>
            {socialSettings.followButtonsEnabled && socialLinks.length > 0 && (
              <div className="flex space-x-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.key}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary-400"
                  >
                    <span className="sr-only">{link.name}</span>
                    <SocialIcon platform={link.key} />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Copyright and Legal */}
        <div className="border-t border-gray-800 pt-8">
          <div className="text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Surgical Mart Nepal. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
