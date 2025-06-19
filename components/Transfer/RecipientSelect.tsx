/* --------------------------------------------------------------------------
   Recipient selector  (CRUD in-place)
---------------------------------------------------------------------------*/
'use client'

import { useEffect, useState } from 'react'
import {
  Popover, PopoverTrigger, PopoverContent,
} from '@/components/ui/popover'
import {
  Command, CommandInput, CommandGroup, CommandItem,
} from '@/components/ui/command'
import { Button }   from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader,
         DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { User, Plus, Trash, Pencil } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import AddRecipientModal  from './AddRecipientModal'
import EditRecipientModal from './EditRecipientModal'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export type Recipient = {
  id:            string
  alias:         string
  accountName:   string
  accountNumber: string
  currency:      string
  externalBank:  { bankName: string; country: string; swiftCode?: string | null }
}

interface Props {
  value   : Recipient | null
  onChange: (r: Recipient | null) => void
}

export default function RecipientSelect({ value, onChange }: Props) {
  /* ------------- local state ---------------- */
  const [open,       setOpen]       = useState(false)
  const [addOpen,    setAddOpen]    = useState(false)
  const [editOpen,   setEditOpen]   = useState(false)
  const [editTarget, setEditTarget] = useState<Recipient | null>(null)
  const [items,      setItems]      = useState<Recipient[]>([])
  const [loading,    setLoading]    = useState(true)

  /* confirm-delete modal */
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deleteId,    setDeleteId]    = useState<string | null>(null)

  /* ------------- fetch list ----------------- */
  async function load() {
    setLoading(true)
    const res  = await fetch('/api/recipients')
    if (res.ok) setItems(await res.json())
    setLoading(false)
  }
  useEffect(()=>{ load() }, [addOpen, editOpen])

  /* ------------- delete mutation ------------ */
  const delMut = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/recipients?id=${id}`, { method:'DELETE' })
      if (!res.ok) throw new Error('Delete failed')
      return id
    },
    onSuccess: id => {
      setItems(prev => prev.filter(r => r.id !== id))
      if (value?.id === id) onChange(null)
      toast.success('Recipient deleted')
    },
    onError: () => toast.error('Delete failed'),
  })

  /* ------------- UI ------------------------- */
  return (
    <>
      {/* toast container once per page -------------------------------- */}
      <ToastContainer position="top-right" autoClose={2500} hideProgressBar />

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="justify-start w-full">
            {value ? value.alias
                   : <span className="text-muted-foreground">Choose recipient</span>}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="p-0 w-80">
          <Command>
            <CommandInput placeholder="Search recipient…" />
            <CommandGroup className="max-h-64 overflow-y-auto">
              {loading && <div className="p-4 text-sm">Loading…</div>}

              {items.map(r => (
                <CommandItem
                  key={r.id}
                  onSelect={() => { onChange(r); setOpen(false) }}
                  className="flex justify-between items-start gap-2 group cursor-pointer"
                >
                  {/* info */}
                  <div className="flex items-start gap-2">
                    <User className="w-4 h-4 mt-0.5 opacity-50" />
                    <div>
                      <p className="font-medium">{r.alias}</p>
                      <p className="text-xs opacity-70">
                        {r.accountNumber} • {r.externalBank.bankName}
                      </p>
                    </div>
                  </div>

                  {/* hover actions */}
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                    <button
                      type="button"
                      className="p-1 rounded hover:bg-muted cursor-pointer"
                      onClick={e => {
                        e.stopPropagation()
                        setEditTarget(r)
                        setEditOpen(true)
                        setOpen(false)
                      }}
                    >
                      <Pencil className="w-4 h-4 text-primary" />
                    </button>

                    <button
                      type="button"
                      className="p-1 rounded hover:bg-muted cursor-pointer"
                      onClick={e => {
                        e.stopPropagation()
                        setDeleteId(r.id)
                        setConfirmOpen(true)
                      }}
                    >
                      <Trash className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </CommandItem>
              ))}

              {/* add-new */}
              <CommandItem
                onSelect={() => { setAddOpen(true); setOpen(false) }}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add new recipient</span>
              </CommandItem>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {/* add modal */}
      <AddRecipientModal
        open={addOpen}
        setOpen={setAddOpen}
        onCreated={r => {
          setItems(prev => [r, ...prev])
          toast.success('Recipient added')
        }}
      />

      {/* edit modal */}
      {editTarget && (
        <EditRecipientModal
          open={editOpen}
          setOpen={setEditOpen}
          data={editTarget}
          onSaved={updated => {
            setItems(prev => prev.map(i => i.id === updated.id ? updated : i))
            if (value?.id === updated.id) onChange(updated)
            toast.success('Recipient updated')
          }}
        />
      )}

      {/* confirmation dialog */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="sm:max-w-xs">
          <DialogHeader>
            <DialogTitle>Delete recipient?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground mb-4">
            This action cannot be undone.
          </p>
          <DialogFooter className="flex gap-2">
            <Button variant="secondary" onClick={()=>setConfirmOpen(false)}>
              No
            </Button>
            <Button
              variant="destructive"
              onClick={()=>{
                if (deleteId) delMut.mutate(deleteId)
                setConfirmOpen(false)
              }}
            >
              Yes, delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
