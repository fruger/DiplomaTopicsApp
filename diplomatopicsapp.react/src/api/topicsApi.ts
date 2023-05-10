import { AxiosResponse } from "axios";
import http from "./httpCommon";
import Topic from "../types/Topic/Topic";
import NewTopic from "../types/Topic/NewTopic";
import CreatedResponse from "../types/CreatedResponse";
import EditTopic from "../types/Topic/EditTopic";
import TopicDetail from "../types/Topic/TopicDetail";

const topic = "/api/Topic";

const getAll = async (): Promise<AxiosResponse<Topic[]>> => {
  return await http.get<Topic[]>(`${topic}`);
};

const getDetails = async (id: number): Promise<AxiosResponse<TopicDetail>> => {
  return await http.get<TopicDetail>(`${topic}/${id}`);
};

const create = async (
  data: NewTopic
): Promise<AxiosResponse<CreatedResponse>> => {
  return await http.post<CreatedResponse>(`${topic}`, data, {
    method: "POST",
  });
};

const edit = async (
  id: number,
  data: EditTopic
): Promise<AxiosResponse<void>> => {
  return await http.put(`${topic}/${id}`, data, {
    method: "PUT",
  });
};

const deleteTopic = async (id: number): Promise<AxiosResponse<void>> => {
  return await http.delete(`${topic}/${id}`, {
    method: "DELETE",
  });
};

const topicsApi = { getAll, getDetails, create, edit, deleteTopic };
export default topicsApi;
