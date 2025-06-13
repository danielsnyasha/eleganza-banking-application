// -------------------------------------------------------------
// Eleganza Bank – Runtime / DTO typings for the Prisma schema
// -------------------------------------------------------------
import { Decimal } from '@prisma/client/runtime/library'
import { ObjectId } from 'mongodb'

/* ---------- ENUMS ---------- */

export enum KycStatus              { PENDING = 'PENDING', VERIFIED = 'VERIFIED', REJECTED = 'REJECTED' }
export enum CurrencyCode           { USD='USD', EUR='EUR', GBP='GBP', ZAR='ZAR', ZWL='ZWL', CAD='CAD', AUD='AUD', CHF='CHF', CNY='CNY', JPY='JPY', NGN='NGN', GHS='GHS', INR='INR', KES='KES', BTC='BTC', ETH='ETH' }
export enum AccountType            { SAVINGS='SAVINGS', CURRENT='CURRENT', BUSINESS='BUSINESS', LOAN='LOAN', FIXED_DEPOSIT='FIXED_DEPOSIT', FOREIGN='FOREIGN' }
export enum CardType               { DEBIT='DEBIT', CREDIT='CREDIT', PREPAID='PREPAID', VIRTUAL='VIRTUAL' }
export enum CardNetwork            { VISA='VISA', MASTERCARD='MASTERCARD', AMEX='AMEX', DISCOVER='DISCOVER', UNIONPAY='UNIONPAY', OTHER='OTHER' }
export enum CardStatus             { ACTIVE='ACTIVE', BLOCKED='BLOCKED', EXPIRED='EXPIRED', STOLEN='STOLEN' }
export enum TransactionType        { DEPOSIT='DEPOSIT', WITHDRAWAL='WITHDRAWAL', TRANSFER='TRANSFER', FOREX_BUY='FOREX_BUY', FOREX_SELL='FOREX_SELL', INVESTMENT_PURCHASE='INVESTMENT_PURCHASE', INVESTMENT_PAYOUT='INVESTMENT_PAYOUT', FEE='FEE', ADJUSTMENT='ADJUSTMENT' }
export enum TransactionStatus      { PENDING='PENDING', POSTED='POSTED', FAILED='FAILED', REVERSED='REVERSED' }
export enum ForexStatus            { QUOTED='QUOTED', EXECUTED='EXECUTED', REVERSED='REVERSED' }
export enum InvestmentCategory     { FIXED_DEPOSIT='FIXED_DEPOSIT', MUTUAL_FUND='MUTUAL_FUND', ETF='ETF', STOCK='STOCK', BOND='BOND', REAL_ESTATE='REAL_ESTATE', CRYPTO='CRYPTO' }
export enum InvestmentStatus       { OPEN='OPEN', MATURED='MATURED', CLOSED='CLOSED', CANCELLED='CANCELLED' }
export enum SecurityEventType      { LOGIN='LOGIN', LOGOUT='LOGOUT', FAILED_LOGIN='FAILED_LOGIN', PASSWORD_CHANGE='PASSWORD_CHANGE', TWO_FA_SETUP='TWO_FA_SETUP', TWO_FA_VERIFY='TWO_FA_VERIFY', DEVICE_ADDED='DEVICE_ADDED', DEVICE_REMOVED='DEVICE_REMOVED', TRANSFER_INITIATED='TRANSFER_INITIATED', TRANSFER_APPROVED='TRANSFER_APPROVED', SUSPICIOUS_ACTIVITY='SUSPICIOUS_ACTIVITY' }
export enum VerificationTokenType  { EMAIL='EMAIL', SMS='SMS', TWO_FA='TWO_FA', PASSWORD_RESET='PASSWORD_RESET' }
export enum TeamRole               { ADMIN='ADMIN', MANAGER='MANAGER', TELLER='TELLER', SUPPORT='SUPPORT', COMPLIANCE='COMPLIANCE', DEVELOPER='DEVELOPER', ANALYST='ANALYST' }
export enum HubType                { BRANCH='BRANCH', ATM='ATM', AGENCY='AGENCY', VIRTUAL='VIRTUAL' }

/* ---------- MODELS ---------- */

export interface User {
  id: ObjectId | string
  email: string
  phone?: string | null
  passwordHash: string
  firstName: string
  lastName: string
  dateOfBirth?: Date | null
  kycStatus: KycStatus
  verified: boolean
  createdAt: Date
  updatedAt: Date

  /* FK lists (ids only) */
  accountIds?: Array<ObjectId | string>
  cardIds?: Array<ObjectId | string>
  transactionIds?: Array<ObjectId | string>
  forexTradeIds?: Array<ObjectId | string>
  investmentIds?: Array<ObjectId | string>
  securityEventIds?: Array<ObjectId | string>
  verificationTokenIds?: Array<ObjectId | string>
  beneficiaryIds?: Array<ObjectId | string>

  /* Optional eager-loaded objects */
  accounts?: BankAccount[]
  cards?: Card[]
  transactions?: Transaction[]
  forexTrades?: ForexTrade[]
  investments?: Investment[]
  securityEvents?: SecurityEvent[]
  securityConfig?: SecuritySetting | null
  teamMember?: TeamMember | null
  tokens?: VerificationToken[]
  beneficiaries?: Beneficiary[]
}

export interface VerificationToken {
  id: ObjectId | string
  identifier: string
  token: string
  type: VerificationTokenType
  expires: Date
  createdAt: Date

  userId: ObjectId | string
  user?: User
}

export interface BankingHub {
  id: ObjectId | string
  name: string
  code: string
  type: HubType
  timezone: string
  address: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date

  accountIds?: Array<ObjectId | string>
  staffIds?: Array<ObjectId | string>

  accounts?: BankAccount[]
  staff?: TeamMember[]
}

export interface BankAccount {
  id: ObjectId | string
  accountNumber: string
  type: AccountType
  currency: CurrencyCode
  balance: Decimal
  openedAt: Date
  isActive: boolean

  ownerId: ObjectId | string
  hubId?: ObjectId | string | null

  cardIds?: Array<ObjectId | string>
  transactionFromIds?: Array<ObjectId | string>
  transactionToIds?: Array<ObjectId | string>
  ledgerEntryIds?: Array<ObjectId | string>

  owner?: User
  hub?: BankingHub | null
  cards?: Card[]
  transactionsFrom?: Transaction[]
  transactionsTo?: Transaction[]
  ledgerEntries?: LedgerEntry[]
}

export interface Card {
  id: ObjectId | string
  cardNumber: string
  cvvHash: string
  expiryDate: Date
  type: CardType
  network: CardNetwork
  status: CardStatus
  issuedAt: Date

  accountId: ObjectId | string
  ownerId: ObjectId | string

  account?: BankAccount
  owner?: User
}

export interface Transaction {
  id: ObjectId | string
  reference: string
  type: TransactionType
  status: TransactionStatus
  amount: Decimal
  currency: CurrencyCode
  note?: string | null
  createdAt: Date
  postedAt?: Date | null

  userId: ObjectId | string
  fromAccountId?: ObjectId | string | null
  toAccountId?: ObjectId | string | null

  forexTradeId?: ObjectId | string | null
  investmentId?: ObjectId | string | null
  paymentTransferId?: ObjectId | string | null

  ledgerEntryIds?: Array<ObjectId | string>

  user?: User
  fromAccount?: BankAccount | null
  toAccount?: BankAccount | null
  forexTrade?: ForexTrade | null
  investment?: Investment | null
  paymentTransfer?: PaymentTransfer | null
  ledgerEntries?: LedgerEntry[]
}

export interface LedgerEntry {
  id: ObjectId | string
  accountId: ObjectId | string
  transactionId: ObjectId | string
  amount: Decimal
  balanceAfter: Decimal
  createdAt: Date

  account?: BankAccount
  transaction?: Transaction
}

export interface ExternalBank {
  id: ObjectId | string
  bankName: string
  swiftCode: string
  routingNumber?: string | null
  country: string
  isActive: boolean
  createdAt: Date

  beneficiaryIds?: Array<ObjectId | string>
  beneficiaries?: Beneficiary[]
}

export interface Beneficiary {
  id: ObjectId | string
  alias: string
  accountName: string
  accountNumber: string
  currency: CurrencyCode
  createdAt: Date

  userId: ObjectId | string
  externalBankId: ObjectId | string

  transferIds?: Array<ObjectId | string>

  user?: User
  externalBank?: ExternalBank
  transfers?: PaymentTransfer[]
}

export interface PaymentTransfer {
  id: ObjectId | string
  amount: Decimal
  currency: CurrencyCode
  purpose?: string | null
  fee: Decimal
  status: TransactionStatus
  scheduledFor?: Date | null
  executedAt?: Date | null

  transactionId: ObjectId | string
  beneficiaryId: ObjectId | string

  transaction?: Transaction
  beneficiary?: Beneficiary
}

export interface ForexTrade {
  id: ObjectId | string
  fromCurrency: CurrencyCode
  toCurrency: CurrencyCode
  rate: Decimal
  amountFrom: Decimal
  amountTo: Decimal
  fee: Decimal
  status: ForexStatus
  createdAt: Date

  userId: ObjectId | string
  transactionId?: ObjectId | string | null

  user?: User
  transaction?: Transaction | null
}

export interface InvestmentProduct {
  id: ObjectId | string
  name: string
  category: InvestmentCategory
  currency: CurrencyCode
  minimumAmount: Decimal
  annualRatePct: Decimal
  termDays?: number | null
  isActive: boolean
  createdAt: Date

  investmentIds?: Array<ObjectId | string>
  investments?: Investment[]
}

export interface Investment {
  id: ObjectId | string
  amount: Decimal
  currency: CurrencyCode
  startDate: Date
  maturityDate?: Date | null
  status: InvestmentStatus
  createdAt: Date

  userId: ObjectId | string
  productId: ObjectId | string
  transactionId?: ObjectId | string | null

  user?: User
  product?: InvestmentProduct
  transaction?: Transaction | null
}

export interface BusinessAccount {
  id: ObjectId | string
  entityName: string
  registrationNumber: string
  sector?: string | null
  country: string
  openedAt: Date
  isActive: boolean

  ownerId: ObjectId | string

  accountIds?: Array<ObjectId | string>
  teamMemberIds?: Array<ObjectId | string>

  owner?: User
  accounts?: BankAccount[]
  teamMembers?: TeamMember[]
}

export interface TeamMember {
  id: ObjectId | string
  role: TeamRole
  joinedAt: Date

  userId: ObjectId | string
  businessId?: ObjectId | string | null
  hubId?: ObjectId | string | null

  user?: User
  business?: BusinessAccount | null
  hub?: BankingHub | null
}

export interface SecuritySetting {
  id: ObjectId | string
  twoFAEnabled: boolean
  lastPasswordChange: Date
  biometricEnabled: boolean
  backupCodes: string[]

  userId: ObjectId | string
  user?: User
}

export interface SecurityEvent {
  id: ObjectId | string
  eventType: SecurityEventType
  ip?: string | null
  userAgent?: string | null
  location?: string | null
  createdAt: Date

  userId: ObjectId | string
  user?: User
}
