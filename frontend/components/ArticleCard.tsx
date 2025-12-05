import React, { useState } from 'react';
import { BlogPost } from '../types';
import { Clock, ArrowUpRight } from 'lucide-react';

interface ArticleCardProps {
  post: BlogPost;
  onClick: (id: string) => void;
  featured?: boolean;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ post, onClick, featured = false }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div 
      onClick={() => onClick(post.id)}
      className={`group cursor-pointer relative flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 ${
        featured 
          ? 'md:col-span-2 md:grid md:grid-cols-2 shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] dark:shadow-none' 
          : 'shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.05)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]'
      }`}
    >
      {/* Image Section */}
      <div className={`relative overflow-hidden bg-slate-200 dark:bg-slate-800 ${featured ? 'h-64 md:h-full' : 'h-52'}`}>
        
        {/* Skeleton Loader */}
        {!isImageLoaded && (
          <div className="absolute inset-0 animate-pulse-slow bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800" />
        )}

        <img 
          src={post.imageUrl} 
          alt={post.title} 
          loading={featured ? "eager" : "lazy"}
          onLoad={() => setIsImageLoaded(true)}
          className={`w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-slate-900 dark:text-white px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg shadow-sm">
            {post.category}
          </span>
        </div>
      </div>
      
      {/* Content Section */}
      <div className={`p-6 flex flex-col justify-between relative bg-white dark:bg-slate-900 ${featured ? 'md:p-8 lg:p-10' : ''}`}>
        <div>
          <div className="flex items-center text-xs text-slate-400 dark:text-slate-500 font-semibold mb-3 space-x-2">
            <span>{post.date}</span>
            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
            <span className="flex items-center text-blue-600 dark:text-blue-400"><Clock className="w-3 h-3 mr-1" /> {post.readTime}</span>
          </div>
          
          <h3 className={`font-sans font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-3 leading-tight ${featured ? 'text-2xl md:text-4xl' : 'text-xl'}`}>
            {post.title}
          </h3>
          
          <p className={`text-slate-500 dark:text-slate-400 leading-relaxed ${featured ? 'text-lg mb-6 line-clamp-4' : 'text-sm mb-4 line-clamp-3'}`}>
            {post.excerpt}
          </p>
        </div>
        
        <div className="flex items-center justify-between mt-auto pt-4 md:pt-0">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-[10px] text-white font-bold">
              {post.author.charAt(0)}
            </div>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{post.author}</span>
          </div>
          
          <span className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-500 dark:group-hover:text-white transition-all duration-300">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;