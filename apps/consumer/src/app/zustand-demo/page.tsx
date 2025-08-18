import { AuthGate, ZustandDemo } from '@fsi/ui';

export default function ZustandDemoPage() {
  return (
    <AuthGate>
      <ZustandDemo />
    </AuthGate>
  );
}
