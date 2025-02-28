export interface DeviceItem {
  id: string;
  name: string;
  color?: string;
  capacity?: string;
  price?: number;
  category?: string;
  storageSize?: string;
  storageUnit?: string;
}

export interface ResponseData {
  id: string;
  name: string;
  data?: Data;
}

interface Data {
  color?: string;
  capacity?: string;
  price?: number;
  category?: string;
}
