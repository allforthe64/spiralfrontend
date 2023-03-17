import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { fas, faXmark } from "@fortawesome/free-solid-svg-icons"
import { far, faHeart } from "@fortawesome/free-regular-svg-icons"
import { Link } from "react-router-dom"
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useState, useEffect } from 'react'


library.add(far, fas, faHeart)


const Modal = (props) => {

    const axiosPrivate = useAxiosPrivate();

    //const [inFavs, setInFavs] = useState(false)
    console.log(props)
    let updateFavResources = (props.favResources)
    console.log(updateFavResources)

    let favorited = 'far'

    useEffect(() => {
        if (updateFavResources.includes(props.id)) {
            favorited = 'fas'
        } else {
            favorited = 'far'
        }
    }, [updateFavResources])
    

    const stringArr = props.longDesc.split('Cost')
    let tutArr = []

    for (let i in props.tutorials) {
        let element = <li className="text-white text-left"><Link to={props.tutorials[i].link} target='_blank' className="text-white info-txt mt-4 tutorial text-lg">{props.tutorials[i].title}</Link></li>
        tutArr.push(element)
    }

    const toggleFav = async () => {
        if (!updateFavResources.includes(props.id) || !updateFavResources.length) {
            updateFavResources.push(props.id)
        } else {
            updateFavResources = updateFavResources.filter(el => el !== props.id)
        }
            
        const id = props.userId

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
        <div className="modal backdrop-blur-sm flex justify-center py-20">
            <div className="border w-10/12 bg-dark rounded-2xl pb-26 h-[100%]">
                {/* { updateFavResources.includes(props.id) */}
                <FontAwesomeIcon onClick={toggleFav} icon={[`${favorited}`, "heart"]} className='text-white text-4xl'/>
                    {/* : <FontAwesomeIcon onClick={toggleFav} icon={["far", "heart"]} className='text-white text-4xl'/> */}
                {/* } */}
                <div className="flex justify-end pt-2 pr-4">
                    <button className="text-white" onClick={() => props.onClickFunc()}><FontAwesomeIcon icon={faXmark} className='text-4xl' /></button>
                </div>
                <h1 className="text-white mb-8 info-txt font-bold text-6xl">{props.name}</h1>
                <div className="overflow-auto h-[90%] w-[99%] mt-10 py-10 modal-scroll">
                    <div className="h-[75%]">
                        <div className="ml-10 mb-4">
                            <p className="text-white text-left info-txt">{stringArr[0]}</p>
                        </div>
                        <p className="text-white text-left info-txt font-bold text-xl ml-10 mb-10">{'Cost' + stringArr[1]}</p>
                        <div className="pl-10">
                            <h2 className="info-txt font-bold text-2xl text-white text-left">Tutorials:</h2>
                            <ul className="list-disc pl-8 pt-2 mb-8">
                                {tutArr}
                            </ul>
                        </div>
                    </div>
                    <button className="bg-alien-green info-txt px-4 py-2 text-xl font-bold rounded-lg"><Link to={props.link} target='_blank'>Start using {props.name}</Link></button>
                </div>
            </div>
        </div>
    )
}

export default Modal