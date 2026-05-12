import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function StepTwo({ onSubmit, defaultValues }) {
  const { register, handleSubmit } = useForm({
    defaultValues: defaultValues
  });

  const handleFileChange = (e) => {
    // This is handled in AddVehicleForm via requestSubmit
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Vehicle Photos</h2>
      <div className="space-y-2">
        <Label>Upload Images</Label>
        <Input 
          type="file" 
          multiple 
          {...register('image_urls')} 
          className="bg-zinc-800 border-zinc-700"
        />
      </div>
      <button type="submit" className="hidden">Submit</button>
    </form>
  );
}
