import React, { useEffect } from 'react'
import { Button } from './ui/button'
import { useCreateCheckoutSessionMutation } from '@/features/api/purchaseApi'
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const BuyCourseButton = ({ courseId }) => {
  const [createCheckoutSession, { data, isSuccess, isError, error, isLoading }] = useCreateCheckoutSessionMutation();
  const purchaseCourseHandler = async () => {
    await createCheckoutSession(courseId)
  }
  useEffect(() => {
    if (isSuccess) {
      if (data?.url) {
        window.location.href = data.url   // Redirect to stripe checkout session
      }
      else {
        toast.error("Invalid response from server");
      }
    }
    if (isError) {
      toast.error(error?.data?.message || "Failed to create checkout");
    }
  }, [data, isSuccess, isError, error])
  return (
    <Button disabled={isLoading} onClick={purchaseCourseHandler} className='w-full'>
      {
        isLoading ? (
          <>
            <Loader2 className='h-4 w-4 animate-spin mr-2' /> Please Wait
          </>
        ) : "Purchase Course"
      }
    </Button>
  )
}

export default BuyCourseButton