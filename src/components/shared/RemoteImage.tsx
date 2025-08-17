import { cn } from "@/lib/utils";

type RemoteImageProps = {
  className?: string;
  src: string;
  alt?: string;
  loading?: "lazy" | "eager";
  onError?: () => void;
  prefix?: string;
} & React.ImgHTMLAttributes<HTMLImageElement>;

function RemoteImage({
  className,
  src,
  alt = "Image",
  loading = "lazy",
  prefix = "static",
  ...rest
}: RemoteImageProps) {
  // Don't render if src is empty or invalid
  if (!src || typeof src !== "string" || src.trim() === "") {
    return null;
  }

  const url = import.meta.env.VITE_API_URL;

  // Don't render if API URL is not available
  if (!url) {
    return null;
  }

  try {
    const origin = new URL(url).origin;
    // Handle cases where src already includes the full path
    const imageSrc = src.startsWith("http")
      ? src
      : prefix
      ? `${origin}/${prefix}/${src}`
      : `${origin}/${src}`;

    return (
      <img
        src={imageSrc}
        alt={alt}
        loading={loading}
        className={`${cn("h-16 w-16 rounded-lg object-cover")} ${className}`}
        {...rest}
      />
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: unknown) {
    console.warn("Invalid API URL:", url);
    return null;
  }
}

export default RemoteImage;
