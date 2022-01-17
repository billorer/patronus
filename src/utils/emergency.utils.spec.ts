import { emergencyDateFormatter } from './emergency.utils';

describe('EmergencyUtils', () => {
  it('should return formatted date', () => {
    expect(
      emergencyDateFormatter.format(Date.parse('2021-11-08T14:04:52.365+00:00'))
    ).toEqual('08/11/2021');
  });
});
