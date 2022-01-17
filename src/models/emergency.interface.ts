import { Device } from './device.interface';
import { User } from './user.interface';

export interface Emergency {
  emergencyId: string;
  requestTime: Date;
  device: Device;
  user: User;
}
