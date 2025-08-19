'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Card,
  Button,
  LoadingSpinner,
  Badge,
  ThemeToggle,
  Tabs,
} from '@fsi/ui';
import { useCompaniesStore, useDesignationsStore } from '@fsi/config/stores';
import {
  Company,
  Designation,
  InterviewRound,
} from '@fsi/config/typings/companies.types';

interface CompanyWithId extends Company {
  id: string;
}

export default function CompanyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const companyId = params?.id as string;

  const {
    currentCompany,
    loading,
    error,
    fetchCompany,
    updateCompanyData,
    clearCurrentCompany,
    clearError,
  } = useCompaniesStore();

  const {
    designations,
    loading: designationsLoading,
    error: designationsError,
    fetchDesignations,
    clearError: clearDesignationsError,
  } = useDesignationsStore();

  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<Company>>({});

  useEffect(() => {
    if (companyId) {
      fetchCompany(companyId);
      fetchDesignations(companyId);
    }

    return () => {
      clearCurrentCompany();
    };
  }, [companyId, fetchCompany, fetchDesignations, clearCurrentCompany]);

  const handleSave = async () => {
    if (!currentCompany?.id) return;

    try {
      await updateCompanyData(currentCompany.id, editData);
      setIsEditing(false);
      setEditData({});
    } catch (error) {
      console.error('Failed to update company:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({});
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className='p-6'>
        <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
          <p className='text-red-800'>Error: {error}</p>
          <Button onClick={clearError} className='mt-2'>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!currentCompany) {
    return (
      <div className='p-6'>
        <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4'>
          <p className='text-yellow-800'>Company not found</p>
          <Button onClick={() => router.push('/companies')} className='mt-2'>
            Back to Companies
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex justify-between items-center'>
        <div>
          <Button
            variant='outline'
            onClick={() => router.push('/companies')}
            className='mb-4'
          >
            ← Back to Companies
          </Button>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-gray-100'>
            {currentCompany.name}
          </h1>
          <p className='text-gray-600 dark:text-gray-300'>
            Company Details & Interview Process
          </p>
        </div>
        <div className='flex items-center space-x-4'>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>Edit Company</Button>
          ) : (
            <div className='flex space-x-2'>
              <Button onClick={handleSave}>Save Changes</Button>
              <Button variant='outline' onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          )}
          <ThemeToggle />
        </div>
      </div>

      {/* Company Overview */}
      <Card>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-xl font-semibold text-gray-900 dark:text-gray-100'>
            Company Overview
          </h2>
          <div className='flex items-center space-x-2'>
            <Badge
              variant={
                currentCompany.status === 'active' ? 'success' : 'warning'
              }
            >
              {currentCompany.status}
            </Badge>
            <Badge variant='default'>{currentCompany.country}</Badge>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                Industry
              </label>
              <p className='mt-1 text-gray-900 dark:text-gray-100'>
                {isEditing ? (
                  <input
                    type='text'
                    value={editData.industry || currentCompany.industry}
                    onChange={e =>
                      setEditData({ ...editData, industry: e.target.value })
                    }
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500'
                  />
                ) : (
                  currentCompany.industry
                )}
              </p>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                Website
              </label>
              <p className='mt-1 text-gray-900 dark:text-gray-100'>
                {isEditing ? (
                  <input
                    type='url'
                    value={editData.website || currentCompany.website || ''}
                    onChange={e =>
                      setEditData({ ...editData, website: e.target.value })
                    }
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500'
                  />
                ) : currentCompany.website ? (
                  <a
                    href={currentCompany.website}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-primary-600 hover:text-primary-500'
                  >
                    {currentCompany.website}
                  </a>
                ) : (
                  'Not available'
                )}
              </p>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                Employee Count
              </label>
              <p className='mt-1 text-gray-900 dark:text-gray-100'>
                {currentCompany.employeeCountBand || 'Not specified'}
              </p>
            </div>
          </div>

          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                Founded Year
              </label>
              <p className='mt-1 text-gray-900 dark:text-gray-100'>
                {currentCompany.foundedYear || 'Not specified'}
              </p>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                Product Based
              </label>
              <p className='mt-1 text-gray-900 dark:text-gray-100'>
                {currentCompany.isProductBased !== undefined
                  ? currentCompany.isProductBased
                    ? 'Yes'
                    : 'No'
                  : 'Not specified'}
              </p>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                Currently Hiring
              </label>
              <p className='mt-1 text-gray-900 dark:text-gray-100'>
                {currentCompany.isHiring !== undefined
                  ? currentCompany.isHiring
                    ? 'Yes'
                    : 'No'
                  : 'Not specified'}
              </p>
            </div>
          </div>
        </div>

        {currentCompany.tags && currentCompany.tags.length > 0 && (
          <div className='mt-6'>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Tags
            </label>
            <div className='flex flex-wrap gap-2'>
              {currentCompany.tags.map((tag, index) => (
                <Badge key={index} variant='info'>
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Tabs for different sections */}
      <Card>
        <Tabs
          tabs={[
            {
              id: 'overview',
              label: 'Overview',
              content: (
                <div className='space-y-4'>
                  <div>
                    <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2'>
                      Company Information
                    </h3>
                    <p className='text-gray-600 dark:text-gray-300'>
                      Last verified:{' '}
                      {currentCompany.lastVerifiedAt
                        ? new Date(
                            currentCompany.lastVerifiedAt
                          ).toLocaleDateString()
                        : 'Not verified'}
                    </p>
                    <p className='text-gray-600 dark:text-gray-300'>
                      Source of truth:{' '}
                      {currentCompany.sourceOfTruth || 'manual'}
                    </p>
                    <p className='text-gray-600 dark:text-gray-300'>
                      Version: {currentCompany.version || 1}
                    </p>
                  </div>
                </div>
              ),
            },
            {
              id: 'designations',
              label: 'Designations',
              content: (
                <div className='space-y-4'>
                  <div className='flex justify-between items-center'>
                    <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
                      Interview Designations
                    </h3>
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={() =>
                        router.push(`/companies/${companyId}/designations`)
                      }
                    >
                      Manage Designations
                    </Button>
                  </div>
                  <p className='text-gray-600 dark:text-gray-300'>
                    This company has multiple interview tracks and designations.
                    Each designation represents a different role level and
                    interview process.
                  </p>

                  {designationsLoading ? (
                    <div className='flex justify-center items-center py-8'>
                      <LoadingSpinner />
                    </div>
                  ) : designationsError ? (
                    <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
                      <p className='text-red-800'>Error: {designationsError}</p>
                      <Button onClick={clearDesignationsError} className='mt-2'>
                        Try Again
                      </Button>
                    </div>
                  ) : designations.length > 0 ? (
                    <div className='grid gap-4'>
                      {designations.map(designation => (
                        <div
                          key={designation.id}
                          className='border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'
                        >
                          <div className='flex justify-between items-start'>
                            <div className='flex-1'>
                              <div className='flex items-center space-x-3 mb-2'>
                                <h4 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
                                  {designation.title}
                                </h4>
                                <Badge variant='primary'>
                                  {designation.level}
                                </Badge>
                                <Badge variant='info'>
                                  {designation.track}
                                </Badge>
                              </div>
                              <p className='text-gray-600 dark:text-gray-300 mb-2'>
                                {designation.locationType} •{' '}
                                {designation.locations?.join(', ') ||
                                  'No specific locations'}
                              </p>
                              {designation.notes && (
                                <p className='text-sm text-gray-500 dark:text-gray-400'>
                                  {designation.notes}
                                </p>
                              )}
                            </div>
                            <div className='flex items-center space-x-2'>
                              <Button size='sm' variant='outline'>
                                View Details
                              </Button>
                              <Button size='sm' variant='outline'>
                                Edit
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className='text-center py-8 text-gray-500'>
                      No designations found for this company
                    </div>
                  )}
                </div>
              ),
            },
            {
              id: 'salary',
              label: 'Salary Bands',
              content: (
                <div className='space-y-4'>
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
                    Salary Bands
                  </h3>
                  {currentCompany.salaryBands &&
                  Object.keys(currentCompany.salaryBands).length > 0 ? (
                    <div className='grid gap-4'>
                      {Object.entries(currentCompany.salaryBands).map(
                        ([designation, band]) => (
                          <div
                            key={designation}
                            className='border border-gray-200 dark:border-gray-700 rounded-lg p-4'
                          >
                            <h4 className='font-medium text-gray-900 dark:text-gray-100'>
                              {designation}
                            </h4>
                            <p className='text-gray-600 dark:text-gray-300'>
                              {band.currency} {band.min.toLocaleString()} -{' '}
                              {band.max.toLocaleString()}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  ) : (
                    <p className='text-gray-600 dark:text-gray-300'>
                      No salary information available
                    </p>
                  )}
                </div>
              ),
            },
            {
              id: 'sources',
              label: 'Sources',
              content: (
                <div className='space-y-4'>
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
                    Information Sources
                  </h3>
                  <p className='text-gray-600 dark:text-gray-300'>
                    This data was compiled from various sources including career
                    pages, interview reports, and employee feedback.
                  </p>
                  {/* Sources would be loaded here */}
                </div>
              ),
            },
          ]}
          defaultTab={activeTab}
        />
      </Card>
    </div>
  );
}
