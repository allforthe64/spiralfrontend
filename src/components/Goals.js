import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Goals = () => {
    const { auth } = useAuth()
    const id = auth.id

    console.log(`id in goals: ${id}`)

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
                const results = response.data.filter(el => el.user === id)
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

    return (
        <article>
            <h2>Goals List</h2>
            {goals?.length
                ? (
                    <ul>
                        {goals.map((goal) => (
                        <li key={goal?._id} className="text-white">
                            {goal?.title}
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