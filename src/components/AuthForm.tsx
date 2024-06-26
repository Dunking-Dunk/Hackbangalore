'use client';

import Link from 'next/link'
import React, { useState } from 'react'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

import {
  Form
} from "@/components/ui/form"
import CustomInput from './CustomInput';
import { authFormSchema } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from 'axios'
import { signIn } from 'next-auth/react';
import CodatSetup from '@/components/CodatSetup'
import { createCompany } from '@/lib/bankAction';
import {
  ConnectionCallbackArgs,
  ErrorCallbackArgs,
} from "@codat/sdk-link-types"
import { CodatLink } from "@/components/CodatLink";

const AuthForm = ({ type }: { type: string }) => {
  const {toast} = useToast()
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [companyId, setCompanyId] = useState(''); //provide company ID
  const [modalOpen, setModalOpen] = useState(true);

  const formSchema = authFormSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ''
    },
  })

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      // Sign up with Appwrite & create plaid token

      if (type === 'sign-up') {
        const userData = {
          firstName: data.firstName!,
          lastName: data.lastName!,
          address1: data.address1!,
          city: data.city!,
          state: data.state!,
          postalCode: data.postalCode!,
          dateOfBirth: data.dateOfBirth!,
          ssn: data.ssn!,
          email: data.email,
          password: data.password,
        }

        const buisnessData:any = {
          name: data.buisnessName,
          address: data.buisnessAddress,
          email: data.buisnessEmail
        }
        const companyRes:any = await createCompany(buisnessData.name)
        const parse = JSON.parse(companyRes)
        setCompanyId(parse?.id)
        buisnessData.companyConnect = companyId
        const res = await axios.post('/api/register', {userData, buisnessData})
        setUser(res.data);
      }

      if (type === 'sign-in') {
        const login = await signIn("credentials", {
          email: data.email, password: data.password, redirect: false
        })
      
        if (login?.ok) {
            toast({
              title: "Succesefully Logged In",
            })
            router.refresh()
          }
        else {
          toast({
            title: "Something went Wrong",
            description: login?.error,
          })
        }

      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: 'went wrong',
      })
    } finally {
      setIsLoading(false);
    }
  }

  const onConnection = (connection: ConnectionCallbackArgs) =>
    alert(`On connection callback - ${connection.connectionId}`);
const onClose = () => setModalOpen(false);
const onFinish = () => {
    console.log('completed')
    router.push('sign-in')
}  
const onError = (error: ErrorCallbackArgs) =>
  alert(`On error callback - ${error.message}`);


  return (
    <section className="flex mt-28 mb-10 w-full max-w-[500px] flex-col justify-center gap-5 md:gap-8">
      <header className='flex flex-col gap-5 md:gap-8'>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-2xl lg:text-4xl font-semibold">
            {user
              ? 'Link Account'
              : type === 'sign-in'
                ? 'Sign In'
                : 'Sign Up'
            }
            <p className="text-lg font-normal opacity-70">
              {user
                ? 'Link your account to get started'
                : 'Please enter your details'
              }
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
               <div className={' w-44 h-full z-50'}>
                    <CodatLink
                        companyId={companyId}
                        onConnection={onConnection}
                        onError={onError}
                        onClose={onClose}
                        onFinish={onFinish}
                    />
                </div>
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === 'sign-up' && (
                <>
                  <div className="flex gap-4">
                    <CustomInput control={form.control} name='firstName' label="First Name" placeholder='Enter your first name' />
                    <CustomInput control={form.control} name='lastName' label="Last Name" placeholder='Enter your first name' />
                  </div>
                  <CustomInput control={form.control} name='address1' label="Address" placeholder='Enter your specific address' />
                  <CustomInput control={form.control} name='city' label="City" placeholder='Enter your city' />
                  <div className="flex gap-4">
                    <CustomInput control={form.control} name='state' label="State" placeholder='Example: NY' />
                    <CustomInput control={form.control} name='postalCode' label="Postal Code" placeholder='Example: 11101' />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput control={form.control} name='dateOfBirth' label="Date of Birth" placeholder='YYYY-MM-DD' />
                    <CustomInput control={form.control} name='ssn' label="SSN" placeholder='Example: 1234' />
                  </div>
                  <CustomInput control={form.control} name='buisnessName' label="Company Name" placeholder='Enter your Buisness Name' />
                  <CustomInput control={form.control} name='buisnessEmail' label="Company Email" placeholder='Enter your Buisness Email' />
                  <CustomInput control={form.control} name='buisnessAddress' label="Company Address" placeholder='Enter your specific Buisness address' />
                </>
              )}

              <CustomInput control={form.control} name='email' label="Email" placeholder='Enter your email' />

              <CustomInput control={form.control} name='password' label="Password" placeholder='Enter your password' />

              <div className="flex flex-col gap-4">
                <Button type="submit" disabled={isLoading} className="form-btn">
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading...
                    </>
                  ) : type === 'sign-in'
                    ? 'Sign In' : 'Sign Up'}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === 'sign-in'
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className="form-link">
              {type === 'sign-in' ? 'Sign up' : 'Sign in'}
            </Link>
          </footer>
        </>
      )}
    </section>
  )
}

export default AuthForm