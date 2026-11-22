export const syncStatus = {
  enabled: false,
  reason:
    "Authenticated cloud synchronization is not implemented. All progress remains on this device.",
} as const;
export async function syncProgress(): Promise<never> {
  throw new Error(syncStatus.reason);
}
