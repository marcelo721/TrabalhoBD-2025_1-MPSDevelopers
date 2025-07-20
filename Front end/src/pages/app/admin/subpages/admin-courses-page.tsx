import { useQuery } from '@tanstack/react-query'

import { CourseCard } from '../components/course-card'
import { findAllCoursesService } from '@/services/course/find-all-courses-service'
import { CreateCourseDialog } from '@/components/dialogs/create-course-dialog'

export function AdminCoursesPage() {
  const { data: courses } = useQuery({
    queryKey: ['courses'],
    queryFn: () => findAllCoursesService(),
  })

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <h1 className="font-heading text-4xl font-bold">Cursos</h1>

        <CreateCourseDialog />
      </div>
      <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-4">
        {courses?.map((course) => (
          <CourseCard key={course.code} course={course} />
        ))}
      </div>
    </>
  )
}
