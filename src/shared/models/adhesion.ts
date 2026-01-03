export interface Adhesion {
  id: string;
  name: string;
  position: AdhesionPosition;
  data: string;
}

export type AdhesionPosition =
  | "STICKY_LEFT"
  | "STICKY_RIGHT"
  | "ABOVE_TITLE"
  | "BELOW_TITLE"
  | "ABOVE_CONTENT"
  | "IN_CONTENT"
  | "DYNAMIC"
  | "BELOW_CONTENT"
  | "ABOVE_FOOTER"
  | "BELOW_ABOVE_FOOTER"
  | "ADHESION"
  | "ADHESION_TOP";

export const adhesionPositions: AdhesionPosition[] = [
  "STICKY_LEFT",
  "STICKY_RIGHT",
  "ABOVE_TITLE",
  "BELOW_TITLE",
  "ABOVE_CONTENT",
  "IN_CONTENT",
  "DYNAMIC",
  "BELOW_CONTENT",
  "ABOVE_FOOTER",
  "BELOW_ABOVE_FOOTER",
  "ADHESION",
  "ADHESION_TOP",
];
