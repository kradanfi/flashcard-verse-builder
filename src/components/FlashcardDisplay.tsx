
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

interface Vocabulary {
  word: string;
  translation: string;
}

interface FlashcardDisplayProps {
  vocabularies: Vocabulary[];
  topic: string;
}

const FlashcardDisplay: React.FC<FlashcardDisplayProps> = ({ vocabularies, topic }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % vocabularies.length);
    setIsFlipped(false);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + vocabularies.length) % vocabularies.length);
    setIsFlipped(false);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const currentVocab = vocabularies[currentIndex];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Flashcard: {topic}
        </h2>
        <p className="text-gray-600">
          {currentIndex + 1} จาก {vocabularies.length} คำ
        </p>
      </div>

      {/* Flashcard */}
      <div className="flex justify-center mb-8">
        <div 
          className="relative w-96 h-64 cursor-pointer perspective-1000"
          onClick={handleFlip}
        >
          <div className={`relative w-full h-full transform-style-preserve-3d transition-transform duration-700 ${isFlipped ? 'rotate-y-180' : ''}`}>
            {/* Front side */}
            <Card className={`absolute inset-0 w-full h-full backface-hidden shadow-xl border-0 bg-gradient-to-br from-indigo-500 to-purple-600 ${isFlipped ? 'invisible' : 'visible'}`}>
              <CardContent className="flex items-center justify-center h-full p-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-4">
                    {currentVocab.word}
                  </div>
                  <div className="text-indigo-100 text-sm">
                    คลิกเพื่อดูคำแปล
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Back side */}
            <Card className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 shadow-xl border-0 bg-gradient-to-br from-emerald-500 to-teal-600 ${isFlipped ? 'visible' : 'invisible'}`}>
              <CardContent className="flex items-center justify-center h-full p-8">
                <div className="text-center">
                  <div className="text-2xl font-medium text-white mb-2">
                    {currentVocab.word}
                  </div>
                  <div className="text-3xl font-bold text-white mb-4">
                    {currentVocab.translation}
                  </div>
                  <div className="text-emerald-100 text-sm">
                    คลิกเพื่อกลับไปดูคำศัพท์
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-4">
        <Button
          onClick={handlePrevious}
          variant="outline"
          size="lg"
          className="h-12 px-6"
          disabled={vocabularies.length <= 1}
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          ก่อนหน้า
        </Button>

        <Button
          onClick={handleFlip}
          variant="outline"
          size="lg"
          className="h-12 px-6 bg-white/80 backdrop-blur-sm"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          พลิกการ์ด
        </Button>

        <Button
          onClick={handleNext}
          variant="outline"
          size="lg"
          className="h-12 px-6"
          disabled={vocabularies.length <= 1}
        >
          ถัดไป
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>

      {/* Progress bar */}
      <div className="mt-8 max-w-md mx-auto">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / vocabularies.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardDisplay;
