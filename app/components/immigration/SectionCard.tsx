import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface SectionCardProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  delay?: number;
}

export default function SectionCard({ title, icon: Icon, children, delay = 0 }: SectionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="card-body">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <h2 className="card-title text-2xl">{title}</h2>
        </div>
        {children}
      </div>
    </motion.div>
  );
}
