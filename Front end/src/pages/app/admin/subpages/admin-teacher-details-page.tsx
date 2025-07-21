import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { Copy, Info, Trash } from 'lucide-react'
import { useNavigate, useParams } from 'react-router'
import AlertDialog from '@/components/alert-dialog'
import { useClipboard } from '@/hooks/use-clipboard'
import { findTeacherByCode } from '@/services/teacher/find-teacher-by-code'
import { deleteTeacherService } from '@/services/teacher/delete-teacher-service'
import { useCallback } from 'react'
import { toast } from 'sonner'
import { TeacherInformationDialog } from '@/components/dialogs/teacher-information-dialog'
import { CardSkeleton } from '../components/card-skeleton'
import { StudentCard } from '../components/student-card'
import { SubjectCard } from '../components/subject-card'

export function AdminTeacherDetailsPage() {
  const navigate = useNavigate()
  const { copyToClipboard } = useClipboard()
  const { teacherId } = useParams<{ teacherId: string }>()

  const { data: teacher, isPending: isTeacherPending } = useQuery({
    queryKey: ['teacher', teacherId],
    queryFn: () => findTeacherByCode({ code: Number(teacherId) }),
  })

  const handleDeleteTeacher = useCallback(async () => {
    try {
      await deleteTeacherService(teacherId!)

      navigate('/admin/teachers')

      toast.success('Professor excluído com sucesso.')
    } catch (error) {
      toast.error('Erro ao excluir o professor.')
      console.error('Error deleting teacher:', error)
    }
  }, [teacherId, navigate])

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col items-start justify-center">
          <span className="text-xs uppercase">Professor:</span>
          <h1 className="font-heading text-3xl font-bold">{teacher?.name}</h1>
          <div className="flex gap-1">
            {teacher?.id && (
              <>
                <button
                  className="text-accent-foreground bg-accent border-border flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs leading-tight uppercase"
                  onClick={() => copyToClipboard(teacher.id.toString())}
                >
                  <span>Código: {teacher?.id}</span>

                  <Copy className="size-2.5" />
                </button>
                <TeacherInformationDialog teacher={teacher}>
                  <button className="text-accent-foreground bg-accent border-border flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs leading-tight uppercase">
                    <span>+ info</span>

                    <Info className="size-2.5" />
                  </button>
                </TeacherInformationDialog>
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
            onAction={handleDeleteTeacher}
          >
            <Button variant="outline">
              <Trash className="text-destructive size-4" />
            </Button>
          </AlertDialog>
        </div>
      </div>
      <div className="flex w-full flex-col gap-2">
        <div className="flex w-full items-center justify-between">
          <h2 className="font-heading text-xl font-semibold">Pós-graduandos</h2>
        </div>
        <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(8rem,18rem))] gap-4">
          {isTeacherPending ? (
            Array.from({ length: 4 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
          ) : teacher && teacher?.advisees && teacher.advisees.length > 0 ? (
            teacher?.advisees.map((student) => (
              <StudentCard
                key={student.code}
                student={student}
                to={`/admin/students/${student.code}`}
              />
            ))
          ) : (
            <div className="text-muted-foreground w-full">
              Nenhum pós-graduando encontrado.
            </div>
          )}
        </div>
      </div>
      <div className="flex w-full flex-col gap-2">
        <div className="flex w-full items-center justify-between">
          <h2 className="font-heading text-xl font-semibold">Disciplinas</h2>
        </div>
        <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(8rem,18rem))] gap-4">
          {isTeacherPending ? (
            Array.from({ length: 4 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
          ) : teacher && teacher?.subjects && teacher.subjects.length > 0 ? (
            teacher?.subjects.map((subject) => (
              <SubjectCard
                key={subject.code}
                subject={subject}
                to={`/admin/subjects/${subject.code}`}
              />
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
