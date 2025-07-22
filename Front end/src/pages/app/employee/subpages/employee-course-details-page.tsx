import { useQuery } from '@tanstack/react-query'
import { Copy } from 'lucide-react'
import { useParams } from 'react-router'
import { useClipboard } from '@/hooks/use-clipboard'

import { InfoPill } from '@/components/info-pill'
import { findCourseByCodeService } from '@/services/course/fint-course-by-code'
import { CardSkeleton } from '../../components/card-skeleton'
import { SubjectCard } from '../../components/subject-card'
import { StudentCard } from '../../components/student-card'

export function EmployeeCourseDetailsPage() {
  const { copyToClipboard } = useClipboard()
  const { courseId } = useParams<{ courseId: string }>()

  const { data: course, isPending: isCourseLoading } = useQuery({
    queryKey: ['employee', 'course', courseId],
    queryFn: () => findCourseByCodeService(courseId!),
    enabled: !!courseId,
  })

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
                isLinkDisabled
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
                isLinkDisabled
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
