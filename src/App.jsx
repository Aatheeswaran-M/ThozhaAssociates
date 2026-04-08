import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

const AdminPage = lazy(() => import('@/pages/AdminPage'))
const HomePage = lazy(() => import('@/pages/HomePage'))

function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="grid min-h-screen place-items-center bg-canvas text-ink">
            <div className="space-y-3 text-center">
              <p className="font-display text-3xl font-semibold">Thozha Associates</p>
              <p className="text-slate-600">Loading site experience...</p>
            </div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
