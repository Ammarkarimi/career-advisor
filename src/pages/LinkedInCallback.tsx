// LinkedInCallback.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LinkedInCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      fetch(`http://localhost:5000/linkedin/callback?code=${code}`)
        .then(res => res.json())
        .then(data => {
          console.log('LinkedIn Profile:', data);
          localStorage.setItem('linkedinUser', JSON.stringify(data));
          navigate('/'); // or to a dashboard
        })
        .catch(err => console.error('Error:', err));
    }
  }, [navigate]);

  return <div>Connecting to LinkedIn...</div>;
};

export default LinkedInCallback;
