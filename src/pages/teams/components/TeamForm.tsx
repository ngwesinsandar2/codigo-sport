import FormInput from "@/components/shared/form/FormInput";
import { ValidationTexts } from "@/constants/validation-texts";

export interface ITeamForm {
  teamName: string;
  playerCount: string;
  region: string;
  country: string;
}

export default function TeamForm() {
  return (
    <div className="grid grid-cols-1 gap-4 mb-6">
      <FormInput
        fieldName="teamName"
        label="Team Name"
        validation={{
          required: ValidationTexts.Required
        }}
      />
      <FormInput
        fieldName="playerCount"
        label="Player Count"
        validation={{
          required: ValidationTexts.Required,
          pattern: {
            value: /^\d+$/,
            message: ValidationTexts.NumberOnly
          }
        }}
      />
      <FormInput
        fieldName="region"
        label="Region"
        validation={{
          required: ValidationTexts.Required
        }}
      />
      <FormInput
        fieldName="country"
        label="Country"
        validation={{
          required: ValidationTexts.Required
        }}
      />
    </div>
  );
}
