'use client';

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Send, RefreshCcw, Volume2, Mic, Square } from 'lucide-react';
import Image from 'next/image';

interface Message {
  type: 'user' | 'agent';
  content: string;
}

// Types pour la reconnaissance vocale
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal?: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

declare global {
  interface Window {
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  start(): void;
  stop(): void;
}

export function VisaInterviewForm() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const questions = [
    "Pourquoi avez-vous choisi la France pour vos études ?",
    "Quel est votre projet d'études précis en France ?",
    "Comment allez-vous financer vos études en France ?",
    "Quel est votre niveau en français ? Avez-vous passé des tests de langue ?",
    "Quels sont vos projets professionnels après vos études en France ?",
  ];

  const startRecording = () => {
    try {
      if ('webkitSpeechRecognition' in window) {
        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = 'fr-FR';
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join('');
          setUserInput(transcript);
        };

        recognition.onend = () => {
          setIsRecording(false);
        };

        recognitionRef.current = recognition;
        recognition.start();
        setIsRecording(true);
      } else {
        alert("La reconnaissance vocale n'est pas supportée par votre navigateur");
      }
    } catch (error) {
      console.error('Erreur lors du démarrage de la reconnaissance vocale:', error);
      alert("Une erreur s'est produite lors du démarrage de la reconnaissance vocale");
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    const recognition = recognitionRef.current;
    if (recognition) {
      recognition.stop();
      setIsRecording(false);
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setPlayingAudio(null);
    }
  };

  const handleUserResponse = async () => {
    if (!userInput.trim() || loading) return;

    setLoading(true);
    try {
      const userMessage: Message = { type: 'user', content: userInput };
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);

      const response = await fetch('/api/visa-interview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userInput,
          question: questions[currentQuestion],
          questionIndex: currentQuestion,
          previousMessages: messages,
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const agentMessage: Message = { type: 'agent', content: data.response };
      setMessages([...newMessages, agentMessage]);
      setUserInput('');

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert(error instanceof Error ? error.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  const playAudio = async (text: string, index: number) => {
    try {
      // Arrêter l'audio en cours s'il y en a un
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      setPlayingAudio(index);
      const response = await fetch('/api/visa-interview-audio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          langue: 'fr-FR',
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const audio = new Audio(`data:audio/mp3;base64,${data.audio}`);
      audioRef.current = audio;
      audio.play();
      audio.onended = () => {
        setPlayingAudio(null);
        audioRef.current = null;
      };
    } catch (error) {
      alert("Impossible de générer l'audio");
      setPlayingAudio(null);
    }
  };

  const resetInterview = () => {
    stopAudio();
    stopRecording();
    setMessages([]);
    setCurrentQuestion(0);
    setUserInput('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-4">
        Simulation d'entretien pour visa étudiant
      </h1>
      <p className="text-base md:text-lg text-gray-600 text-center mb-8 md:mb-12 max-w-3xl mx-auto px-4">
        Préparez-vous à votre entretien de visa étudiant avec notre simulateur. Obtenez des questions typiques, des réponses
        suggérées et des conseils personnalisés.
      </p>

      <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-violet-600 mb-6 md:mb-8">
          Entretien Visa Étudiant France
        </h2>
        <p className="text-sm md:text-base text-center text-gray-600 mb-8 md:mb-12">
          Préparez-vous à votre entretien de visa avec notre simulateur interactif. Répondez aux questions de
          l'agent consulaire et recevez des retours personnalisés.
        </p>

        <div className="flex flex-col md:flex-row items-center gap-4 mb-6 md:mb-8">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-violet-100 flex items-center justify-center">
            <MessageSquare className="w-6 h-6 md:w-8 md:h-8 text-violet-600" />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-center md:text-left">Agent Consulaire</h3>
            <p className="text-sm md:text-base text-gray-500 text-center md:text-left">Ambassade de France</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 md:p-6 mb-6 md:mb-8 min-h-[300px] overflow-y-auto">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500">
              <MessageSquare className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-4 text-violet-300" />
              <p className="text-sm md:text-base">
                Bonjour, je suis l'agent consulaire qui va conduire votre entretien.
                <br />
                Commençons avec la première question...
              </p>
            </div>
          ) : (
            <div className="space-y-4 md:space-y-6">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2 md:gap-4 ${
                    msg.type === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div
                    className={`max-w-[85%] md:max-w-[80%] p-3 md:p-4 rounded-xl ${
                      msg.type === 'user'
                        ? 'bg-violet-600 text-white'
                        : 'bg-white border border-gray-200'
                    }`}
                  >
                    <p className="text-sm md:text-base">{msg.content}</p>
                    {msg.type === 'agent' && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => playAudio(msg.content, idx)}
                          disabled={playingAudio !== null}
                          className="text-xs md:text-sm"
                        >
                          {playingAudio === idx ? (
                            <RefreshCcw className="w-3 h-3 md:w-4 md:h-4 animate-spin mr-1 md:mr-2" />
                          ) : (
                            <Volume2 className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                          )}
                          Écouter
                        </Button>
                        {playingAudio === idx && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={stopAudio}
                            className="text-xs md:text-sm"
                          >
                            <Square className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                            Arrêter
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-4">
            <h4 className="text-base md:text-lg font-medium">
              Question {currentQuestion + 1}/{questions.length}
            </h4>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => playAudio(questions[currentQuestion], -1)}
                disabled={playingAudio !== null}
                className="text-xs md:text-sm w-full md:w-auto"
              >
                {playingAudio === -1 ? (
                  <RefreshCcw className="w-3 h-3 md:w-4 md:h-4 animate-spin mr-1 md:mr-2" />
                ) : (
                  <Volume2 className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                )}
                Écouter la question
              </Button>
              {playingAudio === -1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={stopAudio}
                  className="text-xs md:text-sm w-full md:w-auto"
                >
                  <Square className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  Arrêter
                </Button>
              )}
            </div>
          </div>
          <p className="text-sm md:text-base text-gray-700">{questions[currentQuestion]}</p>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 space-y-2">
              <Textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Tapez votre réponse..."
                className="w-full text-sm md:text-base"
                rows={4}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={isRecording ? stopRecording : startRecording}
                className={`w-full md:w-auto text-xs md:text-sm ${
                  isRecording ? 'bg-red-50 text-red-600' : ''
                }`}
              >
                {isRecording ? (
                  <>
                    <Square className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                    Arrêter l'enregistrement
                  </>
                ) : (
                  <>
                    <Mic className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                    Répondre en vocal
                  </>
                )}
              </Button>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                onClick={handleUserResponse}
                disabled={loading || !userInput.trim()}
                className="w-full bg-violet-600 hover:bg-violet-700 text-xs md:text-sm"
              >
                {loading ? (
                  <RefreshCcw className="w-3 h-3 md:w-4 md:h-4 animate-spin" />
                ) : (
                  <>
                    <Send className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                    Envoyer
                  </>
                )}
              </Button>
              <Button
                onClick={resetInterview}
                variant="outline"
                disabled={loading}
                className="w-full text-xs md:text-sm"
              >
                <RefreshCcw className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                Recommencer
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
