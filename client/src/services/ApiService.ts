import axios from 'axios';
import { Car } from '../types/Car';

class ApiService {
  private baseUrl = 'http://localhost:5191/api';

  // Car-related API methods
  async getCars(): Promise<Car[]> {
    try {
      const response = await axios.get<Car[]>(`${this.baseUrl}/Car`);
      return response.data;
    } catch (error) {
      console.error('Error fetching cars:', error);
      throw error;
    }
  }

  async getCarById(id: number): Promise<Car> {
    try {
      const response = await axios.get<Car>(`${this.baseUrl}/Car/${id}`);
      return response.data;
    } catch(error) {
      console.error(`Error fetching car with id ${id}:`, error);
      throw error;
    }
  }

  async getCarByQuery(query: string): Promise<Car[]> {
    try {
      const response = await axios.get<Car[]>(`${this.baseUrl}/Car/Search`, { 
        params: { query } 
      });
      return response.data;
    } catch(error) {
      console.error('Error fetching cars', error);
      throw error; // Added throw to propagate the error
    }
  }

  async addOrUpdateCar(car: Car): Promise<Car> {
    try {
      const response = await axios.post<Car>(`${this.baseUrl}/Car`, car);
      return response.data;
    } catch(error) {
      console.error('Error creating/updating car', error);
      throw error;
    }
  }

  async deleteCar(id: number): Promise<Car> {
    try {
      const response = await axios.delete<Car>(`${this.baseUrl}/Car/${id}`);
      return response.data;
    } catch(error) {
      console.error('Error deleting car', error);
      throw error;
    }
  }
}




export const apiService = new ApiService();