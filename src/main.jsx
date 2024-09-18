import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'

import { router } from './routes/Routes'
import { Toaster } from 'react-hot-toast'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
    <HelmetProvider>
        <QueryClientProvider client={queryClient}>
            {/*<AuthProvider>*/}
                <RouterProvider router={router} />
                <Toaster />
            {/*</AuthProvider>*/}
        </QueryClientProvider>
    </HelmetProvider>
)
