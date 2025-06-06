import React from 'react'
import {
  FormField as UiFormField, 
  FormItem, 
  FormControl, 
  FormLabel, 
  FormDescription, 
  FormMessage
} from "@/components/ui/form"
import { Input } from './ui/input';
import { Control, FieldValues, Path } from 'react-hook-form';

interface CustomFormFieldProps<TFieldValues extends FieldValues = FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>; 
  label: string;
  placeholder?: string;
  type?: string;
}

function FormField<TFieldValues extends FieldValues>(
  { control, name, label, placeholder, type = 'text' }: CustomFormFieldProps<TFieldValues>
) {
  return (
    <UiFormField 
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} placeholder={placeholder} type={type} />
          </FormControl>
          <FormDescription />
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormField