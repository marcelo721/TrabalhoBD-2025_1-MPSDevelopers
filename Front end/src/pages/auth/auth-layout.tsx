import { Logo } from '@/assets/logo'
import { ThreeDMarquee } from '@/components/ui/3d-marquee'
import { Outlet } from 'react-router'
import marcelo1 from '@/assets/marcelo/marcelo1.jpg'
import marcelo2 from '@/assets/marcelo/marcelo2.jpg'
import marcelo3 from '@/assets/marcelo/marcelo3.jpg'
import marcelo4 from '@/assets/marcelo/marcelo4.jpg'
import marcelo5 from '@/assets/marcelo/marcelo5.jpg'
import pamela1 from '@/assets/pamela/pamela1.jpg'
import pamela2 from '@/assets/pamela/pamela2.jpg'
import sarah1 from '@/assets/sarinha/sarinha1.jpg'
import sarah2 from '@/assets/sarinha/sarinha2.jpg'

import sagui1 from '@/assets/sagui/Sagui1.jpg'
import sagui2 from '@/assets/sagui/Sagui2.jpg' 
import sagui3 from '@/assets/sagui/Sagui3.jpg'
import sagui4 from '@/assets/sagui/Sagui4.jpg'

const images = [
  sarah1,
  sagui2,
  sarah2,
  sagui4,
  pamela1,
  sagui1,
  marcelo3,
  pamela1,
  marcelo1,
  pamela1,
  sarah2,
  sagui4,
  sagui3,
  marcelo5,
  sarah1,
  pamela2,
  sagui2,
  sagui1,
  sagui2,
  sagui3,
  sagui4,
  marcelo2,
  sagui4,
  sarah2,
  pamela1,
  sagui2,
  sagui4,
  sagui3,
  marcelo4,
  sagui3,
  pamela1,
  sagui4,
  sagui1,
  sagui2,
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
