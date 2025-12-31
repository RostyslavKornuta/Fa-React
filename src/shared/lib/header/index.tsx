import { Link, NavLink, useLocation } from "react-router-dom";
import { Box, IconButton, styled } from "@mui/material";

export interface HeaderLink {
  label: string;
  to: string;
  activePath: string;
}

interface HeaderProps {
  logo: string;
  links: HeaderLink[];
  buttons: React.ReactNode[];
  children?: React.ReactNode;
}

const StyledNavLink = styled(NavLink)({
  textDecoration: "none",
  borderRadius: 8,
  padding: "8px 16px",
  fontSize: "14px",
  lineHeight: "20px",
  color: "#f1f2f4",
  display: "inline-block",
  "&.active": {
    background: "#2B334A",
  },
  "&:hover": {
    background: "#2B334A",
  },
});

export const Header = ({ logo, links, buttons, children }: HeaderProps) => {
  const location = useLocation();

  return (
    <Box
      sx={{
        padding: "16px 20px",
        width: "100%",
        height: "136px",
        backgroundColor: "#111727",
        backgroundImage: 'url("/header-bg.svg")',
        backgroundRepeat: "no-repeat",
        backgroundPositionX: "right",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
        <Box
          sx={{
            marginLeft: "48px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flex: 1,
          }}
        >
          {links.map((link) => {
            const isActive = location.pathname.startsWith(
              "/" + link.activePath
            );

            return (
              <StyledNavLink
                key={link.to}
                to={link.to}
                className={isActive ? "active" : ""}
              >
                {link.label}
              </StyledNavLink>
            );
          })}
        </Box>
        <Box
          sx={{
            marginLeft: "48px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {children !== undefined && (
            <>
              {children}
              <Box
                sx={{
                  width: "2px",
                  height: "20px",
                  backgroundColor: "#555c7a",
                }}
              ></Box>
            </>
          )}

          {buttons.map((button, index: number) => (
            <IconButton key={index}>{button}</IconButton>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
