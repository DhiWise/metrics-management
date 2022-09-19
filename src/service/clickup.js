import Axios from "axios";
import credentials from "constants/credentials";
const defaultAxios = Axios.create({
  headers: {
    Authorization: credentials.CLICKUP_API_KEY,
  },
});

defaultAxios.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export const getGoals = ({
  data = {},
  headers = {},
  params = {},
  path = {},
} = {}) => {
  return defaultAxios({
    url: `https://api.clickup.com/api/v2/team/${credentials.CLICKUP_TEAM_ID}/goal?include_completed=true`,
    method: "get",
    params,
    headers,
    data,
  });
};

export const getGoal = (goalId) => {
  return defaultAxios({
    url: `https://api.clickup.com/api/v2/goal/${goalId}`,
    method: "get",
  });
};