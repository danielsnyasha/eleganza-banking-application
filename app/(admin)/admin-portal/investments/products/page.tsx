/* app/admin-portal/investments/products/page.tsx */
'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  useAdminProducts,
  useCreateProduct,
  useDeleteProduct,
  useToggleActive,
} from '@/hooks/admin-investments';
import { InvestmentCategory, CurrencyCode } from '@prisma/client';
import { uploadToCloudinary } from '@/lib/cloudinary';
import {
  Plus,
  UploadCloud,
  Link as LinkIcon,
  Trash2,
  Loader2,
} from 'lucide-react';

export default function ProductsAdmin() {
  /* ---------- queries & mutations ---------- */
  const { data = [], isLoading, isError } = useAdminProducts();
  const createMutation = useCreateProduct();
  const deleteMutation = useDeleteProduct();
  const toggleMutation = useToggleActive();

  /* ---------- create-form state ---------- */
  const [form, setForm] = useState({
    name: '',
    shortDescription: '',
    category: 'FIXED_DEPOSIT' as InvestmentCategory,
    currency: 'ZAR' as CurrencyCode,
    minimumAmount: '',
    annualRatePct: '',
    maxValue: '',
    termDays: '',
  });
  const [images, setImages] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState('');
  const [open, setOpen] = useState(false);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadToCloudinary(file);
    setImages((prev) => [...prev, url]);
  }

  function handleAddUrl() {
    if (!imageUrl.trim()) return;
    setImages((prev) => [...prev, imageUrl.trim()]);
    setImageUrl('');
  }

  function handleSubmit() {
    createMutation.mutate(
      {
        ...form,
        images,
        minimumAmount: +form.minimumAmount,
        annualRatePct: +form.annualRatePct,
        termDays: form.termDays ? +form.termDays : null,
        maxValue: form.maxValue ? +form.maxValue : 0,
      },
      {
        onSuccess: () => {
          setOpen(false);
          setImages([]);
          setForm({
            name: '',
            shortDescription: '',
            category: 'FIXED_DEPOSIT',
            currency: 'ZAR',
            minimumAmount: '',
            annualRatePct: '',
            termDays: '',
            maxValue: '',
          });
        },
      }
    );
  }

  /* ---------- ui ---------- */
  return (
    <div className="space-y-12">
      {/* banner */}
      <section className="rounded-xl bg-gradient-to-r from-[#0056B6] to-[#0091FF] text-white p-8">
        <h1 className="text-3xl font-bold mb-2">Investment Products</h1>
        <p className="max-w-3xl text-sm opacity-90 leading-relaxed">
          As an administrator you can <strong>create, modify, pause or retire</strong><br />
          investment products. Each product can be activated/deactivated at
          any time, letting you control visibility in the user storefront.
          Use the panel below to manage thumbnails, financial parameters and
          progress caps (<em>Max&nbsp;Value</em>).
        </p>
      </section>

      {/* list + create */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">All Products</h2>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                New Product
              </Button>
            </DialogTrigger>

            {/* ── CREATE FORM ───────────────────────── */}
            <DialogContent className="max-w-lg">
              <DialogTitle>Create Product</DialogTitle>

              {/* form */}
              <div className="space-y-4 mt-4">
                <Input
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <Textarea
                  placeholder="Short description"
                  value={form.shortDescription}
                  onChange={(e) =>
                    setForm({ ...form, shortDescription: e.target.value })
                  }
                />

                {/* category */}
                <Select
                  value={form.category}
                  onValueChange={(v) =>
                    setForm({ ...form, category: v as InvestmentCategory })
                  }
                >
                  <SelectTrigger>{form.category}</SelectTrigger>
                  <SelectContent>
                    {Object.values(InvestmentCategory).map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* currency */}
                <Select
                  value={form.currency}
                  onValueChange={(v) =>
                    setForm({ ...form, currency: v as CurrencyCode })
                  }
                >
                  <SelectTrigger>{form.currency}</SelectTrigger>
                  <SelectContent>
                    {['ZAR', 'USD', 'EUR', 'GBP'].map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  type="number"
                  placeholder="Minimum amount"
                  value={form.minimumAmount}
                  onChange={(e) =>
                    setForm({ ...form, minimumAmount: e.target.value })
                  }
                />
                <Input
                  type="number"
                  placeholder="Total Value / Max Amount"
                  value={form.maxValue}
                  onChange={(e) =>
                    setForm({ ...form, maxValue: e.target.value })
                  }
                />
                <Input
                  type="number"
                  placeholder="Annual % rate"
                  value={form.annualRatePct}
                  onChange={(e) =>
                    setForm({ ...form, annualRatePct: e.target.value })
                  }
                />
                <Input
                  type="number"
                  placeholder="Term (days) optional"
                  value={form.termDays}
                  onChange={(e) =>
                    setForm({ ...form, termDays: e.target.value })
                  }
                />

                {/* images */}
                <div className="space-y-2">
                  <p className="text-sm font-medium">Images</p>
                  {/* upload */}
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <UploadCloud className="w-4 h-4" />
                    <span>Upload from computer</span>
                    <input
                      type="file"
                      onChange={handleFile}
                      className="hidden"
                    />
                  </label>
                  {/* url pin */}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Paste image URL"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleAddUrl}
                    >
                      <LinkIcon className="w-4 h-4" />
                    </Button>
                  </div>
                  {/* preview */}
                  <div className="flex flex-wrap gap-2">
                    {images.map((url) => (
                      <img
                        key={url}
                        src={url}
                        alt=""
                        className="w-16 h-16 object-cover rounded"
                      />
                    ))}
                  </div>
                </div>

                <Button
                  disabled={createMutation.isPending}
                  onClick={handleSubmit}
                >
                  {createMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Saving…
                    </>
                  ) : (
                    'Save'
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* list body */}
        {isLoading ? (
          <p>Loading…</p>
        ) : isError ? (
          <p className="text-red-500">Failed to fetch products.</p>
        ) : data.length === 0 ? (
          <p>No products yet. Click “New Product” to add one.</p>
        ) : (
          <div className="grid gap-4">
            {data.map((p) => (
              <div
                key={p.id}
                className="flex items-start gap-4 border rounded-lg p-4 group hover:shadow-md transition"
              >
                {/* image with hover grow */}
                <div className="relative w-28 h-20 overflow-hidden rounded">
                  {p.images[0] && (
                    <img
                      src={p.images[0]}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition"
                    />
                  )}
                </div>

                {/* details */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{p.name}</p>
                  <p className="text-xs text-neutral-500 line-clamp-2">
                    {p.shortDescription}
                  </p>
                  <div className="text-xs text-neutral-600 mt-1 flex gap-3 flex-wrap">
                    <span>
                      Min: {p.currency} {p.minimumAmount.toLocaleString()}
                    </span>
                    <span>
                      Max: {p.currency} {p.maxValue?.toLocaleString?.() ?? p.maxValue}
                    </span>
                    {p.termDays && <span>Term: {p.termDays} days</span>}
                  </div>
                </div>

                {/* isActive toggle */}
                <Select
                  value={p.isActive ? 'ACTIVE' : 'INACTIVE'}
                  onValueChange={(v) =>
                    toggleMutation.mutate({ id: p.id, isActive: v === 'ACTIVE' })
                  }
                >
                  <SelectTrigger className="w-[100px] text-xs h-8">
                    {p.isActive ? 'Active' : 'Inactive'}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                  </SelectContent>
                </Select>

                {/* delete */}
                <button
                  onClick={() => deleteMutation.mutate(p.id)}
                  className="text-red-600 opacity-0 group-hover:opacity-100 transition ml-2"
                  aria-label="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
