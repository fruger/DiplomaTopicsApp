import { AxiosResponse } from "axios";
import http from "./httpCommon";
import Topic from "../types/Topic/Topic";
import NewTopic from "../types/Topic/NewTopic";
import CreatedResponse from "../types/CreatedResponse";

const topic = "/api/Topic";

const getAll = async (): Promise<AxiosResponse<Topic[]>> => {
  return await http.get<Topic[]>(`${topic}`);
};

const create = async (
  data: NewTopic
): Promise<AxiosResponse<CreatedResponse>> => {
  return await http.post<CreatedResponse>(`${topic}`, data, {
    method: "POST",
  });
};

const deleteTopic = async (id: number): Promise<AxiosResponse<void>> => {
  return await http.delete(`${topic}/${id}`, {
    method: "DELETE",
  });
};

const topicsApi = { getAll, create, deleteTopic };
export default topicsApi;
