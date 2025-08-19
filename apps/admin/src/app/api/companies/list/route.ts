import { NextRequest, NextResponse } from 'next/server';
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  where,
} from 'firebase/firestore';
import { db } from '@fsi/config/firebase';
import { Company } from '@fsi/config/typings/companies.types';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '20');
    const search = searchParams.get('search') || '';
    const country = searchParams.get('country') || '';
    const status = searchParams.get('status') || '';
    const industry = searchParams.get('industry') || '';

    const companiesRef = collection(db(), 'companies');
    let q = query(companiesRef, orderBy('name'), limit(pageSize));

    // Apply filters
    if (country) {
      q = query(q, where('country', '==', country));
    }
    if (status) {
      q = query(q, where('status', '==', status));
    }
    if (industry) {
      q = query(q, where('industry', '==', industry));
    }

    const snapshot = await getDocs(q);
    const companies: (Company & { id: string })[] = [];

    snapshot.forEach(doc => {
      const data = doc.data() as Company;
      // Apply search filter if provided
      if (
        !search ||
        data.name.toLowerCase().includes(search.toLowerCase()) ||
        data.slug.toLowerCase().includes(search.toLowerCase()) ||
        data.industry.toLowerCase().includes(search.toLowerCase())
      ) {
        companies.push({
          ...data,
          id: doc.id,
        });
      }
    });

    // Get total count for pagination
    const totalSnapshot = await getDocs(companiesRef);
    const total = totalSnapshot.size;

    return NextResponse.json({
      companies,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (error) {
    console.error('Error fetching companies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch companies' },
      { status: 500 }
    );
  }
}
