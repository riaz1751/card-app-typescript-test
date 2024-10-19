export interface Entry {
  id?: string;
  title: string;
  description: string;
  created_at: Date | string;
  schedule_at: Date | string;
}
export type EntryContextType = {
  entries: Entry[];
  saveEntry: (entry: Entry) => void;
  updateEntry: (id: string, entryData: Entry) => void;
  deleteEntry: (id: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => Promise<void>;
};
