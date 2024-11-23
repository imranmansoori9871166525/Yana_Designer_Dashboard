import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useState } from "react";
import { Validate } from "../helper";
import { useAuth } from "../context/AuthContext";
import { employeeDetails } from "../constants/userData";
import { jwtDecode } from "jwt-decode";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Use the useAuth hook to access the login function
  const { login } = useAuth();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    const validationError = Validate("email", value);
    setEmailError(validationError);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    if (emailError) {
      console.log("Fix validation errors before logging in.");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken(); // Retrieve the access token
      const decodedToken: any = jwtDecode(token); // Decode the token using a library like `jwt-decode`

      const expirationTime = decodedToken.exp * 10000; // Convert expiration time to milliseconds

      if(userCredential.user.email !== null) {
        const userData = getUserDataByEmail(userCredential.user.email.trim());
        if(userData) {
          login(userData, {token , expirationTime});
        } else {
          console.log("Auth Error: User data not found for email:", userCredential.user.email);
        }
      } else {
        console.log("User email is null");
      }
    } catch (error) {
      console.log("Error logging in:", error);
    }
  };

  // Helper function to match email with employee data
const getUserDataByEmail = (email: string) => {
  if (email === import.meta.env.VITE_EMPLOYEE_1_EMAIL) return employeeDetails[0];
  if (email === import.meta.env.VITE_EMPLOYEE_2_EMAIL) return employeeDetails[1];
  if (email === import.meta.env.VITE_EMPLOYEE_3_EMAIL) return employeeDetails[2];
  return null;
};

  return (
    <div style={{ width: "300px", margin: "0 auto", textAlign: "center" }}>
      <h2>Login</h2>
      <div style={{ marginBottom: "16px" }}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            style={{ width: "100%", margin: "8px 0", padding: "8px" }}
          />
        </label>
        {emailError && <span style={{ color: "red" }}>{emailError}</span>}
      </div>
      <div style={{ marginBottom: "16px" }}>
        <label>
          Password:
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
            style={{ width: "100%", margin: "8px 0", padding: "8px" }}
          />
        </label>
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: "absolute",
            top: "50%",
            right: "10px",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
      <button onClick={handleLogin} style={{ padding: "10px 20px" }}>
        Login
      </button>
    </div>
  );
};

export default Login;
