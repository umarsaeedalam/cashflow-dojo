// Supported currency codes for the application
export type Currency = 'USD' | 'EUR' | 'JPY' | 'GBP' | 'CNY' | 'CAD' | 'AUD' | 'CHF' | 'HKD' | 'MXN' | 'BRL' | 'RUB' | 'INR' | 'ZAR' | 'PKR' | 'SGD'

// Core user profile data structure
export type User = {
   user_id: string;
   email: string;
   name: string;
   currency: string;
   currentPage: number;
}

export type Categories = "Housing" | "Transportation" | "Food & Dining" | "Healthcare" | "Personal Care" | "Education" | "Entertainment & Leisure" | "Technology" | "Savings & Investments" | "Debt Repayment" | "Gifts & Donations" | string

// Data structure for profile editing form
export type EditProfile = {
   id: string;
   username: string;
   currency: string;
}

// Base expense record structure from database
export type Expense = {
   expense_id: string;
   user_id: string;
   name: string;
   category: Categories;
   date: Date;
   amount: number;
};

// Structure for new expense creation
export type UserExpense = {
   description: string;
   amount: number;
   date: Date;
   category: string;
}

// State management for the expenses table
export type ReducerState = {
   originalExpenseList: Expense[];
   filteredExpenseList: Expense[]; 
   totalPages: number;
   currentPage: number;
   sortBy: 'Date' | 'Amount';
   sortDirection: 'Ascending' | 'Descending';
   filters: {
       categories: string[];
       amountRange: [number, number];
       dateRange: {
           from?: Date | undefined;
           to?: Date | undefined;
       };
   };
};

// Available actions for expenses table reducer
export type Action = 
   | { type: 'pageChange'; payload: number }
   | { type: 'sort'; payload: { sortBy: 'Date' | 'Amount'; direction: 'Ascending' | 'Descending' } }
   | { type: 'filter'; payload: { categories: string[]; amountRange: [number, number]; dateRange: { from?: Date | undefined; to?: Date | undefined } } }
   | { type: 'resetFilters'; payload: { amountRange: [number, number] } };

// Data structure for expense analytics chart
export type ChartDataPoint = {
    week: string;
    housing?: number;
    transportation?: number;
    food_dining?: number;
    healthcare?: number;
    personal_care?: number;
    education?: number;
    entertainment_leisure?: number;
    technology?: number;
    savings_investments?: number;
    debt_repayment?: number;
    gifts_donation?: number;
 };