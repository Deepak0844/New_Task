import axios from "axios";
import { useEffect, useState } from "react";

const InfiniteScroll = () => {
  const [pokemons, setPokemons] = useState({
    apiUrl: "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0",
    data: [],
    loading: false,
  });

  const fetchApi = () => {
    setPokemons((prevState) => ({
      ...prevState,
      loading: true,
    }));

    axios
      .get(pokemons.apiUrl)
      .then(({ data }) => {
        setPokemons((prevState) => ({
          ...prevState,
          apiUrl: data.next,
          loading: false,
          data: [...prevState.data, ...data.results],
        }));
      })
      .catch((err) => {
        console.log(err);
        setPokemons((prevState) => ({
          ...prevState,
          loading: false,
        }));
      });
  };
  useEffect(() => {
    fetchApi();
  }, []);

  const scrollFn = (e) => {
    if (window.innerHeight + e.target.scrollTop + 50 >= e.target.scrollHeight) {
      if (pokemons.apiUrl !== null && !pokemons.loading) {
        fetchApi();
      }
    }
  };

  return (
    <div style={{ height: "100vh", overflowY: "scroll" }} onScroll={scrollFn}>
      {pokemons.data.map((p, index) => (
        <div key={index}>
          <h3 style={{ marginBottom: "10px" }}>{p.name}</h3>
        </div>
      ))}
      {pokemons.loading && <p>loading...</p>}
    </div>
  );
};

export default InfiniteScroll;
