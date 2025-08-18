# MultiSelect Component

A comprehensive multi-select dropdown component with search functionality, keyboard navigation, and customizable styling.

## Features

- ✅ **Multi-selection**: Select multiple options from a dropdown
- ✅ **Search functionality**: Filter options by typing
- ✅ **Keyboard navigation**: Full keyboard support (arrow keys, enter, escape)
- ✅ **Accessibility**: ARIA attributes and screen reader support
- ✅ **Customizable styling**: Multiple variants and sizes
- ✅ **Loading states**: Show loading indicator
- ✅ **Error handling**: Display error messages
- ✅ **Max items limit**: Restrict maximum selections
- ✅ **Clear functionality**: Clear all selections or individual items
- ✅ **Dark mode support**: Full dark mode compatibility
- ✅ **TypeScript support**: Fully typed with TypeScript

## Basic Usage

```tsx
import { MultiSelect } from '@fsi/ui';
import { useState } from 'react';

const MyComponent = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const options = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' },
  ];

  return (
    <MultiSelect
      label='Select Frameworks'
      options={options}
      value={selected}
      onChange={setSelected}
      placeholder='Choose frameworks...'
    />
  );
};
```

## Props

| Prop          | Type                                 | Default               | Description                                  |
| ------------- | ------------------------------------ | --------------------- | -------------------------------------------- |
| `label`       | `string`                             | -                     | Label displayed above the component          |
| `error`       | `string`                             | -                     | Error message to display                     |
| `helperText`  | `string`                             | -                     | Helper text displayed below the component    |
| `variant`     | `'default' \| 'filled' \| 'outline'` | `'default'`           | Visual variant of the component              |
| `size`        | `'sm' \| 'md' \| 'lg'`               | `'md'`                | Size of the component                        |
| `options`     | `SelectOption[]`                     | -                     | Array of options to display                  |
| `placeholder` | `string`                             | `'Select options...'` | Placeholder text                             |
| `value`       | `string[]`                           | `[]`                  | Currently selected values                    |
| `onChange`    | `(value: string[]) => void`          | -                     | Callback when selection changes              |
| `className`   | `string`                             | `''`                  | Additional CSS classes                       |
| `disabled`    | `boolean`                            | `false`               | Whether the component is disabled            |
| `maxItems`    | `number`                             | -                     | Maximum number of items that can be selected |
| `searchable`  | `boolean`                            | `true`                | Whether search functionality is enabled      |
| `clearable`   | `boolean`                            | `true`                | Whether clear all button is shown            |
| `loading`     | `boolean`                            | `false`               | Whether to show loading indicator            |

## SelectOption Interface

```tsx
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}
```

## Advanced Examples

### With Max Items Limit

```tsx
<MultiSelect
  label='Top 3 Skills'
  options={skills}
  value={selectedSkills}
  onChange={setSelectedSkills}
  maxItems={3}
  helperText={`${selectedSkills.length}/3 skills selected`}
/>
```

### Different Variants

```tsx
{
  /* Default variant */
}
<MultiSelect
  variant='default'
  options={options}
  value={selected}
  onChange={setSelected}
/>;

{
  /* Filled variant */
}
<MultiSelect
  variant='filled'
  options={options}
  value={selected}
  onChange={setSelected}
/>;

{
  /* Outline variant */
}
<MultiSelect
  variant='outline'
  options={options}
  value={selected}
  onChange={setSelected}
/>;
```

### Different Sizes

```tsx
{
  /* Small size */
}
<MultiSelect
  size='sm'
  options={options}
  value={selected}
  onChange={setSelected}
/>;

{
  /* Medium size (default) */
}
<MultiSelect
  size='md'
  options={options}
  value={selected}
  onChange={setSelected}
/>;

{
  /* Large size */
}
<MultiSelect
  size='lg'
  options={options}
  value={selected}
  onChange={setSelected}
/>;
```

### With Error State

```tsx
<MultiSelect
  label='Required Field'
  options={options}
  value={selected}
  onChange={setSelected}
  error='Please select at least one option'
  helperText='This field is required'
/>
```

### Loading State

```tsx
<MultiSelect
  label='Loading Options'
  options={[]}
  value={selected}
  onChange={setSelected}
  loading={true}
  helperText='Options are being loaded...'
/>
```

### Disabled State

```tsx
<MultiSelect
  label='Disabled'
  options={options}
  value={selected}
  onChange={setSelected}
  disabled={true}
  helperText='This component is disabled'
/>
```

### Non-searchable

```tsx
<MultiSelect
  label='Simple Selection'
  options={options}
  value={selected}
  onChange={setSelected}
  searchable={false}
  helperText='No search functionality'
/>
```

### Non-clearable

```tsx
<MultiSelect
  label='No Clear All'
  options={options}
  value={selected}
  onChange={setSelected}
  clearable={false}
  helperText='No clear all button available'
/>
```

## Keyboard Navigation

The MultiSelect component supports full keyboard navigation:

- **Arrow Down**: Navigate to next option
- **Arrow Up**: Navigate to previous option
- **Enter**: Select focused option or first matching option
- **Escape**: Close dropdown
- **Backspace**: Remove last selected item (when search is empty)

## Accessibility Features

- **ARIA attributes**: Proper `role`, `aria-expanded`, `aria-haspopup`, `aria-controls`
- **Keyboard navigation**: Full keyboard support
- **Screen reader support**: Proper labeling and announcements
- **Focus management**: Automatic focus handling
- **Click outside**: Closes dropdown when clicking outside

## Styling

The component uses Tailwind CSS classes and follows the project's design system:

- **Variants**: `default`, `filled`, `outline`
- **Sizes**: `sm`, `md`, `lg`
- **Dark mode**: Full dark mode support
- **Custom classes**: Accepts additional `className` prop

## Best Practices

1. **Provide meaningful labels**: Always include a descriptive label
2. **Use helper text**: Provide additional context when needed
3. **Handle errors gracefully**: Display clear error messages
4. **Limit options**: Consider using `maxItems` for large datasets
5. **Keyboard accessibility**: Ensure keyboard navigation works in your app
6. **Loading states**: Show loading indicators for async data
7. **Validation**: Implement proper validation and error handling

## Common Use Cases

### User Skills Selection

```tsx
const skills = [
  { value: 'frontend', label: 'Frontend Development' },
  { value: 'backend', label: 'Backend Development' },
  { value: 'fullstack', label: 'Full Stack Development' },
  { value: 'mobile', label: 'Mobile Development' },
  { value: 'devops', label: 'DevOps' },
];

<MultiSelect
  label='Skills'
  options={skills}
  value={userSkills}
  onChange={setUserSkills}
  maxItems={5}
  helperText='Select up to 5 skills'
/>;
```

### Tag Selection

```tsx
const tags = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'react', label: 'React' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'nodejs', label: 'Node.js' },
];

<MultiSelect
  label='Tags'
  options={tags}
  value={selectedTags}
  onChange={setSelectedTags}
  placeholder='Add tags...'
  searchable={true}
  clearable={true}
/>;
```

### Category Filtering

```tsx
const categories = [
  { value: 'dsa', label: 'Data Structures & Algorithms' },
  { value: 'machine_coding', label: 'Machine Coding' },
  { value: 'system_design', label: 'System Design' },
];

<MultiSelect
  label='Filter by Category'
  options={categories}
  value={selectedCategories}
  onChange={setSelectedCategories}
  variant='outline'
  size='sm'
/>;
```

## Troubleshooting

### Common Issues

1. **Options not showing**: Ensure `options` array is not empty and contains valid `SelectOption` objects
2. **Value not updating**: Make sure `onChange` callback is properly implemented
3. **Styling issues**: Check if Tailwind CSS is properly configured
4. **Keyboard navigation not working**: Ensure no other elements are capturing keyboard events

### Performance Tips

1. **Large datasets**: Consider virtualizing options for very large lists
2. **Frequent updates**: Use `useCallback` for `onChange` handlers
3. **Search optimization**: Implement debounced search for remote data

## Migration from Other Components

### From HTML Select

```tsx
// Before (HTML select)
<select multiple>
  <option value="react">React</option>
  <option value="vue">Vue.js</option>
</select>

// After (MultiSelect)
<MultiSelect
  options={[
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' }
  ]}
  value={selected}
  onChange={setSelected}
/>
```

### From React-Select

```tsx
// Before (react-select)
<Select
  isMulti
  options={options}
  value={selected}
  onChange={setSelected}
/>

// After (MultiSelect)
<MultiSelect
  options={options}
  value={selected.map(opt => opt.value)}
  onChange={setSelected}
/>
```
