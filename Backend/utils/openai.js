import "dotenv/config";
import fetch from "node-fetch";
const getOpenAIAPIResponse=async(message)=>{
    
console.log("Loaded API Key:", process.env.GROQ_API_KEY);

const options={
  method:"POST",
  headers:{
    "content-type":"application/json",
     "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
  },

  body: JSON.stringify({
    model:"llama-3.3-70b-versatile",
   messages:[{
  role:"user",
  content:message,
  }]
  })
};

try{
 const response=await fetch("https://api.groq.com/openai/v1/chat/completions",options);
 const data= await response.json();
 //console.log(data.choices[0].message.content);
 if (!response.ok) {
      console.log("Groq API Error:", data);
      throw new Error(data.error?.message || "Groq API failed");
    }

 return data.choices[0].message.content;
} catch (err) {
  console.log("OpenAI Utility Error:", err);
  throw err;   
}
};

export default getOpenAIAPIResponse;