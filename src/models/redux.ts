import { SerializedError } from "@reduxjs/toolkit";

export type ReduxApiStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface GenericState<T> {
  data: T
  status: ReduxApiStatus,
  error: null|string|SerializedError
}

export interface MyKnownError {
  errorMessage: string
}