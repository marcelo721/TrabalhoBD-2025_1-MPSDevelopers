import { Logo } from '@/assets/logo'
import { ThreeDMarquee } from '@/components/ui/3d-marquee'
import { Outlet } from 'react-router'
import marcelo1 from '@/assets/marcelo/marcelo1.jpg'
import marcelo2 from '@/assets/marcelo/marcelo2.jpg'
import marcelo3 from '@/assets/marcelo/marcelo3.jpg'
import marcelo4 from '@/assets/marcelo/marcelo4.jpg'
import marcelo5 from '@/assets/marcelo/marcelo5.jpg'

const images = [
  'https://assets.aceternity.com/cloudinary_bkp/3d-card.png',
  'https://assets.aceternity.com/animated-modal.png',
  'https://assets.aceternity.com/animated-testimonials.webp',
  'https://assets.aceternity.com/cloudinary_bkp/Tooltip_luwy44.png',
  marcelo1,
  marcelo2,
  marcelo3,
  marcelo4,

  'https://assets.aceternity.com/carousel.webp',
  'https://assets.aceternity.com/placeholders-and-vanish-input.png',
  'https://assets.aceternity.com/shooting-stars-and-stars-background.png',
  'https://assets.aceternity.com/signup-form.png',
  'https://assets.aceternity.com/cloudinary_bkp/stars_sxle3d.png',
  marcelo5,
  'https://assets.aceternity.com/spotlight-new.webp',
  'https://assets.aceternity.com/cloudinary_bkp/Spotlight_ar5jpr.png',
  'https://assets.aceternity.com/cloudinary_bkp/Parallax_Scroll_pzlatw_anfkh7.png',
  'https://assets.aceternity.com/tabs.png',
  'https://assets.aceternity.com/cloudinary_bkp/Tracing_Beam_npujte.png',
  'https://assets.aceternity.com/cloudinary_bkp/typewriter-effect.png',
  'https://assets.aceternity.com/glowing-effect.webp',
  'https://assets.aceternity.com/hover-border-gradient.png',
  'https://assets.aceternity.com/cloudinary_bkp/Infinite_Moving_Cards_evhzur.png',
  'https://assets.aceternity.com/cloudinary_bkp/Lamp_hlq3ln.png',
  'https://assets.aceternity.com/macbook-scroll.png',
  'https://assets.aceternity.com/cloudinary_bkp/Meteors_fye3ys.png',
  'https://assets.aceternity.com/cloudinary_bkp/Moving_Border_yn78lv.png',
  'https://assets.aceternity.com/multi-step-loader.png',
  'https://assets.aceternity.com/vortex.png',
  'https://assets.aceternity.com/wobble-card.png',
  'https://assets.aceternity.com/world-map.webp',
  'https://assets.aceternity.com/world-map.webp',
  'https://assets.aceternity.com/world-map.webp',
  'https://assets.aceternity.com/world-map.webp',
]

export function AuthLayout() {
  return (
    <main className="flex h-dvh w-full max-w-full">
      <aside className="w-full shrink overflow-hidden">
        <ThreeDMarquee images={images} className="h-full" />
      </aside>
      <article className="border-border relative flex w-80 shrink-0 flex-col items-center justify-center gap-4 border-l px-8">
        <Logo className="absolute top-8 left-8 h-10" />
        <Outlet />
      </article>
    </main>
  )
}
