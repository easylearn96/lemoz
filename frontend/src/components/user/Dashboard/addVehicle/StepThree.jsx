import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function StepThree({ onSubmit, defaultValues }) {
  const { register, handleSubmit } = useForm({
    defaultValues: defaultValues
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Vehicle Location</h2>
      <div className="space-y-2">
        <Label>Address</Label>
        <Input {...register('address')} placeholder="Enter full address" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Latitude</Label>
          <Input {...register('latitude')} placeholder="Latitude" />
        </div>
        <div className="space-y-2">
          <Label>Longitude</Label>
          <Input {...register('longitude')} placeholder="Longitude" />
        </div>
      </div>
      <button type="submit" className="hidden">Submit</button>
    </form>
  );
}
