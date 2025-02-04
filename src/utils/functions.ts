import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { Expense, ChartDataPoint } from './types'
import { currencies, categories } from './data'

// Setup timezone handling
dayjs.extend(utc)
dayjs.extend(timezone)
const userTimeZone = dayjs.tz.guess()

// Mapping for special category labels that need custom formatting
const specialLabels: { [key: string]: string } = {
    'food_dining': 'Food & Dining',
    'education': 'Education',
    'entertainment_leisure': 'Entertainment & Leisure',
    'technology': 'Technology',
    'savings_investments': 'Savings & Investments',
    'gifts_donation': 'Gifts & Donations'
}


// Date formatting and conversion functions
export function localToUTC(date: Date): Date {
    return dayjs(date).utc().toDate()
}

export function utcToLocal(date: Date) {
    return dayjs.utc(date).tz(userTimeZone).format('MMMM D, YYYY')
}

export function utcToLocalShorter(date: Date) {
    return dayjs.utc(date).tz(userTimeZone).format("DD-MM-'YY")
}


// Helper functions for UI display
export function getCurrencySymbol(currencyCode: string) {
    const currencySymbols: { [key: string]: string } = currencies;
    return currencySymbols[currencyCode] || currencyCode;
}

export function getCategoryColor(category: string) {
    const colors = {
        'Housing': '#4A8FE7',
        'Household Items': '#A0522D',
        'Utilities': '#7FCDBB',
        'Groceries': '#2E8B57',
        'Dining Out': '#FFA07A',
        'Transportation': '#20B2AA',
        'Education': '#9370DB',
        'Wellness & Fitness': '#FF6347',
        'Beauty & Grooming': '#FF69B4',
        'Savings & Investments': '#32CD32',
        'Insurance & Protection': '#708090',
        'Entertainment & Leisure': '#FFD700',
        'Travel & Vacation': '#FF4500',
        'Clothing & Accessories': '#BA55D3',
        'Technology': '#48D1CC',
        'Gifts & Donations': '#008080'
    } as const

    return colors[category as keyof typeof colors] || '#696969'
}


// Date range and calculation utilities
export function getCurrentMonthRange() {
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)
    return { startOfMonth, endOfMonth }
}

/**
 * Calculates an ideal step size for range inputs based on the data range.
 * Aims for ~20 steps, rounds to a "nice" number, and ensures minimum step of 1.
 */
export function calculateIdealStep(minAmount: number, maxAmount: number): number {
    const desiredSteps = 20
    const range = maxAmount - minAmount
    if (range <= 0) return 1

    let step = range / desiredSteps
    const magnitude = Math.pow(10, Math.floor(Math.log10(step)))
    step = Math.round(step / magnitude) * magnitude

    return Math.max(1, step)
}


// Expense analysis functions
/**
 * Groups expenses by week (up to 5 weeks) for the selected month.
 * Each week contains running totals for each expense category.
 */
export function processMonthExpenses(expenses: Expense[], selectedMonth: string) {
    const [monthName, year] = selectedMonth.split(' ')
    const selectedDate = new Date(`${monthName} 1, ${year}`)
    const selectedYear = selectedDate.getFullYear()
    const selectedMonthIndex = selectedDate.getMonth()

    const weeklyExpenses = Array.from({ length: 5 }, () => 
        Object.fromEntries(categories.map(cat => [cat, 0]))
    )

    expenses
        .filter(expense => {
            const expenseDate = new Date(expense.date)
            return expenseDate.getFullYear() === selectedYear && 
                   expenseDate.getMonth() === selectedMonthIndex
        })
        .forEach(expense => {
            const expenseDate = new Date(expense.date)
            const week = Math.min(Math.floor((expenseDate.getDate() - 1) / 7), 4)
            weeklyExpenses[week][expense.category] += expense.amount
        })

    return weeklyExpenses
}

/**
 * Calculates total spend per category for the selected month.
 * Returns an array aligned with the categories array.
 */
export function calculateCategoryTotals(expenses: Expense[], selectedMonth: string): number[] {
    const [monthName, year] = selectedMonth.split(' ')
    const selectedDate = new Date(`${monthName} 1, ${year}`)
    const selectedYear = selectedDate.getFullYear()
    const selectedMonthIndex = selectedDate.getMonth()

    const categoryTotals = new Array(categories.length).fill(0)

    expenses
        .filter(expense => {
            const expenseDate = new Date(expense.date)
            return expenseDate.getFullYear() === selectedYear && 
                   expenseDate.getMonth() === selectedMonthIndex
        })
        .forEach(expense => {
            const categoryIndex = categories.indexOf(expense.category)
            if (categoryIndex !== -1) {
                categoryTotals[categoryIndex] += expense.amount
            }
        })

    return categoryTotals
}

/**
 * Finds the highest expense amount in each category for the month.
 * Returns amount and description for the top expense in each category.
 */
export function processMonthlyTopExpenses(expenses: Expense[], selectedMonth: string) {
    const [monthName, year] = selectedMonth.split(' ')
    const selectedDate = new Date(`${monthName} 1, ${year}`)
    const selectedYear = selectedDate.getFullYear()
    const selectedMonthIndex = selectedDate.getMonth()

    const monthlyExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date)
        return expenseDate.getFullYear() === selectedYear && 
               expenseDate.getMonth() === selectedMonthIndex
    })

    return categories.map(() => ({ amount: 0, description: 'N/A' }))
        .map((defaultValue, index) => {
            const categoryExpenses = monthlyExpenses.filter(
                expense => categories.indexOf(expense.category) === index
            )
            if (!categoryExpenses.length) return defaultValue

            const highest = categoryExpenses.reduce((max, expense) => 
                expense.amount > max.amount ? expense : max
            )

            return {
                amount: highest.amount,
                description: highest.name
            }
        })
}

/**
 * Counts how many expenses occurred in each category during the month.
 */
export function processExpenseFrequency(expenses: Expense[], selectedMonth: string): number[] {
    const [monthName, year] = selectedMonth.split(' ')
    const selectedDate = new Date(`${monthName} 1, ${year}`)
    const selectedYear = selectedDate.getFullYear()
    const selectedMonthIndex = selectedDate.getMonth()

    const frequencyCount = new Array(categories.length).fill(0)

    expenses
        .filter(expense => {
            const expenseDate = new Date(expense.date)
            return expenseDate.getFullYear() === selectedYear && 
                   expenseDate.getMonth() === selectedMonthIndex
        })
        .forEach(expense => {
            const categoryIndex = categories.indexOf(expense.category)
            if (categoryIndex !== -1) frequencyCount[categoryIndex]++
        })

    return frequencyCount
}

/**
 * Generates an array of month-year strings from the earliest expense date to current date.
 * Used for date selection dropdowns and navigation.
 */
export function getMonthYearRange(expenses: Expense[]): string[] {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth()

    const earliestDate = expenses.reduce((earliest, expense) => {
        const expenseDate = new Date(expense.date)
        return expenseDate < earliest ? expenseDate : earliest
    }, new Date())

    const earliestYear = earliestDate.getFullYear()
    const earliestMonth = earliestDate.getMonth()

    const monthYearRange: string[] = []
    let year = currentYear
    let month = currentMonth

    while (year > earliestYear || (year === earliestYear && month >= earliestMonth)) {
        monthYearRange.push(
            new Date(year, month).toLocaleString('default', { 
                month: 'long', 
                year: 'numeric' 
            })
        )
        
        if (month === 0) {
            month = 11
            year--
        } else {
            month--
        }
    }

    return monthYearRange
}

// Formatting and display utilities
export function formatLabel(key: string): string {
    return key in specialLabels 
        ? specialLabels[key]
        : key.split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
}

// Type guard for chart data processing
export function isNumericCategory(key: string, dataPoint: ChartDataPoint): key is keyof ChartDataPoint {
    return key !== 'period' && typeof (dataPoint as any)[key] === 'number'
}


// Expense calculations and formatting
export function calculateMonthlyTotalExpenses(expenses: Expense[], monthYear: string): string {
    const [monthName, year] = monthYear.split(' ')
    const month = new Date(Date.parse(monthName + " 1, " + year)).getMonth()
    const fullYear = parseInt(year)

    const totalExpenses = expenses
        .filter(expense => {
            const expenseDate = new Date(expense.date)
            return expenseDate.getMonth() === month && 
                   expenseDate.getFullYear() === fullYear
        })
        .reduce((sum, expense) => sum + expense.amount, 0)

    return Number.isInteger(totalExpenses)
        ? totalExpenses.toLocaleString('en-US')
        : totalExpenses.toLocaleString('en-US', { 
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })
}

/**
 * Formats expense amounts consistently.
 * Whole numbers: no decimal places
 * Decimals: exactly 2 decimal places
 */
export function formatExpenseAmount(amount: number) {
    return Number.isInteger(amount)
        ? amount.toLocaleString('en-US')
        : amount.toLocaleString('en-US', { 
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })
}

/**
 * Formats expense amounts in a compact way:
 * < 1000: Up to 4 decimal places, trimmed
 * >= 1000: Converted to K format (e.g., 1.5K)
 */
export function formatExpenseAmountShorter(amount: number) {
    if (amount < 1000) {
        return amount.toFixed(4)
            .slice(0, 6)
            .replace(/\.$/, '')
            .replace(/\.?0+$/, '')
    }
    
    const inK = amount / 1000
    return inK.toFixed(4)
        .slice(0, 5)
        .replace(/\.$/, '')
        .replace(/\.?0+$/, '') + 'K'
}


// Monthly analysis functions
/**
 * Finds the single highest expense for the specified month
 */
export function getMonthlyHighestExpense(expenses: Expense[], monthYear: string) {
    const [monthName, year] = monthYear.split(' ')
    const month = new Date(Date.parse(monthName + " 1, " + year)).getMonth()
    const fullYear = parseInt(year)

    const monthlyExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date)
        return expenseDate.getMonth() === month && 
               expenseDate.getFullYear() === fullYear
    })

    if (!monthlyExpenses.length) {
        return { amount: 0, name: 'No expenses this month' }
    }

    const highestExpense = monthlyExpenses.reduce((max, expense) => 
        expense.amount > max.amount ? expense : max
    )

    return { 
        amount: highestExpense.amount, 
        name: highestExpense.name 
    }
}

/**
 * Identifies the category with the highest total spending
 */
export function getMonthlyHighestSpentCategory(expenses: Expense[], monthYear: string) {
    const [monthName, year] = monthYear.split(' ')
    const month = new Date(Date.parse(monthName + " 1, " + year)).getMonth()
    const fullYear = parseInt(year)

    const monthlyExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date)
        return expenseDate.getMonth() === month && 
               expenseDate.getFullYear() === fullYear
    })

    if (!monthlyExpenses.length) {
        return { category: 'No expenses', total: 0 }
    }

    const categoryTotals = monthlyExpenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount
        return acc
    }, {} as Record<string, number>)

    return Object.entries(categoryTotals)
        .reduce((max, [category, total]) => 
            total > max.total ? { category, total } : max,
            { category: '', total: 0 }
        )
}

/**
 * Identifies the category with the lowest total spending
 * Only considers categories with positive expenses
 */
export function getMonthlyLeastSpentCategory(expenses: Expense[], monthYear: string) {
    const [monthName, year] = monthYear.split(' ')
    const month = new Date(Date.parse(monthName + " 1, " + year)).getMonth()
    const fullYear = parseInt(year)

    const monthlyExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date)
        return expenseDate.getMonth() === month && 
               expenseDate.getFullYear() === fullYear
    })

    if (!monthlyExpenses.length) {
        return { category: 'No expenses', total: 0 }
    }

    const categoryTotals = monthlyExpenses.reduce((acc, expense) => {
        if (expense.amount > 0) {
            acc[expense.category] = (acc[expense.category] || 0) + expense.amount
        }
        return acc
    }, {} as Record<string, number>)

    if (!Object.keys(categoryTotals).length) {
        return { category: 'No positive expenses', total: 0 }
    }

    return Object.entries(categoryTotals)
        .reduce((min, [category, total]) => 
            total < min.total ? { category, total } : min,
            { category: '', total: Infinity }
        )
}

/**
 * Creates a day-by-day expense summary for the month
 * Future dates are set to 0 expenses
 */
export function getCurrentMonthExpenses(expenses: Expense[], monthYear: string) {
    const [monthName, year] = monthYear.split(' ')
    const startOfMonth = dayjs(`${year}-${monthName}-01`).startOf('month')
    const endOfMonth = startOfMonth.endOf('month')
    const daysInMonth = startOfMonth.daysInMonth()
    const now = dayjs()

    const monthlyExpenses = expenses.filter(expense => {
        const expenseDate = dayjs(expense.date)
        return expenseDate.isAfter(startOfMonth.subtract(1, 'day')) && 
               expenseDate.isBefore(endOfMonth.add(1, 'day'))
    })

    const expenseMap = monthlyExpenses.reduce((acc, expense) => {
        const dateString = dayjs(expense.date).format('YYYY-MM-DD')
        acc.set(dateString, (acc.get(dateString) || 0) + expense.amount)
        return acc
    }, new Map<string, number>())

    return Array.from({ length: daysInMonth }, (_, index) => {
        const date = startOfMonth.add(index, 'day')
        const dateString = date.format('YYYY-MM-DD')
        const amount = date.isAfter(now) ? 0 : (expenseMap.get(dateString) || 0)

        return {
            date: dateString,
            expenses: Number(amount.toFixed(2))
        }
    })
}

/**
 * Returns the 7 most recent expenses, sorted by date
 */
export function getLatestExpenses(expenses: Expense[]) {
    return [...expenses]
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .slice(0, 7)
}

export function keyState( currentState: number, num: string, str: string, prevNum: string, prevStr: string) {
    if (num !== prevNum && str === prevStr) {
      return Math.random();
    }
    
    return currentState;
}
  