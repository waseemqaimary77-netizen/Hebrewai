import express from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy register the Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY_MISSING");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// API endpoint to generate custom AI mnemonic story + custom SVG graphic
app.post("/api/gemini/story", async (req, res) => {
  const { wordId, hebrew, arabic, pronunciation, customPrompt } = req.body;

  if (!hebrew || !arabic) {
    res.status(400).json({ status: "error", message: "Missing Hebrew or Arabic words" });
    return;
  }

  try {
    const ai = getGeminiClient();

    const systemInstruction = `أنت مبرمج مبدع ومصمم رسومات ومدرس لغة عبرية متميز للناطقين بالعربية.
مهمتك هي مساعدة الطلاب العرب في حفظ الكلمة العبرية المذكورة عن طريق:
1. قصة فكاهية قصيرة جداً ومضحكة (يربط لفظ الكلمة العبرية باللغة العربية - mnemonic).
2. تصميم رمز أو رسمة كاريكاتورية مبسطة وجميلة جداً بترميز SVG تمثل هذه القصة بشكل فكاهي وعصري (Flat Design 2D Cartoon Style).

شروط توليد الـ SVG:
- يجب أن يبدأ بـ <svg viewBox="0 0 400 300" ...> وينتهي بـ </svg>.
- يجب أن يكون مستقلاً وصالحاً 100% (يمكن حقنه داخل div بالمتصفح).
- استخدم خلفية ملونة ناعمة ومحاطة بحواف دائرية مثل: <rect width="100%" height="100%" fill="#F1F5F9" rx="16"/> في بداية الرسمة.
- ارسم ملامح كرتونية فكاهية لافتة (سيارة بعيون ضاحكة، بنطال يجري، إلخ) لجعل الصورة لا تُنسى.
- استخدم عناصر SVG الأساسية مثل rect, circle, ellipse, path, text بشكل منسق وجذاب.
- تجنب تماماً استخدام وسوم script أو html أو markdown أو كتل برمجية متداخلة داخل كود SVG.`;

    const promptText = `الكلمة العبرية: "${hebrew}" (تُنطق كـ "${pronunciation}") وميناها بالعربية هو: "${arabic}".
${customPrompt ? `طلب إضافي من المستخدم للقصة: ${customPrompt}` : ""}

أنتج مخرجات بتنسيق JSON حصرياً بالهيكل التالي:
{
  "story": "اكتب القصة الفكاهية المبدعة باللغة العربية الفصحى أو العامية اللطيفة والمحببة هنا بأسلوب تذكري قوي يسهل الحفظ السريع.",
  "visualConceptDescription": "وصف المشهد الكارتوني المرسوم باللغة العربية بمثابة موجه للرسم التوضيحي.",
  "svg": "<svg viewBox=\\"0 0 400 300\\" xmlns=\\"http://www.w3.org/2000/svg\\">... كود الـ SVG النظيف بالكامل ...</svg>"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptText,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            story: {
              type: Type.STRING,
              description: "The creative Arabic story linking the pronunciation of the Hebrew word to its Arabic translation."
            },
            visualConceptDescription: {
              type: Type.STRING,
              description: "A description of the flat design graphic illustration created for this word."
            },
            svg: {
              type: Type.STRING,
              description: "A complete clean valid SVG drawing illustrating the funny story."
            }
          },
          required: ["story", "visualConceptDescription", "svg"]
        }
      }
    });

    const text = response.text || "";
    try {
      const parsedData = JSON.parse(text);
      res.json({ status: "success", data: parsedData });
    } catch (parseError) {
      console.error("JSON parsing failed, returning raw text", text, parseError);
      res.json({ status: "success", raw: text });
    }

  } catch (error: any) {
    console.error("Gemini Story Generation failed:", error);
    if (error.message === "GEMINI_API_KEY_MISSING") {
      res.status(404).json({
        status: "fallback",
        message: "Gemini API Key is not configured in Secrets panel. Using built-in offline mnemonics.",
      });
    } else {
      res.status(500).json({
        status: "error",
        message: "Failed to connect to AI server. Showing built-in memory patterns.",
        details: error.toString()
      });
    }
  }
});


// Handle Vite asset serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express server with Vite is running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
