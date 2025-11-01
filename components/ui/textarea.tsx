import * as React from 'react'
import { cn } from '@/lib/utils'

const setRef = (ref: any, value: HTMLTextAreaElement | null) => {
  if (!ref) return
  if (typeof ref === 'function') ref(value)
  else ref.current = value
}

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'>
>(({ className, onInput, ...props }, ref) => {
  const localRef = React.useRef<HTMLTextAreaElement | null>(null)

  const resize = React.useCallback((ta?: HTMLTextAreaElement | null) => {
    const el = ta ?? localRef.current
    if (!el) return

    // reset height to measure scrollHeight correctly
    el.style.height = 'auto'

    // compute desired height (cap at 34vh)
    const scroll = el.scrollHeight
    let cap = scroll
    if (typeof window !== 'undefined') {
      cap = Math.min(scroll, Math.floor(window.innerHeight * 0.34))
    }
    el.style.height = `${cap}px`
  }, [])

  React.useLayoutEffect(() => {
    // initial resize on mount
    resize()
    // also when value changes (controlled textarea)
  }, [props.value, props.defaultValue, resize])

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    resize(e.currentTarget)
    if (onInput) onInput(e)
  }

  return (
    <textarea
      {...props}
      onInput={handleInput}
      ref={(el) => {
        setRef(ref, el)
        localRef.current = el
      }}
      className={cn(
        // keep existing look, add resize-none to prevent manual resize and allow JS control
        'prompt-form flex min-h-[40px] max-h-[calc(34dvh)] overflow-y-auto bg-muted ring-offset-background font-normal placeholder:text-muted-foreground text-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 pt-4 mb-1.5 scrollbar-thin scrollbar-thumb-bubblescrollbar scrollbar-track-transparent scrollbar resize-none',
        className,
      )}
    />
  )
})
Textarea.displayName = 'Textarea'

export { Textarea }

