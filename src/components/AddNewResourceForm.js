import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
// import { useAddNewResourceMutation } from "./resourcesApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
// import { TAGS } from "../../config/tags"

const TAGS = ['Online']

const NewResourceForm = () => {

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [link, setLink] = useState('')
    const [longDesc, setLongDesc] = useState('')
    const [tags, setTags] = useState([''])
    const [tutorial, setTutorial] = useState('')
    const [tutorials, setTutorials] = useState([])

    useEffect(() => {
        if (isSuccess) {
            setName('')
            setDesc('')
            setLongDesc('')
            setLink('')
            setTags([])
            setTutorial('')
            setTutorials([])
            navigate('/dash/resources')
        }
    }, [isSuccess, navigate])

    const onNameChanged = e => setName(e.target.value)
    const onDescChanged = e => setDesc(e.target.value)
    const onLongDescChanged = e => setLongDesc(e.target.value)
    const onLinkChanged = e => setLink(e.target.value)
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

    const canSaveTutorial = [tutorial.length].every(Boolean) && !isLoading

    const onSaveTutorialClicked = async (e) => {
        e.preventDefault()
        if (canSaveTutorial) {
            setTutorials(prevState => [...prevState, tutorial])
        }
    }

    const canSave = [name, desc, longDesc, link, tags.length].every(Boolean) && !isLoading

    const onSaveResourceClicked = async (e) => {
        e.preventDefault()
        console.log(`tutorials = ${tutorials}`)
        if (canSave) {
            await createNewResource({ name, desc, longDesc, link, tags, tutorials })
        }
    }

    const options = Object.values(TAGS).map(tag => {
        return (
            <option
                key={tag}
                value={tag}

            > {tag}</option >
        )
    })

    //const errClass = isError ? "errmsg" : "offscreen"
    //const validTitleClass = !name || !link ? "form__input--incomplete" : ''
    //const validTextClass = !desc ? "form__input--incomplete" : ''
    //const validRolesClass = !Boolean(tags.length) ? 'form__input--incomplete' : ''

    const content = (
        <>
            {/* <p className={errClass}>{error?.data?.message}</p> */}

            <form className="form" onSubmit={onSaveResourceClicked}>
                <div className="form__title-row">
                    <h2>New Resource</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="name">
                    Resource Name:</label>
                <input
                    className={`form__input ${validTitleClass}`}
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="off"
                    value={name}
                    onChange={onNameChanged}
                />

                <label className="form__label" htmlFor="desc">
                    Description:</label>
                <textarea
                    className={`form__input form__input--text ${validTextClass}`}
                    id="desc"
                    name="desc"
                    value={desc}
                    onChange={onDescChanged}
                />

                <label className="form__label" htmlFor="link">
                    Link:</label>
                <input
                    className={`form__input ${validTitleClass}`}
                    id="link"
                    name="link"
                    type="text"
                    autoComplete="off"
                    value={link}
                    onChange={onLinkChanged}
                />

                <label className="form__label" htmlFor="tags">
                    ASSIGNED TAGS:</label>
                <select
                    id="tags"
                    name="tags"
                    className={`form__select ${validRolesClass}`}
                    multiple={true}
                    size="3"
                    value={tags}
                    onChange={onTagsChanged}
                >
                    {options}
                </select>
                
                {tutorials}
                
                <label className="form__label" htmlFor="tutorial">
                    Tutorial:</label>
                <input
                    className={`form__input ${validTitleClass}`}
                    id="tutorial"
                    name="tutorial"
                    type="text"
                    autoComplete="off"
                    value={tutorial}
                    onChange={onTutorialChanged}
                />
                <button
                    className="icon-button"
                    title="Tutorial"
                    disabled={!canSaveTutorial}
                    onClick={onSaveTutorialClicked}
                >
                    <FontAwesomeIcon icon={faSave} />
                </button>
            </form>
        </>
    )

    return content
}

export default NewResourceForm