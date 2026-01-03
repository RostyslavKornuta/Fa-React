import "./App.css";
import { Content } from "./pages/content";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Library } from "./pages/library";
import { ArticleManagement } from "./pages/article-management/edit";
import { useGetDomainsQuery } from "./shared/api/domains/domainsApi";
import { DomainManagement } from "./pages/domain/domain-management";
import AppsIcon from "@mui/icons-material/Apps";
import PersonIcon from "@mui/icons-material/Person";
import logo from "/logo.svg";
import { Header, type HeaderLink } from "./shared/lib/header";
import { ContentWrapper } from "./shared/lib/content-wrapper";
import {
  getSelectedDomain,
  SelectDomain,
  setSelectedDomain,
} from "./shared/lib/select-domain";
import { DomainLayout } from "./pages/domain";
import { DomainManagementGeneral } from "./pages/domain/domain-management/general";
import { DomainManagementPlugins } from "./pages/domain/domain-management/plugins";
import { DomainManagementInfrastructure } from "./pages/domain/domain-management/infrastructure";
import { DomainManagementTags } from "./pages/domain/domain-management/tags";
import { DomainManagementCategories } from "./pages/domain/domain-management/categories";
import { DomainManagementAuthors } from "./pages/domain/domain-management/authors";
import { DomainManagementLayouts } from "./pages/domain/domain-management/layouts";
import { PluginManagementEdit } from "./pages/domain/domain-management/plugins/plugin-management/edit";
import { PluginManagementCreate } from "./pages/domain/domain-management/plugins/plugin-management/create";

export const links: HeaderLink[] = [
  { label: "Content", to: "/", activePath: "content" },
  { label: "Library", to: "/library", activePath: "library" },
];

export const buttons = [
  <AppsIcon sx={{ color: "#FFF" }} />,
  <PersonIcon sx={{ color: "#FFF" }} />,
];

export const App = () => {
  const { data: domains } = useGetDomainsQuery();

  const selectedDomainFromLocal = getSelectedDomain();

  if (!selectedDomainFromLocal && domains) {
    setSelectedDomain(domains[0]);
  }

  return (
    <BrowserRouter>
      <Header logo={logo} links={links} buttons={buttons}>
        {domains?.length! > 0 && <SelectDomain domains={domains!} />}
      </Header>

      <ContentWrapper>
        <Routes>
          <Route
            path="/"
            element={
              <Navigate
                to={domains?.[0] ? `/content/${domains[0].id}` : "/"}
                replace
              />
            }
          />

          <Route path="/library" element={<Library />} />

          <Route path="/content/:domainId" element={<DomainLayout />}>
            <Route index element={<Content />} />
            <Route element={<DomainManagement />}>
              <Route path="edit" element={<DomainManagementGeneral />} />
              <Route path="plugins" element={<DomainManagementPlugins />} />
              <Route path="layouts" element={<DomainManagementLayouts />} />
              <Route path="authors" element={<DomainManagementAuthors />} />
              <Route
                path="categories"
                element={<DomainManagementCategories />}
              />
              <Route path="tags" element={<DomainManagementTags />} />
              <Route
                path="infrastructure"
                element={<DomainManagementInfrastructure />}
              />
            </Route>
            <Route
              path="plugins/:pluginId"
              element={<PluginManagementEdit />}
            />
            <Route path="plugins/create" element={<PluginManagementCreate />} />
            <Route path="article/:articleId" element={<ArticleManagement />} />
          </Route>
        </Routes>
      </ContentWrapper>
    </BrowserRouter>
  );
};
