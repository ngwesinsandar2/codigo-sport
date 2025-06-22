interface IFormErrorProps {
  message: string;
}

export default function FormError({ message }: IFormErrorProps) {
  return <p className="text-xs text-red-500">{message}</p>;
}
