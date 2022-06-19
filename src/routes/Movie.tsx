import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const GET_MOVIE = gql`
  query getMovie($movieId: String!) {
    movie(id: $movieId) {
      id
      title
      large_cover_image
    }
  }
`;

function Movie() {
  const { id } = useParams();
  const { data, loading } = useQuery(GET_MOVIE, {
    variables: {
      movieId: id,
    },
  });
  return loading ? (
    <h1>Fetching Data...</h1>
  ) : (
    <div>
      <h1>{data.movie.title}</h1>
      <img src={data.movie.large_cover_image} alt="Movie Poster" />
    </div>
  );
}

export default Movie;
