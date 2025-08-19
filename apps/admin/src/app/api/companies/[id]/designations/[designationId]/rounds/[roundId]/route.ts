import { NextRequest, NextResponse } from 'next/server';
import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
  query,
  orderBy,
  writeBatch,
} from 'firebase/firestore';
import { db } from '@fsi/config/firebase';
import { InterviewRound } from '@fsi/config/typings/companies.types';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; designationId: string; roundId: string } }
) {
  try {
    const { id: companyId, designationId, roundId } = params;

    // Get the specific interview round
    const roundRef = doc(
      db(),
      'companies',
      companyId,
      'designations',
      designationId,
      'interview_rounds',
      roundId
    );

    const roundDoc = await getDoc(roundRef);

    if (!roundDoc.exists()) {
      return NextResponse.json(
        { error: 'Interview round not found' },
        { status: 404 }
      );
    }

    const roundData = roundDoc.data();
    const round: InterviewRound & { id: string } = {
      id: roundDoc.id,
      ...roundData,
    } as InterviewRound & { id: string };

    return NextResponse.json(round);
  } catch (error) {
    console.error('Error fetching interview round:', error);
    return NextResponse.json(
      { error: 'Failed to fetch interview round' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; designationId: string; roundId: string } }
) {
  try {
    const { id: companyId, designationId, roundId } = params;
    const body = await request.json();

    // Validate required fields
    if (!body.type || !body.durationMins || !body.focusAreas) {
      return NextResponse.json(
        { error: 'Missing required fields: type, durationMins, focusAreas' },
        { status: 400 }
      );
    }

    // Update the interview round
    const roundRef = doc(
      db(),
      'companies',
      companyId,
      'designations',
      designationId,
      'interview_rounds',
      roundId
    );

    const updateData: Partial<InterviewRound> = {
      type: body.type,
      name: body.name || `${body.type} Round`,
      durationMins: body.durationMins,
      focusAreas: body.focusAreas,
      description: body.description,
      evaluationRubric: body.evaluationRubric,
      materials: body.materials,
      updatedAt: new Date().toISOString(),
    };

    // Only update order if provided
    if (body.order !== undefined) {
      updateData.order = body.order;
    }

    await updateDoc(roundRef, updateData);

    return NextResponse.json({
      success: true,
      message: 'Interview round updated successfully',
    });
  } catch (error) {
    console.error('Error updating interview round:', error);
    return NextResponse.json(
      { error: 'Failed to update interview round' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; designationId: string; roundId: string } }
) {
  try {
    const { id: companyId, designationId, roundId } = params;

    // Delete the interview round
    const roundRef = doc(
      db(),
      'companies',
      companyId,
      'designations',
      designationId,
      'interview_rounds',
      roundId
    );

    await deleteDoc(roundRef);

    // Reorder remaining rounds
    const roundsRef = collection(
      db(),
      'companies',
      companyId,
      'designations',
      designationId,
      'interview_rounds'
    );

    const remainingRoundsQuery = query(roundsRef, orderBy('order', 'asc'));
    const remainingRoundsSnapshot = await getDocs(remainingRoundsQuery);

    const batch = writeBatch(db());
    let newOrder = 1;
    remainingRoundsSnapshot.forEach(docSnapshot => {
      batch.update(docSnapshot.ref, { order: newOrder++ });
    });

    await batch.commit();

    return NextResponse.json({
      success: true,
      message: 'Interview round deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting interview round:', error);
    return NextResponse.json(
      { error: 'Failed to delete interview round' },
      { status: 500 }
    );
  }
}
