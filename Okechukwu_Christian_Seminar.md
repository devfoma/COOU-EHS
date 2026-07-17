A SEMINAR REPORT  

ON 

“DESIGN AND IMPLEMENTATION OF AN ENVIRONMENTAL HEALTH SAFETY APPLICATION SYSTEM FOR NIGERIAN UNIVERSITIES  

(A CASE STUDY OF CHUKWUEMEKA ODUMEGWU OJUKWU UNIVERSITY, COOU)” BY 

OKECHUKWU CHRISTIAN CHUKWUNONSO 

2022 224 214 

SUBMITTED TO THE  

DEPARTMENT OF COMPUTER SCIENCE  FACULTY OF PHYSICAL SCIENCES  

 

 IN PARTIAL FULFILMENT OF THE REQUIREMENT FOR THE 

AWARD OF BACHELOR OF SCIENCE (B.SC.) DEGREE IN 

COMPUTER SCIENCE IN FACULTY OF PHYSICAL SCIENCE. 

 

SUPERVISOR: VEN. DR. C. AGUBOSIM 

APRIL, 2026. 

 

CERTIFICATION PAGE 

I Okechukwu Christian C. in the Department of Computer Science, Chukwuemeka Odumegwu Ojukwu University, Uli Campus with Registration Number 2022 224 214 has done his seminar in partial fulfillment of the requirement for the award of Bachelor of Science (B.Sc) under the guidance of the supervisor Ven. Dr. C. Agubosim 

 

APPROVED BY 

 

----------------------------------  	 	 	 	 	 -------------------------------- 

Ven. Dr. C. Agubosim  	 	 	 	 	 	 	Date 

(Seminar Supervisor) 

 

 

 

-----------------------------------  	 	 	 	 	---------------------------------- Prof. I. J. Mgbeafuluike 	 	 	 	             	 	 	Date (Head of Department) 

 

 

 

 

 

 

DEDICATION 

I dedicate this research work to God almighty that made it possible for me to accomplish this work. 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

ACKNOWLEDGEMENTS 

My gratitude goes to almighty God for giving me the privilege to undergo this work successfully. I will like to express my profound gratitude to my Seminar Supervisor Ven. Dr. C. Agubosim of the department of Computer Science Chukwuemeka Odumegwu Ojukwu University, Uli For his unwavering support and continuous encourage throughout the Serminar work. Without his guidance and persistent help this report would not have been possible.  

I must acknowledge the HOD Prof Ike Mgbefuike and other staff of Computer Science department Chukwuemeka Odumegwu Ojukwu University Uli, Prof Ogochukwu .C. Okeke, Mrs. Chinwe Ndigwe and Ezenwegbu Nnamdi .C.  

It is my great pleasure to acknowledge my course-mate for providing ideas. I am especially grateful to my parents for their prayers, care and moral support 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

ABSTRACT 

Environmental health and safety (EHS) management is a critical aspect of university administration, aimed at ensuring a safe and healthy learning and working environment for students, staff, and visitors. In many Nigerian universities, environmental health and safety practices are still managed through manual and fragmented processes, which often result in delayed hazard reporting, poor record keeping, and ineffective monitoring of safety issues. These challenges highlight the need for a computerized and centralized EHS management system. This study focuses on the design and implementation of an Environmental Health Safety Application System for Nigerian universities, using Chukwuemeka Odumegwu Ojukwu University (COOU) as a case study. The objectives of the study were to analyze the existing EHS management practices at COOU, identify system requirements, design an efficient and user-friendly application system, and implement a solution that enhances hazard reporting and safety monitoring. The system was developed using appropriate software engineering methodologies and designed as a web-based application with a centralized database. Key features of the system include user registration and authentication, digital hazard reporting, incident tracking, administrative management, and report generation. The implementation of the system demonstrated improved efficiency, accuracy, and accessibility in managing environmental health and safety information. The findings of this study show that the proposed EHS application system can significantly enhance environmental health and safety management within university campuses by providing timely information, improving decision-making, and promoting a culture of safety. The system is therefore recommended for adoption in COOU and other Nigerian universities. 

 

 

 

 

 

 

 

TABLE OF CONTENTS 

Title Page 

Certification 

Dedication 

Acknowledgements 

Abstract 

Table of Contents 

List of Figures 

List of Tables 

CHAPTER ONE: INTRODUCTION 

1.1 Background of the Study 

1.2 Statement of the Problem 

1.3 Aim and Objectives of the Study 

1.4 Significance of the Study 

1.5 Scope of the Study 

1.6 Limitations of the Study 

1.7 Definition of Terms 

CHAPTER TWO: LITERATURE REVIEW 

2.1 Concept of Environmental Health and Safety 

2.2 Environmental Health and Safety in University Campuses 

2.3 Existing Environmental Health Safety Management Systems 

2.4 Information Systems in Environmental Health Management 

2.5 Mobile and Web-Based Safety Applications 

2.6 Review of Related Works 

2.7 Identified Research Gaps 

CHAPTER THREE: SYSTEM ANALYSIS AND DESIGN 

3.1 Analysis of the Existing System at COOU 

3.2 Problems of the Existing System 

3.3 Proposed System Overview 

3.4 Objectives of the Proposed System 

3.5 System Requirements 

   3.5.1 Functional Requirements 

   3.5.2 Non-Functional Requirements 

3.6 System Architecture 

3.7 System Design Tools 

   3.7.1 Use Case Diagram 

   3.7.2 Data Flow Diagram (DFD) 

   3.7.3 Entity Relationship Diagram (ERD) 

3.8 Database Design 

3.9 System Flowchart 

CHAPTER FOUR: : SUMMARY, CONCLUSION AND RECOMMENDATIONS 

4.1 Summary of the Study 

4.2 Conclusion 

4.3 Recommendations 

4.4 Suggestions for Further Studies 

REFERENCE

 



CHAPTER ONE 

INTRODUCTION 

1.1 Background of Study 

Environmental Health and Safety (EHS) is a critical component of sustainable development in educational institutions, particularly universities where large populations of students, staff, and visitors interact daily with complex infrastructures such as laboratories, hostels, workshops, cafeterias, and medical facilities. Environmental health focuses on preventing diseases and injuries by controlling environmental factors, while safety management aims to protect individuals from physical, chemical, biological, and ergonomic hazards (WHO, 2018). 

In Nigerian universities, environmental health and safety challenges are prevalent due to factors such as poor waste management, inadequate sanitation, overcrowding, unsafe laboratory practices, fire hazards, and weak reporting systems for health and safety incidents. These challenges pose serious risks to public health, academic productivity, and institutional reputation (Adebayo & Oladimeji, 2020). Traditional methods of managing environmental health and safety in most Nigerian universities are largely manual, fragmented, and reactive, relying on paper-based reports, verbal complaints, and delayed responses. 

With the rapid advancement of Information and Communication Technology (ICT), digital solutions have become effective tools for managing complex systems and improving service delivery. Mobile and web-based application systems offer real-time data collection, incident reporting, monitoring, and decision support, which are essential for proactive environmental health and safety management (Laudon & Laudon, 2022). 

Chukwuemeka Odumegwu Ojukwu University (COOU), like many public universities in Nigeria, faces environmental health and safety concerns such as improper waste disposal, inadequate emergency response mechanisms, and lack of centralized data for monitoring safety incidents. The absence of an integrated EHS application system limits timely reporting, coordination, and enforcement of safety standards. Therefore, designing and implementing an Environmental Health Safety Application System tailored to the needs of Nigerian universities, using COOU as a case study, is both timely and necessary. 

An Environmental Health and Safety (EHS) is a tool for managing the impacts of tertiary institutional activities on the environment. It provides a structured approach to planning and implementing environment protection measures. It also refers to management of an organization’s environmental programs in a comprehensive, systematic, planned and documented manner. It includes the organizational structure, planning and resources for developing, implementing and maintaining policy for environmental protection. The environment also involves the ways living and non-living objects interact as well as what result from such interactions. Birds, for example, interact with rocks either by perching on them, or the building of nests in rock crevices. The environment and humanity are inseparable; this underscores the need for the conservation of the environment and sustainable development. 

As a prelude to other parts of this study, this chapter will discuss the background upon which this study was initiated, the statement of problems that led to this study, the Aim and Objectives of the study. Others are Significance of the study, Scope of work, Limitation of the study and Definition of technical terms. 

Environmental Health and Safety (EHS) in universities has been gaining momentum and academic interest since about the beginning of the new millennium. For example, in 2003, a survey carried out in Sweden showed 60% of Swedish universities indicated government directives as a key EMS external driver. Internal drivers, such as the role of staff, faculty, students and top management, between 1999 and 2003, were found to have a variation in values as a result of contrasting university procedural implementation, while noteworthy, major Environmental Health and Safety (EHS) barriers included lack of management support, resources and commitment (Sammalisto 2004, 2007, Sammalisto and Lindhqvist 2008). 

EHS implementation, at the university level, has been steadily expanding globally. This momentum, however, has not reached Nigerian universities that lack Environmental Health and Safety (EHS) amalgamation into its strategic management plans. To date, there are no universities in Nigeria with functioning Environmental Health and Safety (EHS). At best, there exist several contingent management initiatives being used to address prevalent environmental impacts. The implementation of EHS in Nigeria’s higher educational institutions would be a positive and real program changing step for the progress and well-being of its educative and environmental systems; in particular, 

Nigeria’s educational institutions lack focus in addressing environmentally-related programs amidst several growing environmental problems. 

Nationally, there has been an intensification of unsustainable industry-related development and no serious attempt in employing appropriate sustainable management strategies. Such practices and negligent policy continue to result in large-scale negative impacts on livelihoods dependent on natural resources and untold hardship on already vulnerable livelihoods, property and local investment (Kola-Lawal et al. 2014).  

The challenges encountered that led to the execution of the research work is that the issue of environmental responsibility has been impacting policies and economies, and it has been a relevant issue in the multidisciplinary debate between scientists and practitioners (Neuteleers and Engelen, 2015, Siew, 2015; Mazzi et al., 2016). Most countries have introduced new legislation and economic instruments to encourage environmental sustainability (Vatn, 2015); at the same time, several organisations have implemented environmental policies and management tools such as the Environmental Health and Safety (EHS)  (Demirel and Kesidou, 2011). Organizational sustainability is characterized as the synergy of improving ecological resilience, promoting human capital growth, and growing economic viability (Herghiligiu et al. 2019). 

 

1.2 Statement of Problem 

Investigation revealed that the increasing population has led to a shortage of resources. If this continues, it will be very difficult to sustain such a huge population. The other environmental issues including pollution, waste management, deforestation, climate change and global warming are all associated with overpopulation.  

Despite the importance of environmental health and safety in Nigerian universities, existing management practices are characterized by several problems: 

Manual and Inefficient Reporting Systems: Health and safety incidents are often reported verbally or through paper-based methods, leading to delays, loss of information, and poor documentation. 

Lack of Real-Time Monitoring: University authorities lack access to real-time data on environmental hazards, accidents, or safety violations across campus. 

Poor Communication and Coordination: There is inadequate communication between students, staff, environmental health officers, and management during emergencies. 

Weak Compliance and Enforcement: The absence of a centralized digital system makes it difficult to track compliance with environmental health and safety regulations. 

Limited Data for Decision-Making: Incomplete and unstructured records hinder effective planning, risk assessment, and policy formulation. 

At COOU, these challenges have resulted in delayed responses to hazards such as waste accumulation, unsafe buildings, laboratory accidents, and sanitation issues. Consequently, there is a need for an automated Environmental Health Safety Application System that can streamline reporting, monitoring, and management of environmental health and safety issues within the university. 

 

1.3 Aim and Objectives of the Study 

The aim of the study is to design and implement an Environmental Health and Safety Application System for Nigerian universities, using Chukwuemeka Odumegwu Ojukwu University (COOU) as a case study. 

The specific objectives are to: 

i. 	Analyze the existing environmental health and safety management system at COOU. ii. 	Identify key environmental health and safety challenges faced within the university. iii. 	Design a user-friendly application system for reporting and monitoring EHS issues. iv. 	Develop a centralized database for storing and managing EHS data. 

Implement the system using appropriate software development tools and techniques. 

Evaluate the effectiveness of the proposed system in improving environmental health and safety management. 

 

1.4 Significance of Study 

The proposed system will help examine the practices of Universities in Nigeria’s Environmental Health and Safety, and then determining how their impacts should best be managed. This approach encourages creative and relevant solutions from the organization itself. Although the implementation of an EHS is essentially a voluntary initiative, it can also become an effective tool for governments to protect the environment as it can assist regulation. Also, this research work will help to explain the procedure for identification of major environmental concerns and mapping environmental management system for a university. 

University Management: Provides a digital tool for effective monitoring, planning, and enforcement of environmental health and safety policies. 

Students and Staff: Enhances safety awareness, enables quick reporting of hazards, and promotes a safer learning environment. 

Environmental Health Officers: Improves data accuracy, response time, and coordination during emergencies. iv. Government and Regulatory Bodies: Supports compliance with national environmental and public health regulations. 

v. Academic Community: Contributes to knowledge in computer science applications for health, safety, and environmental management. 

 

1.5 Scope of Study 

The scope of the research is focused on the Design and Implementation of an Environmental Health Safety Application System for COOU. The system covers features such as hazard reporting, incident tracking, safety alerts, data storage, and administrative management. The research is limited to environmental health and safety issues within the university campuses and does not extend to external communities. 

 

1.6 Limitations of the Study 

During the course of this study, many things militated against its completion, some of which are: 

Establishment Policies: Establishment policies posed a serious limitation as most staffs are not ready to release information needed for this project work. There were lots of information needed from the staffs of this institution to enhance the study which took them time to release or they did not release at all for security purposes, hence the scope was reduced. 

Research material: availability of research material is a major setback to the scope of the study. 

Frequent power failure: This made the researcher append more money on fuel to ensure sustainable power. 

 

1.7 Definition of Terms 

EHS Application System: A digital platform designed to manage environmental health and safety activities. 

Registration: This means to keep records received from the management for reference purposes. Management: It is the co-ordination of all the resources of an organization through the process of planning, Organization, directing and controlling 

Data: Numbers, Text or image which is in the form suitable for Storage in or processing by a computer, or incomplete information. 

Information: A meaning full material derived from computer data by organizing it and interpreting it in a specified way. 

Information System: A set of interrelated components that collect (or retrieve), process, store and distribute information to support decision making and control in an organization. 

Computer: Computer is an electronic device that accepts data as Input, processes data and gives out information as output to the user. 

Software: Software is set of related programs that are designed by the manufacturer to control the hardware and to enable the computer perform a given task. 

Hardware: Hardware is a physical part of a computer that can be touched, seen, feel which are been control by the software to perform a given task. 

Technology: Technology is the branch of knowledge that deals with the creation and use technical and their interrelation with life, society and the environment, drawing upon such as industrial art, engineering, applied science and pure science. 

Management Information System: Collection of people, database, and devices produced to use in providing routine information to manager and decision makers of the organization. 

COOU: Chukwuemeka Odumegwu Ojukwu University. 

CHAPTER TWO LITERATURE REVIEW 

2.1 Concept of Environmental Health and Safety 

Environmental Health and Safety (EHS) refers to the policies, procedures, and practices designed to protect people and the environment from potential hazards arising from human activities, industrial processes, and institutional operations. According to the World Health Organization (WHO), environmental health addresses all the physical, chemical, and biological factors external to a person that can affect health and focuses on preventing disease and creating health-supportive environments. In educational institutions, EHS programs are essential for maintaining safe learning and working environments. Universities contain various risk-prone facilities such as laboratories, workshops, chemical storage areas, hostels, and cafeterias. These environments can expose students and staff to biological agents, chemical hazards, waste contamination, and physical accidents if proper safety systems are not implemented (Friis, 2019). 

Research has shown that universities in developing countries often face environmental health challenges such as poor waste disposal, water contamination, poor sanitation, and unsafe laboratory practices. These issues can lead to disease outbreaks, injuries, and environmental degradation (Adebola & Ajayi, 2021). Therefore, implementing effective EHS management systems is necessary to ensure safety and sustainability within university campuses. 

 

2.1.1 Environmental Health and Safety (EHS) in Academic Institutions 

Environmental health and safety in higher education encompasses practices and policies that protect the campus environment and the health of students, staff, and visitors. Academic institutions are complex environments that include laboratories, administrative offices, lecture halls, workshops, housing, and outdoor spaces—all with potential hazards. Environmental health and safety within academic settings involves managing private water systems, waste control, injury prevention, sanitation, and regulatory compliance, similar to municipal systems but with added complexity due to research and teaching activities.  

Many Nigerian universities experience environmental health and safety problems due to rapid population growth, limited infrastructure, and weak safety monitoring systems. According to Okeke and Nwankwo (2020), overcrowded hostels, poor drainage systems, and improper waste disposal are common environmental health hazards in Nigerian tertiary institutions. 

Laboratory safety is another major concern. Studies have revealed that many laboratories in Nigerian universities lack proper hazard labeling, emergency equipment, and safety training for students and staff (Aina & Adedipe, 2019). Such deficiencies increase the risk of chemical exposure, laboratory accidents, and environmental contamination. 

Universities are unique because they operate vast geographic campuses and diverse functional units, each with distinct hazards and safety needs. The volume of daily activities—ranging from laboratory experiments to student housing and waste management—increases the complexity of Environmental Health and Safety responsibilities. Research indicates that environmental health practices in Nigerian tertiary institutions are often inconsistent, with low levels of safe campus practices due to limited resources, poor policy implementation, and lack of systematic monitoring.  

Furthermore, emergency response mechanisms in many universities are slow due to lack of structured reporting systems. Hazards such as fire outbreaks, broken infrastructure, water leakage, or hazardous waste accumulation are often reported manually or verbally, which delays response and corrective actions (Ibrahim & Musa, 2022). 

These challenges highlight the need for a digital platform that allows real-time hazard reporting, monitoring, and management of environmental health and safety issues. 

 

2.1.2 Environmental Health and Safety Management Systems (EHSMS): Concepts and Frameworks 

An Environmental Health and Safety Management System (EHSMS) refers to the documented processes and procedures used by an organization to systematically manage its environmental, health, and safety risks. It provides a structured approach to identify hazards, set policy and objectives, implement controls, monitor compliance, and pursue continual improvement. The National Research Council defines an EHSMS as a management framework that integrates organizational structures with hazard identification, risk control, planning, and review processes to control EHS aspects and risks effectively.  

 

Key elements of an EHSMS include: 

Policy and commitment: Organizational leadership sets clear health and safety objectives. 

Planning: Identifying environmental and safety hazards and establishing risk control measures. 

Implementation: Assigning responsibilities and deploying resources for hazard control. 

Evaluation and corrective action: Audits, performance tracking, and review to ensure compliance and improvement.  

Periodic evaluation and management review are essential to ensure EHSMS effectiveness, enabling organizations to detect deficiencies and update policies and controls where necessary.  

 

2.1.3 Occupational Health and Safety Management Systems in Universities 

Although research on Environmental Health and Safety systems in general organizations is extensive, studies specifically focused on universities and higher education institutions are limited. Most existing literature addresses occupational health and safety management systems generally, with relatively few studies examining implementation in academic environments. 

A recent systematic review on Occupational Health and Safety Management Systems (OHSMS) in South African universities revealed limited research in this area. The review found that while some universities have formal OHS policies, the consistency and effectiveness of implementation are often undermined by lack of leadership commitment, insufficient funding, and weak enforcement mechanisms. The review highlights a research gap in exploring EHS/OHSMS in higher education, especially in developing contexts.  

 

2.1.4 Digital EHS and Reporting Systems 

2.1.4.1 The Role of Information Systems 

Digital systems for managing Environmental Health and Safety have become increasingly important, providing capabilities for real-time hazard reporting, centralized data storage, analytics, and automated notifications. Systems such as web-based Occupational Safety and Health Management Information Systems (OSH-MIS) have been developed in industrial and corporate contexts, demonstrating how technology can streamline safety processes and improve data accuracy.  

While digital Environmental Health and Safety systems are prevalent in high-risk industries (e.g., oil and gas, manufacturing), their adoption in higher education remains emergent. Available studies on digital reporting systems in academic environments indicate that successful systems can: 

Improve the speed and accuracy of incident reporting. 

Enhance visibility of hazards across departments. 

Support data-driven decision-making for safety interventions.  

However, there is minimal research on Environmental Health and Safety digital applications tailored for university campuses, especially in sub-Saharan Africa. The absence of robust, campus-specific reporting tools underscores the need for context-based solutions for institutions such as COOU. 

 

2.1.4.2 Case Studies in Higher Education Safety Systems 

An evaluation of occupational health, safety, and environment management systems within higher education laboratories showed varied compliance levels—indicating that while safety policies may exist, their practical implementation is inconsistent due to lack of monitoring, evaluation, and review mechanisms.  

Such evaluations confirm that university campuses exhibit unique Environmental Health and Safety risks that require systematic approaches and tools to minimize potential harm and improve compliance. 

 

2.1.5 Information and Communication Technology in Environmental Health Management Information and Communication Technology (ICT) has transformed the management of health, safety, and environmental systems worldwide. ICT-based systems enable organizations to collect, process, store, and analyze environmental data efficiently. 

According to Kenneth C. Laudon and Jane P. Laudon (2022), digital management systems improve organizational performance by enabling automation, data-driven decision-making, and improved communication. 

In environmental health management, ICT tools such as mobile applications, web platforms, and database systems are used to track hazards, monitor environmental conditions, and coordinate emergency responses. These systems allow users to report incidents instantly, upload images, and notify relevant authorities in real time. 

For example, environmental monitoring applications are widely used in developed countries to track waste management, pollution levels, and workplace safety compliance (Harrison & Hester, 2020). Such systems help institutions maintain compliance with environmental regulations and improve overall safety management. 

 

 

2.1.6 Digital Safety Reporting Systems 

Digital safety reporting systems are software applications designed to allow individuals to report hazards, accidents, or unsafe conditions electronically. These systems provide centralized databases where incidents can be recorded, tracked, and analyzed. 

Research by Smith and Brown (2021) shows that digital reporting systems significantly improve safety compliance and reduce accident rates in organizations. By enabling real-time communication between users and safety officers, these systems ensure that hazards are addressed promptly. 

 

Typical features of digital safety systems include: 

Hazard reporting modules 

Incident tracking dashboards 

Automated alerts and notifications 

Data analytics and reporting tools 

User management and access control 

These features make digital safety systems highly effective in managing complex institutional environments such as universities. 

 

2.1.7 Application Systems in University Management 

University management systems are software solutions designed to support administrative and operational functions within higher education institutions. These systems include student information systems, learning management systems, library systems, and campus management platforms. 

According to Ojo and Adeyemi (2021), integrating application systems into university operations improves efficiency, transparency, and service delivery. However, most Nigerian universities focus mainly on academic and administrative digital systems while neglecting environmental health and safety management. 

Developing an EHS application specifically for universities would therefore address an important gap by providing a structured system for monitoring environmental hazards and promoting campus safety. 

 

 

2.2 Review of Related Studies 

Several studies have examined the use of digital systems for environmental monitoring and safety management. 

A study by Johnson and Lee (2020) developed a web-based environmental monitoring system that allowed organizations to track environmental hazards and compliance data. The system improved reporting accuracy and response time. 

Similarly, Adebola and Ajayi (2021) examined environmental health conditions in Nigerian universities and recommended the use of digital technologies to improve hazard reporting and waste management monitoring. 

Another study by Ibrahim and Musa (2022) explored safety management practices in tertiary institutions and concluded that lack of automated reporting systems contributes significantly to delayed responses to environmental hazards. 

Although these studies emphasize the importance of environmental health management and digital reporting systems, few have focused specifically on developing a comprehensive Environmental Health Safety application tailored for Nigerian universities. This research therefore aims to fill this gap by designing and implementing an Environmental Health and Safety EHS application system for COOU. 

Regulations and traditional practices addressing the environmental issues in ad hoc manners have become inefficient and unable to provide sustainability assurance (Alshuwaikhat et al., 2008). These environmental protection regulations only focus to control emissions of air and water, and disposal of waste (Morrow et al., 2002). But the potential risk elements in different projects may vary in several conditions which required proper management (Adeleke et al., 2016). 

In the same way the environmental issues are more complex, interconnected and multidimensional, therefore, a systematic and integrated approach in the form of Environmental Health and Safety is required for environmental sustainability in investments, decisions making and management (FerrerBalas et al., 2005). All significant activities that have potential impact on the community or environment should also be properly disclosed and managed in order to become transparent towards stakeholders (Amran et al., 2015). Society and the government also aim to manifest advancement in the University system by assessing the environmental impacts generated by industrialization activities (Norazli et al., 2015). Environmental Health and Safety EHS implementation makes organization able to achieve recognition in market by enhancing public image, minimizing financial and legal risks, satisfying regulatory and legal requirements, improving work environment and staff moral, reducing operating cost and minimizing the consumption of resources and material (Joshi, 2001). 

A number of Environmental Health and Safety EHS frameworks have been developed for universities including osnabruck environmental management model (Viebahn, 2002), EHS implementation model for U.S. colleges and universities (Savely et al., 2007), and sustainable university model (Velazquez et al., 2006), ISO 14001 models, EHS self- assessment checklist, higher education 21 program, the auditing instrument for sustainability in higher education (AISHE), and European EMAS model (Eco-Management and Audit Scheme) (Clarke et al., 2009). The ISO 14001 and EMAS (Eco-Management and Audit Scheme), developed by the European Union are the two best known formal environmental frameworks. The organizations and sites certified with these EMS have been continuously increasing since their launch in the 90s (Disterheft et al., 2012). Universities deal five areas of activities including education, research, operations, outreach, assessment and reporting (Lukman et al., 2009). The impacts generated by the universities are like the hospitals and mega hostels in terms of material and water usage, waste generation, consumption of electricity and hydrocarbon fuels in lightening and heating, operating machineries and transportation are all significant for the quality of environment (Savely et al., 2007). The base for Environmental Health and Safety (EHS) as an instrument was, the increase in natural resources exhaustion and environmental degradation and this instrument is emerged as a strong trend for the enhancement of environmental performance (Rashed et al., 2008). 

 

In 2006 there were 14 higher education institutes throughout the world having an Environmental Health and Safety EHS (Velazquez et al., 2006) in which the 10 institutions had ISO 14001 (Tauchen et al., 2006). Another study shows the dominance of ISO 14001 in Northern Europe (Steger, 2000; Wätzold, 2009). Research conducted in India depicts the implementation of Environmental Health and Safety according to the guidelines of ISO 14001 (Jain et al., 2010). 

 

In literature it is shown that many authors discussed thoroughly the progress of campus sustainability (Čiegis et al., 2015; García et al., 2006; Koester et al., 2006) and compared different Environmental Health and Safety EHS models (Alshuwaikhat et al., 2008). Some authors also compared different EHS models for higher education institutions (Clarke et al., 2009). Different studies at the national level are also present about EHS in universities. From the whole literature it can be concluded that environmental management system have gathered momentum in developed countries but the educational institutes of developing countries are lacking with the functional Environmental Health and Safety EHS. 

Kamaruddin, Ishak, and Abdul Rahman (2025) developed a web-based Electronic Risk Management System (eRMS) for higher education institutions. The study highlighted that traditional risk registers stored in spreadsheets limit collaboration, monitoring, and security. The proposed web-based system created a centralized database that improved risk tracking, reporting, and data visualization. The authors concluded that electronic risk management systems significantly improve institutional safety management and decision-making processes. 

Another study by Akor, Odey, and Akor (2024) investigated security management practices in universities in Ebonyi State, Nigeria. Using survey data from security personnel, the research revealed that universities face challenges such as cult-related activities, kidnapping threats, poor surveillance systems, and lack of modern security equipment. The study recommended the use of modern technological tools and digital surveillance systems to improve safety management in Nigerian universities. 

Nunoo, Twum, and Panin (2018) conducted a study on students’ behavioral risks to environmental hazards in academic institutions in Ghana. The research identified that students’ activities, improper waste disposal, and lack of environmental awareness contribute significantly to environmental hazards within academic institutions. The study recommended that universities implement structured environmental management systems to monitor environmental risks and improve safety practices. A study on Occupational Health, Safety, and Environment Management Systems (OHSEMS) in higher education laboratories evaluated the implementation of safety policies and practices in university laboratories. The research found that effective safety systems must include policy development, planning, implementation, evaluation, and continuous management review to reduce laboratory accidents and environmental hazards. 

Similarly, research on safety management systems in educational buildings proposed a safety framework that integrates risk assessment, safety culture, and hazard monitoring in educational environments. The study emphasized that universities require structured safety systems to manage complex interactions between people, equipment, and environmental hazards within campus facilities. 

Timóteo et al. (2021) conducted a scoping review of digital management systems used in academic laboratories. The study found that digital systems improve laboratory safety management by enabling data recording, monitoring of hazardous materials, and automated reporting. The research also noted that digital platforms enhance transparency and accountability in safety management. 

Furthermore, Odeyemi (2022) examined integrated environmental health and safety management systems in Nigeria’s oil and gas sector. The study demonstrated that integrating environmental, health, and safety systems helps reduce environmental pollution and workplace hazards while improving regulatory compliance. The findings suggest that similar integrated systems can be applied in other sectors, including universities. 

Recent technological studies have also explored smart environmental monitoring systems using Internet of Things (IoT). For example, Hasib et al. (2026) proposed an IoT-based framework integrating environmental monitoring sensors with cloud-based data management. The system achieved high reliability in detecting hazards such as fire and environmental risks while enabling real-time monitoring and automated alerts. This demonstrates the effectiveness of digital technologies in managing environmental health and safety systems. 

Similarly, Mariano et al. (2024) developed a smart air quality monitoring system that used environmental sensors and machine learning algorithms to detect harmful gases and monitor air quality. The system transmitted real-time data to cloud platforms and issued alerts when pollutant levels exceeded safe limits, thereby improving occupational health and environmental safety. Finally, Azman and Kelana (2024) examined the digitalization of workplace safety management systems. Their research demonstrated that transitioning from manual safety documentation to digital platforms significantly improves hazard reporting, safety training, and compliance monitoring. The study concluded that digital safety management systems enhance operational efficiency and reduce workplace accidents. 

Adebola, O., & Ajayi, T. (2021). Environmental sanitation and waste management in Nigerian tertiary institutions. Journal of Environmental Health Research, 15(2), 67–75. 

Harrison, R., & Hester, R. (2020). Environmental health and safety management systems. Royal Society of Chemistry. 

Ibrahim, M., & Musa, A. (2022). Safety management and hazard reporting systems in tertiary institutions. International Journal of Safety Science, 14(3), 101–109. 

Laudon, K. C., & Laudon, J. P. (2022). Management information systems: Managing the digital firm (16th ed.). Pearson. 

Ojo, A., & Adeyemi, S. (2021). ICT adoption in Nigerian universities: Opportunities and challenges. 

International Journal of Educational Technology, 9(1), 21–30. 

Okeke, C., & Nwankwo, P. (2020). Environmental health risks in Nigerian tertiary institutions. Journal of Environmental Studies, 12(4), 89–97. 

Smith, J., & Brown, L. (2021). Digital reporting systems and workplace safety improvement. Journal of Safety Management, 18(2), 55–63. 

 

2.2.1 Gaps in the Literature 

Despite the existence of Environmental Health and Safety (EHS) frameworks and general OHSMS research, the literature reveals several gaps in the context of academic institutions: 

Limited research on campus-specific EHS digital systems – Few studies address information systems designed for hazard reporting and monitoring tailored to university needs, especially in developing countries. 

Lack of empirical studies in Nigerian universities – Most research on EHS practices focuses on broad safety culture or general environmental practices, with little attention to systematic technological solutions. 

Inconsistent implementation and evaluation – Studies emphasize the challenge of translating Environmental Health and Safety policies into practice, underscoring the need for tools that integrate monitoring, reporting, and corrective action processes. 

These gaps justify the development of a tailored Environmental Health Safety Application System for Nigerian universities, highlighting the potential impact on safety practices through digital transformation. 

 

2.3 Summary 

This review has examined the foundational concepts of environmental health and safety in academic environments, the structure of Environmental Health and Safety management systems, and the role of information systems in enhancing safety practices. Although general and industry-specific 

Environmental Health and Safety frameworks are well documented, there is limited research on the implementation of digital Environmental Health and Safety systems in universities—particularly in developing countries like Nigeria. Addressing these gaps with a contextually relevant application system can significantly improve hazard reporting, safety monitoring, and institutional compliance. 

 

 

 

 

 

 

 

 

 

     

       

  

CHAPTER THREE  SYSTEM ANALYSIS AND DESIGN 

3.1 Analysis of the Existing System 

The existing Environmental Health and Safety management system at COOU is largely manual and decentralized. Environmental health issues such as waste disposal, sanitation complaints, laboratory hazards, and accident reports are handled through verbal communication, handwritten reports, or unofficial channels. 

Typically, students or staff members report hazards to departmental representatives or maintenance units, who may then escalate issues to higher authorities. This process lacks a standardized reporting structure and depends heavily on human intervention. 

Features of the Existing System includes  

Manual hazard reporting 

Paper-based documentation 

No centralized database 

Delayed response to incidents 

Poor record keeping 

Difficulty in tracking recurring safety issues 

Studies show that manual safety management systems often lead to data loss, delayed hazard mitigation, and poor accountability (DeRoos, 2021). 

 

3.2 Problems of the Existing System 

The analysis of the existing system reveals several challenges: 

i. Inefficiency: Manual reporting causes delays in responding to environmental and health hazards. ii. Lack of Centralization: Safety data are scattered across departments with no unified database. 

iii. 	Poor Documentation: Records can be misplaced, damaged, or incomplete. iv. 	Limited Monitoring: Management cannot easily track trends or identify high-risk areas. 

v. 	Low User Participation: Students and staff are discouraged from reporting due to complex procedures. 

These problems reduce the effectiveness of environmental health and safety management within the university. 

 

3.3 Description of the Proposed System 

The proposed system is a computer-based Environmental Health Safety Application System designed to automate hazard reporting, monitoring, and management within COOU. 

The system allows students, staff, and administrators to: 

Report environmental or health hazards digitally 

Track reported incidents 

Receive notifications and alerts 

Manage and analyze safety data centrally 

The application is designed as a web-based system (with possible mobile compatibility) to ensure accessibility across different devices. 

 

3.4 Objectives of the Proposed System 

The proposed system aims to: 

Provide a fast and reliable platform for reporting hazards 

Improve documentation and record management iv. 	Enhance monitoring and evaluation of safety issues 

Support decision-making through data analysis 

Promote a safer campus environment 

 

3.5 System Design Models 

3.5.1 Data Flow Diagram of the Proposed System 

This is a data flowchart of the proposed system as shown in figure 3.2. 

 

 

 

 

 



Figure 3.2: Data Flow Diagram of the Proposed System 

 

3.5.2 Advantages of the Proposed System 

The following are the advantages of the proposed Environmental Management System; 

The proposed system will identify and control the environmental aspect, impacts and risks relevant to Universities in Nigeria; 

It will define a basic set of principles that guide the Universities in Nigeria to its environmental responsibilities in the future; 

It will map an environmental management system framework for Universities in Nigeria; 

It will measure performance against pre-agreed standards and goals, and modify the approach as necessary; and 

It will ensure continual improvement through the life of a facility or facilities in the management system of Universities in Nigeria. 

 

 

3.5.3 Justification of the Proposed System 

To ensure a standardized object-oriented program in its entire ramification, HTML, CSS, JAVASCRIPT, PHP and MYSQL Database was used in the development of seaport billing software. 

These entire programs are used to ensure effective program. The motive behind the use of the language is its compatibility with several Operating Systems. It is object oriented and combines the feature of hypertext Preprocessor (PHP) and JavaScript platform thereby making it to run on any 

Operating System. It is secured in that it does not cause harm to user’s system and access to information is restricted. The language is simple and easy to learn. 

 

3.6 Functional Requirements 

The following figure 3.4 shows the various modules involved in the system and available to users who have limited access and to the admin who have full access to the system. 

3.7.1 Use Case Diagram of the Admin / User Privileges 

 



ADMIN 	 

 

3.8 Data Requirements 

The following are the data requirements of new and existing users in the system. New users are required to create an account by providing some necessary information such as: 

Email Address: The user's email address is required during registration and subsequent login on the system. 

Password: The user is required to enter a secured password or pin during registration and subsequent login on the system 

User Name: The user is required to enter a nickname which he/she will be addressed as subsequently for security reasons. 

Passport: This field contains the photograph or picture of the account holder or system user. 

Address: This field contains the address of the system user. 

 

3.9 High Level Model of the Proposed System 

The high-level model of the proposed system is illustrated below; 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 



 

Figure 3.5: High Level Model of the Proposed System 

 

    

CHAPTER FOUR SUMMARY, CONCLUSION AND RECOMMENDATION 

4.1 	Conclusion  

This study focused on the design and implementation of an Environmental Health and Safety (EHS) Application System for Nigerian universities, using Chukwuemeka Odumegwu Ojukwu University (COOU) as a case study. The research identified that existing environmental health and safety management practices within COOU are largely manual, fragmented, and inefficient. These limitations result in delayed hazard reporting, poor record management, and inadequate monitoring of environmental and health risks on campus. 

Through system analysis and design, a computerized Environmental Health and Safety EHS application system was proposed and developed to address these challenges. The system provides a centralized platform for hazard reporting, monitoring, documentation, and administrative decisionmaking. By automating safety processes, the application improves response time, enhances data accuracy, and promotes accountability among students, staff, and management. 

The implementation of the system demonstrates how information technology can be effectively applied to solve real-world environmental health and safety problems in academic institutions. Overall, the study achieved its stated objectives and established that a digital Environmental Health and Safety EHS system can significantly improve environmental health safety management in Nigerian universities. 

4.2 	Recommendations 

Based on the findings and outcomes of this study, the following recommendations are made: 

Adoption by University Management: COOU management should adopt and deploy the proposed Environmental Health Safety Application System across all campuses to enhance safety reporting and monitoring. 

Training and Awareness: Regular training should be organized for students, staff, and administrators to ensure effective use of the system and to promote a strong safety culture within the university. 

Policy Integration: The system should be integrated into the university’s environmental health and safety policies to ensure compliance and sustainability. 

System Expansion: Future enhancements should include mobile application support, real-time emergency alerts, GIS-based hazard mapping, and integration with external regulatory agencies. 

Regular Maintenance and Evaluation: The system should be regularly updated and evaluated to ensure optimal performance, data security, and adaptability to emerging environmental health challenges. 

Further Research: Future studies may explore the integration of artificial intelligence and data analytics for predictive hazard detection and advanced decision-support systems. 

 

       

      

     

REFERENCES 

AlMarri, M., Al-Ali, M., Alzarooni, M., AlTeneiji, A., Al-Ali, K., & Bahroun, Z. (2025). Enterprise Resource Planning Systems for Health, Safety, and Environment Management: Analyzing Critical Success Factors. Sustainability.  

Assessment of Safe School Environment Practices in Tertiary Institutions of Zamfara State, Nigeria. IAHERI Journal (2025).  

Bohdanowicz, P., Zientara, P., & Novotna, E. (2011), “International hotel chains and environmental protection: an analysis of Hilton's we care! programme (Europe, 2006– 

	2008)”, 	Journal 	of 	Sustainable 	Tourism, 	19:7, 	797-816, 	DOI: 

10.1080/09669582.2010.549566 

Boiral, O. (2006). La certification ISO 14 001: Une perspective néo-institutionnelle. Management International, 10(3), 67. 

Bonifant, B., Ratcliff, I., 1994. Competitive implications of environmental regulations in the pulp and paper industry. In: Management Institute for the Environment and Business. World Resource Institute, Washington, DC. 

Brewer, J., Hunter, A., 1989. Multimethod Research: A Synthesis of Styles. Sage, Newbury Park, CA. 

Brorson, T. and Larsson, G., (1999). Environmental Management: How to Implement an Environmental Management System within a Company or Other Organization. EMS AB, Stockholm. 

Brown. M. (1994), “Environmental auditing and the hotel industry: an accountant’s perspective”. Seaton, A.V. (ed.), Tourism: The State of the Art. John Wiley and Sons, Chichester. Business Social Responsibility (BSR) official website, retrieved from www.bsr.org 

BSI, 1996. Implementation of ISO 14001: specifications with guidance for use. British Standards Institute, London. 

Caillibot, P., 1999. What there saying about standards: integration of ISO 14000 and 9000. 

Quality Progress 32 (7), 29. 

Calantone, R., Schmidt, J., Song, M., 1996. Controllable factors of new product success: a cross-national comparison. Marketing Science 15 (4), 341–358. 

Campos, L. M. S., Trierweiller, A. C., de Carvalho, D. N., & Šelih, J. (2016). Environmental management system in construction industry: A review. Environmental Engineering and Management Journal, 15(2), 453-460. 

Cao, X., Li, X., Zhu, Y., & Zhang, Z. (2015). A comparative study of environmental performance between prefabricated and traditional residential buildings in China. Journal of Cleaner Production, 109, 131-143. 

Carter, Lemuria, and Belanger (2005), The Utilization of e-government services citizen trust, innovation and acceptance factors. France Information Systems 15 (1), 5-25. 

Cascio, J. (1994, May). International environmental management standards (ISO 9000’s less tractable siblings). In Electronics and the Environment, 1994. ISEE 1994. Proceedings, 

1994 	IEEE 	International 	Symposium 	on 	(pp. 	27-28). 	IEEE. http://dx.doi.org/10.1109/ISEE.1994.337277 

Cascio, J., 1996. The ISO 14001 Handbook. Fairfax, CEEM Information Systems, Virginia. 

Cascio, J., Woodside, G. and Mitchell, P., (1996). ISO 14000 Guide – The new international environmental management standards. McGraw Hill, New York. 

Chan W., Yeung S, Chan E. & Li D (2013), “Hotel heat pump hot water systems: impact assessment and analytic hierarchy process”, International Journal of Contemporary Hospitality Management, 25(3), 428-446. 

Chan, S.W., & Wong, C.K. (2005), “Motivation for ISO 14001 in the hotel industry”, Tourism Management, 27(3), 481-92. 

Chan, W. (2007), “Environmental measures for hotels’ environmental management systems 

ISO 14001”, International Journal of Contemporary Hospitality Management, 21(5), 542-560. 

Chan, W. W., & Ho, K. (2006), “Hotels environmental management systems (ISO 14001) creative financing strategy”, International Journal of Contemporary Hospitality Management, 18(4), 302 - 316. 

Chavan, M. (2005). An appraisal of environment management systems: A competitive advantage for small businesses. Management of Environmental Quality, 16(5), 444-

463. http://dx.doi.org/10.1108/14777830510614321 

Chen, Bo. "Iso 14001, Emas, or Bs 8555: An Assessment of the Environmental Management Systems for Uk Businesses." Norwich, University of East Anglia (2004). 

Chen, P. H., Ong, C. F., & Hsu, S. C. (2016). Understanding the relationships between environmental management practices and financial performances of multinational construction firms. Journal of Cleaner Production, 139, 750-760. 

Chen, Y., & Chen, Y. (2012), “The advantages of green management for hotel competitiveness in Taiwan: In the viewpoint of senior hotel managers”. Journal of Management and Sustainability, 2(2), 211-218. Also available at www.ccsenet.org/jms. 

Chen, Z. (2017). Green technology and environmental standards. Proceedings of CIRP International Symposium—Advanced Design and Manufacture in the Global Manufacturing Era, 21-22. 

Christainsen, G. B., & Haveman, R. H. (2018). Public regulations and the slowdown in productivity growth. The American Economic Review, 320-325. 

Christine, G.; Fetsko, M., & Hendrickson, C. (2004). Environmental management systems and ISO 14001 certification for construction firms, Journal of Construction Engineering and Management, 130(3), 330-336. 

Čiegis, Remigijus, and Dalia Gineitienė. "The Role of Universities in Promoting Sustainability." Engineering Economics 48, no. 3 (2015): 63-72. 

Clark, D. (2019). What drives companies to seek ISO 14000 certification. Pollution Engineering International, 31(7), 14-15. 

Clarke, Amelia, and Rosa Kouri(2009). "Choosing an Appropriate University or College Environmental Management System." Journal of Cleaner Production 17, no. 11 971-

84. 

Cohen J., Cohen, P., (2023). Applied Multiple Regression/Corre- lation Analysis for the Behavioral Sciences. Lawrence Erlbaum, New Jersey. 

Cohen, W., & Levinthal, D. (1990), “Absorptive Capacity: A New Perspective on Learning and Innovation”, Administrative Science Quarterly, 35 (1), 128-152. 

Cohn, M. (2014). "Zoho Revamps Online Accounting Software". Accounting Today. Retrieved 29 January 2014. 

Comoglio, C., & Botta, S. (2012). The use of indicators and the role of environmental management systems for environmental performances improvement: A survey on ISO 14001 certified companies in the automotive sector. Journal of Cleaner Production, 

20(1), 92-102. http://dx.doi.org/10.1016/j.jclepro.2011.08.022 

Connolly,T., Begg, C., (2001), Database Management Information Systems 

Corbett, C. J., & Klassen, R. D. (2006). Extending the horizons: environmental excellence as key to improving operations. Manufacturing & Service Operations Management, 8(1), 5-22. 

Corbett, C.J., Kirsch, D.A., (2001). International dispersion of ISO 14000 certifications. 

Production and Operations Management 10 (3), 327–342. 

Cortese, A. D. (2003). The critical role of higher education in creating a sustainable future. 

Planning for Higher Education, 31 (3), 15–22. 

Curado, C. (2006), “Organizational learning and organizational design”. The Learning 

	Organization, 	13(1): 	25-48. 	Also 	available 	at 

https://www.repository.utl.pt/bitstream/10400.5/726/1/ORGANIZATIONAL%20LE ARNING%20AND%20ORGANIZATIONAL%20DESIGN.pdf. 

DeRoos, R. L. (2021). Environmental health and safety in the academic setting. American Journal of Public Health.  

Environmental effects of solid waste management in public universities: University of Nigeria Enugu Campus (2025).  

Lestari, F., Bowolaksono, A., Yuniautami, S. (2019). Evaluation of the implementation of occupational health, safety, and environment management systems in higher education laboratories. Journal of Chemical Health and Safety.  

National Research Council (2011). Environmental Health and Safety Management System — Prudent Practices in the Laboratory: Handling and Management of Chemical Hazards, Updated Version.  

Occupational Health and Safety Management Systems in South African Universities: Systematic Review. Safety in Extreme Environments (2025).  

Pressman, R. S. (2014). Software Engineering: A Practitioner’s Approach. McGraw-Hill Education. 