import { UserService } from '../api';
import { kyInstance } from './ky';

export const userApi = new UserService(kyInstance);
