import React, { useEffect, useMemo, useState } from 'react';
import { Calendar, ArrowRight, ArrowLeft, Clock, Share2 } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import type { BlogPost } from '../types';

type PayloadPost = {
  id?: string;
  slug?: string;
  title?: string;
  excerpt?: string;
  publishedAt?: string;
  category?: string;
  coverImage?: string;
  coverImageMedia?: {
    url?: string;
  } | null;
  readingTime?: string;
  content?: { paragraph?: string }[];
};

const toAbsoluteUrl = (url: string, apiUrl: string): string => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${apiUrl.replace(/\/+$/, '')}${url.startsWith('/') ? '' : '/'}${url}`;
};

const normalizePayloadPost = (post: PayloadPost, apiUrl: string): BlogPost => {
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

  const mediaUrl = post.coverImageMedia?.url ? toAbsoluteUrl(post.coverImageMedia.url, apiUrl) : '';
  const fallbackUrl = post.coverImage ? toAbsoluteUrl(post.coverImage, apiUrl) : '';

  return {
    id: post.slug || post.id || Math.random().toString(36).slice(2),
    title: post.title || '',
    excerpt: post.excerpt || '',
    date,
    category: post.category || 'Genel',
    image: mediaUrl || fallbackUrl,
    content: (post.content || []).map((item) => item.paragraph || '').filter(Boolean),
  };
};

export const BlogClient: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = import.meta.env.PUBLIC_PAYLOAD_API_URL;
    if (!apiUrl) {
      setLoading(false);
      return;
    }

    const fetchPosts = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/posts?depth=1&limit=100&sort=-publishedAt&where[status][equals]=published`);
        if (!response.ok) throw new Error('Blog verisi alınamadı');
        const json = await response.json();
        const docs = (json?.docs || []) as PayloadPost[];
        setPosts(docs.map((doc) => normalizePayloadPost(doc, apiUrl)));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const otherPosts = useMemo(() => posts.filter((p) => p.id !== selectedPost?.id), [posts, selectedPost]);

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedPost(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (selectedPost) {
    return (
      <div className="bg-white min-h-screen animate-fade-in pb-20">
        <div className="relative h-[40vh] md:h-[50vh] w-full">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
          <img src={selectedPost.image} alt={selectedPost.title} loading="eager" fetchPriority="high" decoding="async" className="w-full h-full object-cover" />
          <div className="absolute top-6 left-6 z-20">
            <button onClick={handleBack} className="bg-white/90 hover:bg-white text-emerald-950 px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium transition-colors shadow-lg">
              <ArrowLeft size={16} />
              Blog'a Dön
            </button>
          </div>
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-20 text-white">
            <div className="container mx-auto">
              <span className="bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider mb-3 inline-block">{selectedPost.category}</span>
              <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-tight mb-4">{selectedPost.title}</h1>
              <div className="flex items-center gap-6 text-sm md:text-base text-white/80">
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  {selectedPost.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} />
                  3 dk okuma süresi
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3">
              <div className="prose prose-lg prose-stone max-w-none">
                <p className="lead text-xl text-stone-600 font-serif italic mb-8 border-l-4 border-amber-500 pl-4">{selectedPost.excerpt}</p>
                {selectedPost.content.map((paragraph, idx) => (
                  <div key={idx} className="mb-6 text-stone-700 leading-relaxed">
                    {paragraph.split('**').map((part, i) =>
                      i % 2 === 1 ? (
                        <strong key={i} className="text-emerald-950 font-serif">
                          {part}
                        </strong>
                      ) : (
                        part
                      ),
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2 text-stone-500">
                  <Share2 size={20} />
                  <span className="text-sm">Bu yazıyı paylaşın</span>
                </div>
                <a
                  href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=Merhaba, "${selectedPost.title}" yazınızı okudum, konuyla ilgili bilgi almak istiyorum.`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-950 text-white px-8 py-3 rounded-sm font-medium hover:bg-emerald-900 transition-colors w-full md:w-auto text-center"
                >
                  Uzmanımıza Danışın
                </a>
              </div>
            </div>

            <div className="lg:w-1/3">
              <div className="bg-stone-50 p-6 rounded-sm border border-stone-100 sticky top-24">
                <h3 className="font-serif text-xl text-emerald-950 mb-6 pb-2 border-b border-stone-200">Diğer Yazılar</h3>
                <div className="flex flex-col gap-6">
                  {otherPosts.map((post) => (
                    <div key={post.id} onClick={() => handlePostClick(post)} className="group cursor-pointer flex gap-4 items-start">
                      <img src={post.image} alt={post.title} loading="lazy" decoding="async" className="w-20 h-20 object-cover rounded-sm group-hover:opacity-80 transition-opacity" />
                      <div>
                        <h4 className="font-serif text-sm font-bold text-emerald-950 group-hover:text-amber-700 transition-colors line-clamp-2 mb-1">{post.title}</h4>
                        <span className="text-xs text-stone-400">{post.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 min-h-screen animate-fade-in pb-20">
      <div className="bg-emerald-950 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="text-amber-500 font-bold tracking-[0.2em] uppercase text-xs mb-3 block">Gürkaya Blog</span>
          <h1 className="font-serif text-5xl md:text-6xl mb-4">Taşın Dünyası</h1>
          <p className="text-emerald-100/60 font-light max-w-lg mx-auto text-lg">Mermer bakımı, dekorasyon trendleri ve teknik bilgiler.</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16 -mt-10 relative z-20">
        {loading && <div className="text-center text-stone-500 mb-8">Blog yazıları yükleniyor...</div>}
        {!loading && posts.length === 0 && <div className="text-center text-stone-500 mb-8">Henüz blog yazısı yok.</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-sm shadow-lg overflow-hidden group cursor-pointer flex flex-col h-full border border-transparent hover:border-amber-200 transition-all duration-300"
              onClick={() => handlePostClick(post)}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={post.image} alt={post.title} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-950">{post.category}</div>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-stone-400 text-xs mb-4">
                  <Calendar size={14} />
                  {post.date}
                </div>

                <h3 className="font-serif text-xl text-emerald-950 mb-3 group-hover:text-amber-700 transition-colors">{post.title}</h3>

                <p className="text-stone-500 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">{post.excerpt}</p>

                <div className="flex items-center text-emerald-900 font-bold text-sm gap-2 group-hover:gap-3 transition-all">
                  Devamını Oku <ArrowRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
