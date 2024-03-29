import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Notes = ({func}) => {
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
        <article className="border-gray-500 border-2 p-4 bg-slate-900 rounded-lg">
            <div className="flex justify-around mb-6 border-b-2 border-white">
                <h2 className="text-lg md:text-2xl headings font-bold">Notes List</h2>
                <button className="info-txt font-bold mb-4 md:mb-12 bg-alien-green py-px px-8 rounded-md text-black"><Link to={'/notes/new'}>Add New Note</Link></button> 
            </div>
            {notes?.length
                ? (
                    <div className="h-[200px] pt-4 pl-4 overflow-auto scrollbar">
                        <ul>
                            {notes.map((note) => (
                                <div key={note?._id} className="flex justify-between mb-4">
                                    <li className="text-white">
                                        <p className="ml-2 font-bold text-lg leading-tight headings hover:underline hover:cursor-pointer dash-title" onClick={() => func(note.title, note.text, true, false)}>{note?.title}</p>
                                    </li>
                                    <button className="text-red-700 mr-20 leading-relaxed info-txt font-bold hover:underline"><Link to={`/notes/${note._id}`} className="text-red-700">Edit</Link></button>
                                </div>
                            ))}
                        </ul>
                    </div>   
                ) : (
                    <div>
                        <p>No notes to display</p>
                    </div>
                )
            }
        </article>
    );
};

export default Notes;