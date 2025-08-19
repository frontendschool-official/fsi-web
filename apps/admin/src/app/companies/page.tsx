'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  Button,
  Input,
  Select,
  Modal,
  LoadingSpinner,
  Badge,
  ThemeToggle,
} from '@fsi/ui';
import { useCompaniesStore } from '@fsi/config/stores';
import { Company } from '@fsi/config/typings/companies.types';

interface CompanyWithId extends Company {
  id: string;
}

export default function CompaniesPage() {
  const router = useRouter();
  const {
    companies,
    currentCompany,
    loading,
    error,
    pagination,
    filters,
    fetchCompanies,
    fetchCompany,
    updateCompanyData,
    deleteCompanyData,
    generateCompany,
    setFilters,
    clearCurrentCompany,
    clearError,
  } = useCompaniesStore();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<CompanyWithId | null>(
    null
  );
  const [newCompanyName, setNewCompanyName] = useState('');

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const handleGenerateCompany = async () => {
    if (!newCompanyName.trim()) return;

    try {
      await generateCompany(newCompanyName.trim());
      setNewCompanyName('');
      setShowCreateModal(false);
    } catch (error) {
      console.error('Failed to generate company:', error);
    }
  };

  const handleEditCompany = async (company: CompanyWithId) => {
    setSelectedCompany(company);
    setShowEditModal(true);
  };

  const handleDeleteCompany = async (company: CompanyWithId) => {
    setSelectedCompany(company);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedCompany?.id) return;

    try {
      await deleteCompanyData(selectedCompany.id);
      setShowDeleteModal(false);
      setSelectedCompany(null);
    } catch (error) {
      console.error('Failed to delete company:', error);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ [key]: value });
  };

  const handleSearch = () => {
    fetchCompanies();
  };

  const handlePageChange = (page: number) => {
    fetchCompanies({ page });
  };

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

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-gray-100'>
            Companies Management
          </h1>
          <p className='text-gray-600 dark:text-gray-300'>
            Manage and generate company interview data
          </p>
        </div>
        <div className='flex items-center space-x-4'>
          <Button onClick={() => setShowCreateModal(true)}>
            Generate Company
          </Button>
          <ThemeToggle />
        </div>
      </div>

      {/* Filters */}
      <Card>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          <Input
            placeholder='Search companies...'
            value={filters.search}
            onChange={e => handleFilterChange('search', e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSearch()}
          />
          <Select
            value={filters.country}
            onChange={value => handleFilterChange('country', value)}
            options={[
              { value: '', label: 'All Countries' },
              { value: 'India', label: 'India' },
              { value: 'Global', label: 'Global' },
            ]}
          />
          <Select
            value={filters.status}
            onChange={value => handleFilterChange('status', value)}
            options={[
              { value: '', label: 'All Status' },
              { value: 'active', label: 'Active' },
              { value: 'paused', label: 'Paused' },
              { value: 'archived', label: 'Archived' },
            ]}
          />
          <Button onClick={handleSearch} variant='secondary'>
            Apply Filters
          </Button>
        </div>
      </Card>

      {/* Companies List */}
      <Card>
        {loading ? (
          <div className='flex justify-center items-center py-12'>
            <LoadingSpinner />
          </div>
        ) : (
          <div className='space-y-4'>
            <div className='flex justify-between items-center'>
              <h2 className='text-xl font-semibold text-gray-900 dark:text-gray-100'>
                Companies ({pagination?.total || 0})
              </h2>
            </div>

            <div className='grid gap-4'>
              {companies.map(company => (
                <div
                  key={company.id}
                  className='border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'
                >
                  <div className='flex justify-between items-start'>
                    <div className='flex-1'>
                      <div className='flex items-center space-x-3'>
                        <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
                          {company.name}
                        </h3>
                        <Badge
                          variant={
                            company.status === 'active' ? 'success' : 'warning'
                          }
                        >
                          {company.status}
                        </Badge>
                        <Badge variant='default'>{company.country}</Badge>
                      </div>
                      <p className='text-gray-600 dark:text-gray-300 mt-1'>
                        {company.industry}
                      </p>
                      <div className='flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400'>
                        {company.website && (
                          <a
                            href={company.website}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='hover:text-primary-500'
                          >
                            Website
                          </a>
                        )}
                        {company.employeeCountBand && (
                          <span>{company.employeeCountBand} employees</span>
                        )}
                        {company.foundedYear && (
                          <span>Founded {company.foundedYear}</span>
                        )}
                      </div>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() => router.push(`/companies/${company.id}`)}
                      >
                        View
                      </Button>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() =>
                          router.push(`/companies/${company.id}/designations`)
                        }
                      >
                        Designations
                      </Button>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() => handleEditCompany(company)}
                      >
                        Edit
                      </Button>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() => handleDeleteCompany(company)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className='flex justify-center items-center space-x-2 mt-6'>
                <Button
                  size='sm'
                  variant='outline'
                  disabled={pagination.page <= 1}
                  onClick={() => handlePageChange(pagination.page - 1)}
                >
                  Previous
                </Button>
                <span className='text-sm text-gray-600 dark:text-gray-300'>
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <Button
                  size='sm'
                  variant='outline'
                  disabled={pagination.page >= pagination.totalPages}
                  onClick={() => handlePageChange(pagination.page + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Generate Company Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title='Generate Company Data'
      >
        <div className='space-y-4'>
          <p className='text-gray-600 dark:text-gray-300'>
            Enter a company name to generate interview data using AI. This will
            create comprehensive interview process information including rounds,
            designations, and sources.
          </p>
          <Input
            placeholder='Enter company name (e.g., Google, Microsoft, Amazon)'
            value={newCompanyName}
            onChange={e => setNewCompanyName(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleGenerateCompany()}
          />
          <div className='flex justify-end space-x-2'>
            <Button variant='outline' onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleGenerateCompany}
              disabled={!newCompanyName.trim() || loading}
            >
              {loading ? <LoadingSpinner size='sm' /> : 'Generate'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Company Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title='Edit Company'
      >
        {selectedCompany && (
          <div className='space-y-4'>
            <Input
              label='Company Name'
              value={selectedCompany.name}
              onChange={e =>
                setSelectedCompany({ ...selectedCompany, name: e.target.value })
              }
            />
            <Input
              label='Industry'
              value={selectedCompany.industry}
              onChange={e =>
                setSelectedCompany({
                  ...selectedCompany,
                  industry: e.target.value,
                })
              }
            />
            <Select
              label='Country'
              value={selectedCompany.country}
              onChange={value =>
                setSelectedCompany({
                  ...selectedCompany,
                  country: value as 'India' | 'Global',
                })
              }
              options={[
                { value: 'India', label: 'India' },
                { value: 'Global', label: 'Global' },
              ]}
            />
            <Select
              label='Status'
              value={selectedCompany.status}
              onChange={value =>
                setSelectedCompany({
                  ...selectedCompany,
                  status: value as 'active' | 'paused' | 'archived',
                })
              }
              options={[
                { value: 'active', label: 'Active' },
                { value: 'paused', label: 'Paused' },
                { value: 'archived', label: 'Archived' },
              ]}
            />
            <Input
              label='Website'
              value={selectedCompany.website || ''}
              onChange={e =>
                setSelectedCompany({
                  ...selectedCompany,
                  website: e.target.value,
                })
              }
            />
            <div className='flex justify-end space-x-2'>
              <Button variant='outline' onClick={() => setShowEditModal(false)}>
                Cancel
              </Button>
              <Button
                onClick={async () => {
                  if (selectedCompany?.id) {
                    await updateCompanyData(
                      selectedCompany.id,
                      selectedCompany
                    );
                    setShowEditModal(false);
                    setSelectedCompany(null);
                  }
                }}
                disabled={loading}
              >
                {loading ? <LoadingSpinner size='sm' /> : 'Save Changes'}
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title='Delete Company'
      >
        <div className='space-y-4'>
          <p className='text-gray-600 dark:text-gray-300'>
            Are you sure you want to delete{' '}
            <strong>{selectedCompany?.name}</strong>? This action cannot be
            undone.
          </p>
          <div className='flex justify-end space-x-2'>
            <Button variant='outline' onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button
              variant='outline'
              onClick={confirmDelete}
              disabled={loading}
              className='text-red-600 border-red-600 hover:bg-red-50 dark:text-red-400 dark:border-red-400 dark:hover:bg-red-900/20'
            >
              {loading ? <LoadingSpinner size='sm' /> : 'Delete'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
