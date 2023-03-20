import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const CompletedGoals = () => {
    const { auth } = useAuth()
    const id = auth.id

    const [goals, setGoals] = useState();
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
                const results = response.data.filter(el => el.user === id && el.completed)
                isMounted && setGoals(results);
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
    }, [])

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
            //Need to re-render goals to show updated checkmark
            
            navigate('/dashboard', { replace: true })
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
            <h2>Completed Goals List</h2>
            {goals?.length
                ? (
                    <ul>
                        {goals.map((goal) => (
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
                        <p>Go finish some goals!</p>
                    </div>
                )
            }
            <Link to={'/goals/new'} className="text-yellow-500">Add New Goal</Link>
        </article>
    );
};

export default CompletedGoals;