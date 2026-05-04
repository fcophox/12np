"use client";

import Image from "next/image";
import Link from "next/link";
import BlurFadeIn from "./BlurFadeIn";

export default function HeroB() {
  return (
    <section className="relative w-full h-[80vh] md:h-[80vh] overflow-hidden flex flex-col">
      <Image
        src="/images/brand/background.png"
        alt="Hero B Background"
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent md:bg-gradient-to-r md:from-white/80 md:via-white/50 md:to-transparent z-0"></div>

      {/* Mobile-only intense bottom gradient for readability */}
      <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-white via-white/80 to-transparent md:hidden z-10"></div>

      <div className="relative w-full max-w-7xl mx-auto px-8 md:px-16 h-full flex flex-col md:flex-row items-start md:items-center py-10 md:py-0 z-20 gap-12">
        {/* Mobile Hero Image */}
        <BlurFadeIn delay={0.1} className="w-full aspect-square relative rounded-[4rem] overflow-hidden shadow-2xl md:hidden">
          <Image
            src="/images/brand/heroimagen.png"
            alt="Hero Image Mobile"
            fill
            className="object-cover"
            priority
          />
        </BlurFadeIn>

        <div className="w-full md:w-2/3 text-[#3d332e]">
          <BlurFadeIn delay={0.1} className="flex items-center gap-3 mb-4">
            <svg width="20" height="20" viewBox="0 0 38 37" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-6 md:h-6">
              <path d="M19.0041 31.3028C18.949 31.4389 18.9142 31.5283 18.8772 31.6168C17.8846 33.997 16.2153 35.6756 13.7559 36.5033C12.6526 36.8738 11.5211 36.9535 10.3891 36.5792C9.82912 36.394 9.39791 36.047 9.18485 35.5047C8.99448 35.0211 8.88425 34.5061 8.74622 34.0026C8.71612 33.8933 8.71751 33.7756 8.69991 33.6321C8.54011 33.6617 8.39977 33.7025 8.25758 33.7113C7.77449 33.7409 7.28492 33.809 6.80739 33.7715C5.96765 33.7062 5.42482 33.1754 5.04733 32.4644C4.21825 30.897 4.2039 29.2616 4.69625 27.6053C5.1886 25.949 6.12328 24.5543 7.43498 23.421C7.4813 23.3825 7.54661 23.3705 7.60312 23.3459L7.54105 23.2533C7.46046 23.244 7.38033 23.2325 7.29974 23.225C4.87086 22.9999 2.83522 22.0097 1.30212 20.0871C0.535572 19.1292 0.0714734 18.0301 0.00431347 16.7819C-0.0466355 15.8138 0.354472 15.0936 1.16965 14.5994C1.51703 14.3886 1.88572 14.2117 2.24468 14.0195C2.06775 13.6545 1.87414 13.2956 1.71666 12.9222C1.36558 12.0983 1.43088 11.3215 1.98762 10.5906C2.71063 9.6402 3.66569 9.02604 4.77823 8.65319C7.22517 7.83337 9.53732 8.16269 11.7179 9.51561C11.7758 9.55128 11.836 9.5837 11.9444 9.64576C11.9134 9.49477 11.8939 9.38778 11.8699 9.28171C11.3604 7.01633 11.5669 4.84452 12.7647 2.82324C13.447 1.67225 14.3511 0.738962 15.6137 0.205851C16.503 -0.170245 17.3066 -0.0257348 18.0245 0.596305C18.3672 0.893199 18.6803 1.22437 19.0365 1.56897C19.3052 1.29384 19.559 0.977033 19.8702 0.732015C20.1697 0.491055 20.5031 0.295507 20.8596 0.15166C21.6094 -0.140601 22.3088 0.105343 22.9531 0.493018C24.7979 1.59768 25.8058 3.279 26.237 5.34521C26.5149 6.66757 26.445 7.98297 26.1513 9.29329C26.1328 9.37573 26.116 9.45864 26.1008 9.54201C26.1008 9.55544 26.1082 9.57073 26.1226 9.62353C26.2111 9.56934 26.2907 9.51885 26.3713 9.47068C28.6872 8.09553 31.1086 7.78381 33.6501 8.75045C34.5592 9.09186 35.3565 9.67769 35.9539 10.4433C36.5375 11.1844 36.669 11.9825 36.2999 12.8518C36.1345 13.2404 35.9428 13.6184 35.758 14.0098C36.0738 14.1723 36.4064 14.3312 36.7255 14.5109C37.6056 15.0037 38.0872 15.7507 37.9983 16.7652C37.8824 18.0764 37.3285 19.193 36.4787 20.1544C34.9828 21.8312 33.0826 22.8354 30.8627 23.1697C30.5598 23.2149 30.2532 23.2391 29.9195 23.2734L29.8621 23.3729C30.4551 23.6574 31.0046 23.953 31.4923 24.3752C32.7608 25.4681 33.6297 26.8225 34.1136 28.4354C34.5892 30.0223 34.6031 31.6134 33.8336 33.1449C33.4663 33.8745 32.9132 34.4207 32.0459 34.4867C31.5639 34.5233 31.0714 34.4567 30.5863 34.4181C30.4432 34.4069 30.302 34.3741 30.1395 34.3482C29.9991 34.8567 29.8861 35.3635 29.6936 35.8431C29.4768 36.3826 29.0493 36.7237 28.4901 36.9055C27.3649 37.2743 26.2391 37.1981 25.1357 36.8321C22.6736 36.0171 21.0002 34.3437 20.0027 31.9628C19.9633 31.8676 19.9257 31.7712 19.8832 31.6673C19.5956 31.6673 19.3024 31.3028 19.0041 31.3028Z" fill="#f15a24" />
            </svg>
            <div className="text-[10px] md:text-xs text-[#6b5a51] uppercase tracking-widest font-medium">Café, pastelería y momentos para ti</div>
          </BlurFadeIn>

          <BlurFadeIn delay={0.25}>
            <h2 className="text-4xl md:text-[84px] leading-tight max-w-none font-[family-name:var(--font-fraunces)] font-bold mb-4">Pequeños momentos<br />a las 12 en punto.</h2>
          </BlurFadeIn>

          <BlurFadeIn delay={0.4}>
            <div className="w-12 h-0.5 bg-[#c6bfb7] mb-4" />
            <p className="text-lg md:text-xl font-[family-name:var(--font-fraunces)] text-[#6b5a51] mb-6">Pastelería inspirada en la cultura japonesa moderna.</p>
          </BlurFadeIn>

          <BlurFadeIn delay={0.55}>
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center pt-10">
              <Link href="/la-carta" className="w-full sm:w-auto inline-flex items-center justify-center bg-[#74865e] text-white px-8 py-4 rounded-full shadow-md text-sm font-medium">
                <span className="mr-3">Ver carta</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></svg>
              </Link>
              <Link href="/la-pastelera" className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-[#3d332e] px-8 py-4 rounded-full shadow-md text-sm font-medium border border-[#d9d2ca]">Conocer la historia</Link>
            </div>
          </BlurFadeIn>
        </div>

        {/* Right image handled by absolute SVG so mask reaches viewport right edge */}
      </div>

      {/* Desktop-only masked image */}
      <div className="absolute top-0 right-0 h-full pointer-events-none z-10 hidden md:flex items-start justify-end ">
        <svg viewBox="0 0 1131 680" preserveAspectRatio="xMaxYMid meet" className="h-full w-auto block -mr-80">
          <defs>
            <clipPath id="heroMask" clipPathUnits="userSpaceOnUse">
              <path d="M1131 680H13.1621C4.6662 658.311 0 634.701 0 610C0 503.961 85.9613 418 192 418C198.547 418 205.017 418.328 211.395 418.968C211.132 413.011 211 407.021 211 401C211 179.534 390.534 0 612 0H1131V680Z" />
            </clipPath>
          </defs>
          {/* Image preserves its proportion and is aligned to the right inside the SVG */}
          <image href="/images/brand/heroimagen.png" x="0" y="0" width="1090" height="680" preserveAspectRatio="xMaxYMid slice" clipPath="url(#heroMask)" />
        </svg>
      </div>

      {/* Decorative shadow under plate (right) */}
      <div className="absolute right-12 bottom-10 w-72 h-40 -z-10">
        <div className="w-full h-full rounded-full bg-black/10 blur-[30px] opacity-60" />
      </div>
      {/* Rotating Seal - Bottom Right */}
      <div className="absolute bottom-10 right-10 z-30 hidden md:block pointer-events-none">
        <div className="relative w-40 h-40 flex items-center justify-center">
          <div className="absolute inset-0 animate-[spin_20s_linear_infinite]">
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
              <defs>
                <path id="circlePath" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
              </defs>
              <circle cx="50" cy="50" r="45" fill="none" stroke="white/30" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="32" fill="none" stroke="white/30" strokeWidth="0.5" />
              <text className="text-[7px] uppercase font-light fill-white tracking-[0.30em]">
                <textPath href="#circlePath">
                  PASTELERÍA JAPONESA • PARA COMPARTIR • PASTELERÍA JAPONESA • PARA COMPARTIR •
                </textPath>
              </text>
            </svg>
          </div>
          <div className="z-10 p-4">
            <svg width="28" height="28" viewBox="0 0 38 37" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.0041 31.3028C18.949 31.4389 18.9142 31.5283 18.8772 31.6168C17.8846 33.997 16.2153 35.6756 13.7559 36.5033C12.6526 36.8738 11.5211 36.9535 10.3891 36.5792C9.82912 36.394 9.39791 36.047 9.18485 35.5047C8.99448 35.0211 8.88425 34.5061 8.74622 34.0026C8.71612 33.8933 8.71751 33.7756 8.69991 33.6321C8.54011 33.6617 8.39977 33.7025 8.25758 33.7113C7.77449 33.7409 7.28492 33.809 6.80739 33.7715C5.96765 33.7062 5.42482 33.1754 5.04733 32.4644C4.21825 30.897 4.2039 29.2616 4.69625 27.6053C5.1886 25.949 6.12328 24.5543 7.43498 23.421C7.4813 23.3825 7.54661 23.3705 7.60312 23.3459L7.54105 23.2533C7.46046 23.244 7.38033 23.2325 7.29974 23.225C4.87086 22.9999 2.83522 22.0097 1.30212 20.0871C0.535572 19.1292 0.0714734 18.0301 0.00431347 16.7819C-0.0466355 15.8138 0.354472 15.0936 1.16965 14.5994C1.51703 14.3886 1.88572 14.2117 2.24468 14.0195C2.06775 13.6545 1.87414 13.2956 1.71666 12.9222C1.36558 12.0983 1.43088 11.3215 1.98762 10.5906C2.71063 9.6402 3.66569 9.02604 4.77823 8.65319C7.22517 7.83337 9.53732 8.16269 11.7179 9.51561C11.7758 9.55128 11.836 9.5837 11.9444 9.64576C11.9134 9.49477 11.8939 9.38778 11.8699 9.28171C11.3604 7.01633 11.5669 4.84452 12.7647 2.82324C13.447 1.67225 14.3511 0.738962 15.6137 0.205851C16.503 -0.170245 17.3066 -0.0257348 18.0245 0.596305C18.3672 0.893199 18.6803 1.22437 19.0365 1.56897C19.3052 1.29384 19.559 0.977033 19.8702 0.732015C20.1697 0.491055 20.5031 0.295507 20.8596 0.15166C21.6094 -0.140601 22.3088 0.105343 22.9531 0.493018C24.7979 1.59768 25.8058 3.279 26.237 5.34521C26.5149 6.66757 26.445 7.98297 26.1513 9.29329C26.1328 9.37573 26.116 9.45864 26.1008 9.54201C26.1008 9.55544 26.1082 9.57073 26.1226 9.62353C26.2111 9.56934 26.2907 9.51885 26.3713 9.47068C28.6872 8.09553 31.1086 7.78381 33.6501 8.75045C34.5592 9.09186 35.3565 9.67769 35.9539 10.4433C36.5375 11.1844 36.669 11.9825 36.2999 12.8518C36.1345 13.2404 35.9428 13.6184 35.758 14.0098C36.0738 14.1723 36.4064 14.3312 36.7255 14.5109C37.6056 15.0037 38.0872 15.7507 37.9983 16.7652C37.8824 18.0764 37.3285 19.193 36.4787 20.1544C34.9828 21.8312 33.0826 22.8354 30.8627 23.1697C30.5598 23.2149 30.2532 23.2391 29.9195 23.2734L29.8621 23.3729C30.4551 23.6574 31.0046 23.953 31.4923 24.3752C32.7608 25.4681 33.6297 26.8225 34.1136 28.4354C34.5892 30.0223 34.6031 31.6134 33.8336 33.1449C33.4663 33.8745 32.9132 34.4207 32.0459 34.4867C31.5639 34.5233 31.0714 34.4567 30.5863 34.4181C30.4432 34.4069 30.302 34.3741 30.1395 34.3482C29.9991 34.8567 29.8861 35.3635 29.6936 35.8431C29.4768 36.3826 29.0493 36.7237 28.4901 36.9055C27.3649 37.2743 26.2391 37.1981 25.1357 36.8321C22.6736 36.0171 21.0002 34.3437 20.0027 31.9628C19.9633 31.8676 19.9257 31.7712 19.8832 31.6673C19.5956 31.6673 19.3024 31.3028 19.0041 31.3028Z"                stroke="white" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                fill="none" 
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

