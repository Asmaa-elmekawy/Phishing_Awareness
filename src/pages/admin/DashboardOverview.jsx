import React from 'react';
import { BookOpen, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 
import Card from './components/common/Card';
import { motion as Motion } from 'framer-motion';
import { ROUTES_ADMIN } from '../../constants/routes';

const DashboardOverview = ({ lessons, questions }) => {
  const navigate = useNavigate(); 

  const stats = [
    { 
      title: 'Total Lessons', 
      value: lessons.length, 
      icon: <BookOpen className="text-cyber-primary" />, 
      bgColor: 'bg-cyber-primary/10' 
    },
    { 
      title: 'Total Questions', 
      value: questions.length, 
      icon: <HelpCircle className="text-cyber-secondary" />, 
      bgColor: 'bg-cyber-secondary/10' 
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-cyber-text-muted">Welcome back, Admin. System is secured.</p>
      </header>

      {/* Stats Cards - 2 cards only */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-full">
        {stats.map((stat, index) => (
          <Motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:border-cyber-primary/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm text-cyber-text-muted">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </Card>
          </Motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Lessons */}
        <div className="lg:col-span-2">
          <Card title="Recent Lessons">
            {lessons.length === 0 ? (
              <p className="text-cyber-text-muted text-center py-8">No lessons found.</p>
            ) : (
              <div className="space-y-4">
                {lessons.slice(0, 5).map(lesson => (
                  <div 
                    key={lesson.lessonId} 
                    className="p-4 rounded-xl bg-cyber-surface-alt flex justify-between items-center group hover:bg-cyber-primary/5 transition-colors border border-transparent hover:border-cyber-primary/20 cursor-pointer"
                    onClick={() => navigate(`/lessons/${lesson.lessonId}/questions`)} 
                  >
                    <div>
                      <p className="font-bold text-cyber-text">{lesson.title}</p>
                      <p className="text-sm text-cyber-text-muted line-clamp-1">{lesson.description}</p>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-cyber-bg text-xs font-bold text-cyber-primary">
                      {questions.filter(q => q.lessonId === lesson.lessonId).length} Qs
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card title="Quick Actions">
            <div className="space-y-3">
              <button 
                onClick={() => navigate(ROUTES_ADMIN.LESSONS.LIST)} 
                className="w-full p-4 rounded-xl border border-cyber-border bg-cyber-bg text-cyber-text text-left flex items-center gap-3 hover:bg-cyber-surface-alt transition-colors group"
              >
                <BookOpen size={18} className="text-cyber-primary group-hover:scale-110 transition-transform" />
                <span className="font-medium">Create New Lesson</span>
              </button>
              <button 
                onClick={() => navigate(ROUTES_ADMIN.QUESTIONS.LIST)} 
                className="w-full p-4 rounded-xl border border-cyber-border bg-cyber-bg text-cyber-text text-left flex items-center gap-3 hover:bg-cyber-surface-alt transition-colors group"
              >
                <HelpCircle size={18} className="text-cyber-secondary group-hover:scale-110 transition-transform" />
                <span className="font-medium">Add Question</span>
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;