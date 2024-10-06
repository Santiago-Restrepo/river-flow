export interface FetchDataParams {
  url: string;
}
const fetchData = async (params: FetchDataParams) => {
  const { url } = params;
  const data = await fetch(url);
  return data.json();
};

export default fetchData;
