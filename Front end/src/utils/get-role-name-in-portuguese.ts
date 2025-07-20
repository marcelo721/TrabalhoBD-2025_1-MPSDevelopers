export function getRoleNameInPortuguese(role: string): string {
  switch (role) {
    case 'TEACHER':
      return 'Professor'
    case 'EMPLOYEE':
      return 'Empregado'
    case 'STUDENT':
      return 'Estudante'
    case 'ADMIN':
      return 'Administrador'
    default:
      return 'Desconhecido'
  }
}
