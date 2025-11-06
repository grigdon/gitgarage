import { useState } from 'react';
import { Car, Lock, Mail, User, AlertCircle, CheckCircle } from 'lucide-react';

export default function AuthPage() {
  const [step, setStep] = useState('email'); // 'email' | 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [vin, setVin] = useState('');
  const [vinOptional, setVinOptional] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [vinInfo, setVinInfo] = useState(null);

  // Simulate checking if user exists
  const checkEmail = async () => {
    if (!email) return;
    
    setLoading(true);
    setError('');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // For demo: emails with "existing" go to login, others to signup
    const userExists = email.toLowerCase().includes('existing');
    
    setStep(userExists ? 'login' : 'signup');
    setLoading(false);
  };

  // Decode VIN (simplified demo)
  const decodeVin = (vinValue) => {
    setVin(vinValue.toUpperCase());
    
    // Real implementation would call NHTSA API or similar
    if (vinValue.length === 17) {
      // Demo: parse fake VIN info
      setVinInfo({
        year: '2020',
        make: 'Honda',
        model: 'Civic',
        trim: 'EX'
      });
    } else {
      setVinInfo(null);
    }
  };

  const handleAuth = async () => {
    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (step === 'signup' && !vinOptional && vin.length !== 17 && vin.length > 0) {
        setError('Please enter a valid 17-character VIN or skip this step');
        setLoading(false);
        return;
      }

      // Success! In real app, redirect to dashboard
      alert(`${step === 'login' ? 'Login' : 'Signup'} successful!${step === 'signup' && vin ? '\nCar created from VIN: ' + vin : ''}`);
      
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetFlow = () => {
    setStep('email');
    setEmail('');
    setPassword('');
    setName('');
    setVin('');
    setVinInfo(null);
    setError('');
  };

  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') {
      action();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-xl mb-4">
            <Car className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">GitGarage</h1>
          <p className="text-slate-400">Track your car maintenance like a pro</p>
        </div>

        {/* Auth Card */}
        <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700">
          {/* Step 1: Email Entry */}
          {step === 'email' && (
            <div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, checkEmail)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="you@example.com"
                    autoFocus
                  />
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  We'll check if you have an account
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-300">{error}</p>
                </div>
              )}

              <button
                onClick={checkEmail}
                disabled={loading || !email}
                className="w-full py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-600 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                {loading ? 'Checking...' : 'Continue'}
              </button>
            </div>
          )}

          {/* Step 2a: Login */}
          {step === 'login' && (
            <div>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-slate-300">
                    Email
                  </label>
                  <button
                    type="button"
                    onClick={resetFlow}
                    className="text-xs text-blue-400 hover:text-blue-300"
                  >
                    Change
                  </button>
                </div>
                <div className="px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-slate-300">
                  {email}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, handleAuth)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your password"
                    autoFocus
                  />
                </div>
                <div className="mt-2 text-right">
                  <button className="text-xs text-blue-400 hover:text-blue-300">
                    Forgot password?
                  </button>
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-300">{error}</p>
                </div>
              )}

              <button
                onClick={handleAuth}
                disabled={loading || !password}
                className="w-full py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-600 text-white font-medium rounded-lg transition-colors duration-200"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </div>
          )}

          {/* Step 2b: Signup */}
          {step === 'signup' && (
            <div>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-slate-300">
                    Email
                  </label>
                  <button
                    type="button"
                    onClick={resetFlow}
                    className="text-xs text-blue-400 hover:text-blue-300"
                  >
                    Change
                  </button>
                </div>
                <div className="px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-slate-300">
                  {email}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Doe"
                    autoFocus
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Create a password (min. 8 characters)"
                    minLength={8}
                  />
                </div>
              </div>

              {/* VIN Input */}
              <div className="mb-6 p-4 bg-slate-900/50 border border-slate-600 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-slate-300">
                    Vehicle VIN {!vinOptional && '(Optional)'}
                  </label>
                  {!vinOptional && (
                    <button
                      type="button"
                      onClick={() => setVinOptional(true)}
                      className="text-xs text-slate-400 hover:text-slate-300"
                    >
                      Skip for now
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={vin}
                    onChange={(e) => decodeVin(e.target.value)}
                    maxLength={17}
                    className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                    placeholder="1HGBH41JXMN109186"
                    disabled={vinOptional}
                  />
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  We'll automatically set up your car profile
                </p>
                
                {vinInfo && (
                  <div className="mt-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="text-green-300 font-medium">
                        {vinInfo.year} {vinInfo.make} {vinInfo.model} {vinInfo.trim}
                      </p>
                      <p className="text-green-400/70 text-xs mt-1">VIN decoded successfully</p>
                    </div>
                  </div>
                )}
                
                {vin.length > 0 && vin.length < 17 && (
                  <p className="mt-2 text-xs text-amber-400">
                    {17 - vin.length} characters remaining
                  </p>
                )}
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-300">{error}</p>
                </div>
              )}

              <button
                onClick={handleAuth}
                disabled={loading || !name || !password || password.length < 8}
                className="w-full py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-600 text-white font-medium rounded-lg transition-colors duration-200"
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>

              <p className="mt-4 text-xs text-center text-slate-500">
                By signing up, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          )}
        </div>

        {/* Demo hint */}
        <div className="mt-6 text-center text-sm text-slate-500">
          <p>Demo: Use any email to test signup</p>
          <p className="text-xs mt-1">Include "existing" in email to test login flow</p>
        </div>
      </div>
    </div>
  );
}