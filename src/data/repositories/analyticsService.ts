import { api } from './api';

export class AnalyticsService {
  static async getAnalytics(): Promise<any> {
    const response = await api.get(`analytics`);
    return response.data;
  }
}

