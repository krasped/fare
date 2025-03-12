import { Agencies } from "@/models/admin/userManagement"
import { MyKnownError } from "@/models/redux"
import { User } from "@/page-sections/admin/users/usersPage"
import { AdminApiUrls } from "@/redux/constants"
import { AppDispatch, RootState } from "@/redux/store"
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"





export const fetchAgenciesApi = async () => {
  const response = await axios.get<{agencies: Agencies[]}>(AdminApiUrls.getAllAgencies);
  return response.data;
};