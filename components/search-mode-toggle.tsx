'use client'

import { useCallback, useEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import { getCookie, setCookie } from '@/lib/utils/cookies'
import { WebIcon } from './icons'

export function SearchModeToggle() {
  const [isSearchMode, setIsSearchMode] = useState(true)

  useEffect(() => {
    const savedMode = getCookie('search-mode')
    if (savedMode !== null) {
      setIsSearchMode(savedMode === 'true')
    } else {
      setCookie('search-mode', 'true')
    }
  }, [])

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      const next = !isSearchMode
      setIsSearchMode(next)
      setCookie('search-mode', next.toString())
    },
    [isSearchMode],
  )

  return (
    <span className="inline-block" data-state={isSearchMode ? 'open' : 'closed'}>
      <div
        className={cn(
          'inline-flex h-9 rounded-full border text-[13px] font-semibold text-token-text-secondary border-token-border-default focus-visible:outline-black dark:focus-visible:outline-white',
          {
            'radix-state-open:bg-black/10 bg-blue-50 text-blue-600 dark:text-blue-400 shadow-sm': isSearchMode,
            'hover:bg-token-main-surface-secondary': !isSearchMode,
          },
        )}
      >
        <button
          className="flex h-full min-w-8 items-center justify-center p-2"
          aria-pressed={isSearchMode ? 'true' : 'false'}
          aria-label="Toggle search mode"
          onClick={handleClick}
          type="button"
        >
          <WebIcon />
          <span style={{ width: 'fit-content', opacity: 1, transform: 'none' }}>
            <div className="ps-1 pe-1 font-semibold whitespace-nowrap [[data-collapse-labels]_&]:sr-only">Search</div>
          </span>
        </button>
      </div>
    </span>
  )
}
