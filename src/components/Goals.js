import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import Notes from "./Notes";

const Goals = ({func}) => {
    const { auth } = useAuth()
    const id = auth.id

    const [completedGoals, setCompletedGoals] = useState();
    const [notCompletedGoals, setNotCompletedGoals] = useState();
    const [lastUpdated, setLastUpdated] = useState(false)
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getGoals = async () => {

            try {
                const response = await axiosPrivate.get('/goals', 
                {
                    signal: controller.signal,
                });
                const notCompletedResults = response.data.filter(el => el.user === id && !el.completed)
                const completedResults = response.data.filter(el => el.user === id && el.completed)

                isMounted && setCompletedGoals(completedResults)
                isMounted && setNotCompletedGoals(notCompletedResults)

            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }
        getGoals();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [lastUpdated])

    const updateCompleted = async (goal) => {

        
        const id = goal._id
        const completed = !goal.completed

        try {
            // Axios response is in JSON
            const response = await axiosPrivate.put('/goals', 
                JSON.stringify({ id, completed }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            console.log(response?.data)   

            setLastUpdated(prev => !prev)
        } catch (err) {
            console.log('throwing error in update completed goal')
            if (!err?.response) {
                console.log('No Server Response')
            } else {
                console.log('completed goal update Failed')
            }
        }
    }

    return (
        <article>
            <div className="flex justify-around mb-10">
                <div className="border-2 w-5/12 p-4 bg-slate-900 border-gray-500 rounded-lg">
                    <div className="flex justify-around mb-6 border-b-2 border-white">
                        <h2 className="text-2xl headings font-bold">Goals List</h2>
                        <button className="info-txt font-bold mb-12 bg-alien-green py-px px-8 rounded-md text-black"><Link to={'/goals/new'}>Add New Goal</Link></button>
                    </div>
                    {notCompletedGoals?.length ? (
                            <div className="h-[200px] pt-4 overflow-auto scrollbar">
                                <ul>
                                    {notCompletedGoals.map((goal) => (
                                    <div className="flex justify-between mb-4">
                                        <li key={goal?._id} className="text-white flex">

                                            <div className="completed ml-6">
                                                <input
                                                    type="checkbox"
                                                    checked={goal.completed}
                                                    id={goal.id}
                                                    onChange={() => updateCompleted({ ...goal })}
                                                />
                                                <label htmlFor={goal.id}></label>
                                            </div>

                                            <p className="ml-2 font-bold text-lg leading-tight headings hover:underline hover:cursor-pointer" onClick={() => func(goal.title, goal.text, false)}>{goal?.title}</p>
                                            
                                        </li>
                                        <button className="text-red-700 mr-10 leading-relaxed info-txt font-bold hover:underline"><Link to={`/goals/${goal._id}`}>Edit</Link></button>
                                    </div>
                                    
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <div>
                                <p>No goals to display</p>
                            </div>
                        )
                    }
                </div>
                <div className="w-6/12">
                    <Notes func={func}/>
                </div>
            </div>
            
            <div className="flex justify-center">
                <div className="border-2 w-[96%] p-4 bg-slate-900 border-gray-500 rounded-lg flex justify-center">
                    <div className="w-10/12">
                        <div className="border-b-2 border-white mb-4 pb-10">
                            <h2 className="text-2xl headings font-bold">Completed Goals List</h2>    
                        </div>
                        {completedGoals?.length
                            ? (
                                <div className="h-[200px] pt-4 overflow-auto scrollbar">
                                    <ul>
                                        {completedGoals.map((goal) => (
                                        <li key={goal?._id} className="text-white">
                                            <div className="flex mb-4">

                                                <div className="completed">
                                                    <input
                                                        type="checkbox"
                                                        checked={goal.completed}
                                                        id={goal.id}
                                                        onChange={() => updateCompleted({ ...goal })}
                                                    />
                                                    <label htmlFor={goal.id}></label>
                                                </div>

                                                <p className="ml-2 font-bold text-lg leading-tight headings">{goal?.title}</p>
                                                
                                            </div>
                                        </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <div>
                                    <p>No goals to display</p>
                                </div>
                            )
                        }
                    </div>
                    
                </div>
            </div>
            
            
        </article>
    );
};

export default Goals;