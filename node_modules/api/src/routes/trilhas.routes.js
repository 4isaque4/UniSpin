import { Router } from "express";
import { requireAuth } from "../middlewares/auth.js";
import { query } from "../repositories/db.js";
import { asyncHandler } from "../middlewares/error.js";

const r = Router();

// Rota de teste para verificar estrutura do banco (remover em produção)
r.get("/test", asyncHandler(async (req, res) => {
  try {
    console.log("[trilhas/test] Testando estrutura do banco...");
    
    // Verificar se a tabela existe
    const tableCheck = await query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'Trilha'
      );
    `);
    
    const tableExists = tableCheck.rows[0].exists;
    console.log("[trilhas/test] Tabela 'Trilha' existe:", tableExists);
    
    if (!tableExists) {
      return res.status(404).json({
        error: 'table_not_found',
        message: 'Tabela Trilha não encontrada',
        suggestion: 'Verifique se a migração foi executada'
      });
    }
    
    // Verificar estrutura da tabela
    const structure = await query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'Trilha'
      ORDER BY ordinal_position;
    `);
    
    console.log("[trilhas/test] Estrutura da tabela:", structure.rows);
    
    res.json({
      table_exists: tableExists,
      structure: structure.rows,
      message: 'Estrutura do banco verificada com sucesso'
    });
    
  } catch (error) {
    console.error("[trilhas/test] Erro na verificação:", error);
    throw error;
  }
}));

// Protegida: precisa de Authorization: Bearer <token>
r.get("/", requireAuth, asyncHandler(async (req, res) => {
  try {
    console.log("[trilhas] Iniciando consulta ao banco de dados...");
    
    const { rows } = await query('SELECT id, name, description FROM "Trilha" ORDER BY created_at DESC');
    
    console.log(`[trilhas] Consulta executada com sucesso. ${rows.length} trilhas encontradas.`);
    
    res.json(rows);
  } catch (error) {
    console.error("[trilhas] Erro na consulta:", error);
    throw error; // Deixa o errorHandler tratar
  }
}));

export default r;
