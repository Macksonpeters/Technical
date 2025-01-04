import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const Getfn = async (url: string) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const getConfig = {
    method: "GET",
    url: url,
    headers,
  };

  try {
    const response = await axios(getConfig);
    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const useGetHook = () => {
  return useMutation({
    mutationFn: (data: any) => Getfn(data),
  });
};

const Postfn = async (payload: any, url: string) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const postConfig = {
    method: "POST",
    url: url,
    data: payload,
    headers,
  };

  try {
    const response = await axios(postConfig);

    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const usePostHook = (url: any) => {
  return useMutation({
    mutationFn: (data: any) => Postfn(data, url),
  });
};
