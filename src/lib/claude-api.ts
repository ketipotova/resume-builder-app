import Anthropic from '@anthropic-ai/sdk';
import type { Resume, JobPosting, TailoringResult } from '../types/resume';

const CLAUDE_MODEL = 'claude-sonnet-4-20250514';

// Initialize Anthropic client
const getAnthropicClient = () => {
  const apiKey = import.meta.env.VITE_CLAUDE_API_KEY;
  if (!apiKey) {
    throw new Error('VITE_CLAUDE_API_KEY is not set');
  }
  return new Anthropic({
    apiKey,
    dangerouslyAllowBrowser: true, // Note: In production, use a backend proxy
  });
};

/**
 * Chat interface for resume building
 */
export async function chatResumeBuilder(
  userMessage: string,
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>
): Promise<string> {
  const anthropic = getAnthropicClient();

  const systemPrompt = `You are an expert resume consultant helping users create professional resumes through conversation.

GUIDELINES:
- Ask questions one section at a time
- Be encouraging and professional
- Extract specific details (dates, metrics, achievements)
- Suggest improvements to weak descriptions
- Keep responses concise and focused
- After each section, confirm understanding before moving on

PROCESS:
1. Start with: "I'll help you create a professional resume. Let's begin with your basic information. What's your full name, email, phone number, and current location?"

2. Personal info collected → "Great! Now tell me about your current or most recent job. Include: company name, your title, dates worked, and key responsibilities."

3. For each experience → Ask for specific achievements: "What were your main accomplishments in this role? Try to include numbers or metrics if possible (e.g., 'increased sales by 30%')."

4. After work history → "Excellent. What's your educational background? Include degrees, institutions, and graduation dates."

5. Then skills → "What are your main technical and professional skills? Think about software, tools, languages, or specialized knowledge."

6. Optional sections → "Would you like to add: Projects, Certifications, Volunteer work, or Awards?"

7. Final → Summarize all collected info as structured JSON matching the Resume schema

EXTRACTION RULES:
- Dates: Convert to "YYYY-MM" format or "Present"
- Achievements: Transform narratives into bullet points with action verbs
- Skills: Categorize into technical/soft/languages
- Numbers: Always preserve metrics and percentages
- Be specific: Extract company names, job titles, exact degree names

OUTPUT FORMAT:
After complete information is gathered, output ONLY valid JSON matching the Resume schema. No additional text.`;

  const messages = conversationHistory.map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));

  messages.push({
    role: 'user',
    content: userMessage,
  });

  const response = await anthropic.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: 4096,
    system: systemPrompt,
    messages,
  });

  return response.content[0].type === 'text' ? response.content[0].text : '';
}

/**
 * Stream chat responses for better UX
 */
export async function streamChatResumeBuilder(
  userMessage: string,
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>,
  onChunk: (chunk: string) => void
): Promise<void> {
  const anthropic = getAnthropicClient();

  const systemPrompt = `You are an expert resume consultant helping users create professional resumes through conversation.

Ask questions one section at a time, be encouraging, and extract specific details. Keep responses concise.

After collecting all information, output ONLY valid JSON matching the Resume schema.`;

  const messages = conversationHistory.map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));

  messages.push({
    role: 'user',
    content: userMessage,
  });

  const stream = await anthropic.messages.stream({
    model: CLAUDE_MODEL,
    max_tokens: 4096,
    system: systemPrompt,
    messages,
  });

  for await (const chunk of stream) {
    if (
      chunk.type === 'content_block_delta' &&
      chunk.delta.type === 'text_delta'
    ) {
      onChunk(chunk.delta.text);
    }
  }
}

/**
 * Parse uploaded resume file
 */
export async function parseUploadedResume(resumeText: string): Promise<Resume> {
  const anthropic = getAnthropicClient();

  const systemPrompt = `You are analyzing an uploaded resume document. Extract ALL information into structured JSON format.

INPUT: Resume document content (text extracted from PDF/DOCX)

TASK: Parse and structure the information into the Resume schema JSON format.

RULES:
1. Personal Information:
   - Extract name, email, phone, location from header/contact section
   - Find LinkedIn, GitHub, portfolio links if present

2. Professional Summary:
   - Usually at the top, labeled "Summary", "Profile", "About", or "Objective"
   - If missing, leave empty string

3. Work Experience:
   - Extract each job with: company, position, dates, location, description
   - Parse date ranges (handle formats like "Jan 2020 - Present" or "2020-2023")
   - Break down bullet points into achievements array
   - Preserve action verbs and metrics

4. Education:
   - Parse degree type, field of study, institution, graduation date
   - Extract GPA if mentioned (convert to string)
   - Capture honors/awards

5. Skills:
   - Categorize into technical (hard skills) and soft skills
   - Extract languages with proficiency levels if mentioned
   - Find certifications

6. Additional Sections:
   - Look for Projects, Volunteer Work, Awards, Publications
   - Extract if present

7. Date Handling:
   - Convert all dates to "YYYY-MM" format
   - Use "Present" for current positions
   - Handle various date formats (Jan 2020, 01/2020, January 2020)

OUTPUT:
Return ONLY valid JSON matching the Resume schema. Do not include any explanatory text.

If information is ambiguous or missing, use best judgment or leave fields empty rather than inventing data.`;

  const response = await anthropic.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: 8192,
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: `Parse this resume and return structured JSON:\n\n${resumeText}`,
      },
    ],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';

  // Extract JSON from potential markdown code blocks
  const jsonMatch = text.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/) || text.match(/(\{[\s\S]*\})/);
  const jsonStr = jsonMatch ? jsonMatch[1] : text;

  return JSON.parse(jsonStr);
}

/**
 * General resume enhancement
 */
export async function enhanceResume(resume: Resume): Promise<Resume> {
  const anthropic = getAnthropicClient();

  const systemPrompt = `You are an expert resume optimizer. Enhance this resume to make it more professional, impactful, and effective.

INPUT: Resume JSON object

IMPROVEMENTS TO MAKE:
1. Professional Summary:
   - Rewrite to be compelling, concise (2-3 sentences)
   - Include years of experience, key expertise, and value proposition
   - Use industry-specific keywords

2. Experience Descriptions:
   - Start each bullet with strong action verbs (Led, Developed, Achieved, Implemented)
   - Add metrics and quantifiable results where possible
   - Use STAR method (Situation, Task, Action, Result)
   - Keep bullets to 1-2 lines each
   - Focus on achievements, not just responsibilities

3. Skills Organization:
   - Group similar skills together
   - Prioritize most relevant/strongest skills
   - Remove outdated or basic skills
   - Ensure consistency in naming (e.g., "JavaScript" not "java script")

4. Language Polish:
   - Fix grammar and punctuation
   - Ensure consistent tense (past for previous roles, present for current)
   - Remove personal pronouns (I, me, my)
   - Eliminate filler words

5. Achievement Enhancement:
   - Add impact metrics where missing (estimate if needed: "~20%", "multiple")
   - Emphasize results and business value
   - Make accomplishments specific and concrete

6. ATS Optimization:
   - Include industry-standard keywords
   - Avoid uncommon abbreviations without spelling out
   - Use standard section headers

CONSTRAINTS:
- Keep facts accurate (don't invent experience)
- Maintain chronological accuracy
- Preserve all contact information unchanged
- Don't remove entire sections without content

OUTPUT:
Return enhanced Resume JSON with all improvements applied. Maintain the exact same schema structure.`;

  const response = await anthropic.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: 8192,
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: `Enhance this resume:\n\n${JSON.stringify(resume, null, 2)}`,
      },
    ],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';

  // Extract JSON from potential markdown code blocks
  const jsonMatch = text.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/) || text.match(/(\{[\s\S]*\})/);
  const jsonStr = jsonMatch ? jsonMatch[1] : text;

  return JSON.parse(jsonStr);
}

/**
 * Job-specific resume tailoring
 */
export async function tailorResumeToJob(
  resume: Resume,
  jobPosting: JobPosting
): Promise<TailoringResult> {
  const anthropic = getAnthropicClient();

  const systemPrompt = `You are a professional resume tailoring specialist. Adapt this resume to maximize match with the target job posting.

INPUT:
- Resume JSON object
- Job Posting JSON object (extracted from URL)

TASK: Modify the resume to align with job requirements while maintaining truthfulness.

TAILORING STRATEGY:

1. KEYWORD OPTIMIZATION:
   - Extract key skills and technologies from job description
   - Incorporate matching keywords into resume (where user has that experience)
   - Mirror language used in job posting

2. PROFESSIONAL SUMMARY REWRITE:
   - Align with job title and requirements
   - Emphasize relevant experience that matches position
   - Include 2-3 keywords from job posting naturally

3. EXPERIENCE PRIORITIZATION:
   - Reorder responsibilities/achievements to highlight most relevant ones first
   - Expand details on experiences that match job requirements
   - De-emphasize less relevant experiences (but keep them)

4. SKILLS REORDERING:
   - Move job-required skills to top of skills list
   - Group skills by relevance to position
   - Add skill categories if they match job description

5. ACHIEVEMENT ENHANCEMENT:
   - Emphasize achievements that demonstrate required competencies
   - Add context to make relevance clear
   - Quantify impact using metrics that matter to the role

6. PROJECTS/CERTIFICATIONS:
   - Highlight projects using technologies mentioned in job posting
   - Prioritize certifications relevant to position

CRITICAL RULES:
- NEVER fabricate experience, skills, or achievements
- NEVER change dates, companies, or job titles
- ONLY emphasize and reframe existing information
- If resume lacks a critical skill, don't add it
- Maintain all factual accuracy

OUTPUT FORMAT:
Return a JSON object with:
{
  "resume": <tailored Resume JSON>,
  "explanation": {
    "matchScore": "75%",
    "keyChanges": ["Summary rewritten to emphasize cloud architecture", "Added AWS and Kubernetes to skills", "Prioritized backend development experience"],
    "matchedRequirements": ["5+ years backend experience", "Strong Python skills", "Cloud infrastructure"],
    "missingRequirements": ["Kubernetes certification", "Terraform experience"]
  }
}`;

  const response = await anthropic.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: 8192,
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: `Tailor this resume to this job posting:\n\nRESUME:\n${JSON.stringify(resume, null, 2)}\n\nJOB POSTING:\n${JSON.stringify(jobPosting, null, 2)}`,
      },
    ],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';

  // Extract JSON from potential markdown code blocks
  const jsonMatch = text.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/) || text.match(/(\{[\s\S]*\})/);
  const jsonStr = jsonMatch ? jsonMatch[1] : text;

  return JSON.parse(jsonStr);
}

/**
 * Analyze job posting from text content
 * Note: Job URL scraping should be done via Supabase Edge Function
 */
export async function analyzeJobPosting(jobPageContent: string): Promise<JobPosting> {
  const anthropic = getAnthropicClient();

  const systemPrompt = `You are analyzing a job posting webpage to extract structured information.

INPUT: HTML content of job posting page

TASK: Extract comprehensive job posting details into structured format.

EXTRACTION GUIDELINES:

1. Basic Information:
   - Job title (exact as posted)
   - Company name
   - Location (city, state/country, or "Remote")

2. Job Description:
   - Full description text
   - Main purpose/overview of role

3. Requirements:
   - Split into "Required" and "Preferred/Nice to have"
   - Include education requirements
   - Years of experience needed
   - Must-have technical skills
   - Soft skills mentioned

4. Responsibilities:
   - Extract bullet points of day-to-day duties
   - Key projects or initiatives
   - Team structure/reporting

5. Skills & Technologies:
   - Programming languages
   - Frameworks and libraries
   - Tools and platforms
   - Methodologies (Agile, etc.)
   - Domain knowledge

6. Keywords:
   - Extract all important technical terms
   - Include industry-specific terminology
   - Note repeated phrases (high importance)

7. Experience Level:
   - Determine: Entry-level, Mid-level, Senior, Lead, or Executive
   - Based on years required and responsibility level

PARSING RULES:
- Look for sections like "Requirements", "Qualifications", "About You", "Responsibilities", "What You'll Do"
- Identify required vs preferred (keywords: "must have", "required" vs "nice to have", "bonus", "preferred")
- Extract implicit requirements from description
- Note technologies even if not in formal requirements section

OUTPUT:
Return JobPosting JSON object with all extracted information. If certain fields cannot be found, return empty arrays/strings.`;

  const response = await anthropic.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: 4096,
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: `Analyze this job posting and extract structured information:\n\n${jobPageContent}`,
      },
    ],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';

  // Extract JSON from potential markdown code blocks
  const jsonMatch = text.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/) || text.match(/(\{[\s\S]*\})/);
  const jsonStr = jsonMatch ? jsonMatch[1] : text;

  return JSON.parse(jsonStr);
}
