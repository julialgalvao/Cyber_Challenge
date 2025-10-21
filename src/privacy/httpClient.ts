import { appendAudit } from './audit';
import policy from './data-collection-policy.json';

type Policy = typeof policy;

function validateScope(scope: keyof Policy['scopes'], payload: Record<string, any>) {
  const allowed = (policy.scopes as any)[scope] || [];
  const keys = Object.keys(payload);
  const extras = keys.filter(k => !allowed.includes(k));
  if (extras.length > 0) {
    appendAudit({ type: 'DATA_MINIMIZATION_VIOLATION', scope: String(scope), extraKeys: extras, timestamp: Date.now() });
    console.warn(`[LGPD] Extra fields for scope "${String(scope)}":`, extras);
  }
}

export async function postSecure<T=any>(url: string, scope: keyof Policy['scopes'], payload: Record<string,any>): Promise<T> {
  if (!/^https:\/\//i.test(url)) {
    throw new Error('Insecure URL blocked by policy (HTTPS required).');
  }
  validateScope(scope, payload);
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json() as T;
}
