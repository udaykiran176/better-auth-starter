'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

type ChildProfile = {
  id: string;
  name: string;
  gender: string;
  dob: string;
  class: number;
};

export default function SelectChildPage() {
  const router = useRouter();
  const [children, setChildren] = useState<ChildProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const response = await fetch('/api/children');
        if (response.ok) {
          const data = await response.json();
          setChildren(data);
        }
      } catch (error) {
        console.error('Error fetching children:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChildren();
  }, []);

  const handleSelectChild = (childId: string) => {
    setIsRedirecting(true);
    // Set cookie that expires in 1 day
    document.cookie = `selected-child=${childId}; path=/; max-age=${60 * 60 * 24}`;
    router.push(`/dashboard?child=${childId}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Select a Child Profile</CardTitle>
          <CardDescription>Choose a profile to continue to the dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {children.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {children.map((child) => (
                  <Button
                    key={child.id}
                    variant="outline"
                    className="h-auto py-8 flex flex-col items-center justify-center gap-2"
                    onClick={() => handleSelectChild(child.id)}
                    disabled={isRedirecting}
                  >
                    <span className="text-2xl">👤</span>
                    <span className="font-medium">{child.name}</span>
                    <span className="text-sm text-muted-foreground">
                      Class {child.class} • {child.gender}
                    </span>
                  </Button>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No child profiles found. Please create a new profile.
              </p>
            )}

            <div className="pt-4 border-t">
              <Button
                className="w-full"
                onClick={() => router.push('/create-child')}
                disabled={isRedirecting}
              >
                + Add New Child
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
