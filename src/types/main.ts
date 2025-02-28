export interface DeviceItem {
  id: string;
  name: string;
  data: Data | null;
}

interface Data {
  color?: string;
  capacity?: string;
  price?: number;
  category?: string;
  storage: {
    size: number;
    unit: string;
  };
}
