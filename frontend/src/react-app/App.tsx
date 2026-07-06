import { AppProviders } from '@/app/providers'
import { AppRouter } from '@/app/router'
import { ErrorBoundary } from '@/app/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <AppProviders>
        <AppRouter />
      </AppProviders>
    </ErrorBoundary>
  )
}

export default App
