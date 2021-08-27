async function fetchBeers(
  apiFilters,
  searchName,
  paginationSize = "10",
  currentPage = "1",
  setStateFunc
) {
  const serachfieldTotal = apiFilters.join("") + searchName.join("");
  const request = await fetch(
    `${process.env.REACT_APP_API_LINK}page=${currentPage}&per_page=${paginationSize}${serachfieldTotal}`
  );
  const response = await request.json();
  setStateFunc(response);
}


export default fetchBeers