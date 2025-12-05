import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { BlogPost, AdSize } from '../types';
import AdUnit from './AdUnit';
import { ArrowLeft, Share2, Bookmark, CheckCircle2, TrendingUp, Twitter, Facebook, Link as LinkIcon, List, Pencil } from 'lucide-react';

interface ArticleViewProps {
  post: BlogPost;
  allPosts: BlogPost[];
  onBack: () => void;
  onPostClick: (id: string) => void;
  isAdmin?: boolean;
  onEdit?: (post: BlogPost) => void;
}

const ArticleView: React.FC<ArticleViewProps> = ({ post, allPosts, onBack, onPostClick, isAdmin = false, onEdit }) => {
  const [showCopied, setShowCopied] = useState(false);
  const [toc, setToc] = useState<{id: string, text: string, level: number}[]>([]);

  useEffect(() => {
    // Generate Table of Contents from Markdown
    const lines = post.content.split('\n');
    const headers = lines
      .filter(line => line.startsWith('#'))
      .map((line, index) => {
        const level = line.match(/^#+/)?.[0].length || 0;
        const text = line.replace(/^#+\s/, '');
        const id = `header-${index}`;
        return { id, text, level };
      });
    setToc(headers);

    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, [post.content]);

  const handleShare = async () => {
    const shareData = {
      title: post.title,
      text: post.excerpt,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.debug('Share canceled', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
      } catch (err) {
        console.error('Clipboard failed', err);
      }
    }
  };

  const relatedPosts = allPosts
    .filter(p => p.id !== post.id)
    .sort((a, b) => (b.category === post.category ? 1 : 0) - (a.category === post.category ? 1 : 0))
    .slice(0, 3);

  // Get trending posts (simulated by taking the first 4 distinct posts)
  const trendingPosts = allPosts
    .filter(p => p.id !== post.id)
    .slice(0, 4);

  // JSON-LD Schema for SEO
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": post.title,
    "image": [post.imageUrl],
    "datePublished": new Date().toISOString(), // In real app, use post.date parsed
    "dateModified": new Date().toISOString(),
    "author": [{
        "@type": "Person",
        "name": post.author,
        "url": window.location.href
    }]
  };

  return (
    <div className="animate-fade-in-up">
      {/* Inject Schema */}
      <script type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </script>

      {/* Sticky Progress/Nav Bar */}
      <div className="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-300">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-bold text-sm group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden md:inline">Back to Feed</span>
          </button>
          
          <div className="flex-1 mx-4 md:mx-12 hidden md:block">
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate text-center opacity-80">{post.title}</h4>
          </div>

          <div className="flex space-x-2 items-center">
            {/* ADMIN EDIT BUTTON */}
            {isAdmin && onEdit && (
              <button 
                onClick={() => onEdit(post)}
                className="flex items-center space-x-1 bg-yellow-400/10 hover:bg-yellow-400/20 text-yellow-600 dark:text-yellow-400 border border-yellow-400/20 px-3 py-1.5 rounded-full text-xs font-bold uppercase mr-2 transition-colors"
              >
                <Pencil className="w-3 h-3" />
                <span className="hidden sm:inline">Edit Article</span>
              </button>
            )}

            <button 
              onClick={handleShare}
              className={`p-2 rounded-full transition-all ${showCopied ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' : 'hover:bg-blue-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400'}`}
              title="Share"
            >
              {showCopied ? <CheckCircle2 className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
            </button>
            <button className="p-2 rounded-full hover:bg-blue-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all">
              <Bookmark className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Content */}
          <main className="lg:w-[68%]">
            
            {/* Header Section */}
            <header className="mb-10 text-center md:text-left">
              <div className="inline-flex items-center space-x-2 mb-6">
                <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                  {post.category}
                </span>
                <span className="text-slate-400 text-xs font-semibold">•</span>
                <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold">{post.readTime}</span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] mb-8 tracking-tight">
                {post.title}
              </h1>

              <div className="flex flex-col md:flex-row items-center md:justify-between border-y border-slate-100 dark:border-slate-800 py-6 gap-4">
                <div className="flex items-center space-x-4">
                   <div className="w-12 h-12 rounded-full bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900 font-bold text-lg shadow-lg ring-4 ring-white dark:ring-slate-800">
                      {post.author.charAt(0)}
                   </div>
                   <div className="text-left">
                      <p className="text-sm font-bold text-slate-900 dark:text-white">By {post.author}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{post.date} • Updated 2 hours ago</p>
                   </div>
                </div>
                
                <div className="flex space-x-3">
                    <button className="w-8 h-8 rounded-full bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 flex items-center justify-center hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 transition-colors"><Twitter className="w-4 h-4"/></button>
                    <button className="w-8 h-8 rounded-full bg-blue-50 dark:bg-slate-800 text-blue-800 dark:text-blue-300 flex items-center justify-center hover:bg-blue-800 hover:text-white dark:hover:bg-blue-600 transition-colors"><Facebook className="w-4 h-4"/></button>
                    <button className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 flex items-center justify-center hover:bg-gray-800 dark:hover:bg-slate-700 hover:text-white transition-colors"><LinkIcon className="w-4 h-4"/></button>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            <div className="relative mb-12 group rounded-3xl overflow-hidden shadow-2xl dark:shadow-none bg-slate-100 dark:bg-slate-800">
               <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full h-[400px] md:h-[500px] object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
            </div>
            
            {/* Top Ad */}
            <div className="my-8 flex justify-center bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-dashed border-slate-200 dark:border-slate-800">
               <AdUnit size={AdSize.LEADERBOARD} className="hidden md:flex" label="Top Story Ad" />
               <AdUnit size={AdSize.MOBILE_BANNER} className="flex md:hidden" />
            </div>

            {/* Table of Contents (Auto-Generated) */}
            {toc.length > 0 && (
              <div className="bg-blue-50 dark:bg-blue-900/10 rounded-2xl p-6 mb-10 border border-blue-100 dark:border-blue-900/30">
                <h4 className="flex items-center font-black text-slate-900 dark:text-white mb-4 uppercase text-xs tracking-widest">
                  <List className="w-4 h-4 mr-2" /> Table of Contents
                </h4>
                <ul className="space-y-2">
                  {toc.map((item, idx) => (
                    <li key={idx} style={{ marginLeft: `${(item.level - 2) * 1}rem` }}>
                      <a href={`#`} className="text-sm font-bold text-blue-700 dark:text-blue-400 hover:underline">
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Content Body */}
            <article className="prose prose-lg md:prose-xl prose-slate dark:prose-invert max-w-none 
              prose-headings:font-sans prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-900 dark:prose-headings:text-white
              prose-p:font-serif prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-relaxed prose-p:text-[19px]
              prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:font-bold prose-a:no-underline hover:prose-a:underline
              prose-strong:text-slate-900 dark:prose-strong:text-white prose-strong:font-black
              prose-img:rounded-2xl prose-img:shadow-xl">
              
              <ReactMarkdown
                components={{
                   // Custom components to inject ads or styles
                   p: ({node, ...props}) => <p className="mb-8" {...props} />
                }}
              >
                {post.content}
              </ReactMarkdown>

              {/* In-Article Ad */}
              <div className="not-prose my-12 flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
                <span className="text-[10px] uppercase tracking-widest text-slate-400 mb-4 font-bold">Advertisement</span>
                <AdUnit size={AdSize.RECTANGLE} />
              </div>

            </article>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
              <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">Filed Under</h4>
              <div className="flex flex-wrap gap-3">
                {post.tags.map(tag => (
                  <span key={tag} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-full text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-900 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white hover:border-slate-900 dark:hover:border-blue-600 transition-colors cursor-pointer shadow-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

             {/* "You Might Also Like" Section */}
            <div className="mt-16">
              <div className="flex items-center space-x-2 mb-8">
                 <div className="h-8 w-1 bg-blue-600 rounded-full"></div>
                 <h3 className="text-2xl font-black text-slate-900 dark:text-white">Read This Next</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map(p => (
                  <div key={p.id} onClick={() => onPostClick(p.id)} className="group cursor-pointer">
                    <div className="h-40 rounded-xl overflow-hidden mb-4 relative bg-slate-200 dark:bg-slate-800">
                        <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <span className="absolute bottom-2 left-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-2 py-1 text-[10px] font-bold uppercase rounded text-slate-900 dark:text-white">{p.category}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">{p.title}</h4>
                  </div>
                ))}
              </div>
            </div>

          </main>

          {/* Sidebar - Sticky for High Visibility */}
          <aside className="lg:w-[32%] relative">
             <div className="sticky top-24 space-y-8">
                
                {/* Search / Newsletter Widget */}
                <div className="bg-slate-900 dark:bg-blue-900/20 dark:border dark:border-blue-500/20 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600 rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
                   <h3 className="text-xl font-bold mb-2 relative z-10 text-white">Tech Weekly India</h3>
                   <p className="text-slate-400 dark:text-blue-200 text-sm mb-4 relative z-10">Join 50,000+ Indians getting the smartest tech news.</p>
                   <input type="email" placeholder="Enter email address" className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:bg-white/20 transition-colors mb-2 text-white placeholder-white/40" />
                   <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-blue-900/50">Subscribe Free</button>
                </div>

                {/* Trending Widget - Dynamically Linked */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                   <div className="flex items-center mb-6">
                      <TrendingUp className="w-5 h-5 text-red-500 mr-2" />
                      <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-wide text-sm">Trending Now</h3>
                   </div>
                   <div className="space-y-6">
                      {trendingPosts.map((trendPost, idx) => (
                        <div key={trendPost.id} onClick={() => onPostClick(trendPost.id)} className="flex items-start gap-4 group cursor-pointer">
                           <span className="text-4xl font-black text-slate-200 dark:text-slate-700 leading-none group-hover:text-blue-200 dark:group-hover:text-blue-900 transition-colors">{idx + 1}</span>
                           <div>
                              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase mb-1 block">{trendPost.category}</span>
                              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                {trendPost.title}
                              </h4>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>

                {/* Skyscraper Ad - High RPM Slot */}
                <div className="flex justify-center">
                   <AdUnit size={AdSize.SKYSCRAPER} className="hidden lg:flex" />
                   <AdUnit size={AdSize.RECTANGLE} className="flex lg:hidden" />
                </div>
             </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default ArticleView;