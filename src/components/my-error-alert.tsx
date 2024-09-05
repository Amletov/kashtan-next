import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type Props = {
  errorDescription: string;
};

export function MyError({ errorDescription }: Props) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Ошибка</AlertTitle>
      <AlertDescription>{errorDescription}</AlertDescription>
    </Alert>
  );
}
