// Edit this file to map workshop titles to folders for Core and Software PDFs
// Structure:
// {
//   "Workshop Title": {
//     core: { "5-days": "/path/to/5-day-core-folder", "3-days": "/path/to/3-day-core-folder" },
//     software: { "5-days": "/path/to/5-day-software-folder", "3-days": "/path/to/3-day-software-folder" }
//   },
// }

const workshopFolders = {
  "CyberSecurity Workshop": {
    software: {
      "5-days": {
        path: "/5 day software",
        files: [
          { name: "5 Days Machine Learning with Python (Outline)", file: "5 days machine learning with python workshop  outline.pdf" },
          { name: "5 Days Cloud Computing (Outline)", file: "5 days cloud computing workshop  outline.pdf" },
          { name: "Red Hat Linux Administration (Outline)", file: "5 days  WORKSHOP RED HAT LINUX ADMINISTRATIONS OIUTLINE.pdf" },
          { name: "Cyber Security Workshop (Outline)", file: "5 days  WORKSHOP CYBER SECURITY OUTLINE.pdf" },
          { name: "Ethical Hacking - Cyber Security Overview", file: "ehical hacking CYBER SECURITY workshop overview .. (1).pdf" }
        ]
      },
      "3-days": {
        path: "/3 day  software",
        files: [
          { name: "3 Days Machine Learning with Python Workshop", file: "3 days Machine Learning with Python Workshop .pdf" },
          { name: "3 Days Cloud Computing Workshop", file: "3 Days Cloud Computing Workshop.pdf" },
          { name: "3 Days Red Hat Linux Workshop", file: "3 days red hat linux  workshop over view.pdf" },
          { name: "3 Days Networking Workshop", file: "3 days workshop on networking  course outline.pdf" },
          { name: "Cryptography and Network Security", file: "3-Day Cryptography and Network Security Workshop Overview.pdf" },
          { name: "Ethical Hacking Workshop", file: "3-Day Ethical Hacking Workshop.pdf" },
          { name: "Cyber Security Workshop", file: "3-Days workshop on Cyber Security.pdf" },
          { name: "Web Development Workshop", file: "3 Day Web Development Workshop Overview.pdf" }
        ]
      }
    }
  },

  "IoT Integrated with AI Workshop": {
    core: {
      "5-days": {
        path: "/5 day core iot ai",
        files: [
          { name: "5-Day Workshop on IoT Integrated with Artificial Intelligence (AI)", file: "5-Day Workshop on IoT Integrated with Artificial Intelligence (AI).pdf" },
          { name: "IoT AI 5 Days Workshop", file: "IoT_AI_5Days_Workshop.pdf" }
        ]
      },
      "3-days": {
        path: "/3 day core iot Ai",
        files: [
          { name: "IoT Integrated AI", file: "IoT integrated AI.pdf" }
        ]
      }
    },
    software: {
      "5-days": {
        path: "/software solutions iot with ai",
        files: [
          { name: "5-Days WORKSHOP on  IoT Integrated with AI", file: "5 days  WORKSHOP IOT with AI software solutions.pdf" }
        ]
      },
      "3-days": {
        path: "/software solutions iot with ai",
        files: [
          { name: "3- Day workshop on IoT Integrated with AI", file: "3-Days workshop on IOT with AI Software solutions.pdf" }
        ]
      }
    }
  },
  "IoT Integrated with ML Workshop": {
    core: {
      "5-days": {
        path: "/5 day core iot ml",
        files: [
          { name: "5-Day Workshop on IoT Integrated with Machine Learning", file: "5-Day Workshop on IoT Integrated with Machine Learning (ML).pdf" },
          { name: "IoT ML 5 Days Workshop", file: "5-Day Workshop on IoT with Machine Learning (ML).pdf" }
        ]
      },
      "3-days": {
        path: "/3 day core iot ml",
        files: [
          { name: "IoT Integrated ML", file: "IOT  with M L 3 day  worshop (1).pdf" },
          { name: "IoT Integrated ML", file: "IoT Integrated ML (1).pdf" }
        ]
      }
    },
    software: {
      "5-days": {
        path: "/software solution iot with ml",
        files: [
          { name: "5-Days WORKSHOP on  IoT Integrated with ML", file: "5 days  WORKSHOP IOT With Ml Software solutions.pdf" }
        ]
      },
      "3-days": {
        path: "/software solution iot with ml",
        files: [
          { name: "3- Day workshop on IoT Integrated with ML", file: "3-Days workshop on IOT with ML software.pdf" }
        ]
      }
    }
  },
  "Python Full Stack Development Workshop": {
    software: {
      "5-days": {
        path: "/python",
        files: [
          { name: "5-Day Workshop on Python Full Stack Development", file: "5 days python.pdf" }
        ]
      },
      "3-days": {
        path: "/python",
        files: [
          { name: "3- Day workshop on Python Full Stack Development", file: "3 day python.pdf" }
        ]
      }
    },
    core: {
      "5-days": {
        path: "/python",
        files: [
          { name: "5-Day Workshop on Python Full Stack Development", file: "5 day python full.pdf" }
        ]
      },
      "3-days": {
        path: "/python",
        files: [
          { name: "3- Day workshop on Python Full Stack Development", file: "3 day pythonfullstack.pdf" }
        ]
      }
    }
  },
  "Java Full Stack Development Workshop": {
    software: {
      "5-days": {
        path: "/java",
        files: [
          { name: "5-Day Workshop on Java Full Stack Development", file: "5 days java.pdf" }
        ]
      },
      "3-days": {
        path: "/java",
        files: [
          { name: "3- Day workshop on Java Full Stack Development", file: "3 day java.pdf" }
        ]
      }
    },
    core: {
      "5-days": {
        path: "/java",
        files: [
          { name: "5-Day Workshop on Java Full Stack Development", file: "5 day java full.pdf" }
        ]
      },
      "3-days": {
        path: "/java",
        files: [
          { name: "3- Day workshop on Java Full Stack Development", file: "3 day java full stack.pdf" }
        ]
      }
    }
  },
  "Power BI with Gen AI Workshop": {
    software: {
      "5-days": {
        path: "/powerbi",
        files: [
          { name: "5-Day Workshop on Power BI with Gen AI", file: "5 day powerbi gen ai.pdf" }
        ]
      },
      "3-days": {
        path: "/powerbi",
        files: [
          { name: "3- Day workshop on Power BI with Gen AI", file: "3 day powerbi and gen ai.pdf" }
        ]
      }
    },
    core: {
      "5-days": {
        path: "/powerbi",
        files: [
          { name: "5-Day Workshop on Power BI with Gen AI", file: "5 day power bi.pdf" }
        ]
      },
      "3-days": {
        path: "/powerbi",
        files: [
          { name: "3- Day workshop on Power BI with Gen AI", file: "3 day power bi.pdf" }
        ]
      }
    }
  },


  "Ethical Hacking Workshop": {
    software: {
      "5-days": {
        path: "/ethical hacking",
        files: [
          { name: "5-Days WORKSHOP on Ethical Hacking", file: "5 days  WORKSHOP Ethical hacking software.pdf" }
        ]
      },
      "3-days": {
        path: "/ethical hacking",
        files: [
          { name: "3- Day workshop on Ethical Hacking", file: "3-Days workshop on ethical hacking software.pdf" }
        ]
      }
    },
    core: {
      "5-days": {
        path: "/ethical hacking",
        files: [
          { name: "5-Days WORKSHOP on Ethical Hacking", file: "5 days ethical hacking.pdf" }
        ]
      },
      "3-days": {
        path: "/ethical hacking",
        files: [
          { name: "3- Day workshop on Ethical Hacking", file: "3 day ehical hacking.pdf" }
        ]
      }
    }
  },







  // Add more workshop entries here as needed
};

export default workshopFolders;
