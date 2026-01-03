import { FormField } from "@/shared/lib/form-field";
import {
  adhesionPositions,
  type Adhesion,
  type AdhesionPosition,
} from "@/shared/models/adhesion";
import { capitalize } from "@/shared/utils";
import { Box, IconButton, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const transformAdhesionPosition = (position: AdhesionPosition) =>
  position.toLowerCase().split("_").map(capitalize).join(" ");

interface AdhesionRowProps {
  ad: Adhesion;
  dictionary?: string[];
  onNameCommit: (id: string, value: string) => void;
  onPositionChange: (id: string, value: AdhesionPosition) => void;
  onPathChange: (id: string, value: string) => void;
  onRemove: (id: string) => void;
}

export const AdhesionRow = React.memo(
  ({
    ad,
    dictionary,
    onNameCommit,
    onPositionChange,
    onPathChange,
    onRemove,
  }: AdhesionRowProps) => {
    const [name, setName] = useState(ad.name);

    useEffect(() => {
      setName(ad.name);
    }, [ad.name]);

    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <FormField
          label="Name"
          sx={{ flexDirection: "column", alignItems: "start", flex: 1 }}
        >
          <TextField
            sx={{ width: "100%" }}
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            onBlur={() => onNameCommit(ad.id, name)}
          />
        </FormField>

        <FormField
          label="Position"
          sx={{ flexDirection: "column", alignItems: "start", flex: 1 }}
        >
          <Select
            sx={{ width: "100%" }}
            value={ad.position}
            onChange={(e) =>
              onPositionChange(ad.id, e.target.value as AdhesionPosition)
            }
          >
            {adhesionPositions.map((position) => (
              <MenuItem key={position} value={position}>
                {transformAdhesionPosition(position)}
              </MenuItem>
            ))}
          </Select>
        </FormField>

        <FormField
          label="Path"
          sx={{ flexDirection: "column", alignItems: "start", flex: 2 }}
        >
          <Select
            sx={{ width: "100%" }}
            value={ad.data}
            onChange={(e) => onPathChange(ad.id, e.target.value as string)}
          >
            {dictionary?.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormField>

        <IconButton onClick={() => onRemove(ad.id)}>
          <CloseIcon />
        </IconButton>
      </Box>
    );
  }
);
