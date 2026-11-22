// Intentionally no queue: collecting upload-ready child data before authentication is designed would be unsafe.
export const cloudQueueEnabled = false;
export async function pendingSyncCount() {
  return 0;
}
