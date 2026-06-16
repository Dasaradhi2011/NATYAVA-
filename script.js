const previewTemplates = {
  home: () => `
    <div class="phone-content">
      <div class="mobile-head">
        <div class="app-row"><div class="avatar-dot"></div><div><div class="tiny">Good evening</div><b>Priya</b></div></div>
        <button class="chip">Notify</button>
      </div>
      <div class="search glass">Search any song...</div>
      <div class="hero-card glass">
        <h4>Learn Telugu Dance Now</h4>
        <p class="screen-copy">AI 3D instructor ready for today's challenge.</p>
        <button>Start Practice</button>
        <div class="dancer"></div>
      </div>
      <div class="section-mini"><h5>Trending Dances</h5><div class="cards-row">${songCards(["Bollywood", "Telugu", "K-pop"])}</div></div>
      <div class="section-mini"><h5>Categories</h5><div class="chip-row">${chips(["Hip Hop", "Telugu", "Bollywood", "Classical", "K-pop", "Folk"])}</div></div>
      <div class="section-mini progress-block glass"><b>Continue Learning</b><p class="screen-copy">Step 3 of 8</p><div class="progress-line"><span style="width:65%"></span></div></div>
      <div class="streak glass">Dance Streak: 5 Days *****</div>
    </div>`,
  lesson: () => `
    <div class="phone-content">
      <div class="mobile-head"><b>Telugu Dance</b><button class="chip">Settings</button></div>
      <div class="avatar-stage glass"><div class="dancer"></div></div>
      <div class="section-mini"><h5>Controls</h5><div class="control-grid">${["Prev","Play","Pause","Next","Repeat","Slow","Mirror","Angle"].map(x=>`<button>${x}</button>`).join("")}</div></div>
      <div class="section-mini"><h5>Learning Mode</h5><div class="chip-row">${chips(["Beginner", "Intermediate", "Advanced"], 0)}</div></div>
      <div class="section-mini"><h5>Body Focus</h5><div class="chip-row">${chips(["Arms", "Legs", "Footwork", "Full Body"], 2)}</div></div>
      <div class="progress-block glass"><b>Step 3 of 12</b><div class="progress-line"><span style="width:25%"></span></div><p class="screen-copy">Estimated: 8 min remaining</p></div>
    </div>`,
  practice: () => `
    <div class="phone-content">
      <div class="mobile-head"><b>Practice Mode</b><button class="chip">Voice</button></div>
      <div class="camera glass"><div class="skeleton">${"<span></span>".repeat(7)}</div><div class="feedback glass">Raise left arm higher</div></div>
      <div class="section-mini"><h5>Your Score: 78/100</h5><div class="meter-list">${meters([["Accuracy",82],["Timing",68],["Rhythm",79],["Balance",73]])}</div></div>
      <div class="section-mini progress-block glass"><b>Real-time Feedback</b><p class="screen-copy">Keep posture straight. Move faster. Left foot higher.</p></div>
      <div class="bottom-actions"><button class="primary-mobile">Start</button><button class="glass-btn">Record</button></div>
    </div>`,
  community: () => `
    <div class="phone-content">
      <div class="mobile-head"><b>Community</b><button class="chip hot">Upload</button></div>
      <div class="feed-video glass"><div class="dancer"></div><div><b>@priya_dances</b><p class="screen-copy">#TeluguChallenge #Natyava</p></div><div class="feed-actions"><button>Like</button><button>Chat</button><button>Share</button></div></div>
      <div class="section-mini"><h5>Trending Hashtags</h5><div class="chip-row">${chips(["#Footwork", "#Kpop", "#Natyava30", "#Folk"])}</div></div>
      <div class="leader-row"><span>Weekly Challenge</span><b>2.4M joins</b></div>
    </div>`
};

const screens = [
  ["Onboarding 01", "Learn Dance Like Never Before", "AI-powered dance learning using interactive 3D instructors.", "onboarding"],
  ["Onboarding 02", "Practice With AI Feedback", "Get posture correction and movement analysis.", "camera"],
  ["Onboarding 03", "Bring Dance Into Your Room", "Learn through augmented reality.", "ar"],
  ["Onboarding 04", "Track Your Growth", "Earn badges and level up.", "progress"],
  ["Onboarding 05", "Start Your Journey", "Get Started, Google, Apple, and Email sign-in options.", "auth"],
  ["Login", "Welcome Back", "Email, phone OTP, Google, Apple, and Face ID login.", "auth"],
  ["Signup", "Create Account", "Fast onboarding with social identity and email signup.", "auth"],
  ["Forgot Password", "Reset Securely", "Recover account access with email or phone OTP.", "auth"],
  ["Phone OTP", "Verify Your Number", "Four digit confirmation with resend timer.", "auth"],
  ["Face ID", "Unlock With Face ID", "Biometric return path for daily practice.", "auth"],
  ["Home", "Good evening, Priya", "Search songs, continue lessons, trends, categories, streaks.", "home"],
  ["Search", "Search Any Song", "Smart search, voice input, filters, and song learning time.", "search"],
  ["Search Filters", "Find Your Perfect Lesson", "Language, difficulty, genre, and duration filters.", "filters"],
  ["Song Detail", "Telugu Dance Mix", "Difficulty, popularity, estimated time, and start lesson.", "song"],
  ["Lesson", "3D Dance Lesson", "Avatar, controls, progress, body focus, and learning mode.", "lesson"],
  ["Lesson Speed", "Slow Motion Popup", "0.5x, 0.75x, and 1x speed control.", "speed"],
  ["Camera Angle", "Change Camera Angle", "Front, side, top, mirror, and zoom controls.", "angle"],
  ["Progress Timeline", "Step 3 of 12", "Duolingo-style progress tracking with completion estimate.", "timeline"],
  ["AI Coach", "Ask Your Dance Coach", "Questions, recommendations, assessments, and daily plans.", "coach"],
  ["Coach Answer", "Improve Footwork", "Video references, practice drills, corrections, and AR tips.", "coach-answer"],
  ["AR Mode", "Place Dancer In Room", "Resize, rotate, walk around, record, and screenshot.", "ar"],
  ["AR Controls", "AR Dance Twin", "Practice beside your avatar with room-scale controls.", "ar-controls"],
  ["Practice", "Camera Analysis", "Live feed, skeleton tracking, score, and real-time feedback.", "practice"],
  ["Practice Report", "Session Complete", "Accuracy, timing, rhythm, balance, XP, and next drills.", "report"],
  ["Leaderboard", "Global Ranking", "Global, country, friends, weekly, and monthly rankings.", "leaderboard"],
  ["Rewards", "XP, Coins, Badges", "Challenge rewards and unlocks after practice.", "rewards"],
  ["Community Feed", "TikTok-style Dance Feed", "Upload, like, comment, share, follow, and hashtags.", "community"],
  ["Upload Video", "Post Your Dance", "Caption, challenge, visibility, and AI score preview.", "upload"],
  ["Creator Profile", "Creator Studio", "Followers, dance videos, challenges, and profile stats.", "creator"],
  ["Achievements", "Badge Collection", "First Dance, 7 Day Streak, 30 Day Streak, Dance Master.", "achievements"],
  ["Profile", "Priya's Dance Profile", "Skill level, lessons, saved songs, history, and subscription.", "profile"],
  ["Settings", "Preferences", "Dark mode, language, notifications, privacy, devices, account.", "settings"],
  ["Subscription", "Natyava Pro", "Unlimited lessons, AR avatar, advanced feedback, and costumes.", "subscription"],
  ["Admin Dashboard", "Operations", "Songs, users, challenges, reports, analytics, and revenue.", "admin"],
  ["Admin Analytics", "Daily Engagement", "Active users, top songs, retention, revenue, and reports.", "analytics"],
  ["Kids Mode", "Kids Dance Space", "Large buttons, bright colors, reward stars, and playful motion.", "kids"],
  ["Kids Avatar Select", "Choose Your Hero", "Cartoon boy, cartoon girl, robot, ninja, explorer, mascot.", "kids-avatar"],
  ["Special Avatars", "Coming Soon", "Future character partnerships and countdown teaser popup.", "special"],
  ["Character Packs", "Future Expansion", "Reserved space for packs, worlds, story mode, adventures.", "future"],
  ["Avatar Studio", "Create Your Avatar", "Selfie, upload photo, or manual 3D character creation.", "avatar"],
  ["Selfie Capture", "Face Front", "Camera preview with lighting and face detection overlay.", "selfie"],
  ["Upload Photo", "Generate From Gallery", "AI analyzes the selected photo and creates a dance twin.", "upload-photo"],
  ["Manual Creator", "Customize Every Detail", "Face, skin, hair, eyes, clothing, accessories, height, body.", "manual"],
  ["AI Generation", "Creating Your Digital Dance Twin", "Sparkles, countdown, facial analysis, and loading state.", "generation"],
  ["Avatar Result", "Before To After", "Photo comparison, regenerate, edit, save, and use as instructor.", "avatar-result"],
  ["Wardrobe", "Avatar Wardrobe", "Casual, traditional, hip-hop, classical, festival, and sports outfits.", "wardrobe"],
  ["Avatar Store", "Coming Soon", "Premium costumes, accessories, animations, and character packs.", "store"],
  ["Avatar Progress", "Natyava Champion", "Avatar XP, levels, badges, achievements, and status.", "avatar-progress"]
];

function songCards(items) {
  return items.map((item, index) => `<div class="song-card"><div class="thumb"></div><b>${item}</b><span>${4.9 - index / 10} rating</span></div>`).join("");
}

function chips(items, activeIndex = -1) {
  return items.map((item, index) => `<span class="chip ${index === activeIndex ? "hot" : ""}">${item}</span>`).join("");
}

function meters(items) {
  return items.map(([label, value]) => `<div class="meter-item"><span>${label}</span><div class="meter"><span style="width:${value}%"></span></div><b>${value}%</b></div>`).join("");
}

function screenMarkup([label, title, copy, type], index) {
  const specialClass = type.startsWith("kids") ? " kid" : "";
  return `
    <article class="screen-card${specialClass}">
      <div class="screen-label"><span>${String(index + 1).padStart(2, "0")} ${label}</span><span>Natyava</span></div>
      <div class="screen-body">
        ${contentFor(type, title, copy)}
      </div>
    </article>`;
}

function contentFor(type, title, copy) {
  if (type === "home") return previewTemplates.home();
  if (type === "lesson") return previewTemplates.lesson();
  if (type === "practice") return previewTemplates.practice();
  if (type === "community") return previewTemplates.community();
  if (type === "auth") return authContent(title, copy);
  if (type === "search" || type === "filters" || type === "song") return searchContent(title, copy);
  if (type === "coach" || type === "coach-answer") return coachContent(title, copy);
  if (type === "ar" || type === "ar-controls") return arContent(title, copy);
  if (type === "leaderboard" || type === "rewards") return leaderboardContent(title, copy);
  if (type === "settings" || type === "profile" || type === "subscription") return profileContent(title, copy);
  if (type === "admin" || type === "analytics") return adminContent(title, copy);
  if (type.startsWith("kids") || type === "special" || type === "future") return kidsContent(type, title, copy);
  if (type.includes("avatar") || ["selfie", "upload-photo", "manual", "generation", "wardrobe", "store"].includes(type)) return avatarContent(type, title, copy);
  if (type === "camera" || type === "selfie") return cameraIntro(title, copy);
  if (type === "progress" || type === "timeline" || type === "report" || type === "achievements") return progressContent(title, copy);
  return introContent(title, copy);
}

function introContent(title, copy) {
  return `<div class="avatar-stage glass"><div class="dancer"></div></div><h3 class="screen-title">${title}</h3><p class="screen-copy">${copy}</p><div class="section-mini"><div class="chip-row">${chips(["AI", "3D", "AR", "Coach"])}</div></div><div class="progress-line"><span style="width:20%"></span></div>`;
}

function authContent(title, copy) {
  const primary = title === "Start Your Journey" ? "Get Started" : "Continue";
  const fields = title === "Start Your Journey" ? "" : `<input placeholder="Email address"><input placeholder="Password">`;
  return `<h3 class="screen-title">${title}</h3><p class="screen-copy">${copy}</p><div class="avatar-stage glass"><div class="dancer"></div></div><div class="auth-stack">${fields}<button class="primary-mobile">${primary}</button><button>Continue with Google</button><button>Continue with Apple</button><button>Continue with Email</button><button>Phone OTP</button><button>Face ID</button></div>`;
}

function searchContent(title, copy) {
  return `<div class="mobile-head"><b>${title}</b><button class="chip">Voice</button></div><p class="screen-copy">${copy}</p><div class="search glass">Search any song...</div><div class="chip-row">${chips(["Telugu", "Beginner", "Hip Hop", "Under 10m"])}</div><div class="section-mini"><h5>Song Cards</h5><div class="cards-row">${songCards(["Naatu Beat", "K-pop Fire", "Classical Flow"])}</div></div><div class="leader-row"><span>Estimated time</span><b>8 min</b></div>`;
}

function coachContent(title, copy) {
  return `<h3 class="screen-title">${title}</h3><p class="screen-copy">${copy}</p><div class="search glass">How can I improve footwork?</div><div class="progress-block glass"><b>AI Coach</b><p class="screen-copy">Try heel-toe drills, slow-motion repeats, and a side camera angle. I found 3 video references.</p></div><div class="chip-row">${chips(["Drills", "Corrections", "Daily Plan", "Skill Test"])}</div><div class="cards-row">${songCards(["Footwork", "Timing", "Balance"])}</div>`;
}

function arContent(title, copy) {
  return `<h3 class="screen-title">${title}</h3><p class="screen-copy">${copy}</p><div class="avatar-stage glass"><div class="dancer"></div></div><div class="control-grid">${["Place","Resize","Rotate","Walk","Start","Record","Shot","Twin"].map(x=>`<button>${x}</button>`).join("")}</div>`;
}

function progressContent(title, copy) {
  return `<h3 class="screen-title">${title}</h3><p class="screen-copy">${copy}</p><div class="section-mini progress-block glass"><b>Level 18</b><div class="progress-line"><span style="width:72%"></span></div><p class="screen-copy">2,840 XP to Level 19</p></div><div class="cards-row">${songCards(["First Dance", "7 Day", "Rhythm"])}</div><div class="meter-list">${meters([["Accuracy",86],["Timing",74],["Rhythm",91]])}</div>`;
}

function cameraIntro(title, copy) {
  return `<h3 class="screen-title">${title}</h3><p class="screen-copy">${copy}</p><div class="camera glass"><div class="skeleton">${"<span></span>".repeat(7)}</div><div class="feedback glass">Face front, good lighting</div></div><button class="primary-mobile">Open Camera</button>`;
}

function leaderboardContent(title, copy) {
  return `<h3 class="screen-title">${title}</h3><p class="screen-copy">${copy}</p>${["Priya 12,840 XP", "Arjun 11,920 XP", "Maya 10,530 XP", "Global Rank #248"].map(x=>`<div class="leader-row"><span>${x}</span><b>View</b></div>`).join("")}<div class="chip-row">${chips(["XP", "Coins", "Badges", "Monthly"])}</div>`;
}

function profileContent(title, copy) {
  return `<div class="mobile-head"><div class="app-row"><div class="avatar-dot"></div><div><b>${title}</b><p class="tiny">Level 18</p></div></div></div><p class="screen-copy">${copy}</p>${["Completed Lessons 42", "Achievements 18", "Saved Songs 64", "Practice History", "Subscription Pro"].map(x=>`<div class="setting-row"><span>${x}</span><b>Open</b></div>`).join("")}`;
}

function adminContent(title, copy) {
  return `<h3 class="screen-title">${title}</h3><p class="screen-copy">${copy}</p><div class="stats-row"><div class="mini-card">Active<br><b>248K</b></div><div class="mini-card">Revenue<br><b>$1.2M</b></div></div>${["Songs", "Users", "Challenges", "Reports", "Analytics"].map(x=>`<div class="leader-row"><span>${x}</span><b>Manage</b></div>`).join("")}`;
}

function kidsContent(type, title, copy) {
  const popup = type === "special" ? `<div class="popup sparkle"><div class="countdown">09:18</div><b>Coming Soon</b><p class="screen-copy">Future Character Partnerships. More Fun Dance Instructors Are On The Way.</p></div>` : "";
  return `<h3 class="screen-title">${title}</h3><p class="screen-copy">${copy}</p><div class="avatar-stage glass"><div class="dancer"></div></div><div class="chip-row">${chips(["Cartoon Boy", "Robot", "Ninja", "Explorer", "Mascot"])}</div>${popup}<button class="primary-mobile">Start Kids Dance</button>`;
}

function avatarContent(type, title, copy) {
  const loading = type === "generation" ? `<div class="popup sparkle"><div class="countdown">AI</div><b>Creating Your Digital Dance Twin...</b></div>` : "";
  const stage = type === "selfie" || type === "upload-photo" ? `<div class="camera glass"><div class="skeleton">${"<span></span>".repeat(7)}</div><div class="feedback glass">Face front, good lighting</div></div>` : `<div class="avatar-stage glass"><div class="dancer"></div></div>`;
  return `<h3 class="screen-title">${title}</h3><p class="screen-copy">${copy}</p><div class="chip-row">${chips(["Take Selfie", "Upload Photo", "Manual Create"])}</div>${stage}${loading}<div class="section-mini"><h5>Before -> After</h5><div class="cards-row">${songCards(["Photo", "3D Avatar", "Wardrobe"])}</div></div><div class="chip-row">${chips(["Regenerate", "Edit", "Save", "Use My Avatar"], 3)}</div>`;
}

const grid = document.getElementById("screenGrid");
grid.innerHTML = screens.map(screenMarkup).join("");

const preview = document.getElementById("phonePreview");
function setPreview(name) {
  preview.innerHTML = previewTemplates[name]();
  document.querySelectorAll(".phone-nav button").forEach(button => button.classList.toggle("active", button.dataset.target === name));
}
document.querySelectorAll(".phone-nav button").forEach(button => button.addEventListener("click", () => setPreview(button.dataset.target)));
setPreview("home");
