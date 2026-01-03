import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useState } from "react";
import { FormField } from "@/shared/lib/form-field";
import { PluginRevazaSpecialFields } from "../plugin-special-fields/revaza";
import {
  pluginTypes,
  type Plugin,
  type PluginInfoType,
} from "@/shared/models/plugin";

export const PluginManagementEdit = () => {
  const navigate = useNavigate();
  const { domainId } = useParams<{ domainId: string }>();

  const location = useLocation();
  const pluginFromRoute = location.state as Plugin;
  const [selectedPlugin, setSelectedPlugin] = useState(pluginFromRoute);

  const onBackButtonClick = () => navigate(`/content/${domainId}/plugins`);

  const onPluginLevelChange = (level: string) =>
    setSelectedPlugin((prev: Plugin) => ({
      ...prev,
      info: { ...prev.info, level },
    }));

  const onPluginTypeChange = (type: string) =>
    setSelectedPlugin((prev: Plugin) => ({
      ...prev,
      info: { ...prev.info, type: type as PluginInfoType },
    }));

  const onPluginNameChange = (name: string) =>
    setSelectedPlugin((prev: Plugin) => ({
      ...prev,
      info: { ...prev.info, name },
    }));

  const onPluginIdChange = (id: string) =>
    setSelectedPlugin((prev: Plugin) => ({
      ...prev,
      data: { ...prev.data, id },
    }));

  return (
    <>
      <Box
        sx={{
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #E7E8EC",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <IconButton onClick={onBackButtonClick}>
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
            Edit Plugin
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Button variant="text">Delete</Button>
          <Button>Save</Button>
        </Box>
      </Box>
      <Box sx={{ padding: "24px", overflowY: "auto", margin: "0 0 24px 0" }}>
        <Box
          sx={{
            width: "100%",
            maxWidth: "668px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <FormField label="Name">
            <TextField
              sx={{ flex: 3 }}
              placeholder="Name"
              value={selectedPlugin.info.name}
              onChange={(event) => onPluginNameChange(event.target.value)}
            />
          </FormField>
          <FormField label="Level">
            <FormControl sx={{ flex: 3 }}>
              <RadioGroup
                row
                sx={{ gap: "24px" }}
                value={selectedPlugin.info.level}
                onChange={(event) => onPluginLevelChange(event.target.value)}
              >
                <FormControlLabel
                  value="GLOBAL"
                  label="Global"
                  control={<Radio />}
                />
                <FormControlLabel
                  value="OPTIONAL"
                  label="Optional"
                  control={<Radio />}
                />
              </RadioGroup>
            </FormControl>
          </FormField>
          <FormField label="Type">
            <Select
              sx={{ flex: 3 }}
              value={selectedPlugin.info.type}
              onChange={(event) => onPluginTypeChange(event.target.value)}
              disabled={!!selectedPlugin.info.id}
            >
              {pluginTypes.map((pluginType: PluginInfoType) => (
                <MenuItem value={pluginType}>{pluginType}</MenuItem>
              ))}
            </Select>
          </FormField>
          <FormField
            label={
              selectedPlugin.info.type === "REVAZA" ||
              selectedPlugin.info.type === "ASSERTIVEYIELD"
                ? "Revaza Account Id"
                : "Id"
            }
          >
            <TextField
              sx={{ flex: 3 }}
              placeholder="Id"
              value={selectedPlugin.data.id}
              onChange={(event) => onPluginIdChange(event.target.value)}
            />
          </FormField>
        </Box>
        {(selectedPlugin.info.type === "REVAZA" ||
          selectedPlugin.info.type === "ASSERTIVEYIELD") && (
          <PluginRevazaSpecialFields plugin={selectedPlugin} />
        )}
      </Box>
    </>
  );
};
