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
            className="icon-button text-white m-2"
            title="Delete"
            onClick={onDeleteResourceClicked}
        >
            <FontAwesomeIcon icon={faTrashCan} />
        </button>
    )

    const content = (
        <>
            <form className="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row flex justify-between items-center text-2xl mb-10">
                    <h2 className='text-white inline'>Resource: {name}</h2>
                    <div>
                        <button
                            className="icon-button text-white"
                            title="Save"
                            onClick={onSaveResourceClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        {deleteButton}
                    </div>
                    
                </div>
                <div class="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">

                    <div>
                        <label className="form-label block text-sm font-semibold leading-6 text-white" htmlFor="resource-name">
                            Name:</label>
                        <div className="mt-2.5">
                            <input
                                className='form-control block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                id="resource-name"
                                name="name"
                                type="text"
                                autoComplete="off"
                                value={name}
                                onChange={onNameChanged}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="form-label block text-sm font-semibold leading-6 text-white" htmlFor="resource-desc">
                            Desc:</label>
                        <div className="mt-2.5">
                            <textarea
                                className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300'
                                id="resource-desc"
                                name="desc"
                                value={desc}
                                onChange={onDescChanged}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="form-label block text-sm font-semibold leading-6 text-white" htmlFor="resource-desc">
                            Long Desc:</label>
                        <div className="mt-2.5">
                            <textarea
                                className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300'
                                id="long-resource-desc"
                                name="longDesc"
                                value={longDesc}
                                onChange={onLongDescChanged}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="form-label block text-sm font-semibold leading-6 text-white" htmlFor="resource-link">
                            Link:</label>
                        <div className="mt-2.5">
                            <input
                                className='form-control block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                id="resource-link"
                                name="link"
                                type="text"
                                autoComplete="off"
                                value={link}
                                onChange={onLinkChanged}
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
                </div>       
        </form>
    </>
    )
  return content
}

export default EditResourceForm