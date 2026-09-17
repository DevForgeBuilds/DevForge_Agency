import { useCallback, useEffect, useMemo, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { adminFetch, apiFetch, uploadAdminFile } from '../lib/api';
import devforgeMiniLogo from '../assets/devforge-mini-logo.png';
import './AdminPage.css';
import './AdminDashboard.css';


type Row = Record<string, any>;

type Section =
  | 'dashboard'
  | 'inquiries'
  | 'services'
  | 'projects'
  | 'reviews'
  | 'clients'
  | 'admins'
  | 'activity'
  | 'settings'
  | 'profile';

/* =========================================================
   NAVIGATION
   ========================================================= */

const nav: { id: Section; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'grid' },
  { id: 'inquiries', label: 'Inquiries', icon: 'mail' },
  { id: 'services', label: 'Services', icon: 'layers' },
  { id: 'projects', label: 'Projects', icon: 'folder' },
  { id: 'reviews', label: 'Reviews', icon: 'star' },
  { id: 'clients', label: 'Clients', icon: 'users' },
  { id: 'admins', label: 'Admin Accounts', icon: 'shield' },
  { id: 'activity', label: 'Activity History', icon: 'clock' },
  { id: 'settings', label: 'Website Settings', icon: 'settings' },
  { id: 'profile', label: 'Admin Profile', icon: 'user' },
];

/* =========================================================
   SVG ICON SYSTEM
   ========================================================= */

const NavIcon = ({ name, size = 18 }: { name: string; size?: number }) => {
  const commonProps = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };

  switch (name) {
    case 'grid':
      return (
        <svg {...commonProps}>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      );

    case 'mail':
      return (
        <svg {...commonProps}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );

    case 'layers':
      return (
        <svg {...commonProps}>
          <path d="m12 3 9 5-9 5-9-5 9-5Z" />
          <path d="m3 12 9 5 9-5" />
          <path d="m3 16 9 5 9-5" />
        </svg>
      );

    case 'folder':
      return (
        <svg {...commonProps}>
          <path d="M3 6.5A2.5 2.5 0 0 1 5.5 4H10l2 2h6.5A2.5 2.5 0 0 1 21 8.5v9a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5v-11Z" />
        </svg>
      );

    case 'star':
      return (
        <svg {...commonProps}>
          <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
        </svg>
      );

    case 'users':
      return (
        <svg {...commonProps}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
          <circle cx="9.5" cy="7" r="4" />
          <path d="M17 11a4 4 0 0 0 0-8" />
          <path d="M21 21v-2a4 4 0 0 0-3-3.9" />
        </svg>
      );

    case 'shield':
      return (
        <svg {...commonProps}>
          <path d="M12 3 20 6v5c0 5-3.3 8.7-8 10-4.7-1.3-8-5-8-10V6l8-3Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );

    case 'clock':
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );

    case 'settings':
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.1h-2.5v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1A1.7 1.7 0 0 0 8 15a1.7 1.7 0 0 0-1.5-1H6.4v-2.5h.1A1.7 1.7 0 0 0 8 10a1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5v-.1h2.5v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.1V14h-.1a1.7 1.7 0 0 0-1.4 1Z" />
        </svg>
      );

    case 'user':
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21a8 8 0 0 1 16 0" />
        </svg>
      );

    case 'menu':
      return (
        <svg {...commonProps}>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </svg>
      );

    case 'logout':
      return (
        <svg {...commonProps}>
          <path d="M10 17l5-5-5-5" />
          <path d="M15 12H3" />
          <path d="M21 19V5a2 2 0 0 0-2-2h-6" />
        </svg>
      );

    case 'close':
      return (
        <svg {...commonProps}>
          <path d="m6 6 12 12" />
          <path d="m18 6-12 12" />
        </svg>
      );

    case 'arrow-up-right':
      return (
        <svg {...commonProps}>
          <path d="M7 17 17 7" />
          <path d="M7 7h10v10" />
        </svg>
      );

    case 'check':
      return (
        <svg {...commonProps}>
          <path d="m5 12 4 4L19 6" />
        </svg>
      );

    case 'refresh':
      return (
        <svg {...commonProps}>
          <path d="M20 11a8.1 8.1 0 0 0-15.5-2" />
          <path d="M4 5v4h4" />
          <path d="M4 13a8.1 8.1 0 0 0 15.5 2" />
          <path d="M20 19v-4h-4" />
        </svg>
      );

    case 'spark':
      return (
        <svg {...commonProps}>
          <path d="m12 3 1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3Z" />
        </svg>
      );

    case 'chevron':
      return (
        <svg {...commonProps}>
          <path d="m9 6 6 6-6 6" />
        </svg>
      );

    default:
      return null;
  }
};

/* =========================================================
   FORM SCHEMAS
   ========================================================= */

const schemas: Record<
  string,
  { key: string; label: string; type?: string; required?: boolean }[]
> = {
  services: [
    { key: 'key', label: 'Service key', required: true },
    { key: 'number', label: 'Service number' },
    { key: 'order', label: 'Display order', type: 'number' },
    { key: 'title', label: 'Service title', required: true },
    { key: 'slug', label: 'URL slug', required: true },
    { key: 'shortTitle', label: 'Short title' },
    { key: 'label', label: 'Label' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'icon', label: 'Service icon', type: 'upload-image' },
    { key: 'image', label: 'Service image', type: 'upload-image' },
    { key: 'video', label: 'Service video', type: 'upload-video' },
    { key: 'isActive', label: 'Active', type: 'checkbox' },
  ],

  projects: [
    { key: 'title', label: 'Project title', required: true },
    { key: 'slug', label: 'URL slug', required: true },
    { key: 'order', label: 'Display order', type: 'number' },
    { key: 'client', label: 'Client' },
    { key: 'category', label: 'Category' },
    { key: 'year', label: 'Year', type: 'number' },
    { key: 'role', label: 'Role' },
    { key: 'duration', label: 'Duration' },
    { key: 'status', label: 'Project status', type: 'projectStatus' },
    { key: 'description', label: 'Short description', type: 'textarea' },
    { key: 'overview', label: 'Project overview', type: 'textarea' },
    { key: 'challenge', label: 'Challenge', type: 'textarea' },
    { key: 'process', label: 'Process (title | description, one per line)', type: 'textarea' },
    { key: 'image', label: 'Project cover image', type: 'upload-image' },
    { key: 'video', label: 'Project video', type: 'upload-video' },
    { key: 'projectUrl', label: 'Live project URL' },
    { key: 'githubUrl', label: 'GitHub URL' },
    { key: 'gallery', label: 'Gallery (image URL | title | caption, one per line)', type: 'textarea' },
    { key: 'technologies', label: 'Technologies (comma separated)' },
    { key: 'features', label: 'Features (one per line)' },
    { key: 'results', label: 'Results (value | label | description, one per line)' },
    { key: 'credits', label: 'Credits (role | name, one per line)' },
    { key: 'featured', label: 'Featured project', type: 'checkbox' },
    { key: 'isActive', label: 'Published / active', type: 'checkbox' },
  ],

  reviews: [
    { key: 'clientName', label: 'Client name', required: true },
    { key: 'company', label: 'Company' },
    { key: 'email', label: 'Email', type: 'email' },
    { key: 'message', label: 'Review', type: 'textarea', required: true },
    { key: 'rating', label: 'Rating (1-5)', type: 'number' },
    { key: 'photo', label: 'Photo URL' },
    { key: 'status', label: 'Status', type: 'select' },
  ],

  clients: [
    { key: 'name', label: 'Client name', required: true },
    { key: 'email', label: 'Email', type: 'email', required: true },
    { key: 'phone', label: 'Phone' },
    { key: 'company', label: 'Company' },
    { key: 'project', label: 'Project' },
    { key: 'status', label: 'Status', type: 'clientStatus' },
    { key: 'followUpAt', label: 'Follow-up date', type: 'date' },
    { key: 'notes', label: 'Notes', type: 'textarea' },
  ],

  admins: [
    { key: 'name', label: 'Admin name', required: true },
    { key: 'email', label: 'Email', type: 'email', required: true },
    { key: 'phone', label: 'Phone' },
    { key: 'role', label: 'Role', type: 'adminRole', required: true },
    {
      key: 'password',
      label: 'Password (leave blank when editing)',
      type: 'password',
    },
  ],
};

const sectionNames: Record<string, string> = {
  dashboard: 'Dashboard',
  inquiries: 'Inquiries',
  services: 'Services',
  projects: 'Projects',
  reviews: 'Reviews',
  clients: 'Clients',
  admins: 'Admin Accounts',
  activity: 'Activity History',
  settings: 'Website Settings',
  profile: 'Admin Profile',
};

const sectionSingularNames: Record<string, string> = {
  services: 'service',
  projects: 'project',
  reviews: 'review',
  clients: 'client',
  admins: 'admin account',
};

const filterStyle = {
  background: '#090d0c',
  color: '#eef5f2',
  border: '1px solid #25302d',
  borderRadius: '7px',
  padding: '11px 12px',
  minWidth: '145px',
};

/* =========================================================
   LOGIN
   ========================================================= */

function Login({ onLogin }: { onLogin: () => void }) {
  const resetToken =
    new URLSearchParams(window.location.search).get('resetToken') || '';

  const [mode, setMode] = useState<'login' | 'otp' | 'forgot' | 'reset'>(
    resetToken ? 'reset' : 'login'
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpToken, setOtpToken] = useState('');
  const [maskedEmail, setMaskedEmail] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (mode !== 'otp' || countdown <= 0) return;

    const timer = window.setTimeout(
      () => setCountdown(current => Math.max(0, current - 1)),
      1000
    );

    return () => window.clearTimeout(timer);
  }, [mode, countdown]);

  const changeMode = (next: 'login' | 'forgot') => {
    setMode(next);
    setError('');
    setMessage('');
    setPassword('');
    setConfirmPassword('');
    setOtp('');
    setOtpToken('');
    setMaskedEmail('');
    setCountdown(0);
  };

  const submitLogin = async (e: FormEvent) => {
    e.preventDefault();

    setBusy(true);
    setError('');
    setMessage('');

    try {
      const r = await apiFetch<any>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (!r.requiresOtp || !r.otpToken) {
        throw new Error('OTP could not be started. Please try again.');
      }

      setOtpToken(r.otpToken);
      setMaskedEmail(r.email || email);
      setMessage(
        r.message || 'A 6-digit OTP has been sent to your email.'
      );
      setOtp('');
      setCountdown(60);
      setMode('otp');
    } catch (x: any) {
      setError(x.message);
    } finally {
      setBusy(false);
    }
  };

  const submitOtp = async (e: FormEvent) => {
    e.preventDefault();

    setError('');
    setMessage('');

    if (!/^\d{6}$/.test(otp)) {
      setError('Please enter the 6-digit OTP.');
      return;
    }

    setBusy(true);

    try {
      const r = await apiFetch<any>('/auth/verify-login-otp', {
        method: 'POST',
        body: JSON.stringify({ otpToken, otp }),
      });

      localStorage.setItem('devforge_admin_token', r.token);
      onLogin();
    } catch (x: any) {
      setError(x.message);
    } finally {
      setBusy(false);
    }
  };

  const resendOtp = async () => {
    if (busy || countdown > 0) return;

    setBusy(true);
    setError('');
    setMessage('');

    try {
      const r = await apiFetch<any>('/auth/resend-login-otp', {
        method: 'POST',
        body: JSON.stringify({ otpToken }),
      });

      setOtpToken(r.otpToken);
      setMaskedEmail(r.email || maskedEmail);
      setOtp('');
      setMessage(r.message || 'A new verification code has been sent.');
      setCountdown(60);
    } catch (x: any) {
      setError(x.message);
    } finally {
      setBusy(false);
    }
  };

  const submitForgot = async (e: FormEvent) => {
    e.preventDefault();

    setBusy(true);
    setError('');
    setMessage('');

    try {
      const r = await apiFetch<any>('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });

      setMessage(r.message || 'Password reset email sent.');
    } catch (x: any) {
      setError(x.message);
    } finally {
      setBusy(false);
    }
  };

  const submitReset = async (e: FormEvent) => {
    e.preventDefault();

    setError('');
    setMessage('');

    if (password.length < 8) {
      setError('Password must contain at least 8 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setBusy(true);

    try {
      const r = await apiFetch<any>(
        `/auth/reset-password/${encodeURIComponent(resetToken)}`,
        {
          method: 'POST',
          body: JSON.stringify({ password }),
        }
      );

      window.history.replaceState({}, '', window.location.pathname);

      setPassword('');
      setConfirmPassword('');
      setMode('login');
      setMessage(
        r.message || 'Password reset successfully. Please sign in.'
      );
    } catch (x: any) {
      setError(x.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="login-card">
        <div className="brand-mark">DF</div>

        <p className="eyebrow">DEVFORGE CONTROL</p>

        <h1>
          {mode === 'otp'
            ? 'Verify login.'
            : mode === 'forgot'
              ? 'Reset access.'
              : mode === 'reset'
                ? 'Choose password.'
                : 'Welcome back.'}
        </h1>

        <p className="muted">
          {mode === 'otp'
            ? `Enter the 6-digit OTP sent to ${maskedEmail}.`
            : mode === 'forgot'
              ? 'Enter your admin email and we will send a secure reset link.'
              : mode === 'reset'
                ? 'Create a new password with at least 8 characters.'
                : 'Sign in to manage your digital studio.'}
        </p>

        {mode === 'login' && (
          <form onSubmit={submitLogin}>
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoFocus
              />
            </label>

            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </label>

            {error && <div className="alert">{error}</div>}
            {message && <div className="notice">{message}</div>}

            <button className="primary full" disabled={busy}>
              {busy ? 'Signing in…' : 'Sign in →'}
            </button>

            <button
              type="button"
              className="secondary full"
              style={{ marginTop: '10px' }}
              onClick={() => changeMode('forgot')}
            >
              Forgot password?
            </button>
          </form>
        )}

        {mode === 'otp' && (
          <form onSubmit={submitOtp}>
            <label>
              Email OTP
              <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                value={otp}
                onChange={e =>
                  setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))
                }
                placeholder="Enter 6-digit OTP"
                required
                autoFocus
              />
            </label>

            {error && <div className="alert">{error}</div>}
            {message && <div className="notice">{message}</div>}

            <button
              className="primary full"
              disabled={busy || otp.length !== 6}
            >
              {busy ? 'Verifying…' : 'Verify OTP →'}
            </button>

            <button
              type="button"
              className="secondary full"
              style={{ marginTop: '10px' }}
              disabled={busy || countdown > 0}
              onClick={resendOtp}
            >
              {countdown > 0
                ? `Resend OTP in ${countdown}s`
                : 'Resend OTP'}
            </button>

            <button
              type="button"
              className="secondary full"
              style={{ marginTop: '10px' }}
              onClick={() => changeMode('login')}
            >
              ← Back to sign in
            </button>
          </form>
        )}

        {mode === 'forgot' && (
          <form onSubmit={submitForgot}>
            <label>
              Admin email
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoFocus
              />
            </label>

            {error && <div className="alert">{error}</div>}
            {message && <div className="notice">{message}</div>}

            <button className="primary full" disabled={busy}>
              {busy ? 'Sending…' : 'Send reset link →'}
            </button>

            <button
              type="button"
              className="secondary full"
              style={{ marginTop: '10px' }}
              onClick={() => changeMode('login')}
            >
              ← Back to sign in
            </button>
          </form>
        )}

        {mode === 'reset' && (
          <form onSubmit={submitReset}>
            <label>
              New password
              <input
                type="password"
                minLength={8}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoFocus
              />
            </label>

            <label>
              Confirm password
              <input
                type="password"
                minLength={8}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
              />
            </label>

            {error && <div className="alert">{error}</div>}
            {message && <div className="notice">{message}</div>}

            <button className="primary full" disabled={busy}>
              {busy ? 'Resetting…' : 'Reset password →'}
            </button>
          </form>
        )}

        <a href="/">← Back to website</a>
      </div>
    </div>
  );
}

/* =========================================================
   MODAL
   ========================================================= */

function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onPointerDown={e => e.stopPropagation()}
      onClick={e => e.stopPropagation()}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onPointerDown={e => e.stopPropagation()}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-head">
          <h2>{title}</h2>

          <button
            type="button"
            className="icon-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <NavIcon name="close" />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

/* =========================================================
   UPLOAD FIELD
========================================================= */

function UploadField({
  label,
  value,
  kind,
  onChange,
}: {
  label: string;
  value: string;
  kind: 'image' | 'video';
  onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const upload = async (file?: File) => {
    if (!file) return;

    setUploading(true);
    setError('');

    try {
      const result = await uploadAdminFile(file);
      if (!result?.url) {
        throw new Error('Upload completed but no file URL was returned.');
      }
      onChange(result.url);
    } catch (x: any) {
      setError(x.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <label className="wide upload-field">
      <span>{label}</span>

      <div className="upload-box">
        {value && kind === 'image' && (
          <div className="upload-preview">
            <img src={value} alt={`${label} preview`} />
          </div>
        )}

        {value && kind === 'video' && (
          <video
            className="upload-video-preview"
            src={value}
            controls
            preload="metadata"
          />
        )}

        <input
          type="file"
          accept={
            kind === 'image'
              ? 'image/png,image/jpeg,image/webp,image/gif,image/svg+xml'
              : 'video/mp4,video/webm,video/quicktime'
          }
          disabled={uploading}
          onChange={e => {
            upload(e.target.files?.[0]);
            e.currentTarget.value = '';
          }}
        />

        {uploading && (
          <span className="upload-status">Uploading…</span>
        )}

        {error && (
          <span className="upload-error">{error}</span>
        )}
      </div>
    </label>
  );
}

/* =========================================================
   PROJECT GALLERY UPLOADER
========================================================= */

type ProjectGalleryItem = {
  id: string;
  image: string;
  title?: string;
  caption?: string;
};

function ProjectGalleryEditor({
  value,
  onChange,
  onDirty,
}: {
  value: ProjectGalleryItem[] | string | undefined;
  onChange: (items: ProjectGalleryItem[]) => void;
  onDirty: () => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const items: ProjectGalleryItem[] = Array.isArray(value)
    ? value.map((item: any, index) => ({
      id: String(item?.id ?? index + 1),
      image: String(item?.image ?? ''),
      title: item?.title ?? '',
      caption: item?.caption ?? '',
    }))
    : typeof value === 'string'
      ? value
        .split(/\r?\n/)
        .map(x => x.trim())
        .filter(Boolean)
        .map((line, index) => {
          const [image = '', title = '', caption = ''] = line
            .split('|')
            .map(part => part.trim());
          return {
            id: String(index + 1),
            image,
            title,
            caption,
          };
        })
      : [];

  const update = (next: ProjectGalleryItem[]) => {
    onDirty();
    onChange(
      next.map((item, index) => ({
        ...item,
        id: String(index + 1),
      }))
    );
  };

  const uploadGalleryImage = async (file?: File) => {
    if (!file) return;

    setUploading(true);
    setError('');

    try {
      const result = await uploadAdminFile(file);
      if (!result?.url) {
        throw new Error('Upload completed but no file URL was returned.');
      }

      update([
        ...items,
        {
          id: String(items.length + 1),
          image: result.url,
          title: '',
          caption: '',
        },
      ]);
    } catch (x: any) {
      setError(x.message || 'Gallery upload failed');
    } finally {
      setUploading(false);
    }
  };

  const move = (index: number, direction: -1 | 1) => {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= items.length) return;

    const next = [...items];
    [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
    update(next);
  };

  return (
    <div className="project-gallery-editor">
      <div className="gallery-toolbar">
        <div>
          <strong>Project screenshots</strong>
          <small>
            Upload screenshots directly. No image URL is required.
          </small>
        </div>

        <label className="gallery-upload-button">
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
            disabled={uploading}
            onChange={e => {
              uploadGalleryImage(e.target.files?.[0]);
              e.currentTarget.value = '';
            }}
          />
          {uploading ? 'Uploading…' : '+ Add screenshot'}
        </label>
      </div>

      {error && <div className="alert">{error}</div>}

      {items.length === 0 ? (
        <div className="gallery-empty">
          <NavIcon name="spark" size={20} />
          <strong>No screenshots yet</strong>
          <span>Click “Add screenshot” to upload your first project image.</span>
        </div>
      ) : (
        <div className="gallery-list">
          {items.map((item, index) => (
            <article className="gallery-item" key={item.id}>
              <div className="gallery-thumb">
                {item.image ? (
                  <img src={item.image} alt={item.title || `Screenshot ${index + 1}`} />
                ) : (
                  <span>No image</span>
                )}
              </div>

              <div className="gallery-fields">
                <label>
                  <span>Title</span>
                  <input
                    value={item.title ?? ''}
                    placeholder="Homepage"
                    onChange={e => {
                      const next = [...items];
                      next[index] = { ...next[index], title: e.target.value };
                      update(next);
                    }}
                  />
                </label>

                <label>
                  <span>Caption</span>
                  <input
                    value={item.caption ?? ''}
                    placeholder="Hero and navigation experience"
                    onChange={e => {
                      const next = [...items];
                      next[index] = { ...next[index], caption: e.target.value };
                      update(next);
                    }}
                  />
                </label>
              </div>

              <div className="gallery-actions">
                <button
                  type="button"
                  className="icon-btn"
                  title="Move up"
                  disabled={index === 0}
                  onClick={() => move(index, -1)}
                >
                  ↑
                </button>
                <button
                  type="button"
                  className="icon-btn"
                  title="Move down"
                  disabled={index === items.length - 1}
                  onClick={() => move(index, 1)}
                >
                  ↓
                </button>
                <button
                  type="button"
                  className="icon-btn danger"
                  title="Remove screenshot"
                  onClick={() => update(items.filter((_, i) => i !== index))}
                >
                  ×
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   PROJECT EDITOR
========================================================= */

/* =========================================================
   EDITOR
   ========================================================= */

function ProjectEditor({
  row,
  onDone,
  onClose,
}: {
  row: Row | null;
  onDone: () => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Row>(() => ({
    ...row,
    featured: row?.featured ?? false,
order: row?.order ?? 0,
status: row?.status ?? 'planning',
  }));
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [openSection, setOpenSection] = useState('basic');
  const [dirty, setDirty] = useState(false);
  const [confirmClose, setConfirmClose] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousOverscroll = document.body.style.overscrollBehavior;

    document.body.style.overflow = 'hidden';
    document.body.style.overscrollBehavior = 'none';
    document.body.classList.add('project-editor-scroll-lock');

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.overscrollBehavior = previousOverscroll;
      document.body.classList.remove('project-editor-scroll-lock');
    };
  }, []);

  const setField = (key: string, value: any) => {
    setDirty(true);
    setForm(current => ({ ...current, [key]: value }));
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!dirty || saving) return;
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [dirty, saving]);

  const requestClose = () => {
    if (saving) return;
    if (dirty) {
      setConfirmClose(true);
      return;
    }
    onClose();
  };

  const discardAndClose = () => {
    setConfirmClose(false);
    setDirty(false);
    onClose();
  };

  const arrayToLines = (value: any, formatter: (item: any) => string) => {
    if (!Array.isArray(value)) return value || '';
    return value.map(formatter).join('\n');
  };

  const save = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const body: Row = { ...form };
      body.order = Number(body.order) || 0;

      body.technologies =
        typeof body.technologies === 'string'
          ? body.technologies
            .split(/\r?\n|,/)
            .map((x: string) => x.trim())
            .filter(Boolean)
            .map((name: string) => ({
              name,
              category: '',
              icon: '',
            }))
          : body.technologies || [];

      body.process =
        typeof body.process === 'string'
          ? body.process.split(/\r?\n/).map((x: string) => x.trim()).filter(Boolean).map((line: string, index: number) => {
            const [title = '', description = ''] = line.split('|').map((part: string) => part.trim());
            return { number: String(index + 1).padStart(2, '0'), title, description };
          })
          : body.process || [];

      body.features =
        typeof body.features === 'string'
          ? body.features.split(/\r?\n/).map((x: string) => x.trim()).filter(Boolean).map((description: string, index: number) => ({
            number: String(index + 1).padStart(2, '0'),
            title: description,
            description,
          }))
          : body.features || [];

      body.gallery =
        typeof body.gallery === 'string'
          ? body.gallery.split(/\r?\n/).map((x: string) => x.trim()).filter(Boolean).map((line: string, index: number) => {
            const [image = '', title = '', caption = ''] = line.split('|').map((part: string) => part.trim());
            return { id: String(index + 1), image, title, caption };
          })
          : body.gallery || [];

      body.results =
        typeof body.results === 'string'
          ? body.results.split(/\r?\n/).map((x: string) => x.trim()).filter(Boolean).map((line: string) => {
            const [value = '', label = '', description = ''] = line.split('|').map((part: string) => part.trim());
            return { value, label, description };
          })
          : body.results || [];

      body.credits =
        typeof body.credits === 'string'
          ? body.credits.split(/\r?\n/).map((x: string) => x.trim()).filter(Boolean).map((line: string) => {
            const [role = '', name = ''] = line.split('|').map((part: string) => part.trim());
            return { role, name };
          })
          : body.credits || [];

      if (body.year === '') delete body.year;

      await adminFetch(`/admin/projects${row ? `/${row._id}` : ''}`, {
        method: row ? 'PUT' : 'POST',
        body: JSON.stringify(body),
      });

      setDirty(false);
      onDone();
    } catch (x: any) {
      setError(x.message || 'Unable to save project.');
    } finally {
      setSaving(false);
    }
  };

  const sections = [
    { id: 'basic', number: '01', title: 'Basic Information', hint: 'Identity, client and project status' },
    { id: 'media', number: '02', title: 'Cover & Media', hint: 'Images, video and live links' },
    { id: 'story', number: '03', title: 'Case Study', hint: 'Overview and challenge' },
    { id: 'process', number: '04', title: 'Process', hint: 'How the project was built' },
    { id: 'gallery', number: '05', title: 'Gallery', hint: 'Project screenshots' },
    { id: 'tech', number: '06', title: 'Technologies', hint: 'Tools and technologies used' },
    { id: 'features', number: '07', title: 'Features', hint: 'Key product capabilities' },
    { id: 'results', number: '08', title: 'Results', hint: 'Outcomes and metrics' },
    { id: 'credits', number: '09', title: 'Credits', hint: 'People and roles' },
    { id: 'publish', number: '10', title: 'Publishing', hint: 'Visibility and homepage placement' },
  ];

  const Input = ({
    label,
    field,
    placeholder,
    type = 'text',
  }: {
    label: string;
    field: string;
    placeholder?: string;
    type?: string;
  }) => (
    <label>
      <span>{label}</span>
      <input
        type={type}
        value={form[field] ?? ''}
        placeholder={placeholder}
        onChange={e => setField(field, e.target.value)}
      />
    </label>
  );

  const Textarea = ({
    label,
    field,
    placeholder,
    rows = 6,
  }: {
    label: string;
    field: string;
    placeholder?: string;
    rows?: number;
  }) => (
    <label className="wide">
      <span>{label}</span>
      <textarea
        rows={rows}
        value={form[field] ?? ''}
        placeholder={placeholder}
        onChange={e => setField(field, e.target.value)}
      />
    </label>
  );

  const Section = ({
    id,
    number,
    title,
    hint,
    children,
  }: {
    id: string;
    number: string;
    title: string;
    hint: string;
    children: ReactNode;
  }) => {
    const isOpen = openSection === id;
    return (
      <section className={`project-editor-section ${isOpen ? 'is-open' : ''}`}>
        <button
          type="button"
          className="project-editor-section-head"
          onClick={() => setOpenSection(isOpen ? '' : id)}
          aria-expanded={isOpen}
        >
          <span className="project-editor-index">{number}</span>
          <span className="project-editor-section-copy">
            <strong>{title}</strong>
            <small>{hint}</small>
          </span>
          <NavIcon name="chevron" size={18} />
        </button>
        {isOpen && <div className="project-editor-section-body">{children}</div>}
      </section>
    );
  };

  return (
    <Modal
      title={`${row ? 'Edit' : 'Create'} Project`}
      onClose={requestClose}
    >
      <form
        className="project-editor"
        onSubmit={save}
        onWheelCapture={e => e.stopPropagation()}
        onTouchMoveCapture={e => e.stopPropagation()}
        onPointerDownCapture={e => e.stopPropagation()}
      >
        <div className="project-editor-intro">
          <div>
            <p className="eyebrow">PROJECT CMS</p>
            <h2>{row ? 'Refine this case study.' : 'Build a new case study.'}</h2>
            <p>
              Everything entered here powers the Selected Work card and the full Project Detail page.
            </p>
          </div>
          <div className="project-editor-status">
            <span className={`status-pill ${form.isActive ? 'status-approved' : 'status-rejected'}`}>
              {form.isActive ? 'Published' : 'Draft'}
            </span>
            {form.featured && <span className="status-pill status-featured">Featured</span>}
          </div>
        </div>

        <div className="project-editor-sections">
          <Section id="basic" number="01" title="Basic Information" hint="Identity, client and project status">
            <div className="editor-grid">
              <Input label="Project title" field="title" placeholder="e.g. NEXORA — Digital Commerce" />
              <Input label="URL slug" field="slug" placeholder="nexora-digital-commerce" />
              <Input label="Display order" field="order" type="number" placeholder="1" />
              <Input label="Client" field="client" placeholder="Client / company name" />
              <Input label="Category" field="category" placeholder="Web Experience / Branding / SaaS" />
              <Input label="Year" field="year" type="number" placeholder="2026" />
              <Input label="Role" field="role" placeholder="Design & Development" />
              <Input label="Duration" field="duration" placeholder="8 weeks" />
              <label>
                <span>Project status</span>
                <select value={form.status || 'planning'} onChange={e => setField('status', e.target.value)}>
                  <option value="planning">Planning</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="on-hold">On hold</option>
                </select>
              </label>
            </div>
            <Textarea label="Short description" field="description" rows={4} placeholder="A concise description used across project listings." />
          </Section>

          <Section id="media" number="02" title="Cover & Media" hint="Images, video and live links">
            <div className="editor-grid">
              <UploadField
                label="Cover image"
                value={form.image ?? ''}
                kind="image"
                onChange={url => setField('image', url)}
              />
              <UploadField
                label="Project video"
                value={form.video ?? ''}
                kind="video"
                onChange={url => setField('video', url)}
              />
              <Input label="Live project URL" field="projectUrl" placeholder="https://example.com" />
              <Input label="GitHub URL" field="githubUrl" placeholder="https://github.com/..." />
            </div>
          </Section>

          <Section id="story" number="03" title="Case Study" hint="Overview and challenge">
            <Textarea label="Project overview" field="overview" rows={8} placeholder="Tell the story of the project, the product and the work delivered." />
            <Textarea label="Challenge" field="challenge" rows={7} placeholder="What problem, constraint or opportunity did the project address?" />
          </Section>

          <Section id="process" number="04" title="Process" hint="How the project was built">
            <Textarea
              label="Process steps"
              field="process"
              rows={9}
              placeholder={'One step per line:\nDiscovery | We mapped the customer journey and business goals.\nDesign | We created the visual system and key interactions.\nBuild | We developed and tested the final experience.'}
            />
            <p className="project-editor-help">Format: <strong>Step title | Step description</strong> — one step per line.</p>
          </Section>

          <Section id="gallery" number="05" title="Gallery" hint="Project screenshots">
            <ProjectGalleryEditor
              value={form.gallery}
              onChange={items => setField('gallery', items)}
              onDirty={() => setDirty(true)}
            />
          </Section>

          <Section id="tech" number="06" title="Technologies" hint="Tools and technologies used">
            <Textarea
              label="Technologies"
              field="technologies"
              rows={4}
              placeholder="React, TypeScript, Node.js, MongoDB, GSAP"
            />
            <p className="project-editor-help">Separate technologies with commas.</p>
          </Section>

          <Section id="features" number="07" title="Features" hint="Key product capabilities">
            <Textarea
              label="Feature list"
              field="features"
              rows={8}
              placeholder={'One feature per line:\nImmersive 3D hero experience\nCMS-driven content architecture\nResponsive interaction system'}
            />
          </Section>

          <Section id="results" number="08" title="Results" hint="Outcomes and metrics">
            <Textarea
              label="Results"
              field="results"
              rows={8}
              placeholder={'One result per line:\n+42% | Conversion | Increase after launch\n3.2x | Engagement | Longer average session'}
            />
            <p className="project-editor-help">Format: <strong>Value | Label | Description</strong>.</p>
          </Section>

          <Section id="credits" number="09" title="Credits" hint="People and roles">
            <Textarea
              label="Credits"
              field="credits"
              rows={7}
              placeholder={'One credit per line:\nCreative Direction | DevForge\nDevelopment | DevForge Engineering'}
            />
            <p className="project-editor-help">Format: <strong>Role | Name</strong>.</p>
          </Section>

          <Section id="publish" number="10" title="Publishing" hint="Visibility and homepage placement">
            <div className="project-publish-options">
              <label className="project-toggle">
                <input
                  type="checkbox"
                  checked={!!form.featured}
                  onChange={e => setField('featured', e.target.checked)}
                />
                <span>
                  <strong>Featured project</strong>
                  <small>Show this project prominently in Selected Work.</small>
                </span>
              </label>
              <label className="project-toggle">
                <input
                  type="checkbox"
                  checked={!!form.isActive}
                  onChange={e => setField('isActive', e.target.checked)}
                />
                <span>
                  <strong>Published</strong>
                  <small>Allow the public API and Project Detail page to display it.</small>
                </span>
              </label>
            </div>
          </Section>
        </div>

        {error && <div className="alert wide">{error}</div>}

        <div className="actions project-editor-actions">
          <button type="button" className="secondary" onClick={requestClose} disabled={saving}>
            Cancel
          </button>
          <button className="primary" disabled={saving}>
            {saving ? 'Saving project…' : row ? 'Save project' : 'Create project'}
          </button>
        </div>

        {confirmClose && (
          <div className="unsaved-confirm" role="alertdialog" aria-modal="true">
            <div className="unsaved-confirm-card">
              <span className="unsaved-confirm-icon">!</span>
              <div>
                <h3>Unsaved changes</h3>
                <p>You have entered project details that have not been saved. Are you sure you want to discard them?</p>
              </div>
              <div className="actions">
                <button type="button" className="secondary" onClick={() => setConfirmClose(false)}>
                  Keep editing
                </button>
                <button type="button" className="danger" onClick={discardAndClose}>
                  Discard changes
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </Modal>
  );
}

function Editor({
  section,
  row,
  onDone,
  onClose,
}: {
  section: string;
  row: Row | null;
  onDone: () => void;
  onClose: () => void;
}) {
  if (section === 'projects') {
    return <ProjectEditor row={row} onDone={onDone} onClose={onClose} />;
  }

  const fields = schemas[section];

  const [form, setForm] = useState<Row>(() => ({
    ...row,
    isActive: row?.isActive ?? true,
    rating: row?.rating ?? 5,
    status:
      row?.status ??
      (section === 'reviews'
        ? 'pending'
        : section === 'clients'
          ? 'lead'
          : 'admin'),
  }));

  const [error, setError] = useState('');

  const save = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const body = { ...form };

      const endpoint =
        section === 'services'
          ? `/services${row ? `/${row._id}` : ''}`
          : `/admin/${section}${row ? `/${row._id}` : ''}`;

      await adminFetch(endpoint, {
        method: row ? 'PUT' : 'POST',
        body: JSON.stringify(body),
      });

      onDone();
    } catch (x: any) {
      setError(x.message);
    }
  };

  return (
    <Modal
      title={`${row ? 'Edit' : 'Add'} ${sectionSingularNames[section] || section}`}
      onClose={onClose}
    >
      <form className="editor" onSubmit={save}>
        {fields.map(f =>
          f.type === 'upload-image' ||
            f.type === 'upload-video' ? (
            <UploadField
              key={f.key}
              label={f.label}
              value={form[f.key] ?? ''}
              kind={f.type === 'upload-video' ? 'video' : 'image'}
              onChange={url => setForm({ ...form, [f.key]: url })}
            />
          ) : (
            <label key={f.key} className={f.type === 'textarea' ? 'wide' : ''}>
              {f.label}
              {f.type === 'textarea' ? (
                <textarea
                  value={form[f.key] ?? ''}
                  onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  required={f.required}
                />
              ) : f.type === 'checkbox' ? (
                <input
                  type="checkbox"
                  checked={!!form[f.key]}
                  onChange={e => setForm({ ...form, [f.key]: e.target.checked })}
                />
              ) : f.type === 'select' ? (
                <select
                  value={form[f.key]}
                  onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              ) : f.type === 'projectStatus' ? (
                <select
                  value={form[f.key]}
                  onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                >
                  <option value="planning">Planning</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="on-hold">On hold</option>
                </select>
              ) : f.type === 'clientStatus' ? (
                <select
                  value={form[f.key] || 'lead'}
                  onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                >
                  <option value="lead">Lead</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="inactive">Inactive</option>
                </select>
              ) : f.type === 'adminRole' ? (
                <select
                  value={form[f.key] || 'admin'}
                  onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                >
                  <option value="admin">Admin</option>
                  <option value="super-admin">Super Admin</option>
                </select>
              ) : (
                <input
                  type={f.type || 'text'}
                  minLength={f.type === 'password' ? 8 : undefined}
                  value={Array.isArray(form[f.key])
                    ? form[f.key].map((item: any) =>
                      typeof item === 'string'
                        ? item
                        : item?.title || item?.name || item?.value || ''
                    ).join(', ')
                    : form[f.key] ?? ''}
                  onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  required={f.key === 'password' ? !row : f.required}
                />
              )}
            </label>
          )
        )}

        {error && <div className="alert wide">{error}</div>}

        <div className="actions wide">
          <button type="button" className="secondary" onClick={onClose}>Cancel</button>
          <button className="primary">Save changes</button>
        </div>
      </form>
    </Modal>
  );
}

/* =========================================================
   INQUIRY DETAILS
   ========================================================= */

function InquiryDetails({
  inquiry,
  onDone,
  onClose,
}: {
  inquiry: Row;
  onDone: () => void;
  onClose: () => void;
}) {
  const [status, setStatus] = useState(
    inquiry.status || 'new'
  );

  const [notes, setNotes] = useState(
    inquiry.notes || ''
  );

  const [followUpAt, setFollowUpAt] = useState(
    inquiry.followUpAt
      ? String(inquiry.followUpAt).slice(0, 10)
      : ''
  );

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const save = async (e: FormEvent) => {
    e.preventDefault();

    setSaving(true);
    setMessage('');

    try {
      await adminFetch(
        `/inquiries/${inquiry._id}`,
        {
          method: 'PATCH',
          body: JSON.stringify({
            status,
            notes,
            followUpAt: followUpAt || null,
          }),
        }
      );

      setMessage(
        'Inquiry updated successfully.'
      );

      onDone();
    } catch (x: any) {
      setMessage(x.message);
    } finally {
      setSaving(false);
    }
  };

  const phone = String(
    inquiry.phone || ''
  ).replace(/\D/g, '');

  const emailSubject = encodeURIComponent(
    `DevForge — Regarding inquiry ${inquiry.projectId || ''
    }`
  );

  const emailBody = encodeURIComponent(
    `Hello ${inquiry.name || ''},\n\nThank you for contacting DevForge regarding ${inquiry.service || 'your project'
    }.\n\n`
  );

  const whatsappText = encodeURIComponent(
    `Hello ${inquiry.name || ''
    }, thank you for contacting DevForge regarding ${inquiry.service || 'your project'
    }.`
  );

  return (
    <Modal
      title={`Inquiry ${inquiry.projectId || ''}`}
      onClose={onClose}
    >
      <div className="inquiry-details">
        <div className="detail-grid">
          <div>
            <small>Client</small>
            <strong>{inquiry.name || '—'}</strong>
          </div>

          <div>
            <small>Company</small>
            <strong>{inquiry.company || '—'}</strong>
          </div>

          <div>
            <small>Email</small>
            <strong>{inquiry.email || '—'}</strong>
          </div>

          <div>
            <small>Phone</small>
            <strong>
              {inquiry.phone || 'Not provided'}
            </strong>
          </div>

          <div>
            <small>Service</small>
            <strong>
              {inquiry.serviceOther ||
                inquiry.service ||
                '—'}
            </strong>
          </div>

          <div>
            <small>Timeline</small>
            <strong>
              {inquiry.timeline || '—'}
            </strong>
          </div>

          <div>
            <small>Website</small>
            <strong>
              {inquiry.website || '—'}
            </strong>
          </div>

          <div>
            <small>Received</small>
            <strong>
              {inquiry.createdAt
                ? new Date(
                  inquiry.createdAt
                ).toLocaleString()
                : '—'}
            </strong>
          </div>
        </div>

        <div className="inquiry-message">
          <small>Client message</small>
          <p>
            {inquiry.message ||
              'No message provided.'}
          </p>
        </div>

        <div className="contact-actions">
          <a
            className="secondary"
            href={`mailto:${inquiry.email}?subject=${emailSubject}&body=${emailBody}`}
          >
            Reply by email
          </a>

          {phone ? (
            <a
              className="whatsapp-btn"
              href={`https://wa.me/${phone}?text=${whatsappText}`}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp ↗
            </a>
          ) : (
            <button
              className="secondary"
              disabled
              title="Phone number was not provided"
            >
              WhatsApp unavailable
            </button>
          )}
        </div>

        <form
          className="inquiry-form"
          onSubmit={save}
        >
          <label>
            Status
            <select
              value={status}
              onChange={e =>
                setStatus(e.target.value)
              }
            >
              <option value="new">New</option>
              <option value="contacted">
                Contacted
              </option>
              <option value="in-progress">
                In progress
              </option>
              <option value="closed">
                Closed
              </option>
            </select>
          </label>

          <label>
            Follow-up date
            <input
              type="date"
              value={followUpAt}
              onChange={e =>
                setFollowUpAt(e.target.value)
              }
            />
          </label>

          <label className="wide">
            Internal notes
            <textarea
              value={notes}
              onChange={e =>
                setNotes(e.target.value)
              }
              placeholder="Add private follow-up notes…"
            />
          </label>

          {message && (
            <div className="notice wide">
              {message}
            </div>
          )}

          <div className="actions wide">
            <button
              type="button"
              className="secondary"
              onClick={onClose}
            >
              Close
            </button>

            <button
              className="primary"
              disabled={saving}
            >
              {saving
                ? 'Saving…'
                : 'Save inquiry'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

/* =========================================================
   CLIENT DETAILS
   ========================================================= */

const emptyClientProject = {
  title: '',
  service: '',
  status: 'planning',
  startDate: '',
  dueDate: '',
  completedAt: '',
  budget: '',
  projectUrl: '',
  notes: '',
};

function ClientDetails({
  client,
  onDone,
  onClose,
}: {
  client: Row;
  onDone: () => void;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState<Row>(
    client
  );

  const [form, setForm] = useState<Row>(
    emptyClientProject
  );

  const [editingProjectId, setEditingProjectId] =
    useState<string | null>(null);

  const [showForm, setShowForm] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] = useState('');

  const refreshClient = async () => {
    const result =
      await adminFetch<any>(
        '/admin/clients'
      );

    const updated = (
      result.data || []
    ).find(
      (item: Row) =>
        item._id === client._id
    );

    if (updated) {
      setCurrent(updated);
    }

    onDone();
  };

  const startAdd = () => {
    setEditingProjectId(null);
    setForm({
      ...emptyClientProject,
    });
    setError('');
    setShowForm(true);
  };

  const startEdit = (project: Row) => {
    setEditingProjectId(project._id);

    setForm({
      ...project,
      startDate: project.startDate
        ? String(
          project.startDate
        ).slice(0, 10)
        : '',
      dueDate: project.dueDate
        ? String(
          project.dueDate
        ).slice(0, 10)
        : '',
      completedAt:
        project.completedAt
          ? String(
            project.completedAt
          ).slice(0, 10)
          : '',
    });

    setError('');
    setShowForm(true);
  };

  const saveProject = async (
    e: FormEvent
  ) => {
    e.preventDefault();

    setSaving(true);
    setError('');

    try {
      const path = `/admin/clients/${current._id
        }/projects${editingProjectId
          ? `/${editingProjectId}`
          : ''
        }`;

      const result =
        await adminFetch<any>(
          path,
          {
            method:
              editingProjectId
                ? 'PUT'
                : 'POST',
            body: JSON.stringify({
              ...form,
              budget:
                form.budget === ''
                  ? 0
                  : Number(form.budget),
              startDate:
                form.startDate || null,
              dueDate:
                form.dueDate || null,
              completedAt:
                form.completedAt ||
                null,
            }),
          }
        );

      setCurrent(result.data);
      setShowForm(false);
      setForm({
        ...emptyClientProject,
      });
      setEditingProjectId(null);
      onDone();
    } catch (x: any) {
      setError(
        x.message ||
        'Could not save project'
      );
    } finally {
      setSaving(false);
    }
  };

  const removeProject = async (
    project: Row
  ) => {
    if (
      !confirm(
        `Delete project history “${project.title}”?`
      )
    ) {
      return;
    }

    try {
      const result =
        await adminFetch<any>(
          `/admin/clients/${current._id}/projects/${project._id}`,
          {
            method: 'DELETE',
          }
        );

      setCurrent(result.data);
      onDone();
    } catch (x: any) {
      setError(
        x.message ||
        'Could not delete project'
      );
    }
  };

  const history: Row[] =
    current.projectHistory || [];

  return (
    <Modal
      title={`Client — ${current.name || ''
        }`}
      onClose={onClose}
    >
      <div className="inquiry-details">
        <div className="detail-grid">
          <div>
            <small>Name</small>
            <strong>
              {current.name || '—'}
            </strong>
          </div>

          <div>
            <small>Company</small>
            <strong>
              {current.company || '—'}
            </strong>
          </div>

          <div>
            <small>Email</small>
            <strong>
              {current.email || '—'}
            </strong>
          </div>

          <div>
            <small>Phone</small>
            <strong>
              {current.phone || '—'}
            </strong>
          </div>

          <div>
            <small>Status</small>
            <strong>
              {current.status || '—'}
            </strong>
          </div>

          <div>
            <small>Follow-up</small>
            <strong>
              {current.followUpAt
                ? new Date(
                  current.followUpAt
                ).toLocaleDateString()
                : '—'}
            </strong>
          </div>
        </div>

        {current.notes && (
          <div className="inquiry-message">
            <small>Client notes</small>
            <p>{current.notes}</p>
          </div>
        )}

        <div className="panel-head">
          <div>
            <p className="eyebrow">
              CLIENT WORK
            </p>

            <h2>Project history</h2>
          </div>

          <button
            className="primary"
            type="button"
            onClick={startAdd}
          >
            + Add project
          </button>
        </div>

        {error && !showForm && (
          <div className="alert">
            {error}
          </div>
        )}

        {!history.length ? (
          <div className="empty">
            No project history found.
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Service</th>
                  <th>Status</th>
                  <th>Budget</th>
                  <th>Due date</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {history.map(project => (
                  <tr
                    key={project._id}
                  >
                    <td>
                      {project.projectUrl ? (
                        <a
                          href={
                            project.projectUrl
                          }
                          target="_blank"
                          rel="noreferrer"
                        >
                          {
                            project.title
                          }{' '}
                          ↗
                        </a>
                      ) : (
                        project.title
                      )}
                    </td>

                    <td>
                      {project.service ||
                        '—'}
                    </td>

                    <td>
                      <span
                        className={`badge ${project.status}`}
                      >
                        {project.status ||
                          'planning'}
                      </span>
                    </td>

                    <td>
                      {project.budget
                        ? `₹${Number(
                          project.budget
                        ).toLocaleString(
                          'en-IN'
                        )}`
                        : '—'}
                    </td>

                    <td>
                      {project.dueDate
                        ? new Date(
                          project.dueDate
                        ).toLocaleDateString()
                        : '—'}
                    </td>

                    <td>
                      <div className="row-actions">
                        <button
                          type="button"
                          onClick={() =>
                            startEdit(
                              project
                            )
                          }
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="danger"
                          onClick={() =>
                            removeProject(
                              project
                            )
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {showForm && (
          <form
            className="editor"
            onSubmit={saveProject}
          >
            <label>
              Project title
              <input
                value={
                  form.title || ''
                }
                onChange={e =>
                  setForm({
                    ...form,
                    title:
                      e.target.value,
                  })
                }
                required
              />
            </label>

            <label>
              Service
              <input
                value={
                  form.service || ''
                }
                onChange={e =>
                  setForm({
                    ...form,
                    service:
                      e.target.value,
                  })
                }
              />
            </label>

            <label>
              Status
              <select
                value={
                  form.status ||
                  'planning'
                }
                onChange={e =>
                  setForm({
                    ...form,
                    status:
                      e.target.value,
                  })
                }
              >
                <option value="planning">
                  Planning
                </option>
                <option value="ongoing">
                  Ongoing
                </option>
                <option value="completed">
                  Completed
                </option>
                <option value="on-hold">
                  On hold
                </option>
                <option value="cancelled">
                  Cancelled
                </option>
              </select>
            </label>

            <label>
              Budget
              <input
                type="number"
                min="0"
                value={
                  form.budget ?? ''
                }
                onChange={e =>
                  setForm({
                    ...form,
                    budget:
                      e.target.value,
                  })
                }
              />
            </label>

            <label>
              Start date
              <input
                type="date"
                value={
                  form.startDate ||
                  ''
                }
                onChange={e =>
                  setForm({
                    ...form,
                    startDate:
                      e.target.value,
                  })
                }
              />
            </label>

            <label>
              Due date
              <input
                type="date"
                value={
                  form.dueDate ||
                  ''
                }
                onChange={e =>
                  setForm({
                    ...form,
                    dueDate:
                      e.target.value,
                  })
                }
              />
            </label>

            <label>
              Completed date
              <input
                type="date"
                value={
                  form.completedAt ||
                  ''
                }
                onChange={e =>
                  setForm({
                    ...form,
                    completedAt:
                      e.target.value,
                  })
                }
              />
            </label>

            <label>
              Project URL
              <input
                type="url"
                value={
                  form.projectUrl ||
                  ''
                }
                onChange={e =>
                  setForm({
                    ...form,
                    projectUrl:
                      e.target.value,
                  })
                }
              />
            </label>

            <label className="wide">
              Project notes
              <textarea
                value={
                  form.notes || ''
                }
                onChange={e =>
                  setForm({
                    ...form,
                    notes:
                      e.target.value,
                  })
                }
              />
            </label>

            {error && (
              <div className="alert wide">
                {error}
              </div>
            )}

            <div className="actions wide">
              <button
                type="button"
                className="secondary"
                onClick={() => {
                  setShowForm(false);
                  setError('');
                }}
              >
                Cancel
              </button>

              <button
                className="primary"
                disabled={saving}
              >
                {saving
                  ? 'Saving…'
                  : editingProjectId
                    ? 'Update project'
                    : 'Add project'}
              </button>
            </div>
          </form>
        )}

        <div className="actions">
          <button
            type="button"
            className="secondary"
            onClick={() => {
              refreshClient().catch(
                () => { }
              );
              onClose();
            }}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}

/* =========================================================
   NOTIFICATION BELL
   ========================================================= */

function NotificationBell({
  onNavigate,
}: {
  onNavigate: (section: Section) => void;
}) {
  const [open, setOpen] =
    useState(false);

  const [items, setItems] =
    useState<Row[]>([]);

  const [unreadCount, setUnreadCount] =
    useState(0);

  const [loading, setLoading] =
    useState(false);

  const loadNotifications =
    useCallback(async () => {
      try {
        const result =
          await adminFetch<any>(
            '/admin/notifications?limit=20'
          );

        setItems(result.data || []);
        setUnreadCount(
          result.unreadCount || 0
        );
      } catch (error) {
        console.error(
          'Could not load notifications',
          error
        );
      }
    }, []);

  useEffect(() => {
    loadNotifications();

    const timer =
      window.setInterval(
        loadNotifications,
        30000
      );

    return () =>
      window.clearInterval(timer);
  }, [loadNotifications]);

  const markRead = async (
    notification: Row
  ) => {
    if (!notification.isRead) {
      await adminFetch(
        `/admin/notifications/${notification._id}/read`,
        {
          method: 'PATCH',
        }
      );
    }

    setItems(current =>
      current.map(item =>
        item._id === notification._id
          ? {
            ...item,
            isRead: true,
            readAt:
              new Date().toISOString(),
          }
          : item
      )
    );

    setUnreadCount(current =>
      notification.isRead
        ? current
        : Math.max(0, current - 1)
    );

    const target =
      notification.resource as Section;

    if (
      [
        'inquiries',
        'reviews',
        'clients',
        'projects',
        'services',
      ].includes(target)
    ) {
      onNavigate(target);
      setOpen(false);
    }
  };

  const markAllRead = async () => {
    await adminFetch(
      '/admin/notifications/read-all',
      {
        method: 'PATCH',
      }
    );

    setItems(current =>
      current.map(item => ({
        ...item,
        isRead: true,
        readAt:
          item.readAt ||
          new Date().toISOString(),
      }))
    );

    setUnreadCount(0);
  };

  const removeNotification = async (
    e: any,
    notification: Row
  ) => {
    e.stopPropagation();

    await adminFetch(
      `/admin/notifications/${notification._id}`,
      {
        method: 'DELETE',
      }
    );

    setItems(current =>
      current.filter(
        item =>
          item._id !== notification._id
      )
    );

    if (!notification.isRead) {
      setUnreadCount(current =>
        Math.max(0, current - 1)
      );
    }
  };

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <button
        type="button"
        onClick={() => {
          setOpen(value => !value);

          if (!open) {
            setLoading(true);

            loadNotifications().finally(
              () => setLoading(false)
            );
          }
        }}
        aria-label="Notifications"
        style={{
          position: 'relative',
          width: '44px',
          height: '44px',
          borderRadius: '10px',
          border:
            '1px solid #25302d',
          background: '#101614',
          color: '#eef5f2',
          fontSize: '20px',
          cursor: 'pointer',
        }}
      >
        <svg
          width="21"
          height="21"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#a8ff38"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
          <path d="M10 21h4" />
        </svg>

        {unreadCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '-6px',
              right: '-6px',
              minWidth: '20px',
              height: '20px',
              padding: '0 5px',
              borderRadius: '999px',
              display: 'grid',
              placeItems: 'center',
              background: '#a8ff38',
              color: '#07100b',
              fontSize: '11px',
              fontWeight: 800,
            }}
          >
            {unreadCount > 99
              ? '99+'
              : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: '54px',
            zIndex: 1000,
            width:
              'min(390px,calc(100vw - 32px))',
            maxHeight: '520px',
            overflow: 'auto',
            background: '#101614',
            border:
              '1px solid #25302d',
            borderRadius: '12px',
            boxShadow:
              '0 18px 50px rgba(0,0,0,.45)',
          }}
        >
          <div
            style={{
              position: 'sticky',
              top: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent:
                'space-between',
              gap: '12px',
              padding: '15px',
              background: '#101614',
              borderBottom:
                '1px solid #25302d',
            }}
          >
            <div>
              <strong>
                Notifications
              </strong>

              <small
                style={{
                  display: 'block',
                  color: '#8fa39d',
                  marginTop: '3px',
                }}
              >
                {unreadCount} unread
              </small>
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllRead}
                style={{
                  border: 0,
                  background:
                    'transparent',
                  color: '#a8ff38',
                  cursor: 'pointer',
                }}
              >
                Mark all read
              </button>
            )}
          </div>

          {loading &&
            !items.length ? (
            <div
              style={{
                padding: '24px',
                color: '#8fa39d',
              }}
            >
              Loading…
            </div>
          ) : !items.length ? (
            <div
              style={{
                padding: '28px',
                textAlign: 'center',
                color: '#8fa39d',
              }}
            >
              No notifications yet.
            </div>
          ) : (
            items.map(notification => (
              <div
                key={notification._id}
                role="button"
                tabIndex={0}
                onClick={() =>
                  markRead(
                    notification
                  )
                }
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    markRead(
                      notification
                    );
                  }
                }}
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    '12px 1fr auto',
                  gap: '11px',
                  alignItems:
                    'start',
                  padding: '15px',
                  borderBottom:
                    '1px solid #1c2623',
                  background:
                    notification.isRead
                      ? 'transparent'
                      : 'rgba(168,255,56,.055)',
                  cursor: 'pointer',
                }}
              >
                <span
                  style={{
                    width: '9px',
                    height: '9px',
                    marginTop: '5px',
                    borderRadius:
                      '50%',
                    background:
                      notification.isRead
                        ? '#40504b'
                        : '#a8ff38',
                  }}
                />

                <div>
                  <strong
                    style={{
                      display:
                        'block',
                      fontSize: '14px',
                    }}
                  >
                    {
                      notification.title
                    }
                  </strong>

                  <p
                    style={{
                      margin:
                        '5px 0',
                      fontSize:
                        '13px',
                      lineHeight:
                        1.45,
                      color:
                        '#aab9b4',
                    }}
                  >
                    {
                      notification.message
                    }
                  </p>

                  <small
                    style={{
                      color:
                        '#70827c',
                    }}
                  >
                    {notification.createdAt
                      ? new Date(
                        notification.createdAt
                      ).toLocaleString()
                      : 'Just now'}
                  </small>
                </div>

                <button
                  type="button"
                  onClick={e =>
                    removeNotification(
                      e,
                      notification
                    )
                  }
                  title="Delete notification"
                  style={{
                    border: 0,
                    background:
                      'transparent',
                    color:
                      '#ff7b7b',
                    fontSize:
                      '18px',
                    cursor:
                      'pointer',
                  }}
                >
                  <NavIcon name="close" />
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   ADMIN PAGE
   ========================================================= */

export default function AdminPage() {
  const hasResetToken =
    !!new URLSearchParams(
      window.location.search
    ).get('resetToken');

  const [
    authenticated,
    setAuthenticated,
  ] = useState(
    !hasResetToken &&
    !!localStorage.getItem(
      'devforge_admin_token'
    )
  );

  const [currentAdmin, setCurrentAdmin] =
    useState<Row>({});

  const [section, setSection] =
    useState<Section>('dashboard');

  const [data, setData] =
    useState<Row[]>([]);

  const [dashboard, setDashboard] =
    useState<Row>({});

  const [loading, setLoading] =
    useState(false);

  const [query, setQuery] =
    useState('');

  const [statusFilter, setStatusFilter] =
    useState('all');

  const [serviceFilter, setServiceFilter] =
    useState('all');

  const [followUpFilter, setFollowUpFilter] =
    useState('all');

  const [
    activityResource,
    setActivityResource,
  ] = useState('all');

  const [
    activityAction,
    setActivityAction,
  ] = useState('all');

  const [editing, setEditing] =
    useState<Row | null | undefined>();

  const [menu, setMenu] =
    useState(false);

  const load = useCallback(
    async () => {
      if (!authenticated) return;

      setLoading(true);

      try {
        if (section === 'dashboard') {
          setDashboard(
            (
              await adminFetch<any>(
                '/admin/dashboard'
              )
            ).data
          );
        } else if (
          section === 'inquiries'
        ) {
          setData(
            (
              await adminFetch<any>(
                '/inquiries?limit=100'
              )
            ).data
          );
        } else if (
          section === 'activity'
        ) {
          setData(
            (
              await adminFetch<any>(
                '/admin/activity?limit=100'
              )
            ).data
          );
        } else if (
          [
            'services',
            'projects',
            'reviews',
            'clients',
            'admins',
          ].includes(section)
        ) {
          setData(
            (
              await adminFetch<any>(
                section ===
                  'services'
                  ? '/services/admin/all'
                  : `/admin/${section}`
              )
            ).data
          );
        }
      } catch (e: any) {
        if (e.status === 401) {
          localStorage.removeItem(
            'devforge_admin_token'
          );

          setAuthenticated(false);
        }

        if (
          e.status === 403 &&
          (section === 'admins' ||
            section === 'activity')
        ) {
          setSection('dashboard');
        }
      } finally {
        setLoading(false);
      }
    },
    [section, authenticated]
  );

  useEffect(() => {
    if (authenticated) {
      adminFetch<any>('/auth/me')
        .then(r =>
          setCurrentAdmin(r.admin)
        )
        .catch(() => { });
    }
  }, [authenticated]);

  useEffect(() => {
    load();
  }, [load]);

  const serviceOptions = useMemo(
    () =>
      Array.from(
        new Set(
          data
            .map(r => r.service)
            .filter(Boolean)
        )
      ).sort(),
    [data]
  );

  const activityResources =
    useMemo(
      () =>
        Array.from(
          new Set(
            data
              .map(r => r.resource)
              .filter(Boolean)
          )
        ).sort(),
      [data]
    );

  const activityActions =
    useMemo(
      () =>
        Array.from(
          new Set(
            data
              .map(r => r.action)
              .filter(Boolean)
          )
        ).sort(),
      [data]
    );

  const filtered = useMemo(
    () =>
      data.filter(r => {
        if (
          !JSON.stringify(r)
            .toLowerCase()
            .includes(
              query.toLowerCase()
            )
        ) {
          return false;
        }

        if (section === 'activity') {
          if (
            activityResource !==
            'all' &&
            r.resource !==
            activityResource
          ) {
            return false;
          }

          if (
            activityAction !==
            'all' &&
            r.action !==
            activityAction
          ) {
            return false;
          }

          return true;
        }

        if (section !== 'inquiries') {
          return true;
        }

        if (
          statusFilter !== 'all' &&
          r.status !== statusFilter
        ) {
          return false;
        }

        if (
          serviceFilter !== 'all' &&
          r.service !== serviceFilter
        ) {
          return false;
        }

        const today =
          new Date();

        today.setHours(
          0,
          0,
          0,
          0
        );

        const followUp =
          r.followUpAt
            ? new Date(
              r.followUpAt
            )
            : null;

        if (
          followUpFilter ===
          'upcoming' &&
          (!followUp ||
            followUp < today)
        ) {
          return false;
        }

        if (
          followUpFilter ===
          'overdue' &&
          (!followUp ||
            followUp >= today ||
            r.status === 'closed')
        ) {
          return false;
        }

        if (
          followUpFilter ===
          'none' &&
          followUp
        ) {
          return false;
        }

        return true;
      }),
    [
      data,
      query,
      section,
      statusFilter,
      serviceFilter,
      followUpFilter,
      activityResource,
      activityAction,
    ]
  );

  if (!authenticated) {
    return (
      <Login
        onLogin={() =>
          setAuthenticated(true)
        }
      />
    );
  }

  const logout = () => {
    localStorage.removeItem(
      'devforge_admin_token'
    );

    setAuthenticated(false);
  };

  const remove = async (
    row: Row
  ) => {
    if (
      !confirm(
        'Delete this item permanently?'
      )
    ) {
      return;
    }

    await adminFetch(
      section === 'inquiries'
        ? `/inquiries/${row._id}`
        : `/admin/${section}/${row._id}`,
      {
        method: 'DELETE',
      }
    );

    load();
  };

  const quickStatus = async (
    row: Row,
    status: string
  ) => {
    await adminFetch(
      section === 'inquiries'
        ? `/inquiries/${row._id}`
        : `/admin/${section}/${row._id}`,
      {
        method:
          section === 'inquiries'
            ? 'PATCH'
            : 'PUT',
        body: JSON.stringify({
          status,
        }),
      }
    );

    load();
  };

  const counts =
    dashboard.counts || {};

  const visibleNav =
    nav.filter(
      n =>
        ![
          'admins',
          'activity',
        ].includes(n.id) ||
        currentAdmin.role ===
        'super-admin'
    );

  return (
    <div className="admin-shell">
      {/* =====================================================
          SIDEBAR
          ===================================================== */}

      <aside
        className={
          menu ? 'open' : ''
        }
      >
        <div className="admin-brand">
          <span
            style={{
              background:
                'transparent',
              padding: '0',
              border: 'none',
              overflow:
                'hidden',
            }}
          >
            <img
  src={devforgeMiniLogo}
              alt="DEVFORGE logo"
              style={{
                width: '46px',
                height: '46px',
                display: 'block',
                objectFit:
                  'contain',
              }}
            />
          </span>

          <div
            style={{
              display: 'grid',
              gap: '5px',
            }}
          >
            <strong
              style={{
                fontSize: '17px',
                letterSpacing:
                  '2px',
                lineHeight: 1,
                whiteSpace:
                  'nowrap',
              }}
            >
              <i
                style={{
                  fontStyle:
                    'normal',
                  color:
                    '#f4f7f5',
                }}
              >
                DEV
              </i>

              <b
                style={{
                  color:
                    '#a8ff38',
                }}
              >
                FORGE
              </b>
            </strong>

            <small
              style={{
                fontSize: '7px',
                letterSpacing:
                  '1.5px',
                whiteSpace:
                  'nowrap',
                color:
                  '#aab7b2',
              }}
            >
              BUILD •{' '}
              <em
                style={{
                  fontStyle:
                    'normal',
                  color:
                    '#a8ff38',
                }}
              >
                CODE
              </em>{' '}
              • LAUNCH
            </small>
          </div>
        </div>

        <nav className="admin-nav">
          {[
            {
              label: 'MAIN',
              items: visibleNav.filter(n =>
                ['dashboard', 'inquiries'].includes(n.id)
              ),
            },
            {
              label: 'CONTENT',
              items: visibleNav.filter(n =>
                ['services', 'projects', 'reviews', 'clients'].includes(n.id)
              ),
            },
            {
              label: 'SYSTEM',
              items: visibleNav.filter(n =>
                ['admins', 'activity', 'settings', 'profile'].includes(n.id)
              ),
            },
          ].map(group => (
            <div className="nav-group" key={group.label}>
              <span className="nav-group-label">{group.label}</span>

              {group.items.map(n => (
                <button
                  key={n.id}
                  type="button"
                  className={section === n.id ? 'active' : ''}
                  onClick={() => {
                    setSection(n.id);
                    setMenu(false);
                  }}
                >
                  <b className="nav-icon">
                    <NavIcon name={n.icon} />
                  </b>
                  <span>{n.label}</span>
                </button>
              ))}
            </div>
          ))}
        </nav>

        <button
          className="logout"
          onClick={logout}
        >
          <b className="nav-icon">
            <NavIcon name="logout" />
          </b>

          <span>Sign out</span>
        </button>
      </aside>

      {/* =====================================================
          MAIN CONTENT
          ===================================================== */}

      <main className="admin-main">
        <header>
          <button
            className="menu-btn"
            onClick={() =>
              setMenu(!menu)
            }
            aria-label="Open navigation"
            aria-expanded={menu}
          >
            <NavIcon name="menu" />
          </button>

          <div>
            <p className="eyebrow">
              ADMIN /{' '}
              {section.toUpperCase()}
            </p>

            <h1>
              {
                nav.find(
                  n =>
                    n.id ===
                    section
                )?.label
              }
            </h1>
          </div>

          <div
            style={{
              marginLeft: 'auto',
              display: 'flex',
              alignItems:
                'center',
              gap: '14px',
            }}
          >
            <NotificationBell
              onNavigate={target => {
                setSection(target);
                setMenu(false);
              }}
            />

            <a
              href="/"
              target="_blank"
            >
              View website ↗
            </a>
          </div>
        </header>

        {loading ? (
          <div className="loading">
            Loading studio data…
          </div>
        ) : section ===
          'dashboard' ? (
          <DashboardView
            dashboard={dashboard}
            counts={counts}
            openInquiries={() =>
              setSection(
                'inquiries'
              )
            }
            openProjects={() =>
              setSection(
                'projects'
              )
            }
            onStatus={
              quickStatus
            }
          />
        ) : section ===
          'settings' ? (
          <Settings />
        ) : section ===
          'profile' ? (
          <Profile
            logout={logout}
          />
        ) : (
          <section className="panel data-panel">
            <div className="toolbar">
              <div>
                <p className="eyebrow">
                  {section ===
                    'activity'
                    ? 'SECURITY AUDIT'
                    : 'MANAGE CONTENT'}
                </p>

                <h2>
                  {
                    nav.find(
                      n =>
                        n.id ===
                        section
                    )?.label
                  }
                </h2>
              </div>

              <div className="toolbar-actions">
                <input
                  placeholder="Search…"
                  value={query}
                  onChange={e =>
                    setQuery(
                      e.target.value
                    )
                  }
                />

                {section ===
                  'inquiries' ? (
                  <>
                    <select
                      aria-label="Filter by status"
                      value={
                        statusFilter
                      }
                      onChange={e =>
                        setStatusFilter(
                          e.target
                            .value
                        )
                      }
                      style={
                        filterStyle
                      }
                    >
                      <option value="all">
                        All statuses
                      </option>
                      <option value="new">
                        New
                      </option>
                      <option value="contacted">
                        Contacted
                      </option>
                      <option value="in-progress">
                        In progress
                      </option>
                      <option value="closed">
                        Closed
                      </option>
                    </select>

                    <select
                      aria-label="Filter by service"
                      value={
                        serviceFilter
                      }
                      onChange={e =>
                        setServiceFilter(
                          e.target
                            .value
                        )
                      }
                      style={
                        filterStyle
                      }
                    >
                      <option value="all">
                        All services
                      </option>

                      {serviceOptions.map(
                        service => (
                          <option
                            key={
                              service
                            }
                            value={
                              service
                            }
                          >
                            {service}
                          </option>
                        )
                      )}
                    </select>

                    <select
                      aria-label="Filter by follow-up"
                      value={
                        followUpFilter
                      }
                      onChange={e =>
                        setFollowUpFilter(
                          e.target
                            .value
                        )
                      }
                      style={
                        filterStyle
                      }
                    >
                      <option value="all">
                        All follow-ups
                      </option>
                      <option value="upcoming">
                        Upcoming
                      </option>
                      <option value="overdue">
                        Overdue
                      </option>
                      <option value="none">
                        No date
                      </option>
                    </select>

                    {(statusFilter !==
                      'all' ||
                      serviceFilter !==
                      'all' ||
                      followUpFilter !==
                      'all') && (
                        <button
                          className="secondary"
                          onClick={() => {
                            setStatusFilter(
                              'all'
                            );
                            setServiceFilter(
                              'all'
                            );
                            setFollowUpFilter(
                              'all'
                            );
                          }}
                        >
                          Clear
                        </button>
                      )}
                  </>
                ) : section ===
                  'activity' ? (
                  <>
                    <select
                      value={
                        activityResource
                      }
                      onChange={e =>
                        setActivityResource(
                          e.target
                            .value
                        )
                      }
                      style={
                        filterStyle
                      }
                    >
                      <option value="all">
                        All resources
                      </option>

                      {activityResources.map(
                        value => (
                          <option
                            key={value}
                            value={value}
                          >
                            {value}
                          </option>
                        )
                      )}
                    </select>

                    <select
                      value={
                        activityAction
                      }
                      onChange={e =>
                        setActivityAction(
                          e.target
                            .value
                        )
                      }
                      style={
                        filterStyle
                      }
                    >
                      <option value="all">
                        All actions
                      </option>

                      {activityActions.map(
                        value => (
                          <option
                            key={value}
                            value={value}
                          >
                            {value}
                          </option>
                        )
                      )}
                    </select>

                    {(activityResource !==
                      'all' ||
                      activityAction !==
                      'all') && (
                        <button
                          className="secondary"
                          onClick={() => {
                            setActivityResource(
                              'all'
                            );
                            setActivityAction(
                              'all'
                            );
                          }}
                        >
                          Clear
                        </button>
                      )}
                  </>
                ) : (
                  <button
                    className="primary"
                    onClick={() =>
                      setEditing(null)
                    }
                  >
                    + Add new
                  </button>
                )}
              </div>
            </div>

            <Table
              section={section}
              rows={filtered}
              onEdit={r =>
                setEditing(r)
              }
              onDelete={remove}
              onStatus={
                quickStatus
              }
            />
          </section>
        )}

        {editing !== undefined &&
          section ===
          'inquiries' &&
          editing && (
            <InquiryDetails
              inquiry={editing}
              onClose={() =>
                setEditing(
                  undefined
                )
              }
              onDone={() => {
                load();
              }}
            />
          )}

        {editing !== undefined &&
          section ===
          'clients' &&
          editing && (
            <ClientDetails
              client={editing}
              onClose={() =>
                setEditing(
                  undefined
                )
              }
              onDone={() => {
                load();
              }}
            />
          )}

        {editing !== undefined &&
          section !==
          'inquiries' &&
          section !==
          'clients' && (
            <Editor
              section={section}
              row={editing}
              onClose={() =>
                setEditing(
                  undefined
                )
              }
              onDone={() => {
                setEditing(
                  undefined
                );
                load();
              }}
            />
          )}

        {editing === null &&
          section ===
          'clients' && (
            <Editor
              section={section}
              row={null}
              onClose={() =>
                setEditing(
                  undefined
                )
              }
              onDone={() => {
                setEditing(
                  undefined
                );
                load();
              }}
            />
          )}
      </main>
    </div>
  );
}

/* =========================================================
   DASHBOARD
   ========================================================= */

function DashboardView({
  dashboard,
  counts,
  openInquiries,
  openProjects,
  onStatus,
}: {
  dashboard: Row;
  counts: Row;
  openInquiries: () => void;
  openProjects: () => void;
  onStatus: (
    r: Row,
    s: string
  ) => void;
}) {
  const monthly: Row[] =
    dashboard.monthly || [];

  const max = Math.max(
    1,
    ...monthly.map(
      m => m.count || 0
    )
  );

  const stats: [
    string,
    number,
    string
  ][] = [
      [
        'Inquiries',
        counts.inquiries || 0,
        'mail',
      ],
      [
        'New leads',
        counts.newLeads || 0,
        'spark',
      ],
      [
        'All projects',
        counts.projects || 0,
        'folder',
      ],
      [
        'Ongoing',
        counts.ongoingProjects ||
        0,
        'refresh',
      ],
      [
        'Completed',
        counts.completedProjects ||
        0,
        'check',
      ],
      [
        'Services',
        counts.services || 0,
        'layers',
      ],
      [
        'Pending reviews',
        counts.pendingReviews ||
        0,
        'star',
      ],
    ];

  return (
    <>
      <section className="welcome">
        <div>
          <p className="eyebrow">
            STUDIO OVERVIEW
          </p>

          <h2>
            Good to see you.
          </h2>

          <p>
            Here is what is
            happening across
            DevForge today.
          </p>
        </div>

        <button
          className="primary"
          onClick={
            openInquiries
          }
        >
          View new leads →
        </button>
      </section>

      <div className="stat-grid">
        {stats.map(
          ([label, value, icon]) => (
            <div
              className={`stat stat-${icon}`}
              key={label}
            >
              <span className="stat-icon" aria-hidden="true">
                <NavIcon name={icon} />
              </span>

              <div className="stat-copy">
                <strong>{value}</strong>
                <small>{label}</small>
              </div>
            </div>
          )
        )}
      </div>

      <div className="dashboard-grid">
        <section className="panel chart-panel">
          <div className="panel-head">
            <div>
              <p className="eyebrow">
                LAST 6 MONTHS
              </p>

              <h2>
                Monthly inquiries
              </h2>
            </div>

            <strong>
              {counts.inquiries ||
                0}{' '}
              total
            </strong>
          </div>

          <div className="bar-chart">
            {monthly.map(m => (
              <div
                className="bar-item"
                key={m.key}
              >
                <span>
                  {m.count}
                </span>

                <div className="bar-track">
                  <i
                    style={{
                      height: m.count
                        ? `${Math.max(
                          5,
                          (m.count /
                            max) *
                          100
                        )}%`
                        : '0%',
                      minHeight: m.count
                        ? '5px'
                        : '0',
                    }}
                  />
                </div>

                <small>
                  {m.label}
                </small>
              </div>
            ))}
          </div>
        </section>

        <section className="panel progress-panel">
          <div className="panel-head">
            <h2>
              Project progress
            </h2>
          </div>

          {counts.projects ? (
            <div className="progress-content">
              <Progress
                label="Ongoing"
                value={
                  counts.ongoingProjects ||
                  0
                }
                total={
                  counts.projects ||
                  0
                }
              />

              <Progress
                label="Completed"
                value={
                  counts.completedProjects ||
                  0
                }
                total={
                  counts.projects ||
                  0
                }
              />

              <Progress
                label="Other"
                value={Math.max(
                  0,
                  (counts.projects ||
                    0) -
                  (counts.ongoingProjects ||
                    0) -
                  (counts.completedProjects ||
                    0)
                )}
                total={
                  counts.projects ||
                  0
                }
              />
            </div>
          ) : (
            <div
              style={{
                minHeight:
                  '190px',
                display: 'grid',
                placeItems:
                  'center',
                padding:
                  '28px',
                textAlign:
                  'center',
              }}
            >
              <div>
                <div
                  style={{
                    fontSize:
                      '30px',
                    color:
                      '#a8ff38',
                    marginBottom:
                      '10px',
                  }}
                >
                  <NavIcon name="folder" />
                </div>

                <strong
                  style={{
                    display:
                      'block',
                    marginBottom:
                      '6px',
                  }}
                >
                  No projects
                  added yet
                </strong>

                <small
                  style={{
                    display:
                      'block',
                    color:
                      '#8d9b96',
                    marginBottom:
                      '16px',
                  }}
                >
                  Create your
                  first project
                  to track its
                  progress.
                </small>

                <button
                  className="primary"
                  onClick={
                    openProjects
                  }
                >
                  + Add project
                </button>
              </div>
            </div>
          )}
        </section>
      </div>

      <section className="panel">
        <div className="panel-head">
          <h2>
            Recent inquiries
          </h2>

          <button
            onClick={
              openInquiries
            }
          >
            View all
          </button>
        </div>

        <Table
          section="inquiries"
          rows={
            dashboard.recent ||
            []
          }
          onEdit={() => { }}
          onDelete={() => { }}
          onStatus={
            onStatus
          }
        />
      </section>
    </>
  );
}

/* =========================================================
   PROGRESS
   ========================================================= */

function Progress({
  label,
  value,
  total,
}: {
  label: string;
  value: number;
  total: number;
}) {
  const percent = total
    ? Math.round(
      (value / total) * 100
    )
    : 0;

  return (
    <div className="progress-row">
      <div>
        <span>{label}</span>

        <b>
          {value}{' '}
          <small>
            ({percent}%)
          </small>
        </b>
      </div>

      <div className="progress-track">
        <i
          style={{
            width: `${percent}%`,
          }}
        />
      </div>
    </div>
  );
}

/* =========================================================
   TABLE
   ========================================================= */

function Table({
  section,
  rows,
  onEdit,
  onDelete,
  onStatus,
}: {
  section: string;
  rows: Row[];
  onEdit: (r: Row) => void;
  onDelete: (r: Row) => void;
  onStatus: (
    r: Row,
    s: string
  ) => void;
}) {
  if (!rows.length) {
    return (
      <div className="empty">
        No records found.
      </div>
    );
  }

  if (section === 'activity') {
    return (
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Date & time</th>
              <th>Admin</th>
              <th>Action</th>
              <th>Resource</th>
              <th>IP address</th>
              <th>Changes</th>
            </tr>
          </thead>

          <tbody>
            {rows.map(r => (
              <tr key={r._id}>
                <td>
                  {r.createdAt
                    ? new Date(
                      r.createdAt
                    ).toLocaleString()
                    : '—'}
                </td>

                <td>
                  {r.adminName ||
                    'Admin'}
                  <br />
                  <small>
                    {r.adminEmail ||
                      '—'}
                  </small>
                </td>

                <td>
                  <span className="badge active">
                    {r.action ||
                      '—'}
                  </span>
                </td>

                <td>
                  {r.resource ||
                    '—'}
                </td>

                <td>
                  {r.ip || '—'}
                </td>

                <td>
                  {Array.isArray(
                    r.details
                      ?.changedFields
                  ) &&
                    r.details.changedFields
                      .length
                    ? r.details.changedFields.join(
                      ', '
                    )
                    : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  const cells = (
    r: Row
  ) =>
    section ===
      'inquiries'
      ? [
        r.projectId,
        r.name,
        r.email,
        r.service,
        r.createdAt
          ? new Date(
            r.createdAt
          ).toLocaleDateString(
            'en-IN',
            {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            }
          )
          : '—',
      ]
      : section ===
        'services'
        ? [
          r.order ?? 0,
          r.title,
          r.slug,
          r.description,
        ]
        : section ===
          'projects'
          ? [
    r.order ?? 0,
    r.title,
    r.client,
    r.category,
  ]
          : section ===
            'reviews'
            ? [
              r.clientName,
              r.company,
              `${r.rating || 0}/5`,
            ]
            : section ===
              'admins'
              ? [
                r.name,
                r.email,
                r.phone,
                r.lastLogin
                  ? new Date(
                    r.lastLogin
                  ).toLocaleString()
                  : 'Never',
              ]
              : [
                r.name,
                r.email,
                r.company,
              ];

  const headers =
    section === 'inquiries'
      ? [
        'ID',
        'Name',
        'Email',
        'Service',
        'Date',
      ]
      : section ===
        'services'
        ? [
          'Order',
          'Title',
          'Slug',
          'Description',
        ]
        : section ===
          'projects'
          ? [
    'Order',
    'Project',
    'Client',
    'Category',
  ]
          : section ===
            'reviews'
            ? [
              'Client',
              'Company',
              'Rating',
            ]
            : section ===
              'admins'
              ? [
                'Name',
                'Email',
                'Phone',
                'Last login',
              ]
              : [
                'Name',
                'Email',
                'Company',
              ];

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {headers.map(h => (
              <th key={h}>
                {h}
              </th>
            ))}

            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {rows.map(r => (
            <tr key={r._id}>
              {cells(r).map(
                (c, i) => (
                  <td key={i}>
                    {String(
                      c || '—'
                    ).slice(
                      0,
                      60
                    )}
                  </td>
                )
              )}

              <td>
                {section ===
                  'inquiries' ? (
                  <select
                    className={`badge ${r.status}`}
                    value={
                      r.status
                    }
                    onChange={e =>
                      onStatus(
                        r,
                        e.target
                          .value
                      )
                    }
                  >
                    <option value="new">
                      New
                    </option>
                    <option value="contacted">
                      Contacted
                    </option>
                    <option value="in-progress">
                      In progress
                    </option>
                    <option value="closed">
                      Closed
                    </option>
                  </select>
                ) : section ===
                  'reviews' ? (
                  <select
                    className={`badge ${r.status}`}
                    value={
                      r.status
                    }
                    onChange={e =>
                      onStatus(
                        r,
                        e.target
                          .value
                      )
                    }
                  >
                    <option>
                      pending
                    </option>
                    <option>
                      approved
                    </option>
                    <option>
                      rejected
                    </option>
                  </select>
                ) : section ===
                  'admins' ? (
                  <span
                    className={`badge ${r.role ===
                      'super-admin'
                      ? 'active'
                      : ''
                      }`}
                  >
                    {r.role ===
                      'super-admin'
                      ? 'Super Admin'
                      : 'Admin'}
                  </span>
                ) : (
                  <span
                    className={`badge ${r.status
                      ? String(r.status).toLowerCase().replace(/\s+/g, '-')
                      : r.isActive
                        ? 'active'
                        : 'hidden'
                      }`}
                  >
                    {r.status ||
                      (r.isActive
                        ? 'Active'
                        : 'Hidden')}
                  </span>
                )}
              </td>

              <td>
                <div className="row-actions">
                  <button
                    onClick={() =>
                      onEdit(r)
                    }
                  >
                    {section ===
                      'inquiries' ||
                      section ===
                      'clients'
                      ? 'View'
                      : 'Edit'}
                  </button>

                  <button
                    className="danger"
                    onClick={() =>
                      onDelete(r)
                    }
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* =========================================================
   SETTINGS
   ========================================================= */

function Settings() {
  const [form, setForm] =
    useState<Row>({
      socialLinks: {},
    });

  const [saved, setSaved] =
    useState(false);

  useEffect(() => {
    adminFetch<any>(
      '/admin/settings'
    ).then(r =>
      setForm(r.data)
    );
  }, []);

  const save = async (
    e: FormEvent
  ) => {
    e.preventDefault();

    await adminFetch(
      '/admin/settings',
      {
        method: 'PUT',
        body: JSON.stringify(
          form
        ),
      }
    );

    setSaved(true);

    setTimeout(
      () => setSaved(false),
      2000
    );
  };

  return (
    <section className="panel form-panel">
      <p className="eyebrow">
        LIVE WEBSITE CONTENT
      </p>

      <h2>
        Website settings
      </h2>

      <form
        className="settings-form"
        onSubmit={save}
      >
        {[
          ['heroTitle', 'Hero title'],
          [
            'heroSubtitle',
            'Hero subtitle',
          ],
          ['aboutTitle', 'About title'],
          ['aboutText', 'About text'],
          ['email', 'Business email'],
          ['phone', 'Phone'],
          ['address', 'Address'],
          ['logo', 'Logo URL'],
          [
            'backgroundVideo',
            'Background video URL',
          ],
        ].map(([k, l]) => (
          <label key={k}>
            {l}

            {k.includes('Text') ? (
              <textarea
                value={form[k] || ''}
                onChange={e =>
                  setForm({
                    ...form,
                    [k]: e.target
                      .value,
                  })
                }
              />
            ) : (
              <input
                value={form[k] || ''}
                onChange={e =>
                  setForm({
                    ...form,
                    [k]: e.target
                      .value,
                  })
                }
              />
            )}
          </label>
        ))}

        <h3>
          Social links
        </h3>

        {[
          'instagram',
          'linkedin',
          'github',
          'youtube',
        ].map(k => (
          <label key={k}>
            {k[0].toUpperCase() +
              k.slice(1)}

            <input
              value={
                form.socialLinks
                ?.[k] || ''
              }
              onChange={e =>
                setForm({
                  ...form,
                  socialLinks: {
                    ...form.socialLinks,
                    [k]: e.target
                      .value,
                  },
                })
              }
            />
          </label>
        ))}

        <button className="primary">
          {saved
            ? 'Saved ✓'
            : 'Save website settings'}
        </button>
      </form>
    </section>
  );
}

/* =========================================================
   PROFILE
   ========================================================= */

function Profile({
  logout,
}: {
  logout: () => void;
}) {
  const [form, setForm] =
    useState<Row>({});

  const [message, setMessage] =
    useState('');

  useEffect(() => {
    adminFetch<any>(
      '/auth/me'
    ).then(r =>
      setForm(r.admin)
    );
  }, []);

  const save = async (
    e: FormEvent
  ) => {
    e.preventDefault();

    try {
      await adminFetch(
        '/admin/profile',
        {
          method: 'PUT',
          body: JSON.stringify(
            form
          ),
        }
      );

      setMessage(
        'Profile updated successfully.'
      );
    } catch (x: any) {
      setMessage(x.message);
    }
  };

  return (
    <section className="panel form-panel">
      <p className="eyebrow">
        ACCOUNT & SECURITY
      </p>

      <h2>
        Admin profile
      </h2>

      <form
        className="settings-form"
        onSubmit={save}
      >
        <label>
          Name
          <input
            value={form.name || ''}
            onChange={e =>
              setForm({
                ...form,
                name: e.target
                  .value,
              })
            }
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value={
              form.email || ''
            }
            onChange={e =>
              setForm({
                ...form,
                email: e.target
                  .value,
              })
            }
          />
        </label>

        <label>
          Phone
          <input
            value={
              form.phone || ''
            }
            onChange={e =>
              setForm({
                ...form,
                phone: e.target
                  .value,
              })
            }
          />
        </label>

        <h3>
          Change password
        </h3>

        <label>
          Current password
          <input
            type="password"
            value={
              form.currentPassword ||
              ''
            }
            onChange={e =>
              setForm({
                ...form,
                currentPassword:
                  e.target
                    .value,
              })
            }
          />
        </label>

        <label>
          New password
          <input
            type="password"
            minLength={8}
            value={
              form.newPassword ||
              ''
            }
            onChange={e =>
              setForm({
                ...form,
                newPassword:
                  e.target
                    .value,
              })
            }
          />
        </label>

        {message && (
          <div className="notice">
            {message}
          </div>
        )}

        <div className="actions">
          <button className="primary">
            Update profile
          </button>

          <button
            type="button"
            className="secondary"
            onClick={logout}
          >
            Sign out
          </button>
        </div>
      </form>
    </section>
  );
}
