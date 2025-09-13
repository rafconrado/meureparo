import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserData {
  id: string;
  name: string;
  email: string;
  password?: string;
}

interface UpdateUserData {
  name: string;
  email: string;
}

const USERS_KEY = "@app:users";

export async function getAllUsers(): Promise<UserData[]> {
  const json = await AsyncStorage.getItem(USERS_KEY);
  console.log("Usuários no AsyncStorage:", json);
  return json ? JSON.parse(json) : [];
}

export async function saveUser(user: UserData): Promise<void> {
  const users = await getAllUsers();
  users.push({
    ...user,
    email: user.email.trim().toLowerCase(),
  });
  console.log("Salvando novo array de usuários:", JSON.stringify(users));
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export async function findUserByEmail(email: string): Promise<UserData | null> {
  const users = await getAllUsers();
  const normalizedEmail = email.trim().toLowerCase();
  return (
    users.find((user) => user.email.trim().toLowerCase() === normalizedEmail) ??
    null
  );
}

export async function updateUserById(
  userId: string,
  dataToUpdate: UpdateUserData
): Promise<UserData> {
  const users = await getAllUsers();

  const userIndex = users.findIndex((user) => user.id === userId);

  // Verifica se o usuário foi encontrado
  if (userIndex === -1) {
    throw new Error("Usuário não encontrado para atualização.");
  }

  const updatedUser = {
    ...users[userIndex],
    ...dataToUpdate,
  };

  users[userIndex] = updatedUser;

  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));

  console.log(`Usuário ${userId} atualizado com sucesso.`);

  return updatedUser;
}
