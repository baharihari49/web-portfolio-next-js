'use client';

import { motion } from 'framer-motion';
import { PortfolioItem } from '@/app/types/portfolio';
import { Code2, Users, Award, Clock } from 'lucide-react';

interface PortfolioStatsProps {
  items: PortfolioItem[];
}

export default function PortfolioStats({ items }: PortfolioStatsProps) {
  const totalProjects = items.length;
  const categories = new Set(items.map(item => item.category)).size;
  const technologies = new Set(items.flatMap(item => item.technologies || [])).size;
  const completedProjects = items.filter(item => item.highlight).length;

  const stats = [
    {
      icon: Code2,
      value: totalProjects,
      label: 'Total Projects',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      icon: Users,
      value: categories,
      label: 'Categories',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      icon: Award,
      value: completedProjects,
      label: 'Featured Projects',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      icon: Clock,
      value: technologies,
      label: 'Technologies Used',
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="bg-card rounded-2xl p-6 border shadow-sm hover:shadow-lg transition-all duration-300 hover:border-primary/20">
                <div className={`${stat.bgColor} rounded-lg p-3 w-fit mb-4 group-hover:scale-110 transition-transform`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="text-3xl font-bold mb-1"
                >
                  {stat.value}
                </motion.div>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}