/* Currency symbols mapped to their respective currency codes */
export const currencies = {
    AED: 'AED',   // United Arab Emirates (commonly shown as AED or DH)
    AUD: 'A$',    // Australia
    BRL: 'R$',    // Brazil
    CAD: 'C$',    // Canada
    CHF: 'Fr',    // Switzerland
    CNY: '¥',     // China
    EUR: '€',     // European Union
    GBP: '£',     // United Kingdom
    HKD: 'HK$',   // Hong Kong
    INR: '₹',     // India
    JPY: '¥',     // Japan
    MXN: '$',     // Mexico
    PKR: '₨',     // Pakistan
    RUB: '₽',     // Russia
    SAR: 'SAR',   // Saudi Arabia (commonly shown as SAR or SR)
    SGD: 'S$',    // Singapore
    USD: '$',     // United States
    ZAR: 'R',     // South Africa
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
]

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