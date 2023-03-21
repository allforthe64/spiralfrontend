import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const MGoals = () => {
    const { auth } = useAuth()
    const id = auth.id

    const [mgoals, setMGoals] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getMGoals = async () => {

            try {
                const response = await axiosPrivate.get('/mgoals', 
                {
                    signal: controller.signal,
                });
                const results = response.data.filter(el => el.user === id)
                isMounted && setMGoals(results);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }
        getMGoals();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return (
        <article>
            <h2>Monthly Goals List</h2>
            {mgoals?.length
                ? (
                    <ul>
                        {mgoals.map((mgoal) => (
                        <li key={mgoal?._id} className="text-white">
                            {mgoal?.title}
                            <Link to={`/mgoals/${mgoal._id}`} className="text-red-700">Edit</Link>
                        </li>
                        ))}
                    </ul>
                ) : (
                    <div>
                        <p>No monthly goals to display</p>
                    </div>
                )
            }
            <Link to={'/mgoals/new'} className="text-yellow-500">Add New Monthly Goal</Link>
        </article>
    );
};

export default MGoals;