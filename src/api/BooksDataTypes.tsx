export type ResponseFetchApiType = {
  error: string;
  page: string;
  total: string;
  books: BookDataType[];
};

export type BookDataType = {
  title: string;
  image: string;
  isbn13: string;
  price: string;
  subtitle: string;
  url: string;
};
