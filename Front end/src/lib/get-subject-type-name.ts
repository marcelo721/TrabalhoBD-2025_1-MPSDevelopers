import type { SubjectType } from '@/types/subjects'

export function getSubjectTypeName(type: SubjectType): string {
  if (type === 'OBLIGATORY') {
    return 'Obrigatória'
  } else if (type === 'OPTIONAL') {
    return 'Optativa'
  } else {
    return ''
  }
}
