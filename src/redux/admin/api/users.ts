import { CreateUser } from "@/models/admin/userManagement"
import { StrNum } from "@/models/common"
import { User } from "@/page-sections/admin/users/usersPage"
import { AdminApiUrls } from "@/redux/constants"
import axios from "axios"

export const fetchUsersApi = async () => {
  const response = await axios.get<User[]>(AdminApiUrls.getAllUsers);
  return response.data;
};

// Функция для создания нового пользователя
export const createUserApi = async (newUser: CreateUser) => {
  const response = await axios.post(AdminApiUrls.createUser, newUser);
  return response.data;
};

// Функция для обновления пользователя
export const deleteUserApi = async (userId: StrNum) => {
  const response = await axios.put(AdminApiUrls.deleteUser, userId);
  return response.data;
};

export const deleteUser = async (userId: StrNum) => {
  await axios.delete(`${AdminApiUrls.updateUser}`);
  return userId;
};

export const updateUserApi = async (updatedUser: User) => {
  const response = await axios.put(AdminApiUrls.updateUser, updatedUser);
  return response.data;
};



