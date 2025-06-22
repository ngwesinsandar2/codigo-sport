import { Checkbox } from '@/components/ui/checkbox';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import FormLabel from '../FormLabel';
import { CheckedState } from '@radix-ui/react-checkbox';
import { cn } from '@/lib/utils';
import FormCheckboxLoading from './FormCheckboxLoading';

interface IFormCheckboxProps {
  name: string;
  label?: string;
  validation?: RegisterOptions;
  onChange?: ((checked: CheckedState) => void) | undefined;
  containerClassName?: string;
  checkboxClassName?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
}

export default function FormCheckbox({
  name,
  label,
  validation,
  containerClassName,
  checkboxClassName,
  isLoading = false,
  ...props
}: IFormCheckboxProps) {
  const formMethods = useFormContext();

  return (
    <>
      {isLoading ? (
        <FormCheckboxLoading />
      ) : (
        <Controller
          name={name}
          control={formMethods.control}
          rules={validation}
          render={({ field }) => (
            <div className={cn('flex items-center gap-1 cursor-pointer', containerClassName)}>
              <Checkbox
                checked={!!field.value}
                onCheckedChange={
                  props.onChange ? props.onChange : field.onChange
                }
                id={name}
                className={cn('cursor-pointer', checkboxClassName)}
                disabled={props.isDisabled}
              />
              {label && (
                <FormLabel
                  label={label}
                  showAsterisk={!!validation?.required}
                  id={name}
                  containerClassName='mb-0'
                  labelClassName='cursor-pointer'
                />
              )}
            </div>
          )}
        />
      )}
    </>
  );
}
