import { Box, IconButton, Typography } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { getSelectedDomain } from "../../../shared/lib/select-domain";
import { PageTabs } from "../../../shared/lib/page-tabs";
import { PageTab } from "../../../shared/lib/page-tabs/page-tab";
import { Outlet, useNavigate } from "react-router-dom";

export const DomainManagement = () => {
  const navigate = useNavigate();

  const selectedDomain = getSelectedDomain();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <Box
        sx={{
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          gap: "24px",
        }}
      >
        <IconButton onClick={() => navigate(`/content/${selectedDomain!.id}`)}>
          <KeyboardArrowLeftIcon />
        </IconButton>
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: 700,
            lineHeight: "32px",
            color: "#171F33",
          }}
        >
          {selectedDomain?.branding}
        </Typography>
      </Box>
      <PageTabs>
        <PageTab title="General" path="edit" />
        <PageTab title="Plugins" />
        <PageTab title="Layouts" />
        <PageTab title="Authors" />
        <PageTab title="Categories" />
        <PageTab title="Tags" />
        <PageTab title="Infrastructure" />
      </PageTabs>
      <Box sx={{ padding: "24px", flex: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
};
