"use client"

import React from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from './ui/textarea'
import generatePDF from './GeneratePDF'

const formSchema = z.object({
  referenceno: z.string().min(2),
  clientname: z.string().min(2).max(50),
  date: z.string().min(1, "Date is required"),
  reason: z.string().min(2),
  amount: z.number(),
  amountinwords: z.string(),
  modeofpayment: z.string(),
  receivedby: z.string(),
  logoUrl: z.string().optional()
})

const ReceiptForm = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      referenceno: "",
      clientname: "",
      date: "",
      reason: "",
      amount: 0,
      amountinwords: "",
      modeofpayment: "",
      receivedby: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    generatePDF({
      ...values,
      logoUrl: "/Logo.png"  // Path relative to public directory
    });
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Reference Number */}
          <FormField
            control={form.control}
            name="referenceno"
            render={({ field }) => (
              <FormItem>
                <FormLabel>File Reference No.</FormLabel>
                <FormControl>
                  <Input placeholder="Enter reference number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Client Name */}
          <FormField
            control={form.control}
            name="clientname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Received From</FormLabel>
                <FormControl>
                  <Input placeholder="Enter client name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    value={field.value ? new Date(field.value).toISOString().split("T")[0] : ""}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          {/* Reason */}
          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Being Payment For</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter reason for payment" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Amount */}
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Amount in Words */}
          <FormField
            control={form.control}
            name="amountinwords"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount in Words</FormLabel>
                <FormControl>
                  <Input placeholder="Enter amount in words" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Mode of Payment */}
          <FormField
            control={form.control}
            name="modeofpayment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mode of Payment</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="cheque">Cheque</SelectItem>
                      <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Received By */}
          <FormField
            control={form.control}
            name="receivedby"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Received By</FormLabel>
                <FormControl>
                  <Input placeholder="Enter receiver's name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit">Generate Receipt</Button>
        </form>
      </Form>
    </div>
  )
}

export default ReceiptForm
