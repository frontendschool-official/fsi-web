import { NextRequest, NextResponse } from 'next/server';
import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from '@fsi/config/firebase';
import { InterviewRound } from '@fsi/config/typings/companies.types';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; designationId: string } }
) {
  try {
    const { id: companyId, designationId } = params;

    // Get interview rounds for the designation
    const roundsRef = collection(
      db(),
      'companies',
      companyId,
      'designations',
      designationId,
      'interview_rounds'
    );

    const roundsQuery = query(roundsRef, orderBy('order', 'asc'));
    const roundsSnapshot = await getDocs(roundsQuery);

    const rounds: (InterviewRound & { id: string })[] = [];
    roundsSnapshot.forEach(doc => {
      rounds.push({
        id: doc.id,
        ...doc.data(),
      } as InterviewRound & { id: string });
    });

    return NextResponse.json({ rounds });
  } catch (error) {
    console.error('Error fetching interview rounds:', error);
    return NextResponse.json(
      { error: 'Failed to fetch interview rounds' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; designationId: string } }
) {
  try {
    const { id: companyId, designationId } = params;
    const body = await request.json();

    // Validate required fields
    if (!body.type || !body.durationMins || !body.focusAreas) {
      return NextResponse.json(
        { error: 'Missing required fields: type, durationMins, focusAreas' },
        { status: 400 }
      );
    }

    // Get the next order number
    const roundsRef = collection(
      db(),
      'companies',
      companyId,
      'designations',
      designationId,
      'interview_rounds'
    );

    const existingRoundsQuery = query(
      roundsRef,
      orderBy('order', 'desc'),
      limit(1)
    );
    const existingRoundsSnapshot = await getDocs(existingRoundsQuery);
    const nextOrder = existingRoundsSnapshot.empty
      ? 1
      : existingRoundsSnapshot.docs[0].data().order + 1;

    // Create the interview round
    const roundData: Partial<InterviewRound> = {
      order: nextOrder,
      type: body.type,
      name: body.name || `${body.type} Round`,
      durationMins: body.durationMins,
      focusAreas: body.focusAreas,
      description: body.description,
      evaluationRubric: body.evaluationRubric,
      materials: body.materials,
      updatedAt: new Date().toISOString(),
    };

    const roundRef = await addDoc(roundsRef, roundData);

    return NextResponse.json({
      success: true,
      message: 'Interview round created successfully',
      roundId: roundRef.id,
    });
  } catch (error) {
    console.error('Error creating interview round:', error);
    return NextResponse.json(
      { error: 'Failed to create interview round' },
      { status: 500 }
    );
  }
}
