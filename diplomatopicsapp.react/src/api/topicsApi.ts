import { AxiosResponse } from "axios";
import http from "./httpCommon";
import Topic from "../types/Topic";

const getAll = async (): Promise<AxiosResponse<Topic[]>> => {
  return await http.get<Topic[]>("/api/Topic");
};

const create = async (): Promise<AxiosResponse<Topic[]>> => { // todo
  return await http.post<Topic[]>("/api/Topic");
};

const topicsApi = { getAll, create };
export default topicsApi;
