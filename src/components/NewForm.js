import { Link } from "react-router-dom"

const NewForm = ({note, user, submit, handleText, handleTitle, title, text}) => {
    return (
        <>
            <div className="py-20">
                <h4 className="text-white headings text-5xl font-bold">{note ? `Add a note for ${user}` : `Add a goal for ${user}`}</h4>
            </div>
            <form onSubmit={submit}>
                <div>
                    <input
                    type="text"
                    placeholder={note ? "Enter a note title" : "Enter a goal title"}
                    className="w-4/12 bg-inherit border-b-2 outline-0 text-white info-txt text-2xl pl-2 pb-px mb-20"
                    onChange={(e) => handleTitle(e)}
                    value={title}
                    />
                </div>

                <div>
                    <textarea
                    type="text"
                    placeholder={note ? "Enter a note description" : "Enter a goal description"}
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
    )
}

export default NewForm