import React, { LegacyRef } from 'react'

/**
 * Timing of calling validator
 * */
export enum ValidateTiming {
  Pre,
  Suf,
}

export type ErrorText = string
export type Validator = (val: string) => ErrorText
export type Formatter = (val: string) => string

export interface CheckInfo {
  pristine: boolean
  valid: boolean
  errorText: string
}

export type InputElType = HTMLTextAreaElement & HTMLInputElement

export type InputTypeProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >

export type InputProps = InputTypeProps & {
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

class ReactInput extends React.Component<InputProps, { type: string }> {
  private pristine: boolean = true
  private valid: boolean = true
  private oldValue: string = ''

  constructor(props: InputProps) {
    super(props)
    this.state = { type: this.type() }
    this.oldValue = (props.value || props.defaultValue || '') as string
  }

  private get autoComplete() {
    /** autocomplete is default to 'on' */
    const { autoComplete } = this.props
    if (!autoComplete) return 'on'
    return autoComplete
  }

  private get validateTiming() {
    return this.props.validateTiming || ValidateTiming.Pre
  }

  render() {
    const {
      type,
      validator,
      validateTiming,
      preFormatter,
      sufFormatter,
      inputRef,
      onCheck,
      ...rest
    } = this.props
    return this.state.type !== 'textarea' ? (
      <input
        {...rest}
        ref={inputRef}
        type={this.state.type}
        autoComplete={this.autoComplete}
        onChange={this.onChange.bind(this)}
        onBlur={this.onBlur.bind(this)}
      />
    ) : (
      <textarea
        {...rest}
        ref={inputRef}
        autoComplete={this.autoComplete}
        onChange={this.onChange.bind(this)}
        onBlur={this.onBlur.bind(this)}
      />
    )
  }

  private type() {
    const {
      props: { type },
      autoComplete,
      pristine,
      valid,
      oldValue,
    } = this

    if (type === 'textarea') return 'textarea'

    if (
      type === 'password' &&
      ((autoComplete !== 'off' && ((!pristine || !valid) && oldValue)) ||
        autoComplete === 'on')
    )
      return 'password'

    return 'text'
  }

  private validator(val: string) {
    const { validator, onCheck } = this.props
    this.pristine = false
    const errorText = validator ? validator(val) : ''
    this.valid = !errorText
    this.oldValue = val

    if (onCheck) {
      const { pristine, valid } = this
      onCheck({ pristine, valid, errorText })
    }

    this.setState({ type: this.type() })
  }

  private onChange(ev: React.ChangeEvent<InputElType>) {
    const { preFormatter, onChange } = this.props
    const oldVal = this.oldValue
    if (preFormatter) {
      ev.target.value = preFormatter(ev.target.value)
    }
    if (oldVal !== ev.target.value) {
      if (onChange) onChange(ev)

      if (this.validateTiming === ValidateTiming.Pre) {
        this.validator(ev.target.value)
      }
    }
  }

  private onBlur(ev: React.FocusEvent<InputElType>) {
    const { sufFormatter, onBlur } = this.props
    if (sufFormatter) {
      ev.target.value = sufFormatter(ev.target.value)
    }
    if (onBlur) onBlur(ev)

    if (this.validateTiming === ValidateTiming.Suf) {
      this.validator(ev.target.value)
    }
  }
}

export default ReactInput
