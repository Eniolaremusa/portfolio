import Image from "next/image";

interface HeroClientLogoProps {
  name: string;
  src: string;
  width: number;
  height: number;
}

export function HeroClientLogo({
  name,
  src,
  width,
  height,
}: HeroClientLogoProps) {
  const className =
    "h-auto max-h-[22px] w-auto max-w-full object-contain object-left";

  return (
    <li className="home-hero-logo-item shrink-0">
      <span className="relative inline-block leading-none">
        <Image
          src={src}
          alt={name}
          width={width}
          height={height}
          className={`home-hero-logo-base ${className}`}
        />
        <Image
          src={src}
          alt=""
          aria-hidden
          width={width}
          height={height}
          className={`home-hero-logo-accent ${className}`}
        />
      </span>
    </li>
  );
}
