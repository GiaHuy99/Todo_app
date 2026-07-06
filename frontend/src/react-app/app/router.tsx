import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ROUTES } from '@/shared/constants/routes'
import { TodoPage } from '@/features/todo/pages/TodoPage'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.todos} element={<TodoPage />} />
      </Routes>
    </BrowserRouter>
  )
}
