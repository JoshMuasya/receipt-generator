"use client"

import React from 'react'
import ReceiptForm from './ReceiptForm'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const Receipt = () => {
  return (
    <div className='background flex flex-col justify-center align-middle items-center py-5'>
      <Card className='bg-white/30 backdrop-blur-md shadow-[0px_6px_6px_#36357b] rounded-lg w-2/3'>
        <CardHeader>
          <CardTitle>Receipt Generator</CardTitle>
          <CardDescription>Fill in the following to generate a receipt</CardDescription>
        </CardHeader>
        <CardContent>
          <ReceiptForm />
        </CardContent>
      </Card>
    </div>
  )
}

export default Receipt
