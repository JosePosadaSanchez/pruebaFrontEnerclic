import axios from "axios";

export const getData = async (url) => {
  try {
    return await axios.get(url);
  } catch (error) {
    return error;
  }
};
