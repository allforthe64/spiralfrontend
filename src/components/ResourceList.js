import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const ResourceList = ({func}) => {
    const { auth, setAuth } = useAuth()
    const id = auth.id

    const [resourceList, setResourceList] = useState([]);
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

                const results = response.data.filter(el => auth.favResources.includes(el._id))
        
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
        const updateFavResources = auth.favResources.filter(id => id !== resourceId)
        console.log(`new resourceIDList: ${updateFavResources}`)
    
        setResourceList(prevValues => prevValues.filter(resource => resource._id !== resourceId))

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
            
            setAuth({...auth, favResources: updateFavResources})

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
        <article className="border-gray-500 border-2 p-4 h-[100%] bg-slate-900 rounded-lg">
            <div className="border-b-2 border-white mb-4 md:mb-10 pb-4 md:pb-10">
                <h2 className="headings font-bold text-lg md:text-2xl">Liked Resources</h2>
            </div>
            {resourceList?.length
                ? (
                    <div className="overflow-auto scrollbar h-[83%]">
                        <ul>
                            {resourceList.map((resource) => (
                            <li key={resource?._id} className="text-white mb-6">
                                <div className="flex justify-between">
                                    <p className="ml-2 font-bold text-lg leading-tight headings hover:underline hover:cursor-pointer dash-title" onClick={() => func(resource._id)}>{resource?.name}</p>
                                    <button id={resource._id} onClick={onDeleteResourceClicked} className='text-red-700 info-txt font-bold hover:underline'>
                                        Delete
                                    </button>
                                </div>
                                
                            </li>
                            ))}
                        </ul>
                    </div>
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