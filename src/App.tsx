import { AuthProvider, useAuth } from "./context/AuthContext";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Login, Dashboard } from "./screen";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

const App: React.FC = () => {
  return (
    <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
    </AuthProvider>
  );
};

export default App;
