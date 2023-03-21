import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Goals = () => {
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
            <h2>Goals List</h2>
            {completedGoals?.length
                ? (
                    <ul>
                        {completedGoals.map((goal) => (
                        <li key={goal?._id} className="text-white">
                            {goal?.title}
                            <div className="completed">
                                <input
                                    type="checkbox"
                                    checked={goal.completed}
                                    id={goal.id}
                                    onChange={() => updateCompleted({ ...goal })}
                                />
                                <label htmlFor={goal.id}></label>
                            </div>
                        </li>
                        ))}
                    </ul>
                ) : (
                    <div>
                        <p>No goals to display</p>
                    </div>
                )
            }
            <h2>Not Completed Goals List</h2>
            {notCompletedGoals?.length
                ? (
                    <ul>
                        {notCompletedGoals.map((goal) => (
                        <li key={goal?._id} className="text-white">
                            {goal?.title}
                            <div className="completed">
                                <input
                                    type="checkbox"
                                    checked={goal.completed}
                                    id={goal.id}
                                    onChange={() => updateCompleted({ ...goal })}
                                />
                                <label htmlFor={goal.id}></label>
                            </div>
                            <Link to={`/goals/${goal._id}`} className="text-red-700">Edit</Link>
                        </li>
                        ))}
                    </ul>
                ) : (
                    <div>
                        <p>No goals to display</p>
                    </div>
                )
            }
            <Link to={'/goals/new'} className="text-yellow-500">Add New Goal</Link>
        </article>
    );
};

export default Goals;