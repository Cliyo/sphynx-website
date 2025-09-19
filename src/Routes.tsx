import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { NavigationBar } from 'components/NavigationBar'

import { Login } from 'pages/Login'

import { Customers } from 'pages/Customers/CustomersTable'
import { CustomersCreate } from 'pages/Customers/CustomersCreate'

import { Locals } from 'pages/Locals/LocalsTable'

import { Access } from 'pages/Access'

import { Groups } from 'pages/Groups/GroupsTable'
import { GroupsCreate } from 'pages/Groups/GroupsCreate'

import { useAuth } from 'hooks/useAuth'

import { PrivateRoute } from 'components/PrivateRoute'
import { NotFound } from 'pages/NotFound'
import { LocalsCreate } from 'pages/Locals/LocalsCreate'

export const RouteApp = () => {
  const { user } = useAuth()

  const { isAuthenticated } = user

  return (
    <BrowserRouter>
      {isAuthenticated && <NavigationBar />}
      <Routes>
        <Route
          path="/"
          element={
            <Navigate to={isAuthenticated ? '/customers' : '/auth/login'} />
          }
        />

        <Route
          path="/auth/login"
          element={
            isAuthenticated ? <Navigate to={'/customers'} replace /> : <Login />
          }
        />

        <Route
          path="/customers"
          element={
            <PrivateRoute>
              <Customers />
            </PrivateRoute>
          }
        />
        <Route
          path="/customers/new"
          element={
            <PrivateRoute>
              <CustomersCreate />
            </PrivateRoute>
          }
        />
        <Route
          path="/customers/edit/:id"
          element={
            <PrivateRoute>
              <CustomersCreate />
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
