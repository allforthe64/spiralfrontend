import { useContext, useState } from "react"
import { ResourceContext } from "../App"

import ResourceCard from "./ResourceCard"
import Modal from "./Modal"


const Resources = () => {

    //initialize modal state
    const [openModal, setOpenModal] = useState(false)
    const [modalName, setModalName] = useState('')

    //move resources out of context into their own object for referencing
    const contextObject = useContext(ResourceContext)
    const resources:Array<any> = []
    contextObject?.arr.map(el => resources.push(el))

    //onclick function to create modal
    const onClickFunc = (id?:string) => {

        if (openModal === false) {
            
            //filter all resources and get resource with matching id
            const singleResource = resources.filter(el => el._id === id)

            setModalName(singleResource[0].name)

            setOpenModal(true) 

        }   else {
            console.log('in here')
            setOpenModal(false)
        }

    }

    //create cards for display
    const cards = resources.map(el => <ResourceCard key={el._id} id={el._id} name={el.name} link={el.link} desc={el.desc} tags={el.tags} onClickFunc={onClickFunc}/>)

    return (
        <div className="py-16">
            <h1 className="text-white headings font-bold text-5xl mb-20">Resources</h1>
            {openModal && <Modal name={modalName} onClickFunc={onClickFunc}/>}
            <div className="flex justify-around flex-wrap">
                {cards}
            </div>
        </div>
    )
}

export default Resources