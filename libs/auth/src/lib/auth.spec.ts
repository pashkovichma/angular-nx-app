import { auth } from './auth.interceptor';

describe('auth', () => {
  it('should work', () => {
    expect(auth()).toEqual('auth');
  });
});
