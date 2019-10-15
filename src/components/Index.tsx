import React, { LegacyRef } from 'react'

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
   * composition 事件触发时是否能引发 onChange 事件
   *
   * Indicator that control whether the onChange should be call when CompositionEvent trigger
   *
   * Default: false
   * */
  shouldCompositionEventTriggerChangeEvent?: boolean
}

class ReactInput extends React.Component<InputProps> {
  isCompositionStart: boolean = false

  private get $props() {
    const { type, inputRef, ...rest } = this.props
    return {
      ...rest,
      ref: inputRef,
      onChange: this.onChange,
      onCompositionEnd: this.onComposition.bind(this, 'onCompositionEnd'),
      onCompositionStart: this.onComposition.bind(this, 'onCompositionStart'),
      onCompositionUpdate: this.onComposition.bind(this, 'onCompositionUpdate'),
    }
  }

  render() {
    const type = this.props.type
    return type !== 'textarea' ? (
      <input {...this.$props} type={type} />
    ) : (
      <textarea {...this.$props} />
    )
  }

  private onComposition = (
    eventName:
      | 'onCompositionStart'
      | 'onCompositionEnd'
      | 'onCompositionUpdate',
    ev: React.CompositionEvent<InputElType>,
  ) => {
    const eventHandler = this.props[eventName]
    if (eventHandler) eventHandler(ev)

    this.isCompositionStart = eventName !== 'onCompositionEnd'

    if (!this.isCompositionStart) this.onChange(ev as any)
  }

  private onChange = (ev: React.ChangeEvent<InputElType>) => {
    if (
      this.props.onChange &&
      (this.props.shouldCompositionEventTriggerChangeEvent ||
        !this.isCompositionStart)
    ) {
      this.props.onChange(ev)
    }
  }
}

export default ReactInput
