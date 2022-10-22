import jwt_decode from "jwt-decode";

export const getLoggedUserInfo = () => {
  console.log("leitura token");

  const jwt = localStorage.getItem("jwt-monitor-banco");

  const { active, profile, client_id, name } = jwt_decode(jwt).data;

  return { active, profile, client_id, name };
};
