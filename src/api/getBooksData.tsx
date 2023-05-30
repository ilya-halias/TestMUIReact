
export async function fetchBooksJSON(){
  const response = await fetch("https://api.itbook.store/1.0/search/mongodb");
  const books = await response.json();
  return books;
}
export default fetchBooksJSON()

