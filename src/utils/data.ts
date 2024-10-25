/* Currency symbols mapped to their respective currency codes */
export const currencies = {
    USD: '$',     // United States
    EUR: '€',     // European Union
    JPY: '¥',     // Japan
    GBP: '£',     // United Kingdom
    CNY: '¥',     // China
    CAD: 'C$',    // Canada
    AUD: 'A$',    // Australia
    CHF: 'Fr',    // Switzerland
    HKD: 'HK$',   // Hong Kong
    MXN: '$',     // Mexico
    BRL: 'R$',    // Brazil
    RUB: '₽',     // Russia
    INR: '₹',     // India
    ZAR: 'R',     // South Africa
    PKR: '₨',     // Pakistan
    SGD: 'S$',    // Singapore
} as const

/* Expense categories supported by the application */
export const categories = [
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
] as const

/* Color scheme for expense categories */
export const categoryColors = {
    housing: '#ADD8E6',              // Light Blue - calm, stable
    transportation: '#90EE90',       // Light Green - movement
    food_dining: '#FFA500',          // Orange - warm, appetizing
    healthcare: '#FF6347',           // Tomato Red - urgent, medical
    personal_care: '#FFC0CB',        // Pink - personal, gentle
    education: '#DDA0DD',            // Plum - learning, growth
    entertainment_leisure: '#FFFF00', // Yellow - fun, leisure
    technology: '#C0C0C0',           // Silver - modern, tech
    savings_investments: '#FFD700',   // Gold - value, prosperity
    debt_repayment: '#00008B',       // Dark Blue - serious
    gifts_donation: '#008080',       // Teal - giving, balance
} as const