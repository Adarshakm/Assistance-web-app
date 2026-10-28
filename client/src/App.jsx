import { useState, useEffect, useRef } from 'react';
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

  if (
    currentView === 'blank' ||
    currentView === 'account' ||
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

          <main className="workspace-main" id="workspace-main">
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
              {/* Messages space without any content */}
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
