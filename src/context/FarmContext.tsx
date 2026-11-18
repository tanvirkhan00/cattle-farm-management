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
import { storageHelper, isFirebaseConfigured } from '../services/firebase';
import {
  saveCattleToFirestore,
  deleteCattleFromFirestore,
  saveHealthRecordToFirestore,
  saveVaccinationToFirestore,
  saveTransactionToFirestore,
  deleteTransactionFromFirestore,
  saveTaskToFirestore,
  deleteTaskFromFirestore,
  saveFeedInventoryToFirestore,
  saveFarmSettingsToFirestore,
  syncAllLocalDataToFirestore,
  getCattleFromFirestore,
  getHealthRecordsFromFirestore,
  getVaccinationsFromFirestore,
  getTransactionsFromFirestore,
  getTasksFromFirestore,
  getFeedInventoryFromFirestore,
  getFarmSettingsFromFirestore
} from '../services/firestoreService';

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
  isCloudSyncing: boolean;
  syncWithFirestore: () => Promise<{ success: boolean; message: string }>;
  loadFromFirestore: () => Promise<{ success: boolean; message: string }>;
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

  const [isCloudSyncing, setIsCloudSyncing] = useState(false);

  // Sync to local storage on changes
  useEffect(() => storageHelper.set('farm_settings', settings), [settings]);
  useEffect(() => storageHelper.set('cattle_list', cattleList), [cattleList]);
  useEffect(() => storageHelper.set('health_records', healthRecords), [healthRecords]);
  useEffect(() => storageHelper.set('vaccinations', vaccinations), [vaccinations]);
  useEffect(() => storageHelper.set('biosecurity', biosecurityList), [biosecurityList]);
  useEffect(() => storageHelper.set('transactions', transactions), [transactions]);
  useEffect(() => storageHelper.set('daily_tasks', tasks), [tasks]);
  useEffect(() => storageHelper.set('feed_inventory', feedInventory), [feedInventory]);

  // Attempt initial load from Firestore if credentials configured
  useEffect(() => {
    if (!isFirebaseConfigured) return;

    const fetchCloudData = async () => {
      try {
        const cloudCattle = await getCattleFromFirestore();
        if (cloudCattle && cloudCattle.length > 0) {
          setCattleList(cloudCattle);
        }
        const cloudSettings = await getFarmSettingsFromFirestore();
        if (cloudSettings) {
          setSettings(cloudSettings);
        }
      } catch (e) {
        console.warn('Initial Firestore fetch skipped or failed (using local data):', e);
      }
    };

    fetchCloudData();
  }, []);

  // CRUD actions
  const updateSettings = (newSettings: Partial<FarmSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    saveFarmSettingsToFirestore(updated).catch(err => console.warn('Firestore settings save:', err));
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
    saveCattleToFirestore(newCattle).catch(err => console.warn('Firestore cattle save:', err));

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
    setCattleList(prev => {
      const updated = prev.map(c => 
        c.id === id ? { ...c, ...updates, updatedDate: new Date().toISOString().split('T')[0] } : c
      );
      const target = updated.find(c => c.id === id);
      if (target) {
        saveCattleToFirestore(target).catch(err => console.warn('Firestore cattle update:', err));
      }
      return updated;
    });
  };

  const deleteCattle = (id: string) => {
    setCattleList(prev => prev.filter(c => c.id !== id));
    deleteCattleFromFirestore(id).catch(err => console.warn('Firestore cattle delete:', err));
  };

  const addWeightRecord = (cattleId: string, weightKg: number, recordedDate: string, notes?: string) => {
    const record: WeightRecord = {
      id: `w-${Date.now()}`,
      cattleId,
      weightKg,
      recordedDate,
      notes
    };
    setCattleList(prev => {
      const updated = prev.map(c => {
        if (c.id === cattleId) {
          const history = c.weightHistory || [];
          const updatedCattle = {
            ...c,
            currentWeightKg: weightKg,
            updatedDate: recordedDate,
            weightHistory: [...history, record]
          };
          saveCattleToFirestore(updatedCattle).catch(err => console.warn('Firestore weight update:', err));
          return updatedCattle;
        }
        return c;
      });
      return updated;
    });
  };

  const addHealthRecord = (record: Omit<HealthRecord, 'id'>) => {
    const newRecord: HealthRecord = {
      ...record,
      id: `hr-${Date.now()}`
    };
    setHealthRecords(prev => [newRecord, ...prev]);
    saveHealthRecordToFirestore(newRecord).catch(err => console.warn('Firestore health save:', err));

    // Update target cattle health status to under_treatment or under_observation
    setCattleList(prev => prev.map(c => {
      if (c.id === record.cattleId) {
        const updated = {
          ...c,
          healthStatus: record.recoveryStatus === 'recovered' ? 'healthy' as const : 'under_treatment' as const
        };
        saveCattleToFirestore(updated).catch(err => console.warn('Firestore cattle status sync:', err));
        return updated;
      }
      return c;
    }));
  };

  const updateHealthRecord = (id: string, updates: Partial<HealthRecord>) => {
    setHealthRecords(prev => {
      const updated = prev.map(hr => hr.id === id ? { ...hr, ...updates } : hr);
      const target = updated.find(hr => hr.id === id);
      if (target) {
        saveHealthRecordToFirestore(target).catch(err => console.warn('Firestore health update:', err));
      }
      return updated;
    });
  };

  const addVaccination = (record: Omit<VaccinationRecord, 'id'>) => {
    const newRecord: VaccinationRecord = {
      ...record,
      id: `vax-${Date.now()}`
    };
    setVaccinations(prev => [newRecord, ...prev]);
    saveVaccinationToFirestore(newRecord).catch(err => console.warn('Firestore vaccination save:', err));
  };

  const toggleVaccinationStatus = (id: string) => {
    setVaccinations(prev => {
      const updated = prev.map(v => {
        if (v.id === id) {
          const isDone = v.status === 'administered';
          const updatedVax: VaccinationRecord = {
            ...v,
            status: isDone ? 'scheduled' : 'administered',
            administeredDate: isDone ? undefined : new Date().toISOString().split('T')[0]
          };
          saveVaccinationToFirestore(updatedVax).catch(err => console.warn('Firestore vaccination toggle:', err));
          return updatedVax;
        }
        return v;
      });
      return updated;
    });
  };

  const addBiosecurityRecord = (record: Omit<BiosecurityRecord, 'id'>) => {
    setBiosecurityList(prev => [{ ...record, id: `bio-${Date.now()}` }, ...prev]);
  };

  const addTransaction = (tx: Omit<FinancialTransaction, 'id'>) => {
    const newTx: FinancialTransaction = { ...tx, id: `tx-${Date.now()}` };
    setTransactions(prev => [newTx, ...prev]);
    saveTransactionToFirestore(newTx).catch(err => console.warn('Firestore transaction save:', err));
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
    deleteTransactionFromFirestore(id).catch(err => console.warn('Firestore transaction delete:', err));
  };

  const addTask = (task: Omit<DailyTask, 'id'>) => {
    const newTask: DailyTask = { ...task, id: `task-${Date.now()}` };
    setTasks(prev => [newTask, ...prev]);
    saveTaskToFirestore(newTask).catch(err => console.warn('Firestore task save:', err));
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(prev => {
      const updated = prev.map(t => {
        if (t.id === id) {
          const updatedTask: DailyTask = {
            ...t,
            isCompleted: !t.isCompleted,
            completedAt: !t.isCompleted ? new Date().toISOString() : undefined
          };
          saveTaskToFirestore(updatedTask).catch(err => console.warn('Firestore task toggle:', err));
          return updatedTask;
        }
        return t;
      });
      return updated;
    });
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    deleteTaskFromFirestore(id).catch(err => console.warn('Firestore task delete:', err));
  };

  const updateFeedStock = (id: string, newStockKg: number) => {
    setFeedInventory(prev => {
      const updated = prev.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, currentStockKg: Math.max(0, newStockKg) };
          saveFeedInventoryToFirestore(updatedItem).catch(err => console.warn('Firestore feed update:', err));
          return updatedItem;
        }
        return item;
      });
      return updated;
    });
  };

  const addFeedInventoryItem = (item: Omit<FeedInventoryItem, 'id'>) => {
    const newItem: FeedInventoryItem = { ...item, id: `inv-${Date.now()}` };
    setFeedInventory(prev => [newItem, ...prev]);
    saveFeedInventoryToFirestore(newItem).catch(err => console.warn('Firestore feed save:', err));
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

  // Push all local data to Firestore
  const syncWithFirestore = async (): Promise<{ success: boolean; message: string }> => {
    if (!isFirebaseConfigured) {
      return {
        success: false,
        message: 'Firebase is not configured in .env. Please configure your Firebase credentials first.'
      };
    }

    try {
      setIsCloudSyncing(true);
      const res = await syncAllLocalDataToFirestore({
        settings,
        cattleList,
        healthRecords,
        vaccinations,
        transactions,
        tasks,
        feedInventory
      });

      if (res.success) {
        return {
          success: true,
          message: `Successfully synchronized ${res.count} records to Cloud Firestore.`
        };
      } else {
        return {
          success: false,
          message: res.error || 'Sync failed.'
        };
      }
    } catch (err: any) {
      return { success: false, message: err.message || 'Sync failed.' };
    } finally {
      setIsCloudSyncing(false);
    }
  };

  // Pull all data from Firestore down to local state
  const loadFromFirestore = async (): Promise<{ success: boolean; message: string }> => {
    if (!isFirebaseConfigured) {
      return {
        success: false,
        message: 'Firebase is not configured in .env.'
      };
    }

    try {
      setIsCloudSyncing(true);
      const [cList, hList, vList, tList, taskList, fList, setts] = await Promise.all([
        getCattleFromFirestore(),
        getHealthRecordsFromFirestore(),
        getVaccinationsFromFirestore(),
        getTransactionsFromFirestore(),
        getTasksFromFirestore(),
        getFeedInventoryFromFirestore(),
        getFarmSettingsFromFirestore()
      ]);

      if (cList.length > 0) setCattleList(cList);
      if (hList.length > 0) setHealthRecords(hList);
      if (vList.length > 0) setVaccinations(vList);
      if (tList.length > 0) setTransactions(tList);
      if (taskList.length > 0) setTasks(taskList);
      if (fList.length > 0) setFeedInventory(fList);
      if (setts) setSettings(setts);

      return {
        success: true,
        message: `Successfully loaded records from Cloud Firestore.`
      };
    } catch (err: any) {
      return { success: false, message: err.message || 'Load failed.' };
    } finally {
      setIsCloudSyncing(false);
    }
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
      resetDemoData,
      isCloudSyncing,
      syncWithFirestore,
      loadFromFirestore
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
