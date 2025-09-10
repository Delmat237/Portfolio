const techData = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', color: '#61DAFB' },
      { name: 'Next.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', color: '#000000' },
      { name: 'TypeScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', color: '#3178C6' },
      { name: 'Tailwind CSS', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg', color: '#06B6D4' },
      { name: 'HTML5', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', color: '#E34F26' },
      { name: 'CSS3', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', color: '#1572B6' },
      { name: 'JavaScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', color: '#F7DF1E' },
      { name: 'Shadcn UI', src: 'https://shadcn.com/favicon-32x32.png', color: '#000000' },
    ]
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Python', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', color: '#3776AB' },
      { name: 'Java', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', color: '#ED8B00' },
      { name: 'Node.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', color: '#339933' },
      { name: 'C#', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg', color: '#239120' },
    ]
  },
  {
    title: 'Base de données',
    skills: [
      { name: 'MySQL', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', color: '#4479A1' },
      { name: 'PostgreSQL', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', color: '#336791' },
      { name: 'Firebase', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', color: '#FFCA28' },
      { name: 'SQLite', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg', color: '#003B57' },
      { name: 'MongoDB', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', color: '#47A248' },
      {name : 'ScyllaDB', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scylladb/scylladb-plain.svg', color: '#003B57' },
    ]
  },
  {
    title: 'Framework',
    skills: [
      { name: 'Django', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg', color: '#092E20' },
      { name: 'Spring', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg', color: '#6DB33F' },
      { name: 'FastAPI', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg', color: '#009688' },
    ]
  },
  {
    title: 'Mobile',
    skills: [
      { name: 'React Native', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', color: '#61DAFB' },
      { name: 'Flutter', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg', color: '#02569B' },
      { name: 'FlutterFlow', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutterflow/flutterflow-original.svg', color: '#00BFFF' },
    ]
  },
  {
    title: 'DevOps & Cloud',
    skills: [
      { name: 'Docker', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', color: '#2496ED' },
      { name: 'Kubernetes', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg', color: '#326CE5' },
      { name : 'Cloudinary', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudinary/cloudinary-original.svg', color: '#F7B93E' },
    ]
  },
  {
    title : 'Outils de collaboration',
    skills: [
      { name: 'Git', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', color: '#F05032' },
      { name: 'GitHub', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', color: '#181717' },
      { name: 'GitLab', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg', color: '#FC6D26' },
      { name: 'Jira', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg', color: '#0052CC' }, 
      { name: 'Trello', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/trello/trello-plain.svg', color: '#0079BF' },
    ]
  },
  {
    title : 'Outils de deployment',
    skills: [
      { name: 'Vercel', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg', color: '#000000' },
      { name: 'Firebase Hosting', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', color: '#FFCA28' },
      { name: 'Render', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/render/render-original.svg', color: '#4D4D4D' },
      { name: 'PythonAnywhere', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', color: '#3776AB' },
    ]
  },
  {
    title: ' Autres',
    skills: [
      { name: 'Figma', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', color: '#F24E1E' },
      { name: 'Postman', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg', color: '#FF6C37' },
      { name: 'VSCode', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', color: '#007ACC' },
      { name: 'Jupyter Notebook', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg', color: '#F37626' },
      { name: 'Swagger', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swagger/swagger-original.svg', color: '#85EA2D' },
      { name: 'IntelliJ IDEA', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg', color: '#000000' },
    ]
  }
];

export default techData;