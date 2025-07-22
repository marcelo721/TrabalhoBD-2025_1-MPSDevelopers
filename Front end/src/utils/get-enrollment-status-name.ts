import type { EnrollmentType } from '@/types/enrollment'

export function getEnrollmentStatusName(status: EnrollmentType) {
  switch (status) {
    case 'IN_PROGRESS':
      return 'Ativa'
    case 'FINISHED':
      return 'Finalizada'
    default:
      return 'Desconhecida'
  }
}
