import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/users");
        setUsers(res.data);
      } catch (err) {
        alert(err.response.data);
      }
    };
    fetchData();
  }, []);

  return <div>users</div>;
};

export default Users;
