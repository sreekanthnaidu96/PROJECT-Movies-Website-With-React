function useGenres(SelectedGenres) {
  if (SelectedGenres.length < 1) return "";
  const GenreIds = SelectedGenres.map((one) => one.id);
  return GenreIds.reduce((acc, curr) => acc + "," + curr);
}

export default useGenres;
