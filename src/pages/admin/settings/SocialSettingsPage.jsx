import React, { useEffect, useState } from 'react';
import { getSocialSettings, updateSocialSettings } from '../../../services/api';

const SocialSettingsPage = () => {
  const [form, setForm] = useState({
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
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true);
        const res = await getSocialSettings();
        setForm((prev) => ({
          ...prev,
          ...(res?.data || {})
        }));
      } catch (err) {
        setError(err?.error || 'Failed to load social settings');
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      await updateSocialSettings(form);
      setSuccess('Social settings saved');
    } catch (err) {
      setError(err?.error || 'Failed to save social settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-admin-slate-900 dark:text-admin-slate-100">Social Media Settings</h1>
        <p className="mt-1 text-sm text-admin-slate-600 dark:text-admin-slate-400">
          Manage your social media presence and sharing options
        </p>
      </div>

      <div className="bg-white dark:bg-admin-slate-800 shadow-sm rounded-lg">
        <form className="p-6 space-y-6" onSubmit={handleSubmit}>
          {(error || success) && (
            <div className={error ? 'text-red-600' : 'text-green-600'}>
              {error || success}
            </div>
          )}

          {loading ? (
            <div className="text-admin-slate-500 dark:text-admin-slate-400">Loading...</div>
          ) : (
            <>
              <section>
                <h3 className="text-lg font-medium text-admin-slate-900 dark:text-admin-slate-100">Social Media Accounts</h3>
                <div className="mt-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-admin-slate-700 dark:text-admin-slate-300 mb-2">
                      Facebook Page URL
                    </label>
                    <input
                      type="url"
                      name="facebook"
                      value={form.facebook}
                      onChange={handleChange}
                      className="block w-full rounded-md border-admin-slate-300 shadow-sm focus:border-admin-ucla-500 focus:ring-admin-ucla-500 sm:text-sm dark:bg-admin-slate-700 dark:border-admin-slate-600 dark:text-admin-slate-100 py-3 px-4"
                      placeholder="https://facebook.com/yourpage"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-admin-slate-700 dark:text-admin-slate-300 mb-2">
                      Instagram Profile
                    </label>
                    <input
                      type="url"
                      name="instagram"
                      value={form.instagram}
                      onChange={handleChange}
                      className="block w-full rounded-md border-admin-slate-300 shadow-sm focus:border-admin-ucla-500 focus:ring-admin-ucla-500 sm:text-sm dark:bg-admin-slate-700 dark:border-admin-slate-600 dark:text-admin-slate-100 py-3 px-4"
                      placeholder="https://instagram.com/youraccount"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-admin-slate-700 dark:text-admin-slate-300 mb-2">
                      Twitter/X Profile
                    </label>
                    <input
                      type="url"
                      name="twitter"
                      value={form.twitter}
                      onChange={handleChange}
                      className="block w-full rounded-md border-admin-slate-300 shadow-sm focus:border-admin-ucla-500 focus:ring-admin-ucla-500 sm:text-sm dark:bg-admin-slate-700 dark:border-admin-slate-600 dark:text-admin-slate-100 py-3 px-4"
                      placeholder="https://twitter.com/youraccount"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-admin-slate-700 dark:text-admin-slate-300 mb-2">
                      LinkedIn Page
                    </label>
                    <input
                      type="url"
                      name="linkedin"
                      value={form.linkedin}
                      onChange={handleChange}
                      className="block w-full rounded-md border-admin-slate-300 shadow-sm focus:border-admin-ucla-500 focus:ring-admin-ucla-500 sm:text-sm dark:bg-admin-slate-700 dark:border-admin-slate-600 dark:text-admin-slate-100 py-3 px-4"
                      placeholder="https://linkedin.com/company/yourcompany"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-admin-slate-700 dark:text-admin-slate-300 mb-2">
                      YouTube Channel
                    </label>
                    <input
                      type="url"
                      name="youtube"
                      value={form.youtube}
                      onChange={handleChange}
                      className="block w-full rounded-md border-admin-slate-300 shadow-sm focus:border-admin-ucla-500 focus:ring-admin-ucla-500 sm:text-sm dark:bg-admin-slate-700 dark:border-admin-slate-600 dark:text-admin-slate-100 py-3 px-4"
                      placeholder="https://youtube.com/@yourchannel"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-admin-slate-700 dark:text-admin-slate-300 mb-2">
                      TikTok Profile
                    </label>
                    <input
                      type="url"
                      name="tiktok"
                      value={form.tiktok}
                      onChange={handleChange}
                      className="block w-full rounded-md border-admin-slate-300 shadow-sm focus:border-admin-ucla-500 focus:ring-admin-ucla-500 sm:text-sm dark:bg-admin-slate-700 dark:border-admin-slate-600 dark:text-admin-slate-100 py-3 px-4"
                      placeholder="https://tiktok.com/@youraccount"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-admin-slate-700 dark:text-admin-slate-300 mb-2">
                      WhatsApp Link
                    </label>
                    <input
                      type="url"
                      name="whatsapp"
                      value={form.whatsapp}
                      onChange={handleChange}
                      className="block w-full rounded-md border-admin-slate-300 shadow-sm focus:border-admin-ucla-500 focus:ring-admin-ucla-500 sm:text-sm dark:bg-admin-slate-700 dark:border-admin-slate-600 dark:text-admin-slate-100 py-3 px-4"
                      placeholder="https://wa.me/your-number"
                    />
                  </div>
                </div>
              </section>

              <div className="border-t border-admin-slate-200 dark:border-admin-slate-700 my-8"></div>

              <section>
                <h3 className="text-lg font-medium text-admin-slate-900 dark:text-admin-slate-100">Social Sharing</h3>
                <div className="mt-6 space-y-6">
                  <div className="relative flex items-start">
                    <div className="flex items-center h-6">
                      <input
                        type="checkbox"
                        name="shareButtonsEnabled"
                        checked={form.shareButtonsEnabled}
                        onChange={handleCheckboxChange}
                        className="h-5 w-5 text-admin-ucla-600 border-admin-slate-300 rounded focus:ring-admin-ucla-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label className="font-medium text-admin-slate-700 dark:text-admin-slate-300">
                        Enable Social Share Buttons
                      </label>
                      <p className="text-admin-slate-500 dark:text-admin-slate-400 mt-1">
                        Display social media sharing buttons on product pages
                      </p>
                    </div>
                  </div>

                  <div className="relative flex items-start">
                    <div className="flex items-center h-6">
                      <input
                        type="checkbox"
                        name="followButtonsEnabled"
                        checked={form.followButtonsEnabled}
                        onChange={handleCheckboxChange}
                        className="h-5 w-5 text-admin-ucla-600 border-admin-slate-300 rounded focus:ring-admin-ucla-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label className="font-medium text-admin-slate-700 dark:text-admin-slate-300">
                        Enable Social Follow Buttons
                      </label>
                      <p className="text-admin-slate-500 dark:text-admin-slate-400 mt-1">
                        Display social media follow buttons in the footer
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-admin-slate-700 dark:text-admin-slate-300 mb-2">
                      Default Share Message
                    </label>
                    <input
                      type="text"
                      name="shareMessage"
                      value={form.shareMessage}
                      onChange={handleChange}
                      className="block w-full rounded-md border-admin-slate-300 shadow-sm focus:border-admin-ucla-500 focus:ring-admin-ucla-500 sm:text-sm dark:bg-admin-slate-700 dark:border-admin-slate-600 dark:text-admin-slate-100 py-3 px-4"
                      placeholder="Check out this product!"
                    />
                  </div>
                </div>
              </section>
            </>
          )}

          <div className="pt-4 border-t border-admin-slate-200 dark:border-admin-slate-700 flex justify-end">
            <button
              type="submit"
              disabled={saving || loading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-admin-ucla-600 hover:bg-admin-ucla-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-admin-ucla-500 disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Save changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SocialSettingsPage;
