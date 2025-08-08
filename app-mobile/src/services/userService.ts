import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserData {
  id: string;
  name: string;
  email: string;
  password: string;
}

const USERS_KEY = "@app:users";

export async function getAllUsers(): Promise<UserData[]> {
  const json = await AsyncStorage.getItem(USERS_KEY);
  return json ? JSON.parse(json) : [];
}

export async function saveUser(user: UserData): Promise<void> {
  const users = await getAllUsers();
  users.push(user);
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export async function findUserByEmail(email: string): Promise<UserData | null> {
  const users = await getAllUsers();
  return users.find((user) => user.email === email) ?? null;
}
