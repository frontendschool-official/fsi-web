import { NextRequest, NextResponse } from 'next/server';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@fsi/config/firebase';

export async function GET(req: NextRequest) {
  try {
    const companiesRef = collection(db(), 'companies');

    // Get all companies
    const snapshot = await getDocs(companiesRef);
    const companies = snapshot.docs.map(doc => doc.data());

    // Calculate statistics
    const stats = {
      total: companies.length,
      byCountry: {
        India: companies.filter(c => c.country === 'India').length,
        Global: companies.filter(c => c.country === 'Global').length,
      },
      byStatus: {
        active: companies.filter(c => c.status === 'active').length,
        paused: companies.filter(c => c.status === 'paused').length,
        archived: companies.filter(c => c.status === 'archived').length,
      },
      bySource: {
        manual: companies.filter(c => c.sourceOfTruth === 'manual').length,
        gemini: companies.filter(c => c.sourceOfTruth === 'gemini').length,
        openai: companies.filter(c => c.sourceOfTruth === 'openai').length,
        scraped: companies.filter(c => c.sourceOfTruth === 'scraped').length,
        mixed: companies.filter(c => c.sourceOfTruth === 'mixed').length,
      },
      industries: companies.reduce((acc, company) => {
        acc[company.industry] = (acc[company.industry] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      recentCompanies: companies
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, 5)
        .map(c => ({
          name: c.name,
          createdAt: c.createdAt,
          country: c.country,
        })),
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching company stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch company statistics' },
      { status: 500 }
    );
  }
}
