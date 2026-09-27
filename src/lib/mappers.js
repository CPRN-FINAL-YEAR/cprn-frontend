import { API_URL } from "./api";

function formatUrl(url) {
  if (!url) return null;
  if (url.startsWith('/')) return `${API_URL}${url}`;
  return url;
}

export function mapProblem(p) {
  if (!p) return null;
  return {
    ...p,
    type: p.project_type || 'Unknown',
    date: p.created_at ? new Date(p.created_at).toLocaleDateString() : 'Just now',
    image: formatUrl(p.image_url),
    document: formatUrl(p.document_url),
    author: {
      ...p.author,
      name: p.author?.name || p.author?.full_name || 'Anonymous',
      role: p.author?.role || 'User',
      avatar_url: formatUrl(p.author?.avatar_url),
    },
    stats: {
      views: p.stats?.views || 0,
      likes: p.stats?.likes || 0,
      comments: p.stats?.comments || 0,
    }
  };
}
