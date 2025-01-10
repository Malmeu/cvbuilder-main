'use client';

import React, { useState, useRef } from 'react';
import { TCFSpeakingQuestion } from '@/app/data/tcf/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mic, Square, InfoIcon } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface Props {
  question: TCFSpeakingQuestion;
  onSubmit?: (audioBlob: Blob) => void;
}

export function SpeakingQuestion({ question, onSubmit }: Props) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<number | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      mediaRecorder.current.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.current.start();
      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = window.setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= question.maxSeconds) {
            stopRecording();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      alert('Erreur lors de l\'accès au microphone. Veuillez vérifier les permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const handleSubmit = () => {
    if (audioBlob && recordingTime >= question.minSeconds) {
      onSubmit?.(audioBlob);
    }
  };

  const progress = (recordingTime / question.maxSeconds) * 100;
  const isValidDuration = recordingTime >= question.minSeconds && recordingTime <= question.maxSeconds;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Question */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">{question.question}</h3>
            <p className="text-muted-foreground">{question.context}</p>
          </div>

          {/* Example Audio */}
          {question.audioUrl && (
            <div className="space-y-2">
              <h4 className="font-medium">Exemple audio :</h4>
              <audio controls className="w-full">
                <source src={question.audioUrl} type="audio/mpeg" />
                Votre navigateur ne supporte pas l'élément audio.
              </audio>
            </div>
          )}

          {/* Recording Interface */}
          <div className="space-y-4">
            <div className="flex justify-center gap-4">
              {!isRecording ? (
                <Button
                  onClick={startRecording}
                  disabled={audioBlob !== null}
                >
                  <Mic className="mr-2 h-4 w-4" />
                  Commencer l'enregistrement
                </Button>
              ) : (
                <Button
                  variant="destructive"
                  onClick={stopRecording}
                >
                  <Square className="mr-2 h-4 w-4" />
                  Arrêter l'enregistrement
                </Button>
              )}
            </div>

            {/* Recording Progress */}
            {(isRecording || audioBlob) && (
              <div className="space-y-2">
                <Progress value={progress} />
                <p className={`text-sm text-center ${isValidDuration ? 'text-muted-foreground' : 'text-destructive'}`}>
                  {recordingTime} secondes 
                  (minimum : {question.minSeconds}s, maximum : {question.maxSeconds}s)
                </p>
              </div>
            )}

            {/* Recorded Audio Playback */}
            {audioUrl && (
              <audio controls className="w-full">
                <source src={audioUrl} type="audio/webm" />
                Votre navigateur ne supporte pas l'élément audio.
              </audio>
            )}
          </div>

          {/* Criteria */}
          <div className="space-y-2">
            <h4 className="font-medium">Critères d'évaluation :</h4>
            <ul className="list-disc list-inside space-y-1">
              {question.criteria.map((criterion, index) => (
                <li key={index} className="text-muted-foreground">
                  {criterion}
                </li>
              ))}
            </ul>
          </div>

          {/* Submit Button */}
          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={!audioBlob || !isValidDuration}
          >
            Soumettre
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
