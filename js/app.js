/**
 * Bharat Nirvachan Assistant - Main App Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    const viewContainer = document.getElementById('view-container');
    const navLinks = document.querySelectorAll('.nav-links li');
    const langToggle = document.getElementById('lang-toggle');
    const personaSelect = document.getElementById('persona-select');

    let currentView = 'assistant';
    let currentPersona = 'general';
    let chatHistory = [];

    // --- Core View Routing ---
    const routes = {
        assistant: renderAssistant,
        timeline: renderTimeline,
        walkthroughs: renderWalkthroughs,
        knowledge: renderKnowledgeHub,
        quiz: renderQuiz,
        decision: renderDecisionTree,
        voterSlip: renderVoterSlip,
        stats: renderStats,
        find: renderConstituencyFinder,
        pledge: renderPledge,
        calendar: renderCalendar,
        scenarios: renderScenarios
    };

    function navigate(view) {
        currentView = view;
        // Update Nav UI
        navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.view === view);
        });
        // Render View
        viewContainer.innerHTML = ''; // Clear current
        if (routes[view]) {
            routes[view]();
        }
    }

    // Nav Click Event
    navLinks.forEach(link => {
        link.addEventListener('click', () => navigate(link.dataset.view));
    });

    // --- Assistant Component ---
    function renderAssistant() {
        const t = electionData.translations[electionData.currentLang];
        let welcomeMsg = t.welcomeMsg;

        if (currentPersona === 'first-time') {
            welcomeMsg = "Congratulations on being a future voter! I can help you register and understand how to cast your first vote.";
        } else if (currentPersona === 'student') {
            welcomeMsg = "Hello! Preparing for exams or just curious? I can explain the constitutional aspects and advanced election laws.";
        }
        
        const assistantHTML = `
            <div class="chat-window">
                <div class="chat-history" id="chat-history">
                    <div class="message bot">
                        <div class="message-avatar">AI</div>
                        <div class="message-bubble">
                            <p>${welcomeMsg}</p>
                            <div class="suggestion-chips">
                                ${t.suggestions.map(s => `<span class="chip" onclick="handleSuggestion('${s}')">${s}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        viewContainer.innerHTML = assistantHTML;
        
        // Re-inject history if any
        if (chatHistory.length > 0) {
            const historyEl = document.getElementById('chat-history');
            chatHistory.forEach(msg => appendMessage(msg.text, msg.type, true));
        }
    }

    window.handleSuggestion = (text) => {
        appendMessage(text, 'user');
        const lowText = text.toLowerCase();
        
        setTimeout(() => {
            let responseParts = [];
            let detailBlocks = [];

            // 1. Search all specific knowledge categories
            // aiKnowledge
            for (let key in electionData.aiKnowledge) {
                if (lowText.includes(key)) {
                    const k = electionData.aiKnowledge[key];
                    responseParts.push(`<strong>${k.title}</strong>`);
                    detailBlocks.push(`<div class="decision-node" style="margin-top:1rem; border-color:var(--accent-blue)">${k.detail}</div>`);
                }
            }

            // advancedTopics
            electionData.advancedTopics.forEach(topic => {
                if (lowText.includes(topic.title.toLowerCase()) || lowText.includes(topic.id.toLowerCase())) {
                    if (!responseParts.includes(`<strong>${topic.title}</strong>`)) {
                        responseParts.push(`<strong>${topic.title}</strong>`);
                        detailBlocks.push(`<div class="decision-node" style="margin-top:1rem; border-color:var(--accent-saffron)">${topic.description}</div>`);
                    }
                }
            });

            // walkthroughs
            Object.values(electionData.walkthroughs).forEach(w => {
               if (lowText.includes(w.title.toLowerCase())) {
                   responseParts.push(`<strong>${w.title}</strong>`);
                   detailBlocks.push(`<div class="decision-node" style="margin-top:1rem; border-color:var(--accent-green)">${w.steps.join(' ')}</div>`);
               }
            });

            // 2. Final Construction (The "Never Say No" logic)
            let finalMsg = "";
            if (responseParts.length > 0) {
                finalMsg = `Based on our election database, here is the detailed information regarding ${responseParts.join(' and ')}:`;
            } else {
                // Universal Fallback - Always provide informative value
                const fact = electionData.universalElectionFacts[Math.floor(Math.random() * electionData.universalElectionFacts.length)];
                finalMsg = `That is a specialized area of election law. To understand it better, it's helpful to look at the foundational principles of Indian Democracy:`;
                detailBlocks.push(`<div class="decision-node" style="margin-top:1rem; border-color:var(--accent-blue)">
                    <h3 style="color:var(--accent-blue); margin-bottom:0.5rem;">${fact.title}</h3>
                    ${fact.detail}
                    <p style="font-size:0.85rem; margin-top:1rem; opacity:0.8;">You can also find more specific details in our <strong>Knowledge Hub</strong>.</p>
                </div>`);
            }

            appendMessage(finalMsg + detailBlocks.join(''), 'bot');
        }, 800);
    };

    function appendMessage(text, type, skipHistorySave = false) {
        const historyEl = document.getElementById('chat-history');
        if (!historyEl) return;

        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${type}`;
        msgDiv.innerHTML = `
            <div class="message-avatar">${type === 'bot' ? 'AI' : 'U'}</div>
            <div class="message-bubble">${text}</div>
        `;
        historyEl.appendChild(msgDiv);
        historyEl.scrollTop = historyEl.scrollHeight;

        if (!skipHistorySave) {
            chatHistory.push({ text, type });
        }
    }

    // --- Timeline Component ---
    function renderTimeline() {
        const t = electionData.translations[electionData.currentLang];
        const timelineHTML = `
            <h1 class="view-title">${t.timeline}</h1>
            <div class="timeline-container">
                ${electionData.lifecycle.map((item, idx) => `
                    <div class="timeline-item" style="animation-delay: ${idx * 0.1}s">
                        <div class="timeline-marker"><i class="lucide-check"></i></div>
                        <div class="timeline-content">
                            <span class="timeline-date">Phase ${idx + 1}</span>
                            <h3 class="timeline-title">${item.title[electionData.currentLang]}</h3>
                            <button class="voice-btn" onclick="speakText('${item.content[electionData.currentLang]}')">
                                <i class="lucide-volume-2"></i> ${t.readAloud}
                            </button>
                            <p>${item.content[electionData.currentLang]}</p>
                            <ul style="margin-top: 1rem; color: var(--text-secondary); font-size: 0.9rem;">
                                ${item.details[electionData.currentLang].map(d => `<li>${d}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        viewContainer.innerHTML = timelineHTML;
    }

    // --- Voter Slip Component ---
    function renderVoterSlip() {
        const t = electionData.translations[electionData.currentLang];
        const slipHTML = `
            <h1 class="view-title">${t.voterSlip}</h1>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                <div class="timeline-content">
                    <h3 class="timeline-title">Personalize Your Slip</h3>
                    <div class="form-group">
                        <input type="text" id="slip-name" placeholder="Full Name" class="input-field">
                        <input type="text" id="slip-id" placeholder="EPIC Number" class="input-field">
                        <div style="margin-bottom:1rem;">
                            <label style="font-size:0.8rem; color:var(--text-secondary)">Mock Photo Upload</label>
                            <input type="file" id="slip-photo-input" class="input-field" accept="image/*" onchange="previewPhoto(event)">
                        </div>
                        <button class="btn-primary" style="width:100%" onclick="generateMockSlip()">Update Slip</button>
                    </div>
                </div>
                <div id="slip-container" class="slip-preview">
                    <!-- Slip will be rendered here -->
                    <p style="color:var(--text-secondary); text-align:center;">Fill details to preview your mock voter slip</p>
                </div>
            </div>
        `;
        viewContainer.innerHTML = slipHTML;
    }

    window.generateMockSlip = () => {
        const name = document.getElementById('slip-name').value || "NAME NOT ENTERED";
        const epic = document.getElementById('slip-id').value || "EPIC NOT ENTERED";
        const photoSrc = window.currentVoterPhoto || "https://via.placeholder.com/80x90?text=PHOTO";
        
        const container = document.getElementById('slip-container');
        container.innerHTML = `
            <div class="voter-slip-card" style="animation: scaleUp 0.3s ease-out;">
                <div class="slip-header">
                    <div class="flag-stripe top"></div>
                    <p>ELECTION COMMISSION OF INDIA</p>
                    <p style="font-size:0.6rem">MOCK DIGITAL SLIP / डिजिटल पर्ची</p>
                </div>
                <div class="slip-body" style="grid-template-columns: 80px 1fr 60px;">
                    <div class="slip-photo" style="background: url('${photoSrc}') center/cover no-repeat; border-style: solid;">
                        ${!window.currentVoterPhoto ? 'PHOTO' : ''}
                    </div>
                    <div class="slip-info">
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>EPIC:</strong> ${epic}</p>
                        <p style="font-size:0.7rem; color:var(--text-secondary); margin-top:0.5rem;">Digital Signature Verified ✓</p>
                    </div>
                    <div class="slip-qr">
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=60x60&data=${epic}" alt="QR code">
                    </div>
                </div>
                <div class="slip-footer">
                    Secured by Blockchain (Mock) | Valid for Polling Day
                </div>
            </div>
            <button class="btn-secondary" style="margin-top:1rem; width:100%" onclick="window.print()">Download (Print PDF)</button>
        `;
    };

    window.previewPhoto = (event) => {
        const reader = new FileReader();
        reader.onload = () => {
            window.currentVoterPhoto = reader.result;
            generateMockSlip();
        };
        reader.readAsDataURL(event.target.files[0]);
    };

    window.speakText = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = electionData.currentLang === 'hi' ? 'hi-IN' : 'en-US';
        speechSynthesis.speak(utterance);
    };

    // --- Walkthroughs Component ---
    function renderWalkthroughs() {
        const w = electionData.walkthroughs;
        const walkthroughHTML = `
            <h1 class="view-title">Guided Walkthroughs</h1>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
                ${Object.values(w).map(item => `
                    <div class="timeline-content">
                        <h3 class="timeline-title">${item.title}</h3>
                        <div style="display: flex; flex-direction: column; gap: 1rem;">
                            ${item.steps.map((step, i) => `
                                <div style="display: flex; gap: 1rem; align-items: start;">
                                    <div style="background: var(--accent-blue); width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; flex-shrink: 0;">${i+1}</div>
                                    <p style="font-size: 0.9rem;">${step}</p>
                                </div>
                            `).join('')}
                            ${item.title.includes("Election Day") ? `<button class="btn-primary" style="margin-top:1rem;" onclick="startEVMSimulation()">Try EVM Simulator</button>` : ''}
                            ${item.title.includes("Voter ID Status") ? `
                                <div style="margin-top:1rem;">
                                    <input type="text" id="status-id-input" placeholder="Enter EPIC (e.g. ABC1234567)" class="input-field" style="margin-bottom:0.5rem">
                                    <button class="btn-secondary" style="width:100%" onclick="checkVoterStatus()">Check Status</button>
                                    <div id="status-result" style="margin-top:1rem;"></div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
            <div id="evm-modal" class="modal" style="display:none;">
                <div class="modal-content evm-machine">
                    <div class="evm-header">ELECTRONIC VOTING MACHINE</div>
                    <div class="evm-body">
                        <div class="candidate-row">
                            <span class="cand-num">1</span>
                            <span class="cand-name">Candidate A</span>
                            <div class="vote-btn" onclick="simulateVote('Candidate A')"></div>
                        </div>
                        <div class="candidate-row">
                            <span class="cand-num">2</span>
                            <span class="cand-name">Candidate B</span>
                            <div class="vote-btn" onclick="simulateVote('Candidate B')"></div>
                        </div>
                    </div>
                    <div id="vvpat-display" class="vvpat-screen">
                        Wait for vote...
                    </div>
                    <button class="btn-secondary" style="margin-top:1rem; width:100%;" onclick="closeEVM()">Close Simulator</button>
                </div>
            </div>
        `;
        viewContainer.innerHTML = walkthroughHTML;
    }

    window.startEVMSimulation = () => {
        document.getElementById('evm-modal').style.display = 'flex';
    };

    window.closeEVM = () => {
        document.getElementById('evm-modal').style.display = 'none';
    };

    window.simulateVote = (name) => {
        const vvpat = document.getElementById('vvpat-display');
        vvpat.innerHTML = `<div style="color:var(--accent-green)">BEEP!</div><div style="font-size:0.7rem;">Vote cast for: ${name}</div>`;
        vvpat.classList.add('active');
        setTimeout(() => {
            vvpat.classList.remove('active');
            vvpat.innerHTML = "Slip confirmed. 7 seconds over.";
        }, 3000);
    };

    // --- Knowledge Hub ---
    function renderKnowledgeHub() {
        const t = electionData.translations[electionData.currentLang];
        const hubHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                <h1 class="view-title" style="margin-bottom: 0;">Knowledge Hub</h1>
                <div class="search-box" style="width: 300px; height: 45px;">
                    <i class="lucide-search"></i>
                    <input type="text" id="hub-search" placeholder="Search topics..." onkeyup="filterHub()">
                </div>
            </div>

            <!-- Visual Election Cycle Diagram -->
            <div class="timeline-content" style="margin-bottom: 3rem; text-align:center;">
                <h3 class="timeline-title">The Election Cycle - Visual Flow</h3>
                <div style="background: rgba(255,255,255,0.02); padding: 2rem; border-radius: 12px; border: 1px solid var(--glass-border);">
                    <svg viewBox="0 0 800 200" style="width:100%; height:auto;">
                        <!-- Arrows -->
                        <path d="M150 100 H250" stroke="var(--accent-saffron)" stroke-width="2" marker-end="url(#arrow)"/>
                        <path d="M350 100 H450" stroke="var(--accent-saffron)" stroke-width="2" marker-end="url(#arrow)"/>
                        <path d="M550 100 H650" stroke="var(--accent-saffron)" stroke-width="2" marker-end="url(#arrow)"/>
                        
                        <!-- Nodes -->
                        <circle cx="100" cy="100" r="40" fill="rgba(255,153,51,0.1)" stroke="var(--accent-saffron)" stroke-width="2"/>
                        <text x="100" y="105" text-anchor="middle" fill="white" font-size="12">Rolls</text>
                        
                        <circle cx="300" cy="100" r="40" fill="rgba(255,255,255,0.05)" stroke="white" stroke-width="2"/>
                        <text x="300" y="105" text-anchor="middle" fill="white" font-size="12">Nominations</text>
                        
                        <circle cx="500" cy="100" r="40" fill="rgba(255,255,255,0.05)" stroke="white" stroke-width="2"/>
                        <text x="500" y="105" text-anchor="middle" fill="white" font-size="12">Polling</text>
                        
                        <circle cx="700" cy="100" r="40" fill="rgba(18,136,7,0.1)" stroke="var(--accent-green)" stroke-width="2"/>
                        <text x="700" y="105" text-anchor="middle" fill="white" font-size="12">Results</text>
                        
                        <defs>
                            <marker id="arrow" markerWidth="10" markerHeight="10" refX="0" refY="3" orientation="auto" markerUnits="strokeWidth">
                              <path d="M0,0 L0,6 L9,3 z" fill="var(--accent-saffron)" />
                            </marker>
                        </defs>
                    </svg>
                    <p style="color:var(--text-secondary); font-size:0.8rem; margin-top:1rem;">A simplified visualization of the four primary pillars of the election process.</p>
                </div>
            </div>
            
            <!-- Comparison Table Section -->
            <div class="timeline-content" style="margin-bottom: 3rem; overflow-x: auto;">
                <h3 class="timeline-title">${electionData.comparisons.title}</h3>
                <table class="comparison-table">
                    <thead>
                        <tr>
                            ${electionData.comparisons.headers.map(h => `<th>${h}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${electionData.comparisons.rows.map(row => `
                            <tr>
                                ${row.map(cell => `<td>${cell}</td>`).join('')}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <div id="hub-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                ${electionData.advancedTopics.map(topic => `
                    <div class="timeline-content topic-card" data-title="${topic.title.toLowerCase()}">
                        <h3 class="timeline-title">${topic.title}</h3>
                        <p style="color: var(--text-secondary);">${topic.description}</p>
                        <button class="chip" style="margin-top:1rem; border-color: var(--accent-blue)" onclick="showFlowchart('${topic.id}')">View Process Map</button>
                    </div>
                `).join('')}
            </div>
            <div id="flowchart-container" style="margin-top: 3rem;"></div>
        `;
        viewContainer.innerHTML = hubHTML;
    }

    window.filterHub = () => {
        const query = document.getElementById('hub-search').value.toLowerCase();
        const cards = document.querySelectorAll('.topic-card');
        cards.forEach(card => {
            const title = card.dataset.title;
            card.style.display = title.includes(query) ? 'block' : 'none';
        });
    };

    window.showFlowchart = (id) => {
        const container = document.getElementById('flowchart-container');
        if (id === 'eci') {
            container.innerHTML = `
                <div class="decision-node">
                    <h3 class="timeline-title">How a Vote is Counted</h3>
                    <div class="flow-diagram">
                        <div class="flow-step">1. Storage in Strong Room (Post-Poll)</div>
                        <div class="flow-step">2. Opening in Presence of Agents</div>
                        <div class="flow-step">3. Round-wise EVM Counting</div>
                        <div class="flow-step">4. VVPAT Slip Verification (Randomized)</div>
                        <div class="flow-step">5. Final Result Declaration</div>
                    </div>
                </div>
            `;
        } else {
            container.innerHTML = `<p style="text-align:center; color:var(--text-secondary);">Flowchart for ${id} coming soon!</p>`;
        }
    };

    // --- Decision Tree ---
    function renderDecisionTree() {
        const treeHTML = `
            <h1 class="view-title">Personalized Guidance</h1>
            <div id="decision-root">
                <div class="decision-node">
                    <h2>What is your primary goal today?</h2>
                    <div class="decision-options">
                        <button class="btn-primary" onclick="handleDecision('register')">I want to Register</button>
                        <button class="btn-primary" onclick="handleDecision('info')">I want Information</button>
                        <button class="btn-primary" onclick="handleDecision('issue')">I have an Issue</button>
                    </div>
                </div>
            </div>
        `;
        viewContainer.innerHTML = treeHTML;
    }

    window.handleDecision = (choice) => {
        const root = document.getElementById('decision-root');
        if (choice === 'register') {
            root.innerHTML = `
                <div class="decision-node">
                    <h2>Do you have an existing Voter ID?</h2>
                    <div class="decision-options">
                        <button class="btn-primary" onclick="navigate('walkthroughs')">No, I'm New</button>
                        <button class="btn-primary" onclick="handleDecision('update')">Yes, but need update</button>
                    </div>
                    <button class="btn-secondary" style="margin-top:2rem;" onclick="renderDecisionTree()">← Back</button>
                </div>
            `;
        } else {
            root.innerHTML = `
                <div class="decision-node">
                    <h2>Great! Check out our Knowledge Hub for deeper insights.</h2>
                    <button class="btn-primary" onclick="navigate('knowledge')">Go to Knowledge Hub</button>
                    <button class="btn-secondary" style="margin-top:2rem;" onclick="renderDecisionTree()">← Back</button>
                </div>
            `;
        }
    };

    // --- Quiz Component ---
    let currentQuizIndex = 0;
    function renderQuiz() {
        const q = electionData.quizzes[currentQuizIndex];
        const quizHTML = `
            <div class="quiz-card">
                <p style="color: var(--accent-saffron); margin-bottom: 1rem; font-weight: 600;">Question ${currentQuizIndex + 1} of ${electionData.quizzes.length}</p>
                <h2 class="quiz-question">${q.question}</h2>
                <div class="options-grid">
                    ${q.options.map((opt, i) => `
                        <div class="quiz-option" onclick="checkAnswer(${i})">${opt}</div>
                    `).join('')}
                </div>
                <div id="quiz-feedback" style="margin-top: 2rem; display: none;">
                    <div id="feedback-text" style="padding: 1rem; border-radius: 8px; margin-bottom: 1rem;"></div>
                    <button class="btn-secondary" onclick="nextQuestion()">Next Question</button>
                </div>
            </div>
        `;
        viewContainer.innerHTML = quizHTML;
    }

    window.checkAnswer = (index) => {
        const q = electionData.quizzes[currentQuizIndex];
        const feedback = document.getElementById('quiz-feedback');
        const feedbackText = document.getElementById('feedback-text');
        const options = document.querySelectorAll('.quiz-option');
        
        options.forEach(opt => opt.onclick = null); // Disable after click

        if (index === q.correct) {
            options[index].classList.add('correct');
            feedbackText.innerHTML = `<strong>Correct!</strong> <br> ${q.explanation}`;
            feedbackText.style.background = 'rgba(34, 197, 94, 0.1)';
            feedbackText.style.color = 'var(--accent-green)';
        } else {
            options[index].classList.add('incorrect');
            options[q.correct].classList.add('correct');
            feedbackText.innerHTML = `<strong>Incorrect.</strong> <br> ${q.explanation}`;
            feedbackText.style.background = 'rgba(239, 68, 68, 0.1)';
            feedbackText.style.color = '#ef4444';
        }
        feedback.style.display = 'block';
    };

    window.nextQuestion = () => {
        currentQuizIndex = (currentQuizIndex + 1) % electionData.quizzes.length;
        renderQuiz();
    };

    // --- Status Checker Logic ---
    window.checkVoterStatus = () => {
        const id = document.getElementById('status-id-input').value;
        const result = document.getElementById('status-result');
        if (!id) return;

        result.innerHTML = `
            <div class="decision-node" style="border-color:var(--accent-blue); animation: fadeIn 0.5s">
                <h3 style="color:var(--accent-blue)">Status Found for ${id}</h3>
                <div style="text-align:left; font-size:0.9rem;">
                    <p>● <strong>Name:</strong> Verified</p>
                    <p>● <strong>Polling Booth:</strong> Booth #12, Central School</p>
                    <p>● <strong>Status:</strong> Active on Electoral Roll</p>
                </div>
            </div>
        `;
    };

    // --- Stats Component ---
    function renderStats() {
        const t = electionData.translations[electionData.currentLang];
        const stats = electionData.voterStats;
        const comparison = electionData.turnoutComparison;
        
        const statsHTML = `
            <h1 class="view-title">${t.stats}</h1>
            <div class="stats-grid">
                <div class="timeline-content">
                    <h3 class="timeline-title">Electors Demographics</h3>
                    <div style="display:flex; align-items:center; gap:2rem; margin-top:1rem;">
                        <svg width="150" height="150" viewBox="0 0 42 42" class="donut">
                            <circle class="donut-hole" cx="21" cy="21" r="15.915" fill="transparent"></circle>
                            <circle class="donut-ring" cx="21" cy="21" r="15.915" fill="transparent" stroke="rgba(255,255,255,0.05)" stroke-width="3"></circle>
                            <circle class="donut-segment" cx="21" cy="21" r="15.915" fill="transparent" stroke="var(--accent-blue)" stroke-width="3" stroke-dasharray="51 49" stroke-dashoffset="25"></circle>
                            <circle class="donut-segment" cx="21" cy="21" r="15.915" fill="transparent" stroke="var(--accent-saffron)" stroke-width="3" stroke-dasharray="48 52" stroke-dashoffset="74"></circle>
                        </svg>
                        <div style="font-size:0.8rem;">
                            <p style="color:var(--accent-blue)">● Male (51%)</p>
                            <p style="color:var(--accent-saffron)">● Female (48%)</p>
                            <p style="color:var(--accent-green)">● Other (1%)</p>
                        </div>
                    </div>
                </div>
                <div class="timeline-content">
                    <h3 class="timeline-title">Historical Turnout Trend</h3>
                    <div class="chart-container" style="margin-top:2rem">
                        ${comparison.map(c => `
                            <div class="chart-bar-wrap">
                                <div class="chart-label">${c.year}</div>
                                <div class="chart-track">
                                    <div class="chart-fill" style="width: ${c.value}%; background: var(--accent-blue);">
                                        <span>${c.value}%</span>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        viewContainer.innerHTML = statsHTML;
    }

    // --- Constituency Finder ---
    function renderConstituencyFinder() {
        const t = electionData.translations[electionData.currentLang];
        const finderHTML = `
            <h1 class="view-title">${t.find}</h1>
            <div class="timeline-content" style="max-width:600px; margin: 0 auto;">
                <p style="margin-bottom:1.5rem; color:var(--text-secondary)">Enter your PIN code to find your mock constituency info.</p>
                <div class="form-group" style="display:flex; gap:1rem;">
                    <input type="text" id="pin-input" placeholder="e.g. 110001" class="input-field" style="margin-bottom:0">
                    <button class="btn-primary" onclick="searchPin()">Search</button>
                </div>
                <div id="find-result" style="margin-top:2rem;"></div>
            </div>
        `;
        viewContainer.innerHTML = finderHTML;
    }

    window.searchPin = () => {
        const pin = document.getElementById('pin-input').value;
        const result = document.getElementById('find-result');
        const data = electionData.constituencyMocks[pin];

        if (data) {
            result.innerHTML = `
                <div class="decision-node" style="margin:0; width:100%; border-color: var(--accent-blue); animation: slideInUp 0.3s ease-out;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <h2 style="color:var(--accent-blue); margin:0;">${data.name}</h2>
                        <span class="chip" style="background:var(--accent-green); color:black;">Est. Turnout: ${data.turnout}</span>
                    </div>
                    <div style="margin-top:1.5rem;">
                        <p style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:1rem;">Candidates contesting in this constituency:</p>
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
                            ${data.candidates.map(c => `
                                <div class="timeline-content" style="margin:0; text-align:center; padding:1rem; border: 1px solid var(--glass-border);">
                                    <div style="font-size:2rem; margin-bottom:0.5rem;">${c.symbol}</div>
                                    <p style="font-weight:600; margin:0;">${c.name}</p>
                                    <p style="font-size:0.7rem; color:var(--text-secondary);">${c.party}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div style="margin-top:1.5rem; border-top:1px solid var(--glass-border); padding-top:1rem; display:flex; justify-content:space-between; font-size:0.8rem;">
                        <span>Polling Date: <strong>${data.date}</strong></span>
                        <span>Phase: <strong>${data.phase}</strong></span>
                    </div>
                </div>
            `;
        } else {
            result.innerHTML = `
                <div class="decision-node" style="margin:0; width:100%; border-color: #ef4444">
                    <p>No data found for this PIN code in our mock database.</p>
                    <p style="font-size:0.8rem; color:var(--text-secondary)">Try major cities: 110001 (Delhi), 400001 (Mumbai), 500001 (Hyderabad), or 226001 (Lucknow).</p>
                </div>
            `;
        }
    };

    // --- Voter Pledge ---
    function renderPledge() {
        const t = electionData.translations[electionData.currentLang];
        const pledgeHTML = `
            <div class="pledge-container">
                <div class="pledge-card" id="pledge-card">
                    <h1 style="color:var(--accent-saffron); margin-bottom:1rem;">NATIONAL VOTER PLEDGE</h1>
                    <p style="font-size:1.2rem; line-height:1.8; font-style:italic;">
                        "We, the citizens of India, having abiding faith in democracy, hereby pledge to uphold the democratic traditions of our country and the dignity of free, fair and peaceful elections, and to vote in every election fearlessly and without being influenced by considerations of religion, race, caste, community, language or any inducement."
                    </p>
                    <div style="margin-top:2rem;">
                        <input type="text" id="pledge-name" placeholder="Enter your name" class="input-field" style="max-width:300px; text-align:center; border-bottom: 2px solid var(--accent-blue);">
                    </div>
                </div>
                <button class="btn-primary" style="margin-top:2rem;" onclick="signPledge()">I Pledge to Vote</button>
                <div id="pledge-cert" style="margin-top:2rem;"></div>
            </div>
        `;
        viewContainer.innerHTML = pledgeHTML;
    }

    window.signPledge = () => {
        const name = document.getElementById('pledge-name').value || "Proud Citizen";
        const cert = document.getElementById('pledge-cert');
        cert.innerHTML = `
            <div class="decision-node" style="border-color: var(--accent-green); background: rgba(34, 197, 94, 0.05);">
                <h3 style="color:var(--accent-green)">Certificate of Commitment</h3>
                <p>This is to certify that <strong>${name}</strong> has taken the National Voter Pledge.</p>
                <button class="chip" onclick="window.print()" style="margin-top:1rem;">Download Certificate</button>
            </div>
        `;
    };

    // --- Election Calendar ---
    function renderCalendar() {
        const t = electionData.translations[electionData.currentLang];
        const calendarHTML = `
            <h1 class="view-title">${t.calendar}</h1>
            <div class="timeline-container">
                ${electionData.calendar.map(item => `
                    <div class="timeline-content" style="margin-bottom:1rem; display:flex; justify-content:space-between; align-items:center;">
                        <div>
                            <h3 class="timeline-title" style="margin:0">${item.state}</h3>
                            <p style="color:var(--text-secondary); font-size:0.9rem;">${item.type}</p>
                        </div>
                        <div style="text-align:right;">
                            <p style="color:var(--accent-saffron); font-weight:bold;">${item.date}</p>
                            <span class="chip" style="font-size:0.7rem; padding:0.2rem 0.5rem;">${item.status}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        viewContainer.innerHTML = calendarHTML;
    }

    // --- Scenarios Component ---
    function renderScenarios() {
        const scenariosHTML = `
            <h1 class="view-title">Scenario-Based Learning</h1>
            <p style="color:var(--text-secondary); margin-bottom:2rem;">Explore what happens in unique election situations.</p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
                ${electionData.scenarios.map(s => `
                    <div class="timeline-content" style="cursor:pointer;" onclick="showScenarioDetail('${s.id}')">
                        <h3 class="timeline-title">${s.title}</h3>
                        <p style="font-size:0.9rem; color:var(--text-secondary)">Click to reveal explanation →</p>
                    </div>
                `).join('')}
            </div>
            <div id="scenario-detail" style="margin-top:3rem;"></div>
        `;
        viewContainer.innerHTML = scenariosHTML;
    }

    window.showScenarioDetail = (id) => {
        const scenario = electionData.scenarios.find(s => s.id === id);
        const detail = document.getElementById('scenario-detail');
        detail.innerHTML = `
            <div class="decision-node" style="border-color: var(--accent-saffron); animation: fadeIn 0.5s ease-out;">
                <h2 style="color:var(--accent-saffron)">${scenario.title}</h2>
                <div style="background: rgba(251, 191, 36, 0.05); padding: 1.5rem; border-radius: 8px; line-height: 1.8;">
                    ${scenario.content}
                </div>
            </div>
        `;
    };

    // Global Search Logic
    const globalSearch = document.getElementById('global-search');
    globalSearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && globalSearch.value) {
            const query = globalSearch.value;
            globalSearch.value = '';
            navigate('assistant');
            setTimeout(() => handleSuggestion(query), 100);
        }
    });

    // --- Initialization ---
    navigate('assistant');

    // Language Toggle
    langToggle.addEventListener('click', () => {
        electionData.currentLang = electionData.currentLang === 'en' ? 'hi' : 'en';
        updateLangugeUI();
        navigate(currentView); // Refresh current view
    });

    // Persona Change Logic
    personaSelect.addEventListener('change', (e) => {
        currentPersona = e.target.value;
        chatHistory = []; // Reset chat for new persona context
        if (currentView === 'assistant') {
            renderAssistant();
        }
    });

    function updateLangugeUI() {
        const t = electionData.translations[electionData.currentLang];
        // Note: Full UI update would go here, for now it updates the dynamic text
        navLinks.forEach(link => {
            const view = link.dataset.view;
            link.querySelector('span').innerText = t[view];
        });
        document.querySelector('.search-box input').placeholder = t.askPlaceholder;
        langToggle.innerText = electionData.currentLang === 'en' ? 'English | हिंदी' : 'हिंदी | English';
    }
});
