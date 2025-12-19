import { Route, Routes } from "react-router-dom"
import Login from "./pages/login"
import Admin from "./pages/admin/Admin"
import User from "./pages/user/User"
import ProtectedRoute from "./ProtectedRoute"
import CreateAccount from "./pages/CreateAccount"

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path="/user" element={<User />} />
      </Routes>
    </div>
  )
}

export default App
