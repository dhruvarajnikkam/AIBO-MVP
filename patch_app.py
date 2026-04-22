import sys

with open('/workspaces/AIBO-MVP/temp_extract/src/App.tsx', 'r') as f:
    content = f.read()

# 1. Imports
imports_idx = content.find("import Header")
imports_to_add = """import { LogIn } from 'lucide-react';
import { isSupabaseConfigured, supabase } from './lib/supabase';
import type { User } from '@supabase/supabase-js';
"""
content = content[:imports_idx] + imports_to_add + content[imports_idx:]

# 2. State
state_idx = content.find("export default function App() {\n") + len("export default function App() {\n")
state_to_add = """  const [authUser, setAuthUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
"""
content = content[:state_idx] + state_to_add + content[state_idx:]

# 3. Auth Effects and Handlers
# Place it right after the first `useState`
first_use_effect_idx = content.find("  // Charging Regeneration Logic")
hooks_to_add = """  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setAuthUser(data.session?.user ?? null);
      setAuthLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthUser(session?.user ?? null);
      setAuthLoading(false);
    });

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleGoogleSignIn = async () => {
    soundManager.play('click');

    if (!isSupabaseConfigured) {
      alert('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local at the project root and restart Vite.');
      return;
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      console.error('Google sign-in failed', error);
      alert('Google sign-in failed. Check your Supabase auth setup.');
    }
  };

  const handleGuestSignIn = () => {
    soundManager.play('click');
    setAuthUser({
      id: 'guest-user',
      app_metadata: {},
      user_metadata: { name: 'Guest Explorer' },
      aud: 'authenticated',
      created_at: new Date().toISOString(),
    } as unknown as User);
  };

"""
content = content[:first_use_effect_idx] + hooks_to_add + content[first_use_effect_idx:]

# 5. handleLessonSelect auth block
lesson_select_idx = content.find("  const handleLessonSelect = (lessonId: string) => {\n") + len("  const handleLessonSelect = (lessonId: string) => {\n")
auth_check_to_add = """    if (!authUser) {
      alert('Please sign in first.');
      return;
    }
"""
content = content[:lesson_select_idx] + auth_check_to_add + content[lesson_select_idx:]


# 6. JSX Login screen block
jsx_start_idx = content.find('      <div className="relative w-full max-w-[430px] h-[844px] bg-white overflow-hidden flex flex-col mx-auto shadow-sm">\n') + len('      <div className="relative w-full max-w-[430px] h-[844px] bg-white overflow-hidden flex flex-col mx-auto shadow-sm">\n')

login_jsx = """        {!authUser && !authLoading && (
          <div className="absolute inset-0 z-[700] bg-gradient-to-br from-aibo-blue-50 via-white to-aibo-red-50 flex items-center justify-center p-6">
            <div className="w-full max-w-sm rounded-3xl bg-white/95 backdrop-blur border border-white shadow-2xl p-8 text-center space-y-6">
              <div className="space-y-3">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-aibo-blue-100 flex items-center justify-center">
                  <User className="w-8 h-8 text-aibo-blue-500" />
                </div>
                <div>
                  <h1 className="text-3xl font-display font-black text-gray-700">Sign in to continue</h1>
                  <p className="text-sm text-gray-500 font-medium">Use Google so your profile stats save to Supabase.</p>
                </div>
              </div>

              <button
                onClick={handleGoogleSignIn}
                className="w-full inline-flex items-center justify-center gap-3 rounded-2xl bg-black text-white px-5 py-4 font-black shadow-lg active:scale-[0.99] transition-transform"
              >
                <LogIn className="w-5 h-5" />
                Sign in with Google
              </button>

              <button
                onClick={handleGuestSignIn}
                className="w-full inline-flex items-center justify-center gap-3 rounded-2xl bg-gray-100 text-gray-700 px-5 py-4 font-black shadow-md mt-4 active:scale-[0.99] transition-transform"
              >
                <User className="w-5 h-5" />
                Play as Guest
              </button>
            </div>
          </div>
        )}
"""
content = content[:jsx_start_idx] + login_jsx + content[jsx_start_idx:]

# 7. Add authUser.id to LessonSession prop
lesson_session_idx = content.find("              <LessonSession \n")
if lesson_session_idx != -1:
    session_prop_target = content.find("performance={userPerformance}", lesson_session_idx) + len("performance={userPerformance}\n")
    content = content[:session_prop_target] + "                userId={authUser?.id}\n" + content[session_prop_target:]

with open('/workspaces/AIBO-MVP/aibo---playful-ai-learning/src/App.tsx', 'w') as f:
    f.write(content)

