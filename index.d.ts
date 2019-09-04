import React, { LegacyRef } from 'react'

/**
 * Timing of calling validator
 * */
declare enum ValidateTiming {
  Pre = 0,
  Suf = 1,
}

declare type ErrorText = string
declare type Validator = (val: string) => ErrorText
declare type Formatter = (val: string) => string

interface CheckInfo {
  pristine: boolean
  valid: boolean
  errorText: string
}

declare type InputElType = HTMLTextAreaElement & HTMLInputElement
declare type InputTypeProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
declare type InputProps = InputTypeProps & {
  inputRef?: LegacyRef<InputElType>
  /**
   * Default: ValidateTiming.Pre
   * */
  validateTiming?: ValidateTiming
  validator?: Validator
  /**
   * Emit check info of the component
   * */
  onCheck?: (checkInfo: CheckInfo) => void
  /**
   * Formatting when inputting
   * */
  preFormatter?: Formatter
  /**
   * Formatting at the end of inputting
   * */
  sufFormatter?: Formatter
}

declare class Input extends React.Component<
  InputProps,
  {
    type: string
  }
> {
  private pristine
  private valid
  private value

  constructor(props: InputProps)

  private readonly autoComplete
  private type
  private readonly validateTiming
  private validator
  private onChange
  private onBlur

  render(): JSX.Element
}

export default Input
export {
  CheckInfo,
  ErrorText,
  Formatter,
  InputElType,
  InputProps,
  InputTypeProps,
  ValidateTiming,
  Validator,
}
