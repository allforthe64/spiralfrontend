import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const ResourceList = () => {
    const { auth } = useAuth()
    const id = auth.id
    console.log(`auth.favResources: ${auth.favResources}`)

    const [resourceList, setResourceList] = useState(auth.favResources);
    console.log(`resourceList is set as : ${resourceList}`)
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getResourceList = async () => {

            try {
                const response = await axiosPrivate.get('/resources', 
                {
                    signal: controller.signal,
                });
                const results = response.data.filter(el => resourceList.includes(el._id))

                isMounted && setResourceList(results);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }
        getResourceList();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    const onDeleteResourceClicked = async (e) => {
        e.preventDefault()

        const resourceId = e.target.id
        const removedResource = resourceList.filter(resource => resource._id !== resourceId)
        console.log(`with removed: ${removedResource}`)
        setResourceList(prevValues => {
            console.log(prevValues)
            return prevValues.filter(resource => resource._id !== resourceId)
        })
        //setResourceList(prev => prev.filter(el => el._id !== resourceId))
        console.log(`resourceList now: ${resourceList}`)
        const updateFavResources = removedResource

        try {
            // Axios response is in JSON
            const response = await axiosPrivate.put('/users', 
                JSON.stringify({ id, updateFavResources }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            console.log(response?.data)    
            
        } catch (err) {
            console.log('throwing error in update fav resource')
            if (!err?.response) {
                console.log('No Server Response')
            } else {
                console.log('fav resource update Failed')
            }
        }        
    }      

    return (
        <article>
            <h2>My Resources</h2>
            <p>Easily find all of your resources</p>
            {resourceList?.length
                ? (
                    <ul>
                        {resourceList.map((resource) => (
                        <li 
                            key={resource?._id} 
                            className="text-white"
                            
                        >
                            {resource?.name}
                            <div id={resource._id} onClick={onDeleteResourceClicked}>
                                Delete
                            </div>
                        </li>
                        ))}
                    </ul>
                ) : (
                    <div>
                        <p>No resources to display</p>
                    </div>
                )
            }
        </article>
    );
};

export default ResourceList;