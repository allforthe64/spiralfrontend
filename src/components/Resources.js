import { useContext, useState } from "react"
import { ResourceContext } from "../App"
import { Link } from "react-router-dom"

import ResourceCard from "./ResourceCard"
import Modal from "./Modal"
import Tag from "./Tag"

import { TAGS } from "../config/tags"

import useAuth from "../hooks/useAuth"



const Resources = () => {

    const { auth } = useAuth()

    let admin = false

    if (auth.roles.includes(5150)) {
        admin = true
    }

    //initialize modal state
    const [modalId, setModalId] = useState('')
    const [openModal, setOpenModal] = useState(false)
    const [modalName, setModalName] = useState('')
    const [modalLongDesc, setModalLongDesc] = useState('')
    const [tutorials, setTutorials] = useState([])
    const [tutLink, setTutLink] = useState('')
    const [filters, setFilters] = useState([])

    //move resources out of context into their own object for referencing
    const contextObject = useContext(ResourceContext)
    let resources = []
    let filtered = []
    contextObject?.arr.map(el => resources.push(el))


    //onclick function to create modal
    const onClickFunc = (id) => {

        if (openModal === false) {
            
            //filter all resources and get resource with matching id
            const singleResource = resources.filter(el => el._id === id)

            console.log(singleResource)

            setModalId(singleResource[0]._id)
            setModalName(singleResource[0].name)
            setModalLongDesc(singleResource[0].longDesc)
            setTutorials(singleResource[0].tutorials)
            setTutLink(singleResource[0].link)

            setOpenModal(true) 

        }   else {
            setOpenModal(false)
        }

    }

    //onclick function to update filters
    const updateFilters = (name) => {
        if (filters.includes(name)) {
            setFilters(prev => prev.filter(el => el !== name))
        } else {
            setFilters(prev => [...prev, name])
        }
    }

    if (filters.length > 0) {
        for (let i of resources) {
            let success = filters.every(el => i.tags.indexOf(el) !== -1)
            if (success) filtered.push(i)
        }
        resources = filtered
    }

     //create cards for display
     let cards;
     
    if (resources.length > 0 && resources) {
        cards = resources.map(el => <ResourceCard key={el._id} id={el._id} name={el.name} link={el.link} desc={el.desc} tags={el.tags} tutorials={el.tutorials} onClickFunc={onClickFunc} admin={admin}/>)
    } else {
        cards = (<p className="text-white my-20 text-3xl headings font-bold w-8/12">Oops! We couldn't find any resources matching those filters &#128531;</p>)
    }
    
    //create li elements
    const objVals = Object.values(TAGS)
    const tags = objVals.map(el => <Tag name={el} key={el} func={updateFilters} />)

    return (
        <div className="py-16">
            <h1 className="text-white headings font-bold text-5xl mb-20">Resources</h1>
            {openModal && <Modal id={modalId} name={modalName} longDesc={modalLongDesc} tutorials={tutorials} link={tutLink} onClickFunc={onClickFunc}/>}
            <div>
                <nav className="filter-nav info-txt border-white border-b mb-10">
                    <label htmlFor="touch"><span className="filter-span text-left">{filters.length > 0 ? `Filters (${filters.length})` : 'Filters'}</span></label>               
                    <input type="checkbox" id="touch" /> 

                    <ul className="slide bg-inherit">
                        {tags}
                    </ul>

                </nav> 
            </div>
            <div className="flex justify-around flex-wrap">
                {cards}
            </div>
            {admin && 
                <div className="addResource text-white">
                    <Link to={'/resources/new'}>Add Resources</Link>
                </div>
            }
        </div>
    )
}

export default Resources