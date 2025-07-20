import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './theme/global.css'
import { RouterProvider } from 'react-router'
import { router } from './routes/router'
import { Toaster } from './components/ui/sonner'
import { UserProvider } from './contexts/user/user-provider'

import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/query-client'
import { ThemeProvider } from './contexts/theme-provider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ThemeProvider defaultTheme="light" storageKey="uniufc@theme">
          <RouterProvider router={router} />
          <Toaster richColors />
        </ThemeProvider>
      </UserProvider>
    </QueryClientProvider>
  </StrictMode>,
)
