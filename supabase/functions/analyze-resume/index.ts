
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0'
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { resumeId, fileUrl } = await req.json()
    
    if (!resumeId || !fileUrl) {
      return new Response(
        JSON.stringify({ error: 'Resume ID and file URL are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log(`Analyzing resume ${resumeId} at ${fileUrl}`)
    
    // In a production environment, we would use libraries like pdf-parse, docx, and NLP tools 
    // to extract text and analyze the content. For this demo, we'll simulate extraction
    
    // Simulate getting content from the file
    // In a real implementation, we would:
    // 1. Download the file from storage
    // 2. Extract text from PDF/DOCX using libraries
    // 3. Use NLP to identify skills, experience, etc.
    
    // Sample extracted skills and experience
    const extractedSkills = [
      { name: "JavaScript", level: "Expert" },
      { name: "React", level: "Advanced" },
      { name: "TypeScript", level: "Intermediate" },
      { name: "Node.js", level: "Advanced" },
      { name: "Python", level: "Beginner" },
    ]
    
    // Update the resume record to mark as analyzed
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    // Update resume analysis status
    const { error: resumeError } = await supabase
      .from('resumes')
      .update({ 
        analyzed: true,
        analysis_data: {
          skills: extractedSkills,
          experience_years: 5,
          education: "Bachelor's in Computer Science",
          last_updated: new Date().toISOString()
        }
      })
      .eq('id', resumeId)
    
    if (resumeError) {
      throw new Error(`Failed to update resume: ${resumeError.message}`)
    }
    
    // Store extracted skills in the skills table
    for (const skill of extractedSkills) {
      const { error: skillError } = await supabase
        .from('skills')
        .insert({
          resume_id: resumeId,
          skill_name: skill.name,
          skill_level: skill.level
        })
      
      if (skillError) {
        console.error(`Failed to insert skill ${skill.name}: ${skillError.message}`)
      }
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Resume analyzed successfully",
        skills: extractedSkills
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
    
  } catch (error) {
    console.error('Error analyzing resume:', error.message)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
