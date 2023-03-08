import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import EditResourceForm from './EditResourceForm'
import { ResourceContext } from '../App'



const EditResource = ({func}) => {

    const { id } = useParams()

    const contextObject = useContext(ResourceContext)
    const resources = []
    contextObject?.arr.map(el => resources.push(el))
    
    const resource = resources.filter(resource => resource._id === id)[0]

    if (!resource) return <p>No Resource found</p>

    const content = <EditResourceForm resource={resource} func={func} />

    return content
}
export default EditResource