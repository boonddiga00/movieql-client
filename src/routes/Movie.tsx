import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const GET_MOVIE = gql`
  query getMovie($movieId: String!) {
    movie(id: $movieId) {
      id
      title
      large_cover_image
      isLiked @client
    }
  }
`;

function Movie() {
  const { id } = useParams();
  const {
    data,
    loading,
    client: { cache },
  } = useQuery(GET_MOVIE, {
    variables: {
      movieId: id,
    },
  });
  const onClick = () => {
    cache.writeFragment({
      id: `Movie:${id}`,
      fragment: gql`
        fragment MovieFragment on Movie {
          isLiked
        }
      `,
      data: {
        isLiked: !data.movie.isLiked,
      },
    });
  };
  return loading ? (
    <h1>Fetching Data...</h1>
  ) : (
    <div>
      <h1>{data?.movie?.title}</h1>
      <button onClick={onClick}>
        {data?.movie?.isLiked ? "Unlike" : "Like"}
      </button>
      <img src={data?.movie?.large_cover_image} alt="Movie Poster" />
    </div>
  );
}

export default Movie;
