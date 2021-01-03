import { BrowserRouter, Route } from 'react-router-dom'
import { AuthProvider } from './Auth';
import Landing from './pages/Landing'
import Chat from './pages/Chat'
import PrivateRoute from './PrivateRoute'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Route exact path="/" component={Landing} />
        <PrivateRoute exact path="/chat" component={Chat} />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
