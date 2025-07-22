import { useUser } from '@/hooks/contexts/use-user'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'

export function AppLayout() {
  const navigate = useNavigate()
  const { user, isUserLoading } = useUser()

  useEffect(() => {
    if (!isUserLoading && !user) {
      navigate('/entrar')
    }
  }, [isUserLoading, user, navigate])

  return (
    <main className="flex h-full w-full flex-col items-center justify-start">
      <Outlet />
    </main>
  )
}
