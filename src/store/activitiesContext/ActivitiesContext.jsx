import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const ActivitiesContext = createContext();

const currentUser = {
  id: "63e9d29bb04cb600417abcb6",
  name: "Ona Costa",
  points: 80,

};
const url = "https://itacademy.onrender.com/api/activity/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2U5ZDA1OGIwNGNiNjAwNDE3YWJjYWUiLCJpYXQiOjE2NzYyNjc3MjZ9.4NFtPYgOQnQbWeAQ3Ow0qhyeMszw8cqC5TlOBRlaynM";

const options = {
  headers: {
    Authorization: `Bearer ${token}`,
  },

};

export const ActivitiesContextProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  const [activitiesAll, setActivitiesAll] = useState([]);

  useEffect(() => {
    let dataAll = [];
    const getActivitiesOfAUser = async () => {
      try {
        const response = await axios.get(url, options);
        if (response.status === 200) {
          const { data } = response;
          dataAll = data;
          setActivitiesAll(dataAll);
        }
      } catch (error) {
        console.error(error);
      }
      let dataUser = dataAll.filter(
        (user) => user.doneBy._id == currentUser.id
      );
      setActivities(dataUser);
    };
    getActivitiesOfAUser();
  }, []);


  return (
    <ActivitiesContext.Provider value={{ activities, activitiesAll }}>
      {children}
    </ActivitiesContext.Provider>
  );
};
