  // for firebase testing
  if (import.meta.env.VITE_FIREBASE_KEY) {
    if (
      // process.env.REACT_APP_FIREBASE_KEY ===
      import.meta.env.VITE_FIREBASE_KEY ===
      "AIzaSyC5uefuZh-LOuZ7nErj_3GRBr1XDIckk58"
    ) {
      // console.log("Firebase Key Access: ", `: ${import.meta.env.VITE_FIREBASE_KEY}`);
    } else {
      console.log("not liked");
    }
  } else {
    console.error("REACT_APP_FIREBASE_KEY is not defined");
  } 



  import React, { useRef, useState } from "react";
import { Validate } from "../../helper";
import OTPInput from "./OtpInput";
import {
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "../../firebaseConfig/firebase";

const Login: React.FC = () => {
  const [mobile, setMobile] = useState<string>("+91 ");
  const [error, setError] = useState<string>("");
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const recaptchaVerifier = useRef<RecaptchaVerifier | null>(null);

  const setupRecaptcha = () => {
    console.log("recaptcha setup call");
    if (!recaptchaVerifier.current) {
      if (!document.getElementById("recaptcha-container")) {
        const recaptchaContainer = document.createElement("div");
        recaptchaContainer.id = "recaptcha-container";
        document.body.appendChild(recaptchaContainer);
      }

      recaptchaVerifier.current = new RecaptchaVerifier(
        auth,
        "recaptcha-container", // Use a static ID for the container
        {
          size: "invisible", // normal
          callback: (response: any) => {
            console.log("Recaptcha resolved");
          },
          "expired-callback": () => {
            console.log("Recaptcha expired. Please refresh.");
          },
        }
      );
    }
  };
  // ===========send otp function================
  const sendOtp = () => {
    console.log("send otp call");
    const numberPart = mobile.slice(4);
    if (Validate("mobile", numberPart)) {
      // setError("Enter a valid mobile number.");
      return;
    }
    setupRecaptcha();
    const phoneNumber = mobile;
    const appVerifier = recaptchaVerifier.current;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier!)
      .then((confirmationResult) => {
        setOtpSent(true);
        setVerificationId(confirmationResult.verificationId);
        console.log("OTP sent successfully");
        setError(""); // Clear any previous error
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
        setError("Error sending OTP. Please try again later.");
      });
  };

  // =========handle change function====================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let phoneNo = e.target.value;

    // Ensure "+91 " is always present
    if (!phoneNo.startsWith("+91 ")) {
      return;
    }

    // Extract the number part after "+91 "
    const numberPart = phoneNo.slice(4);

    // Allow only digits and limit to 10 digits
    if (/^\d*$/.test(numberPart) && numberPart.length <= 10) {
      // ^ start $ end * quantifier \d digit
      setMobile(phoneNo);
      const validationResult = Validate("mobile", numberPart);
      setError(validationResult);
    }
  };

  return (
    <div>
      <label htmlFor="mobile">Mobile Number</label>
      <input
        id="mobile"
        type="text"
        value={mobile}
        onChange={(e) => handleChange(e)}
        onKeyDown={(e: any) => {
          console.log(`Key Passed: ${e.key}`);
          if (e.key === "Enter") {
            sendOtp();
          }
        }}
        maxLength={14}
        style={{
          border: error ? "2px solid red" : "1px solid green",
          outline: "none",
        }}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div id="recaptcha-container"></div>
      {otpSent && verificationId && (
        <OTPInput verificationId={verificationId} />
      )}
    </div>
  );
};

export default Login;


import React, { useState, useRef } from "react";
import { Validate } from "../../helper";

interface TSendOtpReq {
  verificationId: string;
  length?: number;
}

const OTPInput: React.FC<TSendOtpReq> = ({ verificationId, length = 6 }) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill("")); // Array for storing 6 OTP values
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]); // Refs to manage focus
  const [error, setError] = useState<string>("");

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return; // Allow only digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Validate the concatenated OTP
    const otpString = newOtp.join("");
    const validationResult = Validate("otp", otpString, false); // Call Validate function
    setError(validationResult);

    // Move focus to the next box if value is entered
    if (value && index < (length - 1)) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Move focus to the previous box on backspace if the current box is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = e.clipboardData.getData("text").slice(0, 6); // Extract first 6 characters
    if (/^\d+$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      setOtp([...newOtp, ...Array(6 - newOtp.length).fill("")]); // Fill remaining boxes with empty values

      const otpString = newOtp.join("");
      const validationResult = Validate("otp", otpString, false);
      setError(validationResult);

      pastedData.split("").forEach((_, idx) => {
        if (idx < 6) {
          inputRefs.current[idx]?.focus(); // Focus appropriately
        }
      });
    }
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "10px" }}>
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={index === 0 ? handlePaste : undefined}
            maxLength={1} // Restrict to single digit
            ref={(el) => (inputRefs.current[index] = el)} // Store ref
            style={{
              width: "40px",
              height: "40px",
              textAlign: "center",
              fontSize: "18px",
              border: error ? "2px solid red" : "1px solid #ccc",
              borderRadius: "4px",
              outline: error ? "none" : "auto",
              boxShadow: error ? "0 0 5px red" : "none",
            }}
            aria-label={`OTP input ${index + 1}`}
          />
        ))}
      </div>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
};

export default OTPInput;






import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useState } from "react";
import { Validate } from "../helper";
import { useAuth } from "../context/AuthContext";
import { employeeDetails } from "../constants/userData";
import * as jwtDecode  from "jwt-decode";

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
      const decodedToken: any = jwtDecode(token);

      // if (userCredential.user.email !== null) {
      //   if (
      //     userCredential.user.email.trim() ===
      //     import.meta.env.VITE_EMPLOYEE_1_EMAIL
      //   ) {
      //     login(employeeDetails[0], userCredential);
      //   } else if (
      //     userCredential.user.email.trim() ===
      //     import.meta.env.VITE_EMPLOYEE_2_EMAIL
      //   ) {
      //     login(employeeDetails[1], userCredential);
      //   } else if (
      //     userCredential.user.email.trim() ===
      //     import.meta.env.VITE_EMPLOYEE_3_EMAIL
      //   ) {
      //     login(employeeDetails[2], userCredential);
      //   } else {
      //     console.log(
      //       "Auth Error Data not Found, Please Contact Developer: ",
      //       userCredential.user.email
      //     );
      //   }
      // } else {
      //   console.log("User null");
      // }
    } catch (error) {
      console.log("Error logging in:", error);
    }
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





  // // Automatic logout after 30 days
  // useEffect(() => {
  //   const loginTimestamp = localStorage.getItem("loginTimestamp");
  //   if (loginTimestamp) {
  //     // const thirtyDaysInMs = 2 * 24 * 60 * 60 * 1000;
  //     const thirtyDaysInMs = 2 * 60 * 60 * 1000;
  //     const timeElapsed = Date.now() - parseInt(loginTimestamp, 10);

  //     if (timeElapsed > thirtyDaysInMs) {
  //       logout();
  //     }
  //   }
  // }, []);



    // // Load user data from localStorage on initial render
  // useEffect(() => {
  //   const savedUser = localStorage.getItem("authUser");
  //   if (savedUser) {
  //     try {
  //       const parsedUser = JSON.parse(savedUser);
  //       setUser(parsedUser);
  //       setIsAuthenticated(true);
  //     } catch (error) {
  //       console.error(
  //         "Invalid JSON in localStorage for 'authUser':",
  //         savedUser
  //       );
  //       localStorage.removeItem("authUser");
  //     }
  //     // setUser(JSON.parse(savedUser));
  //     // setIsAuthenticated(true);
  //   }
  // }, []);
