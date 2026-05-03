const electionData = {
    languages: ["en", "hi"],
    currentLang: "en",
    
    translations: {
        en: {
            appTitle: "Bharat Nirvachan",
            assistant: "Assistant",
            timeline: "Timeline",
            walkthroughs: "Walkthroughs",
            knowledge: "Knowledge Hub",
            quiz: "Quiz",
            decision: "Personalized Hub",
            voterSlip: "Voter Slip (Mock)",
            stats: "Voter Statistics",
            find: "Find Constituency",
            pledge: "Voter Pledge",
            calendar: "Election Calendar",
            askPlaceholder: "Ask about elections (e.g. How to register?)...",
            welcomeMsg: "Namaste! I am your Bharat Nirvachan Assistant. How can I help you understand the Indian election process today?",
            suggestions: ["How to register?", "Election Lifecycle", "Voting via EVM", "Who is ECI?"],
            personaLabel: "Persona:",
            personas: {
                general: "General Citizen",
                "first-time": "First-time Voter",
                student: "Student"
            },
            readAloud: "Read Aloud"
        },
        hi: {
            appTitle: "भारत निर्वाचन",
            assistant: "सहायक",
            timeline: "समयरेखा",
            walkthroughs: "मार्गदर्शिका",
            knowledge: "ज्ञान केंद्र",
            quiz: "प्रश्नोत्तरी",
            decision: "व्यक्तिगत हब",
            voterSlip: "मतदाता पर्ची (मॉक)",
            stats: "मतदाता आँकड़े",
            find: "निर्वाचन क्षेत्र खोजें",
            pledge: "voter शपथ",
            calendar: "चुनाव कैलेंडर",
            askPlaceholder: "चुनाव के बारे में पूछें (जैसे पंजीकरण कैसे करें?)...",
            welcomeMsg: "नमस्ते! मैं आपका भारत निर्वाचन सहायक हूँ। आज मैं भारतीय चुनाव प्रक्रिया को समझने में आपकी कैसे मदद कर सकता हूँ?",
            suggestions: ["पंजीकरण कैसे करें?", "चुनाव चक्र", "EVM से मतदान", "ECI कौन है?"],
            personaLabel: "व्यक्तित्व:",
            personas: {
                general: "सामान्य नागरिक",
                "first-time": "पहली बार मतदाता",
                student: "छात्र"
            },
            readAloud: "ज़ोर से पढ़ें"
        }
    },

    lifecycle: [
        {
            phase: "Voter Registration",
            title: { en: "Voter Registration & Electoral Rolls", hi: "मतदाता पंजीकरण और चुनावी नामावली" },
            content: { 
                en: "The process begins with the preparation of Electoral Rolls. Any citizen above 18 can register via Form 6.",
                hi: "प्रक्रिया चुनावी नामावली की तैयारी के साथ शुरू होती है। 18 वर्ष से अधिक आयु का कोई भी नागरिक फॉर्म 6 के माध्यम से पंजीकरण कर सकता है।"
            },
            details: {
                en: [
                    "Eligibility check (18+ years, resident of constituency)",
                    "Submission of Form 6 (Online/Offline)",
                    "Verification by Booth Level Officer (BLO)",
                    "Issuance of EPIC (Electors Photo Identity Card)"
                ],
                hi: [
                    "पात्रता की जांच (18+ वर्ष, निर्वाचन क्षेत्र का निवासी)",
                    "फॉर्म 6 जमा करना (ऑनलाइन/ऑफलाइन)",
                    "बूथ स्तर के अधिकारी (BLO) द्वारा सत्यापन",
                    "EPIC (मतदाता फोटो पहचान पत्र) जारी करना"
                ]
            },
            icon: "lucide-user-plus"
        },
        {
            phase: "Nomination",
            title: { en: "Candidate Nomination", hi: "उम्मीदवार नामांकन" },
            content: {
                en: "Candidates file their nomination papers and security deposits. These are then scrutinized by the Returning Officer.",
                hi: "उम्मीदवार अपना नामांकन पत्र और सुरक्षा जमा फाइल करते हैं। इसके बाद चुनाव अधिकारी द्वारा इनकी जांच की जाती है।"
            },
            details: {
                en: [
                    "Filing of nomination form",
                    "Security deposit payment",
                    "Scrutiny of nominations",
                    "Withdrawal of candidature"
                ],
                hi: [
                    "नामांकन फॉर्म भरना",
                    "सुरक्षा जमा भुगतान",
                    "नामांकन की जांच",
                    "उम्मीदवारी वापस लेना"
                ]
            },
            icon: "lucide-file-text"
        },
        {
            phase: "Campaigning",
            title: { en: "Election Campaigning", hi: "चुनाव प्रचार" },
            content: {
                en: "Candidates have a periodic duration for campaigning. The Model Code of Conduct (MCC) comes into force.",
                hi: "उम्मीदवारों के पास प्रचार के लिए एक निश्चित अवधि होती है। आदर्श चुनाव आचार संहिता (MCC) लागू हो जाती है।"
            },
            details: {
                en: [
                    "Adherence to Model Code of Conduct",
                    "Public meetings and rallies",
                    "Silent period (48 hours before polling ends)"
                ],
                hi: [
                    "आदर्श आचार संहिता का पालन",
                    "सार्वजनिक सभाएं और रैलियां",
                    "मौन अवधि (मतदान समाप्त होने से 48 घंटे पहले)"
                ]
            },
            icon: "lucide-megaphone"
        },
        {
            phase: "Polling",
            title: { en: "The Polling Day", hi: "मतदान का दिन" },
            content: {
                en: "Citizens cast their votes using Electronic Voting Machines (EVM) and VVPAT.",
                hi: "नागरिक इलेक्ट्रॉनिक वोटिंग मशीन (EVM) और VVPAT का उपयोग करके अपना वोट डालते हैं।"
            },
            details: {
                en: [
                    "Verification of identity at polling station",
                    "Applying indelible ink",
                    "Pressing button on EVM",
                    "Verification via VVPAT slip"
                ],
                hi: [
                    "मतदान केंद्र पर पहचान का सत्यापन",
                    "अमिट स्याही लगाना",
                    "EVM पर बटन दबाना",
                    "VVPAT पर्ची के माध्यम से सत्यापन"
                ]
            },
            icon: "lucide-vote"
        },
        {
            phase: "Counting & Results",
            title: { en: "Counting of Votes & Declaration", hi: "मतगणना और परिणामों की घोषणा" },
            content: {
                en: "The counting process is strictly monitored. Results are declared once all EVM rounds and VVPAT matches are completed.",
                hi: "मतगणना प्रक्रिया की कड़ी निगरानी की जाती है। सभी EVM राउंड और VVPAT मिलान पूरे होने के बाद परिणाम घोषित किए जाते हैं।"
            },
            details: {
                en: [
                    "Transport of EVMs to counting centers",
                    "Round-wise counting in presence of agents",
                    "Matching VVPAT slips (randomly selected booths)",
                    "Handing over Certificate of Election"
                ],
                hi: [
                    "EVM को गणना केंद्रों तक ले जाना",
                    "एजेंटों की उपस्थिति में राउंड-वार गणना",
                    "VVPAT पर्चियों का मिलान (यादृच्छिक रूप से चयनित बूथ)",
                    "निर्वाचन प्रमाण पत्र सौंपना"
                ]
            },
            icon: "lucide-trophy"
        }
    ],

    aiKnowledge: {
        "mcc": {
            title: "Model Code of Conduct (MCC)",
            detail: "The MCC is a set of guidelines issued by the ECI for candidates and political parties. It ensures that the ruling party does not use its position of power to an unfair advantage. It kicks in as soon as the election dates are announced and covers speeches, polling booths, and election manifestos."
        },
        "vvpat": {
            title: "VVPAT (Voter Verifiable Paper Audit Trail)",
            detail: "VVPAT is an independent system attached to the EVM that allows voters to verify their votes. When a vote is cast, a slip containing the name, serial number, and symbol of the candidate is displayed behind a transparent window for 7 seconds before falling into a sealed box."
        },
        "nota": {
            title: "NOTA (None Of The Above)",
            detail: "NOTA was introduced following a 2013 Supreme Court judgment. It gives voters the right to reject all candidates in a constituency. While NOTA votes are counted, they currently do not affect the result of the election; the candidate with the most votes (excluding NOTA) wins."
        },
        "article 324": {
            title: "Article 324 of the Constitution",
            detail: "Article 324 provides for the 'superintendence, direction and control of elections' to be vested in an Election Commission. This makes the ECI an autonomous constitutional authority responsible for administering election processes in India."
        },
        "returning officer": {
            title: "Returning Officer (RO)",
            detail: "The RO is the official responsible for overseeing the election process in a specific constituency. They accept nominations, perform scrutiny, and eventually declare the final results of the polling."
        },
        "scrutiny": {
            title: "Nomination Scrutiny",
            detail: "After the last date for filing nominations, the RO examines all nomination papers to ensure they comply with the law. Papers can be rejected if the candidate is disqualified or if there are major flaws in the documentation."
        },
        "booth": {
            title: "Polling Booth & Stations",
            detail: "A polling station is the place where voters cast their ballots. Each station usually handles about 1,200 to 1,500 voters. The area within 100 meters of a station is the 'silent zone' where no campaigning is allowed on polling day."
        }
    },

    universalElectionFacts: [
        {
            title: "Universal Adult Franchise",
            detail: "As per Article 326 of the Constitution, every citizen of India who is not less than 18 years of age is entitled to be registered as a voter, regardless of caste, creed, religion, or gender."
        },
        {
            title: "The Spirit of Democracy",
            detail: "Indian elections are the largest democratic exercise globally. The system is built on the pillars of transparency, impartiality, and the secret ballot, ensuring every citizen's voice is heard without fear or favor."
        },
        {
            title: "Electoral Sovereignty",
            detail: "The power to choose representatives rests entirely with the people. This is achieved through periodic elections managed by the autonomous Election Commission of India (ECI)."
        }
    ],

    walkthroughs: {
        registration: {
            title: "How to register as a Voter",
            steps: [
                "Visit the National Voters' Service Portal (nvsp.in).",
                "Click on 'Fill Form 6' for new registration.",
                "Upload a passport size photo and age/address proof.",
                "Submit and note down the Reference ID to track status."
            ]
        },
        checkStatus: {
            title: "How to check Voter ID Status",
            steps: [
                "Go to nvsp.in and click 'Track Application Status'.",
                "Enter your Reference ID or EPIC Number.",
                "Check the current stage of your application (Submitted -> Verified -> Accepted/Rejected)."
            ]
        },
        votingDay: {
            title: "Steps on Election Day",
            steps: [
                "Locate your polling booth using Voter Helpline App.",
                "Carry any valid ID proof (preferably EPIC).",
                "First officer checks name, second officer inks finger.",
                "Enter voting compartment and press button for your candidate on EVM.",
                "Wait for the VVPAT beep and 7-second slip display."
            ]
        },
        issue: {
            title: "How to report an Issue",
            steps: [
                "Open the C-VIGIL app (Election Commission's citizen app).",
                "Take a photo or record a 2-minute video of the MCC violation.",
                "Upload with GPS location for 100-minute response time.",
                "Check status on the 'Voter Helpline' website."
            ]
        }
    },

    scenarios: [
        {
            id: "withdraw",
            title: "What happens if a candidate withdraws?",
            content: "A candidate can withdraw their nomination within the period specified by the Election Commission. Once withdrawn, they cannot reverse the decision. Their name is removed from the ballot/EVM."
        },
        {
            id: "tie",
            title: "What if there is a tie in votes?",
            content: "If two candidates get an equal number of votes, the result is decided by the 'Draw of Lots' (Section 102 of the RP Act, 1951)."
        },
        {
            id: "none",
            title: "What is NOTA?",
            content: "None Of The Above (NOTA) allows voters to express their dissent against all candidates. However, even if NOTA gets the most votes, the candidate with the next highest votes is declared the winner."
        }
    ],

    comparisons: {
        title: "Election Types Comparison",
        headers: ["Feature", "General Election (Lok Sabha)", "State Election (Vidhan Sabha)", "Local Body (Panchayat/Muni)"],
        rows: [
            ["Focus", "National Policy & PM", "State Policy & CM", "Local Infrastructure"],
            ["Term", "5 Years", "5 Years", "5 Years"],
            ["Who Votes", "Whole of India", "Residents of the State", "Residents of the Ward"],
            ["Administered By", "ECI", "ECI", "State Election Commission"]
        ]
    },

    advancedTopics: [
        {
            id: "eci",
            title: "Role of Election Commission of India",
            description: "The ECI is an autonomous constitutional authority responsible for administering Union and State election processes in India. It oversees everything from voter registration to the final declaration of results, ensuring the process is free and fair."
        },
        {
            id: "delimitation",
            title: "Delimitation Commission",
            description: "To ensure 'One Vote, One Value', the Delimitation Commission redfines constituency boundaries based on the latest census. This prevents some representatives from having significantly more constituents than others."
        },
        {
            id: "antidefection",
            title: "Anti-Defection Law",
            description: "The 10th Schedule of the Constitution prevents elected members from switching parties after elections. This ensures governmental stability and prevents politicians from defying the mandate of the voters who elected them."
        },
        {
            id: "reservation",
            title: "Reservation of Constituencies",
            description: "To ensure fair representation for all, certain seats in the Lok Sabha and State Assemblies are reserved for Scheduled Castes (SC) and Scheduled Tribes (ST). While only candidates from these communities can contest, every voter in the constituency casts their vote."
        },
        {
            id: "reforms",
            title: "Electoral Reforms",
            description: "India constantly evolves its process. Recent reforms include the introduction of VVPAT for audit trails, the digitalization of the Elector Photo Identity Card (e-EPIC), and stricter disclosure norms for candidate assets and criminal records."
        },
        {
            id: "misinformation",
            title: "Misinformation & Deepfakes",
            description: "In the digital age, 'Deepfakes' and AI-generated content can spread false information. The ECI's 'Myth vs Reality' portal helps citizens verify facts. Always verify news from official sources before sharing!"
        }
    ],

    calendar: [
        { state: "Uttar Pradesh", type: "State Assembly", date: "Feb-Mar 2027", status: "Upcoming" },
        { state: "Punjab", type: "State Assembly", date: "Feb-Mar 2027", status: "Upcoming" },
        { state: "Gujarat", type: "State Assembly", date: "Dec 2027", status: "Upcoming" },
        { state: "Karnataka", type: "State Assembly", date: "May 2028", status: "Planned" }
    ],

    voterStats: [
        { label: "Male Voters", value: 497, color: "var(--accent-blue)" },
        { label: "Female Voters", value: 471, color: "var(--accent-saffron)" },
        { label: "Third Gender", value: 0.48, color: "var(--accent-green)" }
    ],

    turnoutComparison: [
        { year: "2014", value: 66.4 },
        { year: "2019", value: 67.4 },
        { year: "2024 (Est)", value: 68.2 }
    ],

    constituencyMocks: {
        "110001": { 
            name: "New Delhi", phase: "Phase 6", date: "May 25", 
            candidates: [
                { name: "Meenakshi Lekhi", party: "Party A", symbol: "☀" },
                { name: "Somnath Bharti", party: "Party B", symbol: "✋" }
            ],
            turnout: "60.5%"
        },
        "400001": { 
            name: "Mumbai South", phase: "Phase 5", date: "May 20", 
            candidates: [
                { name: "Arvind Sawant", party: "Party A", symbol: "☀" },
                { name: "Anil Desai", party: "Party C", symbol: "❄" }
            ],
            turnout: "55.2%"
        },
        "700001": { 
            name: "Kolkata Uttar", phase: "Phase 7", date: "June 1", 
            candidates: [
                { name: "Sudip Bandyopadhyay", party: "Party B", symbol: "✋" },
                { name: "Tapas Roy", party: "Party A", symbol: "☀" }
            ],
            turnout: "62.1%"
        },
        "560001": { 
            name: "Bangalore Central", phase: "Phase 2", date: "April 26", 
            candidates: [
                { name: "P.C. Mohan", party: "Party A", symbol: "☀" },
                { name: "Mansoor Khan", party: "Party B", symbol: "✋" }
            ],
            turnout: "54.8%"
        },
        "600001": { 
            name: "Chennai North", phase: "Phase 1", date: "April 19", 
            candidates: [
                { name: "Kalanidhi V.", party: "Party D", symbol: "☘" },
                { name: "R.C. Paul", party: "Party A", symbol: "☀" }
            ],
            turnout: "60.1%"
        },
        "500001": { 
            name: "Hyderabad", phase: "Phase 4", date: "May 13", 
            candidates: [
                { name: "Asaduddin Owaisi", party: "Party E", symbol: "✈" },
                { name: "Madhavi Latha", party: "Party A", symbol: "☀" }
            ],
            turnout: "46.1%"
        },
        "380001": { 
            name: "Ahmedabad West", phase: "Phase 3", date: "May 7", 
            candidates: [
                { name: "Kirit Solanki", party: "Party A", symbol: "☀" },
                { name: "Bharat Makwana", party: "Party B", symbol: "✋" }
            ],
            turnout: "58.4%"
        },
        "411001": { 
            name: "Pune", phase: "Phase 4", date: "May 13", 
            candidates: [
                { name: "Murlidhar Mohol", party: "Party A", symbol: "☀" },
                { name: "Ravindra Dhangekar", party: "Party B", symbol: "✋" }
            ],
            turnout: "53.5%"
        },
        "226001": { 
            name: "Lucknow", phase: "Phase 5", date: "May 20", 
            candidates: [
                { name: "Rajnath Singh", party: "Party A", symbol: "☀" },
                { name: "Ravidas Mehrotra", party: "Party F", symbol: "🚲" }
            ],
            turnout: "52.0%"
        }
    },

    quizzes: [
        {
            question: "What is the minimum age to vote in India?",
            options: ["16", "18", "21", "25"],
            correct: 1,
            explanation: "The 61st Amendment Act of 1988 reduced the voting age from 21 to 18."
        },
        {
            question: "Full form of VVPAT?",
            options: ["Voter Verifiable Paper Audit Trail", "Verified Voter Paper Account Trail", "Voter Visual Paper Audit Test", "Valid Voter Paper Audit Trail"],
            correct: 0,
            explanation: "VVPAT allows voters to verify that their vote was cast correctly."
        },
        {
            question: "Who appoints the Chief Election Commissioner?",
            options: ["Prime Minister", "Chief Justice of India", "President of India", "Parliament"],
            correct: 2,
            explanation: "The President of India appoints the CEC and other Election Commissioners."
        }
    ]
};
