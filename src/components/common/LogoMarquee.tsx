import Image from 'next/image';
import styles from './LogoMarquee.module.css';

const LOGO_WIDTH = 202;
const LOGO_HEIGHT = 64;
const LOGO_SPACING = 96; // px
const LOGO_COUNT = 10;

export default function LogoMarquee() {
  return (
    <div className="w-full bg-white py-8 mt-8">
      <div className="container mx-auto px-4">
        <h3 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Trusted by:
        </h3>
        <div className={styles.marqueeContainer}>
          <div className={styles.marqueeContent}>
            {/* First set of logos */}
            {[...Array(LOGO_COUNT)].map((_, i) => (
              <Image
                key={"logo1-" + i}
                src="/carrotly-logo.svg"
                alt="Carrotly"
                width={LOGO_WIDTH}
                height={LOGO_HEIGHT}
                style={{ marginRight: i < LOGO_COUNT - 1 ? LOGO_SPACING : 0 }}
              />
            ))}
            {/* Duplicate set for seamless loop */}
            {[...Array(LOGO_COUNT)].map((_, i) => (
              <Image
                key={"logo2-" + i}
                src="/carrotly-logo.svg"
                alt="Carrotly"
                width={LOGO_WIDTH}
                height={LOGO_HEIGHT}
                style={{ marginRight: i < LOGO_COUNT - 1 ? LOGO_SPACING : 0 }}
              />
            ))}
          </div>
        </div>
        <h3 className="text-2xl font-semibold text-gray-800 text-center mb-6 mt-6">
          Maybe you&apos;ll be next?
        </h3>
      </div>
    </div>
  );
} 