import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { UserContext } from './user-context'
import {
  signInService,
  type SignInServiceRequest,
} from '@/services/auth/sign-in-service'
import { saveToken } from '@/storage/token/save-token'
import { addTokenToApi } from '@/utils/api/add-token-to-api'
import type { User } from '@/types/user'
import { getToken } from '@/storage/token/get-token'
import { getUserData } from '@/services/user/get-user-data'
import { api } from '@/services/api'
import { removeToken } from '@/storage/token/remove-token'
import { removeTokenFromApi } from '@/utils/api/remove-token-from-api'

export type UserContextProps = {
  user?: User | null
  isUserLoading: boolean
  signIn: (data: SignInServiceRequest) => Promise<User>
  signOut: () => void
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [isUserLoading, setIsUserLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  const signIn = useCallback(
    async ({ code, password }: SignInServiceRequest) => {
      try {
        setIsUserLoading(true)
        const userData = await signInService({ code, password })

        saveToken(userData.token)
        addTokenToApi(userData.token)

        const user: User = {
          username: userData.username,
          role: userData.role,
        }

        setUser(user)

        return user
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

  const signOut = useCallback(() => {
    setUser(null)
    removeToken()
    removeTokenFromApi()
  }, [])

  const verifyToken = useCallback(async () => {
    try {
      setIsUserLoading(true)

      const token = getToken()

      console.log('Token verificado:', token)

      if (!token) {
        setUser(null)
        return
      }

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      const userData = await getUserData()

      console.log('Dados do usuário verificado:', userData)

      if (!userData) {
        setUser(null)
        return
      }

      const user: User = {
        username: userData.roleData.login,
        role: userData.role,
      }

      setUser(user)
    } catch (error) {
      console.error('Erro ao verificar token:', error)
      setUser(null)
    } finally {
      setIsUserLoading(false)
    }
  }, [])

  useEffect(() => {
    verifyToken()
  }, [verifyToken])

  const value = useMemo(
    () => ({
      user,
      isUserLoading,
      signIn,
      signOut,
    }),
    [signIn, user, isUserLoading, signOut],
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
