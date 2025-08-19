'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Card,
  Button,
  Input,
  Select,
  Modal,
  LoadingSpinner,
  Badge,
  ThemeToggle,
  Textarea,
  Accordion,
} from '@fsi/ui';
import {
  useCompaniesStore,
  useDesignationsStore,
  useInterviewRoundsStore,
} from '@fsi/config/stores';
import {
  Designation,
  InterviewRound,
  RoundType,
} from '@fsi/config/typings/companies.types';

interface DesignationWithId extends Designation {
  id: string;
}

interface InterviewRoundWithId extends InterviewRound {
  id: string;
}

export default function DesignationsPage() {
  const params = useParams();
  const router = useRouter();
  const companyId = params?.id as string;

  const { currentCompany, fetchCompany } = useCompaniesStore();
  const {
    designations,
    loading,
    error,
    fetchDesignations,
    createDesignationData,
    updateDesignationData,
    deleteDesignationData,
    clearError,
  } = useDesignationsStore();
  const {
    rounds,
    loading: roundsLoading,
    error: roundsError,
    fetchInterviewRounds,
    createInterviewRoundData,
    updateInterviewRoundData,
    deleteInterviewRoundData,
    clearError: clearRoundsError,
  } = useInterviewRoundsStore();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateRoundModal, setShowCreateRoundModal] = useState(false);
  const [showEditRoundModal, setShowEditRoundModal] = useState(false);
  const [showDeleteRoundModal, setShowDeleteRoundModal] = useState(false);
  const [selectedDesignation, setSelectedDesignation] =
    useState<DesignationWithId | null>(null);
  const [selectedRound, setSelectedRound] =
    useState<InterviewRoundWithId | null>(null);
  const [newDesignation, setNewDesignation] = useState<Partial<Designation>>(
    {}
  );
  const [newRound, setNewRound] = useState<Partial<InterviewRound>>({});

  useEffect(() => {
    if (companyId) {
      fetchCompany(companyId);
      fetchDesignations(companyId);
    }
  }, [companyId, fetchCompany, fetchDesignations]);

  const handleCreateDesignation = async () => {
    try {
      await createDesignationData(companyId, newDesignation);
      setShowCreateModal(false);
      setNewDesignation({});
    } catch (error) {
      console.error('Failed to create designation:', error);
    }
  };

  const handleEditDesignation = async (designation: DesignationWithId) => {
    setSelectedDesignation(designation);
    setShowEditModal(true);
  };

  const handleDeleteDesignation = async (designation: DesignationWithId) => {
    setSelectedDesignation(designation);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedDesignation?.id) return;

    try {
      await deleteDesignationData(companyId, selectedDesignation.id);
      setShowDeleteModal(false);
      setSelectedDesignation(null);
    } catch (error) {
      console.error('Failed to delete designation:', error);
    }
  };

  const handleSaveEdit = async () => {
    if (!selectedDesignation?.id) return;

    try {
      await updateDesignationData(
        companyId,
        selectedDesignation.id,
        selectedDesignation
      );
      setShowEditModal(false);
      setSelectedDesignation(null);
    } catch (error) {
      console.error('Failed to update designation:', error);
    }
  };

  // Interview Rounds Handlers
  const handleCreateRound = async () => {
    if (!selectedDesignation?.id) return;

    try {
      await createInterviewRoundData(
        companyId,
        selectedDesignation.id,
        newRound
      );
      setShowCreateRoundModal(false);
      setNewRound({});
    } catch (error) {
      console.error('Failed to create interview round:', error);
    }
  };

  const handleEditRound = async (round: InterviewRoundWithId) => {
    setSelectedRound(round);
    setShowEditRoundModal(true);
  };

  const handleDeleteRound = async (round: InterviewRoundWithId) => {
    setSelectedRound(round);
    setShowDeleteRoundModal(true);
  };

  const confirmDeleteRound = async () => {
    if (!selectedRound?.id || !selectedDesignation?.id) return;

    try {
      await deleteInterviewRoundData(
        companyId,
        selectedDesignation.id,
        selectedRound.id
      );
      setShowDeleteRoundModal(false);
      setSelectedRound(null);
    } catch (error) {
      console.error('Failed to delete interview round:', error);
    }
  };

  const handleSaveEditRound = async () => {
    if (!selectedRound?.id || !selectedDesignation?.id) return;

    try {
      await updateInterviewRoundData(
        companyId,
        selectedDesignation.id,
        selectedRound.id,
        selectedRound
      );
      setShowEditRoundModal(false);
      setSelectedRound(null);
    } catch (error) {
      console.error('Failed to update interview round:', error);
    }
  };

  const handleViewRounds = async (designation: DesignationWithId) => {
    setSelectedDesignation(designation);
    await fetchInterviewRounds(companyId, designation.id);
  };

  if (error || roundsError) {
    return (
      <div className='p-6'>
        <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
          <p className='text-red-800'>Error: {error || roundsError}</p>
          <Button
            onClick={() => {
              clearError();
              clearRoundsError();
            }}
            className='mt-2'
          >
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
          <Button
            variant='outline'
            onClick={() => router.push(`/companies/${companyId}`)}
            className='mb-4'
          >
            ← Back to Company
          </Button>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-gray-100'>
            Designations Management
          </h1>
          <p className='text-gray-600 dark:text-gray-300'>
            {currentCompany?.name} - Interview Designations
          </p>
        </div>
        <div className='flex items-center space-x-4'>
          <Button onClick={() => setShowCreateModal(true)}>
            Add Designation
          </Button>
          <ThemeToggle />
        </div>
      </div>

      {/* Designations List */}
      <Card>
        {loading ? (
          <div className='flex justify-center items-center py-12'>
            <LoadingSpinner />
          </div>
        ) : (
          <div className='space-y-4'>
            <div className='flex justify-between items-center'>
              <h2 className='text-xl font-semibold text-gray-900 dark:text-gray-100'>
                Designations ({designations.length})
              </h2>
            </div>

            <div className='grid gap-4'>
              {designations.map(designation => (
                <div
                  key={designation.id}
                  className='border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'
                >
                  <div className='flex justify-between items-start'>
                    <div className='flex-1'>
                      <div className='flex items-center space-x-3 mb-2'>
                        <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
                          {designation.title}
                        </h3>
                        <Badge variant='primary'>{designation.level}</Badge>
                        <Badge variant='info'>{designation.track}</Badge>
                      </div>
                      <p className='text-gray-600 dark:text-gray-300 mb-2'>
                        {designation.locationType} •{' '}
                        {designation.locations?.join(', ') ||
                          'No specific locations'}
                      </p>
                      {designation.notes && (
                        <p className='text-sm text-gray-500 dark:text-gray-400 mb-2'>
                          {designation.notes}
                        </p>
                      )}
                      {designation.skills && (
                        <div className='space-y-1'>
                          {designation.skills.mustHave &&
                            designation.skills.mustHave.length > 0 && (
                              <div>
                                <span className='text-xs font-medium text-gray-500 dark:text-gray-400'>
                                  Must Have:
                                </span>
                                <div className='flex flex-wrap gap-1 mt-1'>
                                  {designation.skills.mustHave.map(
                                    (skill, index) => (
                                      <Badge
                                        key={index}
                                        variant='success'
                                        size='sm'
                                      >
                                        {skill}
                                      </Badge>
                                    )
                                  )}
                                </div>
                              </div>
                            )}
                          {designation.skills.niceToHave &&
                            designation.skills.niceToHave.length > 0 && (
                              <div>
                                <span className='text-xs font-medium text-gray-500 dark:text-gray-400'>
                                  Nice to Have:
                                </span>
                                <div className='flex flex-wrap gap-1 mt-1'>
                                  {designation.skills.niceToHave.map(
                                    (skill, index) => (
                                      <Badge
                                        key={index}
                                        variant='default'
                                        size='sm'
                                      >
                                        {skill}
                                      </Badge>
                                    )
                                  )}
                                </div>
                              </div>
                            )}
                        </div>
                      )}
                    </div>
                    <div className='flex items-center space-x-2'>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() => handleViewRounds(designation)}
                      >
                        View Rounds
                      </Button>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() => handleEditDesignation(designation)}
                      >
                        Edit
                      </Button>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() => handleDeleteDesignation(designation)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {designations.length === 0 && (
              <div className='text-center py-8 text-gray-500'>
                No designations found for this company
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Interview Rounds Accordion */}
      {selectedDesignation && (
        <Card>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-xl font-semibold text-gray-900 dark:text-gray-100'>
              Interview Rounds - {selectedDesignation.title}
            </h2>
            <Button size='sm' onClick={() => setShowCreateRoundModal(true)}>
              Add Round
            </Button>
          </div>

          {roundsLoading ? (
            <div className='flex justify-center items-center py-8'>
              <LoadingSpinner />
            </div>
          ) : rounds.length > 0 ? (
            <Accordion
              items={rounds.map(round => ({
                id: round.id,
                title: (
                  <div className='flex items-center justify-between w-full'>
                    <div className='flex items-center space-x-3'>
                      <span className='font-medium'>Round {round.order}</span>
                      <Badge variant='primary'>{round.type}</Badge>
                      <span className='text-sm text-gray-500'>
                        {round.durationMins} mins
                      </span>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <Button
                        size='sm'
                        variant='ghost'
                        onClick={e => {
                          e.stopPropagation();
                          handleEditRound(round);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        size='sm'
                        variant='ghost'
                        onClick={e => {
                          e.stopPropagation();
                          handleDeleteRound(round);
                        }}
                        className='text-red-600 hover:text-red-700'
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ),
                content: (
                  <div className='space-y-4 pt-4'>
                    <div>
                      <h4 className='font-medium text-gray-900 dark:text-gray-100 mb-2'>
                        {round.name}
                      </h4>
                      {round.description && (
                        <p className='text-gray-600 dark:text-gray-300 mb-3'>
                          {round.description}
                        </p>
                      )}
                    </div>

                    <div>
                      <h5 className='font-medium text-gray-900 dark:text-gray-100 mb-2'>
                        Focus Areas
                      </h5>
                      <div className='flex flex-wrap gap-2'>
                        {round.focusAreas.map((area, index) => (
                          <Badge key={index} variant='info' size='sm'>
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {round.evaluationRubric && (
                      <div>
                        <h5 className='font-medium text-gray-900 dark:text-gray-100 mb-2'>
                          Evaluation Criteria
                        </h5>
                        <div className='space-y-2'>
                          {round.evaluationRubric.criteria.map(
                            (criteria, index) => (
                              <div
                                key={index}
                                className='flex justify-between items-center text-sm'
                              >
                                <span>{criteria.key}</span>
                                <span className='text-gray-500'>
                                  Weight: {criteria.weight}%
                                </span>
                              </div>
                            )
                          )}
                          {round.evaluationRubric.passThreshold && (
                            <div className='text-sm text-gray-500'>
                              Pass Threshold:{' '}
                              {round.evaluationRubric.passThreshold}%
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {round.materials && (
                      <div>
                        <h5 className='font-medium text-gray-900 dark:text-gray-100 mb-2'>
                          Materials
                        </h5>
                        {round.materials.examples &&
                          round.materials.examples.length > 0 && (
                            <div className='mb-3'>
                              <h6 className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                                Examples:
                              </h6>
                              <ul className='list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1'>
                                {round.materials.examples.map(
                                  (example, index) => (
                                    <li key={index}>{example}</li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}
                        {round.materials.links &&
                          round.materials.links.length > 0 && (
                            <div>
                              <h6 className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                                Links:
                              </h6>
                              <ul className='list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1'>
                                {round.materials.links.map((link, index) => (
                                  <li key={index}>
                                    <a
                                      href={link}
                                      target='_blank'
                                      rel='noopener noreferrer'
                                      className='text-primary-600 hover:text-primary-700'
                                    >
                                      {link}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                      </div>
                    )}
                  </div>
                ),
              }))}
              variant='bordered'
              allowMultiple={true}
            />
          ) : (
            <div className='text-center py-8 text-gray-500'>
              No interview rounds found for this designation
            </div>
          )}
        </Card>
      )}

      {/* Create Designation Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title='Add New Designation'
      >
        <div className='space-y-4'>
          <Input
            label='Title'
            placeholder='e.g., SDE3 - Frontend'
            value={newDesignation.title || ''}
            onChange={e =>
              setNewDesignation({ ...newDesignation, title: e.target.value })
            }
          />
          <Select
            label='Level'
            value={newDesignation.level || ''}
            onChange={value =>
              setNewDesignation({
                ...newDesignation,
                level: value as Designation['level'],
              })
            }
            options={[
              { value: 'L3', label: 'L3' },
              { value: 'L4', label: 'L4' },
              { value: 'L5', label: 'L5' },
              { value: 'L5A', label: 'L5A' },
              { value: 'L6', label: 'L6' },
              { value: 'IC3', label: 'IC3' },
              { value: 'IC4', label: 'IC4' },
              { value: 'IC5', label: 'IC5' },
              { value: 'Senior', label: 'Senior' },
              { value: 'Staff', label: 'Staff' },
              { value: 'Principal', label: 'Principal' },
            ]}
          />
          <Select
            label='Track'
            value={newDesignation.track || ''}
            onChange={value =>
              setNewDesignation({
                ...newDesignation,
                track: value as Designation['track'],
              })
            }
            options={[
              { value: 'Frontend', label: 'Frontend' },
              { value: 'Fullstack', label: 'Fullstack' },
              { value: 'Mobile', label: 'Mobile' },
              { value: 'Backend', label: 'Backend' },
              { value: 'Web Platform', label: 'Web Platform' },
            ]}
          />
          <Select
            label='Location Type'
            value={newDesignation.locationType || ''}
            onChange={value =>
              setNewDesignation({
                ...newDesignation,
                locationType: value as Designation['locationType'],
              })
            }
            options={[
              { value: 'Onsite', label: 'Onsite' },
              { value: 'Hybrid', label: 'Hybrid' },
              { value: 'Remote', label: 'Remote' },
            ]}
          />
          <Input
            label='Locations (comma-separated)'
            placeholder='e.g., Bangalore, Mumbai, Remote'
            value={newDesignation.locations?.join(', ') || ''}
            onChange={e =>
              setNewDesignation({
                ...newDesignation,
                locations: e.target.value
                  .split(',')
                  .map(loc => loc.trim())
                  .filter(Boolean),
              })
            }
          />
          <Textarea
            label='Notes'
            placeholder='Brief description of the designation...'
            value={newDesignation.notes || ''}
            onChange={e =>
              setNewDesignation({
                ...newDesignation,
                notes: e.target.value,
              })
            }
          />
          <div className='flex justify-end space-x-2'>
            <Button variant='outline' onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleCreateDesignation}
              disabled={!newDesignation.title}
            >
              Create Designation
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Designation Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title='Edit Designation'
      >
        {selectedDesignation && (
          <div className='space-y-4'>
            <Input
              label='Title'
              value={selectedDesignation.title}
              onChange={e =>
                setSelectedDesignation({
                  ...selectedDesignation,
                  title: e.target.value,
                })
              }
            />
            <Select
              label='Level'
              value={selectedDesignation.level}
              onChange={value =>
                setSelectedDesignation({
                  ...selectedDesignation,
                  level: value as Designation['level'],
                })
              }
              options={[
                { value: 'L3', label: 'L3' },
                { value: 'L4', label: 'L4' },
                { value: 'L5', label: 'L5' },
                { value: 'L5A', label: 'L5A' },
                { value: 'L6', label: 'L6' },
                { value: 'IC3', label: 'IC3' },
                { value: 'IC4', label: 'IC4' },
                { value: 'IC5', label: 'IC5' },
                { value: 'Senior', label: 'Senior' },
                { value: 'Staff', label: 'Staff' },
                { value: 'Principal', label: 'Principal' },
              ]}
            />
            <Select
              label='Track'
              value={selectedDesignation.track}
              onChange={value =>
                setSelectedDesignation({
                  ...selectedDesignation,
                  track: value as Designation['track'],
                })
              }
              options={[
                { value: 'Frontend', label: 'Frontend' },
                { value: 'Fullstack', label: 'Fullstack' },
                { value: 'Mobile', label: 'Mobile' },
                { value: 'Backend', label: 'Backend' },
                { value: 'Web Platform', label: 'Web Platform' },
              ]}
            />
            <Select
              label='Location Type'
              value={selectedDesignation.locationType}
              onChange={value =>
                setSelectedDesignation({
                  ...selectedDesignation,
                  locationType: value as Designation['locationType'],
                })
              }
              options={[
                { value: 'Onsite', label: 'Onsite' },
                { value: 'Hybrid', label: 'Hybrid' },
                { value: 'Remote', label: 'Remote' },
              ]}
            />
            <Input
              label='Locations (comma-separated)'
              value={selectedDesignation.locations?.join(', ') || ''}
              onChange={e =>
                setSelectedDesignation({
                  ...selectedDesignation,
                  locations: e.target.value
                    .split(',')
                    .map(loc => loc.trim())
                    .filter(Boolean),
                })
              }
            />
            <Textarea
              label='Notes'
              value={selectedDesignation.notes || ''}
              onChange={e =>
                setSelectedDesignation({
                  ...selectedDesignation,
                  notes: e.target.value,
                })
              }
            />
            <div className='flex justify-end space-x-2'>
              <Button variant='outline' onClick={() => setShowEditModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveEdit}>Save Changes</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title='Delete Designation'
      >
        <div className='space-y-4'>
          <p className='text-gray-600 dark:text-gray-300'>
            Are you sure you want to delete{' '}
            <strong>{selectedDesignation?.title}</strong>? This action cannot be
            undone.
          </p>
          <div className='flex justify-end space-x-2'>
            <Button variant='outline' onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button
              variant='outline'
              onClick={confirmDelete}
              className='text-red-600 border-red-600 hover:bg-red-50 dark:text-red-400 dark:border-red-400 dark:hover:bg-red-900/20'
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>

      {/* Create Interview Round Modal */}
      <Modal
        isOpen={showCreateRoundModal}
        onClose={() => setShowCreateRoundModal(false)}
        title='Add Interview Round'
      >
        <div className='space-y-4'>
          <Select
            label='Round Type'
            value={newRound.type || ''}
            onChange={value =>
              setNewRound({ ...newRound, type: value as RoundType })
            }
            options={[
              { value: 'DSA', label: 'DSA' },
              { value: 'MachineCoding', label: 'Machine Coding' },
              { value: 'SystemDesign', label: 'System Design' },
              { value: 'FrontendCore', label: 'Frontend Core' },
              { value: 'Behavioral', label: 'Behavioral' },
              { value: 'BarRaiser', label: 'Bar Raiser' },
              { value: 'HiringManager', label: 'Hiring Manager' },
              { value: 'CodingPair', label: 'Coding Pair' },
              { value: 'TakeHome', label: 'Take Home' },
            ]}
          />
          <Input
            label='Round Name'
            placeholder='e.g., Technical Round 1'
            value={newRound.name || ''}
            onChange={e => setNewRound({ ...newRound, name: e.target.value })}
          />
          <Input
            label='Duration (minutes)'
            type='number'
            placeholder='60'
            value={newRound.durationMins?.toString() || ''}
            onChange={e =>
              setNewRound({
                ...newRound,
                durationMins: parseInt(e.target.value) || 0,
              })
            }
          />
          <Input
            label='Focus Areas (comma-separated)'
            placeholder='e.g., React, JavaScript, CSS'
            value={newRound.focusAreas?.join(', ') || ''}
            onChange={e =>
              setNewRound({
                ...newRound,
                focusAreas: e.target.value
                  .split(',')
                  .map(area => area.trim())
                  .filter(Boolean),
              })
            }
          />
          <Textarea
            label='Description'
            placeholder='Detailed description of the round...'
            value={newRound.description || ''}
            onChange={e =>
              setNewRound({ ...newRound, description: e.target.value })
            }
          />
          <div className='flex justify-end space-x-2'>
            <Button
              variant='outline'
              onClick={() => setShowCreateRoundModal(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateRound}
              disabled={
                !newRound.type ||
                !newRound.durationMins ||
                !newRound.focusAreas?.length
              }
            >
              Create Round
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Interview Round Modal */}
      <Modal
        isOpen={showEditRoundModal}
        onClose={() => setShowEditRoundModal(false)}
        title='Edit Interview Round'
      >
        {selectedRound && (
          <div className='space-y-4'>
            <Select
              label='Round Type'
              value={selectedRound.type}
              onChange={value =>
                setSelectedRound({ ...selectedRound, type: value as RoundType })
              }
              options={[
                { value: 'DSA', label: 'DSA' },
                { value: 'MachineCoding', label: 'Machine Coding' },
                { value: 'SystemDesign', label: 'System Design' },
                { value: 'FrontendCore', label: 'Frontend Core' },
                { value: 'Behavioral', label: 'Behavioral' },
                { value: 'BarRaiser', label: 'Bar Raiser' },
                { value: 'HiringManager', label: 'Hiring Manager' },
                { value: 'CodingPair', label: 'Coding Pair' },
                { value: 'TakeHome', label: 'Take Home' },
              ]}
            />
            <Input
              label='Round Name'
              value={selectedRound.name || ''}
              onChange={e =>
                setSelectedRound({ ...selectedRound, name: e.target.value })
              }
            />
            <Input
              label='Duration (minutes)'
              type='number'
              value={selectedRound.durationMins?.toString() || ''}
              onChange={e =>
                setSelectedRound({
                  ...selectedRound,
                  durationMins: parseInt(e.target.value) || 0,
                })
              }
            />
            <Input
              label='Focus Areas (comma-separated)'
              value={selectedRound.focusAreas?.join(', ') || ''}
              onChange={e =>
                setSelectedRound({
                  ...selectedRound,
                  focusAreas: e.target.value
                    .split(',')
                    .map(area => area.trim())
                    .filter(Boolean),
                })
              }
            />
            <Textarea
              label='Description'
              value={selectedRound.description || ''}
              onChange={e =>
                setSelectedRound({
                  ...selectedRound,
                  description: e.target.value,
                })
              }
            />
            <div className='flex justify-end space-x-2'>
              <Button
                variant='outline'
                onClick={() => setShowEditRoundModal(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveEditRound}>Save Changes</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Interview Round Confirmation Modal */}
      <Modal
        isOpen={showDeleteRoundModal}
        onClose={() => setShowDeleteRoundModal(false)}
        title='Delete Interview Round'
      >
        <div className='space-y-4'>
          <p className='text-gray-600 dark:text-gray-300'>
            Are you sure you want to delete{' '}
            <strong>
              {selectedRound?.name || `Round ${selectedRound?.order}`}
            </strong>
            ? This action cannot be undone.
          </p>
          <div className='flex justify-end space-x-2'>
            <Button
              variant='outline'
              onClick={() => setShowDeleteRoundModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant='outline'
              onClick={confirmDeleteRound}
              className='text-red-600 border-red-600 hover:bg-red-50 dark:text-red-400 dark:border-red-400 dark:hover:bg-red-900/20'
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
