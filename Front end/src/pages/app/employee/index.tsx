import { Outlet, useNavigate } from 'react-router'
import { EmployeeSidebar } from './components/employee-sidebar'
import { useUser } from '@/hooks/contexts/use-user'
import { useEffect } from 'react'

export function EmployeePage() {
  const navigate = useNavigate()
  const { verifyEmployeeUser, isEmployeeLoading, employee } = useUser()

  useEffect(() => {
    verifyEmployeeUser()
  }, [verifyEmployeeUser])

  useEffect(() => {
    if (!isEmployeeLoading && !employee) {
      navigate('/entrar')
    }
  }, [isEmployeeLoading, employee, navigate])

  return (
    <article className="flex h-dvh w-full">
      <EmployeeSidebar />
      <section className="flex flex-1 flex-col gap-4 overflow-x-hidden overflow-y-auto px-6 py-6">
        <Outlet />
      </section>
    </article>
  )
}
