import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function StepOne({ onSubmit, defaultValues }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: defaultValues
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Vehicle Details</h2>
      <div className="space-y-2">
        <Label>Vehicle Name</Label>
        <Input {...register('name', { required: 'Required' })} placeholder="Enter vehicle name" />
        {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
      </div>
      <div className="space-y-2">
        <Label>Brand</Label>
        <Input {...register('brand', { required: 'Required' })} placeholder="Enter brand" />
        {errors.brand && <p className="text-red-500 text-xs">{errors.brand.message}</p>}
      </div>
      <button type="submit" className="hidden">Submit</button>
    </form>
  );
}
