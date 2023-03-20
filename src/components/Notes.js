import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Notes = () => {
    const { auth } = useAuth()
    const id = auth.id

    const [notes, setNotes] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getNotes = async () => {

            try {
                const response = await axiosPrivate.get('/notes', 
                {
                    signal: controller.signal,
                });
                const results = response.data.filter(el => el.user === id)
                isMounted && setNotes(results);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }
        getNotes();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return (
        <article>
            <h2>Notes List</h2>
            <p>Leave yourself a note about what you accomplished today</p>
            {notes?.length
                ? (
                    <ul>
                        {notes.map((note) => (
                        <li key={note?._id} className="text-white">
                            {note?.title}
                            <Link to={`/notes/${note._id}`} className="text-red-700">Edit</Link>
                        </li>
                        ))}
                    </ul>
                ) : (
                    <div>
                        <p>No notes to display</p>
                    </div>
                )
            }
            <Link to={'/notes/new'} className="text-yellow-500">Add New Note</Link>
        </article>
    );
};

export default Notes;