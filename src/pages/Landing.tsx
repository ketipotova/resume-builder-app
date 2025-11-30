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
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-8 h-8 text-primary-600" />
            <span className="text-2xl font-bold text-gray-900">{t('landing.brand')}</span>
          </div>
          <Button onClick={() => navigate('/chat')} variant="outline">
            {t('landing.getStarted')}
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            {t('landing.hero.title')}
            <span className="block text-primary-600 mt-2">{t('landing.hero.subtitle')}</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            {t('landing.hero.description')}
          </p>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">{t('landing.demo.title')}</h2>
          <p className="text-gray-600 text-center mb-12">
            {t('landing.demo.description')}
          </p>

          {/* Progress Bar */}
          <div className="flex items-center justify-center mb-12 gap-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => setCurrentStep(index)}
                  className={`flex flex-col items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    index === currentStep
                      ? 'bg-primary-600 text-white'
                      : index < currentStep
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-400'
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
                  <div className={`w-8 md:w-16 h-1 ${index < currentStep ? 'bg-green-500' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>

          {/* Demo Content */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 min-h-[500px]">
            {/* Step 1: AI Chat */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Chat with AI Assistant</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold">
                      AI
                    </div>
                    <div className="flex-1 bg-gray-100 rounded-lg p-4">
                      <p className="text-gray-800">
                        Hi! I'm your AI resume assistant. Let's build your perfect resume together.
                        Can you tell me about your current role and experience?
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 flex-row-reverse">
                    <div className="w-10 h-10 rounded-full bg-accent-600 flex items-center justify-center text-white font-bold">
                      You
                    </div>
                    <div className="flex-1 bg-primary-50 rounded-lg p-4">
                      <p className="text-gray-800">
                        I'm a Senior Software Engineer with 8 years of experience in full-stack development,
                        specializing in React and Node.js.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold">
                      AI
                    </div>
                    <div className="flex-1 bg-gray-100 rounded-lg p-4">
                      <p className="text-gray-800">
                        Great! Tell me about your key achievements. What are you most proud of in your current role?
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 flex-row-reverse">
                    <div className="w-10 h-10 rounded-full bg-accent-600 flex items-center justify-center text-white font-bold">
                      You
                    </div>
                    <div className="flex-1 bg-primary-50 rounded-lg p-4">
                      <p className="text-gray-800">
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
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">AI-Powered Enhancement</h3>
                <p className="text-gray-600 mb-8">
                  Watch how our AI transforms your content into powerful, achievement-focused statements
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-red-600 font-semibold">
                      <span className="text-2xl">✗</span>
                      <span>Before</span>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-2">
                      <p className="text-gray-700 line-through">Worked on backend systems</p>
                      <p className="text-gray-700 line-through">Helped with code reviews</p>
                      <p className="text-gray-700 line-through">Fixed bugs and improved performance</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-green-600 font-semibold">
                      <CheckCircle className="w-6 h-6" />
                      <span>After AI Enhancement</span>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-2">
                      <p className="text-gray-700 font-medium">
                        Led development of microservices architecture serving 2M+ users
                      </p>
                      <p className="text-gray-700 font-medium">
                        Reduced system latency by 40% through performance optimization
                      </p>
                      <p className="text-gray-700 font-medium">
                        Mentored team of 5 junior developers, improving code quality by 35%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Job Tailoring */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Tailor to Any Job</h3>
                <p className="text-gray-600 mb-8">
                  Paste a job link, and our AI optimizes your resume to match the job requirements
                </p>
                <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg p-6 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="w-6 h-6 text-primary-600" />
                    <h4 className="font-semibold text-gray-900">Target Job</h4>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Senior Full Stack Engineer</strong> at Tech Corp
                  </p>
                  <p className="text-sm text-gray-600">
                    Looking for: React, TypeScript, AWS, Microservices, Team Leadership
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white border-2 border-primary-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-gray-900">Keywords Matched</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        React
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        TypeScript
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        Microservices
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        Leadership
                      </span>
                    </div>
                  </div>
                  <div className="bg-white border-2 border-accent-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-5 h-5 text-primary-600" />
                      <span className="font-semibold text-gray-900">Optimization</span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
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
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Style</h3>
                <p className="text-gray-600 mb-8">
                  Select from professionally designed templates that make your resume stand out
                </p>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-4 border-2 border-amber-200">
                    <div className="aspect-[8.5/11] bg-white rounded shadow-sm mb-2" />
                    <p className="text-sm font-semibold text-center">Executive</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-red-100 rounded-lg p-4 border-2 border-orange-200">
                    <div className="aspect-[8.5/11] bg-white rounded shadow-sm mb-2" />
                    <p className="text-sm font-semibold text-center">Bold Creative</p>
                  </div>
                  <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-lg p-4 border-2 border-slate-200">
                    <div className="aspect-[8.5/11] bg-white rounded shadow-sm mb-2" />
                    <p className="text-sm font-semibold text-center">Minimal Nordic</p>
                  </div>
                  <div className="bg-gradient-to-br from-cyan-50 to-slate-100 rounded-lg p-4 border-2 border-cyan-200">
                    <div className="aspect-[8.5/11] bg-white rounded shadow-sm mb-2" />
                    <p className="text-sm font-semibold text-center">Modern Sidebar</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Download */}
            {currentStep === 4 && (
              <div className="space-y-6 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Resume is Ready!</h3>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  Download your professionally crafted, ATS-friendly resume in PDF format.
                  Ready to impress recruiters and land your dream job.
                </p>
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg p-6 border border-primary-200">
                  <Download className="w-8 h-8 text-primary-600" />
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">John_Smith_Resume.pdf</p>
                    <p className="text-sm text-gray-600">Ready to download</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-12 pt-8 border-t">
              <Button
                onClick={prevStep}
                disabled={currentStep === 0}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </Button>
              {currentStep < steps.length - 1 ? (
                <Button
                  onClick={nextStep}
                  className="flex items-center gap-2"
                >
                  Next
                  <ChevronRight className="w-5 h-5" />
                </Button>
              ) : (
                <Button
                  onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex items-center gap-2"
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
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">AI-Powered</h3>
              <p className="text-gray-600">
                Our advanced AI helps you write compelling, achievement-focused content that gets noticed
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-accent-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Job-Tailored</h3>
              <p className="text-gray-600">
                Automatically optimize your resume for any job posting with smart keyword matching
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Beautiful Design</h3>
              <p className="text-gray-600">
                Choose from professionally designed templates that make your resume stand out
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl shadow-2xl p-12 text-center text-white">
          {!submitted ? (
            <>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Join the Waitlist
              </h2>
              <p className="text-primary-100 mb-8 text-lg">
                Be among the first 50 users to experience the future of resume building.
                Get exclusive early access and lifetime benefits.
              </p>
              <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-6 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 font-semibold whitespace-nowrap"
                >
                  Join Now
                </Button>
              </form>
              <p className="text-sm text-primary-200 mt-4">
                🎉 Limited to first 50 users · No credit card required
              </p>
            </>
          ) : (
            <div className="space-y-6">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold">You're on the list!</h2>
              <p className="text-primary-100 text-lg">
                Thank you for joining! We'll notify you at <strong>{email}</strong> when we launch.
              </p>
              <Button
                onClick={() => navigate('/chat')}
                className="bg-white text-primary-600 hover:bg-gray-100"
              >
                Get Started Now
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-600">
        <p>{t('landing.footer.copyright')}</p>
      </footer>
    </div>
  );
}
