import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

interface authType {
  user: userType | null;
  token: string | null;
  isLoading: boolean;
  message: string | null;
}

interface userType {
  _id: string;
  username: string;
  password: string;
  posts: [];
  createdAt: string;
  updatedAt: string;
}

interface paramsType {
  username: string;
  password: string;
}

const initialState: authType = {
  user: null,
  token: null,
  isLoading: false,
  message: null,
};

// REGISTRATION USER
export const registrUser = createAsyncThunk<authType, paramsType>(
  'auth/registrUser',
  async ({ username, password }) => {
    try {
      const { data } = await axios.post('auth/registration', {
        username,
        password,
      });

      if (data.token) {
        window.localStorage.setItem('token', data.token);
      }

      return data;
    } catch (error: any) {
      console.log(error);
    }
  }
);

// LOGIN USER
export const loginUser = createAsyncThunk<authType, paramsType>(
  'auth/loginUser',
  async ({ username, password }) => {
    try {
      const { data } = await axios.post('auth/login', {
        username,
        password,
      });

      if (data.token) {
        window.localStorage.setItem('token', data.token);
      }

      return data;
    } catch (error: any) {
      console.log(error);
    }
  }
);

// GET ME
export const getMe = createAsyncThunk<authType>('auth/getMe', async () => {
  try {
    const { data } = await axios.get('auth/me');

    return data;
  } catch (error: any) {
    console.log(error);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = '';
      state.isLoading = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTR USER
      .addCase(registrUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registrUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.message = action.payload.message;
      })
      .addCase(registrUser.rejected, (state) => {
        state.isLoading = false;
      })
      // LOGIN USER
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.message = action.payload.message;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.message = '';
      })
      // GET ME - ПРОВЕРКА АВТОРИЗАЦИИ
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload?.user;
        state.message = action.payload.message;
        state.token = action.payload?.token;
      })
      .addCase(getMe.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
