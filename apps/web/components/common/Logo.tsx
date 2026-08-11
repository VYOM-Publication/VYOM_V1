import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  /** Size of the logo image in pixels (width = height). Default 40 */
  size?: number;
  /** Show the VYOM text wordmark beside the logo. Default true */
  showText?: boolean;
  /** Extra classes on the wrapping element */
  className?: string;
  /** Dark variant — white text (for footers on dark bg). Default false */
  dark?: boolean;
}

export function Logo({ size = 40, showText = true, className = '', dark = false }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2 shrink-0 ${className}`}>
      <Image
        src="/vyom-logo.png"
        alt="VYOM Publications logo"
        width={size}
        height={size}
        className="object-contain"
        priority
      />
      {showText && (
        <span className={`font-display text-lg font-bold tracking-wide ${dark ? 'text-ivory' : 'text-forest-green'}`}>
          VYOM
        </span>
      )}
    </Link>
  );
}
