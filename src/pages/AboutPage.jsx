import React from 'react';
import AboutSection from '../components/AboutSection';
import { CheckCircle, MapPin, Target, Heart } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us – Surgical Mart Nepal</h1>
          <p className="text-lg leading-relaxed">
            Surgical Mart Nepal is a trusted medical and surgical supplies company based in Tripureshwor, Kathmandu, committed to delivering high-quality healthcare products to hospitals, clinics, pharmacies, laboratories, and healthcare professionals across Nepal.
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Founded with a clear mission to simplify access to reliable medical equipment and surgical consumables, Surgical Mart Nepal bridges the gap between healthcare providers and verified suppliers through a technology-driven, customer-first approach.
          </p>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary-700">Who We Are</h2>
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              We are a Nepal-based medical supply platform combining healthcare expertise, modern technology, and efficient logistics. Our goal is simple: ensure that medical professionals get the right products, at the right time, with complete confidence in quality and authenticity.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              From essential surgical instruments and disposables to diagnostic equipment, laboratory items, hospital furniture, and medical consumables, we offer a carefully curated catalog designed to meet everyday clinical and institutional needs.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary-700">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <CheckCircle className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Genuine Surgical & Medical Supplies</h3>
                <p className="text-gray-700">Authentic products sourced from trusted manufacturers</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Hospital-Grade Equipment</h3>
                <p className="text-gray-700">Professional-quality consumables and equipment</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Medical Devices & Diagnostic Tools</h3>
                <p className="text-gray-700">Complete range of diagnostic and testing equipment</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Laboratory & Clinic Essentials</h3>
                <p className="text-gray-700">Everything needed for modern healthcare facilities</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Bulk Institutional Support</h3>
                <p className="text-gray-700">Procurement solutions for hospitals and institutions</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">B2B & Retail Solutions</h3>
                <p className="text-gray-700">Flexible supply options for all business models</p>
              </div>
            </div>
          </div>
          <div className="mt-8 p-6 bg-white border-l-4 border-primary-600 rounded">
            <p className="text-gray-700">
              All products listed on <span className="font-semibold">www.surgicalmartnepal.com</span> are sourced from trusted manufacturers and distributors, ensuring compliance with healthcare standards and consistent performance.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary-700">Why Choose Surgical Mart Nepal?</h2>
          <div className="space-y-6">
            <div className="flex gap-4 pb-6 border-b border-gray-200">
              <MapPin className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-xl text-gray-900 mb-2">Strategic Location in Tripureshwor, Kathmandu</h3>
                <p className="text-gray-700">Enabling faster delivery and easier access for medical supplies across Nepal</p>
              </div>
            </div>
            <div className="flex gap-4 pb-6 border-b border-gray-200">
              <CheckCircle className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-xl text-gray-900 mb-2">Strong Supplier Network</h3>
                <p className="text-gray-700">Verified product sourcing and trusted manufacturer relationships</p>
              </div>
            </div>
            <div className="flex gap-4 pb-6 border-b border-gray-200">
              <CheckCircle className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-xl text-gray-900 mb-2">Competitive Pricing</h3>
                <p className="text-gray-700">Transparent procurement with pricing you can trust</p>
              </div>
            </div>
            <div className="flex gap-4 pb-6 border-b border-gray-200">
              <CheckCircle className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-xl text-gray-900 mb-2">Technology-Enabled Platform</h3>
                <p className="text-gray-700">Modern ordering systems and inventory management</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-xl text-gray-900 mb-2">Dedicated Customer Support</h3>
                <p className="text-gray-700">Expert assistance for all healthcare professionals</p>
              </div>
            </div>
          </div>
          <div className="mt-8 p-6 bg-primary-50 rounded-lg">
            <p className="text-gray-800 text-lg">
              We understand that in healthcare, delays and compromises are not an option. That's why we focus on <span className="font-semibold">availability, accuracy, and accountability</span> in every order we process.
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex gap-4 mb-6">
            <Target className="w-8 h-8 text-primary-600 flex-shrink-0" />
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-700">Our Vision</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                To become one of Nepal's most reliable and technology-driven medical supply platforms, empowering healthcare providers with seamless access to quality surgical and medical products nationwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex gap-4 mb-8">
            <Heart className="w-8 h-8 text-primary-600 flex-shrink-0" />
            <h2 className="text-3xl md:text-4xl font-bold text-primary-700">Our Commitment</h2>
          </div>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            At Surgical Mart Nepal, we are committed to:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-primary-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">✓ Product Authenticity</h3>
              <p className="text-gray-700">Quality assurance and verification of all items</p>
            </div>
            <div className="bg-primary-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">✓ Timely Delivery</h3>
              <p className="text-gray-700">Dependable and fast shipping nationwide</p>
            </div>
            <div className="bg-primary-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">✓ Ethical Practices</h3>
              <p className="text-gray-700">Fair business standards and transparency</p>
            </div>
            <div className="bg-primary-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">✓ Continuous Improvement</h3>
              <p className="text-gray-700">Technology advancement and innovation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-12 md:py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Partner With Us?</h2>
          <p className="text-lg mb-8 leading-relaxed">
            Whether you are a hospital, clinic, laboratory, pharmacy, or an individual healthcare professional, Surgical Mart Nepal is your dependable partner for <span className="font-semibold">medical and surgical supplies in Nepal</span>.
          </p>
          <a 
            href="/products" 
            className="inline-block bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Browse Our Products
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
