import { AxiosResponse } from "axios";
import http from "./httpCommon";
import Topic from "../types/Topic/Topic";
import NewTopic from "../types/Topic/NewTopic";
import CreatedResponse from "../types/CreatedResponse";

const getAll = async (): Promise<AxiosResponse<Topic[]>> => {
  return await http.get<Topic[]>("/api/Topic");
};

const create = async (
  data: NewTopic
): Promise<AxiosResponse<CreatedResponse>> => {
  return await http.post<CreatedResponse>("/api/Topic", data, {
    method: "POST",
  });
};

const topicsApi = { getAll, create };
export default topicsApi;
