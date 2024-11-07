
import axios, { AxiosRequestConfig } from 'axios';

axios.defaults.withCredentials = true;

interface PostRequestOptions {
  url: string;
  data?: any;
  config?: AxiosRequestConfig;
}

const post = async ({ url, data = {}, config = {} }: PostRequestOptions) => {
  try {
    const response = await axios.post(url, data, config);
    return response.data;
  } catch (error: any) {
    console.error('Error in POST request:', error);
    return error.response ? error.response.data : error;
  }
};

export default post;
