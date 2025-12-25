import React from 'react';
import CountdownTimer from './CountdownTimer';
import { MdWhatsapp } from 'react-icons/md';
import * as Tooltip from '@radix-ui/react-tooltip';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';

const FlashDealCard = ({ deal }) => {
  const discountPercentage = deal.discountPercentage;

  const getCategoryColor = (category) => {
    switch (category) {
      case 'New Product':
        return 'bg-green-500';
      case 'Limited Stock':
        return 'bg-orange-500';
      case 'Seasonal Sale':
        return 'bg-purple-500';
      default:
        return 'bg-blue-500';
    }
  };

  const handleWhatsAppInquiry = () => {
    // Nepal country code: 977, and remove any non-digit characters
    // Format must be: countrycode+phonenumber (digits only, no +, -, or spaces)
    const phoneNumber = '9779851169537'; // Corrected format
    const message = `Hi, I'm interested in ${deal.productName} from ${deal.brand}. It's currently on flash sale at Rs. ${Math.round(deal.flashPrice)}. Can you provide more details?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="group bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
      {/* Image Container */}
      <AspectRatio.Root ratio={4 / 3} className="relative overflow-hidden bg-gray-100">
        <img
          src={deal.productImage || 'https://via.placeholder.com/300x300?text=Product'}
          alt={deal.productName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {/* Discount Badge */}
        <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full font-bold text-sm">
          -{discountPercentage}%
        </div>

        {/* Category Badge */}
        <div className={`absolute top-3 left-3 text-white px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(deal.category)}`}>
          {deal.category}
        </div>

        {/* Stock Status */}
        {deal.stock <= 10 && deal.stock > 0 && (
          <div className="absolute bottom-3 left-3 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
            Only {deal.stock} left!
          </div>
        )}
      </AspectRatio.Root>

      {/* Content */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 hover:text-primary-600 transition-colors">
          {deal.productName}
        </h3>

        {/* Brand */}
        <p className="text-xs text-gray-500 mt-1 mb-2">{deal.brand}</p>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-primary-600">Rs. {Math.round(deal.flashPrice).toLocaleString()}</span>
          <span className="text-sm text-gray-500 line-through">Rs. {Math.round(deal.originalPrice).toLocaleString()}</span>
        </div>

        {/* Countdown Timer */}
        <div className="mb-4 pb-4 border-b border-gray-200">
          <p className="text-xs text-gray-600 mb-2 font-semibold">Time Left:</p>
          <CountdownTimer endDate={deal.endDate} className="justify-start gap-1" />
        </div>

        {/* Action Buttons */}
        <div className="flex items-stretch">
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button
                  onClick={handleWhatsAppInquiry}
                  className="flex-1 border border-green-500 hover:border-green-600 bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800 h-10 rounded-lg flex items-center justify-center gap-2 text-sm font-semibold transition-colors"
                >
                  <MdWhatsapp className="w-4 h-4" />
                  WhatsApp Inquiry
                </button>
              </Tooltip.Trigger>
              <Tooltip.Content
                className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm"
                sideOffset={5}
              >
                Inquire via WhatsApp
                <Tooltip.Arrow className="fill-gray-900" />
              </Tooltip.Content>
            </Tooltip.Root>
          </Tooltip.Provider>
        </div>
      </div>
    </div>
  );
};

export default FlashDealCard;
