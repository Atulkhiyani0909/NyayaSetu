## Nyayasetu: Revolutionizing Governance with Data-Driven Legal Ecosystems

### Executive Summary

Nyayasetu is a comprehensive data collection platform designed to transform governance in India by building an integrated legal ecosystem. Our platform addresses the critical data bottleneck faced by government authorities, turning routine citizen interactions into actionable insights for predictive analytics and evidence-based policy making. By combining complaint management, AI-powered citizen assistance, and legal service connections, Nyayasetu empowers both citizens and authorities to create a smarter, more responsive government.

## Steps to Run the Project

1. *Clone the Repository*
   bash
   git clone https://github.com/Atulkhiyani0909/NyayaSetu.git
   cd 
   

2. *Install Dependencies*
   - Navigate to the frontend directory and install dependencies:
     bash
     cd frontend
     npm install
     
   - Navigate to the backend directory and install dependencies:
     bash
     cd ../backend
     npm install
     

3. *Start the Development Servers*
   - In both the frontend and backend directories, start the servers using:
     bash
     npm run dev
     
   - This will start the Vite-powered frontend and the backend server. Vite will provide a local development link (usually http://localhost:3000 for frontend).

4. *Access the Application*
   - Open your browser and go to the link provided by Vite (typically http://localhost:5173) to use the platform.

*Note:*  
- Make sure you have [Node.js](https://nodejs.org/) installed on your system.
- Ensure any required environment variables are set up as described in the .env.example files.
- For any issues, refer to the troubleshooting section or contact the maintainers.

This streamlined process will get your project up and running in just a few steps!

## Table of Contents

- Introduction
- Problem Statement
- Solution Overview
- How It Works
- Key Features
- Impact
- Team
- Contact

### Introduction

> **What’s one difference between government and private institutions that separates their decision-making? DATA.**
>
> "Government decisions today are made in the dark. While businesses use data to optimize everything, our governments lack the citizen data needed to predict problems, allocate resources, and prevent issues before they escalate."

### Problem Statement

Governance in India faces three critical challenges:

- **Data Scarcity:** Unlike private companies that use analytics to optimize everything from traffic flow to service delivery, governments operate with fragmented, incomplete information about citizen needs.
- **Service Fragmentation:** Citizens are forced to navigate a maze of different complaint systems, information portals, and service providers, often getting lost in bureaucracy.
- **Reactive Governance:** Without comprehensive data, governments can only respond to problems after they become crises—repairing roads after accidents, adding staff after long queues, addressing legal issues after they multiply.

**The Result:**  
Citizens lose time and money dealing with unfair practices, there’s no easy way to verify rules or file complaints, and legal help remains costly and out of reach for most people.

### Solution Overview

Nyayasetu creates India's first integrated legal ecosystem that transforms citizen interactions into governance intelligence.

#### Our Platform Offers:

- **User-Friendly Complaint Portal:** Centralizes all government service issues. Citizens can report problems in seconds, track resolution in real-time, and rate their experience. Every complaint becomes a data point tagged by location, service type, and resolution time.

  ![image](https://github.com/user-attachments/assets/ef0cc296-c396-45af-a478-78438a46cf5e)

- **AI-Powered RAG Chatbot:** Provides instant, accurate answers in multiple languages. The AI probes deeper through intelligent follow-up questions, revealing patterns traditional forms miss.

  ![image](https://github.com/user-attachments/assets/38fe17c6-3497-4855-89f4-d145bbaa9491)

- **Comprehensive Lawyer Marketplace:** Citizens can find legal help based on their specific needs or connect instantly for urgent matters. The platform tracks which legal services are in highest demand, where, and when.

  ![image](https://github.com/user-attachments/assets/e17caabc-d5f9-4fa2-8f01-68699e3fde96)


> **The Magic:** These aren’t separate services. Every interaction, query, and service request contributes to a comprehensive understanding of citizen needs in a unified ecosystem.

### How It Works: The Governance Intelligence Flywheel

1. **Citizen Interaction:**  
   Citizens engage via complaint portal, AI chatbot, or by seeking legal help.

2. **Unified Data Collection:**  
   Every interaction is captured and structured, recording the problem, location, and affected individuals.

3. **Predictive Analytics & Inference:**  
   Interactive dashboards help government authorities derive valuable insights from the data. (Full automation with predictive models is planned as more data becomes available.)

4. **Proactive Governance:**  
   Authorities receive actionable insights, enabling evidence-based decisions, proactive resource allocation, and crisis prevention.

### Key Features

| Feature                  | Technology Stack                               | Purpose                                           |
|--------------------------|------------------------------------------------|---------------------------------------------------|
| Advanced RAG Chatbot     | LangChain, VectorDB, Gemini                    | Instant, multilingual citizen support             |
| Smart Ticketing System   | Express.js, MongoDB, React, Multer             | Complaint/query management                        |
| Legal Support Platform   | Express.js, MongoDB, Mongoose (ODM), React     | Lawyer connection and guidance                    |
| Analytics Dashboard      | Express.js, MongoDB, React, Chart.js/Recharts  | AI-driven insights for authorities                |

### Impact

- **Reduces corruption** by promoting transparency and direct citizen engagement.
- **Saves time and money** for both citizens and government officials.
- **Boosts efficiency and trust** in government services.
- **Creates a feedback loop** that continuously improves governance.

### Our Team

- Aditya Somani – The AI Engineer of the Team who was responsible for creating the Advance RAG chatbot and data extraction pipeline on it
- Annepu Pawan Kumar + Atul Khiyani – The Full stack developer duo of team responsible for crafting the entire website from scratch , building the entire logic and software with user centric approach.

### Contact

For queries or collaboration, reach out to any team member above. 
Contact us at - **nyayasetportal@gmail.com**
 
  ![image](https://github.com/user-attachments/assets/863774d2-d43a-4502-bd9a-bf7826b66fcc)


> **Nyayasetu turns every citizen interaction into actionable intelligence, paving the way for transparent, efficient, and citizen-centric governance.**
