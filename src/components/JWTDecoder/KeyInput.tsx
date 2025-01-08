import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface KeyInputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder: string;
}

export const KeyInput = ({ value, onChange, label, placeholder }: KeyInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={label.toLowerCase()}>{label}</Label>
      <Textarea
        id={label.toLowerCase()}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="font-mono min-h-[100px] resize-none"
      />
    </div>
  );
};