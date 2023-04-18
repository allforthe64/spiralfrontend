import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { fas, faXmark } from "@fortawesome/free-solid-svg-icons"
import { far, faHeart } from "@fortawesome/free-regular-svg-icons"
import { Link } from "react-router-dom"
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth"


library.add(far, fas, faHeart)


const Modal = (props) => {
    const axiosPrivate = useAxiosPrivate();

    const { auth, setAuth } = useAuth()
    const id = auth.id

    let updateFavResources = auth.favResources || []

    console.log(updateFavResources)

    let favorited = ''

    if (updateFavResources.includes(props.id)) {
        favorited = 'fas'
    } else {
        favorited = 'far'
    }

    //building array for tuturial elements
    const stringArr = props.longDesc.split('Cost')
    let tutArr = []

    for (let i in props.tutorials) {
        let element = <li className="text-white text-left"><Link to={props.tutorials[i].link} target='_blank' className="text-white info-txt mt-4 tutorial text-lg sm:max-md:text-sm max-sm:text-sm">{props.tutorials[i].title}</Link></li>
        tutArr.push(element)
    }

    //Handle adding/removing from favs
    const toggleFav = async () => {
        if (!updateFavResources.includes(props.id) || !updateFavResources.length) {
            updateFavResources.push(props.id)
            favorited = 'fas'
        } else {
            updateFavResources = updateFavResources.filter(el => el !== props.id)
            favorited = 'far'
        }

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
        <div className="modal backdrop-blur-sm flex justify-center py-16">
            <div className="border w-10/12 bg-slate-900 rounded-2xl">
                <div className="flex justify-end pt-2 pr-4 max-sm:mb-3">
                    <button className="text-white" onClick={() => props.onClickFunc()}><FontAwesomeIcon icon={faXmark} className='text-4xl' /></button>
                </div>
                <h1 className="text-white mb-4 info-txt font-bold md:text-6xl sm:max-md:text-4xl max-sm:text-2xl max-sm:mb-px ">{props.name}</h1>
                <div className="h-[90%] w-[99%] py-8 ">
                    <div className="h-[70%] flex flex-col items-left pl-[5%] overflow-auto mb-4 max-sm:mb-6 modal-scroll">
                        <div className="w-10/12 mb-4">
                            <p className="text-white text-left info-txt sm:max-md:text-sm max-sm:text-xs">{stringArr[0]}</p>
                        </div>
                        <p className="text-white text-left info-txt font-bold text-xl md:mb-4 max-sm:mb-2 sm:max-md:text-base sm:max-md:mb-4 max-sm:text-base">{'Cost' + stringArr[1]}</p>
                        <div className="pl-10 max-sm:pl-3">
                            <h2 className="info-txt font-bold text-2xl text-white text-left sm:max-md:text-lg max-sm:text-base">Tutorials:</h2>
                            <ul className="list-disc pl-8 pt-2">
                                {tutArr}
                            </ul>
                        </div>
                    </div>
                    <div className='flex justify-center sm:max-md:mt-4'>
                        <div className='md:w-10/12 sm:max-md:w-8/12 flex justify-around'>
                            <button className="bg-alien-green info-txt px-4 py-2 text-xl font-bold rounded-lg sm:max-md:text-sm max-sm:text-xs max-sm:w-8/12"><Link to={props.link} target='_blank'>Start using {props.name}</Link></button>
                            {(auth.roles.includes(1984) || auth.roles.includes(5150)) && <FontAwesomeIcon onClick={toggleFav} icon={[`${favorited}`, "heart"]} className='text-white text-5xl max-sm:text-3xl max-sm:mt-2 sm:max-md:text-3xl sm:max-md:mt-px hover:cursor-pointer'/>}
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Modal