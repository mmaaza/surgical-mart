import React, { useState } from 'react';
import { useFlashDeals } from '../hooks/useFlashDeals';
import FlashDealCard from '../components/flashDeals/FlashDealCard';
import { Button } from '../components/ui/button';
import * as Select from '@radix-ui/react-select';

const FlashDealsPage = () => {
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('displayOrder');
  const [page, setPage] = useState(1);
  const limit = 12;

  const { data: dealsData, isLoading, error } = useFlashDeals({
    category: category === 'All' ? undefined : category,
    sort,
    page,
    limit
  });

  const categories = ['All', 'New Product', 'Limited Stock', 'Seasonal Sale'];

  if (error) {
    return (
      <div className="min-h-screen bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Flash Deals</h1>
            <p className="text-gray-600">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  const totalPages = dealsData ? Math.ceil(dealsData.total / limit) : 1;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Flash Deals</h1>
          <p className="text-lg text-primary-100">Limited time offers on quality medical supplies</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          {/* Category Filter */}
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category
            </label>
            <Select.Root value={category} onValueChange={setCategory}>
              <Select.Trigger className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white hover:border-gray-400 focus:border-primary-600 focus:ring-1 focus:ring-primary-600 transition-colors">
                <Select.Value />
              </Select.Trigger>
              <Select.Content className="bg-white border border-gray-300 rounded-lg shadow-lg">
                <Select.Viewport className="p-1">
                  {categories.map((cat) => (
                    <Select.Item
                      key={cat}
                      value={cat}
                      className="px-3 py-2 rounded hover:bg-primary-100 cursor-pointer data-[state=checked]:bg-primary-600 data-[state=checked]:text-white"
                    >
                      <Select.ItemText>{cat}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Root>
          </div>

          {/* Sort Filter */}
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Sort By
            </label>
            <Select.Root value={sort} onValueChange={setSort}>
              <Select.Trigger className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white hover:border-gray-400 focus:border-primary-600 focus:ring-1 focus:ring-primary-600 transition-colors">
                <Select.Value />
              </Select.Trigger>
              <Select.Content className="bg-white border border-gray-300 rounded-lg shadow-lg">
                <Select.Viewport className="p-1">
                  <Select.Item
                    value="displayOrder"
                    className="px-3 py-2 rounded hover:bg-primary-100 cursor-pointer data-[state=checked]:bg-primary-600 data-[state=checked]:text-white"
                  >
                    <Select.ItemText>Featured</Select.ItemText>
                  </Select.Item>
                  <Select.Item
                    value="discount"
                    className="px-3 py-2 rounded hover:bg-primary-100 cursor-pointer data-[state=checked]:bg-primary-600 data-[state=checked]:text-white"
                  >
                    <Select.ItemText>Highest Discount</Select.ItemText>
                  </Select.Item>
                </Select.Viewport>
              </Select.Content>
            </Select.Root>
          </div>
        </div>

        {/* Deals Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow animate-pulse h-80" />
            ))}
          </div>
        ) : dealsData && dealsData.data.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {dealsData.data.map((deal) => (
                <FlashDealCard
                  key={deal._id}
                  deal={deal}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <Button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                  Previous
                </Button>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setPage(i + 1)}
                    className={`px-3 py-2 rounded-lg transition-colors ${
                      page === i + 1
                        ? 'bg-primary-600 text-white'
                        : 'border border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <Button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                  Next
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-600 mb-2">No flash deals available</h2>
            <p className="text-gray-500">Check back soon for exciting offers!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashDealsPage;
