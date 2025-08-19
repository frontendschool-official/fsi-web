import { NextRequest, NextResponse } from 'next/server';
import {
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
} from 'firebase/firestore';
import { db } from '@fsi/config/firebase';
import { Designation } from '@fsi/config/typings/companies.types';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: companyId } = params;

    const designationsRef = collection(
      db(),
      'companies',
      companyId,
      'designations'
    );
    const designationsQuery = query(designationsRef, orderBy('title'));
    const snapshot = await getDocs(designationsQuery);

    const designations: (Designation & { id: string })[] = [];

    snapshot.forEach(doc => {
      const data = doc.data() as Designation;
      designations.push({
        ...data,
        id: doc.id,
      });
    });

    return NextResponse.json({ designations });
  } catch (error) {
    console.error('Error fetching designations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch designations' },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: companyId } = params;
    const designationData = await req.json();

    const designationsRef = collection(
      db(),
      'companies',
      companyId,
      'designations'
    );

    const newDesignation = {
      ...designationData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const docRef = await addDoc(designationsRef, newDesignation);

    return NextResponse.json({
      success: true,
      message: 'Designation created successfully',
      designationId: docRef.id,
    });
  } catch (error) {
    console.error('Error creating designation:', error);
    return NextResponse.json(
      { error: 'Failed to create designation' },
      { status: 500 }
    );
  }
}
