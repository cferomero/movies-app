import useApi from "@/app/hooks/useApi";

export function CardCarrousel({ endpoint }: { endpoint: string }) {
  const { movies, isLoading, error } = useApi(endpoint);

  if (isLoading) {
    return <div>Cargando películas...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full flex justify-center">
      <ul>
        {movies.map((movie) => (
          <li key={movie.title}>
            <small>{movie.title}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
