import axios from "axios";

export const fetcher = (url: string) =>
  axios
    .get(`${process.env.REACT_APP_PROXY_URL}${encodeURIComponent(url)}`)
    .then((res) => res.data);
