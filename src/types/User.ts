export interface User {
    uid: string;
    displayName?: string;
    email?: string;
    password?: string;
    photoURL?: string;
    emailVerified: boolean;
    phoneNumber?: string;
    providerId: string;
    additionalData: Record<string, any>;
}
  