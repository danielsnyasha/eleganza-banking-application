// components/Transfer/types.ts
export type Recipient = {
    id            : string
    alias         : string
    accountName   : string
    accountNumber : string
    currency      : string
    externalBank  : {
      bankName : string
      country  : string
      swiftCode?: string | null
    }
  }
  