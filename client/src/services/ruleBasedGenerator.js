// Rule-based project generator - fast, no API calls needed

const PROJECT_DATABASE = {
  Beginner: {
    'Web Development': [
      {
        title: 'Task Management App',
        description: 'A simple task management application with user authentication, task creation, and status tracking. Perfect for learning CRUD operations.',
        problemStatement: 'Students need a simple tool to manage their daily tasks and assignments.',
        targetUsers: 'Students, individuals',
        coreFeatures: ['User authentication', 'Task CRUD operations', 'Status tracking', 'Due dates'],
        advancedFeatures: ['Task categories', 'Priority levels', 'Email reminders'],
        innovation: 'Clean, intuitive interface designed specifically for students.',
        baseTechnologies: ['HTML/CSS', 'JavaScript', 'Node.js', 'MongoDB']
      },
      {
        title: 'Personal Blog Platform',
        description: 'A blogging platform where users can create, edit, and publish articles with rich text formatting.',
        problemStatement: 'Students want a platform to share their learning journey.',
        targetUsers: 'Students, writers, developers',
        coreFeatures: ['Rich text editor', 'Image uploads', 'User profiles', 'Comment system'],
        advancedFeatures: ['Tags and categories', 'Search functionality', 'RSS feed'],
        innovation: 'Developer-focused with code snippet support.',
        baseTechnologies: ['HTML/CSS', 'JavaScript', 'Node.js', 'MongoDB']
      },
      {
        title: 'Recipe Sharing App',
        description: 'A community recipe sharing platform where users can upload and browse cooking recipes.',
        problemStatement: 'Cooking enthusiasts need a centralized place to discover recipes.',
        targetUsers: 'Home cooks, food enthusiasts',
        coreFeatures: ['Recipe creation', 'Image gallery', 'Search and filter', 'Save favorites'],
        advancedFeatures: ['Meal planning', 'Shopping list generation', 'Nutritional info'],
        innovation: 'AI-powered recipe suggestions based on available ingredients.',
        baseTechnologies: ['HTML/CSS', 'JavaScript', 'Node.js', 'MongoDB']
      },
      {
        title: 'Portfolio Website Builder',
        description: 'A drag-and-drop portfolio website builder for students to showcase their projects and skills.',
        problemStatement: 'Students need professional portfolios but lack design skills.',
        targetUsers: 'Students, freelancers, job seekers',
        coreFeatures: ['Template selection', 'Drag-and-drop editor', 'Project showcase', 'Contact form'],
        advancedFeatures: ['Custom domains', 'Analytics', 'SEO optimization'],
        innovation: 'Pre-built templates specifically for student projects.',
        baseTechnologies: ['HTML/CSS', 'JavaScript', 'React', 'Firebase']
      },
      {
        title: 'Event Registration System',
        description: 'A simple event registration and management system for college events and workshops.',
        problemStatement: 'College clubs need a simple way to manage event registrations.',
        targetUsers: 'College clubs, event organizers',
        coreFeatures: ['Event creation', 'Registration form', 'Attendee list', 'QR tickets'],
        advancedFeatures: ['Email notifications', 'Payment integration', 'Check-in system'],
        innovation: 'QR code based check-in for seamless event entry.',
        baseTechnologies: ['HTML/CSS', 'JavaScript', 'Node.js', 'MongoDB']
      }
    ],
    'Mobile Development': [
      {
        title: 'Fitness Tracker App',
        description: 'A mobile app for tracking daily workouts, calories, and fitness goals.',
        problemStatement: 'People need a simple way to track their fitness progress.',
        targetUsers: 'Fitness enthusiasts, beginners',
        coreFeatures: ['Workout logging', 'Calorie tracking', 'Progress charts', 'Goal setting'],
        advancedFeatures: ['Workout suggestions', 'Social sharing', 'Integration with wearables'],
        innovation: 'Simple interface focused on quick logging.',
        baseTechnologies: ['React Native', 'Firebase', 'JavaScript']
      },
      {
        title: 'Expense Tracker',
        description: 'A mobile app for tracking daily expenses and managing budgets.',
        problemStatement: 'Students struggle to manage their finances effectively.',
        targetUsers: 'Students, young professionals',
        coreFeatures: ['Expense logging', 'Category tracking', 'Budget limits', 'Monthly reports'],
        advancedFeatures: ['Receipt scanning', 'Bill reminders', 'Shared expenses'],
        innovation: 'Visual budget breakdowns with charts.',
        baseTechnologies: ['React Native', 'Firebase', 'JavaScript']
      },
      {
        title: 'Habit Tracker',
        description: 'A mobile app for building and tracking daily habits with streaks and reminders.',
        problemStatement: 'People struggle to build consistent habits.',
        targetUsers: 'Self-improvement enthusiasts, students',
        coreFeatures: ['Habit creation', 'Daily check-in', 'Streak tracking', 'Reminders'],
        advancedFeatures: ['Habit categories', 'Statistics', 'Social accountability'],
        innovation: 'Gamified habit building with achievement badges.',
        baseTechnologies: ['React Native', 'Firebase', 'JavaScript']
      },
      {
        title: 'Flashcard Study App',
        description: 'A mobile flashcard app with spaced repetition for efficient studying.',
        problemStatement: 'Students need better tools for memorization and review.',
        targetUsers: 'Students, language learners',
        coreFeatures: ['Flashcard creation', 'Spaced repetition', 'Study sessions', 'Progress tracking'],
        advancedFeatures: ['Shared decks', 'Image cards', 'Audio support'],
        innovation: 'AI-optimized review scheduling based on forgetting curve.',
        baseTechnologies: ['React Native', 'Firebase', 'JavaScript']
      }
    ],
    'AI/ML': [
      {
        title: 'Sentiment Analyzer',
        description: 'A simple web app that analyzes text sentiment using pre-trained models.',
        problemStatement: 'Businesses need to understand customer feedback quickly.',
        targetUsers: 'Small businesses, students',
        coreFeatures: ['Text input', 'Sentiment scoring', 'History tracking', 'Export results'],
        advancedFeatures: ['Batch processing', 'API integration', 'Custom training'],
        innovation: 'Uses pre-trained models - no ML expertise needed.',
        baseTechnologies: ['Python', 'Flask', 'React', 'Hugging Face']
      },
      {
        title: 'Image Classifier',
        description: 'A web app that classifies images into categories using transfer learning.',
        problemStatement: 'Organizations need to automatically categorize large image collections.',
        targetUsers: 'Students, small businesses',
        coreFeatures: ['Image upload', 'Category prediction', 'Confidence scores', 'History'],
        advancedFeatures: ['Custom model training', 'Batch processing', 'API access'],
        innovation: 'Pre-trained models with option to fine-tune on custom data.',
        baseTechnologies: ['Python', 'TensorFlow', 'Flask', 'React']
      }
    ],
    'Education': [
      {
        title: 'Quiz Generator',
        description: 'A quiz creation and taking platform for teachers and students.',
        problemStatement: 'Teachers need quick way to create and administer quizzes.',
        targetUsers: 'Teachers, students, tutors',
        coreFeatures: ['Quiz creation', 'Multiple question types', 'Auto-grading', 'Results analysis'],
        advancedFeatures: ['Question bank', 'Timed quizzes', 'Leaderboards'],
        innovation: 'AI-powered question generation from study materials.',
        baseTechnologies: ['React', 'Node.js', 'MongoDB', 'JavaScript']
      },
      {
        title: 'Student Attendance System',
        description: 'A digital attendance system with QR code check-in and reporting.',
        problemStatement: 'Manual attendance tracking is time-consuming and error-prone.',
        targetUsers: 'Schools, colleges, training centers',
        coreFeatures: ['QR code check-in', 'Attendance reports', 'Student profiles', 'Export data'],
        advancedFeatures: ['Face recognition', 'Parent notifications', 'Analytics dashboard'],
        innovation: 'QR-based check-in with real-time attendance updates.',
        baseTechnologies: ['React', 'Node.js', 'MongoDB', 'JavaScript']
      }
    ],
    'Healthcare': [
      {
        title: 'BMI Calculator & Tracker',
        description: 'A health tracking app focused on BMI calculation and progress monitoring.',
        problemStatement: 'People need simple tools to monitor their health metrics.',
        targetUsers: 'Health-conscious individuals, fitness enthusiasts',
        coreFeatures: ['BMI calculation', 'History tracking', 'Progress charts', 'Health tips'],
        advancedFeatures: ['Multiple metrics', 'Goal setting', 'Integration with fitness apps'],
        innovation: 'Visual progress tracking with health insights.',
        baseTechnologies: ['React', 'Node.js', 'MongoDB', 'JavaScript']
      }
    ],
    'Finance': [
      {
        title: 'Pocket Money Tracker',
        description: 'A simple expense tracker designed for students to manage pocket money.',
        problemStatement: 'Students need to track their limited budget effectively.',
        targetUsers: 'Students, teenagers',
        coreFeatures: ['Expense logging', 'Category tags', 'Monthly summary', 'Budget alerts'],
        advancedFeatures: ['Savings goals', 'Split expenses', 'Visual reports'],
        innovation: 'Student-specific categories like food, transport, entertainment.',
        baseTechnologies: ['React', 'Node.js', 'MongoDB', 'JavaScript']
      }
    ]
  },
  Intermediate: {
    'Web Development': [
      {
        title: 'Real-time Collaboration Tool',
        description: 'A collaborative workspace with real-time document editing and task boards.',
        problemStatement: 'Teams need a unified platform for collaboration.',
        targetUsers: 'Small teams, startups, student groups',
        coreFeatures: ['Real-time editing', 'Task boards', 'Team chat', 'File sharing'],
        advancedFeatures: ['Version history', 'Video conferencing', 'Integration APIs'],
        innovation: 'Combines multiple collaboration tools into one.',
        baseTechnologies: ['React', 'Node.js', 'Socket.io', 'PostgreSQL']
      },
      {
        title: 'E-commerce Analytics Dashboard',
        description: 'An analytics dashboard for e-commerce businesses to track sales and customer behavior.',
        problemStatement: 'Small businesses struggle to understand their data.',
        targetUsers: 'E-commerce owners, marketers',
        coreFeatures: ['Sales tracking', 'Customer analytics', 'Inventory management', 'Reports'],
        advancedFeatures: ['Predictive analytics', 'A/B testing', 'Marketing automation'],
        innovation: 'AI-powered insights that suggest improvements.',
        baseTechnologies: ['React', 'Node.js', 'PostgreSQL', 'Chart.js']
      },
      {
        title: 'Project Management Tool',
        description: 'A comprehensive project management tool with Kanban boards, Gantt charts, and team collaboration.',
        problemStatement: 'Teams need better tools to manage complex projects.',
        targetUsers: 'Project managers, development teams',
        coreFeatures: ['Kanban boards', 'Gantt charts', 'Task assignments', 'Time tracking'],
        advancedFeatures: ['Resource management', 'Dependencies', 'Custom workflows'],
        innovation: 'AI-powered task prioritization and scheduling.',
        baseTechnologies: ['React', 'Node.js', 'PostgreSQL', 'Socket.io']
      },
      {
        title: 'Social Media Scheduler',
        description: 'A social media management tool for scheduling posts across multiple platforms.',
        problemStatement: 'Managing multiple social media accounts is time-consuming.',
        targetUsers: 'Marketers, influencers, small businesses',
        coreFeatures: ['Post scheduling', 'Multi-platform support', 'Analytics', 'Content calendar'],
        advancedFeatures: ['AI caption generation', 'Best time suggestions', 'Hashtag research'],
        innovation: 'AI-powered content suggestions based on trending topics.',
        baseTechnologies: ['React', 'Node.js', 'MongoDB', 'Redis']
      },
      {
        title: 'URL Shortener with Analytics',
        description: 'A custom URL shortener with detailed click analytics and tracking.',
        problemStatement: 'Businesses need to track link performance and user engagement.',
        targetUsers: 'Marketers, content creators',
        coreFeatures: ['URL shortening', 'Click tracking', 'Geographic data', 'Referrer tracking'],
        advancedFeatures: ['Custom aliases', 'QR codes', 'API access', 'A/B testing'],
        innovation: 'Real-time analytics with geographic heatmaps.',
        baseTechnologies: ['React', 'Node.js', 'Redis', 'PostgreSQL']
      }
    ],
    'AI/ML': [
      {
        title: 'AI Study Companion',
        description: 'A personalized learning platform that adapts to student behavior and generates practice questions.',
        problemStatement: 'Students lack personalized study tools.',
        targetUsers: 'University students, online learners',
        coreFeatures: ['Adaptive quizzes', 'Progress tracking', 'Study recommendations', 'Analytics'],
        advancedFeatures: ['AI-generated notes', 'Spaced repetition', 'Learning style detection'],
        innovation: 'Uses LLMs to generate personalized content.',
        baseTechnologies: ['React', 'Python', 'FastAPI', 'PostgreSQL', 'OpenAI']
      },
      {
        title: 'Smart Document Search',
        description: 'An intelligent document search system using NLP for semantic understanding.',
        problemStatement: 'Keyword search misses relevant documents.',
        targetUsers: 'Research teams, students',
        coreFeatures: ['Document upload', 'Semantic search', 'Relevance ranking', 'Highlights'],
        advancedFeatures: ['Summary generation', 'Question answering', 'Cross-reference linking'],
        innovation: 'Understands meaning, not just keywords.',
        baseTechnologies: ['React', 'Python', 'FastAPI', 'Elasticsearch']
      },
      {
        title: 'Resume Parser & Matcher',
        description: 'An AI system that parses resumes and matches candidates to job descriptions.',
        problemStatement: 'HR teams spend too much time screening resumes manually.',
        targetUsers: 'HR departments, recruitment agencies',
        coreFeatures: ['Resume parsing', 'Skill extraction', 'Job matching', 'Candidate ranking'],
        advancedFeatures: ['Interview questions generation', 'Bias detection', 'Analytics dashboard'],
        innovation: 'NLP-powered skill matching with semantic understanding.',
        baseTechnologies: ['React', 'Python', 'FastAPI', 'PostgreSQL']
      },
      {
        title: 'Chatbot Builder',
        description: 'A no-code chatbot builder for websites with NLP capabilities.',
        problemStatement: 'Businesses want chatbots but lack technical expertise.',
        targetUsers: 'Small businesses, customer support teams',
        coreFeatures: ['Visual flow builder', 'NLP integration', 'Multi-channel deployment', 'Analytics'],
        advancedFeatures: ['Training from FAQ', 'Sentiment analysis', 'Human handoff'],
        innovation: 'Drag-and-drop interface with AI-powered responses.',
        baseTechnologies: ['React', 'Node.js', 'Python', 'MongoDB']
      }
    ],
    'Healthcare': [
      {
        title: 'Patient Monitoring Dashboard',
        description: 'A real-time dashboard for monitoring patient vitals and alerts.',
        problemStatement: 'Hospitals need centralized patient monitoring.',
        targetUsers: 'Hospitals, clinics, care facilities',
        coreFeatures: ['Vitals dashboard', 'Alert system', 'Patient history', 'Reports'],
        advancedFeatures: ['Predictive alerts', 'Trend analysis', 'Integration with devices'],
        innovation: 'Real-time visualization with anomaly detection.',
        baseTechnologies: ['React', 'Node.js', 'MongoDB', 'Chart.js']
      },
      {
        title: 'Telemedicine Platform',
        description: 'A video consultation platform connecting patients with doctors remotely.',
        problemStatement: 'Patients need convenient access to healthcare professionals.',
        targetUsers: 'Patients, doctors, clinics',
        coreFeatures: ['Video calls', 'Appointment booking', 'Chat messaging', 'Prescription management'],
        advancedFeatures: ['AI symptom checker', 'EHR integration', 'Payment processing'],
        innovation: 'AI-powered pre-consultation symptom assessment.',
        baseTechnologies: ['React', 'Node.js', 'WebRTC', 'MongoDB']
      },
      {
        title: 'Medication Reminder App',
        description: 'A medication management app with reminders, tracking, and refill alerts.',
        problemStatement: 'Patients often forget to take medications on time.',
        targetUsers: 'Elderly patients, chronic disease patients',
        coreFeatures: ['Medication scheduling', 'Reminders', 'Refill alerts', 'History tracking'],
        advancedFeatures: ['Drug interaction checker', 'Doctor sharing', 'Pharmacy integration'],
        innovation: 'Smart reminders that adapt to patient routine.',
        baseTechnologies: ['React', 'Node.js', 'MongoDB', 'Push Notifications']
      }
    ],
    'Finance': [
      {
        title: 'Budget Planner Pro',
        description: 'A comprehensive budget planning tool with visualization and forecasting.',
        problemStatement: 'People struggle to plan and stick to budgets.',
        targetUsers: 'Individuals, families, students',
        coreFeatures: ['Budget creation', 'Expense tracking', 'Visual charts', 'Forecasting'],
        advancedFeatures: ['Bill reminders', 'Savings goals', 'Investment tracking'],
        innovation: 'AI-powered spending insights.',
        baseTechnologies: ['React', 'Node.js', 'PostgreSQL', 'Chart.js']
      },
      {
        title: 'Stock Portfolio Tracker',
        description: 'A stock portfolio tracking application with real-time prices and analytics.',
        problemStatement: 'Investors need a centralized view of their investments.',
        targetUsers: 'Individual investors, students',
        coreFeatures: ['Portfolio tracking', 'Real-time prices', 'Gain/loss calculation', 'Charts'],
        advancedFeatures: ['Dividend tracking', 'News integration', 'Performance analytics'],
        innovation: 'AI-powered stock recommendations based on risk profile.',
        baseTechnologies: ['React', 'Node.js', 'PostgreSQL', 'Financial APIs']
      }
    ],
    'Education': [
      {
        title: 'Online Exam System',
        description: 'A comprehensive online examination system with proctoring and auto-grading.',
        problemStatement: 'Institutions need reliable online assessment tools.',
        targetUsers: 'Schools, universities, training centers',
        coreFeatures: ['Exam creation', 'Question bank', 'Auto-grading', 'Results analysis'],
        advancedFeatures: ['Anti-cheating measures', 'Video proctoring', 'Plagiarism detection'],
        innovation: 'AI-powered question generation from syllabus.',
        baseTechnologies: ['React', 'Node.js', 'PostgreSQL', 'WebRTC']
      },
      {
        title: 'Learning Management System',
        description: 'A platform for creating and delivering online courses with progress tracking.',
        problemStatement: 'Educators need tools to deliver structured online learning.',
        targetUsers: 'Educators, training companies, students',
        coreFeatures: ['Course creation', 'Video lessons', 'Quizzes', 'Progress tracking'],
        advancedFeatures: ['Certificates', 'Discussion forums', 'Live classes'],
        innovation: 'AI-powered learning path recommendations.',
        baseTechnologies: ['React', 'Node.js', 'MongoDB', 'AWS S3']
      }
    ],
    'E-Commerce': [
      {
        title: 'Multi-vendor Marketplace',
        description: 'A marketplace platform where multiple vendors can list and sell products.',
        problemStatement: 'Small businesses need online presence without building their own store.',
        targetUsers: 'Small businesses, entrepreneurs, consumers',
        coreFeatures: ['Vendor profiles', 'Product listings', 'Order management', 'Reviews'],
        advancedFeatures: ['Commission management', 'Analytics', 'Marketing tools'],
        innovation: 'AI-powered product recommendations for buyers.',
        baseTechnologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe']
      }
    ]
  },
  Advanced: {
    'AI/ML': [
      {
        title: 'AI-Powered Code Review System',
        description: 'An intelligent code review system that detects bugs and suggests improvements.',
        problemStatement: 'Manual code reviews are time-consuming.',
        targetUsers: 'Development teams, open source projects',
        coreFeatures: ['Automated analysis', 'Bug detection', 'Security scanning', 'PR integration'],
        advancedFeatures: ['Custom rules', 'Learning from feedback', 'Multi-language support'],
        innovation: 'ML model trained on millions of code reviews.',
        baseTechnologies: ['Python', 'TensorFlow', 'FastAPI', 'React', 'GitHub API']
      },
      {
        title: 'Predictive Maintenance Platform',
        description: 'An IoT platform that predicts equipment failures using sensor data.',
        problemStatement: 'Unexpected failures cause costly downtime.',
        targetUsers: 'Manufacturing plants, facility managers',
        coreFeatures: ['Sensor data collection', 'Anomaly detection', 'Failure prediction', 'Alerts'],
        advancedFeatures: ['Maintenance scheduling', 'Cost optimization', 'Digital twin simulation'],
        innovation: 'Real-time prediction with high accuracy.',
        baseTechnologies: ['Python', 'TensorFlow', 'Node.js', 'InfluxDB', 'React']
      },
      {
        title: 'Natural Language SQL Query Generator',
        description: 'A system that converts natural language questions into SQL queries.',
        problemStatement: 'Non-technical users struggle to query databases.',
        targetUsers: 'Business analysts, data teams',
        coreFeatures: ['Natural language input', 'SQL generation', 'Query execution', 'Results visualization'],
        advancedFeatures: ['Query optimization', 'Schema learning', 'Multi-database support'],
        innovation: 'LLM-powered query generation with context understanding.',
        baseTechnologies: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'OpenAI']
      },
      {
        title: 'AI Content Generator',
        description: 'A platform for generating marketing content, blog posts, and social media captions.',
        problemStatement: 'Content creation is time-consuming and expensive.',
        targetUsers: 'Marketers, content creators, businesses',
        coreFeatures: ['Content templates', 'Tone customization', 'SEO optimization', 'Multi-format export'],
        advancedFeatures: ['Brand voice learning', 'A/B testing', 'Performance tracking'],
        innovation: 'AI that learns your brand voice over time.',
        baseTechnologies: ['React', 'Python', 'FastAPI', 'PostgreSQL', 'OpenAI']
      }
    ],
    'Healthcare': [
      {
        title: 'Medical Image Analysis',
        description: 'A computer vision system for analyzing medical images like X-rays and MRIs.',
        problemStatement: 'Radiologists face high workloads.',
        targetUsers: 'Hospitals, diagnostic centers',
        coreFeatures: ['Image upload', 'AI analysis', 'Heatmap visualization', 'Report generation'],
        advancedFeatures: ['Multi-format support', 'Comparison tools', 'Integration with PACS'],
        innovation: 'Explainable AI with visual heatmaps.',
        baseTechnologies: ['Python', 'PyTorch', 'FastAPI', 'React', 'OpenCV']
      },
      {
        title: 'Disease Prediction System',
        description: 'An ML system that predicts disease risk based on patient symptoms and history.',
        problemStatement: 'Early detection of diseases can save lives.',
        targetUsers: 'Hospitals, health clinics',
        coreFeatures: ['Symptom input', 'Risk assessment', 'Recommendation engine', 'Patient history'],
        advancedFeatures: ['Integration with EHR', 'Population analytics', 'Research mode'],
        innovation: 'Ensemble models combining multiple prediction algorithms.',
        baseTechnologies: ['Python', 'TensorFlow', 'FastAPI', 'React', 'PostgreSQL']
      }
    ],
    'Web Development': [
      {
        title: 'Microservices E-commerce Platform',
        description: 'A scalable e-commerce platform built with microservices architecture.',
        problemStatement: 'Monolithic apps are hard to scale.',
        targetUsers: 'Growing businesses, enterprise',
        coreFeatures: ['Product catalog', 'Cart & checkout', 'Payment processing', 'Order management'],
        advancedFeatures: ['Recommendation engine', 'Search service', 'Analytics pipeline'],
        innovation: 'Event-driven architecture with CQRS pattern.',
        baseTechnologies: ['React', 'Node.js', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis']
      },
      {
        title: 'Real-time Multiplayer Game Platform',
        description: 'A platform for building and hosting real-time multiplayer browser games.',
        problemStatement: 'Creating multiplayer games requires complex infrastructure.',
        targetUsers: 'Game developers, gaming communities',
        coreFeatures: ['Game lobby', 'Real-time sync', 'Matchmaking', 'Leaderboards'],
        advancedFeatures: ['Replay system', 'Anti-cheat', 'Spectator mode'],
        innovation: 'WebSocket-based architecture with state reconciliation.',
        baseTechnologies: ['React', 'Node.js', 'Socket.io', 'Redis', 'PostgreSQL']
      }
    ],
    'Cybersecurity': [
      {
        title: 'Network Intrusion Detection System',
        description: 'An ML-based system for detecting network intrusions and anomalies.',
        problemStatement: 'Traditional security systems miss sophisticated attacks.',
        targetUsers: 'IT security teams, enterprises',
        coreFeatures: ['Traffic analysis', 'Anomaly detection', 'Alert system', 'Dashboard'],
        advancedFeatures: ['Custom rule creation', 'Threat intelligence', 'Automated response'],
        innovation: 'Deep learning models for zero-day attack detection.',
        baseTechnologies: ['Python', 'TensorFlow', 'Elasticsearch', 'React', 'Kafka']
      },
      {
        title: 'Vulnerability Scanner',
        description: 'An automated web application vulnerability scanner.',
        problemStatement: 'Manual security testing is time-consuming and incomplete.',
        targetUsers: 'Security researchers, development teams',
        coreFeatures: ['URL scanning', 'Vulnerability detection', 'Report generation', 'Remediation advice'],
        advancedFeatures: ['CI/CD integration', 'Scheduled scans', 'Compliance checking'],
        innovation: 'AI-powered vulnerability prioritization based on context.',
        baseTechnologies: ['Python', 'React', 'Node.js', 'PostgreSQL']
      }
    ],
    'Finance': [
      {
        title: 'Algorithmic Trading Platform',
        description: 'A platform for creating, testing, and deploying trading algorithms.',
        problemStatement: 'Traders need tools to automate their strategies.',
        targetUsers: 'Quantitative traders, hedge funds',
        coreFeatures: ['Strategy builder', 'Backtesting', 'Paper trading', 'Live deployment'],
        advancedFeatures: ['Risk management', 'Portfolio optimization', 'Market data integration'],
        innovation: 'ML-powered strategy optimization.',
        baseTechnologies: ['Python', 'React', 'Node.js', 'PostgreSQL', 'Redis']
      }
    ],
    'IoT': [
      {
        title: 'Smart Home Automation',
        description: 'A comprehensive smart home system with device management and automation rules.',
        problemStatement: 'Existing smart home solutions are fragmented.',
        targetUsers: 'Homeowners, IoT enthusiasts',
        coreFeatures: ['Device management', 'Automation rules', 'Voice control', 'Energy monitoring'],
        advancedFeatures: ['ML-based automation', 'Security integration', 'Remote access'],
        innovation: 'AI learns user patterns and suggests automations.',
        baseTechnologies: ['React', 'Node.js', 'MQTT', 'InfluxDB', 'Python']
      }
    ]
  }
};

// Get matching projects based on user profile
export function generateRuleBasedProjects(profile) {
  const level = profile.projectLevel || profile.experience || 'Intermediate';
  const interests = profile.interests || [];
  const skills = profile.skills || [];
  const domain = profile.domain || '';
  const duration = profile.duration || '12 weeks';
  
  // Get projects for the selected level
  const levelProjects = PROJECT_DATABASE[level] || PROJECT_DATABASE.Intermediate;
  const categories = Object.keys(levelProjects);
  
  // Find best matching category based on domain first, then interests
  let bestCategory = null;
  
  // Priority 1: Match by domain
  if (domain) {
    for (const category of categories) {
      if (category.toLowerCase().includes(domain.toLowerCase()) || 
          domain.toLowerCase().includes(category.toLowerCase())) {
        bestCategory = category;
        break;
      }
    }
  }
  
  // Priority 2: Match by interests
  if (!bestCategory) {
    for (const interest of interests) {
      for (const category of categories) {
        if (category.toLowerCase().includes(interest.toLowerCase()) || 
            interest.toLowerCase().includes(category.toLowerCase())) {
          bestCategory = category;
          break;
        }
      }
      if (bestCategory) break;
    }
  }
  
  // Priority 3: Match by skills
  if (!bestCategory) {
    if (skills.some(s => ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Python', 'OpenCV'].includes(s))) {
      bestCategory = 'AI/ML';
    } else if (skills.some(s => ['React Native', 'Flutter', 'Swift', 'Kotlin'].includes(s))) {
      bestCategory = 'Mobile Development';
    } else {
      bestCategory = 'Web Development'; // default
    }
  }
  
  // Get projects from best category
  let projects = levelProjects[bestCategory] || [];
  
  // If not enough projects, add from related categories
  if (projects.length < 3) {
    for (const cat of categories) {
      if (cat !== bestCategory && levelProjects[cat]) {
        projects = [...projects, ...levelProjects[cat]];
        if (projects.length >= 5) break;
      }
    }
  }
  
  // Generate final projects with fit scores and technologies
  return projects.slice(0, 5).map((project, index) => {
    const fitScore = calculateFitScore(project, profile);
    const technologies = selectTechnologies(project, skills, profile.technologies || []);
    
    return {
      id: `proj-rule-${index + 1}`,
      title: project.title,
      description: project.description,
      problemStatement: project.problemStatement,
      difficulty: level,
      fitScore,
      estimatedTime: duration,
      technologies,
      targetUsers: project.targetUsers,
      coreFeatures: project.coreFeatures,
      advancedFeatures: project.advancedFeatures,
      innovation: project.innovation,
      whyItFits: generateWhyItFits(project, profile)
    };
  });
}

function calculateFitScore(project, profile) {
  let score = 75;
  
  const skills = profile.skills || [];
  const interests = profile.interests || [];
  const tech = profile.technologies || [];
  const domain = profile.domain || '';
  
  // Check skill matches
  const allTech = [...project.baseTechnologies, ...project.coreFeatures.join(' ').split(' ')];
  for (const skill of skills) {
    if (allTech.some(t => t.toLowerCase().includes(skill.toLowerCase()))) {
      score += 4;
    }
  }
  
  // Check interest matches
  for (const interest of interests) {
    if (project.description.toLowerCase().includes(interest.toLowerCase()) ||
        project.title.toLowerCase().includes(interest.toLowerCase())) {
      score += 5;
    }
  }
  
  // Check domain match
  if (domain && (project.description.toLowerCase().includes(domain.toLowerCase()) ||
      project.targetUsers.toLowerCase().includes(domain.toLowerCase()))) {
    score += 8;
  }
  
  // Check preferred tech matches
  for (const t of tech) {
    if (project.baseTechnologies.some(bt => bt.toLowerCase().includes(t.toLowerCase()))) {
      score += 3;
    }
  }
  
  return Math.min(score, 98);
}

function selectTechnologies(project, skills, preferredTech) {
  const techSet = new Set();
  
  // Add from preferred tech that match project
  for (const t of preferredTech) {
    if (project.baseTechnologies.some(bt => bt.toLowerCase().includes(t.toLowerCase()))) {
      techSet.add(t);
    }
  }
  
  // Add from skills that match project
  for (const s of skills) {
    if (project.baseTechnologies.some(bt => bt.toLowerCase().includes(s.toLowerCase()))) {
      techSet.add(s);
    }
  }
  
  // Add base technologies to fill
  for (const t of project.baseTechnologies) {
    if (techSet.size >= 5) break;
    techSet.add(t);
  }
  
  return Array.from(techSet).slice(0, 5);
}

function generateWhyItFits(project, profile) {
  const reasons = [];
  const skills = profile.skills || [];
  const interests = profile.interests || [];
  const domain = profile.domain || '';
  
  if (skills.length > 0) {
    reasons.push(`Uses your ${skills.slice(0, 2).join(' and ')} skills`);
  }
  if (interests.length > 0) {
    reasons.push(`matches ${interests[0]} interest`);
  }
  if (domain) {
    reasons.push(`aligned with ${domain} domain`);
  }
  
  return reasons.length > 0 
    ? reasons.join(', ').charAt(0).toUpperCase() + reasons.join(', ').slice(1) + '.'
    : 'Good fit for your profile.';
}

export default { generateRuleBasedProjects };
