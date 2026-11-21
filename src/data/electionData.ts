export interface Teacher {
  id: string;
  order: number;
  name: string;
}

export interface NominationCategory {
  id: string;
  label: string;
}

export interface VoteRecord {
  id: string;
  fullName: string;
  className: string;
  submittedAt: string;
  /** Mapping of teacherId -> categoryId (strictly 1-to-1 unique per ballot) */
  selections: Record<string, string>;
}

export interface TeacherTally {
  teacher: Teacher;
  totalVotes: number;
  topCategory: {
    category: NominationCategory;
    votes: number;
  } | null;
  breakdown: Array<{
    category: NominationCategory;
    votes: number;
  }>;
}

export interface CategorySummary {
  category: NominationCategory;
  totalVotes: number;
  leadingTeacher: {
    teacher: Teacher;
    votes: number;
  } | null;
}

export interface ElectionSummary {
  totalBallots: number;
  participatingClasses: number;
  totalClasses: number;
  classDistribution: Array<{ className: string; count: number }>;
  teacherTallies: TeacherTally[];
  categorySummaries: CategorySummary[];
}

export const TEACHERS: Teacher[] = [
  { id: 't01', order: 1, name: 'Bpk. Nasan, S.Pd., M.M.' },
  { id: 't02', order: 2, name: 'Bunda Rita Diana, S.E.' },
  { id: 't03', order: 3, name: 'Bpk. Nurasan Fachri, S.Pd.' },
  { id: 't04', order: 4, name: 'Bpk. Syarifudin, M.Pd.' },
  { id: 't05', order: 5, name: 'Ibu Rosyidah, S.Pd., M.M.' },
  { id: 't06', order: 6, name: 'Ibu Napsiah, S.Pd.' },
  { id: 't07', order: 7, name: 'Ibu Susi Susilawati, S.Pd.' },
  { id: 't08', order: 8, name: 'Bpk. Taufik Anwar, S.Pd.' },
  { id: 't09', order: 9, name: 'Ibu Shara Savitri, M.Pd.' },
  { id: 't10', order: 10, name: 'Ibu Nanda Salsabila Kamila, S.Pd.' },
  { id: 't11', order: 11, name: 'Ibu Annisa Deviana Putri Kurniawan, S.Pd.' },
  { id: 't12', order: 12, name: 'Bpk. Dwiki Darmawan, S.Pd.' },
  { id: 't13', order: 13, name: 'Bpk. Usman Sahata Hasibuan, S.H.' },
  { id: 't14', order: 14, name: 'Ibu Desi Arisandi, S.Pd.' },
  { id: 't15', order: 15, name: 'Ibu Indah Permata Sari, S.P.' },
  { id: 't16', order: 16, name: 'Ibu Syafira Rizka Amalia' },
  { id: 't17', order: 17, name: 'Bpk. Handri Yosepal Driyana, S.Pd.' },
  { id: 't18', order: 18, name: 'Ibu Deva Aulia Wahida' },
  { id: 't19', order: 19, name: 'Ibu Siti Safniyah, S.Kom.' },
  { id: 't20', order: 20, name: 'Ibu Wahyu Trihartatik, S.Pd.' },
  { id: 't21', order: 21, name: 'Bpk. Ubaidillah, S.Si.' },
  { id: 't22', order: 22, name: 'Ibu Rizka Dewi, S.Pd.' },
  { id: 't23', order: 23, name: 'Ibu Nabila Putri, S.Pd.' },
  { id: 't24', order: 24, name: 'Bpk. Madi' },
  { id: 't25', order: 25, name: 'Bpk. Rohmat' },
  { id: 't26', order: 26, name: 'Bpk. Rizky' },
  { id: 't27', order: 27, name: 'Ibu Auviliana (Ika)' },
];

export const NOMINATIONS: NominationCategory[] = [
  { id: 'c01', label: 'Guru Tercantik' },
  { id: 'c02', label: 'Terganteng' },
  { id: 'c03', label: 'Termultitalent' },
  { id: 'c04', label: 'Terstylish' },
  { id: 'c05', label: 'Terlucu' },
  { id: 'c06', label: 'Tersabar' },
  { id: 'c07', label: 'Terdisiplin' },
  { id: 'c08', label: 'Terkreatif' },
  { id: 'c09', label: 'Terkece' },
  { id: 'c10', label: 'Terinspiratif' },
  { id: 'c11', label: 'Tertegas' },
  { id: 'c12', label: 'Terkalem' },
  { id: 'c13', label: 'Teragamis' },
  { id: 'c14', label: 'Terperhatian' },
  { id: 'c15', label: 'Terceria' },
  { id: 'c16', label: 'Terramah' },
  { id: 'c17', label: 'Terrapi' },
  { id: 'c18', label: 'Terbersih' },
  { id: 'c19', label: 'Terrajin' },
  { id: 'c20', label: 'Terasik' },
  { id: 'c21', label: 'Terfavorit' },
  { id: 'c22', label: 'Tersemangat' },
  { id: 'c23', label: 'Tergaul' },
  { id: 'c24', label: 'Terlembut' },
  { id: 'c25', label: 'Terdermawan' },
  { id: 'c26', label: 'Terberwibawa' },
  { id: 'c27', label: 'Teringgris' },
  { id: 'c28', label: 'Tersporty' },
  { id: 'c29', label: 'Terhealthy' },
];

export const TEACHER_MAP = new Map(TEACHERS.map((t) => [t.id, t]));
export const NOMINATION_MAP = new Map(NOMINATIONS.map((c) => [c.id, c]));

export const CLASS_OPTIONS = [
  '71', '72', '73', '74',
  '81', '82', '83', '84', '85',
  '91', '92', '93', '94', '95',
];

export const VALID_CLASS_SET = new Set(CLASS_OPTIONS);
