import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const ALL_MOVIES = gql`
  query {
    allMovies {
      id
      title
    }
  }
`;

function Movies() {
  const { data, loading, error } = useQuery(ALL_MOVIES);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Cannot Fetch T.T</div>;
  return (
    <>
      <h1>Movies</h1>
      <ul>
        {data.allMovies.map((movie: { id: number; title: string }) => (
          <li key={movie.id}>
            <Link to={`movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Movies;
