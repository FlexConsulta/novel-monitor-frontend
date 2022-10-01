import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginComponent from "./pages/login";
import RecoveryPasswordComponent from "./pages/login/recovery.password";
import ChangePasswordComponent from "./pages/login/change.password";
import PageNotFoundComponent from "./pages/shared/page.not.found";
import Unauthorized from "./pages/shared/unauthorized";
import DashboardComponent from "./pages/dashboard";
import ClientsComponent from "./pages/dashboard/clients";
import UsersAdminComponent from "./pages/dashboard/users.admins";
import ServersComponent from "./pages/dashboard/servers";
import ConfiguracoesComponent from "./pages/dashboard/configurations";
import DatabasesComponent from "./pages/dashboard/databases";
import LogsDatabasesComponent from "./pages/dashboard/logs";
import RegisterDatabase from "./pages/dashboard/databases/register.database.admins";
import CadastroUserClients from "./pages/dashboard/users.admins/register.users.admins";
import CadastroServer from "./pages/dashboard/servers/register.server";
import RegisterClients from "./pages/dashboard/clients/register.clients";
import AuthContext from "./pages/shared/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

export default function AppRoutes() {
  return (
    <Router>
      <AuthContext>
        <Routes>
          {/* Page acess app */}
          <Route exact path="/" element={<LoginComponent />} />
          <Route
            exact
            path="/recuperar-senha"
            element={
              <PrivateRoute route={"recuperar-senha"}>
                <RecoveryPasswordComponent />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/trocar-senha"
            element={
              <PrivateRoute route={"trocar-senha"}>
                <ChangePasswordComponent />
              </PrivateRoute>
            }
          />
          {/* Page dashbpard */}
          <Route
            exact
            path="/dashboard"
            element={
              <PrivateRoute route={"dashboard"}>
                <DashboardComponent />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/empresas"
            element={
              <PrivateRoute route={"empresas"}>
                <ClientsComponent />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/edit-empresas"
            element={
              <PrivateRoute route={"edit-empresas"}>
                <RegisterClients />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/new-empresas"
            element={
              <PrivateRoute route={"new-empresas"}>
                <RegisterClients />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/usuarios-admin"
            element={
              <PrivateRoute route={"usuarios-admin"}>
                <UsersAdminComponent />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/usuarios-empresas"
            element={
              <PrivateRoute route={"usuarios-empresas"}>
                <CadastroUserClients />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/edit-usuarios-empresas"
            element={
              <PrivateRoute route={"edit-usuarios-empresas"}>
                <CadastroUserClients />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/servidores"
            element={
              <PrivateRoute route={"servidores"}>
                <ServersComponent />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/new-servidores"
            element={
              <PrivateRoute route={"new-servidores"}>
                <CadastroServer />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/edit-servidores"
            element={
              <PrivateRoute route={"new-servidores"}>
                <CadastroServer />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/configuracoes"
            element={
              <PrivateRoute route={"configuracoes"}>
                <ConfiguracoesComponent />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/logs-conexoes/:id"
            element={
              <PrivateRoute route={"logs-conexoes"}>
                <LogsDatabasesComponent />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/banco-dados"
            element={
              <PrivateRoute route={"banco-dados"}>
                <DatabasesComponent />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/new-banco-dados"
            element={
              <PrivateRoute route={"new-banco-dados"}>
                <RegisterDatabase />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/edit-banco-dados"
            element={
              <PrivateRoute route={"edit-banco-dados"}>
                <RegisterDatabase />
              </PrivateRoute>
            }
          />

          {/* Shared */}
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<PageNotFoundComponent />} />
        </Routes>
      </AuthContext>
    </Router>
  );
}
