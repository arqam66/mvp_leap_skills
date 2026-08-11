'use client';

import React from 'react';
import { use } from 'react';
import ProfilePage from '../../components/ProfilePage';

export default function CanonicalProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = use(params);

  // Map username parameter to ProfilePage
  return <ProfilePage slug={username} />;
}
