export type FarmLocation = {
  division: string;
  district: string;
  upazila: string;
  union?: string;
};

export type FarmBusinessModel = 'dairy' | 'beef_fattening' | 'breeding' | 'integrated';

export type FarmSettings = {
  id: string;
  farmName: string;
  ownerName: string;
  phone: string;
  location: FarmLocation;
  totalLandDecimals: number; // 1 decimal = ~435.6 sq ft
  shedAreaSqft: number;
  openPaddockSqft: number;
  fodderLandDecimals: number;
  primaryBusinessModel: FarmBusinessModel;
  currency: string;
  createdDate: string;
  firebaseConnected: boolean;
};

export type Language = 'en' | 'bn';
