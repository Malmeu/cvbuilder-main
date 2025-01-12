'use client';

interface ArticleContentProps {
  content: string;
}

type HeadingLevel = '#' | '##' | '###' | '####' | '#####' | '######';
type HeadingSizes = {
  [K in HeadingLevel]: string;
};

export function ArticleContent({ content }: ArticleContentProps) {
  // Fonction pour convertir le contenu en HTML formaté
  const formatContent = (rawContent: string) => {
    let formattedContent = rawContent;

    // Définition des tailles de titres
    const headingSizes: HeadingSizes = {
      '#': 'text-4xl',
      '##': 'text-3xl',
      '###': 'text-2xl',
      '####': 'text-xl',
      '#####': 'text-lg',
      '######': 'text-base'
    };

    // Formatage des titres
    formattedContent = formattedContent.replace(/^(#{1,6})\s(.+)$/gm, (_, level, text) => {
      const headingLevel = level as HeadingLevel;
      const size = headingSizes[headingLevel] || 'text-base';
      return `<h${level.length} class="font-bold ${size} text-gray-900 mb-4 mt-8">${text}</h${level.length}>`;
    });

    // Formatage des listes à puces
    formattedContent = formattedContent.replace(/^\s*[-•]\s(.+)$/gm, 
      '<li class="flex items-start mb-2"><span class="text-violet-500 mr-2">•</span>$1</li>'
    );
    formattedContent = formattedContent.replace(
      /(<li[^>]*>.*?<\/li>\n?)+/g,
      '<ul class="list-none pl-4 my-4">$&</ul>'
    );

    // Formatage des listes numérotées
    formattedContent = formattedContent.replace(/^\s*(\d+)\.\s(.+)$/gm,
      '<li class="flex items-start mb-2"><span class="font-medium text-violet-500 mr-2">$1.</span>$2</li>'
    );
    formattedContent = formattedContent.replace(
      /(<li[^>]*>.*?<\/li>\n?)+/g,
      '<ol class="list-none pl-4 my-4">$&</ol>'
    );

    // Formatage des paragraphes
    formattedContent = formattedContent.replace(/^(?!<[uo]l|<li|<h\d)[^\n]+$/gm,
      '<p class="text-gray-700 mb-4 leading-relaxed">$&</p>'
    );

    // Formatage des sections importantes
    formattedContent = formattedContent.replace(/\*\*([^*]+)\*\*/g,
      '<strong class="font-semibold text-gray-900">$1</strong>'
    );

    // Formatage des liens
    formattedContent = formattedContent.replace(/\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-violet-600 hover:text-violet-700 underline">$1</a>'
    );

    return formattedContent;
  };

  return (
    <article 
      className="prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: formatContent(content) }}
    />
  );
}
