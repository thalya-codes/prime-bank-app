import { IAnalyticsRepository } from '@/domain/repositories';
import { api } from '@/infrastructure/http/api';

export class AnalyticsService {
  static async getAnalytics(): Promise<any> {
    const response = await api.get(`analytics`);
    return response.data;
  }
}

const _: IAnalyticsRepository = AnalyticsService;

