"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink, Play } from "lucide-react";

interface VideoFeatureProps {
  videoId: string;
  title: string;
}

export function VideoFeature({ videoId, title }: VideoFeatureProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activated, setActivated] = useState(false);

  const watchUrl = useMemo(
    () => `https://www.youtube.com/watch?v=${videoId}`,
    [videoId],
  );

  const thumbnailUrl = useMemo(
    () => `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    [videoId],
  );

  // 视频进入视口后自动加载并播放（静音 + 循环），点击缩略图作为后备触发
  const embedUrl = useMemo(
    () =>
      `https://www.youtube.com/embed/${videoId}` +
      `?autoplay=1&mute=1&loop=1&playlist=${videoId}&playsinline=1&rel=0`,
    [videoId],
  );

  useEffect(() => {
    if (activated) return;
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActivated(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [activated]);

  return (
    <div className="space-y-4">
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-lg bg-black"
        style={{ paddingBottom: "56.25%" }}
      >
        {activated ? (
          <iframe
            className="absolute top-0 left-0 h-full w-full"
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setActivated(true)}
            aria-label={`Play ${title}`}
            className="group absolute inset-0 h-full w-full"
          >
            {/* 缩略图 */}
            <img
              src={thumbnailUrl}
              alt={title}
              loading="lazy"
              className="h-full w-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100"
            />
            {/* 渐变遮罩 */}
            <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10" />
            {/* 播放按钮 */}
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[hsl(var(--nav-theme))] text-white shadow-lg shadow-[hsl(var(--nav-theme)/0.4)] transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20">
                <Play className="ml-1 h-7 w-7 md:h-9 md:w-9" fill="currentColor" />
              </span>
            </span>
            {/* 标题条 */}
            <span className="absolute bottom-0 left-0 right-0 p-4 text-left">
              <span className="line-clamp-1 text-sm font-medium text-white md:text-base">
                {title}
              </span>
            </span>
          </button>
        )}
      </div>

      <div className="flex justify-center">
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
        >
          Watch on YouTube
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
