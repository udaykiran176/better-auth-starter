'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

export default function CreateChildPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    dob: '',
    class: '1',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const requestBody = {
        name: formData.name.trim(),
        gender: formData.gender,
        dob: formData.dob, // Send as-is, let the API handle the date parsing
        class: formData.class,
      };

      console.log('Sending request with data:', requestBody);

      const response = await fetch('/api/children', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to create child profile');
      }

      // Set cookie that expires in 1 day
      document.cookie = `selected-child=${responseData.id}; path=/; max-age=${60 * 60 * 24}`;
      router.push(`/dashboard?child=${responseData.id}`);
    } catch (error) {
      console.error('Error creating child:', error);
      alert(error instanceof Error ? error.message : 'An error occurred while creating the child profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Create New Child Profile</CardTitle>
          <CardDescription>Add a new child profile to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Child&apos;s Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select 
                value={formData.gender} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
                disabled={isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                id="dob"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                max={new Date().toISOString().split('T')[0]}
                onBlur={(e) => {
                  // Ensure the date is in YYYY-MM-DD format
                  if (e.target.value) {
                    const date = new Date(e.target.value);
                    if (!isNaN(date.getTime())) {
                      setFormData(prev => ({
                        ...prev,
                        dob: date.toISOString().split('T')[0]
                      }));
                    }
                  }
                }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="class">Class/Grade</Label>
              <Select 
                value={formData.class} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, class: value }))}
                disabled={isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((grade) => (
                    <SelectItem key={grade} value={grade.toString()}>
                      {grade === 1 ? `Class ${grade} (Primary)` : 
                       grade <= 5 ? `Class ${grade} (Primary)` : 
                       grade <= 8 ? `Class ${grade} (Middle)` : 
                       `Class ${grade} (High School)`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => router.push('/select-child')}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Profile'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
