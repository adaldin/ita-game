import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
import { urls } from '../../constants/constants';

export const WikiContext = createContext();

export const WikiContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [stack, setStack] = useState('');
  const [stackData, setStackData] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(urls.categories);
        if (response.status === 200) {
          const { data } = response;
          setCategories(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getCategories();
  }, []);

  const getStackData = async (framework) => {
    try {
      const response = await axios.get(urls.stackData);
      if (response.status === 200) {
        const { data } = response;
        const selectedStack = data.filter((d) => d.stack === framework);
        setStackData(selectedStack);
        setStack(framework);
      }
    } catch (error) {
      console.error(error);
    }

    localStorage.setItem('currentFramework', JSON.stringify(framework));
  };

  const addResource = (resource) => {
    console.log('desde contx', resource);
    axios
      .post(`http://localhost:3002/stackData?stack=${stack}`, resource, {
        headers: {
          'content-type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <WikiContext.Provider
      value={{ categories, stackData, getStackData, addResource, stack }}
    >
      {children}
    </WikiContext.Provider>
  );
};
