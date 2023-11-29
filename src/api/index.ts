import axios from "axios";

export const fetcher = (url: string) =>
  axios
    .get(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`)
    .then((res) => res.data);
