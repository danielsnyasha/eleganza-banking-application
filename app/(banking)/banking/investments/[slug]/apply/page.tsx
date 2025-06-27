/* app/(banking)/banking/investments/[slug]/apply/page.tsx */
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { toast } from 'react-toastify';
import { z } from 'zod';

import ApplyStepper from '@/components/Investments/ApplyStepper';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useWallet } from '@/hooks/useWallet';

interface ProductLite {
  minimumAmount: number;
  currency: string;
}

const labels = ['Details', 'Amount', 'Questions', 'Terms'];

export default function ApplyPage() {
  const { slug } = useParams<{ slug: string }>();
  const router   = useRouter();
  const { user } = useUser();
  const { data: wallet } = useWallet();

  /* ---------- fetch product min ---------- */
  const [product, setProduct] = useState<ProductLite | null>(null);
  useEffect(() => {
    fetch(`/api/investment-products/${slug}`)
      .then((r) => r.json())
      .then((d: ProductLite) => setProduct(d))
      .catch(() => toast.error('Failed to load product details'));
  }, [slug]);

  /* ---------- balance calc ---------- */
  const zarAccounts = wallet?.accounts.filter(
    (a) => a.currency === 'ZAR' && a.isActive
  ) ?? [];
  const available =
    zarAccounts.length
      ? zarAccounts.reduce((s, a) => s + a.balance, 0)
      : (wallet?.accounts.find((a) => a.isActive)?.balance ?? 0);

  /* ---------- state ---------- */
  const [step, setStep] = useState(0);
  const [amount, setAmount] = useState('');
  const [risk, setRisk] = useState('');
  const [experience, setExperience] = useState('');
  const [goal, setGoal] = useState('');
  const [horizon, setHorizon] = useState('');
  const [agree, setAgree] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  /* ---------- derived amount error ---------- */
  const amtNum = parseFloat(amount.trim());
  const minReq = product?.minimumAmount ?? 0;

  let amountError = '';
  if (!amount.trim()) amountError = 'Amount is required';
  else if (isNaN(amtNum) || amtNum <= 0) amountError = 'Enter a valid amount';
  else if (amtNum < minReq)
    amountError = `Minimum is ZAR ${minReq.toLocaleString()}`;
  else if (amtNum > available)
    amountError = 'Amount exceeds available balance';

  function next() {
    if (step === 1 && amountError) return;
    if (step < 3) setStep(step + 1);
  }
  function back() {
    if (step > 0) setStep(step - 1);
  }

  async function submit() {
    /* defensive Zod check as well */
    const schema = z.number()
      .min(minReq, `Minimum is ${minReq}`)
      .max(available, 'Exceeds balance');
    const result = schema.safeParse(amtNum);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    setSubmitting(true);

    const res = await fetch('/api/investments/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId:   user?.id,
        slug,
        amount:   amtNum,
        currency: 'ZAR',
        risk,
        experience,
        goal,
        horizon,
        name:     user?.firstName,
        surname:  user?.lastName,
        email:    user?.emailAddresses[0]?.emailAddress,
        phone:    user?.primaryPhoneNumber?.phoneNumber,
        notes:    '',
      }),
    });

    if (!res.ok) {
      toast.error('Something went wrong. Please try again.');
      setSubmitting(false);
      return;
    }

    /* success toast + redirect countdown */
    let s = 3;
    const id = toast.success(`Application submitted! Redirecting in ${s}…`, {
      autoClose: false,
      closeOnClick: false,
      draggable: false,
    });
    const t = setInterval(() => {
      s -= 1;
      if (s) toast.update(id, { render: `Application submitted! Redirecting in ${s}…` });
      else { clearInterval(t); toast.dismiss(id); router.push('/banking/investments'); }
    }, 1000);
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-10 space-y-8">
      <h1 className="text-center text-xl font-semibold mb-4">
        Apply – {slug.replace(/-/g, ' ')}
      </h1>

      <ApplyStepper step={step} labels={labels} />

      {/* ---------- STEP CONTENT ---------- */}
      {step === 0 && (
        <div className="space-y-4">
          <Input disabled defaultValue={user?.firstName ?? ''} placeholder="Name" />
          <Input disabled defaultValue={user?.lastName ?? ''}  placeholder="Surname" />
          <Input disabled defaultValue={user?.primaryPhoneNumber?.phoneNumber ?? ''} placeholder="Phone" />
          <Input disabled defaultValue={user?.emailAddresses[0]?.emailAddress ?? ''}  placeholder="Email" />
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <p className="text-sm text-neutral-600">
            Available balance:&nbsp;
            <strong>
              ZAR&nbsp;{available.toLocaleString(undefined,{minimumFractionDigits:2})}
            </strong>
          </p>
          {product && (
            <p className="text-sm text-neutral-600">
              Minimum investment:&nbsp;
              <strong>ZAR&nbsp;{product.minimumAmount.toLocaleString()}</strong>
            </p>
          )}
          <Input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          {amountError && (
            <p className="text-xs text-red-600">{amountError}</p>
          )}
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <Question label="Your investment experience" value={experience} onChange={setExperience}
            options={['New to investing','Some experience','Experienced investor']} />
          <Question label="Your risk tolerance" value={risk} onChange={setRisk}
            options={['Low','Moderate','High']} />
          <Question label="Primary goal" value={goal} onChange={setGoal}
            options={['Preserve capital','Generate income','Substantial growth']} />
          <Question label="Planned holding period" value={horizon} onChange={setHorizon}
            options={['<2 years','2-5 years','>5 years']} />
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <p className="text-sm leading-relaxed">
            By investing you confirm you have read and agree to the&nbsp;
            <a href="#" className="underline">Terms & Conditions</a>.
          </p>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox checked={agree} onCheckedChange={(v) => setAgree(v === true)} /> I agree
          </label>
        </div>
      )}

      {/* ---------- ACTIONS ---------- */}
      <div className="flex justify-between mt-8">
        {step > 0 && (
          <Button variant="ghost" onClick={back}>Back</Button>
        )}
        {step < 3 && (
          <Button
            onClick={next}
            disabled={
              (step === 1 && !!amountError) ||
              (step === 1 && !amount.trim())
            }
          >
            Next
          </Button>
        )}
        {step === 3 && (
          <Button
            disabled={!agree || submitting}
            onClick={submit}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white"
          >
            {submitting ? 'Submitting…' : 'Submit'}
          </Button>
        )}
      </div>
    </div>
  );
}

/* helper radio group */
function Question({
  label, value, onChange, options,
}: { label:string; value:string; onChange:(v:string)=>void; options:string[] }) {
  return (
    <div className="space-y-2">
      <p className="font-medium">{label}</p>
      <RadioGroup value={value} onValueChange={onChange} className="space-y-2">
        {options.map((o) => (
          <label key={o} className="flex items-center gap-2">
            <RadioGroupItem value={o} /> <span className="text-sm">{o}</span>
          </label>
        ))}
      </RadioGroup>
    </div>
  );
}
