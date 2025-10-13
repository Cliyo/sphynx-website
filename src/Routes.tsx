import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { NavigationBar } from 'components/NavigationBar'

import { Login } from 'pages/Auth/Login'

import { Locals } from 'pages/Locals/LocalsTable'

import { Access } from 'pages/Access'

import { Groups } from 'pages/Groups/GroupsTable'
import { GroupsCreate } from 'pages/Groups/GroupsCreate'

import { PrivateRoute } from 'components/PrivateRoute'
import { NotFound } from 'pages/NotFound'
import { LocalsCreate } from 'pages/Locals/LocalsCreate'
import { useContext } from 'react'
import { AuthContext } from 'contexts/AuthContext'
import { Users } from 'pages/Users/UsersTable'
import { UsersCreate } from 'pages/Users/UsersCreate'
import { Home } from 'pages/Home'
import { ForgotPassword } from 'pages/Auth/ForgotPassword'
import { SetNewPassword } from 'pages/Auth/SetNewPassword'
// import { Loading } from 'components/Loading'
// import { AlertContext } from 'contexts/AlertContext'
import { UnitsCreate } from 'pages/Units/UnitsCreate'
import { Units } from 'pages/Units/UnitsTable'

export const RouteApp = () => {
  const { user } = useContext(AuthContext)
  // const { isLoading } = useContext(AlertContext)

  const { isAuthenticated } = user

  return (
    <BrowserRouter>
      {isAuthenticated && <NavigationBar />}
      {/* <Loading isLoading={isLoading} /> */}
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/auth/login"
          element={isAuthenticated ? <Navigate to={'/'} replace /> : <Login />}
        />

        <Route
          path="/auth/password-recovery"
          element={
            isAuthenticated ? <Navigate to={'/'} replace /> : <ForgotPassword />
          }
        />

        <Route
          path="/auth/password-recovery/:id/:hash"
          element={
            isAuthenticated ? <Navigate to={'/'} replace /> : <SetNewPassword />
          }
        />

        <Route
          path="/units"
          element={
            <PrivateRoute>
              <Units />
            </PrivateRoute>
          }
        />

        <Route
          path="/units/new"
          element={
            <PrivateRoute>
              <UnitsCreate />
            </PrivateRoute>
          }
        />

        <Route
          path="/units/edit/:id"
          element={
            <PrivateRoute>
              <UnitsCreate />
            </PrivateRoute>
          }
        />

        <Route
          path="/users"
          element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          }
        />
        <Route
          path="/users/new"
          element={
            <PrivateRoute>
              <UsersCreate />
            </PrivateRoute>
          }
        />

        <Route
          path="/locals"
          element={
            <PrivateRoute>
              <Locals />
            </PrivateRoute>
          }
        />

        <Route
          path="/locals/new"
          element={
            <PrivateRoute>
              <LocalsCreate />
            </PrivateRoute>
          }
        />

        <Route
          path="/locals/edit/:id"
          element={
            <PrivateRoute>
              <LocalsCreate />
            </PrivateRoute>
          }
        />

        <Route
          path="/access"
          element={
            <PrivateRoute>
              <Access />
            </PrivateRoute>
          }
        />

        <Route
          path="/groups"
          element={
            <PrivateRoute>
              <Groups />
            </PrivateRoute>
          }
        />
        <Route
          path="/groups/new"
          element={
            <PrivateRoute>
              <GroupsCreate />
            </PrivateRoute>
          }
        />
        <Route
          path="/groups/edit/:id"
          element={
            <PrivateRoute>
              <GroupsCreate />
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={
            <PrivateRoute>
              <NotFound />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
