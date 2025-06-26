'use client';

interface StepperProps {
  step: number; // 0‑3
  labels: string[];
}
export default function ApplyStepper({ step, labels }: StepperProps) {
  return (
    <div className="flex gap-4 mb-10">
      {labels.map((l, i) => (
        <div key={l} className="flex-1 text-center">
          <div
            className={`h-1 rounded-full ${
              i <= step ? 'bg-purple-500' : 'bg-neutral-200'
            }`}
          />
          <p
            className={`mt-1 text-xs ${
              i === step ? 'text-purple-600 font-medium' : 'text-neutral-500'
            }`}
          >
            {l}
          </p>
        </div>
      ))}
    </div>
  );
}
