import { styled } from "@mui/material";
import { NavLink } from "react-router-dom";

const StyledLink = styled(NavLink)({
  position: "relative",
  fontSize: "14px",
  fontWeight: 500,
  lineHeight: "20px",
  color: "#8e93a8",
  paddingBottom: "3px",
  textDecoration: "none",

  "&::after": {
    content: '""',
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
    height: "3px",
    backgroundColor: "transparent",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
    transform: "translateY(1px)",
  },

  "&.active::after": {
    backgroundColor: "#6FB295",
  },

  "&.active": { color: "#6FB295" },
});

interface PageTabProps {
  title: string;
  path?: string;
}

export const PageTab = ({
  title,
  path = title.toLowerCase(),
}: PageTabProps) => {
  return <StyledLink to={path}>{title}</StyledLink>;
};
