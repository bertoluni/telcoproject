import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'success' | 'outline' | 'gradient';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'primary',
  children,
  ...props
}) => {
  const variants = {
    primary: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    outline: 'bg-transparent text-slate-400 border-slate-700',
    gradient: 'bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 text-indigo-300 border-indigo-500/30',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-md',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
