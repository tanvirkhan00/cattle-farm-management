import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Cattle, HealthRecord, VaccinationRecord, FinancialTransaction, DailyTask,
  FeedInventoryItem, BiosecurityRecord, FarmSettings, WeightRecord
} from '../types';
import {
  INITIAL_FARM_SETTINGS, INITIAL_CATTLE_LIST, INITIAL_HEALTH_RECORDS,
  INITIAL_VACCINATIONS, INITIAL_TRANSACTIONS, INITIAL_DAILY_TASKS,
  INITIAL_BIOSECURITY
} from '../data/initialFarmData';
import { INITIAL_FEED_INVENTORY } from '../data/feedsData';
import { storageHelper } from '../services/supabase';

interface DashboardMetrics {
  totalCattle: number;
  healthyCattle: number;
  sickCattle: number;
  underTreatmentCattle: number;
  pregnantCattle: number;
  availableBreedingCattle: number;
  totalInvestment: number;
  monthlyExpenses: number;
  monthlyRevenue: number;
  estimatedProfitLoss: number;
  totalFeedInventoryKg: number;
  lowStockItemsCount: number;
  upcomingVaccinationsCount: number;
  pendingTasksCount: number;
}

interface FarmContextType {
  settings: FarmSettings;
  updateSettings: (newSettings: Partial<FarmSettings>) => void;
  cattleList: Cattle[];
  addCattle: (cattle: Omit<Cattle, 'id' | 'createdDate' | 'updatedDate'>) => void;
  updateCattle: (id: string, updates: Partial<Cattle>) => void;
  deleteCattle: (id: string) => void;
  addWeightRecord: (cattleId: string, weightKg: number, recordedDate: string, notes?: string) => void;
  healthRecords: HealthRecord[];
  addHealthRecord: (record: Omit<HealthRecord, 'id'>) => void;
  updateHealthRecord: (id: string, updates: Partial<HealthRecord>) => void;
  vaccinations: VaccinationRecord[];
  addVaccination: (record: Omit<VaccinationRecord, 'id'>) => void;
  toggleVaccinationStatus: (id: string) => void;
  biosecurityList: BiosecurityRecord[];
  addBiosecurityRecord: (record: Omit<BiosecurityRecord, 'id'>) => void;
  transactions: FinancialTransaction[];
  addTransaction: (tx: Omit<FinancialTransaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  tasks: DailyTask[];
  addTask: (task: Omit<DailyTask, 'id'>) => void;
  toggleTaskCompletion: (id: string) => void;
  deleteTask: (id: string) => void;
  feedInventory: FeedInventoryItem[];
  updateFeedStock: (id: string, newStockKg: number) => void;
  addFeedInventoryItem: (item: Omit<FeedInventoryItem, 'id'>) => void;
  metrics: DashboardMetrics;
  resetDemoData: () => void;
}

const FarmContext = createContext<FarmContextType | undefined>(undefined);

export const FarmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<FarmSettings>(() => 
    storageHelper.get('farm_settings', INITIAL_FARM_SETTINGS)
  );

  const [cattleList, setCattleList] = useState<Cattle[]>(() => 
    storageHelper.get('cattle_list', INITIAL_CATTLE_LIST)
  );

  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>(() => 
    storageHelper.get('health_records', INITIAL_HEALTH_RECORDS)
  );

  const [vaccinations, setVaccinations] = useState<VaccinationRecord[]>(() => 
    storageHelper.get('vaccinations', INITIAL_VACCINATIONS)
  );

  const [biosecurityList, setBiosecurityList] = useState<BiosecurityRecord[]>(() => 
    storageHelper.get('biosecurity', INITIAL_BIOSECURITY)
  );

  const [transactions, setTransactions] = useState<FinancialTransaction[]>(() => 
    storageHelper.get('transactions', INITIAL_TRANSACTIONS)
  );

  const [tasks, setTasks] = useState<DailyTask[]>(() => 
    storageHelper.get('daily_tasks', INITIAL_DAILY_TASKS)
  );

  const [feedInventory, setFeedInventory] = useState<FeedInventoryItem[]>(() => 
    storageHelper.get('feed_inventory', INITIAL_FEED_INVENTORY)
  );

  // Sync to local storage on changes
  useEffect(() => storageHelper.set('farm_settings', settings), [settings]);
  useEffect(() => storageHelper.set('cattle_list', cattleList), [cattleList]);
  useEffect(() => storageHelper.set('health_records', healthRecords), [healthRecords]);
  useEffect(() => storageHelper.set('vaccinations', vaccinations), [vaccinations]);
  useEffect(() => storageHelper.set('biosecurity', biosecurityList), [biosecurityList]);
  useEffect(() => storageHelper.set('transactions', transactions), [transactions]);
  useEffect(() => storageHelper.set('daily_tasks', tasks), [tasks]);
  useEffect(() => storageHelper.set('feed_inventory', feedInventory), [feedInventory]);

  // CRUD actions
  const updateSettings = (newSettings: Partial<FarmSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const addCattle = (cattleData: Omit<Cattle, 'id' | 'createdDate' | 'updatedDate'>) => {
    const newCattle: Cattle = {
      ...cattleData,
      id: `cat-${Date.now()}`,
      createdDate: new Date().toISOString().split('T')[0],
      updatedDate: new Date().toISOString().split('T')[0],
      weightHistory: [
        {
          id: `w-${Date.now()}`,
          cattleId: `cat-${Date.now()}`,
          weightKg: cattleData.currentWeightKg,
          recordedDate: new Date().toISOString().split('T')[0]
        }
      ]
    };
    setCattleList(prev => [newCattle, ...prev]);

    // Record purchase transaction if purchase price is present
    if (cattleData.purchasePrice && cattleData.purchasePrice > 0) {
      addTransaction({
        transactionType: 'expense',
        category: 'cattle_purchase',
        amountBdt: cattleData.purchasePrice + (cattleData.transportCost || 0),
        transactionDate: cattleData.purchaseDate || new Date().toISOString().split('T')[0],
        paymentMethod: 'cash',
        cattleId: newCattle.id,
        cattleTagId: newCattle.tagId,
        description: `Acquisition of cattle ${newCattle.tagId} (${newCattle.name || 'Unnamed'})`
      });
    }
  };

  const updateCattle = (id: string, updates: Partial<Cattle>) => {
    setCattleList(prev => prev.map(c => 
      c.id === id ? { ...c, ...updates, updatedDate: new Date().toISOString().split('T')[0] } : c
    ));
  };

  const deleteCattle = (id: string) => {
    setCattleList(prev => prev.filter(c => c.id !== id));
  };

  const addWeightRecord = (cattleId: string, weightKg: number, recordedDate: string, notes?: string) => {
    const record: WeightRecord = {
      id: `w-${Date.now()}`,
      cattleId,
      weightKg,
      recordedDate,
      notes
    };
    setCattleList(prev => prev.map(c => {
      if (c.id === cattleId) {
        const history = c.weightHistory || [];
        return {
          ...c,
          currentWeightKg: weightKg,
          updatedDate: recordedDate,
          weightHistory: [...history, record]
        };
      }
      return c;
    }));
  };

  const addHealthRecord = (record: Omit<HealthRecord, 'id'>) => {
    const newRecord: HealthRecord = {
      ...record,
      id: `hr-${Date.now()}`
    };
    setHealthRecords(prev => [newRecord, ...prev]);

    // Update target cattle health status to under_treatment or under_observation
    setCattleList(prev => prev.map(c => {
      if (c.id === record.cattleId) {
        return {
          ...c,
          healthStatus: record.recoveryStatus === 'recovered' ? 'healthy' : 'under_treatment'
        };
      }
      return c;
    }));
  };

  const updateHealthRecord = (id: string, updates: Partial<HealthRecord>) => {
    setHealthRecords(prev => prev.map(hr => hr.id === id ? { ...hr, ...updates } : hr));
  };

  const addVaccination = (record: Omit<VaccinationRecord, 'id'>) => {
    const newRecord: VaccinationRecord = {
      ...record,
      id: `vax-${Date.now()}`
    };
    setVaccinations(prev => [newRecord, ...prev]);
  };

  const toggleVaccinationStatus = (id: string) => {
    setVaccinations(prev => prev.map(v => {
      if (v.id === id) {
        const isDone = v.status === 'administered';
        return {
          ...v,
          status: isDone ? 'scheduled' : 'administered',
          administeredDate: isDone ? undefined : new Date().toISOString().split('T')[0]
        };
      }
      return v;
    }));
  };

  const addBiosecurityRecord = (record: Omit<BiosecurityRecord, 'id'>) => {
    setBiosecurityList(prev => [{ ...record, id: `bio-${Date.now()}` }, ...prev]);
  };

  const addTransaction = (tx: Omit<FinancialTransaction, 'id'>) => {
    setTransactions(prev => [{ ...tx, id: `tx-${Date.now()}` }, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const addTask = (task: Omit<DailyTask, 'id'>) => {
    setTasks(prev => [{ ...task, id: `task-${Date.now()}` }, ...prev]);
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        return {
          ...t,
          isCompleted: !t.isCompleted,
          completedAt: !t.isCompleted ? new Date().toISOString() : undefined
        };
      }
      return t;
    }));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const updateFeedStock = (id: string, newStockKg: number) => {
    setFeedInventory(prev => prev.map(item => 
      item.id === id ? { ...item, currentStockKg: Math.max(0, newStockKg) } : item
    ));
  };

  const addFeedInventoryItem = (item: Omit<FeedInventoryItem, 'id'>) => {
    setFeedInventory(prev => [{ ...item, id: `inv-${Date.now()}` }, ...prev]);
  };

  const resetDemoData = () => {
    setSettings(INITIAL_FARM_SETTINGS);
    setCattleList(INITIAL_CATTLE_LIST);
    setHealthRecords(INITIAL_HEALTH_RECORDS);
    setVaccinations(INITIAL_VACCINATIONS);
    setBiosecurityList(INITIAL_BIOSECURITY);
    setTransactions(INITIAL_TRANSACTIONS);
    setTasks(INITIAL_DAILY_TASKS);
    setFeedInventory(INITIAL_FEED_INVENTORY);
  };

  // Dynamically compute real dashboard metrics from live records
  const totalCattle = cattleList.length;
  const healthyCattle = cattleList.filter(c => c.healthStatus === 'healthy').length;
  const sickCattle = cattleList.filter(c => c.healthStatus === 'sick').length;
  const underTreatmentCattle = cattleList.filter(c => c.healthStatus === 'under_treatment' || c.healthStatus === 'under_observation').length;
  const pregnantCattle = cattleList.filter(c => c.pregnancyStatus === 'confirmed' || c.pregnancyStatus === 'suspected').length;
  const availableBreedingCattle = cattleList.filter(c => (c.purpose === 'dairy' || c.purpose === 'breeding' || c.purpose === 'heifer') && c.healthStatus === 'healthy').length;

  const totalInvestment = cattleList.reduce((sum, c) => sum + (c.purchasePrice || 0) + (c.transportCost || 0), 0);

  // Financial sums for current 30-day window
  const monthlyExpenses = transactions
    .filter(t => t.transactionType === 'expense')
    .reduce((sum, t) => sum + t.amountBdt, 0);

  const monthlyRevenue = transactions
    .filter(t => t.transactionType === 'income')
    .reduce((sum, t) => sum + t.amountBdt, 0);

  const estimatedProfitLoss = monthlyRevenue - monthlyExpenses;

  const totalFeedInventoryKg = feedInventory.reduce((sum, item) => sum + item.currentStockKg, 0);
  const lowStockItemsCount = feedInventory.filter(item => item.currentStockKg <= item.minimumThresholdKg).length;
  const upcomingVaccinationsCount = vaccinations.filter(v => v.status === 'scheduled').length;
  const pendingTasksCount = tasks.filter(t => !t.isCompleted).length;

  const metrics: DashboardMetrics = {
    totalCattle,
    healthyCattle,
    sickCattle,
    underTreatmentCattle,
    pregnantCattle,
    availableBreedingCattle,
    totalInvestment,
    monthlyExpenses,
    monthlyRevenue,
    estimatedProfitLoss,
    totalFeedInventoryKg,
    lowStockItemsCount,
    upcomingVaccinationsCount,
    pendingTasksCount
  };

  return (
    <FarmContext.Provider value={{
      settings,
      updateSettings,
      cattleList,
      addCattle,
      updateCattle,
      deleteCattle,
      addWeightRecord,
      healthRecords,
      addHealthRecord,
      updateHealthRecord,
      vaccinations,
      addVaccination,
      toggleVaccinationStatus,
      biosecurityList,
      addBiosecurityRecord,
      transactions,
      addTransaction,
      deleteTransaction,
      tasks,
      addTask,
      toggleTaskCompletion,
      deleteTask,
      feedInventory,
      updateFeedStock,
      addFeedInventoryItem,
      metrics,
      resetDemoData
    }}>
      {children}
    </FarmContext.Provider>
  );
};

export const useFarm = () => {
  const context = useContext(FarmContext);
  if (!context) {
    throw new Error('useFarm must be used within a FarmProvider');
  }
  return context;
};
