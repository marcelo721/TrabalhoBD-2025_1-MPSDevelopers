import { useQuery } from '@tanstack/react-query'

import { CourseCard } from '../../components/course-card'
import { useUser } from '@/hooks/contexts/use-user'
import { findAllCoursesByDepartmentCodeService } from '@/services/course/find-all-courses-by-department-code'
import { CreateCourseInDepartmentDialog } from '@/components/dialogs/create-course-in-department'
import { CardSkeleton } from '../../components/card-skeleton'

export function EmployeeCoursesPage() {
  const { employee } = useUser()
  const { data: courses, isLoading: isLoadingCourses } = useQuery({
    queryKey: ['employee', 'courses', employee?.department?.code],
    queryFn: () =>
      findAllCoursesByDepartmentCodeService(employee?.department?.code || ''),
    enabled: !!employee?.department?.code,
  })

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <h1 className="font-heading text-4xl font-bold">Cursos</h1>
        {employee?.department && (
          <CreateCourseInDepartmentDialog department={employee?.department} />
        )}
      </div>
      <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4">
        {isLoadingCourses ? (
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
