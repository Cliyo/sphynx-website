import { Bounce, ToastContainer } from 'react-toastify'
import { ThemeProvider } from 'styled-components'

import { theme } from 'themes'

import { RouteApp } from 'Routes'

import { AlertContextProvider } from 'contexts/AlertContext'
import { AuthContextProvider } from 'contexts/AuthContext'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AlertContextProvider>
        <AuthContextProvider>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            theme="light"
            transition={Bounce}
          />
          <RouteApp />
        </AuthContextProvider>
      </AlertContextProvider>
    </ThemeProvider>
  )
}

export default App
