import React, { useState } from 'react';
import { Link } from 'wouter';
import { ChevronDown, Star, Zap, Award, Volume2, RotateCcw, TrendingUp, Play } from 'lucide-react';

interface Unit {
  id: string;
  title: string;
  description: string;
  icon: string;
  lessons: string[];
  color: string;
}

interface ComingSoonUnit {
  id: string;
  title: string;
  description: string;
  icon: string;
  status: string;
}

export default function HomePage() {
  const [expandedUnit, setExpandedUnit] = useState<string | null>(null);

  const units: Unit[] = [
    {
      id: 'matter',
      title: 'Unit 1: Matter & Interactions',
      description: 'Explore the building blocks of everything around us!',
      icon: '⚛️',
      lessons: [
        'Lesson 1: What is Matter?',
        'Lesson 2: States of Matter (Solid, Liquid, Gas)',
        'Lesson 3: Atoms & Molecules',
        'Lesson 4: Chemical Changes & Reactions'
      ],
      color: 'from-blue-400 to-purple-500'
    },
    {
      id: 'forces',
      title: 'Unit 2: Forces & Motion',
      description: 'Discover how things move and what makes them go!',
      icon: '⚡',
      lessons: [
        'Lesson 5: Push & Pull Forces',
        'Lesson 6: Gravity & Friction',
        'Lesson 7: Simple Machines',
        'Lesson 8: Speed, Velocity, & Direction'
      ],
      color: 'from-orange-400 to-red-500'
    }
  ];

  const comingSoonUnits: ComingSoonUnit[] = [
    {
      id: 'ecosystems',
      title: 'Unit 3: Ecosystems & Life Science',
      description: 'Learn about living things and their habitats',
      icon: '🌿',
      status: 'Coming Soon'
    },
    {
      id: 'energy',
      title: 'Unit 4: Energy & Waves',
      description: 'Explore light, sound, and energy transformations',
      icon: '💡',
      status: 'Coming Soon'
    },
    {
      id: 'earth',
      title: 'Unit 5: Earth & Space Science',
      description: 'Discover rocks, weather, planets, and stars',
      icon: '🌍',
      status: 'Coming Soon'
    }
  ];

  const features = [
    {
      title: 'Micro-Learning',
      description: '1-minute videos designed for short attention spans',
      icon: '⏱️'
    },
    {
      title: 'High Stimulation',
      description: 'Colorful animated games with sparkles and effects',
      icon: '✨'
    },
    {
      title: 'Dopamine Rewards',
      description: 'Badges, streaks, and XP to celebrate progress',
      icon: '🏆'
    },
    {
      title: 'Fail-Forward Design',
      description: 'Instant retry with no penalties for mistakes',
      icon: '🔄'
    },
    {
      title: 'Sound Feedback',
      description: 'Audio cues and music for engagement',
      icon: '🔊'
    },
    {
      title: 'Progress Tracking',
      description: 'Visual progress bars and achievement tracking',
      icon: '📊'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Navigation Header */}
      <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🚀</span>
            <h1 className="text-2xl font-bold" style={{ fontFamily: 'Fredoka One' }}>
              Science Explorer Academy
            </h1>
          </div>
          <div className="text-sm opacity-90">
            Designed for ADHD Learners • 3rd Grade
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-80"
          style={{
            backgroundImage:
              'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663440693124/LRCQh74urLCPMmK8QUgPSZ/home-hero-bg-hR8heasBGefaUmsg3Pkrv4.webp)'
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 py-16 text-center">
          <div className="bg-white/95 backdrop-blur rounded-3xl p-12 shadow-2xl">
            <h2
              className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
              style={{ fontFamily: 'Fredoka One' }}
            >
              Adventures in Science!
            </h2>
            <p className="text-2xl text-gray-700 mb-8" style={{ fontFamily: 'Comic Neue' }}>
              Explore, Create, and Learn with Interactive Games & Gamification
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/map">
                <a className="inline-flex items-center gap-2 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                   style={{ fontFamily: 'Fredoka One' }}>
                  <Play size={24} />
                  Start Learning Now
                </a>
              </Link>
              <a href="#curriculum" className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl border-2 border-blue-600 transform hover:scale-105 transition-all"
                 style={{ fontFamily: 'Fredoka One' }}>
                <ChevronDown size={24} />
                View Curriculum
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2
          className="text-4xl font-bold text-center mb-4 text-blue-600"
          style={{ fontFamily: 'Fredoka One' }}
        >
          Designed for ADHD Learners
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Every feature is crafted to keep kids engaged, motivated, and learning
        </p>

        <div
          className="mb-12 rounded-2xl overflow-hidden shadow-xl"
          style={{
            backgroundImage:
              'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663440693124/LRCQh74urLCPMmK8QUgPSZ/features-adhd-benefits-oGFHMU8Hki5hkFWrcH4oS5.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '400px'
          }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all border-4 border-yellow-300"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3
                className="text-xl font-bold text-blue-600 mb-2"
                style={{ fontFamily: 'Fredoka One' }}
              >
                {feature.title}
              </h3>
              <p className="text-gray-700" style={{ fontFamily: 'Comic Neue' }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Curriculum Section */}
      <section id="curriculum" className="bg-gradient-to-r from-blue-100 to-purple-100 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2
            className="text-4xl font-bold text-center mb-4 text-blue-600"
            style={{ fontFamily: 'Fredoka One' }}
          >
            3rd Grade Curriculum
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            8 Interactive Lessons • 8 Unique Games • Full Science Standards Aligned
          </p>

          <div
            className="mb-12 rounded-2xl overflow-hidden shadow-xl"
            style={{
              backgroundImage:
                'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663440693124/LRCQh74urLCPMmK8QUgPSZ/curriculum-units-visual-XPtYo7nQLsc9ZKLfrD2VhR.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '400px'
            }}
          />

          <div className="space-y-4">
            {units.map((unit) => (
              <div
                key={unit.id}
                className={`bg-gradient-to-r ${unit.color} rounded-2xl shadow-lg overflow-hidden transform transition-all hover:shadow-xl`}
              >
                <button
                  onClick={() =>
                    setExpandedUnit(expandedUnit === unit.id ? null : unit.id)
                  }
                  className="w-full px-6 py-6 flex items-center justify-between text-white hover:bg-black/10 transition-colors"
                >
                  <div className="flex items-center gap-4 text-left">
                    <span className="text-4xl">{unit.icon}</span>
                    <div>
                      <h3
                        className="text-2xl font-bold"
                        style={{ fontFamily: 'Fredoka One' }}
                      >
                        {unit.title}
                      </h3>
                      <p className="text-sm opacity-90">{unit.description}</p>
                    </div>
                  </div>
                  <ChevronDown
                    size={32}
                    className={`transform transition-transform ${
                      expandedUnit === unit.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {expandedUnit === unit.id && (
                  <div className="bg-white/95 px-6 py-6 border-t-4 border-white/30">
                    <div className="space-y-3 mb-6">
                      {unit.lessons.map((lesson, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 text-gray-800"
                        >
                          <span className="text-2xl">📚</span>
                          <span
                            className="text-lg font-semibold"
                            style={{ fontFamily: 'Comic Neue' }}
                          >
                            {lesson}
                          </span>
                        </div>
                      ))}
                    </div>
                    <Link href="/map">
                      <a className={`inline-block bg-gradient-to-r ${unit.color} text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all`}
                         style={{ fontFamily: 'Fredoka One' }}>
                        Start {unit.title.split(':')[1].trim()}
                      </a>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2
          className="text-4xl font-bold text-center mb-4 text-blue-600"
          style={{ fontFamily: 'Fredoka One' }}
        >
          Exciting Units Coming Soon!
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          We're building more science adventures for you to explore
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {comingSoonUnits.map((unit) => (
            <div
              key={unit.id}
              className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 shadow-lg border-4 border-dashed border-gray-400 text-center opacity-75 hover:opacity-100 transition-opacity"
            >
              <div className="text-6xl mb-4">{unit.icon}</div>
              <h3
                className="text-2xl font-bold text-gray-700 mb-2"
                style={{ fontFamily: 'Fredoka One' }}
              >
                {unit.title}
              </h3>
              <p className="text-gray-600 mb-4" style={{ fontFamily: 'Comic Neue' }}>
                {unit.description}
              </p>
              <span className="inline-block bg-yellow-400 text-gray-800 px-6 py-2 rounded-full font-bold"
                    style={{ fontFamily: 'Fredoka One' }}>
                {unit.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2
            className="text-4xl font-bold text-center mb-12"
            style={{ fontFamily: 'Fredoka One' }}
          >
            Why Science Explorer Academy?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/20 backdrop-blur rounded-2xl p-8 border-2 border-white/50">
              <h3
                className="text-2xl font-bold mb-4 flex items-center gap-2"
                style={{ fontFamily: 'Fredoka One' }}
              >
                <Star size={28} />
                For Students with ADHD
              </h3>
              <ul className="space-y-3" style={{ fontFamily: 'Comic Neue' }}>
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>No choice paralysis - linear progression keeps you focused</span>
                </li>
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>Bite-sized lessons with immediate rewards</span>
                </li>
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>Colorful, high-energy games that keep you engaged</span>
                </li>
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>Fail-forward design - mistakes are just learning chances</span>
                </li>
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>Sound effects and vibrations for tactile feedback</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/20 backdrop-blur rounded-2xl p-8 border-2 border-white/50">
              <h3
                className="text-2xl font-bold mb-4 flex items-center gap-2"
                style={{ fontFamily: 'Fredoka One' }}
              >
                <Award size={28} />
                For Teachers & Parents
              </h3>
              <ul className="space-y-3" style={{ fontFamily: 'Comic Neue' }}>
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>Standards-aligned science curriculum</span>
                </li>
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>Teacher Skip Mode to bypass video timers</span>
                </li>
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>Progress tracking and achievement badges</span>
                </li>
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>Leaderboard to celebrate peer learning</span>
                </li>
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>Accessible design with large fonts and high contrast</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="bg-gradient-to-r from-green-400 to-emerald-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2
            className="text-4xl font-bold mb-6"
            style={{ fontFamily: 'Fredoka One' }}
          >
            Ready to Explore?
          </h2>
          <p className="text-xl mb-8" style={{ fontFamily: 'Comic Neue' }}>
            Start your science adventure today and unlock amazing discoveries!
          </p>
          <Link href="/map">
            <a className="inline-block bg-white text-green-600 px-10 py-4 rounded-full font-bold text-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
               style={{ fontFamily: 'Fredoka One' }}>
              🚀 Begin Your Adventure
            </a>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p style={{ fontFamily: 'Comic Neue' }}>
            © 2026 Science Explorer Academy • Designed for ADHD Learners • 3rd Grade
          </p>
          <p className="text-sm opacity-75 mt-2">
            Making science accessible, engaging, and fun for every learner
          </p>
        </div>
      </footer>
    </div>
  );
}
