import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {z} from 'zod'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const authFormSchema = (type: string) => z.object({
  // sign up
  firstName: type === 'sign-in' ? z.string().optional() : z.string().min(3),
  lastName: type === 'sign-in' ? z.string().optional() : z.string().min(3),
  address1: type === 'sign-in' ? z.string().optional() : z.string().max(50),
  city: type === 'sign-in' ? z.string().optional() : z.string().max(50),
  state: type === 'sign-in' ? z.string().optional() : z.string().min(2).max(2),
  postalCode: type === 'sign-in' ? z.string().optional() : z.string().min(3).max(6),
  dateOfBirth: type === 'sign-in' ? z.string().optional() : z.string().min(3),
  ssn: type === 'sign-in' ? z.string().optional() : z.string().min(3),
  buisnessName: type === 'sign-in' ? z.string().optional() :z.string().min(3),
  buisnessEmail: type === 'sign-in' ? z.string().optional() :z.string().email(),
  buisnessAddress: type === 'sign-in' ? z.string().optional() :z.string().min(10),
  // both
  email: z.string().email(),
  password: z.string().min(8),
})

export const loanFormSchema = () => z.object({
    pan: z.string().min(10),
    bankName: z.string().min(2),
    accountNumber: z.string().min(3),
    reason: z.string().min(10),
    loanAmount: z.number(),
})