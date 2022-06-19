import { gql, useApolloClient } from "@apollo/client";
import { useEffect, useState } from "react";

function Movies() {
  const client = useApolloClient();
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    client
      .query({
        query: gql`
          {
            allMovies {
              title
              id
            }
          }
        `,
      })
      .then((result) => setMovies(result.data.allMovies));
  }, [client]);
  return (
    <ul>
      {movies.map((movie: { id: number; title: string }) => (
        <li key={movie.id}>{movie.title}</li>
      ))}
    </ul>
  );
}

export default Movies;
