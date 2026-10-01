import type { ImageProps } from "next/image";
import type { CSSProperties } from "react";

export type AppImageProps = Omit<
  ImageProps,
  "width" | "height" | "onLoad" | "onError"
> & {
  width?: number;
  height?: number;
  /** Wrapper around skeleton + image (size, layout). */
  containerClassName?: string;
  containerStyle?: CSSProperties;
  /** Grey pulse layer shown until the image loads. */
  skeletonClassName?: string;
  showSkeleton?: boolean;
  /** Tailwind border classes, e.g. `border border-shark-300`. */
  borderClassName?: string;
  /** Tailwind radius classes, e.g. `rounded-full`. Default: `rounded-md`. */
  roundedClassName?: string;
  /** Classes applied to the `<Image>` element (object-fit, etc.). */
  className?: string;
};
