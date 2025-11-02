import React, { useState, useEffect } from 'react';
import {
  Send, DollarSign, Users, Briefcase, CheckCircle, Clock,
  MessageSquare, Instagram, Award, TrendingUp
} from 'lucide-react';

const ls = {
  get(key, fallback) { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; } },
  set(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} }
};

const NextArcStudio = () => {
  const [jobs, setJobs] = useState([]);
  const [activeTab, setActiveTab] = useState('home');
  const [showSuccess, setShowSuccess] = useState(false);
  const [stats, setStats] = useState({ totalJobs: 0, athletesHelped: 0, completedDeals: 0, followers: 3 });
  const [formData, setFormData] = useState({
    athleteName: '', sport: '', serviceType: '', description: '',
    budget: '', deadline: '', email: '', instagramHandle: ''
  });

  useEffect(() => {
    setJobs(ls.get('nextarc-jobs', []));
    const s = ls.get('nextarc-stats', null);
    if (s) setStats(prev => ({ ...prev, ...s }));
  }, []);

  const saveJobs = (j) => { ls.set('nextarc-jobs', j); setJobs(j); };
  const saveStats = (s) => { ls.set('nextarc-stats', s); setStats(s); };

  const notifyDiscordViaServer = async (job) => {
    const fd = new FormData();
    Object.entries(job).forEach(([k, v]) => fd.append(k, String(v ?? '')));
    const res = await fetch('/api/submit', { method: 'POST', body: fd });
    if (!res.ok) throw new Error(await res.text());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.athleteName || !formData.sport || !formData.serviceType || !formData.email) {
      alert('Please fill name, sport, service and email.'); return;
    }
    const newJob = {
      id: Date.now(),
      ...formData,
      status: 'open',
      offers: [],
      createdAt: new Date().toISOString()
    };
    try {
      await notifyDiscordViaServer(newJob);
      const updated = [...jobs, newJob];
      saveJobs(updated);
      saveStats({ ...stats, totalJobs: stats.totalJobs + 1, athletesHelped: stats.athletesHelped + 1 });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setFormData({ athleteName: '', sport: '', serviceType: '', description: '', budget: '', deadline: '', email: '', instagramHandle: '' });
      setActiveTab('browse');
    } catch (err) {
      alert('Submit failed: ' + (err?.message || 'Network error'));
    }
  };

  const makeOffer = async (jobId) => {
    const name = prompt('Your name:');
    const amount = prompt('Your price ($):');
    const msg = prompt('Quick pitch:');
    if (name && amount && msg) {
      const updated = jobs.map(j =>
        j.id === jobId
          ? { ...j, offers: [...(j.offers || []), { id: Date.now(), creatorName: name, amount, message: msg, timestamp: new Date().toISOString() }] }
          : j
      );
      saveJobs(updated);
      alert('Offer sent! 🎯');
    }
  };

  const acceptOffer = async (jobId, offerId) => {
    if (!window.confirm('Accept this offer?')) return;
    const job = jobs.find(j => j.id === jobId);
    const offer = job?.offers?.find(o => o.id === offerId);
    if (!offer) return;
    const fee = (parseFloat(offer.amount) * 0.08).toFixed(2);
    const total = (parseFloat(offer.amount) + parseFloat(fee)).toFixed(2);
    alert(`Ready to pay:\n\nCreator: $${offer.amount}\nFee: $${fee}\nTotal: $${total}`);
    const updated = jobs.map(j => j.id === jobId ? { ...j, status: 'in-progress', acceptedOffer: offerId } : j);
    saveJobs(updated);
    saveStats({ ...stats, completedDeals: stats.completedDeals + 1 });
  };

  const completeJob = async (jobId) => {
    if (!window.confirm('Mark as done?')) return;
    const updated = jobs.map(j => j.id === jobId ? { ...j, status: 'completed' } : j);
    saveJobs(updated);
    alert('Done! Payment released 💰');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <header className="bg-slate-950/80 backdrop-blur-lg border-b border-slate-800/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/assets/logo.png" alt="NextArc" className="w-10 h-10 sm:w-12 sm:h-12" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">NextArc Studio</h1>
                <p className="text-xs sm:text-sm text-slate-400 hidden sm:block">Where athletes and creators connect</p>
              </div>
            </div>
            <a
              href="https://discord.gg/NCYbWRjrU"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold transition-all flex items-center gap-2 border border-slate-700 text-sm"
            >
              <Instagram className="w-4 h-4 sm:w-5 sm:h-5" /><span className="hidden sm:inline">Join Room</span>
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
        <div className="flex gap-3 sm:gap-4 justify-center flex-wrap px-4">
          <button onClick={() => setActiveTab('home')} className={"px-3 py-2 rounded-lg border " + (activeTab==='home'?'border-slate-500 text-slate-200':'border-slate-800 text-slate-400')}>
            🏠
          </button>
          <button onClick={() => setActiveTab('post')} className={"px-3 py-2 rounded-lg border " + (activeTab==='post'?'border-slate-500 text-slate-200':'border-slate-800 text-slate-400')}>
            Post
          </button>
          <button onClick={() => setActiveTab('browse')} className={"px-3 py-2 rounded-lg border " + (activeTab==='browse'?'border-slate-500 text-slate-200':'border-slate-800 text-slate-400')}>
            Browse
          </button>
          <button onClick={() => setActiveTab('my-jobs')} className={"px-3 py-2 rounded-lg border " + (activeTab==='my-jobs'?'border-slate-500 text-slate-200':'border-slate-800 text-slate-400')}>
            My Stuff
          </button>
        </div>
      </div>

      {activeTab === 'home' && (
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 py-12 sm:py-20 text-center">
            <div className="mb-6 sm:mb-8">
              <span className="bg-slate-800/50 text-slate-300 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold border border-slate-700/50">
                For athletes who want to level up 🚀
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Get Your Content<br />
              <span className="bg-gradient-to-r from-slate-300 to-slate-500 bg-clip-text text-transparent">Made By Pros</span>
            </h1>
            <p className="text-base sm:text-xl text-slate-400 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Post what you need, get offers, pick the best one. Simple.
            </p>
            <div className="max-w-7xl mx-auto px-4 pb-8 sm:pb-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                {[
                  { icon: Instagram, value: stats.followers, label: 'Followers' },
                  { icon: Award, value: stats.athletesHelped, label: 'Athletes' },
                  { icon: Briefcase, value: stats.totalJobs, label: 'Projects' },
                  { icon: TrendingUp, value: stats.completedDeals, label: 'Completed' }
                ].map((stat, i) => (
                  <div key={i} className="bg-slate-900/50 backdrop-blur rounded-xl border border-slate-800/50 p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                      <stat.icon className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" />
                      <div className="text-center sm:text-left">
                        <p className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</p>
                        <p className="text-xs sm:text-sm text-slate-500">{stat.label}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 pb-8">
        {showSuccess && (
          <div className="mb-4 sm:mb-6 bg-emerald-950/50 border border-emerald-800/50 rounded-lg p-4 flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0" />
            <div>
              <p className="font-semibold text-emerald-300 text-sm sm:text-base">Posted!</p>
              <p className="text-xs sm:text-sm text-emerald-400">Creators notified on Discord 🔥</p>
            </div>
          </div>
        )}

        {activeTab === 'post' && (
          <div className="bg-slate-950/80 backdrop-blur-lg rounded-xl border border-slate-800/50 shadow-2xl mb-6 p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">What do you need?</h2>
            <p className="text-sm sm:text-base text-slate-400 mb-4 sm:mb-6">Tell us about your project</p>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Your name</label>
                  <input type="text" value={formData.athleteName} onChange={(e) => setFormData({ ...formData, athleteName: e.target.value })}
                    className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-slate-900/50 border border-slate-800 rounded-lg text-white placeholder-slate-500 text-sm sm:text-base" placeholder="Your name" required/>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Instagram (optional)</label>
                  <input type="text" value={formData.instagramHandle} onChange={(e) => setFormData({ ...formData, instagramHandle: e.target.value })}
                    className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-slate-900/50 border border-slate-800 rounded-lg text-white placeholder-slate-500 text-sm sm:text-base" placeholder="@yourhandle"/>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Your sport</label>
                  <select value={formData.sport} onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
                    className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-slate-900/50 border border-slate-800 rounded-lg text-white text-sm sm:text-base" required>
                    <option value="">Pick one</option>
                    {['Football','Basketball','Volleyball','Soccer','Hockey','Track & Field','Swimming','Tennis','Golf','MMA','Other'].map(s => <option key={s} value={s} className="bg-slate-900">{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">What you need</label>
                  <select value={formData.serviceType} onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-slate-900/50 border border-slate-800 rounded-lg text-white text-sm sm:text-base" required>
                    <option value="">Select</option>
                    {['Highlight Reel','Video Editing','Graphic Design','Social Templates','Photography','Logo/Branding','Website','Other'].map(s => <option key={s} value={s} className="bg-slate-900">{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Email</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-slate-900/50 border border-slate-800 rounded-lg text-white placeholder-slate-500 text-sm sm:text-base" placeholder="your@email.com" required/>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Budget</label>
                  <input type="text" value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-slate-900/50 border border-slate-800 rounded-lg text-white placeholder-slate-500 text-sm sm:text-base" placeholder="$50–200" required/>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">When you need it</label>
                  <input type="date" value={formData.deadline} onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-slate-900/50 border border-slate-800 rounded-lg text-white text-sm sm:text-base" required/>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Tell us more</label>
                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={4}
                  className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-slate-900/50 border border-slate-800 rounded-lg text-white placeholder-slate-500 text-sm sm:text-base"
                  placeholder="What's the vibe? Style, references, links…" required/>
              </div>
              <button type="submit" className="w-full bg-slate-200 hover:bg-white text-slate-900 font-semibold py-3 sm:py-4 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg text-sm sm:text-base">
                <Send className="w-4 h-4 sm:w-5 sm:h-5" /> Post it
              </button>
            </form>
          </div>
        )}

        {activeTab === 'browse' && (
          <div className="bg-slate-950/80 backdrop-blur-lg rounded-xl border border-slate-800/50 shadow-2xl mb-6 p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Open projects</h2>
            <p className="text-sm sm:text-base text-slate-400 mb-4 sm:mb-6">Make an offer on projects you can help with</p>
            <div className="space-y-4">
              {jobs.filter(j => j.status === 'open').length === 0 ? (
                <div className="text-center py-12 bg-slate-900/30 rounded-lg border border-slate-800">
                  <Briefcase className="w-12 h-12 sm:w-16 sm:h-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-sm sm:text-base text-slate-400">Nothing posted yet</p>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">Check back soon!</p>
                </div>
              ) : (
                jobs.filter(j => j.status === 'open').map(job => (
                  <div key={job.id} className="bg-slate-900/30 border border-slate-800 rounded-lg p-4 sm:p-6 hover:bg-slate-900/50 transition-all">
                    <div className="flex justify-between items-start mb-3 sm:mb-4">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-white">{job.serviceType}</h3>
                        <p className="text-xs sm:text-sm text-slate-400">{job.athleteName} • {job.sport}</p>
                      </div>
                      <span className="bg-emerald-950/50 text-emerald-400 text-xs font-semibold px-2 sm:px-3 py-1 rounded-full border border-emerald-800 whitespace-nowrap">OPEN</span>
                    </div>
                    <p className="text-sm sm:text-base text-slate-300 mb-3 sm:mb-4">{job.description}</p>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <div className="flex items-center gap-2 text-xs sm:text-sm">
                        <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-slate-500" />
                        <span className="text-slate-400">{job.budget}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs sm:text-sm">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-slate-500" />
                        <span className="text-slate-400">{new Date(job.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-slate-800">
                      <span className="text-xs sm:text-sm text-slate-500">{job.offers?.length || 0} offers</span>
                      <button onClick={() => makeOffer(job.id)}
                        className="bg-slate-200 hover:bg-white text-slate-900 px-4 py-2 sm:px-6 sm:py-2 rounded-lg font-semibold transition-all text-xs sm:text-sm">
                        Make offer
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'my-jobs' && (
          <div className="bg-slate-950/80 backdrop-blur-lg rounded-xl border border-slate-800/50 shadow-2xl mb-6 p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Your projects</h2>
            <p className="text-sm sm:text-base text-slate-400 mb-4 sm:mb-6">Track everything here</p>

            <div className="space-y-4 sm:space-y-6">
              {jobs.length === 0 ? (
                <div className="text-center py-12 bg-slate-900/30 rounded-lg border border-slate-800">
                  <MessageSquare className="w-12 h-12 sm:w-16 sm:h-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-sm sm:text-base text-slate-400">Nothing yet</p>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">Post your first project!</p>
                </div>
              ) : (
                jobs.map(job => (
                  <div key={job.id} className="bg-slate-900/30 border border-slate-800 rounded-lg p-4 sm:p-6">
                    <div className="flex justify-between items-start mb-3 sm:mb-4">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-white">{job.serviceType}</h3>
                        <p className="text-xs sm:text-sm text-slate-400">{job.athleteName}</p>
                      </div>
                      <span className={
                        'text-xs font-semibold px-2 sm:px-3 py-1 rounded-full border whitespace-nowrap ' +
                        (job.status === 'open'
                          ? 'bg-emerald-950/50 text-emerald-400 border-emerald-800'
                          : job.status === 'in-progress'
                            ? 'bg-blue-950/50 text-blue-400 border-blue-800'
                            : 'bg-slate-800 text-slate-400 border-slate-700')
                      }>
                        {job.status === 'in-progress' ? 'WORKING' : job.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-slate-300 mb-3 sm:mb-4">{job.description}</p>

                    {job.offers && job.offers.length > 0 && (
                      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-800">
                        <h4 className="font-semibold text-white mb-3 text-sm sm:text-base">Offers ({job.offers.length})</h4>
                        {job.offers.map(offer => (
                          <div key={offer.id} className={
                            'p-3 sm:p-4 rounded-lg mb-3 ' +
                            (job.acceptedOffer === offer.id ? 'bg-emerald-950/30 border-2 border-emerald-800' : 'bg-slate-900/50')
                          }>
                            <div className="flex justify-between mb-2">
                              <p className="font-semibold text-white text-sm sm:text-base">{offer.creatorName}</p>
                              <p className="text-base sm:text-lg font-bold text-slate-300">${offer.amount}</p>
                            </div>
                            <p className="text-slate-400 text-xs sm:text-sm mb-3">{offer.message}</p>
                            {job.status === 'open' && !job.acceptedOffer && (
                              <button onClick={() => acceptOffer(job.id, offer.id)}
                                className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all">
                                Accept this
                              </button>
                            )}
                            {job.acceptedOffer === offer.id && job.status === 'in-progress' && (
                              <div className="flex flex-col sm:flex-row gap-2">
                                <span className="text-emerald-400 text-xs sm:text-sm font-semibold">✓ Accepted</span>
                                <button onClick={() => completeJob(job.id)}
                                  className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all">
                                  Mark done
                                </button>
                              </div>
                            )}
                            {job.acceptedOffer === offer.id && job.status === 'completed' && (
                              <span className="text-emerald-400 text-xs sm:text-sm font-semibold">✓ Completed</span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NextArcStudio;
