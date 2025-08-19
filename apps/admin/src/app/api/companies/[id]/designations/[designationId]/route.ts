import { NextRequest, NextResponse } from 'next/server';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@fsi/config/firebase';
import { Designation } from '@fsi/config/typings/companies.types';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string; designationId: string } }
) {
  try {
    const { id: companyId, designationId } = params;

    const designationRef = doc(
      db(),
      'companies',
      companyId,
      'designations',
      designationId
    );
    const designationDoc = await getDoc(designationRef);

    if (!designationDoc.exists()) {
      return NextResponse.json(
        { error: 'Designation not found' },
        { status: 404 }
      );
    }

    const designationData = designationDoc.data() as Designation;
    return NextResponse.json({ ...designationData, id: designationId });
  } catch (error) {
    console.error('Error fetching designation:', error);
    return NextResponse.json(
      { error: 'Failed to fetch designation' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string; designationId: string } }
) {
  try {
    const { id: companyId, designationId } = params;
    const updateData = await req.json();

    const designationRef = doc(
      db(),
      'companies',
      companyId,
      'designations',
      designationId
    );
    const designationDoc = await getDoc(designationRef);

    if (!designationDoc.exists()) {
      return NextResponse.json(
        { error: 'Designation not found' },
        { status: 404 }
      );
    }

    const updatePayload = {
      ...updateData,
      updatedAt: new Date().toISOString(),
    };

    await updateDoc(designationRef, updatePayload);

    return NextResponse.json({
      success: true,
      message: 'Designation updated successfully',
    });
  } catch (error) {
    console.error('Error updating designation:', error);
    return NextResponse.json(
      { error: 'Failed to update designation' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string; designationId: string } }
) {
  try {
    const { id: companyId, designationId } = params;

    const designationRef = doc(
      db(),
      'companies',
      companyId,
      'designations',
      designationId
    );
    const designationDoc = await getDoc(designationRef);

    if (!designationDoc.exists()) {
      return NextResponse.json(
        { error: 'Designation not found' },
        { status: 404 }
      );
    }

    await deleteDoc(designationRef);

    return NextResponse.json({
      success: true,
      message: 'Designation deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting designation:', error);
    return NextResponse.json(
      { error: 'Failed to delete designation' },
      { status: 500 }
    );
  }
}
