import { useEffect, useState } from 'react';
import { BookOpen, HelpCircle, Users, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from './components/common/Card';
import { motion } from 'framer-motion';
import { ROUTES_ADMIN } from '../../constants/routes';
import { useAccount } from '../../hooks/useAccount';
import { WelcomeSection, StatCard, SimpleChart, ActivityTable } from './components/DashboardWidgets';
import { useLessons } from '../../hooks/useLessons';
import questionService from '../../services/questionService';

const DashboardOverview = () => {
  const navigate = useNavigate();
  const { user } = useAccount();
  const { lessons, fetchLessons, loading: lessonsLoading } = useLessons();
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [lessonQuestionCounts, setLessonQuestionCounts] = useState({});
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoadingQuestions(true);
      try {
        const lessonsData = await fetchLessons();
        if (lessonsData && lessonsData.length > 0) {
          const questionPromises = lessonsData.map(lesson =>
            questionService.getQuestionsByLesson(lesson.lessonId)
          );
          const allQuestions = await Promise.all(questionPromises);

          const counts = {};
          let total = 0;
          allQuestions.forEach((qs, index) => {
            const lessonId = lessonsData[index].lessonId;
            const count = qs?.length || 0;
            counts[lessonId] = count;
            total += count;
          });

          setLessonQuestionCounts(counts);
          setTotalQuestions(total);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoadingQuestions(false);
      }
    };
    loadData();
  }, []);

  const stats = [
    {
      title: 'Total Lessons',
      value: lessons.length,
      icon: <BookOpen />,
      colorClass: 'cyber-primary',
      trend: 'up',
      trendValue: '+12%',
      path: ROUTES_ADMIN.LESSONS.LIST
    },
    {
      title: 'Total Questions',
      value: totalQuestions,
      icon: <HelpCircle />,
      colorClass: 'cyber-secondary',
      trend: 'up',
      trendValue: '+5%',
      path: ROUTES_ADMIN.QUESTIONS.LIST
    },
    {
      title: 'Total Users',
      value: '1,284',
      icon: <Users />,
      colorClass: 'cyber-accent',
      trend: 'up',
      trendValue: '+18%',
      path: '#' // Placeholder for users management
    },
    {
      title: 'Quiz Performance',
      value: '78%',
      icon: <CheckCircle />,
      colorClass: 'cyber-success',
      trend: 'down',
      trendValue: '-2%',
      path: '#' // Placeholder for reports
    },
  ];

  const recentActivities = [
    { user: 'John Doe', action: 'Completed "Phishing 101"', status: 'Completed', time: '2 mins ago' },
    { user: 'Jane Smith', action: 'Started "Email Safety"', status: 'Pending', time: '15 mins ago' },
    { user: 'Alex Wilson', action: 'Failed Quiz "Social Engineering"', status: 'Failed', time: '1 hour ago' },
    { user: 'Sarah Brown', action: 'Registered new account', status: 'Completed', time: '3 hours ago' },
    { user: 'Michael Lee', action: 'Updated profile picture', status: 'Completed', time: '5 hours ago' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Welcome Hero Section */}
      <WelcomeSection userName={user?.firstName || 'Admin'} />

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={stat.title}
            {...stat}
            onClick={() => {
              if (stat.path && stat.path !== '#') {
                navigate(stat.path);
              }
            }}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* User Growth Chart */}
          <Card title="Activity Analytics" subtitle="User participation and quiz completions over time">
            <SimpleChart />
          </Card>

          {/* Recent Activity Table */}
          <Card title="Recent Activity" subtitle="Real-time system interactions and user progress">
            <ActivityTable activities={recentActivities} />
          </Card>
        </div>

        {/* Sidebar Components */}
        <div className="space-y-8">
          {/* Quick Actions */}
          <Card title="Quick Management">
            <div className="space-y-3">
              <button
                onClick={() => navigate(ROUTES_ADMIN.LESSONS.LIST)}
                className="w-full p-4 rounded-xl border border-cyber-border bg-cyber-bg text-cyber-text text-left flex items-center gap-3 hover:bg-cyber-surface-alt transition-colors group"
              >
                <BookOpen size={18} className="text-cyber-primary group-hover:scale-110 transition-transform" />
                <span className="font-medium">Manage Lessons</span>
              </button>
              <button
                onClick={() => navigate(ROUTES_ADMIN.QUESTIONS.LIST)}
                className="w-full p-4 rounded-xl border border-cyber-border bg-cyber-bg text-cyber-text text-left flex items-center gap-3 hover:bg-cyber-surface-alt transition-colors group"
              >
                <HelpCircle size={18} className="text-cyber-secondary group-hover:scale-110 transition-transform" />
                <span className="font-medium">Manage Questions</span>
              </button>

            </div>
          </Card>

          {/* Recent Lessons Mini List */}
          <Card title="Latest Content">
            {lessons.length === 0 ? (
              <p className="text-cyber-text-muted text-center py-8">No lessons found.</p>
            ) : (
              <div className="space-y-4">
                {lessons.slice(0, 4).map(lesson => (
                  <div
                    key={lesson.lessonId}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-cyber-primary/5 transition-colors cursor-pointer group"
                    onClick={() => navigate(`/admin/lessons/${lesson.lessonId}`)}
                  >
                    <div className="w-10 h-10 rounded bg-cyber-surface-alt flex items-center justify-center text-cyber-primary group-hover:bg-cyber-primary/20 transition-colors">
                      <BookOpen size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-cyber-text line-clamp-1">{lesson.title}</p>
                      <p className="text-xs text-cyber-text-muted">{lessonQuestionCounts[lesson.lessonId] || 0} Questions</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={() => navigate(ROUTES_ADMIN.LESSONS.LIST)}
              className="w-full mt-6 py-2 text-xs font-bold text-cyber-primary hover:text-cyber-primary/80 transition-colors uppercase tracking-widest"
            >
              View All Content
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
