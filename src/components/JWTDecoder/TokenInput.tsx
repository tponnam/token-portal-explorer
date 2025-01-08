import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CopyButton } from "./CopyButton";

interface TokenInputProps {
  token: string;
  onChange: (value: string) => void;
}

export const TokenInput = ({ token, onChange }: TokenInputProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="token">JWT Token</Label>
        <CopyButton text={token} label="Copy token" />
      </div>
      <Textarea
        id="token"
        placeholder="Paste your JWT token here..."
        value={token}
        onChange={(e) => onChange(e.target.value)}
        className="font-mono min-h-[100px] resize-none"
      />
    </div>
  );
};