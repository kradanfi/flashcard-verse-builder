import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, Send, Loader2, Eye, EyeOff } from "lucide-react";
import FlashcardDisplay from "@/components/FlashcardDisplay";

interface Vocabulary {
  word: string;
  translation: string;
  remembered?: boolean;
  difficulty?: 'easy' | 'medium' | 'hard';
}

const Index = () => {
  const [topic, setTopic] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>([]);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!topic.trim()) {
      toast({
        title: "ข้อผิดพลาด",
        description: "กรุณาใส่หัวข้อคำศัพท์",
        variant: "destructive",
      });
      return;
    }

    if (!webhookUrl.trim()) {
      toast({
        title: "ข้อผิดพลาด", 
        description: "กรุณาใส่ Webhook URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    console.log("Sending request to webhook:", webhookUrl, "with topic:", topic);

    try {
      const requestBody: any = {
        topic: topic,
        timestamp: new Date().toISOString(),
        triggered_from: window.location.origin,
      };

      if (secretKey.trim()) {
        requestBody.secretKey = secretKey;
      }

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors", // เพิ่มเพื่อจัดการ CORS
        body: JSON.stringify(requestBody),
      });

      // เนื่องจากใช้ no-cors จะไม่สามารถอ่าน response ได้
      // ดังนั้นจะแสดงข้อความแจ้งเตือนแทน
      toast({
        title: "ส่งคำขอแล้ว",
        description: "คำขอถูกส่งไปยัง webhook แล้ว กรุณาตรวจสอบการตอบกลับจาก webhook ของคุณ",
      });

      // สำหรับ demo purposes - ใส่ข้อมูลตัวอย่าง
      const sampleVocabularies = [
        { word: "Hello", translation: "สวัสดี", remembered: false, difficulty: 'medium' as const },
        { word: "Goodbye", translation: "ลาก่อน", remembered: false, difficulty: 'medium' as const },
        { word: "Thank you", translation: "ขอบคุณ", remembered: false, difficulty: 'medium' as const },
      ];
      
      setVocabularies(sampleVocabularies);
      
    } catch (error) {
      console.error("Error calling webhook:", error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถเรียก webhook ได้ กรุณาตรวจสอบ URL และลองใหม่",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateVocabulary = (index: number, updates: Partial<Vocabulary>) => {
    setVocabularies(prev => prev.map((vocab, i) => 
      i === index ? { ...vocab, ...updates } : vocab
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-indigo-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Flashcard Generator
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            ป้อนหัวข้อคำศัพท์ที่ต้องการเรียนรู้ แล้วระบบจะสร้าง flashcard ให้คุณ
          </p>
        </div>

        {/* Input Form */}
        <Card className="max-w-2xl mx-auto mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800">สร้าง Flashcard</CardTitle>
            <CardDescription>
              ใส่หัวข้อคำศัพท์และ webhook URL เพื่อสร้าง flashcard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="topic" className="text-sm font-medium text-gray-700">
                  หัวข้อคำศัพท์
                </Label>
                <Input
                  id="topic"
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="เช่น Animals, Food, Colors"
                  className="h-12 text-lg"
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="webhook" className="text-sm font-medium text-gray-700">
                  Webhook URL
                </Label>
                <Input
                  id="webhook"
                  type="url"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  placeholder="https://your-webhook-url.com/endpoint"
                  className="h-12"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="secretKey" className="text-sm font-medium text-gray-700">
                  Secret Key (ถ้ามี)
                </Label>
                <div className="relative">
                  <Input
                    id="secretKey"
                    type={showSecretKey ? "text" : "password"}
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)}
                    placeholder="ใส่ secret key ของคุณ"
                    className="h-12 pr-12"
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                    onClick={() => setShowSecretKey(!showSecretKey)}
                  >
                    {showSecretKey ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    กำลังสร้าง Flashcard...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    สร้าง Flashcard
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results Section */}
        {vocabularies.length > 0 && (
          <>
            <Separator className="my-8" />
            <FlashcardDisplay 
              vocabularies={vocabularies} 
              topic={topic} 
              onUpdateVocabulary={updateVocabulary}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
