import { CheckCheck } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type Props = {
  successDescription: string;
};

export function MySuccessAlert({ successDescription }: Props) {
  return (
    <Alert>
      <CheckCheck className="h-4 w-4" />
      <AlertTitle>Успешно</AlertTitle>
      <AlertDescription>{successDescription}</AlertDescription>
    </Alert>
  );
}
