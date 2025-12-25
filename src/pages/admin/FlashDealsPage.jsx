import React, { useMemo, useState } from 'react';
import { useFlashDealsAdmin } from '../../hooks/useFlashDeals';
import api from '../../services/api';
import { Button } from '../../components/ui/button';
import MediaUploadButton from '../../components/ui/MediaUploadButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as Dialog from '@radix-ui/react-dialog';
import { MdEdit, MdDelete, MdAdd, MdClose } from 'react-icons/md';

const AdminFlashDealsPage = () => {
  const apiBaseUrl = useMemo(() => {
    const raw = import.meta.env.VITE_API_URL || '';
    if (!raw) return '';
    try {
      const url = new URL(raw);
      // Strip trailing /api if present so we can hit /uploads on the same origin
      url.pathname = url.pathname.replace(/\/api\/?$/, '');
      return url.toString().replace(/\/$/, '');
    } catch (e) {
      return raw.replace(/\/api\/?$/, '');
    }
  }, []);

  const buildMediaUrl = (url) => {
    if (!url) return '';
    if (/^https?:\/\//i.test(url)) return url;
    if (apiBaseUrl) {
      return `${apiBaseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
    }
    return url;
  };

  const [status, setStatus] = useState('all');
  const [category, setCategory] = useState('All');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState(null);
  const [formData, setFormData] = useState({
    productName: '',
    brand: '',
    productImages: [],
    discountPercentage: '',
    originalPrice: '',
    flashPrice: '',
    startDate: '',
    endDate: '',
    expiryDate: '',
    category: 'Limited Stock',
    stock: '',
    description: ''
  });

  const queryClient = useQueryClient();
  const { data: deals = [], isLoading, error } = useFlashDealsAdmin({ status, category });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (data) => api.post('/flash-deals', data),
    onSuccess: () => {
      queryClient.invalidateQueries(['flashDealsAdmin']);
      setIsCreateDialogOpen(false);
      resetForm();
      alert('Flash deal created successfully!');
    },
    onError: (error) => {
      alert('Error: ' + error.response?.data?.error || error.message);
    }
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: (data) => api.put(`/flash-deals/${editingDeal._id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['flashDealsAdmin']);
      setEditingDeal(null);
      resetForm();
      alert('Flash deal updated successfully!');
    },
    onError: (error) => {
      alert('Error: ' + error.response?.data?.error || error.message);
    }
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/flash-deals/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['flashDealsAdmin']);
      alert('Flash deal deleted successfully!');
    },
    onError: (error) => {
      alert('Error: ' + error.response?.data?.error || error.message);
    }
  });

  const resetForm = () => {
    setFormData({
      productName: '',
      brand: '',
      productImages: [],
      discountPercentage: '',
      originalPrice: '',
      flashPrice: '',
      startDate: '',
      endDate: '',
      expiryDate: '',
      category: 'Limited Stock',
      stock: '',
      description: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMediaSelect = (selectedMedia) => {
    const normalizedMedia = Array.isArray(selectedMedia)
      ? selectedMedia
      : selectedMedia
        ? [selectedMedia]
        : [];

    setFormData(prev => ({
      ...prev,
      productImages: normalizedMedia
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const selectedImages = Array.isArray(formData.productImages) ? formData.productImages : [];

    // Validate image is selected
    if (selectedImages.length === 0) {
      alert('Please select a product image');
      return;
    }

    // Get image URL from media library
    const productImage = buildMediaUrl(selectedImages[0]?.url);
    
    const submitData = {
      productName: formData.productName,
      brand: formData.brand,
      productImage: productImage,
      discountPercentage: parseInt(formData.discountPercentage),
      originalPrice: parseFloat(formData.originalPrice),
      flashPrice: parseFloat(formData.flashPrice),
      startDate: formData.startDate,
      endDate: formData.endDate,
      expiryDate: formData.expiryDate || null,
      category: formData.category,
      stock: parseInt(formData.stock) || 0,
      description: formData.description
    };

    if (editingDeal) {
      updateMutation.mutate(submitData);
    } else {
      createMutation.mutate(submitData);
    }
  };

  const handleEdit = (deal) => {
    setEditingDeal(deal);
    setFormData({
      productName: deal.productName,
      brand: deal.brand,
      productImages: deal.productImage ? [{ url: buildMediaUrl(deal.productImage) }] : [],
      discountPercentage: deal.discountPercentage,
      originalPrice: deal.originalPrice,
      flashPrice: deal.flashPrice,
      startDate: new Date(deal.startDate).toISOString().slice(0, 16),
      endDate: new Date(deal.endDate).toISOString().slice(0, 16),
      expiryDate: deal.expiryDate ? new Date(deal.expiryDate).toISOString().slice(0, 10) : '',
      category: deal.category,
      stock: deal.stock,
      description: deal.description
    });
    setIsCreateDialogOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this flash deal?')) {
      deleteMutation.mutate(id);
    }
  };

  const getStatusBadgeColor = (deal) => {
    const now = new Date();
    const startDate = new Date(deal.startDate);
    const endDate = new Date(deal.endDate);

    if (endDate <= now) return 'bg-gray-100 text-gray-700';
    if (startDate > now) return 'bg-blue-100 text-blue-700';
    return 'bg-primary-100 text-primary-700';
  };

  const getStatusText = (deal) => {
    const now = new Date();
    const startDate = new Date(deal.startDate);
    const endDate = new Date(deal.endDate);

    if (endDate <= now) return 'Expired';
    if (startDate > now) return 'Upcoming';
    return 'Active';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-primary-600 uppercase tracking-wide">Marketing</p>
          <h1 className="text-3xl font-bold text-gray-900">Flash Deals</h1>
          <p className="text-gray-500 mt-1">Create, schedule, and monitor limited-time offers.</p>
        </div>
        <Dialog.Root open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <Dialog.Trigger asChild>
            <Button
              onClick={() => {
                setEditingDeal(null);
                resetForm();
              }}
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm"
            >
              <MdAdd className="w-5 h-5" />
              New Flash Deal
            </Button>
          </Dialog.Trigger>

          {/* Create/Edit Dialog */}
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm" />
            <Dialog.Content className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-6 flex justify-between items-center border-b border-primary-100">
                <div>
                  <Dialog.Title className="text-2xl font-bold text-white">
                    {editingDeal ? 'Edit Flash Deal' : 'Create New Flash Deal'}
                  </Dialog.Title>
                  <p className="text-primary-100 text-sm mt-1">
                    {editingDeal ? 'Update deal details' : 'Add a new time-limited flash deal'}
                  </p>
                </div>
                <Dialog.Close className="text-white hover:bg-primary-500 p-2 rounded-lg transition-colors">
                  <MdClose className="w-6 h-6" />
                </Dialog.Close>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                {/* Product Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-primary-900 mb-2">
                      Product Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="productName"
                      value={formData.productName}
                      onChange={handleInputChange}
                      placeholder="e.g., Surgical Mask (Box of 50)"
                      className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary-900 mb-2">
                      Brand <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleInputChange}
                      placeholder="e.g., MediCare"
                      className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Product Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-primary-900 mb-2">
                    Product Image <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-3">
                    {formData.productImages && formData.productImages.length > 0 && (
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden ring-2 ring-primary-100">
                        <img 
                          src={buildMediaUrl(formData.productImages[0].url)} 
                          alt="Product preview" 
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => setFormData(prev => ({ ...prev, productImages: [] }))}
                          className="absolute top-1 right-1 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
                          type="button"
                        >
                          <MdClose className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    <MediaUploadButton
                      onSelect={handleMediaSelect}
                      selectedMedia={formData.productImages}
                      className="w-full justify-center"
                      type="button"
                    />
                  </div>
                </div>

                {/* Grid: Discount & Stock */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-primary-900 mb-2">
                      Discount <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="discountPercentage"
                        value={formData.discountPercentage}
                        onChange={handleInputChange}
                        min="1"
                        max="100"
                        placeholder="10"
                        className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        required
                      />
                      <span className="absolute right-4 top-3 text-primary-600 font-semibold">%</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary-900 mb-2">
                      Stock Available
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      min="0"
                      placeholder="50"
                      className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Grid: Prices */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-primary-900 mb-2">
                      Original Price <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-3 text-gray-500">Rs.</span>
                      <input
                        type="number"
                        name="originalPrice"
                        value={formData.originalPrice}
                        onChange={handleInputChange}
                        step="0.01"
                        placeholder="0.00"
                        className="w-full pl-10 pr-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary-900 mb-2">
                      Flash Sale Price <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-3 text-green-600 font-semibold">Rs.</span>
                      <input
                        type="number"
                        name="flashPrice"
                        value={formData.flashPrice}
                        onChange={handleInputChange}
                        step="0.01"
                        placeholder="0.00"
                        className="w-full pl-10 pr-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-green-50"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Grid: Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-primary-900 mb-2">
                      Sale Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="datetime-local"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">When the flash sale begins</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary-900 mb-2">
                      Sale End Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="datetime-local"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-orange-50"
                      required
                    />
                    <p className="text-xs text-orange-600 mt-1 font-semibold">When the flash sale ends (mandatory)</p>
                  </div>
                </div>

                {/* Product Expiry Date */}
                <div>
                  <label className="block text-sm font-semibold text-primary-900 mb-2">
                    Product Expiry Date <span className="text-gray-400 text-xs">(Optional)</span>
                  </label>
                  <input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">When the product itself expires (optional - use this to show expiry indicator)</p>
                </div>

                {/* Category & Description */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-primary-900 mb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all appearance-none cursor-pointer bg-white"
                      required
                    >
                      <option value="New Product">New Product</option>
                      <option value="Limited Stock">Limited Stock</option>
                      <option value="Seasonal Sale">Seasonal Sale</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary-900 mb-2">
                      Description
                    </label>
                    <input
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="e.g., Limited time only!"
                      className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6 border-t border-primary-100">
                  <button
                    type="submit"
                    disabled={createMutation.isPending || updateMutation.isPending}
                    className="flex-1 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold py-3 px-6 rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                  >
                    {editingDeal ? 'Update Deal' : 'Create Deal'}
                  </button>
                  <Dialog.Close className="px-6 py-3 border border-primary-300 text-primary-700 font-semibold rounded-lg hover:bg-primary-50 transition-all">
                    Cancel
                  </Dialog.Close>
                </div>
              </form>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-3 w-full md:w-auto">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-300 text-sm w-full md:w-48"
          >
            <option value="all">All Deals</option>
            <option value="active">Active</option>
            <option value="upcoming">Upcoming</option>
            <option value="expired">Expired</option>
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-300 text-sm w-full md:w-48"
          >
            <option value="All">All Categories</option>
            <option value="New Product">New Product</option>
            <option value="Limited Stock">Limited Stock</option>
            <option value="Seasonal Sale">Seasonal Sale</option>
          </select>
        </div>
        <div className="text-xs text-gray-500">
          {deals.length} deal{deals.length === 1 ? '' : 's'} shown
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading flash deals...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-600">Error loading flash deals: {error.message}</p>
        </div>
      ) : deals.length > 0 ? (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-primary-600 to-primary-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wide">Product</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wide">Discount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wide">Price</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wide">Category</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wide">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {deals.map((deal) => {
                const isExpiring = new Date(deal.endDate) - new Date() < 24 * 60 * 60 * 1000;
                return (
                  <tr key={deal._id} className="hover:bg-primary-50 transition-colors">
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                          <img src={buildMediaUrl(deal.productImage)} alt={deal.productName} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{deal.productName}</div>
                          <div className="text-xs text-gray-500">{deal.brand}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="font-bold text-primary-700 bg-primary-50 px-3 py-1 rounded-full text-xs">-{deal.discountPercentage}%</span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="font-semibold text-primary-700">Rs. {Math.round(deal.flashPrice).toLocaleString()}</div>
                      <div className="text-xs text-gray-400 line-through">Rs. {Math.round(deal.originalPrice).toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-semibold">
                        {deal.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        isExpiring 
                          ? 'bg-amber-100 text-amber-800' 
                          : getStatusBadgeColor(deal)
                      }`}>
                        {isExpiring ? 'Expiring Soon' : getStatusText(deal)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm flex gap-2">
                      <button
                        onClick={() => handleEdit(deal)}
                        className="p-2 text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
                        title="Edit deal"
                      >
                        <MdEdit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(deal._id)}
                        disabled={deleteMutation.isPending}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                        title="Delete deal"
                      >
                        <MdDelete className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No flash deals found</p>
          <Button
            onClick={() => {
              setEditingDeal(null);
              resetForm();
              setIsCreateDialogOpen(true);
            }}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg"
          >
            Create First Flash Deal
          </Button>
        </div>
      )}
    </div>
  );
};

export default AdminFlashDealsPage;
