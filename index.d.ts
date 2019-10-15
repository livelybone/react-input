import React, { LegacyRef } from 'react'

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
   * composition 事件触发时是否能引发 onChange 事件
   *
   * Indicator that control whether the onChange should be call when CompositionEvent trigger
   *
   * Default: false
   * */
  shouldCompositionEventTriggerChangeEvent?: boolean
}

declare class ReactInput extends React.Component<
  InputProps,
  {
    type: string
  }
> {
  private oldValue
  private isCompositionStart

  constructor(props: InputProps)

  private readonly $props

  render(): JSX.Element

  private onComposition
  private onChange
  private onBlur
}

export default ReactInput
export { InputElType, InputProps, InputTypeProps }
