import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatSOL(amount) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(amount)
}

export function formatUSD(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function truncateAddress(address, chars = 4) {
  if (!address) return ''
  return `${address.slice(0, chars)}...${address.slice(-chars)}`
}

export function calculateInterest(principal, rate, months) {
  const monthlyRate = rate / 12 / 100
  const interest = principal * monthlyRate * months
  return interest
}

export function calculateMonthlyPayment(principal, rate, months) {
  const monthlyRate = rate / 12 / 100
  if (monthlyRate === 0) return principal / months
  
  const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                  (Math.pow(1 + monthlyRate, months) - 1)
  return payment
}
