import { createContext, useEffect, useState } from "react";

export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
  const [dtoken, setDToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('dtoken');
    if (storedToken) {
      setDToken(storedToken);
    }
  }, []);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const value = {
    backendUrl,
    dtoken,
    setDToken,
  };

  return (
    <DoctorContext.Provider value={value}>
      {children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
