import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useUser } from '@/hooks/contexts/use-user'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'

const signInFormSchema = z.object({
  username: z
    .string({
      required_error: 'A matrícula é obrigatória',
    })
    .min(1, {
      message: 'A matrícula não pode estar vazia',
    }),
  password: z
    .string({
      required_error: 'A senha é obrigatória',
    })
    .min(4, 'A senha deve ter pelo menos 4 caracteres'),
})

type SignInFormData = z.infer<typeof signInFormSchema>

export function SignIn() {
  const navigate = useNavigate()

  const { signIn, user, isUserLoading, student, employee } = useUser()

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInFormSchema),
  })

  const handleSignIn = async ({ password, username }: SignInFormData) => {
    try {
      const userData = await signIn({
        code: username,
        password,
      })

      toast.success('Login realizado com sucesso!')

      navigate(`/${userData.role.toLowerCase()}`)
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      toast.error(
        'Não foi possível realizar o login. Verifique suas credenciais e tente novamente.',
      )
    }
  }

  useEffect(() => {
    if (!isUserLoading && user && (student || employee)) {
      navigate(`/${user.role.toLowerCase()}`)
    }
  }, [navigate, user, isUserLoading, student, employee])

  return (
    <section className="w-full">
      <h1 className="font-heading text-4xl font-bold">Entrar</h1>
      <p className="text-muted-foreground w-4/5 text-sm">
        Entre com sua matrícula e senha para acessar sua conta.
      </p>
      <Form {...form}>
        <form
          className="mt-4 flex w-full flex-col gap-4"
          onSubmit={form.handleSubmit(handleSignIn)}
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome de Usuário</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: mariasilva" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Ex: 123456" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <fieldset className="flex w-full flex-col gap-1">
            <Button className="w-full">Entrar</Button>
          </fieldset>
        </form>
      </Form>
    </section>
  )
}
