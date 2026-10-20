import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  BookOpen,
  Brain,
  Building2,
  ChartColumn,
  ChartNoAxesColumn,
  ChevronDown,
  ChevronLeft,
  CircleCheckBig,
  Cloud,
  CodeXml,
  CreditCard,
  FileText,
  GitBranch,
  Globe,
  HeartHandshake,
  Lightbulb,
  Mail,
  MessageSquare,
  Package,
  Phone,
  RefreshCw,
  Rocket,
  Search,
  Send,
  Server,
  Shield,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  TestTubeDiagonal,
  Truck,
  User,
  Users,
  X,
  Zap,
} from 'lucide-react'

export const navLinks = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Work', id: 'work' },
]

export const heroStats = [
  { label: 'Founded', val: '2026' },
  { label: 'Approach', val: 'Custom-First' },
  { label: 'Background', val: 'CS Grads' },
]

export const tickerItems = [
  'Custom Architecture',
  '—',
  'AI Integration',
  '—',
  'Cloud Native',
  '—',
  'Mobile Dev',
  '—',
  'Enterprise Backend',
  '—',
  'DevOps & CI/CD',
]

export const aboutChapters = [
  {
    num: '01',
    sub: 'The beginning',
    heading: 'Born from engineering, not templates.',
    body: 'Founded by two Computer Science graduates who were tired of generic software. We started Astruxio to build systems that actually compound in value — not just ship features.',
    pillars: [
      {
        label: 'Custom-First Architecture',
        desc: 'Every system starts from first principles. No shortcuts, no templates.',
      },
      {
        label: 'AI-Augmented Engineering',
        desc: 'Intelligent automation at the core, not bolted on as an afterthought.',
      },
    ],
  },
  {
    num: '02',
    sub: 'The approach',
    heading: 'We build systems that think.',
    body: "From greenfield cloud-native platforms to AI-integrated data pipelines, our engineers operate at the intersection of precision and speed. We don't just ship code — we ship value.",
    pillars: [
      {
        label: 'Zero-Compromise Quality',
        desc: 'Battle-tested code reviewed to the line — production-ready from day one.',
      },
      {
        label: 'End-to-End Ownership',
        desc: 'Architecture to deployment, we take complete responsibility.',
      },
    ],
  },
  {
    num: '03',
    sub: 'The commitment',
    heading: 'Engineering for boundless scale.',
    body: 'Enterprise-grade security and compliance by default. Dedicated teams embedded in your workflow. Transparent delivery with milestone-based reporting throughout.',
    pillars: [
      {
        label: 'Dedicated Teams',
        desc: 'Embedded engineers who understand your workflow and product.',
      },
      {
        label: 'Transparent Delivery',
        desc: 'Milestone-based reporting — you always know where things stand.',
      },
    ],
  },
]

export const principles = [
  {
    num: '01',
    title: 'First-Principles Design',
    wide: true,
    desc: 'We start from fundamental engineering principles, not pre-built templates. Every architectural decision is justified by technical and business context.',
  },
  {
    num: '02',
    title: 'AI-Augmented Development',
    wide: false,
    desc: 'Intelligent automation is woven into every layer — from code generation and review, to runtime monitoring and predictive scaling.',
  },
  {
    num: '03',
    title: 'Production-Grade Quality',
    wide: false,
    desc: 'Battle-tested code, comprehensive test coverage, and peer review processes that guarantee production-readiness before a single commit is merged.',
  },
  {
    num: '04',
    title: 'End-to-End Ownership',
    wide: false,
    desc: 'We take complete responsibility from architecture through deployment. No handoffs, no blame — just accountability at every stage.',
  },
  {
    num: '05',
    title: 'Scale by Default',
    wide: false,
    desc: 'Cloud-native architectures built for horizontal scale. We engineer for traffic spikes, data growth, and global distribution from day one.',
  },
  {
    num: '06',
    title: 'Transparent Communication',
    wide: true,
    desc: 'Milestone-based delivery with daily visibility into progress. You always know exactly where your product stands in the engineering lifecycle.',
  },
]

export const serviceColors = ['#C9843A', '#E8A85A', '#B09880', '#7A5C42', '#C4AC90', '#6B4226']

export const services = [
  {
    num: '01',
    icon: Globe,
    title: 'Web Engineering',
    desc: 'High-performance web platforms built with modern frameworks. From landing pages to complex multi-tenant SaaS — we engineer for scale from day one.',
  },
  {
    num: '02',
    icon: Smartphone,
    title: 'Mobile Development',
    desc: 'Cross-platform native applications for iOS and Android using React Native and Flutter. Performant, polished, and production-hardened.',
  },
  {
    num: '03',
    icon: Brain,
    title: 'AI Integration',
    desc: 'Embed intelligence into your product — from recommendation engines and NLP pipelines to LLM-powered features and computer vision systems.',
  },
  {
    num: '04',
    icon: Server,
    title: 'Backend Systems',
    desc: 'Microservices, REST and GraphQL APIs, real-time event systems — built on PostgreSQL, Redis, Kafka, and more. Reliable at any load.',
  },
  {
    num: '05',
    icon: Cloud,
    title: 'Cloud & DevOps',
    desc: 'AWS, GCP, and Azure architecture. CI/CD pipelines, Kubernetes orchestration, IaC with Terraform — your infrastructure as code.',
  },
  {
    num: '06',
    icon: ShieldCheck,
    title: 'Security & Compliance',
    desc: 'End-to-end security engineering — penetration testing, OWASP hardening, SOC2 readiness, GDPR compliance, and secure SDLC practices.',
  },
]

export const faqs = [
  {
    q: 'What types of projects does Astruxio take on?',
    a: 'We work on custom software products, AI-integrated systems, cloud platforms, and enterprise backend infrastructure. Best suited for ambitious teams who want production-quality engineering from day one.',
  },
  {
    q: 'How does the engagement process work?',
    a: 'We start with a discovery call to understand your goals, then produce a detailed technical specification. Development begins with milestone-based delivery and daily standups.',
  },
  {
    q: 'Do you offer post-launch support?',
    a: 'Yes — flexible retainer-based support, ongoing feature development, and dedicated SLA-backed maintenance packages tailored to your needs.',
  },
  {
    q: 'Can you work with our existing team?',
    a: 'Absolutely. We can augment your engineering team, handle specific technical challenges, or operate as your primary development partner depending on what serves you best.',
  },
]

export const processSteps = [
  {
    icon: Lightbulb,
    num: '01',
    label: 'Discovery',
    sub: 'Deep-dive into your goals, constraints, and technical landscape. No assumptions — only listening and asking the right questions.',
  },
  {
    icon: Search,
    num: '02',
    label: 'Research',
    sub: 'Technical investigation, competitive analysis, and architectural feasibility. We define the right path before writing a single line.',
  },
  {
    icon: GitBranch,
    num: '03',
    label: 'Architecture',
    sub: 'System design, stack selection, and infrastructure planning. Every decision is documented, justified, and reviewed.',
  },
  {
    icon: CodeXml,
    num: '04',
    label: 'Engineering',
    sub: 'Sprint-based feature development with daily updates, thorough code reviews, and continuous integration from day one.',
  },
  {
    icon: TestTubeDiagonal,
    num: '05',
    label: 'Quality',
    sub: "Unit, integration, E2E, and performance testing. We don't ship what we wouldn't stake our reputation on.",
  },
  {
    icon: Rocket,
    num: '06',
    label: 'Deploy',
    sub: 'Zero-downtime launch with automated CI/CD, comprehensive monitoring, and rollback readiness built in from the start.',
  },
  {
    icon: HeartHandshake,
    num: '07',
    label: 'Support',
    sub: 'Post-launch retainer packages, proactive monitoring, and a dedicated engineering contact — not a ticket queue.',
  },
]

export const techStack = [
  {
    key: 'frontend',
    name: 'Frontend',
    color: '#C9843A',
    techs: ['React', 'Next.js', 'TypeScript', 'Vue.js', 'Tailwind CSS', 'Vite'],
  },
  {
    key: 'backend',
    name: 'Backend',
    color: '#E8A85A',
    techs: ['Node.js', 'FastAPI', 'GraphQL', 'PostgreSQL', 'Redis', 'Kafka'],
  },
  {
    key: 'ai',
    name: 'AI / ML',
    color: '#B09880',
    techs: ['PyTorch', 'LangChain', 'OpenAI API', 'TensorFlow', 'HuggingFace', 'Pinecone'],
  },
  {
    key: 'cloud',
    name: 'Cloud & DevOps',
    color: '#7A5C42',
    techs: ['AWS', 'GCP', 'Kubernetes', 'Docker', 'Terraform', 'GitHub Actions'],
  },
  {
    key: 'mobile',
    name: 'Mobile',
    color: '#D4C6B0',
    techs: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Expo', 'Firebase'],
  },
]

export const ziyaMetrics = [
  { val: '2M+', label: 'Lessons Delivered' },
  { val: '99.9%', label: 'Uptime SLA' },
  { val: '<2s', label: 'Avg. Load Time' },
  { val: '100%', label: 'Data Secured' },
]

export const ziyaCapabilities = [
  {
    icon: BookOpen,
    num: '01',
    title: 'Smart Attendance',
    desc: 'Mark and track daily attendance in seconds. Automated reports delivered instantly to administrators.',
  },
  {
    icon: ChartColumn,
    num: '02',
    title: 'Syllabus & Tasks',
    desc: 'Assign, monitor, and review lesson plans, homework tasks, and Quran recitation milestones.',
  },
  {
    icon: Users,
    num: '03',
    title: 'Progress Analytics',
    desc: 'Visual dashboards for teachers and principals to track individual and class-level performance in real time.',
  },
  {
    icon: Bell,
    num: '04',
    title: 'Parent Notifications',
    desc: 'Real-time push notifications and broadcast alerts keeping every parent informed.',
  },
  {
    icon: Shield,
    num: '05',
    title: 'Data Security',
    desc: 'End-to-end encrypted student records. GDPR-ready data handling with role-based access control.',
  },
  {
    icon: Zap,
    num: '06',
    title: 'Instant Sync',
    desc: 'Live data sync across all devices. Any update reflects everywhere within milliseconds.',
  },
]

export const hotspotMetrics = [
  { val: '10K+', label: 'Orders Processed' },
  { val: '99.9%', label: 'Uptime SLA' },
  { val: '100%', label: 'Secure Payments' },
  { val: '<2s', label: 'Page Load' },
]

export const hotspotCapabilities = [
  {
    icon: ShoppingBag,
    num: '01',
    title: 'Storefront',
    desc: 'High-quality product display with dynamic categories, search, and intuitive navigation built for conversion.',
  },
  {
    icon: CreditCard,
    num: '02',
    title: 'Secure Checkout',
    desc: 'Integrated with Razorpay for safe, reliable transactions with customized local delivery options.',
  },
  {
    icon: Package,
    num: '03',
    title: 'Admin Dashboard',
    desc: 'Powerful tools to manage inventory, fulfill orders, and update promotional banners without coding.',
  },
  {
    icon: Truck,
    num: '04',
    title: 'Local Delivery',
    desc: 'Custom delivery zone management with real-time tracking integrated into the customer dashboard.',
  },
  {
    icon: ChartNoAxesColumn,
    num: '05',
    title: 'Sales Analytics',
    desc: 'In-depth reporting on orders, revenue, and top products to drive smarter business decisions.',
  },
  {
    icon: RefreshCw,
    num: '06',
    title: 'Live Inventory',
    desc: 'Real-time stock management with automated low-stock alerts and seamless restocking workflows.',
  },
]

export const contactIcons = {
  user: User,
  mail: Mail,
  phone: Phone,
  company: Building2,
  message: MessageSquare,
  send: Send,
  close: X,
  check: CircleCheckBig,
  back: ChevronLeft,
  next: ArrowRight,
  external: ArrowUpRight,
  chevron: ChevronDown,
  privacy: Shield,
  terms: FileText,
}

export const legalContent = {
  privacy: {
    title: 'Privacy Policy',
    label: 'Last Updated: May 2026',
    icon: Shield,
    sections: [
      {
        heading: 'Information We Collect',
        body: 'We collect information you provide directly to us, including your name, email address, and any messages submitted via our contact forms. We may also collect usage data to improve our services.',
      },
      {
        heading: 'How We Use Your Information',
        body: 'We use the information we collect to communicate with you, respond to your inquiries, improve our services, and ensure the security of our systems. We do not sell or share your personal data with third parties for marketing purposes.',
      },
      {
        heading: 'Data Retention',
        body: 'We retain your information only for as long as necessary to fulfill the purposes outlined in this policy, or as required by applicable law. You may request deletion of your data at any time by contacting us.',
      },
      {
        heading: 'Security',
        body: 'We implement industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure and we cannot guarantee absolute security.',
      },
      {
        heading: 'Cookies',
        body: 'Our site may use cookies to enhance your browsing experience. You can instruct your browser to refuse all cookies or indicate when a cookie is being sent. Refusing cookies may affect certain functionality of this site.',
      },
      {
        heading: 'Changes to This Policy',
        body: 'We may update this Privacy Policy periodically. We will notify you of changes by updating the "Last Updated" date. Continued use constitutes acceptance of the updated policy.',
      },
      {
        heading: 'Contact',
        body: 'If you have questions about this Privacy Policy, please contact us at info@astruxio.in.',
      },
    ],
  },
  terms: {
    title: 'Terms of Service',
    label: 'Effective Date: May 2026',
    icon: FileText,
    sections: [
      {
        heading: 'Acceptance of Terms',
        body: 'By accessing and using the Astruxio website or engaging our services, you accept and agree to be bound by these Terms of Service. If you do not agree, please discontinue use immediately.',
      },
      {
        heading: 'Services',
        body: 'Astruxio provides custom software engineering, cloud infrastructure, AI integration, and related technology services. All service engagements are governed by a separate written agreement signed by both parties.',
      },
      {
        heading: 'Intellectual Property',
        body: 'All content on this website — including designs, code, text, and branding — is the property of Astruxio Systems. You may not reproduce, distribute, or create derivative works without our express written consent.',
      },
      {
        heading: 'Client Deliverables',
        body: 'Upon full payment of agreed fees, intellectual property rights for custom deliverables transfer to the client as specified in the project agreement. Astruxio retains the right to showcase non-confidential work in our portfolio.',
      },
      {
        heading: 'Limitation of Liability',
        body: 'To the fullest extent permitted by law, Astruxio shall not be liable for any indirect, incidental, or consequential damages arising from your use of our website or services.',
      },
      {
        heading: 'Governing Law',
        body: 'These Terms are governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of relevant jurisdiction in India.',
      },
      {
        heading: 'Modifications',
        body: 'We reserve the right to modify these Terms at any time. Changes are effective upon posting. Your continued use constitutes acceptance of any revised terms.',
      },
    ],
  },
}
