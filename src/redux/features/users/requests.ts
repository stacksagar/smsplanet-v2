import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (params?: any) => {
    const search_query = new URLSearchParams(params)?.toString();
    const { data } = await axios.get(`/api/users?${search_query}`);
    return data;
  }
);
