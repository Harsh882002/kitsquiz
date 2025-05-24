import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import SuperAdmin from '../pages/Admin/SuperAdmin'
import Institute from '../pages/Institute/Institute'
import Teacher from '../pages/Teacher/Teacher'
import AddTeacherForm from '../otherComponent/AddTeacher'
import AddInstituteForm from '../otherComponent/AddInstitute'
import DashBoard from '../DashBoard'
import ProtectedRoute from './ProtectedRoute'
import CreateTestForm from '../otherComponent/CreateTest'
import StudentForm from '../student/StudentForm'
import TestPage from '../student/StudentTestPage'
import StudentResultPage from '../student/StudentResultPage'
import InstructionsPage from '../student/StudentInstruction'
import StudentList from '../pages/Teacher/component/StudentList'

const RoutingComponent = () => {
    return (

        <Routes>
            <Route
                path='/'
                element={<Login />}
            />

            <Route
                path='/dashboard'
                element={
                    <ProtectedRoute>
                        <DashBoard />
                    </ProtectedRoute>
                }
            />

            <Route
                path='/superadmin'

                element={
                    <ProtectedRoute>
                        <SuperAdmin />
                    </ProtectedRoute>
                }
            />

            <Route
                path='/institute'
                element={
                    <ProtectedRoute>
                        <Institute />
                    </ProtectedRoute>
                }
            />

            <Route
                path='/teacher'
                element={
                    <ProtectedRoute>
                        <Teacher />
                    </ProtectedRoute>
                }
            />

            <Route
                path='/addinstitute'
                element={
                    <ProtectedRoute>
                        <AddInstituteForm />
                    </ProtectedRoute>
                }
            />

            <Route
                path='/addteacher'
                element={
                    <ProtectedRoute>
                        <AddTeacherForm />
                    </ProtectedRoute>
                }
            />

            <Route
                path='createtest'
                element={
                    <ProtectedRoute>
                        <CreateTestForm />
                    </ProtectedRoute>
                }
            />

            <Route
                path='studentform'
                element={
                    <StudentForm />
                }
            />

            <Route
                path='test/:testCode'
                element={

                    <StudentForm />

                }
            />


            <Route
                path='test/:testcode/instuctions'
                element={
                    <InstructionsPage />
                }
            />

            <Route
                path='test/start/:testCode'
                element={
                    <TestPage />
                }
            />

            <Route
                path='/test/:testCode/results'
                element={

                    <StudentResultPage />

                }
            />

            <Route
                path='/dashboard/test/:testcode'
                element={
                    <ProtectedRoute>
                        <StudentList />
                    </ProtectedRoute>
                }
            />
        </Routes>

    )
}

export default RoutingComponent
