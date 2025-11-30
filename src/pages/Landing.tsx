import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, CheckCircle, Sparkles, Target, FileText, Download, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '../components/common/Button';
import { addToWaitlist } from '../lib/supabase';

export function Landing() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    {
      id: 'chat',
      title: t('landing.steps.chat'),
      icon: <Sparkles className="w-6 h-6" />,
    },
    {
      id: 'enhance',
      title: t('landing.steps.enhance'),
      icon: <Target className="w-6 h-6" />,
    },
    {
      id: 'tailor',
      title: t('landing.steps.tailor'),
      icon: <FileText className="w-6 h-6" />,
    },
    {
      id: 'templates',
      title: t('landing.steps.templates'),
      icon: <FileText className="w-6 h-6" />,
    },
    {
      id: 'download',
      title: t('landing.steps.download'),
      icon: <Download className="w-6 h-6" />,
    },
  ];

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    try {
      await addToWaitlist(email);
      setSubmitted(true);
    } catch (error) {
      console.error('Failed to add to waitlist:', error);
      alert('Failed to join waitlist. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Ambient background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-100/40 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-violet-100/30 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="container mx-auto px-6 py-8 relative">
        <div className="flex items-center justify-between backdrop-blur-sm bg-white/40 rounded-2xl px-6 py-4 border border-white/60 shadow-sm">
          <div className="flex items-center gap-3">
            <FileText className="w-7 h-7 text-primary-600" />
            <span className="text-xl font-semibold text-gray-900 tracking-tight">{t('landing.brand')}</span>
          </div>
          <Button onClick={() => navigate('/chat')} variant="outline" className="hover:bg-white/60 transition-all duration-300">
            {t('landing.getStarted')}
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-32 text-center relative">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
            {t('landing.hero.title')}
            <span className="block bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent mt-3">
              {t('landing.hero.subtitle')}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-light mb-16 max-w-3xl mx-auto leading-relaxed">
            {t('landing.hero.description')}
          </p>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="container mx-auto px-6 py-24 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 tracking-tight">{t('landing.demo.title')}</h2>
          <p className="text-gray-600 text-center mb-16 text-lg font-light">
            {t('landing.demo.description')}
          </p>

          {/* Progress Bar */}
          <div className="flex items-center justify-center mb-16 gap-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => setCurrentStep(index)}
                  className={`flex flex-col items-center gap-2 px-5 py-3 rounded-2xl transition-all duration-300 backdrop-blur-md border ${
                    index === currentStep
                      ? 'bg-primary-600/90 text-white border-primary-600 shadow-lg scale-105'
                      : index < currentStep
                      ? 'bg-green-100/80 text-green-700 border-green-200 hover:scale-105'
                      : 'bg-white/50 text-gray-400 border-gray-200 hover:bg-white/70'
                  }`}
                >
                  {index < currentStep ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    step.icon
                  )}
                  <span className="text-xs font-medium hidden md:block">{step.title}</span>
                </button>
                {index < steps.length - 1 && (
                  <div className={`w-8 md:w-16 h-0.5 transition-all duration-300 ${index < currentStep ? 'bg-green-400' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>

          {/* Demo Content */}
          <div className="backdrop-blur-xl bg-white/60 rounded-3xl border border-white/60 shadow-xl p-8 md:p-12 min-h-[500px] transition-all duration-300">
            {/* Step 1: AI Chat */}
            {currentStep === 0 && (
              <div className="space-y-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">Chat with AI Assistant</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4 animate-fade-in">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center text-white font-semibold shadow-lg">
                      AI
                    </div>
                    <div className="flex-1 backdrop-blur-md bg-gray-100/70 rounded-2xl p-5 border border-gray-200/50 shadow-sm">
                      <p className="text-gray-800 leading-relaxed">
                        Hi! I'm your AI resume assistant. Let's build your perfect resume together.
                        Can you tell me about your current role and experience?
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 flex-row-reverse animate-fade-in">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-semibold shadow-lg">
                      You
                    </div>
                    <div className="flex-1 backdrop-blur-md bg-blue-50/70 rounded-2xl p-5 border border-blue-200/50 shadow-sm">
                      <p className="text-gray-800 leading-relaxed">
                        I'm a Senior Software Engineer with 8 years of experience in full-stack development,
                        specializing in React and Node.js.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 animate-fade-in">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center text-white font-semibold shadow-lg">
                      AI
                    </div>
                    <div className="flex-1 backdrop-blur-md bg-gray-100/70 rounded-2xl p-5 border border-gray-200/50 shadow-sm">
                      <p className="text-gray-800 leading-relaxed">
                        Great! Tell me about your key achievements. What are you most proud of in your current role?
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 flex-row-reverse animate-fade-in">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-semibold shadow-lg">
                      You
                    </div>
                    <div className="flex-1 backdrop-blur-md bg-blue-50/70 rounded-2xl p-5 border border-blue-200/50 shadow-sm">
                      <p className="text-gray-800 leading-relaxed">
                        I led the development of a microservices platform that now serves 2M+ users,
                        and reduced system latency by 40%.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Enhancement */}
            {currentStep === 1 && (
              <div className="space-y-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">AI-Powered Enhancement</h3>
                <p className="text-gray-600 mb-10 text-lg font-light">
                  Watch how our AI transforms your content into powerful, achievement-focused statements
                </p>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-5">
                    <div className="flex items-center gap-2 text-red-600 font-semibold">
                      <span className="text-2xl">✗</span>
                      <span>Before</span>
                    </div>
                    <div className="backdrop-blur-md bg-red-50/70 border border-red-200/50 rounded-2xl p-6 space-y-3 shadow-sm">
                      <p className="text-gray-700 line-through leading-relaxed">Worked on backend systems</p>
                      <p className="text-gray-700 line-through leading-relaxed">Helped with code reviews</p>
                      <p className="text-gray-700 line-through leading-relaxed">Fixed bugs and improved performance</p>
                    </div>
                  </div>
                  <div className="space-y-5">
                    <div className="flex items-center gap-2 text-green-600 font-semibold">
                      <CheckCircle className="w-6 h-6" />
                      <span>After AI Enhancement</span>
                    </div>
                    <div className="backdrop-blur-md bg-green-50/70 border border-green-200/50 rounded-2xl p-6 space-y-3 shadow-sm">
                      <p className="text-gray-800 font-medium leading-relaxed">
                        Led development of microservices architecture serving 2M+ users
                      </p>
                      <p className="text-gray-800 font-medium leading-relaxed">
                        Reduced system latency by 40% through performance optimization
                      </p>
                      <p className="text-gray-800 font-medium leading-relaxed">
                        Mentored team of 5 junior developers, improving code quality by 35%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Job Tailoring */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Tailor to Any Job</h3>
                <p className="text-gray-600 mb-10 text-lg font-light">
                  Paste a job link, and our AI optimizes your resume to match the job requirements
                </p>
                <div className="backdrop-blur-md bg-gradient-to-r from-primary-50/70 to-blue-50/70 rounded-2xl p-7 mb-8 border border-primary-200/50 shadow-sm">
                  <div className="flex items-center gap-3 mb-5">
                    <Target className="w-6 h-6 text-primary-600" />
                    <h4 className="font-semibold text-gray-900 text-lg">Target Job</h4>
                  </div>
                  <p className="text-base text-gray-800 mb-2">
                    <strong>Senior Full Stack Engineer</strong> at Tech Corp
                  </p>
                  <p className="text-sm text-gray-600 font-light">
                    Looking for: React, TypeScript, AWS, Microservices, Team Leadership
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="backdrop-blur-md bg-white/70 border border-green-200/50 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-gray-900">Keywords Matched</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-4 py-2 backdrop-blur-sm bg-green-100/80 text-green-700 rounded-full text-sm font-medium border border-green-200/50">
                        React
                      </span>
                      <span className="px-4 py-2 backdrop-blur-sm bg-green-100/80 text-green-700 rounded-full text-sm font-medium border border-green-200/50">
                        TypeScript
                      </span>
                      <span className="px-4 py-2 backdrop-blur-sm bg-green-100/80 text-green-700 rounded-full text-sm font-medium border border-green-200/50">
                        Microservices
                      </span>
                      <span className="px-4 py-2 backdrop-blur-sm bg-green-100/80 text-green-700 rounded-full text-sm font-medium border border-green-200/50">
                        Leadership
                      </span>
                    </div>
                  </div>
                  <div className="backdrop-blur-md bg-white/70 border border-blue-200/50 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-5 h-5 text-primary-600" />
                      <span className="font-semibold text-gray-900">Optimization</span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p>✓ Highlighted AWS experience</p>
                      <p>✓ Emphasized team leadership</p>
                      <p>✓ Added TypeScript projects</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Templates */}
            {currentStep === 3 && (
              <div className="space-y-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Choose Your Style</h3>
                <p className="text-gray-600 mb-10 text-lg font-light">
                  Select from professionally designed templates that make your resume stand out
                </p>
                <div className="grid md:grid-cols-4 gap-5">
                  <div className="backdrop-blur-md bg-gradient-to-br from-amber-50/70 to-amber-100/70 rounded-2xl p-5 border border-amber-200/50 shadow-sm hover:scale-105 transition-transform duration-300 cursor-pointer">
                    <div className="aspect-[8.5/11] bg-white rounded-xl shadow-md mb-3" />
                    <p className="text-sm font-semibold text-center">Executive</p>
                  </div>
                  <div className="backdrop-blur-md bg-gradient-to-br from-orange-50/70 to-red-100/70 rounded-2xl p-5 border border-orange-200/50 shadow-sm hover:scale-105 transition-transform duration-300 cursor-pointer">
                    <div className="aspect-[8.5/11] bg-white rounded-xl shadow-md mb-3" />
                    <p className="text-sm font-semibold text-center">Bold Creative</p>
                  </div>
                  <div className="backdrop-blur-md bg-gradient-to-br from-slate-50/70 to-gray-50/70 rounded-2xl p-5 border border-slate-200/50 shadow-sm hover:scale-105 transition-transform duration-300 cursor-pointer">
                    <div className="aspect-[8.5/11] bg-white rounded-xl shadow-md mb-3" />
                    <p className="text-sm font-semibold text-center">Minimal Nordic</p>
                  </div>
                  <div className="backdrop-blur-md bg-gradient-to-br from-cyan-50/70 to-slate-100/70 rounded-2xl p-5 border border-cyan-200/50 shadow-sm hover:scale-105 transition-transform duration-300 cursor-pointer">
                    <div className="aspect-[8.5/11] bg-white rounded-xl shadow-md mb-3" />
                    <p className="text-sm font-semibold text-center">Modern Sidebar</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Download */}
            {currentStep === 4 && (
              <div className="space-y-8 text-center">
                <div className="w-24 h-24 backdrop-blur-md bg-green-100/80 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-200/50 shadow-lg">
                  <CheckCircle className="w-14 h-14 text-green-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-5 tracking-tight">Your Resume is Ready!</h3>
                <p className="text-gray-600 mb-12 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                  Download your professionally crafted, ATS-friendly resume in PDF format.
                  Ready to impress recruiters and land your dream job.
                </p>
                <div className="inline-flex items-center gap-4 backdrop-blur-md bg-gradient-to-r from-primary-50/70 to-blue-50/70 rounded-2xl p-7 border border-primary-200/50 shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer">
                  <Download className="w-9 h-9 text-primary-600" />
                  <div className="text-left">
                    <p className="font-semibold text-gray-900 text-lg">John_Smith_Resume.pdf</p>
                    <p className="text-sm text-gray-600 font-light">Ready to download</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-16 pt-8 border-t border-gray-200/50">
              <Button
                onClick={prevStep}
                disabled={currentStep === 0}
                variant="outline"
                className="flex items-center gap-2 hover:scale-105 transition-transform duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </Button>
              {currentStep < steps.length - 1 ? (
                <Button
                  onClick={nextStep}
                  className="flex items-center gap-2 hover:scale-105 transition-transform duration-300"
                >
                  Next
                  <ChevronRight className="w-5 h-5" />
                </Button>
              ) : (
                <Button
                  onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex items-center gap-2 hover:scale-105 transition-transform duration-300"
                >
                  Join Waitlist
                  <ArrowRight className="w-5 h-5" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-24 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="backdrop-blur-xl bg-white/60 rounded-3xl p-10 border border-white/60 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="w-14 h-14 bg-primary-100/80 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm border border-primary-200/50">
                <Sparkles className="w-7 h-7 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">AI-Powered</h3>
              <p className="text-gray-600 leading-relaxed font-light">
                Our advanced AI helps you write compelling, achievement-focused content that gets noticed
              </p>
            </div>
            <div className="backdrop-blur-xl bg-white/60 rounded-3xl p-10 border border-white/60 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="w-14 h-14 bg-blue-100/80 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm border border-blue-200/50">
                <Target className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">Job-Tailored</h3>
              <p className="text-gray-600 leading-relaxed font-light">
                Automatically optimize your resume for any job posting with smart keyword matching
              </p>
            </div>
            <div className="backdrop-blur-xl bg-white/60 rounded-3xl p-10 border border-white/60 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="w-14 h-14 bg-green-100/80 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm border border-green-200/50">
                <FileText className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">Beautiful Design</h3>
              <p className="text-gray-600 leading-relaxed font-light">
                Choose from professionally designed templates that make your resume stand out
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="container mx-auto px-6 py-24 relative">
        <div className="max-w-2xl mx-auto backdrop-blur-xl bg-gradient-to-br from-primary-600/90 to-blue-600/90 rounded-3xl border border-white/20 shadow-2xl p-14 text-center text-white">
          {!submitted ? (
            <>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                Join the Waitlist
              </h2>
              <p className="text-white/90 mb-10 text-xl font-light leading-relaxed">
                Be among the first 50 users to experience the future of resume building.
                Get exclusive early access and lifetime benefits.
              </p>
              <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-7 py-4 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm bg-white/95 shadow-lg transition-all duration-300"
                />
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  className="bg-white text-primary-600 hover:bg-white/90 px-10 py-4 font-semibold whitespace-nowrap rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Join Now
                </Button>
              </form>
              <p className="text-sm text-white/80 mt-6 font-light">
                Limited to first 50 users · No credit card required
              </p>
            </>
          ) : (
            <div className="space-y-8">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-xl">
                <CheckCircle className="w-14 h-14 text-green-600" />
              </div>
              <h2 className="text-4xl font-bold tracking-tight">You're on the list!</h2>
              <p className="text-white/90 text-xl font-light">
                Thank you for joining! We'll notify you at <strong>{email}</strong> when we launch.
              </p>
              <Button
                onClick={() => navigate('/chat')}
                className="bg-white text-primary-600 hover:bg-white/90 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started Now
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 text-center text-gray-600">
        <p className="font-light">{t('landing.footer.copyright')}</p>
      </footer>
    </div>
  );
}
