import { Action, ReducerState } from "@/utils/types"

const PAGE_SIZE = 9

// Helper function to calculate min/max amounts from expenses
const getAmountRange = (expenses: Array<any>): [number, number] => {
    const amounts = expenses.map(expense => expense.amount);
    return [Math.min(...amounts), Math.max(...amounts)];
};

export function reducer(state: ReducerState, action: Action): ReducerState {
    switch(action.type) {
        case 'pageChange': {
            return {
                ...state,
                currentPage: action.payload
            }
        }
        case 'sort': {
            const { sortBy, direction } = action.payload
            const sortedExpenses = [...state.filteredExpenseList].sort((a, b) => {
                if (sortBy === 'Date') {
                    const dateA = new Date(a.date).getTime()
                    const dateB = new Date(b.date).getTime()
                    return direction === 'Ascending' ? dateA - dateB : dateB - dateA
                }
                return direction === 'Ascending' ? a.amount - b.amount : b.amount - a.amount
            })
           
            return {
                ...state,
                filteredExpenseList: sortedExpenses,
                sortBy,
                sortDirection: direction,
                totalPages: Math.ceil(sortedExpenses.length / PAGE_SIZE)
            }
        }
        case 'filter': {
            const { categories, amountRange, dateRange } = action.payload
            const filteredExpenses = state.originalExpenseList.filter(expense => {
                const categoryMatch = categories.includes(expense.category)
                const amountMatch = expense.amount >= amountRange[0] &&
                                  expense.amount <= amountRange[1]
                const dateMatch = (!dateRange.from || new Date(expense.date) >= new Date(dateRange.from)) &&
                                (!dateRange.to || new Date(expense.date) <= new Date(dateRange.to))
               
                return categoryMatch && amountMatch && dateMatch
            })

            // Calculate new amount range from filtered expenses
            const [minAmount, maxAmount] = getAmountRange(filteredExpenses);

            return {
                ...state,
                filteredExpenseList: filteredExpenses,
                filters: { 
                    categories, 
                    amountRange: [minAmount, maxAmount], // Update with new range
                    dateRange 
                },
                currentPage: 1,
                totalPages: Math.ceil(filteredExpenses.length / PAGE_SIZE)
            }
        }
        case 'resetFilters': {
            const resetFilteredExpenses = [...state.originalExpenseList].sort((a, b) => {
                if (state.sortBy === 'Date') {
                    const dateA = new Date(a.date).getTime()
                    const dateB = new Date(b.date).getTime()
                    return state.sortDirection === 'Ascending' ? dateA - dateB : dateB - dateA
                }
                return state.sortDirection === 'Ascending' ?
                       a.amount - b.amount :
                       b.amount - a.amount
            })

            // Calculate amount range from original expenses
            const [minAmount, maxAmount] = getAmountRange(state.originalExpenseList);
   
            return {
                ...state,
                filteredExpenseList: resetFilteredExpenses,
                filters: {
                    categories: [
                        'Housing',
                        'Transportation',
                        'Food & Dining',
                        'Healthcare',
                        'Personal Care',
                        'Education',
                        'Entertainment & Leisure',
                        'Technology',
                        'Savings & Investments',
                        'Debt Repayment',
                        'Gifts & Donations'
                    ],
                    amountRange: [minAmount, maxAmount], // Use calculated range from original list
                    dateRange: { from: undefined, to: undefined }
                },
                currentPage: 1,
                totalPages: Math.ceil(resetFilteredExpenses.length / PAGE_SIZE)
            }
        }
        default:
            return state
    }
}