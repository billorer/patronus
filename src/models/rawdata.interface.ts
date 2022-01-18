import { Device } from './device.interface';
import { User } from './user.interface';

export interface RawData {
  emergency: {
    emergencyId: string;
    requestTime: Date;
  };
  device: Device;
  holder: User;
}
