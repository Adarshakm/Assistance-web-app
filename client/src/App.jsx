import { useState, useEffect, useRef } from 'react';
import SplashScreen from './components/SplashScreen.jsx';

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
        : view === 'privacy'
        ? '/privacy-security'
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
          if (data.user?.avatar) {
            setProfilePicture(data.user.avatar);
            localStorage.setItem('assistance_profile_picture', data.user.avatar);
          }
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
  const [messageInputText, setMessageInputText] = useState('');
  const messagesEndRef = useRef(null);

  const handleOpenChatWithContact = (contact) => {
    if (!contact) return;
    const chatTarget = {
      name: contact.phoneBookName || contact.name || contact.username || 'Contact',
      username: contact.username || '',
      phone: contact.phone || '',
      avatar: contact.avatar || '',
      status: contact.status || (contact.username ? 'Active on Assistance' : 'Phone contact'),
    };
    setActiveChatContact(chatTarget);
    try {
      localStorage.setItem('assistance_active_chat_contact', JSON.stringify(chatTarget));
    } catch {}
    navigateTo('messages');
  };

  const handleSendChatMessage = (e) => {
    e.preventDefault();
    const text = messageInputText.trim();
    if (!text || !activeChatContact) return;

    const contactKey = activeChatContact.username || activeChatContact.phone || activeChatContact.name;
    const newMsg = {
      id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      sender: 'me',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: Date.now(),
    };

    setChatMessages((prev) => {
      const existing = prev[contactKey] || [];
      const updated = {
        ...prev,
        [contactKey]: [...existing, newMsg],
      };
      try {
        localStorage.setItem('assistance_chat_history', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    setMessageInputText('');
  };

  useEffect(() => {
    if (currentView === 'messages' && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, activeChatContact, currentView]);

  const normalizePhoneKey = (phone = '') => {
    const digits = String(phone).replace(/\D/g, '');
    return digits.length >= 10 ? digits.slice(-10) : digits || String(phone).trim();
  };

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

  const [discoveryUsers, setDiscoveryUsers] = useState([]);
  const [isLoadingDiscoveryUsers, setIsLoadingDiscoveryUsers] = useState(false);
  const [discoverySearchQuery, setDiscoverySearchQuery] = useState('');

  useEffect(() => {
    if (currentView !== 'search-and-discovery' && currentView !== 'social') return;
    let isMounted = true;
    setIsLoadingDiscoveryUsers(true);
    fetch('/api/users/all', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success && Array.isArray(data.users)) {
          setDiscoveryUsers(data.users);
        }
      })
      .catch(() => {})
      .finally(() => {
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

  if (
    currentView === 'messages' ||
    currentView === 'blank' ||
    currentView === 'account' ||
    currentView === 'contacts' ||
    currentView === 'profile' ||
    currentView === 'social' ||
    currentView === 'search-and-discovery' ||
    currentView === 'privacy' ||
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
              {!isSidebarCollapsed && <span className="brand-title">Planet</span>}
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
                className={`sidebar-nav-item ${currentView === 'messages' ? 'active' : ''}`}
                id="messages-btn"
                onClick={() => navigateTo(currentView === 'messages' ? 'blank' : 'messages')}
                title="Messages"
                aria-label="Messages"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                {!isSidebarCollapsed && <span>Messages</span>}
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
            </div>

            <div className="navbar-user" id="navbar-user" title={loggedInUser || 'User'}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span className="navbar-username-text">{loggedInUser || 'User'}</span>
            </div>
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

                  {/* Followers and Following lists */}
                  <div className="profile-follow-summary-row" id="profile-follow-summary-row">
                    <button
                      type="button"
                      className={`profile-follow-pill ${activeFollowView === 'followers' ? 'active' : ''}`}
                      id="pill-followers-btn"
                      onClick={() => setActiveFollowView(activeFollowView === 'followers' ? 'all' : 'followers')}
                    >
                      <span className="profile-follow-count">{followersList.length}</span>
                      <span className="profile-follow-label">Followers</span>
                    </button>
                    <button
                      type="button"
                      className={`profile-follow-pill ${activeFollowView === 'following' ? 'active' : ''}`}
                      id="pill-following-btn"
                      onClick={() => setActiveFollowView(activeFollowView === 'following' ? 'all' : 'following')}
                    >
                      <span className="profile-follow-count">{followingList.length}</span>
                      <span className="profile-follow-label">Following</span>
                    </button>
                  </div>

                  {followError && (
                    <p className="status-message status-taken" style={{ color: '#ff6b6b', margin: '0.25rem 0' }} role="alert">
                      ✕ {followError}
                    </p>
                  )}

                  {/* Followers List Section */}
                  {(activeFollowView === 'all' || activeFollowView === 'followers') && (
                    <div className="profile-about-section" id="profile-followers-section">
                      <div className="profile-about-header">
                        <h3 className="profile-about-title">Followers ({followersList.length})</h3>
                        <button
                          type="button"
                          className="edit-username-btn"
                          id="add-follower-toggle-btn"
                          title="Add follower"
                          onClick={() => {
                            setFollowError('');
                            setIsAddingFollower((prev) => !prev);
                          }}
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                          <span>{isAddingFollower ? 'Close' : 'Add'}</span>
                        </button>
                      </div>

                      {isAddingFollower && (
                        <form className="profile-follow-add-form" id="add-follower-form" onSubmit={handleAddFollower}>
                          <input
                            type="text"
                            className="input-field edit-info-input"
                            id="add-follower-input"
                            style={{ paddingLeft: '0.875rem' }}
                            placeholder="Enter username to add follower..."
                            value={addFollowerInput}
                            onChange={(e) => setAddFollowerInput(e.target.value)}
                            autoFocus
                          />
                          <div className="edit-about-actions">
                            <button type="submit" className="btn-save-username" id="confirm-add-follower-btn">
                              Add
                            </button>
                            <button
                              type="button"
                              className="btn-cancel-username"
                              onClick={() => {
                                setIsAddingFollower(false);
                                setFollowError('');
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      )}

                      <div className="profile-follow-list" id="profile-followers-list">
                        {followersList.length === 0 ? (
                          <p className="profile-follow-empty" id="no-followers-text">No followers yet</p>
                        ) : (
                          followersList.map((follower) => (
                            <div className="profile-follow-item" key={`follower-${follower}`}>
                              <div className="profile-follow-user-info">
                                <div className="profile-follow-avatar-circle">
                                  {follower.slice(0, 1).toUpperCase()}
                                </div>
                                <span className="profile-follow-username">{follower}</span>
                              </div>
                              <button
                                type="button"
                                className="profile-follow-btn-action"
                                title={`Remove ${follower}`}
                                onClick={() => handleRemoveFollower(follower)}
                              >
                                Remove
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}

                  {/* Following List Section */}
                  {(activeFollowView === 'all' || activeFollowView === 'following') && (
                    <div className="profile-about-section" id="profile-following-section">
                      <div className="profile-about-header">
                        <h3 className="profile-about-title">Following ({followingList.length})</h3>
                        <button
                          type="button"
                          className="edit-username-btn"
                          id="add-following-toggle-btn"
                          title="Follow user"
                          onClick={() => {
                            setFollowError('');
                            setIsAddingFollowing((prev) => !prev);
                          }}
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                          <span>{isAddingFollowing ? 'Close' : 'Follow'}</span>
                        </button>
                      </div>

                      {isAddingFollowing && (
                        <form className="profile-follow-add-form" id="add-following-form" onSubmit={handleFollowUser}>
                          <input
                            type="text"
                            className="input-field edit-info-input"
                            id="add-following-input"
                            style={{ paddingLeft: '0.875rem' }}
                            placeholder="Enter username to follow..."
                            value={addFollowingInput}
                            onChange={(e) => setAddFollowingInput(e.target.value)}
                            autoFocus
                          />
                          <div className="edit-about-actions">
                            <button type="submit" className="btn-save-username" id="confirm-follow-btn">
                              Follow
                            </button>
                            <button
                              type="button"
                              className="btn-cancel-username"
                              onClick={() => {
                                setIsAddingFollowing(false);
                                setFollowError('');
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      )}

                      <div className="profile-follow-list" id="profile-following-list">
                        {followingList.length === 0 ? (
                          <p className="profile-follow-empty" id="no-following-text">Not following anyone yet</p>
                        ) : (
                          followingList.map((target) => (
                            <div className="profile-follow-item" key={`following-${target}`}>
                              <div className="profile-follow-user-info">
                                <div className="profile-follow-avatar-circle">
                                  {target.slice(0, 1).toUpperCase()}
                                </div>
                                <span className="profile-follow-username">{target}</span>
                              </div>
                              <button
                                type="button"
                                className="profile-follow-btn-action"
                                title={`Unfollow ${target}`}
                                onClick={() => handleUnfollowUser(target)}
                              >
                                Unfollow
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}

                  <div className="profile-about-section" id="profile-about-section">
                    <div className="profile-about-header">
                      <h3 className="profile-about-title">About</h3>
                      {!isEditingAbout && (
                        <button
                          type="button"
                          className="edit-username-btn"
                          id="edit-about-btn"
                          title="Edit About"
                          aria-label="Edit About"
                          onClick={() => {
                            setEditAboutInput(aboutText);
                            setIsEditingAbout(true);
                          }}
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                          </svg>
                          <span>Edit</span>
                        </button>
                      )}
                    </div>
                    {isEditingAbout ? (
                      <form className="edit-about-form" id="edit-about-form" onSubmit={handleSaveAbout}>
                        <textarea
                          className="input-field edit-about-textarea"
                          id="edit-about-input"
                          value={editAboutInput}
                          onChange={(e) => setEditAboutInput(e.target.value)}
                          placeholder="Write something about yourself..."
                          rows="3"
                          autoFocus
                        />
                        <div className="edit-about-actions">
                          <button type="submit" className="btn-save-username" id="save-about-btn">
                            Save
                          </button>
                          <button
                            type="button"
                            className="btn-cancel-username"
                            id="cancel-about-btn"
                            onClick={() => setIsEditingAbout(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <p className="profile-about-text" id="profile-about-text">
                        {aboutText}
                      </p>
                    )}
                  </div>

                  <div className="profile-about-section" id="profile-location-section">
                    <div className="profile-about-header">
                      <h3 className="profile-about-title">Location</h3>
                      {!isEditingLocation && (
                        <button
                          type="button"
                          className="edit-username-btn"
                          id="edit-location-btn"
                          title="Edit Location"
                          aria-label="Edit Location"
                          onClick={() => {
                            setEditLocationInput(locationText);
                            setIsEditingLocation(true);
                          }}
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                          </svg>
                          <span>Edit</span>
                        </button>
                      )}
                    </div>
                    {isEditingLocation ? (
                      <form className="edit-about-form" id="edit-location-form" onSubmit={handleSaveLocation}>
                        <div className="profile-input-with-icon">
                          <svg className="profile-field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                          </svg>
                          <input
                            type="text"
                            className="input-field edit-info-input"
                            id="edit-location-input"
                            value={editLocationInput}
                            onChange={(e) => setEditLocationInput(e.target.value)}
                            placeholder="Enter your location (e.g. New York, USA)"
                            autoFocus
                          />
                        </div>
                        <div className="edit-about-actions">
                          <button type="submit" className="btn-save-username" id="save-location-btn">
                            Save
                          </button>
                          <button
                            type="button"
                            className="btn-cancel-username"
                            id="cancel-location-btn"
                            onClick={() => setIsEditingLocation(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="profile-info-display" id="profile-location-display">
                        <svg className="profile-field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span className="profile-info-text" id="profile-location-text">
                          {locationText || 'No location set'}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="profile-about-section" id="profile-website-section">
                    <div className="profile-about-header">
                      <h3 className="profile-about-title">Website Information</h3>
                      {!isEditingWebsite && (
                        <button
                          type="button"
                          className="edit-username-btn"
                          id="edit-website-btn"
                          title="Edit Website Information"
                          aria-label="Edit Website Information"
                          onClick={() => {
                            setEditWebsiteInput(websiteText);
                            setIsEditingWebsite(true);
                          }}
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                          </svg>
                          <span>Edit</span>
                        </button>
                      )}
                    </div>
                    {isEditingWebsite ? (
                      <form className="edit-about-form" id="edit-website-form" onSubmit={handleSaveWebsite}>
                        <div className="profile-input-with-icon">
                          <svg className="profile-field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="2" y1="12" x2="22" y2="12"></line>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                          </svg>
                          <input
                            type="text"
                            className="input-field edit-info-input"
                            id="edit-website-input"
                            value={editWebsiteInput}
                            onChange={(e) => setEditWebsiteInput(e.target.value)}
                            placeholder="Enter your website (e.g. https://yourwebsite.com)"
                            autoFocus
                          />
                        </div>
                        <div className="edit-about-actions">
                          <button type="submit" className="btn-save-username" id="save-website-btn">
                            Save
                          </button>
                          <button
                            type="button"
                            className="btn-cancel-username"
                            id="cancel-website-btn"
                            onClick={() => setIsEditingWebsite(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="profile-info-display" id="profile-website-display">
                        <svg className="profile-field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="2" y1="12" x2="22" y2="12"></line>
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                        </svg>
                        {websiteText ? (
                          <a
                            href={websiteText.startsWith('http://') || websiteText.startsWith('https://') ? websiteText : `https://${websiteText}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="profile-website-link"
                            id="profile-website-link"
                          >
                            {websiteText}
                          </a>
                        ) : (
                          <span className="profile-info-text" id="profile-website-text">
                            No website set
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="profile-about-section" id="profile-education-section">
                    <div className="profile-about-header">
                      <h3 className="profile-about-title">Education</h3>
                      {!isEditingEducation && (
                        <button
                          type="button"
                          className="edit-username-btn"
                          id="edit-education-btn"
                          title="Edit Education"
                          aria-label="Edit Education"
                          onClick={() => {
                            setEditEducationInput(educationText);
                            setIsEditingEducation(true);
                          }}
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                          </svg>
                          <span>Edit</span>
                        </button>
                      )}
                    </div>
                    {isEditingEducation ? (
                      <form className="edit-about-form" id="edit-education-form" onSubmit={handleSaveEducation}>
                        <div className="profile-input-with-icon">
                          <svg className="profile-field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                            <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                          </svg>
                          <input
                            type="text"
                            className="input-field edit-info-input"
                            id="edit-education-input"
                            value={editEducationInput}
                            onChange={(e) => setEditEducationInput(e.target.value)}
                            placeholder="Enter your education (e.g. University / Degree)"
                            autoFocus
                          />
                        </div>
                        <div className="edit-about-actions">
                          <button type="submit" className="btn-save-username" id="save-education-btn">
                            Save
                          </button>
                          <button
                            type="button"
                            className="btn-cancel-username"
                            id="cancel-education-btn"
                            onClick={() => setIsEditingEducation(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="profile-info-display" id="profile-education-display">
                        <svg className="profile-field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                          <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                        </svg>
                        <span className="profile-info-text" id="profile-education-text">
                          {educationText || 'No education details set'}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="profile-about-section" id="profile-employment-section">
                    <div className="profile-about-header">
                      <h3 className="profile-about-title">Employment</h3>
                      {!isEditingEmployment && (
                        <button
                          type="button"
                          className="edit-username-btn"
                          id="edit-employment-btn"
                          title="Edit Employment"
                          aria-label="Edit Employment"
                          onClick={() => {
                            setEditEmploymentInput(employmentText);
                            setIsEditingEmployment(true);
                          }}
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                          </svg>
                          <span>Edit</span>
                        </button>
                      )}
                    </div>
                    {isEditingEmployment ? (
                      <form className="edit-about-form" id="edit-employment-form" onSubmit={handleSaveEmployment}>
                        <div className="profile-input-with-icon">
                          <svg className="profile-field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                          </svg>
                          <input
                            type="text"
                            className="input-field edit-info-input"
                            id="edit-employment-input"
                            value={editEmploymentInput}
                            onChange={(e) => setEditEmploymentInput(e.target.value)}
                            placeholder="Enter your employment (e.g. Job Title / Company)"
                            autoFocus
                          />
                        </div>
                        <div className="edit-about-actions">
                          <button type="submit" className="btn-save-username" id="save-employment-btn">
                            Save
                          </button>
                          <button
                            type="button"
                            className="btn-cancel-username"
                            id="cancel-employment-btn"
                            onClick={() => setIsEditingEmployment(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="profile-info-display" id="profile-employment-display">
                        <svg className="profile-field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                        </svg>
                        <span className="profile-info-text" id="profile-employment-text">
                          {employmentText || 'No employment details set'}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="profile-about-section" id="profile-skills-section">
                    <div className="profile-about-header">
                      <h3 className="profile-about-title">Skills</h3>
                      {!isEditingSkills && (
                        <button
                          type="button"
                          className="edit-username-btn"
                          id="edit-skills-btn"
                          title="Edit Skills"
                          aria-label="Edit Skills"
                          onClick={() => {
                            setEditSkillsInput(skillsText);
                            setIsEditingSkills(true);
                          }}
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                          </svg>
                          <span>Edit</span>
                        </button>
                      )}
                    </div>
                    {isEditingSkills ? (
                      <form className="edit-about-form" id="edit-skills-form" onSubmit={handleSaveSkills}>
                        <div className="profile-input-with-icon">
                          <svg className="profile-field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                          </svg>
                          <input
                            type="text"
                            className="input-field edit-info-input"
                            id="edit-skills-input"
                            value={editSkillsInput}
                            onChange={(e) => setEditSkillsInput(e.target.value)}
                            placeholder="Enter your skills (e.g. JavaScript, Python, Design)"
                            autoFocus
                          />
                        </div>
                        <div className="edit-about-actions">
                          <button type="submit" className="btn-save-username" id="save-skills-btn">
                            Save
                          </button>
                          <button
                            type="button"
                            className="btn-cancel-username"
                            id="cancel-skills-btn"
                            onClick={() => setIsEditingSkills(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="profile-info-display" id="profile-skills-display">
                        <svg className="profile-field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                        <span className="profile-info-text" id="profile-skills-text">
                          {skillsText || 'No skills set'}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="profile-about-section" id="profile-interests-section">
                    <div className="profile-about-header">
                      <h3 className="profile-about-title">Interests</h3>
                      {!isEditingInterests && (
                        <button
                          type="button"
                          className="edit-username-btn"
                          id="edit-interests-btn"
                          title="Edit Interests"
                          aria-label="Edit Interests"
                          onClick={() => {
                            setEditInterestsInput(interestsText);
                            setIsEditingInterests(true);
                          }}
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                          </svg>
                          <span>Edit</span>
                        </button>
                      )}
                    </div>
                    {isEditingInterests ? (
                      <form className="edit-about-form" id="edit-interests-form" onSubmit={handleSaveInterests}>
                        <div className="profile-input-with-icon">
                          <svg className="profile-field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                          </svg>
                          <input
                            type="text"
                            className="input-field edit-info-input"
                            id="edit-interests-input"
                            value={editInterestsInput}
                            onChange={(e) => setEditInterestsInput(e.target.value)}
                            placeholder="Enter your interests (e.g. Photography, Music, Reading)"
                            autoFocus
                          />
                        </div>
                        <div className="edit-about-actions">
                          <button type="submit" className="btn-save-username" id="save-interests-btn">
                            Save
                          </button>
                          <button
                            type="button"
                            className="btn-cancel-username"
                            id="cancel-interests-btn"
                            onClick={() => setIsEditingInterests(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="profile-info-display" id="profile-interests-display">
                        <svg className="profile-field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                        <span className="profile-info-text" id="profile-interests-text">
                          {interestsText || 'No interests set'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : currentView === 'social' ? (
            <div className="social-space" id="social-space">
              {/* Blank space without any content */}
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
                        className="contact-card"
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
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
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
                          onClick={() => navigateTo('contacts')}
                          title="Back to My Contacts"
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
                          <span>Contacts</span>
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

                      {((activeChatContact &&
                        chatMessages[
                          activeChatContact.username ||
                            activeChatContact.phone ||
                            activeChatContact.name
                        ]) ||
                        []
                      ).map((msg) => (
                        <div
                          key={msg.id}
                          className={`chat-bubble-row ${msg.sender === 'me' ? 'sent' : 'received'}`}
                        >
                          <div
                            className={`chat-bubble ${msg.sender === 'me' ? 'sent' : 'received'}`}
                          >
                            <p className="chat-bubble-text">{msg.text}</p>
                            <span className="chat-bubble-time">{msg.time}</span>
                          </div>
                        </div>
                      ))}
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
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                      </svg>
                    </div>
                    <h3 className="chat-fallback-title">No conversation selected</h3>
                    <p className="chat-fallback-desc">
                      Click on any contact in My Contacts to open a direct message box.
                    </p>
                    <button
                      type="button"
                      className="chat-fallback-btn"
                      onClick={() => navigateTo('contacts')}
                    >
                      Go to My Contacts
                    </button>
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
          <div className="navbar-links">
            <button
              type="button"
              className={`navbar-item ${currentView === 'messages' ? 'active' : ''}`}
              id="bottom-messages-btn"
              onClick={() =>
                navigateTo(currentView === 'messages' ? 'blank' : 'messages')
              }
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
              id="bottom-whats-happening-btn"
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
              id="bottom-voice-and-video-call-btn"
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
          </div>

          <div className="navbar-user" id="bottom-navbar-user" title={loggedInUser || 'User'}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span className="navbar-username-text">{loggedInUser || 'User'}</span>
          </div>
        </nav>
      </div>
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
