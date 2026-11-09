import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import SplashScreen from './components/SplashScreen.jsx';

function App() {
  const [currentView, setCurrentView] = useState(() => {
    if (window.location.pathname === '/login' || window.location.hash === '#login') {
      return 'login';
    }
    if (
      window.location.pathname === '/forgot-password' ||
      window.location.hash === '#forgot-password'
    ) {
      return 'forgot-password';
    }
    if (
      window.location.pathname === '/reset-password' ||
      window.location.hash === '#reset-password'
    ) {
      return 'reset-password';
    }
    if (window.location.pathname === '/account' || window.location.hash === '#account') {
      return 'account';
    }
    if (
      window.location.pathname === '/contacts' ||
      window.location.hash === '#contacts' ||
      window.location.pathname === '/my-contacts' ||
      window.location.hash === '#my-contacts'
    ) {
      return 'contacts';
    }
    if (window.location.pathname === '/profile' || window.location.hash === '#profile') {
      return 'profile';
    }
    if (
      window.location.pathname === '/social' ||
      window.location.hash === '#social' ||
      window.location.pathname === '/social-connections' ||
      window.location.hash === '#social-connections'
    ) {
      return 'social';
    }
    if (
      window.location.pathname === '/search-and-discovery' ||
      window.location.hash === '#search-and-discovery' ||
      window.location.pathname === '/search' ||
      window.location.hash === '#search'
    ) {
      return 'search-and-discovery';
    }
    if (
      window.location.pathname === '/privacy' ||
      window.location.hash === '#privacy' ||
      window.location.pathname === '/privacy-security' ||
      window.location.hash === '#privacy-security'
    ) {
      return 'privacy';
    }
    if (window.location.pathname === '/messages' || window.location.hash === '#messages') {
      return 'messages';
    }
    if (
      window.location.pathname === '/whats-happening' ||
      window.location.hash === '#whats-happening' ||
      window.location.pathname === '/whats-happening-around-you' ||
      window.location.hash === '#whats-happening-around-you'
    ) {
      return 'whats-happening';
    }
    if (
      window.location.pathname === '/photo-sharing' ||
      window.location.hash === '#photo-sharing' ||
      window.location.pathname === '/photo-and-image-sharing' ||
      window.location.hash === '#photo-and-image-sharing'
    ) {
      return 'photo-sharing';
    }
    if (
      window.location.pathname === '/video-sharing' ||
      window.location.hash === '#video-sharing'
    ) {
      return 'video-sharing';
    }
    if (window.location.pathname === '/stories' || window.location.hash === '#stories') {
      return 'stories';
    }
    if (
      window.location.pathname === '/live-stream' ||
      window.location.hash === '#live-stream'
    ) {
      return 'live-stream';
    }
    if (
      window.location.pathname === '/communities' ||
      window.location.hash === '#communities'
    ) {
      return 'communities';
    }
    if (
      window.location.pathname === '/community-management' ||
      window.location.hash === '#community-management' ||
      window.location.pathname === '/community-manage' ||
      window.location.hash === '#community-manage'
    ) {
      return 'community-management';
    }
    if (
      window.location.pathname === '/events-and-meetups' ||
      window.location.hash === '#events-and-meetups' ||
      window.location.pathname === '/events' ||
      window.location.hash === '#events'
    ) {
      return 'events-and-meetups';
    }
    if (
      window.location.pathname === '/public-page' ||
      window.location.hash === '#public-page' ||
      window.location.pathname === '/public-pages' ||
      window.location.hash === '#public-pages' ||
      window.location.pathname === '/public' ||
      window.location.hash === '#public'
    ) {
      return 'public-page';
    }
    if (
      window.location.pathname === '/file-and-document-sharing' ||
      window.location.hash === '#file-and-document-sharing' ||
      window.location.pathname === '/files-and-documents' ||
      window.location.hash === '#files-and-documents' ||
      window.location.pathname === '/file-sharing' ||
      window.location.hash === '#file-sharing' ||
      window.location.pathname === '/documents' ||
      window.location.hash === '#documents'
    ) {
      return 'file-and-document-sharing';
    }
    if (
      window.location.pathname === '/learning-and-knowledge-sharing' ||
      window.location.hash === '#learning-and-knowledge-sharing' ||
      window.location.pathname === '/learning-knowledge-sharing' ||
      window.location.hash === '#learning-knowledge-sharing' ||
      window.location.pathname === '/learning' ||
      window.location.hash === '#learning' ||
      window.location.pathname === '/knowledge' ||
      window.location.hash === '#knowledge'
    ) {
      return 'learning-and-knowledge-sharing';
    }
    if (
      window.location.pathname === '/developer-and-technology-community' ||
      window.location.hash === '#developer-and-technology-community' ||
      window.location.pathname === '/developer-technology-community' ||
      window.location.hash === '#developer-technology-community' ||
      window.location.pathname === '/developer-community' ||
      window.location.hash === '#developer-community' ||
      window.location.pathname === '/developers' ||
      window.location.hash === '#developers'
    ) {
      return 'developer-and-technology-community';
    }
    if (
      window.location.pathname === '/business-and-professional-networking' ||
      window.location.hash === '#business-and-professional-networking' ||
      window.location.pathname === '/business-networking' ||
      window.location.hash === '#business-networking' ||
      window.location.pathname === '/professional-networking' ||
      window.location.hash === '#professional-networking' ||
      window.location.pathname === '/business' ||
      window.location.hash === '#business'
    ) {
      return 'business-and-professional-networking';
    }
    if (
      window.location.pathname === '/polls-and-voting' ||
      window.location.hash === '#polls-and-voting' ||
      window.location.pathname === '/polls' ||
      window.location.hash === '#polls' ||
      window.location.pathname === '/voting' ||
      window.location.hash === '#voting'
    ) {
      return 'polls-and-voting';
    }
    if (
      window.location.pathname === '/advertising' ||
      window.location.hash === '#advertising'
    ) {
      return 'advertising';
    }
    if (
      window.location.pathname === '/subscription-and-payments' ||
      window.location.hash === '#subscription-and-payments' ||
      window.location.pathname === '/subscriptions-and-payments' ||
      window.location.hash === '#subscriptions-and-payments'
    ) {
      return 'subscription-and-payments';
    }
    if (
      window.location.pathname === '/settings-and-personalization' ||
      window.location.hash === '#settings-and-personalization' ||
      window.location.pathname === '/settings' ||
      window.location.hash === '#settings'
    ) {
      return 'settings-and-personalization';
    }
    if (
      window.location.pathname === '/blocking-and-safety' ||
      window.location.hash === '#blocking-and-safety' ||
      window.location.pathname === '/blocking-safety' ||
      window.location.hash === '#blocking-safety' ||
      window.location.pathname === '/blocking' ||
      window.location.hash === '#blocking' ||
      window.location.pathname === '/safety' ||
      window.location.hash === '#safety'
    ) {
      return 'blocking-and-safety';
    }
    if (
      window.location.pathname === '/voice-and-video-call' ||
      window.location.hash === '#voice-and-video-call' ||
      window.location.pathname === '/voice-video-call' ||
      window.location.hash === '#voice-video-call'
    ) {
      return 'voice-and-video-call';
    }
    if (window.location.pathname === '/blank' || window.location.hash === '#blank') {
      return 'blank';
    }
    return 'register';
  });

  const [showSplash, setShowSplash] = useState(true);

  const navigateTo = (view) => {
    setCurrentView(view);
    const path =
      view === 'login'
        ? '/login'
        : view === 'forgot-password'
        ? '/forgot-password'
        : view === 'reset-password'
        ? '/reset-password'
        : view === 'account'
        ? '/account'
        : view === 'contacts'
        ? '/contacts'
        : view === 'profile'
        ? '/profile'
        : view === 'social'
        ? '/social-connections'
        : view === 'search-and-discovery'
        ? '/search-and-discovery'
        : view === 'privacy'
        ? '/privacy-security'
        : view === 'messages'
        ? '/messages'
        : view === 'whats-happening'
        ? '/whats-happening'
        : view === 'photo-sharing'
        ? '/photo-sharing'
        : view === 'video-sharing'
        ? '/video-sharing'
        : view === 'stories'
        ? '/stories'
        : view === 'live-stream'
        ? '/live-stream'
        : view === 'communities'
        ? '/communities'
        : view === 'community-management'
        ? '/community-management'
        : view === 'events-and-meetups'
        ? '/events-and-meetups'
        : view === 'public-page'
        ? '/public-page'
        : view === 'file-and-document-sharing'
        ? '/file-and-document-sharing'
        : view === 'learning-and-knowledge-sharing'
        ? '/learning-and-knowledge-sharing'
        : view === 'developer-and-technology-community'
        ? '/developer-and-technology-community'
        : view === 'business-and-professional-networking'
        ? '/business-and-professional-networking'
        : view === 'polls-and-voting'
        ? '/polls-and-voting'
        : view === 'advertising'
        ? '/advertising'
        : view === 'subscription-and-payments'
        ? '/subscription-and-payments'
        : view === 'settings-and-personalization'
        ? '/settings-and-personalization'
        : view === 'blocking-and-safety'
        ? '/blocking-and-safety'
        : view === 'voice-and-video-call'
        ? '/voice-and-video-call'
        : view === 'blank'
        ? '/blank'
        : '/';
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname === '/login' || window.location.hash === '#login') {
        setCurrentView('login');
      } else if (
        window.location.pathname === '/forgot-password' ||
        window.location.hash === '#forgot-password'
      ) {
        setCurrentView('forgot-password');
      } else if (
        window.location.pathname === '/reset-password' ||
        window.location.hash === '#reset-password'
      ) {
        setCurrentView('reset-password');
      } else if (window.location.pathname === '/account' || window.location.hash === '#account') {
        setCurrentView('account');
      } else if (
        window.location.pathname === '/contacts' ||
        window.location.hash === '#contacts' ||
        window.location.pathname === '/my-contacts' ||
        window.location.hash === '#my-contacts'
      ) {
        setCurrentView('contacts');
      } else if (window.location.pathname === '/profile' || window.location.hash === '#profile') {
        setCurrentView('profile');
      } else if (
        window.location.pathname === '/social' ||
        window.location.hash === '#social' ||
        window.location.pathname === '/social-connections' ||
        window.location.hash === '#social-connections'
      ) {
        setCurrentView('social');
      } else if (
        window.location.pathname === '/search-and-discovery' ||
        window.location.hash === '#search-and-discovery' ||
        window.location.pathname === '/search' ||
        window.location.hash === '#search'
      ) {
        setCurrentView('search-and-discovery');
      } else if (
        window.location.pathname === '/privacy' ||
        window.location.hash === '#privacy' ||
        window.location.pathname === '/privacy-security' ||
        window.location.hash === '#privacy-security'
      ) {
        setCurrentView('privacy');
      } else if (window.location.pathname === '/messages' || window.location.hash === '#messages') {
        setCurrentView('messages');
      } else if (
        window.location.pathname === '/whats-happening' ||
        window.location.hash === '#whats-happening' ||
        window.location.pathname === '/whats-happening-around-you' ||
        window.location.hash === '#whats-happening-around-you'
      ) {
        setCurrentView('whats-happening');
      } else if (
        window.location.pathname === '/photo-sharing' ||
        window.location.hash === '#photo-sharing' ||
        window.location.pathname === '/photo-and-image-sharing' ||
        window.location.hash === '#photo-and-image-sharing'
      ) {
        setCurrentView('photo-sharing');
      } else if (
        window.location.pathname === '/video-sharing' ||
        window.location.hash === '#video-sharing'
      ) {
        setCurrentView('video-sharing');
      } else if (window.location.pathname === '/stories' || window.location.hash === '#stories') {
        setCurrentView('stories');
      } else if (
        window.location.pathname === '/live-stream' ||
        window.location.hash === '#live-stream'
      ) {
        setCurrentView('live-stream');
      } else if (
        window.location.pathname === '/communities' ||
        window.location.hash === '#communities'
      ) {
        setCurrentView('communities');
      } else if (
        window.location.pathname === '/community-management' ||
        window.location.hash === '#community-management' ||
        window.location.pathname === '/community-manage' ||
        window.location.hash === '#community-manage'
      ) {
        setCurrentView('community-management');
      } else if (
        window.location.pathname === '/events-and-meetups' ||
        window.location.hash === '#events-and-meetups' ||
        window.location.pathname === '/events' ||
        window.location.hash === '#events'
      ) {
        setCurrentView('events-and-meetups');
      } else if (
        window.location.pathname === '/public-page' ||
        window.location.hash === '#public-page' ||
        window.location.pathname === '/public-pages' ||
        window.location.hash === '#public-pages' ||
        window.location.pathname === '/public' ||
        window.location.hash === '#public'
      ) {
        setCurrentView('public-page');
      } else if (
        window.location.pathname === '/file-and-document-sharing' ||
        window.location.hash === '#file-and-document-sharing' ||
        window.location.pathname === '/files-and-documents' ||
        window.location.hash === '#files-and-documents' ||
        window.location.pathname === '/file-sharing' ||
        window.location.hash === '#file-sharing' ||
        window.location.pathname === '/documents' ||
        window.location.hash === '#documents'
      ) {
        setCurrentView('file-and-document-sharing');
      } else if (
        window.location.pathname === '/learning-and-knowledge-sharing' ||
        window.location.hash === '#learning-and-knowledge-sharing' ||
        window.location.pathname === '/learning-knowledge-sharing' ||
        window.location.hash === '#learning-knowledge-sharing' ||
        window.location.pathname === '/learning' ||
        window.location.hash === '#learning' ||
        window.location.pathname === '/knowledge' ||
        window.location.hash === '#knowledge'
      ) {
        setCurrentView('learning-and-knowledge-sharing');
      } else if (
        window.location.pathname === '/developer-and-technology-community' ||
        window.location.hash === '#developer-and-technology-community' ||
        window.location.pathname === '/developer-technology-community' ||
        window.location.hash === '#developer-technology-community' ||
        window.location.pathname === '/developer-community' ||
        window.location.hash === '#developer-community' ||
        window.location.pathname === '/developers' ||
        window.location.hash === '#developers'
      ) {
        setCurrentView('developer-and-technology-community');
      } else if (
        window.location.pathname === '/business-and-professional-networking' ||
        window.location.hash === '#business-and-professional-networking' ||
        window.location.pathname === '/business-networking' ||
        window.location.hash === '#business-networking' ||
        window.location.pathname === '/professional-networking' ||
        window.location.hash === '#professional-networking' ||
        window.location.pathname === '/business' ||
        window.location.hash === '#business'
      ) {
        setCurrentView('business-and-professional-networking');
      } else if (
        window.location.pathname === '/polls-and-voting' ||
        window.location.hash === '#polls-and-voting' ||
        window.location.pathname === '/polls' ||
        window.location.hash === '#polls' ||
        window.location.pathname === '/voting' ||
        window.location.hash === '#voting'
      ) {
        setCurrentView('polls-and-voting');
      } else if (
        window.location.pathname === '/advertising' ||
        window.location.hash === '#advertising'
      ) {
        setCurrentView('advertising');
      } else if (
        window.location.pathname === '/subscription-and-payments' ||
        window.location.hash === '#subscription-and-payments' ||
        window.location.pathname === '/subscriptions-and-payments' ||
        window.location.hash === '#subscriptions-and-payments'
      ) {
        setCurrentView('subscription-and-payments');
      } else if (
        window.location.pathname === '/settings-and-personalization' ||
        window.location.hash === '#settings-and-personalization' ||
        window.location.pathname === '/settings' ||
        window.location.hash === '#settings'
      ) {
        setCurrentView('settings-and-personalization');
      } else if (
        window.location.pathname === '/blocking-and-safety' ||
        window.location.hash === '#blocking-and-safety' ||
        window.location.pathname === '/blocking-safety' ||
        window.location.hash === '#blocking-safety' ||
        window.location.pathname === '/blocking' ||
        window.location.hash === '#blocking' ||
        window.location.pathname === '/safety' ||
        window.location.hash === '#safety'
      ) {
        setCurrentView('blocking-and-safety');
      } else if (
        window.location.pathname === '/voice-and-video-call' ||
        window.location.hash === '#voice-and-video-call' ||
        window.location.pathname === '/voice-video-call' ||
        window.location.hash === '#voice-video-call'
      ) {
        setCurrentView('voice-and-video-call');
      } else if (window.location.pathname === '/blank' || window.location.hash === '#blank') {
        setCurrentView('blank');
      } else {
        setCurrentView('register');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Registration state
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [usernameStatus, setUsernameStatus] = useState('idle'); // idle | checking | available | taken | too-short | error
  const [statusMessage, setStatusMessage] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', text: '' }

  // Login state
  const [loginUsername, setLoginUsername] = useState('');
  const [loginContact, setLoginContact] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginFeedback, setLoginFeedback] = useState(null);

  // Forgot & Reset password state
  const [resetEmail, setResetEmail] = useState('');
  const [isSubmittingReset, setIsSubmittingReset] = useState(false);
  const [resetFeedback, setResetFeedback] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [isSavingNewPassword, setIsSavingNewPassword] = useState(false);
  const [newPasswordFeedback, setNewPasswordFeedback] = useState(null);

  // Workspace & Sidebar state
  const [loggedInUser, setLoggedInUser] = useState(() => {
    try {
      return localStorage.getItem('assistance_user') || '';
    } catch {
      return '';
    }
  });
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      return true;
    }
    return false;
  });

  // Change password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [changeNewPassword, setChangeNewPassword] = useState('');
  const [showChangeNewPassword, setShowChangeNewPassword] = useState(false);
  const [changeConfirmPassword, setChangeConfirmPassword] = useState('');
  const [showChangeConfirmPassword, setShowChangeConfirmPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [changePasswordFeedback, setChangePasswordFeedback] = useState(null);

  // Profile state with localStorage persistence
  const coverFileInputRef = useRef(null);
  const profileFileInputRef = useRef(null);
  const [coverPhoto, setCoverPhoto] = useState(() => {
    try {
      return localStorage.getItem('assistance_cover_photo') || null;
    } catch {
      return null;
    }
  });
  const [profilePicture, setProfilePicture] = useState(() => {
    try {
      return localStorage.getItem('assistance_profile_picture') || null;
    } catch {
      return null;
    }
  });

  // Edit username state
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [editUsernameInput, setEditUsernameInput] = useState('');
  const [isSavingUsername, setIsSavingUsername] = useState(false);
  const [usernameEditFeedback, setUsernameEditFeedback] = useState(null);

  // Social connections search state
  const [searchFriendsQuery, setSearchFriendsQuery] = useState('');

  // Privacy & Account Security state
  const [accountPrivacy, setAccountPrivacy] = useState(() => {
    try {
      return localStorage.getItem('assistance_account_privacy') || 'public';
    } catch {
      return 'public';
    }
  });

  // Text posts state
  const [postContent, setPostContent] = useState('');
  const [posts, setPosts] = useState(() => {
    try {
      const saved = localStorage.getItem('assistance_posts');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Photo and Image Sharing state
  const uploadImageRef = useRef(null);
  const [uploadedImage, setUploadedImage] = useState(() => {
    try {
      return localStorage.getItem('assistance_shared_image') || null;
    } catch {
      return null;
    }
  });

  // Video Sharing state
  const uploadVideoRef = useRef(null);
  const [uploadedVideo, setUploadedVideo] = useState(null);

  // Stories state
  const uploadStoryRef = useRef(null);
  const [uploadedStory, setUploadedStory] = useState(() => {
    try {
      return localStorage.getItem('assistance_story_photo') || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const trimmed = username.trim();

    if (!trimmed) {
      setUsernameStatus('idle');
      setStatusMessage('');
      return;
    }

    if (trimmed.length < 3) {
      setUsernameStatus('too-short');
      setStatusMessage('Username must be at least 3 characters');
      return;
    }

    setUsernameStatus('checking');
    setStatusMessage('Checking availability...');

    const controller = new AbortController();
    const timeoutId = setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/users/check-username?username=${encodeURIComponent(trimmed)}`,
          { signal: controller.signal }
        );
        const data = await response.json();

        if (data.isUnique) {
          setUsernameStatus('available');
          setStatusMessage(data.message || 'Username is available');
        } else {
          setUsernameStatus('taken');
          setStatusMessage(data.message || 'Username is already taken');
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setUsernameStatus('error');
          setStatusMessage('Could not verify username');
        }
      }
    }, 400);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [username]);

  const passwordsMatch = confirmPassword && password === confirmPassword;
  const passwordsMismatch = confirmPassword && password !== confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback(null);

    if (!email || !phone || !username || !password || !confirmPassword) {
      setFeedback({ type: 'error', text: 'Please fill in all fields' });
      return;
    }

    if (password !== confirmPassword) {
      setFeedback({ type: 'error', text: 'Passwords do not match' });
      return;
    }

    if (usernameStatus === 'taken' || usernameStatus === 'too-short') {
      setFeedback({ type: 'error', text: 'Please choose an available username' });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone, username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const activeUser = data.user?.username || username;
        setLoggedInUser(activeUser);
        try {
          localStorage.setItem('assistance_user', activeUser);
        } catch {}
        setFeedback({ type: 'success', text: data.message || 'Registered successfully!' });
        navigateTo('blank');
      } else {
        setFeedback({ type: 'error', text: data.message || 'Registration failed' });
      }
    } catch {
      setFeedback({ type: 'error', text: 'Unable to connect to server. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginFeedback(null);

    if (!loginUsername || !loginContact || !loginPassword) {
      setLoginFeedback({ type: 'error', text: 'Please fill in all fields' });
      return;
    }

    setIsLoggingIn(true);

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: loginUsername,
          contact: loginContact,
          password: loginPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const activeUser = data.user?.username || loginUsername;
        setLoggedInUser(activeUser);
        try {
          localStorage.setItem('assistance_user', activeUser);
        } catch {}
        setLoginFeedback({ type: 'success', text: data.message || 'Logged in successfully!' });
        navigateTo('blank');
      } else {
        setLoginFeedback({ type: 'error', text: data.message || 'Login failed' });
      }
    } catch {
      setLoginFeedback({ type: 'error', text: 'Unable to connect to server. Please try again.' });
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setResetFeedback(null);

    if (!resetEmail) {
      setResetFeedback({ type: 'error', text: 'Please enter your email address' });
      return;
    }

    setIsSubmittingReset(true);

    try {
      const response = await fetch('/api/users/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setResetFeedback(null);
        navigateTo('reset-password');
      } else {
        setResetFeedback({
          type: 'error',
          text: data.message || 'Could not send reset email',
        });
      }
    } catch {
      setResetFeedback({
        type: 'error',
        text: 'Unable to connect to server. Please try again.',
      });
    } finally {
      setIsSubmittingReset(false);
    }
  };

  const handleNewPasswordSubmit = async (e) => {
    e.preventDefault();
    setNewPasswordFeedback(null);

    if (!newPassword || !confirmNewPassword) {
      setNewPasswordFeedback({ type: 'error', text: 'Please fill in both password fields' });
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setNewPasswordFeedback({ type: 'error', text: 'Passwords do not match' });
      return;
    }

    setIsSavingNewPassword(true);

    try {
      const response = await fetch('/api/users/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail, password: newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setNewPasswordFeedback({
          type: 'success',
          text: data.message || 'Password updated successfully!',
        });
      } else {
        setNewPasswordFeedback({
          type: 'error',
          text: data.message || 'Failed to update password',
        });
      }
    } catch {
      setNewPasswordFeedback({
        type: 'error',
        text: 'Unable to connect to server. Please try again.',
      });
    } finally {
      setIsSavingNewPassword(false);
    }
  };

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    setChangePasswordFeedback(null);

    if (!currentPassword) {
      setChangePasswordFeedback({ type: 'error', text: 'Please enter your current password' });
      return;
    }

    if (!changeNewPassword) {
      setChangePasswordFeedback({ type: 'error', text: 'Please enter your new password' });
      return;
    }

    if (changeNewPassword !== changeConfirmPassword) {
      setChangePasswordFeedback({ type: 'error', text: 'Passwords do not match' });
      return;
    }

    setIsChangingPassword(true);

    try {
      const response = await fetch('/api/users/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: loggedInUser,
          currentPassword,
          newPassword: changeNewPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setChangePasswordFeedback({
          type: 'success',
          text: data.message || 'Password changed successfully!',
        });
        setCurrentPassword('');
        setChangeNewPassword('');
        setChangeConfirmPassword('');
      } else {
        setChangePasswordFeedback({
          type: 'error',
          text: data.message || 'Failed to change password',
        });
      }
    } catch {
      setChangePasswordFeedback({
        type: 'error',
        text: 'Unable to connect to server. Please try again.',
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleCoverPhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (result) {
          setCoverPhoto(result);
          try {
            localStorage.setItem('assistance_cover_photo', result);
          } catch {
            // Ignore quota exceeded
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (result) {
          setProfilePicture(result);
          try {
            localStorage.setItem('assistance_profile_picture', result);
          } catch {
            // Ignore quota exceeded
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveUsername = async (e) => {
    if (e) e.preventDefault();
    setUsernameEditFeedback(null);
    const cleaned = editUsernameInput.trim();

    if (!cleaned) {
      setUsernameEditFeedback({ type: 'error', text: 'Username cannot be empty' });
      return;
    }

    if (cleaned.length < 3) {
      setUsernameEditFeedback({ type: 'error', text: 'Username must be at least 3 characters' });
      return;
    }

    setIsSavingUsername(true);

    try {
      const response = await fetch('/api/users/update-username', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentUsername: loggedInUser,
          newUsername: cleaned,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const updated = data.username || cleaned;
        setLoggedInUser(updated);
        try {
          localStorage.setItem('assistance_user', updated);
        } catch {}
        setIsEditingUsername(false);
        setUsernameEditFeedback(null);
      } else {
        setUsernameEditFeedback({ type: 'error', text: data.message || 'Failed to update username' });
      }
    } catch {
      setLoggedInUser(cleaned);
      try {
        localStorage.setItem('assistance_user', cleaned);
      } catch {}
      setIsEditingUsername(false);
      setUsernameEditFeedback(null);
    } finally {
      setIsSavingUsername(false);
    }
  };

  const handleSearchFriends = (e) => {
    e.preventDefault();
  };

  const handleAccountPrivacyChange = (value) => {
    setAccountPrivacy(value);
    try {
      localStorage.setItem('assistance_account_privacy', value);
    } catch {}
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    const trimmed = postContent.trim();
    if (!trimmed) return;

    const newPost = {
      id: Date.now().toString(),
      author: loggedInUser || 'User',
      content: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    setPostContent('');
    try {
      localStorage.setItem('assistance_posts', JSON.stringify(updatedPosts));
    } catch {}
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (result) {
          setUploadedImage(result);
          try {
            localStorage.setItem('assistance_shared_image', result);
          } catch {}
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedVideo(url);
    }
  };

  const handleStoryUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (result) {
          setUploadedStory(result);
          try {
            localStorage.setItem('assistance_story_photo', result);
          } catch {}
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Contacts on Assistance
  const [phoneContacts, setPhoneContacts] = useState(() => {
    try {
      const saved = localStorage.getItem('assistance_phone_contacts');
      if (saved) {
        const dummyNames = new Set([
          'Adarsh K M', 'Alex', 'Tony Stark', 'David Miller', 'Jack Sparrow',
          'Mohanan', 'Sophia Patel', 'Alex Chen', 'Liam Smith', 'Olivia Taylor',
          'Emma Watson', 'Robert Brown'
        ]);
        const parsed = JSON.parse(saved);
        const realContacts = parsed.filter((c) => !dummyNames.has(c.name));
        return realContacts;
      }
      return [];
    } catch {
      return [];
    }
  });

  // Ensure any cached dummy contacts are purged from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('assistance_phone_contacts');
      if (saved) {
        const dummyNames = new Set([
          'Adarsh K M', 'Alex', 'Tony Stark', 'David Miller', 'Jack Sparrow',
          'Mohanan', 'Sophia Patel', 'Alex Chen', 'Liam Smith', 'Olivia Taylor',
          'Emma Watson', 'Robert Brown'
        ]);
        const parsed = JSON.parse(saved);
        const realContacts = parsed.filter((c) => !dummyNames.has(c.name));
        localStorage.setItem('assistance_phone_contacts', JSON.stringify(realContacts));
        setPhoneContacts(realContacts);
      }
    } catch {}
  }, []);

  const [registeredContacts, setRegisteredContacts] = useState([]);
  const [nonRegisteredContacts, setNonRegisteredContacts] = useState([]);
  const [isSyncingContacts, setIsSyncingContacts] = useState(false);
  const [contactsSearchQuery, setContactsSearchQuery] = useState('');
  const [contactsFilterTab, setContactsFilterTab] = useState('registered');
  const [syncFeedback, setSyncFeedback] = useState(null);
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');

  const syncPhoneContacts = async (contactsList = null) => {
    setIsSyncingContacts(true);
    const listToSync = contactsList || phoneContacts;
    try {
      const res = await fetch('/api/users/sync-contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contacts: listToSync }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setRegisteredContacts(data.registeredContacts || []);
        setNonRegisteredContacts(data.nonRegisteredContacts || []);
        setSyncFeedback({
          type: 'success',
          text: `Synced ${data.totalPhoneContacts} phone contacts • ${data.registeredCount} registered on Assistance!`,
        });
      } else {
        setSyncFeedback({ type: 'error', text: data.message || 'Failed to sync contacts' });
      }
    } catch (err) {
      console.error('Sync contacts error:', err);
      try {
        const fallbackRes = await fetch('/api/users/registered-contacts');
        const fallbackData = await fallbackRes.json();
        if (fallbackRes.ok && fallbackData.contacts) {
          setRegisteredContacts(fallbackData.contacts);
          setSyncFeedback({
            type: 'success',
            text: `Connected to Assistance • ${fallbackData.contacts.length} registered contacts available!`,
          });
        }
      } catch {
        setSyncFeedback({ type: 'error', text: 'Unable to connect to server to sync contacts' });
      }
    } finally {
      setIsSyncingContacts(false);
    }
  };

  useEffect(() => {
    if (currentView === 'contacts' && registeredContacts.length === 0 && !isSyncingContacts && phoneContacts.length > 0) {
      syncPhoneContacts();
    }
  }, [currentView, phoneContacts]);

  const handleDeviceContactSync = async () => {
    if ('contacts' in navigator && 'ContactsManager' in window) {
      try {
        const props = ['name', 'tel'];
        const deviceContacts = await navigator.contacts.select(props, { multiple: true });
        if (deviceContacts && deviceContacts.length > 0) {
          const formatted = deviceContacts
            .map((c) => ({
              name: c.name?.[0] || 'Unknown',
              phone: c.tel?.[0] || '',
            }))
            .filter((c) => c.phone);

          if (formatted.length > 0) {
            const merged = [...phoneContacts];
            formatted.forEach((item) => {
              if (!merged.some((m) => m.phone === item.phone)) {
                merged.push(item);
              }
            });
            setPhoneContacts(merged);
            try {
              localStorage.setItem('assistance_phone_contacts', JSON.stringify(merged));
            } catch {}
            syncPhoneContacts(merged);
            return;
          }
        }
      } catch (err) {
        console.log('Native contact picker dismissed or unsupported:', err);
      }
    }
    syncPhoneContacts();
  };

  const handleAddNewContact = (e) => {
    e.preventDefault();
    if (!newContactName.trim() || !newContactPhone.trim()) return;
    const newEntry = { name: newContactName.trim(), phone: newContactPhone.trim() };
    const updated = [newEntry, ...phoneContacts.filter((c) => c.phone !== newEntry.phone)];
    setPhoneContacts(updated);
    try {
      localStorage.setItem('assistance_phone_contacts', JSON.stringify(updated));
    } catch {}
    setNewContactName('');
    setNewContactPhone('');
    setShowAddContactModal(false);
    syncPhoneContacts(updated);
  };

  const getAvatarColor = (name = '') => {
    const colors = ['#25D366', '#128C7E', '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#06B6D4'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const getInitials = (name = '') => {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return (name[0] || '?').toUpperCase();
  };

  const filteredRegisteredContacts = registeredContacts.filter((contact) => {
    if (!contactsSearchQuery.trim()) return true;
    const query = contactsSearchQuery.toLowerCase();
    const nameMatch = (contact.phoneBookName || '').toLowerCase().includes(query);
    const userMatch = (contact.username || '').toLowerCase().includes(query);
    const phoneMatch = (contact.phone || '').includes(query);
    return nameMatch || userMatch || phoneMatch;
  });

  const filteredInviteContacts = nonRegisteredContacts.filter((contact) => {
    if (!contactsSearchQuery.trim()) return true;
    const query = contactsSearchQuery.toLowerCase();
    const nameMatch = (contact.phoneBookName || '').toLowerCase().includes(query);
    const phoneMatch = (contact.phone || '').includes(query);
    return nameMatch || phoneMatch;
  });

  // Message System State & Real-time Integration
  const [conversations, setConversations] = useState(() => {
    try {
      const saved = localStorage.getItem('assistance_messaging_chats');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.filter(
          (c) =>
            !['chat_1', 'chat_2', 'chat_4'].includes(c.id) &&
            !['alex_chen', 'sophia_patel', 'tony'].includes(c.username)
        );
      }
      return [];
    } catch {
      return [];
    }
  });

  const [activeChatId, setActiveChatId] = useState(() => {
    try {
      const saved = localStorage.getItem('assistance_messaging_chats');
      if (saved) {
        const parsed = JSON.parse(saved);
        const filtered = parsed.filter(
          (c) =>
            !['chat_1', 'chat_2', 'chat_4'].includes(c.id) &&
            !['alex_chen', 'sophia_patel', 'tony'].includes(c.username)
        );
        return filtered[0]?.id || null;
      }
      return null;
    } catch {
      return null;
    }
  });

  const [activeChatMessages, setActiveChatMessages] = useState([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isPeerTyping, setIsPeerTyping] = useState(false);
  const [chatAttachment, setChatAttachment] = useState(null);
  const [messageSearchQuery, setMessageSearchQuery] = useState('');
  const [messageInputText, setMessageInputText] = useState('');
  const [mobileChatViewActive, setMobileChatViewActive] = useState(false);

  const messagesScrollRef = useRef(null);
  const chatFileInputRef = useRef(null);
  const socketRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const activeChat =
    conversations.find((c) => c.id === activeChatId || c.conversationId === activeChatId) ||
    (conversations.length > 0 ? conversations[0] : null);

  const activeChatRef = useRef(activeChat);
  useEffect(() => {
    activeChatRef.current = activeChat;
  }, [activeChat]);

  const handleSelectConversation = (conv) => {
    setActiveChatId(conv.id || conv.conversationId);
    setMobileChatViewActive(true);
  };

  const handleBackToConversations = () => {
    setMobileChatViewActive(false);
  };

  const filteredConversations = conversations.filter((c) => {
    if (!messageSearchQuery.trim()) return true;
    const q = messageSearchQuery.toLowerCase();
    return (c.name && c.name.toLowerCase().includes(q)) || (c.username && c.username.toLowerCase().includes(q));
  });

  // Fetch conversations from backend
  const fetchConversations = async () => {
    const userToQuery = loggedInUser || 'user';
    try {
      const res = await fetch(`/api/chat/conversations?username=${encodeURIComponent(userToQuery)}`);
      const data = await res.json();
      if (res.ok && data.success && Array.isArray(data.conversations)) {
        setConversations(data.conversations);
        try {
          localStorage.setItem('assistance_messaging_chats', JSON.stringify(data.conversations));
        } catch {}
        if (data.conversations.length > 0 && !activeChatId) {
          setActiveChatId(data.conversations[0].id);
        }
      }
    } catch (err) {
      console.error('Failed to fetch conversations:', err);
    }
  };

  // Socket.io Real-time connection
  useEffect(() => {
    const socket = io({
      transports: ['websocket', 'polling'],
    });
    socketRef.current = socket;

    const userToJoin = loggedInUser || 'user';
    socket.emit('join', userToJoin);

    socket.on('chat:message', (newMsg) => {
      const currentActive = activeChatRef.current;
      const isCurrentChat =
        currentActive &&
        (newMsg.sender === currentActive.username ||
          newMsg.receiver === currentActive.username);

      if (isCurrentChat) {
        setActiveChatMessages((prev) => {
          if (prev.some((m) => m.id === newMsg.id)) return prev;
          return [
            ...prev,
            {
              ...newMsg,
              sender: newMsg.sender === userToJoin ? 'me' : 'them',
            },
          ];
        });

        if (newMsg.receiver === userToJoin) {
          fetch('/api/chat/read', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: userToJoin,
              otherUser: newMsg.sender,
            }),
          }).catch(() => {});
        }
      }

      setConversations((prev) => {
        const otherUser = newMsg.sender === userToJoin ? newMsg.receiver : newMsg.sender;
        const existingIdx = prev.findIndex((c) => c.username === otherUser);
        const unreadInc = !isCurrentChat && newMsg.receiver === userToJoin ? 1 : 0;

        if (existingIdx !== -1) {
          const updated = [...prev];
          const conv = { ...updated[existingIdx] };
          conv.lastMessage = {
            text: newMsg.text || '📎 Attachment',
            sender: newMsg.sender,
            createdAt: newMsg.createdAt,
            read: isCurrentChat,
          };
          conv.unread = (conv.unread || 0) + unreadInc;
          conv.updatedAt = newMsg.createdAt;
          updated.splice(existingIdx, 1);
          return [conv, ...updated];
        } else {
          fetchConversations();
          return prev;
        }
      });
    });

    socket.on('chat:read', () => {
      setActiveChatMessages((prev) =>
        prev.map((m) => (m.sender === 'me' ? { ...m, read: true } : m))
      );
    });

    socket.on('chat:typing', ({ sender, isTyping }) => {
      const currentActive = activeChatRef.current;
      if (currentActive && currentActive.username === sender) {
        setIsPeerTyping(Boolean(isTyping));
      }
    });

    socket.on('user:status', ({ username: statusUser, status }) => {
      setConversations((prev) =>
        prev.map((c) => (c.username === statusUser ? { ...c, status } : c))
      );
    });

    return () => {
      socket.disconnect();
    };
  }, [loggedInUser]);

  // Load conversations when view changes to messages or loggedInUser updates
  useEffect(() => {
    if (currentView === 'messages') {
      fetchConversations();
    }
  }, [currentView, loggedInUser]);

  // Load messages whenever activeChat changes
  useEffect(() => {
    if (!activeChat || !activeChat.username) {
      setActiveChatMessages([]);
      return;
    }

    const currentUser = loggedInUser || 'user';
    setIsLoadingMessages(true);
    setIsPeerTyping(false);

    fetch(`/api/chat/messages/${encodeURIComponent(activeChat.username)}?username=${encodeURIComponent(currentUser)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.messages)) {
          setActiveChatMessages(data.messages);
          setConversations((prev) =>
            prev.map((c) => (c.username === activeChat.username ? { ...c, unread: 0 } : c))
          );
        }
      })
      .catch((err) => console.error('Error fetching chat messages:', err))
      .finally(() => setIsLoadingMessages(false));
  }, [activeChat?.id, activeChat?.conversationId, activeChat?.username, loggedInUser]);

  // Auto-scroll on new message
  useEffect(() => {
    if (currentView === 'messages' && messagesScrollRef.current) {
      messagesScrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentView, activeChatId, activeChatMessages]);

  const handleMessageInputChange = (e) => {
    const text = e.target.value;
    setMessageInputText(text);

    if (socketRef.current && activeChat?.username) {
      socketRef.current.emit('typing', {
        receiver: activeChat.username,
        isTyping: true,
      });

      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        if (socketRef.current && activeChat?.username) {
          socketRef.current.emit('typing', {
            receiver: activeChat.username,
            isTyping: false,
          });
        }
      }, 1500);
    }
  };

  const handleChatFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be under 5MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      setChatAttachment(event.target.result);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if ((!messageInputText.trim() && !chatAttachment) || !activeChat) return;

    const textToSend = messageInputText.trim();
    const attachmentToSend = chatAttachment;
    const currentUser = loggedInUser || 'user';
    const targetUsername = activeChat.username;
    const tempId = 'temp_' + Date.now();
    const now = new Date();

    setMessageInputText('');
    setChatAttachment(null);

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    if (socketRef.current) {
      socketRef.current.emit('typing', { receiver: targetUsername, isTyping: false });
    }

    const optimisticMsg = {
      id: tempId,
      sender: 'me',
      senderUsername: currentUser,
      receiverUsername: targetUsername,
      text: textToSend,
      attachment: attachmentToSend,
      read: false,
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      createdAt: now.toISOString(),
    };

    setActiveChatMessages((prev) => [...prev, optimisticMsg]);

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.username === targetUsername) {
          return {
            ...conv,
            lastMessage: {
              text: textToSend || '📎 Attachment',
              sender: currentUser,
              createdAt: now.toISOString(),
              read: false,
            },
            updatedAt: now.toISOString(),
          };
        }
        return conv;
      })
    );

    try {
      const res = await fetch('/api/chat/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: currentUser,
          receiver: targetUsername,
          text: textToSend,
          attachment: attachmentToSend,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success && data.message) {
        setActiveChatMessages((prev) =>
          prev.map((m) => (m.id === tempId ? { ...m, id: data.message.id } : m))
        );
      }
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  const handleStartChatWithContact = async (contact) => {
    const currentUser = loggedInUser || 'user';
    const targetUsername = contact.username;

    try {
      const res = await fetch('/api/chat/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender: currentUser, receiver: targetUsername }),
      });
      const data = await res.json();
      if (res.ok && data.success && data.conversation) {
        setConversations((prev) => {
          const exists = prev.some((c) => c.username === targetUsername);
          if (exists) {
            return prev.map((c) => (c.username === targetUsername ? { ...c, ...data.conversation } : c));
          }
          return [data.conversation, ...prev];
        });
        setActiveChatId(data.conversation.id);
        setMobileChatViewActive(true);
      }
    } catch {
      const convId = [currentUser, targetUsername].sort().join(':');
      const fallback = {
        id: convId,
        conversationId: convId,
        name: contact.phoneBookName || contact.displayName || contact.username,
        username: targetUsername,
        avatar: contact.avatar || null,
        status: contact.status || 'Hey there! I am using Assistance',
        unread: 0,
        lastMessage: null,
      };
      setConversations((prev) => [fallback, ...prev.filter((c) => c.username !== targetUsername)]);
      setActiveChatId(convId);
      setMobileChatViewActive(true);
    }

    navigateTo('messages');
  };

  if (
    currentView === 'blank' ||
    currentView === 'account' ||
    currentView === 'contacts' ||
    currentView === 'profile' ||
    currentView === 'social' ||
    currentView === 'search-and-discovery' ||
    currentView === 'privacy' ||
    currentView === 'messages' ||
    currentView === 'whats-happening' ||
    currentView === 'photo-sharing' ||
    currentView === 'video-sharing' ||
    currentView === 'stories' ||
    currentView === 'live-stream' ||
    currentView === 'communities' ||
    currentView === 'community-management' ||
    currentView === 'events-and-meetups' ||
    currentView === 'public-page' ||
    currentView === 'file-and-document-sharing' ||
    currentView === 'learning-and-knowledge-sharing' ||
    currentView === 'developer-and-technology-community' ||
    currentView === 'business-and-professional-networking' ||
    currentView === 'polls-and-voting' ||
    currentView === 'advertising' ||
    currentView === 'subscription-and-payments' ||
    currentView === 'settings-and-personalization' ||
    currentView === 'blocking-and-safety' ||
    currentView === 'voice-and-video-call'
  ) {
    return (
      <>
        {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
        <div className="workspace-layout">
        <aside className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`} id="left-sidebar">
          <div className="sidebar-header">
            <div className="sidebar-brand">
              <div className="brand-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
              </div>
              {!isSidebarCollapsed && <span className="brand-title">Assistance</span>}
            </div>
            <button
              type="button"
              className="sidebar-collapse-btn"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              title={isSidebarCollapsed ? 'Expand' : 'Collapse'}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {isSidebarCollapsed ? (
                  <polyline points="9 18 15 12 9 6"></polyline>
                ) : (
                  <polyline points="15 18 9 12 15 6"></polyline>
                )}
              </svg>
            </button>
          </div>

          <div className="sidebar-body">
            <nav className="sidebar-nav">
              <button
                type="button"
                className={`sidebar-nav-item ${currentView === 'contacts' ? 'active' : ''}`}
                id="my-contacts-btn"
                onClick={() => navigateTo(currentView === 'contacts' ? 'blank' : 'contacts')}
                title="My Contacts"
                aria-label="My Contacts"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 2v2"></path>
                  <path d="M7 22v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"></path>
                  <path d="M8 2v2"></path>
                  <circle cx="12" cy="11" r="3"></circle>
                  <rect x="3" y="4" width="18" height="18" rx="2"></rect>
                </svg>
                {!isSidebarCollapsed && <span>My Contacts</span>}
              </button>

              <button
                type="button"
                className={`sidebar-nav-item ${currentView === 'profile' ? 'active' : ''}`}
                id="my-profile-btn"
                onClick={() => navigateTo(currentView === 'profile' ? 'blank' : 'profile')}
                title="My Profile"
                aria-label="My Profile"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                {!isSidebarCollapsed && <span>My Profile</span>}
              </button>

              <button
                type="button"
                className={`sidebar-nav-item ${currentView === 'social' ? 'active' : ''}`}
                id="social-connections-btn"
                onClick={() => navigateTo(currentView === 'social' ? 'blank' : 'social')}
                title="Social connections"
                aria-label="Social connections"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                {!isSidebarCollapsed && <span>Social connections</span>}
              </button>

              <button
                type="button"
                className={`sidebar-nav-item ${currentView === 'search-and-discovery' ? 'active' : ''}`}
                id="search-and-discovery-btn"
                onClick={() =>
                  navigateTo(
                    currentView === 'search-and-discovery' ? 'blank' : 'search-and-discovery'
                  )
                }
                title="Search and Discovery"
                aria-label="Search and Discovery"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                {!isSidebarCollapsed && <span>Search and Discovery</span>}
              </button>

              <button
                type="button"
                className={`sidebar-nav-item ${currentView === 'privacy' ? 'active' : ''}`}
                id="privacy-security-btn"
                onClick={() => navigateTo(currentView === 'privacy' ? 'blank' : 'privacy')}
                title="Privacy and Account Security"
                aria-label="Privacy and Account Security"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                {!isSidebarCollapsed && <span>Privacy and Account Security</span>}
              </button>

              <button
                type="button"
                className={`sidebar-nav-item ${currentView === 'photo-sharing' ? 'active' : ''}`}
                id="photo-sharing-btn"
                onClick={() => navigateTo(currentView === 'photo-sharing' ? 'blank' : 'photo-sharing')}
                title="Photo and Image Sharing"
                aria-label="Photo and Image Sharing"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                {!isSidebarCollapsed && <span>Photo and Image Sharing</span>}
              </button>

              <button
                type="button"
                className={`sidebar-nav-item ${currentView === 'video-sharing' ? 'active' : ''}`}
                id="video-sharing-btn"
                onClick={() => navigateTo(currentView === 'video-sharing' ? 'blank' : 'video-sharing')}
                title="Video Sharing"
                aria-label="Video Sharing"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="23 7 16 12 23 17 23 7"></polygon>
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                </svg>
                {!isSidebarCollapsed && <span>Video Sharing</span>}
              </button>

              <button
                type="button"
                className={`sidebar-nav-item ${currentView === 'stories' ? 'active' : ''}`}
                id="stories-btn"
                onClick={() => navigateTo(currentView === 'stories' ? 'blank' : 'stories')}
                title="Stories"
                aria-label="Stories"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="4"></circle>
                </svg>
                {!isSidebarCollapsed && <span>Stories</span>}
              </button>

              <button
                type="button"
                className={`sidebar-nav-item ${currentView === 'live-stream' ? 'active' : ''}`}
                id="live-stream-btn"
                onClick={() => navigateTo(currentView === 'live-stream' ? 'blank' : 'live-stream')}
                title="Live Stream"
                aria-label="Live Stream"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.93 19.07a10 10 0 0 1 0-14.14"></path>
                  <path d="M7.76 16.24a6 6 0 0 1 0-8.48"></path>
                  <circle cx="12" cy="12" r="2"></circle>
                  <path d="M16.24 7.76a6 6 0 0 1 0 8.48"></path>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                </svg>
                {!isSidebarCollapsed && <span>Live Stream</span>}
              </button>

              <button
                type="button"
                className={`sidebar-nav-item ${currentView === 'communities' ? 'active' : ''}`}
                id="communities-btn"
                onClick={() => navigateTo(currentView === 'communities' ? 'blank' : 'communities')}
                title="Communities"
                aria-label="Communities"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                {!isSidebarCollapsed && <span>Communities</span>}
              </button>

              <button
                type="button"
                className={`sidebar-nav-item ${currentView === 'community-management' ? 'active' : ''}`}
                id="community-management-btn"
                onClick={() =>
                  navigateTo(
                    currentView === 'community-management'
                      ? 'blank'
                      : 'community-management'
                  )
                }
                title="Community Management"
                aria-label="Community Management"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <polyline points="16 11 18 13 22 9"></polyline>
                </svg>
                {!isSidebarCollapsed && <span>Community Management</span>}
              </button>

              <button
                type="button"
                className={`sidebar-nav-item ${currentView === 'events-and-meetups' ? 'active' : ''}`}
                id="events-and-meetups-btn"
                onClick={() =>
                  navigateTo(
                    currentView === 'events-and-meetups' ? 'blank' : 'events-and-meetups'
                  )
                }
                title="Events and Meetups"
                aria-label="Events and Meetups"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                {!isSidebarCollapsed && <span>Events and Meetups</span>}
              </button>

              <button
                type="button"
                className={`sidebar-nav-item ${currentView === 'public-page' ? 'active' : ''}`}
                id="public-page-btn"
                onClick={() =>
                  navigateTo(currentView === 'public-page' ? 'blank' : 'public-page')
                }
                title="Public Page"
                aria-label="Public Page"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
                {!isSidebarCollapsed && <span>Public Page</span>}
              </button>

              <button
                type="button"
                className={`sidebar-nav-item ${currentView === 'file-and-document-sharing' ? 'active' : ''}`}
                id="file-and-document-sharing-btn"
                onClick={() =>
                  navigateTo(
                    currentView === 'file-and-document-sharing'
                      ? 'blank'
                      : 'file-and-document-sharing'
                  )
                }
                title="File and Document Sharing"
                aria-label="File and Document Sharing"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                {!isSidebarCollapsed && <span>File and Document Sharing</span>}
              </button>

              <button
                type="button"
                className={`sidebar-nav-item ${currentView === 'learning-and-knowledge-sharing' ? 'active' : ''}`}
                id="learning-and-knowledge-sharing-btn"
                onClick={() =>
                  navigateTo(
                    currentView === 'learning-and-knowledge-sharing'
                      ? 'blank'
                      : 'learning-and-knowledge-sharing'
                  )
                }
                title="Learning and Knowledge Sharing"
                aria-label="Learning and Knowledge Sharing"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
                {!isSidebarCollapsed && <span>Learning and Knowledge Sharing</span>}
              </button>

              <button
                type="button"
                className={`sidebar-nav-item ${currentView === 'developer-and-technology-community' ? 'active' : ''}`}
                id="developer-and-technology-community-btn"
                onClick={() =>
                  navigateTo(
                    currentView === 'developer-and-technology-community'
                      ? 'blank'
                      : 'developer-and-technology-community'
                  )
                }
                title="Developer and Technology Community"
                aria-label="Developer and Technology Community"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
                {!isSidebarCollapsed && <span>Developer and Technology Community</span>}
              </button>

              <button
                type="button"
                className={`sidebar-nav-item ${currentView === 'business-and-professional-networking' ? 'active' : ''}`}
                id="business-and-professional-networking-btn"
                onClick={() =>
                  navigateTo(
                    currentView === 'business-and-professional-networking'
                      ? 'blank'
                      : 'business-and-professional-networking'
                  )
                }
                title="Business and Professional Networking"
                aria-label="Business and Professional Networking"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
                {!isSidebarCollapsed && <span>Business and Professional Networking</span>}
              </button>

              <button
                type="button"
                className={`sidebar-nav-item ${currentView === 'polls-and-voting' ? 'active' : ''}`}
                id="polls-and-voting-btn"
                onClick={() =>
                  navigateTo(
                    currentView === 'polls-and-voting' ? 'blank' : 'polls-and-voting'
                  )
                }
                title="Polls and Voting"
                aria-label="Polls and Voting"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10"></line>
                  <line x1="12" y1="20" x2="12" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="14"></line>
                </svg>
                {!isSidebarCollapsed && <span>Polls and Voting</span>}
              </button>

              <button
                type="button"
                className={`sidebar-nav-item ${currentView === 'advertising' ? 'active' : ''}`}
                id="advertising-btn"
                onClick={() => navigateTo(currentView === 'advertising' ? 'blank' : 'advertising')}
                title="Advertising"
                aria-label="Advertising"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>
                {!isSidebarCollapsed && <span>Advertising</span>}
              </button>

              <button
                type="button"
                className={`sidebar-nav-item ${currentView === 'subscription-and-payments' ? 'active' : ''}`}
                id="subscription-and-payments-btn"
                onClick={() =>
                  navigateTo(
                    currentView === 'subscription-and-payments'
                      ? 'blank'
                      : 'subscription-and-payments'
                  )
                }
                title="Subscription and Payments"
                aria-label="Subscription and Payments"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                  <line x1="1" y1="10" x2="23" y2="10"></line>
                </svg>
                {!isSidebarCollapsed && <span>Subscription and Payments</span>}
              </button>

              <button
                type="button"
                className={`sidebar-nav-item ${currentView === 'settings-and-personalization' ? 'active' : ''}`}
                id="settings-and-personalization-btn"
                onClick={() =>
                  navigateTo(
                    currentView === 'settings-and-personalization'
                      ? 'blank'
                      : 'settings-and-personalization'
                  )
                }
                title="Settings and Personalization"
                aria-label="Settings and Personalization"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
                {!isSidebarCollapsed && <span>Settings and Personalization</span>}
              </button>

              <button
                type="button"
                className={`sidebar-nav-item ${currentView === 'blocking-and-safety' ? 'active' : ''}`}
                id="blocking-and-safety-btn"
                onClick={() =>
                  navigateTo(
                    currentView === 'blocking-and-safety'
                      ? 'blank'
                      : 'blocking-and-safety'
                  )
                }
                title="Blocking and Safety"
                aria-label="Blocking and Safety"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                </svg>
                {!isSidebarCollapsed && <span>Blocking and Safety</span>}
              </button>
            </nav>
          </div>

          <div className="sidebar-footer">
            <button
              type="button"
              className={`account-btn ${currentView === 'account' ? 'active' : ''}`}
              id="account-btn"
              onClick={() => navigateTo(currentView === 'account' ? 'blank' : 'account')}
              title="Account"
              aria-label="Account"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              {!isSidebarCollapsed && <span>Account</span>}
            </button>

            <button
              type="button"
              className="logout-btn"
              onClick={() => {
                setLoggedInUser('');
                try {
                  localStorage.removeItem('assistance_user');
                } catch {}
                navigateTo('login');
              }}
              title="Logout"
              aria-label="Logout"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              {!isSidebarCollapsed && <span>Logout</span>}
            </button>
          </div>
        </aside>

        <div className="workspace-area">
          <nav className="workspace-navbar" id="navbar" aria-label="Main Navigation">
            <button
              type="button"
              className={`navbar-item ${currentView === 'messages' ? 'active' : ''}`}
              id="messages-btn"
              onClick={() => navigateTo(currentView === 'messages' ? 'blank' : 'messages')}
              title="Messages"
              aria-label="Messages"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span>Messages</span>
            </button>

            <button
              type="button"
              className={`navbar-item ${currentView === 'whats-happening' ? 'active' : ''}`}
              id="whats-happening-btn"
              onClick={() =>
                navigateTo(currentView === 'whats-happening' ? 'blank' : 'whats-happening')
              }
              title="What's Happening Around You"
              aria-label="What's Happening Around You"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
              </svg>
              <span>What's Happening Around You</span>
            </button>

            <button
              type="button"
              className={`navbar-item ${currentView === 'voice-and-video-call' ? 'active' : ''}`}
              id="voice-and-video-call-btn"
              onClick={() =>
                navigateTo(currentView === 'voice-and-video-call' ? 'blank' : 'voice-and-video-call')
              }
              title="Voice and Video Call"
              aria-label="Voice and Video Call"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>Voice and Video Call</span>
            </button>
          </nav>

          <div className="notification-bar" id="notification-bar" aria-label="Notification Bar"></div>

          <main
            className={`workspace-main ${currentView === 'messages' ? 'workspace-main-messages' : ''}`}
            id="workspace-main"
          >
          {currentView === 'account' ? (
            <div className="account-space" id="account-space">
              <div className="account-wrapper">
                <h1 className="heading" id="change-password-heading">
                  Change Password
                </h1>

                <form className="form-container" onSubmit={handleChangePasswordSubmit}>
                  <div className="form-group">
                    <label htmlFor="current-password-input" className="input-label">
                      Current Password
                    </label>
                    <div className="input-wrapper">
                      <input
                        id="current-password-input"
                        type={showCurrentPassword ? 'text' : 'password'}
                        className="input-field input-with-toggle"
                        placeholder="••••••••"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        autoComplete="current-password"
                        autoFocus
                      />
                      <button
                        type="button"
                        className="password-toggle-btn"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        aria-label={showCurrentPassword ? 'Hide password' : 'Show password'}
                      >
                        {showCurrentPassword ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                            <line x1="1" y1="1" x2="23" y2="23"></line>
                          </svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8-4 8-11 8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="change-new-password-input" className="input-label">
                      New Password
                    </label>
                    <div className="input-wrapper">
                      <input
                        id="change-new-password-input"
                        type={showChangeNewPassword ? 'text' : 'password'}
                        className="input-field input-with-toggle"
                        placeholder="••••••••"
                        value={changeNewPassword}
                        onChange={(e) => setChangeNewPassword(e.target.value)}
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        className="password-toggle-btn"
                        onClick={() => setShowChangeNewPassword(!showChangeNewPassword)}
                        aria-label={showChangeNewPassword ? 'Hide password' : 'Show password'}
                      >
                        {showChangeNewPassword ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                            <line x1="1" y1="1" x2="23" y2="23"></line>
                          </svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8-4 8-11 8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="change-confirm-password-input" className="input-label">
                      Confirm New Password
                    </label>
                    <div className="input-wrapper">
                      <input
                        id="change-confirm-password-input"
                        type={showChangeConfirmPassword ? 'text' : 'password'}
                        className="input-field input-with-toggle"
                        placeholder="••••••••"
                        value={changeConfirmPassword}
                        onChange={(e) => setChangeConfirmPassword(e.target.value)}
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        className="password-toggle-btn"
                        onClick={() => setShowChangeConfirmPassword(!showChangeConfirmPassword)}
                        aria-label={showChangeConfirmPassword ? 'Hide password' : 'Show password'}
                      >
                        {showChangeConfirmPassword ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                            <line x1="1" y1="1" x2="23" y2="23"></line>
                          </svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8-4 8-11 8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    id="change-password-submit-btn"
                    className="register-btn"
                    disabled={isChangingPassword}
                  >
                    {isChangingPassword ? 'Submitting...' : 'Submit'}
                  </button>

                  {changePasswordFeedback && (
                    <div
                      className={`feedback-banner feedback-${changePasswordFeedback.type}`}
                      role="alert"
                    >
                      {changePasswordFeedback.text}
                    </div>
                  )}
                </form>
              </div>
            </div>
          ) : currentView === 'contacts' ? (
            <div className="contacts-space" id="contacts-space">
              <div className="contacts-container" id="contacts-container">
                {/* Header with Title and Sync Controls */}
                <div className="contacts-header-wrapper">
                  <div className="contacts-title-col">
                    <h1 className="heading contacts-heading" id="contacts-heading">
                      Contacts on Assistance
                    </h1>
                    <p className="contacts-subheading">
                      Synced from phone contacts
                    </p>
                  </div>

                  <div className="contacts-header-actions">
                    <button
                      type="button"
                      className="contacts-sync-btn"
                      id="sync-contacts-btn"
                      onClick={handleDeviceContactSync}
                      disabled={isSyncingContacts}
                      title="Sync Phone Contacts with Assistance"
                    >
                      <svg
                        className={isSyncingContacts ? 'spin' : ''}
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                      </svg>
                      {isSyncingContacts ? 'Syncing...' : 'Sync Contacts'}
                    </button>

                    <button
                      type="button"
                      className="contacts-add-btn"
                      id="add-phone-contact-btn"
                      onClick={() => setShowAddContactModal(true)}
                      title="Add a phone contact to sync"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <line x1="20" y1="8" x2="20" y2="14" />
                        <line x1="23" y1="11" x2="17" y2="11" />
                      </svg>
                      Add Contact
                    </button>
                  </div>
                </div>

                {/* Sync Feedback Message */}
                {syncFeedback && (
                  <div className={`contacts-feedback-banner feedback-${syncFeedback.type}`} role="alert">
                    <span>{syncFeedback.text}</span>
                    <button
                      type="button"
                      className="contacts-feedback-close"
                      onClick={() => setSyncFeedback(null)}
                    >
                      ×
                    </button>
                  </div>
                )}

                {/* Search Bar */}
                <div className="contacts-search-box">
                  <svg
                    className="contacts-search-icon"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <input
                    type="text"
                    id="contacts-search-input"
                    className="contacts-search-input"
                    placeholder="Search registered contacts by name, username, or phone..."
                    value={contactsSearchQuery}
                    onChange={(e) => setContactsSearchQuery(e.target.value)}
                    aria-label="Search registered contacts"
                  />
                  {contactsSearchQuery && (
                    <button
                      type="button"
                      className="contacts-search-clear"
                      onClick={() => setContactsSearchQuery('')}
                      aria-label="Clear search"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* WhatsApp Filter Tabs: Registered on Assistance vs Invite */}
                <div className="contacts-tabs-bar">
                  <button
                    type="button"
                    className={`contacts-tab-btn ${contactsFilterTab === 'registered' ? 'active' : ''}`}
                    onClick={() => setContactsFilterTab('registered')}
                  >
                    <span className="contacts-tab-label">Registered on Assistance</span>
                    <span className="contacts-tab-badge">{registeredContacts.length}</span>
                  </button>
                  <button
                    type="button"
                    className={`contacts-tab-btn ${contactsFilterTab === 'invite' ? 'active' : ''}`}
                    onClick={() => setContactsFilterTab('invite')}
                  >
                    <span className="contacts-tab-label">Invite to Assistance</span>
                    <span className="contacts-tab-badge secondary">{nonRegisteredContacts.length}</span>
                  </button>
                </div>

                {/* Main Contacts List */}
                {contactsFilterTab === 'registered' ? (
                  <div className="contacts-list" id="contacts-list">
                    {filteredRegisteredContacts.length === 0 ? (
                      <div className="contacts-empty-state">
                        <div className="contacts-empty-icon">
                          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                          </svg>
                        </div>
                        <h3 className="contacts-empty-title">
                          {contactsSearchQuery ? 'No matching registered contacts' : 'No contacts registered yet'}
                        </h3>
                        <p className="contacts-empty-text">
                          {contactsSearchQuery
                            ? `No registered contact found matching "${contactsSearchQuery}"`
                            : 'Sync your phone contacts to see which of your friends and colleagues are already on Assistance.'}
                        </p>
                        {!contactsSearchQuery && (
                          <button
                            type="button"
                            className="contacts-sync-btn"
                            onClick={handleDeviceContactSync}
                            disabled={isSyncingContacts}
                          >
                            Sync Phone Contacts Now
                          </button>
                        )}
                      </div>
                    ) : (
                      filteredRegisteredContacts.map((contact) => (
                        <div key={contact.id || contact.username} className="contact-card">
                          <div className="contact-card-left">
                            <div
                              className="contact-avatar"
                              style={{
                                backgroundColor: contact.avatar ? 'transparent' : getAvatarColor(contact.phoneBookName || contact.username),
                              }}
                            >
                              {contact.avatar ? (
                                <img src={contact.avatar} alt={contact.phoneBookName} className="contact-avatar-img" />
                              ) : (
                                <span>{getInitials(contact.phoneBookName || contact.username)}</span>
                              )}
                              <span className="contact-online-dot" title="Active on Assistance"></span>
                            </div>

                            <div className="contact-info">
                              <div className="contact-name-row">
                                <span className="contact-name">{contact.phoneBookName}</span>
                                <span className="contact-username">@{contact.username}</span>
                                <span className="contact-verified-badge" title="Registered Assistance User">
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                  </svg>
                                  Registered
                                </span>
                              </div>

                              <div className="contact-status" title={contact.status}>
                                {contact.status}
                              </div>

                              <div className="contact-meta-row">
                                <span className="contact-phone">
                                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                  </svg>
                                  {contact.phone}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="contact-card-actions">
                            <button
                              type="button"
                              className="contact-action-btn primary"
                              onClick={() => handleStartChatWithContact(contact)}
                              title={`Message ${contact.phoneBookName}`}
                              aria-label={`Message ${contact.phoneBookName}`}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                              </svg>
                              <span>Message</span>
                            </button>

                            <button
                              type="button"
                              className="contact-action-btn icon-only"
                              onClick={() => navigateTo('voice-and-video-call')}
                              title={`Call ${contact.phoneBookName}`}
                              aria-label={`Call ${contact.phoneBookName}`}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                ) : (
                  /* Invite Section (WhatsApp model for phone contacts not yet registered) */
                  <div className="contacts-list" id="invite-contacts-list">
                    {filteredInviteContacts.length === 0 ? (
                      <div className="contacts-empty-state">
                        <h3 className="contacts-empty-title">All your phone contacts are already on Assistance!</h3>
                        <p className="contacts-empty-text">Every synced phone contact has registered on Assistance.</p>
                      </div>
                    ) : (
                      filteredInviteContacts.map((contact, idx) => (
                        <div key={contact.phone || idx} className="contact-card invite-card">
                          <div className="contact-card-left">
                            <div
                              className="contact-avatar invite"
                              style={{ backgroundColor: '#9ca3af' }}
                            >
                              <span>{getInitials(contact.phoneBookName)}</span>
                            </div>
                            <div className="contact-info">
                              <span className="contact-name">{contact.phoneBookName}</span>
                              <span className="contact-phone">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                                {contact.phone}
                              </span>
                            </div>
                          </div>
                          <div className="contact-card-actions">
                            <button
                              type="button"
                              className="contact-invite-btn"
                              onClick={() => {
                                navigator.clipboard?.writeText?.('Join me on Assistance: https://assistance.app/join');
                                setSyncFeedback({
                                  type: 'success',
                                  text: `Invitation link copied for ${contact.phoneBookName}!`,
                                });
                              }}
                            >
                              Invite
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Add Phone Contact Modal */}
                {showAddContactModal && (
                  <div className="contacts-modal-backdrop" onClick={() => setShowAddContactModal(false)}>
                    <div className="contacts-modal" onClick={(e) => e.stopPropagation()}>
                      <div className="contacts-modal-header">
                        <h3 className="contacts-modal-title">Add Phone Contact to Sync</h3>
                        <button
                          type="button"
                          className="contacts-modal-close-btn"
                          onClick={() => setShowAddContactModal(false)}
                        >
                          ×
                        </button>
                      </div>
                      <p className="contacts-modal-desc">
                        Add a contact from your phonebook. If they are already registered on Assistance, they will immediately appear in your registered contacts list!
                      </p>
                      <form onSubmit={handleAddNewContact} className="contacts-modal-form">
                        <div className="form-group">
                          <label className="input-label" htmlFor="new-contact-name">Contact Name</label>
                          <input
                            type="text"
                            id="new-contact-name"
                            className="input-field"
                            placeholder="e.g. Adarsh"
                            value={newContactName}
                            onChange={(e) => setNewContactName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label className="input-label" htmlFor="new-contact-phone">Phone Number</label>
                          <input
                            type="tel"
                            id="new-contact-phone"
                            className="input-field"
                            placeholder="e.g. 9074762258 or +1 415-555-0101"
                            value={newContactPhone}
                            onChange={(e) => setNewContactPhone(e.target.value)}
                            required
                          />
                        </div>
                        <div className="contacts-modal-footer">
                          <button
                            type="button"
                            className="contacts-modal-cancel-btn"
                            onClick={() => setShowAddContactModal(false)}
                          >
                            Cancel
                          </button>
                          <button type="submit" className="contacts-modal-submit-btn">
                            Save & Sync
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : currentView === 'profile' ? (
            <div className="profile-space" id="profile-space">
              <div className="profile-container" id="profile-container">
                <div
                  className="cover-photo-container"
                  id="cover-photo-container"
                  onClick={() => coverFileInputRef.current?.click()}
                  title={coverPhoto ? 'Click to change cover photo' : 'Click to add cover photo'}
                >
                  {coverPhoto ? (
                    <>
                      <img src={coverPhoto} alt="Cover preview" className="cover-photo-img" />
                      <button
                        type="button"
                        className="cover-photo-btn cover-photo-btn-change"
                        id="cover-photo-btn"
                        title="Change cover photo"
                        onClick={(e) => {
                          e.stopPropagation();
                          coverFileInputRef.current?.click();
                        }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                          <circle cx="12" cy="13" r="4"></circle>
                        </svg>
                        <span>Change Cover Photo</span>
                      </button>
                    </>
                  ) : (
                    <div className="cover-photo-empty">
                      <button
                        type="button"
                        className="cover-photo-btn cover-photo-btn-add"
                        id="cover-photo-btn"
                        title="Add cover photo"
                        onClick={(e) => {
                          e.stopPropagation();
                          coverFileInputRef.current?.click();
                        }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                          <circle cx="12" cy="13" r="4"></circle>
                        </svg>
                        <span>Add Cover Photo</span>
                      </button>
                    </div>
                  )}

                  <input
                    ref={coverFileInputRef}
                    type="file"
                    id="cover-photo-input"
                    accept="image/*"
                    className="hidden-file-input"
                    onClick={(e) => {
                      e.target.value = null;
                    }}
                    onChange={handleCoverPhotoChange}
                  />
                </div>

                <div className="profile-picture-container" id="profile-picture-container">
                  <div
                    className="profile-picture-wrapper"
                    onClick={() => profileFileInputRef.current?.click()}
                    title="Click to change profile picture"
                  >
                    {profilePicture ? (
                      <img src={profilePicture} alt="Profile preview" className="profile-picture-img" />
                    ) : (
                      <div className="profile-picture-placeholder">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </div>
                    )}

                    <button
                      type="button"
                      className="profile-picture-btn"
                      id="profile-picture-btn"
                      title="Set profile picture"
                      onClick={(e) => {
                        e.stopPropagation();
                        profileFileInputRef.current?.click();
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                        <circle cx="12" cy="13" r="4"></circle>
                      </svg>
                    </button>
                    <input
                      ref={profileFileInputRef}
                      type="file"
                      id="profile-picture-input"
                      accept="image/*"
                      className="hidden-file-input"
                      onClick={(e) => {
                        e.target.value = null;
                      }}
                      onChange={handleProfilePictureChange}
                    />
                  </div>
                </div>

                <div className="profile-details" id="profile-details">
                  {isEditingUsername ? (
                    <form className="edit-username-form" onSubmit={handleSaveUsername}>
                      <div className="edit-username-input-row">
                        <input
                          type="text"
                          className="input-field edit-username-input"
                          id="edit-username-input"
                          value={editUsernameInput}
                          onChange={(e) => setEditUsernameInput(e.target.value)}
                          placeholder="Enter user name"
                          autoFocus
                        />
                        <button
                          type="submit"
                          className="btn-save-username"
                          id="save-username-btn"
                          disabled={isSavingUsername}
                        >
                          {isSavingUsername ? 'Saving...' : 'Save'}
                        </button>
                        <button
                          type="button"
                          className="btn-cancel-username"
                          id="cancel-username-btn"
                          onClick={() => {
                            setIsEditingUsername(false);
                            setUsernameEditFeedback(null);
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                      {usernameEditFeedback && (
                        <p className="status-message status-taken" role="alert">
                          ✕ {usernameEditFeedback.text}
                        </p>
                      )}
                    </form>
                  ) : (
                    <div className="username-display-row">
                      <h2 className="profile-username" id="profile-username">
                        {loggedInUser || 'User'}
                      </h2>
                      <button
                        type="button"
                        className="edit-username-btn"
                        id="edit-username-btn"
                        title="Edit user name"
                        aria-label="Edit user name"
                        onClick={() => {
                          setEditUsernameInput(loggedInUser || '');
                          setIsEditingUsername(true);
                        }}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                        </svg>
                        <span>Edit</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : currentView === 'social' ? (
            <div className="social-space" id="social-space">
              <form
                className="search-friends-form"
                id="search-friends-form"
                onSubmit={handleSearchFriends}
              >
                <div className="search-friends-input-wrapper">
                  <svg
                    className="search-icon"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <input
                    type="text"
                    id="search-friends-input"
                    className="search-friends-input"
                    placeholder="Search Friends"
                    value={searchFriendsQuery}
                    onChange={(e) => setSearchFriendsQuery(e.target.value)}
                    aria-label="Search Friends"
                  />
                </div>
                <button
                  type="submit"
                  id="search-friends-btn"
                  className="search-friends-btn"
                >
                  Search
                </button>
              </form>
            </div>
          ) : currentView === 'privacy' ? (
            <div className="privacy-space" id="privacy-space">
              <div className="privacy-container" id="privacy-container">
                <div className="privacy-card" id="account-privacy-card">
                  <h2 className="privacy-card-title" id="account-privacy-title">
                    Public and private accounts
                  </h2>
                  <div
                    className="account-privacy-options"
                    id="account-privacy-options"
                    role="radiogroup"
                    aria-label="Public and private accounts"
                  >
                    <label
                      htmlFor="privacy-public"
                      className={`account-privacy-option ${accountPrivacy === 'public' ? 'active' : ''}`}
                    >
                      <input
                        type="radio"
                        id="privacy-public"
                        name="account-privacy"
                        value="public"
                        checked={accountPrivacy === 'public'}
                        onChange={() => handleAccountPrivacyChange('public')}
                      />
                      <span className="privacy-option-label">Public account</span>
                    </label>

                    <label
                      htmlFor="privacy-private"
                      className={`account-privacy-option ${accountPrivacy === 'private' ? 'active' : ''}`}
                    >
                      <input
                        type="radio"
                        id="privacy-private"
                        name="account-privacy"
                        value="private"
                        checked={accountPrivacy === 'private'}
                        onChange={() => handleAccountPrivacyChange('private')}
                      />
                      <span className="privacy-option-label">Private account</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ) : currentView === 'messages' ? (
            <div className="messages-space" id="messages-space">
              <div
                className={`messaging-system-container ${mobileChatViewActive && activeChat ? 'mobile-chat-open' : 'mobile-list-open'}`}
                id="messaging-system-container"
              >
                {/* Conversations Sidebar */}
                <div className="messaging-sidebar">
                  <div className="messaging-sidebar-header">
                    <h2 className="messaging-sidebar-title">Chats</h2>
                    <div className="messaging-header-actions">
                      <button
                        type="button"
                        className="messaging-icon-btn"
                        title="New Chat"
                        aria-label="New Chat"
                        onClick={() => navigateTo('contacts')}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 20h9"></path>
                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="messaging-search-wrapper">
                    <svg className="messaging-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="2" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input
                      type="text"
                      className="messaging-search-input"
                      placeholder="Search chats..."
                      value={messageSearchQuery}
                      onChange={(e) => setMessageSearchQuery(e.target.value)}
                      aria-label="Search chats"
                    />
                  </div>

                  <div className="messaging-conversations-list">
                    {filteredConversations.length === 0 ? (
                      <div className="messaging-empty-convs">
                        <span>No conversations yet</span>
                      </div>
                    ) : (
                      filteredConversations.map((conv) => {
                        const isSelected = activeChat?.id === conv.id || activeChat?.conversationId === conv.conversationId;
                        const lastMsg = conv.lastMessage;
                        const lastTime = lastMsg?.createdAt
                          ? new Date(lastMsg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                          : '';

                        return (
                          <div
                            key={conv.id || conv.conversationId || conv.username}
                            className={`messaging-conv-item ${isSelected ? 'active' : ''}`}
                            onClick={() => handleSelectConversation(conv)}
                          >
                            <div
                              className="messaging-conv-avatar"
                              style={{ backgroundColor: conv.avatar ? 'transparent' : getAvatarColor(conv.name) }}
                            >
                              {conv.avatar ? (
                                <img src={conv.avatar} alt={conv.name} className="contact-avatar-img" />
                              ) : (
                                <span>{getInitials(conv.name)}</span>
                              )}
                              {conv.status === 'Online' && (
                                <span className="messaging-online-indicator"></span>
                              )}
                            </div>

                            <div className="messaging-conv-info">
                              <div className="messaging-conv-top">
                                <span className="messaging-conv-name">{conv.name}</span>
                                {lastTime && (
                                  <span className="messaging-conv-time">{lastTime}</span>
                                )}
                              </div>
                              <div className="messaging-conv-bottom">
                                <span className="messaging-conv-preview">
                                  {lastMsg?.text
                                    ? (lastMsg.sender === (loggedInUser || 'user') ? 'You: ' : '') + lastMsg.text
                                    : 'No messages yet'}
                                </span>
                                {conv.unread > 0 && !isSelected && (
                                  <span className="messaging-unread-badge">{conv.unread}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Main Chat View */}
                <div className="messaging-main">
                  {activeChat ? (
                    <>
                      <div className="messaging-chat-header">
                        <div className="messaging-chat-user-info">
                          <button
                            type="button"
                            className="messaging-chat-back-btn"
                            onClick={handleBackToConversations}
                            title="Back to chats"
                            aria-label="Back to chats"
                          >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="15 18 9 12 15 6" />
                            </svg>
                          </button>
                          <div
                            className="messaging-chat-avatar"
                            style={{ backgroundColor: activeChat.avatar ? 'transparent' : getAvatarColor(activeChat.name) }}
                          >
                            {activeChat.avatar ? (
                              <img src={activeChat.avatar} alt={activeChat.name} className="contact-avatar-img" />
                            ) : (
                              <span>{getInitials(activeChat.name)}</span>
                            )}
                            {activeChat.status === 'Online' && (
                              <span className="messaging-online-indicator"></span>
                            )}
                          </div>
                          <div className="messaging-chat-user-details">
                            <span className="messaging-chat-user-name">{activeChat.name}</span>
                            <span className={`messaging-chat-user-status ${isPeerTyping ? 'online' : activeChat.status === 'Online' ? 'online' : ''}`}>
                              {isPeerTyping ? 'typing...' : activeChat.status === 'Online' ? 'Online' : activeChat.status || 'Offline'}
                            </span>
                          </div>
                        </div>

                        <div className="messaging-chat-header-actions">
                          <button
                            type="button"
                            className="messaging-icon-btn"
                            title="Voice Call"
                            aria-label="Voice Call"
                            onClick={() => navigateTo('voice-and-video-call')}
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            className="messaging-icon-btn"
                            title="Video Call"
                            aria-label="Video Call"
                            onClick={() => navigateTo('voice-and-video-call')}
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polygon points="23 7 16 12 23 17 23 7" />
                              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            className="messaging-icon-btn"
                            title="Chat Options"
                            aria-label="Chat Options"
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="1" />
                              <circle cx="12" cy="5" r="1" />
                              <circle cx="12" cy="19" r="1" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="messaging-messages-area">
                        <div className="messaging-date-badge">
                          <span>Today</span>
                        </div>

                        {isLoadingMessages ? (
                          <div className="messaging-loading">Loading messages...</div>
                        ) : activeChatMessages.length === 0 ? (
                          <div className="messaging-no-messages">
                            <p>No messages yet. Say hello to {activeChat.name}!</p>
                          </div>
                        ) : (
                          activeChatMessages.map((msg) => {
                            const isMe = msg.sender === 'me' || msg.senderUsername === (loggedInUser || 'user');
                            return (
                              <div
                                key={msg.id}
                                className={`messaging-bubble-wrapper ${isMe ? 'sent' : 'received'}`}
                              >
                                <div className={`messaging-bubble ${isMe ? 'sent' : 'received'}`}>
                                  {msg.attachment && (
                                    <div className="messaging-bubble-attachment">
                                      {msg.attachment.startsWith('data:image') || msg.attachment.match(/\.(jpeg|jpg|gif|png|webp)/i) ? (
                                        <img src={msg.attachment} alt="attachment" className="messaging-attachment-img" />
                                      ) : (
                                        <a href={msg.attachment} download="attachment" className="messaging-attachment-link">
                                          📎 Attached File
                                        </a>
                                      )}
                                    </div>
                                  )}
                                  {msg.text && <p className="messaging-bubble-text">{msg.text}</p>}
                                  <div className="messaging-bubble-footer">
                                    <span className="messaging-bubble-time">{msg.time}</span>
                                    {isMe && (
                                      <svg className={`messaging-check-icon ${msg.read ? 'read' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <polyline points="20 6 9 17 4 12" />
                                      </svg>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        )}
                        {isPeerTyping && (
                          <div className="messaging-bubble-wrapper received">
                            <div className="messaging-bubble received messaging-typing-bubble">
                              <span className="typing-dot"></span>
                              <span className="typing-dot"></span>
                              <span className="typing-dot"></span>
                            </div>
                          </div>
                        )}
                        <div ref={messagesScrollRef} />
                      </div>

                      <form className="messaging-input-area" onSubmit={handleSendMessage}>
                        <input
                          type="file"
                          ref={chatFileInputRef}
                          style={{ display: 'none' }}
                          onChange={handleChatFileUpload}
                        />

                        <button
                          type="button"
                          className="messaging-attach-btn"
                          title="Attach file"
                          aria-label="Attach file"
                          onClick={() => chatFileInputRef.current && chatFileInputRef.current.click()}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                          </svg>
                        </button>

                        <div className="messaging-input-wrapper">
                          {chatAttachment && (
                            <div className="messaging-attachment-preview">
                              {chatAttachment.startsWith('data:image') ? (
                                <img src={chatAttachment} alt="preview" className="attachment-thumb" />
                              ) : (
                                <span className="attachment-file-badge">📎 File attached</span>
                              )}
                              <button
                                type="button"
                                className="attachment-remove-btn"
                                onClick={() => setChatAttachment(null)}
                                aria-label="Remove attachment"
                              >
                                ×
                              </button>
                            </div>
                          )}
                          <input
                            type="text"
                            className="messaging-input-field"
                            placeholder={activeChat ? `Message ${activeChat.name}...` : 'Type a message...'}
                            value={messageInputText}
                            onChange={handleMessageInputChange}
                            aria-label="Type a message"
                          />
                        </div>

                        <button
                          type="submit"
                          className="messaging-send-btn"
                          disabled={!messageInputText.trim() && !chatAttachment}
                          title="Send message"
                          aria-label="Send message"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                          </svg>
                        </button>
                      </form>
                    </>
                  ) : (
                    <div className="messaging-no-chat">
                      <p>Select a chat to start messaging</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : currentView === 'whats-happening' ? (
            <div className="whats-happening-space" id="whats-happening-space">
              <div className="post-creator-container" id="post-creator-container">
                <form
                  className="create-post-card"
                  id="create-post-card"
                  onSubmit={handleCreatePost}
                >
                  <textarea
                    id="create-post-textarea"
                    className="create-post-textarea"
                    placeholder="What's happening around you?"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    rows={4}
                    aria-label="Create a text post"
                  />
                  <div className="create-post-actions">
                    <button
                      type="submit"
                      id="create-post-btn"
                      className="create-post-btn"
                      disabled={!postContent.trim()}
                    >
                      Post
                    </button>
                  </div>
                </form>

                {posts.length > 0 && (
                  <div className="posts-list" id="posts-list">
                    {posts.map((post) => (
                      <article key={post.id} className="post-card">
                        <div className="post-header">
                          <span className="post-author">{post.author || loggedInUser || 'User'}</span>
                          <span className="post-time">{post.timestamp}</span>
                        </div>
                        <p className="post-content">{post.content}</p>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : currentView === 'photo-sharing' ? (
            <div className="photo-sharing-space" id="photo-sharing-space">
              <div className="photo-upload-container" id="photo-upload-container">
                <input
                  ref={uploadImageRef}
                  type="file"
                  id="upload-image-input"
                  accept="image/*"
                  className="hidden-file-input"
                  onClick={(e) => {
                    e.target.value = null;
                  }}
                  onChange={handleImageUpload}
                />

                {!uploadedImage ? (
                  <div
                    className="upload-image-dropzone"
                    id="upload-image-dropzone"
                    onClick={() => uploadImageRef.current?.click()}
                  >
                    <div className="upload-image-icon-wrapper">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                      </svg>
                    </div>
                    <button
                      type="button"
                      id="upload-image-btn"
                      className="upload-image-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        uploadImageRef.current?.click();
                      }}
                    >
                      Upload Image
                    </button>
                  </div>
                ) : (
                  <div className="uploaded-image-preview-card" id="uploaded-image-preview-card">
                    <img src={uploadedImage} alt="Uploaded preview" className="uploaded-image-preview" />
                    <div className="uploaded-image-actions">
                      <button
                        type="button"
                        id="upload-image-btn"
                        className="upload-image-btn"
                        onClick={() => uploadImageRef.current?.click()}
                      >
                        Upload Image
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : currentView === 'video-sharing' ? (
            <div className="video-sharing-space" id="video-sharing-space">
              <div className="video-upload-container" id="video-upload-container">
                <input
                  ref={uploadVideoRef}
                  type="file"
                  id="upload-video-input"
                  accept="video/*"
                  className="hidden-file-input"
                  onClick={(e) => {
                    e.target.value = null;
                  }}
                  onChange={handleVideoUpload}
                />

                {!uploadedVideo ? (
                  <div
                    className="upload-video-dropzone"
                    id="upload-video-dropzone"
                    onClick={() => uploadVideoRef.current?.click()}
                  >
                    <div className="upload-video-icon-wrapper">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="23 7 16 12 23 17 23 7"></polygon>
                        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                      </svg>
                    </div>
                    <button
                      type="button"
                      id="upload-video-btn"
                      className="upload-video-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        uploadVideoRef.current?.click();
                      }}
                    >
                      Upload Video
                    </button>
                  </div>
                ) : (
                  <div className="uploaded-video-preview-card" id="uploaded-video-preview-card">
                    <video
                      src={uploadedVideo}
                      controls
                      className="uploaded-video-preview"
                    />
                    <div className="uploaded-video-actions">
                      <button
                        type="button"
                        id="upload-video-btn"
                        className="upload-video-btn"
                        onClick={() => uploadVideoRef.current?.click()}
                      >
                        Upload Video
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : currentView === 'stories' ? (
            <div className="stories-space" id="stories-space">
              <div className="story-upload-container" id="story-upload-container">
                <input
                  ref={uploadStoryRef}
                  type="file"
                  id="upload-story-input"
                  accept="image/*"
                  className="hidden-file-input"
                  onClick={(e) => {
                    e.target.value = null;
                  }}
                  onChange={handleStoryUpload}
                />

                {!uploadedStory ? (
                  <div
                    className="upload-story-dropzone"
                    id="upload-story-dropzone"
                    onClick={() => uploadStoryRef.current?.click()}
                  >
                    <div className="upload-story-icon-wrapper">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="16"></line>
                        <line x1="8" y1="12" x2="16" y2="12"></line>
                      </svg>
                    </div>
                    <button
                      type="button"
                      id="upload-story-btn"
                      className="upload-story-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        uploadStoryRef.current?.click();
                      }}
                    >
                      Upload Story Photo
                    </button>
                  </div>
                ) : (
                  <div className="uploaded-story-preview-card" id="uploaded-story-preview-card">
                    <div className="story-frame">
                      <img src={uploadedStory} alt="Story preview" className="uploaded-story-preview" />
                    </div>
                    <div className="uploaded-story-actions">
                      <button
                        type="button"
                        id="upload-story-btn"
                        className="upload-story-btn"
                        onClick={() => uploadStoryRef.current?.click()}
                      >
                        Upload Story Photo
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="blank-space" id="blank-space">
              {/* Blank space without any content */}
            </div>
          )}
        </main>
      </div>
    </div>
    </>
  );
  }

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      <main className="container">
      {currentView === 'reset-password' ? (
        <div className="registration-wrapper">
          <form className="form-container" onSubmit={handleNewPasswordSubmit}>
            <div className="form-group">
              <label htmlFor="new-password-input" className="input-label">
                New password
              </label>
              <div className="input-wrapper">
                <input
                  id="new-password-input"
                  type={showNewPassword ? 'text' : 'password'}
                  className="input-field input-with-toggle"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  autoComplete="new-password"
                  autoFocus
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                >
                  {showNewPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8-11 8-4 8-11 8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirm-new-password-input" className="input-label">
                Confirm new password
              </label>
              <div className="input-wrapper">
                <input
                  id="confirm-new-password-input"
                  type={showConfirmNewPassword ? 'text' : 'password'}
                  className={`input-field input-with-toggle ${
                    confirmNewPassword && newPassword === confirmNewPassword
                      ? 'input-valid'
                      : confirmNewPassword && newPassword !== confirmNewPassword
                      ? 'input-invalid'
                      : ''
                  }`}
                  placeholder="••••••••"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                  aria-label={showConfirmNewPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmNewPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8-4 8-11 8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
              {confirmNewPassword && newPassword === confirmNewPassword && (
                <p className="status-message status-available" role="status">
                  ✓ Passwords match
                </p>
              )}
              {confirmNewPassword && newPassword !== confirmNewPassword && (
                <p className="status-message status-taken" role="status">
                  ✕ Passwords do not match
                </p>
              )}
            </div>

            <button
              type="submit"
              id="new-password-submit-btn"
              className="register-btn"
              disabled={isSavingNewPassword}
            >
              {isSavingNewPassword ? 'Submitting...' : 'Submit'}
            </button>

            {newPasswordFeedback && (
              <div
                className={`feedback-banner feedback-${newPasswordFeedback.type}`}
                role="alert"
              >
                {newPasswordFeedback.text}
              </div>
            )}
          </form>
        </div>
      ) : currentView === 'forgot-password' ? (
        <div className="registration-wrapper">
          <form className="form-container" onSubmit={handleResetSubmit}>
            <div className="form-group">
              <label htmlFor="reset-email-input" className="input-label">
                Email Address
              </label>
              <input
                id="reset-email-input"
                type="email"
                className="input-field"
                placeholder="name@example.com"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                autoComplete="email"
                autoFocus
              />
            </div>

            <button
              type="submit"
              id="reset-submit-btn"
              className="register-btn"
              disabled={isSubmittingReset}
            >
              {isSubmittingReset ? 'Submitting...' : 'Submit'}
            </button>

            {resetFeedback && (
              <div
                className={`feedback-banner feedback-${resetFeedback.type}`}
                role="alert"
              >
                {resetFeedback.text}
              </div>
            )}
          </form>
        </div>
      ) : currentView === 'register' ? (
        <div className="registration-wrapper">
          <h1 className="heading" id="registration-heading">
            Registration
          </h1>

          <form className="form-container" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email-input" className="input-label">
                Email Address
              </label>
              <input
                id="email-input"
                type="email"
                className="input-field"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone-input" className="input-label">
                Phone Number
              </label>
              <input
                id="phone-input"
                type="tel"
                className="input-field"
                placeholder="+1 (555) 000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
              />
            </div>

            <div className="form-group">
              <label htmlFor="username-input" className="input-label">
                Username
              </label>
              <div className="input-wrapper">
                <input
                  id="username-input"
                  type="text"
                  className={`input-field ${
                    usernameStatus === 'available'
                      ? 'input-valid'
                      : usernameStatus === 'taken' || usernameStatus === 'too-short'
                      ? 'input-invalid'
                      : ''
                  }`}
                  placeholder="johndoe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                />
                {usernameStatus === 'checking' && (
                  <span className="input-spinner" aria-label="Checking"></span>
                )}
              </div>
              {statusMessage && (
                <p
                  className={`status-message status-${usernameStatus}`}
                  role="status"
                >
                  {statusMessage}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password-input" className="input-label">
                Password
              </label>
              <div className="input-wrapper">
                <input
                  id="password-input"
                  type={showPassword ? 'text' : 'password'}
                  className="input-field input-with-toggle"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8-4 8-11 8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirm-password-input" className="input-label">
                Confirm Password
              </label>
              <div className="input-wrapper">
                <input
                  id="confirm-password-input"
                  type={showConfirmPassword ? 'text' : 'password'}
                  className={`input-field input-with-toggle ${
                    passwordsMatch ? 'input-valid' : passwordsMismatch ? 'input-invalid' : ''
                  }`}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8-4 8-11 8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
              {passwordsMatch && (
                <p className="status-message status-available" role="status">
                  ✓ Passwords match
                </p>
              )}
              {passwordsMismatch && (
                <p className="status-message status-taken" role="status">
                  ✕ Passwords do not match
                </p>
              )}
            </div>

            <button
              type="submit"
              id="register-btn"
              className="register-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>

            <p className="login-prompt">
              Already have an account?{' '}
              <a
                href="/login"
                id="login-link"
                className="login-link"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('login');
                }}
              >
                Login
              </a>
            </p>

            {feedback && (
              <div
                className={`feedback-banner feedback-${feedback.type}`}
                role="alert"
              >
                {feedback.text}
              </div>
            )}
          </form>
        </div>
      ) : (
        <div className="registration-wrapper">
          <h1 className="heading" id="login-heading">
            Login
          </h1>

          <form className="form-container" onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label htmlFor="login-username-input" className="input-label">
                Username
              </label>
              <input
                id="login-username-input"
                type="text"
                className="input-field"
                placeholder="johndoe"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                autoComplete="username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="login-contact-input" className="input-label">
                Email Address or Phone Number
              </label>
              <input
                id="login-contact-input"
                type="text"
                className="input-field"
                placeholder="name@example.com or +1 (555) 000-0000"
                value={loginContact}
                onChange={(e) => setLoginContact(e.target.value)}
                autoComplete="email tel"
              />
            </div>

            <div className="form-group">
              <label htmlFor="login-password-input" className="input-label">
                Password
              </label>
              <div className="input-wrapper">
                <input
                  id="login-password-input"
                  type={showLoginPassword ? 'text' : 'password'}
                  className="input-field input-with-toggle"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  aria-label={showLoginPassword ? 'Hide password' : 'Show password'}
                >
                  {showLoginPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8-4 8-11 8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="forgot-password-row">
              <a
                href="/forgot-password"
                id="forgot-password-link"
                className="forgot-password-link"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('forgot-password');
                }}
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              id="login-btn"
              className="register-btn"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? 'Logging in...' : 'Login'}
            </button>

            <p className="login-prompt">
              Don't have an account?{' '}
              <a
                href="/"
                id="register-link"
                className="login-link"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('register');
                }}
              >
                Register
              </a>
            </p>

            {loginFeedback && (
              <div
                className={`feedback-banner feedback-${loginFeedback.type}`}
                role="alert"
              >
                {loginFeedback.text}
              </div>
            )}
          </form>
        </div>
      )}
    </main>
    </>
  );
}

export default App;
