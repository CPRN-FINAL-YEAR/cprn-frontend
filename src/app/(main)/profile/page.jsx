'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api';
import {
  User, Mail, Shield, Calendar, Edit3, Check, X,
  Camera, Briefcase, Building2, AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b last:border-0">
      <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground shrink-0">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground font-medium mb-0.5">{label}</p>
        <p className="text-sm font-medium truncate">{value || '—'}</p>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const { user, loading, refreshUser } = useAuth();
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({ name: '', org_name: '' });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    if (!loading && !user) router.push('/auth/login');
    if (user) setForm({ name: user.name || '', org_name: user.org_name || '' });
  }, [user, loading]);

  const handleAvatarChange = (e) => {
    const f = e.target.files?.[0];
    if (f && f.type.startsWith('image/')) {
      setAvatarFile(f);
      const reader = new FileReader();
      reader.onload = (ev) => setAvatarPreview(ev.target.result);
      reader.readAsDataURL(f);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      let finalAvatarUrl = user.avatar_url;

      if (avatarFile) {
        const fd = new FormData();
        fd.append("file", avatarFile);
        const uploadRes = await fetchApi("/api/upload", { method: "POST", body: fd });
        finalAvatarUrl = uploadRes.url;
      }

      await fetchApi('/api/users/me', {
        method: 'PUT',
        body: JSON.stringify({ ...form, avatar_url: finalAvatarUrl }),
      });
      
      await refreshUser();
      setSuccess('Profile updated!');
      setEditing(false);
      setAvatarFile(null);
      setAvatarPreview(null);
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) return null;

  const initials = user.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  const joinedDate = new Date(user.created_at).toLocaleDateString('en-US', {
    month: 'long', year: 'numeric'
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header card */}
      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="relative group">
              {avatarPreview || user.avatar_url ? (
                <img
                  src={avatarPreview || (user.avatar_url?.startsWith('http') ? user.avatar_url : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}${user.avatar_url}`)}
                  alt={user.name}
                  className="h-20 w-20 rounded-full object-cover ring-4 ring-primary/10"
                />
              ) : (
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center text-primary-foreground text-2xl font-bold ring-4 ring-primary/10">
                  {initials}
                </div>
              )}
              {editing && (
                <label className="absolute inset-0 flex items-center justify-center bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera className="h-6 w-6" />
                  <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} disabled={saving} />
                </label>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground text-sm">{user.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary capitalize">
                  {user.poster_type}
                </span>
                {user.is_email_verified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                    <Check className="h-3 w-3" /> Verified
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {editing ? (
              <>
                <Button size="sm" onClick={handleSave} disabled={saving}>
                  <Check className="h-4 w-4 mr-1" />
                  {saving ? 'Saving...' : 'Save'}
                </Button>
                <Button size="sm" variant="ghost" onClick={() => { setEditing(false); setError(''); }}>
                  <X className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Button size="sm" variant="outline" onClick={() => setEditing(true)}>
                <Edit3 className="h-4 w-4 mr-1" />
                Edit
              </Button>
            )}
          </div>
        </div>

        {/* Error/Success messages */}
        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}
        {success && (
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-400">
            <Check className="h-4 w-4 shrink-0" />
            {success}
          </div>
        )}
      </div>

      {/* Edit Form / Info */}
      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        <h2 className="text-base font-semibold mb-4">Profile Information</h2>
        {editing ? (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Full Name</label>
              <Input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Your full name"
              />
            </div>
            {user.poster_type === 'organization' && (
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Organisation Name</label>
                <Input
                  value={form.org_name}
                  onChange={(e) => setForm((f) => ({ ...f, org_name: e.target.value }))}
                  placeholder="Organisation name"
                />
              </div>
            )}
          </div>
        ) : (
          <div>
            <InfoRow icon={User} label="Full Name" value={user.name} />
            <InfoRow icon={Mail} label="Email Address" value={user.email} />
            <InfoRow icon={Briefcase} label="Account Type" value={user.poster_type === 'individual' ? 'Individual' : 'Organisation'} />
            {user.org_name && <InfoRow icon={Building2} label="Organisation" value={user.org_name} />}
            <InfoRow icon={Shield} label="Auth Provider" value={user.auth_provider || 'local'} />
            <InfoRow icon={Calendar} label="Member Since" value={joinedDate} />
          </div>
        )}
      </div>

      {/* Security */}
      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        <h2 className="text-base font-semibold mb-1">Security</h2>
        <p className="text-sm text-muted-foreground mb-4">Manage your password and account security.</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/profile/settings">
            <Button variant="outline" className="w-full sm:w-auto">
              Change Password
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
