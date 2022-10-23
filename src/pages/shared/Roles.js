export const Profiles = {
  administracao: "administracao",
  clientes: "clientes",
};

const Actions = {
  changeClient: "changeClient",
  changeProfile: "changeProfile",
  registerUser: "registerUser",
  activeUser: "activeUser",
  viewLogs: "viewLogs",
};

const userHasPermission = (profile, action) => {
  if (profile === Profiles.administracao) return true;

  if (profile === Profiles.clientes) {
    switch (action) {
      case Actions.changeClient:
        return false;
      case Actions.changeProfile:
        return false;
      case Actions.registerUser:
        return false;
      case Actions.activeUser:
        return false;
      default:
        return true;
    }
  }
};

const clientsRoutesAuthorizated = [
  "logs-customer",
  "usuarios-empresas",
  "recuperar-senha",
  "/",
];

const routeAuthorizated = (route, profile) => {
  if (profile === Profiles.clientes) {
    return clientsRoutesAuthorizated.find((item) => item === route);
  }
  return true;
};

const Roles = { Profiles, Actions, userHasPermission, routeAuthorizated };

export default Roles;
