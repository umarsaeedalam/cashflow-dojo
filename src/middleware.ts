import { auth } from '@/lib/auth'

// Main authentication middleware
export const middleware = auth;

// Define routes that require authentication
export const config = {
    matcher: ['/dashboard']
}