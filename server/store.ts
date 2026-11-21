import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import {
  NOMINATIONS,
  TEACHERS,
  type VoteRecord,
} from '../src/data/electionData.ts';

export interface VotingDatabase {
  version: number;
  adminPasscodeHash: string | null;
  votes: VoteRecord[];
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_PATH = path.join(DATA_DIR, 'voting-db.json');

let writeLock: Promise<void> = Promise.resolve();

function withLock<T>(fn: () => Promise<T>): Promise<T> {
  const next = writeLock.then(fn, fn);
  writeLock = next.then(
    () => undefined,
    () => undefined
  );
  return next;
}

function buildSeedDatabase(): VotingDatabase {
  const votes: VoteRecord[] = [];

  const sampleVoters = [
    { id: 'vote-seed-001', fullName: 'Nadia Putri Pratama', className: '91', offset: 0 },
    { id: 'vote-seed-002', fullName: 'Rafi Akbar Maulana', className: '83', offset: 2 },
  ];

  for (const voter of sampleVoters) {
    const selections: Record<string, string> = {};
    TEACHERS.forEach((teacher, idx) => {
      const cat = NOMINATIONS[(idx + voter.offset) % NOMINATIONS.length];
      selections[teacher.id] = cat.id;
    });

    votes.push({
      id: voter.id,
      fullName: voter.fullName,
      className: voter.className,
      submittedAt: '2026-11-20T08:30:00.000Z',
      selections,
    });
  }

  return {
    version: 2,
    adminPasscodeHash: null,
    votes,
  };
}

async function ensureDbExists(): Promise<VotingDatabase> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    const raw = await fs.readFile(DB_PATH, 'utf8');
    const parsed = JSON.parse(raw) as VotingDatabase;
    if (!Array.isArray(parsed.votes)) {
      throw new Error('Invalid DB schema');
    }
    return parsed;
  } catch {
    const seed = buildSeedDatabase();
    await atomicWriteDb(seed);
    return seed;
  }
}

async function atomicWriteDb(db: VotingDatabase): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const tmpPath = path.join(DATA_DIR, `voting-db.${process.pid}.${Date.now()}.tmp`);
  await fs.writeFile(tmpPath, JSON.stringify(db, null, 2), 'utf8');
  await fs.rename(tmpPath, DB_PATH);
}

export async function readDb(): Promise<VotingDatabase> {
  return withLock(async () => ensureDbExists());
}

export async function mutateDb<T>(
  mutator: (db: VotingDatabase) => Promise<T> | T
): Promise<T> {
  return withLock(async () => {
    const db = await ensureDbExists();
    const result = await mutator(db);
    await atomicWriteDb(db);
    return result;
  });
}

export function hashPasscode(passcode: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const derived = crypto.scryptSync(passcode, salt, 64).toString('hex');
  return `${salt}:${derived}`;
}

export function verifyPasscodeHash(passcode: string, storedHash: string): boolean {
  const parts = storedHash.split(':');
  if (parts.length !== 2) return false;
  const [salt, keyHex] = parts;
  if (!salt || !keyHex) return false;
  try {
    const keyBuf = Buffer.from(keyHex, 'hex');
    const derived = crypto.scryptSync(passcode, salt, 64);
    if (keyBuf.length !== derived.length) return false;
    return crypto.timingSafeEqual(keyBuf, derived);
  } catch {
    return false;
  }
}

export function resetElectionData(db: VotingDatabase): void {
  db.votes = [];
}
