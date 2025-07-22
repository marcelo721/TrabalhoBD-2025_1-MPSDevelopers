import { createBrowserRouter } from 'react-router'
import { Home } from '../pages/app/home'
import { AppLayout } from '../pages/app/app-layout'
import { AuthLayout } from '../pages/auth/auth-layout'
import { SignIn } from '../pages/auth/sign-in'
import { TeacherPage } from '@/pages/app/teacher'
import { StudentPage } from '@/pages/app/student'
import { EmployeePage } from '@/pages/app/employee'

import { AdminDepartmentsPage } from '@/pages/app/admin/subpages/admin-departments-page'
import { AdminDepartmentDetailsPage } from '@/pages/app/admin/subpages/admin-department-details-page'
import { AdminTeacherPage } from '@/pages/app/admin/subpages/admin-teacher-page'
import { AdminTeacherDetailsPage } from '@/pages/app/admin/subpages/admin-teacher-details-page'
import { AdminEmployeesPage } from '@/pages/app/admin/subpages/admin-employees-page'
import { AdminCoursesPage } from '@/pages/app/admin/subpages/admin-courses-page'
import { AdminCourseDetailsPage } from '@/pages/app/admin/subpages/admin-course-details-page'
import { AdminStudentsPage } from '@/pages/app/admin/subpages/admin-student-page'
import { AdminStudentDetailsPage } from '@/pages/app/admin/subpages/admin-student-details-page'
import { AdminSubjectPage } from '@/pages/app/admin/subpages/admin-subjects-page'
import { AdminSubjectDetailsPage } from '@/pages/app/admin/subpages/admin-subject-details-page'
import { AdminPage } from '@/pages/app/admin'
import { EmployeeDepartmentPage } from '@/pages/app/employee/subpages/employee-department-page'
import { EmployeeTeachersPage } from '@/pages/app/employee/subpages/employee-teacher-page'
import { EmployeeCoursesPage } from '@/pages/app/employee/subpages/employee-courses-page'
import { EmployeeCourseDetailsPage } from '@/pages/app/employee/subpages/employee-course-details-page'
import { EmployeeTeacherDetailsPage } from '@/pages/app/employee/subpages/employee-teacher-details-page'
import { TeacherSubjectsPage } from '@/pages/app/teacher/subjects'
import { TeacherSubjectDetailsPage } from '@/pages/app/teacher/subject'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        index: true,
        element: <Home />,
      },
      {
        path: '/teacher',
        element: <TeacherPage />,
        children: [
          {
            path: '/teacher',
            element: <TeacherSubjectsPage />,
          },
          {
            path: '/teacher/subject/:subjectId',
            element: <TeacherSubjectDetailsPage />,
          },
        ],
      },
      {
        path: '/student',
        element: <StudentPage />,
      },
      {
        path: '/admin',
        element: <AdminPage />,
        children: [
          {
            path: '/admin/students',
            element: <AdminStudentsPage />,
          },
          {
            path: '/admin/students/:studentId',
            element: <AdminStudentDetailsPage />,
          },
          {
            path: '/admin/teachers',
            element: <AdminTeacherPage />,
          },
          {
            path: '/admin/teachers/:teacherId',
            element: <AdminTeacherDetailsPage />,
          },
          {
            path: '/admin/departments',
            element: <AdminDepartmentsPage />,
          },
          {
            path: '/admin/departments/:departmentId',
            element: <AdminDepartmentDetailsPage />,
          },
          {
            path: '/admin/employees',
            element: <AdminEmployeesPage />,
          },
          {
            path: '/admin/courses',
            element: <AdminCoursesPage />,
          },
          {
            path: '/admin/courses/:courseId',
            element: <AdminCourseDetailsPage />,
          },
          {
            path: '/admin/subjects',
            element: <AdminSubjectPage />,
          },
          {
            path: '/admin/subjects/:subjectId',
            element: <AdminSubjectDetailsPage />,
          },
          {
            path: '/admin/*',
            element: <p>Marcelin</p>,
          },
        ],
      },
      {
        path: '/employee',
        element: <EmployeePage />,
        children: [
          {
            path: '/employee/department',
            element: <EmployeeDepartmentPage />,
          },
          {
            path: '/employee/teachers',
            element: <EmployeeTeachersPage />,
          },
          {
            path: '/employee/teachers/:teacherId',
            element: <EmployeeTeacherDetailsPage />,
          },
          {
            path: '/employee/courses',
            element: <EmployeeCoursesPage />,
          },
          {
            path: '/employee/courses/:courseId',
            element: <EmployeeCourseDetailsPage />,
          },
        ],
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/entrar',
        element: <SignIn />,
      },
    ],
  },
])
