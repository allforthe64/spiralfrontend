import { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import { TAGS } from "../config/tags";

const NewResourceForm = ({ func }) => {
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [longDesc, setLongDesc] = useState("")
    const [link, setLink] = useState("")
    const [tags, setTags] = useState([''])
    const [tutorial, setTutorial] = useState('')
    const [tutorials, setTutorials] = useState([])
    const [message, setMessage] = useState("")
    
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    const handleName = (event) => {
        const new_name = event.target.value
        setName(new_name)
    }

    const handleDesc = (event) => {
        const new_desc = event.target.value
        setDesc(new_desc)
    }

    const handleLongDesc = (event) => {
        const new_longDesc = event.target.value
        setLongDesc(new_longDesc)
    }

    const handleLink = (event) => {
        const new_link = event.target.value
        setLink(new_link)
    }

    const onTagsChanged = e => {
        console.log(e.target.selectedOptions)
        const values = Array.from(
            e.target.selectedOptions, //HTMLCollection 
            (option) => option.value
        )
        console.log(values)
        setTags(values)
    }

    const onTutorialChanged = e => setTutorial(e.target.value)

    const canSaveTutorial = [tutorial.length].every(Boolean)

    const onSaveTutorialClicked = async (e) => {
        e.preventDefault()
        if (canSaveTutorial) {
            setTutorials(prevState => [...prevState, tutorial])
            console.log(`tutorials: ${tutorials}`)
            setTutorial('')
        }
    }

    const tutList = tutorials.map((tut, i) => {
        return (
            <span className="m-2" key={i}>
                <a href={`${tut}`}>Tut {i + 1}</a>
            </span>
        )
    })

    const options = Object.values(TAGS).map(tag => {
        return (
            <option
                key={tag}
                value={tag}

            > {tag}</option >
        )
    })


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            // Axios response is in JSON
            const response = await axiosPrivate.post('/resources', 
                JSON.stringify({ name, desc, longDesc, link, tags, tutorials }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }

            )
            
            console.log(response?.data)
        
            //Clear input fields
            setName('')
            setDesc('')
            setLongDesc('')
            setLink('')
            setTags([''])
            setTutorial('')
            setTutorials([])
            func()
            navigate('/resources', { replace: true })
        } catch (err) {
            console.log('throwing error in frontend resource form')
            if (!err?.response) {
                setMessage('No Server Response')
            } else {
                setMessage('Resource creation Failed')
            }
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
                <div class="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
                    <div>
                        <label className="form-label block text-sm font-semibold leading-6 text-white">Name </label>
                        <div class="mt-2.5">
                            <input
                                type="text"
                                name="name"
                                className="form-control block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={(e) => handleName(e)}
                                value={name}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="form-label block text-sm font-semibold leading-6 text-white">Desc</label>
                        <div className="mt-2.5">
                            <input
                                type="text"
                                name="desc"
                                className="form-control block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={(e) => handleDesc(e)}
                                value={desc}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="form-label block mb-2 text-sm font-medium text-gray-900 dark:text-white">Long Desc</label>
                        <div className="mt-2.5">
                            <textarea
                                name="longDesc"
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                                onChange={(e) => handleLongDesc(e)}
                                value={longDesc}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="form-label block text-sm font-semibold leading-6 text-white">Link</label>
                        <div className="mt-2.5">
                            <input
                                type="text"
                                name="link"
                                className="form-control block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={(e) => handleLink(e)}
                                value={link}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="form__label text-white" htmlFor="tags">
                            ASSIGNED TAGS:</label>
                        <select
                            id="tags"
                            name="tags"
                            multiple={true}
                            size="6"
                            value={tags}
                            onChange={onTagsChanged}
                        >
                            {options}
                        </select>
                    </div>
                    <div>
                        <div className="text-white">
                            {tutList}
                        </div>
                        <label className="form__label text-white mr-2" htmlFor="tutorial">
                        Tutorial:</label>
                        <input
                            className="form-control block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            id="tutorial"
                            name="tutorial"
                            type="text"
                            autoComplete="off"
                            value={tutorial}
                            onChange={onTutorialChanged}
                        />
                        <button
                            className="icon-button text-white m-2"
                            title="Tutorial"
                            disabled={!canSaveTutorial}
                            onClick={onSaveTutorialClicked}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>

                    
                    
                    
                    

                    <div className="col-md-3">
                        <button type="submit" className="btn btn-primary mt-4 text-white border-white border-2 p-4 rounded">
                        Submit
                        </button>
                    </div>
                </div>
            </form>
            <Link to={'/resources'}>Return to resource lists</Link>
        </>
    );
};

export default NewResourceForm