'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Send, RefreshCcw, Volume2 } from 'lucide-react';
import Image from 'next/image';

interface Message {
  type: 'user' | 'agent';
  content: string;
}

export function VisaInterviewForm() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const questions = [
    "Pourquoi avez-vous choisi la France pour vos études ?",
    "Quel est votre projet d'études précis en France ?",
    "Comment allez-vous financer vos études en France ?",
    "Quel est votre niveau en français ? Avez-vous passé des tests de langue ?",
    "Quels sont vos projets professionnels après vos études en France ?",
  ];

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
      setPlayingAudio(index);
      const response = await fetch('/api/visa-interview-audio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          langue: 'fr',
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const audio = new Audio(`data:audio/mp3;base64,${data.audio}`);
      audio.play();
      audio.onended = () => setPlayingAudio(null);
    } catch (error) {
      alert("Impossible de générer l'audio");
      setPlayingAudio(null);
    }
  };

  const resetInterview = () => {
    setMessages([]);
    setCurrentQuestion(0);
    setUserInput('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-4">
        Simulation d'entretien pour visa étudiant
      </h1>
      <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
        Préparez-vous à votre entretien de visa étudiant avec notre simulateur. Obtenez des questions typiques, des réponses
        suggérées et des conseils personnalisés. Vous pouvez même écouter les questions pour vous entraîner à la
        compréhension orale !
      </p>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-violet-600 mb-8">
          Entretien Visa Étudiant France
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Préparez-vous à votre entretien de visa avec notre simulateur interactif. Répondez aux questions de
          l'agent consulaire et recevez des retours personnalisés.
        </p>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center">
            <MessageSquare className="w-8 h-8 text-violet-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Agent Consulaire</h3>
            <p className="text-gray-500">Ambassade de France</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 mb-8 min-h-[300px]">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 text-violet-300" />
              <p>
                Bonjour, je suis l'agent consulaire qui va conduire votre entretien.
                <br />
                Commençons avec la première question...
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-4 ${
                    msg.type === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-xl ${
                      msg.type === 'user'
                        ? 'bg-violet-600 text-white'
                        : 'bg-white border border-gray-200'
                    }`}
                  >
                    <p>{msg.content}</p>
                    {msg.type === 'agent' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => playAudio(msg.content, idx)}
                        disabled={playingAudio !== null}
                        className="mt-2"
                      >
                        {playingAudio === idx ? (
                          <RefreshCcw className="w-4 h-4 animate-spin mr-2" />
                        ) : (
                          <Volume2 className="w-4 h-4 mr-2" />
                        )}
                        Écouter
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-medium">
              Question {currentQuestion + 1}/{questions.length}
            </h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => playAudio(questions[currentQuestion], -1)}
              disabled={playingAudio !== null}
            >
              <Volume2 className="w-4 h-4 mr-2" />
              Écouter la question
            </Button>
          </div>
          <p className="text-gray-700">{questions[currentQuestion]}</p>
          <div className="flex gap-4">
            <Textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Tapez votre réponse..."
              className="flex-1"
              rows={4}
            />
            <div className="space-y-2">
              <Button
                onClick={handleUserResponse}
                disabled={loading || !userInput.trim()}
                className="w-full bg-violet-600 hover:bg-violet-700"
              >
                {loading ? (
                  <RefreshCcw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Envoyer
                  </>
                )}
              </Button>
              <Button
                onClick={resetInterview}
                variant="outline"
                disabled={loading}
                className="w-full"
              >
                <RefreshCcw className="w-4 h-4 mr-2" />
                Recommencer
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
