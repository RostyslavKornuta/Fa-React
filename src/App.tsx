import "./App.css";
import logo from "/logo.svg";
import { Header, type HeaderLink } from "./shared/lib/header";
import { Content } from "./app/pages/content";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ContentWrapper } from "./shared/lib/content-wrapper";
import AppsIcon from "@mui/icons-material/Apps";
import PersonIcon from "@mui/icons-material/Person";
import { useDomains } from "./hooks/useDomains";
import { DomainManagement } from "./app/pages/domain-management/indedx";
import { Library } from "./app/pages/library";
import { ArticleManagement } from "./app/pages/article-management/edit";

export const links: HeaderLink[] = [
  { label: "Content", to: "/", activePath: "content" },
  { label: "Library", to: "library", activePath: "library" },
];

export const buttons = [
  <AppsIcon sx={{ color: "#FFF" }} />,
  <PersonIcon sx={{ color: "#FFF" }} />,
];

export const App = () => {
  const { domains, selectedDomain } = useDomains();

  // FOR THE FUTURE: make Content page, Settings page etc. to receive children as props and give them header items

  return (
    <BrowserRouter>
      <Header logo={logo} links={links} buttons={buttons} domains={domains} />

      <ContentWrapper>
        <Routes>
          <Route path="library" element={<Library />} />

          {selectedDomain && (
            <>
              <Route
                path="/"
                element={
                  <Navigate to={"/content/" + selectedDomain.id} replace />
                }
              />
              <Route path="/content/:domainId" element={<Content />} />
              <Route
                path="/content/:domainId/edit"
                element={<DomainManagement />}
              />
              <Route
                path="/content/:domainId/article/:articleId"
                element={<ArticleManagement />}
              />
            </>
          )}
        </Routes>
      </ContentWrapper>
    </BrowserRouter>
  );
};
