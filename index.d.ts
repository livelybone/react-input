import React from 'react'

declare type InputElType = HTMLTextAreaElement & HTMLInputElement
declare type InputTypeProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<InputElType>,
  InputElType
> &
  React.DetailedHTMLProps<React.InputHTMLAttributes<InputElType>, InputElType>
declare type Remove<O, Keys> = {
  [key in Exclude<keyof O, Keys>]?: O[key]
}
declare type InputProps = Remove<InputTypeProps, 'ref'> & {
  value?: string
  /**
   * composition 事件触发时是否能引发 onChange 事件
   *
   * Indicator that control whether the onChange should be call when CompositionEvent trigger
   *
   * Default: false
   * */
  shouldCompositionEventTriggerChangeEvent?: boolean
}

declare class ReactInput extends React.Component<InputProps> {
  isCompositionUpdate: boolean
  inputEl: InputElType

  private get $props()

  private get shouldCallChange()

  componentDidUpdate(prevProps: any): void

  componentDidMount(): void

  render(): JSX.Element

  private onComposition
  private onChange
}

export default ReactInput
export { InputElType, InputProps, InputTypeProps }
