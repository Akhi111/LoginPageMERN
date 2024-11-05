import axios from "axios";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState("");
  const [error, setError] = useState(null);
  const token = JSON.parse(localStorage.getItem("token"));

  if (!token) {
    return (
      <div className="background mt-0">
        <p className="text-center text-red-500 font-semibold">
          No token found. Please log in.
        </p>
      </div>
    );
  }

  const fetchData = async () => {
    if (!token) {
      setError("No token found. Please log in.");
      setLoading(false);
      return;
    }
    const header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/profile",
        {},
        header
      );
      setData(res.data.data);
      setLoading(false);
      console.log("User data fetched: ", res);
    } catch (error) {
      console.log("Error fetching data: ", error.message);
      setError("Failed to fetch user data.");
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="background mt-0">
        <p className="text-center font-semibold">Data is loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="background mt-0">
        <p className="text-center text-red-500 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    // <div className="background mt-0">
    //   <p className=" text-center font-semibold">
    //     {loading && "Data is loading..."}
    //   </p>
    //   <div className=" max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden">
    //     <div className=" p-6">
    //       <h2 className=" text-2xl font-bold text-gray-900 mb-2">
    //         Name: {data.name}
    //       </h2>
    //       <p className=" text-gray-700 text-base mb-2">Email: {data.email}</p>
    //       <p className=" text-gray-700 text-base">ID: {data.id}</p>
    //     </div>
    //   </div>
    // </div>
    <div className="background mt-0">
      <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Name: {data?.name || "N/A"}
          </h2>
          <p className="text-gray-700 text-base mb-2">
            Email: {data?.email || "N/A"}
          </p>
          <p className="text-gray-700 text-base">ID: {data?.id || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
