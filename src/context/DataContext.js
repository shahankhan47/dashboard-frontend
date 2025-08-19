import { createContext, useContext, useEffect, useState } from "react";
import getDashboardServices from "../services/dashboard";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    allProjects: [],
    totalProjects: [],
    owners: [],
    activeUsers: {},
    conversationUsers: [],
    usersWithNoProjects: [],
    obsoleteProjects: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          allProjects,
          totalProjects,
          owners,
          activeUsers,
          conversationUsers,
          usersWithNoProjects,
          obsoleteProjects,
        } = await getDashboardServices();

        setData({
          allProjects,
          totalProjects,
          owners,
          activeUsers,
          conversationUsers,
          usersWithNoProjects,
          obsoleteProjects,
          loading: false,
          error: null,
        });
      } catch (err) {
        setData((prev) => ({ ...prev, loading: false, error: err }));
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
