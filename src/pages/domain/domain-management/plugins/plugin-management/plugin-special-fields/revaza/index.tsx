import { Box, Typography } from "@mui/material";
import { type Adhesion, type AdhesionPosition } from "@/shared/models/adhesion";
import type { Plugin } from "@/shared/models/plugin";
import { useGetDictionaryQuery } from "@/shared/api/domain-management/plugins/pluginsApi";
import { useCallback, useState } from "react";
import { AdhesionRow } from "./revaza-adhesion-row";
import { Loader } from "@/shared/ui/loader";

interface PluginRevazaSpecialFieldsProps {
  plugin: Plugin;
}

export const PluginRevazaSpecialFields = ({
  plugin,
}: PluginRevazaSpecialFieldsProps) => {
  const [selectedPlugin, setSelectedPlugin] = useState(plugin);

  const { data: dictionary, isFetching } = useGetDictionaryQuery(plugin);

  const updateAd = useCallback(
    (id: string, updater: (ad: Adhesion) => Adhesion) => {
      setSelectedPlugin((prev) => ({
        ...prev,
        ads: prev.ads?.map((ad) => (ad.id === id ? updater(ad) : ad)),
      }));
    },
    []
  );

  const onNameCommit = useCallback(
    (id: string, name: string) => updateAd(id, (ad) => ({ ...ad, name })),
    [updateAd]
  );

  const onPositionChange = useCallback(
    (id: string, position: AdhesionPosition) =>
      updateAd(id, (ad) => ({ ...ad, position })),
    [updateAd]
  );

  const onPathChange = useCallback(
    (id: string, data: string) => updateAd(id, (ad) => ({ ...ad, data })),
    [updateAd]
  );

  const onRemove = useCallback((id: string) => {
    setSelectedPlugin((prev) => ({
      ...prev,
      ads: prev.ads?.filter((ad) => ad.id !== id),
    }));
  }, []);

  if (isFetching) return <Loader />;

  return (
    <Box sx={{ margin: "32px 0 0 0" }}>
      <Typography
        sx={{
          padding: "8px 0",
          fontSize: "16px",
          fontWeight: 500,
          lineHeight: "136%",
          color: "#171F33",
        }}
      >
        Revaza rule
      </Typography>
      <Box
        sx={{
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          borderRadius: "16px",
          backgroundColor: "#F8F9FA",
        }}
      >
        {selectedPlugin.ads?.map((ad: Adhesion) => (
          <AdhesionRow
            key={ad.id}
            ad={ad}
            dictionary={dictionary}
            onNameCommit={onNameCommit}
            onPositionChange={onPositionChange}
            onPathChange={onPathChange}
            onRemove={onRemove}
          />
        ))}
      </Box>
    </Box>
  );
};
