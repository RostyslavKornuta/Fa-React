import "./App.css";
import { Content } from "./pages/content";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Library } from "./pages/library";
import { ArticleManagement } from "./pages/article-management/edit";
import { useGetDomainsQuery } from "./shared/api/domains/domainsApi";
import { DomainLayout } from "./pages/domain/domain";
import { DomainManagement } from "./pages/domain/domain-management";

export const App = () => {
  const { data: domains } = useGetDomainsQuery();

  return (
    <BrowserRouter>
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

        <Route path="library" element={<Library />} />

        <Route path="content/:domainId/*" element={<DomainLayout />}>
          <Route index element={<Content />} />
          <Route path="edit" element={<DomainManagement />} />
          <Route path="article/:articleId" element={<ArticleManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
