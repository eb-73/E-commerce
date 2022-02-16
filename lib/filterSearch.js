const filterSearch = async (query, value) => {
  const res = await fetch(`/api/searching?${query}=${value}`);
  const data = await res.json();
  return data;
};
export default filterSearch;
