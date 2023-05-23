export interface Expense {
  id?: string;
  userId: string;
  name: string;
  amount: number;
  type: string;
  date: Date;
  description?: string;
}
