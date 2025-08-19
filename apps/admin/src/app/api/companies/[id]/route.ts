import { NextRequest, NextResponse } from 'next/server';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@fsi/config/firebase';
import { Company } from '@fsi/config/typings/companies.types';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const companyRef = doc(db(), 'companies', id);
    const companyDoc = await getDoc(companyRef);

    if (!companyDoc.exists()) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    const companyData = companyDoc.data() as Company;
    return NextResponse.json({
      ...companyData,
      id: companyDoc.id,
    });
  } catch (error) {
    console.error('Error fetching company:', error);
    return NextResponse.json(
      { error: 'Failed to fetch company' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const updateData = await req.json();

    const companyRef = doc(db(), 'companies', id);
    const companyDoc = await getDoc(companyRef);

    if (!companyDoc.exists()) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    const updatePayload = {
      ...updateData,
      updatedAt: new Date().toISOString(),
      updatedBy: 'admin@system',
    };

    await updateDoc(companyRef, updatePayload);

    return NextResponse.json({
      success: true,
      message: 'Company updated successfully',
    });
  } catch (error) {
    console.error('Error updating company:', error);
    return NextResponse.json(
      { error: 'Failed to update company' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const companyRef = doc(db(), 'companies', id);
    const companyDoc = await getDoc(companyRef);

    if (!companyDoc.exists()) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    await deleteDoc(companyRef);

    return NextResponse.json({
      success: true,
      message: 'Company deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting company:', error);
    return NextResponse.json(
      { error: 'Failed to delete company' },
      { status: 500 }
    );
  }
}
