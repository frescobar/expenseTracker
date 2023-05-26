import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  query,
  where,
} from '@angular/fire/firestore';
import { Expense } from '../models/Expense';

import { Observable, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  constructor(private firestore: Firestore) {}
  addExpense(expense: Expense) {
    const expenseRef = collection(this.firestore, 'expenses');
    return addDoc(expenseRef, expense);
  }

  getExpenses(userId: string): Observable<Expense[]> {
    const expensesRef = collection(this.firestore, 'expenses');
    const q = query(expensesRef, where('userId', '==', userId));

    return collectionData(q, { idField: 'id' }).pipe(
      map((expenses) =>
        expenses.map((expense) => ({
          ...expense,
          date: new Date(expense['date']),
        }))
      ),
      map(
        (expenses) =>
          expenses.sort(
            (a, b) => b.date.getTime() - a.date.getTime()
          ) as Expense[]
      )
    );
  }
  deleteExpense(expenseId: string): Promise<void> {
    const expenseDocRef = doc(this.firestore, 'expenses', expenseId);
    return deleteDoc(expenseDocRef);
  }
}
