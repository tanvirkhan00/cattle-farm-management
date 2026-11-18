import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  writeBatch
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from 'firebase/storage';
import { db, storage, isFirebaseConfigured } from './firebase';
import {
  Cattle,
  HealthRecord,
  VaccinationRecord,
  FinancialTransaction,
  DailyTask,
  FeedInventoryItem,
  FarmSettings
} from '../types';

/**
 * Storage File Upload: Uploads cattle photo, vet document, or PDF to Firebase Storage
 */
export async function uploadFileToStorage(
  folder: 'cattle_photos' | 'vet_documents' | 'knowledge_pdfs',
  file: File,
  filenamePrefix?: string
): Promise<string> {
  if (!isFirebaseConfigured || !storage) {
    throw new Error('Firebase Storage is not configured in .env. Operating in local mode.');
  }

  const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const uniqueName = `${filenamePrefix ? `${filenamePrefix}_` : ''}${Date.now()}_${cleanName}`;
  const storageRef = ref(storage, `${folder}/${uniqueName}`);

  const snapshot = await uploadBytes(storageRef, file, {
    contentType: file.type
  });

  return await getDownloadURL(snapshot.ref);
}

// -------------------------------------------------------------
// Cattle Collection Operations
// -------------------------------------------------------------
export async function getCattleFromFirestore(): Promise<Cattle[]> {
  if (!isFirebaseConfigured || !db) return [];
  const snapshot = await getDocs(collection(db, 'cattle'));
  return snapshot.docs.map(d => ({ ...(d.data() as Cattle), id: d.id }));
}

export async function saveCattleToFirestore(cattle: Cattle): Promise<void> {
  if (!isFirebaseConfigured || !db) return;
  const docRef = doc(db, 'cattle', cattle.id);
  await setDoc(docRef, cattle, { merge: true });
}

export async function deleteCattleFromFirestore(id: string): Promise<void> {
  if (!isFirebaseConfigured || !db) return;
  await deleteDoc(doc(db, 'cattle', id));
}

// -------------------------------------------------------------
// Health Records Operations
// -------------------------------------------------------------
export async function getHealthRecordsFromFirestore(): Promise<HealthRecord[]> {
  if (!isFirebaseConfigured || !db) return [];
  const snapshot = await getDocs(collection(db, 'health_records'));
  return snapshot.docs.map(d => ({ ...(d.data() as HealthRecord), id: d.id }));
}

export async function saveHealthRecordToFirestore(record: HealthRecord): Promise<void> {
  if (!isFirebaseConfigured || !db) return;
  const docRef = doc(db, 'health_records', record.id);
  await setDoc(docRef, record, { merge: true });
}

// -------------------------------------------------------------
// Vaccinations Operations
// -------------------------------------------------------------
export async function getVaccinationsFromFirestore(): Promise<VaccinationRecord[]> {
  if (!isFirebaseConfigured || !db) return [];
  const snapshot = await getDocs(collection(db, 'vaccinations'));
  return snapshot.docs.map(d => ({ ...(d.data() as VaccinationRecord), id: d.id }));
}

export async function saveVaccinationToFirestore(vax: VaccinationRecord): Promise<void> {
  if (!isFirebaseConfigured || !db) return;
  const docRef = doc(db, 'vaccinations', vax.id);
  await setDoc(docRef, vax, { merge: true });
}

// -------------------------------------------------------------
// Financial Transactions Operations
// -------------------------------------------------------------
export async function getTransactionsFromFirestore(): Promise<FinancialTransaction[]> {
  if (!isFirebaseConfigured || !db) return [];
  const snapshot = await getDocs(collection(db, 'financial_transactions'));
  return snapshot.docs.map(d => ({ ...(d.data() as FinancialTransaction), id: d.id }));
}

export async function saveTransactionToFirestore(tx: FinancialTransaction): Promise<void> {
  if (!isFirebaseConfigured || !db) return;
  const docRef = doc(db, 'financial_transactions', tx.id);
  await setDoc(docRef, tx, { merge: true });
}

export async function deleteTransactionFromFirestore(id: string): Promise<void> {
  if (!isFirebaseConfigured || !db) return;
  await deleteDoc(doc(db, 'financial_transactions', id));
}

// -------------------------------------------------------------
// Daily Operations Tasks
// -------------------------------------------------------------
export async function getTasksFromFirestore(): Promise<DailyTask[]> {
  if (!isFirebaseConfigured || !db) return [];
  const snapshot = await getDocs(collection(db, 'daily_tasks'));
  return snapshot.docs.map(d => ({ ...(d.data() as DailyTask), id: d.id }));
}

export async function saveTaskToFirestore(task: DailyTask): Promise<void> {
  if (!isFirebaseConfigured || !db) return;
  const docRef = doc(db, 'daily_tasks', task.id);
  await setDoc(docRef, task, { merge: true });
}

export async function deleteTaskFromFirestore(id: string): Promise<void> {
  if (!isFirebaseConfigured || !db) return;
  await deleteDoc(doc(db, 'daily_tasks', id));
}

// -------------------------------------------------------------
// Feed Inventory Operations
// -------------------------------------------------------------
export async function getFeedInventoryFromFirestore(): Promise<FeedInventoryItem[]> {
  if (!isFirebaseConfigured || !db) return [];
  const snapshot = await getDocs(collection(db, 'feed_inventory'));
  return snapshot.docs.map(d => ({ ...(d.data() as FeedInventoryItem), id: d.id }));
}

export async function saveFeedInventoryToFirestore(item: FeedInventoryItem): Promise<void> {
  if (!isFirebaseConfigured || !db) return;
  const docRef = doc(db, 'feed_inventory', item.id);
  await setDoc(docRef, item, { merge: true });
}

// -------------------------------------------------------------
// Farm Settings Operations
// -------------------------------------------------------------
export async function getFarmSettingsFromFirestore(): Promise<FarmSettings | null> {
  if (!isFirebaseConfigured || !db) return null;
  const docRef = doc(db, 'farm_settings', 'main_farm');
  const snap = await getDoc(docRef);
  return snap.exists() ? (snap.data() as FarmSettings) : null;
}

export async function saveFarmSettingsToFirestore(settings: FarmSettings): Promise<void> {
  if (!isFirebaseConfigured || !db) return;
  const docRef = doc(db, 'farm_settings', 'main_farm');
  await setDoc(docRef, settings, { merge: true });
}

// -------------------------------------------------------------
// Bulk Sync Local State to Cloud Firestore
// -------------------------------------------------------------
export async function syncAllLocalDataToFirestore(data: {
  settings: FarmSettings;
  cattleList: Cattle[];
  healthRecords: HealthRecord[];
  vaccinations: VaccinationRecord[];
  transactions: FinancialTransaction[];
  tasks: DailyTask[];
  feedInventory: FeedInventoryItem[];
}): Promise<{ success: boolean; count: number; error?: string }> {
  if (!isFirebaseConfigured || !db) {
    return { success: false, count: 0, error: 'Firebase is not configured in .env' };
  }

  try {
    const batch = writeBatch(db);
    let totalOps = 0;

    // Farm Settings
    batch.set(doc(db, 'farm_settings', 'main_farm'), data.settings, { merge: true });
    totalOps++;

    // Cattle
    data.cattleList.forEach(c => {
      batch.set(doc(db, 'cattle', c.id), c, { merge: true });
      totalOps++;
    });

    // Health Records
    data.healthRecords.forEach(hr => {
      batch.set(doc(db, 'health_records', hr.id), hr, { merge: true });
      totalOps++;
    });

    // Vaccinations
    data.vaccinations.forEach(v => {
      batch.set(doc(db, 'vaccinations', v.id), v, { merge: true });
      totalOps++;
    });

    // Transactions
    data.transactions.forEach(t => {
      batch.set(doc(db, 'financial_transactions', t.id), t, { merge: true });
      totalOps++;
    });

    // Tasks
    data.tasks.forEach(task => {
      batch.set(doc(db, 'daily_tasks', task.id), task, { merge: true });
      totalOps++;
    });

    // Feed Inventory
    data.feedInventory.forEach(inv => {
      batch.set(doc(db, 'feed_inventory', inv.id), inv, { merge: true });
      totalOps++;
    });

    await batch.commit();
    return { success: true, count: totalOps };
  } catch (err: any) {
    console.error('Batch sync to Firestore failed:', err);
    return { success: false, count: 0, error: err.message };
  }
}
