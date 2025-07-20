import { Outlet } from 'react-router'
import { Sidebar } from './components/sidebar'

export function AdminPage() {
  // This function will render the admin page
  return (
    <article className="flex h-dvh w-full">
      <Sidebar />
      <section className="flex flex-1 flex-col gap-4 overflow-x-hidden overflow-y-auto px-6 py-6">
        <Outlet />
      </section>
    </article>
  )
}
