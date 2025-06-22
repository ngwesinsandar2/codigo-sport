import { forwardRef } from 'react';
import { Input } from '../../ui/input';

interface IInputPrefixProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export default forwardRef<HTMLInputElement, IInputPrefixProps>(
  function InputPrefix({ leftElement, rightElement, ...formInputProps }, ref) {
    return (
      <div className="relative">
        {leftElement && (
          <div className="absolute top-1/2 -translate-y-1/2 left-3">
            {leftElement}
          </div>
        )}
        <Input
          type="text"
          ref={ref}
          {...formInputProps}
        />
        {rightElement && (
          <div className="absolute top-1/2 -translate-y-1/2 right-2">
            {rightElement}
          </div>
        )}
      </div>
    );
  }
);
