import React, { useState, useEffect } from "react";
import axios from "axios";

const Users = () => {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const result = await axios("http://127.0.0.1:8000/api/admin/users");
        setRows(result.data.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>Users Page</h1>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Something wrong...</div>}
      {!isLoading && (
        <ul>
          {rows.map(item => (
            <p>{item.name}</p>
          ))}
        </ul>
      )}
    </>
  );
};

export default Users;
