import { Link } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore";
import {
  
  ArrowRight,
  Play,
  Users,
  Globe,
  Award,
  Star,
  Shield,
  MessageCircle,
  TrendingUp,
  Zap,
  ChevronRight,
  Rocket,
  BarChart3,
  Users2,
  GraduationCap,
  Lock,
  Palette,
  Code,
  Database,
  Music,
} from "lucide-react";

export default function HeroSection() {
  const { user } = useAuthStore((state) => state);

  const stats = [
    { icon: Users, value: "50K+", label: "Active Learners" },
    { icon: Globe, value: "120+", label: "Countries" },
    { icon: Award, value: "10K+", label: "Skills Exchanged" },
    { icon: BarChart3, value: "4.9", label: "Average Rating" },
  ];

  const floatingCards = [
    { icon: Palette, title: "UI/UX Design", users: "2.3K learners" },
    { icon: Code, title: "Web Development", users: "4.1K learners" },
    { icon: Database, title: "Data Science", users: "1.8K learners" },
    { icon: Music, title: "Music Production", users: "1.2K learners" },
  ];

  const features = [
    {
      icon: Users2,
      title: "Learn from Peers",
      description: "Connect with real people who share your interests and learn from their experiences.",
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "Join a diverse community of learners from over 120 countries worldwide.",
    },
    {
      icon: Award,
      title: "Earn Recognition",
      description: "Build your reputation, earn badges, and showcase your skills to the world.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-b from-slate-50 via-white to-blue-50/30">
        {/* Background Decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-indigo-100/20 rounded-full blur-3xl" />
          
          <div className="absolute inset-0 opacity-[0.03]">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, #0f172a 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 xl:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
            {/* Left Content */}
            <div className="space-y-6 lg:space-y-8">
              {/* Badge - Moved closer to top */}
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-full px-4 py-1.5 shadow-sm">
                <Zap className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-slate-700">
                  Join 50,000+ learners worldwide
                </span>
              </div>

              {/* Heading */}
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1]">
                  <span className="text-slate-900">
                    Learn & Teach
                    <br />
                  </span>
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600">
                    Skills You Love
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-slate-500 max-w-lg leading-relaxed">
                  Connect with passionate people around the world. Exchange skills, 
                  grow together, and build meaningful relationships through learning.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3">
                {user ? (
                  <Link
                    to="/browse"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg shadow-slate-200"
                  >
                    Browse Skills
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/register"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg shadow-slate-200"
                    >
                      Get Started Free
                      <Rocket className="w-4 h-4" />
                    </Link>
                    <Link
                      to="/how-it-works"
                      className="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold rounded-xl transition-all duration-200 hover:bg-slate-50"
                    >
                      <Play className="w-4 h-4" />
                      See How It Works
                    </Link>
                  </>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-200/70">
                {stats.map((stat, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <stat.icon className="w-4 h-4 text-blue-500" />
                      <span className="text-lg font-bold text-slate-900">
                        {stat.value}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Social Proof - Testimonials */}
              <div className="flex items-center gap-4 pt-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      src={`https://i.pravatar.cc/150?img=${i + 10}`}
                      alt={`User ${i}`}
                      className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-slate-700">
                    4.9/5
                  </span>
                  <span className="text-sm text-slate-400 hidden sm:inline">
                    (2,000+ reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Right Content - Visual */}
            <div className="relative">
              <div className="relative">
                <div className="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-3xl shadow-2xl shadow-blue-100/50 p-6 lg:p-8">
                  {/* Floating Cards Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {floatingCards.map((card, index) => (
                      <div
                        key={index}
                        className="group bg-white rounded-2xl p-4 border border-slate-200/80 hover:border-blue-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                          <card.icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <h4 className="font-semibold text-slate-900 text-sm">
                          {card.title}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1">
                          {card.users}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Activity Indicator */}
                  <div className="mt-4 flex items-center justify-between p-3 bg-blue-50/50 rounded-xl border border-blue-100/50">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-3 h-3 bg-green-400 rounded-full" />
                        <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping" />
                      </div>
                      <span className="text-sm text-slate-600">
                        <span className="font-semibold">Sarah</span> is teaching React
                      </span>
                    </div>
                    <MessageCircle className="w-4 h-4 text-blue-500" />
                  </div>
                </div>

                {/* Floating Badge 1 */}
                <div className="absolute -top-3 -right-3 bg-white/90 backdrop-blur-sm border border-slate-200/80 rounded-2xl px-3 py-1.5 shadow-xl animate-float">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-slate-700">
                      Skills growing 200%+
                    </span>
                  </div>
                </div>

                {/* Floating Badge 2 */}
                <div className="absolute -bottom-3 -left-3 bg-white/90 backdrop-blur-sm border border-slate-200/80 rounded-2xl px-3 py-1.5 shadow-xl animate-float-delayed">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium text-slate-700">
                      1,200 online now
                    </span>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                <div className="flex items-center gap-1.5 text-sm text-slate-500">
                  <Shield className="w-4 h-4 text-blue-500" />
                  <span>Verified Users</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-slate-500">
                  <Lock className="w-4 h-4 text-blue-500" />
                  <span>Secure Platform</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-slate-500">
                  <GraduationCap className="w-4 h-4 text-purple-500" />
                  <span>100+ Skills</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">
            Why SkillSwap?
          </h2>
          <p className="text-slate-500 mt-2 max-w-md mx-auto">
            The peer-to-peer learning platform that connects you with passionate people.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white p-6 lg:p-8 rounded-2xl border border-slate-200/80 hover:border-blue-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-500">{feature.description}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 group-hover:gap-2 transition-all">
                Learn more
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 3.5s ease-in-out infinite;
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}