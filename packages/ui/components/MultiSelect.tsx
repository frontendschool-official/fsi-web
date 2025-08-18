'use client';

import React, {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import { SelectOption } from '@config/typings/types';

interface MultiSelectProps {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'filled' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  options: SelectOption[];
  placeholder?: string;
  value?: string[];
  onChange?: (value: string[]) => void;
  className?: string;
  disabled?: boolean;
  maxItems?: number;
  searchable?: boolean;
  clearable?: boolean;
  loading?: boolean;
}

export const MultiSelect = forwardRef<HTMLDivElement, MultiSelectProps>(
  (
    {
      label,
      error,
      helperText,
      variant = 'default',
      size = 'md',
      options,
      placeholder = 'Select options...',
      value = [],
      onChange,
      className = '',
      disabled = false,
      maxItems,
      searchable = true,
      clearable = true,
      loading = false,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectId = `multiselect-${Math.random().toString(36).substr(2, 9)}`;

    // Base classes
    const baseClasses =
      'w-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed min-h-[40px]';

    // Variant classes
    const variantClasses = {
      default:
        'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-primary-500 dark:focus:ring-primary-400',
      filled:
        'border-transparent bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:bg-white dark:focus:bg-gray-800 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-primary-500 dark:focus:ring-primary-400',
      outline:
        'border-2 border-gray-200 dark:border-gray-600 bg-transparent text-gray-900 dark:text-gray-100 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-primary-500 dark:focus:ring-primary-400',
    };

    // Size classes
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm rounded-md min-h-[32px]',
      md: 'px-4 py-2 text-sm rounded-md min-h-[40px]',
      lg: 'px-4 py-3 text-base rounded-lg min-h-[48px]',
    };

    // Error classes
    const errorClasses = error
      ? 'border-red-500 dark:border-red-400 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-500 dark:focus:ring-red-400'
      : '';

    const containerClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${errorClasses} ${className}`;

    // Filter options based on search term and selected values
    const filteredOptions = options.filter(option => {
      const matchesSearch = searchable
        ? option.label.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      const notSelected = !value.includes(option.value);
      return matchesSearch && notSelected;
    });

    // Handle option selection
    const handleOptionSelect = useCallback(
      (optionValue: string) => {
        if (disabled) return;

        const newValue = value.includes(optionValue)
          ? value.filter(v => v !== optionValue)
          : [...value, optionValue];

        if (maxItems && newValue.length > maxItems) {
          return; // Don't add if max items reached
        }

        onChange?.(newValue);
        setSearchTerm('');
        setFocusedIndex(-1);

        if (searchable) {
          inputRef.current?.focus();
        }
      },
      [value, onChange, disabled, maxItems, searchable]
    );

    // Handle keyboard navigation
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled) return;

        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault();
            setFocusedIndex(prev =>
              prev < filteredOptions.length - 1 ? prev + 1 : 0
            );
            break;
          case 'ArrowUp':
            e.preventDefault();
            setFocusedIndex(prev =>
              prev > 0 ? prev - 1 : filteredOptions.length - 1
            );
            break;
          case 'Enter':
            e.preventDefault();
            if (focusedIndex >= 0 && filteredOptions[focusedIndex]) {
              handleOptionSelect(filteredOptions[focusedIndex].value);
            } else if (searchTerm && filteredOptions.length > 0) {
              handleOptionSelect(filteredOptions[0].value);
            }
            break;
          case 'Escape':
            setIsOpen(false);
            setFocusedIndex(-1);
            break;
          case 'Backspace':
            if (!searchTerm && value.length > 0) {
              const newValue = value.slice(0, -1);
              onChange?.(newValue);
            }
            break;
        }
      },
      [
        disabled,
        focusedIndex,
        filteredOptions,
        searchTerm,
        value,
        onChange,
        handleOptionSelect,
      ]
    );

    // Handle click outside to close dropdown
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
          setFocusedIndex(-1);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle focus management
    useEffect(() => {
      if (isOpen && searchable) {
        inputRef.current?.focus();
      }
    }, [isOpen, searchable]);

    // Clear search when dropdown closes
    useEffect(() => {
      if (!isOpen) {
        setSearchTerm('');
        setFocusedIndex(-1);
      }
    }, [isOpen]);

    // Get selected options
    const selectedOptions = options.filter(option =>
      value.includes(option.value)
    );

    // Remove selected option
    const removeOption = (optionValue: string) => {
      if (disabled) return;
      const newValue = value.filter(v => v !== optionValue);
      onChange?.(newValue);
    };

    // Clear all selections
    const clearAll = () => {
      if (disabled) return;
      onChange?.([]);
    };

    return (
      <div className='w-full' ref={ref}>
        {label && (
          <label
            htmlFor={selectId}
            className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
          >
            {label}
          </label>
        )}

        <div className='relative' ref={containerRef}>
          <div
            className={`${containerClasses} cursor-pointer flex items-center flex-wrap gap-1 ${
              isOpen ? 'ring-2 ring-primary-500 dark:ring-primary-400' : ''
            }`}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role='combobox'
            aria-expanded={isOpen}
            aria-haspopup='listbox'
            aria-controls={`${selectId}-dropdown`}
          >
            {/* Selected items */}
            <div className='flex flex-wrap gap-1 flex-1 min-w-0'>
              {selectedOptions.map(option => (
                <span
                  key={option.value}
                  className='inline-flex items-center gap-1 px-2 py-1 text-xs bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-md'
                >
                  <span className='truncate'>{option.label}</span>
                  <button
                    type='button'
                    onClick={e => {
                      e.stopPropagation();
                      removeOption(option.value);
                    }}
                    className='ml-1 hover:bg-primary-200 dark:hover:bg-primary-800 rounded-full p-0.5'
                    disabled={disabled}
                  >
                    <svg
                      className='w-3 h-3'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </button>
                </span>
              ))}

              {/* Search input */}
              {searchable && (
                <input
                  ref={inputRef}
                  type='text'
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  onClick={e => e.stopPropagation()}
                  onKeyDown={handleKeyDown}
                  className='flex-1 min-w-0 bg-transparent border-none outline-none text-sm placeholder-gray-500 dark:placeholder-gray-400'
                  placeholder={selectedOptions.length === 0 ? placeholder : ''}
                  disabled={disabled}
                />
              )}

              {/* Placeholder when no items selected and no search */}
              {selectedOptions.length === 0 && !searchTerm && !searchable && (
                <span className='text-gray-500 dark:text-gray-400 text-sm'>
                  {placeholder}
                </span>
              )}
            </div>

            {/* Action buttons */}
            <div className='flex items-center gap-1'>
              {clearable && value.length > 0 && (
                <button
                  type='button'
                  onClick={e => {
                    e.stopPropagation();
                    clearAll();
                  }}
                  className='p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded'
                  disabled={disabled}
                >
                  <svg
                    className='w-4 h-4 text-gray-400'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    />
                  </svg>
                </button>
              )}

              {loading && (
                <div className='p-1'>
                  <svg
                    className='animate-spin w-4 h-4 text-gray-400'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    />
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    />
                  </svg>
                </div>
              )}

              {/* Dropdown arrow */}
              <svg
                className={`w-4 h-4 text-gray-400 transition-transform ${
                  isOpen ? 'rotate-180' : ''
                }`}
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 9l-7 7-7-7'
                />
              </svg>
            </div>
          </div>

          {/* Dropdown */}
          {isOpen && (
            <div
              ref={dropdownRef}
              id={`${selectId}-dropdown`}
              className='absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto'
              role='listbox'
            >
              {filteredOptions.length === 0 ? (
                <div className='px-4 py-2 text-sm text-gray-500 dark:text-gray-400'>
                  {searchTerm ? 'No options found' : 'No options available'}
                </div>
              ) : (
                filteredOptions.map((option, index) => (
                  <div
                    key={option.value}
                    className={`px-4 py-2 text-sm cursor-pointer transition-colors ${
                      index === focusedIndex
                        ? 'bg-primary-100 dark:bg-primary-900 text-primary-900 dark:text-primary-100'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100'
                    } ${
                      option.disabled ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={() =>
                      !option.disabled && handleOptionSelect(option.value)
                    }
                    role='option'
                    aria-selected={index === focusedIndex}
                  >
                    {option.label}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {error && (
          <p className='mt-1 text-sm text-red-600 dark:text-red-400'>{error}</p>
        )}

        {helperText && !error && (
          <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

MultiSelect.displayName = 'MultiSelect';
