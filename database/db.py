# database/db.py
import psycopg2
from psycopg2 import sql
import os
from dotenv import load_dotenv

load_dotenv()

class Database:
    def __init__(self):
        self.conn = psycopg2.connect(os.getenv('NEON_DATABASE_URL'))
    
    def get_medicoes_experimento(self, experimento_id):
        with self.conn.cursor() as cur:
            cur.execute("""
                SELECT m.*, mat.nome_material 
                FROM medicoes m
                JOIN materiais mat ON m.material_id = mat.id
                WHERE m.experimento_id = %s
                ORDER BY m.tempo_minutos
            """, (experimento_id,))
            return cur.fetchall()