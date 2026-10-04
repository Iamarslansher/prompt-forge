import { ADVANCED_QUESTION_DATA } from './advancedQuestions.js';
import { improveDistractors } from '../utils/questionQuality.js';

const BASE_QUESTIONS_DATA = {
  1: [
    {
      id: "q1_1",
      question: "What is a Large Language Model (LLM) primarily designed to do when processing a prompt?",
      options: [
        "Search Google in real-time and copy paste exact matching paragraphs",
        "Predict the mathematically most probable sequence of tokens based on pre-training and input context",
        "Perform conscious human-like reasoning and store personal memories of the user",
        "Execute raw machine code directly on the user's graphics processor"
      ],
      correctAnswer: 1,
      explanation: "LLMs do not 'think' or copy-paste; they are statistical prediction engines trained to output the most probable next tokens based on the prompt context provided."
    },
    {
      id: "q1_2",
      question: "Which of the following best defines Prompt Engineering?",
      options: [
        "Writing computer code in C++ to compile deep learning hardware drivers",
        "Designing, refining, and structuring text inputs to guide AI models toward optimal, accurate outputs",
        "Installing web browser plugins to block AI generated content",
        "Hacking database passwords using automated brute-force scripts"
      ],
      correctAnswer: 1,
      explanation: "Prompt Engineering is the strategic discipline of structuring instructions, context, constraints, and formatting rules for AI models."
    },
    {
      id: "q1_3",
      question: "Look at the prompt: 'Write something about Pakistan.' Why is this considered a weak/bad prompt?",
      options: [
        "It uses proper capitalization and punctuation",
        "It lacks context, target audience, format specification, tone, and word length constraints",
        "Pakistan is too complex for AI to understand",
        "It contains invalid HTML syntax"
      ],
      correctAnswer: 1,
      explanation: "Vague prompts lead to generic or unpredictable outputs because the AI model is forced to guess your intended scope, depth, format, and audience."
    },
    {
      id: "q1_4",
      question: "What are the 3 core pillars of a basic prompt structure?",
      options: [
        "Login, Password, Database",
        "Instruction/Task, Context/Background, and Desired Output Format",
        "HTML, CSS, JavaScript",
        "Header, Footer, Sidebar"
      ],
      correctAnswer: 1,
      explanation: "Every effective prompt specifies what task to perform, the surrounding context, and how the output should be structured."
    },
    {
      id: "q1_5",
      question: "Why should you frame constraints positively (e.g., 'Focus exclusively on Y') rather than relying heavily on negative negations ('Don't do X')?",
      options: [
        "AI models cannot read words with less than 4 letters",
        "Telling an AI what NOT to focus on can accidentally prime its attention on that exact topic",
        "Negative words cost double the subscription price",
        "Negative constraints cause the browser to crash"
      ],
      correctAnswer: 1,
      explanation: "Priming effects mean mentioning a concept—even with 'don't'—activates statistical associations around that concept. Positive instructions are clearer."
    },
    {
      id: "q1_6",
      question: "An AI returns a response that is 800 words long, but you needed a quick 50-word summary for a mobile notification. What pillar was missing from your prompt?",
      options: [
        "Instruction",
        "Desired Output Constraint (length & format)",
        "API Key",
        "Language Model Name"
      ],
      correctAnswer: 1,
      explanation: "Explicitly stating length constraints (e.g. 'under 50 words') directs the model to truncate and synthesize accordingly."
    },
    {
      id: "q1_7",
      question: "True or False: Generative AI models remember all your previous personal chats automatically across different websites unless you turn off your Wi-Fi.",
      options: [
        "True",
        "False"
      ],
      correctAnswer: 1,
      explanation: "AI models do not possess global long-term memory across sessions unless explicit state context is passed into the prompt input payload."
    },
    {
      id: "q1_8",
      question: "Which prompt is better for generating a study plan?",
      options: [
        "Help me pass my exam.",
        "Create a 7-day study schedule for a college student preparing for a Biology 101 final. Include 2-hour daily study blocks, topic breakdowns, and review quizzes."
      ],
      correctAnswer: 1,
      explanation: "The second prompt provides timeframe, target audience, topic scope, daily duration, and specific deliverables."
    },
    {
      id: "q1_9",
      question: "What is an AI 'hallucination'?",
      options: [
        "When the AI monitor screen flickers",
        "When an AI model generates plausible-sounding but factually incorrect or fabricated information",
        "When an AI generates code in dark mode",
        "When an AI completes a prompt in under 1 second"
      ],
      correctAnswer: 1,
      explanation: "Hallucination occurs when the model completes token prediction with false statements that sound confident and authoritative."
    },
    {
      id: "q1_10",
      question: "How does providing relevant context reduce AI hallucinations?",
      options: [
        "It increases the GPU memory speed",
        "It grounds the model's prediction window within verified facts and boundaries specified in the prompt",
        "It deletes all old files on your computer",
        "It bypasses the model's safety filters"
      ],
      correctAnswer: 1,
      explanation: "Grounding the model with reference text or explicit context constrains its token search space to the provided facts."
    },
    {
      id: "q1_11",
      question: "What is the primary role of tokens in GenAI?",
      options: [
        "Digital cryptocurrency coins used to buy AI artwork",
        "Chunks of text (words or characters) that LLMs process as numerical inputs and outputs",
        "Hardware chips inside graphics cards",
        "Browser cookies saved during login"
      ],
      correctAnswer: 1,
      explanation: "Tokens are the basic building blocks of text processing in LLMs. On average, 100 tokens roughly equal 75 English words."
    },
    {
      id: "q1_12",
      question: "What is the first step when improving a weak prompt?",
      options: [
        "Re-install your operating system",
        "Identify missing context, unstated constraints, and unclear desired outputs, then structure them clearly",
        "Type in ALL CAPS to make the AI listen",
        "Delete the entire prompt and switch to a different AI model"
      ],
      correctAnswer: 1,
      explanation: "Analyzing what key information the model was missing allows you to systematically refine the prompt structure."
    }
  ],
  2: [
    {
      id: "q2_1",
      question: "In the RCTCO Framework for structured prompting, what does the 'R' stand for?",
      options: [
        "Random",
        "Role (Assigning an expert persona or identity)",
        "Regex",
        "Recursion"
      ],
      correctAnswer: 1,
      explanation: "Role assigns a domain persona (e.g. 'Senior Technical Recruiter' or 'React Architect') to prime the model's vocabulary and standards."
    },
    {
      id: "q2_2",
      question: "What are the 5 components of the RCTCO Framework?",
      options: [
        "Role, Context, Task, Constraints, Output Format",
        "Read, Code, Test, Compile, Operate",
        "React, Component, Template, Controller, Option",
        "Request, Content, Type, Cache, Overview"
      ],
      correctAnswer: 0,
      explanation: "RCTCO stands for Role, Context, Task, Constraints, and Output Format—the gold standard modular prompt architecture."
    },
    {
      id: "q2_3",
      question: "You want an AI to write code using Tailwind CSS instead of plain CSS. Where in the RCTCO prompt should this rule be placed?",
      options: [
        "In the username input field",
        "Under [CONSTRAINTS]",
        "In the browser address bar",
        "In a secret hidden comment"
      ],
      correctAnswer: 1,
      explanation: "Technical specifications, library choices, and forbidden patterns belong under the Constraints section of a structured prompt."
    },
    {
      id: "q2_4",
      question: "Which of the following is an example of setting a 'Persona/Role' in a prompt?",
      options: [
        "'Please return the answer in JSON format.'",
        "'You are an experienced Cyber Security Auditor reviewing code for SQL injection vulnerabilities.'",
        "'Do not use passive voice.'",
        "'Here is the sample input file.'"
      ],
      correctAnswer: 1,
      explanation: "Assigning 'Cyber Security Auditor' establishes the role and domain lens through which the AI analyzes the problem."
    },
    {
      id: "q2_5",
      question: "What is the primary benefit of defining an explicit [OUTPUT FORMAT] in a prompt?",
      options: [
        "It makes the prompt text color turn blue",
        "It ensures the response matches expected data structures (e.g. Markdown table, JSON, bullet points) without extra conversational filler",
        "It speeds up internet connection bandwidth",
        "It translates the output into 50 languages automatically"
      ],
      correctAnswer: 1,
      explanation: "Specifying output format eliminates fluff like 'Sure, here is your answer:' and produces copy-paste or parser-ready responses."
    },
    {
      id: "q2_6",
      question: "Look at this prompt: 'You are a senior nutritionist. Client is a 30yo marathon runner. Plan a meal list. No dairy. Return as a Markdown table.' Which part is the CONTEXT?",
      options: [
        "You are a senior nutritionist",
        "Client is a 30yo marathon runner",
        "Plan a meal list",
        "Return as a Markdown table"
      ],
      correctAnswer: 1,
      explanation: "'Client is a 30yo marathon runner' provides the background context surrounding the subject."
    },
    {
      id: "q2_7",
      question: "True or False: Reusable prompt frameworks like RCTCO make prompt outputs predictable, reproducible, and easier to automate.",
      options: [
        "True",
        "False"
      ],
      correctAnswer: 0,
      explanation: "Modular prompt frameworks standardize expectations and allow teams to reuse templates with high reliability."
    },
    {
      id: "q2_8",
      question: "Which constraint is written most effectively?",
      options: [
        "Make it look nice and not bad.",
        "Keep the output strictly under 200 words, use 4 bullet points, and write at a 10th-grade reading level."
      ],
      correctAnswer: 1,
      explanation: "Specific metrics (word counts, bullet counts, grade levels) are verifiable constraints for AI."
    },
    {
      id: "q2_9",
      question: "Why should you separate prompt sections using clear labels or headers like [ROLE] or [TASK]?",
      options: [
        "To satisfy HTML validation rules",
        "Clear section markers help the AI parse distinct instructions without confusing background context with task goals",
        "Headers make the text take up more disk space",
        "AI models require all text to be formatted in LaTeX"
      ],
      correctAnswer: 1,
      explanation: "Explicit delimiters and section headers prevent instruction blurring and improve adherence."
    },
    {
      id: "q2_10",
      question: "What happens if a prompt contains conflicting instructions (e.g. 'Write a 1000-word essay' AND 'Keep it under 100 words')?",
      options: [
        "The computer shuts down immediately",
        "The AI model experiences instruction confusion and will arbitrarily pick one rule or produce unpredictable length",
        "The model automatically contacts human support",
        "The prompt is converted into an MP3 file"
      ],
      correctAnswer: 1,
      explanation: "Conflicting rules degrade adherence because statistical weights fight against each other during token selection."
    },
    {
      id: "q2_11",
      question: "In prompt engineering, what does 'Audience' specification accomplish?",
      options: [
        "It invites other web users into your chat room",
        "It tells the AI the background knowledge level of the reader so it adjusts vocabulary and technical depth accordingly",
        "It broadcasts your prompt on social media",
        "It sets the font size of the web page"
      ],
      correctAnswer: 1,
      explanation: "Specifying audience (e.g. '5-year-old', 'Senior DevOps Engineer') tunes the model's vocabulary and complexity."
    },
    {
      id: "q2_12",
      question: "Which element of RCTCO transforms a generic response into a tailored expert response?",
      options: [
        "The combination of explicit Role persona and surrounding Context",
        "Using double quotes around every word",
        "Adding smiley emojis at the end",
        "Writing the prompt in all lowercase letters"
      ],
      correctAnswer: 0,
      explanation: "Combining expert role priming with rich background context yields targeted, highly authoritative responses."
    }
  ],
  3: [
    {
      id: "q3_1",
      question: "What is 'Few-Shot Prompting'?",
      options: [
        "Taking multiple photos with a camera before prompting",
        "Providing 2 to 5 representative input-output examples in your prompt to demonstrate the exact pattern to follow",
        "Sending a prompt 10 times in rapid succession",
        "Prompting without giving any instructions at all"
      ],
      correctAnswer: 1,
      explanation: "Few-shot prompting relies on in-context learning by showing the model concrete examples of desired input -> output mappings."
    },
    {
      id: "q3_2",
      question: "How does Few-Shot prompting differ from Zero-Shot prompting?",
      options: [
        "Zero-shot provides zero examples; Few-shot provides exemplary input-output pairs",
        "Zero-shot uses Python while Few-shot uses JavaScript",
        "Zero-shot only works in dark mode",
        "Few-shot costs 100x more tokens per word"
      ],
      correctAnswer: 0,
      explanation: "Zero-shot gives instructions without examples. Few-shot includes concrete target examples to guide formatting and classification."
    },
    {
      id: "q3_3",
      question: "When asking an AI model to solve a complex math or logic problem, why is step-by-step task decomposition effective?",
      options: [
        "It forces the model to allocate prediction tokens to intermediate calculation steps before outputting the final answer",
        "It turns off the model's safety guardrails",
        "It changes the model's server location",
        "It automatically compiles the code into WebAssembly"
      ],
      correctAnswer: 0,
      explanation: "Generating intermediate reasoning steps grounds subsequent token predictions, preventing shortcut errors."
    },
    {
      id: "q3_4",
      question: "To get structured JSON from an AI model reliably, what technique should you employ?",
      options: [
        "Ask nicely in prose",
        "Provide an explicit JSON schema template, instruct the model to return ONLY valid JSON, and include a few-shot JSON example",
        "Send an image of a spreadsheet",
        "Write the prompt in pure HTML tags"
      ],
      correctAnswer: 1,
      explanation: "Providing explicit JSON structure templates and negative constraints against markdown prose ensures valid JSON responses."
    },
    {
      id: "q3_5",
      question: "What is 'Self-Critique' prompting?",
      options: [
        "Posting your prompt online for Reddit users to critique",
        "Instructing the AI model to review its own generated response against a set of constraints and produce an improved draft",
        "Apologizing to the AI for typing errors",
        "Deleting your account after a failed response"
      ],
      correctAnswer: 1,
      explanation: "Self-critique leverages multi-turn prompts where the model evaluates its previous attempt and corrects oversights."
    },
    {
      id: "q3_6",
      question: "Look at this classification task: You want an AI to categorize support tickets into ['Billing', 'Bug', 'Feature']. What shot technique is best if ticket language contains slang?",
      options: [
        "Zero-Shot without context",
        "Few-Shot prompting with 3-4 examples showing tickets containing slang mapped to their correct category",
        "Asking the AI what its favorite color is",
        "Sending an empty prompt"
      ],
      correctAnswer: 1,
      explanation: "Few-shot examples with domain slang explicitly teach the model how informal terms map to categories."
    },
    {
      id: "q3_7",
      question: "True or False: Rather than requesting hidden internal thought chains, professional prompt engineers instruct models to output clear summary explanations, verification checks, or assumption lists.",
      options: [
        "True",
        "False"
      ],
      correctAnswer: 0,
      explanation: "Requesting structured reasoning summaries, assumptions, and validation checks delivers clear auditability and transparency."
    },
    {
      id: "q3_8",
      question: "What is 'Role Prompting'?",
      options: [
        "Playing a video game while prompting",
        "Assigning a specific persona, professional background, or perspective to guide the model's response tone and depth",
        "Changing the user's display name in browser settings",
        "Using AI to write movie scripts only"
      ],
      correctAnswer: 1,
      explanation: "Role prompting primes the neural network to activate relevant domain knowledge and stylistic traits."
    },
    {
      id: "q3_9",
      question: "Which of the following JSON prompting constraints is most robust?",
      options: [
        "Return some JSON if you feel like it.",
        "Return strictly valid JSON matching the schema: {\"status\": string, \"data\": array}. Do NOT include markdown codeblocks or conversational text."
      ],
      correctAnswer: 1,
      explanation: "Strict schema declarations combined with negative constraints against markdown wrappers prevent JSON parsing errors."
    },
    {
      id: "q3_10",
      question: "What is 'Iterative Prompt Refinement'?",
      options: [
        "The process of testing a prompt, analyzing output shortcomings, updating constraints/examples, and testing again until target accuracy is achieved",
        "Formatting your text with italics",
        "Running the exact same failed prompt 50 times without changing anything",
        "Upgrading your monitor resolution"
      ],
      correctAnswer: 0,
      explanation: "Prompt engineering is an empirical science: test -> evaluate failures -> refine instructions/examples -> re-verify."
    },
    {
      id: "q3_11",
      question: "When generating Markdown Tables via prompts, what instruction helps prevent broken table columns?",
      options: [
        "Use 100 columns for every table",
        "Specify exact column headers, require consistent pipe delimiters (|), and mandate concise cell text",
        "Do not use pipe characters",
        "Upload a photo of a wooden table"
      ],
      correctAnswer: 1,
      explanation: "Explicit column header definitions and formatting rules ensure valid Markdown table parsing."
    },
    {
      id: "q3_12",
      question: "What is an 'Extraction Prompt'?",
      options: [
        "A prompt that extracts zip files on your hard drive",
        "A prompt designed to pull specific target fields (e.g. names, dates, prices) out of unstructured text into structured fields",
        "A prompt used to uninstall software",
        "A prompt that deletes text from a database"
      ],
      correctAnswer: 1,
      explanation: "Extraction prompts parse unstructured narrative text into clean key-value pairs or structured fields."
    },
    {
      id: "q3_13",
      question: "Why is Few-Shot prompting preferred when creating custom brand-voice marketing copy?",
      options: [
        "It uses less battery power on mobile devices",
        "Concrete brand examples demonstrate subtle tone nuances, vocabulary choices, and formatting better than rules alone",
        "Few-shot automatically publishes posts to social media",
        "AI models dislike brand guidelines written in prose"
      ],
      correctAnswer: 1,
      explanation: "Examples implicitly communicate stylistic nuances that are difficult to articulate in pure text guidelines."
    },
    {
      id: "q3_14",
      question: "What does 'asking AI to verify output' mean in a multi-step prompt workflow?",
      options: [
        "Sending an email to customer support to verify the AI",
        "Instructing the model in a follow-up step to double-check its output against constraints or math calculations before finalizing",
        "Running a antivirus scan on the response",
        "Printing the output on paper"
      ],
      correctAnswer: 1,
      explanation: "Verification prompts ask the model to act as a validator against its own initial output."
    }
  ],
  4: [
    {
      id: "q4_1",
      question: "A user wants AI to analyze 500 customer reviews and return sentiment + category in valid JSON for a dashboard. Which prompt structure is most appropriate?",
      options: [
        "'Read these reviews and tell me what people think.'",
        "RCTCO framework with a Few-Shot example of a review mapped to exact JSON keys: {\"sentiment\": \"Positive\"|\"Negative\", \"category\": string}, restricting output strictly to valid JSON.",
        "'Write a poem about customer reviews.'",
        "'Send me an email whenever someone is angry.'"
      ],
      correctAnswer: 1,
      explanation: "For batch automated data processing, combining RCTCO structure, Few-Shot JSON mapping, and strict JSON output rules is required."
    },
    {
      id: "q4_2",
      question: "When writing a debugging prompt for a React runtime crash, what essential details should you include?",
      options: [
        "The error stack trace, expected vs actual behavior, environment specs (React version), and the relevant code snippet",
        "Only the word 'Help'",
        "A screenshot of your desktop wallpaper",
        "Your computer's serial number"
      ],
      correctAnswer: 0,
      explanation: "Complete context (stack trace + code + expected behavior) allows the model to pinpoint the exact root cause without guessing."
    },
    {
      id: "q4_3",
      question: "You need AI to draft an outbound sales email. Which prompt constraint prevents the email from sounding spammy or generic?",
      options: [
        "Tell the AI to use 50 exclamation marks",
        "Specify: 'Under 120 words, personalized to prospect's pain point, friendly professional tone, no hype words (like revolutionary, game-changer), single call-to-action.'",
        "Use all uppercase letters for subject line",
        "Do not include a recipient name"
      ],
      correctAnswer: 1,
      explanation: "Banning corporate hype words and enforcing concise length rules prevents generic spammy AI copy."
    },
    {
      id: "q4_4",
      question: "In automated quiz generation prompts for education, what structure guarantees questions remain balanced?",
      options: [
        "Ask for 100 true/false questions only",
        "Specify topic coverage, target difficulty level, question types (multiple choice), 4 distractor options, correct answer index, and explanation notes for each",
        "Ask the AI to generate random text",
        "Do not provide the source textbook chapter"
      ],
      correctAnswer: 1,
      explanation: "Specifying question types, distractors, answer keys, and explanations yields complete, ready-to-use educational assessments."
    },
    {
      id: "q4_5",
      question: "You are refactoring a legacy JavaScript function to modern ES6 syntax. Which instruction should you include under [CONSTRAINTS]?",
      options: [
        "Preserve existing API function signature and parameter order, do not add external third-party libraries, maintain current unit test compatibility.",
        "Change all variable names to random letters",
        "Rewrite the function in Python",
        "Delete all comments and error handling"
      ],
      correctAnswer: 0,
      explanation: "Refactoring requires maintaining backward compatibility and existing signatures while modernizing implementation logic."
    },
    {
      id: "q4_6",
      question: "What is a 'Classification Prompt' commonly used for in business applications?",
      options: [
        "Categorizing incoming emails or support tickets into predefined urgency buckets (High, Medium, Low)",
        "Sorting files alphabetically on your hard drive",
        "Classifying employees by height",
        "Translating text into Morse code"
      ],
      correctAnswer: 0,
      explanation: "Classification prompts categorize incoming textual data into fixed taxonomy buckets for automated routing."
    },
    {
      id: "q4_7",
      question: "True or False: In research summarization prompts, instructing the AI model to 'state when information is contradictory or missing across sources' helps prevent false synthesis.",
      options: [
        "True",
        "False"
      ],
      correctAnswer: 0,
      explanation: "Explicitly requesting contradiction highlighting prevents the AI from smoothing over genuine factual discrepancies."
    },
    {
      id: "q4_8",
      question: "Which prompt is best for code documentation generation?",
      options: [
        "Document this code.",
        "You are a Technical Writer. Generate JSDoc comments for the following React component. Include @param descriptions, @returns type, component purpose, and 1 usage example."
      ],
      correctAnswer: 1,
      explanation: "The second option specifies the doc format (JSDoc), required tags (@param, @returns), purpose, and example."
    },
    {
      id: "q4_9",
      question: "When using AI to generate social media post options for a new app launch, what prompt parameter ensures platform suitability?",
      options: [
        "Specifying the target social network (e.g. LinkedIn vs Twitter/X), character count limits, hashtag limits, and call-to-action link placement",
        "Asking for a 50-page PDF report",
        "Telling the AI to write in C++",
        "Using 500 emojis in every sentence"
      ],
      correctAnswer: 0,
      explanation: "Each social platform has distinct character limits, formatting norms, and audience tone expectations."
    },
    {
      id: "q4_10",
      question: "A company wants to convert 1,000 messy PDF meeting notes into action item tables. What prompting technique should be used?",
      options: [
        "Data Extraction prompt with explicit table format schema (Owner, Action Item, Deadline, Priority)",
        "Asking the AI to write a story about meetings",
        "Zero-shot prompt with no instructions",
        "Translating notes into French"
      ],
      correctAnswer: 0,
      explanation: "Data extraction with structured column schemas standardizes messy prose into actionable project tracking tables."
    },
    {
      id: "q4_11",
      question: "What role should you assign an AI when conducting a mock job interview exercise?",
      options: [
        "You are a Senior Hiring Manager conducting a behavioral interview. Ask 1 question at a time, evaluate my response, and give feedback before proceeding.",
        "You are a spectator watching television.",
        "You are a database administrator writing SQL queries.",
        "You are a comedian telling jokes."
      ],
      correctAnswer: 0,
      explanation: "Iterative role prompting ('ask 1 question at a time, evaluate response') creates a realistic interactive coaching session."
    },
    {
      id: "q4_12",
      question: "Why is giving explicit input data delimiters (like ```code``` or <context>...</context>) critical in real-world data processing prompts?",
      options: [
        "It prevents the model from mistaking user data content for system instructions",
        "It makes the prompt text bold",
        "It speeds up internet downloading",
        "It deletes duplicate files automatically"
      ],
      correctAnswer: 0,
      explanation: "Delimiters visually and syntactically isolate data payloads from instruction rules."
    },
    {
      id: "q4_13",
      question: "Which category of real-world prompt engineering relies heavily on JSON schema enforcement for automated REST APIs?",
      options: [
        "Data Extraction & Backend Integration",
        "Poetry Generation",
        "Casual Chit-Chat",
        "Desktop Wallpaper Design"
      ],
      correctAnswer: 0,
      explanation: "Backend API integration requires strict JSON contracts so downstream microservices can parse outputs without syntax crashes."
    },
    {
      id: "q4_14",
      question: "What is the best way to prompt AI for unit test generation in React?",
      options: [
        "Write tests.",
        "You are a QA Engineer using Vitest and React Testing Library. Write unit tests for the provided UserCard component covering render state, click handlers, and empty props edge case."
      ],
      correctAnswer: 1,
      explanation: "Specifying testing framework (Vitest/RTL), component, and specific test cases (render, clicks, edge cases) produces high coverage."
    },
    {
      id: "q4_15",
      question: "In business analytics, what does 'Summarization Prompting' aim to achieve?",
      options: [
        "Distilling lengthy reports or data logs into key insights, risks, metrics, and actionable executive decisions",
        "Adding 500 pages of extra text to a document",
        "Translating text into binary code",
        "Generating random stock market predictions"
      ],
      correctAnswer: 0,
      explanation: "Summarization distills complex high-volume text into actionable business intelligence."
    }
  ],
  5: [
    {
      id: "q5_1",
      question: "What is 'Prompt Injection' in AI security?",
      options: [
        "Injecting physical medicine into an AI server hardware rack",
        "A security vulnerability where untrusted user input tricks the AI model into ignoring its system prompt safety rules",
        "Installing a browser extension to speed up AI chats",
        "Writing a prompt in two different languages"
      ],
      correctAnswer: 1,
      explanation: "Prompt injection occurs when adversarial user input overrides pre-programmed system instructions and safety constraints."
    },
    {
      id: "q5_2",
      question: "Which design pattern helps defend an application against Direct Prompt Injection?",
      options: [
        "Wrapping untrusted user input inside explicit XML tags (e.g. <user_input>) and instructing the system prompt to treat tags strictly as inert data",
        "Using a larger font size for the prompt",
        "Removing all punctuation from the prompt",
        "Disabling dark mode in the web app"
      ],
      correctAnswer: 0,
      explanation: "Isolating untrusted text within syntactic XML delimiters combined with defensive system directives prevents instruction hijacking."
    },
    {
      id: "q5_3",
      question: "What is an 'AI Agent' workflow?",
      options: [
        "A human support worker who answers emails manually",
        "An autonomous multi-step loop where an LLM uses tools (web search, code execution, database lookup) to plan, execute, and accomplish a goal",
        "A computer virus that steals passwords",
        "A static HTML web page"
      ],
      correctAnswer: 1,
      explanation: "AI Agents combine reasoning models with external tool execution in iterative Plan -> Act -> Observe loops."
    },
    {
      id: "q5_4",
      question: "What is 'Prompt Evaluation' (Eval) in enterprise prompt engineering?",
      options: [
        "Grading prompts manually on a piece of paper once a year",
        "Systematically testing prompt candidates against a benchmark dataset of diverse test inputs to measure accuracy, format compliance, and edge case safety",
        "Calculating the cost of electricity used by the computer",
        "Checking if the prompt has correct spelling only"
      ],
      correctAnswer: 1,
      explanation: "Prompt Evals test prompt reliability across large benchmark datasets to prevent regressions before shipping to production."
    },
    {
      id: "q5_5",
      question: "How do you handle ambiguous user requests in a production prompt template?",
      options: [
        "Guess randomly and output a generic answer",
        "Instruct the model to identify missing required parameters, state its assumptions clearly, or ask clarifying questions before generating",
        "Throw an unhandled JavaScript exception crash",
        "Close the web browser"
      ],
      correctAnswer: 1,
      explanation: "Explicit instructions on handling ambiguity ensure the model either asks for clarification or explicitly lists its assumptions."
    },
    {
      id: "q5_6",
      question: "What is 'Indirect Prompt Injection'?",
      options: [
        "When malicious prompt instructions are hidden inside external data sources (like a web page or PDF) ingested by the AI model during processing",
        "When a user types a prompt backward",
        "When an AI model responds in Spanish instead of English",
        "When your Wi-Fi router restarts during a prompt"
      ],
      correctAnswer: 0,
      explanation: "Indirect injection attacks occur when external data ingested by the model contains hidden instructions designed to hijack control flow."
    },
    {
      id: "q5_7",
      question: "True or False: Prompt Versioning (e.g. v1.0, v1.1) is essential in production software to track performance changes and rollback failing prompts.",
      options: [
        "True",
        "False"
      ],
      correctAnswer: 0,
      explanation: "Prompts are code. Version control enables regression tracking, A/B testing, and audit safety in enterprise production systems."
    },
    {
      id: "q5_8",
      question: "What is the role of System Prompts versus User Prompts in application architecture?",
      options: [
        "System Prompts define core identity, safety rules, and boundaries set by developers; User Prompts provide transient inputs from end users",
        "System Prompts are for Windows; User Prompts are for Mac",
        "System Prompts cost money; User Prompts are always free",
        "There is no difference between System and User Prompts"
      ],
      correctAnswer: 0,
      explanation: "System prompts set structural guardrails and developer expectations, whereas user prompts contain dynamic request inputs."
    },
    {
      id: "q5_9",
      question: "Which technique reduces hallucinations when asking AI to synthesize technical documentation?",
      options: [
        "Grounding the model with Retrieval-Augmented Context and instructing: 'Rely ONLY on facts stated in the provided text; if unmentioned, state Unknown.'",
        "Telling the AI to guess creative stories",
        "Removing all technical terms from the prompt",
        "Increasing temperature parameter to 2.0"
      ],
      correctAnswer: 0,
      explanation: "Strict grounding combined with explicit 'fallback to Unknown' rules stops models from inventing unsupported facts."
    },
    {
      id: "q5_10",
      question: "What is a 'Reusable Prompt Template' system?",
      options: [
        "A parameterized prompt structure with variable placeholders (e.g. {ROLE}, {TASK}, {INPUT}) that can be populated dynamically by code",
        "Copy pasting the same text into Microsoft Word",
        "A browser extension that deletes your browser history",
        "A hardware keyboard shortcut"
      ],
      correctAnswer: 0,
      explanation: "Prompt templates allow developers to programmatically inject dynamic data variables into battle-tested prompt structures."
    },
    {
      id: "q5_11",
      question: "What is Responsible AI Usage in prompt engineering?",
      options: [
        "Adhering to ethical guidelines regarding fairness, bias mitigation, privacy protection, and transparent AI disclosure",
        "Only using AI between 9am and 5pm",
        "Paying for AI subscriptions on time",
        "Using AI exclusively for video games"
      ],
      correctAnswer: 0,
      explanation: "Responsible AI ensures prompt designs respect user privacy, prevent harmful bias, and promote safe technology deployment."
    },
    {
      id: "q5_12",
      question: "In multi-step agent architectures, what does 'Output Validation' do?",
      options: [
        "It verifies generated outputs against schemas or safety filters before passing results to external tools or end users",
        "It prints out a physical paper receipt",
        "It sends a text message to your phone",
        "It reboots the application server"
      ],
      correctAnswer: 0,
      explanation: "Output validation serves as a gatekeeper ensuring generated payloads meet safety and structural contracts."
    },
    {
      id: "q5_13",
      question: "Why should production prompt engineers maintain a structured Prompt Library?",
      options: [
        "To standardize verified prompt patterns, reduce redundant engineering effort, and share best practices across engineering teams",
        "To fill up cloud storage space",
        "To hide prompts from software developers",
        "Because books look nice on a shelf"
      ],
      correctAnswer: 0,
      explanation: "Prompt libraries institutionalize best practices, speed up feature delivery, and maintain consistent output quality."
    },
    {
      id: "q5_14",
      question: "What is 'Adversarial Prompt Testing'?",
      options: [
        "Deliberately feeding tricky, jailbreak, injection, or edge-case inputs to a prompt candidate to test its security resilience",
        "Arguing with AI models online",
        "Testing code without an internet connection",
        "Deleting failing unit tests"
      ],
      correctAnswer: 0,
      explanation: "Adversarial testing stress-tests prompts against potential exploits before deploying to real users."
    },
    {
      id: "q5_15",
      question: "You have completed all 5 chapters of Prompt Master! What is your final status upon achieving 75%+ on all chapter assessments?",
      options: [
        "Prompt Master Certified Engineer with unlocked downloadable Certificate and high leaderboard ranking!",
        "Beginner level user with no progress saved",
        "Account locked permanently",
        "Guest Explorer"
      ],
      correctAnswer: 0,
      explanation: "Passing all 5 chapters demonstrates comprehensive prompt engineering mastery, unlocking official platform certification!"
    }
  ]
};

export const QUESTIONS_DATA = Object.fromEntries(
  Object.entries(BASE_QUESTIONS_DATA).map(([chapterId, baseQuestions]) => {
    const questions = [...baseQuestions, ...(ADVANCED_QUESTION_DATA[chapterId] || [])];
    return [
      chapterId,
      questions.map((question, index) => improveDistractors({
          ...question,
          id: question.id || `q${chapterId}_${index + 1}`,
          difficulty: index >= Math.floor(questions.length * 0.7) ? 'Hard' : index >= Math.floor(questions.length * 0.4) ? 'Challenging' : 'Medium'
        }))
    ];
  })
);
