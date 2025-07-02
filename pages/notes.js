import { auth, db } from "@/lib/firebase";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { onValue, ref, set, remove, push, update } from "firebase/database";
import { signOut } from "firebase/auth";
import Link from "next/link";

export default function Notes (){
    const [note, setNote] = useState("");
    const [notes, setNotes] = useState({});
    const router = useRouter();
    const user = auth.currentUser;

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) router.push("/login");
            else {
                const notesRef = ref(db, `notes/${user.uid}`);
                onValue(notesRef, (snapshot) => {
                    setNotes(snapshot.val() || {});
                });
            }
        });
        return () => unsubscribe();
    }, [router]);
    const handleLogout = async () => {
        await signOut(auth);
        router.push("/login");
    };

    const addNote = async () => {
        const notesRef = ref(db, `notes/${user.uid}`);
        const newRef = push(notesRef);
        await set(newRef,{ text: note});
        setNote("");
    }

    const deleteNote = async (id) => {
        const noteRef = ref(db, `notes/${user.uid}/${id}`);
        await remove(noteRef);
    }

    const editNote = async (id) => {
        const newText = prompt("Edit your notes: ", notes[id].text);
        if (newText){
            const noteRef = ref(db, `notes/${user.uid}/${id}`);
            await update(noteRef, { text: newText });
        }
    }
    
    return (
        <div className="notes-container">
            <div className="notes-header">
                <h2>📝 Notes</h2>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
            <div className="input-section">
                <input
                    type="text"
                    placeholder="Write a note..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="note-input"
                    maxLength={120}
                />
                <button className="add-btn" onClick={addNote} disabled={!note.trim()}>Add Note</button>
            </div>
            <ul className="notes-list">
                {Object.entries(notes).length === 0 ? (
                    <li className="empty-notes">No notes yet. Start by adding one!</li>
                ) : (
                    Object.entries(notes).map(([id, data]) => (
                        <li className="note-item" key={id}>
                            <span className="note-text">{data.text}</span>
                            <div className="note-actions">
                                <button className="edit-btn" onClick={() => editNote(id)}>Edit</button>
                                <button className="delete-btn" onClick={() => deleteNote(id)}>Delete</button>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}