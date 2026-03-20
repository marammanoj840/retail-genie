import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const url = isLogin ? '/api/auth/login' : '/api/auth';
    const payload = isLogin ? { email, password } : { name, email, password };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      localStorage.setItem('retailGenieUser', JSON.stringify(data));
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface selection:bg-primary/20 flex flex-col">
      {/* Header omitted for brevity in chunk but remains in file */}
      
      {isLogin ? (
        <main className="min-h-screen flex flex-col md:flex-row items-stretch overflow-hidden">
          {/* ...Hero Side... */}
          <section className="hidden md:flex md:w-1/2 relative overflow-hidden bg-surface-container-low items-center justify-center p-12">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent pointer-events-none"></div>
            <div className="z-10 max-w-lg">
              <h1 className="text-6xl font-extrabold font-headline tracking-tighter leading-none mb-8">
                Elevate your <br/>
                <span className="bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">Digital Lifestyle</span>
              </h1>
              <p className="text-xl text-on-surface-variant font-body leading-relaxed mb-10">
                Experience the future of retail with an AI assistant designed to curate clarity out of complexity.
              </p>
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-primary">auto_awesome</span>
                </div>
                <span className="font-label text-on-surface-variant font-semibold">Join 50k+ curated shoppers.</span>
              </div>
            </div>
          </section>

          {/* Right: Auth Content Side */}
          <section className="flex-1 flex flex-col items-center justify-center px-6 py-20 bg-surface">
            <div className="w-full max-w-[420px] space-y-10">
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold font-headline mb-2">Welcome back</h2>
                <p className="text-on-surface-variant">Please enter your details to sign in.</p>
              </div>

              {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-100 animate-in fade-in slide-in-from-top-2 duration-300">
                  {error}
                </div>
              )}

              <form className="space-y-6" onSubmit={handleAuth}>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-on-surface-variant px-1" htmlFor="email">Email address</label>
                  <input 
                    className="w-full px-6 py-4 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-on-surface placeholder:text-outline/50 outline-none" 
                    id="email" 
                    placeholder="alex@retailgenie.com" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between px-1">
                    <label className="text-sm font-semibold text-on-surface-variant" htmlFor="password">Password</label>
                    <a className="text-sm font-medium text-primary hover:text-secondary transition-colors" href="#">Forgot password?</a>
                  </div>
                  <input 
                    className="w-full px-6 py-4 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-on-surface placeholder:text-outline/50 outline-none" 
                    id="password" 
                    placeholder="••••••••" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button 
                  className="w-full py-4 bg-gradient-to-br from-primary to-secondary text-white font-bold rounded-xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50" 
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Authenticating...' : 'Sign In'}
                </button>
              </form>
              <div className="relative flex items-center gap-4">
                <div className="h-[1px] flex-1 bg-surface-container-highest"></div>
                <span className="text-xs font-bold text-outline uppercase tracking-widest">Or continue with</span>
                <div className="h-[1px] flex-1 bg-surface-container-highest"></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 py-4 bg-surface-container-lowest hover:bg-surface-container-high transition-colors rounded-xl font-semibold border border-outline-variant/15">
                  <img alt="Google" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuChgLaeF8pGd7nYbSj4tBT1fO2Z2Squpr8hgTZZzSeUpgD8Pex0f5ypiLCzrq4KeBkB8J90l8R4hUZ7cpceXUs2H9RJ8trw-VOF9dVUYpgBSw7fKQx4VPNlQD_wYet736OZy_6jzIS_vl5BqxBeiRnOecu-kH6bLG_RDoETTW7zbJdjH93wOJWGvGR7s9uiOFAtdqu7ICV0JIO-PlqMBeiZqepCNXxlOeZtCRo_ObobKKPFe3KV4eS2OOmzm7od5jOlram3qLOPS2Vi"/>
                  <span>Google</span>
                </button>
                <button className="flex items-center justify-center gap-2 py-4 bg-surface-container-lowest hover:bg-surface-container-high transition-colors rounded-xl font-semibold border border-outline-variant/15">
                  <span className="material-symbols-outlined text-lg" style={{fontVariationSettings: "'FILL' 1"}}>ios</span>
                  <span>Apple</span>
                </button>
              </div>
              <p className="text-center text-on-surface-variant">
                Don't have an account? 
                <button onClick={() => { setIsLogin(false); setError(''); }} className="text-primary font-bold hover:underline ml-1">Create Account</button>
              </p>
            </div>
          </section>
        </main>
      ) : (
        <main className="min-h-screen flex flex-col md:flex-row items-stretch overflow-hidden">
          {/* Left: Artistic/Hero Side (Desktop) */}
          <section className="hidden md:flex md:w-1/2 relative overflow-hidden bg-surface-container-low items-center justify-center p-12">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent pointer-events-none"></div>
            <div className="z-10 max-w-lg">
              <h1 className="text-6xl font-extrabold font-headline tracking-tighter leading-none mb-8">
                Elevate your <br/>
                <span className="bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">Digital Lifestyle</span>
              </h1>
              <p className="text-xl text-on-surface-variant font-body leading-relaxed mb-10">
                Experience the future of retail with an AI assistant designed to curate clarity out of complexity.
              </p>
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-primary">auto_awesome</span>
                </div>
                <span className="font-label text-on-surface-variant font-semibold">Join 50k+ curated shoppers.</span>
              </div>
            </div>
          </section>

          {/* Right: Signup Content side */}
          <section className="flex-1 flex flex-col items-center justify-center px-6 py-20 bg-surface">
            <div className="w-full max-w-[420px] space-y-8">
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold font-headline mb-2">Create an account</h2>
                <p className="text-on-surface-variant">Join our curated intelligence ecosystem.</p>
              </div>

              {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-100 animate-in fade-in slide-in-from-top-2 duration-300">
                  {error}
                </div>
              )}

              <form className="space-y-4" onSubmit={handleAuth}>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-on-surface-variant px-1">Full Name</label>
                  <input 
                    className="w-full px-6 py-4 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-on-surface outline-none" 
                    placeholder="Alex Rivera" 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-on-surface-variant px-1">Email address</label>
                  <input 
                    className="w-full px-6 py-4 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-on-surface outline-none" 
                    placeholder="alex@retailgenie.com" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-on-surface-variant px-1">Password</label>
                    <input 
                      className="w-full px-6 py-4 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-on-surface outline-none" 
                      placeholder="••••••••" 
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-on-surface-variant px-1">Confirm</label>
                    <input className="w-full px-6 py-4 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-on-surface outline-none" placeholder="••••••••" type="password" required/>
                  </div>
                </div>
                <button 
                  className="w-full py-4 bg-gradient-to-br from-primary to-secondary text-white font-bold rounded-xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 mt-4 disabled:opacity-50" 
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Creating Account...' : 'Get Started'}
                </button>
              </form>
              <div className="relative flex items-center gap-4 py-4">
                <div className="h-[1px] flex-1 bg-surface-container-highest"></div>
                <span className="text-xs font-bold text-outline uppercase tracking-widest">Fast Track</span>
                <div className="h-[1px] flex-1 bg-surface-container-highest"></div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <button className="flex items-center justify-center gap-2 py-4 bg-surface-container-lowest hover:bg-surface-container-high transition-colors rounded-xl font-semibold border border-outline-variant/15">
                  <img alt="Google" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3_jak7v9hATAKsUvXGlZyZwEXP0wYtQ3zVrT7GRO0Gb2elV--T8SjrujFir4ZsbK57MJ4BRbgyzrPz5V581Wj2PuUGwHO9Yg1wogtgM0uBHG7fNvgO1ISNOGwKidhZRygvnoGYV1JuBA3jqocnpb_Fjeo0pOZEGrieJhq5p0sf860pvbeSxk6yqKZGMk9ZDnTIjG5QrMLPwpOpm7I7GOLixSAFnEkGC0kXil72xExbrEopEHAPS68A03SXxugqR9m1tc1r2-SrmPR"/>
                  <span>Continue with Google</span>
                </button>
              </div>
              <p className="text-center text-on-surface-variant">
                Already have an account? 
                <button onClick={() => { setIsLogin(true); setError(''); }} className="text-primary font-bold hover:underline ml-1">Log in</button>
              </p>
            </div>
          </section>
        </main>
      )}
    </div>
  );
}
