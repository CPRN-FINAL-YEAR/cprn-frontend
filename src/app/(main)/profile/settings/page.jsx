'use client';

import { useState } from 'react';
import { Suspense } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { fetchApi } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { ArrowLeft, LockKeyhole, Check, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Input } from '@/components/ui/input';

function PasswordStrength({ password }) {
  if (!password) return null;
  const checks = [
    { label: 'At least 8 characters', ok: password.length >= 8 },
    { label: 'Uppercase letter', ok: /[A-Z]/.test(password) },
    { label: 'Number', ok: /\d/.test(password) },
  ];
  const score = checks.filter((c) => c.ok).length;
  const colors = ['bg-destructive', 'bg-yellow-400', 'bg-emerald-500'];
  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${i < score ? colors[score - 1] : 'bg-muted'}`}
          />
        ))}
      </div>
      <ul className="space-y-0.5">
        {checks.map((c) => (
          <li key={c.label} className={`text-xs flex items-center gap-1.5 ${c.ok ? 'text-emerald-600' : 'text-muted-foreground'}`}>
            <Check className={`h-3 w-3 ${c.ok ? 'opacity-100' : 'opacity-30'}`} />
            {c.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SettingsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const formData = new FormData(e.target);
    const current_password = formData.get('current_password');
    const new_password = formData.get('new_password');
    const confirm_password = formData.get('confirm_password');

    if (new_password !== confirm_password) {
      setError('New passwords do not match');
      return;
    }
    if (new_password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    try {
      await fetchApi('/api/users/me/change-password', {
        method: 'POST',
        body: JSON.stringify({ current_password, new_password }),
      });
      setSuccess('Password changed successfully!');
      e.target.reset();
      setNewPassword('');
    } catch (err) {
      setError(err.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

    return (
    <Suspense fallback={<div>Loading settings...</div>}>
      <div className="space-y-6 pb-12">
        <div className="flex items-center gap-3">
          <Link href="/profile">
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold">Account Settings</h1>
            <p className="text-sm text-muted-foreground">Manage your security preferences</p>
          </div>
        </div>

        {/* Change Password */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <LockKeyhole className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold">Change Password</h2>
              <p className="text-sm text-muted-foreground">
                {user?.auth_provider === 'google'
                  ? 'Your account uses Google sign-in. Use Forgot Password to set a local password.'
                  : 'Update your account password.'}
              </p>
            </div>
          </div>

          {user?.auth_provider === 'google' ? (
            <Link href="/auth/forgot-password">
              <Button variant="outline">Set a password via email</Button>
            </Link>
          ) : (
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Current Password</label>
                <div className="relative">
                  <Input
                    name="current_password"
                    type={showCurrent ? 'text' : 'password'}
                    placeholder="Your current password"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
                  >
                    {showCurrent ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">New Password</label>
                <div className="relative">
                  <Input
                    name="new_password"
                    type={showNew ? 'text' : 'password'}
                    placeholder="New password"
                    required
                    disabled={loading}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
                  >
                    {showNew ? 'Hide' : 'Show'}
                  </button>
                </div>
                <PasswordStrength password={newPassword} />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Confirm New Password</label>
                <div className="relative">
                  <Input
                    name="confirm_password"
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="Confirm new password"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
                  >
                    {showConfirm ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {error}
                </div>
              )}
              {success && (
                <div className="flex items-center gap-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-400">
                  <Check className="h-4 w-4 shrink-0" />
                  {success}
                </div>
              )}

              <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                {loading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Changing...</> : 'Update Password'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </Suspense>
    );
  }
