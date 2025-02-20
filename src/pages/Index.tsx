import { useState, useEffect } from "react";
import { TokenInput } from "@/components/JWTDecoder/TokenInput";
import { KeyInput } from "@/components/JWTDecoder/KeyInput";
import { DecodedSection } from "@/components/JWTDecoder/DecodedSection";
import { decodeToken, verifyToken, type DecodedJWT } from "@/lib/jwt";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, XCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [token, setToken] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [decodedToken, setDecodedToken] = useState<DecodedJWT>({
    header: null,
    payload: null,
    isValid: false,
  });
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  useEffect(() => {
    const updateToken = async () => {
      if (token) {
        const decoded = await decodeToken(token);
        setDecodedToken(decoded);

        if ((secretKey || publicKey) && decoded.isValid) {
          const verified = await verifyToken(token, secretKey || publicKey);
          setIsVerified(verified);
        } else {
          setIsVerified(null);
        }
      } else {
        setDecodedToken({ header: null, payload: null, isValid: false });
        setIsVerified(null);
      }
    };

    updateToken();
  }, [token, secretKey, publicKey]);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center mb-8">JWT Decoder</h1>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <TokenInput token={token} onChange={setToken} />
            
            <Tabs defaultValue="secret" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="secret">Secret Key</TabsTrigger>
                <TabsTrigger value="public">Public Key</TabsTrigger>
              </TabsList>
              <TabsContent value="secret">
                <KeyInput
                  value={secretKey}
                  onChange={setSecretKey}
                  label="Secret Key"
                  placeholder="Enter secret key to verify signature..."
                />
              </TabsContent>
              <TabsContent value="public">
                <KeyInput
                  value={publicKey}
                  onChange={setPublicKey}
                  label="Public Key"
                  placeholder="Enter public key to verify signature..."
                />
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            {decodedToken.error ? (
              <Alert variant="destructive">
                <AlertDescription>{decodedToken.error}</AlertDescription>
              </Alert>
            ) : null}

            {isVerified !== null && (
              <Alert variant={isVerified ? "default" : "destructive"}>
                <div className="flex items-center gap-2">
                  {isVerified ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <AlertDescription>
                    {isVerified
                      ? "Signature verified successfully"
                      : "Invalid signature"}
                  </AlertDescription>
                </div>
              </Alert>
            )}

            {decodedToken.header && (
              <DecodedSection title="Header" data={decodedToken.header} />
            )}
            {decodedToken.payload && (
              <DecodedSection title="Payload" data={decodedToken.payload} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;