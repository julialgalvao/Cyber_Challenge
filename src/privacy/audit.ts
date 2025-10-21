import AsyncStorage from '@react-native-async-storage/async-storage';

export type AuditEvent =
  | { type: 'CONSENT_GIVEN'; version: number; timestamp: number }
  | { type: 'CONSENT_REVOKED'; version: number; timestamp: number }
  | { type: 'DATA_MINIMIZATION_VIOLATION'; scope: string; extraKeys: string[]; timestamp: number }
  | { type: 'RBAC_DENIED'; role: string; action: string; resource: string; timestamp: number }
  | { type: 'EXPORT_DATA'; bytes: number; timestamp: number }
  | { type: 'DELETE_DATA'; keys: string[]; timestamp: number };

const KEY = 'audit:events';

export async function appendAudit(event: AuditEvent) {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    const arr: AuditEvent[] = raw ? JSON.parse(raw) : [];
    arr.push(event);
    await AsyncStorage.setItem(KEY, JSON.stringify(arr));
  } catch {}
}

export async function getAudit(): Promise<AuditEvent[]> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
