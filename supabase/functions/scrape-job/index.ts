// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { Anthropic } from 'npm:@anthropic-ai/sdk@^0.29.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();

    if (!url) {
      return new Response(
        JSON.stringify({ error: 'URL is required' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Validate URL
    try {
      new URL(url);
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid URL' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Fetch the job posting page
    const pageResponse = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    if (!pageResponse.ok) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch job posting' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const htmlContent = await pageResponse.text();

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: Deno.env.get('CLAUDE_API_KEY') || '',
    });

    // Use Claude to analyze the job posting
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

5. Skills & Technologies:
   - Programming languages
   - Frameworks and libraries
   - Tools and platforms
   - Methodologies (Agile, etc.)

6. Keywords:
   - Extract all important technical terms
   - Include industry-specific terminology

7. Experience Level:
   - Determine: Entry-level, Mid-level, Senior, Lead, or Executive

OUTPUT:
Return ONLY a valid JSON object with this structure:
{
  "title": "string",
  "company": "string",
  "location": "string",
  "description": "string",
  "requirements": {
    "required": ["string"],
    "preferred": ["string"]
  },
  "responsibilities": ["string"],
  "skills": ["string"],
  "keywords": ["string"],
  "experienceLevel": "string",
  "url": "string"
}

If certain fields cannot be found, return empty arrays/strings. Do not include any explanatory text outside the JSON.`;

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: `Analyze this job posting HTML and extract structured information:\n\n${htmlContent.slice(0, 50000)}`,
        },
      ],
    });

    const text =
      response.content[0].type === 'text' ? response.content[0].text : '';

    // Extract JSON from potential markdown code blocks
    const jsonMatch =
      text.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/) ||
      text.match(/(\{[\s\S]*\})/);
    const jsonStr = jsonMatch ? jsonMatch[1] : text;

    const jobPosting = JSON.parse(jsonStr);
    jobPosting.url = url; // Ensure URL is included

    return new Response(JSON.stringify(jobPosting), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
})
