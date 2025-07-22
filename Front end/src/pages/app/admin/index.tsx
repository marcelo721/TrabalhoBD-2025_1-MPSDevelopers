import { Outlet, useNavigate } from 'react-router'
import { useUser } from '@/hooks/contexts/use-user'
import { useEffect } from 'react'
import { Sidebar } from '../components/sidebar'

export function AdminPage() {
  const navigate = useNavigate()
  const { verifyAdminUser, isUserLoading, user } = useUser()

  useEffect(() => {
    verifyAdminUser()
  }, [verifyAdminUser])

  useEffect(() => {
    if (!isUserLoading && !user) {
      navigate('/entrar')
    }
  }, [isUserLoading, user, navigate])

  return (
    <article className="flex h-dvh w-full">
      <Sidebar />
      <section className="flex flex-1 flex-col gap-4 overflow-x-hidden overflow-y-auto px-6 py-6">
        <Outlet />
      </section>
    </article>
  )
}
