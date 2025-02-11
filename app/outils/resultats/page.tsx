'use client'

import { useState, useEffect } from 'react';
import { useToolResults, ToolResult } from '@/hooks/useToolResults';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Copy, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function OutilsResultats() {
  const { getToolResults, deleteToolResult } = useToolResults();
  const [toolResults, setToolResults] = useState<{[key: string]: ToolResult[]}>({});
  const [activeTab, setActiveTab] = useState(
    Object.keys(toolResults).length > 0 
      ? Object.keys(toolResults)[0] 
      : 'Lettre de motivation'
  );
  const { toast } = useToast();

  useEffect(() => {
    const fetchResults = async () => {
      const results: {[key: string]: ToolResult[]} = {};
      const uniqueToolNames = [
        'Lettre de motivation', 
        'Analyse de CV',
        'Préparation Entretien',
        // Ajoutez ici d'autres noms d'outils à afficher
      ];

      console.log('Recherche des résultats pour les outils:', uniqueToolNames);

      // Récupérer tous les résultats d'abord
      const allResults = await getToolResults();
      console.log('Tous les résultats récupérés:', allResults);

      for (const toolName of uniqueToolNames) {
        const toolSpecificResults = await getToolResults(toolName);
        console.log(`Résultats pour ${toolName}:`, toolSpecificResults);
        
        if (toolSpecificResults.length > 0) {
          results[toolName] = toolSpecificResults;
        }
      }

      console.log('Résultats finaux:', results);
      setToolResults(results);

      // Mettre à jour l'onglet actif
      if (Object.keys(results).length > 0) {
        setActiveTab(Object.keys(results)[0]);
      }
    };

    fetchResults();
  }, []);

  const handleCopyResult = (resultData: string) => {
    try {
      const parsedResult = JSON.parse(resultData);
      
      // Formater spécifiquement pour la préparation d'entretien
      if (parsedResult.poste && parsedResult.entreprise) {
        const formattedText = `
🎯 Préparation d'Entretien pour ${parsedResult.poste} chez ${parsedResult.entreprise}

📋 Questions Techniques :
${parsedResult.questions_techniques.map((q: string, i: number) => `${i + 1}. ${q}`).join('\n')}

🏢 Questions Culture d'Entreprise :
${parsedResult.questions_culture.map((q: string, i: number) => `${i + 1}. ${q}`).join('\n')}

⚠️ Questions Pièges :
${parsedResult.questions_pieges.map((q: string, i: number) => `${i + 1}. ${q}`).join('\n')}

💡 Conseils de Préparation :
${parsedResult.conseils_preparation.map((c: string, i: number) => `${i + 1}. ${c}`).join('\n')}

🌟 Points Clés à Mettre en Avant :
${parsedResult.points_cles.map((p: string, i: number) => `${i + 1}. ${p}`).join('\n')}
        `.trim();

        navigator.clipboard.writeText(formattedText);
        
        toast({
          title: 'Copié !',
          description: 'La préparation d\'entretien a été copiée dans le presse-papiers',
        });
      } 
      // Formater spécifiquement pour l'analyseur de CV
      else if (parsedResult.score && parsedResult.recommendations) {
        // Fonction pour nettoyer le texte
        const cleanText = (text: string) => {
          // Supprimer les titres markdown
          text = text.replace(/#+\s*/g, '');
          
          // Supprimer les étoiles de mise en gras
          text = text.replace(/\*\*/g, '');
          
          // Supprimer les espaces en trop
          text = text.replace(/\s+/g, ' ').trim();
          
          return text;
        };

        // Nettoyer et filtrer les recommandations
        const cleanedRecommendations = parsedResult.recommendations
          .map(cleanText)
          .filter((rec: string) => rec && rec.length > 10);

        const formattedText = `
📄 Analyse de CV

📊 Score ATS : ${parsedResult.score}/100

🔍 Recommandations :
${cleanedRecommendations.map((rec: string, i: number) => `${i + 1}. ${rec}`).join('\n')}

📁 Fichier analysé : ${parsedResult.fileName || 'Non spécifié'}

💡 Conseils d'amélioration :
- Adaptez votre CV en fonction des recommandations ci-dessus
- Vérifiez la mise en page et la structure de votre document
- Assurez-vous que les mots-clés correspondent au poste visé
        `.trim();

        navigator.clipboard.writeText(formattedText);
        
        toast({
          title: 'Copié !',
          description: 'Le rapport d\'analyse de CV a été copié dans le presse-papiers',
        });
      }
      // Pour les autres types de résultats, garder le comportement actuel
      else {
        navigator.clipboard.writeText(JSON.stringify(parsedResult, null, 2));
        
        toast({
          title: 'Copié !',
          description: 'Le résultat a été copié dans le presse-papiers',
        });
      }
    } catch (error) {
      // En cas d'erreur de parsing, copier le texte brut
      navigator.clipboard.writeText(resultData);
      
      toast({
        title: 'Copié !',
        description: 'Le résultat a été copié dans le presse-papiers',
        variant: 'default',
      });
    }
  };

  const handleDeleteResult = async (resultId: string, toolName: string) => {
    const confirmDelete = window.confirm('Voulez-vous vraiment supprimer ce résultat ?');
    
    if (confirmDelete) {
      const success = await deleteToolResult(resultId);
      
      if (success) {
        // Mettre à jour l'état local
        const updatedResults = {...toolResults};
        updatedResults[toolName] = updatedResults[toolName].filter(result => result.id !== resultId);
        
        // Supprimer la catégorie si plus de résultats
        if (updatedResults[toolName].length === 0) {
          delete updatedResults[toolName];
        }

        setToolResults(updatedResults);

        // Mettre à jour l'onglet actif si nécessaire
        if (Object.keys(updatedResults).length > 0 && !updatedResults[activeTab]) {
          setActiveTab(Object.keys(updatedResults)[0]);
        }
      }
    }
  };

  const renderResultContent = (result: string) => {
    try {
      // Tenter de parser le résultat comme JSON
      const parsedResult = JSON.parse(result);
      
      // Pour Analyse de CV
      if (parsedResult.score && parsedResult.recommendations) {
        return (
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Score ATS:</span>
              <span className="text-emerald-600 font-bold">{parsedResult.score}/100</span>
            </div>
            <div>
              <h4 className="font-medium mb-2">Recommandations:</h4>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {parsedResult.recommendations.slice(0, 5).map((rec: string, index: number) => (
                  <li key={index}>{rec}</li>
                ))}
                {parsedResult.recommendations.length > 5 && (
                  <li className="text-gray-500 italic">... et {parsedResult.recommendations.length - 5} autres</li>
                )}
              </ul>
              {parsedResult.fileName && (
                <p className="text-xs text-gray-500 mt-2">
                  Fichier: {parsedResult.fileName}
                </p>
              )}
            </div>
          </div>
        );
      }
      
      // Pour Préparation Entretien
      if (parsedResult.poste && parsedResult.entreprise && 
          (parsedResult.questions_techniques || parsedResult.questions_culture)) {
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-gray-800">{parsedResult.poste}</h4>
                <p className="text-sm text-gray-600">{parsedResult.entreprise}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h5 className="font-medium text-gray-700">Questions Techniques</h5>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                {parsedResult.questions_techniques.slice(0, 3).map((q: string, index: number) => (
                  <li key={index}>{q}</li>
                ))}
                {parsedResult.questions_techniques.length > 3 && (
                  <li className="text-gray-500 italic">... et {parsedResult.questions_techniques.length - 3} autres</li>
                )}
              </ul>
            </div>
            
            <div className="space-y-2">
              <h5 className="font-medium text-gray-700">Questions Culture d'Entreprise</h5>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                {parsedResult.questions_culture.slice(0, 3).map((q: string, index: number) => (
                  <li key={index}>{q}</li>
                ))}
                {parsedResult.questions_culture.length > 3 && (
                  <li className="text-gray-500 italic">... et {parsedResult.questions_culture.length - 3} autres</li>
                )}
              </ul>
            </div>
          </div>
        );
      }
      
      // Pour les autres types de résultats, afficher le JSON formatté
      return (
        <pre className="whitespace-pre-wrap text-sm text-gray-700 max-h-48 overflow-hidden">
          {JSON.stringify(parsedResult, null, 2)}
        </pre>
      );
    } catch (error) {
      // Si le parsing échoue, afficher le texte brut
      return (
        <pre className="whitespace-pre-wrap text-sm text-gray-700 max-h-48 overflow-hidden">
          {result}
        </pre>
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8 text-center"
      >
        Résultats de mes Outils
      </motion.h1>

      {Object.keys(toolResults).length === 0 ? (
        <div className="text-center text-gray-500">
          Aucun résultat d'outil sauvegardé
        </div>
      ) : (
        <Tabs 
          defaultValue={activeTab} 
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            {Object.keys(toolResults).map(toolName => (
              <TabsTrigger key={toolName} value={toolName}>
                {toolName}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(toolResults).map(([toolName, results]) => (
            <TabsContent key={toolName} value={toolName}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map((result, index) => (
                  <Card key={result.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {toolName} - {new Date(result.created_at).toLocaleDateString()}
                      </CardTitle>
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleCopyResult(result.result_data)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-red-500 hover:bg-red-50"
                          onClick={() => handleDeleteResult(result.id, toolName)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {renderResultContent(result.result_data)}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
}
