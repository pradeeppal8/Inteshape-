import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_EMAIL_KEY = '@inteshape/auth-email';

export const getAuthEmail = async () => {
  const email = await AsyncStorage.getItem(AUTH_EMAIL_KEY);
  return email?.trim() || null;
};

export const saveAuthEmail = (email: string) =>
  AsyncStorage.setItem(AUTH_EMAIL_KEY, email.trim());

export const clearAuthEmail = () => AsyncStorage.removeItem(AUTH_EMAIL_KEY);
