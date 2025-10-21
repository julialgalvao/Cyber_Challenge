import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { appendAudit } from './audit';

const PREFIXES = ['secure:', 'audit:'];

export async function exportUserData(): Promise<string> {
  const keys = await AsyncStorage.getAllKeys();
  const filtered = keys.filter(k => PREFIXES.some(p => k.startsWith(p)));
  const entries = await AsyncStorage.multiGet(filtered);
  const obj: Record<string, any> = {};
  for (const [k,v] of entries) obj[k] = v;
  const path = FileSystem.cacheDirectory + 'user-export.json';
  await FileSystem.writeAsStringAsync(path, JSON.stringify(obj, null, 2));
  await appendAudit({ type: 'EXPORT_DATA', bytes: JSON.stringify(obj).length, timestamp: Date.now() });
  return path;
}

export async function deleteUserData(): Promise<void> {
  const keys = await AsyncStorage.getAllKeys();
  const filtered = keys.filter(k => PREFIXES.some(p => k.startsWith(p)));
  await AsyncStorage.multiRemove(filtered);
  await appendAudit({ type: 'DELETE_DATA', keys: filtered, timestamp: Date.now() });
}
