import { Outlet, useParams } from "react-router-dom";
import { useGetDomainsQuery } from "../../shared/api/domains/domainsApi";
import { Header, type HeaderLink } from "../../shared/lib/header";
import { ContentWrapper } from "../../shared/lib/content-wrapper";
import AppsIcon from "@mui/icons-material/Apps";
import PersonIcon from "@mui/icons-material/Person";
import logo from "/logo.svg";

export const links: HeaderLink[] = [
  { label: "Content", to: "/", activePath: "content" },
  { label: "Library", to: "library", activePath: "library" },
];

export const buttons = [
  <AppsIcon sx={{ color: "#FFF" }} />,
  <PersonIcon sx={{ color: "#FFF" }} />,
];

export const DomainLayout = () => {
  const { domainId } = useParams<{ domainId: string }>();
  const { data: domains } = useGetDomainsQuery();

  return (
    <>
      <Header logo={logo} links={links} buttons={buttons} domains={domains} />
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
    </>
  );
};
