"use client";

import Image, { ImageProps } from "next/image";
import { cn } from "@/utils/cn"; // Assuming there's a cn utility, if not I'll create one or use template literals

interface AppImageProps extends Omit<ImageProps, "width" | "height"> {
  variant?: "fill" | "fixed" | "responsive";
  width?: number;
  height?: number;
  containerClassName?: string;
}

export default function AppImage({
  variant = "responsive",
  width,
  height,
  className,
  containerClassName,
  style,
  ...props
}: AppImageProps) {
  if (variant === "fill") {
    return (
      <div className={cn("relative w-full h-full", containerClassName)}>
        <Image
          fill
          className={cn("object-cover", className)}
          {...props}
        />
      </div>
    );
  }

  if (variant === "fixed") {
    return (
      <Image
        width={width}
        height={height}
        className={className}
        style={style}
        {...props}
      />
    );
  }

  // variant === "responsive" (Fluid width, auto height)
  // Needs width and height to establish aspect ratio
  return (
    <Image
      width={width || 800}
      height={height || 600}
      className={cn("w-full h-auto", className)}
      style={{ 
        height: "auto",
        ...style 
      }}
      {...props}
    />
  );
}
