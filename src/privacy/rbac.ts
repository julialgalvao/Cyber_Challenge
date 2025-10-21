import { appendAudit } from './audit';

export type Role = 'guest' | 'user' | 'admin';

type PermissionMap = {
  [resource: string]: {
    [action: string]: Role[];
  }
};

export const policy: PermissionMap = {
  'learning-path': {
    'view': ['user','admin'],
    'create': ['admin']
  },
  'profile': {
    'view': ['user','admin'],
    'update': ['user','admin']
  }
};

export async function can(role: Role, resource: string, action: string) {
  const allowed = policy[resource]?.[action] ?? [];
  const ok = allowed.includes(role);
  if (!ok) await appendAudit({ type: 'RBAC_DENIED', role, resource, action, timestamp: Date.now() });
  return ok;
}
