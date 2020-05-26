import React from 'react'

export type InputElType = HTMLTextAreaElement & HTMLInputElement

export type InputTypeProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<InputElType>,
  InputElType
> &
  React.DetailedHTMLProps<React.InputHTMLAttributes<InputElType>, InputElType>

type Remove<O, Keys> = { [key in Exclude<keyof O, Keys>]?: O[key] }

export type InputProps = Remove<InputTypeProps, 'ref'> & {
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

class ReactInput extends React.Component<InputProps> {
  isCompositionUpdate: boolean = false
  inputEl!: InputElType

  private get $props() {
    const {
      value,
      type,
      autoComplete,
      shouldCompositionEventTriggerChangeEvent,
      ...rest
    } = this.props
    return {
      ...rest,
      value: undefined,
      autoComplete:
        type === 'password' && autoComplete === 'off'
          ? 'new-password'
          : autoComplete,
      defaultValue: value,
      ref: (ref: InputElType) => {
        this.inputEl = ref
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
      !this.isCompositionUpdate
    )
  }

  componentDidUpdate(prevProps: any): void {
    if (
      this.shouldCallChange &&
      this.inputEl &&
      this.props.value !== undefined
    ) {
      this.inputEl.value = this.props.value
    }
  }

  componentDidMount(): void {
    if (this.shouldCallChange && this.inputEl && this.props.value) {
      this.inputEl.value = this.props.value
    }
  }

  render() {
    const props = this.$props
    const type = this.props.type || 'text'
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

    this.isCompositionUpdate = eventName !== 'onCompositionEnd'
    if (!this.isCompositionUpdate) {
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
