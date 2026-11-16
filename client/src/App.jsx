import { useState, useEffect, useRef, useMemo } from 'react';
import SplashScreen from './components/SplashScreen.jsx';
import { voiceCallService, callAudioSynthesizer } from './services/voiceCallService.js';

function App() {
  const [currentView, setCurrentView] = useState(() => {
    if (
      window.location.pathname === '/messages' ||
      window.location.hash === '#messages' ||
      window.location.pathname === '/chat' ||
      window.location.hash === '#chat'
    ) {
      return 'messages';
    }
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
      window.location.pathname === '/user-profile' ||
      window.location.hash === '#user-profile' ||
      window.location.pathname.startsWith('/user/')
    ) {
      return 'user-profile';
    }
    if (
      window.location.pathname === '/privacy' ||
      window.location.hash === '#privacy' ||
      window.location.pathname === '/privacy-security' ||
      window.location.hash === '#privacy-security'
    ) {
      return 'privacy';
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
      window.location.pathname === '/people-i-follow' ||
      window.location.hash === '#people-i-follow' ||
      window.location.pathname === '/following-feed' ||
      window.location.hash === '#following-feed'
    ) {
      return 'people-i-follow';
    }
    if (
      window.location.pathname === '/friends-only' ||
      window.location.hash === '#friends-only' ||
      window.location.pathname === '/friends-only-feed' ||
      window.location.hash === '#friends-only-feed' ||
      window.location.pathname === '/friends-feed' ||
      window.location.hash === '#friends-feed'
    ) {
      return 'friends-only';
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
    setIsSidebarVisible(false); // fully hide left sidebar when clicking messages, whats happening around you, etc.
    const path =
      view === 'messages'
        ? '/messages'
        : view === 'login'
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
        : view === 'user-profile'
        ? (selectedProfileUser?.username ? `/user/${selectedProfileUser.username}` : '/user-profile')
        : view === 'privacy'
        ? '/privacy-security'
        : view === 'whats-happening'
        ? '/whats-happening'
        : view === 'people-i-follow'
        ? '/people-i-follow'
        : view === 'friends-only'
        ? '/friends-only'
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
      if (
        window.location.pathname === '/messages' ||
        window.location.hash === '#messages' ||
        window.location.pathname === '/chat' ||
        window.location.hash === '#chat'
      ) {
        setCurrentView('messages');
      } else if (window.location.pathname === '/login' || window.location.hash === '#login') {
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
        window.location.pathname === '/user-profile' ||
        window.location.hash === '#user-profile' ||
        window.location.pathname.startsWith('/user/')
      ) {
        setCurrentView('user-profile');
      } else if (
        window.location.pathname === '/privacy' ||
        window.location.hash === '#privacy' ||
        window.location.pathname === '/privacy-security' ||
        window.location.hash === '#privacy-security'
      ) {
        setCurrentView('privacy');
      } else if (
        window.location.pathname === '/whats-happening' ||
        window.location.hash === '#whats-happening' ||
        window.location.pathname === '/whats-happening-around-you' ||
        window.location.hash === '#whats-happening-around-you'
      ) {
        setCurrentView('whats-happening');
      } else if (
        window.location.pathname === '/people-i-follow' ||
        window.location.hash === '#people-i-follow' ||
        window.location.pathname === '/following-feed' ||
        window.location.hash === '#following-feed'
      ) {
        setCurrentView('people-i-follow');
      } else if (
        window.location.pathname === '/friends-only' ||
        window.location.hash === '#friends-only' ||
        window.location.pathname === '/friends-only-feed' ||
        window.location.hash === '#friends-only-feed' ||
        window.location.pathname === '/friends-feed' ||
        window.location.hash === '#friends-feed'
      ) {
        setCurrentView('friends-only');
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

  const [isSidebarVisible, setIsSidebarVisible] = useState(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth <= 768) {
        return false;
      }
      const path = window.location.pathname;
      if (
        path === '/messages' ||
        path === '/whats-happening' ||
        path === '/people-i-follow' ||
        path === '/friends-only' ||
        path === '/contacts' ||
        path === '/social-connections'
      ) {
        return false;
      }
      return true;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined' && window.innerWidth <= 768) {
        setIsSidebarVisible(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  // Display name & rich profile state
  const [displayName, setDisplayName] = useState(() => {
    try {
      return localStorage.getItem('assistance_display_name') || '';
    } catch {
      return '';
    }
  });
  const [myProfileActiveTab, setMyProfileActiveTab] = useState('posts');
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [editProfileForm, setEditProfileForm] = useState({
    displayName: '',
    username: '',
    bio: '',
    location: '',
    website: '',
    education: '',
    employment: '',
    skills: '',
    interests: '',
  });
  const [isSavingFullProfile, setIsSavingFullProfile] = useState(false);
  const [fullProfileFeedback, setFullProfileFeedback] = useState(null);
  const [followModalType, setFollowModalType] = useState(null);
  const [followSearchQuery, setFollowSearchQuery] = useState('');
  const [profileToast, setProfileToast] = useState(null);

  // Edit username state
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [editUsernameInput, setEditUsernameInput] = useState('');
  const [isSavingUsername, setIsSavingUsername] = useState(false);
  const [usernameEditFeedback, setUsernameEditFeedback] = useState(null);

  // About section state
  const [aboutText, setAboutText] = useState(() => {
    try {
      return localStorage.getItem('assistance_about') || 'Hey there! I am using Assistance';
    } catch {
      return 'Hey there! I am using Assistance';
    }
  });
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [editAboutInput, setEditAboutInput] = useState('');

  // Location state
  const [locationText, setLocationText] = useState(() => {
    try {
      return localStorage.getItem('assistance_location') || '';
    } catch {
      return '';
    }
  });
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [editLocationInput, setEditLocationInput] = useState('');

  // Website information state
  const [websiteText, setWebsiteText] = useState(() => {
    try {
      return localStorage.getItem('assistance_website') || '';
    } catch {
      return '';
    }
  });
  const [isEditingWebsite, setIsEditingWebsite] = useState(false);
  const [editWebsiteInput, setEditWebsiteInput] = useState('');

  // Education state
  const [educationText, setEducationText] = useState(() => {
    try {
      return localStorage.getItem('assistance_education') || '';
    } catch {
      return '';
    }
  });
  const [isEditingEducation, setIsEditingEducation] = useState(false);
  const [editEducationInput, setEditEducationInput] = useState('');

  // Employment state
  const [employmentText, setEmploymentText] = useState(() => {
    try {
      return localStorage.getItem('assistance_employment') || '';
    } catch {
      return '';
    }
  });
  const [isEditingEmployment, setIsEditingEmployment] = useState(false);
  const [editEmploymentInput, setEditEmploymentInput] = useState('');

  // Skills state
  const [skillsText, setSkillsText] = useState(() => {
    try {
      return localStorage.getItem('assistance_skills') || '';
    } catch {
      return '';
    }
  });
  const [isEditingSkills, setIsEditingSkills] = useState(false);
  const [editSkillsInput, setEditSkillsInput] = useState('');

  // Interests state
  const [interestsText, setInterestsText] = useState(() => {
    try {
      return localStorage.getItem('assistance_interests') || '';
    } catch {
      return '';
    }
  });
  const [isEditingInterests, setIsEditingInterests] = useState(false);
  const [editInterestsInput, setEditInterestsInput] = useState('');

  // Followers & Following lists state
  const [followersList, setFollowersList] = useState(() => {
    try {
      const saved = localStorage.getItem('assistance_followers');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [followingList, setFollowingList] = useState(() => {
    try {
      const saved = localStorage.getItem('assistance_following');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [friendsList, setFriendsList] = useState(() => {
    try {
      const saved = localStorage.getItem('assistance_friends');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Other user's Home page / Profile view state
  const [selectedProfileUser, setSelectedProfileUser] = useState(null);
  const [isLoadingUserProfile, setIsLoadingUserProfile] = useState(false);
  const [profileActiveTab, setProfileActiveTab] = useState('posts');
  const [profilePreviousView, setProfilePreviousView] = useState('search-and-discovery');
  const [profileUserPosts, setProfileUserPosts] = useState([]);
  const [isLoadingProfilePosts, setIsLoadingProfilePosts] = useState(false);

  // Effective friends list: explicit friends from accepted requests + mutual follows
  const effectiveFriendsList = useMemo(() => {
    const list = [...friendsList.map((u) => String(u).toLowerCase())];
    followingList.forEach((u) => {
      const lower = String(u).toLowerCase();
      if (
        followersList.some((f) => String(f).toLowerCase() === lower) &&
        !list.includes(lower)
      ) {
        list.push(lower);
      }
    });
    return list;
  }, [friendsList, followingList, followersList]);
  const [activeFollowView, setActiveFollowView] = useState('all'); // 'all', 'followers', 'following'
  const [isAddingFollower, setIsAddingFollower] = useState(false);
  const [addFollowerInput, setAddFollowerInput] = useState('');
  const [isAddingFollowing, setIsAddingFollowing] = useState(false);
  const [addFollowingInput, setAddFollowingInput] = useState('');
  const [followError, setFollowError] = useState('');

  // Social connections search state
  const [searchFriendsQuery, setSearchFriendsQuery] = useState('');
  const [activeSocialFollowTab, setActiveSocialFollowTab] = useState('all'); // 'all', 'followers', 'following', 'follow-unfollow', 'friend-requests'

  // Friend requests state
  const [sentFriendRequests, setSentFriendRequests] = useState(() => {
    try {
      const saved = localStorage.getItem('assistance_sent_friend_requests');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [receivedFriendRequests, setReceivedFriendRequests] = useState(() => {
    try {
      const saved = localStorage.getItem('assistance_received_friend_requests');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [sendRequestInput, setSendRequestInput] = useState('');
  const [sendRequestFeedback, setSendRequestFeedback] = useState(null);
  const [friendRequestActionFeedback, setFriendRequestActionFeedback] = useState(null);

  // Privacy & Account Security state
  const [accountPrivacy, setAccountPrivacy] = useState(() => {
    try {
      return localStorage.getItem('assistance_account_privacy') || 'public';
    } catch {
      return 'public';
    }
  });

  // Text, image & video posts state for feeds
  const [postContent, setPostContent] = useState('');
  const [postImage, setPostImage] = useState(null);
  const [isUploadingPostImage, setIsUploadingPostImage] = useState(false);
  const postImageInputRef = useRef(null);
  const [postVideo, setPostVideo] = useState(null);
  const [isUploadingPostVideo, setIsUploadingPostVideo] = useState(false);
  const postVideoInputRef = useRef(null);
  const [isSubmittingPost, setIsSubmittingPost] = useState(false);
  const [postFeedback, setPostFeedback] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editingPostContent, setEditingPostContent] = useState('');
  const [editingPostImage, setEditingPostImage] = useState(null);
  const editPostImageInputRef = useRef(null);
  const [editingPostVideo, setEditingPostVideo] = useState(null);
  const editPostVideoInputRef = useRef(null);
  const [isSavingPostEdit, setIsSavingPostEdit] = useState(false);
  const [editPostFeedback, setEditPostFeedback] = useState(null);
  const [selectedPostImageModal, setSelectedPostImageModal] = useState(null);
  const [posts, setPosts] = useState(() => {
    try {
      const saved = localStorage.getItem('assistance_posts');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Post Comments state
  const [openCommentsPosts, setOpenCommentsPosts] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [submittingCommentPostIds, setSubmittingCommentPostIds] = useState({});
  const [deletingCommentIds, setDeletingCommentIds] = useState({});

  // Automatically clear post feedback after 6 seconds
  useEffect(() => {
    if (postFeedback) {
      const timer = setTimeout(() => setPostFeedback(null), 6000);
      return () => clearTimeout(timer);
    }
  }, [postFeedback]);

  const isFetchingPostsRef = useRef(false);

  // Fetch posts from backend and poll for real-time updates across all users
  const fetchPosts = async () => {
    if (isFetchingPostsRef.current) return;
    isFetchingPostsRef.current = true;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);
      const res = await fetch(`/api/posts?_t=${Date.now()}`, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (res.ok) {
        const data = await res.json();
        if (data && data.success && Array.isArray(data.posts)) {
          // Merge server posts while retaining any post published locally in the last 60 seconds
          setPosts((prev) => {
            const serverIds = new Set(data.posts.map((p) => p.id));
            const localPending = prev.filter(
              (p) => !serverIds.has(p.id) && Date.now() - (p._localCreatedAt || 0) < 60000
            );
            return [...localPending, ...data.posts];
          });
          try {
            // Protect localStorage (5MB browser limit) by stripping heavy media strings
            const lightForStorage = data.posts.slice(0, 30).map((p) => ({
              ...p,
              video: '',
              media: p.media && p.media.length > 50000 ? '' : p.media,
              image: p.image && p.image.length > 50000 ? '' : p.image,
            }));
            localStorage.setItem('assistance_posts', JSON.stringify(lightForStorage));
          } catch {}
        }
      }
    } catch {
      // ignore network errors
    } finally {
      isFetchingPostsRef.current = false;
    }
  };

  useEffect(() => {
    let isCancelled = false;
    let timer = null;

    const poll = async () => {
      await fetchPosts();
      if (!isCancelled) {
        timer = setTimeout(poll, 4000);
      }
    };

    poll();

    return () => {
      isCancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [currentView]);

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
        setActiveChatContact(null);
        setChatMessages({});
        setRecentConversations([]);
        setTotalUnreadMessages(0);
        try {
          localStorage.setItem('assistance_user', activeUser);
          localStorage.removeItem('assistance_active_chat_contact');
          localStorage.removeItem('assistance_chat_history');
        } catch {}
        setFeedback({ type: 'success', text: data.message || 'Registered successfully!' });
        navigateTo('whats-happening');
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

    const trimmedUsername = String(loginUsername || '').trim();
    const trimmedContact = String(loginContact || '').trim();
    const trimmedPassword = String(loginPassword || '').trim();

    if (!trimmedUsername && !trimmedContact) {
      setLoginFeedback({ type: 'error', text: 'Please enter your username, email, or phone number' });
      return;
    }

    if (!trimmedPassword) {
      setLoginFeedback({ type: 'error', text: 'Please enter your password' });
      return;
    }

    setIsLoggingIn(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: trimmedUsername || trimmedContact,
          contact: trimmedContact,
          password: trimmedPassword,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const data = await response.json();

      if (response.ok) {
        const activeUser = data.user?.username || trimmedUsername || trimmedContact;
        setLoggedInUser(activeUser);
        setActiveChatContact(null);
        setChatMessages({});
        setRecentConversations([]);
        setTotalUnreadMessages(0);
        try {
          localStorage.setItem('assistance_user', activeUser);
          localStorage.removeItem('assistance_active_chat_contact');
          localStorage.removeItem('assistance_chat_history');
          if (data.user?.avatar) {
            setProfilePicture(data.user.avatar);
            localStorage.setItem('assistance_profile_picture', data.user.avatar);
          }
        } catch {}
        setLoginFeedback({ type: 'success', text: data.message || 'Logged in successfully!' });
        navigateTo('whats-happening');
      } else {
        setLoginFeedback({ type: 'error', text: data.message || 'Login failed. Please check credentials.' });
      }
    } catch (err) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        setLoginFeedback({ type: 'error', text: 'Server took too long to respond. Please try again.' });
      } else {
        setLoginFeedback({ type: 'error', text: 'Unable to connect to server. Please try again.' });
      }
    } finally {
      clearTimeout(timeoutId);
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

  // Shared helper to compress uploaded images so localStorage and API sync stay fast and under quota
  const compressImageFile = (file, maxDim = 400, quality = 0.85) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result;
        if (typeof dataUrl !== 'string') {
          resolve(null);
          return;
        }
        const img = new Image();
        img.onload = () => {
          let { width, height } = img;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/jpeg', quality));
          } else {
            resolve(dataUrl);
          }
        };
        img.onerror = () => resolve(dataUrl);
        img.src = dataUrl;
      };
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    });

  // Restore saved user avatar and about from backend if missing locally
  useEffect(() => {
    if (!loggedInUser) return;
    fetch(`/api/users/profile/${encodeURIComponent(loggedInUser)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.success && data.user) {
          if (data.user.displayName) {
            setDisplayName((prev) => prev || data.user.displayName);
            try {
              if (!localStorage.getItem('assistance_display_name')) {
                localStorage.setItem('assistance_display_name', data.user.displayName);
              }
            } catch {}
          }
          if (data.user.coverPhoto) {
            setCoverPhoto((prev) => prev || data.user.coverPhoto);
            try {
              if (!localStorage.getItem('assistance_cover_photo')) {
                localStorage.setItem('assistance_cover_photo', data.user.coverPhoto);
              }
            } catch {}
          }
          if (data.user.avatar) {
            setProfilePicture((prev) => prev || data.user.avatar);
            try {
              if (!localStorage.getItem('assistance_profile_picture')) {
                localStorage.setItem('assistance_profile_picture', data.user.avatar);
              }
            } catch {}
          }
          if (data.user.status) {
            setAboutText((prev) => {
              if (prev && prev !== 'Hey there! I am using Assistance') return prev;
              return data.user.status;
            });
            try {
              if (!localStorage.getItem('assistance_about')) {
                localStorage.setItem('assistance_about', data.user.status);
              }
            } catch {}
          }
          if (data.user.location !== undefined) {
            setLocationText((prev) => prev || data.user.location || '');
            try {
              if (data.user.location && !localStorage.getItem('assistance_location')) {
                localStorage.setItem('assistance_location', data.user.location);
              }
            } catch {}
          }
          if (data.user.website !== undefined) {
            setWebsiteText((prev) => prev || data.user.website || '');
            try {
              if (data.user.website && !localStorage.getItem('assistance_website')) {
                localStorage.setItem('assistance_website', data.user.website);
              }
            } catch {}
          }
          if (data.user.education !== undefined) {
            setEducationText((prev) => prev || data.user.education || '');
            try {
              if (data.user.education && !localStorage.getItem('assistance_education')) {
                localStorage.setItem('assistance_education', data.user.education);
              }
            } catch {}
          }
          if (data.user.employment !== undefined) {
            setEmploymentText((prev) => prev || data.user.employment || '');
            try {
              if (data.user.employment && !localStorage.getItem('assistance_employment')) {
                localStorage.setItem('assistance_employment', data.user.employment);
              }
            } catch {}
          }
          if (data.user.skills !== undefined) {
            setSkillsText((prev) => prev || data.user.skills || '');
            try {
              if (data.user.skills && !localStorage.getItem('assistance_skills')) {
                localStorage.setItem('assistance_skills', data.user.skills);
              }
            } catch {}
          }
          if (data.user.interests !== undefined) {
            setInterestsText((prev) => prev || data.user.interests || '');
            try {
              if (data.user.interests && !localStorage.getItem('assistance_interests')) {
                localStorage.setItem('assistance_interests', data.user.interests);
              }
            } catch {}
          }
          if (Array.isArray(data.user.followers)) {
            setFollowersList(data.user.followers);
            try {
              localStorage.setItem('assistance_followers', JSON.stringify(data.user.followers));
            } catch {}
          }
          if (Array.isArray(data.user.following)) {
            setFollowingList(data.user.following);
            try {
              localStorage.setItem('assistance_following', JSON.stringify(data.user.following));
            } catch {}
          }
          if (Array.isArray(data.user.friendRequestsSent)) {
            setSentFriendRequests(data.user.friendRequestsSent);
            try {
              localStorage.setItem('assistance_sent_friend_requests', JSON.stringify(data.user.friendRequestsSent));
            } catch {}
          }
          if (Array.isArray(data.user.friendRequestsReceived)) {
            setReceivedFriendRequests(data.user.friendRequestsReceived);
            try {
              localStorage.setItem('assistance_received_friend_requests', JSON.stringify(data.user.friendRequestsReceived));
            } catch {}
          }
          if (Array.isArray(data.user.friends)) {
            setFriendsList(data.user.friends);
            try {
              localStorage.setItem('assistance_friends', JSON.stringify(data.user.friends));
            } catch {}
          }
        }
      })
      .catch(() => {});
  }, [loggedInUser]);

  const handleCoverPhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const compressed = await compressImageFile(file, 1200, 0.82);
    if (compressed) {
      setCoverPhoto(compressed);
      try {
        localStorage.setItem('assistance_cover_photo', compressed);
      } catch {}
      if (loggedInUser) {
        fetch('/api/users/update-profile-info', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: loggedInUser, coverPhoto: compressed }),
        }).catch(() => {});
      }
      setProfileToast({ type: 'success', text: 'Cover photo updated!' });
      setTimeout(() => setProfileToast(null), 3000);
    }
  };

  const handleRemoveCoverPhoto = async (e) => {
    if (e) e.stopPropagation();
    setCoverPhoto(null);
    try {
      localStorage.removeItem('assistance_cover_photo');
    } catch {}
    if (loggedInUser) {
      fetch('/api/users/update-profile-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loggedInUser, coverPhoto: '' }),
      }).catch(() => {});
    }
    setProfileToast({ type: 'info', text: 'Cover photo removed' });
    setTimeout(() => setProfileToast(null), 3000);
  };

  const handleOpenEditProfileModal = () => {
    setEditProfileForm({
      displayName: displayName || loggedInUser || '',
      username: loggedInUser || '',
      bio: aboutText || '',
      location: locationText || '',
      website: websiteText || '',
      education: educationText || '',
      employment: employmentText || '',
      skills: skillsText || '',
      interests: interestsText || '',
    });
    setFullProfileFeedback(null);
    setIsEditProfileModalOpen(true);
  };

  const handleSaveFullProfile = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setFullProfileFeedback(null);
    const cleanedDisplayName = editProfileForm.displayName.trim();
    const cleanedUsername = editProfileForm.username.trim().toLowerCase();
    const cleanedBio = editProfileForm.bio.trim();
    const cleanedLocation = editProfileForm.location.trim();
    const cleanedWebsite = editProfileForm.website.trim();
    const cleanedEducation = editProfileForm.education.trim();
    const cleanedEmployment = editProfileForm.employment.trim();
    const cleanedSkills = editProfileForm.skills.trim();
    const cleanedInterests = editProfileForm.interests.trim();

    if (!cleanedUsername) {
      setFullProfileFeedback({ type: 'error', text: 'Username cannot be empty' });
      return;
    }
    if (cleanedUsername.length < 3) {
      setFullProfileFeedback({ type: 'error', text: 'Username must be at least 3 characters' });
      return;
    }

    setIsSavingFullProfile(true);

    try {
      let currentActiveUser = loggedInUser;
      if (cleanedUsername !== String(loggedInUser || '').toLowerCase()) {
        const uRes = await fetch('/api/users/update-username', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            currentUsername: loggedInUser,
            newUsername: cleanedUsername,
          }),
        });
        const uData = await uRes.json();
        if (!uRes.ok) {
          setIsSavingFullProfile(false);
          setFullProfileFeedback({ type: 'error', text: uData.message || 'Failed to update username' });
          return;
        }
        currentActiveUser = uData.username || cleanedUsername;
        setLoggedInUser(currentActiveUser);
        try {
          localStorage.setItem('assistance_user', currentActiveUser);
        } catch {}
      }

      await fetch('/api/users/update-profile-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: currentActiveUser,
          displayName: cleanedDisplayName || currentActiveUser,
          status: cleanedBio || 'Hey there! I am using Assistance',
          location: cleanedLocation,
          website: cleanedWebsite,
          education: cleanedEducation,
          employment: cleanedEmployment,
          skills: cleanedSkills,
          interests: cleanedInterests,
        }),
      }).catch(() => {});

      setDisplayName(cleanedDisplayName || currentActiveUser);
      setAboutText(cleanedBio || 'Hey there! I am using Assistance');
      setLocationText(cleanedLocation);
      setWebsiteText(cleanedWebsite);
      setEducationText(cleanedEducation);
      setEmploymentText(cleanedEmployment);
      setSkillsText(cleanedSkills);
      setInterestsText(cleanedInterests);

      try {
        localStorage.setItem('assistance_display_name', cleanedDisplayName || currentActiveUser);
        localStorage.setItem('assistance_about', cleanedBio || 'Hey there! I am using Assistance');
        localStorage.setItem('assistance_location', cleanedLocation);
        localStorage.setItem('assistance_website', cleanedWebsite);
        localStorage.setItem('assistance_education', cleanedEducation);
        localStorage.setItem('assistance_employment', cleanedEmployment);
        localStorage.setItem('assistance_skills', cleanedSkills);
        localStorage.setItem('assistance_interests', cleanedInterests);
      } catch {}

      setIsSavingFullProfile(false);
      setIsEditProfileModalOpen(false);
      setProfileToast({ type: 'success', text: 'Profile updated successfully!' });
      setTimeout(() => setProfileToast(null), 3500);
    } catch (err) {
      console.error('Save profile error:', err);
      setIsSavingFullProfile(false);
      setFullProfileFeedback({ type: 'error', text: 'Network error saving profile changes' });
    }
  };

  const handleShareMyProfile = async () => {
    const profileUrl = `${window.location.origin}/profile/${encodeURIComponent(loggedInUser || 'user')}`;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(profileUrl);
      }
      setProfileToast({ type: 'success', text: 'Profile link copied to clipboard!' });
      setTimeout(() => setProfileToast(null), 3500);
    } catch {
      setProfileToast({ type: 'info', text: `@${loggedInUser}` });
      setTimeout(() => setProfileToast(null), 3500);
    }
  };

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const compressed = await compressImageFile(file, 400, 0.85);
    if (compressed) {
      setProfilePicture(compressed);
      try {
        localStorage.setItem('assistance_profile_picture', compressed);
      } catch {}
      if (loggedInUser) {
        fetch('/api/users/update-avatar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: loggedInUser, avatar: compressed }),
        }).catch(() => {});
      }
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

  const handleSaveAbout = async (e) => {
    if (e) e.preventDefault();
    const cleaned = editAboutInput.trim();
    const finalAbout = cleaned || 'Hey there! I am using Assistance';
    setAboutText(finalAbout);
    setIsEditingAbout(false);
    try {
      localStorage.setItem('assistance_about', finalAbout);
    } catch {}
    if (loggedInUser) {
      fetch('/api/users/update-about', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loggedInUser, about: finalAbout }),
      }).catch(() => {});
    }
  };

  const handleSaveLocation = async (e) => {
    if (e) e.preventDefault();
    const cleaned = editLocationInput.trim();
    setLocationText(cleaned);
    setIsEditingLocation(false);
    try {
      localStorage.setItem('assistance_location', cleaned);
    } catch {}
    if (loggedInUser) {
      fetch('/api/users/update-profile-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loggedInUser, location: cleaned }),
      }).catch(() => {});
    }
  };

  const handleSaveWebsite = async (e) => {
    if (e) e.preventDefault();
    const cleaned = editWebsiteInput.trim();
    setWebsiteText(cleaned);
    setIsEditingWebsite(false);
    try {
      localStorage.setItem('assistance_website', cleaned);
    } catch {}
    if (loggedInUser) {
      fetch('/api/users/update-profile-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loggedInUser, website: cleaned }),
      }).catch(() => {});
    }
  };

  const handleSaveEducation = async (e) => {
    if (e) e.preventDefault();
    const cleaned = editEducationInput.trim();
    setEducationText(cleaned);
    setIsEditingEducation(false);
    try {
      localStorage.setItem('assistance_education', cleaned);
    } catch {}
    if (loggedInUser) {
      fetch('/api/users/update-profile-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loggedInUser, education: cleaned }),
      }).catch(() => {});
    }
  };

  const handleSaveEmployment = async (e) => {
    if (e) e.preventDefault();
    const cleaned = editEmploymentInput.trim();
    setEmploymentText(cleaned);
    setIsEditingEmployment(false);
    try {
      localStorage.setItem('assistance_employment', cleaned);
    } catch {}
    if (loggedInUser) {
      fetch('/api/users/update-profile-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loggedInUser, employment: cleaned }),
      }).catch(() => {});
    }
  };

  const handleSaveSkills = async (e) => {
    if (e) e.preventDefault();
    const cleaned = editSkillsInput.trim();
    setSkillsText(cleaned);
    setIsEditingSkills(false);
    try {
      localStorage.setItem('assistance_skills', cleaned);
    } catch {}
    if (loggedInUser) {
      fetch('/api/users/update-profile-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loggedInUser, skills: cleaned }),
      }).catch(() => {});
    }
  };

  const handleSaveInterests = async (e) => {
    if (e) e.preventDefault();
    const cleaned = editInterestsInput.trim();
    setInterestsText(cleaned);
    setIsEditingInterests(false);
    try {
      localStorage.setItem('assistance_interests', cleaned);
    } catch {}
    if (loggedInUser) {
      fetch('/api/users/update-profile-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loggedInUser, interests: cleaned }),
      }).catch(() => {});
    }
  };

  const handleAddFollower = async (e) => {
    if (e) e.preventDefault();
    const target = addFollowerInput.trim().toLowerCase();
    if (!target) return;
    if (target === (loggedInUser || '').toLowerCase()) {
      setFollowError('Cannot add yourself as a follower');
      return;
    }
    if (followersList.includes(target)) {
      setFollowError('User is already in your followers list');
      return;
    }
    setFollowError('');
    const updated = [...followersList, target];
    setFollowersList(updated);
    setAddFollowerInput('');
    setIsAddingFollower(false);
    try {
      localStorage.setItem('assistance_followers', JSON.stringify(updated));
    } catch {}
    if (loggedInUser) {
      fetch('/api/users/add-follower', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loggedInUser, followerUsername: target }),
      }).catch(() => {});
    }
  };

  const handleRemoveFollower = async (target) => {
    const cleanTarget = String(target).trim().toLowerCase();
    const updated = followersList.filter((u) => u.toLowerCase() !== cleanTarget);
    setFollowersList(updated);
    try {
      localStorage.setItem('assistance_followers', JSON.stringify(updated));
    } catch {}
    if (loggedInUser) {
      fetch('/api/users/remove-follower', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loggedInUser, followerUsername: cleanTarget }),
      }).catch(() => {});
    }
  };

  const handleFollowUser = async (targetParam, e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (targetParam && targetParam.preventDefault) {
      targetParam.preventDefault();
      targetParam = undefined;
    }
    const target = (typeof targetParam === 'string' && targetParam.trim())
      ? targetParam.trim().toLowerCase()
      : addFollowingInput.trim().toLowerCase();
    if (!target) return;
    if (target === (loggedInUser || '').toLowerCase()) {
      setFollowError('Cannot follow yourself');
      return;
    }
    if (followingList.some((u) => u.toLowerCase() === target)) {
      setFollowError('You are already following this user');
      return;
    }
    setFollowError('');
    const updated = [...followingList, target];
    setFollowingList(updated);
    setAddFollowingInput('');
    setIsAddingFollowing(false);
    try {
      localStorage.setItem('assistance_following', JSON.stringify(updated));
    } catch {}
    if (loggedInUser) {
      fetch('/api/users/follow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loggedInUser, targetUsername: target }),
      }).catch(() => {});
    }
  };

  const handleUnfollowUser = async (target) => {
    const cleanTarget = String(target).trim().toLowerCase();
    const updated = followingList.filter((u) => u.toLowerCase() !== cleanTarget);
    setFollowingList(updated);
    try {
      localStorage.setItem('assistance_following', JSON.stringify(updated));
    } catch {}
    if (loggedInUser) {
      fetch('/api/users/unfollow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loggedInUser, targetUsername: cleanTarget }),
      }).catch(() => {});
    }
  };

  const handleOpenUserProfile = async (targetUser) => {
    if (!targetUser) return;

    let userObj = typeof targetUser === 'string'
      ? { username: targetUser.trim(), displayName: targetUser.trim() }
      : { ...targetUser };

    if (!userObj.username) return;

    const cleanUsername = String(userObj.username).trim();

    // Preserve previous view so Back button returns accurately
    if (currentView !== 'user-profile') {
      setProfilePreviousView(currentView || 'search-and-discovery');
    }

    // Set initial profile user right away (0ms instant display)
    setSelectedProfileUser(userObj);
    setProfileActiveTab('posts');
    setSendRequestFeedback(null);
    setFriendRequestActionFeedback(null);
    navigateTo('user-profile');
    setIsLoadingUserProfile(true);
    setIsLoadingProfilePosts(true);

    // Initial filter from local posts for instant display
    const localFiltered = posts.filter(
      (p) => String(p.author || '').toLowerCase() === cleanUsername.toLowerCase()
    );
    setProfileUserPosts(localFiltered);

    // 1. Fetch full profile info from /api/users/profile/:username
    try {
      const res = await fetch(`/api/users/profile/${encodeURIComponent(cleanUsername)}`, {
        cache: 'no-store',
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.success && data.user) {
          const u = data.user;
          const formatField = (val) => {
            if (!val) return '';
            if (typeof val === 'string') return val.trim();
            if (typeof val === 'object') {
              return Object.values(val).filter((v) => typeof v === 'string' && v.trim().length > 0).join(' - ');
            }
            return String(val);
          };
          setSelectedProfileUser((prev) => ({
            ...prev,
            ...u,
            friends: Array.isArray(u.friends) ? u.friends : [],
            friendRequestsSent: Array.isArray(u.friendRequestsSent) ? u.friendRequestsSent : [],
            friendRequestsReceived: Array.isArray(u.friendRequestsReceived) ? u.friendRequestsReceived : [],
            followers: Array.isArray(u.followers) ? u.followers : [],
            following: Array.isArray(u.following) ? u.following : [],
            education: formatField(u.education),
            employment: formatField(u.employment),
            location: formatField(u.location),
            website: formatField(u.website),
            skills: formatField(u.skills),
            interests: formatField(u.interests),
            displayName: u.displayName || userObj.displayName || u.username,
            avatar: u.avatar || userObj.avatar,
            coverPhoto: u.coverPhoto || userObj.coverPhoto,
          }));
        }
      }
    } catch (err) {
      console.warn('Error fetching user profile:', err);
    } finally {
      setIsLoadingUserProfile(false);
    }

    // 2. Fetch posts authored by this user from /api/posts?authors=...
    try {
      const postRes = await fetch(`/api/posts?authors=${encodeURIComponent(cleanUsername)}`, {
        cache: 'no-store',
      });
      if (postRes.ok) {
        const postData = await postRes.json();
        if (postData && Array.isArray(postData.posts)) {
          setProfileUserPosts(postData.posts);
        }
      }
    } catch (err) {
      console.warn('Error fetching user posts:', err);
    } finally {
      setIsLoadingProfilePosts(false);
    }
  };

  const handleBackFromProfile = () => {
    navigateTo(profilePreviousView || 'search-and-discovery');
  };

  const handleSendFriendRequest = async (targetParam, e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (targetParam && targetParam.preventDefault) {
      targetParam.preventDefault();
      targetParam = undefined;
    }
    const target = (typeof targetParam === 'string' && targetParam.trim())
      ? targetParam.trim().toLowerCase()
      : sendRequestInput.trim().toLowerCase();
    if (!target) return;
    if (target === (loggedInUser || '').toLowerCase()) {
      setSendRequestFeedback({ type: 'error', text: 'Cannot send a friend request to yourself' });
      return;
    }
    if (sentFriendRequests.some((u) => u.toLowerCase() === target)) {
      setSendRequestFeedback({ type: 'error', text: `Friend request already sent to ${target}` });
      return;
    }
    const updated = [...sentFriendRequests, target];
    setSentFriendRequests(updated);
    setSendRequestInput('');
    setSendRequestFeedback({ type: 'success', text: `Friend request sent to ${target}` });
    try {
      localStorage.setItem('assistance_sent_friend_requests', JSON.stringify(updated));
    } catch {}
    if (loggedInUser) {
      fetch('/api/users/send-friend-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loggedInUser, targetUsername: target }),
      }).catch(() => {});
    }
  };

  const handleCancelFriendRequest = async (target) => {
    const cleanTarget = String(target).trim().toLowerCase();
    const updated = sentFriendRequests.filter((u) => u.toLowerCase() !== cleanTarget);
    setSentFriendRequests(updated);
    setSendRequestFeedback({ type: 'success', text: `Friend request to ${cleanTarget} cancelled` });
    try {
      localStorage.setItem('assistance_sent_friend_requests', JSON.stringify(updated));
    } catch {}
    if (loggedInUser) {
      fetch('/api/users/cancel-friend-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loggedInUser, targetUsername: cleanTarget }),
      }).catch(() => {});
    }
  };

  const handleAcceptFriendRequest = async (sender) => {
    const cleanSender = String(sender).trim().toLowerCase();
    const updatedRequests = receivedFriendRequests.filter((u) => u.toLowerCase() !== cleanSender);
    setReceivedFriendRequests(updatedRequests);
    if (!followersList.some((u) => u.toLowerCase() === cleanSender)) {
      const updatedFollowers = [...followersList, cleanSender];
      setFollowersList(updatedFollowers);
      try {
        localStorage.setItem('assistance_followers', JSON.stringify(updatedFollowers));
      } catch {}
    }
    if (!followingList.some((u) => u.toLowerCase() === cleanSender)) {
      const updatedFollowing = [...followingList, cleanSender];
      setFollowingList(updatedFollowing);
      try {
        localStorage.setItem('assistance_following', JSON.stringify(updatedFollowing));
      } catch {}
    }
    if (!friendsList.some((u) => u.toLowerCase() === cleanSender)) {
      const updatedFriends = [...friendsList, cleanSender];
      setFriendsList(updatedFriends);
      try {
        localStorage.setItem('assistance_friends', JSON.stringify(updatedFriends));
      } catch {}
    }
    setFriendRequestActionFeedback({ type: 'success', text: `Accepted friend request from ${cleanSender}` });
    try {
      localStorage.setItem('assistance_received_friend_requests', JSON.stringify(updatedRequests));
    } catch {}
    if (loggedInUser) {
      fetch('/api/users/accept-friend-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loggedInUser, senderUsername: cleanSender }),
      }).catch(() => {});
    }
  };

  const handleRejectFriendRequest = async (sender) => {
    const cleanSender = String(sender).trim().toLowerCase();
    const updatedRequests = receivedFriendRequests.filter((u) => u.toLowerCase() !== cleanSender);
    setReceivedFriendRequests(updatedRequests);
    setFriendRequestActionFeedback({ type: 'info', text: `Rejected friend request from ${cleanSender}` });
    try {
      localStorage.setItem('assistance_received_friend_requests', JSON.stringify(updatedRequests));
    } catch {}
    if (loggedInUser) {
      fetch('/api/users/reject-friend-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loggedInUser, senderUsername: cleanSender }),
      }).catch(() => {});
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

  const handlePostImageSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';
    if (!file.type.startsWith('image/')) {
      setPostFeedback({ type: 'error', text: 'Please select a valid image file (PNG, JPG, WebP, GIF).' });
      return;
    }
    try {
      setIsUploadingPostImage(true);
      setPostFeedback(null);
      const compressed = await compressImageFile(file, 1200, 0.85);
      if (compressed) {
        setPostImage(compressed);
        setPostVideo(null);
      } else {
        setPostFeedback({ type: 'error', text: 'Failed to process selected image.' });
      }
    } catch {
      setPostFeedback({ type: 'error', text: 'Could not load image.' });
    } finally {
      setIsUploadingPostImage(false);
    }
  };

  const handleRemovePostImage = () => {
    setPostImage(null);
  };

  const handlePostVideoSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';
    if (!file.type.startsWith('video/')) {
      setPostFeedback({ type: 'error', text: 'Please select a valid video file (MP4, WebM, MOV, etc.).' });
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setPostFeedback({
        type: 'error',
        text: `Video file is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Please choose a video under 15MB.`,
      });
      return;
    }

    try {
      setIsUploadingPostVideo(true);
      setPostFeedback(null);
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result;
        if (typeof dataUrl === 'string') {
          setPostVideo(dataUrl);
          setPostImage(null);
        } else {
          setPostFeedback({ type: 'error', text: 'Failed to read video file.' });
        }
        setIsUploadingPostVideo(false);
      };
      reader.onerror = () => {
        setPostFeedback({ type: 'error', text: 'Could not load video.' });
        setIsUploadingPostVideo(false);
      };
      reader.readAsDataURL(file);
    } catch {
      setPostFeedback({ type: 'error', text: 'Error reading video.' });
      setIsUploadingPostVideo(false);
    }
  };

  const handleRemovePostVideo = () => {
    setPostVideo(null);
  };

  const handleEditPostImageSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';
    if (!file.type.startsWith('image/')) {
      setEditPostFeedback('Please select a valid image file (PNG, JPG, WebP, GIF).');
      return;
    }
    try {
      setEditPostFeedback(null);
      const compressed = await compressImageFile(file, 1200, 0.85);
      if (compressed) {
        setEditingPostImage(compressed);
        setEditingPostVideo(null);
      }
    } catch {
      setEditPostFeedback('Could not load image.');
    }
  };

  const handleEditPostVideoSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';
    if (!file.type.startsWith('video/')) {
      setEditPostFeedback('Please select a valid video file (MP4, WebM, MOV, etc.).');
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setEditPostFeedback(`Video file is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Please select a video under 15MB.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      if (typeof dataUrl === 'string') {
        setEditingPostVideo(dataUrl);
        setEditingPostImage(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCreatePost = async (e) => {
    if (e) {
      if (typeof e.preventDefault === 'function') e.preventDefault();
      if (typeof e.stopPropagation === 'function') e.stopPropagation();
    }
    const trimmed = postContent.trim();
    if ((!trimmed && !postImage && !postVideo) || isSubmittingPost || isUploadingPostImage || isUploadingPostVideo) return;

    setIsSubmittingPost(true);
    setPostFeedback(null);

    const safeAvatar =
      profilePicture && typeof profilePicture === 'string' && profilePicture.length < 50000
        ? profilePicture
        : '';

    const mediaType = postVideo ? 'video' : postImage ? 'image' : '';
    const mediaPayload = postVideo || postImage || '';

    // Optimistic UI: insert post immediately into feed so user sees it instantly (0ms delay)
    const tempId = `temp_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const optimisticPost = {
      id: tempId,
      author: loggedInUser || 'User',
      authorName: loggedInUser || 'User',
      authorAvatar: safeAvatar,
      content: trimmed,
      media: mediaPayload,
      image: postImage || '',
      video: postVideo || '',
      mediaType,
      likes: [],
      likesCount: 0,
      comments: [],
      commentsCount: 0,
      time: 'Just now',
      createdAt: new Date().toISOString(),
      _localCreatedAt: Date.now(),
    };

    setPosts((prev) => [optimisticPost, ...prev]);
    setPostContent('');
    setPostImage(null);
    setPostVideo(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          author: loggedInUser || 'User',
          authorName: loggedInUser || 'User',
          content: trimmed,
          media: mediaPayload,
          image: postImage || '',
          video: postVideo || '',
          mediaType,
          authorAvatar: safeAvatar,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const data = await res.json().catch(() => null);

      if (res.ok && data && data.success && data.post) {
        const postWithTag = { ...data.post, _localCreatedAt: Date.now() };
        setPosts((prev) =>
          prev.map((p) => (p.id === tempId ? postWithTag : p))
        );
      } else {
        // Rollback optimistic post on error
        setPosts((prev) => prev.filter((p) => p.id !== tempId));
        const errMsg =
          (data && (data.error || data.message)) ||
          `Failed to publish post (Server HTTP ${res.status}).`;
        console.error('[Create Post Error]:', errMsg);
        setPostFeedback({ type: 'error', text: errMsg });
      }
    } catch (err) {
      clearTimeout(timeoutId);
      // Rollback on network failure
      setPosts((prev) => prev.filter((p) => p.id !== tempId));
      console.error('[Create Post Network Error]:', err);
      setPostFeedback({
        type: 'error',
        text: err.name === 'AbortError'
          ? 'Post request timed out. Please check your connection and try again.'
          : 'Network error while posting. Please check your connection and tap Post again.',
      });
    } finally {
      clearTimeout(timeoutId);
      setIsSubmittingPost(false);
    }
  };

  const handleLikePost = async (postId) => {
    if (!loggedInUser || !postId) return;
    const cleanUser = String(loggedInUser).trim().toLowerCase();

    const updateLikes = (p) => {
      if (p.id === postId) {
        const likesArr = Array.isArray(p.likes) ? p.likes : [];
        const hasLiked = likesArr.includes(cleanUser);
        const updatedLikes = hasLiked
          ? likesArr.filter((u) => u !== cleanUser)
          : [...likesArr, cleanUser];
        return {
          ...p,
          likes: updatedLikes,
          likesCount: updatedLikes.length,
        };
      }
      return p;
    };

    // Optimistic like toggle in feed and profile feed
    setPosts((prev) => prev.map(updateLikes));
    setProfileUserPosts((prev) => prev.map(updateLikes));

    try {
      await fetch(`/api/posts/${postId}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: cleanUser }),
      });
    } catch (err) {
      console.error('[Like Post Error]:', err);
    }
  };

  const handleDeletePost = async (postId) => {
    if (!loggedInUser || !postId) return;
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    setProfileUserPosts((prev) => prev.filter((p) => p.id !== postId));

    try {
      await fetch(`/api/posts/${postId}?user=${encodeURIComponent(loggedInUser)}`, {
        method: 'DELETE',
      });
    } catch (err) {
      console.error('[Delete Post Error]:', err);
    }
  };

  const toggleComments = (postId) => {
    setOpenCommentsPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleAddComment = async (postId) => {
    if (!loggedInUser || !postId) return;
    const content = (commentInputs[postId] || '').trim();
    if (!content || submittingCommentPostIds[postId]) return;

    const tempCommentId = `temp-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const safeAvatar = profilePicture && typeof profilePicture === 'string' && profilePicture.length < 50000
      ? profilePicture
      : '';
    const newCommentObj = {
      id: tempCommentId,
      author: loggedInUser,
      authorName: loggedInUser,
      authorAvatar: safeAvatar,
      content,
      createdAt: new Date().toISOString(),
      time: 'Just now',
    };

    // Optimistically add comment to posts state
    const addCommentToPost = (p) => {
      if (p.id === postId) {
        const prevComments = Array.isArray(p.comments) ? p.comments : [];
        return {
          ...p,
          comments: [...prevComments, newCommentObj],
          commentsCount: prevComments.length + 1,
        };
      }
      return p;
    };
    setPosts((prev) => prev.map(addCommentToPost));
    setProfileUserPosts((prev) => prev.map(addCommentToPost));

    // Clear input for this post immediately
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
    setSubmittingCommentPostIds((prev) => ({ ...prev, [postId]: true }));

    try {
      const res = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          author: loggedInUser,
          authorName: loggedInUser,
          authorAvatar: safeAvatar,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data && data.success && data.comment) {
          const replaceTempComment = (p) => {
            if (p.id === postId) {
              const updatedComments = (p.comments || []).map((c) =>
                c.id === tempCommentId ? data.comment : c
              );
              return {
                ...p,
                comments: updatedComments,
                commentsCount: data.commentsCount || updatedComments.length,
              };
            }
            return p;
          };
          setPosts((prev) => prev.map(replaceTempComment));
          setProfileUserPosts((prev) => prev.map(replaceTempComment));
        }
      } else {
        // Rollback optimistic comment on failure
        const rollbackTempComment = (p) => {
          if (p.id === postId) {
            const rolledBack = (p.comments || []).filter((c) => c.id !== tempCommentId);
            return {
              ...p,
              comments: rolledBack,
              commentsCount: rolledBack.length,
            };
          }
          return p;
        };
        setPosts((prev) => prev.map(rollbackTempComment));
        setProfileUserPosts((prev) => prev.map(rollbackTempComment));
      }
    } catch (err) {
      console.error('[Add Comment Error]:', err);
      // Rollback on network failure
      const rollbackTempComment = (p) => {
        if (p.id === postId) {
          const rolledBack = (p.comments || []).filter((c) => c.id !== tempCommentId);
          return {
            ...p,
            comments: rolledBack,
            commentsCount: rolledBack.length,
          };
        }
        return p;
      };
      setPosts((prev) => prev.map(rollbackTempComment));
      setProfileUserPosts((prev) => prev.map(rollbackTempComment));
    } finally {
      setSubmittingCommentPostIds((prev) => ({ ...prev, [postId]: false }));
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    if (!loggedInUser || !postId || !commentId) return;

    setDeletingCommentIds((prev) => ({ ...prev, [commentId]: true }));

    // Keep reference in case rollback is needed
    let previousComments = [];
    const removeCommentFromPost = (p) => {
      if (p.id === postId) {
        previousComments = p.comments || [];
        const updated = previousComments.filter((c) => (c.id || c._id) !== commentId);
        return {
          ...p,
          comments: updated,
          commentsCount: updated.length,
        };
      }
      return p;
    };
    setPosts((prev) => prev.map(removeCommentFromPost));
    setProfileUserPosts((prev) => prev.map(removeCommentFromPost));

    try {
      const res = await fetch(
        `/api/posts/${postId}/comments/${commentId}?user=${encodeURIComponent(loggedInUser)}`,
        { method: 'DELETE' }
      );
      if (!res.ok) {
        // Rollback if delete rejected
        const rollbackDeletedComment = (p) =>
          p.id === postId ? { ...p, comments: previousComments, commentsCount: previousComments.length } : p;
        setPosts((prev) => prev.map(rollbackDeletedComment));
        setProfileUserPosts((prev) => prev.map(rollbackDeletedComment));
      }
    } catch (err) {
      console.error('[Delete Comment Error]:', err);
      const rollbackDeletedComment = (p) =>
        p.id === postId ? { ...p, comments: previousComments, commentsCount: previousComments.length } : p;
      setPosts((prev) => prev.map(rollbackDeletedComment));
      setProfileUserPosts((prev) => prev.map(rollbackDeletedComment));
    } finally {
      setDeletingCommentIds((prev) => ({ ...prev, [commentId]: false }));
    }
  };

  const handleStartEditPost = (post) => {
    setEditingPostId(post.id);
    setEditingPostContent(post.content || '');
    const isVideo = Boolean(
      post.video ||
      post.mediaType === 'video' ||
      (post.media && (post.media.startsWith('data:video') || post.media.endsWith('.mp4') || post.media.endsWith('.webm') || post.media.endsWith('.mov')))
    );
    setEditingPostVideo(isVideo ? (post.video || post.media) : null);
    setEditingPostImage(!isVideo ? (post.image || post.media || null) : null);
    setEditPostFeedback(null);
  };

  const handleCancelEditPost = () => {
    setEditingPostId(null);
    setEditingPostContent('');
    setEditingPostImage(null);
    setEditingPostVideo(null);
    setEditPostFeedback(null);
  };

  const handleSaveEditPost = async (postId) => {
    const trimmed = editingPostContent.trim();
    if ((!trimmed && !editingPostImage && !editingPostVideo) || isSavingPostEdit) return;

    setIsSavingPostEdit(true);
    setEditPostFeedback(null);

    const mediaType = editingPostVideo ? 'video' : editingPostImage ? 'image' : '';
    const mediaPayload = editingPostVideo || editingPostImage || '';

    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: trimmed,
          media: mediaPayload,
          image: editingPostImage || '',
          video: editingPostVideo || '',
          mediaType,
          user: loggedInUser,
        }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data && data.success && data.post) {
        const updateEdited = (p) =>
          p.id === postId
            ? {
                ...p,
                content: data.post.content,
                media: data.post.media,
                image: data.post.image || '',
                video: data.post.video || '',
                mediaType: data.post.mediaType || mediaType,
                isEdited: true,
                editedAt: data.post.editedAt || new Date().toISOString(),
              }
            : p;
        setPosts((prev) => prev.map(updateEdited));
        setProfileUserPosts((prev) => prev.map(updateEdited));
        try {
          const currentPosts = JSON.parse(localStorage.getItem('assistance_posts') || '[]');
          const updated = currentPosts.map((p) =>
            p.id === postId
              ? {
                  ...p,
                  content: data.post.content,
                  media: data.post.media,
                  image: data.post.image || '',
                  video: data.post.video || '',
                  mediaType: data.post.mediaType || mediaType,
                  isEdited: true,
                  editedAt: data.post.editedAt || new Date().toISOString(),
                }
              : p
          );
          localStorage.setItem('assistance_posts', JSON.stringify(updated));
        } catch {}
        setEditingPostId(null);
        setEditingPostContent('');
        setEditingPostImage(null);
        setEditingPostVideo(null);
      } else {
        const errorMsg =
          (data && (data.error || data.message)) ||
          `Failed to update post (Server HTTP ${res.status})`;
        setEditPostFeedback(errorMsg);
      }
    } catch (err) {
      console.error('[Edit Post Error]:', err);
      setEditPostFeedback('Network connection error while saving edit.');
    } finally {
      setIsSavingPostEdit(false);
    }
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
  const [editingContactOriginal, setEditingContactOriginal] = useState(null);
  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newContactAvatar, setNewContactAvatar] = useState('');
  const contactAvatarInputRef = useRef(null);

  const [activeChatContact, setActiveChatContact] = useState(() => {
    try {
      const saved = localStorage.getItem('assistance_active_chat_contact');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [chatMessages, setChatMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('assistance_chat_history');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [recentConversations, setRecentConversations] = useState([]);
  const [totalUnreadMessages, setTotalUnreadMessages] = useState(0);
  const [inboxSearchQuery, setInboxSearchQuery] = useState('');
  const [messageInputText, setMessageInputText] = useState('');
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [isSimulatingReply, setIsSimulatingReply] = useState(false);
  const messagesEndRef = useRef(null);
  const [incomingToast, setIncomingToast] = useState(null);
  const [activeCall, setActiveCall] = useState(null);
  const [incomingCall, setIncomingCall] = useState(null);
  const [callHistory, setCallHistory] = useState([]);
  const [audioVisualizerLevel, setAudioVisualizerLevel] = useState(0);
  const [isVideoFullscreen, setIsVideoFullscreen] = useState(false);
  const [hasMultipleCameras, setHasMultipleCameras] = useState(false);
  const [remoteMediaState, setRemoteMediaState] = useState({ remoteVideoOff: false, remoteMuted: false });
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const callRingRef = useRef(null);
  const incomingRingRef = useRef(null);
  const callTimerRef = useRef(null);
  const lastNotifiedMessageRef = useRef(new Map());
  const isInitialRecentFetchRef = useRef(true);

  // Check if multiple cameras are available
  useEffect(() => {
    try {
      navigator.mediaDevices?.enumerateDevices().then((devices) => {
        const videoInputs = devices.filter((d) => d.kind === 'videoinput');
        setHasMultipleCameras(videoInputs.length > 1);
      }).catch(() => {});
    } catch {}
  }, []);

  // Poll for incoming calls
  useEffect(() => {
    if (!loggedInUser) return;
    let isMounted = true;

    const pollIncomingCalls = async () => {
      try {
        if (activeCall) return;
        const result = await voiceCallService.constructor.checkIncomingCall(loggedInUser);
        if (!isMounted) return;

        if (result && result.hasIncoming && result.call) {
          if (!incomingCall || incomingCall.id !== result.call.id) {
            setIncomingCall(result.call);
            if (!incomingRingRef.current) {
              incomingRingRef.current = callAudioSynthesizer.playIncomingRing();
            }
          }
        } else if (incomingCall && (!result || !result.hasIncoming)) {
          if (incomingRingRef.current) {
            incomingRingRef.current.stop();
            incomingRingRef.current = null;
          }
          setIncomingCall(null);
        }
      } catch (err) {
        // ignore polling errors
      }
    };

    pollIncomingCalls();
    const interval = setInterval(pollIncomingCalls, 2200);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [loggedInUser, activeCall, incomingCall]);

  // Fetch call history when viewing Voice and Video Call screen
  useEffect(() => {
    if (currentView === 'voice-and-video-call' && loggedInUser) {
      voiceCallService.constructor.getCallHistory(loggedInUser).then((calls) => {
        setCallHistory(calls);
      });
    }
  }, [currentView, loggedInUser]);

  // Call timer for connected calls
  useEffect(() => {
    if (activeCall && activeCall.status === 'connected') {
      callTimerRef.current = setInterval(() => {
        setActiveCall((prev) => (prev ? { ...prev, duration: (prev.duration || 0) + 1 } : null));
      }, 1000);
    } else {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
        callTimerRef.current = null;
      }
    }
    return () => {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
        callTimerRef.current = null;
      }
    };
  }, [activeCall?.status]);

  // Attach local and remote video streams to video elements
  useEffect(() => {
    if (activeCall && activeCall.type === 'video') {
      if (localVideoRef.current && voiceCallService.localStream) {
        localVideoRef.current.srcObject = voiceCallService.localStream;
        localVideoRef.current.play().catch(() => {});
      }
      if (remoteVideoRef.current && voiceCallService.remoteStream) {
        remoteVideoRef.current.srcObject = voiceCallService.remoteStream;
        remoteVideoRef.current.play().catch(() => {});
      }
    }
  }, [activeCall?.status, activeCall?.type, activeCall?.isVideoOff]);

  const handleStartCall = async (type = 'voice', customContact = null) => {
    const target = customContact || activeChatContact;
    if (!target || !loggedInUser) return;

    if (incomingRingRef.current) {
      incomingRingRef.current.stop();
      incomingRingRef.current = null;
    }
    setIncomingCall(null);
    setIsVideoFullscreen(false);
    setRemoteMediaState({ remoteVideoOff: false, remoteMuted: false });

    const contactTarget = {
      name: target.name || target.username || 'Contact',
      username: target.username || target.phone || target.name || '',
      avatar: target.avatar || '',
      phone: target.phone || '',
    };

    setActiveCall({
      callId: null,
      type,
      role: 'caller',
      contact: contactTarget,
      status: 'calling',
      statusText: 'Calling...',
      duration: 0,
      isMuted: false,
      isVideoOff: false,
      audioLevel: 0,
    });

    try {
      const res = await voiceCallService.initiateCall({
        caller: loggedInUser,
        callerName: loggedInUser,
        callerAvatar: '',
        recipient: contactTarget.username || contactTarget.phone || contactTarget.name,
        recipientName: contactTarget.name,
        recipientAvatar: contactTarget.avatar,
        type,
        onLocalStream: (stream) => {
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
            localVideoRef.current.play().catch(() => {});
          }
        },
        onRemoteStream: (stream) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = stream;
            remoteVideoRef.current.play().catch(() => {});
          }
        },
        onRemoteMediaState: (state) => {
          setRemoteMediaState(state);
        },
        onStatusChange: (status) => {
          if (status === 'connected') {
            setActiveCall((prev) =>
              prev ? { ...prev, status: 'connected', statusText: 'Connected' } : null
            );
          } else if (status === 'rejected') {
            setActiveCall((prev) =>
              prev ? { ...prev, status: 'rejected', statusText: 'Call Declined' } : null
            );
            setTimeout(() => {
              setActiveCall(null);
            }, 2000);
          } else if (status === 'ended' || status === 'missed') {
            setActiveCall((prev) =>
              prev ? { ...prev, status: 'ended', statusText: 'Call Ended' } : null
            );
            setTimeout(() => {
              setActiveCall(null);
            }, 2000);
          }
        },
        onAudioLevel: (lvl) => {
          setAudioVisualizerLevel(lvl);
        },
      });

      if (res && res.callId) {
        setActiveCall((prev) => (prev ? { ...prev, callId: res.callId } : null));
      }
    } catch (err) {
      console.error('[Call Initiate Error]:', err);
      setActiveCall((prev) =>
        prev ? { ...prev, status: 'ended', statusText: err.message || 'Call Failed' } : null
      );
      setTimeout(() => {
        setActiveCall(null);
      }, 2500);
    }
  };

  const handleAcceptIncomingCall = async () => {
    if (!incomingCall || !loggedInUser) return;

    if (incomingRingRef.current) {
      incomingRingRef.current.stop();
      incomingRingRef.current = null;
    }

    const currentIncoming = incomingCall;
    setIncomingCall(null);
    setIsVideoFullscreen(false);
    setRemoteMediaState({ remoteVideoOff: false, remoteMuted: false });

    const callerContact = {
      name: currentIncoming.callerName || currentIncoming.caller,
      username: currentIncoming.caller,
      avatar: currentIncoming.callerAvatar || '',
      phone: '',
    };

    const callType = currentIncoming.type || 'voice';

    setActiveCall({
      callId: currentIncoming.id,
      type: callType,
      role: 'recipient',
      contact: callerContact,
      status: 'connecting',
      statusText: 'Connecting...',
      duration: 0,
      isMuted: false,
      isVideoOff: false,
      audioLevel: 0,
    });

    try {
      await voiceCallService.answerCall({
        callId: currentIncoming.id,
        user: loggedInUser,
        sdpOffer: currentIncoming.sdpOffer,
        type: callType,
        onLocalStream: (stream) => {
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
            localVideoRef.current.play().catch(() => {});
          }
        },
        onRemoteStream: (stream) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = stream;
            remoteVideoRef.current.play().catch(() => {});
          }
        },
        onRemoteMediaState: (state) => {
          setRemoteMediaState(state);
        },
        onStatusChange: (status) => {
          if (status === 'connected') {
            setActiveCall((prev) =>
              prev ? { ...prev, status: 'connected', statusText: 'Connected' } : null
            );
          } else if (status === 'ended' || status === 'missed' || status === 'rejected') {
            setActiveCall((prev) =>
              prev ? { ...prev, status: 'ended', statusText: 'Call Ended' } : null
            );
            setTimeout(() => {
              setActiveCall(null);
            }, 2000);
          }
        },
        onAudioLevel: (lvl) => {
          setAudioVisualizerLevel(lvl);
        },
      });
    } catch (err) {
      console.error('[Call Answer Error]:', err);
      setActiveCall((prev) =>
        prev ? { ...prev, status: 'ended', statusText: 'Connection failed' } : null
      );
      setTimeout(() => {
        setActiveCall(null);
      }, 2500);
    }
  };

  const handleDeclineIncomingCall = async () => {
    if (!incomingCall) return;
    if (incomingRingRef.current) {
      incomingRingRef.current.stop();
      incomingRingRef.current = null;
    }
    const currentIncoming = incomingCall;
    setIncomingCall(null);
    try {
      await voiceCallService.rejectCall({
        callId: currentIncoming.id,
        user: loggedInUser,
      });
    } catch {}
  };

  const handleEndCall = async () => {
    if (callRingRef.current) {
      callRingRef.current.stop();
      callRingRef.current = null;
    }
    if (incomingRingRef.current) {
      incomingRingRef.current.stop();
      incomingRingRef.current = null;
    }
    if (callTimerRef.current) {
      clearInterval(callTimerRef.current);
      callTimerRef.current = null;
    }

    const currentActive = activeCall;
    setActiveCall((prev) =>
      prev ? { ...prev, status: 'ended', statusText: 'Call Ended' } : null
    );

    if (currentActive) {
      try {
        await voiceCallService.endCall({
          callId: currentActive.callId,
          user: loggedInUser,
          duration: currentActive.duration || 0,
        });
      } catch {}
    }

    setIsVideoFullscreen(false);
    setTimeout(() => {
      setActiveCall(null);
    }, 1500);
  };

  const handleToggleMute = () => {
    const muted = voiceCallService.toggleMute();
    setActiveCall((prev) => (prev ? { ...prev, isMuted: muted } : null));
  };

  const handleToggleVideo = () => {
    const videoOff = voiceCallService.toggleVideo();
    setActiveCall((prev) => (prev ? { ...prev, isVideoOff: videoOff } : null));
  };

  const handleSwitchCamera = async () => {
    const switched = await voiceCallService.switchCamera();
    if (switched && localVideoRef.current && voiceCallService.localStream) {
      localVideoRef.current.srcObject = voiceCallService.localStream;
      localVideoRef.current.play().catch(() => {});
    }
  };

  const handleToggleFullscreen = () => {
    setIsVideoFullscreen((prev) => !prev);
  };

  const formatCallDuration = (seconds = 0) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const playIncomingChime = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch {}
  };

  const handleOpenMessagesView = () => {
    if (currentView === 'messages') {
      if (activeChatContact) {
        setActiveChatContact(null);
        try {
          localStorage.removeItem('assistance_active_chat_contact');
        } catch {}
      } else {
        navigateTo('blank');
      }
    } else {
      setActiveChatContact(null);
      try {
        localStorage.removeItem('assistance_active_chat_contact');
      } catch {}
      navigateTo('messages');
    }
  };

  useEffect(() => {
    if (!incomingToast) return;
    const timer = setTimeout(() => {
      setIncomingToast(null);
    }, 8000);
    return () => clearTimeout(timer);
  }, [incomingToast]);

  const normalizePhoneKey = (phone = '') => {
    const digits = String(phone).replace(/\D/g, '');
    return digits.length >= 10 ? digits.slice(-10) : digits || String(phone).trim();
  };

  const getActiveChatKey = (contact) => {
    if (!contact) return '';
    if (typeof contact === 'string') return contact.trim().toLowerCase();
    return (
      contact.username ||
      contact.contact ||
      contact.phone ||
      contact.name ||
      contact.contactName ||
      contact.displayName ||
      ''
    ).trim().toLowerCase();
  };

  const isMessageSentByMe = (msg, contact = activeChatContact) => {
    if (!msg) return false;
    if (msg.isSent === true) return true;
    if (msg.isSent === false) return false;
    if (msg.sender === 'me') return true;

    const currentU = (loggedInUser || localStorage.getItem('assistance_user') || '').trim().toLowerCase();
    const msgSender = (msg.sender || '').trim().toLowerCase();

    if (currentU && msgSender === currentU) return true;
    if (
      msg.senderName &&
      loggedInUser &&
      msg.senderName.trim().toLowerCase() === loggedInUser.trim().toLowerCase()
    ) {
      return true;
    }

    if (contact) {
      const contactU = (contact.username || '').trim().toLowerCase();
      const contactP = (contact.phone || '').trim();
      const contactN = (contact.name || '').trim().toLowerCase();

      if (msgSender && (msgSender === contactU || msgSender === contactP || msgSender === contactN)) {
        return false;
      }

      const msgRecipient = (msg.recipient || '').trim().toLowerCase();
      if (
        msgRecipient &&
        (msgRecipient === contactU || msgRecipient === contactP || msgRecipient === contactN)
      ) {
        return true;
      }
    }

    return false;
  };

  const handleOpenChatWithContact = (contact) => {
    if (!contact) return;

    let resolvedUsername = contact.username || '';
    if (!resolvedUsername && contact.phone) {
      const norm = normalizePhoneKey(contact.phone);
      const matched =
        (Array.isArray(discoveryUsers) &&
          discoveryUsers.find((u) => u.phone && normalizePhoneKey(u.phone) === norm)) ||
        (Array.isArray(registeredContacts) &&
          registeredContacts.find((u) => u.phone && normalizePhoneKey(u.phone) === norm));
      if (matched && matched.username) {
        resolvedUsername = matched.username;
      }
    }

    const chatTarget = {
      name: contact.phoneBookName || contact.displayName || contact.name || contact.username || 'Contact',
      username: resolvedUsername,
      phone: contact.phone || '',
      avatar: contact.avatar || '',
      status: contact.status || (resolvedUsername ? 'Active on Assistance' : 'Phone contact'),
    };
    setActiveChatContact(chatTarget);
    try {
      localStorage.setItem('assistance_active_chat_contact', JSON.stringify(chatTarget));
    } catch {}
    navigateTo('messages');
  };

  // Fetch recent conversations for inbox and unread badges
  const fetchRecentConversations = async () => {
    const currentUser = (loggedInUser || localStorage.getItem('assistance_user') || '').trim();
    if (!currentUser) return;
    try {
      const res = await fetch(`/api/chat/recent?user=${encodeURIComponent(currentUser)}&_t=${Date.now()}`, {
        cache: 'no-store',
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.conversations)) {
          setRecentConversations(data.conversations);
          setTotalUnreadMessages(data.totalUnread || 0);

          // Check for incoming unread messages from contacts to alert the user
          if (isInitialRecentFetchRef.current) {
            data.conversations.forEach((c) => {
              if (c.contact && c.lastMessage) {
                lastNotifiedMessageRef.current.set(c.contact, c.lastMessage);
              }
            });
            isInitialRecentFetchRef.current = false;
          } else {
            let incomingAlert = null;
            for (const conv of data.conversations) {
              if (conv.unread > 0 && !conv.isSentByMe && conv.contact && conv.lastMessage) {
                const prevMsg = lastNotifiedMessageRef.current.get(conv.contact);
                if (prevMsg !== conv.lastMessage) {
                  lastNotifiedMessageRef.current.set(conv.contact, conv.lastMessage);
                  const isCurrentActiveChat =
                    currentView === 'messages' &&
                    activeChatContact &&
                    (getActiveChatKey(activeChatContact) === getActiveChatKey(conv) ||
                      (activeChatContact.username &&
                        conv.username &&
                        activeChatContact.username.toLowerCase() === conv.username.toLowerCase()));

                  if (!isCurrentActiveChat) {
                    incomingAlert = conv;
                  }
                }
              }
            }

            if (incomingAlert) {
              playIncomingChime();
              setIncomingToast({
                contactName: incomingAlert.contactName || incomingAlert.contact,
                lastMessage: incomingAlert.lastMessage || 'New message received',
                contactObj: {
                  name: incomingAlert.contactName || incomingAlert.contact,
                  username: incomingAlert.username || incomingAlert.contact,
                  phone: incomingAlert.phone || '',
                  avatar: incomingAlert.avatar || '',
                  status: incomingAlert.status || 'Active on Assistance',
                },
              });
            }
          }
        }
      }
    } catch {
      // Ignore background poll errors
    }
  };

  useEffect(() => {
    fetchRecentConversations();
    const interval = setInterval(fetchRecentConversations, 2500);
    return () => clearInterval(interval);
  }, [loggedInUser, currentView]);

  // Fetch messages from backend for active contact
  const fetchActiveConversation = async (contact) => {
    if (!contact) return;
    const contactKey = getActiveChatKey(contact);
    if (!contactKey) return;
    const currentUser = (loggedInUser || localStorage.getItem('assistance_user') || 'user').trim();
    const lowerUser = currentUser.toLowerCase();

    try {
      const res = await fetch(
        `/api/chat/conversation?user1=${encodeURIComponent(currentUser)}&user2=${encodeURIComponent(contactKey)}&_t=${Date.now()}`,
        { cache: 'no-store' }
      );
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.messages)) {
          const normalized = data.messages.map((m) => {
            const senderStr = (m.sender || '').trim().toLowerCase();
            const isMe =
              m.isSent === true ||
              senderStr === lowerUser ||
              senderStr === 'me';
            return {
              ...m,
              isSent: isMe,
            };
          });

          setChatMessages((prev) => {
            const updated = {
              ...prev,
              [contactKey]: normalized,
            };
            if (contact.username) {
              const uLower = contact.username.toLowerCase();
              updated[uLower] = normalized;
              updated[contact.username] = normalized;
            }
            if (contact.phone) {
              updated[contact.phone] = normalized;
            }
            try {
              localStorage.setItem('assistance_chat_history', JSON.stringify(updated));
            } catch {}
            return updated;
          });
          // Update recent conversations unread counts
          fetchRecentConversations();
        }
      }
    } catch {
      // Offline fallback: keep existing local messages
    }
  };

  // Poll conversation when messages view is open (snappy 1.5s interval)
  useEffect(() => {
    if (currentView !== 'messages' || !activeChatContact) return;

    fetchActiveConversation(activeChatContact);

    const intervalId = setInterval(() => {
      fetchActiveConversation(activeChatContact);
    }, 1500);

    return () => clearInterval(intervalId);
  }, [currentView, activeChatContact, loggedInUser]);

  const handleSendChatMessage = async (e) => {
    e.preventDefault();
    const text = messageInputText.trim();
    if (!text || !activeChatContact || isSendingMessage) return;

    const contactKey = getActiveChatKey(activeChatContact);
    const currentUser = (loggedInUser || localStorage.getItem('assistance_user') || 'user').trim().toLowerCase();
    const currentUserName = loggedInUser || 'Me';
    const recipientName = activeChatContact.name || activeChatContact.username || activeChatContact.phone || 'Contact';

    const localId = 'temp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
    const formattedTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const optimisticMsg = {
      id: localId,
      sender: currentUser,
      senderName: currentUserName,
      recipient: contactKey,
      recipientName: recipientName,
      text: text,
      time: formattedTime,
      timestamp: Date.now(),
      createdAt: new Date().toISOString(),
      isSent: true, // Sending messages are in right side
    };

    setChatMessages((prev) => {
      const existing = prev[contactKey] || [];
      const updated = {
        ...prev,
        [contactKey]: [...existing, optimisticMsg],
      };
      try {
        localStorage.setItem('assistance_chat_history', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    setMessageInputText('');
    setIsSendingMessage(true);

    try {
      const res = await fetch('/api/chat/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: currentUser,
          senderName: currentUserName,
          recipient: contactKey,
          recipientName: recipientName,
          text: text,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.message) {
          const serverMsg = {
            ...data.message,
            isSent: true,
          };
          const resolvedRecipient = (data.message.recipient || '').toLowerCase();
          setChatMessages((prev) => {
            const existing = prev[contactKey] || [];
            const replaced = existing.map((m) => (m.id === localId ? serverMsg : m));
            const updated = {
              ...prev,
              [contactKey]: replaced,
            };
            if (resolvedRecipient && resolvedRecipient !== contactKey) {
              updated[resolvedRecipient] = replaced;
            }
            try {
              localStorage.setItem('assistance_chat_history', JSON.stringify(updated));
            } catch {}
            return updated;
          });

          if (data.message.recipient && !activeChatContact.username) {
            setActiveChatContact((prevContact) => {
              if (!prevContact) return prevContact;
              const next = { ...prevContact, username: data.message.recipient };
              try {
                localStorage.setItem('assistance_active_chat_contact', JSON.stringify(next));
              } catch {}
              return next;
            });
          }

          fetchRecentConversations();
        }
      } else {
        const errData = await res.json().catch(() => ({}));
        console.error('[Send Message Error]:', res.status, errData);
        // Remove optimistic message on server rejection
        setChatMessages((prev) => {
          const existing = prev[contactKey] || [];
          const updated = {
            ...prev,
            [contactKey]: existing.filter((m) => m.id !== localId),
          };
          try {
            localStorage.setItem('assistance_chat_history', JSON.stringify(updated));
          } catch {}
          return updated;
        });
        alert(`Message delivery failed (${res.status}): ${errData.error || errData.message || 'Please check your connection.'}`);
      }
    } catch (err) {
      console.warn('[Send Message Warning]:', err);
      // Remove optimistic message on failure
      setChatMessages((prev) => {
        const existing = prev[contactKey] || [];
        const updated = {
          ...prev,
          [contactKey]: existing.filter((m) => m.id !== localId),
        };
        try {
          localStorage.setItem('assistance_chat_history', JSON.stringify(updated));
        } catch {}
        return updated;
      });
      alert('Message delivery failed: Network connection error. Please try again.');
    } finally {
      setIsSendingMessage(false);
    }
  };

  const handleSimulateReply = async () => {
    if (!activeChatContact || isSimulatingReply) return;
    const contactKey = getActiveChatKey(activeChatContact);
    const currentUser = (loggedInUser || localStorage.getItem('assistance_user') || 'user').trim().toLowerCase();
    const recipientName = activeChatContact.name || activeChatContact.username || activeChatContact.phone || 'Contact';

    setIsSimulatingReply(true);

    try {
      const res = await fetch('/api/chat/simulate-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: contactKey,
          senderName: recipientName,
          recipient: currentUser,
          recipientName: loggedInUser || 'Me',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.message) {
          const receivedMsg = {
            ...data.message,
            isSent: false, // Receiving messages are in left side
          };
          setChatMessages((prev) => {
            const existing = prev[contactKey] || [];
            const updated = {
              ...prev,
              [contactKey]: [...existing, receivedMsg],
            };
            try {
              localStorage.setItem('assistance_chat_history', JSON.stringify(updated));
            } catch {}
            return updated;
          });
        }
      }
    } catch (err) {
      console.error('[Simulate Reply Error]:', err);
    } finally {
      setIsSimulatingReply(false);
    }
  };

  const handleClearConversation = async () => {
    if (!activeChatContact) return;
    if (!window.confirm('Clear all messages with ' + (activeChatContact.name || 'this contact') + '?')) {
      return;
    }

    const contactKey = getActiveChatKey(activeChatContact);
    const currentUser = (loggedInUser || localStorage.getItem('assistance_user') || 'user').trim().toLowerCase();

    setChatMessages((prev) => {
      const updated = {
        ...prev,
        [contactKey]: [],
      };
      try {
        localStorage.setItem('assistance_chat_history', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    try {
      await fetch('/api/chat/conversation', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user1: currentUser,
          user2: contactKey,
        }),
      });
    } catch (err) {
      console.error('[Clear Conversation Error]:', err);
    }
  };

  useEffect(() => {
    if (currentView === 'messages' && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, activeChatContact, currentView]);

  const mergeLocalContactFields = (remoteContacts = [], localList = []) =>
    remoteContacts.map((rc) => {
      const rcKey = normalizePhoneKey(rc.phone);
      const localMatch = localList.find(
        (lc) =>
          (lc.phone && rc.phone && normalizePhoneKey(lc.phone) === rcKey) ||
          (lc.username && rc.username && lc.username.toLowerCase() === rc.username.toLowerCase())
      );
      return localMatch
        ? {
            ...rc,
            phoneBookName: localMatch.name || rc.phoneBookName,
            avatar: localMatch.avatar || rc.avatar || null,
          }
        : rc;
    });

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
        setRegisteredContacts(mergeLocalContactFields(data.registeredContacts || [], listToSync));
        setNonRegisteredContacts(mergeLocalContactFields(data.nonRegisteredContacts || [], listToSync));
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
          setRegisteredContacts(mergeLocalContactFields(fallbackData.contacts, listToSync));
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
    if (
      currentView === 'contacts' &&
      registeredContacts.length === 0 &&
      nonRegisteredContacts.length === 0 &&
      !isSyncingContacts &&
      phoneContacts.length > 0
    ) {
      syncPhoneContacts();
    }
  }, [currentView]);

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

  const openAddContactModal = () => {
    setEditingContactOriginal(null);
    setNewContactName('');
    setNewContactPhone('');
    setNewContactAvatar('');
    setShowAddContactModal(true);
  };

  const openEditContactModal = (contact) => {
    const name = contact.phoneBookName || contact.name || '';
    const phoneNum = contact.phone || '';
    setEditingContactOriginal({ name, phone: phoneNum, username: contact.username || '' });
    setNewContactName(name);
    setNewContactPhone(phoneNum);
    setNewContactAvatar(contact.avatar || '');
    setShowAddContactModal(true);
  };

  const closeContactModal = () => {
    setShowAddContactModal(false);
    setEditingContactOriginal(null);
    setNewContactName('');
    setNewContactPhone('');
    setNewContactAvatar('');
  };

  const handleContactAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    const compressed = await compressImageFile(file, 256, 0.82);
    if (compressed) {
      setNewContactAvatar(compressed);
    }
  };

  const handleSaveContact = (e) => {
    e.preventDefault();
    const trimmedName = newContactName.trim();
    const trimmedPhone = newContactPhone.trim();
    const avatarValue = newContactAvatar || null;
    if (!trimmedName || !trimmedPhone) return;

    let updated;
    if (editingContactOriginal) {
      const origKey = normalizePhoneKey(editingContactOriginal.phone);
      const newKey = normalizePhoneKey(trimmedPhone);
      let replacedIndex = -1;

      updated = phoneContacts.map((c, idx) => {
        if (
          replacedIndex === -1 &&
          (c.phone === editingContactOriginal.phone ||
            (origKey && normalizePhoneKey(c.phone) === origKey) ||
            (editingContactOriginal.username && c.username === editingContactOriginal.username))
        ) {
          replacedIndex = idx;
          return {
            ...c,
            name: trimmedName,
            phone: trimmedPhone,
            avatar: avatarValue,
            username: editingContactOriginal.username || c.username,
          };
        }
        return c;
      });

      if (replacedIndex === -1) {
        updated = [
          {
            name: trimmedName,
            phone: trimmedPhone,
            avatar: avatarValue,
            username: editingContactOriginal.username || '',
          },
          ...updated,
        ];
        replacedIndex = 0;
      }

      if (newKey) {
        updated = updated.filter((c, idx) => idx === replacedIndex || normalizePhoneKey(c.phone) !== newKey);
      }

      setRegisteredContacts((prev) =>
        prev.map((c) =>
          c.phone === editingContactOriginal.phone
            ? { ...c, phoneBookName: trimmedName, phone: trimmedPhone, avatar: avatarValue }
            : c
        )
      );
      setNonRegisteredContacts((prev) =>
        prev.map((c) =>
          c.phone === editingContactOriginal.phone
            ? { ...c, phoneBookName: trimmedName, phone: trimmedPhone, avatar: avatarValue }
            : c
        )
      );
    } else {
      const newEntry = { name: trimmedName, phone: trimmedPhone, avatar: avatarValue };
      updated = [newEntry, ...phoneContacts.filter((c) => c.phone !== newEntry.phone)];
    }

    setPhoneContacts(updated);
    try {
      localStorage.setItem('assistance_phone_contacts', JSON.stringify(updated));
    } catch {}
    closeContactModal();
    syncPhoneContacts(updated);
  };

  const handleDeleteContact = (contact) => {
    const targetKey = normalizePhoneKey(contact.phone || '');
    const matchesTarget = (c) =>
      (contact.phone &&
        (c.phone === contact.phone || (targetKey && normalizePhoneKey(c.phone) === targetKey))) ||
      (contact.username && c.username === contact.username);

    const updated = phoneContacts.filter((c) => !matchesTarget(c));
    setPhoneContacts(updated);
    try {
      localStorage.setItem('assistance_phone_contacts', JSON.stringify(updated));
    } catch {}

    setRegisteredContacts((prev) => prev.filter((c) => !matchesTarget(c)));
    setNonRegisteredContacts((prev) => prev.filter((c) => !matchesTarget(c)));

    if (updated.length > 0) {
      syncPhoneContacts(updated);
    }
  };

  const handleExportContacts = () => {
    const seen = new Set();
    const listToExport = [];

    const addEntry = (name, phoneNum, usernameVal = '') => {
      const key = normalizePhoneKey(phoneNum) || usernameVal || name;
      if (!key || seen.has(key)) return;
      seen.add(key);
      listToExport.push({
        name: name || usernameVal || 'Contact',
        phone: phoneNum || '',
        username: usernameVal,
      });
    };

    registeredContacts.forEach((c) => addEntry(c.phoneBookName, c.phone, c.username));
    nonRegisteredContacts.forEach((c) => addEntry(c.phoneBookName, c.phone));
    phoneContacts.forEach((c) => addEntry(c.name, c.phone));

    if (listToExport.length === 0) {
      setSyncFeedback({ type: 'error', text: 'No contacts available to export.' });
      return;
    }

    const vcfContent = listToExport
      .map((c) => {
        const lines = ['BEGIN:VCARD', 'VERSION:3.0', `FN:${c.name}`];
        if (c.phone) lines.push(`TEL;TYPE=CELL:${c.phone}`);
        if (c.username) lines.push(`NOTE:@${c.username}`);
        lines.push('END:VCARD');
        return lines.join('\r\n');
      })
      .join('\r\n');

    const blob = new Blob([vcfContent], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'contacts.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setSyncFeedback({
      type: 'success',
      text: `Exported ${listToExport.length} contact${listToExport.length === 1 ? '' : 's'}.`,
    });
  };

  const [discoveryUsers, setDiscoveryUsers] = useState(() => {
    try {
      const cached = localStorage.getItem('assistance_cached_users');
      return cached ? JSON.parse(cached) : [];
    } catch {
      return [];
    }
  });
  const [isLoadingDiscoveryUsers, setIsLoadingDiscoveryUsers] = useState(false);
  const [discoverySearchQuery, setDiscoverySearchQuery] = useState('');

  useEffect(() => {
    if (currentView !== 'search-and-discovery' && currentView !== 'social') return;
    let isMounted = true;
    setIsLoadingDiscoveryUsers(true);

    const loadUsers = async () => {
      try {
        const res = await fetch('/api/users/all', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.success && Array.isArray(data.users) && data.users.length > 0) {
            setDiscoveryUsers(data.users);
            try {
              localStorage.setItem('assistance_cached_users', JSON.stringify(data.users));
            } catch {}
            return;
          }
        }
      } catch (err) {
        console.warn('Fetch /api/users/all failed, trying fallback:', err);
      }

      // Fallback 1: try /api/users/registered-contacts
      try {
        const fallbackRes = await fetch('/api/users/registered-contacts', { cache: 'no-store' });
        if (fallbackRes.ok) {
          const fallbackData = await fallbackRes.json();
          if (
            isMounted &&
            fallbackData.contacts &&
            Array.isArray(fallbackData.contacts) &&
            fallbackData.contacts.length > 0
          ) {
            const formatted = fallbackData.contacts.map((c) => ({
              id: c.id || c.username,
              username: c.username,
              displayName: c.phoneBookName || c.displayName || c.username,
              phone: c.phone || '',
              email: c.email || '',
              status: c.status || '',
              avatar: c.avatar || null,
            }));
            setDiscoveryUsers(formatted);
            try {
              localStorage.setItem('assistance_cached_users', JSON.stringify(formatted));
            } catch {}
            return;
          }
        }
      } catch (err) {
        console.warn('Fallback /api/users/registered-contacts failed:', err);
      }

      // Fallback 2: localStorage cache
      try {
        const cached = localStorage.getItem('assistance_cached_users');
        if (cached && isMounted) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setDiscoveryUsers(parsed);
          }
        }
      } catch {}
    };

    loadUsers().finally(() => {
      if (isMounted) setIsLoadingDiscoveryUsers(false);
    });

    return () => {
      isMounted = false;
    };
  }, [currentView]);

  const filteredDiscoveryUsers = discoveryUsers.filter((u) => {
    if (!discoverySearchQuery.trim()) return true;
    const q = discoverySearchQuery.trim().toLowerCase();
    return (
      (u.displayName && u.displayName.toLowerCase().includes(q)) ||
      (u.username && u.username.toLowerCase().includes(q)) ||
      (u.email && u.email.toLowerCase().includes(q)) ||
      (u.phone && u.phone.toLowerCase().includes(q))
    );
  });

  const socialRegisteredUsers = discoveryUsers.filter((u) => {
    if (!searchFriendsQuery.trim()) return true;
    const q = searchFriendsQuery.trim().toLowerCase();
    return (
      (u.displayName && u.displayName.toLowerCase().includes(q)) ||
      (u.username && u.username.toLowerCase().includes(q)) ||
      (u.email && u.email.toLowerCase().includes(q)) ||
      (u.phone && u.phone.toLowerCase().includes(q))
    );
  });

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

  const socialFilteredFollowers = followersList.filter((u) => {
    if (!searchFriendsQuery.trim()) return true;
    return u.toLowerCase().includes(searchFriendsQuery.trim().toLowerCase());
  });

  const socialFilteredFollowing = followingList.filter((u) => {
    if (!searchFriendsQuery.trim()) return true;
    return u.toLowerCase().includes(searchFriendsQuery.trim().toLowerCase());
  });

  const allSocialUsers = discoveryUsers.filter(
    (u) => u.username && u.username.toLowerCase() !== (loggedInUser || '').toLowerCase()
  );

  const filteredSocialUsers = allSocialUsers.filter((u) => {
    if (!searchFriendsQuery.trim()) return true;
    const q = searchFriendsQuery.trim().toLowerCase();
    return (
      (u.username && u.username.toLowerCase().includes(q)) ||
      (u.displayName && u.displayName.toLowerCase().includes(q))
    );
  });

  const socialFilteredReceivedRequests = receivedFriendRequests.filter((u) => {
    if (!searchFriendsQuery.trim()) return true;
    return u.toLowerCase().includes(searchFriendsQuery.trim().toLowerCase());
  });

  const socialFilteredSentRequests = sentFriendRequests.filter((u) => {
    if (!searchFriendsQuery.trim()) return true;
    return u.toLowerCase().includes(searchFriendsQuery.trim().toLowerCase());
  });

  const myAuthoredPosts = posts.filter(
    (p) => String(p.author || '').toLowerCase() === String(loggedInUser || '').toLowerCase()
  );

  const myPhotosPosts = myAuthoredPosts.filter((p) => {
    const isVideo = Boolean(
      p.video ||
      p.mediaType === 'video' ||
      (p.media && (p.media.startsWith('data:video') || p.media.endsWith('.mp4') || p.media.endsWith('.webm') || p.media.endsWith('.mov') || p.media.includes('/video/')))
    );
    return !isVideo && Boolean(p.image || p.media);
  });

  const myVideosPosts = myAuthoredPosts.filter((p) => {
    return Boolean(
      p.video ||
      p.mediaType === 'video' ||
      (p.media && (p.media.startsWith('data:video') || p.media.endsWith('.mp4') || p.media.endsWith('.webm') || p.media.endsWith('.mov') || p.media.includes('/video/')))
    );
  });

  if (
    currentView === 'messages' ||
    currentView === 'blank' ||
    currentView === 'account' ||
    currentView === 'contacts' ||
    currentView === 'profile' ||
    currentView === 'user-profile' ||
    currentView === 'social' ||
    currentView === 'search-and-discovery' ||
    currentView === 'privacy' ||
    currentView === 'whats-happening' ||
    currentView === 'people-i-follow' ||
    currentView === 'friends-only' ||
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
          {isSidebarVisible && (
            <div
              className="sidebar-backdrop"
              id="sidebar-backdrop"
              onClick={() => setIsSidebarVisible(false)}
              aria-hidden="true"
            />
          )}
          <aside className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''} ${!isSidebarVisible ? 'hidden' : ''}`} id="left-sidebar">
          <div className="sidebar-header">
            <div className="sidebar-brand">
              <div className="brand-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
              </div>
              {!isSidebarCollapsed && <span className="brand-title">Planet</span>}
            </div>
            <div className="sidebar-header-actions">
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
              <button
                type="button"
                className="sidebar-close-btn"
                id="sidebar-close-btn"
                onClick={() => setIsSidebarVisible(false)}
                aria-label="Hide sidebar"
                title="Hide sidebar"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
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
                className={`sidebar-nav-item ${currentView === 'messages' ? 'active' : ''}`}
                id="messages-btn"
                onClick={handleOpenMessagesView}
                title="Messages"
                aria-label="Messages"
              >
                <div className="sidebar-nav-icon-wrapper">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                  {totalUnreadMessages > 0 && <span className="sidebar-unread-dot"></span>}
                </div>
                {!isSidebarCollapsed && (
                  <span className="sidebar-nav-label-row">
                    <span>Messages</span>
                    {totalUnreadMessages > 0 && (
                      <span className="sidebar-unread-pill">{totalUnreadMessages}</span>
                    )}
                  </span>
                )}
              </button>

              <button
                type="button"
                className={`sidebar-nav-item ${currentView === 'voice-and-video-call' ? 'active' : ''}`}
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
                {!isSidebarCollapsed && <span>Voice and Video Call</span>}
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
                setActiveChatContact(null);
                setChatMessages({});
                setRecentConversations([]);
                setTotalUnreadMessages(0);
                setIncomingToast(null);
                try {
                  localStorage.removeItem('assistance_user');
                  localStorage.removeItem('assistance_active_chat_contact');
                  localStorage.removeItem('assistance_chat_history');
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
              className="navbar-menu-btn"
              id="navbar-sidebar-menu-btn"
              onClick={() => {
                setIsSidebarVisible((prev) => {
                  const next = !prev;
                  if (next && typeof window !== 'undefined' && window.innerWidth <= 768) {
                    setIsSidebarCollapsed(false);
                  }
                  return next;
                });
              }}
              aria-label={isSidebarVisible ? 'Hide sidebar' : 'Open menu bar'}
              title={isSidebarVisible ? 'Hide Menu' : 'Open Menu'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
              <span className="navbar-menu-text">Menu</span>
            </button>

            <div className="navbar-links">
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
                className={`navbar-item ${currentView === 'people-i-follow' ? 'active' : ''}`}
                id="people-i-follow-btn"
                onClick={() =>
                  navigateTo(currentView === 'people-i-follow' ? 'blank' : 'people-i-follow')
                }
                title="People I Follow"
                aria-label="People I Follow"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <span>People I Follow</span>
              </button>

              <button
                type="button"
                className={`navbar-item ${currentView === 'friends-only' ? 'active' : ''}`}
                id="friends-only-btn"
                onClick={() =>
                  navigateTo(currentView === 'friends-only' ? 'blank' : 'friends-only')
                }
                title="Friends-only feed"
                aria-label="Friends-only feed"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <span>Friends-only feed</span>
              </button>
            </div>

            <div className="navbar-user" id="navbar-user" title={loggedInUser || 'User'}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span className="navbar-username-text">{loggedInUser || 'User'}</span>
            </div>
          </nav>

          {/* 2nd Top Navbar - Message */}
          <nav className="workspace-sub-navbar" id="top-secondary-navbar" aria-label="Message Navigation">
            <button
              type="button"
              className={`sub-navbar-message-btn ${currentView === 'messages' ? 'active' : ''}`}
              id="sub-navbar-message-btn"
              onClick={handleOpenMessagesView}
              title="Message"
              aria-label="Message"
            >
              <div className="sub-navbar-message-icon-wrap">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                {totalUnreadMessages > 0 && (
                  <span className="sub-navbar-message-ping-dot"></span>
                )}
              </div>
              <span className="sub-navbar-message-text">Message</span>
              {totalUnreadMessages > 0 && (
                <span className="sub-navbar-message-badge">{totalUnreadMessages}</span>
              )}
            </button>
          </nav>

          <main
            className={`workspace-main ${currentView === 'messages' ? 'chat-main-active' : ''}`}
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
                      onClick={openAddContactModal}
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

                    <button
                      type="button"
                      className="contacts-add-btn"
                      id="export-contacts-btn"
                      onClick={handleExportContacts}
                      title="Export Contacts"
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
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      Export Contacts
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
                        <div
                          key={contact.id || contact.username}
                          className="contact-card"
                          onClick={() => handleOpenChatWithContact(contact)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleOpenChatWithContact(contact);
                            }
                          }}
                        >
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
                        <div
                          key={contact.phone || idx}
                          className="contact-card invite-card"
                          onClick={() => handleOpenChatWithContact(contact)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleOpenChatWithContact(contact);
                            }
                          }}
                        >
                          <div className="contact-card-left">
                            <div
                              className="contact-avatar invite"
                              style={{ backgroundColor: contact.avatar ? 'transparent' : '#9ca3af' }}
                            >
                              {contact.avatar ? (
                                <img src={contact.avatar} alt={contact.phoneBookName} className="contact-avatar-img" />
                              ) : (
                                <span>{getInitials(contact.phoneBookName)}</span>
                              )}
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
                              onClick={(e) => {
                                e.stopPropagation();
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

                {/* Add / Edit Phone Contact Modal */}
                {showAddContactModal && (
                  <div className="contacts-modal-backdrop" onClick={closeContactModal}>
                    <div className="contacts-modal" onClick={(e) => e.stopPropagation()}>
                      <div className="contacts-modal-header">
                        <h3 className="contacts-modal-title">
                          {editingContactOriginal ? 'Edit Contact' : 'Add Phone Contact to Sync'}
                        </h3>
                        <button
                          type="button"
                          className="contacts-modal-close-btn"
                          onClick={closeContactModal}
                        >
                          ×
                        </button>
                      </div>
                      <p className="contacts-modal-desc">
                        {editingContactOriginal
                          ? 'Update the contact name or phone number and re-sync.'
                          : 'Add a contact from your phonebook. If they are already registered on Assistance, they will immediately appear in your registered contacts list!'}
                      </p>
                      <form onSubmit={handleSaveContact} className="contacts-modal-form">
                        <div className="form-group">
                          <label className="input-label">Contact Profile Picture</label>
                          <div className="contact-avatar-picker-row">
                            <div
                              className="contact-avatar-picker-preview"
                              onClick={() => contactAvatarInputRef.current?.click()}
                              title="Contact Profile Picture"
                            >
                              {newContactAvatar ? (
                                <img src={newContactAvatar} alt="Contact profile" className="contact-avatar-img" />
                              ) : (
                                <span>{newContactName ? getInitials(newContactName) : '?'}</span>
                              )}
                            </div>
                            <input
                              ref={contactAvatarInputRef}
                              type="file"
                              id="new-contact-avatar"
                              accept="image/*"
                              className="hidden-file-input"
                              onChange={handleContactAvatarChange}
                            />
                            <div className="contact-avatar-picker-actions">
                              <button
                                type="button"
                                className="contacts-modal-cancel-btn"
                                onClick={() => contactAvatarInputRef.current?.click()}
                              >
                                {newContactAvatar ? 'Change Photo' : 'Upload Photo'}
                              </button>
                              {newContactAvatar && (
                                <button
                                  type="button"
                                  className="contacts-modal-remove-btn"
                                  onClick={() => setNewContactAvatar('')}
                                >
                                  Remove
                                </button>
                              )}
                            </div>
                          </div>
                        </div>

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
                            onClick={closeContactModal}
                          >
                            Cancel
                          </button>
                          <button type="submit" className="contacts-modal-submit-btn">
                            {editingContactOriginal ? 'Save Changes' : 'Save & Sync'}
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
                {/* 1. Cover Photo Banner */}
                <div
                  className="profile-cover"
                  id="profile-cover"
                  onClick={() => coverFileInputRef.current?.click()}
                  title={coverPhoto ? 'Click to change cover photo' : 'Click to add cover photo'}
                >
                  {coverPhoto ? (
                    <img src={coverPhoto} alt="Cover preview" className="profile-cover-img" />
                  ) : (
                    <div className="profile-cover-placeholder">
                      <div className="profile-cover-gradient"></div>
                    </div>
                  )}

                  <div className="profile-cover-actions">
                    <button
                      type="button"
                      className="profile-cover-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        coverFileInputRef.current?.click();
                      }}
                      title="Upload cover photo"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                        <circle cx="12" cy="13" r="4"></circle>
                      </svg>
                      <span>{coverPhoto ? 'Change Cover' : 'Add Cover'}</span>
                    </button>
                    {coverPhoto && (
                      <button
                        type="button"
                        className="profile-cover-btn remove"
                        onClick={handleRemoveCoverPhoto}
                        title="Remove cover photo"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    )}
                  </div>

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

                {/* 2. Profile Header (Overlapping Avatar + Action Buttons) */}
                <div className="profile-header-row">
                  <div className="profile-avatar-wrapper">
                    <div
                      className="profile-avatar-circle"
                      style={{
                        backgroundColor: profilePicture ? 'transparent' : getAvatarColor(displayName || loggedInUser || 'User'),
                      }}
                      onClick={() => {
                        if (profilePicture) setSelectedPostImageModal(profilePicture);
                        else profileFileInputRef.current?.click();
                      }}
                      title={profilePicture ? 'Click to view photo' : 'Click to add profile picture'}
                    >
                      {profilePicture ? (
                        <img src={profilePicture} alt={displayName || loggedInUser} className="profile-avatar-img" />
                      ) : (
                        <span className="profile-avatar-initials">
                          {getInitials(displayName || loggedInUser || 'User')}
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      className="profile-avatar-camera-btn"
                      title="Change profile picture"
                      onClick={(e) => {
                        e.stopPropagation();
                        profileFileInputRef.current?.click();
                      }}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

                  <div className="profile-main-actions">
                    <button
                      type="button"
                      className="profile-btn profile-btn-primary"
                      onClick={handleOpenEditProfileModal}
                      title="Edit Profile Information"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                      </svg>
                      <span>Edit Profile</span>
                    </button>

                    <button
                      type="button"
                      className="profile-btn profile-btn-secondary"
                      onClick={handleShareMyProfile}
                      title="Share your profile"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="18" cy="5" r="3"></circle>
                        <circle cx="6" cy="12" r="3"></circle>
                        <circle cx="18" cy="19" r="3"></circle>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                      </svg>
                      <span>Share</span>
                    </button>
                  </div>
                </div>

                {/* Toast Feedback */}
                {profileToast && (
                  <div className={`profile-toast ${profileToast.type}`}>
                    <span>{profileToast.text}</span>
                  </div>
                )}

                {/* 3. Identity Information Section */}
                <div className="profile-identity-section">
                  <div className="profile-name-row">
                    <h1 className="profile-display-name">
                      {displayName || loggedInUser || 'User'}
                    </h1>
                    <span className="profile-verified-badge" title="Verified Member">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    </span>
                    <span className="profile-you-badge">You</span>
                  </div>

                  <span className="profile-handle">@{loggedInUser}</span>

                  {aboutText && (
                    <p className="profile-bio-text">{aboutText}</p>
                  )}

                  {/* 6 & 7. Location, Website, Employment, Education */}
                  <div className="profile-meta-grid">
                    {locationText && (
                      <div className="profile-meta-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span>{locationText}</span>
                      </div>
                    )}

                    {websiteText && (
                      <div className="profile-meta-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="2" y1="12" x2="22" y2="12"></line>
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                        </svg>
                        <a
                          href={websiteText.startsWith('http') ? websiteText : `https://${websiteText}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="profile-link"
                        >
                          {websiteText}
                        </a>
                      </div>
                    )}

                    {employmentText && (
                      <div className="profile-meta-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                        </svg>
                        <span>{employmentText}</span>
                      </div>
                    )}

                    {educationText && (
                      <div className="profile-meta-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                          <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                        </svg>
                        <span>{educationText}</span>
                      </div>
                    )}

                    <div className="profile-meta-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      <span>Member of Assistance</span>
                    </div>
                  </div>

                  {/* 8. Skills & Interests tags preview */}
                  {(skillsText || interestsText) && (
                    <div className="profile-tags-row">
                      {skillsText &&
                        skillsText
                          .split(/[,;\n]/)
                          .map((s) => s.trim())
                          .filter(Boolean)
                          .map((skill, idx) => (
                            <span key={`skill-${idx}`} className="profile-pill-tag skill" title="Skill">
                              {skill}
                            </span>
                          ))}
                      {interestsText &&
                        interestsText
                          .split(/[,;\n]/)
                          .map((i) => i.trim())
                          .filter(Boolean)
                          .map((interest, idx) => (
                            <span key={`interest-${idx}`} className="profile-pill-tag interest" title="Interest">
                              {interest}
                            </span>
                          ))}
                    </div>
                  )}

                  {/* 13. Followers & Following Statistics Bar */}
                  <div className="profile-stats-grid">
                    <button
                      type="button"
                      className="profile-stat-box"
                      onClick={() => setFollowModalType('following')}
                      title="View following list"
                    >
                      <strong className="profile-stat-number">{followingList.length}</strong>
                      <span className="profile-stat-title">Following</span>
                    </button>

                    <button
                      type="button"
                      className="profile-stat-box"
                      onClick={() => setFollowModalType('followers')}
                      title="View followers list"
                    >
                      <strong className="profile-stat-number">{followersList.length}</strong>
                      <span className="profile-stat-title">Followers</span>
                    </button>

                    <button
                      type="button"
                      className="profile-stat-box"
                      onClick={() => navigateTo('social')}
                      title="View friends"
                    >
                      <strong className="profile-stat-number">{friendsList.length}</strong>
                      <span className="profile-stat-title">Friends</span>
                    </button>

                    <button
                      type="button"
                      className="profile-stat-box"
                      onClick={() => setMyProfileActiveTab('posts')}
                      title="View posts"
                    >
                      <strong className="profile-stat-number">{myAuthoredPosts.length}</strong>
                      <span className="profile-stat-title">Posts</span>
                    </button>
                  </div>
                </div>

                {/* 9. Profile Posts, Photos, and Videos Tabs */}
                <div className="profile-tabs-header">
                  <button
                    type="button"
                    className={`profile-tab-button ${myProfileActiveTab === 'posts' ? 'active' : ''}`}
                    onClick={() => setMyProfileActiveTab('posts')}
                  >
                    <span>Posts</span>
                    <span className="profile-tab-count">{myAuthoredPosts.length}</span>
                  </button>
                  <button
                    type="button"
                    className={`profile-tab-button ${myProfileActiveTab === 'photos' ? 'active' : ''}`}
                    onClick={() => setMyProfileActiveTab('photos')}
                  >
                    <span>Photos</span>
                    <span className="profile-tab-count">{myPhotosPosts.length}</span>
                  </button>
                  <button
                    type="button"
                    className={`profile-tab-button ${myProfileActiveTab === 'videos' ? 'active' : ''}`}
                    onClick={() => setMyProfileActiveTab('videos')}
                  >
                    <span>Videos</span>
                    <span className="profile-tab-count">{myVideosPosts.length}</span>
                  </button>
                  <button
                    type="button"
                    className={`profile-tab-button ${myProfileActiveTab === 'about' ? 'active' : ''}`}
                    onClick={() => setMyProfileActiveTab('about')}
                  >
                    <span>About</span>
                  </button>
                </div>

                {/* Tab Contents */}
                <div className="profile-tab-body">
                  {/* Posts Tab */}
                  {myProfileActiveTab === 'posts' && (
                    <div className="profile-posts-tab">
                      {/* Quick Post Prompt */}
                      <div className="profile-create-prompt" onClick={() => navigateTo('whats-happening')}>
                        <div
                          className="profile-prompt-avatar"
                          style={{
                            backgroundColor: profilePicture
                              ? 'transparent'
                              : getAvatarColor(displayName || loggedInUser || 'User'),
                          }}
                        >
                          {profilePicture ? (
                            <img src={profilePicture} alt="Avatar" />
                          ) : (
                            <span>{getInitials(displayName || loggedInUser || 'User')}</span>
                          )}
                        </div>
                        <span className="profile-prompt-text">
                          What's on your mind, {displayName || loggedInUser}?
                        </span>
                        <button type="button" className="profile-prompt-btn">Create Post</button>
                      </div>

                      {myAuthoredPosts.length === 0 ? (
                        <div className="profile-empty-state">
                          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                          </svg>
                          <h3>No posts yet</h3>
                          <p>You haven't posted any updates yet. Share your thoughts, photos, or videos with your network!</p>
                          <button
                            type="button"
                            className="profile-btn profile-btn-primary"
                            onClick={() => navigateTo('whats-happening')}
                          >
                            Share your first post
                          </button>
                        </div>
                      ) : (
                        myAuthoredPosts.map((post) => {
                          const isPostOwner = true;
                          const hasLiked = loggedInUser && (post.likes || []).includes(String(loggedInUser).toLowerCase());
                          const isCommentsOpen = Boolean(openCommentsPosts[post.id]);
                          const isVideo = Boolean(
                            post.video ||
                              post.mediaType === 'video' ||
                              (post.media &&
                                (post.media.startsWith('data:video') ||
                                  post.media.endsWith('.mp4') ||
                                  post.media.endsWith('.webm') ||
                                  post.media.endsWith('.mov') ||
                                  post.media.includes('/video/')))
                          );
                          const videoSrc = post.video || (isVideo ? post.media : null);
                          const imageSrc = !isVideo ? post.image || post.media : null;

                          return (
                            <article key={post.id} className="post-card">
                              <div className="post-header">
                                <div className="post-author-wrap">
                                  <div
                                    className="post-author-avatar"
                                    style={{
                                      backgroundColor: profilePicture
                                        ? 'transparent'
                                        : getAvatarColor(displayName || loggedInUser || 'User'),
                                    }}
                                  >
                                    {profilePicture ? (
                                      <img src={profilePicture} alt={displayName || loggedInUser} />
                                    ) : (
                                      <span>{getInitials(displayName || loggedInUser || 'User')}</span>
                                    )}
                                  </div>
                                  <div className="post-author-meta">
                                    <span className="post-author">{displayName || loggedInUser}</span>
                                    <span className="post-handle">@{loggedInUser}</span>
                                  </div>
                                </div>
                                <span className="post-time">{post.time || post.timestamp}</span>
                              </div>

                              {post.content && <p className="post-content">{post.content}</p>}

                              {isVideo && videoSrc && (
                                <div className="post-media-video-wrap">
                                  <video src={videoSrc} controls playsInline preload="metadata" className="post-media-video" />
                                </div>
                              )}

                              {imageSrc && (
                                <div
                                  className="post-media-wrap"
                                  onClick={() => setSelectedPostImageModal(imageSrc)}
                                  title="Click to view full image"
                                >
                                  <img src={imageSrc} alt="Post media" className="post-media-image" loading="lazy" />
                                </div>
                              )}

                              <div className="post-footer">
                                <button
                                  type="button"
                                  className={`post-action-btn like-btn ${hasLiked ? 'liked' : ''}`}
                                  onClick={() => handleLikePost(post.id)}
                                  title="Like post"
                                >
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill={hasLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                  </svg>
                                  <span>{(post.likes || []).length}</span>
                                </button>

                                <button
                                  type="button"
                                  className={`post-action-btn comment-btn ${isCommentsOpen ? 'active' : ''}`}
                                  onClick={() => toggleComments(post.id)}
                                  title="Comments"
                                  aria-expanded={isCommentsOpen}
                                >
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                  </svg>
                                  <span>{post.commentsCount ?? (post.comments || []).length}</span>
                                </button>

                                <button
                                  type="button"
                                  className="post-action-btn delete-btn"
                                  onClick={() => handleDeletePost(post.id)}
                                  title="Delete post"
                                >
                                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                  </svg>
                                  <span>Delete</span>
                                </button>
                              </div>

                              {isCommentsOpen && (
                                <div className="post-comments-section">
                                  <form
                                    className="post-comment-form"
                                    onSubmit={(e) => {
                                      e.preventDefault();
                                      handleAddComment(post.id);
                                    }}
                                  >
                                    <div
                                      className="post-comment-input-avatar"
                                      style={{
                                        backgroundColor: profilePicture
                                          ? 'transparent'
                                          : getAvatarColor(displayName || loggedInUser || 'User'),
                                      }}
                                    >
                                      {profilePicture ? (
                                        <img src={profilePicture} alt="User" />
                                      ) : (
                                        <span>{getInitials(displayName || loggedInUser || 'User')}</span>
                                      )}
                                    </div>
                                    <input
                                      type="text"
                                      className="post-comment-input"
                                      placeholder="Write a comment..."
                                      value={commentInputs[post.id] || ''}
                                      onChange={(e) => handleCommentInputChange(post.id, e.target.value)}
                                    />
                                    <button
                                      type="submit"
                                      className="post-comment-submit-btn"
                                      disabled={!(commentInputs[post.id] || '').trim()}
                                    >
                                      Post
                                    </button>
                                  </form>

                                  <div className="post-comments-list">
                                    {(post.comments || []).length === 0 ? (
                                      <p className="post-comments-empty">No comments yet.</p>
                                    ) : (
                                      (post.comments || []).map((c) => (
                                        <div key={c.id} className="post-comment-item">
                                          <div
                                            className="post-comment-author-avatar"
                                            style={{
                                              backgroundColor: c.authorAvatar
                                                ? 'transparent'
                                                : getAvatarColor(c.authorName || c.author || 'User'),
                                            }}
                                          >
                                            {c.authorAvatar ? (
                                              <img src={c.authorAvatar} alt={c.authorName || c.author} />
                                            ) : (
                                              <span>{getInitials(c.authorName || c.author || 'User')}</span>
                                            )}
                                          </div>
                                          <div className="post-comment-body">
                                            <div className="post-comment-bubble">
                                              <span className="post-comment-author">{c.authorName || c.author}</span>
                                              <p className="post-comment-text">{c.text}</p>
                                            </div>
                                            <span className="post-comment-time">{c.time || c.timestamp}</span>
                                          </div>
                                          {loggedInUser &&
                                            String(c.author || '').toLowerCase() === String(loggedInUser).toLowerCase() && (
                                              <button
                                                type="button"
                                                className="post-comment-delete-btn"
                                                title="Delete comment"
                                                onClick={() => handleDeleteComment(post.id, c.id)}
                                              >
                                                ×
                                              </button>
                                            )}
                                        </div>
                                      ))
                                    )}
                                  </div>
                                </div>
                              )}
                            </article>
                          );
                        })
                      )}
                    </div>
                  )}

                  {/* Photos Tab */}
                  {myProfileActiveTab === 'photos' && (
                    <div className="profile-media-tab">
                      {myPhotosPosts.length === 0 ? (
                        <div className="profile-empty-state">
                          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                            <polyline points="21 15 16 10 5 21"></polyline>
                          </svg>
                          <h3>No photos uploaded</h3>
                          <p>Photos you include in your posts will appear here in your gallery.</p>
                          <button
                            type="button"
                            className="profile-btn profile-btn-primary"
                            onClick={() => navigateTo('photo-sharing')}
                          >
                            Upload a Photo
                          </button>
                        </div>
                      ) : (
                        <div className="profile-media-grid">
                          {myPhotosPosts.map((p) => {
                            const isVideo = Boolean(
                              p.video ||
                                p.mediaType === 'video' ||
                                (p.media &&
                                  (p.media.startsWith('data:video') ||
                                    p.media.endsWith('.mp4') ||
                                    p.media.endsWith('.webm') ||
                                    p.media.endsWith('.mov') ||
                                    p.media.includes('/video/')))
                            );
                            const imgUrl = !isVideo ? p.image || p.media : null;
                            if (!imgUrl) return null;
                            return (
                              <div
                                key={p.id}
                                className="profile-media-item"
                                onClick={() => setSelectedPostImageModal(imgUrl)}
                                title="Click to expand"
                              >
                                <img src={imgUrl} alt="Photo" className="profile-media-thumb" loading="lazy" />
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Videos Tab */}
                  {myProfileActiveTab === 'videos' && (
                    <div className="profile-media-tab">
                      {myVideosPosts.length === 0 ? (
                        <div className="profile-empty-state">
                          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5">
                            <polygon points="23 7 16 12 23 17 23 7"></polygon>
                            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                          </svg>
                          <h3>No videos uploaded</h3>
                          <p>Videos you post will be showcased here with full playback support.</p>
                          <button
                            type="button"
                            className="profile-btn profile-btn-primary"
                            onClick={() => navigateTo('video-sharing')}
                          >
                            Upload a Video
                          </button>
                        </div>
                      ) : (
                        <div className="profile-videos-grid">
                          {myVideosPosts.map((p) => {
                            const videoUrl = p.video || p.media;
                            return (
                              <div key={p.id} className="profile-video-card">
                                <video
                                  src={videoUrl}
                                  controls
                                  playsInline
                                  preload="metadata"
                                  className="profile-video-player"
                                />
                                {p.content && <p className="profile-video-caption">{p.content}</p>}
                                <span className="profile-video-date">{p.time || p.timestamp}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}

                  {/* About Tab */}
                  {myProfileActiveTab === 'about' && (
                    <div className="profile-about-structured">
                      {/* Biography */}
                      <div className="profile-about-box">
                        <div className="profile-about-box-header">
                          <h3 className="profile-about-box-title">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                              <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            <span>Biography & Story</span>
                          </h3>
                          <button type="button" className="profile-inline-edit-btn" onClick={handleOpenEditProfileModal}>
                            Edit
                          </button>
                        </div>
                        <p className="profile-about-box-text">{aboutText || 'Hey there! I am using Assistance'}</p>
                      </div>

                      {/* Employment / Work Experience */}
                      <div className="profile-about-box">
                        <div className="profile-about-box-header">
                          <h3 className="profile-about-box-title">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                            </svg>
                            <span>Work & Employment</span>
                          </h3>
                          <button type="button" className="profile-inline-edit-btn" onClick={handleOpenEditProfileModal}>
                            Edit
                          </button>
                        </div>
                        <div className="profile-info-row-item">
                          <span className="profile-info-row-label">Organization & Role</span>
                          <span className="profile-info-row-val">{employmentText || 'Not specified'}</span>
                        </div>
                      </div>

                      {/* Education */}
                      <div className="profile-about-box">
                        <div className="profile-about-box-header">
                          <h3 className="profile-about-box-title">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                              <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                            </svg>
                            <span>Education & Degrees</span>
                          </h3>
                          <button type="button" className="profile-inline-edit-btn" onClick={handleOpenEditProfileModal}>
                            Edit
                          </button>
                        </div>
                        <div className="profile-info-row-item">
                          <span className="profile-info-row-label">Institution / Degree</span>
                          <span className="profile-info-row-val">{educationText || 'Not specified'}</span>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="profile-about-box">
                        <div className="profile-about-box-header">
                          <h3 className="profile-about-box-title">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                            <span>Skills & Expertise</span>
                          </h3>
                          <button type="button" className="profile-inline-edit-btn" onClick={handleOpenEditProfileModal}>
                            Edit
                          </button>
                        </div>
                        <div className="profile-tags-row">
                          {skillsText ? (
                            skillsText
                              .split(/[,;\n]/)
                              .map((s) => s.trim())
                              .filter(Boolean)
                              .map((skill, idx) => (
                                <span key={`skill-ab-${idx}`} className="profile-pill-tag skill">
                                  {skill}
                                </span>
                              ))
                          ) : (
                            <span className="profile-empty-muted">No skills added yet.</span>
                          )}
                        </div>
                      </div>

                      {/* Interests */}
                      <div className="profile-about-box">
                        <div className="profile-about-box-header">
                          <h3 className="profile-about-box-title">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                            <span>Interests & Passions</span>
                          </h3>
                          <button type="button" className="profile-inline-edit-btn" onClick={handleOpenEditProfileModal}>
                            Edit
                          </button>
                        </div>
                        <div className="profile-tags-row">
                          {interestsText ? (
                            interestsText
                              .split(/[,;\n]/)
                              .map((i) => i.trim())
                              .filter(Boolean)
                              .map((interest, idx) => (
                                <span key={`interest-ab-${idx}`} className="profile-pill-tag interest">
                                  {interest}
                                </span>
                              ))
                          ) : (
                            <span className="profile-empty-muted">No interests added yet.</span>
                          )}
                        </div>
                      </div>

                      {/* Contact & Links */}
                      <div className="profile-about-box">
                        <div className="profile-about-box-header">
                          <h3 className="profile-about-box-title">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="10"></circle>
                              <line x1="2" y1="12" x2="22" y2="12"></line>
                              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"></path>
                            </svg>
                            <span>Contact & Presence</span>
                          </h3>
                          <button type="button" className="profile-inline-edit-btn" onClick={handleOpenEditProfileModal}>
                            Edit
                          </button>
                        </div>
                        <div className="profile-info-rows-list">
                          <div className="profile-info-row-item">
                            <span className="profile-info-row-label">Location</span>
                            <span className="profile-info-row-val">{locationText || 'Not specified'}</span>
                          </div>
                          <div className="profile-info-row-item">
                            <span className="profile-info-row-label">Website</span>
                            <span className="profile-info-row-val">
                              {websiteText ? (
                                <a
                                  href={websiteText.startsWith('http') ? websiteText : `https://${websiteText}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="profile-link"
                                >
                                  {websiteText}
                                </a>
                              ) : (
                                'Not specified'
                              )}
                            </span>
                          </div>
                          <div className="profile-info-row-item">
                            <span className="profile-info-row-label">Unique Handle</span>
                            <span className="profile-info-row-val">@{loggedInUser}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Edit Profile Modal Dialog */}
                {isEditProfileModalOpen && (
                  <div className="profile-modal-overlay" onClick={() => setIsEditProfileModalOpen(false)}>
                    <div className="profile-modal-dialog" onClick={(e) => e.stopPropagation()}>
                      <div className="profile-modal-header">
                        <h2>Edit Profile</h2>
                        <button
                          type="button"
                          className="profile-modal-close"
                          onClick={() => setIsEditProfileModalOpen(false)}
                        >
                          ×
                        </button>
                      </div>

                      {fullProfileFeedback && (
                        <div className={`profile-modal-alert ${fullProfileFeedback.type}`}>
                          {fullProfileFeedback.text}
                        </div>
                      )}

                      <form onSubmit={handleSaveFullProfile} className="profile-modal-form">
                        <div className="profile-form-group">
                          <label htmlFor="edit-display-name">Display Name</label>
                          <input
                            type="text"
                            id="edit-display-name"
                            value={editProfileForm.displayName}
                            onChange={(e) =>
                              setEditProfileForm({ ...editProfileForm, displayName: e.target.value })
                            }
                            placeholder="Your full name"
                          />
                        </div>

                        <div className="profile-form-group">
                          <label htmlFor="edit-username-field">Unique Username</label>
                          <div className="profile-input-prefix-wrap">
                            <span className="profile-input-prefix">@</span>
                            <input
                              type="text"
                              id="edit-username-field"
                              value={editProfileForm.username}
                              onChange={(e) =>
                                setEditProfileForm({ ...editProfileForm, username: e.target.value })
                              }
                              placeholder="username"
                            />
                          </div>
                          <small className="profile-field-hint">Your unique @handle across Assistance</small>
                        </div>

                        <div className="profile-form-group">
                          <label htmlFor="edit-bio">Biography / Status</label>
                          <textarea
                            id="edit-bio"
                            rows="3"
                            value={editProfileForm.bio}
                            onChange={(e) =>
                              setEditProfileForm({ ...editProfileForm, bio: e.target.value })
                            }
                            placeholder="Tell the world about yourself..."
                          />
                        </div>

                        <div className="profile-form-row">
                          <div className="profile-form-group">
                            <label htmlFor="edit-location">Location</label>
                            <input
                              type="text"
                              id="edit-location"
                              value={editProfileForm.location}
                              onChange={(e) =>
                                setEditProfileForm({ ...editProfileForm, location: e.target.value })
                              }
                              placeholder="e.g. San Francisco, CA"
                            />
                          </div>

                          <div className="profile-form-group">
                            <label htmlFor="edit-website">Website</label>
                            <input
                              type="text"
                              id="edit-website"
                              value={editProfileForm.website}
                              onChange={(e) =>
                                setEditProfileForm({ ...editProfileForm, website: e.target.value })
                              }
                              placeholder="https://yourwebsite.com"
                            />
                          </div>
                        </div>

                        <div className="profile-form-row">
                          <div className="profile-form-group">
                            <label htmlFor="edit-employment">Employment</label>
                            <input
                              type="text"
                              id="edit-employment"
                              value={editProfileForm.employment}
                              onChange={(e) =>
                                setEditProfileForm({ ...editProfileForm, employment: e.target.value })
                              }
                              placeholder="Role / Company"
                            />
                          </div>

                          <div className="profile-form-group">
                            <label htmlFor="edit-education">Education</label>
                            <input
                              type="text"
                              id="edit-education"
                              value={editProfileForm.education}
                              onChange={(e) =>
                                setEditProfileForm({ ...editProfileForm, education: e.target.value })
                              }
                              placeholder="Degree / University"
                            />
                          </div>
                        </div>

                        <div className="profile-form-group">
                          <label htmlFor="edit-skills">Skills (comma-separated)</label>
                          <input
                            type="text"
                            id="edit-skills"
                            value={editProfileForm.skills}
                            onChange={(e) =>
                              setEditProfileForm({ ...editProfileForm, skills: e.target.value })
                            }
                            placeholder="e.g. React, Node.js, Python, UI/UX"
                          />
                        </div>

                        <div className="profile-form-group">
                          <label htmlFor="edit-interests">Interests (comma-separated)</label>
                          <input
                            type="text"
                            id="edit-interests"
                            value={editProfileForm.interests}
                            onChange={(e) =>
                              setEditProfileForm({ ...editProfileForm, interests: e.target.value })
                            }
                            placeholder="e.g. Open Source, Photography, AI"
                          />
                        </div>

                        <div className="profile-modal-footer">
                          <button
                            type="button"
                            className="profile-btn profile-btn-secondary"
                            onClick={() => setIsEditProfileModalOpen(false)}
                            disabled={isSavingFullProfile}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="profile-btn profile-btn-primary"
                            disabled={isSavingFullProfile}
                          >
                            {isSavingFullProfile ? 'Saving Changes...' : 'Save Changes'}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {/* Followers & Following Modal Dialog */}
                {followModalType && (
                  <div className="profile-modal-overlay" onClick={() => setFollowModalType(null)}>
                    <div className="profile-modal-dialog" onClick={(e) => e.stopPropagation()}>
                      <div className="profile-modal-header">
                        <h2>
                          {followModalType === 'followers'
                            ? `Followers (${followersList.length})`
                            : `Following (${followingList.length})`}
                        </h2>
                        <button
                          type="button"
                          className="profile-modal-close"
                          onClick={() => setFollowModalType(null)}
                        >
                          ×
                        </button>
                      </div>

                      {/* Add follower / follow form */}
                      <form
                        className="profile-modal-follow-add"
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (followModalType === 'followers') handleAddFollower(e);
                          else handleFollowUser(e);
                        }}
                      >
                        <input
                          type="text"
                          placeholder={
                            followModalType === 'followers'
                              ? 'Enter username to add follower...'
                              : 'Enter username to follow...'
                          }
                          value={followModalType === 'followers' ? addFollowerInput : addFollowingInput}
                          onChange={(e) => {
                            if (followModalType === 'followers') setAddFollowerInput(e.target.value);
                            else setAddFollowingInput(e.target.value);
                          }}
                        />
                        <button type="submit" className="profile-btn profile-btn-primary">
                          {followModalType === 'followers' ? 'Add' : 'Follow'}
                        </button>
                      </form>

                      {followError && (
                        <div className="profile-modal-alert error">{followError}</div>
                      )}

                      {/* Search Filter inside modal */}
                      <div className="profile-modal-search">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input
                          type="text"
                          placeholder="Search in this list..."
                          value={followSearchQuery}
                          onChange={(e) => setFollowSearchQuery(e.target.value)}
                        />
                        {followSearchQuery && (
                          <button type="button" onClick={() => setFollowSearchQuery('')}>
                            ×
                          </button>
                        )}
                      </div>

                      <div className="profile-modal-users-list">
                        {(followModalType === 'followers' ? followersList : followingList)
                          .filter(
                            (u) =>
                              !followSearchQuery.trim() ||
                              u.toLowerCase().includes(followSearchQuery.toLowerCase())
                          )
                          .length === 0 ? (
                          <p className="profile-empty-muted" style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                            {followSearchQuery
                              ? 'No matching users found.'
                              : followModalType === 'followers'
                              ? 'No followers yet.'
                              : 'Not following anyone yet.'}
                          </p>
                        ) : (
                          (followModalType === 'followers' ? followersList : followingList)
                            .filter(
                              (u) =>
                                !followSearchQuery.trim() ||
                                u.toLowerCase().includes(followSearchQuery.toLowerCase())
                            )
                            .map((username) => (
                              <div key={username} className="profile-modal-user-item">
                                <div
                                  className="profile-modal-user-avatar"
                                  style={{ backgroundColor: getAvatarColor(username) }}
                                >
                                  {getInitials(username)}
                                </div>
                                <div className="profile-modal-user-info">
                                  <span className="profile-modal-user-name">@{username}</span>
                                </div>
                                <div className="profile-modal-user-actions">
                                  <button
                                    type="button"
                                    className="profile-btn profile-btn-secondary sm"
                                    onClick={() => {
                                      setFollowModalType(null);
                                      handleOpenUserProfile({ username });
                                    }}
                                  >
                                    View Home
                                  </button>
                                  {followModalType === 'following' ? (
                                    <button
                                      type="button"
                                      className="profile-btn profile-btn-danger sm"
                                      onClick={() => handleUnfollowUser(username)}
                                    >
                                      Unfollow
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      className="profile-btn profile-btn-danger sm"
                                      onClick={() => handleRemoveFollower(username)}
                                    >
                                      Remove
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : currentView === 'social' ? (
            <div className="social-space" id="social-space">
              <div className="contacts-container" id="social-connections-container">
                <div className="contacts-header-wrapper">
                  <div className="contacts-title-col">
                    <h1 className="heading contacts-heading" id="social-connections-heading">
                      Social Connections
                    </h1>
                    <p className="contacts-subheading">
                      Registered users on Assistance ({discoveryUsers.length})
                    </p>
                  </div>
                </div>

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
                    id="social-search-input"
                    className="contacts-search-input"
                    placeholder="Search registered people by name, username, phone..."
                    value={searchFriendsQuery}
                    onChange={(e) => setSearchFriendsQuery(e.target.value)}
                    aria-label="Search registered people"
                  />
                  {searchFriendsQuery && (
                    <button
                      type="button"
                      className="contacts-search-clear"
                      onClick={() => setSearchFriendsQuery('')}
                      aria-label="Clear search"
                    >
                      ×
                    </button>
                  )}
                </div>

                <div className="contacts-list" id="social-registered-users-list">
                  {isLoadingDiscoveryUsers && discoveryUsers.length === 0 ? (
                    <div className="contacts-empty-state">
                      <p className="contacts-empty-text">Loading registered people...</p>
                    </div>
                  ) : socialRegisteredUsers.length === 0 ? (
                    <div className="contacts-empty-state">
                      <h3 className="contacts-empty-title">No registered users found</h3>
                      <p className="contacts-empty-text">
                        {searchFriendsQuery
                          ? `No registered people match "${searchFriendsQuery}"`
                          : 'No people have registered on this application yet.'}
                      </p>
                    </div>
                  ) : (
                    socialRegisteredUsers.map((user) => (
                      <div
                        key={user.id || user.username}
                        className="contact-card"
                        onClick={() => handleOpenChatWithContact(user)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleOpenChatWithContact(user);
                          }
                        }}
                      >
                        <div className="contact-card-left">
                          <div
                            className="contact-avatar"
                            style={{
                              backgroundColor: user.avatar
                                ? 'transparent'
                                : getAvatarColor(user.displayName || user.username),
                            }}
                          >
                            {user.avatar ? (
                              <img
                                src={user.avatar}
                                alt={user.displayName || user.username}
                                className="contact-avatar-img"
                              />
                            ) : (
                              <span>{getInitials(user.displayName || user.username)}</span>
                            )}
                            <span className="contact-online-dot" title="Registered User"></span>
                          </div>

                          <div className="contact-info">
                            <div className="contact-name-row">
                              <span className="contact-name">
                                {user.displayName || user.username}
                              </span>
                              <span className="contact-username">@{user.username}</span>
                              {loggedInUser &&
                                user.username.toLowerCase() === loggedInUser.toLowerCase() && (
                                  <span
                                    className="contact-tab-badge secondary"
                                    style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem' }}
                                  >
                                    You
                                  </span>
                                )}
                              <span
                                className="contact-verified-badge"
                                title="Registered on Assistance"
                              >
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                >
                                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                </svg>
                                Registered
                              </span>
                            </div>

                            {user.status && (
                              <div className="contact-status" title={user.status}>
                                {user.status}
                              </div>
                            )}

                            {(user.phone || user.email) && (
                              <div className="contact-meta-row">
                                {user.phone && (
                                  <span className="contact-phone">
                                    <svg
                                      width="13"
                                      height="13"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                    >
                                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                    {user.phone}
                                  </span>
                                )}
                                {user.email && (
                                  <span
                                    className="contact-phone"
                                    style={{ color: '#4b5563' }}
                                  >
                                    <svg
                                      width="13"
                                      height="13"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                    >
                                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                      <polyline points="22,6 12,13 2,6"></polyline>
                                    </svg>
                                    {user.email}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          ) : currentView === 'search-and-discovery' ? (
            <div className="contacts-space" id="search-and-discovery-space">
              <div className="contacts-container" id="search-and-discovery-container">
                <div className="contacts-header-wrapper">
                  <div className="contacts-title-col">
                    <h1 className="heading contacts-heading" id="search-discovery-heading">
                      Search and Discovery
                    </h1>
                  </div>
                </div>

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
                    id="discovery-search-input"
                    className="contacts-search-input"
                    placeholder="Search registered users..."
                    value={discoverySearchQuery}
                    onChange={(e) => setDiscoverySearchQuery(e.target.value)}
                    aria-label="Search registered users"
                  />
                  {discoverySearchQuery && (
                    <button
                      type="button"
                      className="contacts-search-clear"
                      onClick={() => setDiscoverySearchQuery('')}
                      aria-label="Clear search"
                    >
                      ×
                    </button>
                  )}
                </div>

                <div className="contacts-list" id="discovery-users-list">
                  {isLoadingDiscoveryUsers && discoveryUsers.length === 0 ? (
                    <div className="contacts-empty-state">
                      <p className="contacts-empty-text">Loading registered users...</p>
                    </div>
                  ) : filteredDiscoveryUsers.length === 0 ? (
                    <div className="contacts-empty-state">
                      <p className="contacts-empty-text">No registered users found.</p>
                    </div>
                  ) : (
                    filteredDiscoveryUsers.map((user) => (
                      <div
                        key={user.id || user.username}
                        className="contact-card discovery-user-card"
                        onClick={() => handleOpenUserProfile(user)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleOpenUserProfile(user);
                          }
                        }}
                      >
                        <div className="contact-card-left">
                          <div
                            className="contact-avatar"
                            style={{
                              backgroundColor: user.avatar
                                ? 'transparent'
                                : getAvatarColor(user.displayName || user.username),
                            }}
                          >
                            {user.avatar ? (
                              <img
                                src={user.avatar}
                                alt={user.displayName || user.username}
                                className="contact-avatar-img"
                              />
                            ) : (
                              <span>{getInitials(user.displayName || user.username)}</span>
                            )}
                          </div>

                          <div className="contact-info">
                            <div className="contact-name-row">
                              <span className="contact-name">
                                {user.displayName || user.username}
                              </span>
                              <span className="contact-username">@{user.username}</span>
                              {loggedInUser &&
                                user.username.toLowerCase() === loggedInUser.toLowerCase() && (
                                  <span
                                    className="contact-tab-badge secondary"
                                    style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem' }}
                                  >
                                    You
                                  </span>
                                )}
                            </div>
                            {user.status && (
                              <div className="contact-status" title={user.status}>
                                {user.status}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="contact-card-actions">
                          <button
                            type="button"
                            className="discovery-view-profile-btn"
                            title={`Open ${user.displayName || user.username}'s home page`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenUserProfile(user);
                            }}
                          >
                            <span>Home page</span>
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          ) : currentView === 'user-profile' ? (
            <div className="user-profile-space" id="user-profile-space">
              <div className="user-profile-container" id="user-profile-container">
                {/* Cover Banner */}
                <div className="profile-home-cover">
                  {selectedProfileUser?.coverPhoto ? (
                    <img
                      src={selectedProfileUser.coverPhoto}
                      alt="Cover"
                      className="profile-home-cover-img"
                    />
                  ) : (
                    <div className="profile-home-cover-placeholder">
                      <div className="profile-home-cover-gradient"></div>
                    </div>
                  )}
                </div>

                {/* Profile Header (Avatar + Action buttons) */}
                <div className="profile-home-header">
                  <div className="profile-home-avatar-wrap">
                    <div
                      className="profile-home-avatar"
                      style={{
                        backgroundColor: selectedProfileUser?.avatar
                          ? 'transparent'
                          : getAvatarColor(
                              selectedProfileUser?.displayName ||
                                selectedProfileUser?.username ||
                                'User'
                            ),
                      }}
                    >
                      {selectedProfileUser?.avatar ? (
                        <img
                          src={selectedProfileUser.avatar}
                          alt={selectedProfileUser.displayName || selectedProfileUser.username}
                          className="profile-home-avatar-img"
                        />
                      ) : (
                        <span>
                          {getInitials(
                            selectedProfileUser?.displayName ||
                              selectedProfileUser?.username ||
                              'User'
                          )}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="profile-home-actions">
                    {loggedInUser &&
                    String(selectedProfileUser?.username || '').toLowerCase() ===
                      String(loggedInUser).toLowerCase() ? (
                      <button
                        type="button"
                        className="profile-home-btn edit-btn"
                        onClick={() => navigateTo('profile')}
                      >
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                        </svg>
                        <span>Edit Profile</span>
                      </button>
                    ) : (
                      <>
                        {followingList.some(
                          (u) =>
                            u.toLowerCase() ===
                            String(selectedProfileUser?.username || '').toLowerCase()
                        ) ? (
                          <button
                            type="button"
                            className="profile-home-btn following-btn"
                            title="Click to unfollow"
                            onClick={() => {
                              if (!selectedProfileUser?.username) return;
                              handleUnfollowUser(selectedProfileUser.username);
                              setSelectedProfileUser((prev) =>
                                prev
                                  ? {
                                      ...prev,
                                      followers: (prev.followers || []).filter(
                                        (f) =>
                                          f.toLowerCase() !==
                                          String(loggedInUser || '').toLowerCase()
                                      ),
                                    }
                                  : prev
                              );
                            }}
                          >
                            <span>Following</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="profile-home-btn follow-btn"
                            onClick={() => {
                              if (!selectedProfileUser?.username) return;
                              handleFollowUser(selectedProfileUser.username);
                              setSelectedProfileUser((prev) =>
                                prev
                                  ? {
                                      ...prev,
                                      followers: [
                                        ...(prev.followers || []),
                                        String(loggedInUser || '').toLowerCase(),
                                      ],
                                    }
                                  : prev
                              );
                            }}
                          >
                            <svg
                              width="15"
                              height="15"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <line x1="12" y1="5" x2="12" y2="19"></line>
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                            <span>Follow</span>
                          </button>
                        )}

                        {/* Friend Request Option */}
                        {(() => {
                          const targetUser = String(selectedProfileUser?.username || '').toLowerCase();
                          const isFriend =
                            friendsList.some((u) => u.toLowerCase() === targetUser) ||
                            (selectedProfileUser?.friends || []).some(
                              (u) => u.toLowerCase() === String(loggedInUser || '').toLowerCase()
                            );
                          const isPendingSent =
                            sentFriendRequests.some((u) => u.toLowerCase() === targetUser) ||
                            (selectedProfileUser?.friendRequestsReceived || []).some(
                              (u) => u.toLowerCase() === String(loggedInUser || '').toLowerCase()
                            );
                          const isPendingReceived =
                            receivedFriendRequests.some((u) => u.toLowerCase() === targetUser) ||
                            (selectedProfileUser?.friendRequestsSent || []).some(
                              (u) => u.toLowerCase() === String(loggedInUser || '').toLowerCase()
                            );

                          if (isFriend) {
                            return (
                              <button
                                type="button"
                                className="profile-home-btn friend-status-btn friends"
                                title="You are friends with this user"
                              >
                                <svg
                                  width="15"
                                  height="15"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <span>Friends</span>
                              </button>
                            );
                          }

                          if (isPendingReceived) {
                            return (
                              <button
                                type="button"
                                className="profile-home-btn friend-status-btn accept"
                                title="Accept friend request"
                                onClick={() => {
                                  if (!selectedProfileUser?.username) return;
                                  handleAcceptFriendRequest(selectedProfileUser.username);
                                  setSelectedProfileUser((prev) =>
                                    prev
                                      ? {
                                          ...prev,
                                          friends: [
                                            ...(prev.friends || []),
                                            String(loggedInUser || '').toLowerCase(),
                                          ],
                                          friendRequestsSent: (
                                            prev.friendRequestsSent || []
                                          ).filter(
                                            (u) =>
                                              u.toLowerCase() !==
                                              String(loggedInUser || '').toLowerCase()
                                          ),
                                        }
                                      : prev
                                  );
                                }}
                              >
                                <svg
                                  width="15"
                                  height="15"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                  <circle cx="9" cy="7" r="4"></circle>
                                  <polyline points="16 11 18 13 22 9"></polyline>
                                </svg>
                                <span>Accept Request</span>
                              </button>
                            );
                          }

                          if (isPendingSent) {
                            return (
                              <button
                                type="button"
                                className="profile-home-btn friend-status-btn pending"
                                title="Friend request sent (click to cancel)"
                                onClick={() => {
                                  if (!selectedProfileUser?.username) return;
                                  handleCancelFriendRequest(selectedProfileUser.username);
                                  setSelectedProfileUser((prev) =>
                                    prev
                                      ? {
                                          ...prev,
                                          friendRequestsReceived: (
                                            prev.friendRequestsReceived || []
                                          ).filter(
                                            (u) =>
                                              u.toLowerCase() !==
                                              String(loggedInUser || '').toLowerCase()
                                          ),
                                        }
                                      : prev
                                  );
                                }}
                              >
                                <svg
                                  width="15"
                                  height="15"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <circle cx="12" cy="12" r="10"></circle>
                                  <polyline points="12 6 12 12 14 14"></polyline>
                                </svg>
                                <span>Request Sent</span>
                              </button>
                            );
                          }

                          return (
                            <button
                              type="button"
                              className="profile-home-btn friend-status-btn add"
                              title={`Send friend request to @${selectedProfileUser?.username}`}
                              onClick={() => {
                                if (!selectedProfileUser?.username) return;
                                handleSendFriendRequest(selectedProfileUser.username);
                                setSelectedProfileUser((prev) =>
                                  prev
                                    ? {
                                        ...prev,
                                        friendRequestsReceived: [
                                          ...(prev.friendRequestsReceived || []),
                                          String(loggedInUser || '').toLowerCase(),
                                        ],
                                      }
                                    : prev
                                );
                              }}
                            >
                              <svg
                                width="15"
                                height="15"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <line x1="20" y1="8" x2="20" y2="14"></line>
                                <line x1="23" y1="11" x2="17" y2="11"></line>
                              </svg>
                              <span>Add Friend</span>
                            </button>
                          );
                        })()}

                        <button
                          type="button"
                          className="profile-home-btn message-btn"
                          title={`Message ${selectedProfileUser?.displayName || selectedProfileUser?.username}`}
                          onClick={() => handleOpenChatWithContact(selectedProfileUser)}
                        >
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                          </svg>
                          <span>Message</span>
                        </button>

                        <button
                          type="button"
                          className="profile-home-icon-btn"
                          title="Voice Call"
                          onClick={() => handleStartCall('voice', selectedProfileUser)}
                        >
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          className="profile-home-icon-btn"
                          title="Video Call"
                          onClick={() => handleStartCall('video', selectedProfileUser)}
                        >
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <polygon points="23 7 16 12 23 17 23 7"></polygon>
                            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Identity info */}
                <div className="profile-home-identity">
                  {(sendRequestFeedback || friendRequestActionFeedback) && (
                    <div
                      className={`profile-home-alert ${
                        (sendRequestFeedback?.type || friendRequestActionFeedback?.type) === 'error'
                          ? 'error'
                          : 'success'
                      }`}
                    >
                      <span>{sendRequestFeedback?.text || friendRequestActionFeedback?.text}</span>
                      <button
                        type="button"
                        className="profile-home-alert-close"
                        onClick={() => {
                          setSendRequestFeedback(null);
                          setFriendRequestActionFeedback(null);
                        }}
                        title="Dismiss"
                      >
                        ×
                      </button>
                    </div>
                  )}

                  <div className="profile-home-name-row">
                    <h1 className="profile-home-name">
                      {selectedProfileUser?.displayName || selectedProfileUser?.username}
                    </h1>
                    <span className="profile-home-badge" title="Registered User">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    </span>
                    {loggedInUser &&
                      String(selectedProfileUser?.username || '').toLowerCase() ===
                        String(loggedInUser).toLowerCase() && (
                        <span
                          className="contact-tab-badge secondary"
                          style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem' }}
                        >
                          You
                        </span>
                      )}
                  </div>
                  <span className="profile-home-handle">@{selectedProfileUser?.username}</span>

                  {selectedProfileUser?.status && (
                    <p className="profile-home-bio">{selectedProfileUser.status}</p>
                  )}

                  <div className="profile-home-meta-grid">
                    {selectedProfileUser?.location && (
                      <div className="profile-home-meta-item">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span>{selectedProfileUser.location}</span>
                      </div>
                    )}

                    {selectedProfileUser?.website && (
                      <div className="profile-home-meta-item">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="2" y1="12" x2="22" y2="12"></line>
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                        </svg>
                        <a
                          href={
                            selectedProfileUser.website.startsWith('http')
                              ? selectedProfileUser.website
                              : `https://${selectedProfileUser.website}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="profile-home-link"
                        >
                          {selectedProfileUser.website}
                        </a>
                      </div>
                    )}

                    {selectedProfileUser?.education && (
                      <div className="profile-home-meta-item">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                          <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                        </svg>
                        <span>{selectedProfileUser.education}</span>
                      </div>
                    )}

                    {selectedProfileUser?.employment && (
                      <div className="profile-home-meta-item">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                        </svg>
                        <span>{selectedProfileUser.employment}</span>
                      </div>
                    )}

                    {selectedProfileUser?.createdAt && (
                      <div className="profile-home-meta-item">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span>
                          Joined{' '}
                          {new Date(selectedProfileUser.createdAt).toLocaleDateString('en-US', {
                            month: 'long',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="profile-home-counts">
                    <div className="profile-home-count-item">
                      <strong>{(selectedProfileUser?.following || []).length}</strong>
                      <span>Following</span>
                    </div>
                    <div className="profile-home-count-item">
                      <strong>{(selectedProfileUser?.followers || []).length}</strong>
                      <span>Followers</span>
                    </div>
                    <div className="profile-home-count-item">
                      <strong>{(selectedProfileUser?.friends || []).length}</strong>
                      <span>Friends</span>
                    </div>
                    <div className="profile-home-count-item">
                      <strong>{profileUserPosts.length}</strong>
                      <span>Posts</span>
                    </div>
                  </div>
                </div>

                {/* Tabs Header */}
                <div className="profile-home-tabs">
                  <button
                    type="button"
                    className={`profile-home-tab ${profileActiveTab === 'posts' ? 'active' : ''}`}
                    onClick={() => setProfileActiveTab('posts')}
                  >
                    <span>Posts</span>
                    <span className="profile-home-tab-badge">{profileUserPosts.length}</span>
                  </button>
                  <button
                    type="button"
                    className={`profile-home-tab ${profileActiveTab === 'media' ? 'active' : ''}`}
                    onClick={() => setProfileActiveTab('media')}
                  >
                    <span>Media</span>
                  </button>
                  <button
                    type="button"
                    className={`profile-home-tab ${profileActiveTab === 'about' ? 'active' : ''}`}
                    onClick={() => setProfileActiveTab('about')}
                  >
                    <span>About</span>
                  </button>
                </div>

                {/* Tab Contents */}
                <div className="profile-home-tab-content">
                  {profileActiveTab === 'posts' && (
                    <div className="profile-home-posts-feed">
                      {isLoadingProfilePosts && profileUserPosts.length === 0 ? (
                        <div className="profile-home-loading">
                          <p>Loading posts...</p>
                        </div>
                      ) : profileUserPosts.length === 0 ? (
                        <div className="profile-home-empty">
                          <svg
                            width="42"
                            height="42"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#525252"
                            strokeWidth="1.5"
                          >
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                          </svg>
                          <h3 className="profile-home-empty-title">No posts yet</h3>
                          <p className="profile-home-empty-text">
                            When @{selectedProfileUser?.username} posts updates, photos, or videos, they will appear here.
                          </p>
                        </div>
                      ) : (
                        profileUserPosts.map((post) => {
                          const isPostOwner =
                            loggedInUser &&
                            String(post.author || '').toLowerCase() ===
                              String(loggedInUser).toLowerCase();
                          const hasLiked =
                            loggedInUser &&
                            (post.likes || []).includes(String(loggedInUser).toLowerCase());
                          const isCommentsOpen = Boolean(openCommentsPosts[post.id]);
                          const isVideo = Boolean(
                            post.video ||
                              post.mediaType === 'video' ||
                              (post.media &&
                                (post.media.startsWith('data:video') ||
                                  post.media.endsWith('.mp4') ||
                                  post.media.endsWith('.webm') ||
                                  post.media.endsWith('.mov') ||
                                  post.media.includes('/video/')))
                          );
                          const videoSrc = post.video || (isVideo ? post.media : null);
                          const imageSrc = !isVideo ? post.image || post.media : null;

                          return (
                            <article key={post.id} className="post-card">
                              <div className="post-header">
                                <div className="post-author-wrap">
                                  <div
                                    className="post-author-avatar"
                                    style={{
                                      backgroundColor: post.authorAvatar
                                        ? 'transparent'
                                        : getAvatarColor(
                                            post.authorName || post.author || 'User'
                                          ),
                                    }}
                                  >
                                    {post.authorAvatar ? (
                                      <img
                                        src={post.authorAvatar}
                                        alt={post.authorName || post.author}
                                      />
                                    ) : (
                                      <span>
                                        {getInitials(post.authorName || post.author || 'User')}
                                      </span>
                                    )}
                                  </div>
                                  <div className="post-author-meta">
                                    <span className="post-author">
                                      {post.authorName || post.author || 'User'}
                                    </span>
                                    <span className="post-handle">@{post.author || 'user'}</span>
                                  </div>
                                </div>
                                <span className="post-time">{post.time || post.timestamp}</span>
                              </div>

                              {post.content && <p className="post-content">{post.content}</p>}

                              {isVideo && videoSrc && (
                                <div className="post-media-video-wrap">
                                  <video
                                    src={videoSrc}
                                    controls
                                    playsInline
                                    preload="metadata"
                                    className="post-media-video"
                                  />
                                </div>
                              )}

                              {imageSrc && (
                                <div
                                  className="post-media-wrap"
                                  onClick={() => setSelectedPostImageModal(imageSrc)}
                                  title="Click to view full image"
                                >
                                  <img
                                    src={imageSrc}
                                    alt="Post attachment"
                                    className="post-media-image"
                                    loading="lazy"
                                  />
                                </div>
                              )}

                              <div className="post-footer">
                                <button
                                  type="button"
                                  className={`post-action-btn like-btn ${hasLiked ? 'liked' : ''}`}
                                  onClick={() => handleLikePost(post.id)}
                                  title="Like post"
                                >
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill={hasLiked ? 'currentColor' : 'none'}
                                    stroke="currentColor"
                                    strokeWidth="2"
                                  >
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                  </svg>
                                  <span>{(post.likes || []).length}</span>
                                </button>

                                <button
                                  type="button"
                                  className={`post-action-btn comment-btn ${isCommentsOpen ? 'active' : ''}`}
                                  onClick={() => toggleComments(post.id)}
                                  title="Comments"
                                  aria-expanded={isCommentsOpen}
                                >
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                  </svg>
                                  <span>
                                    {post.commentsCount ?? (post.comments || []).length}
                                  </span>
                                </button>

                                {isPostOwner && (
                                  <button
                                    type="button"
                                    className="post-action-btn delete-btn"
                                    onClick={() => handleDeletePost(post.id)}
                                    title="Delete post"
                                  >
                                    <svg
                                      width="15"
                                      height="15"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                    >
                                      <polyline points="3 6 5 6 21 6"></polyline>
                                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                    </svg>
                                    <span>Delete</span>
                                  </button>
                                )}
                              </div>

                              {isCommentsOpen && (
                                <div className="post-comments-section">
                                  {loggedInUser && (
                                    <form
                                      className="post-comment-form"
                                      onSubmit={(e) => {
                                        e.preventDefault();
                                        handleAddComment(post.id);
                                      }}
                                    >
                                      <div
                                        className="post-comment-input-avatar"
                                        style={{
                                          backgroundColor: profilePicture
                                            ? 'transparent'
                                            : getAvatarColor(loggedInUser),
                                        }}
                                      >
                                        {profilePicture ? (
                                          <img src={profilePicture} alt={loggedInUser} />
                                        ) : (
                                          <span>{getInitials(loggedInUser)}</span>
                                        )}
                                      </div>
                                      <div className="post-comment-input-wrap">
                                        <input
                                          type="text"
                                          className="post-comment-input"
                                          placeholder="Write a comment..."
                                          value={commentInputs[post.id] || ''}
                                          onChange={(e) =>
                                            setCommentInputs((prev) => ({
                                              ...prev,
                                              [post.id]: e.target.value,
                                            }))
                                          }
                                        />
                                        <button
                                          type="submit"
                                          className="post-comment-submit-btn"
                                          disabled={
                                            !(commentInputs[post.id] || '').trim() ||
                                            submittingCommentPostIds[post.id]
                                          }
                                        >
                                          {submittingCommentPostIds[post.id] ? (
                                            <span className="post-comment-spinner" />
                                          ) : (
                                            <svg
                                              width="14"
                                              height="14"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              stroke="currentColor"
                                              strokeWidth="2.5"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            >
                                              <line x1="22" y1="2" x2="11" y2="13"></line>
                                              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                            </svg>
                                          )}
                                        </button>
                                      </div>
                                    </form>
                                  )}

                                  <div className="post-comments-list">
                                    {(!post.comments || post.comments.length === 0) ? (
                                      <div className="post-no-comments">
                                        <span>No comments yet.</span>
                                      </div>
                                    ) : (
                                      post.comments.map((comment) => {
                                        const cId = comment.id || comment._id;
                                        const isCommentAuthor =
                                          loggedInUser &&
                                          String(comment.author || '').toLowerCase() ===
                                            String(loggedInUser).toLowerCase();
                                        const canDelete = isCommentAuthor || isPostOwner;

                                        return (
                                          <div key={cId} className="post-comment-item">
                                            <div
                                              className="post-comment-avatar"
                                              style={{
                                                backgroundColor: comment.authorAvatar
                                                  ? 'transparent'
                                                  : getAvatarColor(
                                                      comment.authorName ||
                                                        comment.author ||
                                                        'User'
                                                    ),
                                              }}
                                            >
                                              {comment.authorAvatar ? (
                                                <img
                                                  src={comment.authorAvatar}
                                                  alt={comment.authorName || comment.author}
                                                />
                                              ) : (
                                                <span>
                                                  {getInitials(
                                                    comment.authorName ||
                                                      comment.author ||
                                                      'User'
                                                  )}
                                                </span>
                                              )}
                                            </div>
                                            <div className="post-comment-body">
                                              <div className="post-comment-header">
                                                <div className="post-comment-author-info">
                                                  <span className="post-comment-author">
                                                    {comment.authorName ||
                                                      comment.author ||
                                                      'User'}
                                                  </span>
                                                  <span className="post-comment-handle">
                                                    @{comment.author || 'user'}
                                                  </span>
                                                  <span className="post-comment-time">
                                                    {comment.time ||
                                                      (comment.createdAt
                                                        ? new Date(
                                                            comment.createdAt
                                                          ).toLocaleTimeString([], {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                          })
                                                        : '')}
                                                  </span>
                                                </div>
                                                {canDelete && (
                                                  <button
                                                    type="button"
                                                    className="post-comment-delete-btn"
                                                    onClick={() =>
                                                      handleDeleteComment(post.id, cId)
                                                    }
                                                    disabled={deletingCommentIds[cId]}
                                                    title="Delete comment"
                                                  >
                                                    <svg
                                                      width="12"
                                                      height="12"
                                                      viewBox="0 0 24 24"
                                                      fill="none"
                                                      stroke="currentColor"
                                                      strokeWidth="2"
                                                    >
                                                      <line x1="18" y1="6" x2="6" y2="18"></line>
                                                      <line x1="6" y1="6" x2="18" y2="18"></line>
                                                    </svg>
                                                  </button>
                                                )}
                                              </div>
                                              <p className="post-comment-content">
                                                {comment.content}
                                              </p>
                                            </div>
                                          </div>
                                        );
                                      })
                                    )}
                                  </div>
                                </div>
                              )}
                            </article>
                          );
                        })
                      )}
                    </div>
                  )}

                  {profileActiveTab === 'media' && (
                    <div className="profile-home-media-gallery">
                      {(() => {
                        const mediaItems = profileUserPosts.filter((p) => {
                          const isVid = Boolean(
                            p.video ||
                              p.mediaType === 'video' ||
                              (p.media &&
                                (p.media.startsWith('data:video') ||
                                  p.media.endsWith('.mp4') ||
                                  p.media.endsWith('.webm') ||
                                  p.media.endsWith('.mov') ||
                                  p.media.includes('/video/')))
                          );
                          const vidSrc = p.video || (isVid ? p.media : null);
                          const imgSrc = !isVid ? p.image || p.media : null;
                          return Boolean(vidSrc || imgSrc);
                        });

                        if (mediaItems.length === 0) {
                          return (
                            <div className="profile-home-empty">
                              <svg
                                width="40"
                                height="40"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#525252"
                                strokeWidth="1.5"
                              >
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                <polyline points="21 15 16 10 5 21"></polyline>
                              </svg>
                              <h3 className="profile-home-empty-title">No media yet</h3>
                              <p className="profile-home-empty-text">
                                Photos and videos posted by @{selectedProfileUser?.username} will appear here.
                              </p>
                            </div>
                          );
                        }

                        return (
                          <div className="profile-home-media-grid">
                            {mediaItems.map((post) => {
                              const isVid = Boolean(
                                post.video ||
                                  post.mediaType === 'video' ||
                                  (post.media &&
                                    (post.media.startsWith('data:video') ||
                                      post.media.endsWith('.mp4') ||
                                      post.media.endsWith('.webm') ||
                                      post.media.endsWith('.mov') ||
                                      post.media.includes('/video/')))
                              );
                              const vidSrc = post.video || (isVid ? post.media : null);
                              const imgSrc = !isVid ? post.image || post.media : null;

                              if (isVid && vidSrc) {
                                return (
                                  <div key={post.id} className="profile-home-media-grid-item video">
                                    <video
                                      src={vidSrc}
                                      controls
                                      playsInline
                                      preload="metadata"
                                      className="profile-home-media-thumb"
                                    />
                                  </div>
                                );
                              }

                              return (
                                <div
                                  key={post.id}
                                  className="profile-home-media-grid-item"
                                  onClick={() => setSelectedPostImageModal(imgSrc)}
                                  title="Click to expand"
                                >
                                  <img
                                    src={imgSrc}
                                    alt="Media preview"
                                    className="profile-home-media-thumb"
                                    loading="lazy"
                                  />
                                </div>
                              );
                            })}
                          </div>
                        );
                      })()}
                    </div>
                  )}

                  {profileActiveTab === 'about' && (
                    <div className="profile-home-about-details">
                      <div className="profile-home-about-card">
                        <h4 className="profile-home-about-heading">About</h4>
                        <p className="profile-home-about-text">
                          {selectedProfileUser?.status || 'No bio provided yet.'}
                        </p>
                      </div>

                      {(selectedProfileUser?.skills || selectedProfileUser?.interests) && (
                        <div className="profile-home-about-card">
                          {selectedProfileUser?.skills && (
                            <div className="profile-home-badge-section">
                              <h4 className="profile-home-about-heading">Skills</h4>
                              <div className="profile-home-tags">
                                {selectedProfileUser.skills.split(',').map((skill, idx) => {
                                  const trimmed = skill.trim();
                                  if (!trimmed) return null;
                                  return (
                                    <span key={idx} className="profile-home-tag skill">
                                      {trimmed}
                                    </span>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {selectedProfileUser?.interests && (
                            <div className="profile-home-badge-section" style={{ marginTop: '1rem' }}>
                              <h4 className="profile-home-about-heading">Interests</h4>
                              <div className="profile-home-tags">
                                {selectedProfileUser.interests.split(',').map((interest, idx) => {
                                  const trimmed = interest.trim();
                                  if (!trimmed) return null;
                                  return (
                                    <span key={idx} className="profile-home-tag interest">
                                      {trimmed}
                                    </span>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="profile-home-about-card">
                        <h4 className="profile-home-about-heading">Profile Details</h4>
                        <div className="profile-home-info-list">
                          <div className="profile-home-info-row">
                            <span className="profile-home-info-label">Display Name</span>
                            <span className="profile-home-info-val">
                              {selectedProfileUser?.displayName || selectedProfileUser?.username}
                            </span>
                          </div>
                          <div className="profile-home-info-row">
                            <span className="profile-home-info-label">Username</span>
                            <span className="profile-home-info-val">
                              @{selectedProfileUser?.username}
                            </span>
                          </div>
                          {selectedProfileUser?.location && (
                            <div className="profile-home-info-row">
                              <span className="profile-home-info-label">Location</span>
                              <span className="profile-home-info-val">
                                {selectedProfileUser.location}
                              </span>
                            </div>
                          )}
                          {selectedProfileUser?.website && (
                            <div className="profile-home-info-row">
                              <span className="profile-home-info-label">Website</span>
                              <a
                                href={
                                  selectedProfileUser.website.startsWith('http')
                                    ? selectedProfileUser.website
                                    : `https://${selectedProfileUser.website}`
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="profile-home-info-val profile-home-link"
                              >
                                {selectedProfileUser.website}
                              </a>
                            </div>
                          )}
                          {selectedProfileUser?.education && (
                            <div className="profile-home-info-row">
                              <span className="profile-home-info-label">Education</span>
                              <span className="profile-home-info-val">
                                {selectedProfileUser.education}
                              </span>
                            </div>
                          )}
                          {selectedProfileUser?.employment && (
                            <div className="profile-home-info-row">
                              <span className="profile-home-info-label">Employment</span>
                              <span className="profile-home-info-val">
                                {selectedProfileUser.employment}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Post Image Lightbox in Profile */}
                {selectedPostImageModal && (
                  <div
                    className="post-image-modal-backdrop"
                    onClick={() => setSelectedPostImageModal(null)}
                  >
                    <div
                      className="post-image-modal-content"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        className="post-image-modal-close-btn"
                        onClick={() => setSelectedPostImageModal(null)}
                        title="Close image"
                        aria-label="Close image"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                      <img
                        src={selectedPostImageModal}
                        alt="Enlarged view"
                        className="post-image-modal-img"
                      />
                    </div>
                  </div>
                )}
              </div>
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
          ) : currentView === 'whats-happening' || currentView === 'people-i-follow' || currentView === 'friends-only' ? (
            <div className="whats-happening-space" id="whats-happening-space">
              <div className="post-creator-container" id="post-creator-container">
                {/* Feed Switcher Tabs: What's Happening Around You vs People I Follow vs Friends-only feed */}
                <div className="feed-tabs-switcher" role="tablist" aria-label="Feed selection tabs">
                  <button
                    type="button"
                    role="tab"
                    id="tab-whats-happening"
                    aria-selected={currentView === 'whats-happening'}
                    className={`feed-tab-btn ${currentView === 'whats-happening' ? 'active' : ''}`}
                    onClick={() => navigateTo('whats-happening')}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                    </svg>
                    <span>What's Happening</span>
                  </button>
                  <button
                    type="button"
                    role="tab"
                    id="tab-people-i-follow"
                    aria-selected={currentView === 'people-i-follow'}
                    className={`feed-tab-btn ${currentView === 'people-i-follow' ? 'active' : ''}`}
                    onClick={() => navigateTo('people-i-follow')}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    <span>People I Follow</span>
                    {followingList.length > 0 && (
                      <span className="feed-tab-badge">{followingList.length}</span>
                    )}
                  </button>
                  <button
                    type="button"
                    role="tab"
                    id="tab-friends-only"
                    aria-selected={currentView === 'friends-only'}
                    className={`feed-tab-btn ${currentView === 'friends-only' ? 'active' : ''}`}
                    onClick={() => navigateTo('friends-only')}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    <span>Friends-only feed</span>
                    {effectiveFriendsList.length > 0 && (
                      <span className="feed-tab-badge">{effectiveFriendsList.length}</span>
                    )}
                  </button>
                </div>

                {/* Header with Title and Live Updates Refresh */}
                <div className="whats-happening-header">
                  <div className="whats-happening-title-wrap">
                    <h2 className="whats-happening-title">
                      {currentView === 'friends-only'
                        ? 'Friends-only feed'
                        : currentView === 'people-i-follow'
                        ? 'People I Follow'
                        : "What's Happening Around You"}
                    </h2>
                    <p className="whats-happening-subtitle">
                      {currentView === 'friends-only'
                        ? `Exclusive moments and updates from your friends (${effectiveFriendsList.length}) and yourself`
                        : currentView === 'people-i-follow'
                        ? `Updates and moments from people you follow (${followingList.length}) and yourself`
                        : 'Real-time public updates and moments from everyone'}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="whats-happening-refresh-btn"
                    onClick={fetchPosts}
                    title="Refresh feed"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="23 4 23 10 17 10"></polyline>
                      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                    </svg>
                    <span>Live Feed</span>
                  </button>
                </div>

                {/* Create Post Card */}
                <div
                  className="create-post-card"
                  id="create-post-card"
                >
                  <div className="create-post-header-row">
                    <div
                      className="create-post-user-avatar"
                      style={{
                        backgroundColor: profilePicture ? 'transparent' : getAvatarColor(loggedInUser || 'User'),
                      }}
                    >
                      {profilePicture ? (
                        <img src={profilePicture} alt={loggedInUser || 'User'} />
                      ) : (
                        <span>{getInitials(loggedInUser || 'User')}</span>
                      )}
                    </div>
                    <span className="create-post-user-name">@{loggedInUser || 'user'}</span>
                  </div>
                  <textarea
                    id="create-post-textarea"
                    className="create-post-textarea"
                    placeholder={
                      currentView === 'friends-only'
                        ? 'Share something with your friends...'
                        : currentView === 'people-i-follow'
                        ? 'Share an update with the people you follow...'
                        : "What's happening around you?"
                    }
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    rows={3}
                    aria-label="Create a text post"
                  />
                  {postFeedback && (
                    <div className={`create-post-feedback ${postFeedback.type}`} role="alert">
                      {postFeedback.text}
                    </div>
                  )}

                  {/* Image preview before posting */}
                  {postImage && (
                    <div className="create-post-preview">
                      <img src={postImage} alt="Post preview" className="create-post-preview-img" />
                      <button
                        type="button"
                        className="create-post-remove-img-btn"
                        onClick={handleRemovePostImage}
                        title="Remove image"
                        aria-label="Remove image"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                  )}

                  {/* Video preview before posting */}
                  {postVideo && (
                    <div className="create-post-video-preview-wrap">
                      <video
                        src={postVideo}
                        controls
                        playsInline
                        preload="metadata"
                        className="create-post-video-preview"
                      />
                      <button
                        type="button"
                        className="create-post-remove-img-btn"
                        onClick={handleRemovePostVideo}
                        title="Remove video"
                        aria-label="Remove video"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                  )}

                  <input
                    type="file"
                    ref={postImageInputRef}
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handlePostImageSelect}
                  />

                  <input
                    type="file"
                    ref={postVideoInputRef}
                    accept="video/*"
                    style={{ display: 'none' }}
                    onChange={handlePostVideoSelect}
                  />

                  <div className="create-post-actions">
                    <div className="create-post-toolbar">
                      <button
                        type="button"
                        className="create-post-attach-btn"
                        onClick={() => postImageInputRef.current?.click()}
                        disabled={isSubmittingPost || isUploadingPostImage || isUploadingPostVideo}
                        title="Add an image to your post"
                      >
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <circle cx="8.5" cy="8.5" r="1.5"></circle>
                          <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                        <span>{isUploadingPostImage ? 'Processing...' : postImage ? 'Change Image' : 'Image'}</span>
                      </button>

                      <button
                        type="button"
                        className="create-post-attach-btn"
                        onClick={() => postVideoInputRef.current?.click()}
                        disabled={isSubmittingPost || isUploadingPostImage || isUploadingPostVideo}
                        title="Add a video to your post"
                      >
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="23 7 16 12 23 17 23 7"></polygon>
                          <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                        </svg>
                        <span>{isUploadingPostVideo ? 'Loading Video...' : postVideo ? 'Change Video' : 'Video'}</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      id="create-post-btn"
                      className="create-post-btn"
                      onClick={handleCreatePost}
                      disabled={(!postContent.trim() && !postImage && !postVideo) || isSubmittingPost || isUploadingPostImage || isUploadingPostVideo}
                    >
                      {isSubmittingPost ? 'Posting...' : 'Post'}
                    </button>
                  </div>
                </div>

                {/* Posts Feed */}
                {(() => {
                  const isFriendsFeed = currentView === 'friends-only';
                  const isFollowingFeed = currentView === 'people-i-follow';
                  let displayedPosts = posts;

                  if (isFriendsFeed) {
                    displayedPosts = posts.filter((post) => {
                      const authorLower = String(post.author || '').toLowerCase();
                      const userLower = String(loggedInUser || '').toLowerCase();
                      return (
                        authorLower === userLower ||
                        effectiveFriendsList.some((f) => String(f).toLowerCase() === authorLower)
                      );
                    });
                  } else if (isFollowingFeed) {
                    displayedPosts = posts.filter((post) => {
                      const authorLower = String(post.author || '').toLowerCase();
                      const userLower = String(loggedInUser || '').toLowerCase();
                      return (
                        authorLower === userLower ||
                        followingList.some((f) => String(f).toLowerCase() === authorLower)
                      );
                    });
                  }

                  return (
                    <div className="posts-list" id="posts-list">
                      {displayedPosts.length === 0 ? (
                        <div className="posts-empty-state">
                          {isFriendsFeed ? (
                            <>
                              <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="1.5">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                              </svg>
                              <p className="posts-empty-title">
                                {effectiveFriendsList.length === 0
                                  ? 'No friends connected yet'
                                  : 'No posts from your friends yet'}
                              </p>
                              <p className="posts-empty-subtitle">
                                {effectiveFriendsList.length === 0
                                  ? 'Connect with friends via Social Connections to see their exclusive posts and updates here.'
                                  : 'When your friends share moments, they will appear here. Or start the conversation with an update above!'}
                              </p>
                              {effectiveFriendsList.length === 0 && (
                                <button
                                  type="button"
                                  className="discover-follow-cta-btn"
                                  onClick={() => navigateTo('social')}
                                >
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                    <line x1="20" y1="8" x2="20" y2="14"></line>
                                    <line x1="23" y1="11" x2="17" y2="11"></line>
                                  </svg>
                                  <span>Find Friends to Connect</span>
                                </button>
                              )}
                            </>
                          ) : isFollowingFeed ? (
                            <>
                              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="1.5">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                              </svg>
                              <p className="posts-empty-title">
                                {followingList.length === 0
                                  ? "You're not following anyone yet"
                                  : "No posts from people you follow yet"}
                              </p>
                              <p className="posts-empty-subtitle">
                                {followingList.length === 0
                                  ? "Follow people from Social Connections to see their posts and moments here."
                                  : "When people you follow share moments, they'll show up here. You can also share an update above!"}
                              </p>
                              {followingList.length === 0 && (
                                <button
                                  type="button"
                                  className="discover-follow-cta-btn"
                                  onClick={() => navigateTo('social')}
                                >
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                    <line x1="20" y1="8" x2="20" y2="14"></line>
                                    <line x1="23" y1="11" x2="17" y2="11"></line>
                                  </svg>
                                  <span>Find People to Follow</span>
                                </button>
                              )}
                            </>
                          ) : (
                            <>
                              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#525252" strokeWidth="1.5">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                              </svg>
                              <p className="posts-empty-title">No posts around you yet</p>
                              <p className="posts-empty-subtitle">Be the first to share an update with everyone!</p>
                            </>
                          )}
                        </div>
                      ) : (
                        displayedPosts.map((post) => (
                          <article key={post.id} className="post-card">
                            <div className="post-header">
                              <div
                                className="post-author-wrap"
                                onClick={() => handleOpenUserProfile(post.author)}
                                style={{ cursor: 'pointer' }}
                                title={`Open ${post.authorName || post.author}'s home page`}
                              >
                                <div
                                  className="post-author-avatar"
                                  style={{
                                    backgroundColor: post.authorAvatar
                                      ? 'transparent'
                                      : getAvatarColor(post.authorName || post.author || 'User'),
                                  }}
                                >
                                  {post.authorAvatar ? (
                                    <img src={post.authorAvatar} alt={post.authorName || post.author} />
                                  ) : (
                                    <span>{getInitials(post.authorName || post.author || 'User')}</span>
                                  )}
                                </div>
                                <div className="post-author-meta">
                                  <span className="post-author">{post.authorName || post.author || 'User'}</span>
                                  <span className="post-handle">@{post.author || 'user'}</span>
                                </div>
                              </div>
                              <span className="post-time">
                                {post.time || post.timestamp}
                                {post.isEdited && (
                                  <span
                                    className="post-edited-tag"
                                    title={
                                      post.editedAt
                                        ? `Edited at ${new Date(post.editedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                                        : 'Edited'
                                    }
                                  >
                                    {' '}· Edited
                                  </span>
                                )}
                              </span>
                            </div>
                            {editingPostId === post.id ? (
                              <div className="post-edit-container">
                                <textarea
                                  className="post-edit-textarea"
                                  value={editingPostContent}
                                  onChange={(e) => setEditingPostContent(e.target.value)}
                                  rows={3}
                                  placeholder="Edit your post..."
                                  autoFocus
                                  aria-label="Edit post content"
                                />
                                {editingPostImage && (
                                  <div className="post-edit-image-preview-wrap">
                                    <img src={editingPostImage} alt="Post preview" className="post-edit-image-preview" />
                                    <button
                                      type="button"
                                      className="post-edit-image-remove-btn"
                                      onClick={() => setEditingPostImage(null)}
                                      title="Remove image"
                                      aria-label="Remove image"
                                    >
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                      </svg>
                                    </button>
                                  </div>
                                )}
                                {editingPostVideo && (
                                  <div className="post-edit-video-preview-wrap">
                                    <video
                                      src={editingPostVideo}
                                      controls
                                      playsInline
                                      preload="metadata"
                                      className="post-edit-video-preview"
                                    />
                                    <button
                                      type="button"
                                      className="post-edit-image-remove-btn"
                                      onClick={() => setEditingPostVideo(null)}
                                      title="Remove video"
                                      aria-label="Remove video"
                                    >
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                      </svg>
                                    </button>
                                  </div>
                                )}
                                <input
                                  type="file"
                                  accept="image/*"
                                  ref={editPostImageInputRef}
                                  style={{ display: 'none' }}
                                  onChange={handleEditPostImageSelect}
                                />
                                <input
                                  type="file"
                                  accept="video/*"
                                  ref={editPostVideoInputRef}
                                  style={{ display: 'none' }}
                                  onChange={handleEditPostVideoSelect}
                                />
                                {editPostFeedback && (
                                  <div className="post-edit-feedback-error" role="alert">
                                    {editPostFeedback}
                                  </div>
                                )}
                                <div className="post-edit-actions-row">
                                  <div className="post-edit-toolbar">
                                    <button
                                      type="button"
                                      className="post-edit-attach-btn"
                                      onClick={() => editPostImageInputRef.current?.click()}
                                      disabled={isSavingPostEdit}
                                      title={editingPostImage ? "Change image" : "Add image"}
                                    >
                                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                        <polyline points="21 15 16 10 5 21"></polyline>
                                      </svg>
                                      <span>{editingPostImage ? 'Change Image' : 'Image'}</span>
                                    </button>
                                    <button
                                      type="button"
                                      className="post-edit-attach-btn"
                                      onClick={() => editPostVideoInputRef.current?.click()}
                                      disabled={isSavingPostEdit}
                                      title={editingPostVideo ? "Change video" : "Add video"}
                                    >
                                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polygon points="23 7 16 12 23 17 23 7"></polygon>
                                        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                                      </svg>
                                      <span>{editingPostVideo ? 'Change Video' : 'Video'}</span>
                                    </button>
                                  </div>
                                  <div className="post-edit-actions">
                                    <button
                                      type="button"
                                      className="post-edit-btn cancel"
                                      onClick={handleCancelEditPost}
                                      disabled={isSavingPostEdit}
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      type="button"
                                      className="post-edit-btn save"
                                      onClick={() => handleSaveEditPost(post.id)}
                                      disabled={(!editingPostContent.trim() && !editingPostImage && !editingPostVideo) || isSavingPostEdit}
                                    >
                                      {isSavingPostEdit ? 'Saving...' : 'Save'}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <>
                                {post.content && <p className="post-content">{post.content}</p>}
                                {(() => {
                                  const isVideo = Boolean(
                                    post.video ||
                                    post.mediaType === 'video' ||
                                    (post.media && (post.media.startsWith('data:video') || post.media.endsWith('.mp4') || post.media.endsWith('.webm') || post.media.endsWith('.mov') || post.media.includes('/video/')))
                                  );
                                  const videoSrc = post.video || (isVideo ? post.media : null);
                                  const imageSrc = !isVideo ? (post.image || post.media) : null;

                                  if (isVideo && videoSrc) {
                                    return (
                                      <div className="post-media-video-wrap">
                                        <video
                                          src={videoSrc}
                                          controls
                                          playsInline
                                          preload="metadata"
                                          className="post-media-video"
                                        />
                                      </div>
                                    );
                                  }

                                  if (imageSrc) {
                                    return (
                                      <div
                                        className="post-media-wrap"
                                        onClick={() => setSelectedPostImageModal(imageSrc)}
                                        title="Click to view full image"
                                      >
                                        <img
                                          src={imageSrc}
                                          alt="Post attachment"
                                          className="post-media-image"
                                          loading="lazy"
                                        />
                                      </div>
                                    );
                                  }

                                  return null;
                                })()}
                              </>
                            )}

                            <div className="post-footer">
                              <button
                                type="button"
                                className={`post-action-btn like-btn ${(post.likes || []).includes(String(loggedInUser).toLowerCase()) ? 'liked' : ''}`}
                                onClick={() => handleLikePost(post.id)}
                                title="Like post"
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill={(post.likes || []).includes(String(loggedInUser).toLowerCase()) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                </svg>
                                <span>{(post.likes || []).length > 0 ? (post.likes || []).length : 'Like'}</span>
                              </button>

                              <button
                                type="button"
                                className={`post-action-btn comment-btn ${openCommentsPosts[post.id] ? 'active' : ''}`}
                                onClick={() => toggleComments(post.id)}
                                title="Comments"
                                aria-expanded={Boolean(openCommentsPosts[post.id])}
                              >
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                                </svg>
                                <span>{(post.comments || []).length > 0 ? (post.comments || []).length : 'Comment'}</span>
                              </button>

                              {post.author && loggedInUser && String(post.author).toLowerCase() === String(loggedInUser).toLowerCase() && (
                                <>
                                  {editingPostId !== post.id && (
                                    <button
                                      type="button"
                                      className="post-action-btn edit-btn"
                                      onClick={() => handleStartEditPost(post)}
                                      title="Edit post"
                                    >
                                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                      </svg>
                                      <span>Edit</span>
                                    </button>
                                  )}

                                  <button
                                    type="button"
                                    className="post-action-btn delete-btn"
                                    onClick={() => handleDeletePost(post.id)}
                                    title="Delete post"
                                  >
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                      <polyline points="3 6 5 6 21 6"></polyline>
                                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                    </svg>
                                    <span>Delete</span>
                                  </button>
                                </>
                              )}
                            </div>

                            {/* Comment Section */}
                            {openCommentsPosts[post.id] && (
                              <div className="post-comments-section" id={`comments-${post.id}`}>
                                {/* Comment Input Box */}
                                <form
                                  className="post-comment-form"
                                  onSubmit={(e) => {
                                    e.preventDefault();
                                    handleAddComment(post.id);
                                  }}
                                >
                                  <div
                                    className="post-comment-input-avatar"
                                    style={{
                                      backgroundColor: profilePicture ? 'transparent' : getAvatarColor(loggedInUser || 'User'),
                                    }}
                                  >
                                    {profilePicture ? (
                                      <img src={profilePicture} alt={loggedInUser || 'User'} />
                                    ) : (
                                      <span>{getInitials(loggedInUser || 'User')}</span>
                                    )}
                                  </div>
                                  <div className="post-comment-input-wrap">
                                    <input
                                      type="text"
                                      className="post-comment-input"
                                      placeholder="Write a comment..."
                                      value={commentInputs[post.id] || ''}
                                      onChange={(e) =>
                                        setCommentInputs((prev) => ({ ...prev, [post.id]: e.target.value }))
                                      }
                                      maxLength={500}
                                    />
                                    <button
                                      type="submit"
                                      className="post-comment-submit-btn"
                                      disabled={
                                        !(commentInputs[post.id] || '').trim() ||
                                        submittingCommentPostIds[post.id]
                                      }
                                      title="Post comment"
                                      aria-label="Post comment"
                                    >
                                      {submittingCommentPostIds[post.id] ? (
                                        <span className="post-comment-spinner" />
                                      ) : (
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                          <line x1="22" y1="2" x2="11" y2="13"></line>
                                          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                        </svg>
                                      )}
                                    </button>
                                  </div>
                                </form>

                                {/* Comments List */}
                                <div className="post-comments-list">
                                  {(!post.comments || post.comments.length === 0) ? (
                                    <div className="post-no-comments">
                                      <span>No comments yet. Be the first to share your thoughts!</span>
                                    </div>
                                  ) : (
                                    post.comments.map((comment) => {
                                      const cId = comment.id || comment._id;
                                      const isCommentAuthor =
                                        loggedInUser &&
                                        String(comment.author || '').toLowerCase() === String(loggedInUser).toLowerCase();
                                      const isPostAuthor =
                                        loggedInUser &&
                                        String(post.author || '').toLowerCase() === String(loggedInUser).toLowerCase();
                                      const canDelete = isCommentAuthor || isPostAuthor;

                                      return (
                                        <div key={cId} className="post-comment-item">
                                          <div
                                            className="post-comment-avatar"
                                            onClick={() => handleOpenUserProfile(comment.author)}
                                            style={{
                                              cursor: 'pointer',
                                              backgroundColor: comment.authorAvatar
                                                ? 'transparent'
                                                : getAvatarColor(comment.authorName || comment.author || 'User'),
                                            }}
                                            title={`Open ${comment.authorName || comment.author}'s home page`}
                                          >
                                            {comment.authorAvatar ? (
                                              <img src={comment.authorAvatar} alt={comment.authorName || comment.author} />
                                            ) : (
                                              <span>{getInitials(comment.authorName || comment.author || 'User')}</span>
                                            )}
                                          </div>
                                          <div className="post-comment-body">
                                            <div className="post-comment-header">
                                              <div
                                                className="post-comment-author-info"
                                                onClick={() => handleOpenUserProfile(comment.author)}
                                                style={{ cursor: 'pointer' }}
                                                title={`Open ${comment.authorName || comment.author}'s home page`}
                                              >
                                                <span className="post-comment-author">
                                                  {comment.authorName || comment.author || 'User'}
                                                </span>
                                                <span className="post-comment-handle">@{comment.author || 'user'}</span>
                                                {comment.time && (
                                                  <span className="post-comment-time">· {comment.time}</span>
                                                )}
                                              </div>
                                              {canDelete && (
                                                <button
                                                  type="button"
                                                  className="post-comment-delete-btn"
                                                  onClick={() => handleDeleteComment(post.id, cId)}
                                                  disabled={deletingCommentIds[cId]}
                                                  title="Delete comment"
                                                  aria-label="Delete comment"
                                                >
                                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <polyline points="3 6 5 6 21 6"></polyline>
                                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                  </svg>
                                                </button>
                                              )}
                                            </div>
                                            <p className="post-comment-content">{comment.content}</p>
                                          </div>
                                        </div>
                                      );
                                    })
                                  )}
                                </div>
                              </div>
                            )}
                          </article>
                        ))
                      )}
                    </div>
                  );
                })()}

                {/* Fullscreen Post Image Modal / Lightbox */}
                {selectedPostImageModal && (
                  <div
                    className="post-image-modal-backdrop"
                    onClick={() => setSelectedPostImageModal(null)}
                  >
                    <div className="post-image-modal-content" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        className="post-image-modal-close-btn"
                        onClick={() => setSelectedPostImageModal(null)}
                        title="Close image"
                        aria-label="Close image"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                      <img src={selectedPostImageModal} alt="Enlarged view" className="post-image-modal-img" />
                    </div>
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
          ) : currentView === 'messages' ? (
            <div className="chat-box-space" id="chat-box-space">
              <div className="chat-box-container" id="chat-box-container">
                {activeChatContact ? (
                  <>
                    <div className="chat-box-header">
                      <div className="chat-header-left">
                        <button
                          type="button"
                          className="chat-back-btn"
                          id="chat-back-to-contacts-btn"
                          onClick={() => {
                            setActiveChatContact(null);
                            try {
                              localStorage.removeItem('assistance_active_chat_contact');
                            } catch {}
                          }}
                          title="Back to All Messages"
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                          </svg>
                          <span>Messages</span>
                        </button>

                        <div className="chat-header-user">
                          <div
                            className="chat-header-avatar"
                            style={{
                              backgroundColor: activeChatContact.avatar
                                ? 'transparent'
                                : getAvatarColor(activeChatContact.name || activeChatContact.username),
                            }}
                          >
                            {activeChatContact.avatar ? (
                              <img
                                src={activeChatContact.avatar}
                                alt={activeChatContact.name}
                                className="chat-avatar-img"
                              />
                            ) : (
                              <span>
                                {getInitials(activeChatContact.name || activeChatContact.username)}
                              </span>
                            )}
                            <span className="chat-header-online-dot"></span>
                          </div>
                          <div className="chat-header-info">
                            <div className="chat-header-name-row">
                              <span className="chat-header-name">{activeChatContact.name}</span>
                              {activeChatContact.username && (
                                <span className="chat-header-username">
                                  @{activeChatContact.username}
                                </span>
                              )}
                            </div>
                            <span className="chat-header-status">
                              {activeChatContact.status || activeChatContact.phone || 'Active on Assistance'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Top Right Side Action Icons for Voice Call and Video Call */}
                      <div className="chat-header-actions" id="chat-header-actions">
                        <button
                          type="button"
                          className="chat-header-action-btn voice-call-btn"
                          id="chat-voice-call-btn"
                          onClick={() => handleStartCall('voice')}
                          title={`Voice call with ${activeChatContact.name || 'contact'}`}
                          aria-label={`Voice call with ${activeChatContact.name || 'contact'}`}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                          </svg>
                        </button>

                        <button
                          type="button"
                          className="chat-header-action-btn video-call-btn"
                          id="chat-video-call-btn"
                          onClick={() => handleStartCall('video')}
                          title={`Video call with ${activeChatContact.name || 'contact'}`}
                          aria-label={`Video call with ${activeChatContact.name || 'contact'}`}
                        >
                          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="23 7 16 12 23 17 23 7"></polygon>
                            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="chat-box-messages-list" id="chat-messages-container">
                      <div className="chat-box-start-notice">
                        <div
                          className="chat-start-avatar"
                          style={{
                            backgroundColor: activeChatContact.avatar
                              ? 'transparent'
                              : getAvatarColor(activeChatContact.name || activeChatContact.username),
                          }}
                        >
                          {activeChatContact.avatar ? (
                            <img
                              src={activeChatContact.avatar}
                              alt={activeChatContact.name}
                              className="chat-avatar-img"
                            />
                          ) : (
                            <span>
                              {getInitials(activeChatContact.name || activeChatContact.username)}
                            </span>
                          )}
                        </div>
                        <h3 className="chat-start-title">{activeChatContact.name}</h3>
                        <p className="chat-start-subtitle">
                          {activeChatContact.username ? `@${activeChatContact.username} • ` : ''}
                          {activeChatContact.phone || 'Assistance Contact'}
                        </p>
                        <span className="chat-start-badge">Direct Message Box</span>
                      </div>

                      {(() => {
                        const contactKey = getActiveChatKey(activeChatContact);
                        const list =
                          (activeChatContact &&
                            (chatMessages[contactKey] ||
                              (activeChatContact.username &&
                                chatMessages[activeChatContact.username.toLowerCase()]) ||
                              (activeChatContact.username &&
                                chatMessages[activeChatContact.username]) ||
                              (activeChatContact.phone &&
                                chatMessages[activeChatContact.phone]) ||
                              chatMessages[activeChatContact.name])) ||
                          [];

                        return list.map((msg) => {
                          const isSent = isMessageSentByMe(msg, activeChatContact);

                          return (
                            <div
                              key={msg.id || msg._id || msg.timestamp || Math.random()}
                              className={`chat-bubble-row ${isSent ? 'sent' : 'received'}`}
                            >
                              {!isSent && (
                                <div
                                  className="chat-bubble-avatar"
                                  style={{
                                    backgroundColor: activeChatContact.avatar
                                      ? 'transparent'
                                      : getAvatarColor(
                                          activeChatContact.name || activeChatContact.username
                                        ),
                                  }}
                                  title={activeChatContact.name}
                                >
                                  {activeChatContact.avatar ? (
                                    <img
                                      src={activeChatContact.avatar}
                                      alt={activeChatContact.name}
                                    />
                                  ) : (
                                    <span>
                                      {getInitials(
                                        activeChatContact.name || activeChatContact.username
                                      )}
                                    </span>
                                  )}
                                </div>
                              )}
                              <div
                                className={`chat-bubble ${isSent ? 'sent' : 'received'}`}
                              >
                                {!isSent && (
                                  <span className="chat-bubble-sender-name">
                                    {msg.senderName || activeChatContact.name}
                                  </span>
                                )}
                                <p className="chat-bubble-text">{msg.text}</p>
                                <span className="chat-bubble-time">{msg.time}</span>
                              </div>
                            </div>
                          );
                        });
                      })()}
                      <div ref={messagesEndRef} />
                    </div>

                    <form className="chat-box-input-form" onSubmit={handleSendChatMessage}>
                      <input
                        type="text"
                        className="chat-box-input"
                        placeholder={`Message ${activeChatContact.name}...`}
                        value={messageInputText}
                        onChange={(e) => setMessageInputText(e.target.value)}
                        autoFocus
                      />
                      <button
                        type="submit"
                        className="chat-box-send-btn"
                        disabled={!messageInputText.trim()}
                        aria-label="Send message"
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="22" y1="2" x2="11" y2="13"></line>
                          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                        <span>Send</span>
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="chat-inbox-container" id="chat-inbox-container">
                    <div className="chat-inbox-header">
                      <div className="chat-inbox-title-row">
                        <h2 className="chat-inbox-title">Messages</h2>
                        {totalUnreadMessages > 0 && (
                          <span className="chat-inbox-unread-count">{totalUnreadMessages} unread</span>
                        )}
                      </div>
                      <div className="chat-inbox-search-box">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input
                          type="text"
                          className="chat-inbox-search-input"
                          placeholder="Search conversations..."
                          value={inboxSearchQuery}
                          onChange={(e) => setInboxSearchQuery(e.target.value)}
                        />
                        {inboxSearchQuery && (
                          <button
                            type="button"
                            className="chat-inbox-search-clear"
                            onClick={() => setInboxSearchQuery('')}
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="chat-inbox-list">
                      {recentConversations.filter((c) => {
                        if (!inboxSearchQuery.trim()) return true;
                        const q = inboxSearchQuery.trim().toLowerCase();
                        return (
                          (c.contactName && c.contactName.toLowerCase().includes(q)) ||
                          (c.contact && c.contact.toLowerCase().includes(q)) ||
                          (c.lastMessage && c.lastMessage.toLowerCase().includes(q))
                        );
                      }).length === 0 ? (
                        <div className="chat-box-empty-fallback">
                          <div className="chat-fallback-icon">
                            <svg
                              width="48"
                              height="48"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            >
                              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                          </div>
                          <h3 className="chat-fallback-title">No conversations yet</h3>
                          <p className="chat-fallback-desc">
                            Click on any contact in My Contacts or Social Connections to start chatting.
                          </p>
                          <div className="chat-fallback-actions">
                            <button
                              type="button"
                              className="chat-fallback-btn"
                              onClick={() => navigateTo('contacts')}
                            >
                              My Contacts
                            </button>
                            <button
                              type="button"
                              className="chat-fallback-btn secondary"
                              onClick={() => navigateTo('social')}
                            >
                              Social Connections
                            </button>
                          </div>
                        </div>
                      ) : (
                        recentConversations.filter((c) => {
                          if (!inboxSearchQuery.trim()) return true;
                          const q = inboxSearchQuery.trim().toLowerCase();
                          return (
                            (c.contactName && c.contactName.toLowerCase().includes(q)) ||
                            (c.contact && c.contact.toLowerCase().includes(q)) ||
                            (c.lastMessage && c.lastMessage.toLowerCase().includes(q))
                          );
                        }).map((conv) => (
                          <div
                            key={conv.contact}
                            className={`chat-inbox-item ${conv.unread > 0 ? 'unread' : ''}`}
                            onClick={() => {
                              handleOpenChatWithContact({
                                name: conv.contactName || conv.contact,
                                username: conv.username || conv.contact,
                                phone: conv.phone || '',
                                avatar: conv.avatar || '',
                                status: conv.status || '',
                              });
                            }}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleOpenChatWithContact({
                                  name: conv.contactName || conv.contact,
                                  username: conv.username || conv.contact,
                                  phone: conv.phone || '',
                                  avatar: conv.avatar || '',
                                  status: conv.status || '',
                                });
                              }
                            }}
                          >
                            <div
                              className="chat-inbox-avatar"
                              style={{
                                backgroundColor: conv.avatar
                                  ? 'transparent'
                                  : getAvatarColor(conv.contactName || conv.contact),
                              }}
                            >
                              {conv.avatar ? (
                                <img src={conv.avatar} alt={conv.contactName} />
                              ) : (
                                <span>{getInitials(conv.contactName || conv.contact)}</span>
                              )}
                              <span className="chat-online-dot"></span>
                            </div>

                            <div className="chat-inbox-info">
                              <div className="chat-inbox-top-row">
                                <span className="chat-inbox-name">{conv.contactName || conv.contact}</span>
                                <span className="chat-inbox-time">{conv.lastTime}</span>
                              </div>
                              <div className="chat-inbox-bottom-row">
                                <p className="chat-inbox-snippet">
                                  {conv.isSentByMe ? <span className="chat-snippet-you">You: </span> : null}
                                  {conv.lastMessage}
                                </p>
                                {conv.unread > 0 && (
                                  <span className="chat-inbox-badge">{conv.unread}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : currentView === 'voice-and-video-call' ? (
            <div className="call-hub-space" id="call-hub-space">
              <div className="call-hub-header">
                <div className="call-hub-title-wrap">
                  <h2 className="call-hub-title">Voice & Video Calls</h2>
                  <p className="call-hub-subtitle">High-quality, peer-to-peer real-time voice calling</p>
                </div>
                <button
                  type="button"
                  className="call-hub-refresh-btn"
                  onClick={() => {
                    if (loggedInUser) {
                      voiceCallService.constructor.getCallHistory(loggedInUser).then(setCallHistory);
                    }
                  }}
                  title="Refresh Call History"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="23 4 23 10 17 10"></polyline>
                    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                  </svg>
                  <span>Refresh</span>
                </button>
              </div>

              {/* Quick Call Row */}
              <div className="call-hub-card">
                <h3 className="call-hub-section-title">Quick Call Contacts</h3>
                <div className="call-quick-contacts-list">
                  {registeredContacts.length === 0 && registeredFriends.length === 0 ? (
                    <p className="call-empty-quick">No registered contacts yet. Sync or add contacts to call directly!</p>
                  ) : (
                    [...new Map([...registeredFriends.map(f => [f.name, f]), ...registeredContacts.map(c => [c.name, c])]).values()].slice(0, 8).map((contact, idx) => (
                      <div key={idx} className="quick-call-item">
                        <div
                          className="quick-call-avatar"
                          style={{
                            backgroundColor: contact.avatar ? 'transparent' : getAvatarColor(contact.name || contact.username),
                          }}
                        >
                          {contact.avatar ? (
                            <img src={contact.avatar} alt={contact.name} />
                          ) : (
                            <span>{getInitials(contact.name || contact.username)}</span>
                          )}
                        </div>
                        <div className="quick-call-info">
                          <span className="quick-call-name">{contact.name}</span>
                          <span className="quick-call-handle">@{contact.username || contact.name}</span>
                        </div>
                        <div className="quick-call-btn-group">
                          <button
                            type="button"
                            className="quick-call-action-btn voice"
                            onClick={() => handleStartCall('voice', contact)}
                            title={`Voice call with ${contact.name}`}
                            aria-label={`Voice call with ${contact.name}`}
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                            <span>Voice</span>
                          </button>
                          <button
                            type="button"
                            className="quick-call-action-btn video"
                            onClick={() => handleStartCall('video', contact)}
                            title={`Video call with ${contact.name}`}
                            aria-label={`Video call with ${contact.name}`}
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                              <polygon points="23 7 16 12 23 17 23 7"></polygon>
                              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                            </svg>
                            <span>Video</span>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Call History Card */}
              <div className="call-hub-card">
                <h3 className="call-hub-section-title">Recent Calls</h3>
                {callHistory.length === 0 ? (
                  <div className="call-hub-empty-state">
                    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#525252" strokeWidth="1.5">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <p className="call-empty-title">No recent calls</p>
                    <p className="call-empty-subtitle">Your completed and missed voice calls will show up here</p>
                  </div>
                ) : (
                  <div className="call-history-list">
                    {callHistory.map((call) => (
                      <div key={call.id} className="call-history-item">
                        <div
                          className="call-history-avatar"
                          style={{
                            backgroundColor: call.contactAvatar ? 'transparent' : getAvatarColor(call.contactName),
                          }}
                        >
                          {call.contactAvatar ? (
                            <img src={call.contactAvatar} alt={call.contactName} />
                          ) : (
                            <span>{getInitials(call.contactName)}</span>
                          )}
                        </div>
                        <div className="call-history-details">
                          <div className="call-history-main-row">
                            <span className="call-history-name">{call.contactName}</span>
                            <span className="call-history-time">
                              {new Date(call.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <div className="call-history-meta-row">
                            <span className={`call-type-badge ${call.isOutgoing ? 'outgoing' : 'incoming'} ${call.status}`}>
                              {call.isOutgoing ? '↗ Outgoing' : '↙ Incoming'} • {call.status === 'connected' || call.status === 'ended' ? `${formatCallDuration(call.duration)}` : call.status}
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="call-history-redial-btn"
                          onClick={() =>
                            handleStartCall(call.type || 'voice', {
                              name: call.contactName,
                              username: call.contactUsername,
                              avatar: call.contactAvatar,
                            })
                          }
                          title={`Call back ${call.contactName}`}
                          aria-label={`Call back ${call.contactName}`}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                          </svg>
                        </button>
                      </div>
                    ))}
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

        <nav className="workspace-bottom-navbar" id="bottom-navbar" aria-label="Bottom Navigation">
          {/* Blank bottom navbar */}
        </nav>
      </div>

      {/* Incoming Call Modal Overlay */}
      {incomingCall && !activeCall && (
        <div className="active-call-overlay" role="dialog" aria-modal="true" aria-label="Incoming Call">
          <div className={`active-call-modal incoming ${incomingCall.type === 'video' ? 'video-incoming' : ''}`}>
            <div className="active-call-header">
              <span className={`active-call-type-badge incoming-badge ${incomingCall.type === 'video' ? 'video' : 'voice'}`}>
                {incomingCall.type === 'video' ? '📹 Incoming Video Call' : '📞 Incoming Voice Call'}
              </span>
              <span className="active-call-status pulse-status">Ringing...</span>
            </div>

            <div className="active-call-body">
              <div className="active-call-avatar-wrap">
                <div
                  className={`active-call-avatar ringing ${incomingCall.type === 'video' ? 'video-ring' : ''}`}
                  style={{
                    backgroundColor: incomingCall.callerAvatar
                      ? 'transparent'
                      : getAvatarColor(incomingCall.callerName || incomingCall.caller),
                  }}
                >
                  {incomingCall.callerAvatar ? (
                    <img src={incomingCall.callerAvatar} alt={incomingCall.callerName} />
                  ) : (
                    <span>{getInitials(incomingCall.callerName || incomingCall.caller)}</span>
                  )}
                </div>
                <h3 className="active-call-name">{incomingCall.callerName || incomingCall.caller}</h3>
                <p className="active-call-handle">@{incomingCall.caller}</p>
                <p className="incoming-call-prompt">
                  {incomingCall.type === 'video'
                    ? 'is inviting you to a live video call...'
                    : 'is calling you on Assistance voice...'}
                </p>
              </div>
            </div>

            <div className="active-call-actions incoming-actions">
              <button
                type="button"
                className="call-action-chip decline"
                id="decline-incoming-call-btn"
                onClick={handleDeclineIncomingCall}
                title="Decline Call"
                aria-label="Decline Call"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08a.99.99 0 0 1 0-1.41C3.32 8.78 7.46 7 12 7s8.68 1.78 11.71 4.67c.39.39.39 1.02 0 1.41l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.11-.7-.28-.79-.74-1.69-1.36-2.67-1.85-.33-.16-.56-.5-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z"/>
                </svg>
                <span>Decline</span>
              </button>

              <button
                type="button"
                className="call-action-chip accept"
                id="accept-incoming-call-btn"
                onClick={handleAcceptIncomingCall}
                title={incomingCall.type === 'video' ? 'Accept Video Call' : 'Accept Call'}
                aria-label={incomingCall.type === 'video' ? 'Accept Video Call' : 'Accept Call'}
              >
                {incomingCall.type === 'video' ? (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="23 7 16 12 23 17 23 7"></polygon>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                  </svg>
                ) : (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                )}
                <span>{incomingCall.type === 'video' ? 'Accept Video' : 'Accept'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Call Modal Overlay */}
      {activeCall && (
        <div className={`active-call-overlay ${isVideoFullscreen ? 'fullscreen-overlay' : ''}`} role="dialog" aria-modal="true" aria-label="Active Call">
          <div className={`active-call-modal ${activeCall.type === 'video' ? 'video-modal' : ''} ${isVideoFullscreen ? 'fullscreen' : ''}`}>
            <div className="active-call-header">
              <span className={`active-call-type-badge ${activeCall.type === 'video' ? 'video' : 'voice'}`}>
                {activeCall.type === 'video' ? '📹 Video Call' : '📞 Voice Call'}
              </span>
              <span className={`active-call-status ${activeCall.status}`}>
                {activeCall.status === 'calling'
                  ? 'Calling...'
                  : activeCall.status === 'connecting'
                  ? 'Connecting...'
                  : activeCall.status === 'connected'
                  ? formatCallDuration(activeCall.duration)
                  : activeCall.statusText || activeCall.status}
              </span>
            </div>

            <div className="active-call-body">
              {activeCall.type === 'video' ? (
                <div className="active-call-video-grid">
                  {/* Main Remote Video Stream */}
                  <div className="active-call-main-video">
                    <video
                      ref={remoteVideoRef}
                      autoPlay
                      playsInline
                      className={`video-stream-el remote ${remoteMediaState.remoteVideoOff ? 'hidden' : ''}`}
                    />
                    {(!voiceCallService.remoteStream || remoteMediaState.remoteVideoOff) && (
                      <div className="video-avatar-placeholder">
                        <div
                          className="mock-video-avatar"
                          style={{
                            backgroundColor: activeCall.contact.avatar
                              ? 'transparent'
                              : getAvatarColor(activeCall.contact.name || activeCall.contact.username),
                          }}
                        >
                          {activeCall.contact.avatar ? (
                            <img src={activeCall.contact.avatar} alt={activeCall.contact.name} />
                          ) : (
                            <span>{getInitials(activeCall.contact.name || activeCall.contact.username)}</span>
                          )}
                        </div>
                        <span className="mock-video-label">{activeCall.contact.name}</span>
                        <span className="video-status-hint">
                          {remoteMediaState.remoteVideoOff
                            ? 'Camera is turned off'
                            : activeCall.status === 'connected'
                            ? 'Live video stream connected'
                            : 'Waiting for response...'}
                        </span>
                      </div>
                    )}

                    {remoteMediaState.remoteMuted && (
                      <div className="remote-muted-pill" title="Remote user is muted">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="1" y1="1" x2="23" y2="23"></line>
                          <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
                          <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>
                        </svg>
                        <span>Muted</span>
                      </div>
                    )}
                  </div>

                  {/* PiP Local Video Preview */}
                  <div className="active-call-pip-video" title="Your camera preview">
                    <video
                      ref={localVideoRef}
                      autoPlay
                      playsInline
                      muted
                      className={`video-stream-el pip ${activeCall.isVideoOff ? 'hidden' : ''}`}
                    />
                    {activeCall.isVideoOff && (
                      <div className="pip-video-preview camera-off">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a3a3a3" strokeWidth="2">
                          <line x1="1" y1="1" x2="23" y2="23"></line>
                          <path d="M21 15.5l-5-3.3v-1.8l5-3.3v8.4zM2 6h2m4 0h10a2 2 0 0 1 2 2v6m-4 4H4a2 2 0 0 1-2-2V8"></path>
                        </svg>
                        <span>Camera Off</span>
                      </div>
                    )}
                    <span className="pip-video-label">You</span>
                  </div>
                </div>
              ) : (
                <div className="active-call-avatar-wrap">
                  <div
                    className={`active-call-avatar ${activeCall.status === 'calling' ? 'ringing' : 'connected'}`}
                    style={{
                      backgroundColor: activeCall.contact.avatar
                        ? 'transparent'
                        : getAvatarColor(activeCall.contact.name || activeCall.contact.username),
                    }}
                  >
                    {activeCall.contact.avatar ? (
                      <img src={activeCall.contact.avatar} alt={activeCall.contact.name} />
                    ) : (
                      <span>{getInitials(activeCall.contact.name || activeCall.contact.username)}</span>
                    )}
                  </div>
                  <h3 className="active-call-name">{activeCall.contact.name}</h3>
                  <p className="active-call-handle">@{activeCall.contact.username || activeCall.contact.name}</p>

                  {/* Real-time Audio Equalizer Waveform */}
                  {activeCall.status === 'connected' && (
                    <div className="active-call-waveform" aria-label="Audio Visualizer">
                      <span className="waveform-bar bar-1" style={{ height: `${Math.max(6, Math.min(28, (audioVisualizerLevel || 5) * 0.7))}px` }}></span>
                      <span className="waveform-bar bar-2" style={{ height: `${Math.max(8, Math.min(36, (audioVisualizerLevel || 8) * 1.1))}px` }}></span>
                      <span className="waveform-bar bar-3" style={{ height: `${Math.max(12, Math.min(44, (audioVisualizerLevel || 12) * 1.4))}px` }}></span>
                      <span className="waveform-bar bar-4" style={{ height: `${Math.max(8, Math.min(36, (audioVisualizerLevel || 8) * 1.0))}px` }}></span>
                      <span className="waveform-bar bar-5" style={{ height: `${Math.max(6, Math.min(28, (audioVisualizerLevel || 5) * 0.6))}px` }}></span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="active-call-actions">
              {/* Mic Mute / Unmute */}
              <button
                type="button"
                className={`call-control-btn ${activeCall.isMuted ? 'active danger' : ''}`}
                id="call-mute-btn"
                onClick={handleToggleMute}
                title={activeCall.isMuted ? 'Unmute microphone' : 'Mute microphone'}
                aria-label={activeCall.isMuted ? 'Unmute microphone' : 'Mute microphone'}
              >
                {activeCall.isMuted ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                    <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
                    <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>
                    <line x1="12" y1="19" x2="12" y2="23"></line>
                    <line x1="8" y1="23" x2="16" y2="23"></line>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    <line x1="12" y1="19" x2="12" y2="23"></line>
                    <line x1="8" y1="23" x2="16" y2="23"></line>
                  </svg>
                )}
              </button>

              {/* Camera On / Off (Video calls only) */}
              {activeCall.type === 'video' && (
                <button
                  type="button"
                  className={`call-control-btn ${activeCall.isVideoOff ? 'active danger' : ''}`}
                  id="call-camera-btn"
                  onClick={handleToggleVideo}
                  title={activeCall.isVideoOff ? 'Turn camera on' : 'Turn camera off'}
                  aria-label={activeCall.isVideoOff ? 'Turn camera on' : 'Turn camera off'}
                >
                  {activeCall.isVideoOff ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                      <path d="M21 15.5l-5-3.3v-1.8l5-3.3v8.4zM2 6h2m4 0h10a2 2 0 0 1 2 2v6m-4 4H4a2 2 0 0 1-2-2V8"></path>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="23 7 16 12 23 17 23 7"></polygon>
                      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                    </svg>
                  )}
                </button>
              )}

              {/* Switch Camera (if >1 cameras available) */}
              {activeCall.type === 'video' && hasMultipleCameras && (
                <button
                  type="button"
                  className="call-control-btn"
                  id="call-switch-camera-btn"
                  onClick={handleSwitchCamera}
                  title="Switch camera"
                  aria-label="Switch camera"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 16v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="10 9 9 4 15 4 14 9"></polyline>
                    <path d="M2 10l5-5 5 5"></path>
                    <path d="M22 14l-5 5-5-5"></path>
                  </svg>
                </button>
              )}

              {/* Fullscreen Toggle (Video calls only) */}
              {activeCall.type === 'video' && (
                <button
                  type="button"
                  className={`call-control-btn ${isVideoFullscreen ? 'active' : ''}`}
                  id="call-fullscreen-btn"
                  onClick={handleToggleFullscreen}
                  title={isVideoFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                  aria-label={isVideoFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                >
                  {isVideoFullscreen ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 3h6v6m0 6v6h-6M9 21H3v-6M3 9V3h6"></path>
                    </svg>
                  )}
                </button>
              )}

              {/* End Call Button */}
              <button
                type="button"
                className="call-control-btn end-call"
                id="call-hangup-btn"
                onClick={handleEndCall}
                title="End Call"
                aria-label="End Call"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08a.99.99 0 0 1 0-1.41C3.32 8.78 7.46 7 12 7s8.68 1.78 11.71 4.67c.39.39.39 1.02 0 1.41l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.11-.7-.28-.79-.74-1.69-1.36-2.67-1.85-.33-.16-.56-.5-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
  }

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      <main className="container auth-dark-container">
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
                Username or Email Address
              </label>
              <input
                id="login-username-input"
                type="text"
                className="input-field"
                placeholder="Username or email"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                autoComplete="username"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck="false"
              />
            </div>

            <div className="form-group">
              <label htmlFor="login-contact-input" className="input-label">
                Email Address or Phone Number (Optional)
              </label>
              <input
                id="login-contact-input"
                type="text"
                className="input-field"
                placeholder="name@example.com or phone (optional)"
                value={loginContact}
                onChange={(e) => setLoginContact(e.target.value)}
                autoComplete="email tel"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck="false"
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
