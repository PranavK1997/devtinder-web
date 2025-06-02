import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      // Handle Error Case
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0)
    return <h1 className="text-center font-bold"> No Connections Found!!!</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, photoURL, age, gender, about } =
          connection;

        return (
          <div
            key={_id}
            className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
          >
            <div className="flex items-center">
              <img
                alt="photo"
                className="w-20 h-20 rounded-full object-cover"
                src={photoURL}
              />
              <div className="text-left mx-4">
                <h2 className="font-bold text-xl text-white">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && (
                  <p className="text-gray-300">{age + ", " + gender}</p>
                )}
                <p className="text-gray-400">{about}</p>
              </div>
            </div>

            <Link to={"/chat/" + _id}>
              <button className="btn btn-primary">Chat</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
export default Connections;
