'use client';

import axios from "axios";

export const client = axios.create({
  baseURL: "http://localhost:3000",
  responseType: "json",
  withCredentials: true,
})