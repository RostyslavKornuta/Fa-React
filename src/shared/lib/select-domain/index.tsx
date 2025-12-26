import { Box, Typography } from "@mui/material";
import type { Domain } from "../../models/domain";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetDomainByIdQuery } from "../../api/domains/domainsApi";
import { skipToken } from "@reduxjs/toolkit/query";

interface SelectDomainProps {
  domains: Domain[];
}

export const SelectDomain = ({ domains }: SelectDomainProps) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const { domainId } = useParams<{ domainId: string }>();
  const { data: selectedDomain } = useGetDomainByIdQuery(domainId ?? skipToken);
  const navigate = useNavigate();

  const onSelectedDomainChange = (domain: Domain) => {
    if (domain.id === domainId) {
      setIsOpened(false);
      return;
    }

    navigate(`/content/${domain.id}`, { replace: true });
    setIsOpened(false);
  };

  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Box
        onClick={() => setIsOpened(!isOpened)}
        className={`${selectedDomain?.theme} ${isOpened ? "opened" : ""}`}
        sx={{
          padding: "0 2px",
          width: "72px",
          height: "32px",
          border: "1px solid #E6E6ED",
          borderRadius: "4px",
          backgroundColor: "#FFFFFF",
          "&.opened": {
            boxShadow: "0 0 0 4px #2b334a",
          },
          "&.BLACKANDWHITE": {
            backgroundColor: "#000000",
          },
          ":hover": {
            cursor: "pointer",
            boxShadow: "0 0 0 4px #2b334a",
          },
        }}
      >
        <img
          width="100%"
          height="100%"
          style={{ objectFit: "contain" }}
          src={`/api/images/${selectedDomain?.logo}`}
        />
      </Box>
      {isOpened && (
        <Box
          sx={{
            padding: "12px",
            marginTop: "8px",
            maxHeight: "270px",
            overflowY: "auto",
            overflowX: "hidden",
            position: "absolute",
            zIndex: 9999,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "8px",
            right: 0,
            border: "1px solid #2B334A",
            borderRadius: "8px",
            backgroundColor: "#111727",
          }}
        >
          {domains.map((domain: Domain) => (
            <Box
              onClick={() => onSelectedDomainChange(domain)}
              sx={{
                padding: "8px",
                width: "88px",
                height: "76px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                borderRadius: "8px",
                backgroundColor: "#1a2339",
                ":hover": {
                  cursor: "pointer",
                  backgroundColor: "#2b334a",
                },
              }}
              key={domain.id}
            >
              <Box
                className={`${domain.theme}`}
                sx={{
                  background: "#FFFFFF",
                  border: "1px solid #E6E6ED",
                  borderRadius: "4px",
                  "&.BLACKANDWHITE": {
                    backgroundColor: "#000000",
                  },
                }}
              >
                <img
                  width="74px"
                  height="32px"
                  style={{ padding: "4px", objectFit: "contain" }}
                  src={`/api/images/${domain.logo}`}
                />
              </Box>
              <Typography
                sx={{
                  maxWidth: "100%",
                  fontSize: "12px",
                  color: "#e6e6ed",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {domain.branding}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
