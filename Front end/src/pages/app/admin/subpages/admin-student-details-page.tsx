import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { Copy, Info, Trash } from 'lucide-react'
import { useNavigate, useParams } from 'react-router'
import AlertDialog from '@/components/alert-dialog'
import { useClipboard } from '@/hooks/use-clipboard'

import { useCallback } from 'react'
import { toast } from 'sonner'
import { findStudentByCodeService } from '@/services/students/find-student-by-code-service'
import { deleteStudentService } from '@/services/students/delete-student-service'
import { StudentInformationDialog } from '@/components/dialogs/student-information-dialog'
import { CardSkeleton } from '../../components/card-skeleton'
import { SubjectNameCard } from '../../components/subject-name-card'
import { CreateEnrollmentInStudentDialog } from '@/components/dialogs/create-enrollment-in-student-dialog'

export function AdminStudentDetailsPage() {
  const navigate = useNavigate()
  const { copyToClipboard } = useClipboard()
  const { studentId } = useParams<{ studentId: string }>()

  const { data: student, isPending: isStudentPending } = useQuery({
    queryKey: ['student', studentId],
    queryFn: () => findStudentByCodeService(studentId!),
    enabled: !!studentId,
  })

  const handleDeleteStudent = useCallback(async () => {
    try {
      await deleteStudentService(studentId!)

      navigate('/admin/students')

      toast.success('Professor excluído com sucesso.')
    } catch (error) {
      toast.error('Erro ao excluir o professor.')
      console.error('Error deleting student:', error)
    }
  }, [studentId, navigate])

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col items-start justify-center">
          <span className="text-xs uppercase">Estudante:</span>
          <h1 className="font-heading text-3xl font-bold">{student?.name}</h1>
          <div className="flex gap-1">
            {student?.code && (
              <>
                <button
                  className="text-accent-foreground bg-accent border-border flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs leading-tight uppercase"
                  onClick={() => copyToClipboard(student.code.toString())}
                >
                  <span>Código: {student?.code}</span>

                  <Copy className="size-2.5" />
                </button>
                <StudentInformationDialog student={student}>
                  <button className="text-accent-foreground bg-accent border-border flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs leading-tight uppercase">
                    <span>+ info</span>

                    <Info className="size-2.5" />
                  </button>
                </StudentInformationDialog>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <AlertDialog
            actionText="Excluir"
            cancelText="Cancelar"
            title="Excluir Estudante"
            description="Você tem certeza que deseja excluir este estudante? Esta ação não pode ser desfeita."
            onAction={handleDeleteStudent}
          >
            <Button variant="outline">
              <Trash className="text-destructive size-4" />
            </Button>
          </AlertDialog>
        </div>
      </div>

      <div className="flex w-full flex-col gap-2">
        <div className="flex w-full items-center justify-between">
          <h2 className="font-heading text-xl font-semibold">Disciplinas</h2>

          {student?.code && (
            <CreateEnrollmentInStudentDialog studentId={student.code} />
          )}
        </div>
        <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4">
          {isStudentPending ? (
            Array.from({ length: 4 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
          ) : student &&
            student?.subjectsName &&
            student.subjectsName.length > 0 ? (
            student?.subjectsName.map((subject) => (
              <SubjectNameCard key={subject} subjectName={subject} />
            ))
          ) : (
            <div className="text-muted-foreground w-full">
              Nenhuma disciplina encontrada.
            </div>
          )}
        </div>
      </div>
    </>
  )
}
