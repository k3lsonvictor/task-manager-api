#!/bin/sh
# Espera o banco de dados estar pronto antes de rodar a aplicação

echo "Aguardando o banco de dados..."

until pg_isready -h db -p 5432 -U postgres; do
  sleep 2
done

echo "Banco de dados está pronto! Rodando migrations..."
npx prisma migrate dev

echo "Iniciando a API..."
npm run start:dev
