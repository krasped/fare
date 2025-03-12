import { AppDispatch, RootState, useAppDispatch } from '../store';
import { createSlice, createAsyncThunk, SerializedError, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { User} from '@/page-sections/admin/users/usersPage';
import { AdminApiUrls } from '../constants';
import { StrNum } from '@/models/common';
import { GenericState, MyKnownError, ReduxApiStatus } from '@/models/redux';
import { createUserApi, deleteUserApi, fetchUsersApi, updateUserApi } from './api/users';
import { Agencies, CreateUser } from '@/models/admin/userManagement';
import { fetchAgenciesApi } from './api/agencies';
const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch

  rejectValue: MyKnownError
  extra: { s: string; n: number }
}>()

export const fetchAgencies = createAppAsyncThunk('users/fetchAgencies', async () => {
  return await fetchAgenciesApi();
});

export const fetchUsers = createAppAsyncThunk('users/fetchUsers', async () => {
  return await fetchUsersApi();
});

// Create a new user
export const createUser = createAppAsyncThunk('users/createUser', async (newUser: CreateUser, {dispatch}) => {
  const data = await createUserApi(newUser);
  return { data, dispatch };
});

// Update a user
export const updateUser = createAppAsyncThunk('users/updateUser', async (updatedUser: User, {dispatch}) => {
  const data = await updateUserApi(updatedUser);
  return { data, dispatch };
});

// Delete a user
export const deleteUser = createAppAsyncThunk('users/deleteUser', async (userId: StrNum) => {
  const data = await deleteUserApi(userId);
  return data
});

const initialState: GenericState<{users: User[], usersDocuments:User[], agencies: Agencies[]}> = {
  data:{
    users:[],
    usersDocuments:[],
    agencies:[],
  }, // Инициализация как пустой массив
  status: 'idle',  // idle, loading, succeeded, failed
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAgencies.fulfilled, (state, action: PayloadAction<{agencies: Agencies[]}>) => {
        state.data.agencies = action.payload.agencies;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = 'succeeded';
        state.data.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        if (action.payload) {
          // Since we passed in `MyKnownError` to `rejectValue` in `updateUser`, the type information will be available here.
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error
        }
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<{data: User, dispatch: AppDispatch}>) => {
        action.payload.dispatch(fetchUsers)
        // state.data.users.push(action.payload.data);
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<{data: User, dispatch: AppDispatch}>) => {
        action.payload.dispatch(fetchUsers)
        // const index = state.data.users.findIndex((user) => user.id === action.payload.id);
        // if (index !== -1) {
        //   state.data.users[index] = action.payload;
        // }
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<StrNum>) => {
          state.data.users = state.data.users.filter((user) => user.user_id != action.payload);
        // state.users = state.users.filter((user) => user.id !== action.payload);
      });
  },
});

export const usersReducer = usersSlice.reducer;