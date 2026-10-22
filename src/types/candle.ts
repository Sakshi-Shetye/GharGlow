export type ProductCategory = 
  | 'All Varieties'
  | 'Ghee Ful Vatis'
  | 'Traditional Diyas'
  | 'Floating & Shaped Candles'
  | 'Kapoor & Special Vatis'
  | 'Lanterns';

export interface ProductVariety {
  id: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  description: string;
  fragranceNotes?: string;
  burnTime?: string;
  confirmedPrice?: number; // e.g., 150
  packSize?: string; // e.g., "12 pieces"
  isPriceConfirmed: boolean;
  bulkPrice?: number; // for lanterns: retail vs bulk
  wickCoordinate: {
    x: number; // percentage from left (0 to 100)
    y: number; // percentage from top (0 to 100)
  };
  productType: 
    | 'pink_laddu'
    | 'rose_floating_small'
    | 'rose_floating_sculpted'
    | 'rose_ghee_vati'
    | 'panti_diya_ghee'
    | 'chandan_ghee_vati'
    | 'kewra_ghee_vati'
    | 'multicolor_tealight'
    | 'mixed_trio_vati'
    | 'pure_ghee_vati'
    | 'kapoor_vati'
    | 'bhimsen_kapoor_vati'
    | 'small_lantern'
    | 'flower_lantern';
  authenticColorHex: string;
  accentColorHex: string;
  modelStatus: 'accurate_render' | 'multi_angle_photo' | 'awaiting_scan';
  customUserImage?: string; // stored in localStorage if user uploads real batch photo
}

export interface OrderInquiry {
  productId: string;
  productName: string;
  quantity: number;
  packSize: string;
  customNotes?: string;
}
