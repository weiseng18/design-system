import {
  forwardRef,
  Stack,
  StackDivider,
  ThemingProps,
  useControllableState,
  useMultiStyleConfig,
} from '@chakra-ui/react'

import {
  CalendarAria,
  CalendarBaseProps,
  CalendarPanel,
  CalendarProvider,
  CalendarStylesProvider,
  CalendarTodayButton,
} from './CalendarBase'

export interface CalendarProps extends CalendarBaseProps {
  /**
   * The current selected date.
   * If provided, the input will be a controlled input, and `onChange` must be provided.
   */
  value?: Date | null
  /**
   * Callback fired when the date changes.
   * If `value` is provided, this must be provided.
   * @param {Date | null} date The new selected date.
   */
  onChange?: (date: Date | null) => void
  /** The default selected date, used if input is uncontrolled */
  defaultValue?: Date | null
  /** Function to determine whether a date should be made unavailable. */
  isDateUnavailable?: (d: Date) => boolean
  /** Color scheme for component */
  colorScheme?: ThemingProps<'Calendar'>['colorScheme']
}

export const Calendar = forwardRef<CalendarProps, 'input'>(
  ({ value, onChange, defaultValue, ...props }, initialFocusRef) => {
    const styles = useMultiStyleConfig('Calendar', props)

    const [internalValue, setInternalValue] = useControllableState({
      value,
      onChange,
      defaultValue,
    })

    return (
      <CalendarProvider
        {...props}
        selectedDates={internalValue ?? undefined}
        onSelectDate={setInternalValue}
      >
        <CalendarStylesProvider value={styles}>
          <CalendarAria />
          <Stack spacing={0} divider={<StackDivider />} sx={styles.container}>
            <CalendarPanel ref={initialFocusRef} />
            <CalendarTodayButton />
          </Stack>
        </CalendarStylesProvider>
      </CalendarProvider>
    )
  },
)

Calendar.displayName = 'Calendar'
