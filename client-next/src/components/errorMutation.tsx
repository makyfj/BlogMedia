interface ErrorMutationProps {
  errorMutation: string | null;
}

const ErrorMutation = ({ errorMutation }: ErrorMutationProps) => {
  return (
    <div className="flex justify-center pt-4">
      <p className="p-3 font-bold text-red-700 dark:text-red-600 bg-red-100 rounded">
        {errorMutation}
      </p>
    </div>
  );
};

export default ErrorMutation;
