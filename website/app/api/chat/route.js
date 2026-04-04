import pool from '@/lib/db';
import { model } from '@/lib/gemini';
import { DB_METADATA } from '@/lib/ai-metadata';

export async function POST(request) {
  try {
    const { message } = await request.json();

    // 1. Gerar SQL com Gemini
    const promptSQL = `
      Você é um especialista em SQL para um banco de dados de futebol.
      O esquema do banco é "${DB_METADATA.schema}".
      Tabelas disponíveis:
      ${DB_METADATA.tables.map(t => `- ${t.name}: ${t.description} (Colunas: ${t.columns.join(', ')})`).join('\n')}
      
      Pergunta do usuário: "${message}"
      
      Regras:
      1. Retorne APENAS o comando SQL, sem explicações, sem blocos de código (markdown).
      2. Use apenas SELECT e tabelas do esquema "${DB_METADATA.schema}".
      3. Se a pergunta não puder ser respondida com os dados acima, retorne "ERRO: Não encontrei dados para essa pergunta."
    `;

    const resultSQL = await model.generateContent(promptSQL);
    const sql = resultSQL.response.text().trim().replace(/```sql|```/g, '');

    if (sql.startsWith('ERRO:')) {
      return Response.json({ error: sql }, { status: 400 });
    }

    // 2. Executar no Postgres
    const client = await pool.connect();
    let queryResult;
    try {
      queryResult = await client.query(sql);
    } finally {
      client.release();
    }

    // 3. Formatar resposta final com Gemini
    const promptFinal = `
      O usuário perguntou: "${message}"
      O resultado da consulta ao banco de dados foi: ${JSON.stringify(queryResult.rows)}
      
      Resuma o resultado para o usuário de forma amigável e profissional, destacando os pontos principais. 
      Se houver muitos dados, formate como uma lista ou tabela simples.
    `;

    const resultFinal = await model.generateContent(promptFinal);
    const answer = resultFinal.response.text();

    return Response.json({ answer, sql });

  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Erro ao processar sua pergunta com a IA.' }, { status: 500 });
  }
}
