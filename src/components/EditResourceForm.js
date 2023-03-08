import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { TAGS } from '../config/tags'

const EditResourceForm = ({ resource, func }) => {
    const { id } = useParams()

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    const [name, setName] = useState(resource.name)
    const [desc, setDesc] = useState(resource.desc)
    const [longDesc, setLongDesc] = useState(resource.longDesc)
    const [link, setLink] = useState(resource.link)
    const [tags, setTags] = useState(resource.tags)

    const onNameChanged = e => setName(e.target.value)
    const onDescChanged = e => setDesc(e.target.value)
    const onLongDescChanged = e => setLongDesc(e.target.value)
    const onLinkChanged = e => setLink(e.target.value)

    const onTagsChanged = e => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        )
        console.log(`values: ${values}`)
        setTags(values)
    }

    //create html for roles drop down menu
    const options = Object.values(TAGS).map(tag => {
        return (
            <option
                key={tag}
                value={tag}

            > {tag}</option >
        )
    })

    const canSave = [name, desc, longDesc, link].every(Boolean)

    const onSaveResourceClicked = async (e) => {
        e.preventDefault()
        try {
            // Axios response is in JSON
            const response = await axiosPrivate.put('/resources', 
                JSON.stringify({ id, name, desc, longDesc, tags }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            console.log(response?.data)
            console.log(`updated resource: ${name}`)
            //Clear input fields
            func()
            navigate('/resources', { replace: true })
        } catch (err) {
            console.log('throwing error in edit resource form')
            if (!err?.response) {
                console.log('No Server Response')
            } else {
                console.log('Resource creation Failed')
            }
        }
    }

    const onDeleteResourceClicked = async (e) => {
        e.preventDefault()

        try {
            // Axios response is in JSON
            console.log(`sending id: ${id}`)

            const response = await axiosPrivate.delete('/resources', 
            {
                headers: { 
                    'Content-Type': 'application/json' },
                    withCredentials: true,
                data: {
                  id: id
                }
            })
            
            console.log(response?.data)
            console.log(`deleted resource: ${name}`)
            //Clear input fields
            func()
            navigate('/resources', { replace: true })
        } catch (err) {
            console.log('throwing error in edit resource form')
            if (!err?.response) {
                console.log('No Server Response')
            } else {
                console.log('Resource creation Failed')
            }
        }
    }
    
    let deleteButton = (
        <button
            className="icon-button"
            title="Delete"
            onClick={onDeleteResourceClicked}
        >
            <FontAwesomeIcon icon={faTrashCan} />
        </button>
    )

    const content = (
        <>
            <form className="form text-white" onSubmit={e => e.preventDefault()}>
            <div className="form__title-row">
                <h2>Edit Resource {resource.name}</h2>
                <div className="form__action-buttons">
                    <button
                        className="icon-button"
                        title="Save"
                        onClick={onSaveResourceClicked}
                        disabled={!canSave}
                    >
                        <FontAwesomeIcon icon={faSave} />
                    </button>
                    {deleteButton}
                </div>
            </div>
            <label className="form__label" htmlFor="resource-name">
                Name:</label>
            <input
                className='text-black'
                id="resource-name"
                name="name"
                type="text"
                autoComplete="off"
                value={name}
                onChange={onNameChanged}
            />

            <label className="form__label" htmlFor="resource-desc">
                Desc:</label>
            <textarea
                className='text-black'
                id="resource-desc"
                name="desc"
                value={desc}
                onChange={onDescChanged}
            />

            <label className="form__label" htmlFor="resource-desc">
                Long Desc:</label>
            <textarea
                className='text-black'
                id="long-resource-desc"
                name="longDesc"
                value={longDesc}
                onChange={onLongDescChanged}
            />

            <label className="form__label" htmlFor="resource-link">
                Link:</label>
            <input
                className='text-black'
                id="resource-link"
                name="link"
                type="text"
                autoComplete="off"
                value={link}
                onChange={onLinkChanged}
            />

            <label className="form__label" htmlFor="tags">
                TAGS:</label>
            <select
                className='text-black'
                id="tags"
                name="tags"
                multiple={true}
                size="3"
                value={tags}
                onChange={onTagsChanged}
            >
                {options}
            </select>        
        </form>
    </>
    )
  return content
}

export default EditResourceForm