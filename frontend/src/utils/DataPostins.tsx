import { AxiosResponse } from "axios";
import { useAxios } from "./DataFetching";

async function postData<T>(
  url: string,
  token: string,
  data: T
): Promise<AxiosResponse<T>> {
  const { axiosInstance } = useAxios(token);
  try {
    const response = await axiosInstance.post<T>(url, data);

    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default postData;
