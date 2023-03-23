import { useState} from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const NewMGoalForm = () => {
    
    const { auth } = useAuth();
    const id = auth.id

    const [title, setTitle] = useState("")
    const [text, setText] = useState("")

    const [message, setMessage] = useState("")
    
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    const handleTitle = (event) => {
        const new_title = event.target.value
        setTitle(new_title)
    }

    const handleText = (event) => {
        const new_text = event.target.value
        setText(new_text)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            // Axios response is in JSON
            const response = await axiosPrivate.post('/mgoals', 
                JSON.stringify({ id, title, text }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            
            console.log(response?.data)
        
            //Clear input fields
            setTitle('')
            setText('')

            navigate('/dashboard', { replace: true })
        } catch (err) {
            console.log('throwing error in frontend goals form')
            if (!err?.response) {
                setMessage('No Server Response')
            } else {
                setMessage('Goal creation Failed')
            }
        }
    }

    return (
        <>
            <div className="py-20">
                <h2 className="text-white headings text-5xl font-bold">Add a new monthly goal for {auth.user}</h2>
            </div>
            <form onSubmit={handleSubmit}>
            <div>
                    <input
                    type="text"
                    placeholder="Enter a goal title"
                    className="w-4/12 bg-inherit border-b-2 outline-0 text-white info-txt text-2xl pl-2 pb-px mb-20"
                    onChange={(e) => handleTitle(e)}
                    value={title}
                    />
                </div>

                <div>
                    <textarea
                    type="text"
                    placeholder="Enter goal description"
                    className="w-4/12 bg-inherit border-2 outline-0 text-white info-txt text-lg p-2 mb-24 rounded-md"
                    onChange={(e) => handleText(e)}
                    value={text}
                    rows='6'
                    />
                </div>

                <div>
                    <button type="submit" className="info-txt font-bold text-2xl mb-8 bg-alien-green py-px px-8 rounded-md">
                    Submit
                    </button>
                </div>
            </form>
            <div className="py-10">
                <Link to={'/dashboard'} className='text-white hover:underline'>Return to dashboard</Link>
            </div>
        </>
    );
};

export default NewMGoalForm