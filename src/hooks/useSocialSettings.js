import { useEffect, useState } from 'react';
import api from '../services/api';

// Simple hook to fetch public social settings with safe defaults
export const useSocialSettings = () => {
  const [socialSettings, setSocialSettings] = useState({
    facebook: '',
    instagram: '',
    twitter: '',
    linkedin: '',
    youtube: '',
    tiktok: '',
    whatsapp: '',
    shareMessage: '',
    shareButtonsEnabled: true,
    followButtonsEnabled: true
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSocialSettings = async () => {
      try {
        setLoading(true);
        const response = await api.get('/settings/social');
        if (response.data?.success && response.data?.data) {
          setSocialSettings((prev) => ({ ...prev, ...response.data.data }));
        }
      } catch (err) {
        console.error('Error fetching social settings:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSocialSettings();
  }, []);

  return { socialSettings, loading, error };
};
