// Redirect to MapPage — Home is now the Explorer's Map
import { useEffect } from 'react';
import { useLocation } from 'wouter';

export default function Home() {
  const [, navigate] = useLocation();
  useEffect(() => { navigate('/'); }, []);
  return null;
}
