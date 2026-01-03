import { Box, Button, styled, Typography } from "@mui/material";
import { useAppSelector } from "../../../../hooks/hooks";
import { useGetPluginsQuery } from "../../../../shared/api/domain-management/plugins/pluginsApi";
import { maxSize } from "../../../../shared/constants";
import { getSelectedDomain } from "../../../../shared/lib/select-domain";
import type { Plugin } from "../../../../shared/models/plugin";
import { Loader } from "../../../../shared/ui/loader";
import { capitalize } from "../../../../shared/utils";
import { Search } from "../../../../shared/lib/search";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useDebounce } from "../../../../hooks/useDebounce";
import { NavLink, useNavigate } from "react-router-dom";
import { EmptyState } from "../../../../shared/lib/empty-state";

const StyledLink = styled(NavLink)({
  padding: "24px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  borderRadius: "8px",
  boxShadow: "0px 2px 12px 0px #8E93A826",
  background: "#FFFFFF",

  "&:hover": {
    cursor: "pointer",
    boxShadow: "0 6px 12px #8e93a840",
  },
});

export const DomainManagementPlugins = () => {
  const navigate = useNavigate();

  const searchRequest = useAppSelector(
    (state) => state.searchRequest.searchRequest
  );
  const [searchQuery, setSearchQuery] = useState(
    searchRequest.searchQuery || ""
  );
  const debouncedSearchQuery = useDebounce(searchQuery);

  const selectedDomain = getSelectedDomain();

  const { data: plugins, isFetching } = useGetPluginsQuery(
    {
      ...searchRequest,
      domainId: selectedDomain!.id,
      searchQuery: debouncedSearchQuery,
      order: "id",
      size: maxSize,
      sort: ["id", "desc"],
    },
    { refetchOnMountOrArgChange: true }
  );

  return isFetching ? (
    <Loader />
  ) : plugins!.length > 0 ? (
    <>
      <Box
        sx={{
          marginBottom: "24px",
          display: "flex",
          alignItems: "center: ",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Search
            styles={{ width: "400px" }}
            value={searchQuery}
            onChange={setSearchQuery}
          />
          <Button startIcon={<FilterListIcon />}>Filters</Button>
        </Box>
        <Button startIcon={<AddIcon />} onClick={() => navigate("create")}>
          Add Plugin
        </Button>
      </Box>
      <Box
        sx={{
          padding: "0 0 24px 0",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
          maxHeight: "calc(100vh - 298px)",
          overflowY: "auto",
        }}
      >
        {plugins?.map((plugin: Plugin) => (
          <StyledLink key={plugin.data.id} to={plugin.info.id} state={plugin}>
            <Box
              sx={{
                display: "flex",
                alignItems: "start",
                justifyContent: "space-between",
              }}
            >
              <img
                width="56px"
                height="56px"
                style={{ objectFit: "contain", borderRadius: "8px" }}
                src={`/plugins/logo-${plugin.info.type.toLowerCase()}.svg`}
              />
              <Typography
                sx={{
                  padding: "6px 10px",
                  fontSize: "12px",
                  lineHeight: "16px",
                  color: "#555C7A",
                  backgroundColor: "#F1F2F4",
                  borderRadius: "100px",
                }}
              >
                {capitalize(plugin.info.level)}
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "20px",
                  color: "#111727",
                }}
              >
                {plugin.info.name}
              </Typography>
              <Typography
                sx={{ fontSize: "14px", lineHeight: "20px", color: "#8E93A8" }}
              >
                {plugin.info.type}
              </Typography>
            </Box>
          </StyledLink>
        ))}
      </Box>
    </>
  ) : (
    <Box sx={{ height: "100%" }}>
      <EmptyState
        action={
          <Button onClick={() => navigate("create")} startIcon={<AddIcon />}>
            Add Plugin
          </Button>
        }
      />
    </Box>
  );
};
