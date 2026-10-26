'use client';

import React, { useState } from 'react';
import { Play, Video } from 'lucide-react';

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  subtitle?: string;
}

export function YouTubeEmbed({ videoId, title, subtitle }: YouTubeEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-950/60 dark:text-red-400">
            <Video className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        <span className="hidden rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600 sm:inline-flex dark:bg-red-950/40 dark:text-red-400">
          Video Tutorial
        </span>
      </div>

      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-950">
        {isPlaying ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full border-0"
          />
        ) : (
          <div
            onClick={() => setIsPlaying(true)}
            className="group relative h-full w-full cursor-pointer"
          >
            <img
              src={`https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80`}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="flex h-18 w-18 items-center justify-center rounded-full bg-red-600 text-white shadow-2xl shadow-red-600/50 transition-transform duration-300 group-hover:scale-110">
                <Play className="ml-1 h-8 w-8 fill-current" />
              </div>
              <p className="mt-4 rounded-full bg-slate-900/80 px-4 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
                Click to Watch Interactive Tutorial
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
