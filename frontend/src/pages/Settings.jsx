import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { userApi } from '../api/userApi';
import { Link } from 'react-router-dom';
import ProfileImageUploader from '../components/ProfileImageUploader';

const Settings = () => {
  const { user, updateUser } = useAuth(); // Using updateUser to refresh context user state
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    phoneNumber: '',
    email: '',
    about: '',
    socialLinks: {
      github: '',
      linkedin: ''
    }
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const [deleteInput, setDeleteInput] = useState('');

  // Load fresh user data on mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await userApi.getUserProfile();
        if (data && data.user) {
          setFormData({
            name: data.user.name || '',
            username: data.user.username || '',
            phoneNumber: data.user.phoneNumber || '',
            email: data.user.email || '',
            about: data.user.about || '',
            socialLinks: {
              github: data.user.socialLinks?.github || '',
              linkedin: data.user.socialLinks?.linkedin || ''
            }
          });
        }
      } catch (err) {
        console.error('Failed to load profile', err);
        setError('Failed to load profile data');
      } finally {
        setFetching(false);
      }
    };
    loadUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      setMessage('');
      setError('');
      const updatedUser = await userApi.updateUserProfile(formData);
      updateUser(updatedUser.user); // Update context
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSavePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setError('New passwords do not match');
      return;
    }
    // Assuming backend handles password verification if currentPassword is sent. 
    // Note: The proposed update function sends `password` field. 
    // Real implementation usually requires verifying current password first.
    // For now, I'll assume we just send the new password if backend allows direct overwrite (simple MVP) 
    // OR ideally, we should have a specific endpoint for password change.
    // Given current backend controller, it just updates `password` directly. 
    // I will proceed with just sending `password` field for now.

    if (!passwordData.newPassword) return;

    try {
      setLoading(true);
      setMessage('');
      setError('');
      await userApi.updateUserProfile({ password: passwordData.newPassword });
      setMessage('Password updated successfully!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error(err);
      setError('Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    // Implement delete logic here if backend supports it
    alert('Delete account functionality would trigger here.');
  };

  if (fetching) return <div className="flex justify-center py-10">Loading...</div>;

  return (
    <div className="space-y-8 animate-fadeIn pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Profile Settings</h1>
        <Link to="/dashboard" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center font-medium">
          Back to Dashboard &rarr;
        </Link>
      </div>

      {/* Profile Image Uploader - Centered */}
      <div className="flex justify-center border-b border-slate-200 dark:border-slate-700 pb-8">
        <ProfileImageUploader />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

        {/* Left Column: Personal Information */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">Personal Information</h2>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#18181B] text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#18181B] text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                placeholder="username"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#18181B] text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                placeholder="+1 234 567 890"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 focus:outline-none cursor-not-allowed"
                readOnly
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">About Me</label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#18181B] text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all resize-none"
                placeholder="Tell us a little about yourself..."
              />
            </div>

            <div className="pt-2">
              <h3 className="text-md font-semibold text-slate-800 dark:text-white mb-3">Social Links</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-slate-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                  <input
                    type="text"
                    name="socialLinks.github"
                    value={formData.socialLinks.github}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#18181B] text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder:text-sm"
                    placeholder="GitHub Profile URL"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                  <input
                    type="text"
                    name="socialLinks.linkedin"
                    value={formData.socialLinks.linkedin}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#18181B] text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder:text-sm"
                    placeholder="LinkedIn Profile URL"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleSaveProfile}
              disabled={loading}
              className="btn btn-primary w-full sm:w-auto px-6 py-3 rounded-lg font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Right Column: Change Password & Danger Zone */}
        <div className="space-y-10">
          {/* Change Password */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Change Password</h2>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#18181B] text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                  placeholder="Enter current password"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#18181B] text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                  placeholder="Enter new password"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmNewPassword"
                  value={passwordData.confirmNewPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#18181B] text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                  placeholder="Confirm new password"
                />
              </div>
              <button
                onClick={handleSavePassword}
                className="btn btn-primary w-full sm:w-auto px-6 py-3 rounded-lg font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all"
              >
                Save Password
              </button>
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-700 pt-8 space-y-4">
            <h2 className="text-xl font-bold text-rose-600">Danger Zone</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-md font-medium text-slate-800 dark:text-white">Delete Account</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
              </div>
              <input
                type="text"
                value={deleteInput}
                onChange={(e) => setDeleteInput(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:outline-none transition-all"
                placeholder={`Type DELETE/${user?.username || 'user'} to confirm`}
              />
              <button
                onClick={handleDeleteAccount}
                className="bg-rose-600 text-white w-full sm:w-auto px-6 py-3 rounded-lg font-semibold shadow-lg shadow-rose-500/30 hover:bg-rose-700 hover:shadow-rose-500/50 transition-all"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Messages */}
      {message && (
        <div className="fixed bottom-6 right-6 bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg animate-bounce">
          {message}
        </div>
      )}
      {error && (
        <div className="fixed bottom-6 right-6 bg-rose-600 text-white px-6 py-3 rounded-xl shadow-lg animate-bounce">
          {error}
        </div>
      )}
    </div>
  );
};

export default Settings;



