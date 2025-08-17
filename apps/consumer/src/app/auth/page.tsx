'use client';

import { Button } from '@fsi/ui';
import { signInWithGoogle } from '@config/auth';

export default function AuthPage() {
  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center py-20 space-y-6'>
      <h1 className='text-3xl font-bold'>Sign In</h1>
      <Button onClick={handleSignIn}>Continue with Google</Button>
    </div>
  );
}
