import policy from '../privacy/data-collection-policy.json';
import { } from '../privacy/httpClient';

test('policy has login scope', () => {
  expect(Object.keys(policy.scopes)).toContain('login');
});
