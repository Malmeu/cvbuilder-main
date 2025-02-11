import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useToast } from './use-toast';

export interface ToolResult {
  id: string;
  user_id: string;
  tool_name: string;
  result_data: string;
  created_at: string;
  updated_at: string;
}

export function useToolResults(): { 
  saveToolResult: (toolName: string, resultData: string) => Promise<ToolResult | null>, 
  getToolResults: (toolName?: string) => Promise<ToolResult[]>,
  deleteToolResult: (resultId: string) => Promise<boolean> 
} {
  const supabase = createClientComponentClient();
  const { toast } = useToast();

  const saveToolResult = async (toolName: string, resultData: string): Promise<ToolResult | null> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: 'Connexion requise',
          description: 'Veuillez vous connecter pour sauvegarder les résultats',
          variant: 'destructive',
        });
        return null;
      }

      const { data, error } = await supabase
        .from('tool_results')
        .insert({
          user_id: session.user.id,
          tool_name: toolName,
          result_data: resultData
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'Résultat sauvegardé',
        description: `Vos résultats pour ${toolName} ont été enregistrés`,
      });

      return data;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de sauvegarder les résultats',
        variant: 'destructive',
      });
      return null;
    }
  };

  const getToolResults = async (toolName?: string): Promise<ToolResult[]> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) return [];

      let query = supabase
        .from('tool_results')
        .select('*')
        .eq('user_id', session.user.id);

      if (toolName) {
        query = query.eq('tool_name', toolName);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;

      return data || [];
    } catch (error) {
      console.error('Erreur lors de la récupération:', error);
      return [];
    }
  };

  const deleteToolResult = async (resultId: string): Promise<boolean> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: 'Connexion requise',
          description: 'Veuillez vous connecter pour supprimer les résultats',
          variant: 'destructive',
        });
        return false;
      }

      const { error } = await supabase
        .from('tool_results')
        .delete()
        .eq('id', resultId)
        .eq('user_id', session.user.id);

      if (error) throw error;

      toast({
        title: 'Résultat supprimé',
        description: 'Le résultat a été supprimé avec succès',
      });

      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer le résultat',
        variant: 'destructive',
      });
      return false;
    }
  };

  return { saveToolResult, getToolResults, deleteToolResult };
}
