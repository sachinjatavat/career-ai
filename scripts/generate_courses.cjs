const fs = require('fs');

const topics = [
  { name: 'AI', tags: ['Artificial Intelligence', 'Neural Networks', 'Deep Learning', 'Generative AI', 'Computer Vision', 'NLP'] },
  { name: 'ML', tags: ['Machine Learning', 'Data Science', 'Python', 'Predictive Modeling', 'Reinforcement Learning', 'Scikit-Learn'] },
  { name: 'Teaching', tags: ['Education', 'Pedagogy', 'Instructional Design', 'E-learning', 'Classroom Management', 'Special Education'] },
  { name: 'Marketing', tags: ['Digital Marketing', 'SEO', 'Content Strategy', 'Social Media', 'Email Marketing', 'Brand Management'] },
  { name: 'Fintech', tags: ['Finance', 'Blockchain', 'Cryptocurrency', 'Algorithmic Trading', 'Smart Contracts', 'Defi'] },
  { name: 'Medicine', tags: ['Healthcare', 'Anatomy', 'Medical Terminology', 'Pathology', 'Pharmacology', 'Physiology'] },
  { name: 'Programming', tags: ['React', 'TypeScript', 'Node.js', 'System Design', 'Algorithms', 'Databases'] },
  { name: 'Design', tags: ['UI/UX', 'Figma', 'Typography', 'Graphic Design', 'Design Thinking', 'Interaction Design'] }
];

const levels = ['Beginner', 'Intermediate', 'Advanced'];
const channels = ['Coursera', 'edX', 'FreeCodeCamp', 'MIT OpenCourseWare', 'Stanford Online', 'HarvardX', 'CrashCourse', 'Simplilearn'];

const courses = [];
let id = 1;

topics.forEach(topic => {
  for (let i = 0; i < 15; i++) {
    const level = levels[Math.floor(Math.random() * levels.length)];
    const channel = channels[Math.floor(Math.random() * channels.length)];
    const tag = topic.tags[Math.floor(Math.random() * topic.tags.length)];
    const duration = `${Math.floor(Math.random() * 8) + 1}h ${Math.floor(Math.random() * 60).toString().padStart(2, '0')}m`;
    
    courses.push({
      id: id++,
      title: `${level} ${tag}: Master ${topic.name} Concepts`,
      category: topic.name,
      channel: channel,
      thumbnail: `https://picsum.photos/seed/${topic.name.toLowerCase()}${i}/400/225`,
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(tag + ' course')}`,
      duration: duration,
      level: level
    });
  }
});

const fileContent = `export interface Course {
  id: number;
  title: string;
  category: string;
  channel: string;
  thumbnail: string;
  url: string;
  duration: string;
  level: string;
}

export const courses: Course[] = ${JSON.stringify(courses, null, 2)};
`;

fs.mkdirSync('src/data', { recursive: true });
fs.writeFileSync('src/data/courses.ts', fileContent);
console.log('Done generating 120 courses.');
