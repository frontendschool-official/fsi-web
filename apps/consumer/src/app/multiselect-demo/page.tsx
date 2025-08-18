'use client';

import React, { useState } from 'react';
import { MultiSelect, Card, Typography, Button, Badge } from '@fsi/ui';
import { SelectOption } from '@config/typings/types';

const MultiSelectDemo = () => {
  // Sample options for different use cases
  const programmingLanguages: SelectOption[] = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'cpp', label: 'C++' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'swift', label: 'Swift' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' },
  ];

  const frameworks: SelectOption[] = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' },
    { value: 'nextjs', label: 'Next.js' },
    { value: 'nuxt', label: 'Nuxt.js' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'express', label: 'Express.js' },
    { value: 'fastify', label: 'Fastify' },
    { value: 'django', label: 'Django' },
    { value: 'flask', label: 'Flask' },
    { value: 'spring', label: 'Spring Boot' },
    { value: 'laravel', label: 'Laravel' },
  ];

  const skills: SelectOption[] = [
    { value: 'frontend', label: 'Frontend Development' },
    { value: 'backend', label: 'Backend Development' },
    { value: 'fullstack', label: 'Full Stack Development' },
    { value: 'mobile', label: 'Mobile Development' },
    { value: 'devops', label: 'DevOps' },
    { value: 'uiux', label: 'UI/UX Design' },
    { value: 'datascience', label: 'Data Science' },
    { value: 'machinelearning', label: 'Machine Learning' },
    { value: 'blockchain', label: 'Blockchain' },
    { value: 'cloud', label: 'Cloud Computing' },
  ];

  // State for different examples
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);
  const [maxItemsExample, setMaxItemsExample] = useState<string[]>([]);
  const [disabledExample, setDisabledExample] = useState<string[]>([
    'react',
    'typescript',
  ]);
  const [loadingExample, setLoadingExample] = useState<string[]>([]);
  const [errorExample, setErrorExample] = useState<string[]>([]);

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 py-8'>
      <div className='max-w-6xl mx-auto px-4'>
        <div className='mb-8'>
          <Typography variant='h1' className='text-center mb-4'>
            MultiSelect Component Demo
          </Typography>
          <Typography
            variant='p'
            className='text-center text-gray-600 dark:text-gray-400'
          >
            A comprehensive multi-select dropdown with search functionality
          </Typography>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {/* Basic MultiSelect */}
          <Card className='p-6'>
            <Typography variant='h3' className='mb-4'>
              Basic MultiSelect
            </Typography>
            <Typography
              variant='p'
              className='text-sm text-gray-600 dark:text-gray-400 mb-4'
            >
              Standard multi-select with search functionality
            </Typography>

            <MultiSelect
              label='Programming Languages'
              placeholder='Select programming languages...'
              options={programmingLanguages}
              value={selectedLanguages}
              onChange={setSelectedLanguages}
              helperText='Choose the programming languages you know'
            />

            <div className='mt-4'>
              <Typography variant='p' className='text-sm font-medium mb-2'>
                Selected: {selectedLanguages.length} items
              </Typography>
              <div className='flex flex-wrap gap-2'>
                {selectedLanguages.map(lang => (
                  <Badge key={lang} variant='primary'>
                    {
                      programmingLanguages.find(opt => opt.value === lang)
                        ?.label
                    }
                  </Badge>
                ))}
              </div>
            </div>
          </Card>

          {/* Max Items Example */}
          <Card className='p-6'>
            <Typography variant='h3' className='mb-4'>
              Max Items Limit
            </Typography>
            <Typography
              variant='p'
              className='text-sm text-gray-600 dark:text-gray-400 mb-4'
            >
              Limited to maximum 3 selections
            </Typography>

            <MultiSelect
              label='Top 3 Skills'
              placeholder='Select up to 3 skills...'
              options={skills}
              value={maxItemsExample}
              onChange={setMaxItemsExample}
              maxItems={3}
              helperText={`${maxItemsExample.length}/3 skills selected`}
            />

            <div className='mt-4'>
              <Typography variant='p' className='text-sm font-medium mb-2'>
                Selected: {maxItemsExample.length}/3
              </Typography>
              <div className='flex flex-wrap gap-2'>
                {maxItemsExample.map(skill => (
                  <Badge key={skill} variant='info'>
                    {skills.find(opt => opt.value === skill)?.label}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>

          {/* Different Variants */}
          <Card className='p-6'>
            <Typography variant='h3' className='mb-4'>
              Different Variants
            </Typography>
            <Typography
              variant='p'
              className='text-sm text-gray-600 dark:text-gray-400 mb-4'
            >
              Various styling variants
            </Typography>

            <div className='space-y-4'>
              <MultiSelect
                label='Frameworks (Default)'
                placeholder='Select frameworks...'
                options={frameworks}
                value={selectedFrameworks}
                onChange={setSelectedFrameworks}
                variant='default'
              />

              <MultiSelect
                label='Frameworks (Filled)'
                placeholder='Select frameworks...'
                options={frameworks}
                value={selectedFrameworks}
                onChange={setSelectedFrameworks}
                variant='filled'
              />

              <MultiSelect
                label='Frameworks (Outline)'
                placeholder='Select frameworks...'
                options={frameworks}
                value={selectedFrameworks}
                onChange={setSelectedFrameworks}
                variant='outline'
              />
            </div>
          </Card>

          {/* Different Sizes */}
          <Card className='p-6'>
            <Typography variant='h3' className='mb-4'>
              Different Sizes
            </Typography>
            <Typography
              variant='p'
              className='text-sm text-gray-600 dark:text-gray-400 mb-4'
            >
              Small, medium, and large sizes
            </Typography>

            <div className='space-y-4'>
              <MultiSelect
                label='Small Size'
                placeholder='Small...'
                options={programmingLanguages.slice(0, 5)}
                value={selectedLanguages}
                onChange={setSelectedLanguages}
                size='sm'
              />

              <MultiSelect
                label='Medium Size (Default)'
                placeholder='Medium...'
                options={programmingLanguages.slice(0, 5)}
                value={selectedLanguages}
                onChange={setSelectedLanguages}
                size='md'
              />

              <MultiSelect
                label='Large Size'
                placeholder='Large...'
                options={programmingLanguages.slice(0, 5)}
                value={selectedLanguages}
                onChange={setSelectedLanguages}
                size='lg'
              />
            </div>
          </Card>

          {/* Disabled State */}
          <Card className='p-6'>
            <Typography variant='h3' className='mb-4'>
              Disabled State
            </Typography>
            <Typography
              variant='p'
              className='text-sm text-gray-600 dark:text-gray-400 mb-4'
            >
              MultiSelect in disabled state
            </Typography>

            <MultiSelect
              label='Disabled MultiSelect'
              placeholder='This is disabled...'
              options={frameworks}
              value={disabledExample}
              onChange={setDisabledExample}
              disabled={true}
              helperText='This component is disabled'
            />

            <div className='mt-4'>
              <Button
                onClick={() => setDisabledExample(['react', 'typescript'])}
                size='sm'
              >
                Reset Selection
              </Button>
            </div>
          </Card>

          {/* Loading State */}
          <Card className='p-6'>
            <Typography variant='h3' className='mb-4'>
              Loading State
            </Typography>
            <Typography
              variant='p'
              className='text-sm text-gray-600 dark:text-gray-400 mb-4'
            >
              MultiSelect with loading indicator
            </Typography>

            <MultiSelect
              label='Loading Options'
              placeholder='Loading options...'
              options={[]}
              value={loadingExample}
              onChange={setLoadingExample}
              loading={true}
              helperText='Options are being loaded...'
            />
          </Card>

          {/* Error State */}
          <Card className='p-6'>
            <Typography variant='h3' className='mb-4'>
              Error State
            </Typography>
            <Typography
              variant='p'
              className='text-sm text-gray-600 dark:text-gray-400 mb-4'
            >
              MultiSelect with error message
            </Typography>

            <MultiSelect
              label='Error Example'
              placeholder='Select options...'
              options={skills}
              value={errorExample}
              onChange={setErrorExample}
              error='Please select at least one skill'
              helperText='This field is required'
            />
          </Card>

          {/* Non-searchable */}
          <Card className='p-6'>
            <Typography variant='h3' className='mb-4'>
              Non-searchable
            </Typography>
            <Typography
              variant='p'
              className='text-sm text-gray-600 dark:text-gray-400 mb-4'
            >
              MultiSelect without search functionality
            </Typography>

            <MultiSelect
              label='Simple Selection'
              placeholder='Click to select...'
              options={programmingLanguages.slice(0, 6)}
              value={selectedLanguages}
              onChange={setSelectedLanguages}
              searchable={false}
              helperText='No search functionality'
            />
          </Card>

          {/* Non-clearable */}
          <Card className='p-6'>
            <Typography variant='h3' className='mb-4'>
              Non-clearable
            </Typography>
            <Typography
              variant='p'
              className='text-sm text-gray-600 dark:text-gray-400 mb-4'
            >
              MultiSelect without clear all button
            </Typography>

            <MultiSelect
              label='No Clear All'
              placeholder='Select options...'
              options={frameworks.slice(0, 6)}
              value={selectedFrameworks}
              onChange={setSelectedFrameworks}
              clearable={false}
              helperText='No clear all button available'
            />
          </Card>
        </div>

        {/* Usage Examples */}
        <Card className='mt-8 p-6'>
          <Typography variant='h2' className='mb-6'>
            Usage Examples
          </Typography>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <Typography variant='h4' className='mb-3'>
                Basic Usage
              </Typography>
              <pre className='bg-gray-100 dark:bg-gray-800 p-4 rounded-md text-sm overflow-x-auto'>
                {`import { MultiSelect } from '@fsi/ui';

const [selected, setSelected] = useState<string[]>([]);

<MultiSelect
  label="Select Options"
  options={options}
  value={selected}
  onChange={setSelected}
  placeholder="Choose options..."
/>`}
              </pre>
            </div>

            <div>
              <Typography variant='h4' className='mb-3'>
                Advanced Usage
              </Typography>
              <pre className='bg-gray-100 dark:bg-gray-800 p-4 rounded-md text-sm overflow-x-auto'>
                {`<MultiSelect
  label="Skills"
  options={skills}
  value={selectedSkills}
  onChange={setSelectedSkills}
  maxItems={5}
  variant="filled"
  size="lg"
  searchable={true}
  clearable={true}
  loading={isLoading}
  error={error}
  helperText="Select up to 5 skills"
/>`}
              </pre>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MultiSelectDemo;
