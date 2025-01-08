import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface CopyButtonProps {
  text: string;
  label?: string;
}

export const CopyButton = ({ text, label = "Copy" }: CopyButtonProps) => {
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "Text copied to clipboard",
        duration: 2000,
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleCopy}
      className="h-8 px-2 lg:px-3"
    >
      <Copy className="h-4 w-4" />
      <span className="sr-only">{label}</span>
    </Button>
  );
};