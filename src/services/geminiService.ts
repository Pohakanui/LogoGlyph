/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, Type } from "@google/genai";
import { GlyphData, SynthesisParams } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateGlyph(word: string, params: SynthesisParams): Promise<GlyphData> {
  const prompt = `Create a unique geometric symbol (glyph) representing the word: "${word}".
The glyph should be abstract, meaningful, and composed of clean SVG path data.

Synthesis Parameters (Scale 0-100):
- Abstraction: ${params.abstraction} (0 = Literal/Simple, 100 = Highly Abstract/Complex)
- Density: ${params.density} (0 = Minimalist/Open, 100 = Dense/Intricate)
- Curvature: ${params.curvature} (0 = Sharp/Angular/Straight Lines, 100 = Organic/Fluid/Circles)
- Visual Theme: ${params.theme} (Influence the style of the geometric composition accordingly)
- Aesthetic Color: ${params.color} (Represent the essence of this color in the glyph's structure)

Return a JSON object with:
1. "name": A creative name for this specific symbol.
2. "paths": An array of distinct SVG path "d" attribute strings (viewBox 0 0 100 100). The number and complexity of paths should reflect the "Density" and "Abstraction" parameters.
3. "description": A short, profound interpretation of why these geometric shapes represent the word, referencing the synthesis style.
4. "category": A broad category like "Celestial", "Primal", "Cognitive", "Ethereal", etc.

Requirements for paths:
- Use coordinates between 0 and 100.
- Keep paths clean and expressive.
- Reflect the "Curvature" parameter in the path structure (lines vs curves).
- Ensure they are centered in the 100x100 viewBox.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          paths: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          description: { type: Type.STRING },
          category: { type: Type.STRING }
        },
        required: ["name", "paths", "description", "category"]
      }
    }
  });

  const raw = JSON.parse(response.text || "{}");
  
  return {
    id: Math.random().toString(36).substring(7),
    word,
    ...raw,
    createdAt: Date.now()
  };
}
