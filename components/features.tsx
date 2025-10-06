'use client';

import { useState } from 'react';
import { TrendingUp, TrendingDown, Activity, BarChart3, Target } from 'lucide-react';

export default function FeaturesSection() {
  const [activeFilter, setActiveFilter] = useState(0);

  const projects = [
    { name: 'OSS Google Docs!', company: 'Lucid', color: 'bg-white', logo: '🔮' },
    { name: 'Dive into AI', company: 'SuperMemory AI', color: 'bg-[#101010]', logo: '⚡' },
    { name: 'Based on your Tech Stack', company: 'Cap', color: 'bg-white', logo: '🎯' },
    { name: 'Start Contributing Now!', company: 'Mail0', color: 'bg-[#101010]', logo: '📧' },
  ];

  const filters = [
    {
      icon: <Target className="w-4 h-4 text-[#4684de]" />,
      title: 'COMPETITION',
      gradient: 'from-[#4684de] via-white to-white',
      options: [
        { icon: <TrendingUp className="text-red-600" />, label: 'Very High' },
        { icon: <TrendingUp className="text-green-600" />, label: 'Very Low' },
        { icon: <BarChart3 className="text-yellow-600" />, label: 'Moderate' },
        { icon: <TrendingDown className="text-blue-600" />, label: 'Low' },
        { icon: <TrendingUp className="text-orange-600" />, label: 'High' },
      ]
    },
    {
      icon: <Activity className="w-4 h-4 text-green-600" />,
      title: 'ACTIVITY',
      gradient: 'from-green-600 via-white to-white',
      options: [
        { icon: <TrendingUp className="text-green-600" />, label: 'Highest' },
        { icon: <TrendingUp className="text-green-400" />, label: 'High' },
        { icon: <BarChart3 className="text-yellow-600" />, label: 'Moderate' },
        { icon: <TrendingDown className="text-green-600" />, label: 'Low' },
      ]
    },
    {
      icon: <div className="w-4 h-4 text-[#C5A2F4]">📚</div>,
      title: 'TECH STACK',
      gradient: 'from-[#C5A2F4] via-white to-white',
      options: [
        { label: 'NextJs', icon: '▲' },
        { label: 'TypeScript', icon: 'TS' },
        { label: 'ExpressJs', icon: 'E' },
        { label: 'NodeJs', icon: 'N' },
      ]
    }
  ];

  return (
    <div id="features" className="flex flex-col w-full">
      {/* Header */}
      <div className="px-8 py-10 h-40 relative overflow-hidden border-b border-[#252525] w-full">
        <h4 className="font-medium inset-0 flex items-center justify-center text-3xl lg:text-5xl tracking-tight absolute z-30 text-center text-balance">
          Learning Into an Exciting Journey
        </h4>
        <div className=" h-full w-[100%] right-0 top-0 z-20 absolute" style={{ background: "radial-gradient(circle, rgb(16, 16, 16) 30%, transparent 100%);"}}></div>
        <div className="absolute right-0 w-full h-full top-0 z-10 opacity-50">
          <div className="h-full w-full absolute top-0 right-0">
            <canvas className="pointer-events-none" width="4000" height="400" />
          </div>
        </div>
      </div>

      <div className="w-full border-b border-[#252525] flex flex-col lg:flex-row overflow-hidden">
        {/* Personalized Recommendations */}
        <div className="lg:w-1/3 border-b lg:border-b-0 lg:border-r border-[#252525] lg:aspect-square relative overflow-hidden p-2 flex-shrink-0 h-[400px] lg:h-full">
          <div className="border border-dashed border-[#252525] w-full h-full relative overflow-hidden p-8 flex flex-col gap-4">
            <div className="space-y-1 flex-shrink-0 z-10">
              <h5 className="text-2xl lg:text-3xl tracking-tighter">Personalized Recommendations</h5>
              <p className="text-sm lg:text-lg text-[#d1d1d1]">Get personalized repos you can contribute to.</p>
            </div>
            
            <div className="flex-1 overflow-hidden relative z-10">
              <div className="flex flex-col gap-3 animate-scroll">
                {[...projects, ...projects].map((project, i) => (
                  <div
                    key={i}
                    className="min-h-fit w-full max-w-[400px] mx-auto rounded-2xl p-4 bg-transparent backdrop-blur-md border border-white/10 shadow-[0_-20px_80px_-20px_#ffffff1f_inset] hover:scale-105 transition-transform cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-2xl ${project.color} flex items-center justify-center text-lg`}>
                        {project.logo}
                      </div>
                      <div className="flex flex-col overflow-hidden">
                        <p className="text-sm sm:text-lg font-medium text-white truncate">{project.name}</p>
                        <p className="text-sm text-white/60">{project.company}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <img src="/images/mask.svg" alt="background" className="absolute w-full h-full top-0 left-0 object-cover opacity-60 -z-10" />
            <div className="absolute h-full w-full bg-gradient-to-t from-[#101010]/75 via-transparent to-[#101010]/75 top-0 left-0" />
            <div className="absolute h-full w-full bg-gradient-to-r from-[#101010]/75 via-transparent to-[#101010]/75 top-0 left-0" />
            <div className="h-24 absolute -bottom-7 w-full bg-[#101010] blur-[15px] z-20" />
          </div>
        </div>

        {/* Seamless Search */}
        <div className="lg:w-1/3 border-b lg:border-b-0 lg:border-r border-[#252525] lg:aspect-square relative overflow-hidden p-2 h-[400px] lg:h-full">
          <div className="border border-dashed border-[#252525] w-full h-full relative overflow-hidden p-8 flex flex-col gap-4">
            <div className="w-full z-10">
              <h5 className="text-2xl lg:text-3xl tracking-tighter">Seamless Search</h5>
              <p className="text-sm lg:text-lg text-[#d1d1d1]">Search thousands of open-source repos instantly.</p>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <div className="relative w-[300px] aspect-square">
                {/* Concentric circles */}
                <div className="absolute inset-0 rounded-full border bg-neutral-900/5 backdrop-blur-xl border-white/5 shadow-[0_-20px_80px_-20px_#ffffff1f_inset]" />
                <div className="absolute inset-[45px] rounded-full border border-white/5 backdrop-blur-xl shadow-[0_-20px_80px_-20px_#ffffff1f_inset]" />
                <div className="absolute inset-[90px] rounded-full border border-white/5 backdrop-blur-xl shadow-[0_-20px_80px_-20px_#ffffff1f_inset]" />
                
                <div className="absolute inset-[90px] rounded-full flex items-center justify-center">
                  <p className="text-2xl tracking-tighter font-bold">Opensox AI</p>
                </div>

                {/* Orbiting icons */}
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                  <div className="absolute w-10 h-10 -top-4 left-1/2 -translate-x-1/2 bg-white rounded-xl p-2 animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }}>
                    🎯
                  </div>
                </div>
              </div>
            </div>

            <img src="/images/mask.svg" alt="background" className="absolute w-full h-full top-0 left-0 object-cover opacity-60 -z-10" />
            <div className="absolute h-full w-full bg-gradient-to-t from-[#101010]/75 via-transparent to-[#101010]/75 top-0 left-0" />
          </div>
        </div>

        {/* Precision Filters */}
        <div className="lg:w-1/3 lg:aspect-square relative overflow-hidden p-2 h-[400px] lg:h-full">
          <div className="border border-dashed border-[#252525] w-full h-full relative overflow-hidden p-8 flex flex-col gap-4">
            <div className="w-full z-10">
              <h5 className="text-2xl lg:text-3xl tracking-tighter">Precision Filters</h5>
              <p className="text-sm lg:text-lg text-[#d1d1d1]">Zero in on projects by language, stack and activity level.</p>
            </div>

            <div className="flex-1 flex items-center justify-center relative">
              <div className="relative w-full max-w-md h-[200px]">
                {filters.map((filter, idx) => (
                  <div
                    key={idx}
                    className="absolute w-full bg-[#111111] border border-[#292929] rounded-[2.5rem] p-6 shadow-[0_-20px_80px_-20px_#ffffff1f_inset] cursor-pointer transition-all duration-300"
                    style={{
                      top: `${-idx * 10}px`,
                      left: '50%',
                      transform: `translateX(-50%) scale(${1 - idx * 0.1})`,
                      zIndex: 3 - idx,
                      maxHeight: '110px'
                    }}
                    onClick={() => setActiveFilter(idx)}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-1">
                        {filter.icon}
                        <div className={`bg-gradient-to-r ${filter.gradient} bg-clip-text`}>
                          <p className="text-transparent font-semibold text-sm">Filter By: {filter.title}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {filter.options.map((opt, i) => (
                          <button
                            key={i}
                            className="inline-flex items-center gap-1.5 px-2 py-1 text-xs bg-[#1a1a1a] border border-[#282828] rounded-lg hover:border-white/20 transition-colors"
                          >
                            {opt.icon}
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <img src="/images/mask.svg" alt="background" className="absolute w-full h-full top-0 left-0 object-cover opacity-60 -z-10" />
            <div className="absolute h-full w-full bg-gradient-to-t from-[#101010]/75 via-transparent to-[#101010]/75 top-0 left-0" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </div>
  );
}