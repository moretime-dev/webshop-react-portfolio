import React, { useState, useEffect } from "react";

import { db } from "../firebase_config";
import { collection, getDocs } from "firebase/firestore";

export const UsersContext = React.createContext();

const usersCollection = collection(db, "users");

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsersFromFireBase = async () => {
      const data = await getDocs(usersCollection);

      const usersArray = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setUsers(usersArray);
    };

    fetchUsersFromFireBase();
  }, []);

  return (
    <UsersContext.Provider value={[users, setUsers]}>
      {children}
    </UsersContext.Provider>
  );
};
