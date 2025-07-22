import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { Copy, Trash } from 'lucide-react'
import { useNavigate, useParams } from 'react-router'
import AlertDialog from '@/components/alert-dialog'
import { useClipboard } from '@/hooks/use-clipboard'

import { useCallback } from 'react'
import { toast } from 'sonner'
import { InfoPill } from '@/components/info-pill'
import { findCourseByCodeService } from '@/services/course/fint-course-by-code'
import { deleteCourseService } from '@/services/course/delete-course-service'
import { CardSkeleton } from '../../components/card-skeleton'
import { SubjectCard } from '../../components/subject-card'
import { StudentCard } from '../../components/student-card'
import { CreateUndergraduateStudentInCourseDialog } from '@/components/dialogs/create-undergraduate-student-in-course-dialog'
import { CreatePostgraduateStudentInCourseDialog } from '@/components/dialogs/create-postgraduate-student-in-course-dialog'

export function AdminCourseDetailsPage() {
  const navigate = useNavigate()
  const { copyToClipboard } = useClipboard()
  const { courseId } = useParams<{ courseId: string }>()

  const { data: course, isPending: isCourseLoading } = useQuery({
    queryKey: ['course', courseId],
    queryFn: () => findCourseByCodeService(courseId!),
    enabled: !!courseId,
  })

  const handleDeleteCourse = useCallback(async () => {
    try {
      await deleteCourseService(courseId!)

      navigate('/admin/courses')

      toast.success('Curso excluído com sucesso.')
    } catch (error) {
      toast.error('Não foi possível excluir o curso.')
      console.error('Error deleting course:', error)
    }
  }, [navigate, courseId])

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col items-start justify-center">
          <span className="text-xs uppercase">Curso:</span>
          <h1 className="font-heading text-3xl font-bold">{course?.name}</h1>
          <div className="flex gap-1">
            {course?.department && (
              <InfoPill
                label="Código"
                value={course.code}
                icon={<Copy />}
                onClick={() =>
                  copyToClipboard(
                    String(course.code),
                    'Código do curso copiado!',
                  )
                }
              />
            )}
            {course?.department && (
              <InfoPill
                label="Departamento"
                value={course.department.name}
                icon={<Copy />}
                onClick={() =>
                  copyToClipboard(
                    String(course.department.code),
                    'Código do departamento copiado!',
                  )
                }
              />
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <AlertDialog
            actionText="Excluir"
            cancelText="Cancelar"
            title="Excluir curso"
            description="Você tem certeza que deseja excluir este curso? Esta ação não pode ser desfeita."
            onAction={handleDeleteCourse}
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
        </div>
        <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4">
          {isCourseLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
          ) : course && course?.subjects && course?.subjects.length > 0 ? (
            course?.subjects.map((subject) => (
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
      <div className="flex w-full flex-col gap-2">
        <div className="flex w-full items-center justify-between">
          <h2 className="font-heading text-xl font-semibold">Estudantes</h2>

          {course?.code && (
            <div className="flex gap-1">
              <CreateUndergraduateStudentInCourseDialog
                courseCode={course.code}
              />
              <CreatePostgraduateStudentInCourseDialog
                courseCode={course.code}
              />
            </div>
          )}
        </div>
        <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4">
          {isCourseLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
          ) : course && course?.students && course?.students.length > 0 ? (
            course?.students.map((student) => (
              <StudentCard
                key={student.code}
                student={student}
                to={`/admin/students/${student.code}`}
              />
            ))
          ) : (
            <div className="text-muted-foreground w-full">
              Nenhum estudante encontrado.
            </div>
          )}
        </div>
      </div>
    </>
  )
}
