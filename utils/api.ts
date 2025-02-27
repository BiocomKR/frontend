import axios from "axios"; 

export const fetchData = async <T>(url: string): Promise<T> => {
  const response = await axios.get<T>(url);
  return response.data;
};

export const postData = async <T>(url: string, data: any): Promise<T> => {
  const response = await axios.post<T>(url, data);
  return response.data;
};
