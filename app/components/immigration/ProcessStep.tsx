import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ProcessStepProps {
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
  delay?: number;
}

export default function ProcessStep({ step, title, description, icon: Icon, delay = 0 }: ProcessStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      className="flex gap-4 items-start"
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <div className="badge badge-primary">Étape {step}</div>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <p className="mt-2 text-base-content/70">{description}</p>
      </div>
    </motion.div>
  );
}
