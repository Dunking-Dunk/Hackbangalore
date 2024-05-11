// @ts-nocheck
"use client"

import React, { useState } from 'react'

import { FormControl, FormField, FormLabel, FormMessage, FormItem,Form } from './ui/form'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import CustomInput from '@/components/CustomInput';
import {  loanFormSchema } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { uploadToFirebase } from '@/lib/firebaseStorage'
import { createLoan } from '@/lib/actions'

const LoanForm = () => {
    const [loading, setLoading ] = useState(false)
    const {toast} = useToast()
    const router = useRouter()
    const formSchema = loanFormSchema()
    const [files, setFiles] = useState({
        quotation: '',
        bankStatement: '',
        balanceSheet:'',
      ITR: '',
      udayam: '',
      cashFlow: ''
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            pan: '',
    bankName: '',
    accountNumber: '',
    reason: '',
    loanAmount: 0
        }
      })   

    const onFileChange = async(e:any, dataType:String) => {
        setFiles((state) => ({...state, [dataType]: e.target.files[0]})) 
    }

    const onSubmit = async(data: z.infer<typeof formSchema>) => {
        setLoading(true)
        const downloadUrl = {}

       for (var i in files) {
        if (files[i] && files[i] !== '') {
            const res = await uploadToFirebase(files[i], files[i].name, (e) => {
                console.log(e)
            })
            downloadUrl[i] = res.downloadUrl
        }
       } 
      
       const final = {
        ...downloadUrl,
        ...data
       }
       const sme = await createLoan(final)
       setLoading(false)
       router.push('/dashboard/loan')
    }

    return (
       <div className='w-full h-full'>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <CustomInput control={form.control} name='pan' label="PAN" placeholder='Enter your PAN Card Number' />
                <CustomInput control={form.control} name='bankName' label="Bank Name" placeholder='Enter your Bank Name' />
                <CustomInput control={form.control} name='accountNumber' label="Account Number" placeholder='Enter your Account Card Number' />
                <CustomInput control={form.control} name='reason' label="Reason For Loan" placeholder='Write Reason for loan' /> 
                 <FormField
                    control={form.control}
                    name="loanAmount"
                    render={({ field }) => (
                        <FormItem className='w-3/6'>
                            <FormLabel>Loan Amount</FormLabel>
                            <FormControl>
                                <Input placeholder="loanAmount" {...field} onChange={event => field.onChange(event.target.valueAsNumber)} value={field.value} type="number" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='w-3/6'>
                    <FormLabel>Product Quotation</FormLabel>
                    <Input placeholder="Image" onChange={(e) => onFileChange(e, 'quotation')} type="file" />
                </div>
                <div className='w-3/6'>
                    <FormLabel>Bank Statement</FormLabel>
                    <Input placeholder="Bank Statement" onChange={(e) => onFileChange(e, 'bankStatement')} type="file" />
                </div>
                <div className='w-3/6'>
                    <FormLabel>Bank BalanceSheet</FormLabel>
                    <Input placeholder="BalanceSheet" onChange={(e) => onFileChange(e, 'balanceSheet')} type="file" />
                </div>
                <div className='w-3/6'>
                    <FormLabel>ITR</FormLabel>
                    <Input placeholder="ITR" onChange={(e) => onFileChange(e, 'ITR')} type="file" />
                </div>
                <div className='w-3/6'>
                    <FormLabel>Udayam Certificate</FormLabel>
                    <Input placeholder="udayam" onChange={(e) => onFileChange(e, 'udayam')} type="file" />
                </div>
                <div className='w-3/6'>
                    <FormLabel>CashFlow Statement</FormLabel>
                    <Input placeholder="CashFlow" onChange={(e) => onFileChange(e, 'cashFlow')} type="file" />
                </div>
                <Button type="submit" disabled={loading} className="form-btn">
                  {loading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading...
                    </>
                  ) : 'Submit'}
                </Button>
            </form>
        </Form>
       </div>
    )
}  

export default LoanForm