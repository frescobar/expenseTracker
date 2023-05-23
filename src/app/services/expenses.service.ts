import { Injectable, Query } from '@angular/core';
import {
  CollectionReference,
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from '@angular/fire/firestore';
import { Expense } from '../models/Expense';
import { Auth } from '@angular/fire/auth';
import { Observable, map, of } from 'rxjs';

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
