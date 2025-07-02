import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import Link from "next/link";
import { auth } from "../lib/firebase";

export default function Signup(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const signup = async () => {
        try{
            await createUserWithEmailAndPassword(auth, email, password);
            router.push("/notes");
        }
        catch(error){
            console.error("Error signing up:", error);
            alert("Failed to sign up. Please check your credentials.");
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2 className="auth-title">Sign Up</h2>
                <input className="auth-input" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input className="auth-input" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button className="auth-btn" onClick={signup}>Signup</button>
                <p className="auth-link">Already have an account? <Link href="/login">Login here</Link></p>
            </div>
        </div>
    )
}