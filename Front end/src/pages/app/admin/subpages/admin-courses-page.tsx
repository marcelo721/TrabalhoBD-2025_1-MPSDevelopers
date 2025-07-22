import { useQuery } from '@tanstack/react-query'

import { findAllCoursesService } from '@/services/course/find-all-courses-service'
import { CreateCourseDialog } from '@/components/dialogs/create-course-dialog'
import { CourseCard } from '../../components/course-card'
import { CardSkeleton } from '../../components/card-skeleton'

export function AdminCoursesPage() {
  const { data: courses, isPending: isCoursesPending } = useQuery({
    queryKey: ['courses'],
    queryFn: () => findAllCoursesService(),
  })

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <h1 className="font-heading text-4xl font-bold">Cursos</h1>

        <CreateCourseDialog />
      </div>
      <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4">
        {isCoursesPending ? (
          Array.from({ length: 4 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))
        ) : courses && courses.length > 0 ? (
          courses?.map((course) => (
            <CourseCard key={course.code} course={course} />
          ))
        ) : (
          <div className="text-muted-foreground w-full">
            Nenhum curso encontrado.
          </div>
        )}
      </div>
    </>
  )
}
