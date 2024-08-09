import { useAxios } from "./DataFetching";

async function postData(url, token, data) {
  const { axiosInstance } = useAxios(token);
  try {
    const response = await axiosInstance.post(url, data);

    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default postData;
