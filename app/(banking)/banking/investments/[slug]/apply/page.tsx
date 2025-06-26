/* app/(banking)/banking/investments/[slug]/apply/page.tsx */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import ApplyStepper from '@/components/Investments/ApplyStepper';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';

const labels = ['Details', 'Amount', 'Questions', 'Terms'];

export default function ApplyPage({
  params,
}: {
  params: { slug: string };
}) {
  const router = useRouter();
  const { user } = useUser();

  /* -------- state for each step -------- */
  const [step, setStep] = useState(0);
  const [amount, setAmount] = useState('');
  const [risk, setRisk] = useState('');
  const [experience, setExperience] = useState('');
  const [goal, setGoal] = useState('');
  const [horizon, setHorizon] = useState('');
  const [agree, setAgree] = useState(false);

  function next() {
    if (step < 3) setStep(step + 1);
  }
  function back() {
    if (step > 0) setStep(step - 1);
  }

  async function submit() {
    await fetch('/api/investments/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user?.id,
        slug: params.slug,
        amount: +amount,
        currency: 'ZAR',          // or pull from investment details
        risk,
        experience,
        goal,
        horizon,
        name: user?.firstName,
        surname: user?.lastName,
        email: user?.emailAddresses[0]?.emailAddress,
        phone: user?.primaryPhoneNumber?.phoneNumber,
        notes: '',
      }),
    });
    router.push('/banking/investments');
  }


  return (
    <div className="max-w-lg mx-auto px-4 py-10 space-y-8">
      <h1 className="text-center text-xl font-semibold mb-4">
        Apply – {params.slug.replace(/-/g, ' ')}
      </h1>

      <ApplyStepper step={step} labels={labels} />

      {/* ---------- STEP CONTENT ---------- */}
      {step === 0 && (
        <div className="space-y-4">
          <Input
            disabled
            defaultValue={user?.firstName ?? ''}
            placeholder="Name"
          />
          <Input
            disabled
            defaultValue={user?.lastName ?? ''}
            placeholder="Surname"
          />
          <Input
            disabled
            defaultValue={user?.primaryPhoneNumber?.phoneNumber ?? ''}
            placeholder="Phone"
          />
          <Input
            disabled
            defaultValue={user?.emailAddresses[0]?.emailAddress ?? ''}
            placeholder="Email"
          />
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <p className="text-sm text-neutral-600">
            Available balance: <strong>ZAR 2 134.98</strong>
          </p>
          <Input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <Question
            label="Your investment experience"
            value={experience}
            onChange={setExperience}
            options={[
              'New to investing',
              'Some experience',
              'Experienced investor',
            ]}
          />
          <Question
            label="Your risk tolerance"
            value={risk}
            onChange={setRisk}
            options={['Low', 'Moderate', 'High']}
          />
          <Question
            label="Primary goal"
            value={goal}
            onChange={setGoal}
            options={[
              'Preserve capital',
              'Generate income',
              'Substantial growth',
            ]}
          />
          <Question
            label="Planned holding period"
            value={horizon}
            onChange={setHorizon}
            options={['<2 years', '2-5 years', '>5 years']}
          />
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <p className="text-sm leading-relaxed">
            By investing you confirm you have read and agree to the&nbsp;
            <a href="#" className="underline">
              Terms & Conditions
            </a>
            .
          </p>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox
              checked={agree}
              onCheckedChange={(v) => setAgree(v === true)}
            />{' '}
            I agree
          </label>
        </div>
      )}

      {/* ---------- ACTIONS ---------- */}
      <div className="flex justify-between mt-8">
        {step > 0 && (
          <Button variant="ghost" onClick={back}>
            Back
          </Button>
        )}
        {step < 3 && (
          <Button onClick={next} disabled={step === 1 && !amount}>
            Next
          </Button>
        )}
        {step === 3 && (
          <Button
            disabled={!agree}
            onClick={submit}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white"
          >
            Submit
          </Button>
        )}
      </div>
    </div>
  );
}

/* ---- helper for radio questions ---- */
function Question({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="space-y-2">
      <p className="font-medium">{label}</p>
      <RadioGroup value={value} onValueChange={onChange} className="space-y-2">
        {options.map((o) => (
          <label key={o} className="flex items-center gap-2">
            <RadioGroupItem value={o} />
            <span className="text-sm">{o}</span>
          </label>
        ))}
      </RadioGroup>
    </div>
  );
}
