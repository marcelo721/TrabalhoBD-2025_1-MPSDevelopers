import { useUser } from '@/hooks/contexts/use-user'
import { CardSkeleton } from '../components/card-skeleton'
import { SubjectCard } from '../components/subject-card'
import { StudentCard } from '../components/student-card'

export function TeacherSubjectsPage() {
  const { isTeacherLoading, teacher } = useUser()

  return (
    <>
      <div className="flex w-full flex-col gap-2">
        <div className="flex w-full items-center justify-between">
          <h2 className="font-heading text-xl font-semibold">Disciplinas</h2>
        </div>
        <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4">
          {isTeacherLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
          ) : teacher?.subjects && teacher.subjects.length > 0 ? (
            teacher.subjects.map((subject) => (
              <SubjectCard
                subject={subject}
                key={subject.code}
                to={`/teacher/subject/${subject.code}`}
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
          <h2 className="font-heading text-xl font-semibold">Pós-graduandos</h2>
        </div>
        <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4">
          {isTeacherLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
          ) : teacher?.advisees && teacher.advisees.length > 0 ? (
            teacher.advisees.map((student) => (
              <StudentCard
                student={student}
                key={student.code}
                isLinkDisabled
              />
            ))
          ) : (
            <div className="text-muted-foreground w-full">
              Nenhum aluno encontrado.
            </div>
          )}
        </div>
      </div>
    </>
  )
}
