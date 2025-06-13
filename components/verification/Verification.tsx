'use client';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

import { Loader2Icon, CheckCircle2Icon } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm, ControllerRenderProps } from 'react-hook-form';
import * as z from 'zod';
import { useVerificationStatus, useOnboard } from '@/hooks/useVerification';
import { create } from 'zustand';

/* ---------- toast (added) ---------- */
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
/* ----------------------------------- */

/* -------------------------------------------------------------------------- */
/* Zustand store for the verification phase                                   */
/* -------------------------------------------------------------------------- */
type Phase = 'checking' | 'fill' | 'reviewing' | 'success';
type State = { phase: Phase; setPhase: (p: Phase) => void };

const useVerificationStore = create<State>((set) => ({
  phase: 'checking',
  setPhase: (p) => set({ phase: p }),
}));

/* -------------------------------------------------------------------------- */
/* Schema & types                                                             */
/* -------------------------------------------------------------------------- */
const Schema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  phone: z.string().min(8, 'Enter a valid phone number'),
  email: z.string().email(),
  idType: z.enum(['national-id', 'passport']),
  idNumber: z.string().min(5, 'Required'),
  profession: z.string().min(2),
  dob: z.string().min(4, 'Required'),
  address1: z.string().min(3),
  address2: z.string().optional(),
  city: z.string().min(2),
  province: z.string().min(2),
  postalCode: z.string().min(3),
  country: z.string().min(2),
  notes: z.string().optional(),
});
type FormValues = z.infer<typeof Schema>;

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */
export default function Verification() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  /* TanStack hooks */
  const { data, isLoading } = useVerificationStatus();
  const onboard = useOnboard();

  /* Phase from zustand */
  const { phase, setPhase } = useVerificationStore();

  /* -------------------------------- form init ---------------------------- */
  const form = useForm<FormValues>({
    resolver: zodResolver(Schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      idType: 'national-id',
      country: 'South Africa',
    },
  });

  /* --------- inject Clerk info once available -------- */
  useEffect(() => {
    if (isLoaded && user) {
      form.reset({
        firstName: user.firstName ?? '',
        lastName: user.lastName ?? '',
        phone: user.phoneNumbers?.[0]?.phoneNumber ?? '',
        email: user.primaryEmailAddress?.emailAddress ?? '',
        idType: 'national-id',
        country: 'South Africa',
      });
    }
  }, [isLoaded, user, form]);
  /* ---------------------------------------------------- */

  /* -------------------------------- check status ------------------------- */
  useEffect(() => {
    if (!isLoaded || isLoading) return;
    if (data?.verified) router.replace('/banking');
    else setPhase('fill');
  }, [isLoaded, isLoading, data, router, setPhase]);

  /* -------------------------------- submit ------------------------------- */
  async function onSubmit(values: FormValues) {
    try {
      setPhase('reviewing');
      await onboard.mutateAsync(values);
      toast.success('Details submitted – pending manual review.', { autoClose: 4000 });
      setPhase('success');
      await new Promise((r) => setTimeout(r, 1500));
      router.replace('/banking');
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : typeof err === 'string'
          ? err
          : 'Submission failed. Please try again.';
      toast.error(msg, { autoClose: 5000 });
      setPhase('fill');
    }
  }

  /* ---------------------------------------------------------------------- */
  /* UI phases                                                               */
  /* ---------------------------------------------------------------------- */
  if (phase === 'checking' || isLoading) {
    return <BannerLoader text="Wait while your profile is being verified…" />;
  }
  if (phase === 'reviewing') {
    return (
      <BannerLoader text="Hang tight — Eleganza AI & our agents are reviewing your details…" />
    );
  }
  if (phase === 'success') {
    return <BannerSuccess text="Welcome to Eleganza Banking!" />;
  }

  /* -------------------------------- form phase --------------------------- */
  return (
    <>
      <VideoHeader />

      <main className="mx-auto max-w-5xl px-4 py-4 mb-10">
        <h1 className="text-3xl font-bold mb-6 text-[#00a0ff]">Complete your profile</h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* PERSONAL --------------------------------------------------- */}
            <FormField<FormValues, 'firstName'>
              control={form.control}
              name="firstName"
              render={({ field }: { field: ControllerRenderProps<FormValues, 'firstName'> }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField<FormValues, 'lastName'>
              control={form.control}
              name="lastName"
              render={({ field }: { field: ControllerRenderProps<FormValues, 'lastName'> }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField<FormValues, 'profession'>
              control={form.control}
              name="profession"
              render={({ field }: { field: ControllerRenderProps<FormValues, 'profession'> }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Profession</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* CONTACT ----------------------------------------------------- */}
            <FormField<FormValues, 'phone'>
              control={form.control}
              name="phone"
              render={({ field }: { field: ControllerRenderProps<FormValues, 'phone'> }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField<FormValues, 'email'>
              control={form.control}
              name="email"
              render={({ field }: { field: ControllerRenderProps<FormValues, 'email'> }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ID --------------------------------------------------------- */}
            <FormField<FormValues, 'idType'>
              control={form.control}
              name="idType"
              render={({ field }: { field: ControllerRenderProps<FormValues, 'idType'> }) => (
                <FormItem>
                  <FormLabel>ID Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="national-id">National ID</SelectItem>
                      <SelectItem value="passport">Passport</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField<FormValues, 'idNumber'>
              control={form.control}
              name="idNumber"
              render={({ field }: { field: ControllerRenderProps<FormValues, 'idNumber'> }) => (
                <FormItem>
                  <FormLabel>ID / Passport No.</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField<FormValues, 'dob'>
              control={form.control}
              name="dob"
              render={({ field }: { field: ControllerRenderProps<FormValues, 'dob'> }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ADDRESS ----------------------------------------------------- */}
            <FormField<FormValues, 'address1'>
              control={form.control}
              name="address1"
              render={({ field }: { field: ControllerRenderProps<FormValues, 'address1'> }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Address line 1</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField<FormValues, 'address2'>
              control={form.control}
              name="address2"
              render={({ field }: { field: ControllerRenderProps<FormValues, 'address2'> }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Address line 2</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField<FormValues, 'city'>
              control={form.control}
              name="city"
              render={({ field }: { field: ControllerRenderProps<FormValues, 'city'> }) => (
                <FormItem>
                  <FormLabel>City / Town</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField<FormValues, 'province'>
              control={form.control}
              name="province"
              render={({ field }: { field: ControllerRenderProps<FormValues, 'province'> }) => (
                <FormItem>
                  <FormLabel>Province / State</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField<FormValues, 'postalCode'>
              control={form.control}
              name="postalCode"
              render={({ field }: { field: ControllerRenderProps<FormValues, 'postalCode'> }) => (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField<FormValues, 'country'>
              control={form.control}
              name="country"
              render={({ field }: { field: ControllerRenderProps<FormValues, 'country'> }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* OPTIONAL NOTES --------------------------------------------- */}
            <FormField<FormValues, 'notes'>
              control={form.control}
              name="notes"
              render={({ field }: { field: ControllerRenderProps<FormValues, 'notes'> }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Additional information (optional)</FormLabel>
                  <FormControl>
                    <Textarea rows={3} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* ACTION ------------------------------------------------------ */}
            <div className="md:col-span-2 flex justify-end">
              <Button type="submit" className="bg-[#1e90ff] hover:bg-[#3aa5ff]">
                Submit &nbsp;→
              </Button>
            </div>
          </form>
        </Form>
      </main>

      {/* toast container */}
      <ToastContainer position="top-center" />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Helper visual components                                                   */
/* -------------------------------------------------------------------------- */
function VideoHeader() {
  return (
    <section className="w-full">
      <video
        src="/videos/verification-banner.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="w-full max-h-64 object-cover"
      />
    </section>
  );
}

function BannerLoader({ text }: { text: string }) {
  return (
    <>
      <VideoHeader />
      <div className="flex flex-col items-center justify-center py-24 gap-6 text-white">
        <Loader2Icon className="animate-spin w-10 h-10 text-[#00a0ff]" />
        <p className="text-lg animate-pulse">{text}</p>
      </div>
    </>
  );
}

function BannerSuccess({ text }: { text: string }) {
  return (
    <>
      <VideoHeader />
      <div className="flex flex-col items-center justify-center py-24 gap-6 text-white">
        <CheckCircle2Icon className="w-12 h-12 text-emerald-400" />
        <p className="text-2xl font-semibold">{text}</p>
      </div>
    </>
  );
}
