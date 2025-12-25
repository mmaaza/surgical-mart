import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

export const useFlashDeals = (params = {}) => {
  return useQuery({
    queryKey: ['flashDeals', params],
    queryFn: async () => {
      const response = await api.get('/flash-deals', { params });
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useFlashDealById = (id) => {
  return useQuery({
    queryKey: ['flashDeal', id],
    queryFn: async () => {
      const response = await api.get(`/flash-deals/${id}`);
      return response.data.data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useFlashDealsAdmin = (params = {}) => {
  return useQuery({
    queryKey: ['flashDealsAdmin', params],
    queryFn: async () => {
      const response = await api.get('/flash-deals/admin/list', { params });
      return response.data.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes for admin view
  });
};
