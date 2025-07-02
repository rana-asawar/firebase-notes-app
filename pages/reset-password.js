import { useState } from "react";
import { auth } from "../lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

export default function ResetPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleReset = async () => {
        try{
            await sendPasswordResetEmail(auth, email);
            setMessage("Password reset email sent! Please check your inbox.");
        }
        catch(err) {
            if (err.code === "auth/user-not-found") {
                setMessage("No user found with this email.");
            } else if (err.code === "auth/invalid-email") {
                setMessage("Invalid email format.");
            } else {
                setMessage("Error: " + err.message);
            }
        }
    }
    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2 className="auth-title">Reset Password</h2>
                <input
                    className="auth-input"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button className="auth-btn" onClick={handleReset}>Send Reset Email</button>
                {message && <p className="auth-message">{message}</p>}
            </div>
        </div>
    );
}