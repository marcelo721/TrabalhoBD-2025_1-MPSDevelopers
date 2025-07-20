import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { Copy, Trash } from 'lucide-react'
import { useNavigate, useParams } from 'react-router'
import AlertDialog from '@/components/alert-dialog'
import { useClipboard } from '@/hooks/use-clipboard'

import { useCallback } from 'react'
import { toast } from 'sonner'

import { CardSkeleton } from '../components/card-skeleton'
import { findSubjectByCodeService } from '@/services/subjects/find-subject-by-code-service'
import { deleteSubjectService } from '@/services/subjects/delete-subject-service'
import { InfoPill } from '@/components/info-pill'
import { getSubjectTypeName } from '@/lib/get-subject-type-name'
import { CourseCard } from '../components/course-card'
import { SubjectCard } from '../components/subject-card'
import { findAllEnrollmentService } from '@/services/enrollment/find-all-enrollments-service'
import { StudentCard } from '../components/student-card'
import { CreateEnrollmentInSubjectDialog } from '@/components/dialogs/create-enrollment-in-subject-dialog'

export function AdminSubjectDetailsPage() {
  const navigate = useNavigate()
  const { copyToClipboard } = useClipboard()
  const { subjectId } = useParams<{ subjectId: string }>()

  const { data: subject, isPending: isSubjectPending } = useQuery({
    queryKey: ['subject', subjectId],
    queryFn: () => findSubjectByCodeService(subjectId!),
  })
  const { data: enrollments, isPending: isEnrollmentPending } = useQuery({
    queryKey: ['enrollments'],
    queryFn: () => findAllEnrollmentService(),
  })

  const handleDeleteSubject = useCallback(async () => {
    try {
      await deleteSubjectService(subjectId!)

      navigate('/admin/subjects')

      toast.success('Disciplina excluída com sucesso.')
    } catch (error) {
      toast.error('Erro ao excluir a disciplina.')
      console.error('Error deleting subject:', error)
    }
  }, [subjectId, navigate])

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col items-start justify-center">
          <span className="text-xs uppercase">Disciplina:</span>
          <h1 className="font-heading text-3xl font-bold">{subject?.name}</h1>
          <div className="flex gap-1">
            {subject?.code && (
              <>
                <InfoPill
                  label="Código"
                  value={subject.code}
                  icon={<Copy />}
                  onClick={() =>
                    copyToClipboard(
                      String(subject.code),
                      'Código da disciplina copiado!',
                    )
                  }
                />
                <InfoPill label="Créditos" value={subject.credits} />
                <InfoPill
                  label="Tipo"
                  value={getSubjectTypeName(subject.typeSubject)}
                />
                {/* <SubjectInformationDialog subject={subject}>
                  <button className="text-accent-foreground bg-accent border-border flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs leading-tight uppercase">
                    <span>+ info</span>

                    <Info className="size-2.5" />
                  </button>
                </SubjectInformationDialog> */}
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <AlertDialog
            actionText="Excluir"
            cancelText="Cancelar"
            title="Excluir professor"
            description="Você tem certeza que deseja excluir este professor? Esta ação não pode ser desfeita."
            onAction={handleDeleteSubject}
          >
            <Button variant="outline">
              <Trash className="text-destructive size-4" />
            </Button>
          </AlertDialog>
        </div>
      </div>

      <div className="flex w-full flex-col gap-2">
        <div className="flex w-full items-center justify-between">
          <h2 className="font-heading text-xl font-semibold">Curso</h2>
        </div>
        <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(8rem,18rem))] gap-4">
          {subject?.course && <CourseCard course={subject?.course} />}
        </div>
      </div>

      <div className="flex w-full flex-col gap-2">
        <div className="flex w-full items-center justify-between">
          <h2 className="font-heading text-xl font-semibold">
            Estudantes Matriculados
          </h2>

          {subject?.code && (
            <CreateEnrollmentInSubjectDialog subjectId={subject.code} />
          )}
        </div>
        <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(8rem,18rem))] gap-4">
          {isEnrollmentPending ? (
            Array.from({ length: 4 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
          ) : enrollments && enrollments.length > 0 ? (
            enrollments
              ?.filter(
                (enrollment) => enrollment.subject.code === subject?.code,
              )
              .map((enrollment) => (
                <StudentCard
                  to={`/admin/students/${enrollment.student.code}`}
                  key={enrollment.student.code}
                  student={enrollment.student}
                />
              ))
          ) : (
            <div className="text-muted-foreground w-full">
              Nenhum estudante matriculado encontrado.
            </div>
          )}
        </div>
      </div>
      <div className="flex w-full flex-col gap-2">
        <div className="flex w-full items-center justify-between">
          <h2 className="font-heading text-xl font-semibold">Pré-requisitos</h2>
        </div>
        <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(8rem,18rem))] gap-4">
          {isSubjectPending ? (
            Array.from({ length: 4 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
          ) : subject &&
            subject?.prerequisites &&
            subject.prerequisites.length > 0 ? (
            subject?.prerequisites.map((prerequisite) => (
              <SubjectCard
                key={prerequisite.code}
                subject={prerequisite}
                to={`/admin/subjects/${prerequisite.code}`}
              />
            ))
          ) : (
            <div className="text-muted-foreground w-full">
              Nenhum pré-requisito encontrado.
            </div>
          )}
        </div>
      </div>
      <div className="flex w-full flex-col gap-2">
        <div className="flex w-full items-center justify-between">
          <h2 className="font-heading text-xl font-semibold">
            Disciplinas Dependentes
          </h2>
        </div>
        <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(8rem,18rem))] gap-4">
          {isSubjectPending ? (
            Array.from({ length: 4 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
          ) : subject &&
            subject?.dependentSubjects &&
            subject.dependentSubjects.length > 0 ? (
            subject?.dependentSubjects.map((subject) => (
              <SubjectCard
                key={subject.code}
                subject={subject}
                to={`/admin/subjects/${subject.code}`}
              />
            ))
          ) : (
            <div className="text-muted-foreground w-full">
              Nenhum disciplina dependente encontrada.
            </div>
          )}
        </div>
      </div>
    </>
  )
}
