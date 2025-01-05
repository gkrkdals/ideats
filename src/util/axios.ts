'use client';

import axios from "axios";

export const client = axios.create({
  baseURL: process.env.BASE_URL,
  responseType: "json",
  withCredentials: true,
})