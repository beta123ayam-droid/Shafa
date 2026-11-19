'use client';

import { useCallback, useEffect, useState } from 'react';

const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_BYTES = 25 * 1024 * 1024;

// Nama file: <timestamp>_<acak>__<keterangan>.<ext>
function parsePhoto(p) {
  const m = p.name.match(/^(\d+)_[a-z0-9]+__(.*)\.[^.]+$/);
  const ts = m ? Number(m[1]) : new Date(p.createdAt).getTime();
  return {
    key: p.id,
    url: p.thumb,
    full: p.full,
    caption: m ? m[2].replace(/_/g, ' ') : '',
    tilt: ((ts % 9) - 4) * 0.9, // kemiringan tetap per foto
    date: new Date(ts).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
  };
}

export default function Home() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState([]);
  const [fileKey, setFileKey] = useState(0);
  const [caption, setCaption] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const [selected, setSelected] = useState(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/photos', { cache: 'no-store' });
      if (res.status === 401) {
        window.location.href = '/login';
        return;
      }
      const data = await res.json();
      setPhotos((data.photos || []).map(parsePhoto));
    } catch {
      setMsg('Gagal memuat foto. Coba muat ulang halaman.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setSelected(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  async function onUpload(e) {
    e.preventDefault();
    if (!files.length) return setMsg('Pilih foto dulu.');
    setBusy(true);
    setMsg('');
    try {
      for (const file of files) {
        if (!ALLOWED.includes(file.type)) {
          throw new Error(`${file.name}: format harus JPG, PNG, WebP, atau GIF.`);
        }
        if (file.size > MAX_BYTES) {
          throw new Error(`${file.name}: ukuran melebihi 25 MB.`);
        }
        const r = await fetch('/api/upload-auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contentType: file.type, caption }),
        });
        if (r.status === 401) {
          window.location.href = '/login';
          return;
        }
        const data = await r.json();
        if (!r.ok) throw new Error(data.error || 'Gagal menyiapkan upload.');

        const form = new FormData();
        form.append('file', file);
        form.append('fileName', data.fileName);
        form.append('publicKey', data.publicKey);
        form.append('signature', data.signature);
        form.append('expire', String(data.expire));
        form.append('token', data.token);
        form.append('folder', '/galeri');
        form.append('useUniqueFileName', 'false');
        const up = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
          method: 'POST',
          body: form,
        });
        if (!up.ok) {
          const err = await up.json().catch(() => ({}));
          throw new Error(err.message || 'Upload ke ImageKit gagal.');
        }
      }
      setFiles([]);
      setFileKey((k) => k + 1);
      setCaption('');
      setMsg('Foto tersimpan.');
      await load();
    } catch (err) {
      setMsg(err.message || 'Upload gagal.');
    } finally {
      setBusy(false);
    }
  }

  async function onDelete(photo) {
    if (!confirm('Hapus foto ini?')) return;
    const res = await fetch('/api/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: photo.key }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return setMsg(data.error || 'Gagal menghapus.');
    }
    setSelected(null);
    setMsg('Foto dihapus.');
    await load();
  }

  async function onLogout() {
    await fetch('/api/logout', { method: 'POST' });
    window.location.href = '/login';
  }

  return (
    <main className="page">
      <header className="top">
        <div>
          <h1>Galeri Foto</h1>
          <p>{loading ? 'Memuat…' : `${photos.length} foto`}</p>
        </div>
        <button className="logout" onClick={onLogout}>
          Keluar
        </button>
      </header>

      <details className="panel">
        <summary>Tambah foto</summary>
        <form onSubmit={onUpload}>
          <label>
            Foto
            <input
              key={fileKey}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              multiple
              onChange={(e) => setFiles(Array.from(e.target.files || []))}
            />
          </label>
          <label>
            Keterangan (opsional)
            <input
              type="text"
              maxLength={40}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Contoh: Sore di bendungan"
            />
          </label>
          <button type="submit" disabled={busy}>
            {busy ? 'Mengunggah…' : 'Unggah foto'}
          </button>
        </form>
      </details>

      {msg && <p className="msg" role="status">{msg}</p>}

      {!loading && photos.length === 0 && (
        <p className="empty">Belum ada foto. Buka "Tambah foto" untuk mengunggah yang pertama.</p>
      )}

      <section className="wall">
        {photos.map((p) => (
          <button
            key={p.key}
            className="polaroid"
            style={{ '--tilt': `${p.tilt}deg` }}
            onClick={() => setSelected(p)}
            aria-label={`Buka foto ${p.caption || p.date}`}
          >
            <img src={p.url} alt={p.caption || 'Foto'} loading="lazy" />
            <span className="cap">{p.caption || p.date}</span>
            {p.caption && <span className="date">{p.date}</span>}
          </button>
        ))}
      </section>

      {selected && (
        <div className="lightbox" onClick={() => setSelected(null)}>
          <div className="big" onClick={(e) => e.stopPropagation()}>
            <img src={selected.full || selected.url} alt={selected.caption || 'Foto'} />
            <p className="cap">{selected.caption || selected.date}</p>
            {selected.caption && <p className="date">{selected.date}</p>}
            <div className="actions">
              <button onClick={() => setSelected(null)}>Tutup</button>
              <button className="danger" onClick={() => onDelete(selected)}>
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
