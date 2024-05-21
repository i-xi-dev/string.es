export const Plane = {
  BMP: 0,
  SMP: 1,
  SIP: 2,
  TIP: 3,
  SSP: 14,
  SPUA_A: 15,
  APUA_B: 16,
} as const;

export type Plane = typeof Plane[keyof typeof Plane];
