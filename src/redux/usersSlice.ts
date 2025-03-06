import { createSlice, createAsyncThunk, SerializedError } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch, RootState } from './store';
import { User} from '@/page-sections/admin/users/usersPage';

interface GenericState<T> {
  users?: T
  status: 'idle' | 'loading' | 'succeeded'|'failed',
  error: null|string|SerializedError
}

interface MyKnownError {
  errorMessage: string
  // ...
}

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
  rejectValue: MyKnownError
  extra: { s: string; n: number }
}>()

// Fetch users from the API
export const fetchUsers = createAppAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  return response.data;
});

// Create a new user
export const createUser = createAppAsyncThunk('users/createUser', async (newUser: User) => {
  const response = await axios.post('https://jsonplaceholder.typicode.com/users', newUser);
  return response.data as User;
});

// Update a user
export const updateUser = createAppAsyncThunk('users/updateUser', async (updatedUser: User) => {
  const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${updatedUser.id}`, updatedUser);
  return response.data;
});

// Delete a user
export const deleteUser = createAppAsyncThunk('users/deleteUser', async (userId: User) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/users/${userId.id}`);
  return userId;
});


const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    status: 'idle',  // idle, loading, succeeded, failed
    error: null,
  } as GenericState<User[]>,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        if (action.payload) {
          // Since we passed in `MyKnownError` to `rejectValue` in `updateUser`, the type information will be available here.
          state.error = action.payload.errorMessage
        } else {
          state.error = action.error
        }
      })
      .addCase(createUser.fulfilled, (state, action) => {
        if (!state.users) {
          state.users = []; // Инициализация, если users undefined
        }
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        if (!state.users) {
          state.users = []; // Инициализация, если users undefined
        }
        state.users.push(action.payload);
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        if (!state.users) {
          state.users = []; // Инициализация, если users undefined
        }
        state.users.push(action.payload);
        if (action.payload) {
          state.users = state.users.filter((user) => user.id !== action.payload.id);
        }
        // state.users = state.users.filter((user) => user.id !== action.payload);
      });
  },
});

export const usersReducer = usersSlice.reducer;