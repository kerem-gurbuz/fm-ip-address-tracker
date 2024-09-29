import Image from 'next/image';

import patternBgDesktop from '/public/assets/images/pattern-bg-desktop.png';
import patternBgMobile from '/public/assets/images/pattern-bg-mobile.png';

const BACKGROUND_IMAGE_ALT =
  'A geometric pattern with blue lines on a gradient background.';

type PatternBackgroundProps = {
  className?: React.ComponentProps<'div'>['className'];
};

export function PatternBackground({ className }: PatternBackgroundProps) {
  return (
    <div className={className}>
      <div className="relative h-full min-[480px]:hidden">
        <Image
          src={patternBgMobile}
          alt={BACKGROUND_IMAGE_ALT}
          className="object-cover object-center"
          placeholder="blur"
          sizes="100vw"
          quality={100}
          priority
          fill
        />
      </div>
      <div className="relative hidden h-full min-[480px]:block">
        <Image
          src={patternBgDesktop}
          alt={BACKGROUND_IMAGE_ALT}
          className="object-cover object-center"
          placeholder="blur"
          sizes="100vw"
          quality={100}
          priority
          fill
        />
      </div>
    </div>
  );
}
