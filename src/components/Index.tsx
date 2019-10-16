import React from 'react'

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
  value?: string
  inputRef?: (ref: InputElType) => any
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
  private $inputRef!: InputElType
  private oldValue: string = ''

  private get $props() {
    const {
      value,
      type,
      inputRef,
      shouldCompositionEventTriggerChangeEvent,
      ...rest
    } = this.props
    return {
      ...rest,
      value: undefined,
      defaultValue: value,
      ref: (ref: InputElType) => {
        if (inputRef) inputRef(ref)
        this.$inputRef = ref
      },
      onChange: this.onChange,
      onCompositionEnd: this.onComposition.bind(this, 'onCompositionEnd'),
      onCompositionStart: this.onComposition.bind(this, 'onCompositionStart'),
      onCompositionUpdate: this.onComposition.bind(this, 'onCompositionUpdate'),
    }
  }

  private get shouldCallChange() {
    return (
      this.props.shouldCompositionEventTriggerChangeEvent ||
      !this.isCompositionStart
    )
  }

  render() {
    const props = this.$props
    const type = this.props.type || 'text'
    const value = this.props.value || ''
    if (this.shouldCallChange && this.oldValue !== value) {
      if (this.$inputRef) this.$inputRef.value = value
      this.oldValue = value
    }
    return type !== 'textarea' ? (
      <input {...props} type={type} />
    ) : (
      <textarea {...props} />
    )
  }

  private onComposition = (
    eventName:
      | 'onCompositionStart'
      | 'onCompositionEnd'
      | 'onCompositionUpdate',
    ev: React.CompositionEvent<InputElType>,
  ) => {
    ev.stopPropagation()
    const eventHandler = this.props[eventName]
    if (eventHandler) eventHandler(ev)

    this.isCompositionStart = eventName !== 'onCompositionEnd'
    if (!this.isCompositionStart) {
      const $ev = { ...ev } as any
      setTimeout(() => {
        this.onChange($ev)
      })
    }
  }

  private onChange = (ev: React.ChangeEvent<InputElType>) => {
    if (this.props.onChange && this.shouldCallChange) {
      this.props.onChange(ev)
    }
  }
}

export default ReactInput
