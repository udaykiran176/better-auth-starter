import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/server/users';
import { db } from '@/db/drizzle';
import { childProfile } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const session = await getCurrentUser();
    if (!session?.currentUser?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const children = await db
      .select()
      .from(childProfile)
      .where(eq(childProfile.userId, session.user.id));

    return NextResponse.json(children);
  } catch (error) {
    console.error('Error fetching children:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getCurrentUser();
    if (!session?.currentUser?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    console.log('Received request body:', body);

    // Validate required fields
    const { name, gender, dob, class: classLevel } = body;
    
    if (!name || !gender || !dob || classLevel === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const [newChild] = await db
      .insert(childProfile)
      .values({
        id: crypto.randomUUID(),
        userId: session.user.id,
        name,
        gender,
        dob: new Date(dob),
        class: typeof classLevel === 'string' ? parseInt(classLevel, 10) : classLevel,
      })
      .returning();

    console.log('Created child profile:', newChild);
    return NextResponse.json(newChild);
  } catch (error) {
    console.error('Error creating child profile:', error);
    return NextResponse.json(
      { error: 'Failed to create child profile' },
      { status: 500 }
    );
  }
}
