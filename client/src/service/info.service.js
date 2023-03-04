import axios from "axios";
import config from "../config.json";

axios.defaults.baseURL = config.URL;

export const InfoService = {
  async getAll() {
    const { data } = await axios.get("/info");
    return data.info;
  },
  async logIn(payload) {
    const { data } = await axios.post("/signIn", payload);
    return data;
  },
  async updateInfo(payload) {
    const { data } = await axios.put("/info", payload);
    return data.info;
  },
  async projectInfo(payload) {
    const { data } = await axios.post("/projectInfo", payload);

    return data.projectinfo;
  },
  async getProjectInfo() {
    const { data } = await axios.get("/projectInfo");
    return data.projectInfo;
  },
  async deleteProject(payload) {
    const { data } = await axios.delete(`/projectInfo/${payload.id}`, {
      data: payload,
    });
  },
  async updateProject(payload) {
    const { data } = await axios.put("/projectInfo", payload);

    return data;
  },
  async saveDoc(payload) {
    console.log("payload ==", payload);
    const { data } = await axios.post("/doc", payload);

    return data;
  },
  async getProjectInfoById(id) {
    const { data } = await axios.get(`/projectInfo/${id}`);
    return data.projectInfo;
  },
  async createSocial(payload) {
    console.log(payload);
    const { data } = await axios.post("/social", payload);
    return data.socialAll;
  },
  async getSocial() {
    const { data } = await axios.get("/social");
    console.log(data);
    return data.socialAll;
  },
  async updateSocial(payload) {
    const { data } = await axios.put(`/social`, payload);
    return data;
  },
  async deleteSocial(payload) {
    await axios.delete(`/social/${payload.id}`, {
      data: payload,
    });
  },
  async checkCode(payload) {
    console.log(payload);
    const { data } = await axios.post("/logInCode", { reqCode: payload });
    return data.message;
  },
};
