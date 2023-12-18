import axios, { AxiosInstance, AxiosResponse } from 'axios';

class FetchApi {
  public fetchApi: AxiosInstance;

  constructor() {
    this.fetchApi = axios.create({
    });
  }

  async fetchData(endpoint: string): Promise<any> {
    try {
      const response: AxiosResponse = await this.fetchApi.get(endpoint);
      return response.data;
    } catch (error: any) {
      throw new Error('Error fetching data: ' + error.message);
    }
  }
}

export default FetchApi;