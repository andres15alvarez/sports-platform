"use client";

import useBasketballData from "../hooks/useBasketball";

const Home = () => {
  const { leagues, games, error, loading } = useBasketballData();

  if (loading) return null; 
  if (error) return null;   

  return (
    <div>
      <h1>Basketball Data</h1>
      <p>Revisa la consola para ver los datos de ligas y juegos.</p>
    </div>
  );
};

export default Home;
