"use client";

import type { AppImageProps } from "@/types/components/shared-types/image.types";
import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";

export const APP_IMAGE_ICON_SIZE = 24;

export default function AppImage({
  width = APP_IMAGE_ICON_SIZE,
  height = APP_IMAGE_ICON_SIZE,
  alt = "",
  className = "",
  containerClassName = "",
  containerStyle,
  skeletonClassName = "",
  showSkeleton = true,
  borderClassName = "",
  roundedClassName = "rounded-md",
  fill,
  sizes,
  src,
  priority = false,
  style,
  ...rest
}: AppImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setError(false);
  }, [src]);

  const showPlaceholder = showSkeleton && !loaded && !error;

  const wrapperClassName = [
    fill ? "relative block h-full w-full" : "relative inline-block overflow-hidden",
    borderClassName,
    roundedClassName,
    containerClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const wrapperStyle: CSSProperties | undefined = fill
    ? containerStyle
    : {
        width,
        height,
        minWidth: width,
        minHeight: height,
        ...containerStyle,
      };

  const imageClassName = [
    fill ? "object-cover" : "",
    loaded ? "opacity-100" : "opacity-0",
    "transition-opacity duration-300",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={wrapperClassName} style={wrapperStyle}>
      {showPlaceholder ? (
        <span
          className={`absolute inset-0 animate-pulse bg-shark-200 dark:bg-slate-700 ${skeletonClassName}`}
          aria-hidden
        />
      ) : null}
      {error ? (
        <span
          className="absolute inset-0 flex items-center justify-center bg-shark-100 text-xs text-shark-400 dark:bg-slate-800 dark:text-slate-500"
          role="img"
          aria-label={alt || "Image failed to load"}
        >
          —
        </span>
      ) : (
        <Image
          {...rest}
          src={src}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          sizes={sizes ?? (fill ? "100vw" : undefined)}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className={imageClassName}
          style={style}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}
    </span>
  );
}
