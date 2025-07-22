import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { UserContext } from './user-context'
import {
  signInService,
  type SignInServiceRequest,
} from '@/services/auth/sign-in-service'
import { addTokenToApi } from '@/utils/api/add-token-to-api'
import type { AuthUser } from '@/types/user'
import { removeTokenFromApi } from '@/utils/api/remove-token-from-api'
import type { Student } from '@/types/students'
import type { Teacher } from '@/types/teacher'
import type { Employee } from '@/types/employee'
import { saveUserInLocalStorage } from '@/storage/user/save-user-in-localstorage'
import { getUserInLocalStorage } from '@/storage/user/get-user-in-localstorage'
import { findStudentByCodeService } from '@/services/students/find-student-by-code-service'
import { findTeacherByCodeService } from '@/services/teacher/find-teacher-by-code-service'
import { findEmployeeByCodeService } from '@/services/employee/fint-employee-by-code'
import { removeUserInLocalStorage } from '@/storage/user/remove-user-in-localstorage'

export type UserContextProps = {
  user: AuthUser | null
  student: Student | null
  teacher: Teacher | null
  employee: Employee | null
  isUserLoading: boolean
  isStudentLoading: boolean
  isTeacherLoading: boolean
  isEmployeeLoading: boolean
  signIn: (data: SignInServiceRequest) => Promise<AuthUser>
  signOut: () => void
  verifyAdminUser: () => Promise<void>
  verifyStudentUser: () => Promise<void>
  verifyTeacherUser: () => Promise<void>
  verifyEmployeeUser: () => Promise<void>
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [isUserLoading, setIsUserLoading] = useState(true)

  const [isStudentLoading, setIsStudentLoading] = useState(true)
  const [isTeacherLoading, setIsTeacherLoading] = useState(true)
  const [isEmployeeLoading, setIsEmployeeLoading] = useState(true)
  const [user, setUser] = useState<AuthUser | null>(null)
  const [student, setStudent] = useState<Student | null>(null)
  const [teacher, setTeacher] = useState<Teacher | null>(null)
  const [employee, setEmployee] = useState<Employee | null>(null)

  const signIn = useCallback(
    async ({ code, password }: SignInServiceRequest) => {
      try {
        setIsUserLoading(true)
        const userData = await signInService({ code, password })

        saveUserInLocalStorage(userData)
        addTokenToApi(userData.token)

        setUser(userData)

        return userData
      } catch (error) {
        console.error('Erro ao fazer login:', error)
        throw new Error(
          'Não foi possível realizar o login. Verifique suas credenciais e tente novamente.',
        )
      } finally {
        setIsUserLoading(false)
      }
    },
    [],
  )

  const verifyAdminUser = useCallback(async () => {
    try {
      setIsUserLoading(true)
      const user = getUserInLocalStorage()

      if (!user) {
        setUser(null)
        return
      }

      addTokenToApi(user.token)

      setUser(user)
    } catch (error) {
      console.error('Erro ao verificar usuário administrador:', error)
      setUser(null)
    } finally {
      setIsUserLoading(false)
    }
  }, [])

  const verifyStudentUser = useCallback(async () => {
    try {
      setIsStudentLoading(true)
      const user = getUserInLocalStorage()

      if (!user) {
        setStudent(null)
        return
      }

      addTokenToApi(user.token)

      const student = await findStudentByCodeService(user.code)

      setUser(user)
      setStudent(student)
    } catch (error) {
      console.error('Erro ao verificar usuário estudante:', error)
      setStudent(null)
    } finally {
      setIsStudentLoading(false)
    }
  }, [])

  const verifyTeacherUser = useCallback(async () => {
    try {
      setIsTeacherLoading(true)
      const user = getUserInLocalStorage()

      if (!user) {
        setTeacher(null)
        return
      }

      addTokenToApi(user.token)

      const teacher = await findTeacherByCodeService(user.code)

      setUser(user)
      setTeacher(teacher)
    } catch (error) {
      console.error('Erro ao verificar usuário professor:', error)
      setTeacher(null)
    } finally {
      setIsTeacherLoading(false)
    }
  }, [])

  const verifyEmployeeUser = useCallback(async () => {
    try {
      setIsEmployeeLoading(true)
      const user = getUserInLocalStorage()

      if (!user) {
        setEmployee(null)
        return
      }

      addTokenToApi(user.token)

      const employee = await findEmployeeByCodeService(user.code)

      setUser(user)
      setEmployee(employee)
    } catch (error) {
      console.error('Erro ao verificar usuário funcionário:', error)
      setEmployee(null)
    } finally {
      setIsEmployeeLoading(false)
    }
  }, [])

  const signOut = useCallback(() => {
    setUser(null)
    removeTokenFromApi()
    removeUserInLocalStorage()
  }, [])

  const value = useMemo(
    () => ({
      user,
      isUserLoading,
      student,
      teacher,
      employee,
      isStudentLoading,
      isTeacherLoading,
      isEmployeeLoading,
      signIn,
      signOut,
      verifyAdminUser,
      verifyStudentUser,
      verifyTeacherUser,
      verifyEmployeeUser,
    }),
    [
      user,
      isUserLoading,
      student,
      teacher,
      employee,
      isStudentLoading,
      isTeacherLoading,
      isEmployeeLoading,
      signIn,
      signOut,
      verifyAdminUser,
      verifyStudentUser,
      verifyTeacherUser,
      verifyEmployeeUser,
    ],
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
