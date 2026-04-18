export interface ClassScheduleSession {
  date: string
  time: string
}

export interface ClassSchedule {
  title: string
  sessions: ClassScheduleSession[]
}

export enum GradeLevel {
  Secondary1Year2025 = 'Secondary 1 (2025)',
  Secondary2Year2025 = 'Secondary 2 (2025)',
  Secondary3Year2025 = 'Secondary 3 (2025)',
  Secondary4Year2025 = 'Secondary 4 (2025)',
}

export enum SubjectName {
  Physics = 'Physics',
  Chemistry = 'Chemistry',
  Mathematics = 'Mathematics',
}

const referralDiscount = {
  title: 'Referral Discount',
  description: 'Get SGD 50 off for each friend you refer! (No upper limit)',
}

const freeTrialAndFreeClasses = [
  {
    title: 'Free trial class',
    description:
      'Want to give us a try before committing? Everyone is welcome to a free trial class!',
  },
  {
    title: 'The first 2 classes are FREE!',
    description: 'Worth SGD 200.',
  },
]

export interface SubjectClass {
  slug: string
  subject: string
  subjectName: SubjectName // Changed to use SubjectName enum
  gradeLevel: GradeLevel // Changed to use GradeLevel enum
  description: string
  ctaText: string
  classSchedules?: ClassSchedule[]
  pricing?: {
    amount: number
    currency: string
  }
  onlinePricing?: {
    amount: number
    currency: string
  }
  classSize?: number
  promotions?: {
    title: string
    description: string
  }[]
  additionalInfo?: {
    title: string
    description: string
  }[]
  additionalInfo2?: {
    title: string
    description: string
  }[]
  filterBy?: string[]
  isTBA?: boolean
  perLessonPricing?: boolean
  brochureStringName?: string
}

export const classesData: { [key: string]: SubjectClass } = {
  physics2025S3: {
    subjectName: SubjectName.Physics,
    gradeLevel: GradeLevel.Secondary3Year2025,
    slug: 'physics-2025-sec3',
    brochureStringName: 'physics_sec3_2025_fusion_tuition.png',
    subject: 'Physics 2025 - Secondary 3',
    description:
      'Comprehensive Physics course for Secondary 3 students, covering the full syllabus and preparing you for exams. 2 identical classes a week to better accommodate your busy schedules.',
    ctaText: 'View Details',
    classSchedules: [
      {
        title: 'Secondary 3 Physics Schedule (2025)',
        sessions: [
          { date: 'Class 1 Saturday', time: '10:00 AM-12:00 PM' },
          {
            date: 'Flexible Timing',
            time: "Don't see a time that works? Contact us to discuss alternative schedules!",
          },
        ],
      },
    ],
    classSize: 5,
    pricing: {
      amount: 100,
      currency: 'SGD',
    },
    onlinePricing: {
      amount: 90,
      currency: 'SGD',
    },
    perLessonPricing: true,
    promotions: [
      referralDiscount,
      {
        title: 'Multiple-subject sign ups',
        description:
          'If you sign up for the Chemistry or Mathematics class too, you will receive a 10% discount on the second and third class.',
      },
    ],
    additionalInfo: [
      {
        title: 'Class Flexibility',
        description: 'Additional classes may be opened based on demand.',
      },
    ],
    filterBy: ['Physics', 'Secondary 3'],
  },
  physics2025S4: {
    subjectName: SubjectName.Physics,
    gradeLevel: GradeLevel.Secondary4Year2025,
    slug: 'physics-2025-sec4',
    brochureStringName: 'physics_sec4_2025_fusion_tuition.png',
    subject: 'Physics 2025 - Secondary 4',
    description:
      'Comprehensive Physics course for Secondary 4 students. 2 identical classes a week to better accommodate your busy schedules.',
    ctaText: 'View Details',
    classSchedules: [
      {
        title: 'Secondary 4 Physics Schedule',
        sessions: [
          { date: 'Monday Class 1', time: '4:00 PM - 6:00 PM' },
          { date: 'Thursday Class 2', time: '3:30 PM - 5:30 PM' },
          {
            date: 'Flexible Timing',
            time: "Don't see a time that works? Contact us to discuss alternative schedules!",
          },
        ],
      },
    ],
    classSize: 5,
    pricing: {
      amount: 100,
      currency: 'SGD',
    },
    onlinePricing: {
      amount: 90,
      currency: 'SGD',
    },
    perLessonPricing: true,
    promotions: [
      referralDiscount,
      {
        title: 'Multiple-subject sign ups',
        description:
          'If you sign up for the Chemistry or Mathematics class too, you will receive a 10% discount on the second and third class.',
      },
    ],
    additionalInfo: [
      {
        title: 'Class Flexibility',
        description: 'Additional classes may be opened based on demand.',
      },
    ],
    additionalInfo2: [...freeTrialAndFreeClasses],
    filterBy: ['Physics', 'Secondary 4'],
  },
  chemistry2025S3: {
    subjectName: SubjectName.Chemistry,
    gradeLevel: GradeLevel.Secondary3Year2025,
    slug: 'chemistry-2025-sec3',
    brochureStringName: 'chemistry_sec3_2025_fusion_tuition.png',
    subject: 'Chemistry 2025 - Secondary 3',
    description:
      'In-depth Chemistry classes for Secondary 3 students to build a strong foundation. 2 identical classes a week to better accommodate your busy schedules.',
    ctaText: 'View Details',
    classSchedules: [
      {
        title: 'Secondary 3 Chemistry Schedule',
        sessions: [
          { date: 'Saturday Class 1', time: '2:30 PM-4:30 PM' },
          { date: 'Sunday Class 2', time: '4:00 PM-6:00 PM' },
          {
            date: 'Flexible Timing',
            time: "Don't see a time that works? Contact us to discuss alternative schedules!",
          },
        ],
      },
    ],
    classSize: 5,
    pricing: {
      amount: 100,
      currency: 'SGD',
    },
    onlinePricing: {
      amount: 90,
      currency: 'SGD',
    },
    perLessonPricing: true,
    promotions: [
      referralDiscount,
      {
        title: 'Multiple-subject sign ups',
        description:
          'If you sign up for the Physics or Mathematics class too, you will receive a 10% discount on the second and third class.',
      },
    ],
    additionalInfo: [
      {
        title: 'Class Flexibility',
        description: 'Additional classes may be opened based on demand.',
      },
    ],
    additionalInfo2: [...freeTrialAndFreeClasses],
    filterBy: ['Chemistry', 'Secondary 3'],
  },
  chemistry2025S4: {
    subjectName: SubjectName.Chemistry,
    gradeLevel: GradeLevel.Secondary4Year2025,
    slug: 'chemistry-2025-sec4',
    brochureStringName: 'chemistry_sec4_2025_fusion_tuition.png',
    subject: 'Chemistry 2025 - Secondary 4',
    description:
      'Comprehensive Physics course for Secondary 4 students. 2 identical classes a week to better accommodate your busy schedules.',
    ctaText: 'View Details',
    classSchedules: [
      {
        title: 'Secondary 4 Chemistry Schedule',
        sessions: [
          { date: 'Saturday Class 1', time: '1:00 PM-3:00 PM' },
          { date: 'Sunday Class 2', time: '3:30 PM-5:30 PM' },
          {
            date: 'Flexible Timing',
            time: "Don't see a time that works? Contact us to discuss alternative schedules!",
          },
        ],
      },
    ],
    classSize: 5,
    pricing: {
      amount: 100,
      currency: 'SGD',
    },
    onlinePricing: {
      amount: 90,
      currency: 'SGD',
    },
    perLessonPricing: true,
    promotions: [
      referralDiscount,
      {
        title: 'Multiple-subject sign ups',
        description:
          'If you sign up for the Physics or Mathematics class too, you will receive a 10% discount on the second and third class.',
      },
    ],
    additionalInfo: [
      {
        title: 'Class Flexibility',
        description: 'Additional classes may be opened based on demand.',
      },
    ],
    additionalInfo2: [...freeTrialAndFreeClasses],
    filterBy: ['Chemistry', 'Secondary 4'],
  },

  mathematics2025S1: {
    subjectName: SubjectName.Mathematics,
    gradeLevel: GradeLevel.Secondary1Year2025,
    slug: 'mathematics-2025-sec1',
    subject: 'Mathematics 2025 - Secondary 1',
    description:
      'Mathematics course designed to enhance problem-solving skills for Secondary 1 students.',
    ctaText: 'View Details',
    classSchedules: [
      {
        title: 'Secondary 1 Mathematics Schedule',
        sessions: [
          { date: 'Monday', time: '2:00pm-4:00pm' },
          { date: 'Thursday', time: '3:00pm-5:00pm' },
        ],
      },
    ],
    classSize: 5,
    pricing: {
      amount: 380,
      currency: 'SGD',
    },
    promotions: [
      {
        title: 'New Student Offer',
        description: 'First class free for new students!',
      },
      {
        title: 'Holiday Special',
        description: '20% off for holiday intensive courses.',
      },
    ],
    additionalInfo: [
      {
        title: 'Class Flexibility',
        description: 'Additional classes may be opened based on demand.',
      },
    ],
    additionalInfo2: [
      {
        title: 'Parent-Teacher Meeting',
        description: 'Quarterly parent-teacher meetings to discuss progress.',
      },
    ],
    filterBy: ['Mathematics', 'Secondary 1'],
    isTBA: true,
  },
  mathematics2025S2: {
    subjectName: SubjectName.Mathematics,
    gradeLevel: GradeLevel.Secondary2Year2025,
    slug: 'mathematics-2025-sec2',
    isTBA: true,
    subject: 'Mathematics 2025 - Secondary 2',
    description:
      'Mathematics course designed to enhance problem-solving skills for Secondary 2 students.',
    ctaText: 'View Details',
    classSchedules: [
      {
        title: 'Secondary 2 Mathematics Schedule',
        sessions: [
          { date: 'Tuesday', time: '3:00pm-5:00pm' },
          { date: 'Friday', time: '2:00pm-4:00pm' },
        ],
      },
    ],
    classSize: 5,
    pricing: {
      amount: 390,
      currency: 'SGD',
    },
    promotions: [
      {
        title: 'Early Registration',
        description: 'Register 2 months in advance for a 10% discount.',
      },
      {
        title: 'Bring-a-Friend Promotion',
        description: 'Bring a friend and both get 15% off for the first month.',
      },
    ],
    additionalInfo: [
      {
        title: 'Class Flexibility',
        description: 'Additional classes may be opened based on demand.',
      },
    ],
    additionalInfo2: [
      {
        title: 'Online Resources',
        description: 'Access to our online problem bank and video tutorials.',
      },
    ],
    filterBy: ['Mathematics', 'Secondary 2'],
  },
  mathematics2025S3: {
    subjectName: SubjectName.Mathematics,
    gradeLevel: GradeLevel.Secondary3Year2025,
    slug: 'mathematics-2025-sec3',
    isTBA: true,
    subject: 'Mathematics 2025 - Secondary 3',
    description:
      'Mathematics course designed to enhance problem-solving skills for Secondary 3 students.',
    ctaText: 'View Details',
    classSchedules: [
      {
        title: 'Secondary 3 Mathematics Schedule',
        sessions: [
          { date: 'Wednesday', time: '4:00pm-6:00pm' },
          { date: 'Saturday', time: '9:00am-11:00am' },
        ],
      },
    ],
    classSize: 5,
    pricing: {
      amount: 410,
      currency: 'SGD',
    },
    promotions: [
      {
        title: 'Summer Intensive Discount',
        description: '15% off for our summer intensive program.',
      },
      {
        title: 'Multiple-subject Enrollment',
        description: 'Enroll in Math and Science for a 12% total discount.',
      },
    ],
    additionalInfo: [
      {
        title: 'Class Flexibility',
        description: 'Additional classes may be opened based on demand.',
      },
    ],
    additionalInfo2: [
      {
        title: 'Weekly Quizzes',
        description: 'Short weekly quizzes to reinforce learning.',
      },
    ],
    filterBy: ['Mathematics', 'Secondary 3'],
  },
  mathematics2025S4: {
    subjectName: SubjectName.Mathematics,
    gradeLevel: GradeLevel.Secondary4Year2025,
    slug: 'mathematics-2025-sec4',
    isTBA: true,
    subject: 'Mathematics 2025 - Secondary 4',
    description:
      'Mathematics course designed to enhance problem-solving skills for Secondary 4 students.',
    ctaText: 'View Details',
    classSchedules: [
      {
        title: 'Secondary 4 Mathematics Schedule',
        sessions: [
          { date: 'Thursday', time: '17:00-19:00' },
          { date: 'Sunday', time: '10:00-12:00' },
        ],
      },
    ],
    classSize: 5,
    pricing: {
      amount: 430,
      currency: 'SGD',
    },
    promotions: [
      {
        title: 'Exam Prep Package',
        description: 'Sign up for our exam prep package and save 20%.',
      },
      {
        title: 'Study Buddy Discount',
        description: 'Enroll with a study buddy for a 10% discount each.',
      },
    ],
    additionalInfo: [
      {
        title: 'Class Flexibility',
        description: 'Additional classes may be opened based on demand.',
      },
    ],
    additionalInfo2: [
      {
        title: 'One-on-One Consultations',
        description: 'Monthly one-on-one consultation with our top instructor.',
      },
    ],
    filterBy: ['Mathematics', 'Secondary 4'],
  },
}
