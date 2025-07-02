import { useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const login = async () => {
        try{
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/notes");
        }
        catch(err){
            if (err.code === "auth/wrong-password") {
                alert("Incorrect password. Please try again.");
            } else if (err.code === "auth/user-not-found") {
                alert("User not found. Please sign up first.");
            } else if (err.code === "auth/invalid-email") {
                alert("Invalid email format.");
            } else {
                alert("Login error: " + err.message);
            }
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2 className="auth-title">Login</h2>
                <input className="auth-input" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input className="auth-input" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button className="auth-btn" onClick={login}>Login</button>
                <p className="auth-link">Don&apos;t have an account? <Link href="/signup">Signup here</Link></p>
                <p className="auth-link">Forgot your password?<Link href="/reset-password">Reset Password</Link></p>
            </div>
        </div>
    )
}