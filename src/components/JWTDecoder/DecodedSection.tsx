import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { CopyButton } from "./CopyButton";

interface DecodedSectionProps {
  title: string;
  data: any;
}

export const DecodedSection = ({ title, data }: DecodedSectionProps) => {
  const jsonString = JSON.stringify(data, null, 2);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <CopyButton text={jsonString} label={`Copy ${title.toLowerCase()}`} />
      </CardHeader>
      <CardContent className="pt-0">
        <div className="rounded-md overflow-hidden">
          <SyntaxHighlighter
            language="json"
            style={vs2015}
            customStyle={{
              margin: 0,
              fontSize: "0.9rem",
              backgroundColor: "transparent",
            }}
          >
            {jsonString}
          </SyntaxHighlighter>
        </div>
      </CardContent>
    </Card>
  );
};