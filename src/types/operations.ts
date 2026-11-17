export type TaskCategory = 
  | 'feeding' 
  | 'milking' 
  | 'shed_cleaning' 
  | 'health_check' 
  | 'medication' 
  | 'weight_check' 
  | 'inventory' 
  | 'other';

export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface DailyTask {
  id: string;
  titleEn: string;
  titleBn: string;
  category: TaskCategory;
  assignedWorker?: string;
  scheduledDate: string;
  scheduledTime?: string;
  isCompleted: boolean;
  completedAt?: string;
  completedBy?: string;
  priority: TaskPriority;
  notes?: string;
}

export type HousingSystem = 'tie_stall' | 'loose_housing' | 'free_stall' | 'semi_intensive';

export interface FarmLayout {
  id: string;
  layoutName: string;
  landLengthFt: number;
  landWidthFt: number;
  shedLengthFt: number;
  shedWidthFt: number;
  housingSystem: HousingSystem;
  feedingLaneWidthFt: number;
  drainageSlopePercent: number;
  recommendedCapacityHead: number;
  zones: FarmLayoutZone[];
}

export interface FarmLayoutZone {
  id: string;
  name: string;
  type: 'shed' | 'open_paddock' | 'feeding_lane' | 'quarantine_pen' | 'calf_pen' | 'milking_parlor' | 'feed_store' | 'manure_pit' | 'water_tank';
  x: number; // percentage or canvas units
  y: number;
  width: number;
  height: number;
  color: string;
  notes?: string;
}
