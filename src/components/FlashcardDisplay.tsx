
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, RotateCcw, Check } from "lucide-react";

interface Vocabulary {
  word: string;
  translation: string;
  remembered?: boolean;
  difficulty?: 'easy' | 'medium' | 'hard';
}

interface FlashcardDisplayProps {
  vocabularies: Vocabulary[];
  topic: string;
  onUpdateVocabulary: (index: number, updates: Partial<Vocabulary>) => void;
}

const FlashcardDisplay: React.FC<FlashcardDisplayProps> = ({ vocabularies, topic, onUpdateVocabulary }) => {
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

  const handleRemembered = () => {
    onUpdateVocabulary(currentIndex, { 
      remembered: !currentVocab.remembered 
    });
  };

  const handleDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => {
    onUpdateVocabulary(currentIndex, { difficulty });
  };

  const currentVocab = vocabularies[currentIndex];
  const rememberedCount = vocabularies.filter(v => v.remembered).length;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500 hover:bg-green-600';
      case 'medium': return 'bg-yellow-500 hover:bg-yellow-600';
      case 'hard': return 'bg-red-500 hover:bg-red-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const getDifficultyTextColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'hard': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Flashcard: {topic}
        </h2>
        <div className="flex justify-center items-center gap-4 text-gray-600">
          <p>{currentIndex + 1} จาก {vocabularies.length} คำ</p>
          <p className="text-green-600">จำได้แล้ว: {rememberedCount} คำ</p>
        </div>
      </div>

      {/* Flashcard */}
      <div className="flex justify-center mb-8">
        <div 
          className="relative w-96 h-64 cursor-pointer perspective-1000"
          onClick={handleFlip}
        >
          <div className={`relative w-full h-full transform-style-preserve-3d transition-transform duration-700 ${isFlipped ? 'rotate-y-180' : ''}`}>
            {/* Front side */}
            <Card className={`absolute inset-0 w-full h-full backface-hidden shadow-xl border-0 ${
              currentVocab.remembered 
                ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
                : 'bg-gradient-to-br from-indigo-500 to-purple-600'
            } ${isFlipped ? 'invisible' : 'visible'}`}>
              <CardContent className="flex items-center justify-center h-full p-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-4">
                    {currentVocab.word}
                  </div>
                  <div className="text-indigo-100 text-sm">
                    คลิกเพื่อดูคำแปล
                  </div>
                  {currentVocab.remembered && (
                    <div className="mt-4">
                      <Check className="w-8 h-8 text-white mx-auto" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Back side */}
            <Card className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 shadow-xl border-0 ${
              currentVocab.remembered 
                ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
                : 'bg-gradient-to-br from-emerald-500 to-teal-600'
            } ${isFlipped ? 'visible' : 'invisible'}`}>
              <CardContent className="flex items-center justify-center h-full p-8">
                <div className="text-center">
                  <div className="text-2xl font-medium text-white mb-2">
                    {currentVocab.word}
                  </div>
                  <div className="text-3xl font-bold text-white mb-4">
                    {currentVocab.translation}
                  </div>
                  <div className="text-emerald-100 text-sm mb-4">
                    คลิกเพื่อกลับไปดูคำศัพท์
                  </div>
                  <div className={`text-sm font-medium ${getDifficultyTextColor(currentVocab.difficulty || 'medium')}`}>
                    ระดับความยาก: {currentVocab.difficulty === 'easy' ? 'ง่าย' : 
                                   currentVocab.difficulty === 'hard' ? 'ยาก' : 'ปานกลาง'}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className="flex justify-center items-center gap-4 mb-6">
        <Button
          onClick={handleRemembered}
          variant={currentVocab.remembered ? "default" : "outline"}
          size="lg"
          className={`h-12 px-6 ${
            currentVocab.remembered 
              ? 'bg-green-600 hover:bg-green-700 text-white' 
              : 'hover:bg-green-50 hover:text-green-600 hover:border-green-600'
          }`}
        >
          <Check className="w-5 h-5 mr-2" />
          {currentVocab.remembered ? 'จำได้แล้ว' : 'จำได้'}
        </Button>

        <div className="flex gap-2">
          <Button
            onClick={() => handleDifficulty('easy')}
            size="sm"
            className={`${
              currentVocab.difficulty === 'easy' 
                ? getDifficultyColor('easy') + ' text-white' 
                : 'bg-white border border-green-500 text-green-600 hover:bg-green-50'
            }`}
          >
            ง่าย
          </Button>
          <Button
            onClick={() => handleDifficulty('medium')}
            size="sm"
            className={`${
              currentVocab.difficulty === 'medium' 
                ? getDifficultyColor('medium') + ' text-white' 
                : 'bg-white border border-yellow-500 text-yellow-600 hover:bg-yellow-50'
            }`}
          >
            ปานกลาง
          </Button>
          <Button
            onClick={() => handleDifficulty('hard')}
            size="sm"
            className={`${
              currentVocab.difficulty === 'hard' 
                ? getDifficultyColor('hard') + ' text-white' 
                : 'bg-white border border-red-500 text-red-600 hover:bg-red-50'
            }`}
          >
            ยาก
          </Button>
        </div>
      </div>

      {/* Navigation Controls */}
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
        <div className="mt-2 text-center text-sm text-gray-600">
          ความคืบหน้า: {Math.round(((currentIndex + 1) / vocabularies.length) * 100)}%
        </div>
      </div>
    </div>
  );
};

export default FlashcardDisplay;
