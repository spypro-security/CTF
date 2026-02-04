import { useState } from "react";
import "./internships.css";
import InternshipDetail from "./InternshipDetail";

function Internship() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedInternship, setSelectedInternship] = useState(null);

  const internships = [
    {
      id: 1,
      title: "Python Development",
      image: "/python.png",
      cardBg: "bg-blue-50",
      btnClass: "btn-blue",
      cornerClass: "corner-blue",
      description: "Master Python with real-world projects",
      skills: ["Django", "Flask", "APIs"],
      fullDescription: "Dive deep into Python development with our comprehensive internship program. You'll work on real-world projects, learn industry best practices, and gain hands-on experience with modern Python frameworks. Build scalable web applications and RESTful APIs.",
      duration: "3 months + mini project\n6 months + major project",
      mode: "online / offline ",
      stipend: "₹5,000 - ₹12,000/month",
      requirements: [
        "Basic Python knowledge",
        "Understanding of OOP concepts",
        "Passion for backend development",
        "Problem-solving skills"
      ],
      learningOutcomes: [
        "Build REST APIs with Flask/Django",
        "Deploy web applications to cloud",
        "Work with databases (PostgreSQL, MongoDB)",
        "Collaborate using Git and GitHub",
        "Write clean, maintainable code"
      ],
    },
    {
      id: 2,
      title: "Java Full Stack",
      image: "/java.png",
      cardBg: "bg-orange-50",
      btnClass: "btn-blue",
      cornerClass: "corner-orange",
      description: "Build full stack apps using Java & React",
      skills: ["Spring Boot", "React", "MySQL"],
      fullDescription: "Become a full stack developer by mastering both frontend and backend technologies. Work on enterprise-level applications using Java Spring Boot and React. Learn microservices architecture and modern development practices.",
      duration: "3 months + mini project\n6 months + major project",
      mode: "online / offline ",
      stipend: "₹5,000 - ₹12,000/month",
      requirements: [
        "Java fundamentals",
        "HTML/CSS/JavaScript basics",
        "Database concepts",
        "Willingness to learn new technologies"
      ],
      learningOutcomes: [
        "Develop microservices with Spring Boot",
        "Create responsive UIs with React",
        "Implement JWT authentication",
        "Deploy to AWS/Azure cloud platforms",
        "Work in Agile team environment"
      ],
    },
    {
      id: 3,
      title: "Cyber Security",
      image: "/cyber.png",
      cardBg: "bg-purple-50",
      btnClass: "btn-blue",
      cornerClass: "corner-purple",
      description: "Learn ethical hacking & security tools",
      skills: ["OWASP", "Kali Linux"],
      fullDescription: "Learn to protect systems and networks from cyber threats. Gain practical experience in penetration testing, vulnerability assessment, and security auditing. Master industry-standard tools and ethical hacking techniques.",
      duration: "3 months + mini project\n6 months + major project",
      mode: "online / offline ",
      stipend: "₹5,000 - ₹12,000",
      requirements: [
        "Networking basics (TCP/IP, DNS)",
        "Linux fundamentals",
        "Interest in security and ethical hacking",
        "Analytical thinking"
      ],
      learningOutcomes: [
        "Perform security audits and assessments",
        "Use penetration testing tools (Metasploit, Burp Suite)",
        "Identify and exploit vulnerabilities",
        "Write comprehensive security reports",
        "Understand OWASP Top 10"
      ],
    },
    {
      id: 4,
      title: "AI / ML",
      image: "/aiml.png",
      cardBg: "bg-green-50",
      btnClass: "btn-blue",
      cornerClass: "corner-green",
      description: "Learn AI and Machine Learning concepts",
      skills: ["TensorFlow", "Scikit-learn", "Pandas"],
      fullDescription: "Explore the world of Artificial Intelligence and Machine Learning. Build predictive models, work with neural networks, and solve real-world problems using AI. Master both supervised and unsupervised learning techniques.",
      duration: "3 months + mini project\n6 months + major project",
      mode: "online / offline ",
      stipend: "₹5,000 - ₹12,000/month",
      requirements: [
        "Python programming",
        "Mathematics & statistics background",
        "Problem-solving skills",
        "Interest in data and algorithms"
      ],
      learningOutcomes: [
        "Build ML models (regression, classification)",
        "Work with neural networks using TensorFlow",
        "Process and analyze large datasets",
        "Deploy AI solutions to production",
        "Understand deep learning architectures"
      ],
    },
    {
      id: 5,
      title: "Data Science",
      image: "/data.png",
      cardBg: "bg-yellow-50",
      btnClass: "btn-blue",
      cornerClass: "corner-yellow",
      description: "Analyze data and build insights",
      skills: ["Python", "Pandas", "Matplotlib", "SQL"],
      fullDescription: "Transform raw data into actionable insights. Learn data analysis, visualization, and statistical modeling to make data-driven decisions. Work with real business datasets and solve practical problems.",
      duration: "3 months + mini project\n6 months + major project",
      mode: "online / offline ",
      stipend: "₹5,000 - ₹12,000/month",
      requirements: [
        "Basic Python programming",
        "SQL knowledge",
        "Analytical thinking",
        "Statistics fundamentals"
      ],
      learningOutcomes: [
        "Perform exploratory data analysis",
        "Create compelling visualizations",
        "Build interactive dashboards",
        "Present insights to stakeholders",
        "Work with big data tools"
      ],
    },
    {
      id: 6,
      title: "Generative AI",
      image: "/genai.png",
      cardBg: "bg-pink-50",
      btnClass: "btn-blue",
      cornerClass: "corner-pink",
      description: "Create AI-generated content & models",
      skills: ["ChatGPT API", "DALL·E", "Stable Diffusion"],
      fullDescription: "Work with cutting-edge generative AI technologies. Learn to build applications using large language models, image generation, and other AI tools. Create innovative AI-powered products and solutions.",
      duration: "3 months + mini project\n6 months + major project",
      mode: "online / offline ",
      stipend: "₹5,000 - ₹12,000 /month",
      requirements: [
        "Python programming",
        "API integration experience",
        "Creative problem solving",
        "Interest in AI applications"
      ],
      learningOutcomes: [
        "Integrate OpenAI and other AI APIs",
        "Build AI-powered applications",
        "Fine-tune language models",
        "Create AI products from scratch",
        "Understand prompt engineering"
      ],
    },
    {
      id: 7,
      title: "IoT ML",
      image: "/Iot.png",
      cardBg: "bg-green-50",
      btnClass: "btn-blue",
      cornerClass: "corner-green",
      description: "IoT solutions with Machine Learning",
      skills: ["Arduino", "Python", "TensorFlow", "IoT Protocols"],
      fullDescription: "Combine Internet of Things with Machine Learning to build intelligent IoT solutions. Learn to collect sensor data, process it with ML models, and create smart connected devices. Build end-to-end IoT ML systems.",
      duration: "3 months + mini project\n6 months + major project",
      mode: "online / offline ",
      stipend: "₹5,000 - ₹12,000/month",
      requirements: [
        "Python programming",
        "Basic electronics knowledge",
        "Understanding of IoT concepts",
        "ML fundamentals"
      ],
      learningOutcomes: [
        "Design and build IoT systems",
        "Collect and process sensor data",
        "Deploy ML models on edge devices",
        "Work with IoT platforms (AWS IoT, Azure IoT)",
        "Build real-time monitoring solutions"
      ],
    },
  ];

  const handleApplyClick = (internship) => {
    setSelectedInternship(internship);
  };

  const handleBack = () => {
    setSelectedInternship(null);
  };

  // Show detail page if internship is selected
  if (selectedInternship) {
    return (
      <InternshipDetail
        internship={selectedInternship}
        onBack={handleBack}
        allInternships={internships}
        onSelectInternship={setSelectedInternship}
      />
    );
  }

  // Show grid view
  return (
    <>
      {/* PROFESSIONAL HEADING */}
      <div className="internships-heading">
        <h2>Internship Programs</h2>
        <p>Industry-oriented training with real-time projects</p>
      </div>

      <div className="internships-grid">
        {internships.map((item) => (
          <div
            key={item.id}
            className={`internship-card ${item.cardBg}`}
            onMouseEnter={() => setHoveredCard(item.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <img
              src={item.image}
              alt={item.title}
              className="internship-image"
            />

            <h3>{item.title}</h3>
            <p>{item.description}</p>

            <div className="skills-container">
              {item.skills.map((skill, i) => (
                <span key={i} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>

            <button 
              className={`apply-button ${item.btnClass}`}
              onClick={() => handleApplyClick(item)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Internship;