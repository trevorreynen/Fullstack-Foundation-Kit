// import { FieldKey, FieldConfig, Props } from '@/types/AuthFormTypes'


export type FieldKey = 'identifier' | 'password' | 'email' | 'confirmPassword'


export type FieldConfig = {
  key: FieldKey
  label: string
  type?: 'text' | 'password'
  placeholder?: string
  required?: boolean
}


export type Props = {
  title: string
  fields: FieldConfig[]
  onSubmit: (values: Record<FieldKey, string>, rememberMe: boolean) => Promise<string | null>
  footer?: React.ReactNode
  submitText?: string
  showForgotPassword?: boolean
  showRememberMe?: boolean
}


