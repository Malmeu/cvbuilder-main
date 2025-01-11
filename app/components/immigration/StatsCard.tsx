import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  description: string;
  delay?: number;
}

export default function StatsCard({ title, value, icon: Icon, description, delay = 0 }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
    >
      <div className="card-body">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm text-base-content/60">{title}</h3>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        </div>
        <p className="text-sm text-base-content/70 mt-2">{description}</p>
      </div>
    </motion.div>
  );
}
