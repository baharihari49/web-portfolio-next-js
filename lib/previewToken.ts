import { createHmac } from 'crypto';

const SECRET = process.env.PREVIEW_TOKEN_SECRET || 'default-secret-change-in-production';
const TOKEN_EXPIRY_MINUTES = 10;

/**
 * Generate a signed preview token for a collection
 * Token format: {collectionId}.{expiry}.{signature}
 */
export function generatePreviewToken(collectionId: string): string {
  const expiry = Date.now() + TOKEN_EXPIRY_MINUTES * 60 * 1000;
  const data = `${collectionId}.${expiry}`;
  const signature = createHmac('sha256', SECRET)
    .update(data)
    .digest('hex')
    .substring(0, 16); // Use first 16 chars for shorter token

  return `${data}.${signature}`;
}

/**
 * Validate a preview token
 * Returns the collection ID if valid, null otherwise
 */
export function validatePreviewToken(token: string): { valid: boolean; collectionId: string | null } {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return { valid: false, collectionId: null };
    }

    const [collectionId, expiryStr, providedSignature] = parts;
    const expiry = parseInt(expiryStr, 10);

    // Check if token is expired
    if (Date.now() > expiry) {
      return { valid: false, collectionId: null };
    }

    // Verify signature
    const data = `${collectionId}.${expiryStr}`;
    const expectedSignature = createHmac('sha256', SECRET)
      .update(data)
      .digest('hex')
      .substring(0, 16);

    if (providedSignature !== expectedSignature) {
      return { valid: false, collectionId: null };
    }

    return { valid: true, collectionId };
  } catch {
    return { valid: false, collectionId: null };
  }
}

/**
 * Generate a preview URL for a collection
 */
export function getPreviewUrl(collectionId: string): string {
  const token = generatePreviewToken(collectionId);
  return `/api/preview/${collectionId}?token=${token}`;
}
